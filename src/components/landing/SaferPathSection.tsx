import React from 'react';
import { motion } from 'motion/react';
import { Edit3, FolderLock, TrendingUp, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface SaferPathSectionProps {
  onStartReport: () => void;
  onTrackCase: () => void;
  onViewInstitutions: () => void;
  onOpenDemo: () => void;
  onHowItWorks: () => void;
}

export const SaferPathSection: React.FC<SaferPathSectionProps> = ({
  onStartReport,
  onTrackCase,
  onViewInstitutions,
  onOpenDemo,
  onHowItWorks,
}) => {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* --- SECTION 2: A SAFER PATH FROM EXPERIENCE TO ACTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Eyebrow, Heading & Copy */}
          <div className="lg:col-span-4 space-y-3.5">
            <span className="text-xs font-bold tracking-widest text-[#94204D] uppercase font-mono">
              YOUR VOICE, YOUR CONTROL
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1E121E] font-display-styled leading-tight">
              A safer path from experience to action.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              No account is required to begin. You decide what to share, who can see it, and when to take the next step.
            </p>
          </div>

          {/* Right Column: 3 Distinct Colored Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Card 1: Share Safely (Blush Pink) */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={onStartReport}
              className="bg-[#FDF0F3] rounded-[28px] p-6 sm:p-7 border border-[#FADCE2] shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#94204D] text-white flex items-center justify-center shadow-sm shadow-[#94204D]/20 mb-5">
                  <Edit3 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1E121E]">
                  Share safely
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Capture what happened in a private, guided report.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#FADCE2]/60 flex items-center text-xs font-bold text-[#94204D]">
                <span>Start draft</span>
                <span className="ml-1">&rarr;</span>
              </div>
            </motion.div>

            {/* Card 2: Track Your Case (Mint Green) */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={onTrackCase}
              className="bg-[#EFFBF5] rounded-[28px] p-6 sm:p-7 border border-[#D2F4E3] shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0D9488] text-white flex items-center justify-center shadow-sm shadow-[#0D9488]/20 mb-5">
                  <FolderLock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1E121E]">
                  Track your case
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Use a private passkey to check updates without revealing your identity.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D2F4E3]/60 flex items-center text-xs font-bold text-[#0D9488]">
                <span>Enter passkey</span>
                <span className="ml-1">&rarr;</span>
              </div>
            </motion.div>

            {/* Card 3: Change Patterns (Blush Pink with White Icon) */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={onViewInstitutions}
              className="bg-[#FDF0F3] rounded-[28px] p-6 sm:p-7 border border-[#FADCE2] shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white text-[#94204D] border border-rose-200/80 flex items-center justify-center shadow-xs mb-5">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1E121E]">
                  Change patterns
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Institutions see anonymized trends, never personal identities.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#FADCE2]/60 flex items-center text-xs font-bold text-[#94204D]">
                <span>View institutions</span>
                <span className="ml-1">&rarr;</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* --- SECTION 3: NOT READY TO REPORT? (Dark Plum Banner Card) --- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-[#231522] rounded-[32px] sm:rounded-[36px] p-8 sm:p-10 lg:p-12 overflow-hidden shadow-xl"
        >
          {/* Subtle warm glow inside banner */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left Content */}
            <div className="space-y-2.5 max-w-2xl">
              <span className="text-[11px] font-bold tracking-widest text-[#FDA4AF] uppercase font-mono">
                NOT READY TO REPORT?
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display-styled">
                Start with clarity, on your timeline.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Learn how reporting works, understand your privacy choices, or take a short walkthrough before you decide.
              </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <button
                onClick={onHowItWorks}
                className="bg-white hover:bg-slate-100 text-[#1E121E] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md transition cursor-pointer"
              >
                How reporting works
              </button>

              <button
                onClick={onOpenDemo}
                className="bg-[#94204D] hover:bg-[#7D1B41] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md shadow-[#94204D]/30 transition flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-rose-300" />
                <span>Take the 90s walkthrough</span>
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
