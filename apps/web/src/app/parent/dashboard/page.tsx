'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, TrendingUp, BookOpen, Award, MessageSquare } from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';

const progressData = [
  { day: 'Mon', hours: 0.5 }, { day: 'Tue', hours: 1.2 }, { day: 'Wed', hours: 0.8 },
  { day: 'Thu', hours: 1.5 }, { day: 'Fri', hours: 2.0 }, { day: 'Sat', hours: 1.0 }, { day: 'Sun', hours: 0.5 },
];

const children = [
  { id: 1, name: 'Ahmed Ibrahim', level: 'Level 2', streak: 7, accuracy: 87, lessonsCompleted: 28, currentStreak: '7 Days' },
  { id: 2, name: 'Maryam Hassan', level: 'Beginner', streak: 3, accuracy: 72, lessonsCompleted: 12, currentStreak: '3 Days' },
];

const recentActivity = [
  { child: 'Ahmed Ibrahim', action: 'Completed lesson', detail: 'Surah Al-Mulk (1-10)', time: 'Today, 7:30 PM' },
  { child: 'Ahmed Ibrahim', action: 'Practice session', detail: 'Letters ج، ح، خ', time: 'Today, 6:15 PM' },
  { child: 'Maryam Hassan', action: 'New achievement', detail: '7 Day Streak', time: 'Yesterday, 8:20 PM' },
];

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState(children[0]);

  return (
    <div className="standalone-page">
      {/* Header */}
      <header className="standalone-header">
        <div className="page-container py-4 flex items-center justify-between gap-4">
          <BrandLogo variant="dark" size="sm" />
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all"
                style={selectedChild.id === child.id
                  ? { background: 'rgba(20,85,184,0.08)', color: '#1455B8', border: '1.5px solid rgba(20,85,184,0.2)' }
                  : { background: '#F5F8FC', color: '#64748b', border: '1.5px solid #DBEAFE' }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: 'linear-gradient(135deg, #1455B8, #168FE8)' }}
                >
                  {child.name.charAt(0)}
                </div>
                <span className="hidden sm:inline">{child.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="standalone-main">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-navy-800">Parent Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Monitor your children&apos;s Quran learning progress</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatCard icon={Clock} label="Practice Time" value="12h 45m" sub="This Week" accent="#1455B8" bg="rgba(20,85,184,0.06)" />
          <StatCard icon={TrendingUp} label="Accuracy" value={`${selectedChild.accuracy}%`} sub="This Week" accent="#18A96B" bg="rgba(24,169,107,0.06)" />
          <StatCard icon={BookOpen} label="Lessons Done" value={selectedChild.lessonsCompleted.toString()} sub="Total" accent="#16A6A0" bg="rgba(22,166,160,0.06)" />
          <StatCard icon={Award} label="Streak" value={selectedChild.currentStreak} sub="Keep it up!" accent="#D9A441" bg="rgba(217,164,65,0.08)" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Weekly Activity */}
          <div className="lg:col-span-2 iv-card p-6">
            <h3 className="text-base font-bold text-navy-800 mb-5">Weekly Activity</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFF6FF" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #DBEAFE', fontSize: 12 }} />
                  <Bar dataKey="hours" radius={[6, 6, 0, 0]} fill="url(#barGrad)" />
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#168FE8" />
                      <stop offset="100%" stopColor="#1455B8" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="iv-card p-6">
            <h3 className="text-base font-bold text-navy-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-4 border-b border-blue-50 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#168FE8' }} />
                  <div>
                    <p className="text-sm font-semibold text-navy-800">{activity.action}</p>
                    <p className="text-sm text-slate-500">{activity.detail}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="mt-4 sm:mt-6 iv-card p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(20,85,184,0.08)' }}>
              <MessageSquare className="w-4 h-4" style={{ color: '#1455B8' }} />
            </div>
            <h3 className="text-base font-bold text-navy-800">Teacher&apos;s Note</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Ahmed is showing good improvement in his recitation. He needs more practice on Madd rules and pronunciation of the letter ض.
            Please encourage him to practice for at least 30 minutes daily.
          </p>
          <p className="text-xs text-slate-400 mt-3">— Ustadh Abdullah</p>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, accent, bg }: {
  icon: React.ElementType; label: string; value: string; sub: string; accent: string; bg: string;
}) {
  return (
    <div className="iv-card p-4 sm:p-5">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: bg, color: accent }}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-xl font-bold text-navy-800">{value}</p>
      <p className="text-sm text-slate-600 font-medium">{label}</p>
      <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
    </div>
  );
}
