import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

const PRAYER_TIMES = [
  { name: 'Subuh', time: '05:48', isNext: false },
  { name: 'Syuruk', time: '07:05', isNext: false },
  { name: 'Zohor', time: '13:10', isNext: false },
  { name: 'Asar', time: '16:28', isNext: true },
  { name: 'Maghrib', time: '19:18', isNext: false },
  { name: 'Isyak', time: '20:32', isNext: false },
];

function getGregorianDate() {
  const now = new Date();
  return now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function getHijriDate() {
  const now = new Date();
  // Ramadan 1447 starts Feb 20, 2026
  const ramadanStart = new Date(2026, 1, 20);
  const diffDays = Math.floor((now.getTime() - ramadanStart.getTime()) / 86400000);
  if (diffDays >= 0 && diffDays < 30) {
    return `${diffDays + 1} Ramadan 1447 H`;
  }
  // Fallback calculation for other months
  return 'Ramadan 1447 H';
}

function CircularProgress({ percent, size = 130, strokeWidth = 10 }: { percent: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#c9a84c"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
    </svg>
  );
}

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

export default function HomeScreen() {
  const navigate = useNavigate();
  const {
    user,
    todayTasks,
    getTodayCompletionPercent,
    getTodayXP,
    xpInCurrentLevel,
    levelThreshold,
  } = useApp();

  const completionPercent = getTodayCompletionPercent();
  const todayXP = getTodayXP();
  const xpProgress = xpInCurrentLevel();
  const completedCount = todayTasks.filter((t) => t.current >= t.target).length;
  const incompleteTasks = useMemo(() => todayTasks.filter((t) => t.current < t.target).slice(0, 4), [todayTasks]);

  const tierLabel: Record<string, string> = {
    beginner: 'Pemula',
    intermediate: 'Pertengahan',
    advanced: 'Lanjutan',
  };

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#f5f0e8' }}>
      {/* Header Hero */}
      <div
        className="relative px-5 pt-12 pb-6"
        style={{
          background: 'linear-gradient(150deg, #0d5e3f 0%, #0a4a31 60%, #12503a 100%)',
          borderBottomLeftRadius: '28px',
          borderBottomRightRadius: '28px',
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute top-0 right-0 w-36 h-36 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #c9a84c, transparent)', transform: 'translate(20%, -20%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #fff, transparent)', transform: 'translate(-20%, 20%)' }}
        />

        {/* Top bar */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span style={{ color: 'rgba(201,168,76,0.9)', fontFamily: 'Poppins, sans-serif', fontSize: '11px' }}>
                {getHijriDate()}
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif', fontSize: '11px' }}>
              {getGregorianDate()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}
            >
              <span className="text-base">🔥</span>
              <span style={{ color: '#c9a84c', fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 600 }}>
                {user.streak} hari
              </span>
            </div>
          </div>
        </div>

        {/* Greeting + Progress Ring */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="flex-1">
            <h1
              style={{ color: '#ffffff', fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 700, lineHeight: 1.2, marginBottom: '4px' }}
            >
              Assalamualaikum,<br />
              <span style={{ color: '#c9a84c' }}>{user.name} 👋</span>
            </h1>
            <p
              className="mt-2 mb-4"
              style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}
            >
              {completionPercent === 100
                ? 'MasyaAllah! Semua target tercapai! 🎉'
                : completionPercent >= 50
                ? 'Teruskan semangat! Hampir selesai!'
                : 'Bismillah, mulai ibadahmu hari ini.'}
            </p>

            {/* Level badge */}
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                style={{ background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)' }}
              >
                <span style={{ color: '#c9a84c', fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 600 }}>
                  ⚡ Lv.{user.level} · {getLevelName(user.level)}
                </span>
              </div>
              <div
                className="px-2 py-1 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <span style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif', fontSize: '10px' }}>
                  {tierLabel[user.tier]}
                </span>
              </div>
            </div>

            {/* XP Bar */}
            <div className="mt-3">
              <div className="flex justify-between mb-1">
                <span style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Poppins, sans-serif', fontSize: '10px' }}>
                  XP: {xpProgress} / {levelThreshold}
                </span>
                <span style={{ color: 'rgba(201,168,76,0.8)', fontFamily: 'Poppins, sans-serif', fontSize: '10px' }}>
                  +{todayXP} hari ini
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #c9a84c, #e8c66a)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((xpProgress / levelThreshold) * 100, 100)}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>

          {/* Circular Progress */}
          <div className="relative flex-shrink-0">
            <CircularProgress percent={completionPercent} size={120} strokeWidth={9} />
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ transform: 'none' }}
            >
              <span
                style={{ color: '#c9a84c', fontFamily: 'Poppins, sans-serif', fontSize: '22px', fontWeight: 700, lineHeight: 1 }}
              >
                {completionPercent}%
              </span>
              <span
                style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif', fontSize: '10px', marginTop: '2px' }}
              >
                {completedCount}/{todayTasks.length}
              </span>
              <span
                style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Poppins, sans-serif', fontSize: '9px' }}
              >
                amalan
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 pt-5 space-y-4">
        {/* Prayer Times */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ color: '#1c2b22', fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600 }}>
              🕌 Waktu Solat
            </h3>
            <span style={{ color: '#0d5e3f', fontFamily: 'Poppins, sans-serif', fontSize: '10px' }}>
              Hari ini
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
            {PRAYER_TIMES.map((p) => (
              <div
                key={p.name}
                className="flex flex-col items-center justify-center rounded-2xl p-3 flex-shrink-0"
                style={{
                  minWidth: '58px',
                  background: p.isNext
                    ? 'linear-gradient(145deg, #0d5e3f, #1a7a55)'
                    : '#ffffff',
                  boxShadow: p.isNext
                    ? '0 4px 12px rgba(13,94,63,0.3)'
                    : '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <span
                  style={{
                    color: p.isNext ? 'rgba(255,255,255,0.75)' : '#6b8f7d',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '9px',
                    marginBottom: '4px',
                  }}
                >
                  {p.name}
                </span>
                <span
                  style={{
                    color: p.isNext ? '#c9a84c' : '#1c2b22',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  {p.time}
                </span>
                {p.isNext && (
                  <div
                    className="mt-1 px-1.5 py-0.5 rounded-full"
                    style={{ background: 'rgba(201,168,76,0.2)' }}
                  >
                    <span style={{ color: '#c9a84c', fontFamily: 'Poppins, sans-serif', fontSize: '8px', fontWeight: 600 }}>
                      Berikutnya
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: '📋', label: 'Muhasabah', path: '/muhasabah', color: '#0d5e3f' },
            { icon: '📊', label: 'Analitik', path: '/analytics', color: '#2a5f8f' },
            { icon: '💡', label: 'Inspirasi', path: '/inspiration', color: '#c9a84c' },
          ].map((action) => (
            <motion.button
              key={action.label}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center justify-center py-4 rounded-2xl gap-1"
              style={{
                background: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                border: 'none',
                outline: 'none',
              }}
            >
              <span className="text-2xl">{action.icon}</span>
              <span
                style={{
                  color: action.color,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '11px',
                  fontWeight: 500,
                }}
              >
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Today's Tasks */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ color: '#1c2b22', fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600 }}>
              📌 Tugas Belum Selesai
            </h3>
            <button
              onClick={() => navigate('/muhasabah')}
              style={{ color: '#0d5e3f', fontFamily: 'Poppins, sans-serif', fontSize: '11px', background: 'none', border: 'none' }}
            >
              Lihat semua →
            </button>
          </div>

          {incompleteTasks.length === 0 ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-2xl p-6 text-center"
              style={{ background: 'linear-gradient(135deg, #ecfdf5, #f0fff4)', border: '1px solid rgba(13,94,63,0.2)' }}
            >
              <div className="text-3xl mb-2">🎉</div>
              <p style={{ color: '#0d5e3f', fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600 }}>
                MasyaAllah! Semua amalan selesai!
              </p>
              <p style={{ color: '#6b8f7d', fontFamily: 'Poppins, sans-serif', fontSize: '11px', marginTop: '4px' }}>
                Barakallah fiikum 🌟
              </p>
            </motion.div>
          ) : (
            <div className="space-y-2">
              {incompleteTasks.map((task, i) => {
                const progress = task.target > 0 ? (task.current / task.target) * 100 : 0;
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-2xl p-3.5 flex items-center gap-3"
                    style={{ background: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: '#f5f0e8' }}
                    >
                      <span className="text-xl">{task.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          style={{
                            color: '#1c2b22',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '12px',
                            fontWeight: 500,
                          }}
                        >
                          {task.name}
                        </span>
                        <span
                          style={{
                            color: '#6b8f7d',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '11px',
                          }}
                        >
                          {task.current}/{task.target} {task.unit}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#f0ebe0' }}>
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${progress}%`,
                            background: task.category === 'habluminallah'
                              ? 'linear-gradient(90deg, #0d5e3f, #2d9e6e)'
                              : 'linear-gradient(90deg, #c9a84c, #e8c66a)',
                          }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/muhasabah')}
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: '#f0ebe0', border: 'none', outline: 'none' }}
                    >
                      <span style={{ color: '#0d5e3f', fontSize: '14px' }}>+</span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Motivational Quote */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: 'linear-gradient(135deg, #0d5e3f, #1a7a55)',
            boxShadow: '0 4px 16px rgba(13,94,63,0.2)',
          }}
        >
          <div
            className="text-xs mb-2"
            style={{ color: 'rgba(201,168,76,0.8)', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.1em' }}
          >
            ✦ HADITH HARI INI
          </div>
          <p
            className="leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Poppins, sans-serif', fontSize: '11px' }}
          >
            "Amalan yang paling dicintai Allah adalah amalan yang dilakukan secara terus-menerus, walaupun sedikit."
          </p>
          <p
            className="mt-2"
            style={{ color: 'rgba(201,168,76,0.7)', fontFamily: 'Poppins, sans-serif', fontSize: '10px' }}
          >
            — HR. Bukhari & Muslim
          </p>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
