import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-wood-dark border-t border-brass/40 py-12 px-6 text-cream-muted/70 font-serif text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-navy-deep border border-brass/60 flex items-center justify-center text-brass-gold">
            <Compass className="w-5 h-5 text-brass-gold" />
          </div>
          <span className="font-serif font-bold text-lg text-gold-gradient">
            CareerIQ — Sail Towards Opportunity
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-widest text-cream-warm/80">
          <Link to="/" className="hover:text-brass-gold transition-colors">Home</Link>
          <Link to="/roadmap" className="hover:text-brass-gold transition-colors">Tree Roadmap</Link>
          <Link to="/jobs" className="hover:text-brass-gold transition-colors">Unified Jobs</Link>
          <Link to="/skill-gap" className="hover:text-brass-gold transition-colors">Skill Gap</Link>
          <Link to="/login" className="hover:text-brass-gold transition-colors">Login</Link>
        </div>

        {/* Right Copyright */}
        <div className="text-xs text-cream-muted/60 text-center md:text-right">
          © {new Date().getFullYear()} CareerIQ Platform. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
