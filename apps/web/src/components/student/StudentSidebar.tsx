'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, BookOpen, Brain, BarChart3, FileText,
  Award, Settings, HelpCircle, LogOut, Mic, Sparkles,
} from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';

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
    <aside
      className="w-64 h-full min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(180deg, #020B24 0%, #041538 40%, #061B4F 100%)' }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <BrandLogo variant="light" size="sm" type="full" />
      </div>

      {/* AI Tutor quick-access */}
      <div className="px-4 py-3">
        <Link
          href="/student/ai-tutor"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: 'linear-gradient(135deg, rgba(20,85,184,0.5) 0%, rgba(22,143,232,0.3) 100%)',
            border: '1px solid rgba(22,143,232,0.25)',
            color: '#93C5FD',
          }}
        >
          <Sparkles className="w-4 h-4 text-brand-bright shrink-0" />
          AI Tutor
          <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-brand-bright/20 text-brand-bright">New</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-item ${isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'}`}
            >
              <Icon style={{ width: 18, height: 18 }} className="shrink-0" />
              {item.label}
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-bright" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <button className="sidebar-item sidebar-item-inactive w-full text-red-400/70 hover:text-red-400 hover:bg-red-500/10">
          <LogOut style={{ width: 18, height: 18 }} className="shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}
