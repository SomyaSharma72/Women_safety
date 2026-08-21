import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
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
    <section id="how-it-works-section" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-3.5 py-1 bg-[#FDF0F3] text-[#94204D] text-xs font-bold rounded-full uppercase tracking-wider border border-[#FADCE2]">
          Clear, Supportive Process
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E121E] font-display-styled">
          How SafeReport Works
        </h2>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          From first documentation to institutional resolution, you remain in complete control of your identity, evidence, and timing.
        </p>
      </div>

      {/* 3 Steps with Large Numbers & Rich Character Illustrations */}
      <div className="space-y-12">
        
        {/* Step 01: Choose Your Privacy */}
        <div className="bg-white rounded-[36px] p-8 sm:p-12 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-black font-mono text-teal-600">01</span>
              <span className="text-xs font-bold uppercase tracking-widest bg-teal-50 text-teal-800 px-3 py-1 rounded-full border border-teal-200">
                Step One
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display-styled">
              CHOOSE YOUR PRIVACY
            </h3>

            <p className="text-slate-600 text-base leading-relaxed">
              Reporting isn't all-or-nothing. Select the exact level of protection that fits your comfort level:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200/70">
                <span className="font-bold text-rose-900 text-sm block">Anonymous</span>
                <span className="text-xs text-rose-700">100% hidden identity. Zero reviewer exposure.</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200/70">
                <span className="font-bold text-indigo-900 text-sm block">Confidential</span>
                <span className="text-xs text-indigo-700">Key escrow lock. Revealed only in formal hearings.</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-200/70">
                <span className="font-bold text-teal-900 text-sm block">Identified</span>
                <span className="text-xs text-teal-700">Direct formal inquiry with rapid resolution.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onStartReportWithMode('ANONYMOUS')}
                className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 font-bold text-sm underline cursor-pointer"
              >
                <span>Start with Anonymous Mode</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <PrivacyChoiceWomanIllustration className="w-full" />
          </div>
        </div>

        {/* Step 02: Document What Happened */}
        <div className="bg-white rounded-[36px] p-8 sm:p-12 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <DocumentingWomanIllustration className="w-full" />
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-black font-mono text-rose-500">02</span>
              <span className="text-xs font-bold uppercase tracking-widest bg-rose-50 text-rose-800 px-3 py-1 rounded-full border border-rose-200">
                Step Two
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display-styled">
              DOCUMENT WHAT HAPPENED
            </h3>

            <p className="text-slate-600 text-base leading-relaxed">
              Record incident timelines, specific locations, and supporting evidence without the burden of legal jargon.
            </p>

            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong>Incident Timeline:</strong> Date, time, recurring patterns, and location tag.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong>Evidence Vault:</strong> Upload screenshots, recordings, or docs with EXIF auto-scrubbed.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong>AI Incident Structuring:</strong> Organizes notes into clear factual points.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 03: Stay In Control */}
        <div className="bg-white rounded-[36px] p-8 sm:p-12 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-black font-mono text-indigo-600">03</span>
              <span className="text-xs font-bold uppercase tracking-widest bg-indigo-50 text-indigo-800 px-3 py-1 rounded-full border border-indigo-200">
                Step Three
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display-styled">
              STAY IN CONTROL
            </h3>

            <p className="text-slate-600 text-base leading-relaxed">
              Track progress through a private zero-login Passkey, receive weekly Retaliation Shield check-ins, and choose when to escalate.
            </p>

            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong>Private Passkey Access:</strong> Check status without linking a public user account.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong>Retaliation Shield:</strong> Automatic safe check-ins to monitor workplace/campus safety.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong>Corroborated Escalation:</strong> Choose to join a collective inquiry if patterns emerge.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <CaseTrackingWomanIllustration className="w-full" />
          </div>
        </div>

      </div>
    </section>
  );
};
