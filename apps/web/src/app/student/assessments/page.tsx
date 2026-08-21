'use client';

import { useState } from 'react';
import { StudentSidebar } from '@/components/student/StudentSidebar';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Mic, Play, ChevronRight, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AssessmentPage() {
  const [step, setStep] = useState<'intro' | 'recitation' | 'result'>('intro');
  const [isRecording, setIsRecording] = useState(false);

  const startAssessment = () => setStep('recitation');
  const submitRecitation = () => { setIsRecording(false); setStep('result'); };

  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      <div className="max-w-xl mx-auto">

        {step === 'intro' && (
          <div className="iv-card p-6 sm:p-8 text-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, #1455B8 0%, #168FE8 100%)' }}
            >
              <Award className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-navy-800 mb-2">AI Assessment</h1>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">
              Complete a short recitation test so our AI can evaluate your level and create a personalized learning plan.
            </p>
            <div className="space-y-2.5 text-left rounded-xl p-4 mb-6 bg-surface border border-blue-100">
              {['Arabic letter recognition', 'Tajweed rules evaluation', 'Memorization accuracy', 'Pronunciation analysis'].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-navy-800">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#18A96B' }} />
                  {item}
                </div>
              ))}
            </div>
            <button onClick={startAssessment} className="btn-primary w-full">
              Start Assessment
            </button>
          </div>
        )}

        {step === 'recitation' && (
          <div className="iv-card p-6 sm:p-8 text-center">
            <p className="section-label mb-2">Question 1 of 3</p>
            <h2 className="text-xl font-bold text-navy-800 mb-6">Please read the following ayah</h2>
            <div
              className="arabic-text text-3xl text-white mb-8 p-6 rounded-2xl"
              style={{ background: 'linear-gradient(160deg, #041538 0%, #061B4F 100%)', border: '1px solid rgba(22,143,232,0.15)' }}
            >
              أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ
            </div>
            <div className="flex items-center justify-center gap-4 mb-5">
              <button className="p-3 rounded-xl bg-white border border-blue-50 shadow-card hover:shadow-card-hover transition-all text-navy-800">
                <Play className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`p-5 rounded-2xl text-white shadow-lg transition-all hover:scale-105 ${isRecording ? 'animate-pulse' : ''}`}
                style={{ background: isRecording ? '#ef4444' : 'linear-gradient(135deg, #18A96B 0%, #16A6A0 100%)' }}
              >
                <Mic className="w-8 h-8" />
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-6">
              {isRecording ? 'Recording… Tap to stop' : 'Tap the microphone to start recording'}
            </p>
            <button onClick={submitRecitation} className="btn-primary mx-auto">
              Submit <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 'result' && (
          <div className="iv-card p-6 sm:p-8 text-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, #18A96B 0%, #16A6A0 100%)' }}
            >
              <Award className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-navy-800 mb-2">Assessment Complete!</h2>
            <p className="text-slate-500 mb-6 text-sm">Your level has been determined by our AI.</p>

            <div
              className="rounded-2xl p-6 mb-6"
              style={{ background: 'linear-gradient(160deg, #041538 0%, #061B4F 100%)', border: '1px solid rgba(22,143,232,0.15)' }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-brand-bright" />
                <p className="section-label mb-0">Your Level</p>
              </div>
              <p className="text-3xl font-bold text-white">Intermediate</p>
              <p className="text-sm text-white/50 mt-1">Level 3 of 5</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-surface border border-blue-100">
                <p className="text-2xl font-bold text-navy-800">78%</p>
                <p className="text-xs text-slate-500 mt-0.5">Overall Score</p>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-blue-100">
                <p className="text-2xl font-bold" style={{ color: '#18A96B' }}>Good</p>
                <p className="text-xs text-slate-500 mt-0.5">Performance</p>
              </div>
            </div>

            <button className="btn-primary w-full">
              View Learning Plan
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
