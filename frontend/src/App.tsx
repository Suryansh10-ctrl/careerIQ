import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { JobsPage } from './pages/JobsPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { VoyagePage } from './pages/VoyagePage';
import { LinkedInPage } from './pages/LinkedInPage';
import { ResumeUploadPage } from './pages/ResumeUploadPage';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/resume" element={<ResumeUploadPage />} />
        <Route path="/voyage" element={<VoyagePage />} />
        <Route path="/linkedin" element={<LinkedInPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/skill-gap" element={<SkillGapPage />} />
      </Routes>
    </Router>
  );
};

export default App;
