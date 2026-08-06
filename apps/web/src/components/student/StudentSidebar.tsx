'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Brain, BarChart3, FileText, Award, Settings, HelpCircle, LogOut, Mic } from 'lucide-react';

const navItems = [
  { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/student/lessons', label: 'My Lessons', icon: BookOpen },
  { href: '/student/memorization', label: 'Memorization', icon: Brain },
  { href: '/student/assessments', label: 'Assessments', icon: Mic },
  { href: '/student/progress', label: 'Progress', icon: BarChart3 },
  { href: '/student/reports', label: 'Reports', icon: FileText },
  { href: '/student/certificates', label: 'Certificates', icon: Award },
  { href: '/student/settings', label: 'Settings', icon: Settings },
  { href: '/student/help', label: 'Help & Support', icon: HelpCircle },
];

export function StudentSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-emerald-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-900">IQRA VISTA</h2>
            <p className="text-xs text-gray-500">AI Quran Academy</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}>
              <Icon className="w-5 h-5" /> {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </aside>
  );
}
