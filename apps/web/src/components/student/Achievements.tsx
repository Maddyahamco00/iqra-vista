'use client';

import { Flame, Trophy, Star } from 'lucide-react';

const badges = [
  { icon: Flame, label: '7 Day Streak', color: 'text-orange-500 bg-orange-50' },
  { icon: Trophy, label: 'Completed Practice', color: 'text-blue-500 bg-blue-50' },
  { icon: Star, label: '28 Lessons Done', color: 'text-purple-500 bg-purple-50' },
];

export function Achievements({ streak }: { streak: number }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
      <div className="flex items-center gap-4 mb-4 p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
          <Flame className="w-6 h-6 text-orange-500" />
        </div>
        <div>
          <p className="font-bold text-gray-900">{streak} Day Streak</p>
          <p className="text-sm text-gray-500">Keep it up!</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div key={idx} className={`p-3 rounded-xl ${badge.color} text-center`}>
              <Icon className="w-6 h-6 mx-auto mb-1" />
              <p className="text-xs font-medium">{badge.label}</p>
            </div>
          );
        })}
      </div>
      <button className="w-full mt-4 text-sm text-primary-600 font-medium hover:text-primary-700">
        View All Badges →
      </button>
    </div>
  );
}
