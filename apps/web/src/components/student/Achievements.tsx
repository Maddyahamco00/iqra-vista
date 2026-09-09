'use client';

import { Flame, Trophy, Star, Loader2 } from 'lucide-react';

interface AchievementsProps {
  streak: number;
  longestStreak?: number;
  completedLessons?: number;
  averageScore?: number;
  isLoading?: boolean;
}

/** Returns the streak milestone label for the trophy badge. */
function streakMilestoneLabel(longest: number): string {
  if (longest >= 30) return '30 Day Champion';
  if (longest >= 14) return '2 Week Streak';
  if (longest >= 7) return '7 Day Streak';
  return 'First Streak!';
}

/** Returns an encouraging sub-message based on current streak. */
function streakSubtext(current: number): string {
  if (current === 0) return 'Complete a lesson to start your streak!';
  if (current >= 7) return "You're on fire — keep it going!";
  if (current >= 3) return 'Great consistency — keep it up!';
  return 'Good start — aim for 7 days!';
}

export function Achievements({
  streak,
  longestStreak = 0,
  completedLessons = 0,
  averageScore = 0,
  isLoading = false,
}: AchievementsProps) {
  // Build dynamic badge set from real data
  const badges = [
    {
      icon: Flame,
      label: streakMilestoneLabel(longestStreak),
      bg: 'rgba(249,115,22,0.1)',
      color: '#ea580c',
      earned: longestStreak >= 7,
    },
    {
      icon: Trophy,
      label:
        completedLessons >= 50
          ? '50 Lessons Done'
          : completedLessons >= 10
            ? '10 Lessons Done'
            : `${completedLessons} Lesson${completedLessons !== 1 ? 's' : ''} Done`,
      bg: 'rgba(20,85,184,0.1)',
      color: '#1455B8',
      earned: completedLessons >= 10,
    },
    {
      icon: Star,
      label:
        averageScore >= 90
          ? 'Accuracy Star ⭐'
          : averageScore >= 70
            ? `${averageScore}% Accuracy`
            : 'Keep Practising',
      bg: 'rgba(217,164,65,0.12)',
      color: '#B8860B',
      earned: averageScore >= 70,
    },
  ];

  return (
    <div className="iv-card p-6">
      <h3 className="text-base font-bold text-navy-800 mb-4">Achievements</h3>

      {/* Streak highlight */}
      <div
        className="flex items-center gap-3 p-3.5 rounded-xl mb-4"
        style={{
          background:
            'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(217,164,65,0.08) 100%)',
          border: '1px solid rgba(217,164,65,0.2)',
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'rgba(249,115,22,0.12)' }}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-orange-400 animate-spin" />
          ) : (
            <Flame
              className={`w-5 h-5 text-orange-500${streak >= 7 ? ' animate-pulse' : ''}`}
            />
          )}
        </div>
        <div className="min-w-0">
          {isLoading ? (
            <>
              <div className="h-3.5 w-24 bg-slate-200 rounded animate-pulse mb-1" />
              <div className="h-2.5 w-32 bg-slate-100 rounded animate-pulse" />
            </>
          ) : (
            <>
              <p className="font-bold text-navy-800 text-sm">
                {streak} Day Streak
                {longestStreak > 0 && longestStreak > streak && (
                  <span className="ml-1.5 text-[11px] font-normal text-slate-400">
                    (best: {longestStreak})
                  </span>
                )}
              </p>
              <p className="text-xs text-slate-500">{streakSubtext(streak)}</p>
            </>
          )}
        </div>
      </div>

      {/* Dynamic badges grid */}
      <div className="grid grid-cols-3 gap-2">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className={`p-3 rounded-xl text-center transition-opacity${badge.earned ? '' : ' opacity-40'}`}
              style={{ background: badge.bg }}
              title={badge.earned ? undefined : 'Keep going to unlock this badge!'}
            >
              <Icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: badge.color }} />
              <p className="text-xs font-semibold text-navy-800 leading-tight">{badge.label}</p>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 text-xs font-semibold text-brand-royal hover:text-brand-bright transition-colors">
        View All Badges →
      </button>
    </div>
  );
}
