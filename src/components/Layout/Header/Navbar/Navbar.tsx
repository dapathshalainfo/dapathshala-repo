import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Zap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'হোম', path: '/' },
    { name: 'প্রশ্ন জেনারেটর', path: '/generate' },
    { name: 'পরীক্ষা সিস্টেম', path: '/exams' },
    { name: 'স্টোর', path: '/shop' },
    { name: 'SAS স্পেশাল', path: '/sas' },
  ];

  const isLandingPage = location.pathname === '/';

  return (
    <nav id="main-navbar" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isLandingPage ? 'bg-white/70 backdrop-blur-lg border-b border-slate-200/50 shadow-sm' : 'bg-white border-b border-slate-200 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-10">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
                <BookOpen size={26} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900 font-sans tracking-tight leading-none group-hover:text-primary transition-colors">DaPathshala</span>
                <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">AI Education</span>
              </div>
            </Link>
            
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 relative group ${
                    location.pathname === item.path 
                      ? 'text-primary bg-primary/5' 
                      : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-5">
            <Link to="/login" className="px-4 py-2 text-sm font-bold text-slate-700 hover:text-primary transition-all duration-200">লগইন</Link>
            <Link to="/register" className="gradient-button px-7 py-3 rounded-2xl text-sm font-bold flex items-center space-x-2 shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
              <Zap size={18} className="fill-current" />
              <span>ফ্রি রেজিস্ট্রেশন</span>
            </Link>
          </div>

          <button 
            className="lg:hidden p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-medium text-slate-600"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col space-y-3">
                <Link to="/login" className="text-center py-3 text-slate-600 font-bold border border-slate-200 rounded-xl">লগইন</Link>
                <Link to="/register" className="gradient-button text-center py-3 rounded-xl font-bold">ফ্রি রেজিস্ট্রেশন</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
