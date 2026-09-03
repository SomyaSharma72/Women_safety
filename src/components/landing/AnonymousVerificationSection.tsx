import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, UserCheck, EyeOff, Lock, Sparkles, Check } from 'lucide-react';
import { AnonymousFlowDiagramGraphic } from '../illustrations/EmpathyIllustrations';

export const AnonymousVerificationSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-white border-y border-rose-100/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#94204D] font-mono">
            Cryptographic Integrity
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E121E] font-display-styled tracking-tight">
            Identity protected doesn't mean unverified.
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Reports are authenticated as legitimate institutional members while preserving total identity concealment from reviewers.
          </p>
        </div>

        {/* Central Illustrated Flow Graphic */}
        <div className="bg-[#FFF8F9] rounded-3xl p-6 sm:p-10 border border-rose-100 flex flex-col items-center justify-center relative overflow-hidden">
          <AnonymousFlowDiagramGraphic className="w-full max-w-4xl" />

          {/* 3 Clean Supporting Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 mt-6 border-t border-rose-200/60 w-full text-sm">
            <div className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-[#94204D] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Member Verified</span>
                <span className="text-slate-600 text-xs">Authenticates campus or workplace affiliation securely.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <EyeOff className="w-5 h-5 text-[#94204D] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Identity Shielded</span>
                <span className="text-slate-600 text-xs">Names and emails are cryptographically withheld from reviewers.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#94204D] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Tamper-Proof Token</span>
                <span className="text-slate-600 text-xs">Cryptographic token confirms authenticity without tracing.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
