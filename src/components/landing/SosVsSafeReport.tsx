import React from 'react';
import { Shield, ShieldAlert, FileText, ArrowRight, Check, X, BellRing, Database, Lock, UserX, UserCheck, ShieldCheck, Zap } from 'lucide-react';
import { ReportingMode } from '../../types';

interface SosVsSilentShieldProps {
  onStartReport: () => void;
}

export const SosVsSilentShield: React.FC<SosVsSilentShieldProps> = ({ onStartReport }) => {
  return (
    <section className="py-16 bg-[#FFF8F9] border-y border-rose-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-block px-3.5 py-1 bg-[#FDF0F3] text-[#94204D] text-xs font-bold rounded-full uppercase tracking-widest border border-[#FADCE2]">
            System Architecture Comparison
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E121E] font-display-styled">
            Why SOS buttons aren't enough for recurring harassment
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Immediate panic systems only address active physical emergencies. Silent Shield bridges the crucial gap for documenting, investigating, and stopping recurring misconduct.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Traditional SOS Systems */}
          <div className="rounded-[32px] p-8 bg-white border border-rose-100/90 shadow-2xs flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  SOS Panic Systems
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display-styled">
                  "I'm in danger right now. Send help."
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Built for immediate seconds-critical dispatch, sirens, or live GPS broadcasts.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 text-sm text-slate-600">
                <div className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>No structured evidence vault for chats or files</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Does not track recurring intimidation over weeks or months</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Forces public immediate alert, which increases fear of retaliation</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Cannot correlate multiple victims experiencing the same perpetrator</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-500">
              Primary role: <strong>Tactical emergency response</strong>
            </div>
          </div>

          {/* Silent Shield Paradigm */}
          <div className="rounded-[32px] p-8 bg-[#1E121E] text-white shadow-xl flex flex-col justify-between relative overflow-hidden border border-[#3D2034]">
            {/* Subtle berry glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#94204D]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#94204D] text-white flex items-center justify-center shadow-lg shadow-[#94204D]/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-white/10 text-rose-200 border border-white/10">
                  Silent Shield Ecosystem
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-display-styled">
                  "Something happened. I need to document &amp; report it safely."
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  Built for persistent documentation, secure anonymity, and institutional accountability.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800 text-sm text-slate-200">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                  <span><strong>Reporting &rarr; Evidence &rarr; Pattern &rarr; Review &rarr; Escalation</strong></span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                  <span>Identity separated from evidence &amp; reviewers (Anonymous mode)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                  <span>Pattern Radar correlates multi-victim reports in same lab or dept</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                  <span>Evidence vault provides scheduled private check-ins after reporting</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between relative z-10">
              <span className="text-xs text-slate-400">
                Primary role: <strong className="text-rose-200">Safety, Pattern Discovery &amp; Due Process</strong>
              </span>
              <button
                onClick={onStartReport}
                className="inline-flex items-center gap-1.5 bg-[#94204D] hover:bg-[#7D1B41] text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition cursor-pointer"
              >
                <span>Report Safely</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ModesComparisonSection: React.FC<{ onSelectMode: (mode: ReportingMode) => void }> = ({
  onSelectMode,
}) => {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="inline-block px-3.5 py-1 bg-[#FDF0F3] text-[#94204D] text-xs font-bold rounded-full uppercase tracking-widest border border-[#FADCE2]">
          Victim Autonomy
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1E121E] font-display-styled">
          You choose how much identity you reveal
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Reporting shouldn't be all-or-nothing. Choose the exact level of protection that feels safe for your situation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mode 1: Anonymous */}
        <div className="bg-white rounded-[32px] p-7 border-2 border-rose-200 shadow-sm hover:border-rose-300 transition-all flex flex-col justify-between relative">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF0F3] text-[#94204D] flex items-center justify-center font-bold">
                <UserX className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-[#FDF0F3] text-[#94204D] border border-[#FADCE2]">
                Most Popular
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display-styled">Anonymous Mode</h3>
              <p className="text-xs text-[#94204D] font-semibold mt-0.5">
                Identity protected from reviewers
              </p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Your name, email, and device IDs are strictly shielded. Institutional affiliation validates you are real, but reviewers only see the case facts, location, and encrypted evidence.
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#94204D]" />
                <span>Reviewer sees zero personal data</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#94204D]" />
                <span>Participates in Pattern Detection Radar</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#94204D]" />
                <span>Track status via private Passkey</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectMode('ANONYMOUS')}
            className="mt-6 w-full py-3 rounded-2xl bg-[#94204D] hover:bg-[#7D1B41] text-white text-xs font-bold shadow-md shadow-[#94204D]/20 transition cursor-pointer"
          >
            Start Anonymous Report
          </button>
        </div>

        {/* Mode 2: Confidential */}
        <div className="bg-white rounded-[32px] p-7 border border-rose-100/90 shadow-sm hover:border-[#94204D]/40 transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#94204D] flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-rose-50 text-[#94204D] border border-rose-200">
                Protected Escrow
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display-styled">Confidential Mode</h3>
              <p className="text-xs text-[#94204D] font-semibold mt-0.5">
                Protected; unlocked only in formal inquiry
              </p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Your identity is encrypted in a secure key escrow vault. Normal reviewers cannot see it unless a formal statutory legal or disciplinary inquiry is officially approved.
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#94204D]" />
                <span>Encrypted contact details in vault</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#94204D]" />
                <span>Two-party cryptographic key escrow</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#94204D]" />
                <span>Direct escalation support</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectMode('CONFIDENTIAL')}
            className="mt-6 w-full py-3 rounded-2xl bg-[#1E121E] hover:bg-slate-900 text-white text-xs font-bold shadow-sm transition cursor-pointer"
          >
            Start Confidential Report
          </button>
        </div>

        {/* Mode 3: Identified */}
        <div className="bg-white rounded-[32px] p-7 border border-rose-100/90 shadow-sm hover:border-[#94204D]/40 transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-700 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-pink-50 text-pink-800 border border-pink-200">
                Direct Formal
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display-styled">Identified Mode</h3>
              <p className="text-xs text-pink-700 font-semibold mt-0.5">
                Standard formal complaint
              </p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Full transparent report with direct authorized reviewer contact. Recommended when you are prepared for immediate direct committee hearing and formal testimony.
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#94204D]" />
                <span>Fast-track committee scheduling</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#94204D]" />
                <span>Direct investigator messaging</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#94204D]" />
                <span>Complete formal case file</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectMode('IDENTIFIED')}
            className="mt-6 w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition cursor-pointer"
          >
            Start Identified Report
          </button>
        </div>
      </div>
    </section>
  );
};

export const SosVsSafeReport = SosVsSilentShield;
export type SosVsSafeReportProps = SosVsSilentShieldProps;
