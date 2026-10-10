import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, ArrowRight, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isDashboardRoute = location.pathname.startsWith('/voyage') || 
                           location.pathname.startsWith('/roadmap') || 
                           location.pathname.startsWith('/linkedin') || 
                           location.pathname.startsWith('/jobs') || 
                           location.pathname.startsWith('/skill-gap');

  // Breadcrumb subtitle for dashboard
  const getBreadcrumb = () => {
    if (location.pathname.includes('/linkedin')) {
      return (
        <span className="flex items-center gap-2 text-xs font-serif text-[#d8c5a2]">
          <span>/</span> <Link to="/voyage" className="hover:text-[#e5c158]">My Voyage</Link>
          <span>/</span> <span className="text-[#f4f1de] font-semibold">LinkedIn Optimization</span>
        </span>
      );
    }
    if (location.pathname.includes('/voyage') || location.pathname.includes('/roadmap')) {
      return (
        <span className="flex items-center gap-2 text-xs font-serif text-[#d8c5a2]">
          <span>/</span> <span className="text-[#f4f1de] font-semibold">My Voyage</span>
        </span>
      );
    }
    return null;
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-[#080d16]/75 backdrop-blur-md border-b border-[#c5a059]/20 px-4 sm:px-8 flex items-center justify-between z-50 transition-all duration-300">
      
      {/* Left: Brand Logo & Title */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2.5 group">
          {/* Wheel Emblem Icon */}
          <div className="w-8 h-8 rounded-full border border-[#d4af37]/80 bg-[#120c07] flex items-center justify-center text-[#e5c158] group-hover:rotate-45 transition-transform duration-500 shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            <svg className="w-5 h-5 text-[#e5c158]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
            </svg>
          </div>
          <span className="text-xl sm:text-2xl font-serif font-bold text-[#fcfaf7] tracking-wider uppercase">
            CAREERIQ
          </span>
        </Link>
        {isDashboardRoute && getBreadcrumb()}
      </div>

      {/* Center Nav Links */}
      {!isDashboardRoute && (
        <nav className="hidden md:flex items-center gap-8 text-xs font-serif tracking-wider text-[#d6ccc0]">
          <a
            href="/"
            className="hover:text-[#e5c158] transition-colors relative py-1 text-[#e5c158] font-bold border-b border-[#e5c158]"
          >
            Home
          </a>
          <a
            href="#wheel-section"
            className="hover:text-[#e5c158] transition-colors py-1 text-[#d6ccc0]"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#e5c158] transition-colors py-1 text-[#d6ccc0]"
          >
            How It Works
          </a>
          <a
            href="#about"
            className="hover:text-[#e5c158] transition-colors py-1 text-[#d6ccc0]"
          >
            About
          </a>
        </nav>
      )}

      {/* Right Top Actions */}
      <div className="flex items-center gap-3">
        {isDashboardRoute ? (
          <>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full border border-[#c5a059]/40 bg-[#091526] text-[10px] font-mono tracking-wider text-[#d4af37]">
              MOCK DATA
            </span>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c5a059]/60 bg-[#0b1a2d] hover:bg-[#1a2b3c] text-[#f4f1de] text-xs font-serif font-medium transition-all shadow-md cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-[#c5a059] text-[#0a1b2d] font-bold text-[10px] flex items-center justify-center">
                A
              </div>
              <span>Account</span>
            </button>
          </>
        ) : (
          <>
            {/* Captain's Wheel Golden Pill Button */}
            <button
              onClick={() => navigate('/voyage')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#e5bc5d] via-[#d4af37] to-[#b88e28] hover:brightness-110 text-[#0f0d09] text-xs font-serif font-bold tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#0f0d09]" />
              <span>CAPTAIN'S WHEEL</span>
            </button>

            {/* Login / Sign-In Door Icon Pill */}
            <Link
              to="/login"
              title="Sign In / Login"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-[#c5a059]/60 bg-[#0c1420]/80 hover:bg-[#c5a059] hover:text-[#0c1420] text-[#e0b457] transition-all shadow-md cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-[#c5a059]/40 text-[#f4f1de] bg-[#071322]/80"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {!isDashboardRoute && mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#090e17] border-b border-[#c5a059]/30 p-6 space-y-4 shadow-2xl">
          <a
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-serif text-[#e5c158] font-bold"
          >
            Home
          </a>
          <a
            href="#wheel-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-serif text-[#ece4d0]"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-serif text-[#ece4d0]"
          >
            How It Works
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-serif text-[#ece4d0]"
          >
            About
          </a>
          <Link
            to="/voyage"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-serif text-[#e5c158]"
          >
            Captain's Wheel / My Voyage
          </Link>
        </div>
      )}

    </header>
  );
};

