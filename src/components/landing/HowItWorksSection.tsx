import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, ShieldCheck, Lock, FolderLock } from 'lucide-react';
import {
  PrivacyChoiceWomanIllustration,
  DocumentingWomanIllustration,
  CaseTrackingWomanIllustration,
} from '../illustrations/EmpathyIllustrations';
import { ReportingMode } from '../../types';

interface HowItWorksSectionProps {
  onStartReportWithMode: (mode: ReportingMode) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onStartReportWithMode,
}) => {
  return (
    <section id="how-it-works-section" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-[#94204D] font-mono">
          Simple 3-Step Process
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E121E] font-display-styled tracking-tight">
          How SafeReport Works
        </h2>
      </div>

      {/* 3 Step Columns in 1 Balanced Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 pt-4">
        
        {/* Step 01: Choose Your Privacy */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold font-mono text-[#94204D]">01</span>
              <span className="text-[11px] font-semibold text-slate-500 font-mono">STEP 1</span>
            </div>

            <h3 className="text-2xl font-bold text-[#1E121E] font-display-styled">
              Choose Your Privacy
            </h3>

            {/* Privacy Selectors */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => onStartReportWithMode('ANONYMOUS')}
                className="w-full p-3 rounded-xl bg-[#FFF8F9] border border-rose-200/80 text-left hover:bg-rose-100/50 transition flex items-center justify-between text-xs cursor-pointer group"
              >
                <div>
                  <span className="font-bold text-[#94204D] block text-sm">Anonymous</span>
                  <span className="text-[11px] text-slate-600">Zero personal data attached</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#94204D] opacity-40 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => onStartReportWithMode('CONFIDENTIAL')}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-left hover:bg-slate-100 transition flex items-center justify-between text-xs cursor-pointer group"
              >
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Confidential</span>
                  <span className="text-[11px] text-slate-600">Key escrow locked</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 opacity-40 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => onStartReportWithMode('IDENTIFIED')}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-left hover:bg-slate-100 transition flex items-center justify-between text-xs cursor-pointer group"
              >
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Identified</span>
                  <span className="text-[11px] text-slate-600">Direct institutional inquiry</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 opacity-40 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          <div className="bg-[#FFF8F9] rounded-2xl p-4 sm:p-6 border border-rose-100 flex items-center justify-center">
            <PrivacyChoiceWomanIllustration className="w-full max-w-[220px]" />
          </div>
        </div>

        {/* Step 02: Document What Happened */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold font-mono text-[#94204D]">02</span>
              <span className="text-[11px] font-semibold text-slate-500 font-mono">STEP 2</span>
            </div>

            <h3 className="text-2xl font-bold text-[#1E121E] font-display-styled">
              Document What Happened
            </h3>

            {/* Essential Documenting Points */}
            <div className="space-y-2.5 pt-2 text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#94204D] shrink-0 mt-0.5" />
                <span><strong>Timeline &amp; Location:</strong> Precise chronology and location logs</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#94204D] shrink-0 mt-0.5" />
                <span><strong>Encrypted Vault:</strong> EXIF metadata scrubbed automatically</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#94204D] shrink-0 mt-0.5" />
                <span><strong>Objective Facts:</strong> Guided non-leading incident questions</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FFF8F9] rounded-2xl p-4 sm:p-6 border border-rose-100 flex items-center justify-center">
            <DocumentingWomanIllustration className="w-full max-w-[220px]" />
          </div>
        </div>

        {/* Step 03: Stay In Control */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold font-mono text-[#94204D]">03</span>
              <span className="text-[11px] font-semibold text-slate-500 font-mono">STEP 3</span>
            </div>

            <h3 className="text-2xl font-bold text-[#1E121E] font-display-styled">
              Stay in Control
            </h3>

            {/* Essential Tracking Points */}
            <div className="space-y-2.5 pt-2 text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#94204D] shrink-0 mt-0.5" />
                <span><strong>Zero-Login Passkey:</strong> Check status anytime without signing up</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#94204D] shrink-0 mt-0.5" />
                <span><strong>Retaliation Shield:</strong> Scheduled check-ins to monitor your safety</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#94204D] shrink-0 mt-0.5" />
                <span><strong>Escalation Autonomy:</strong> Choose if and when to proceed to inquiry</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FFF8F9] rounded-2xl p-4 sm:p-6 border border-rose-100 flex items-center justify-center">
            <CaseTrackingWomanIllustration className="w-full max-w-[220px]" />
          </div>
        </div>

      </div>
    </section>
  );
};
