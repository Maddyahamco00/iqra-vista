import { PrismaClient } from '@prisma/client';
import { seedSurahs } from './surah.seed';
import { seedVerses } from './verse.seed';
import { seedTajweedRules } from './tajweed.seed';
import { seedLessons } from './lesson.seed';
import { seedTestUsers } from './user.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Seed in dependency order
  await seedSurahs(prisma);
  await seedVerses(prisma);
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
