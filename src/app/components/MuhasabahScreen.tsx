import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import type { DailyTask } from '../data/tasksData';

function TaskCard({ task, onUpdate }: { task: DailyTask; onUpdate: (id: string, val: number) => void }) {
  const isComplete = task.current >= task.target;
  const progress = Math.min((task.current / task.target) * 100, 100);
  const isHL = task.category === 'habluminallah';

  const handleIncrement = () => onUpdate(task.id, task.current + 1);
  const handleDecrement = () => onUpdate(task.id, Math.max(0, task.current - 1));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-4 mb-3"
      style={{
        background: isComplete
          ? `linear-gradient(135deg, ${isHL ? 'rgba(13,94,63,0.08)' : 'rgba(201,168,76,0.08)'}, rgba(255,255,255,0.9))`
          : '#ffffff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        border: isComplete
          ? `1.5px solid ${isHL ? 'rgba(13,94,63,0.25)' : 'rgba(201,168,76,0.35)'}`
          : '1.5px solid transparent',
      }}
    >
      <div className="flex items-start gap-3">
        {/* Icon + completion indicator */}
        <div className="relative flex-shrink-0">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              background: isComplete
                ? isHL
                  ? 'rgba(13,94,63,0.15)'
                  : 'rgba(201,168,76,0.15)'
                : '#f5f0e8',
            }}
          >
            <span className="text-2xl">{task.icon}</span>
          </div>
          {isComplete && (
            <div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: isHL ? '#0d5e3f' : '#c9a84c' }}
            >
              <span className="text-white text-[8px]">✓</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span
                style={{
                  color: '#1c2b22',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                {task.name}
              </span>
              <div
                style={{
                  color: '#9ca3af',
                  fontFamily: 'Amiri, serif',
                  fontSize: '12px',
                  marginTop: '1px',
                }}
              >
                {task.arabicName}
              </div>
            </div>
            <div
              className="px-2 py-0.5 rounded-lg flex-shrink-0"
              style={{
                background: isHL ? 'rgba(13,94,63,0.1)' : 'rgba(201,168,76,0.12)',
              }}
            >
              <span
                style={{
                  color: isHL ? '#0d5e3f' : '#b8860b',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '10px',
                  fontWeight: 600,
                }}
              >
                +{task.xpPerUnit * task.target} XP
              </span>
            </div>
          </div>

          <p
            className="mt-1"
            style={{ color: '#9ca3af', fontFamily: 'Poppins, sans-serif', fontSize: '10px' }}
          >
            {task.description}
          </p>

          {/* Progress bar */}
          <div className="mt-2.5 mb-2">
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#f0ebe0' }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: isHL
                    ? 'linear-gradient(90deg, #0d5e3f, #2d9e6e)'
                    : 'linear-gradient(90deg, #c9a84c, #e8c66a)',
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Counter controls */}
          <div className="flex items-center justify-between mt-1">
            <span
              style={{
                color: '#6b8f7d',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '11px',
              }}
            >
              {task.current} / {task.target} {task.unit}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrement}
                disabled={task.current === 0}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 disabled:opacity-30"
                style={{
                  background: '#f0ebe0',
                  border: 'none',
                  outline: 'none',
                  color: '#1c2b22',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
              >
                −
              </button>
              <div
                className="w-10 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: isComplete
                    ? isHL
                      ? 'rgba(13,94,63,0.12)'
                      : 'rgba(201,168,76,0.15)'
                    : '#f5f0e8',
                }}
              >
                <span
                  style={{
                    color: isComplete ? (isHL ? '#0d5e3f' : '#b8860b') : '#1c2b22',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                  }}
                >
                  {task.current}
                </span>
              </div>
              <button
                onClick={handleIncrement}
                disabled={task.current >= task.target}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 disabled:opacity-30"
                style={{
                  background: isHL
                    ? task.current >= task.target
                      ? '#f0ebe0'
                      : '#0d5e3f'
                    : task.current >= task.target
                    ? '#f0ebe0'
                    : '#c9a84c',
                  border: 'none',
                  outline: 'none',
                  color: task.current >= task.target ? '#9ca3af' : '#ffffff',
                  fontSize: '18px',
                  fontWeight: 600,
                  boxShadow: task.current < task.target
                    ? `0 2px 8px ${isHL ? 'rgba(13,94,63,0.3)' : 'rgba(201,168,76,0.3)'}`
                    : 'none',
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MuhasabahScreen() {
  const [activeTab, setActiveTab] = useState<'habluminallah' | 'habluminannas'>('habluminallah');
  const { todayTasks, updateTask, getTodayCompletionPercent, getTodayXP } = useApp();

  const hlTasks = todayTasks.filter((t) => t.category === 'habluminallah');
  const hnTasks = todayTasks.filter((t) => t.category === 'habluminannas');
  const activeTasks = activeTab === 'habluminallah' ? hlTasks : hnTasks;

  const hlCompleted = hlTasks.filter((t) => t.current >= t.target).length;
  const hnCompleted = hnTasks.filter((t) => t.current >= t.target).length;
  const totalCompletion = getTodayCompletionPercent();
  const todayXP = getTodayXP();

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#f5f0e8' }}>
      {/* Header */}
      <div
        className="px-5 pt-12 pb-5"
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
          Muhasabah Harian
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}>
          Catat setiap amalan dengan penuh kesadaran
        </p>

        {/* Summary strip */}
        <div className="flex gap-3 mt-4">
          {[
            { label: 'Selesai Hari Ini', value: `${totalCompletion}%`, icon: '✅' },
            { label: 'XP Didapat', value: `${todayXP} XP`, icon: '⚡' },
            { label: 'Tugas Selesai', value: `${hlCompleted + hnCompleted}/${todayTasks.length}`, icon: '📋' },
          ].map((s) => (
            <div
              key={s.label}
              className="flex-1 rounded-xl p-2.5 text-center"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <div className="text-base mb-0.5">{s.icon}</div>
              <div
                style={{ color: '#c9a84c', fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 700 }}
              >
                {s.value}
              </div>
              <div
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Poppins, sans-serif', fontSize: '9px' }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-4 mb-2">
        <div
          className="flex rounded-2xl p-1"
          style={{ background: 'rgba(0,0,0,0.06)' }}
        >
          <button
            onClick={() => setActiveTab('habluminallah')}
            className="flex-1 py-2.5 rounded-xl text-xs transition-all duration-200 flex items-center justify-center gap-1.5"
            style={{
              background: activeTab === 'habluminallah' ? '#0d5e3f' : 'transparent',
              color: activeTab === 'habluminallah' ? '#ffffff' : '#6b8f7d',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              border: 'none',
              outline: 'none',
              boxShadow: activeTab === 'habluminallah' ? '0 2px 8px rgba(13,94,63,0.3)' : 'none',
            }}
          >
            <span>🕌</span>
            <span>Habluminallah</span>
            <span
              className="px-1.5 py-0.5 rounded-full text-[10px]"
              style={{
                background: activeTab === 'habluminallah' ? 'rgba(255,255,255,0.2)' : 'rgba(13,94,63,0.15)',
                color: activeTab === 'habluminallah' ? '#fff' : '#0d5e3f',
              }}
            >
              {hlCompleted}/{hlTasks.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('habluminannas')}
            className="flex-1 py-2.5 rounded-xl text-xs transition-all duration-200 flex items-center justify-center gap-1.5"
            style={{
              background: activeTab === 'habluminannas' ? '#c9a84c' : 'transparent',
              color: activeTab === 'habluminannas' ? '#1c2b22' : '#6b8f7d',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              border: 'none',
              outline: 'none',
              boxShadow: activeTab === 'habluminannas' ? '0 2px 8px rgba(201,168,76,0.3)' : 'none',
            }}
          >
            <span>👥</span>
            <span>Habluminannas</span>
            <span
              className="px-1.5 py-0.5 rounded-full text-[10px]"
              style={{
                background: activeTab === 'habluminannas' ? 'rgba(0,0,0,0.15)' : 'rgba(201,168,76,0.2)',
                color: activeTab === 'habluminannas' ? '#1c2b22' : '#b8860b',
              }}
            >
              {hnCompleted}/{hnTasks.length}
            </span>
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 mb-3">
        <p
          style={{
            color: '#6b8f7d',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '11px',
            lineHeight: 1.5,
          }}
        >
          {activeTab === 'habluminallah'
            ? '🕌 Ibadah kepada Allah — hubungan vertikalmu dengan Sang Pencipta'
            : '👥 Ibadah sosial — peranmu sebagai Muslim di tengah masyarakat'}
        </p>
      </div>

      {/* Task list */}
      <div className="px-4 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'habluminallah' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTasks.map((task) => (
              <TaskCard key={task.id} task={task} onUpdate={updateTask} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Completion banner */}
        {activeTasks.length > 0 && activeTasks.every((t) => t.current >= t.target) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl p-5 text-center mb-4"
            style={{
              background: activeTab === 'habluminallah'
                ? 'linear-gradient(135deg, #ecfdf5, #f0fff4)'
                : 'linear-gradient(135deg, #fffbeb, #fef3c7)',
              border: `1.5px solid ${activeTab === 'habluminallah' ? 'rgba(13,94,63,0.2)' : 'rgba(201,168,76,0.3)'}`,
            }}
          >
            <div className="text-3xl mb-2">🌟</div>
            <p
              style={{
                color: activeTab === 'habluminallah' ? '#0d5e3f' : '#b8860b',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              {activeTab === 'habluminallah'
                ? 'Semua ibadah Allah selesai! Barakallah 🤲'
                : 'Semua tugas sosial selesai! MasyaAllah 🎉'}
            </p>
          </motion.div>
        )}

        <div className="h-4" />
      </div>
    </div>
  );
}
