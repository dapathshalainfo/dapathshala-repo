import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Layout/Header/Navbar/Navbar';
import Auth from './components/Auth/Forms/Registration/AuthForm';
import QuestionGenerator from './components/Generator/AI/QuestionGenerator/QuestionGenerator';
import ScrollToTop from './components/Common/ScrollToTop';

// Pages
import LandingPage from './pages/Public/Landing/Hero/LandingPage';
import Dashboard from './pages/Protected/Dashboards/Student/Main/Dashboard';
import SASSpecial from './pages/Protected/Special/SAS/Module/SASSpecial';
import ExamSystem from './pages/Protected/Education/Exams/Live/ExamSystem';
import CoachingDashboard from './pages/Protected/Dashboards/Coaching/Admin/CoachingDashboard';
import ParentDashboard from './pages/Protected/Dashboards/Parent/Overview/ParentDashboard';

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));

    // Security: Prevent Right Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);

    // Security: Prevent Keyboard Shortcuts (F12, Ctrl+Shift+I, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Auth type="login" />} />
          <Route path="/register" element={<Auth type="register" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/generate" element={<div className="pt-48"><QuestionGenerator /></div>} />
          <Route path="/exams" element={<ExamSystem />} />
          <Route path="/sas" element={<SASSpecial />} />
          <Route path="/coaching-dashboard" element={<CoachingDashboard />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          <Route path="/shop" element={<div className="pt-32 p-8 text-center">ই-কমার্স ল্যান্ডিং পেজ শীঘ্রই আসছে...</div>} />
          <Route path="/profile" element={<div className="pt-32 p-8 text-center">প্রোফাইল সেটিংস শীঘ্রই আসছে...</div>} />
        </Routes>
      </div>
    </Router>
  );
}
