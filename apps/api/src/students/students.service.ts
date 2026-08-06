import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

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

  async update(id: string, data: any) {
    return this.prisma.student.update({ where: { id }, data });
  }
}
