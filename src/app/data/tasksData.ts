export type Tier = 'beginner' | 'intermediate' | 'advanced';
export type Category = 'habluminallah' | 'habluminannas';

export interface TaskDefinition {
  id: string;
  category: Category;
  name: string;
  arabicName: string;
  description: string;
  icon: string;
  unit: string;
  getTarget: (tier: Tier) => number | null;
  xpPerUnit: number;
  color: string;
}

export interface DailyTask {
  id: string;
  category: Category;
  name: string;
  arabicName: string;
  description: string;
  icon: string;
  unit: string;
  target: number;
  current: number;
  xpPerUnit: number;
  color: string;
}

export const taskDefinitions: TaskDefinition[] = [
  // Habluminallah
  {
    id: 'solat_fardhu',
    category: 'habluminallah',
    name: 'Solat Fardhu',
    arabicName: 'الصلاة الفريضة',
    description: '5 waktu solat wajib sehari',
    icon: '🕌',
    unit: 'waktu',
    getTarget: () => 5,
    xpPerUnit: 15,
    color: '#0d5e3f',
  },
  {
    id: 'solat_sunat',
    category: 'habluminallah',
    name: 'Solat Sunat',
    arabicName: 'صلاة السنة',
    description: 'Solat sunat rawatib atau witir',
    icon: '🌙',
    unit: 'rakaat',
    getTarget: (t) => (t === 'beginner' ? null : t === 'intermediate' ? 4 : 12),
    xpPerUnit: 8,
    color: '#1a7a55',
  },
  {
    id: 'tahajjud',
    category: 'habluminallah',
    name: 'Tahajjud',
    arabicName: 'قيام الليل',
    description: 'Solat malam setelah tidur',
    icon: '⭐',
    unit: 'rakaat',
    getTarget: (t) => (t === 'advanced' ? 8 : null),
    xpPerUnit: 12,
    color: '#2a5f8f',
  },
  {
    id: 'tilawah',
    category: 'habluminallah',
    name: 'Tilawah Al-Quran',
    arabicName: 'تلاوة القرآن',
    description: 'Membaca Al-Quran',
    icon: '📖',
    unit: 'halaman',
    getTarget: (t) => (t === 'beginner' ? 1 : t === 'intermediate' ? 3 : 5),
    xpPerUnit: 10,
    color: '#0d5e3f',
  },
  {
    id: 'dzikir',
    category: 'habluminallah',
    name: 'Dzikir Pagi & Petang',
    arabicName: 'الأذكار',
    description: 'Dzikir subuh dan asar',
    icon: '🤲',
    unit: 'sesi',
    getTarget: (t) => (t === 'beginner' ? 1 : 2),
    xpPerUnit: 8,
    color: '#1a7a55',
  },
  {
    id: 'puasa_sunat',
    category: 'habluminallah',
    name: 'Puasa Sunat',
    arabicName: 'صيام التطوع',
    description: 'Puasa sunat Senin-Kamis',
    icon: '🌅',
    unit: 'hari',
    getTarget: (t) => (t === 'advanced' ? 1 : null),
    xpPerUnit: 20,
    color: '#2a5f8f',
  },
  // Habluminannas
  {
    id: 'infaq',
    category: 'habluminannas',
    name: 'Infaq & Sedekah',
    arabicName: 'الإنفاق والصدقة',
    description: 'Bersedekah atau berinfaq',
    icon: '💰',
    unit: 'kali',
    getTarget: () => 1,
    xpPerUnit: 15,
    color: '#c9a84c',
  },
  {
    id: 'dakwah',
    category: 'habluminannas',
    name: 'Dakwah & Amar Makruf',
    arabicName: 'الدعوة والأمر بالمعروف',
    description: 'Mengajak kebaikan atau berbagi ilmu',
    icon: '📢',
    unit: 'kali',
    getTarget: (t) => (t === 'beginner' ? null : t === 'intermediate' ? 1 : 2),
    xpPerUnit: 15,
    color: '#c9a84c',
  },
  {
    id: 'mencegah_kemungkaran',
    category: 'habluminannas',
    name: 'Mencegah Kemungkaran',
    arabicName: 'النهي عن المنكر',
    description: 'Mencegah atau menghindari kemungkaran',
    icon: '🛡️',
    unit: 'kali',
    getTarget: (t) => (t === 'advanced' ? 1 : null),
    xpPerUnit: 20,
    color: '#b8860b',
  },
  {
    id: 'silaturahmi',
    category: 'habluminannas',
    name: 'Silaturahmi',
    arabicName: 'صلة الرحم',
    description: 'Menghubungi keluarga atau sahabat',
    icon: '👥',
    unit: 'orang',
    getTarget: (t) => (t === 'beginner' ? 1 : 2),
    xpPerUnit: 10,
    color: '#c9a84c',
  },
  {
    id: 'kajian',
    category: 'habluminannas',
    name: 'Kajian Ilmu',
    arabicName: 'طلب العلم',
    description: 'Menghadiri kajian atau ceramah',
    icon: '🎓',
    unit: 'jam',
    getTarget: (t) => (t === 'beginner' ? null : t === 'intermediate' ? 1 : 2),
    xpPerUnit: 10,
    color: '#b8860b',
  },
];

export function generateDailyTasks(tier: Tier): DailyTask[] {
  return taskDefinitions
    .map((def) => {
      const target = def.getTarget(tier);
      if (target === null) return null;
      return {
        id: def.id,
        category: def.category,
        name: def.name,
        arabicName: def.arabicName,
        description: def.description,
        icon: def.icon,
        unit: def.unit,
        target,
        current: 0,
        xpPerUnit: def.xpPerUnit,
        color: def.color,
      };
    })
    .filter(Boolean) as DailyTask[];
}
