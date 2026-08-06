'use client';

import { useState } from 'react';
import { StudentSidebar } from '@/components/student/StudentSidebar';
import { ProgressOverview } from '@/components/student/ProgressOverview';
import { TodaysPlan } from '@/components/student/TodaysPlan';
import { RecentPerformance } from '@/components/student/RecentPerformance';
import { WeakAreas } from '@/components/student/WeakAreas';
import { Achievements } from '@/components/student/Achievements';

export default function StudentDashboard() {
  const [student] = useState({
    name: 'Ahmed Ibrahim',
    level: 'Intermediate',
    streak: 7,
    totalLessons: 48,
    completedLessons: 28,
    practiceTime: '12h 45m',
    accuracy: 87,
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar />

      <main className="flex-1 p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Assalamu Alaikum, {student.name}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Let&apos;s continue your journey of learning the Quran.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Current Level" value={student.level} icon="🎯" color="blue" />
          <StatCard label="Total Lessons" value={`${student.completedLessons}/${student.totalLessons}`} icon="📚" color="emerald" />
          <StatCard label="Practice Time" value={student.practiceTime} icon="⏱️" color="purple" />
          <StatCard label="Accuracy Score" value={`${student.accuracy}%`} icon="🎯" color="amber" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TodaysPlan />
            <RecentPerformance />
          </div>
          <div className="space-y-6">
            <ProgressOverview />
            <WeakAreas />
            <Achievements streak={student.streak} />
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: string; color: string; }) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
  };
  return (
    <div className={`p-4 rounded-xl border ${colorClasses[color]} shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}
