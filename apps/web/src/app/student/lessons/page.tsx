'use client';

import { useState } from 'react';
import { StudentSidebar } from '@/components/student/StudentSidebar';
import { Mic, Play, Volume2, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

export default function LessonPage() {
  const [currentVerse, setCurrentVerse] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  const verses = [
    { arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', transliteration: 'Bismillahir Rahmanir Raheem', translation: 'In the name of Allah, the Most Merciful, the Most Compassionate.' },
    { arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', transliteration: 'Alhamdu lillahi Rabbil Alameen', translation: 'All praise is due to Allah, Lord of the Worlds.' },
    { arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', transliteration: 'Ar-Rahmanir Raheem', translation: 'The Most Merciful, the Most Compassionate.' },
    { arabic: 'مَالِكِ يَوْمِ الدِّينِ', transliteration: 'Maliki Yawmid Deen', translation: 'Master of the Day of Judgment.' },
  ];

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
          ]
        });
      }, 3000);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar />
      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lesson: Surah Al-Fatihah</h1>
              <p className="text-gray-500">Verse {currentVerse} of {verses.length}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100"><Volume2 className="w-5 h-5" /></button>
              <button className="p-2 rounded-lg hover:bg-gray-100"><MessageCircle className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Verse Display */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6 text-center">
            <p className="arabic-text text-4xl text-gray-900 mb-4 leading-relaxed">
              {verses[currentVerse - 1].arabic}
            </p>
            <p className="text-lg text-primary-600 font-medium mb-2">
              {verses[currentVerse - 1].transliteration}
            </p>
            <p className="text-gray-500">
              {verses[currentVerse - 1].translation}
            </p>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button 
              onClick={() => setCurrentVerse(Math.max(1, currentVerse - 1))}
              disabled={currentVerse === 1}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button className="p-4 rounded-full bg-primary-600 text-white hover:bg-primary-700 shadow-lg">
              <Play className="w-8 h-8" />
            </button>

            <button 
              onClick={handleRecord}
              className={`p-4 rounded-full shadow-lg transition-all ${
                isRecording ? 'bg-red-500 animate-pulse' : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
            >
              <Mic className="w-8 h-8" />
            </button>

            <button 
              onClick={() => setCurrentVerse(Math.min(verses.length, currentVerse + 1))}
              disabled={currentVerse === verses.length}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* AI Feedback */}
          {feedback && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">AI Feedback</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-emerald-600">{feedback.score}%</span>
                  <span className="text-sm text-gray-500">Good</span>
                </div>
              </div>
              <div className="space-y-3">
                {feedback.items.map((item: any, idx: number) => (
                  <div key={idx} className={`p-3 rounded-lg flex items-start gap-3 ${
                    item.type === 'error' ? 'bg-red-50 border border-red-100' :
                    item.type === 'warning' ? 'bg-amber-50 border border-amber-100' :
                    'bg-emerald-50 border border-emerald-100'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      item.type === 'error' ? 'bg-red-500' :
                      item.type === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
