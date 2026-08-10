import { PrismaClient } from '@prisma/client';
import { fetchSurahList, fetchAllVerses } from './fetch-tanzil';
import { seedTajweedRules } from './tajweed.seed';
import { seedLessons } from './lesson.seed';
import { seedTestUsers } from './user.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Fetch and seed surah metadata + verses from verified source
  const surahs = await fetchSurahList();
  console.log(`📖 Found ${surahs.length} surahs`);

  for (const surah of surahs) {
    await prisma.verse.upsert({
      where: {
        surahNumber_ayahNumber: {
          surahNumber: surah.index,
          ayahNumber: 0,
        },
      },
      update: {},
      create: {
        surahNumber: surah.index,
        ayahNumber: 0,
        arabicText: surah.name,
        transliteration: surah.englishName,
        translation: `${surah.englishName} (${surah.verseCount} verses)`,
      },
    });
  }
  console.log(`✅ Seeded ${surahs.length} surah metadata rows`);

  const allVerses = await fetchAllVerses();
  for (const verse of allVerses) {
    await prisma.verse.upsert({
      where: {
        surahNumber_ayahNumber: {
          surahNumber: verse.surah,
          ayahNumber: verse.ayah,
        },
      },
      update: {},
      create: {
        surahNumber: verse.surah,
        ayahNumber: verse.ayah,
        arabicText: verse.text,
        transliteration: (verse as any).transliteration || '',
        translation: (verse as any).translation || '',
      },
    });
  }
  console.log(`✅ Seeded ${allVerses.length} verses`);

  await seedTajweedRules(prisma);
  await seedLessons(prisma);
  await seedTestUsers(prisma);

  console.log('✅ Database seed completed successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
