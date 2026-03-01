import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { generateDailyTasks, type Tier, type DailyTask } from '../data/tasksData';

export interface UserProfile {
  name: string;
  tier: Tier;
  level: number;
  totalXP: number;
  streak: number;
  lastActiveDate: string;
  onboardingComplete: boolean;
  joinDate: string;
}

export interface DailyLog {
  date: string;
  completionPercent: number;
  xpEarned: number;
  tasksCompleted: number;
  totalTasks: number;
}

interface AppContextType {
  user: UserProfile;
  todayTasks: DailyTask[];
  history: DailyLog[];
  updateTask: (taskId: string, value: number) => void;
  completeOnboarding: (name: string, tier: Tier) => void;
  resetDay: () => void;
  getTodayCompletionPercent: () => number;
  getTodayXP: () => number;
  xpForCurrentLevel: () => number;
  xpInCurrentLevel: () => number;
  levelThreshold: number;
}

const defaultUser: UserProfile = {
  name: '',
  tier: 'beginner',
  level: 1,
  totalXP: 0,
  streak: 0,
  lastActiveDate: '',
  onboardingComplete: false,
  joinDate: new Date().toISOString().split('T')[0],
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const LEVEL_THRESHOLD = 150;

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('taarufruh_user');
      return stored ? JSON.parse(stored) : defaultUser;
    } catch {
      return defaultUser;
    }
  });

  const [todayTasks, setTodayTasks] = useState<DailyTask[]>(() => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const stored = localStorage.getItem(`taarufruh_tasks_${today}`);
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  });

  const [history, setHistory] = useState<DailyLog[]>(() => {
    try {
      const stored = localStorage.getItem('taarufruh_history');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save user to localStorage
  useEffect(() => {
    localStorage.setItem('taarufruh_user', JSON.stringify(user));
  }, [user]);

  // Save today tasks to localStorage
  useEffect(() => {
    if (todayTasks.length === 0) return;
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`taarufruh_tasks_${today}`, JSON.stringify(todayTasks));
  }, [todayTasks]);

  // Save history
  useEffect(() => {
    localStorage.setItem('taarufruh_history', JSON.stringify(history));
  }, [history]);

  // Initialize today's tasks and check streak
  useEffect(() => {
    if (!user.onboardingComplete) return;
    const today = new Date().toISOString().split('T')[0];

    // Check streak
    if (user.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (user.lastActiveDate === yesterdayStr) {
        // streak continues — keep it but don't update until user completes a task
      } else if (user.lastActiveDate && user.lastActiveDate < yesterdayStr) {
        // streak broken
        setUser((prev) => ({ ...prev, streak: 0 }));
      }
    }

    // Generate tasks for today if not yet done
    const stored = localStorage.getItem(`taarufruh_tasks_${today}`);
    if (!stored) {
      const tasks = generateDailyTasks(user.tier);
      setTodayTasks(tasks);
    } else {
      try {
        setTodayTasks(JSON.parse(stored));
      } catch {
        setTodayTasks(generateDailyTasks(user.tier));
      }
    }
  }, [user.onboardingComplete, user.tier]);

  const getTodayCompletionPercent = useCallback(() => {
    if (todayTasks.length === 0) return 0;
    const completed = todayTasks.filter((t) => t.current >= t.target).length;
    return Math.round((completed / todayTasks.length) * 100);
  }, [todayTasks]);

  const getTodayXP = useCallback(() => {
    return todayTasks.reduce((sum, t) => {
      const progress = Math.min(t.current, t.target);
      return sum + progress * t.xpPerUnit;
    }, 0);
  }, [todayTasks]);

  const xpForCurrentLevel = useCallback(() => {
    return user.level * LEVEL_THRESHOLD;
  }, [user.level]);

  const xpInCurrentLevel = useCallback(() => {
    const xpAtLevelStart = ((user.level - 1) * user.level) / 2 * LEVEL_THRESHOLD / user.level;
    // Simpler: each level needs LEVEL_THRESHOLD XP
    const xpAtStart = (user.level - 1) * LEVEL_THRESHOLD;
    return user.totalXP - xpAtStart;
  }, [user.totalXP, user.level]);

  const updateTask = useCallback((taskId: string, value: number) => {
    setTodayTasks((prev) => {
      const updated = prev.map((t) => {
        if (t.id !== taskId) return t;
        const newCurrent = Math.max(0, Math.min(value, t.target + 5));
        return { ...t, current: newCurrent };
      });

      // Calculate XP delta
      const oldTask = prev.find((t) => t.id === taskId);
      const newTask = updated.find((t) => t.id === taskId);
      if (oldTask && newTask) {
        const oldProgress = Math.min(oldTask.current, oldTask.target);
        const newProgress = Math.min(newTask.current, newTask.target);
        const xpDelta = (newProgress - oldProgress) * newTask.xpPerUnit;

        if (xpDelta !== 0) {
          const today = new Date().toISOString().split('T')[0];
          setUser((prevUser) => {
            const newTotalXP = Math.max(0, prevUser.totalXP + xpDelta);
            const newLevel = Math.floor(newTotalXP / LEVEL_THRESHOLD) + 1;
            const updatedUser = {
              ...prevUser,
              totalXP: newTotalXP,
              level: newLevel,
              lastActiveDate: today,
            };
            // Update streak
            if (prevUser.lastActiveDate !== today) {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              const yesterdayStr = yesterday.toISOString().split('T')[0];
              if (prevUser.lastActiveDate === yesterdayStr || prevUser.lastActiveDate === '') {
                updatedUser.streak = prevUser.streak + 1;
              }
            }
            return updatedUser;
          });
        }
      }

      // Log to history when completion changes
      const completed = updated.filter((t) => t.current >= t.target).length;
      const completionPercent = Math.round((completed / updated.length) * 100);
      const today = new Date().toISOString().split('T')[0];

      setHistory((prevHistory) => {
        const existingIdx = prevHistory.findIndex((h) => h.date === today);
        const xpEarned = updated.reduce((sum, t) => {
          return sum + Math.min(t.current, t.target) * t.xpPerUnit;
        }, 0);
        const newLog: DailyLog = {
          date: today,
          completionPercent,
          xpEarned,
          tasksCompleted: completed,
          totalTasks: updated.length,
        };
        if (existingIdx >= 0) {
          const newHistory = [...prevHistory];
          newHistory[existingIdx] = newLog;
          return newHistory;
        }
        return [...prevHistory, newLog];
      });

      return updated;
    });
  }, []);

  const completeOnboarding = useCallback((name: string, tier: Tier) => {
    const today = new Date().toISOString().split('T')[0];
    const tasks = generateDailyTasks(tier);
    setTodayTasks(tasks);
    localStorage.setItem(`taarufruh_tasks_${today}`, JSON.stringify(tasks));
    setUser({
      name,
      tier,
      level: 1,
      totalXP: 0,
      streak: 0,
      lastActiveDate: '',
      onboardingComplete: true,
      joinDate: today,
    });
  }, []);

  const resetDay = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const tasks = generateDailyTasks(user.tier);
    setTodayTasks(tasks);
    localStorage.setItem(`taarufruh_tasks_${today}`, JSON.stringify(tasks));
  }, [user.tier]);

  return (
    <AppContext.Provider
      value={{
        user,
        todayTasks,
        history,
        updateTask,
        completeOnboarding,
        resetDay,
        getTodayCompletionPercent,
        getTodayXP,
        xpForCurrentLevel,
        xpInCurrentLevel,
        levelThreshold: LEVEL_THRESHOLD,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
