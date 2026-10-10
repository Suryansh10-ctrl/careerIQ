import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { Anchor, Compass, FileText, Flag, Sparkles, ArrowRight, Lock, Check } from 'lucide-react';

export const VoyagePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Page Header */}
        <div>
          <h1 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#f4f1de] tracking-tight">
            Your Career Voyage
          </h1>
          <p className="text-sm sm:text-base text-[#d5c6a5] mt-1 font-serif">
            Target role: <span className="text-[#f4f1de] font-semibold">Data Analyst</span> · Location: <span className="text-[#f4f1de] font-semibold">India</span> · Five ports, one step at a time.
          </p>
        </div>

        {/* VOYAGE CHART PARCHMENT MAP CONTAINER (Matching Screenshot 4) */}
        <div className="bg-[#ebdcb9] text-[#2c1d11] rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#c8b793] space-y-8 relative overflow-hidden">
          
          {/* Top Parchment Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#c8b793]/60">
            <h2 className="text-2xl font-serif-title italic font-normal text-[#2c1d11]">
              Voyage Chart
            </h2>
            <span className="text-xs font-serif font-medium text-[#5a422d] bg-[#d9c79e] px-3 py-1 rounded-full border border-[#b8a57c]">
              Port 3 of 5 in progress
            </span>
          </div>

          {/* Connected 5 Ports Timeline Map */}
          <div className="relative py-8 px-2 sm:px-6">
            
            {/* Horizontal Connecting Route Lines */}
            <div className="absolute top-[4.2rem] left-[10%] right-[10%] h-1 flex items-center pointer-events-none">
              {/* Completed Path Line (Solid Gold Brown) */}
              <div className="w-[45%] h-full bg-[#8c6527]" />
              {/* Locked Path Line (Dashed Dotted Line) */}
              <div className="w-[55%] h-0.5 border-t-2 border-dashed border-[#8c6527]/50" />
            </div>

            {/* 5 Ports Grid */}
            <div className="grid grid-cols-5 gap-2 sm:gap-4 relative z-10 text-center">
              
              {/* PORT 1: RESUME (Completed) */}
              <div className="flex flex-col items-center group cursor-pointer" onClick={() => navigate('/resume')}>
                <div className="relative mb-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#2c1d11] text-[#ebdcb9] flex items-center justify-center border-2 border-[#8c6527] shadow-xl group-hover:scale-105 transition-transform">
                    <Anchor className="w-6 h-6 sm:w-7 sm:h-7 text-[#ebdcb9]" />
                  </div>
                  {/* Completed Green Check Badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#2e6f40] border-2 border-[#ebdcb9] flex items-center justify-center text-white text-xs font-bold">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-serif-title font-bold text-[#2c1d11] leading-tight">
                  Resume
                </h4>
                <span className="text-xs font-serif font-semibold text-[#2e6f40] mt-0.5">Completed</span>
                <span className="text-[11px] font-serif text-[#5a422d] leading-tight mt-0.5 hidden sm:inline">
                  Resume confirmed
                </span>
              </div>

              {/* PORT 2: SKILL GAP (Completed) */}
              <div className="flex flex-col items-center group cursor-pointer" onClick={() => navigate('/skill-gap')}>
                <div className="relative mb-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#2c1d11] text-[#ebdcb9] flex items-center justify-center border-2 border-[#8c6527] shadow-xl group-hover:scale-105 transition-transform">
                    <Compass className="w-6 h-6 sm:w-7 sm:h-7 text-[#ebdcb9]" />
                  </div>
                  {/* Completed Green Check Badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#2e6f40] border-2 border-[#ebdcb9] flex items-center justify-center text-white text-xs font-bold">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-serif-title font-bold text-[#2c1d11] leading-tight">
                  Skill Gap
                </h4>
                <span className="text-xs font-serif font-semibold text-[#2e6f40] mt-0.5">Completed</span>
                <span className="text-[11px] font-serif text-[#5a422d] leading-tight mt-0.5 hidden sm:inline">
                  5 gaps found
                </span>
              </div>

              {/* PORT 3: ROADMAP (In Progress - Active with Floating Pirate Boat!) */}
              <div className="flex flex-col items-center group cursor-pointer relative" onClick={() => navigate('/roadmap')}>
                {/* Floating Ship Icon above Port 3 */}
                <div className="absolute -top-10 flex flex-col items-center animate-bounce">
                  <div className="text-xl">⛵</div>
                </div>

                <div className="relative mb-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0d2e4e] text-[#f4f1de] flex items-center justify-center border-2 border-[#ebdcb9] ring-4 ring-[#8c6527]/30 shadow-2xl scale-105">
                    <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-[#f4f1de]" />
                  </div>
                  {/* Active 3/7 Pill Badge */}
                  <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[#d9c79e] border border-[#2c1d11] text-[10px] font-bold text-[#2c1d11]">
                    3/7
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-serif-title font-bold text-[#2c1d11] leading-tight">
                  Roadmap
                </h4>
                <span className="text-xs font-serif font-semibold text-[#0d2e4e] mt-0.5">In progress</span>
                <span className="text-[11px] font-serif text-[#5a422d] leading-tight mt-0.5 hidden sm:inline">
                  Stage 3 of 7 · assessment ready
                </span>
              </div>

              {/* PORT 4: JOB RECOMMENDATIONS (Locked) */}
              <div className="flex flex-col items-center group cursor-pointer opacity-80" onClick={() => navigate('/jobs')}>
                <div className="relative mb-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#d9c79e] text-[#5a422d] flex items-center justify-center border-2 border-[#b8a57c] shadow-md">
                    <Flag className="w-6 h-6 sm:w-7 sm:h-7 text-[#5a422d]" />
                  </div>
                  {/* Lock Badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#5a422d] border-2 border-[#ebdcb9] flex items-center justify-center text-[#ebdcb9]">
                    <Lock className="w-3 h-3" />
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-serif-title font-bold text-[#2c1d11] leading-tight">
                  Job Recommendations
                </h4>
                <span className="text-xs font-serif text-[#5a422d] mt-0.5">Locked</span>
                <span className="text-[11px] font-serif text-[#5a422d]/80 leading-tight mt-0.5 hidden sm:inline">
                  Complete your roadmap
                </span>
              </div>

              {/* PORT 5: LINKEDIN OPTIMIZATION (Locked · Flagship with Starburst!) */}
              <div className="flex flex-col items-center group cursor-pointer" onClick={() => navigate('/linkedin')}>
                <div className="relative mb-3">
                  {/* Golden Radial Sunburst Circle */}
                  <div className="absolute -inset-2 rounded-full border border-dashed border-[#8c6527]/40 animate-spin-slow pointer-events-none" />
                  
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#d9c79e] text-[#5a422d] flex items-center justify-center border-2 border-[#b8a57c] shadow-md group-hover:scale-105 transition-transform">
                    <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#8c6527]" />
                  </div>
                  {/* Lock Badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#5a422d] border-2 border-[#ebdcb9] flex items-center justify-center text-[#ebdcb9]">
                    <Lock className="w-3 h-3" />
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-serif-title font-bold text-[#2c1d11] leading-tight">
                  LinkedIn Optimization
                </h4>
                <span className="text-xs font-serif text-[#5a422d] mt-0.5">Locked · Flagship</span>
                <span className="text-[11px] font-serif text-[#5a422d]/80 leading-tight mt-0.5 hidden sm:inline">
                  Review your job matches
                </span>
              </div>

            </div>

          </div>

          {/* Bottom Parchment Legend */}
          <div className="flex items-center gap-6 pt-4 border-t border-[#c8b793]/60 text-xs font-serif text-[#5a422d]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#2e6f40]" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#0d2e4e]" />
              <span>In progress</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#d9c79e] border border-[#5a422d]" />
              <span>Locked</span>
            </div>
          </div>

        </div>

        {/* BOTTOM GRID (2 CARDS: NEXT STEP + READINESS) matching Screenshot 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* CARD 1: NEXT STEP (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-[#0b1a2d] border border-[#c5a059]/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#c5a059]">
                  NEXT STEP
                </span>
                <span className="px-3 py-1 rounded-full border border-[#c5a059]/40 bg-[#071322] text-[11px] font-serif text-[#f4f1de]">
                  AI-assisted roadmap
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#f4f1de]">
                Take the Stage 3 assessment
              </h3>

              <p className="text-sm font-serif text-[#d5c6a5] leading-relaxed">
                You've completed the resources for Data Cleaning & SQL Basics. Score 70% or higher to unlock Stage 4.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/roadmap')}
                className="px-6 py-3 rounded-full bg-[#c5a059] text-[#0a1b2d] font-serif font-bold text-xs uppercase tracking-wider hover:bg-[#e5c158] transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Start assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/roadmap')}
                className="text-xs font-serif text-[#f4f1de] underline underline-offset-4 hover:text-[#e5c158] transition-colors cursor-pointer"
              >
                Review stage resources
              </button>
            </div>

          </div>

          {/* CARD 2: READINESS (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-[#0b1a2d] border border-[#c5a059]/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl space-y-6">
            
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#c5a059]">
                READINESS
              </span>

              {/* 3 Metrics Row */}
              <div className="grid grid-cols-3 gap-4 pt-2 text-center">
                <div>
                  <div className="text-3xl sm:text-4xl font-serif-title font-bold text-[#f4f1de]">
                    5 / 12
                  </div>
                  <div className="text-[11px] font-serif text-[#d5c6a5] mt-1">
                    Skill gaps closed
                  </div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-serif-title font-bold text-[#f4f1de]">
                    2 / 7
                  </div>
                  <div className="text-[11px] font-serif text-[#d5c6a5] mt-1">
                    Stages passed
                  </div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-serif-title font-bold text-[#f4f1de]">
                    78%
                  </div>
                  <div className="text-[11px] font-serif text-[#d5c6a5] mt-1 leading-tight">
                    Last score · pass mark 70%
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="space-y-2 pt-4 border-t border-[#c5a059]/20">
              <div className="flex items-center justify-between text-xs font-serif">
                <span className="text-[#d5c6a5]">Roadmap progress</span>
                <span className="text-[#f4f1de] font-semibold">29% complete</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#071322] border border-[#c5a059]/30 overflow-hidden">
                <div className="h-full bg-[#c5a059] w-[29%]" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};
