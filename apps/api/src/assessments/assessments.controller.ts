import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AssessmentsService } from './assessments.service';

@ApiTags('Assessments')
@Controller('assessments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AssessmentsController {
  constructor(private assessmentsService: AssessmentsService) {}

  @Get(':studentId')
  @ApiOperation({ summary: 'Get student assessment history' })
  async findByStudent(@Param('studentId') studentId: string) {
    return this.assessmentsService.findByStudent(studentId);
  }

  @Post()
  @ApiOperation({ summary: 'Create new assessment record' })
  async create(@Body() data: any) {
    return this.assessmentsService.create(data);
  }
}
