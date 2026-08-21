'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, CheckCircle, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';

const userGrowth = [
  { month: 'Jan', students: 1200, parents: 400, teachers: 50 },
  { month: 'Feb', students: 1500, parents: 520, teachers: 60 },
  { month: 'Mar', students: 2100, parents: 700, teachers: 80 },
  { month: 'Apr', students: 2800, parents: 950, teachers: 100 },
  { month: 'May', students: 3500, parents: 1200, teachers: 130 },
  { month: 'Jun', students: 4200, parents: 1500, teachers: 160 },
];

const levelData = [
  { name: 'Beginner', value: 4253, color: '#18A96B' },
  { name: 'Intermediate', value: 5127, color: '#168FE8' },
  { name: 'Advanced', value: 2462, color: '#D9A441' },
  { name: 'Expert', value: 1000, color: '#16A6A0' },
];

const recentStudents = [
  { id: 'ST-10023', name: 'Ahmed Ibrahim', level: 'Intermediate', lastActive: '2 mins ago', progress: 68, status: 'Active' },
  { id: 'ST-10024', name: 'Maryam Hassan', level: 'Beginner', lastActive: '15 mins ago', progress: 34, status: 'Active' },
  { id: 'ST-10025', name: 'Yusuf Ali', level: 'Advanced', lastActive: '1 hour ago', progress: 82, status: 'Active' },
  { id: 'ST-10026', name: 'Fatima Usman', level: 'Beginner', lastActive: '2 hours ago', progress: 28, status: 'Inactive' },
];

const levelBadge: Record<string, { background: string; color: string }> = {
  Beginner:     { background: 'rgba(24,169,107,0.1)',  color: '#18A96B' },
  Intermediate: { background: 'rgba(22,143,232,0.1)',  color: '#1455B8' },
  Advanced:     { background: 'rgba(217,164,65,0.1)',  color: '#B8860B' },
};

export default function AdminDashboard() {
  return (
    <div className="standalone-page">
      {/* Header */}
      <header className="standalone-header">
        <div className="page-container py-4 flex items-center justify-between">
          <BrandLogo variant="dark" size="sm" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold"
            style={{ background: 'rgba(24,169,107,0.08)', color: '#18A96B', border: '1px solid rgba(24,169,107,0.2)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            All Systems Operational
          </div>
        </div>
      </header>

      <main className="standalone-main">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-navy-800">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Platform overview and analytics</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <AdminStatCard icon={Users} label="Total Students" value="12,842" change="+12.5%" accent="#1455B8" bg="rgba(20,85,184,0.06)" />
          <AdminStatCard icon={BookOpen} label="Total Lessons" value="1,248" change="+6.3%" accent="#16A6A0" bg="rgba(22,166,160,0.06)" />
          <AdminStatCard icon={CheckCircle} label="Assessments" value="24,531" change="+15.2%" accent="#18A96B" bg="rgba(24,169,107,0.06)" />
          <AdminStatCard icon={DollarSign} label="Revenue (Month)" value="$24,560" change="+18.7%" accent="#D9A441" bg="rgba(217,164,65,0.08)" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* User Growth */}
          <div className="lg:col-span-2 iv-card p-6">
            <h3 className="text-base font-bold text-navy-800 mb-5">User Growth</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowth} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFF6FF" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #DBEAFE', fontSize: 12 }} />
                  <Line type="monotone" dataKey="students" stroke="#168FE8" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="parents" stroke="#18A96B" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="teachers" stroke="#D9A441" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-5 mt-3">
              {[{ label: 'Students', color: '#168FE8' }, { label: 'Parents', color: '#18A96B' }, { label: 'Teachers', color: '#D9A441' }].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5 text-xs text-slate-500">
                  <div className="w-3 h-1.5 rounded-full" style={{ background: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>

          {/* Students by Level */}
          <div className="iv-card p-6">
            <h3 className="text-base font-bold text-navy-800 mb-4">Students by Level</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={levelData} cx="50%" cy="50%" innerRadius={52} outerRadius={72} paddingAngle={4} dataKey="value">
                    {levelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #DBEAFE', fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-3">
              {levelData.map((level) => (
                <div key={level.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: level.color }} />
                    <span className="text-slate-500 text-xs">{level.name}</span>
                  </div>
                  <span className="font-bold text-navy-800 text-xs">{level.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Students Table */}
        <div className="iv-card p-6 mb-6">
          <h3 className="text-base font-bold text-navy-800 mb-5">Recent Students</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="text-left text-xs text-slate-400 border-b border-blue-50">
                  <th className="pb-3 font-semibold">ID</th>
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Level</th>
                  <th className="pb-3 font-semibold">Last Active</th>
                  <th className="pb-3 font-semibold">Progress</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((student) => {
                  const lvl = levelBadge[student.level] ?? { background: '#f1f5f9', color: '#64748b' };
                  return (
                    <tr key={student.id} className="border-b border-blue-50/50 last:border-0">
                      <td className="py-3 text-xs text-slate-400">{student.id}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                            style={{ background: 'linear-gradient(135deg, #1455B8, #168FE8)' }}
                          >
                            {student.name.charAt(0)}
                          </div>
                          <span className="text-sm font-semibold text-navy-800">{student.name}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={lvl}>
                          {student.level}
                        </span>
                      </td>
                      <td className="py-3 text-xs text-slate-400">{student.lastActive}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full bg-blue-50 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${student.progress}%`, background: 'linear-gradient(90deg, #1455B8, #168FE8)' }} />
                          </div>
                          <span className="text-xs text-slate-500">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={student.status === 'Active'
                            ? { background: 'rgba(24,169,107,0.1)', color: '#18A96B' }
                            : { background: 'rgba(239,68,68,0.08)', color: '#dc2626' }}
                        >
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-navy-800">High server CPU usage</p>
              <p className="text-xs text-slate-500 mt-0.5">Server usage is at 83%. Consider scaling up.</p>
            </div>
          </div>
          <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}>
            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-navy-800">Low storage space</p>
              <p className="text-xs text-slate-500 mt-0.5">Only 8% disk space remaining on storage server.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function AdminStatCard({ icon: Icon, label, value, change, accent, bg }: {
  icon: React.ElementType; label: string; value: string; change: string; accent: string; bg: string;
}) {
  return (
    <div className="iv-card p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg, color: accent }}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
          style={{ background: 'rgba(24,169,107,0.1)', color: '#18A96B' }}>
          <TrendingUp className="w-3 h-3" /> {change}
        </span>
      </div>
      <p className="text-xl sm:text-2xl font-bold text-navy-800">{value}</p>
      <p className="text-xs text-slate-500 mt-0.5 font-medium">{label}</p>
    </div>
  );
}
