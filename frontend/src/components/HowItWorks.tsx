import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: "Discover Your Skills",
      desc: "Enter your existing skills, experience, interests, education and career goals."
    },
    {
      num: 2,
      title: "Find Your Opportunities",
      desc: "We compare your skills with role requirements and identify suitable opportunities."
    },
    {
      num: 3,
      title: "Bridge Your Skill Gaps",
      desc: "Get a personalized learning roadmap with relevant resources and prerequisites."
    },
    {
      num: 4,
      title: "Track Your Progress",
      desc: "Complete milestones, update your evidence, and reassess your skills."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-radial from-[#091526] via-[#040810] to-[#040810] border-t border-[#c5a059]/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header Matching Image 3 Top Right */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] font-serif text-[#e5c158] font-semibold">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f4f1de]">
            Your Career Journey in 4 Simple Steps
          </h2>
          <p className="text-[#ece4d0]/80 font-serif text-sm sm:text-base max-w-lg mx-auto">
            A clear and structured path to help you discover, learn, and achieve your career goals.
          </p>
        </div>

        {/* 4 Circular Steps with Horizontal Connecting Trunk Line */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-12 right-12 h-0.5 bg-gradient-to-r from-[#c5a059]/20 via-[#e5c158] to-[#c5a059]/20 z-0" />

          {steps.map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center text-center group">
              
              {/* Numbered Ring Badge */}
              <div className="w-20 h-20 rounded-full bg-[#081220] border-2 border-[#e5c158] flex items-center justify-center font-serif text-2xl font-bold text-[#e5c158] shadow-2xl mb-6 group-hover:scale-110 transition-transform">
                {s.num}
              </div>

              <h3 className="text-lg font-serif font-bold text-[#f4f1de] mb-2">
                {s.title}
              </h3>

              <p className="text-xs font-serif text-[#ece4d0]/75 leading-relaxed max-w-xs">
                {s.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
