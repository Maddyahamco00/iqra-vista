import { Controller, Get, Param, Body, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StudentsService } from './students.service';

@ApiTags('Students')
@Controller('students')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  async findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by ID' })
  async findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update student profile' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.studentsService.update(id, data);
  }
}
