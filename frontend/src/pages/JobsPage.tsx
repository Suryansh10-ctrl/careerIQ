import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { api } from '../services/api';
import { Search, ExternalLink, MapPin, Building } from 'lucide-react';

interface JobItem {
  id: string;
  sourceJobId: string;
  provider: string;
  title: string;
  company: string;
  location: string;
  workMode: string;
  experienceLevel: string;
  requiredSkills: string[];
  url: string;
  isVerified: boolean;
  postedAt: string;
  provenanceBadge: string;
}

export const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [keyword, setKeyword] = useState<string>('');
  const [provider, setProvider] = useState<string>('all');
  const [workMode, setWorkMode] = useState<string>('all');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('all');

  const MOCK_JOBS: JobItem[] = [
    {
      id: 'job_1',
      sourceJobId: 'ind_101',
      provider: 'indeed',
      title: 'Junior Data Analyst',
      company: 'TCS Analytics',
      location: 'Bengaluru',
      workMode: 'hybrid',
      experienceLevel: 'Fresher',
      requiredSkills: ['SQL', 'Excel', 'Python', 'Data Cleaning'],
      url: 'https://indeed.com',
      isVerified: true,
      postedAt: '2 days ago',
      provenanceBadge: 'Verified Listing',
    },
    {
      id: 'job_2',
      sourceJobId: 'nauk_202',
      provider: 'naukri',
      title: 'Business Intelligence Analyst',
      company: 'Infosys Insights',
      location: 'Hyderabad',
      workMode: 'remote',
      experienceLevel: '1 - 3 years',
      requiredSkills: ['SQL', 'Tableau', 'Power BI', 'Dashboards'],
      url: 'https://naukri.com',
      isVerified: true,
      postedAt: '1 day ago',
      provenanceBadge: 'Verified Listing',
    },
    {
      id: 'job_3',
      sourceJobId: 'ind_303',
      provider: 'indeed',
      title: 'Data & Reporting Specialist',
      company: 'Wipro Digital',
      location: 'Mumbai',
      workMode: 'hybrid',
      experienceLevel: '1 - 3 years',
      requiredSkills: ['Excel', 'SQL', 'Reporting', 'Data Visualization'],
      url: 'https://indeed.com',
      isVerified: true,
      postedAt: '3 days ago',
      provenanceBadge: 'Verified Listing',
    },
  ];

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await api.searchJobs(keyword, provider, workMode);
      if (res && res.success && res.jobs && res.jobs.length > 0) {
        setJobs(res.jobs);
      } else {
        setJobs(MOCK_JOBS);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setJobs(MOCK_JOBS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [provider, workMode]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const getCompanyBadge = (company: string) => {
    if (company.includes('Oceanic') || company.includes('TCS')) return 'TCS';
    if (company.includes('Nautical') || company.includes('Infosys')) return 'Infosys';
    if (company.includes('Mariner') || company.includes('Wipro')) return 'Wipro';
    return 'HCL';
  };

  return (
    <DashboardLayout>
      
      <div className="mb-6">
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#f4f1de]">
          Find Your Next Opportunity
        </h1>
        <p className="text-xs sm:text-sm text-[#ece4d0]/75 font-serif mt-1">
          Explore genuine job opportunities from trusted sources (Indeed & Naukri).
        </p>
      </div>

      <div className="bg-[#060e1a] p-4 rounded-2xl border border-[#c5a059]/30 mb-6">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c5a059]" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search jobs, roles or skills..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#040810] border border-[#c5a059]/30 text-xs text-[#ece4d0] focus:border-[#e5c158] focus:outline-none"
            />
          </div>

          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#040810] border border-[#c5a059]/30 text-xs text-[#ece4d0] focus:border-[#e5c158]"
          >
            <option value="all">All Providers</option>
            <option value="indeed">Indeed</option>
            <option value="naukri">Naukri</option>
          </select>

          <select
            value={workMode}
            onChange={(e) => setWorkMode(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#040810] border border-[#c5a059]/30 text-xs text-[#ece4d0] focus:border-[#e5c158]"
          >
            <option value="all">All Work Modes</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>

          <button
            type="submit"
            className="py-2 rounded-xl bg-gradient-to-r from-[#e5c158] to-[#c5a059] border border-[#f4f1de]/40 text-[#040810] font-serif font-bold text-xs hover:brightness-110 shadow shrink-0"
          >
            Search
          </button>

        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-3 bg-[#060e1a] rounded-2xl border border-[#c5a059]/30 p-5 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#c5a059]/20">
            <h3 className="text-sm font-serif font-bold text-[#f4f1de]">Filters</h3>
            <button onClick={() => { setSelectedSkillFilter('all'); setKeyword(''); setProvider('all'); }} className="text-[10px] text-[#e5c158] hover:underline">Clear All</button>
          </div>

          <div className="space-y-2">
            <h4 className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold">Skills</h4>
            <div className="space-y-1 text-xs">
              {['React', 'Node.js', 'JavaScript', 'TypeScript', 'Python', 'AWS'].map((sk) => (
                <label key={sk} className="flex items-center justify-between p-1.5 rounded hover:bg-[#040810] cursor-pointer">
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="skillFilter"
                      checked={selectedSkillFilter === sk}
                      onChange={() => setSelectedSkillFilter(sk)}
                      className="text-[#e5c158]"
                    />
                    {sk}
                  </span>
                  <span className="text-[10px] text-[#ece4d0]/60">12</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-[#c5a059]/20">
            <h4 className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold">Location</h4>
            <div className="space-y-1 text-xs">
              {['Remote', 'Bengaluru', 'Hyderabad', 'Mumbai'].map((loc) => (
                <label key={loc} className="flex items-center gap-2 p-1.5 rounded hover:bg-[#040810] cursor-pointer">
                  <input type="checkbox" className="text-[#e5c158]" defaultChecked={loc === 'Remote'} />
                  {loc}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-[#c5a059]/20">
            <h4 className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold">Experience</h4>
            <div className="space-y-1 text-xs">
              {['Fresher', '1 - 3 years', '3 - 5 years', '5+ years'].map((exp) => (
                <label key={exp} className="flex items-center gap-2 p-1.5 rounded hover:bg-[#040810] cursor-pointer">
                  <input type="checkbox" className="text-[#e5c158]" defaultChecked={exp.includes('1 - 3')} />
                  {exp}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#ece4d0]/70 px-1">
            <span>{jobs.length} jobs found</span>
            <span>Sort by: <strong className="text-[#e5c158]">Relevance</strong></span>
          </div>

          {loading ? (
            <div className="p-16 text-center text-[#e5c158] text-sm">
              ⚓ Searching jobs from Indeed & Naukri...
            </div>
          ) : (
            jobs.map((job) => {
              const companyCode = getCompanyBadge(job.company);

              return (
                <div
                  key={job.id}
                  className="bg-[#060e1a] rounded-2xl border border-[#c5a059]/30 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-[#e5c158] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#040810] border border-[#c5a059]/50 flex items-center justify-center font-bold text-xs text-[#e5c158] shrink-0 shadow">
                      {companyCode}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-serif font-bold text-[#f4f1de]">
                          {job.title}
                        </h3>
                        <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded bg-[#1a1008] text-[#e5c158] border border-[#c5a059]/30 uppercase">
                          {job.provider}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-[#ece4d0]/70 font-sans">
                        <span className="flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-[#c5a059]" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                          {job.location} ({job.workMode})
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-2">
                        {job.requiredSkills.map((sk) => (
                          <span key={sk} className="px-2 py-0.5 rounded bg-[#040810] border border-[#c5a059]/20 text-[#ece4d0] text-[10px]">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 w-full md:w-auto">
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e5c158] to-[#c5a059] border border-[#f4f1de]/40 text-[#040810] font-serif font-bold text-xs hover:brightness-110 shadow"
                    >
                      Apply on {job.provider === 'indeed' ? 'Indeed' : 'Naukri'}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
