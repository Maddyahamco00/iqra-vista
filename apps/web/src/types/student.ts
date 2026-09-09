export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  gradeLevel: string;
  joinDate: string;
}

export interface LearningProgress {
  totalLessonsCompleted: number;
  totalLessons: number;
  currentStreakDays: number;
  longestStreakDays: number;
  averageScore: number;
  lastActiveAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  progressPercent: number;
}

export interface ActivityItem {
  id: string;
  type: 'lesson_completed' | 'assignment_submitted' | 'achievement_earned' | 'streak_milestone';
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface DailyActivityRecord {
  date: string; // ISO-8601 YYYY-MM-DD
  lessonsCompleted: number;
  minutesActive: number;
}

export interface ProgressHistoryResponse {
  records: DailyActivityRecord[];
  from: string;
  to: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  history: DailyActivityRecord[];
}

// ── Today's Plan ─────────────────────────────────────────────────────────────

export interface TodayTask {
  id: string;
  title: string;
  type: string; // 'reading' | 'tajweed' | 'memorization' | 'recitation'
  completed: boolean;
}

export interface TodayPlanResponse {
  tasks: TodayTask[];
  level: string;
}

// ── Recent Performance ────────────────────────────────────────────────────────

export interface PerformancePoint {
  day: string;   // e.g. 'Mon'
  score: number;
  date: string;  // ISO YYYY-MM-DD
}

export interface RecentPerformanceResponse {
  points: PerformancePoint[];
  weekDelta: number; // positive = improved vs prior week
}

// ── Weak Areas ────────────────────────────────────────────────────────────────

export interface WeakArea {
  area: string;
  avgScore: number;
  severity: 'high' | 'medium';
  recommendation: string;
}

export interface WeakAreasResponse {
  weakAreas: WeakArea[];
}

// ── Progress Breakdown ────────────────────────────────────────────────────────

export interface BreakdownCategory {
  label: string;  // 'Reading' | 'Tajweed' | 'Memorization' | 'Fluency'
  value: number;  // 0-100
  color: string;
}

export interface ProgressBreakdownResponse {
  breakdown: BreakdownCategory[];
  overall: number; // 0-100
}
