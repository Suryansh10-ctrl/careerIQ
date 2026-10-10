import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { api } from '../services/api';
import {
  Copy, ExternalLink, Info, Check, ChevronLeft, ChevronRight,
  AlertTriangle, Search, Loader2, Sparkles, BookOpen, Briefcase,
  Star, GraduationCap, FileText
} from 'lucide-react';

type TabName = 'Headline' | 'About' | 'Experience' | 'Skills' | 'Education';

const TAB_ICONS: Record<TabName, React.ReactNode> = {
  Headline: <FileText className="w-3.5 h-3.5" />,
  About:    <BookOpen className="w-3.5 h-3.5" />,
  Experience: <Briefcase className="w-3.5 h-3.5" />,
  Skills:   <Star className="w-3.5 h-3.5" />,
  Education: <GraduationCap className="w-3.5 h-3.5" />,
};

// Static per-tab guidance (About / Experience / Skills / Education)
const TAB_CONTENT: Record<Exclude<TabName, 'Headline'>, {
  currentText: string;
  issues: string[];
  suggestions: string[];
  tip: string;
}> = {
  About: {
    currentText: "I'm a motivated student passionate about data and technology, actively looking for opportunities to apply my skills in a professional setting.",
    issues: [
      "No target role keyword ('Data Analyst') present in the About summary",
      "Missing quantifiable achievements or project results",
      "'Actively looking' is passive — lead with value instead",
    ],
    suggestions: [
      "Open with a 2-sentence snapshot: who you are + what you solve",
      "Mention 1–2 projects with measurable outcomes (e.g., 'reduced report time by 40%')",
      "List your top 3 tools/skills in the first paragraph for searchability",
      "Close with a CTA: 'Open to Data Analyst roles — reach out to connect!'",
    ],
    tip: "LinkedIn's algorithm indexes your About section for search. Mention your target role title naturally at least twice.",
  },
  Experience: {
    currentText: "Intern at ABC Corp (June 2023 – Aug 2023) — Assisted with data entry and helped the analytics team with various tasks.",
    issues: [
      "Bullet points are vague — no measurable outcomes or impact numbers",
      "Missing tools used (Excel, SQL, Python) that recruiters search for",
      "Passive language ('assisted', 'helped') weakens your story",
    ],
    suggestions: [
      "Use the 'Action + Tool + Result' formula: 'Analyzed 50K+ records using SQL, cutting report time by 35%'",
      "Add tech stack keywords: Python, SQL, Tableau, Excel per bullet",
      "Quantify wherever possible — even estimates are better than nothing",
      "Remove 'various tasks' — replace with at least 2 specific deliverables",
    ],
    tip: "Recruiters spend ~6 seconds scanning. Lead each bullet with a strong action verb and a tool name.",
  },
  Skills: {
    currentText: "Skills listed: Microsoft Office, Teamwork, Communication, Problem Solving",
    issues: [
      "Soft skills dominate — technical skills (SQL, Python, Tableau) are missing",
      "Generic skills don't appear in recruiter keyword searches",
      "No endorsements requested for top skills — this hurts ranking",
    ],
    suggestions: [
      "Pin your top 3 skills as: SQL, Python, Data Visualization",
      "Add role-specific tools: Tableau, Power BI, Excel, pandas, NumPy",
      "Request endorsements from professors, peers, or internship managers",
      "Remove or deprioritize soft skills — they add little SEO value here",
    ],
    tip: "LinkedIn shows only 3 pinned skills on your profile card. Make them count — choose your most searchable technical skills.",
  },
  Education: {
    currentText: "B.S. Computer Science, State University (2021–2025)",
    issues: [
      "No relevant coursework or GPA mentioned — misses keyword opportunities",
      "Missing capstone, thesis, or data-related projects section",
      "Club/extracurricular activities not listed — relevant groups boost visibility",
    ],
    suggestions: [
      "Add relevant coursework: 'Database Systems, Machine Learning, Statistics'",
      "List your strongest data project under Activities with a 2-line description",
      "Include clubs: Data Science Club, Analytics Society, Kaggle competitions",
      "If GPA ≥ 3.5, include it — it's a positive signal for early-career roles",
    ],
    tip: "Recruiters search for graduates by school + major + grad year. Make sure all three are clearly filled in.",
  },
};

export const LinkedInPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>('Headline');
  const [variantIndex, setVariantIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);

  const [profileUrl, setProfileUrl] = useState<string>('https://linkedin.com/in/alex-rivera-data-analyst');
  const [targetRole, setTargetRole] = useState<string>('Data Analyst');
  const [analyzing, setAnalyzing] = useState<boolean>(false);

  const [analysisData, setAnalysisData] = useState({
    extractedUsername: 'alex-rivera-data-analyst',
    overallScore: 78,
    strengthTitle: 'Solid Profile Foundation',
    strengthSummary: "Analyzed handle 'alex-rivera-data-analyst' for 'Data Analyst'. Custom URL verified. Headline and role keyword optimization recommended.",
    customUrlDetected: true,
    sectionScores: [
      { name: "Headline",     score: 58, focus: true  },
      { name: "About",        score: 64, focus: false },
      { name: "Experience",   score: 75, focus: false },
      { name: "Skills",       score: 80, focus: false },
      { name: "Role keywords",score: 62, focus: true  },
      { name: "Completeness", score: 88, focus: false },
    ],
    currentHeadline: "Student / Professional at Example University | Looking for opportunities",
    issuesFound: [
      "Missing primary target role keywords ('Data Analyst') in headline",
      "Verified technical skills from your learning roadmap are omitted",
      "Generic 'Looking for opportunities' phrase reduces recruiter ranking",
    ],
    suggestedHeadlines: [
      "Aspiring Data Analyst | SQL · Python · Data Cleaning | Turning raw data into clear answers",
      "Data Analyst | Python · SQL · Tableau | Building actionable business intelligence & insights",
      "Entry-Level Data Analyst | Skilled in SQL, Excel & Data Visualization | Passionate about data-driven decisions",
    ],
    verifiedSkills: ['SQL', 'Python', 'Excel', 'Data Cleaning'],
    recommendedKeywords: ['Data Visualization', 'Reporting', 'Dashboards', 'ETL'],
  });

  const [checklist, setChecklist] = useState({
    customUrl:       true,
    photo:           true,
    banner:          false,
    featuredProject: false,
    openToWork:      false,
  });

  const handleAnalyze = async (urlOverride?: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const url = urlOverride ?? profileUrl;
    if (!url.trim()) return;

    setAnalyzing(true);
    setVariantIndex(0);

    try {
      const res = await api.analyzeLinkedInProfile(url.trim(), targetRole.trim());
      if (res && res.overallScore) {
        setAnalysisData({
          extractedUsername:  res.extractedUsername   || 'profile',
          overallScore:       res.overallScore,
          strengthTitle:      res.strengthTitle       || 'Profile Evaluation',
          strengthSummary:    res.strengthSummary     || 'Analysis complete.',
          customUrlDetected:  res.customUrlDetected,
          sectionScores:      res.sectionScores       || analysisData.sectionScores,
          currentHeadline:    res.currentHeadline     || analysisData.currentHeadline,
          issuesFound:        res.issuesFound         || analysisData.issuesFound,
          suggestedHeadlines: res.suggestedHeadlines  || analysisData.suggestedHeadlines,
          verifiedSkills:     res.verifiedSkills      || analysisData.verifiedSkills,
          recommendedKeywords:res.recommendedKeywords || analysisData.recommendedKeywords,
        });
        setChecklist((p) => ({ ...p, customUrl: res.customUrlDetected }));
      }
    } catch {
      const isCustom = !url.includes('-9b') && !url.match(/\d{6,}/);
      setAnalysisData((p) => ({ ...p, customUrlDetected: isCustom, overallScore: isCustom ? 76 : 58 }));
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(analysisData.suggestedHeadlines[variantIndex] ?? '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleCheck = (key: keyof typeof checklist) =>
    setChecklist((p) => ({ ...p, [key]: !p[key] }));

  const currentVariants = analysisData.suggestedHeadlines;
  const tabContent = activeTab !== 'Headline' ? TAB_CONTENT[activeTab as Exclude<TabName,'Headline'>] : null;

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* ── Page Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest font-serif font-bold text-[#c5a059] flex items-center gap-1.5 mb-1">
              <span>⚓</span> PORT 5 · FLAGSHIP
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#f4f1de] tracking-tight">
              LinkedIn Profile Optimization
            </h1>
            <p className="text-sm text-[#d5c6a5] font-serif mt-1">
              Analyze your LinkedIn URL · get tailored section-by-section improvements · Target role:{' '}
              <span className="text-[#f4f1de] font-semibold">{targetRole}</span>
            </p>
          </div>
          <button
            onClick={() => handleAnalyze()}
            disabled={analyzing}
            className="px-5 py-2.5 rounded-full bg-[#c5a059] text-[#0a1b2d] font-serif font-bold text-xs hover:bg-[#e5c158] transition-all shadow-lg cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{analyzing ? 'Analyzing...' : 'Re-analyze Profile'}</span>
          </button>
        </div>

        {/* ── LinkedIn URL Input Card ── */}
        <div className="bg-[#0b1a2d] border border-[#c5a059]/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />
          <form
            onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }}
            className="space-y-4 relative z-10"
          >
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-widest font-serif font-bold text-[#c5a059] flex items-center gap-2">
                <Search className="w-4 h-4" />
                LINKEDIN PROFILE URL ANALYSIS
              </label>
              <span className="text-[11px] font-serif text-[#d5c6a5]/70">
                Paste your LinkedIn URL to generate section feedback
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-7 relative">
                <input
                  type="url"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/your-profile-name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#071322] border border-[#c5a059]/40 text-[#f4f1de] placeholder-[#d5c6a5]/40 text-sm font-serif focus:outline-none focus:border-[#c5a059] transition-all pr-40"
                />
                {analysisData.customUrlDetected && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#e5c158] text-[10px] font-sans font-medium border border-[#c5a059]/40">
                    Custom Slug ✓
                  </span>
                )}
              </div>
              <div className="md:col-span-3">
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="Target Role"
                  className="w-full px-4 py-3 rounded-xl bg-[#071322] border border-[#c5a059]/40 text-[#f4f1de] placeholder-[#d5c6a5]/40 text-sm font-serif focus:outline-none focus:border-[#c5a059] transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={analyzing}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-[#0a1b2d] font-serif font-bold text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:opacity-90 transition-all"
                >
                  {analyzing ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</> : 'Analyze URL'}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-[#c5a059] font-semibold font-serif">Try samples:</span>
              {[
                'https://linkedin.com/in/alex-rivera-data-analyst',
                'https://linkedin.com/in/sarah-chen-dev',
                'https://linkedin.com/in/johndoe-9823148a',
              ].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { setProfileUrl(s); handleAnalyze(s); }}
                  className="px-2.5 py-1 rounded-full bg-[#071322] border border-[#c5a059]/30 text-[11px] text-[#f4f1de] hover:border-[#c5a059] transition-all cursor-pointer font-serif"
                >
                  {s.replace('https://linkedin.com/in/', '')}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* ── Main 2-Column Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* LEFT: Profile Strength + Section Scores */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0b1a2d] border border-[#c5a059]/40 rounded-2xl p-6 shadow-xl space-y-4">
              <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#c5a059]">PROFILE STRENGTH</span>
              <div className="flex items-center gap-6 pt-2">
                <div className="w-24 h-24 rounded-full border-4 border-[#c5a059] flex flex-col items-center justify-center shrink-0 shadow-[0_0_20px_rgba(197,160,89,0.2)]">
                  <span className="text-3xl font-serif-title font-bold text-[#f4f1de]">{analysisData.overallScore}</span>
                  <span className="text-[10px] font-serif text-[#d5c6a5]">out of 100</span>
                </div>
                <div>
                  <h4 className="text-lg font-serif-title font-bold text-[#f4f1de]">{analysisData.strengthTitle}</h4>
                  <p className="text-xs font-serif text-[#d5c6a5] leading-relaxed mt-1">{analysisData.strengthSummary}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0b1a2d] border border-[#c5a059]/40 rounded-2xl p-6 shadow-xl space-y-5">
              <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#c5a059]">SECTION SCORES</span>
              <div className="space-y-4 pt-1">
                {analysisData.sectionScores.map((sec) => (
                  <div key={sec.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-serif">
                      <div className="flex items-center gap-2">
                        <span className="text-[#f4f1de]">{sec.name}</span>
                        {sec.focus && (
                          <span className="px-2 py-0.5 rounded bg-[#c5a059]/20 border border-[#c5a059]/50 text-[10px] text-[#e5c158] font-semibold">
                            Focus here
                          </span>
                        )}
                      </div>
                      <span className="text-[#f4f1de] font-semibold">{sec.score}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#071322] border border-[#c5a059]/20 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#c5a059] to-[#e5c158]" style={{ width: `${sec.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Tab Panels */}
          <div className="lg:col-span-8 space-y-6">

            {/* Tab Row */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#c5a059]/20">
              {(['Headline', 'About', 'Experience', 'Skills', 'Education'] as TabName[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-serif transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-[#c5a059] text-[#0a1b2d] font-bold shadow-md'
                      : 'bg-[#0b1a2d] text-[#d5c6a5] hover:text-[#f4f1de] border border-[#c5a059]/30'
                  }`}
                >
                  {TAB_ICONS[tab]}
                  {tab}
                </button>
              ))}
            </div>

            {/* ── HEADLINE TAB ── */}
            {activeTab === 'Headline' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Headline + Issues */}
                  <div className="bg-[#0b1a2d] border border-[#c5a059]/40 rounded-2xl p-6 shadow-xl space-y-4">
                    <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#c5a059]">
                      CURRENT HEADLINE
                    </span>
                    <div className="p-4 rounded-xl bg-[#071322] border border-[#c5a059]/30 text-sm font-serif text-[#f4f1de]">
                      {analysisData.currentHeadline}
                    </div>
                    <div className="space-y-2 pt-1">
                      <span className="text-xs uppercase tracking-wider font-serif font-bold text-[#c5a059]">ISSUES DETECTED</span>
                      <div className="space-y-2 text-xs font-serif text-[#e0954b]">
                        {analysisData.issuesFound.map((issue, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{issue}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Suggested Rewrite */}
                  <div className="bg-[#0b1a2d] border border-[#c5a059]/40 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#c5a059]">SUGGESTED REWRITE</span>
                        <div className="flex items-center gap-1 text-xs font-serif text-[#d5c6a5]">
                          <button type="button" onClick={() => setVariantIndex((p) => (p > 0 ? p - 1 : currentVariants.length - 1))} className="p-1 rounded hover:bg-[#1a2b3c] text-[#f4f1de]">
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <span>{variantIndex + 1} / {currentVariants.length}</span>
                          <button type="button" onClick={() => setVariantIndex((p) => (p < currentVariants.length - 1 ? p + 1 : 0))} className="p-1 rounded hover:bg-[#1a2b3c] text-[#f4f1de]">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#071322] border border-[#c5a059]/40 text-sm font-serif text-[#f4f1de] mt-3 leading-relaxed">
                        "{currentVariants[variantIndex]}"
                      </div>
                      <div className="text-[11px] font-serif text-[#d5c6a5] mt-2">
                        {(currentVariants[variantIndex] ?? '').length} / 220 chars · Skills: {analysisData.verifiedSkills.join(', ')}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#c5a059]/20">
                      <button onClick={handleCopy} className="px-4 py-2 rounded-full bg-[#c5a059] text-[#0a1b2d] font-serif font-bold text-xs flex items-center gap-2 hover:bg-[#e5c158] transition-all shadow-md cursor-pointer">
                        <Copy className="w-3.5 h-3.5" />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                      <label className="flex items-center gap-2 text-xs font-serif text-[#d5c6a5] cursor-pointer">
                        <input type="checkbox" checked={applied} onChange={(e) => setApplied(e.target.checked)} className="w-4 h-4 accent-[#c5a059]" />
                        Mark as applied on LinkedIn
                      </label>
                    </div>
                  </div>
                </div>

                {/* Keyword Alignment + Checklist */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#0b1a2d] border border-[#c5a059]/40 rounded-2xl p-6 shadow-xl space-y-4">
                    <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#c5a059]">KEYWORD ALIGNMENT</span>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-serif text-[#d5c6a5] mb-2">Verified skills to feature</div>
                        <div className="flex flex-wrap gap-2">
                          {analysisData.verifiedSkills.map((sk) => (
                            <span key={sk} className="px-3 py-1 rounded-full border border-[#c5a059]/60 bg-[#071322] text-xs font-serif text-[#f4f1de] flex items-center gap-1">
                              <Check className="w-3.5 h-3.5 text-[#c5a059]" /> {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-serif text-[#d5c6a5] mb-2">Role keywords to add</div>
                        <div className="flex flex-wrap gap-2">
                          {analysisData.recommendedKeywords.map((kw) => (
                            <span key={kw} className="px-3 py-1 rounded-full border border-dashed border-[#c5a059]/50 bg-[#071322]/50 text-xs font-serif text-[#d5c6a5]">
                              + {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-[11px] font-serif text-[#d5c6a5]/70 italic pt-1">
                        Only add skills you can honestly claim. CareerIQ never invents experience.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#0b1a2d] border border-[#c5a059]/40 rounded-2xl p-6 shadow-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#c5a059]">DO THESE ON LINKEDIN</span>
                      <a href={profileUrl.startsWith('http') ? profileUrl : `https://${profileUrl}`} target="_blank" rel="noreferrer" className="text-xs font-serif text-[#f4f1de] flex items-center gap-1 hover:text-[#e5c158]">
                        Open <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <div className="space-y-3 pt-1">
                      {[
                        { key: 'customUrl',       label: 'Set a custom profile URL' },
                        { key: 'photo',           label: 'Add a clear, professional photo' },
                        { key: 'banner',          label: 'Add a banner image' },
                        { key: 'featuredProject', label: 'Feature a project in Featured section' },
                        { key: 'openToWork',      label: 'Review Open to Work visibility' },
                      ].map((item) => {
                        const checked = checklist[item.key as keyof typeof checklist];
                        return (
                          <label key={item.key} className="flex items-center gap-3 text-xs font-serif text-[#f4f1de] cursor-pointer">
                            <input type="checkbox" checked={checked} onChange={() => toggleCheck(item.key as keyof typeof checklist)} className="w-4 h-4 accent-[#c5a059]" />
                            <span className={checked ? 'line-through text-[#d5c6a5]/70' : ''}>{item.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ── ABOUT / EXPERIENCE / SKILLS / EDUCATION TABS ── */}
            {activeTab !== 'Headline' && tabContent && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Text + Issues */}
                  <div className="bg-[#0b1a2d] border border-[#c5a059]/40 rounded-2xl p-6 shadow-xl space-y-4">
                    <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#c5a059]">
                      CURRENT {activeTab.toUpperCase()} SECTION
                    </span>
                    <div className="p-4 rounded-xl bg-[#071322] border border-[#c5a059]/30 text-sm font-serif text-[#f4f1de] leading-relaxed">
                      {tabContent.currentText}
                    </div>
                    <div className="space-y-2 pt-1">
                      <span className="text-xs uppercase tracking-wider font-serif font-bold text-[#c5a059]">ISSUES DETECTED</span>
                      <div className="space-y-2 text-xs font-serif text-[#e0954b]">
                        {tabContent.issues.map((issue, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{issue}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div className="bg-[#0b1a2d] border border-[#c5a059]/40 rounded-2xl p-6 shadow-xl space-y-4">
                    <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#c5a059]">
                      IMPROVEMENT SUGGESTIONS
                    </span>
                    <div className="space-y-3 pt-1">
                      {tabContent.suggestions.map((s, i) => (
                        <div key={i} className="flex items-start gap-3 text-xs font-serif text-[#f4f1de]">
                          <span className="w-5 h-5 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/50 text-[#e5c158] flex items-center justify-center shrink-0 font-bold text-[10px]">
                            {i + 1}
                          </span>
                          <span className="leading-relaxed text-[#d5c6a5]">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pro Tip Banner */}
                <div className="p-4 rounded-xl bg-[#071322] border border-[#c5a059]/40 text-xs font-serif text-[#d5c6a5] flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#e5c158] font-bold uppercase tracking-wide">Pro Tip · {activeTab}: </span>
                    {tabContent.tip}
                  </div>
                </div>

                {/* Keyword Alignment (shared across tabs) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#0b1a2d] border border-[#c5a059]/40 rounded-2xl p-6 shadow-xl space-y-4">
                    <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#c5a059]">KEYWORD ALIGNMENT</span>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-serif text-[#d5c6a5] mb-2">Include these verified skills in your {activeTab} section</div>
                        <div className="flex flex-wrap gap-2">
                          {analysisData.verifiedSkills.map((sk) => (
                            <span key={sk} className="px-3 py-1 rounded-full border border-[#c5a059]/60 bg-[#071322] text-xs font-serif text-[#f4f1de] flex items-center gap-1">
                              <Check className="w-3.5 h-3.5 text-[#c5a059]" /> {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-serif text-[#d5c6a5] mb-2">Role keywords to naturally weave in</div>
                        <div className="flex flex-wrap gap-2">
                          {analysisData.recommendedKeywords.map((kw) => (
                            <span key={kw} className="px-3 py-1 rounded-full border border-dashed border-[#c5a059]/50 bg-[#071322]/50 text-xs font-serif text-[#d5c6a5]">
                              + {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0b1a2d] border border-[#c5a059]/40 rounded-2xl p-6 shadow-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#c5a059]">QUICK ACTIONS</span>
                      <a href={profileUrl.startsWith('http') ? profileUrl : `https://${profileUrl}`} target="_blank" rel="noreferrer" className="text-xs font-serif text-[#f4f1de] flex items-center gap-1 hover:text-[#e5c158]">
                        Open LinkedIn <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <div className="space-y-3 pt-1">
                      {[
                        { key: 'customUrl',       label: 'Set a custom profile URL' },
                        { key: 'photo',           label: 'Add a professional photo' },
                        { key: 'banner',          label: 'Add a banner image' },
                        { key: 'featuredProject', label: 'Feature a project' },
                        { key: 'openToWork',      label: 'Update Open to Work' },
                      ].map((item) => {
                        const checked = checklist[item.key as keyof typeof checklist];
                        return (
                          <label key={item.key} className="flex items-center gap-3 text-xs font-serif text-[#f4f1de] cursor-pointer">
                            <input type="checkbox" checked={checked} onChange={() => toggleCheck(item.key as keyof typeof checklist)} className="w-4 h-4 accent-[#c5a059]" />
                            <span className={checked ? 'line-through text-[#d5c6a5]/70' : ''}>{item.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="p-4 rounded-xl bg-[#0b1a2d] border border-[#c5a059]/30 text-xs font-serif text-[#d5c6a5] flex items-center gap-2.5">
          <Info className="w-4 h-4 text-[#c5a059] shrink-0" />
          <span>
            AI-assisted suggestions. Review for accuracy. CareerIQ analyzes your public URL structure and target role to generate recommendations — copy and apply changes directly on LinkedIn.
          </span>
        </div>

      </div>
    </DashboardLayout>
  );
};
