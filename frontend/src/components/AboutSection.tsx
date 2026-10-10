import React from 'react';
import { Compass } from 'lucide-react';
import shipAboutImg from '../assets/ship_about.jpg';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 bg-[#040810] border-t border-[#c5a059]/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column Text Content Matching Image 3 Middle Left */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] font-serif text-[#e5c158] font-semibold">
            ABOUT
          </span>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f4f1de] leading-tight">
            Every Career Begins with a Direction.
          </h2>

          <p className="text-sm sm:text-base text-[#ece4d0]/85 font-serif leading-relaxed">
            CareerIQ is designed to help people navigate the journey from their current skills to meaningful career opportunities. By connecting job discovery, skill-gap awareness, personalized learning roadmaps, and professional development, CareerIQ aims to make career planning clearer, more structured, and more accessible.
          </p>

          {/* Mission Card at bottom left */}
          <div className="p-6 rounded-2xl bg-[#081220] border border-[#c5a059]/40 shadow-xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1a1008] border border-[#c5a059] flex items-center justify-center text-[#e5c158] shrink-0 mt-1">
              <Compass className="w-5 h-5 text-[#e5c158]" />
            </div>
            <div>
              <h4 className="text-xs font-serif font-bold text-[#e5c158] uppercase tracking-wider mb-1">
                Mission Statement
              </h4>
              <p className="text-xs text-[#ece4d0]/90 italic font-serif">
                “Our mission is to help every learner understand where they stand, discover where they can go, and find a practical path to get there.”
              </p>
            </div>
          </div>
        </div>

        {/* Right Column Full Sail Pirate Ship Image Matching Image 3 Middle Left */}
        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden border-2 border-[#c5a059]/50 shadow-2xl shadow-[#e5c158]/10 group">
            <img
              src={shipAboutImg}
              alt="Pirate Ship Under Full Sail at Sunset"
              className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-110"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
