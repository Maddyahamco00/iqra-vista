import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

export async function seedTestUsers(prisma: PrismaClient) {
  console.log('👤 Seeding test users...');

  const password = await bcrypt.hash('TestPass123', 12);

  // 1. Test Admin (Maddyahamco / School Owner)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@iqravista.com' },
    update: {},
    create: {
      email: 'admin@iqravista.com',
      password,
      name: 'Maddyahamco Admin',
      role: UserRole.ADMIN,
    },
  });

  await prisma.admin.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      permissions: ['ALL'],
    },
  });

  console.log('✅ Admin user: admin@iqravista.com / TestPass123');

  // 2. Test Parent
  const parentUser = await prisma.user.upsert({
    where: { email: 'parent@test.com' },
    update: {},
    create: {
      email: 'parent@test.com',
      password,
      name: 'Test Parent',
      role: UserRole.PARENT,
    },
  });

  const parent = await prisma.parent.upsert({
    where: { userId: parentUser.id },
    update: {},
    create: {
      userId: parentUser.id,
    },
  });

  console.log('✅ Parent user: parent@test.com / TestPass123');

  // 3. Test Student (linked to parent)
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@test.com' },
    update: {},
    create: {
      email: 'student@test.com',
      password,
      name: 'Ahmed Test',
      role: UserRole.STUDENT,
    },
  });

  await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      userId: studentUser.id,
      age: 10,
      currentLevel: 'BEGINNER',
      learningGoal: 'Complete Surah Al-Fatihah with proper Tajweed',
      preferredTime: 'Evening',
      parentId: parent.id,
    },
  });

  console.log('✅ Student user: student@test.com / TestPass123');
  console.log('✅ Test users seeded successfully');
}
