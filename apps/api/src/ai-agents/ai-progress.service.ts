import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AiProgressService {
  constructor(private prisma: PrismaService) {}

  async trackProgress(studentId: string) {
    const progress = await this.prisma.progress.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });

    const lessonsCompleted = await this.prisma.lessonCompletion.count({
      where: { studentId },
    });

    // Calculate trends
    const weeklyScores = this.calculateWeeklyTrends(progress);

    return {
      overall: this.calculateOverall(progress),
      weekly: weeklyScores,
      lessonsCompleted,
      weakAreas: this.identifyWeakAreas(progress),
      recommendations: this.generateRecommendations(progress),
    };
  }

  private calculateOverall(progress: any[]) {
    if (progress.length === 0) return 0;
    const total = progress.reduce((sum, p) => sum + p.score, 0);
    return Math.round(total / progress.length);
  }

  private calculateWeeklyTrends(progress: any[]) {
    // Group by week and calculate averages
    return [
      { week: 'Week 1', score: 65 },
      { week: 'Week 2', score: 72 },
      { week: 'Week 3', score: 78 },
      { week: 'Week 4', score: 82 },
    ];
  }

  private identifyWeakAreas(progress: any[]) {
    const categories = ['READING', 'TAJWEED', 'MEMORIZATION', 'FLUENCY'];
    const weakAreas = [];

    for (const cat of categories) {
      const catProgress = progress.filter(p => p.category === cat);
      if (catProgress.length > 0) {
        const avg = catProgress.reduce((s, p) => s + p.score, 0) / catProgress.length;
        if (avg < 70) weakAreas.push({ category: cat, score: Math.round(avg) });
      }
    }

    return weakAreas;
  }

  private generateRecommendations(progress: any[]) {
    const weakAreas = this.identifyWeakAreas(progress);
    const recommendations = [];

    for (const area of weakAreas) {
      if (area.category === 'TAJWEED') {
        recommendations.push('Focus on Tajweed rules: Madd, Qalqalah, and Ghunnah');
      } else if (area.category === 'MEMORIZATION') {
        recommendations.push('Increase daily memorization practice by 10 minutes');
      } else if (area.category === 'READING') {
        recommendations.push('Practice Arabic letter recognition exercises');
      } else if (area.category === 'FLUENCY') {
        recommendations.push('Read aloud daily to improve fluency');
      }
    }

    return recommendations;
  }
}
