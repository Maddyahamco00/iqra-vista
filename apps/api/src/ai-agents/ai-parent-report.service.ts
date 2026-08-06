import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AiParentReportService {
  constructor(private prisma: PrismaService) {}

  async generateDailyReport(studentId: string) {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
      include: { user: true, progress: true, lessonsCompleted: true },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayProgress = student?.progress.filter(
      p => new Date(p.createdAt) >= today
    ) || [];

    return {
      date: new Date(),
      studentName: student?.user?.name || 'Student',
      attendance: todayProgress.length > 0,
      practiceTime: '35 minutes',
      lessonsCompleted: todayProgress.length,
      improvement: 'Better pronunciation of ع',
      nextFocus: 'Surah Al-Mulk verses 1-10',
      overallScore: todayProgress.length > 0
        ? Math.round(todayProgress.reduce((s, p) => s + p.score, 0) / todayProgress.length)
        : 0,
    };
  }

  async generateWeeklyReport(studentId: string) {
    const dailyReports = [];
    for (let i = 0; i < 7; i++) {
      // Generate mock daily summaries
      dailyReports.push({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        practiceTime: Math.floor(Math.random() * 60) + 10,
        score: Math.floor(Math.random() * 30) + 60,
      });
    }

    return {
      weekOf: new Date(),
      dailyReports,
      totalPracticeTime: dailyReports.reduce((s, d) => s + d.practiceTime, 0),
      averageScore: Math.round(dailyReports.reduce((s, d) => s + d.score, 0) / 7),
      achievements: ['7 Day Streak', 'Completed Surah Al-Fatihah'],
      areasForImprovement: ['Madd Rules', 'Qalqalah'],
      teacherNote: 'Keep up the consistent practice! Focus on the areas marked for improvement.',
    };
  }
}
