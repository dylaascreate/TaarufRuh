import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import type { Tier } from '../data/tasksData';

const tiers: {
  id: Tier;
  name: string;
  subtitle: string;
  emoji: string;
  description: string;
  tasks: string[];
  color: string;
  bgColor: string;
}[] = [
  {
    id: 'beginner',
    name: 'Pemula',
    subtitle: 'Baru Memulai',
    emoji: '🌱',
    description: 'Fokus pada ibadah wajib dan membangun kebiasaan dasar yang konsisten.',
    tasks: ['Solat Fardhu 5 Waktu', 'Tilawah 1 Halaman/hari', 'Dzikir 1 Sesi', 'Infaq Sekali', 'Silaturahmi 1 Orang'],
    color: '#2d9e6e',
    bgColor: '#ecfdf5',
  },
  {
    id: 'intermediate',
    name: 'Pertengahan',
    subtitle: 'Meningkat',
    emoji: '🌿',
    description: 'Tambahkan amalan sunat dan mulai aktif berdakwah di lingkungan sekitar.',
    tasks: ['Solat Fardhu + Sunat 4 Rakaat', 'Tilawah 3 Halaman/hari', 'Dzikir 2 Sesi', 'Dakwah 1 Kali', 'Kajian Ilmu 1 Jam'],
    color: '#0d5e3f',
    bgColor: '#f0fdf4',
  },
  {
    id: 'advanced',
    name: 'Lanjutan',
    subtitle: 'Berjuang Lebih',
    emoji: '🌳',
    description: 'Maksimalkan ibadah dengan Tahajjud, hafalan, dan peran aktif dalam masyarakat.',
    tasks: ['Tahajjud 8 Rakaat', 'Solat Sunat 12 Rakaat', 'Tilawah 5 Halaman/hari', 'Dakwah 2 Kali', 'Mencegah Kemungkaran'],
    color: '#c9a84c',
    bgColor: '#fffbeb',
  },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const { completeOnboarding } = useApp();
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim() && selectedTier) {
      completeOnboarding(name.trim(), selectedTier);
      navigate('/home');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(160deg, #0d5e3f 0%, #0a4a31 40%, #1c3a2a 100%)' }}
    >
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="flex flex-col items-center justify-center flex-1 px-8 text-center"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-8"
            >
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center mb-4 mx-auto"
                style={{ background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(201,168,76,0.6)' }}
              >
                <span className="text-5xl">🌙</span>
              </div>
              <div
                className="text-[10px] tracking-[0.3em] uppercase mb-1"
                style={{ color: 'rgba(201,168,76,0.8)', fontFamily: 'Poppins, sans-serif' }}
              >
                Selamat Datang di
              </div>
              <h1
                className="text-4xl mb-1"
                style={{ color: '#ffffff', fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: '-0.5px' }}
              >
                TaarufRuh
              </h1>
              <div
                style={{ color: 'rgba(201,168,76,0.9)', fontFamily: 'Amiri, serif', fontSize: '18px' }}
              >
                تعارف الروح
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p
                className="text-base leading-relaxed mb-8 px-4"
                style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Poppins, sans-serif' }}
              >
                Jadikan Ramadan ini berbeda. Lacak ibadah harian, tingkatkan levelmu, dan jaga istiqamah bersama TaarufRuh.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {['🎯 Muhasabah Harian', '🏆 Level & XP', '📈 Analitik', '💡 Inspirasi'].map((feat) => (
                  <span
                    key={feat}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.85)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    {feat}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setStep(1)}
                className="w-full py-4 rounded-2xl text-base transition-all duration-200 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #c9a84c, #e8c66a)',
                  color: '#1c2b22',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  boxShadow: '0 4px 20px rgba(201,168,76,0.4)',
                }}
              >
                Mulai Perjalanan ✨
              </button>
            </motion.div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="name"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="flex flex-col px-6 pt-16 flex-1"
          >
            <button
              onClick={() => setStep(0)}
              className="text-left mb-8 flex items-center gap-2"
              style={{ color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none' }}
            >
              <span className="text-lg">←</span>
              <span className="text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>Kembali</span>
            </button>

            <div className="mb-8">
              <div
                className="text-xs tracking-widest uppercase mb-2"
                style={{ color: 'rgba(201,168,76,0.8)', fontFamily: 'Poppins, sans-serif' }}
              >
                Langkah 1 dari 2
              </div>
              <h2
                className="text-2xl mb-2"
                style={{ color: '#ffffff', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
              >
                Siapa namamu?
              </h2>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif' }}>
                Kami akan menggunakannya untuk sapaan personal tiap hari.
              </p>
            </div>

            <div
              className="rounded-2xl p-5 mb-6"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <input
                type="text"
                placeholder="Masukkan namamu..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && name.trim() && setStep(2)}
                className="w-full bg-transparent outline-none text-lg"
                style={{
                  color: '#ffffff',
                  fontFamily: 'Poppins, sans-serif',
                  caretColor: '#c9a84c',
                }}
                autoFocus
              />
            </div>

            <button
              onClick={() => name.trim() && setStep(2)}
              disabled={!name.trim()}
              className="w-full py-4 rounded-2xl text-base transition-all duration-200 active:scale-95 disabled:opacity-40"
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #e8c66a)',
                color: '#1c2b22',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                boxShadow: name.trim() ? '0 4px 20px rgba(201,168,76,0.4)' : 'none',
              }}
            >
              Lanjut →
            </button>

            <div className="mt-8 rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Poppins, sans-serif' }}>
                🔒 Data kamu tersimpan hanya di perangkat ini
              </p>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="tier"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="flex flex-col px-6 pt-12 pb-8 flex-1"
          >
            <button
              onClick={() => setStep(1)}
              className="text-left mb-6 flex items-center gap-2"
              style={{ color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none' }}
            >
              <span className="text-lg">←</span>
              <span className="text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>Kembali</span>
            </button>

            <div className="mb-6">
              <div
                className="text-xs tracking-widest uppercase mb-2"
                style={{ color: 'rgba(201,168,76,0.8)', fontFamily: 'Poppins, sans-serif' }}
              >
                Langkah 2 dari 2
              </div>
              <h2
                className="text-2xl mb-1"
                style={{ color: '#ffffff', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
              >
                Pilih Niat & Tier
              </h2>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Poppins, sans-serif' }}>
                Hei {name}! Pilih target spiritualmu. Bisa diubah nanti.
              </p>
            </div>

            <div className="space-y-3 flex-1">
              {tiers.map((tier) => {
                const isSelected = selectedTier === tier.id;
                return (
                  <motion.button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left rounded-2xl p-4 transition-all duration-200"
                    style={{
                      background: isSelected
                        ? 'rgba(255,255,255,0.15)'
                        : 'rgba(255,255,255,0.07)',
                      border: isSelected
                        ? `2px solid ${tier.color}`
                        : '2px solid rgba(255,255,255,0.1)',
                      outline: 'none',
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isSelected ? tier.color : 'rgba(255,255,255,0.08)',
                        }}
                      >
                        <span className="text-xl">{tier.emoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="text-sm"
                            style={{
                              color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.85)',
                              fontFamily: 'Poppins, sans-serif',
                              fontWeight: 600,
                            }}
                          >
                            {tier.name}
                          </span>
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded-full"
                            style={{
                              background: isSelected ? tier.color : 'rgba(255,255,255,0.1)',
                              color: isSelected ? '#fff' : 'rgba(255,255,255,0.6)',
                              fontFamily: 'Poppins, sans-serif',
                            }}
                          >
                            {tier.subtitle}
                          </span>
                        </div>
                        <p
                          className="text-xs leading-relaxed mb-2"
                          style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Poppins, sans-serif' }}
                        >
                          {tier.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {tier.tasks.slice(0, 3).map((task) => (
                            <span
                              key={task}
                              className="text-[9px] px-1.5 py-0.5 rounded-md"
                              style={{
                                background: 'rgba(255,255,255,0.08)',
                                color: 'rgba(255,255,255,0.55)',
                                fontFamily: 'Poppins, sans-serif',
                              }}
                            >
                              {task}
                            </span>
                          ))}
                          {tier.tasks.length > 3 && (
                            <span
                              className="text-[9px] px-1.5 py-0.5 rounded-md"
                              style={{
                                background: 'rgba(255,255,255,0.08)',
                                color: 'rgba(201,168,76,0.7)',
                                fontFamily: 'Poppins, sans-serif',
                              }}
                            >
                              +{tier.tasks.length - 3} lagi
                            </span>
                          )}
                        </div>
                      </div>
                      {isSelected && (
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: tier.color }}
                        >
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <button
              onClick={handleStart}
              disabled={!selectedTier}
              className="w-full py-4 rounded-2xl text-base transition-all duration-200 active:scale-95 disabled:opacity-40 mt-4"
              style={{
                background: selectedTier ? 'linear-gradient(135deg, #c9a84c, #e8c66a)' : 'rgba(255,255,255,0.2)',
                color: '#1c2b22',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                boxShadow: selectedTier ? '0 4px 20px rgba(201,168,76,0.4)' : 'none',
              }}
            >
              Mulai Muhasabah 🚀
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative background elements */}
      <div
        className="fixed top-0 right-0 w-40 h-40 rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #c9a84c, transparent)', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="fixed bottom-20 left-0 w-32 h-32 rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #2d9e6e, transparent)', transform: 'translate(-30%, 30%)' }}
      />
    </div>
  );
}
