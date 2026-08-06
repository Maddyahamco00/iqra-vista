'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', score: 65 }, { day: 'Tue', score: 72 }, { day: 'Wed', score: 68 },
  { day: 'Thu', score: 75 }, { day: 'Fri', score: 82 }, { day: 'Sat', score: 78 }, { day: 'Sun', score: 87 },
];

export function RecentPerformance() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Performance</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} domain={[0, 100]} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Line type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={3} dot={{ fill: '#0ea5e9', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
