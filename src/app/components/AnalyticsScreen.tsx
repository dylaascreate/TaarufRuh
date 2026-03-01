import { useMemo } from 'react';
import { motion } from 'motion/react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { useApp } from '../context/AppContext';

function getLevelName(level: number): string {
  const names: Record<number, string> = {
    1: 'Mubtadi',
    2: 'Mutaallim',
    3: 'Mujahid',
    4: 'Musaddiq',
    5: 'Muhsin',
    6: 'Muttaqi',
    7: 'Wali',
    8: 'Siddiq',
    9: 'Nabawi',
    10: 'Rabbaniy',
  };
  return names[Math.min(level, 10)] || `Level ${level}`;
}

function getLevelEmoji(level: number): string {
  const emojis: Record<number, string> = {
    1: '🌱',
    2: '🌿',
    3: '🍀',
    4: '🌳',
    5: '⭐',
    6: '🌟',
    7: '💫',
    8: '✨',
    9: '🌙',
    10: '👑',
  };
  return emojis[Math.min(level, 10)] || '⚡';
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' });
}

export default function AnalyticsScreen() {
  const { user, todayTasks, history, xpInCurrentLevel, levelThreshold } = useApp();

  const xpProgress = xpInCurrentLevel();
  const xpPercent = Math.min((xpProgress / levelThreshold) * 100, 100);

  // Radar chart data — based on today's tasks
  const radarData = useMemo(() => {
    const categories: { subject: string; taskIds: string[]; fullMark: number }[] = [
      { subject: 'Solat', taskIds: ['solat_fardhu', 'solat_sunat', 'tahajjud'], fullMark: 100 },
      { subject: 'Quran', taskIds: ['tilawah'], fullMark: 100 },
      { subject: 'Dzikir', taskIds: ['dzikir'], fullMark: 100 },
      { subject: 'Infaq', taskIds: ['infaq'], fullMark: 100 },
      { subject: 'Dakwah', taskIds: ['dakwah', 'mencegah_kemungkaran'], fullMark: 100 },
      { subject: 'Sosial', taskIds: ['silaturahmi', 'kajian'], fullMark: 100 },
    ];

    return categories.map((cat) => {
      const relevantTasks = todayTasks.filter((t) => cat.taskIds.includes(t.id));
      let A = 0;
      if (relevantTasks.length > 0) {
        const totalProgress = relevantTasks.reduce((sum, t) => {
          return sum + Math.min(t.current / t.target, 1);
        }, 0);
        A = Math.round((totalProgress / relevantTasks.length) * 100);
      }
      return { subject: cat.subject, A, fullMark: 100 };
    });
  }, [todayTasks]);

  // Weekly bar chart — last 7 days from history
  const weeklyData = useMemo(() => {
    const days: { day: string; percent: number; isToday: boolean }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const log = history.find((h) => h.date === dateStr);
      days.push({
        day: i === 0 ? 'Hari ini' : formatDate(dateStr),
        percent: log ? log.completionPercent : 0,
        isToday: i === 0,
      });
    }
    return days;
  }, [history]);

  // Calculate streaks from history
  const longestStreak = useMemo(() => {
    let longest = 0;
    let current = 0;
    const sorted = [...history].sort((a, b) => a.date.localeCompare(b.date));
    for (let i = 0; i < sorted.length; i++) {
      if (i === 0) {
        current = sorted[i].completionPercent > 0 ? 1 : 0;
      } else {
        const prev = new Date(sorted[i - 1].date);
        const curr = new Date(sorted[i].date);
        const diff = Math.round((curr.getTime() - prev.getTime()) / 86400000);
        if (diff === 1 && sorted[i].completionPercent > 0) {
          current++;
        } else {
          current = sorted[i].completionPercent > 0 ? 1 : 0;
        }
      }
      longest = Math.max(longest, current);
    }
    return Math.max(longest, user.streak);
  }, [history, user.streak]);

  // Total XP earned
  const totalTasksCompleted = useMemo(() => {
    return history.reduce((sum, h) => sum + h.tasksCompleted, 0);
  }, [history]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="rounded-xl px-3 py-2"
          style={{ background: '#0d5e3f', border: '1px solid rgba(201,168,76,0.3)' }}
        >
          <p style={{ color: '#c9a84c', fontFamily: 'Poppins, sans-serif', fontSize: '11px' }}>{label}</p>
          <p style={{ color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600 }}>
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#f5f0e8' }}>
      {/* Header */}
      <div
        className="px-5 pt-12 pb-6"
        style={{
          background: 'linear-gradient(150deg, #0d5e3f 0%, #0a4a31 100%)',
          borderBottomLeftRadius: '24px',
          borderBottomRightRadius: '24px',
        }}
      >
        <h1
          style={{
            color: '#ffffff',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '20px',
            fontWeight: 700,
            marginBottom: '4px',
          }}
        >
          Soul Analytics
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}>
          Lacak perjalanan ruhanimu
        </p>
      </div>

      <div className="px-4 pt-5 space-y-4">
        {/* Level Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a3328, #0d5e3f)',
            boxShadow: '0 6px 20px rgba(13,94,63,0.25)',
          }}
        >
          <div className="p-5">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center"
                style={{ background: 'rgba(201,168,76,0.15)', border: '2px solid rgba(201,168,76,0.4)' }}
              >
                <span className="text-2xl">{getLevelEmoji(user.level)}</span>
                <span
                  style={{ color: '#c9a84c', fontFamily: 'Poppins, sans-serif', fontSize: '10px', fontWeight: 700 }}
                >
                  Lv.{user.level}
                </span>
              </div>
              <div className="flex-1">
                <div
                  style={{ color: '#c9a84c', fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 700 }}
                >
                  {getLevelName(user.level)}
                </div>
                <div
                  style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif', fontSize: '11px' }}
                >
                  Total {user.totalXP} XP terkumpul
                </div>
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Poppins, sans-serif', fontSize: '10px' }}>
                      {xpProgress} / {levelThreshold} XP ke Level {user.level + 1}
                    </span>
                    <span style={{ color: '#c9a84c', fontFamily: 'Poppins, sans-serif', fontSize: '10px' }}>
                      {Math.round(xpPercent)}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #c9a84c, #e8c66a)' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${xpPercent}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: '🔥', value: `${user.streak}`, label: 'Streak Aktif', color: '#e85d04' },
            { icon: '🏆', value: `${longestStreak}`, label: 'Streak Terbaik', color: '#c9a84c' },
            { icon: '✅', value: `${totalTasksCompleted}`, label: 'Total Amalan', color: '#0d5e3f' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-3 text-center"
              style={{ background: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <div className="text-xl mb-1">{stat.icon}</div>
              <div
                style={{ color: stat.color, fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 700 }}
              >
                {stat.value}
              </div>
              <div
                style={{ color: '#9ca3af', fontFamily: 'Poppins, sans-serif', fontSize: '9px' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Radar Chart */}
        <div
          className="rounded-2xl p-4"
          style={{ background: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
        >
          <h3
            className="mb-1"
            style={{ color: '#1c2b22', fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600 }}
          >
            🕸️ Keseimbangan Amalan Hari Ini
          </h3>
          <p
            className="mb-4"
            style={{ color: '#9ca3af', fontFamily: 'Poppins, sans-serif', fontSize: '10px' }}
          >
            Persentase pencapaian per kategori
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="rgba(13,94,63,0.1)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fill: '#6b8f7d',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 10,
                }}
              />
              <Radar
                name="Amalan"
                dataKey="A"
                stroke="#0d5e3f"
                fill="#0d5e3f"
                fillOpacity={0.25}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Bar Chart */}
        <div
          className="rounded-2xl p-4"
          style={{ background: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
        >
          <h3
            className="mb-1"
            style={{ color: '#1c2b22', fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600 }}
          >
            📅 Aktivitas 7 Hari Terakhir
          </h3>
          <p
            className="mb-4"
            style={{ color: '#9ca3af', fontFamily: 'Poppins, sans-serif', fontSize: '10px' }}
          >
            % penyelesaian amalan harian
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={weeklyData} margin={{ top: 0, right: 5, bottom: 0, left: -25 }}>
              <XAxis
                dataKey="day"
                tick={{ fill: '#9ca3af', fontFamily: 'Poppins, sans-serif', fontSize: 9 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: '#9ca3af', fontFamily: 'Poppins, sans-serif', fontSize: 9 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="percent" radius={[6, 6, 0, 0]}>
                {weeklyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.isToday
                        ? '#c9a84c'
                        : entry.percent >= 80
                        ? '#0d5e3f'
                        : entry.percent >= 50
                        ? '#2d9e6e'
                        : entry.percent > 0
                        ? '#a8d5c0'
                        : '#e8e3d8'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2 justify-center">
            {[
              { color: '#0d5e3f', label: '≥80% Sempurna' },
              { color: '#2d9e6e', label: '≥50% Baik' },
              { color: '#c9a84c', label: 'Hari ini' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                <span style={{ color: '#9ca3af', fontFamily: 'Poppins, sans-serif', fontSize: '9px' }}>
                  {l.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Level Roadmap */}
        <div
          className="rounded-2xl p-4"
          style={{ background: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
        >
          <h3
            className="mb-4"
            style={{ color: '#1c2b22', fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600 }}
          >
            🗺️ Peta Level Spiritual
          </h3>
          <div className="space-y-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((lvl) => {
              const isCurrentLevel = lvl === user.level;
              const isPastLevel = lvl < user.level;
              return (
                <div
                  key={lvl}
                  className="flex items-center gap-3 rounded-xl p-3"
                  style={{
                    background: isCurrentLevel
                      ? 'linear-gradient(135deg, rgba(13,94,63,0.1), rgba(13,94,63,0.05))'
                      : 'transparent',
                    border: isCurrentLevel ? '1.5px solid rgba(13,94,63,0.2)' : '1.5px solid transparent',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isPastLevel
                        ? '#0d5e3f'
                        : isCurrentLevel
                        ? 'rgba(201,168,76,0.2)'
                        : '#f5f0e8',
                    }}
                  >
                    <span className="text-sm">
                      {isPastLevel ? '✓' : getLevelEmoji(lvl)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          color: isPastLevel ? '#0d5e3f' : isCurrentLevel ? '#1c2b22' : '#9ca3af',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '12px',
                          fontWeight: isCurrentLevel ? 600 : 400,
                        }}
                      >
                        Level {lvl} · {getLevelName(lvl)}
                      </span>
                      {isCurrentLevel && (
                        <span
                          className="px-1.5 py-0.5 rounded-full text-[9px]"
                          style={{ background: '#0d5e3f', color: '#fff', fontFamily: 'Poppins, sans-serif' }}
                        >
                          Sekarang
                        </span>
                      )}
                    </div>
                    <span
                      style={{
                        color: '#c9a3af',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '10px',
                      }}
                    >
                      {(lvl - 1) * levelThreshold} – {lvl * levelThreshold} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}