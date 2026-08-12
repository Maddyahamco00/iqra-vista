import { PrismaClient, LessonType, StudentLevel } from '@prisma/client';

/**
 * Curriculum structure referencing established Quran teaching frameworks.
 * Actual teaching content (explanations, tajweed rules, pronunciation guides)
 * must be populated from verified scholar-reviewed sources or generated
 * by the AI Teacher Agent from authenticated references.
 * 
 * Frameworks referenced:
 * - Noorani Qaida (Arabic alphabet & basic reading)
 * - Standard Madrasah Quran curriculum (surah progression)
 */

const beginnerLessons = [
  // Noorani Qaida Foundation (Letters 1-8)
  {
    title: 'Noorani Qaida: Lesson 1 - Alif to Kha',
    content: '[PENDING SCHOLAR REVIEW] Arabic alphabet letters 1-8. Reference: Noorani Qaida.',
    level: StudentLevel.BEGINNER,
    type: LessonType.READING,
    order: 1,
  },
  // Noorani Qaida Foundation (Letters 9-16)
  {
    title: 'Noorani Qaida: Lesson 2 - Dal to Sheen',
    content: '[PENDING SCHOLAR REVIEW] Arabic alphabet letters 9-16. Reference: Noorani Qaida.',
    level: StudentLevel.BEGINNER,
    type: LessonType.READING,
    order: 2,
  },
  // Noorani Qaida Foundation (Letters 17-24)
  {
    title: 'Noorani Qaida: Lesson 3 - Sad to Qaf',
    content: '[PENDING SCHOLAR REVIEW] Arabic alphabet letters 17-24. Reference: Noorani Qaida.',
    level: StudentLevel.BEGINNER,
    type: LessonType.READING,
    order: 3,
  },
  // Noorani Qaida Foundation (Letters 25-28 + Review)
  {
    title: 'Noorani Qaida: Lesson 4 - Kaf to Ya & Review',
    content: '[PENDING SCHOLAR REVIEW] Arabic alphabet letters 25-28 and full alphabet review. Reference: Noorani Qaida.',
    level: StudentLevel.BEGINNER,
    type: LessonType.READING,
    order: 4,
  },
  // Surah Al-Fatihah - Verified verse references only
  {
    title: 'Surah Al-Fatihah (1): Ayah 1',
    content: '[PENDING SCHOLAR REVIEW] Reference: Surah Al-Fatihah, Ayah 1. Tajweed notes to be added by verified Ustadh.',
    surahId: '1',
    verseRange: '1:1',
    level: StudentLevel.BEGINNER,
    type: LessonType.READING,
    order: 5,
  },
  {
    title: 'Surah Al-Fatihah (1): Ayah 2',
    content: '[PENDING SCHOLAR REVIEW] Reference: Surah Al-Fatihah, Ayah 2. Tajweed notes to be added by verified Ustadh.',
    surahId: '1',
    verseRange: '1:2',
    level: StudentLevel.BEGINNER,
    type: LessonType.READING,
    order: 6,
  },
  {
    title: 'Surah Al-Fatihah (1): Ayat 3-4',
    content: '[PENDING SCHOLAR REVIEW] Reference: Surah Al-Fatihah, Ayat 3-4. Tajweed notes to be added by verified Ustadh.',
    surahId: '1',
    verseRange: '1:3-4',
    level: StudentLevel.BEGINNER,
    type: LessonType.READING,
    order: 7,
  },
  {
    title: 'Surah Al-Fatihah (1): Ayah 5',
    content: '[PENDING SCHOLAR REVIEW] Reference: Surah Al-Fatihah, Ayah 5. Tajweed notes to be added by verified Ustadh.',
    surahId: '1',
    verseRange: '1:5',
    level: StudentLevel.BEGINNER,
    type: LessonType.READING,
    order: 8,
  },
  {
    title: 'Surah Al-Fatihah (1): Ayah 6',
    content: '[PENDING SCHOLAR REVIEW] Reference: Surah Al-Fatihah, Ayah 6. Tajweed notes to be added by verified Ustadh.',
    surahId: '1',
    verseRange: '1:6',
    level: StudentLevel.BEGINNER,
    type: LessonType.READING,
    order: 9,
  },
  {
    title: 'Surah Al-Fatihah (1): Ayah 7',
    content: '[PENDING SCHOLAR REVIEW] Reference: Surah Al-Fatihah, Ayah 7. Tajweed notes to be added by verified Ustadh.',
    surahId: '1',
    verseRange: '1:7',
    level: StudentLevel.BEGINNER,
    type: LessonType.READING,
    order: 10,
  },
];

const intermediateLessons = [
  {
    title: 'Tajweed Foundation: Madd Rules (Al-Madd)',
    content: '[PENDING SCHOLAR REVIEW] Reference: Verified tajweed texts on Madd rules. To be reviewed by Ustadh.',
    level: StudentLevel.INTERMEDIATE,
    type: LessonType.TAJWEED,
    order: 11,
  },
  {
    title: 'Tajweed Foundation: Qalqalah',
    content: '[PENDING SCHOLAR REVIEW] Reference: Verified tajweed texts on Qalqalah letters. To be reviewed by Ustadh.',
    level: StudentLevel.INTERMEDIATE,
    type: LessonType.TAJWEED,
    order: 12,
  },
  {
    title: 'Surah Al-Mulk (67): Ayat 1-5',
    content: '[PENDING SCHOLAR REVIEW] Reference: Surah Al-Mulk, Ayat 1-5. Tajweed notes to be added by verified Ustadh.',
    surahId: '67',
    verseRange: '67:1-5',
    level: StudentLevel.INTERMEDIATE,
    type: LessonType.READING,
    order: 13,
  },
  {
    title: 'Surah Al-Mulk (67): Ayat 6-15',
    content: '[PENDING SCHOLAR REVIEW] Reference: Surah Al-Mulk, Ayat 6-15. Tajweed notes to be added by verified Ustadh.',
    surahId: '67',
    verseRange: '67:6-15',
    level: StudentLevel.INTERMEDIATE,
    type: LessonType.READING,
    order: 14,
  },
  {
    title: 'Surah Al-Mulk (67): Ayat 16-26',
    content: '[PENDING SCHOLAR REVIEW] Reference: Surah Al-Mulk, Ayat 16-26. Tajweed notes to be added by verified Ustadh.',
    surahId: '67',
    verseRange: '67:16-26',
    level: StudentLevel.INTERMEDIATE,
    type: LessonType.READING,
    order: 15,
  },
];

const advancedLessons = [
  {
    title: 'Memorization Technique: Spaced Repetition for Hifz',
    content: '[PENDING SCHOLAR REVIEW] Reference: Verified memorization methodology. To be reviewed by Ustadh.',
    level: StudentLevel.ADVANCED,
    type: LessonType.MEMORIZATION,
    order: 16,
  },
  {
    title: 'Surah Al-Ikhlas (112): Complete Surah',
    content: '[PENDING SCHOLAR REVIEW] Reference: Surah Al-Ikhlas, Ayat 1-4. Tajweed notes to be added by verified Ustadh.',
    surahId: '112',
    verseRange: '112:1-4',
    level: StudentLevel.ADVANCED,
    type: LessonType.MEMORIZATION,
    order: 17,
  },
  {
    title: 'Advanced Tajweed: Idgham & Ikhfa Rules',
    content: '[PENDING SCHOLAR REVIEW] Reference: Verified tajweed texts on Idgham and Ikhfa. To be reviewed by Ustadh.',
    level: StudentLevel.ADVANCED,
    type: LessonType.TAJWEED,
    order: 18,
  },
];

// Combine and update the seed loop
const allLessons = [...beginnerLessons, ...intermediateLessons, ...advancedLessons];

export async function seedLessons(prisma: PrismaClient) {
  console.log('📖 Seeding lesson structure...');

  for (const lesson of allLessons) {
    await prisma.lesson.upsert({
      where: {
        id: `lesson-beginner-${lesson.order}`,
      },
      update: {},
      create: {
        id: `lesson-beginner-${lesson.order}`,
        ...lesson,
      },
    });
  }

  console.log(`✅ Seeded ${allLessons.length} lesson structures (10 beginner + 5 intermediate + 3 advanced)`);
  console.log('⚠️  NOTE: All lesson content marked [PENDING SCHOLAR REVIEW]');
  console.log('   A verified Ustadh must review and replace placeholder content before launch.');
}
