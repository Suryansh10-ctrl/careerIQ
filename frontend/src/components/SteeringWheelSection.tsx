import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SteeringWheel, FEATURES_DATA } from './SteeringWheel';
import type { FeatureNode } from './SteeringWheel';
import { FeatureModal } from './FeatureModal';
import { Compass, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const SteeringWheelSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wheelWrapperRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [selectedFeature, setSelectedFeature] = useState<FeatureNode | null>(null);
  const [activeFeatureId, setActiveFeatureId] = useState<number>(1);
  const [exploredCount, setExploredCount] = useState<number>(1);

  useEffect(() => {
    const el = sectionRef.current;
    const wheelWrap = wheelWrapperRef.current;
    if (!el || !wheelWrap) return;

    const ctx = gsap.context(() => {
      // Pinned smooth scroll sequence
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: '+=1600',
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;

          // Smooth rotation from 0 to 360 degrees
          const deg = p * 360;
          setRotation(deg);

          // Controlled upward shift: moves up slightly during exploration, then settles back smoothly to 0
          let yShift = 0;
          if (p < 0.75) {
            yShift = - (p / 0.75) * 50; // moves up up to -50px
          } else {
            yShift = -50 + ((p - 0.75) / 0.25) * 50; // returns smoothly to 0
          }

          // Fade out slightly at the very end of scroll (from p=0.90 to 1.0) to prevent any transition collision
          let op = 1;
          if (p > 0.90) {
            op = 1 - ((p - 0.90) / 0.10);
          }

          gsap.set(wheelWrap, { y: yShift, opacity: Math.max(0.15, op) });

          // Active feature calculation
          const index = Math.min(
            Math.floor(p * FEATURES_DATA.length),
            FEATURES_DATA.length - 1
          );
          setActiveFeatureId(FEATURES_DATA[index].id);
          setExploredCount(index + 1);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeFeature = FEATURES_DATA.find((f) => f.id === activeFeatureId) || FEATURES_DATA[0];

  return (
    <section
      id="wheel-section"
      ref={sectionRef}
      className="relative h-screen w-full py-8 px-4 bg-[#060d19] bg-ocean-gradient flex flex-col items-center justify-between overflow-hidden select-none border-t border-brass/30 z-10"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brass-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 max-w-2xl text-center pt-4 space-y-1.5 text-[#f4f1de]">
        <div className="flex justify-center mb-1">
          <Compass className="w-6 h-6 text-[#c5a059]" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif-title font-bold tracking-tight text-[#f4f1de] drop-shadow-md">
          Turn the Wheel
        </h2>

        <div className="flex items-center justify-center gap-2 text-[#f4f1de] font-handwriting text-lg sm:text-xl font-normal">
          <span>Explore what we offer</span>
          <svg className="w-5 h-5 text-[#f4f1de]" viewBox="0 0 50 50" fill="none" stroke="currentColor">
            <path d="M 10,15 Q 30,10 35,35 M 25,30 L 35,35 L 35,22" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Feature Explorer Progress Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/40 bg-[#091524]/80 text-[#e5c158] text-[11px] font-serif font-medium mt-1 shadow-lg">
          <Sparkles className="w-3 h-3 text-[#e5c158]" />
          <span>Feature {exploredCount} of {FEATURES_DATA.length}: <strong>{activeFeature.title}</strong></span>
        </div>
      </div>

      {/* Steering Wheel Wrapper with Smooth Upward Shift and Fade Out */}
      <div ref={wheelWrapperRef} className="relative z-20 w-full flex items-center justify-center my-auto">
        <SteeringWheel
          rotationDegree={rotation}
          selectedFeatureId={activeFeatureId}
          onSelectFeature={(feat) => setSelectedFeature(feat as any)}
        />
      </div>

      {/* Feature Detail Modal Popup */}
      <FeatureModal
        feature={selectedFeature as any}
        onClose={() => setSelectedFeature(null)}
      />
    </section>
  );
};
