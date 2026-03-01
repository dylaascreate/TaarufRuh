export interface Verse {
  arabic: string;
  translation: string;
  reference: string;
  theme: string;
}

export interface Hadith {
  text: string;
  source: string;
  narrator: string;
}

export interface Tip {
  title: string;
  description: string;
  icon: string;
  category: 'dakwah' | 'infaq' | 'mencegah' | 'silaturahmi';
}

export const verses: Verse[] = [
  {
    arabic: 'شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ وَبَيِّنَاتٍ مِّنَ الْهُدَىٰ وَالْفُرْقَانِ',
    translation: 'Bulan Ramadan adalah bulan yang di dalamnya diturunkan Al-Quran, sebagai petunjuk bagi manusia dan penjelasan-penjelasan mengenai petunjuk itu.',
    reference: 'QS. Al-Baqarah: 185',
    theme: 'Ramadan',
  },
  {
    arabic: 'وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا ۚ وَإِنَّ اللَّهَ لَمَعَ الْمُحْسِنِينَ',
    translation: 'Dan orang-orang yang berjihad untuk (mencari keridhaan) Kami, benar-benar akan Kami tunjukkan kepada mereka jalan-jalan Kami. Dan sungguh, Allah beserta orang-orang yang berbuat baik.',
    reference: 'QS. Al-Ankabut: 69',
    theme: 'Istiqamah',
  },
  {
    arabic: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
    translation: 'Sesungguhnya Allah beserta orang-orang yang sabar.',
    reference: 'QS. Al-Baqarah: 153',
    theme: 'Kesabaran',
  },
  {
    arabic: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ',
    translation: 'Dan laksanakanlah salat, tunaikanlah zakat, dan rukuklah beserta orang-orang yang rukuk.',
    reference: 'QS. Al-Baqarah: 43',
    theme: 'Solat & Zakat',
  },
  {
    arabic: 'كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ تَأْمُرُونَ بِالْمَعْرُوفِ وَتَنْهَوْنَ عَنِ الْمُنكَرِ',
    translation: 'Kamu adalah umat yang terbaik yang dilahirkan untuk manusia, menyuruh kepada yang makruf, dan mencegah dari yang mungkar.',
    reference: 'QS. Ali Imran: 110',
    theme: 'Amar Makruf',
  },
  {
    arabic: 'وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ ۖ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ',
    translation: 'Dan tolong-menolonglah kamu dalam kebajikan dan takwa, dan jangan tolong-menolong dalam berbuat dosa dan permusuhan.',
    reference: 'QS. Al-Maidah: 2',
    theme: 'Kerjasama',
  },
  {
    arabic: 'مَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ',
    translation: 'Perumpamaan orang-orang yang menginfakkan hartanya di jalan Allah adalah seperti sebutir biji yang menumbuhkan tujuh tangkai.',
    reference: 'QS. Al-Baqarah: 261',
    theme: 'Infaq',
  },
  {
    arabic: 'وَاذْكُر رَّبَّكَ كَثِيرًا وَسَبِّحْ بِالْعَشِيِّ وَالْإِبْكَارِ',
    translation: 'Dan sebutlah (nama) Tuhanmu sebanyak-banyaknya serta bertasbihlah di waktu petang dan pagi hari.',
    reference: 'QS. Ali Imran: 41',
    theme: 'Dzikir',
  },
  {
    arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
    translation: 'Wahai orang-orang yang beriman! Diwajibkan atas kamu berpuasa sebagaimana diwajibkan atas orang-orang sebelum kamu agar kamu bertakwa.',
    reference: 'QS. Al-Baqarah: 183',
    theme: 'Puasa',
  },
  {
    arabic: 'وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ',
    translation: 'Dan Aku tidak menciptakan jin dan manusia melainkan supaya mereka mengabdi kepada-Ku.',
    reference: 'QS. Adz-Dzariyat: 56',
    theme: 'Ibadah',
  },
];

export const hadiths: Hadith[] = [
  {
    text: 'Sesungguhnya amalan-amalan itu tergantung niatnya, dan setiap orang mendapat (balasan) sesuai apa yang ia niatkan.',
    source: 'HR. Bukhari & Muslim',
    narrator: 'Umar bin Khattab RA',
  },
  {
    text: 'Amalan yang paling dicintai Allah adalah amalan yang dilakukan secara terus-menerus walaupun sedikit.',
    source: 'HR. Bukhari & Muslim',
    narrator: 'Aisyah RA',
  },
  {
    text: 'Barang siapa yang menginginkan kebaikan di dunia dan akhirat, maka hendaknya ia menuntut ilmu.',
    source: 'HR. Tirmidzi',
    narrator: 'Anas bin Malik RA',
  },
  {
    text: 'Sebaik-baik manusia adalah yang paling bermanfaat bagi orang lain.',
    source: 'HR. Ahmad & Thabrani',
    narrator: 'Jabir bin Abdillah RA',
  },
  {
    text: 'Senyummu di hadapan saudaramu adalah sedekah.',
    source: 'HR. Tirmidzi',
    narrator: 'Abu Dzar RA',
  },
  {
    text: 'Barang siapa beriman kepada Allah dan hari akhir, hendaknya ia memuliakan tamunya. Dan barang siapa beriman kepada Allah dan hari akhir, hendaknya ia menyambung silaturahmi.',
    source: 'HR. Bukhari & Muslim',
    narrator: 'Abu Hurairah RA',
  },
  {
    text: 'Sesungguhnya di bulan Ramadan ada satu malam yang lebih baik dari seribu bulan. Barang siapa yang terhalang dari kebaikannya, maka sungguh ia telah terhalang.',
    source: 'HR. Ahmad, Nasa\'i, Ibnu Majah',
    narrator: 'Anas bin Malik RA',
  },
  {
    text: 'Jagalah Allah, niscaya Allah akan menjagamu. Jagalah Allah, niscaya engkau akan mendapati-Nya di hadapanmu.',
    source: 'HR. Tirmidzi',
    narrator: 'Ibnu Abbas RA',
  },
  {
    text: 'Tangan di atas lebih baik daripada tangan di bawah. Tangan di atas adalah yang memberi, dan tangan di bawah adalah yang meminta.',
    source: 'HR. Bukhari & Muslim',
    narrator: 'Ibnu Umar RA',
  },
  {
    text: 'Orang yang kuat bukanlah orang yang menang dalam gulat, melainkan orang yang mampu mengendalikan dirinya ketika marah.',
    source: 'HR. Bukhari & Muslim',
    narrator: 'Abu Hurairah RA',
  },
];

export const tips: Tip[] = [
  {
    title: 'Dakwah via Media Sosial',
    description: 'Bagikan satu postingan islami hari ini—hadith, ayat, atau kisah inspiratif yang bermanfaat bagi followers kamu.',
    icon: '📱',
    category: 'dakwah',
  },
  {
    title: 'Dakwah dengan Keteladanan',
    description: 'Tunjukkan akhlak mulia di tempat kerja atau sekolah. Satu perbuatan baik lebih kuat dari seribu kata.',
    icon: '✨',
    category: 'dakwah',
  },
  {
    title: 'Infaq di Kotak Amal',
    description: 'Sisihkan Rp 5.000-10.000 hari ini untuk dimasukkan ke kotak amal masjid atau lembaga sosial.',
    icon: '🏦',
    category: 'infaq',
  },
  {
    title: 'Belikan Makan untuk Tetangga',
    description: 'Saat berbuka atau sahur, beli sedikit lebih banyak untuk diberikan kepada tetangga yang membutuhkan.',
    icon: '🍱',
    category: 'infaq',
  },
  {
    title: 'Ajarkan Ilmu kepada Anak',
    description: 'Luangkan 10 menit mengajarkan satu doa atau satu ayat kepada anak, adik, atau keponakan.',
    icon: '👶',
    category: 'dakwah',
  },
  {
    title: 'Hindari Ghibah',
    description: 'Ketika percakapan mengarah ke ghibah, ubah topik atau tinggalkan dengan sopan. Ini adalah bentuk mencegah kemungkaran.',
    icon: '🤐',
    category: 'mencegah',
  },
  {
    title: 'Hubungi Orang Tua',
    description: 'Telepon atau kirim pesan kepada orang tua dan tanyakan kabar mereka. Lima menit sudah cukup.',
    icon: '📞',
    category: 'silaturahmi',
  },
  {
    title: 'Kunjungi Kerabat',
    description: 'Jadwalkan kunjungan kepada kerabat yang sudah lama tidak dikunjungi, terutama yang sakit atau yang tinggal sendirian.',
    icon: '🏠',
    category: 'silaturahmi',
  },
];

export function getDailyContent(date: Date) {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return {
    verse: verses[dayOfYear % verses.length],
    hadith: hadiths[dayOfYear % hadiths.length],
    tips: tips.slice((dayOfYear * 2) % tips.length, (dayOfYear * 2) % tips.length + 3).concat(
      tips.slice(0, Math.max(0, 3 - (tips.length - (dayOfYear * 2) % tips.length)))
    ),
  };
}
