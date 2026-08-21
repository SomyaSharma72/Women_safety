import React from 'react';
import { motion } from 'motion/react';
import {
  ProblemFearExposureIllustration,
  ProblemFearRetaliationIllustration,
  ProblemLostInSystemIllustration,
} from '../illustrations/EmpathyIllustrations';

export const TheProblemSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-y border-rose-100/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block px-3.5 py-1 bg-[#FDF0F3] text-[#94204D] text-xs font-bold rounded-full uppercase tracking-wider border border-[#FADCE2]">
            The Reality of Speaking Up
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E121E] font-display-styled">
            Speaking up isn't always easy.
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Most harassment goes unreported not because victims don't want resolution, but because the existing reporting channels carry real risks to reputation, academics, and safety.
          </p>
        </div>

        {/* 3 Illustrated Situations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Situation 01 */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-[#FFF9FA] rounded-[32px] p-7 border border-[#FADCE2] flex flex-col justify-between space-y-6 shadow-2xs"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-[#94204D]">01</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#94204D] bg-[#FDF0F3] px-2.5 py-1 rounded-full border border-[#FADCE2]">
                  Privacy Barrier
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display-styled">
                Fear of exposure
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Worrying that filing a formal complaint will immediately reveal your identity across the department or campus before any safety measures are in place.
              </p>
            </div>

            <div className="pt-2 flex justify-center">
              <ProblemFearExposureIllustration className="w-full" />
            </div>
          </motion.div>

          {/* Situation 02 */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-[#FFF9FA] rounded-[32px] p-7 border border-[#FADCE2] flex flex-col justify-between space-y-6 shadow-2xs"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-[#94204D]">02</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#94204D] bg-[#FDF0F3] px-2.5 py-1 rounded-full border border-[#FADCE2]">
                  Power Dynamic
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display-styled">
                Fear of retaliation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                When the perpetrator holds institutional power—such as grades, lab access, recommendations, or promotions—speaking alone feels like risking your entire future.
              </p>
            </div>

            <div className="pt-2 flex justify-center">
              <ProblemFearRetaliationIllustration className="w-full" />
            </div>
          </motion.div>

          {/* Situation 03 */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-[#FFF9FA] rounded-[32px] p-7 border border-[#FADCE2] flex flex-col justify-between space-y-6 shadow-2xs"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-[#94204D]">03</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#94204D] bg-[#FDF0F3] px-2.5 py-1 rounded-full border border-[#FADCE2]">
                  Bureaucracy
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display-styled">
                Not knowing where to report
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Confusing policies, rigid paperwork, and unclear escalation paths leave victims exhausted before they even begin to document what actually happened.
              </p>
            </div>

            <div className="pt-2 flex justify-center">
              <ProblemLostInSystemIllustration className="w-full" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
