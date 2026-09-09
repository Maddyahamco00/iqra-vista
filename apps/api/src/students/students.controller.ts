import { Controller, Get, Param, Body, Put, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StudentsService } from './students.service';

@ApiTags('Students')
@Controller('students')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  // ── /me routes (authenticated student resolves by JWT userId) ─────────────

  @Get('me')
  @ApiOperation({ summary: 'Get current student profile' })
  async getMe(@Request() req: any) {
    return this.studentsService.getMe(req.user.userId);
  }

  @Get('me/progress')
  @ApiOperation({ summary: 'Get current student learning progress summary' })
  async getMeProgress(@Request() req: any) {
    return this.studentsService.getMeProgress(req.user.userId);
  }

  @Get('me/progress/history')
  @ApiOperation({ summary: 'Get current student daily activity history for streak calculation' })
  @ApiQuery({ name: 'from', required: false, description: 'Start date YYYY-MM-DD (default: 90 days ago)' })
  async getMeProgressHistory(@Request() req: any, @Query('from') from?: string) {
    return this.studentsService.getMeProgressHistory(req.user.userId, from ?? '');
  }

  @Get('me/today-plan')
  @ApiOperation({ summary: 'Get current student today\'s lesson plan' })
  async getMeTodayPlan(@Request() req: any) {
    return this.studentsService.getMeTodayPlan(req.user.userId);
  }

  @Get('me/recent-performance')
  @ApiOperation({ summary: 'Get current student recent performance scores (last 7 active days)' })
  async getMeRecentPerformance(@Request() req: any) {
    return this.studentsService.getMeRecentPerformance(req.user.userId);
  }

  @Get('me/weak-areas')
  @ApiOperation({ summary: 'Get current student weak areas derived from progress data' })
  async getMeWeakAreas(@Request() req: any) {
    return this.studentsService.getMeWeakAreas(req.user.userId);
  }

  @Get('me/progress/breakdown')
  @ApiOperation({ summary: 'Get current student per-category progress breakdown' })
  async getMeProgressBreakdown(@Request() req: any) {
    return this.studentsService.getMeProgressBreakdown(req.user.userId);
  }

  // ── Generic CRUD routes ───────────────────────────────────────────────────

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

  @Get(':id/dashboard')
  @ApiOperation({ summary: 'Get student dashboard stats' })
  async getDashboard(@Param('id') id: string) {
    return this.studentsService.getDashboard(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update student profile' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.studentsService.update(id, data);
  }
}
