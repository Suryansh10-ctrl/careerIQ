import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { api } from '../services/api';
import { 
  Compass, BookOpen, Code, Briefcase, Trophy, CheckCircle2, 
  Lock, Circle, Search, ChevronRight, ExternalLink, 
  AlertCircle, Check, Info
} from 'lucide-react';
import heroBgImg from '../assets/hero_pirate_ship.jpg';

interface RoadmapNodeData {
  nodeId: string;
  title: string;
  description: string;
  type: 'career_goal' | 'phase' | 'skill_group' | 'task' | 'project' | 'assessment' | 'milestone';
  parentId: string | null;
  prerequisiteNodeIds: string[];
  relatedSkillIds: string[];
  status: 'locked' | 'available' | 'in_progress' | 'completed' | 'needs_review' | 'blocked';
  completedAt?: string | null;
  resources: { title: string; url: string; type: string; provider: string; isVerified: boolean }[];
  completionCriteria: string;
  estimatedHours?: number;
  provenance: string;
}

interface RoadmapData {
  roadmapId: string;
  userId: string;
  targetRole: string;
  domain: string;
  overallProgress: number;
  nodes: RoadmapNodeData[];
}

export const RoadmapPage: React.FC = () => {
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Currently Selected Node for Right Hand Side Detail Panel
  const [selectedNodeId, setSelectedNodeId] = useState<string>('task_2_1');
  const [completing, setCompleting] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string>('');
  const [modalSuccess, setModalSuccess] = useState<string>('');

  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchRoadmap = async () => {
    setLoading(true);
    try {
      const res = await api.getRoadmap();
      if (res.roadmapId) {
        setRoadmap(res);
        const activeTask = res.nodes.find((n: any) => n.status === 'in_progress' || n.status === 'available');
        if (activeTask) setSelectedNodeId(activeTask.nodeId);
      }
    } catch (err: any) {
      console.error('Error fetching roadmap:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const handleMarkComplete = async () => {
    if (!roadmap || !selectedNodeId) return;
    setCompleting(true);
    setModalError('');
    setModalSuccess('');

    try {
      const res = await api.completeNode(roadmap.roadmapId, selectedNodeId);
      if (res.success && res.updatedRoadmap) {
        setRoadmap(res.updatedRoadmap);
        setModalSuccess(res.message || 'Task marked as complete!');
      } else {
        setModalError(res.detail || res.message || 'Failed to complete task.');
      }
    } catch (err: any) {
      setModalError(err.message || 'Server error verifying task prerequisites.');
    } finally {
      setCompleting(false);
    }
  };

  const selectedNode = roadmap?.nodes.find((n) => n.nodeId === selectedNodeId) || roadmap?.nodes[0];

  const getSectionIcon = (index: number) => {
    switch (index) {
      case 0: return <Compass className="w-5 h-5 text-[#e5c158]" />;
      case 1: return <BookOpen className="w-5 h-5 text-[#e5c158]" />;
      case 2: return <Code className="w-5 h-5 text-[#e5c158]" />;
      case 3: return <Briefcase className="w-5 h-5 text-[#e5c158]" />;
      case 4: default: return <Trophy className="w-5 h-5 text-[#e5c158]" />;
    }
  };

  const getTaskStatusIcon = (status: string, isSelected: boolean) => {
    if (status === 'completed') {
      return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
    } else if (status === 'locked') {
      return <Lock className="w-4 h-4 text-zinc-500 shrink-0" />;
    } else if (isSelected || status === 'in_progress') {
      return (
        <div className="w-4 h-4 rounded-full border-2 border-sky-400 flex items-center justify-center shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
        </div>
      );
    } else {
      return <Circle className="w-4 h-4 text-[#c5a059]/60 shrink-0" />;
    }
  };

  const targetGoal = roadmap?.nodes.find((n) => n.type === 'career_goal');
  const phases = roadmap?.nodes.filter((n) => n.type === 'phase') || [];

  return (
    <DashboardLayout>
      
      {/* Top Hero Banner matching Image 2 & 3 */}
      <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/40 mb-6 shadow-2xl h-44 sm:h-48 flex items-center px-8">
        
        <img
          src={heroBgImg}
          alt="Career Voyage Horizon"
          className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040810]/95 via-[#040810]/70 to-transparent" />

        <div className="relative z-10 flex items-center justify-between w-full">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest font-sans font-bold px-3 py-1 rounded-full bg-[#1a1008] border border-[#c5a059]/60 text-[#e5c158] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                Provisional roadmap
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#f4f1de] drop-shadow-md">
              Your Career Voyage
            </h1>
            <p className="text-sm text-[#ece4d0]/80 font-serif mt-1">
              Your path to <span className="text-[#e5c158] font-semibold">{roadmap ? roadmap.targetRole : 'Full-Stack Developer'}</span>
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end text-right space-y-1">
            <Compass className="w-8 h-8 text-[#e5c158]/80 animate-spin-slow mb-1" />
            <p className="text-xs italic text-[#ece4d0]/90 max-w-xs font-serif">
              “Small steps on the right path lead to big destinations.”
            </p>
          </div>
        </div>

      </div>

      {/* Main Grid: Left Tree Hierarchy + Right Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Learning Roadmap Tree Structure (7 Cols) */}
        <div className="lg:col-span-7 bg-[#060e1a] rounded-2xl border border-[#c5a059]/30 p-6 shadow-xl space-y-6">
          
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#c5a059]/20">
            <h2 className="text-xl font-serif font-bold text-[#f4f1de]">
              Learning Roadmap
            </h2>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#c5a059]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search roadmap..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#040810] border border-[#c5a059]/30 text-xs text-[#ece4d0] focus:outline-none focus:border-[#e5c158]"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-[#e5c158] text-sm">
              ⚓ Loading learning roadmap structure...
            </div>
          ) : (
            
            /* Tree Hierarchy Container with Golden Vertical Trunk Line */
            <div className="relative space-y-8 pl-4">
              
              {/* Vertical Golden Connecting Trunk Line */}
              <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#e5c158] via-[#c5a059]/60 to-[#2c1d11]" />

              {/* SECTION 0: TARGET CAREER ROOT GOAL */}
              {targetGoal && (
                <div className="relative flex items-start gap-4 z-10">
                  <div className="w-12 h-12 rounded-full bg-[#1a1008] border-2 border-[#e5c158] flex items-center justify-center shrink-0 shadow-lg shadow-[#e5c158]/20">
                    {getSectionIcon(0)}
                  </div>

                  <div className="flex-1 bg-[#091526] rounded-xl border border-[#c5a059]/40 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#e5c158]">
                          Target Career
                        </span>
                        <h3 className="text-base font-serif font-bold text-[#f4f1de]">
                          {targetGoal.title}
                        </h3>
                      </div>
                      <span className="text-xs font-serif font-bold text-[#e5c158]">
                        {roadmap?.overallProgress}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-[#040810] border border-[#c5a059]/20 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#c5a059] to-[#e5c158] transition-all duration-500"
                        style={{ width: `${roadmap?.overallProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTIONS 1 to N: PHASES & CHILD TASKS */}
              {phases.map((phase, pIdx) => {
                const childTasks = roadmap?.nodes.filter((n) => n.parentId === phase.nodeId) || [];
                const completedCount = childTasks.filter((t) => t.status === 'completed').length;
                const phaseProgress = Math.round((completedCount / max(childTasks.length, 1)) * 100);

                return (
                  <div key={phase.nodeId} className="relative flex items-start gap-4 z-10">
                    
                    {/* Section Number Icon Badge */}
                    <div className="w-12 h-12 rounded-full bg-[#1a1008] border-2 border-[#c5a059] flex items-center justify-center shrink-0 shadow-lg">
                      {getSectionIcon(pIdx + 1)}
                    </div>

                    {/* Phase Box */}
                    <div className="flex-1 bg-[#091526] rounded-xl border border-[#c5a059]/30 p-4 space-y-4">
                      
                      <div className="flex items-center justify-between pb-2 border-b border-[#c5a059]/20">
                        <div>
                          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#c5a059]">
                            Phase 0{pIdx + 1}
                          </span>
                          <h3 className="text-base font-serif font-bold text-[#f4f1de]">
                            {phase.title}
                          </h3>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-[#ece4d0]/70 font-serif">
                            {completedCount} / {childTasks.length} completed
                          </span>
                          <div className="w-28 h-1.5 rounded-full bg-[#040810] border border-[#c5a059]/20 overflow-hidden mt-1">
                            <div
                              className="h-full bg-[#e5c158]"
                              style={{ width: `${phaseProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Child Tasks List */}
                      <div className="space-y-2 pt-1">
                        {childTasks.map((task) => {
                          const isSelected = selectedNodeId === task.nodeId;

                          return (
                            <div
                              key={task.nodeId}
                              onClick={() => {
                                setSelectedNodeId(task.nodeId);
                                setModalError('');
                                setModalSuccess('');
                              }}
                              className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#1a2b3c] border-[#e5c158] shadow-lg ring-1 ring-[#e5c158]/50'
                                  : 'bg-[#040810]/70 border-[#c5a059]/20 hover:border-[#c5a059]/60 hover:bg-[#091526]'
                              }`}
                            >
                              <div className="flex items-center gap-3 overflow-hidden">
                                {getTaskStatusIcon(task.status, isSelected)}
                                <span className={`text-xs font-serif truncate ${isSelected ? 'text-[#e5c158] font-bold' : 'text-[#ece4d0]'}`}>
                                  {task.title}
                                </span>
                              </div>

                              <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-[#e5c158] translate-x-1' : 'text-[#c5a059]/40'}`} />
                            </div>
                          );
                        })}
                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          )}

        </div>

        {/* Right Column: Node Details Panel Matching Image 2 & Image 3 (5 Cols) */}
        <div className="lg:col-span-5 bg-[#060e1a] rounded-2xl border border-[#c5a059]/40 p-6 shadow-2xl space-y-6 sticky top-24">
          
          {selectedNode ? (
            <>
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-[#c5a059]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#e5c158] bg-[#1a1008] flex items-center justify-center text-[#e5c158]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#f4f1de]">
                      {selectedNode.title}
                    </h3>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#e5c158]">
                      {selectedNode.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Feedback Alerts */}
              {modalError && (
                <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              {modalSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{modalSuccess}</span>
                </div>
              )}

              {/* Node Overview Text */}
              <div className="space-y-4 text-xs text-[#ece4d0]/90 font-serif leading-relaxed">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold mb-1">
                    Task Overview & Description
                  </h4>
                  <p className="bg-[#040810] p-3 rounded-xl border border-[#c5a059]/20">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Prerequisites */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold mb-1 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    Prerequisites
                  </h4>
                  {selectedNode.prerequisiteNodeIds.length > 0 ? (
                    <div className="space-y-1">
                      {selectedNode.prerequisiteNodeIds.map((pid) => (
                        <div key={pid} className="flex items-center gap-2 text-emerald-300 text-[11px]">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Satisfied Prerequisite Task ({pid})</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-[#ece4d0]/60 italic">No prerequisite requirements.</p>
                  )}
                </div>

                {/* Related Skills */}
                {selectedNode.relatedSkillIds.length > 0 && (
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold mb-1">
                      Related Technical Skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedNode.relatedSkillIds.map((sk) => (
                        <span key={sk} className="px-2.5 py-1 rounded-md bg-[#040810] border border-[#c5a059]/30 text-[#f4f1de] text-[11px]">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Learning Resources */}
                {selectedNode.resources.length > 0 && (
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold mb-1">
                      Verified Learning Resources
                    </h4>
                    <div className="space-y-1.5">
                      {selectedNode.resources.map((res, idx) => (
                        <a
                          key={idx}
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between p-2.5 rounded-lg bg-[#040810] border border-[#c5a059]/30 hover:border-[#e5c158] text-[#e5c158] text-[11px] transition-colors"
                        >
                          <span>{res.title} ({res.provider})</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Completion Criteria */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold mb-1">
                    Completion & Validation Criteria
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-[#ece4d0]/80">
                    <li>{selectedNode.completionCriteria}</li>
                    <li>Ensure unit test verification passes before submission.</li>
                  </ul>
                </div>
              </div>

              {/* Full-width Golden Mark as Complete Action Button matching Image 2 & Image 3 */}
              <div className="pt-4 border-t border-[#c5a059]/20">
                {selectedNode.status === 'completed' ? (
                  <div className="w-full py-3 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 font-serif font-bold text-xs flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Task Completed & Verified
                  </div>
                ) : (
                  <button
                    onClick={handleMarkComplete}
                    disabled={completing}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#e5c158] via-[#c5a059] to-[#d4af37] border border-[#f4f1de]/40 text-[#040810] font-serif font-bold text-xs hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {completing ? (
                      <span className="animate-spin text-[#040810]">⚓</span>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Mark as Complete
                      </>
                    )}
                  </button>
                )}
              </div>

            </>
          ) : (
            <div className="p-8 text-center text-[#ece4d0]/60 text-xs">
              Select any node on the roadmap tree to inspect details.
            </div>
          )}

        </div>

      </div>

    </DashboardLayout>
  );
};

function max(a: number, b: number): number {
  return a > b ? a : b;
}
