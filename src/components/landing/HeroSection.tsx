import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Play,
  Layers,
} from 'lucide-react';
import { HeroWomanIllustration } from '../illustrations/EmpathyIllustrations';

interface HeroSectionProps {
  onStartReport: () => void;
  onOpenDemo: () => void;
  onHowItWorks?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartReport,
  onOpenDemo,
  onHowItWorks,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 md:pt-12 md:pb-16 bg-[#FFF8F9]">
      {/* Background Soft Pastel Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-rose-100/50 via-pink-50/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Headline & Empathetic Call-to-Action */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            
            {/* Context Line */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-xs font-semibold text-[#94204D]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#94204D]" />
              <span>Confidential harassment reporting &amp; pattern detection</span>
            </motion.div>

            {/* Main Headline & Subheading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#1E121E] font-display-styled leading-[1.12]"
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
                A privacy-first reporting platform for harassment in colleges and workplaces. Document incidents on your terms, prevent retaliation, and uncover recurring patterns without risking your identity.
              </motion.p>
            </div>

            {/* 3 Core Assurances (Clean, breathable inline layout without card clutter) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-1 text-xs sm:text-sm text-slate-700 font-medium"
            >
              <div className="flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-[#94204D]" />
                <span>Identity Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#94204D]" />
                <span>Evidence Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#94204D]" />
                <span>Pattern Mapping</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                onClick={onStartReport}
                className="inline-flex items-center justify-center gap-2 bg-[#94204D] hover:bg-[#7D1B41] text-white rounded-full font-semibold text-sm sm:text-base px-7 py-3.5 shadow-sm shadow-[#94204D]/25 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer"
              >
                <span>Report an incident</span>
                <span className="text-base font-light">&rarr;</span>
              </button>

              <button
                onClick={onOpenDemo}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-[#FDF0F3] text-slate-700 hover:text-[#94204D] border border-rose-200/80 font-semibold text-sm shadow-2xs transition cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-[#94204D] text-[#94204D]" />
                <span>90s walkthrough</span>
              </button>
            </motion.div>

            {/* Micro Safe Note */}
            <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1 font-normal">
              <Lock className="w-3.5 h-3.5 text-[#94204D]" />
              <span>Zero-login passkey &bull; Client-side encrypted vault &bull; Press ESC anytime for Quick Exit</span>
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
