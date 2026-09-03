import React from 'react';
import { motion } from 'motion/react';
import {
  ProblemFearExposureIllustration,
  ProblemFearRetaliationIllustration,
  ProblemLostInSystemIllustration,
} from '../illustrations/EmpathyIllustrations';

export const TheProblemSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-white border-y border-rose-100/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#94204D] font-mono">
            The Reality of Speaking Up
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E121E] font-display-styled tracking-tight">
            Speaking up isn't always easy.
          </h2>
        </div>

        {/* 3 Editorial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 pt-4">
          
          {/* Situation 01 */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="text-sm font-bold font-mono text-[#94204D]">01</span>
              <h3 className="text-2xl font-bold text-[#1E121E] font-display-styled">
                Fear of exposure
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Worry that reporting compromises personal privacy before safety protections are in place.
              </p>
            </div>

            <div className="bg-[#FFF8F9] rounded-2xl p-4 sm:p-6 border border-rose-100 flex items-center justify-center">
              <ProblemFearExposureIllustration className="w-full max-w-[280px]" />
            </div>
          </div>

          {/* Situation 02 */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="text-sm font-bold font-mono text-[#94204D]">02</span>
              <h3 className="text-2xl font-bold text-[#1E121E] font-display-styled">
                Fear of retaliation
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Concerns about academic standing, workplace consequences, or power dynamics.
              </p>
            </div>

            <div className="bg-[#FFF8F9] rounded-2xl p-4 sm:p-6 border border-rose-100 flex items-center justify-center">
              <ProblemFearRetaliationIllustration className="w-full max-w-[280px]" />
            </div>
          </div>

          {/* Situation 03 */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="text-sm font-bold font-mono text-[#94204D]">03</span>
              <h3 className="text-2xl font-bold text-[#1E121E] font-display-styled">
                Not knowing where to report
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Navigating complex institutional bureaucracy and opaque committee channels.
              </p>
            </div>

            <div className="bg-[#FFF8F9] rounded-2xl p-4 sm:p-6 border border-rose-100 flex items-center justify-center">
              <ProblemLostInSystemIllustration className="w-full max-w-[280px]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
