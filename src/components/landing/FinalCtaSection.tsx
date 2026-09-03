import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Building2, Sparkles, CheckCircle2 } from 'lucide-react';
import { FinalCtaWomanIllustration } from '../illustrations/EmpathyIllustrations';

interface FinalCtaSectionProps {
  onStartReport: () => void;
  onViewInstitutions: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onStartReport,
  onViewInstitutions,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FFF8F9] border-t border-rose-100/80 relative overflow-hidden">
      
      {/* Decorative backdrop shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-rose-100/50 via-pink-50/40 to-rose-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[40px] p-8 sm:p-12 lg:p-14 border border-[#FADCE2] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden">
          
          {/* Left: Message & Big CTA */}
          <div className="lg:col-span-7 space-y-6 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#94204D] font-mono">
              Safe &bull; Confidential &bull; Independent
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E121E] font-display-styled leading-[1.15] tracking-tight">
              Your story deserves a safe place.
            </h2>

            <p className="text-slate-600 text-lg font-normal leading-relaxed">
              You decide what to share. You decide when to escalate. Document what happened on your own terms.
            </p>

            {/* Reassurance assurances */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-1 text-sm text-slate-700">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#94204D]" />
                <span>Zero login or phone tracking</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#94204D]" />
                <span>Encrypted private passkey</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#94204D]" />
                <span>Retaliation Shield protection</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onStartReport}
                className="inline-flex items-center justify-center gap-2.5 bg-[#94204D] hover:bg-[#7D1B41] text-white rounded-full font-semibold text-base px-8 py-3.5 shadow-sm shadow-[#94204D]/25 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer"
              >
                <span>Report an incident</span>
                <span className="text-base font-light">&rarr;</span>
              </button>

              <button
                onClick={onViewInstitutions}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FDF0F3] text-slate-700 hover:text-[#94204D] border border-rose-200/80 rounded-full font-semibold text-base px-6 py-3.5 transition cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-[#94204D]" />
                <span>View institutions</span>
              </button>
            </div>
          </div>

          {/* Right: Confident Woman Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center relative z-10">
            <FinalCtaWomanIllustration className="w-full max-w-[340px]" />
          </div>

        </div>
      </div>
    </section>
  );
};
