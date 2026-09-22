import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TodayPlanLoader } from './today-plan.loader';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, TodayPlanLoader],
  exports: [StudentsService],
})
export class StudentsModule {}
