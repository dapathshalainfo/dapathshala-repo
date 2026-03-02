import React, { useState } from 'react';
import { Zap, Download, Edit3, Trash2, CheckCircle2, AlertCircle, Plus, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { generateQuestions } from '../../../../services/geminiService';

const QuestionGenerator = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    classLevel: '১০ম শ্রেণি',
    subject: 'পদার্থবিজ্ঞান',
    topic: '',
    type: 'mcq' as 'mcq' | 'written' | 'creative',
    count: 10
  });

  const handleGenerate = async () => {
    if (!formData.topic) {
      alert('অনুগ্রহ করে একটি টপিক লিখুন');
      return;
    }
    setLoading(true);
    try {
      const result = await generateQuestions({
        subject: formData.subject,
        classLevel: formData.classLevel,
        topic: formData.topic,
        count: formData.count,
        type: formData.type
      });
      setQuestions(result);
      setStep(2);
    } catch (error) {
      console.error(error);
      alert('প্রশ্ন তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleNotLiked = () => {
    handleGenerate();
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-24">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">এআই প্রশ্ন জেনারেটর</h1>
        <p className="text-slate-500">মাত্র ১ মিনিটে আপনার কাঙ্খিত প্রশ্ন তৈরি করুন।</p>
      </header>

      {step === 1 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-[2rem] space-y-6 shadow-xl shadow-primary/5"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">শ্রেণি</label>
              <select 
                className="nexes-input"
                value={formData.classLevel}
                onChange={(e) => setFormData({...formData, classLevel: e.target.value})}
              >
                <option>১০ম শ্রেণি</option>
                <option>১১শ শ্রেণি</option>
                <option>১২শ শ্রেণি</option>
                <option>বিসিএস/জব</option>
                <option>বিশ্ববিদ্যালয় ভর্তি</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">বিষয়</label>
              <select 
                className="nexes-input"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              >
                <option>পদার্থবিজ্ঞান</option>
                <option>রসায়ন</option>
                <option>গণিত</option>
                <option>জীববিজ্ঞান</option>
                <option>ইংরেজি</option>
                <option>বাংলা</option>
                <option>সাধারণ জ্ঞান</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">অধ্যায় বা টপিক</label>
            <input 
              type="text" 
              placeholder="যেমন: গতি, বল, কাজ ও শক্তি" 
              className="nexes-input"
              value={formData.topic}
              onChange={(e) => setFormData({...formData, topic: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">প্রশ্নের ধরন</label>
              <select 
                className="nexes-input"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as any})}
              >
                <option value="mcq">MCQ (বহুনির্বাচনী)</option>
                <option value="written">লিখিত</option>
                <option value="creative">সৃজনশীল</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">প্রশ্নের সংখ্যা</label>
              <select 
                className="nexes-input"
                value={formData.count}
                onChange={(e) => setFormData({...formData, count: parseInt(e.target.value)})}
              >
                <option value={10}>১০টি</option>
                <option value={20}>২০টি</option>
                <option value={50}>৫০টি</option>
                <option value={100}>১০০টি</option>
              </select>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="gradient-button w-full py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-primary/20"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Zap size={18} />
                <span>প্রশ্ন তৈরি করুন</span>
              </>
            )}
          </button>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 no-select"
        >
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800">তৈরিকৃত প্রশ্নসমূহ ({questions.length})</h2>
            <div className="flex space-x-2">
              <button className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:text-primary transition-colors">
                <Download size={18} />
              </button>
              <button className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:text-primary transition-colors">
                <Edit3 size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative group overflow-hidden">
                <div className="watermark" />
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-slate-300 hover:text-red-500 bg-slate-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-lg font-bold mb-6 text-slate-900 leading-relaxed">{idx + 1}. {q.question}</p>
                {q.options && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {q.options.map((opt: string, i: number) => (
                      <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50 text-sm font-medium text-slate-700">
                        <span className="mr-3 text-primary font-bold">{String.fromCharCode(65 + i)}.</span> {opt}
                      </div>
                    ))}
                  </div>
                )}
                <details className="group">
                  <summary className="nexes-button-secondary w-full flex items-center justify-between cursor-pointer list-none">
                    <span className="font-bold">উত্তর দেখুন</span>
                    <ChevronRight size={18} className="group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="mt-4 p-6 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100">
                    <p className="font-bold mb-2 flex items-center space-x-2">
                      <CheckCircle2 size={18} />
                      <span>সঠিক উত্তর: {q.answer}</span>
                    </p>
                    {q.explanation && <p className="mt-3 text-sm font-normal opacity-90 leading-relaxed border-t border-emerald-100 pt-3">ব্যাখ্যা: {q.explanation}</p>}
                  </div>
                </details>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-8">
            <button 
              onClick={handleNotLiked}
              className="nexes-button-secondary flex-1 py-4 flex items-center justify-center space-x-2"
            >
              <AlertCircle size={18} />
              <span>পছন্দ হয়নি? আবার তৈরি করুন</span>
            </button>
            <button className="gradient-button flex-1 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2">
              <Plus size={18} />
              <span>সব ড্যাশবোর্ডে যোগ করুন</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuestionGenerator;
