'use client';

import { useDashboard } from '@/hooks/useDashboard';
import { DashboardSkeleton } from '@/components/student/DashboardSkeleton';
import { ErrorCard } from '@/components/ui/ErrorCard';
import { StreakFlame } from '@/components/student/StreakFlame';
import { StudentSidebar } from '@/components/student/StudentSidebar';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProgressOverview } from '@/components/student/ProgressOverview';
import { TodaysPlan } from '@/components/student/TodaysPlan';
import { RecentPerformance } from '@/components/student/RecentPerformance';
import { WeakAreas } from '@/components/student/WeakAreas';
import { Achievements } from '@/components/student/Achievements';
import { BookOpen, Clock, Target } from 'lucide-react';

export default function StudentDashboard() {
  const { profile, progress, streaks, isLoading, errors, streakLoading, streakError, refetchStreak } = useDashboard();
  const { currentStreak, longestStreak } = streaks;

  if (isLoading && !profile) {
    return <DashboardSkeleton />;
  }

  if (errors.profile) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <ErrorCard
          title="Failed to load dashboard"
          message={errors.profile.message || 'Unable to fetch your profile'}
          retry={() => window.location.reload()}
        />
      </div>
    );
  }

  const completedLessons = progress?.totalLessonsCompleted ?? 0;
  const totalLessons = progress?.totalLessons ?? 0;
  const averageScore = progress?.averageScore ?? 0;

  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      {/* Header */}
      <header className="mb-6 sm:mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="section-label">Assalamu Alaikum 👋</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy-800">
              {profile?.fullName ?? 'Student'}
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Continue your Qur&apos;an journey — you&apos;re making great progress.
            </p>
          </div>
          <div className="hidden sm:flex items-center px-4 py-2 rounded-xl bg-orange-50 border border-orange-100 shrink-0">
            <StreakFlame currentStreak={currentStreak} isLoading={streakLoading} />
          </div>
        </div>
      </header>

      {/* Stat cards */}
      {errors.progress ? (
        <div className="mb-6 sm:mb-8">
          <ErrorCard compact title="Progress unavailable" message="Could not load progress data." />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatCard
            label="Current Level"
            value={profile?.gradeLevel ?? '—'}
            icon={<Target className="w-5 h-5" />}
            accent="#1455B8"
            bg="rgba(20,85,184,0.06)"
          />
          <StatCard
            label="Lessons Done"
            value={`${completedLessons}/${totalLessons}`}
            icon={<BookOpen className="w-5 h-5" />}
            accent="#18A96B"
            bg="rgba(24,169,107,0.06)"
          />
          <StatCard
            label="Streak"
            value={streakLoading ? '—' : `${currentStreak} days`}
            icon={<Clock className="w-5 h-5" />}
            accent="#16A6A0"
            bg="rgba(22,166,160,0.06)"
            subtext={streakLoading ? 'Loading...' : `Best: ${longestStreak} days`}
          />
          <StatCard
            label="Accuracy"
            value={`${averageScore}%`}
            icon={<Target className="w-5 h-5" />}
            accent="#D9A441"
            bg="rgba(217,164,65,0.06)"
          />
        </div>
      )}

      {/* Streak error */}
      {streakError && (
        <div className="mb-4">
          <ErrorCard compact title="Streak unavailable" message="Could not load streak data." retry={() => refetchStreak()} />
        </div>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <TodaysPlan />
          <RecentPerformance />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <ProgressOverview />
          <WeakAreas />
          <Achievements
            streak={currentStreak}
            longestStreak={longestStreak}
            completedLessons={completedLessons}
            averageScore={averageScore}
            isLoading={streakLoading}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({
  label,
  value,
  icon,
  accent,
  bg,
  subtext,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent: string;
  bg: string;
  subtext?: string;
}) {
  return (
    <div className="iv-card p-4 sm:p-5">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
        style={{ background: bg, color: accent }}
      >
        {icon}
      </div>
      <p className="text-lg sm:text-xl font-bold text-navy-800">{value}</p>
      <p className="text-xs text-slate-500 mt-0.5 font-medium">{label}</p>
      {subtext && <p className="text-xs text-slate-400 mt-0.5">{subtext}</p>}
    </div>
  );
}
