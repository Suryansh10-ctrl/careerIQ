import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { FeaturePoint } from './SteeringWheel';
import { X, ArrowRight, Compass, Target, Briefcase, BookOpen, TrendingUp, MessageSquare } from 'lucide-react';

interface FeatureModalProps {
  feature: FeaturePoint | null;
  onClose: () => void;
}

export const FeatureModal: React.FC<FeatureModalProps> = ({ feature, onClose }) => {
  const navigate = useNavigate();

  if (!feature) return null;

  const getIcon = () => {
    switch (feature.id) {
      case 1: return <Target className="w-8 h-8 text-brass-gold" />;
      case 2: return <Briefcase className="w-8 h-8 text-brass-gold" />;
      case 3: return <Compass className="w-8 h-8 text-brass-gold" />;
      case 4: return <MessageSquare className="w-8 h-8 text-brass-gold" />;
      case 5: return <BookOpen className="w-8 h-8 text-brass-gold" />;
      case 6: return <TrendingUp className="w-8 h-8 text-brass-gold" />;
      default: return <Compass className="w-8 h-8 text-brass-gold" />;
    }
  };

  const handleAction = () => {
    onClose();
    if (feature.id === 1) {
      navigate('/resume');
    } else if (feature.id === 2) {
      navigate('/skill-gap');
    } else if (feature.id === 3) {
      navigate('/voyage');
    } else if (feature.id === 6) {
      navigate('/jobs');
    } else if (feature.id === 8) {
      navigate('/linkedin');
    } else {
      navigate('/voyage');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ocean-dark/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl nautical-card rounded-2xl p-6 sm:p-8 border-brass-glow shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-cream-muted/70 hover:text-brass-gold hover:bg-wood-dark/80 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Feature Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-wood-dark border border-brass/60 flex items-center justify-center shadow-lg">
            {getIcon()}
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-brass-gold font-sans font-semibold">
              Feature #{feature.id}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gold-gradient">
              {feature.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4 text-cream-warm/90 font-serif leading-relaxed mb-8">
          <p className="text-lg font-semibold text-brass-light/90">
            "{feature.shortDesc}"
          </p>
          <p className="text-sm sm:text-base text-cream-muted/80">
            {feature.fullDesc}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-brass/20">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-brass/40 text-cream-muted hover:text-cream-warm hover:border-brass/80 transition-colors font-serif text-sm"
          >
            Close
          </button>
          <button
            onClick={handleAction}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-brass-gold to-brass border border-brass/80 text-ocean-dark font-serif font-bold text-sm hover:brightness-110 transition-all shadow-lg hover:shadow-brass/30"
          >
            Launch Command Deck
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
