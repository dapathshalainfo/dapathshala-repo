import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, BookOpen, Award, FileText, Download, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const Dashboard = () => {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto pb-24 md:pb-8 pt-40">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">স্বাগতম, ব্যবহারকারী! 👋</h1>
        <p className="text-slate-500">আপনার আজকের পড়াশোনার অগ্রগতি এখানে দেখুন।</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-6 rounded-2xl flex items-center space-x-4"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">বোনাস পয়েন্ট</p>
            <p className="text-xl font-bold">৫০</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-6 rounded-2xl flex items-center space-x-4"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">তৈরিকৃত প্রশ্ন</p>
            <p className="text-xl font-bold">১২</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-6 rounded-2xl flex items-center space-x-4"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">অংশগ্রহণকৃত পরীক্ষা</p>
            <p className="text-xl font-bold">৫</p>
          </div>
        </motion.div>
      </div>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">সাম্প্রতিক কার্যক্রম</h2>
          <Link to="/history" className="text-primary text-sm font-medium flex items-center">
            সব দেখুন <ChevronRight size={16} />
          </Link>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="font-medium">পদার্থবিজ্ঞান - ২য় অধ্যায় (MCQ)</p>
                  <p className="text-xs text-slate-400">২ ঘণ্টা আগে</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-primary">
                <Download size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
