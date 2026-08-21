import React from 'react';
import { motion } from 'motion/react';
import { MultiWomanPatternGraphic } from '../illustrations/EmpathyIllustrations';
import { AlertTriangle, ArrowRight, Cpu, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';
import { PATTERN_ALERTS } from '../../data/mockData';

interface PatternHighlightSectionProps {
  onExploreRadar: () => void;
}

export const PatternHighlightSection: React.FC<PatternHighlightSectionProps> = ({
  onExploreRadar,
}) => {
  const topPattern = PATTERN_ALERTS[0];

  return (
    <section className="py-16 md:py-24 bg-[#1E121E] text-white overflow-hidden relative border-y border-[#3D2034]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#94204D]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3.5 py-1 rounded-full text-rose-200 text-xs font-bold uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5 text-rose-300" />
            <span>Cross-Report Correlation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display-styled text-white">
            Connecting isolated signals into clear institutional patterns.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Perpetrators frequently rely on their targets feeling isolated and doubting whether anyone will believe a single report. When multiple independent women document similar misconduct, SafeReport connects the dots safely.
          </p>
        </div>

        {/* Centerpiece: Multi-Woman Illustrated Pattern Graphic */}
        <div className="flex justify-center">
          <MultiWomanPatternGraphic className="w-full" />
        </div>

        {/* Breakdown of the 3 Correlated Reports & Core Directive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          
          {/* Left: Golden Directive Callout */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-[28px] bg-[#2A1727] border border-[#4A2441] space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white font-display-styled">
                  Strict Privacy &amp; Due Process Guardrails
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The algorithm <strong>never</strong> declares guilt or confirms accusations automatically. It detects recurring geographic, temporal, and departmental overlap, and alerts the authorized institutional committee to review the factual pattern.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#34182E] border border-[#522547] text-xs text-rose-200 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Victims remain protected from each other and general reviewers.</span>
            </div>
          </div>

          {/* Right: Live Pattern Alert Card */}
          <div className="lg:col-span-7 bg-[#281425] rounded-[32px] p-6 sm:p-8 border border-[#482240] shadow-2xl space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#482240]">
              <div>
                <span className="text-[11px] font-mono text-rose-300 uppercase font-bold tracking-wider">
                  Pattern Alert #{topPattern.id}
                </span>
                <h3 className="text-xl font-bold text-white font-display-styled">
                  {topPattern.title}
                </h3>
              </div>
              <span className="flex items-center gap-1.5 bg-rose-500/20 border border-rose-500/50 px-3 py-1 rounded-full text-rose-200 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                <span>{topPattern.confidenceScore}% Overlap Confidence</span>
              </span>
            </div>

            {/* 3 Matched Reports Summary */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-rose-200/80">
                Correlated Independent Reports (Identities Masked):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-3 rounded-2xl bg-[#1A0B18] border border-[#482240]">
                  <span className="font-mono font-bold text-rose-300 block mb-1">#R-021</span>
                  <span className="text-slate-300 block">Aug 12 &bull; 10:45 AM</span>
                  <span className="text-[10px] text-slate-400">CS Dept Lab 3</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#1A0B18] border border-[#482240]">
                  <span className="font-mono font-bold text-rose-300 block mb-1">#R-087</span>
                  <span className="text-slate-300 block">Aug 15 &bull; 05:15 PM</span>
                  <span className="text-[10px] text-slate-400">CS Dept Hall</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#1A0B18] border border-[#482240]">
                  <span className="font-mono font-bold text-rose-300 block mb-1">#R-143</span>
                  <span className="text-slate-300 block">Aug 19 &bull; 06:30 PM</span>
                  <span className="text-[10px] text-slate-400">Workstation 14</span>
                </div>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={onExploreRadar}
              className="w-full py-4 rounded-2xl bg-[#94204D] hover:bg-[#7D1B41] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-[#94204D]/30 cursor-pointer"
            >
              <Activity className="w-4 h-4" />
              <span>Explore Institutional Pattern Radar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
