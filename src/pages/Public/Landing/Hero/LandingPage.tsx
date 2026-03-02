import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ChevronRight, School, GraduationCap, Briefcase, Users } from 'lucide-react';
import { motion } from 'motion/react';

const LandingPage = () => {
  const categories = [
    {
      title: 'কোচিং সেন্টার',
      description: 'আপনার প্রতিষ্ঠানের জন্য অটোমেটেড প্রশ্ন ও রেজাল্ট ম্যানেজমেন্ট সিস্টেম।',
      icon: <School size={32} />,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'বিশ্ববিদ্যালয় পরীক্ষার্থী',
      description: 'ভর্তি পরীক্ষার জন্য বিশেষায়িত MCQ ও মডেল টেস্ট দিয়ে নিজেকে যাচাই করুন।',
      icon: <GraduationCap size={32} />,
      color: 'bg-indigo-500',
      lightColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      title: 'বিভাগীয় পরীক্ষার্থী',
      description: 'বিসিএস, ব্যাংক ও সরকারি চাকরির প্রস্তুতির জন্য সেরা AI প্ল্যাটফর্ম।',
      icon: <Briefcase size={32} />,
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      title: 'অভিভাবক',
      description: 'সন্তানের পড়াশোনার অগ্রগতি ট্র্যাক করুন এবং ঘরে বসে পরীক্ষা নিন।',
      icon: <Users size={32} />,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    }
  ];

  return (
    <div className="relative min-h-screen grid-bg pt-32 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 pb-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-8 border border-primary/20"
          >
            <Zap size={16} className="fill-primary" />
            <span>AI-ভিত্তিক শিক্ষা প্ল্যাটফর্ম</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-[1.1]"
          >
            শিক্ষার নতুন যুগ <br />
            <span className="gradient-text">DaPathshala</span> এর সাথে
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            মাত্র ১ মিনিটে যেকোনো বিষয়ের উপর AI দিয়ে প্রশ্ন তৈরি করুন। ১ম থেকে দ্বাদশ শ্রেণি পর্যন্ত MCQ, লিখিত ও সৃজনশীল প্রশ্ন।
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/register" className="gradient-button px-10 py-4 rounded-2xl text-lg font-bold flex items-center space-x-3 shadow-xl shadow-primary/20 w-full sm:w-auto justify-center">
              <Zap size={20} />
              <span>বিনামূল্যে শুরু করুন</span>
              <ChevronRight size={20} />
            </Link>
            <Link to="/generate" className="px-10 py-4 rounded-2xl text-lg font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center space-x-3 w-full sm:w-auto justify-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-slate-700 border-b-[6px] border-b-transparent ml-1" />
              </div>
              <span>প্রশ্ন তৈরি করে দেখুন</span>
            </Link>
          </motion.div>
        </div>

        {/* Categories Section */}
        <div id="landing-categories" className="mt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 ${cat.lightColor} ${cat.textColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{cat.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-6 flex items-center text-primary font-bold text-sm cursor-pointer group/link">
                  <span>বিস্তারিত দেখুন</span>
                  <ChevronRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
