import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Check, AlertTriangle, Cpu, UserCheck } from 'lucide-react';
import { AnonymousFlowDiagramGraphic } from '../illustrations/EmpathyIllustrations';

export const AnonymousVerificationSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-y border-rose-100/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-3.5 py-1 bg-[#FDF0F3] text-[#94204D] text-xs font-bold rounded-full uppercase tracking-wider border border-[#FADCE2]">
            Cryptographic Integrity &amp; Trust
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E121E] font-display-styled">
            Identity protected doesn't mean unverified.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Institutions often ignore anonymous drop-boxes because of spam or fake complaints. SafeReport cryptographically verifies that every reporter belongs to the institution, while keeping their identity completely shielded from reviewers.
          </p>
        </div>

        {/* Central Illustrated Flow */}
        <div className="bg-[#FFF9FA] rounded-[36px] p-6 sm:p-10 border border-[#FADCE2] shadow-2xs flex flex-col items-center justify-center">
          <AnonymousFlowDiagramGraphic className="w-full" />
        </div>

        {/* Golden Rule Callout Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Box 1: Verified Identity Separation */}
          <div className="bg-[#FFF8F9] rounded-[28px] p-7 border border-[#FADCE2] space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#94204D] text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 font-display-styled">
                  Cryptographic Proof of Affiliation
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Your university or corporate email receives a cryptographic token confirming you are an active member. The token verifies the report is genuine, but strips your name, email, and IP address from the case file.
              </p>
            </div>

            <div className="pt-3 border-t border-rose-200/60 flex items-center gap-2 text-xs font-bold text-[#94204D]">
              <Check className="w-4 h-4 text-[#94204D]" />
              <span>Authentic reports without personal exposure</span>
            </div>
          </div>

          {/* Box 2: The Core AI Directive */}
          <div className="bg-[#FDF0F3] rounded-[28px] p-7 border border-[#FADCE2] space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#94204D] text-white flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h4 className="text-lg font-bold text-[#1E121E] font-display-styled">
                  AI Detects Patterns. It Never Determines Guilt.
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                We strictly reject automated judgments. Machine learning assists solely by grouping overlapping times, locations, and roles. Disciplinary outcomes and investigations are always led by authorized human committees.
              </p>
            </div>

            <div className="pt-3 border-t border-rose-200/60 flex items-center gap-2 text-xs font-bold text-[#94204D]">
              <Check className="w-4 h-4 text-[#94204D]" />
              <span>Due process preserved for all parties</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
