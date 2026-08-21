'use client';

import { useState } from 'react';
import { StudentSidebar } from '@/components/student/StudentSidebar';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Mic, Play, Volume2, ChevronLeft, ChevronRight, MessageCircle, Sparkles } from 'lucide-react';

const verses = [
  { arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', transliteration: 'Bismillahir Rahmanir Raheem', translation: 'In the name of Allah, the Most Merciful, the Most Compassionate.' },
  { arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', transliteration: 'Alhamdu lillahi Rabbil Alameen', translation: 'All praise is due to Allah, Lord of the Worlds.' },
  { arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', transliteration: 'Ar-Rahmanir Raheem', translation: 'The Most Merciful, the Most Compassionate.' },
  { arabic: 'مَالِكِ يَوْمِ الدِّينِ', transliteration: 'Maliki Yawmid Deen', translation: 'Master of the Day of Judgment.' },
];

type FeedbackItem = { type: 'error' | 'warning' | 'success'; label: string; message: string };
type Feedback = { score: number; items: FeedbackItem[] };

const feedbackStyles = {
  error:   { bg: 'rgba(239,68,68,0.05)',   border: 'rgba(239,68,68,0.15)',   dot: '#ef4444' },
  warning: { bg: 'rgba(245,158,11,0.05)',  border: 'rgba(245,158,11,0.15)',  dot: '#f59e0b' },
  success: { bg: 'rgba(24,169,107,0.05)', border: 'rgba(24,169,107,0.15)', dot: '#18A96B' },
};

export default function LessonPage() {
  const [currentVerse, setCurrentVerse] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setFeedback({
          score: 78,
          items: [
            { type: 'error', label: 'Madd length', message: 'The Madd in تَرَىٰ was too short.' },
            { type: 'warning', label: 'Qalqalah', message: 'Improve the Qalqalah on the letter (د).' },
            { type: 'success', label: 'Good', message: 'Great pronunciation of (رَحْمَٰنِ). Keep it up!' },
          ],
        });
      }, 3000);
    }
  };

  const verse = verses[currentVerse - 1];

  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="section-label">Quran Learning</p>
            <h1 className="text-2xl font-bold text-navy-800">Surah Al-Fatihah</h1>
            <p className="text-slate-500 text-sm mt-0.5">Verse {currentVerse} of {verses.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-xl bg-white border border-blue-50 shadow-card hover:shadow-card-hover transition-all text-slate-500 hover:text-navy-800">
              <Volume2 style={{ width: 18, height: 18 }} />
            </button>
            <button className="p-2.5 rounded-xl bg-white border border-blue-50 shadow-card hover:shadow-card-hover transition-all text-slate-500 hover:text-navy-800">
              <MessageCircle style={{ width: 18, height: 18 }} />
            </button>
          </div>
        </div>

        {/* Verse card */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-6 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #041538 0%, #061B4F 60%, #0A2A66 100%)', border: '1px solid rgba(22,143,232,0.15)' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(22,143,232,0.12) 0%, transparent 70%)' }} />

          <p className="arabic-text text-3xl sm:text-4xl text-white mb-5 leading-loose relative z-10">
            {verse.arabic}
          </p>
          <p className="text-base font-semibold mb-2 relative z-10" style={{ color: '#D9A441' }}>
            {verse.transliteration}
          </p>
          <p className="text-sm text-white/60 relative z-10">{verse.translation}</p>

          <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: 'rgba(217,164,65,0.2)', color: '#D9A441', border: '1px solid rgba(217,164,65,0.3)' }}>
            {currentVerse}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setCurrentVerse(Math.max(1, currentVerse - 1))}
            disabled={currentVerse === 1}
            className="p-3 rounded-xl bg-white border border-blue-50 shadow-card hover:shadow-card-hover transition-all disabled:opacity-40 text-navy-800"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            className="p-4 rounded-2xl text-white shadow-glow-blue transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #1455B8 0%, #168FE8 100%)' }}
          >
            <Play className="w-7 h-7" />
          </button>

          <button
            onClick={handleRecord}
            className={`p-4 rounded-2xl text-white shadow-lg transition-all hover:scale-105 ${isRecording ? 'animate-pulse' : ''}`}
            style={{ background: isRecording ? '#ef4444' : 'linear-gradient(135deg, #18A96B 0%, #16A6A0 100%)' }}
          >
            <Mic className="w-7 h-7" />
          </button>

          <button
            onClick={() => setCurrentVerse(Math.min(verses.length, currentVerse + 1))}
            disabled={currentVerse === verses.length}
            className="p-3 rounded-xl bg-white border border-blue-50 shadow-card hover:shadow-card-hover transition-all disabled:opacity-40 text-navy-800"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* AI Feedback */}
        {feedback && (
          <div className="iv-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-bright" />
                <h3 className="text-base font-bold text-navy-800">AI Feedback</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold" style={{ color: '#18A96B' }}>{feedback.score}%</span>
                <span className="text-xs text-slate-500 font-medium">Good</span>
              </div>
            </div>
            <div className="space-y-2.5">
              {feedback.items.map((item, idx) => {
                const styles = feedbackStyles[item.type];
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl flex items-start gap-3"
                    style={{ background: styles.bg, border: `1px solid ${styles.border}` }}
                  >
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: styles.dot }} />
                    <div>
                      <p className="text-sm font-semibold text-navy-800">{item.label}</p>
                      <p className="text-sm text-slate-500">{item.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
