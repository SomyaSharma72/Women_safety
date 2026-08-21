import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Sparkles,
  Activity,
  EyeOff,
  Play,
  Zap,
} from 'lucide-react';
import { HeroWomanIllustration } from '../illustrations/EmpathyIllustrations';

interface HeroSectionProps {
  onStartReport: () => void;
  onViewRadar: () => void;
  onOpenDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartReport,
  onViewRadar,
  onOpenDemo,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:pt-12 md:pb-18 bg-[#FFF8F9]">
      {/* Background Soft Pastel Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-rose-100/50 via-pink-50/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Headline & Empathetic Call-to-Action */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FDF0F3] text-[#94204D] text-[11px] sm:text-xs font-bold rounded-full uppercase tracking-wider border border-[#FADCE2] shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#94204D] animate-pulse" />
              <span>Women's Safety &amp; Empowerment Platform</span>
            </motion.div>

            {/* Main Headline & Subheading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#1E121E] font-display-styled leading-[1.12]"
              >
                You deserve to <br className="hidden sm:inline" />
                <span className="text-[#94204D]">
                  report it safely.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl"
              >
                A privacy-first reporting platform for harassment in colleges and workplaces. Document incidents on your own terms, prevent retaliation, and uncover recurring patterns without risking your safety.
              </motion.p>
            </div>

            {/* 3 Core Assurances in cards matching design system */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1"
            >
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-rose-100/90 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-[#FDF0F3] text-[#94204D] flex items-center justify-center shrink-0">
                  <EyeOff className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Identity Protected</span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-rose-100/90 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-[#FDF0F3] text-[#94204D] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Evidence Secured</span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-rose-100/90 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-[#FDF0F3] text-[#94204D] flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Pattern Detection</span>
              </div>
            </motion.div>

            {/* Action Buttons matching design language */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                onClick={onStartReport}
                className="inline-flex items-center justify-center gap-2 bg-[#94204D] hover:bg-[#7D1B41] text-white rounded-full font-bold text-sm sm:text-base px-7 py-3.5 shadow-md shadow-[#94204D]/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Report an incident</span>
                <span className="text-base font-light">&rarr;</span>
              </button>

              <button
                onClick={onViewRadar}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FDF0F3] text-slate-800 border border-rose-200/90 rounded-full font-semibold text-sm px-5 py-3.5 shadow-2xs hover:border-[#94204D]/40 transition cursor-pointer"
              >
                <Activity className="w-4 h-4 text-[#94204D]" />
                <span>Explore pattern radar</span>
              </button>

              <button
                onClick={onOpenDemo}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-full bg-[#FDF0F3] hover:bg-[#FCECEF] text-[#94204D] text-xs font-bold transition border border-[#FADCE2] cursor-pointer"
                title="90-Second Walkthrough"
              >
                <Play className="w-3.5 h-3.5 fill-[#94204D] text-[#94204D]" />
                <span>90s demo</span>
              </button>
            </motion.div>

            {/* Micro Safe Note */}
            <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
              <Lock className="w-3.5 h-3.5 text-[#94204D]" />
              <span>Passkey secured &bull; Privacy-first encrypted vault &bull; Press ESC anytime for Quick Exit</span>
            </p>
          </div>

          {/* Right Column: Hero Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <HeroWomanIllustration className="w-full" />
          </div>

        </div>
      </div>
    </section>
  );
};
