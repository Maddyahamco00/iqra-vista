import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AssessmentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.assessment.create({ data });
  }

  async findByStudent(studentId: string) {
    return this.prisma.assessment.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
