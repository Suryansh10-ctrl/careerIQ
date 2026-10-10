import React, { useState, useEffect } from 'react';
import { Target, Briefcase, Compass, Users, FileText, Star, BarChart3 } from 'lucide-react';

export interface FeatureNode {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
}

export type FeaturePoint = FeatureNode;

export const FEATURES_DATA: FeatureNode[] = [
  {
    id: 1,
    title: "Resume Analysis",
    shortDesc: "Upload and confirm your skills",
    fullDesc: "Extract skills automatically from your resume PDF or text, verify extracted data, and confirm your technical stack.",
    iconName: "FileText",
  },
  {
    id: 2,
    title: "Skill Gap Analysis",
    shortDesc: "See what you're missing",
    fullDesc: "Compare your confirmed technical skills against live requirements for your target role and uncover critical missing competencies.",
    iconName: "Target",
  },
  {
    id: 3,
    title: "Learning Roadmaps",
    shortDesc: "Pass each stage to advance",
    fullDesc: "Navigate through structured, multi-stage learning roadmaps with curated resources and practical assessments to unlock progress.",
    iconName: "Compass",
  },
  {
    id: 4,
    title: "Soft Skills",
    shortDesc: "Communicate, collaborate, interview",
    fullDesc: "Build non-technical professional capabilities including interview preparation, system presentation, and team collaboration.",
    iconName: "Users",
  },
  {
    id: 5,
    title: "Career Resources",
    shortDesc: "Courses and practice material",
    fullDesc: "Access hand-curated learning paths, verified documentation, coding challenges, and mock interview practice materials.",
    iconName: "Star",
  },
  {
    id: 6,
    title: "Job Matching",
    shortDesc: "Roles via Indeed and Naukri",
    fullDesc: "Explore genuine job openings matched directly to your current skill score across major job boards.",
    iconName: "Briefcase",
  },
  {
    id: 7,
    title: "Progress Tracking",
    shortDesc: "Milestones and scores",
    fullDesc: "Track your overall readiness percentage, completed milestones, assessment scores, and skill gap closures.",
    iconName: "BarChart3",
  },
  {
    id: 8,
    title: "LinkedIn Optimizer",
    shortDesc: "Flagship · polish your profile",
    fullDesc: "Receive AI-powered profile rewrites, keyword alignment analysis, and section score breakdowns to stand out to recruiters.",
    iconName: "Star",
  },
];

interface SteeringWheelProps {
  rotationDegree: number;
  selectedFeatureId: number | null;
  onSelectFeature: (feature: FeatureNode) => void;
}

export const SteeringWheel: React.FC<SteeringWheelProps> = ({
  rotationDegree,
  selectedFeatureId,
  onSelectFeature,
}) => {
  const [radiusPx, setRadiusPx] = useState<number>(240);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadiusPx(145);
      } else if (window.innerWidth < 768) {
        setRadiusPx(185);
      } else {
        setRadiusPx(215);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Target': return <Target className="w-4 h-4 sm:w-5 sm:h-5 text-cream-warm" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-cream-warm" />;
      case 'Compass': return <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-cream-warm" />;
      case 'Users': return <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cream-warm" />;
      case 'FileText': return <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-cream-warm" />;
      case 'Star': return <Star className="w-4 h-4 sm:w-5 sm:h-5 text-cream-warm" />;
      case 'BarChart3': return <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-cream-warm" />;
      default: return <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-cream-warm" />;
    }
  };

  return (
    <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] flex items-center justify-center mx-auto select-none my-8">
      
      {/* Isolated Steering Wheel SVG (Slightly smaller, sleek dimensions) */}
      <div
        className="w-full h-full relative flex items-center justify-center transition-transform duration-75 ease-out"
        style={{ transform: `rotate(${rotationDegree}deg)` }}
      >
        <svg
          viewBox="0 0 600 600"
          className="w-full h-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
        >
          <defs>
            {/* Rich Wood Grain Gradient */}
            <radialGradient id="woodGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4a311c" />
              <stop offset="60%" stopColor="#2c1d11" />
              <stop offset="100%" stopColor="#140b05" />
            </radialGradient>

            {/* Antique Metallic Brass Gradient */}
            <linearGradient id="metallicBrass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f7d984" />
              <stop offset="35%" stopColor="#d4af37" />
              <stop offset="70%" stopColor="#aa8222" />
              <stop offset="100%" stopColor="#e5c158" />
            </linearGradient>

            {/* Drop Shadow Filter */}
            <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000000" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* 8 Wooden Spokes with Outer Handles */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 300 300)`}>
              {/* Outer Handle Tip protruding beyond rim */}
              <path
                d="M 288,25 C 288,10 312,10 312,25 L 307,60 L 293,60 Z"
                fill="url(#woodGradient)"
                stroke="url(#metallicBrass)"
                strokeWidth="2.5"
              />
              <circle cx="300" cy="20" r="5" fill="url(#metallicBrass)" />

              {/* Main Spoke Shaft */}
              <rect
                x="291"
                y="60"
                width="18"
                height="480"
                rx="9"
                fill="url(#woodGradient)"
                stroke="url(#metallicBrass)"
                strokeWidth="2"
              />

              {/* Spoke Brass Collar Rings */}
              <rect x="288" y="100" width="24" height="8" rx="2" fill="url(#metallicBrass)" />
              <rect x="288" y="490" width="24" height="8" rx="2" fill="url(#metallicBrass)" />
            </g>
          ))}

          {/* Main Outer Wooden Rim */}
          <circle
            cx="300"
            cy="300"
            r="230"
            fill="none"
            stroke="url(#woodGradient)"
            strokeWidth="44"
            filter="url(#dropShadow)"
          />

          {/* Inner & Outer Brass Metallic Trims */}
          <circle
            cx="300"
            cy="300"
            r="252"
            fill="none"
            stroke="url(#metallicBrass)"
            strokeWidth="5"
          />
          <circle
            cx="300"
            cy="300"
            r="208"
            fill="none"
            stroke="url(#metallicBrass)"
            strokeWidth="5"
          />

          {/* Decorative Brass Rivets around the Wooden Rim */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 300 300)`}>
              <circle cx="300" cy="70" r="5.5" fill="url(#metallicBrass)" stroke="#140b05" strokeWidth="1" />
            </g>
          ))}

          {/* Central Brass Hub Structure */}
          <circle
            cx="300"
            cy="300"
            r="75"
            fill="url(#metallicBrass)"
            stroke="#140b05"
            strokeWidth="6"
            filter="url(#dropShadow)"
          />
          <circle
            cx="300"
            cy="300"
            r="55"
            fill="url(#woodGradient)"
            stroke="url(#metallicBrass)"
            strokeWidth="4"
          />
          
          {/* Center Hub Emblem Star */}
          <circle cx="300" cy="300" r="22" fill="url(#metallicBrass)" />
          <path
            d="M 300,270 L 306,294 L 330,300 L 306,306 L 300,330 L 294,306 L 270,300 L 294,294 Z"
            fill="#140b05"
          />
        </svg>
      </div>

      {/* Mouse Indicator "Keep Going v" on Center Hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center text-cream-warm drop-shadow-2xl">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/85 border-2 border-brass-gold flex flex-col items-center justify-center p-1 shadow-2xl">
          <span className="text-[7px] sm:text-[8px] uppercase tracking-widest font-serif text-cream-warm font-semibold text-center leading-tight">Keep Going</span>
          <span className="text-xs text-brass-gold animate-bounce">v</span>
        </div>
      </div>

      {/* 360-Degree Floating Feature Nodes spread around the entire Wheel */}
      {FEATURES_DATA.map((feat, index) => {
        const total = FEATURES_DATA.length;
        // 360 degree distribution around the circle starting from top (-90 deg)
        const baseAngle = (index / total) * 360 - 90;
        // Nodes rotate smoothly with the wheel
        const currentAngle = baseAngle + rotationDegree;
        const rad = (currentAngle * Math.PI) / 180;

        const isSelected = selectedFeatureId === feat.id;

        return (
          <div
            key={feat.id}
            onClick={() => onSelectFeature(feat)}
            className="absolute z-40 flex flex-col items-center cursor-pointer group transition-all duration-200"
            style={{
              left: `calc(50% + ${radiusPx * Math.cos(rad)}px)`,
              top: `calc(50% + ${radiusPx * Math.sin(rad)}px)`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Circular Icon Badge */}
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-2xl ${
                isSelected
                  ? 'bg-brass-gold text-ocean-dark border-cream-warm ring-4 ring-brass-gold/50 scale-110'
                  : 'bg-black/90 text-cream-warm border-brass-gold/70 hover:border-brass-gold hover:scale-105'
              }`}
            >
              {getIcon(feat.iconName)}
            </div>

            {/* Glowing Golden Pin Dot */}
            <div className="w-2 h-2 rounded-full bg-brass-gold my-0.5 shadow-[0_0_10px_#e5c158] animate-pulse" />

            {/* Feature Title & Subhead */}
            <div className="text-center max-w-[110px] sm:max-w-[130px] md:max-w-[140px] space-y-0.5 bg-[#07111d]/60 backdrop-blur-sm px-2 py-1 rounded-md border border-[#c5a059]/20 shadow-md">
              <h4 className="text-[11px] sm:text-xs font-serif font-bold text-cream-warm group-hover:text-brass-gold transition-colors leading-tight drop-shadow-md">
                {feat.title}
              </h4>
              <p className="text-[9px] sm:text-[10px] font-serif text-cream-muted/80 leading-tight line-clamp-2">
                {feat.shortDesc}
              </p>
            </div>
          </div>
        );
      })}

    </div>
  );
};
