'use client';

import { StudentSidebar } from '@/components/student/StudentSidebar';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProgressOverview } from '@/components/student/ProgressOverview';
import { TodaysPlan } from '@/components/student/TodaysPlan';
import { RecentPerformance } from '@/components/student/RecentPerformance';
import { WeakAreas } from '@/components/student/WeakAreas';
import { Achievements } from '@/components/student/Achievements';
import { Flame, BookOpen, Clock, Target } from 'lucide-react';

const student = {
  name: 'Ahmed Ibrahim',
  level: 'Intermediate',
  streak: 7,
  totalLessons: 48,
  completedLessons: 28,
  practiceTime: '12h 45m',
  accuracy: 87,
};

export default function StudentDashboard() {
  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      {/* Header */}
      <header className="mb-6 sm:mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="section-label">Assalamu Alaikum 👋</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy-800">{student.name}</h1>
            <p className="text-slate-500 mt-1 text-sm">
              Continue your Qur&apos;an journey — you&apos;re making great progress.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 border border-orange-100 shrink-0">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-orange-600">{student.streak} Day Streak</span>
          </div>
        </div>
      </header>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <StatCard label="Current Level" value={student.level} icon={<Target className="w-5 h-5" />} accent="#1455B8" bg="rgba(20,85,184,0.06)" />
        <StatCard label="Lessons Done" value={`${student.completedLessons}/${student.totalLessons}`} icon={<BookOpen className="w-5 h-5" />} accent="#18A96B" bg="rgba(24,169,107,0.06)" />
        <StatCard label="Practice Time" value={student.practiceTime} icon={<Clock className="w-5 h-5" />} accent="#16A6A0" bg="rgba(22,166,160,0.06)" />
        <StatCard label="Accuracy" value={`${student.accuracy}%`} icon={<Target className="w-5 h-5" />} accent="#D9A441" bg="rgba(217,164,65,0.06)" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <TodaysPlan />
          <RecentPerformance />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <ProgressOverview />
          <WeakAreas />
          <Achievements streak={student.streak} />
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ label, value, icon, accent, bg }: {
  label: string; value: string; icon: React.ReactNode; accent: string; bg: string;
}) {
  return (
    <div className="iv-card p-4 sm:p-5">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: bg, color: accent }}>
        {icon}
      </div>
      <p className="text-lg sm:text-xl font-bold text-navy-800">{value}</p>
      <p className="text-xs text-slate-500 mt-0.5 font-medium">{label}</p>
    </div>
  );
}
