import React from 'react';
import { Compass, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onSetSail?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSetSail }) => {
  const navigate = useNavigate();

  const handleSetSailClick = () => {
    if (onSetSail) {
      onSetSail();
    } else {
      navigate('/voyage');
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-20 pb-10 overflow-hidden bg-[url('/images/ship_deck_hero_bg.jpg')] bg-cover bg-center bg-no-repeat text-[#f5f0eb] select-none">
      
      {/* Cinematic Vignette Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080d16]/75 via-[#080d16]/30 to-[#080d16]/85 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-0" />

      {/* CENTER HERO CONTENT OVERLAY */}
      <div className="relative z-20 max-w-3xl mx-auto text-center px-6 my-auto pt-8 pb-12 flex flex-col items-center">
        
        {/* Top Badge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5a059]/60 bg-[#0a121e]/80 backdrop-blur-md shadow-lg mb-6 hover:border-[#d4af37] transition-all">
          <Compass className="w-3.5 h-3.5 text-[#e0b457]" />
          <span className="text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.2em] font-semibold text-[#e0b457]">
            YOUR SKILLS &times; BETTER OPPORTUNITIES
          </span>
        </div>

        {/* Golden Wheel Logo + Main Brand Title */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#d4af37] bg-[#120c07]/80 backdrop-blur-md flex items-center justify-center text-[#e5c158] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#e5c158]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
            </svg>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold tracking-wider text-[#ffffff] drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
            CAREERIQ
          </h1>
        </div>

        {/* Headline / Tagline */}
        <h2 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold uppercase tracking-[0.15em] text-[#f4efe8] max-w-2xl mx-auto drop-shadow-md my-3 leading-snug">
          CHART YOUR SKILLS. FIND YOUR NEXT JOB.
        </h2>

        {/* Subtitle Description */}
        <p className="text-xs sm:text-sm font-serif text-[#d8cebe] max-w-xl mx-auto leading-relaxed font-normal drop-shadow-sm mb-8">
          Discover opportunities that match your skills, uncover the skills you're missing, and chart your own path to career success. Stop applying blindly.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Primary CTA: SET SAIL */}
          <button
            onClick={handleSetSailClick}
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#e5bc5d] via-[#d4af37] to-[#b88e28] hover:from-[#f0c868] hover:to-[#c59d32] text-[#0f0d09] font-serif text-xs sm:text-sm font-bold tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#0f0d09]" />
            <span>SET SAIL</span>
            <ArrowRight className="w-4 h-4 text-[#0f0d09]" />
          </button>

          {/* Secondary CTA: Explore Interactive Demo */}
          <button
            onClick={handleSetSailClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0d1624]/80 hover:bg-[#152338]/90 border border-[#c5a059]/40 text-[#f5f0eb] font-serif text-xs sm:text-sm font-semibold tracking-wider shadow-lg hover:border-[#d4af37] hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span>Explore Interactive Demo</span>
          </button>
        </div>

      </div>

      {/* Bottom Right Scroll Indicator */}
      <div className="absolute bottom-6 right-6 sm:right-10 z-20 flex flex-col items-center gap-1 text-[#c5a059] font-serif text-[10px] uppercase tracking-widest opacity-85 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-medium tracking-wider">SCROLL DOWN</span>
        <svg className="w-3.5 h-3.5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

    </section>
  );
};
