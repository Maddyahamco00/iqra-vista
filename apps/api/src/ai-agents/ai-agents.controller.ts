import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AiInterviewService } from './ai-interview.service';
import { AiTeacherService } from './ai-teacher.service';
import { AiPronunciationService } from './ai-pronunciation.service';
import { AiProgressService } from './ai-progress.service';
import { AiPrincipalService } from './ai-principal.service';
import { AiParentReportService } from './ai-parent-report.service';

@ApiTags('AI Agents')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiAgentsController {
  constructor(
    private interviewService: AiInterviewService,
    private teacherService: AiTeacherService,
    private pronunciationService: AiPronunciationService,
    private progressService: AiProgressService,
    private principalService: AiPrincipalService,
    private parentReportService: AiParentReportService,
  ) {}

  @Post('assess')
  @ApiOperation({ summary: 'AI Interview Agent: Conduct student assessment' })
  async conductAssessment(@Body() body: { audioBase64: string; transcript: string }) {
    const buffer = Buffer.from(body.audioBase64, 'base64');
    return this.interviewService.conductAssessment(buffer, body.transcript);
  }

  @Post('pronunciation')
  @ApiOperation({ summary: 'AI Pronunciation Agent: Analyze recitation' })
  async analyzePronunciation(@Body() body: { audioBase64: string; referenceText: string }) {
    const buffer = Buffer.from(body.audioBase64, 'base64');
    return this.pronunciationService.analyze(buffer, body.referenceText);
  }

  @Get('lesson/:studentId')
  @ApiOperation({ summary: 'AI Teacher Agent: Generate personalized lesson' })
  async getLesson(@Param('studentId') studentId: string) {
    return this.teacherService.generateLesson(studentId);
  }

  @Post('feedback/:studentId')
  @ApiOperation({ summary: 'AI Teacher Agent: Provide feedback on recitation' })
  async getFeedback(
    @Param('studentId') studentId: string,
    @Body() body: { audioBase64: string; verseId: string },
  ) {
    const buffer = Buffer.from(body.audioBase64, 'base64');
    return this.teacherService.provideFeedback(studentId, buffer, body.verseId);
  }

  @Get('progress/:studentId')
  @ApiOperation({ summary: 'AI Progress Agent: Track student progress' })
  async trackProgress(@Param('studentId') studentId: string) {
    return this.progressService.trackProgress(studentId);
  }

  @Get('analytics')
  @ApiOperation({ summary: 'AI Principal Agent: Institution analytics' })
  async getAnalytics() {
    return this.principalService.getInstitutionAnalytics();
  }

  @Get('report/daily/:studentId')
  @ApiOperation({ summary: 'AI Parent Report Agent: Generate daily report' })
  async getDailyReport(@Param('studentId') studentId: string) {
    return this.parentReportService.generateDailyReport(studentId);
  }

  @Get('report/weekly/:studentId')
  @ApiOperation({ summary: 'AI Parent Report Agent: Generate weekly report' })
  async getWeeklyReport(@Param('studentId') studentId: string) {
    return this.parentReportService.generateWeeklyReport(studentId);
  }
}
