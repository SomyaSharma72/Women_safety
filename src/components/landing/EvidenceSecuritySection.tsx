import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, FileText, Image, MessageSquare, Check } from 'lucide-react';
import { EvidenceVaultWomanIllustration } from '../illustrations/EmpathyIllustrations';

export const EvidenceSecuritySection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-white border-y border-rose-100/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Short Explanation & 4-card Asset Grid */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#94204D] font-mono">
              Evidence Protection
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E121E] font-display-styled tracking-tight">
              Your evidence stays yours.
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Upload proof safely. Our automated filter scrubs identifying device details and EXIF tags before any reviewer can view attachments.
            </p>

            {/* 4-Card Asset Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FFF8F9] border border-rose-100 space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 font-display-styled">
                  <Lock className="w-4 h-4 text-[#94204D]" />
                  <span>Evidence is protected</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Encrypted storage, only accessible with your passkey.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF8F9] border border-rose-100 space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 font-display-styled">
                  <ShieldCheck className="w-4 h-4 text-[#94204D]" />
                  <span>Metadata minimized</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Location and device tags stripped unless explicitly included.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF8F9] border border-rose-100 space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 font-display-styled">
                  <FileText className="w-4 h-4 text-[#94204D]" />
                  <span>Access restricted</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Only assigned review teams can view the report.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF8F9] border border-rose-100 space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 font-display-styled">
                  <Check className="w-4 h-4 text-[#94204D]" />
                  <span>Deletion controls</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Delete or modify evidence at any time before escalation.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Woman with Secure Evidence Vault Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <EvidenceVaultWomanIllustration className="w-full max-w-[360px]" />
          </div>

        </div>
      </div>
    </section>
  );
};
