import React, { useState, useEffect } from 'react';
import { PenTool, CheckCircle2, Zap, ChevronRight } from 'lucide-react';

const ExamSystem = () => {
  const [examStarted, setExamStarted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  const startExam = () => {
    setQuestions([
      { id: 1, question: "নিচের কোনটি মৌলিক পদার্থ?", options: ["পানি", "লবণ", "অক্সিজেন", "চিনি"], answer: "অক্সিজেন" },
      { id: 2, question: "আলোর বেগ কত?", options: ["3x10^8 m/s", "3x10^6 m/s", "2x10^8 m/s", "1x10^8 m/s"], answer: "3x10^8 m/s" },
    ]);
    setExamStarted(true);
    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        alert('সতর্কবার্তা: ট্যাব পরিবর্তন করা নিষেধ!');
      }
    });
  };

  useEffect(() => {
    if (examStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      alert('সময় শেষ! আপনার উত্তরপত্র জমা দেওয়া হয়েছে।');
      setExamStarted(false);
    }
  }, [examStarted, timeLeft]);

  if (!examStarted) {
    return (
      <div className="min-h-screen grid-bg p-4 md:p-8 pt-96">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8 rounded-3xl text-center relative mt-32">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-xl">
              <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center">
                <PenTool size={40} className="text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2 mt-12">অনলাইন পরীক্ষা</h1>
          <p className="text-slate-500 mb-6">আপনার মেধা যাচাই করতে পরীক্ষায় অংশগ্রহণ করুন।</p>
          <div className="bg-slate-50 p-4 rounded-xl text-left mb-6 space-y-2">
            <p className="text-sm flex items-center space-x-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>সময়: ১০ মিনিট</span>
            </p>
            <p className="text-sm flex items-center space-x-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>ট্যাব পরিবর্তন করা যাবে না</span>
            </p>
            <p className="text-sm flex items-center space-x-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>ক্লিপবোর্ড লক থাকবে</span>
            </p>
          </div>
          <button onClick={startExam} className="nexes-button-primary w-full">পরীক্ষা শুরু করুন</button>
        </div>
      </div>
    </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="fixed inset-0 bg-white z-[100] p-4 md:p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b">
          <div>
            <h2 className="text-xl font-bold">মডেল টেস্ট - ০১</h2>
            <p className="text-sm text-slate-500">প্রশ্ন {currentIdx + 1} / {questions.length}</p>
          </div>
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-mono font-bold flex items-center space-x-2">
            <Zap size={18} />
            <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>
        </header>

        <div className="space-y-6">
          <div className="text-lg font-bold p-6 bg-slate-50 rounded-2xl border border-slate-100">
            {q.question}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {q.options.map((opt: string, i: number) => (
              <button 
                key={i}
                onClick={() => setAnswers({...answers, [q.id]: opt})}
                className={`p-4 rounded-xl border text-left transition-all ${
                  answers[q.id] === opt 
                  ? 'border-primary bg-primary/5 text-primary font-bold' 
                  : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <span className="mr-3 opacity-50">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <footer className="mt-12 flex justify-between items-center">
          <button 
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
            className="nexes-button-secondary"
          >
            পূর্ববর্তী
          </button>
          {currentIdx === questions.length - 1 ? (
            <button onClick={() => alert('পরীক্ষা সম্পন্ন হয়েছে!')} className="nexes-button-primary">সাবমিট করুন</button>
          ) : (
            <button onClick={() => setCurrentIdx(currentIdx + 1)} className="nexes-button-primary">পরবর্তী</button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default ExamSystem;
