'use client';

import { useState } from 'react';
import { StudentSidebar } from '@/components/student/StudentSidebar';
import { Mic, Play, ChevronRight, Award } from 'lucide-react';

export default function AssessmentPage() {
  const [step, setStep] = useState<'intro' | 'recitation' | 'result'>('intro');
  const [isRecording, setIsRecording] = useState(false);

  const startAssessment = () => setStep('recitation');

  const submitRecitation = () => {
    setIsRecording(false);
    setStep('result');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar />
      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          {step === 'intro' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-primary-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Assessment</h1>
              <p className="text-gray-600 mb-6">
                Complete a short recitation test so our AI can evaluate your level and create a personalized learning plan.
              </p>
              <div className="space-y-3 text-left bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-700">✓ Arabic letter recognition</p>
                <p className="text-sm text-gray-700">✓ Tajweed rules evaluation</p>
                <p className="text-sm text-gray-700">✓ Memorization accuracy</p>
                <p className="text-sm text-gray-700">✓ Pronunciation analysis</p>
              </div>
              <button onClick={startAssessment} className="px-8 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors">
                Start Assessment
              </button>
            </div>
          )}

          {step === 'recitation' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-2">Question 1 of 3</p>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Please read the following ayah</h2>
              <div className="arabic-text text-3xl text-gray-900 mb-8 p-6 bg-gray-50 rounded-xl">
                أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ
              </div>
              <div className="flex items-center justify-center gap-4 mb-6">
                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200">
                  <Play className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-5 rounded-full shadow-lg transition-all ${
                    isRecording ? 'bg-red-500 animate-pulse' : 'bg-emerald-500 hover:bg-emerald-600'
                  }`}
                >
                  <Mic className="w-8 h-8 text-white" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                {isRecording ? 'Recording... Tap to stop' : 'Tap the microphone to start recording'}
              </p>
              <button 
                onClick={submitRecitation}
                className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center gap-2 mx-auto"
              >
                Submit <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 'result' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
              <p className="text-gray-600 mb-6">Your level has been determined by our AI.</p>

              <div className="bg-primary-50 rounded-xl p-6 mb-6">
                <p className="text-sm text-primary-600 font-medium mb-1">Your Level</p>
                <p className="text-3xl font-bold text-primary-700">Intermediate</p>
                <p className="text-sm text-gray-600 mt-2">Level 3 of 5</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                  <p className="text-sm text-gray-500">Overall Score</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-gray-900">Good</p>
                  <p className="text-sm text-gray-500">Performance</p>
                </div>
              </div>

              <button className="px-8 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors">
                View Learning Plan
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
