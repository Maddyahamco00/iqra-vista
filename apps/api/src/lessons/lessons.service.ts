import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async findAll(level?: string) {
    const where = level ? { level: level as any } : {};
    return this.prisma.lesson.findMany({ where, orderBy: { order: 'asc' } });
  }

  async findOne(id: string) {
    return this.prisma.lesson.findUnique({ where: { id } });
  }

  async completeLesson(studentId: string, lessonId: string, score?: number) {
    return this.prisma.lessonCompletion.create({
      data: { studentId, lessonId, score },
    });
  }
}
