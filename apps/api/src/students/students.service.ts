import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { calculateStreakFromDates } from './streak.utils';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.student.findMany({
      include: { user: true, progress: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.student.findUnique({
      where: { id },
      include: { user: true, progress: true, assessments: true, lessonsCompleted: true },
    });
  }

  async getDashboard(id: string) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, email: true } },
        progress: { orderBy: { createdAt: 'desc' }, take: 30 },
        lessonsCompleted: { orderBy: { completedAt: 'desc' }, take: 10 },
        assessments: { orderBy: { createdAt: 'desc' }, take: 1 },
        _count: { select: { lessonsCompleted: true, progress: true } },
      },
    });

    if (!student) throw new NotFoundException('Student not found');

    const totalLessons = await this.prisma.lesson.count();
    const completedLessons = student._count.lessonsCompleted;
    const accuracy = student.assessments[0]?.score || 0;
    const streak = this.calculateStreak(student.progress);
    const practiceTime = this.formatPracticeTime(student._count.progress * 15);

    return {
      name: student.user.name,
      level: student.currentLevel,
      streak,
      totalLessons,
      completedLessons,
      practiceTime,
      accuracy,
      recentProgress: student.progress.slice(0, 7).map((p) => ({
        date: p.createdAt,
        score: p.score,
        category: p.category,
      })),
    };
  }

  private calculateStreak(progress: any[]): number {
    if (progress.length === 0) return 0;
    const dates = [...new Set(progress.map((p) =>
      new Date(p.createdAt).toISOString().split('T')[0]
    ))].sort().reverse();

    let streak = 0;
    for (let i = 0; i < dates.length; i++) {
      const expected = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
      if (dates[i] === expected) streak++;
      else break;
    }
    return streak;
  }

  private formatPracticeTime(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  async update(id: string, data: any) {
    return this.prisma.student.update({ where: { id }, data });
  }

  // ── /me routes — resolve student by JWT userId ──────────────────────────

  async getMe(userId: string) {
    const student = await this.prisma.student.findUnique({
      where: { userId },
      include: { user: { select: { name: true, email: true, avatar: true } } },
    });
    if (!student) throw new NotFoundException('Student profile not found');

    return {
      id: student.id,
      fullName: student.user.name,
      email: student.user.email,
      avatarUrl: student.user.avatar ?? null,
      gradeLevel: student.currentLevel,
      joinDate: student.createdAt.toISOString(),
    };
  }

  async getMeProgress(userId: string) {
    const student = await this.prisma.student.findUnique({
      where: { userId },
      select: { id: true, progress: true, lessonsCompleted: true, assessments: { orderBy: { createdAt: 'desc' }, take: 1 } },
    });
    if (!student) throw new NotFoundException('Student profile not found');

    const totalLessons = await this.prisma.lesson.count();
    const totalLessonsCompleted = student.lessonsCompleted.length;

    const averageScore =
      student.assessments.length > 0 ? (student.assessments[0].score ?? 0) : 0;

    const lastCompletion = student.lessonsCompleted.reduce<Date | null>((latest, lc) => {
      return !latest || lc.completedAt > latest ? lc.completedAt : latest;
    }, null);

    const dates = [...new Set(
      student.progress.map((p) => p.createdAt.toISOString().split('T')[0]),
    )].sort().reverse();

    const { currentStreak, longestStreak } = calculateStreakFromDates(dates);

    return {
      totalLessonsCompleted,
      totalLessons,
      currentStreakDays: currentStreak,
      longestStreakDays: longestStreak,
      averageScore,
      lastActiveAt: lastCompletion ? lastCompletion.toISOString() : null,
    };
  }

  async getMeProgressHistory(userId: string, from: string) {
    const student = await this.prisma.student.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!student) throw new NotFoundException('Student profile not found');

    const fromDate = from ? new Date(from) : new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const toDate = new Date();

    // Fetch all progress entries in range (each entry ≈ 15 min of practice)
    const progressEntries = await this.prisma.progress.findMany({
      where: { studentId: student.id, createdAt: { gte: fromDate, lte: toDate } },
      select: { createdAt: true },
    });

    // Fetch all lesson completions in range
    const completions = await this.prisma.lessonCompletion.findMany({
      where: { studentId: student.id, completedAt: { gte: fromDate, lte: toDate } },
      select: { completedAt: true },
    });

    // Aggregate into per-day buckets
    const buckets = new Map<string, { lessonsCompleted: number; minutesActive: number }>();

    for (const entry of progressEntries) {
      const date = entry.createdAt.toISOString().split('T')[0];
      const bucket = buckets.get(date) ?? { lessonsCompleted: 0, minutesActive: 0 };
      bucket.minutesActive += 15; // each progress entry ≈ 15 min
      buckets.set(date, bucket);
    }

    for (const lc of completions) {
      const date = lc.completedAt.toISOString().split('T')[0];
      const bucket = buckets.get(date) ?? { lessonsCompleted: 0, minutesActive: 0 };
      bucket.lessonsCompleted += 1;
      buckets.set(date, bucket);
    }

    const records = Array.from(buckets.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, vals]) => ({ date, ...vals }));

    return {
      records,
      from: fromDate.toISOString().split('T')[0],
      to: toDate.toISOString().split('T')[0],
    };
  }
}
