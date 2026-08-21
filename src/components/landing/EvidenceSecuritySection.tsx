import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, EyeOff, FileText, Image, MessageSquare, Check, Sparkles } from 'lucide-react';
import { EvidenceVaultWomanIllustration } from '../illustrations/EmpathyIllustrations';

export const EvidenceSecuritySection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-y border-rose-100/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Friendly Explanation */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block px-3.5 py-1 bg-[#FDF0F3] text-[#94204D] text-xs font-bold rounded-full uppercase tracking-wider border border-[#FADCE2]">
              Evidence Protection
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E121E] font-display-styled">
              Your evidence stays yours.
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              We never ask for more data than necessary. Whether you're uploading screenshots, audio recordings, or text logs, our automated privacy filter scrubs identifying device details before any reviewer ever sees it.
            </p>

            {/* 4 Supported File Types with Soft Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#FFF8F9] border border-rose-100/90 text-center space-y-1.5 shadow-2xs">
                <Image className="w-5 h-5 text-[#94204D] mx-auto" />
                <span className="text-xs font-bold text-slate-800 block">Screenshots</span>
                <span className="text-[10px] text-slate-500 block">EXIF Cleared</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFF8F9] border border-rose-100/90 text-center space-y-1.5 shadow-2xs">
                <MessageSquare className="w-5 h-5 text-rose-500 mx-auto" />
                <span className="text-xs font-bold text-slate-800 block">Messages</span>
                <span className="text-[10px] text-slate-500 block">Names Redacted</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFF8F9] border border-rose-100/90 text-center space-y-1.5 shadow-2xs">
                <FileText className="w-5 h-5 text-slate-700 mx-auto" />
                <span className="text-xs font-bold text-slate-800 block">Documents</span>
                <span className="text-[10px] text-slate-500 block">SHA-256 Hashed</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFF8F9] border border-rose-100/90 text-center space-y-1.5 shadow-2xs">
                <Lock className="w-5 h-5 text-[#94204D] mx-auto" />
                <span className="text-xs font-bold text-slate-800 block">Photos</span>
                <span className="text-[10px] text-slate-500 block">Zero Cloud Leaks</span>
              </div>
            </div>

            {/* 3 Privacy Pillars */}
            <div className="space-y-3 pt-4 border-t border-rose-100 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FDF0F3] text-[#94204D] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <strong className="text-slate-900">Encrypted in Transit &amp; Rest:</strong> Only authorized panel members with active investigation quorum can view corroborating attachments.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FDF0F3] text-[#94204D] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <strong className="text-slate-900">Restricted Key Escrow:</strong> Your personal contact info is kept in an isolated cryptographic vault—unlocked only if you explicitly choose to escalate.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FDF0F3] text-[#94204D] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <strong className="text-slate-900">Minimal Data Footprint:</strong> Zero advertising tracking, zero phone telemetry, and instant delete capability upon resolution.
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Woman with Secure Evidence Vault Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <EvidenceVaultWomanIllustration className="w-full max-w-[400px]" />
          </div>

        </div>
      </div>
    </section>
  );
};
