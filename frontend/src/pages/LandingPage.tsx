import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { SteeringWheelSection } from '../components/SteeringWheelSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { HowItWorks } from '../components/HowItWorks';
import { AboutSection } from '../components/AboutSection';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
  const handleSetSail = () => {
    const wheelSec = document.getElementById('wheel-section');
    if (wheelSec) {
      wheelSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-ocean-dark text-cream-warm flex flex-col font-serif">
      <Navbar />
      <Hero onSetSail={handleSetSail} />
      <SteeringWheelSection />
      <FeaturesSection />
      <HowItWorks />
      <AboutSection />
      <Footer />
    </div>
  );
};
