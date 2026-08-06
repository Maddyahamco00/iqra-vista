import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async recordProgress(studentId: string, category: string, score: number, details?: any) {
    return this.prisma.progress.create({
      data: { studentId, category: category as any, score, details },
    });
  }

  async getProgress(studentId: string) {
    return this.prisma.progress.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
