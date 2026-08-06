'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, TrendingUp, BookOpen, Calendar, Award, AlertCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Parent Dashboard</h1>
            <p className="text-sm text-gray-500">Monitor your children&apos;s Quran learning progress</p>
          </div>
          <div className="flex items-center gap-3">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedChild.id === child.id
                    ? 'bg-primary-50 text-primary-700 border border-primary-200'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">
                  {child.name.charAt(0)}
                </div>
                {child.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Clock} label="Practice Time" value="12h 45m" sub="This Week" color="blue" />
          <StatCard icon={TrendingUp} label="Accuracy" value={`${selectedChild.accuracy}%`} sub="This Week" color="emerald" />
          <StatCard icon={BookOpen} label="Lessons Completed" value={selectedChild.lessonsCompleted.toString()} sub="Total" color="purple" />
          <StatCard icon={Award} label="Current Streak" value={selectedChild.currentStreak} sub="Keep it up!" color="amber" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Progress */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                  <Bar dataKey="hours" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.detail}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Teacher&apos;s Note</h3>
          </div>
          <p className="text-gray-600">
            Ahmed is showing good improvement in his recitation. He needs more practice on Madd rules and pronunciation of the letter ض. 
            Please encourage him to practice for at least 30 minutes daily.
          </p>
          <p className="text-sm text-gray-400 mt-2">— Ustadh Abdullah</p>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color }: any) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    purple: 'bg-purple-50 text-purple-700',
    amber: 'bg-amber-50 text-amber-700',
  };
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xs text-gray-400 mt-1">{sub}</p>
    </div>
  );
}
