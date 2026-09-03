import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, CheckCircle2, AlertTriangle, PlusCircle, ArrowRight } from 'lucide-react';
import { RetaliationCheckInWomanIllustration } from '../illustrations/EmpathyIllustrations';

export const RetaliationCheckInSection: React.FC<{ onNavigateToTracker?: () => void }> = ({
  onNavigateToTracker,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  return (
    <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#FFF8F9] rounded-[40px] p-6 sm:p-12 border border-[#FADCE2] shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Illustrated Woman */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <RetaliationCheckInWomanIllustration className="w-full max-w-[360px]" />
          </div>

          {/* Right Column: Prominent Action Buttons */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#94204D] font-mono flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-[#94204D] fill-[#94204D]" />
                <span>Post-Report Care</span>
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E121E] font-display-styled tracking-tight">
                Reporting shouldn't end after you press submit.
              </h2>

              <p className="text-slate-600 text-base leading-relaxed">
                SafeReport checks in on you at scheduled intervals to ensure you are safe, supported, and free from retaliation.
              </p>
            </div>

            {/* 3 Prominent, Large Action Buttons */}
            <div className="space-y-4 pt-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono block">
                Select Your Safety Status Anytime:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Button 1: Everything is okay */}
                <button
                  onClick={() => setSelectedStatus('okay')}
                  className={`p-5 rounded-2xl text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between space-y-4 ${
                    selectedStatus === 'okay'
                      ? 'bg-[#94204D] text-white border-[#94204D] shadow-sm scale-[1.01]'
                      : 'bg-white text-slate-900 border-rose-100 hover:border-[#94204D]/40 hover:bg-[#FFF9FA]'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    selectedStatus === 'okay' ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-base block font-display-styled">Everything is okay</span>
                    <span className={`text-xs block mt-0.5 ${
                      selectedStatus === 'okay' ? 'text-rose-100' : 'text-slate-500'
                    }`}>
                      No retaliation noticed
                    </span>
                  </div>
                </button>

                {/* Button 2: I need support */}
                <button
                  onClick={() => setSelectedStatus('support')}
                  className={`p-5 rounded-2xl text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between space-y-4 ${
                    selectedStatus === 'support'
                      ? 'bg-[#94204D] text-white border-[#94204D] shadow-sm scale-[1.01]'
                      : 'bg-white text-slate-900 border-rose-100 hover:border-[#94204D]/40 hover:bg-[#FFF9FA]'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    selectedStatus === 'support' ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-600'
                  }`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-base block font-display-styled">I need support</span>
                    <span className={`text-xs block mt-0.5 ${
                      selectedStatus === 'support' ? 'text-rose-100' : 'text-slate-500'
                    }`}>
                      Connect to counselor
                    </span>
                  </div>
                </button>

                {/* Button 3: New incident */}
                <button
                  onClick={() => setSelectedStatus('new_incident')}
                  className={`p-5 rounded-2xl text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between space-y-4 ${
                    selectedStatus === 'new_incident'
                      ? 'bg-[#1E121E] text-white border-[#1E121E] shadow-sm scale-[1.01]'
                      : 'bg-white text-slate-900 border-rose-100 hover:border-slate-400 hover:bg-[#FFF9FA]'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    selectedStatus === 'new_incident' ? 'bg-white/20 text-white' : 'bg-rose-50 text-[#94204D]'
                  }`}>
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-base block font-display-styled">New incident</span>
                    <span className={`text-xs block mt-0.5 ${
                      selectedStatus === 'new_incident' ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      Add follow-up entry
                    </span>
                  </div>
                </button>
              </div>

              {/* Feedback Alert */}
              {selectedStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-white border border-rose-200/80 text-sm text-slate-700 flex items-center justify-between shadow-2xs"
                >
                  <span className="font-medium">
                    {selectedStatus === 'okay' && '✓ Status logged: Safe & quiet. Check-in cadence maintained.'}
                    {selectedStatus === 'support' && '⚠ Confidential support channel alerted. Direct advocate options available in tracker.'}
                    {selectedStatus === 'new_incident' && '📝 Ready to append new incident evidence to your protected case.'}
                  </span>
                  {onNavigateToTracker && (
                    <button
                      onClick={onNavigateToTracker}
                      className="text-[#94204D] font-bold hover:underline flex items-center gap-1 shrink-0 ml-3 cursor-pointer text-xs"
                    >
                      <span>Case Tracker</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </motion.div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
