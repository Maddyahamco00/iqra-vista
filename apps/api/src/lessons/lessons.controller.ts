import { Controller, Get, Param, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LessonsService } from './lessons.service';

@ApiTags('Lessons')
@Controller('lessons')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all lessons (optionally filtered by level)' })
  async findAll(@Query('level') level?: string) {
    return this.lessonsService.findAll(level);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lesson by ID' })
  async findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Mark lesson as completed' })
  async complete(
    @Param('id') lessonId: string,
    @Body() body: { studentId: string; score?: number },
  ) {
    return this.lessonsService.completeLesson(body.studentId, lessonId, body.score);
  }
}
