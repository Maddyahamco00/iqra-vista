import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProgressService } from './progress.service';

@ApiTags('Progress')
@Controller('progress')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Get(':studentId')
  @ApiOperation({ summary: 'Get student progress history' })
  async getProgress(@Param('studentId') studentId: string) {
    return this.progressService.getProgress(studentId);
  }

  @Post(':studentId')
  @ApiOperation({ summary: 'Record new progress entry' })
  async recordProgress(
    @Param('studentId') studentId: string,
    @Body() body: { category: string; score: number; details?: any },
  ) {
    return this.progressService.recordProgress(studentId, body.category, body.score, body.details);
  }
}
