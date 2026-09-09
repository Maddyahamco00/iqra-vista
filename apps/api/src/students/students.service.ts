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

  // ── Today's Plan ─────────────────────────────────────────────────────────

  async getMeTodayPlan(userId: string) {
    const student = await this.prisma.student.findUnique({
      where: { userId },
      select: { id: true, currentLevel: true, lessonsCompleted: { select: { lessonId: true } } },
    });
    if (!student) throw new NotFoundException('Student profile not found');

    const completedIds = new Set(student.lessonsCompleted.map((lc) => lc.lessonId));

    // Fetch all lessons at student's level ordered by curriculum order
    const lessons = await this.prisma.lesson.findMany({
      where: { level: student.currentLevel },
      orderBy: { order: 'asc' },
    });

    // Split into incomplete (next up) and recently completed (for review)
    const incomplete = lessons.filter((l) => !completedIds.has(l.id)).slice(0, 4);
    const recentCompleted = lessons.filter((l) => completedIds.has(l.id)).slice(-1);

    const tasks = [...recentCompleted, ...incomplete].map((l) => ({
      id: l.id,
      title: l.title,
      type: l.type.toLowerCase() as string,
      completed: completedIds.has(l.id),
    }));

    return { tasks, level: student.currentLevel };
  }

  // ── Recent Performance ────────────────────────────────────────────────────

  async getMeRecentPerformance(userId: string) {
    const student = await this.prisma.student.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!student) throw new NotFoundException('Student profile not found');

    // Last 28 days of progress entries
    const since = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000);
    const entries = await this.prisma.progress.findMany({
      where: { studentId: student.id, createdAt: { gte: since } },
      orderBy: { createdAt: 'asc' },
      select: { score: true, createdAt: true, category: true },
    });

    // Aggregate by day — average score across all entries that day
    const dayMap = new Map<string, { total: number; count: number }>();
    for (const e of entries) {
      const day = e.createdAt.toISOString().split('T')[0];
      const bucket = dayMap.get(day) ?? { total: 0, count: 0 };
      bucket.total += e.score;
      bucket.count += 1;
      dayMap.set(day, bucket);
    }

    const points = Array.from(dayMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-7) // last 7 active days
      .map(([date, { total, count }]) => ({
        day: new Date(date + 'T12:00:00Z').toLocaleDateString('en-US', { weekday: 'short' }),
        score: Math.round(total / count),
        date,
      }));

    // Week-over-week delta: compare last 7 active days avg vs prior 7
    const allDays = Array.from(dayMap.entries()).sort(([a], [b]) => a.localeCompare(b));
    const last7 = allDays.slice(-7);
    const prev7 = allDays.slice(-14, -7);
    const avg = (days: typeof allDays) =>
      days.length === 0
        ? 0
        : Math.round(days.reduce((s, [, v]) => s + v.total / v.count, 0) / days.length);
    const weekDelta = avg(last7) - avg(prev7);

    return { points, weekDelta };
  }

  // ── Weak Areas ────────────────────────────────────────────────────────────

  async getMeWeakAreas(userId: string) {
    const student = await this.prisma.student.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!student) throw new NotFoundException('Student profile not found');

    // Last 30 days of progress per category
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const entries = await this.prisma.progress.findMany({
      where: { studentId: student.id, createdAt: { gte: since }, category: { not: 'OVERALL' as any } },
      select: { category: true, score: true },
    });

    // Average score per category
    const catMap = new Map<string, { total: number; count: number }>();
    for (const e of entries) {
      const bucket = catMap.get(e.category) ?? { total: 0, count: 0 };
      bucket.total += e.score;
      bucket.count += 1;
      catMap.set(e.category, bucket);
    }

    const RECOMMENDATIONS: Record<string, string> = {
      READING: 'Practice reading fluency with short Surahs',
      TAJWEED: 'Review Tajweed rules in the lesson library',
      MEMORIZATION: 'Use spaced repetition for new verses',
      FLUENCY: 'Record yourself and compare to the reference',
    };

    const weakAreas = Array.from(catMap.entries())
      .map(([cat, { total, count }]) => ({
        area: cat.charAt(0) + cat.slice(1).toLowerCase(),
        avgScore: Math.round(total / count),
        severity: total / count < 60 ? 'high' : 'medium',
        recommendation: RECOMMENDATIONS[cat] ?? 'Keep practising',
      }))
      .filter((a) => a.avgScore < 80) // only show areas that need work
      .sort((a, b) => a.avgScore - b.avgScore) // worst first
      .slice(0, 3);

    return { weakAreas };
  }

  // ── Progress Breakdown (per category) ─────────────────────────────────────

  async getMeProgressBreakdown(userId: string) {
    const student = await this.prisma.student.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!student) throw new NotFoundException('Student profile not found');

    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const entries = await this.prisma.progress.findMany({
      where: { studentId: student.id, createdAt: { gte: since } },
      select: { category: true, score: true },
    });

    const catMap = new Map<string, { total: number; count: number }>();
    for (const e of entries) {
      const bucket = catMap.get(e.category) ?? { total: 0, count: 0 };
      bucket.total += e.score;
      bucket.count += 1;
      catMap.set(e.category, bucket);
    }

    const DISPLAY_CATEGORIES = ['READING', 'TAJWEED', 'MEMORIZATION', 'FLUENCY'];
    const COLORS: Record<string, string> = {
      READING: '#1455B8',
      TAJWEED: '#16A6A0',
      MEMORIZATION: '#18A96B',
      FLUENCY: '#D9A441',
    };

    const breakdown = DISPLAY_CATEGORIES.map((cat) => {
      const data = catMap.get(cat);
      return {
        label: cat.charAt(0) + cat.slice(1).toLowerCase(),
        value: data ? Math.round(data.total / data.count) : 0,
        color: COLORS[cat],
      };
    });

    const overallData = catMap.get('OVERALL');
    const nonZero = breakdown.filter((b) => b.value > 0);
    const overall =
      overallData
        ? Math.round(overallData.total / overallData.count)
        : nonZero.length > 0
          ? Math.round(nonZero.reduce((s, b) => s + b.value, 0) / nonZero.length)
          : 0;

    return { breakdown, overall };
  }
}
