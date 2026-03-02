import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const Auth = ({ type }: { type: 'login' | 'register' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    category: 'general'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (data.user.category === 'coaching') {
          navigate('/coaching-dashboard');
        } else {
          navigate('/dashboard');
        }
        window.location.reload();
      } else {
        alert(data.error || data.message);
      }
    } catch (err) {
      alert('সার্ভার এরর! অনুগ্রহ করে পরে চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-4 pt-32">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl shadow-primary/10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-primary/20">
            <BookOpen size={32} />
          </div>
          <h1 className="text-2xl font-bold">{type === 'login' ? 'ফিরে আসায় স্বাগতম!' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}</h1>
          <p className="text-slate-500 text-sm mt-2">DaPathshala এআই শিক্ষা প্ল্যাটফর্ম</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {type === 'register' && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">পূর্ণ নাম</label>
                <input 
                  type="text" 
                  required
                  placeholder="আপনার নাম লিখুন" 
                  className="nexes-input"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">আপনি কোন ক্যাটাগরির?</label>
                <select 
                  className="nexes-input"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="general">সকল শিক্ষার্থী (মাদ্রাসাসহ)</option>
                  <option value="parent">অভিভাবক</option>
                  <option value="coaching">কোচিং সেন্টার</option>
                  <option value="university">বিশ্ববিদ্যালয় পরীক্ষার্থী</option>
                  <option value="departmental">বিভাগীয় পরীক্ষার্থী (SAS সহ)</option>
                </select>
              </div>
            </>
          )}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">ইমেইল ঠিকানা</label>
            <input 
              type="email" 
              required
              placeholder="name@example.com" 
              className="nexes-input"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">পাসওয়ার্ড</label>
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              className="nexes-input"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" disabled={loading} className="gradient-button w-full py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 mt-4">
            {loading ? 'প্রসেসিং...' : (type === 'login' ? 'লগইন করুন' : 'রেজিস্ট্রেশন করুন')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            {type === 'login' ? 'অ্যাকাউন্ট নেই?' : 'ইতিমধ্যে অ্যাকাউন্ট আছে?'} 
            <Link to={type === 'login' ? '/register' : '/login'} className="text-primary font-bold ml-2">
              {type === 'login' ? 'রেজিস্ট্রেশন' : 'লগইন'}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
