import { Module } from '@nestjs/common';
import { AiAgentsController } from './ai-agents.controller';
import { AiInterviewService } from './ai-interview.service';
import { AiTeacherService } from './ai-teacher.service';
import { AiPronunciationService } from './ai-pronunciation.service';
import { AiProgressService } from './ai-progress.service';
import { AiPrincipalService } from './ai-principal.service';
import { AiParentReportService } from './ai-parent-report.service';

@Module({
  controllers: [AiAgentsController],
  providers: [
    AiInterviewService,
    AiTeacherService,
    AiPronunciationService,
    AiProgressService,
    AiPrincipalService,
    AiParentReportService,
  ],
  exports: [
    AiInterviewService,
    AiTeacherService,
    AiPronunciationService,
    AiProgressService,
    AiPrincipalService,
    AiParentReportService,
  ],
})
export class AiAgentsModule {}
