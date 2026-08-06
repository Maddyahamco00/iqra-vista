import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AiPrincipalService {
  constructor(private prisma: PrismaService) {}

  async getInstitutionAnalytics() {
    const totalStudents = await this.prisma.student.count();
    const totalLessons = await this.prisma.lesson.count();
    const totalAssessments = await this.prisma.assessment.count();

    const levelDistribution = await this.prisma.student.groupBy({
      by: ['currentLevel'],
      _count: { currentLevel: true },
    });

    const strugglingStudents = await this.findStrugglingStudents();
    const popularLessons = await this.findPopularLessons();

    return {
      overview: { totalStudents, totalLessons, totalAssessments },
      levelDistribution,
      strugglingStudents,
      popularLessons,
      systemHealth: {
        aiInterviewAgent: 'operational',
        aiTeacherAgent: 'operational',
        aiPronunciationEngine: 'operational',
        database: 'operational',
      },
    };
  }

  private async findStrugglingStudents() {
    // Students with low progress scores
    const students = await this.prisma.student.findMany({
      include: { progress: true },
      take: 10,
    });

    return students
      .map(s => ({
        id: s.id,
        name: s.userId,
        avgScore: s.progress.length > 0
          ? s.progress.reduce((sum, p) => sum + p.score, 0) / s.progress.length
          : 0,
      }))
      .filter(s => s.avgScore < 60)
      .sort((a, b) => a.avgScore - b.avgScore);
  }

  private async findPopularLessons() {
    return this.prisma.lesson.findMany({
      include: { completions: true },
      orderBy: { completions: { _count: 'desc' } },
      take: 5,
    });
  }

  async generateReport(timeRange: 'daily' | 'weekly' | 'monthly') {
    return {
      timeRange,
      generatedAt: new Date(),
      summary: 'Institution performance report',
      recommendations: [
        'Create additional practice materials for Tajweed rules',
        'Schedule review sessions for struggling students',
        'Update curriculum based on completion rates',
      ],
    };
  }
}
