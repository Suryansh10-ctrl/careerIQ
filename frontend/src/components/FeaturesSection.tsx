import React, { useState } from 'react';
import { FEATURES_DATA } from './SteeringWheel';
import type { FeatureNode } from './SteeringWheel';
import { FeatureModal } from './FeatureModal';
import { Target, Briefcase, Compass, Users, FileText, Star, BarChart3, ArrowRight } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureNode | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Target': return <Target className="w-6 h-6 text-[#e5c158]" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-[#e5c158]" />;
      case 'Compass': return <Compass className="w-6 h-6 text-[#e5c158]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#e5c158]" />;
      case 'FileText': return <FileText className="w-6 h-6 text-[#e5c158]" />;
      case 'Star': return <Star className="w-6 h-6 text-[#e5c158]" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-[#e5c158]" />;
      default: return <Compass className="w-6 h-6 text-[#e5c158]" />;
    }
  };

  return (
    <section id="features" className="py-24 px-6 bg-[#040810] border-t border-[#c5a059]/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header Matching Image 3 Middle Top */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] font-serif text-[#e5c158] font-semibold">
            FEATURES
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f4f1de]">
            Everything You Need to Build Your Career
          </h2>
          <p className="text-[#ece4d0]/80 font-serif text-sm sm:text-base max-w-xl mx-auto">
            From skill analysis to job opportunities, CareerIQ provides you with the tools to grow, learn and succeed.
          </p>
        </div>

        {/* 6 Dark Nautical Feature Cards Matching Image 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES_DATA.slice(0, 6).map((feat) => (
            <div
              key={feat.id}
              onClick={() => setSelectedFeature(feat)}
              className="bg-[#081220] rounded-2xl p-8 border border-[#c5a059]/30 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-[#e5c158] hover:shadow-2xl hover:shadow-[#e5c158]/10 hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1a1008] border border-[#c5a059]/50 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                  {getIcon(feat.iconName)}
                </div>

                <h3 className="text-xl font-serif font-bold text-[#f4f1de] group-hover:text-[#e5c158] transition-colors mb-3">
                  {feat.title}
                </h3>

                <p className="text-xs font-serif text-[#ece4d0]/70 leading-relaxed">
                  {feat.fullDesc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#c5a059]/15 flex items-center gap-2 text-xs font-serif text-[#e5c158] font-bold group-hover:translate-x-1 transition-transform">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

      </div>

      <FeatureModal
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />
    </section>
  );
};
