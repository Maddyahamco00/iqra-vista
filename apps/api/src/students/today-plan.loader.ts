import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Level, PlannerInput, PlannerLesson, WeakArea } from './today-plan.algorithm';

@Injectable()
export class TodayPlanLoader {
  constructor(private readonly prisma: PrismaService) {}

  async load(studentId: string, date: string): Promise<PlannerInput> {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
      include: { user: true },
    });
    if (!student) {
      throw new Error('STUDENT_NOT_FOUND'); // StudentsService already throws NotFoundException
    }

    // Map these three queries to existing tables. If a table is missing, return [] / null.
    const [mastery, lessons, progress] = await Promise.all([
      this.loadMastery(studentId),
      this.loadLessons(),
      this.loadProgress(studentId),
    ]);

    const completed = progress.filter((p) => p.completedAt);
    const last = completed.sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())[0];
    const lastLesson = last ? lessons.find((l) => l.id === last.lessonId) : undefined;

    return {
      studentId,
      date,
      level: student.currentLevel as Level,
      weakAreas: mastery,
      lastCompletedLesson: lastLesson
        ? { id: lastLesson.id, title: lastLesson.title, order: lastLesson.order }
        : null,
      lessons,
      completedLessonIds: completed.map((p) => p.lessonId),
    };
  }

  private async loadMastery(studentId: string): Promise<WeakArea[]> {
    const progress = await this.prisma.progress.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });
    const latest = new Map<string, number>();
    for (const p of progress) {
      if (!latest.has(p.category)) {
        latest.set(p.category, p.score);
      }
    }
    return Array.from(latest.entries()).map(([cat, score]) => ({
      skillId: cat,
      skillName: cat,
      score,
    }));
  }

  private async loadLessons(): Promise<PlannerLesson[]> {
    const lessons = await this.prisma.lesson.findMany();
    return lessons.map(l => ({
      id: l.id,
      title: l.title,
      skillId: l.type,
      skillName: l.type,
      level: l.level as Level,
      order: l.order,
      estimatedMinutes: 15,
    }));
  }

  private async loadProgress(studentId: string): Promise<Array<{ lessonId: string; completedAt: Date }>> {
    const completions = await this.prisma.lessonCompletion.findMany({
      where: { studentId },
    });
    return completions.map(c => ({
      lessonId: c.lessonId,
      completedAt: c.completedAt,
    }));
  }
}
