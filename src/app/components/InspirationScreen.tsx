import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getDailyContent, type Tip } from '../data/inspirationData';

const CATEGORY_LABELS: Record<Tip['category'], string> = {
  dakwah: 'Dakwah',
  infaq: 'Infaq',
  mencegah: 'Mencegah Kemungkaran',
  silaturahmi: 'Silaturahmi',
};

const CATEGORY_COLORS: Record<Tip['category'], { bg: string; text: string; border: string }> = {
  dakwah: { bg: 'rgba(13,94,63,0.1)', text: '#0d5e3f', border: 'rgba(13,94,63,0.2)' },
  infaq: { bg: 'rgba(201,168,76,0.1)', text: '#b8860b', border: 'rgba(201,168,76,0.25)' },
  mencegah: { bg: 'rgba(42,95,143,0.1)', text: '#2a5f8f', border: 'rgba(42,95,143,0.2)' },
  silaturahmi: { bg: 'rgba(232,93,4,0.08)', text: '#e85d04', border: 'rgba(232,93,4,0.15)' },
};

export default function InspirationScreen() {
  const { verse, hadith, tips } = getDailyContent(new Date());
  const [verseExpanded, setVerseExpanded] = useState(false);
  const [hadithExpanded, setHadithExpanded] = useState(false);
  const [savedVerse, setSavedVerse] = useState(false);
  const [savedHadith, setSavedHadith] = useState(false);

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#f5f0e8' }}>
      {/* Header */}
      <div
        className="px-5 pt-12 pb-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(150deg, #0d5e3f 0%, #0a4a31 100%)',
          borderBottomLeftRadius: '24px',
          borderBottomRightRadius: '24px',
        }}
      >
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle, #c9a84c, transparent)', transform: 'translate(20%, -20%)' }}
        />
        <div
          className="text-xs tracking-widest uppercase mb-2 relative z-10"
          style={{ color: 'rgba(201,168,76,0.8)', fontFamily: 'Poppins, sans-serif' }}
        >
          ✦ INSPIRASI HARI INI
        </div>
        <h1
          className="relative z-10"
          style={{
            color: '#ffffff',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '20px',
            fontWeight: 700,
            marginBottom: '4px',
          }}
        >
          Inspiration Hub
        </h1>
        <p
          className="relative z-10"
          style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}
        >
          Isi hati dengan cahaya ilmu dan hikmah
        </p>
      </div>

      <div className="px-4 pt-5 space-y-4">
        {/* Quran Verse Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a3328, #0d5e3f)',
            boxShadow: '0 6px 20px rgba(13,94,63,0.2)',
          }}
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(201,168,76,0.2)' }}
                >
                  <span className="text-base">📖</span>
                </div>
                <div>
                  <div
                    style={{ color: '#c9a84c', fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 600 }}
                  >
                    Ayat Al-Quran
                  </div>
                  <div
                    style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Poppins, sans-serif', fontSize: '10px' }}
                  >
                    {verse.reference}
                  </div>
                </div>
              </div>
              <div
                className="px-2.5 py-1 rounded-lg"
                style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.25)' }}
              >
                <span
                  style={{ color: '#c9a84c', fontFamily: 'Poppins, sans-serif', fontSize: '10px', fontWeight: 600 }}
                >
                  🌟 {verse.theme}
                </span>
              </div>
            </div>

            {/* Arabic Text */}
            <div
              className="text-right leading-loose mb-4 p-4 rounded-xl"
              style={{
                fontFamily: 'Amiri, serif',
                fontSize: '20px',
                color: 'rgba(255,255,255,0.95)',
                background: 'rgba(0,0,0,0.15)',
                lineHeight: 2.2,
              }}
            >
              {verse.arabic}
            </div>

            {/* Translation */}
            <AnimatePresence>
              {verseExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p
                    className="mb-3 leading-relaxed"
                    style={{
                      color: 'rgba(255,255,255,0.8)',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '12px',
                      lineHeight: 1.7,
                    }}
                  >
                    {verse.translation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => setVerseExpanded(!verseExpanded)}
                className="flex-1 py-2 rounded-xl text-xs transition-all active:scale-95"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.8)',
                  fontFamily: 'Poppins, sans-serif',
                  border: 'none',
                  outline: 'none',
                }}
              >
                {verseExpanded ? '▲ Sembunyikan Terjemahan' : '▼ Lihat Terjemahan'}
              </button>
              <button
                onClick={() => setSavedVerse(!savedVerse)}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
                style={{
                  background: savedVerse ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  outline: 'none',
                }}
              >
                <span className="text-base">{savedVerse ? '🔖' : '📌'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Hadith Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-5"
          style={{ background: '#ffffff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(201,168,76,0.12)' }}
              >
                <span className="text-base">🤲</span>
              </div>
              <div>
                <div
                  style={{ color: '#1c2b22', fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 600 }}
                >
                  Hadith Pilihan
                </div>
                <div
                  style={{ color: '#9ca3af', fontFamily: 'Poppins, sans-serif', fontSize: '10px' }}
                >
                  {hadith.source}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSavedHadith(!savedHadith)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-90"
              style={{
                background: savedHadith ? 'rgba(201,168,76,0.15)' : '#f5f0e8',
                border: 'none',
                outline: 'none',
              }}
            >
              <span className="text-sm">{savedHadith ? '🔖' : '📌'}</span>
            </button>
          </div>

          <div
            className="p-4 rounded-xl mb-3"
            style={{ background: '#f8f5ef', borderLeft: '3px solid #c9a84c' }}
          >
            <p
              className="leading-relaxed"
              style={{
                color: '#1c2b22',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '12px',
                lineHeight: 1.7,
                fontStyle: 'italic',
              }}
            >
              "{hadith.text}"
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(13,94,63,0.1)' }}
            >
              <span className="text-xs">👤</span>
            </div>
            <span
              style={{ color: '#0d5e3f', fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 500 }}
            >
              {hadith.narrator}
            </span>
          </div>
        </motion.div>

        {/* Tips Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3
              style={{ color: '#1c2b22', fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600 }}
            >
              💡 Ide Amalan Sosial
            </h3>
            <span
              style={{ color: '#9ca3af', fontFamily: 'Poppins, sans-serif', fontSize: '10px' }}
            >
              Cara praktis hari ini
            </span>
          </div>

          <div className="space-y-3">
            {tips.slice(0, 3).map((tip, i) => {
              const colors = CATEGORY_COLORS[tip.category];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="rounded-2xl p-4"
                  style={{
                    background: '#ffffff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: colors.bg }}
                    >
                      <span className="text-xl">{tip.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          style={{
                            color: '#1c2b22',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '12px',
                            fontWeight: 600,
                          }}
                        >
                          {tip.title}
                        </span>
                        <span
                          className="px-1.5 py-0.5 rounded-full text-[9px]"
                          style={{ background: colors.bg, color: colors.text, fontFamily: 'Poppins, sans-serif', border: `1px solid ${colors.border}` }}
                        >
                          {CATEGORY_LABELS[tip.category]}
                        </span>
                      </div>
                      <p
                        style={{
                          color: '#6b8f7d',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '11px',
                          lineHeight: 1.6,
                        }}
                      >
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dhikr Section */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
            border: '1.5px solid rgba(201,168,76,0.25)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🤲</span>
            <h3
              style={{ color: '#1c2b22', fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600 }}
            >
              Dzikir Harian
            </h3>
          </div>
          <div className="space-y-3">
            {[
              {
                arabic: 'سُبْحَانَ اللّهِ',
                transliteration: 'Subhanallah',
                meaning: 'Maha Suci Allah',
                count: '33x',
              },
              {
                arabic: 'الْحَمْدُ لِلّهِ',
                transliteration: 'Alhamdulillah',
                meaning: 'Segala Puji Bagi Allah',
                count: '33x',
              },
              {
                arabic: 'اللّهُ أَكْبَر',
                transliteration: 'Allahu Akbar',
                meaning: 'Allah Maha Besar',
                count: '33x',
              },
            ].map((dhikr) => (
              <div
                key={dhikr.arabic}
                className="flex items-center justify-between py-2 px-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.7)' }}
              >
                <div>
                  <div
                    style={{ fontFamily: 'Amiri, serif', fontSize: '16px', color: '#0d5e3f' }}
                  >
                    {dhikr.arabic}
                  </div>
                  <div
                    style={{ fontFamily: 'Poppins, sans-serif', fontSize: '10px', color: '#6b8f7d' }}
                  >
                    {dhikr.transliteration} · {dhikr.meaning}
                  </div>
                </div>
                <div
                  className="px-2.5 py-1 rounded-lg"
                  style={{ background: 'rgba(201,168,76,0.2)' }}
                >
                  <span
                    style={{ color: '#b8860b', fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 700 }}
                  >
                    {dhikr.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Dua */}
        <div
          className="rounded-2xl p-5 text-center"
          style={{ background: 'rgba(13,94,63,0.05)', border: '1px solid rgba(13,94,63,0.1)' }}
        >
          <div
            className="leading-loose mb-2"
            style={{ fontFamily: 'Amiri, serif', fontSize: '18px', color: '#0d5e3f' }}
          >
            رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ
          </div>
          <p
            style={{ color: '#6b8f7d', fontFamily: 'Poppins, sans-serif', fontSize: '11px' }}
          >
            "Ya Tuhan kami, terimalah (amal) dari kami. Sungguh, Engkaulah Yang Maha Mendengar, Maha Mengetahui."
          </p>
          <p
            className="mt-1"
            style={{ color: '#9ca3af', fontFamily: 'Poppins, sans-serif', fontSize: '10px' }}
          >
            QS. Al-Baqarah: 127
          </p>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
