import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { api } from '../services/api';
import { Target, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SkillGapItem {
  skillName: string;
  status: string;
  confidence: string;
  isRequired: boolean;
  prerequisites: string[];
}

interface SkillGapResult {
  targetRole: string;
  domain: string;
  readinessScore: number;
  demonstratedSkills: SkillGapItem[];
  missingSkills: SkillGapItem[];
  recommendedNextSteps: string[];
  provenance: string;
}

export const SkillGapPage: React.FC = () => {
  const [result, setResult] = useState<SkillGapResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const MOCK_SKILL_GAP: SkillGapResult = {
    targetRole: "Data Analyst",
    domain: "Data & Analytics",
    readinessScore: 78,
    demonstratedSkills: [
      { skillName: "SQL", status: "Verified", confidence: "High", isRequired: true, prerequisites: [] },
      { skillName: "Excel", status: "Verified", confidence: "High", isRequired: true, prerequisites: [] },
      { skillName: "Data Cleaning", status: "In Progress", confidence: "Medium", isRequired: true, prerequisites: [] },
    ],
    missingSkills: [
      { skillName: "Python for Data Analysis", status: "Missing", confidence: "None", isRequired: true, prerequisites: ["SQL"] },
      { skillName: "Tableau / Power BI", status: "Missing", confidence: "None", isRequired: true, prerequisites: ["Excel"] },
    ],
    recommendedNextSteps: [
      "Complete Stage 3 assessment on SQL Basics & Data Cleaning",
      "Begin Stage 4 Python Data Analysis module",
      "Review target role keyword alignment for LinkedIn optimization",
    ],
    provenance: "CareerIQ Rule Engine v1.0",
  };

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const res = await api.getSkillGapAnalysis();
        if (res && res.targetRole) {
          setResult(res);
        } else {
          setResult(MOCK_SKILL_GAP);
        }
      } catch (err) {
        console.error('Skill gap fetch error:', err);
        setResult(MOCK_SKILL_GAP);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1008] border border-[#c5a059]/40 text-[#e5c158] text-xs uppercase tracking-widest font-sans">
            <Target className="w-4 h-4" />
            Automated Skill-Gap Analysis Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#f4f1de]">
            Competency Gap Analysis
          </h1>
          <p className="text-[#ece4d0]/80 font-serif text-sm">
            Compare your demonstrated skills against expected target role competencies with confidence provenance.
          </p>
        </div>

        {loading ? (
          <div className="p-16 text-center text-[#e5c158] font-serif text-lg">
            ⚓ Analyzing target role skill gap requirements...
          </div>
        ) : result ? (
          <div className="space-y-8">
            
            {/* Readiness Summary Card */}
            <div className="bg-[#060e1a] border border-[#c5a059]/40 p-6 sm:p-8 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center shadow-xl">
              
              <div className="md:col-span-2 space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-sans font-bold">
                  Target Role Assessment
                </span>
                <h2 className="text-3xl font-serif font-bold text-[#f4f1de]">
                  {result.targetRole}
                </h2>
                <p className="text-sm text-[#ece4d0]/80">
                  Domain Track: <span className="text-[#e5c158] font-semibold">{result.domain}</span>
                </p>
                <div className="flex items-center gap-2 text-xs text-[#ece4d0]/70 font-sans pt-2">
                  <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                  Provenance: <span className="text-emerald-400 font-bold uppercase">{result.provenance} Server Validated</span>
                </div>
              </div>

              {/* Gauge */}
              <div className="bg-[#040810] p-6 rounded-xl border border-[#c5a059]/30 text-center flex flex-col items-center justify-center">
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-sans font-bold mb-2">
                  Role Readiness Index
                </span>
                <span className="text-5xl font-serif font-extrabold text-[#e5c158] mb-2">
                  {result.readinessScore}%
                </span>
                <p className="text-xs text-[#ece4d0]/70">
                  {result.demonstratedSkills.length} of {result.demonstratedSkills.length + result.missingSkills.length} Core Requirements Satisfied
                </p>
              </div>

            </div>

            {/* Demonstrated vs Missing Skills Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Demonstrated Skills */}
              <div className="bg-[#060e1a] rounded-2xl p-6 sm:p-8 border border-emerald-500/40">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-emerald-300">
                      Demonstrated Competencies ({result.demonstratedSkills.length})
                    </h3>
                    <p className="text-xs text-[#ece4d0]/70">Skills backed by self-assessment or evidence signals</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {result.demonstratedSkills.map((sk) => (
                    <div key={sk.skillName} className="p-4 rounded-xl bg-[#040810] border border-emerald-500/30 flex items-center justify-between">
                      <span className="font-serif font-semibold text-[#f4f1de] text-sm">{sk.skillName}</span>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                        {sk.status} ({sk.confidence} confidence)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="bg-[#060e1a] rounded-2xl p-6 sm:p-8 border border-amber-500/40">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/60 flex items-center justify-center text-amber-400">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-amber-300">
                      Missing Skill Gaps ({result.missingSkills.length})
                    </h3>
                    <p className="text-xs text-[#ece4d0]/70">Competencies to acquire on your tree roadmap</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {result.missingSkills.map((sk) => (
                    <div key={sk.skillName} className="p-4 rounded-xl bg-[#040810] border border-amber-500/30 flex items-center justify-between">
                      <span className="font-serif font-semibold text-[#f4f1de] text-sm">{sk.skillName}</span>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                        Action Required
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Recommended Next Steps Card */}
            <div className="bg-[#060e1a] p-6 sm:p-8 rounded-2xl border border-[#c5a059]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#e5c158] mb-2">
                  Recommended Roadmap Next Steps
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-[#ece4d0]/90 font-serif">
                  {result.recommendedNextSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>

              <Link
                to="/roadmap"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#e5c158] to-[#c5a059] border border-[#f4f1de]/40 text-[#040810] font-serif font-bold text-sm hover:brightness-110 shadow-lg flex items-center gap-2 shrink-0"
              >
                <Compass className="w-5 h-5" />
                Open Interactive Tree Roadmap
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        ) : null}

      </div>
    </DashboardLayout>
  );
};
