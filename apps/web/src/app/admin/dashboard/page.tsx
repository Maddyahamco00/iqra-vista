'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, CheckCircle, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

const userGrowth = [
  { month: 'Jan', students: 1200, parents: 400, teachers: 50 },
  { month: 'Feb', students: 1500, parents: 520, teachers: 60 },
  { month: 'Mar', students: 2100, parents: 700, teachers: 80 },
  { month: 'Apr', students: 2800, parents: 950, teachers: 100 },
  { month: 'May', students: 3500, parents: 1200, teachers: 130 },
  { month: 'Jun', students: 4200, parents: 1500, teachers: 160 },
];

const levelData = [
  { name: 'Beginner', value: 4253, color: '#10b981' },
  { name: 'Intermediate', value: 5127, color: '#0ea5e9' },
  { name: 'Advanced', value: 2462, color: '#f59e0b' },
  { name: 'Expert', value: 1000, color: '#ef4444' },
];

const recentStudents = [
  { id: 'ST-10023', name: 'Ahmed Ibrahim', level: 'Intermediate', lastActive: '2 mins ago', progress: 68, status: 'Active' },
  { id: 'ST-10024', name: 'Maryam Hassan', level: 'Beginner', lastActive: '15 mins ago', progress: 34, status: 'Active' },
  { id: 'ST-10025', name: 'Yusuf Ali', level: 'Advanced', lastActive: '1 hour ago', progress: 82, status: 'Active' },
  { id: 'ST-10026', name: 'Fatima Usman', level: 'Beginner', lastActive: '2 hours ago', progress: 28, status: 'Inactive' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-emerald-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">IQRA VISTA Admin</h1>
              <p className="text-sm text-gray-500">AI Quran Learning Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-500" /> All Systems Operational
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <AdminStatCard icon={Users} label="Total Students" value="12,842" change="+12.5%" color="blue" />
          <AdminStatCard icon={BookOpen} label="Total Lessons" value="1,248" change="+6.3%" color="purple" />
          <AdminStatCard icon={CheckCircle} label="Assessments" value="24,531" change="+15.2%" color="emerald" />
          <AdminStatCard icon={DollarSign} label="Revenue (Month)" value="$24,560" change="+18.7%" color="amber" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* User Growth */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                  <Line type="monotone" dataKey="students" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="parents" stroke="#10b981" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="teachers" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Students by Level */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Students by Level</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={levelData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {levelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {levelData.map((level) => (
                <div key={level.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: level.color }} />
                    <span className="text-gray-600">{level.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{level.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Students Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Students</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Level</th>
                  <th className="pb-3 font-medium">Last Active</th>
                  <th className="pb-3 font-medium">Progress</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((student) => (
                  <tr key={student.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 text-sm text-gray-500">{student.id}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">
                          {student.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        student.level === 'Beginner' ? 'bg-emerald-50 text-emerald-700' :
                        student.level === 'Intermediate' ? 'bg-blue-50 text-blue-700' :
                        'bg-purple-50 text-purple-700'
                      }`}>{student.level}</span>
                    </td>
                    <td className="py-3 text-sm text-gray-500">{student.lastActive}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-500 rounded-full" style={{ width: `${student.progress}%` }} />
                        </div>
                        <span className="text-sm text-gray-600">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        student.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                      }`}>{student.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Alerts */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">High server CPU usage</p>
              <p className="text-xs text-amber-600 mt-1">Server usage is at 83%. Consider scaling up.</p>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Low storage space</p>
              <p className="text-xs text-red-600 mt-1">Only 8% disk space remaining on storage server.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function AdminStatCard({ icon: Icon, label, value, change, color }: any) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    purple: 'bg-purple-50 text-purple-700',
    amber: 'bg-amber-50 text-amber-700',
  };
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
