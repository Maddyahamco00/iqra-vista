'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', score: 65 }, { day: 'Tue', score: 72 }, { day: 'Wed', score: 68 },
  { day: 'Thu', score: 75 }, { day: 'Fri', score: 82 }, { day: 'Sat', score: 78 }, { day: 'Sun', score: 87 },
];

export function RecentPerformance() {
  return (
    <div className="iv-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-navy-800">Recent Performance</h3>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(24,169,107,0.1)', color: '#18A96B' }}>
          ↑ +22pts this week
        </span>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EFF6FF" />
            <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} domain={[50, 100]} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #DBEAFE',
                boxShadow: '0 4px 16px rgba(6,27,79,0.08)',
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="url(#lineGrad)"
              strokeWidth={2.5}
              dot={{ fill: '#168FE8', r: 3.5, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#1455B8' }}
            />
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1455B8" />
                <stop offset="100%" stopColor="#168FE8" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
