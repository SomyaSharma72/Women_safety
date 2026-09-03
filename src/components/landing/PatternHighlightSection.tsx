import React from 'react';
import { motion } from 'motion/react';
import { MultiWomanPatternGraphic } from '../illustrations/EmpathyIllustrations';
import { Activity, ShieldCheck, MapPin, Scale } from 'lucide-react';
import { PATTERN_ALERTS } from '../../data/mockData';

export const PatternHighlightSection: React.FC = () => {
  const topPattern = PATTERN_ALERTS[0];

  return (
    <section className="py-14 sm:py-20 bg-[#1E121E] text-white overflow-hidden relative border-y border-[#3D2034]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-[#94204D]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-300 font-mono">
            Cross-Report Correlation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display-styled text-white tracking-tight">
            Connecting isolated signals into clear institutional patterns.
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Independent reports can reveal recurring harassment patterns while reporter identities remain completely protected.
          </p>
        </div>

        {/* Centerpiece: Multi-Woman Illustrated Pattern Graphic */}
        <div className="flex justify-center">
          <MultiWomanPatternGraphic className="w-full max-w-4xl" />
        </div>

        {/* 3 Concise Supporting Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          <div className="space-y-2 p-6 rounded-2xl bg-[#281425]/80 border border-[#482240]">
            <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-wider font-mono">
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              <span>Independent Reports</span>
            </div>
            <h4 className="text-lg font-bold text-white font-display-styled">
              Separate Accounts
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Separate accounts are filed with full identity protection. Reporters never see each other's private data.
            </p>
          </div>

          <div className="space-y-2 p-6 rounded-2xl bg-[#281425]/80 border border-[#482240]">
            <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-wider font-mono">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Signal Overlap</span>
            </div>
            <h4 className="text-lg font-bold text-white font-display-styled">
              Hotspots &amp; Time
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Recurring locations, times, departments, or perpetrators are linked safely without deanonymizing reporters.
            </p>
          </div>

          <div className="space-y-2 p-6 rounded-2xl bg-[#281425]/80 border border-[#482240]">
            <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-wider font-mono">
              <Scale className="w-4 h-4 text-rose-400" />
              <span>Human Review Only</span>
            </div>
            <h4 className="text-lg font-bold text-white font-display-styled">
              Accredited Teams
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Patterns are surfaced only to accredited oversight teams and internal complaints committees for deliberate review.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
