import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Heart, Clock, BellRing, Check, ArrowRight } from 'lucide-react';
import { RetaliationCheckInWomanIllustration } from '../illustrations/EmpathyIllustrations';

export const RetaliationCheckInSection: React.FC<{ onNavigateToTracker?: () => void }> = ({
  onNavigateToTracker,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#FFF8F9] rounded-[40px] p-8 sm:p-14 border border-[#FADCE2] shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Illustrated Woman & Mobile Check-in View */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <RetaliationCheckInWomanIllustration className="w-full max-w-[400px]" />
          </div>

          {/* Right Column: Narrative & Interactive Mockup */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FDF0F3] text-[#94204D] text-xs font-bold rounded-full uppercase tracking-wider border border-[#FADCE2]">
              <Heart className="w-3.5 h-3.5 text-[#94204D] fill-[#94204D]" />
              <span>Post-Report Care &amp; Evidence Security</span>
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E121E] font-display-styled">
              Reporting shouldn't end after you press submit.
            </h2>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              Retaliation in subtle forms—like sudden bad grades, excluded meetings, or hostile remarks—often begins days or weeks after a report is filed. SafeReport sends scheduled, private check-in audits to ensure you remain protected throughout the entire semester or work quarter.
            </p>

            {/* Interactive Experience Box */}
            <div className="p-6 rounded-3xl bg-white border border-rose-100/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                  Weekly Private Safety Prompt
                </span>
                <span className="text-[11px] bg-[#FDF0F3] text-[#94204D] px-2.5 py-0.5 rounded-full font-bold">
                  Zero Login Needed
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-900">
                "Has anything changed in your lab, classroom, or workspace environment since your report?"
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={() => setSelectedStatus('okay')}
                  className={`p-3 rounded-2xl text-xs font-bold text-left transition border cursor-pointer ${
                    selectedStatus === 'okay'
                      ? 'bg-[#94204D] text-white border-[#94204D] shadow-md'
                      : 'bg-[#FDF0F3] text-[#94204D] border-[#FADCE2] hover:bg-[#FCECEF]'
                  }`}
                >
                  ✓ Everything is okay
                </button>

                <button
                  onClick={() => setSelectedStatus('support')}
                  className={`p-3 rounded-2xl text-xs font-bold text-left transition border cursor-pointer ${
                    selectedStatus === 'support'
                      ? 'bg-[#94204D] text-white border-[#94204D] shadow-md'
                      : 'bg-rose-50/70 text-rose-900 border-rose-200/60 hover:bg-rose-100/70'
                  }`}
                >
                  ⚠ I need support
                </button>

                <button
                  onClick={() => setSelectedStatus('new_incident')}
                  className={`p-3 rounded-2xl text-xs font-bold text-left transition border cursor-pointer ${
                    selectedStatus === 'new_incident'
                      ? 'bg-[#1E121E] text-white border-[#1E121E] shadow-md'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  + New incident
                </button>
              </div>

              {selectedStatus && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-3.5 rounded-xl bg-[#FFF9FA] border border-[#FADCE2] text-xs text-slate-700 flex items-center justify-between"
                >
                  <span>Your safety response is securely logged with your private Passkey.</span>
                  {onNavigateToTracker && (
                    <button
                      onClick={onNavigateToTracker}
                      className="text-[#94204D] font-bold hover:underline flex items-center gap-1 shrink-0 ml-2 cursor-pointer"
                    >
                      <span>View in Tracker</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </motion.div>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#94204D]" />
                <span>Opt-out anytime</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#94204D]" />
                <span>Encrypted responses</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#94204D]" />
                <span>Direct ombudsman escalation</span>
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
