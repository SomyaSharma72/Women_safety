import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Sparkles, Lock, Heart, CheckCircle2 } from 'lucide-react';
import { FinalCtaWomanIllustration } from '../illustrations/EmpathyIllustrations';

interface FinalCtaSectionProps {
  onStartReport: () => void;
  onViewRadar: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onStartReport,
  onViewRadar,
}) => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-teal-50/40 to-rose-50/40 border-t border-slate-200/80 relative overflow-hidden">
      
      {/* Decorative backdrop shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-teal-100/50 via-rose-100/40 to-indigo-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[44px] p-8 sm:p-14 lg:p-16 border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden">
          
          {/* Subtle floral/safety corner accents */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-teal-50 rounded-bl-[100px] pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-50 rounded-tr-[100px] pointer-events-none -z-0" />

          {/* Left: Message & Big CTA */}
          <div className="lg:col-span-7 space-y-6 relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-teal-50 text-teal-800 text-xs font-bold rounded-full uppercase tracking-wider border border-teal-200">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Take the First Step in Complete Safety</span>
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] font-display-styled leading-[1.15]">
              Your story deserves a safe place.
            </h2>

            <p className="text-slate-600 text-base sm:text-xl font-normal leading-relaxed">
              You decide what to share. <br className="hidden sm:inline" />
              You decide when to escalate.
            </p>

            {/* Reassurance pills */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-700">
              <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Zero login or phone tracking</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Encrypted private passkey</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Retaliation Shield protection</span>
              </span>
            </div>

            {/* Big Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onStartReport}
                className="inline-flex items-center justify-center gap-2.5 bg-[#94204D] hover:bg-[#7D1B41] text-white rounded-full font-bold text-base px-9 py-4 shadow-xl shadow-[#94204D]/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Report an incident</span>
                <span className="text-base font-light">&rarr;</span>
              </button>

              <button
                onClick={onViewRadar}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-full font-bold text-base px-6 py-4 transition cursor-pointer"
              >
                <Shield className="w-4 h-4 text-teal-600" />
                <span>Explore pattern radar</span>
              </button>
            </div>
          </div>

          {/* Right: Confident Woman Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center relative z-10">
            <FinalCtaWomanIllustration className="w-full max-w-[380px]" />
          </div>

        </div>
      </div>
    </section>
  );
};
