import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  MapPin,
  EyeOff,
  Building2,
  GraduationCap,
  Briefcase,
  Layers,
  Clock,
  Flame,
  Search,
  Maximize2,
  ChevronRight,
  AlertCircle,
  Activity,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';

type MapSector = 'college' | 'company';

interface HotspotNode {
  id: string;
  x: number; // percentage
  y: number; // percentage
  name: string;
  subLocation: string;
  sector: MapSector;
  reportsCount: number;
  timeframe: string;
  department: string;
  patternCode: string;
  correlationConfidence: number;
  primaryIssues: string[];
  shiftCategory: 'evening' | 'night' | 'daytime' | 'offsite';
  floorLevel: string;
}

export const LightPatternMapSection: React.FC = () => {
  const [activeSector, setActiveSector] = useState<MapSector>('college');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-col-1');
  const [filterShift, setFilterShift] = useState<'all' | 'evening_night' | 'recurring_only'>('all');
  const [isLiveRadarActive, setIsLiveRadarActive] = useState<boolean>(true);

  // College Pattern Nodes
  const collegeNodes: HotspotNode[] = [
    {
      id: 'node-col-1',
      x: 34,
      y: 42,
      name: 'Turing Hall • Advanced Systems Lab 3',
      subLocation: '3rd Floor East Wing (Near Server Rack)',
      sector: 'college',
      reportsCount: 3,
      timeframe: 'Weekday Evenings (5:00 PM – 7:30 PM)',
      department: 'Computer Science Department',
      patternCode: 'PAT-8821',
      correlationConfidence: 94,
      primaryIssues: [
        'Doorway egress blockage when vacating',
        'Academic grade evaluation coercion',
        'Stairwell stalking after lab hours',
      ],
      shiftCategory: 'evening',
      floorLevel: 'Level 3',
    },
    {
      id: 'node-col-2',
      x: 68,
      y: 30,
      name: 'Central Library • East Study Pods',
      subLocation: 'Level 4 Quiet Study East Carrels',
      sector: 'college',
      reportsCount: 2,
      timeframe: 'Weekday Afternoons (3:00 PM – 5:30 PM)',
      department: 'Central Administration & Library',
      patternCode: 'PAT-6104',
      correlationConfidence: 68,
      primaryIssues: [
        'Covert non-consensual photography over dividers',
        'Targeted relocation following student between carrels',
      ],
      shiftCategory: 'daytime',
      floorLevel: 'Level 4',
    },
    {
      id: 'node-col-3',
      x: 78,
      y: 72,
      name: 'Design & Architecture Workshop',
      subLocation: 'Foundry & Sculpture Model Bay 2',
      sector: 'college',
      reportsCount: 2,
      timeframe: 'Bi-weekly Studio Reviews (4:00 PM – 6:30 PM)',
      department: 'Design & Architecture',
      patternCode: 'PAT-4215',
      correlationConfidence: 76,
      primaryIssues: [
        'Inappropriate critique comments during reviews',
        'Attempted private off-schedule session solicitation',
      ],
      shiftCategory: 'evening',
      floorLevel: 'Basement Bay',
    },
  ];

  // Corporate Company Pattern Nodes
  const companyNodes: HotspotNode[] = [
    {
      id: 'node-corp-1',
      x: 36,
      y: 38,
      name: 'NovaTech Tower 1 • Engineering Wing',
      subLocation: 'Level 5 Focus Pods 5A-5C & Sprint Room',
      sector: 'company',
      reportsCount: 2,
      timeframe: 'Late Sprint Shifts (7:30 PM – 9:00 PM)',
      department: 'Engineering & Product Development',
      patternCode: 'PAT-9940',
      correlationConfidence: 92,
      primaryIssues: [
        'Late-night 1-on-1 coercion outside standard shift',
        'Promotion packet approval tied to personal compliance',
        'Conference room door blocking & physical restraint',
      ],
      shiftCategory: 'night',
      floorLevel: 'Floor 5',
    },
    {
      id: 'node-corp-2',
      x: 72,
      y: 40,
      name: 'Executive Boardroom & Sales Bay',
      subLocation: 'Tower 2 Level 12 Executive Hospitality',
      sector: 'company',
      reportsCount: 2,
      timeframe: 'Quarterly Off-site Planning (8:00 PM+)',
      department: 'Sales, Marketing & Brand Partnerships',
      patternCode: 'PAT-7215',
      correlationConfidence: 78,
      primaryIssues: [
        'Off-site client dinner boundary violations',
        'Commission quota leverage used for private hotel visits',
      ],
      shiftCategory: 'evening',
      floorLevel: 'Floor 12',
    },
    {
      id: 'node-corp-3',
      x: 62,
      y: 78,
      name: 'Distribution Hub 4 Logistics Dock',
      subLocation: 'Shift 3 Dispatch & Heavy-Lift Station',
      sector: 'company',
      reportsCount: 2,
      timeframe: 'Night Dispatch Shift (11:00 PM – 2:00 AM)',
      department: 'Operations, Warehouse & Logistics',
      patternCode: 'PAT-7440',
      correlationConfidence: 72,
      primaryIssues: [
        'Punitive heavy-lift station allocation by supervisor',
        'Hostile verbal comments during break intervals',
      ],
      shiftCategory: 'night',
      floorLevel: 'Ground Dock',
    },
  ];

  const currentNodes = activeSector === 'college' ? collegeNodes : companyNodes;

  const filteredNodes = currentNodes.filter((node) => {
    if (filterShift === 'evening_night') {
      return node.shiftCategory === 'evening' || node.shiftCategory === 'night';
    }
    if (filterShift === 'recurring_only') {
      return node.reportsCount >= 3;
    }
    return true;
  });

  const selectedNode =
    currentNodes.find((n) => n.id === selectedNodeId) || currentNodes[0];

  return (
    <section className="py-16 sm:py-24 bg-[#FFF9FA] border-y border-rose-100 relative overflow-hidden" id="spatial-pattern-map">
      {/* Soft Ambient Radial Accents */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-rose-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-amber-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header & Interactive Sector Selector */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-rose-100 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#94204D] animate-ping" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#94204D] font-bold">
                Multi-Sector Spatial Radar
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display-styled text-[#1E121E] tracking-tight leading-tight">
              Spatial pattern intelligence for colleges &amp; corporate workplaces.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Separate anonymous submissions connect in space and time to expose systemic hotspots. Reporters remain 100% anonymous while institutional committees gain actionable spatial clarity.
            </p>
          </div>

          {/* College vs Company Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-2xl border border-rose-200 shadow-2xs self-start lg:self-end">
            <button
              onClick={() => {
                setActiveSector('college');
                setSelectedNodeId('node-col-1');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSector === 'college'
                  ? 'bg-[#94204D] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#94204D] hover:bg-rose-50/60'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>College Campus View</span>
            </button>
            <button
              onClick={() => {
                setActiveSector('company');
                setSelectedNodeId('node-corp-1');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSector === 'company'
                  ? 'bg-[#94204D] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#94204D] hover:bg-rose-50/60'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Company / Corporate View</span>
            </button>
          </div>
        </div>

        {/* EXPANSIVE MAP CANVAS & INSPECTION BENCH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Interactive Map Area (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-[32px] p-5 sm:p-7 border border-rose-200 shadow-sm relative overflow-hidden">
              
              {/* Map Top Utility Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-rose-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF0F3] border border-[#FADCE2] text-[#94204D] font-mono font-bold">
                    <Activity className="w-3.5 h-3.5" />
                    <span>
                      {activeSector === 'college' ? 'ACADEMIC RADAR' : 'ENTERPRISE RADAR'}
                    </span>
                  </div>
                  <span className="text-slate-500 hidden sm:inline">•</span>
                  <span className="text-slate-700 font-semibold hidden sm:inline">
                    {activeSector === 'college' ? 'Crestview Tech Campus Grid' : 'NovaTech Global HQ Grid'}
                  </span>
                </div>

                {/* Filter / Filter Shifts */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono text-[11px]">Filter:</span>
                  <select
                    value={filterShift}
                    onChange={(e) => setFilterShift(e.target.value as any)}
                    className="text-xs font-semibold bg-[#FFF8F9] border border-rose-200 text-slate-700 rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#94204D]"
                  >
                    <option value="all">All Shifts &amp; Times</option>
                    <option value="evening_night">Evening &amp; Night Only</option>
                    <option value="recurring_only">3+ Correlated Reports</option>
                  </select>

                  <button
                    onClick={() => setIsLiveRadarActive(!isLiveRadarActive)}
                    title="Toggle pulse radar"
                    className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                      isLiveRadarActive
                        ? 'bg-rose-50 border-rose-300 text-[#94204D]'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    <Zap className="w-3 h-3" />
                    <span className="hidden md:inline">Pulse</span>
                  </button>
                </div>
              </div>

              {/* Large Interactive SVG Map Canvas */}
              <div className="relative w-full aspect-[16/10] bg-[#FFFBFB] rounded-2xl border border-rose-200 overflow-hidden select-none shadow-inner">
                
                {/* SVG Blueprint Grid & Pathways */}
                <svg className="absolute inset-0 w-full h-full stroke-rose-200/60" width="100%" height="100%">
                  <defs>
                    <pattern id="arch-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                      <path d="M 48 0 L 0 0 0 48" fill="none" strokeWidth="0.8" />
                      <circle cx="24" cy="24" r="0.8" fill="#F4B8C5" />
                    </pattern>
                    <linearGradient id="corridorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FDE8EC" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#F9D2DC" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  <rect width="100%" height="100%" fill="url(#arch-grid)" />

                  {/* Architectural Concourse & Pathways */}
                  {activeSector === 'college' ? (
                    <>
                      {/* Academic Boulevard */}
                      <path
                        d="M 40 240 Q 240 140 480 180 T 800 120"
                        fill="none"
                        stroke="#FAD2DC"
                        strokeWidth="24"
                        strokeLinecap="round"
                      />
                      {/* Science Walkway */}
                      <path
                        d="M 280 30 L 280 400"
                        fill="none"
                        stroke="#FAD2DC"
                        strokeWidth="18"
                        strokeLinecap="round"
                      />
                      {/* Library Corridor */}
                      <path
                        d="M 540 40 L 540 380"
                        fill="none"
                        stroke="#FAD2DC"
                        strokeWidth="18"
                        strokeLinecap="round"
                      />
                      {/* Diagonal Quad Path */}
                      <path
                        d="M 280 160 L 540 320"
                        fill="none"
                        stroke="#F6C3D0"
                        strokeWidth="10"
                        strokeDasharray="6 6"
                      />
                    </>
                  ) : (
                    <>
                      {/* Corporate Concourse / Atrium */}
                      <rect x="8%" y="45%" width="84%" height="10%" rx="8" fill="#FCE6EC" />
                      {/* Skybridge Connecting Wings */}
                      <path
                        d="M 300 40 L 300 380"
                        fill="none"
                        stroke="#F8CED8"
                        strokeWidth="20"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 580 40 L 580 380"
                        fill="none"
                        stroke="#F8CED8"
                        strokeWidth="20"
                        strokeLinecap="round"
                      />
                      <circle cx="50%" cy="50%" r="90" fill="none" stroke="#F4B8C5" strokeWidth="2" strokeDasharray="5 5" />
                    </>
                  )}

                  {/* Dynamic Correlation Connecting Lines between current nodes */}
                  {filteredNodes.length > 1 && (
                    <>
                      <path
                        d={`M ${filteredNodes[0]?.x}% ${filteredNodes[0]?.y}% Q 50% 30% ${filteredNodes[1]?.x}% ${filteredNodes[1]?.y}%`}
                        fill="none"
                        stroke="#94204D"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                        strokeOpacity="0.45"
                      />
                      {filteredNodes[2] && (
                        <path
                          d={`M ${filteredNodes[1]?.x}% ${filteredNodes[1]?.y}% Q 75% 60% ${filteredNodes[2]?.x}% ${filteredNodes[2]?.y}%`}
                          fill="none"
                          stroke="#94204D"
                          strokeWidth="2.5"
                          strokeDasharray="6 6"
                          strokeOpacity="0.45"
                        />
                      )}
                    </>
                  )}
                </svg>

                {/* Building / Zone Structures Overlays */}
                {activeSector === 'college' ? (
                  <>
                    {/* CS & Tech Complex */}
                    <div className="absolute top-[26%] left-[16%] w-[32%] h-[38%] rounded-2xl bg-white/95 border-2 border-rose-200 shadow-md p-3 flex flex-col justify-between pointer-events-none transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-[#94204D]" />
                          <span className="text-xs font-bold text-slate-800">Turing CS Complex</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#94204D] bg-rose-50 px-2 py-0.5 rounded-md">
                          Floor 3 Active
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between border-t border-rose-100 pt-1.5">
                        <span>Labs 1-8 • Server Room</span>
                        <span className="text-rose-700 font-bold">3 Reports Flagged</span>
                      </div>
                    </div>

                    {/* Central Library Wing */}
                    <div className="absolute top-[14%] left-[56%] w-[28%] h-[32%] rounded-2xl bg-white/95 border border-rose-200 shadow-sm p-3 flex flex-col justify-between pointer-events-none">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-600" />
                          <span className="text-xs font-bold text-slate-800">Central Library</span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-500">Level 4</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Quiet Study Carrels 401-440</span>
                    </div>

                    {/* Design & Arts Foundry */}
                    <div className="absolute top-[60%] left-[62%] w-[30%] h-[32%] rounded-2xl bg-white/95 border border-rose-200 shadow-sm p-3 flex flex-col justify-between pointer-events-none">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-600" />
                          <span className="text-xs font-bold text-slate-800">Foundry &amp; Studio Bay</span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-500">Bay 2</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Sculpture &amp; Critique Wing</span>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Tower 1 Engineering Floor */}
                    <div className="absolute top-[22%] left-[16%] w-[34%] h-[40%] rounded-2xl bg-white/95 border-2 border-rose-200 shadow-md p-3 flex flex-col justify-between pointer-events-none">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-[#94204D]" />
                          <span className="text-xs font-bold text-slate-800">HQ Tower 1 • Engineering</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#94204D] bg-rose-50 px-2 py-0.5 rounded-md">
                          Floor 5
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between border-t border-rose-100 pt-1.5">
                        <span>Pods 5A-5C • Sprint Bay</span>
                        <span className="text-rose-700 font-bold">2 Reports Correlated</span>
                      </div>
                    </div>

                    {/* Tower 2 Executive & Sales */}
                    <div className="absolute top-[16%] left-[60%] w-[32%] h-[34%] rounded-2xl bg-white/95 border border-rose-200 shadow-sm p-3 flex flex-col justify-between pointer-events-none">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-600" />
                          <span className="text-xs font-bold text-slate-800">Tower 2 • Executive Sales</span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-500">Floor 12</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Hospitality Suites &amp; Board</span>
                    </div>

                    {/* Distribution Hub 4 */}
                    <div className="absolute top-[62%] left-[48%] w-[38%] h-[32%] rounded-2xl bg-white/95 border border-rose-200 shadow-sm p-3 flex flex-col justify-between pointer-events-none">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-600" />
                          <span className="text-xs font-bold text-slate-800">Distribution Hub 4</span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-500">Shift 3</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Loading Docks &amp; Dispatch Bay</span>
                    </div>
                  </>
                )}

                {/* Hotspot Incident Nodes with Rich Animation */}
                {filteredNodes.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  return (
                    <div
                      key={node.id}
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
                      onClick={() => setSelectedNodeId(node.id)}
                    >
                      {/* Ambient Heat Halo */}
                      <div
                        className={`absolute -inset-6 rounded-full transition-all duration-300 pointer-events-none ${
                          isSelected
                            ? 'bg-[#94204D]/25 scale-125'
                            : 'bg-[#94204D]/10 group-hover:bg-[#94204D]/20 group-hover:scale-110'
                        }`}
                      />

                      {/* Live Radar Ping Ripple */}
                      {isLiveRadarActive && (
                        <span className="absolute -inset-3.5 rounded-full bg-[#94204D]/20 animate-ping pointer-events-none" />
                      )}

                      {/* Main Node Badge */}
                      <div
                        className={`relative w-8 h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center font-bold text-xs shadow-md ${
                          isSelected
                            ? 'bg-[#94204D] text-white border-white scale-125 ring-4 ring-rose-200'
                            : 'bg-white text-[#94204D] border-[#94204D] group-hover:scale-115 group-hover:bg-[#94204D] group-hover:text-white'
                        }`}
                      >
                        <span>{node.reportsCount}</span>
                      </div>

                      {/* Floating Tooltip Label */}
                      <div
                        className={`absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl bg-white border border-rose-200 shadow-md text-center transition-all duration-150 z-40 pointer-events-none ${
                          isSelected
                            ? 'opacity-100 scale-100 ring-2 ring-[#94204D]/30'
                            : 'opacity-85 group-hover:opacity-100 group-hover:scale-105'
                        }`}
                      >
                        <p className="text-xs font-bold text-slate-900 leading-tight">
                          {node.name.split('•')[0]}
                        </p>
                        <p className="text-[10px] text-[#94204D] font-bold mt-0.5">
                          {node.reportsCount} Correlated Filings • {node.floorLevel}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Footer Legend & Assurances */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs text-slate-600">
                <div className="flex flex-wrap items-center gap-5">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#94204D]" />
                    <span className="font-semibold text-slate-700">Recurring Pattern Cluster</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-0.5 border-t-2 border-dashed border-[#94204D]" />
                    <span className="font-semibold text-slate-700">Spatial / Shift Overlap</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-500 font-mono">
                    <EyeOff className="w-3.5 h-3.5 text-[#94204D]" />
                    <span>0 Identity Leaks</span>
                  </span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">
                  Click any hotspot to inspect dossier correlations
                </span>
              </div>

            </div>
          </div>

          {/* Right Column: Live Correlated Signal Inspector Panel (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-[32px] p-6 border border-rose-200 shadow-sm space-y-5">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                    Cluster Dossier #{selectedNode?.patternCode}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FDF0F3] text-[#94204D] border border-[#FADCE2]">
                  {selectedNode?.correlationConfidence}% Confidence
                </span>
              </div>

              {/* Cluster Title & Department */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#94204D] font-bold font-mono">
                  {selectedNode?.sector === 'college' ? (
                    <GraduationCap className="w-3.5 h-3.5" />
                  ) : (
                    <Briefcase className="w-3.5 h-3.5" />
                  )}
                  <span>{selectedNode?.department}</span>
                </div>
                <h3 className="text-lg font-bold text-[#1E121E] font-display-styled leading-snug">
                  {selectedNode?.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>{selectedNode?.subLocation}</span>
                </p>
              </div>

              {/* Time Window & Recurring Pattern Cadence */}
              <div className="bg-[#FFF9FA] rounded-2xl p-3.5 border border-rose-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Clock className="w-3.5 h-3.5 text-[#94204D]" />
                  <span>Observed Temporal Window</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedNode?.timeframe}
                </p>
              </div>

              {/* Primary Detected Risk Indicators */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Correlated Modus Operandi
                </span>
                <ul className="space-y-2">
                  {selectedNode?.primaryIssues.map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <AlertCircle className="w-3.5 h-3.5 text-[#94204D] shrink-0 mt-0.5" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cryptographic Protection Guarantee Box */}
              <div className="rounded-2xl p-4 bg-[#FDF0F3] border border-[#FADCE2] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#94204D]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Decoupled Signal Security</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Individual victim identities, student IDs, employee badges, and personal device IPs are cryptographically stripped before spatial clustering.
                </p>
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-1">
                <a
                  href="#report"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#94204D] hover:bg-[#7D1B41] text-white font-bold text-xs transition shadow-sm cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Submit Protected Report For This Zone</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Three Pillar Cards (Company & College Wise) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-white rounded-2xl p-6 border border-rose-100 shadow-2xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#94204D]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Academic &amp; Lab Safety</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Detects repeated grading coercion, lab door obstructions, and after-hours isolation across departments and study centers.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-rose-100 shadow-2xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#94204D]">
              <Briefcase className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Corporate &amp; Workplace POSH</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Surfaces appraisal pressure, late sprint 1-on-1 coercion, off-site client gala harassment, and supervisory intimidation.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-rose-100 shadow-2xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#94204D]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Decoupled Anonymity</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              All telemetry, names, and contact vectors are separated via zero-knowledge tokens. Only spatial and temporal signals are mapped.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
