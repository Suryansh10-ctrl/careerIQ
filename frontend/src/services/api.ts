const API_BASE_URL = 'http://localhost:5000/api/v1';

export const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('careeriq_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // Auth
  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  async register(email: string, password: string, name?: string) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeader(),
    });
    return res.json();
  },

  // Roadmap
  async getRoadmap() {
    const res = await fetch(`${API_BASE_URL}/roadmaps`, {
      headers: getAuthHeader(),
    });
    return res.json();
  },

  async completeNode(roadmapId: string, nodeId: string, evidenceSummary?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    };
    const res = await fetch(`${API_BASE_URL}/roadmaps/${roadmapId}/nodes/${nodeId}/completion`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ evidenceSummary: evidenceSummary || 'Completed learning task.' }),
    });
    return res.json();
  },

  // Skill Gap Analysis
  async getSkillGapAnalysis() {
    const res = await fetch(`${API_BASE_URL}/skill-gap/analyze`, {
      headers: getAuthHeader(),
    });
    return res.json();
  },

  // Jobs Search
  async searchJobs(keyword?: string, provider?: string, workMode?: string) {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (provider) params.append('provider', provider);
    if (workMode) params.append('work_mode', workMode);

    const res = await fetch(`${API_BASE_URL}/jobs?${params.toString()}`);
    return res.json();
  },

  // Domains
  async getDomains() {
    const res = await fetch(`${API_BASE_URL}/domains`);
    return res.json();
  },

  // Resume Upload & Evaluation
  async uploadResume(file: File, targetRole?: string, domain?: string) {
    const formData = new FormData();
    formData.append('file', file);
    if (targetRole) formData.append('targetRole', targetRole);
    if (domain) formData.append('domain', domain);

    const res = await fetch(`${API_BASE_URL}/resume/upload`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: formData,
    });
    return res.json();
  },

  async evaluateResumeText(resumeText: string, targetRole?: string, domain?: string) {
    const res = await fetch(`${API_BASE_URL}/resume/evaluate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ resumeText, targetRole, domain }),
    });
    return res.json();
  },

  // LinkedIn Analysis
  async analyzeLinkedInProfile(linkedinUrl: string, targetRole?: string) {
    const res = await fetch(`${API_BASE_URL}/profile/linkedin/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ linkedinUrl, targetRole }),
    });
    return res.json();
  }
};

