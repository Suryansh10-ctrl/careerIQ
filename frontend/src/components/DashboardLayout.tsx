import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { 
  Compass, LayoutDashboard, Map, Target, BookOpen, Briefcase, 
  Award, ChevronRight
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Voyage Overview', path: '/voyage', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Resume Analysis', path: '/resume', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Skill Gap Analysis', path: '/skill-gap', icon: <Target className="w-4 h-4" /> },
    { name: 'Learning Roadmap', path: '/roadmap', icon: <Map className="w-4 h-4" /> },
    { name: 'Jobs', path: '/jobs', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'LinkedIn Optimizer', path: '/linkedin', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#040810] text-[#ece4d0] font-serif flex flex-col pt-16">
      
      {/* Unified Top Header Navbar */}
      <Navbar />

      <div className="flex-1 flex relative">
        
        {/* STICKY Left Sidebar Navigation */}
        <aside className="w-64 bg-[#060e1a] border-r border-[#c5a059]/20 p-4 flex flex-col justify-between hidden lg:flex shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-serif transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#2c1d11] to-[#1a1008] border border-[#c5a059]/60 text-[#e5c158] font-bold shadow-lg'
                      : 'text-[#ece4d0]/70 hover:bg-[#0d1b2a] hover:text-[#f4f1de]'
                  }`}
                >
                  {item.icon}
                  <span className="flex-1">{item.name}</span>
                  {isActive && <ChevronRight className="w-4 h-4 text-[#e5c158]" />}
                </Link>
              );
            })}
          </div>

          {/* Bottom Sidebar Brand Footer */}
          <div className="pt-6 border-t border-[#c5a059]/20 text-center shrink-0">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-[#1a1008] border border-[#c5a059] flex items-center justify-center text-[#e5c158]">
              <Compass className="w-5 h-5 text-[#e5c158]" />
            </div>
            <div className="text-sm font-serif font-bold text-[#f4f1de]">CareerIQ</div>
            <div className="text-[10px] uppercase tracking-widest text-[#c5a059]">Sail Towards Opportunity</div>
          </div>

        </aside>

        {/* Main Content View Area */}
        <main className="flex-1 bg-[#040810] p-6 lg:p-8 overflow-y-auto min-w-0">
          {children}
        </main>

      </div>

    </div>
  );
};
