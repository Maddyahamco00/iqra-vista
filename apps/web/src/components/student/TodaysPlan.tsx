'use client';

import { CheckCircle2, Circle } from 'lucide-react';

const tasks = [
  { id: 1, title: 'Revision: Surah Al-Mulk (1-10)', completed: true, type: 'revision' },
  { id: 2, title: 'Tajweed: Madd Rules', completed: false, type: 'lesson' },
  { id: 3, title: 'Practice: Letters ج، ح، خ', completed: false, type: 'practice' },
  { id: 4, title: 'Memorization: New Verses', completed: false, type: 'memorization' },
];

export function TodaysPlan() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Today&apos;s Plan</h3>
        <span className="text-sm text-primary-600 font-medium">View Full Plan →</span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className={`text-sm font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {task.title}
              </p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              task.type === 'revision' ? 'bg-blue-50 text-blue-600' :
              task.type === 'lesson' ? 'bg-purple-50 text-purple-600' :
              task.type === 'practice' ? 'bg-amber-50 text-amber-600' :
              'bg-emerald-50 text-emerald-600'
            }`}>{task.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
