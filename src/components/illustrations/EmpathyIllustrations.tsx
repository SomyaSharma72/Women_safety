import React from 'react';
import { motion } from 'motion/react';

interface IllustrationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

/**
 * Common SVG Defs for Burgundy, Berry, Soft Pink, Cream, Gold and Skin Tone Palettes
 */
const IllustrationDefs: React.FC = () => (
  <defs>
    {/* Skin Tones */}
    <linearGradient id="skinTone1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FFE0D3" />
      <stop offset="100%" stopColor="#F9C8B5" />
    </linearGradient>
    <linearGradient id="skinTone2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FBD3C0" />
      <stop offset="100%" stopColor="#E8A78D" />
    </linearGradient>
    <linearGradient id="skinTone3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#B47656" />
      <stop offset="100%" stopColor="#8C5238" />
    </linearGradient>
    <linearGradient id="skinTone4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#E2A77A" />
      <stop offset="100%" stopColor="#C48455" />
    </linearGradient>

    {/* Hair Gradients */}
    <linearGradient id="hairDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#2E1B28" />
      <stop offset="60%" stopColor="#1E121E" />
      <stop offset="100%" stopColor="#120A12" />
    </linearGradient>
    <linearGradient id="hairAuburn" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#9A3412" />
      <stop offset="100%" stopColor="#7C2D12" />
    </linearGradient>
    <linearGradient id="hairBlonde" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FDE68A" />
      <stop offset="100%" stopColor="#D97706" />
    </linearGradient>

    {/* Clothing Gradients - Feminine, Mature Berry / Wine / Plum / Rose */}
    <linearGradient id="berryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#94204D" />
      <stop offset="100%" stopColor="#700F2D" />
    </linearGradient>
    <linearGradient id="wineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#881337" />
      <stop offset="100%" stopColor="#4C0519" />
    </linearGradient>
    <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FDA4AF" />
      <stop offset="100%" stopColor="#F43F5E" />
    </linearGradient>
    <linearGradient id="blushGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FFF1F2" />
      <stop offset="100%" stopColor="#FCECEF" />
    </linearGradient>
    <linearGradient id="charcoalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#334155" />
      <stop offset="100%" stopColor="#1E293B" />
    </linearGradient>
    <linearGradient id="plumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#4A1E3D" />
      <stop offset="100%" stopColor="#2D1125" />
    </linearGradient>

    {/* Filter for soft natural shadows */}
    <filter id="gentleShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#881337" floodOpacity="0.08" />
    </filter>
  </defs>
);

/**
 * 1. HERO WOMEN ILLUSTRATION (Solidarity & Safety)
 * Two confident young adult women in solidarity, one holding a protected phone with a shield.
 * Palette: Rich Burgundy / Berry & Soft Rose.
 */
export const HeroWomanIllustration: React.FC<IllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer Rounded Double Frame Card */}
      <div className="w-full max-w-[480px] aspect-[1/1.08] p-3 sm:p-4 rounded-[42px] bg-[#FDF0F3] border-[3px] border-[#FADCE2] shadow-sm relative">
        
        {/* Inner Canvas */}
        <div className="w-full h-full rounded-[34px] bg-gradient-to-b from-[#FFF9FA] via-[#FFF3F5] to-[#FDECEF] relative overflow-hidden flex items-center justify-center border border-white/80">
          
          {/* Background Aura */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-60 h-60 bg-pink-100/50 rounded-full blur-2xl pointer-events-none" />

          {/* Top Right "Identity Protected" Pill Badge */}
          <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3 py-1 bg-[#94204D] text-white text-xs font-bold rounded-full shadow-xs">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Identity Protected</span>
          </div>

          {/* Floating Empathetic Vector Elements */}
          {/* 1. Speech Bubble with Heart (Top Right) */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 right-14 z-20 w-10 h-9 bg-[#FB7185] rounded-2xl rounded-bl-xs flex items-center justify-center shadow-md shadow-rose-500/20"
          >
            <svg className="w-5 h-5 text-white fill-white" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>

          {/* 2. Floating Padlock (Right side) */}
          <motion.div
            animate={{ y: [0, 4, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-36 right-8 z-20 w-8 h-8 rounded-xl bg-white/90 border border-rose-200 flex items-center justify-center shadow-xs"
          >
            <svg className="w-4 h-4 text-[#94204D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </motion.div>

          {/* 3. Floating Coral Shield with Heart (Left side) */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-44 left-8 z-20 w-10 h-11 bg-[#FDA4AF] rounded-2xl rounded-tr-xs flex items-center justify-center shadow-sm"
          >
            <svg className="w-5 h-5 text-white fill-white" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>

          {/* 4. Floating Berry Shield with Checkmark (Lower Left) */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="absolute bottom-28 left-6 z-20 w-10 h-11 bg-[#94204D] rounded-2xl flex items-center justify-center shadow-sm"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>

          {/* Main Vector SVG Characters: Two Young Adult Women */}
          <svg
            viewBox="0 0 460 480"
            className="w-full h-full object-contain relative z-10 translate-y-4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <IllustrationDefs />

            {/* CHARACTER 1 (Right): Standing supportive friend with wavy hair */}
            <g transform="translate(180, 50)">
              {/* Back Hair */}
              <path
                d="M 60 70 C 40 40 10 90 20 180 C 25 240 10 310 50 360 C 90 400 130 400 160 400 C 190 400 210 360 200 300 C 190 220 170 140 150 90 Z"
                fill="url(#hairAuburn)"
              />
              {/* Neck & Face */}
              <path d="M 95 160 L 95 200 L 125 200 L 125 160 Z" fill="url(#skinTone1)" />
              <ellipse cx="110" cy="130" rx="30" ry="36" fill="url(#skinTone1)" />

              {/* Front hair fringe */}
              <path
                d="M 75 105 C 90 90 130 90 145 105 C 150 115 145 125 135 120 C 120 112 100 112 85 120 C 75 125 70 115 75 105 Z"
                fill="url(#hairAuburn)"
              />

              {/* Reassuring, confident eyes & gentle smile */}
              <ellipse cx="98" cy="126" rx="4" ry="5" fill="#1E121E" />
              <circle cx="100" cy="124" r="1.5" fill="#FFFFFF" />
              <ellipse cx="122" cy="126" rx="4" ry="5" fill="#1E121E" />
              <circle cx="124" cy="124" r="1.5" fill="#FFFFFF" />
              <circle cx="90" cy="136" r="6" fill="#FDA4AF" opacity="0.6" />
              <circle cx="130" cy="136" r="6" fill="#FDA4AF" opacity="0.6" />
              <path d="M 102 145 Q 110 152 118 145" stroke="#94204D" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Soft Rose / Plum Jacket */}
              <path
                d="M 40 195 C 70 185 150 185 180 195 L 200 370 L 20 370 Z"
                fill="url(#plumGrad)"
              />
              {/* Arm reaching over to place a supportive hand on friend's shoulder */}
              <path
                d="M 40 210 C 10 210 -20 220 -50 240 C -45 255 -30 255 -10 245 C 10 235 25 230 40 230 Z"
                fill="url(#plumGrad)"
              />
              {/* Hand resting supportively */}
              <ellipse cx="-50" cy="245" rx="14" ry="10" fill="url(#skinTone1)" transform="rotate(-15 -50 245)" />
            </g>

            {/* CHARACTER 2 (Left): Young adult woman holding secured phone */}
            <g transform="translate(45, 60)">
              {/* Curly Dark Hair */}
              <circle cx="60" cy="125" r="46" fill="url(#hairDark)" />
              <circle cx="180" cy="125" r="46" fill="url(#hairDark)" />
              <circle cx="120" cy="85" r="54" fill="url(#hairDark)" />

              {/* Gold Hoop Earring */}
              <circle cx="68" cy="165" r="9" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
              <circle cx="172" cy="165" r="9" fill="none" stroke="#FBBF24" strokeWidth="2.5" />

              {/* Neck & Face */}
              <path d="M 105 160 L 105 195 L 135 195 L 135 160 Z" fill="url(#skinTone3)" />
              <ellipse cx="120" cy="135" rx="34" ry="40" fill="url(#skinTone3)" />

              {/* Front Curly Hair line */}
              <path
                d="M 86 105 C 100 95 140 95 154 105 C 160 115 155 125 145 120 C 130 112 110 112 95 120 C 85 125 80 115 86 105 Z"
                fill="#1E121E"
              />

              {/* Warm Confident Eyes & Smile */}
              <path d="M 96 118 Q 106 114 114 118" stroke="#1E121E" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 126 118 Q 134 114 144 118" stroke="#1E121E" strokeWidth="3" strokeLinecap="round" fill="none" />
              <ellipse cx="106" cy="128" rx="5.5" ry="6.5" fill="#1E121E" />
              <circle cx="108" cy="126" r="2" fill="#FFFFFF" />
              <ellipse cx="134" cy="128" rx="5.5" ry="6.5" fill="#1E121E" />
              <circle cx="136" cy="126" r="2" fill="#FFFFFF" />
              <circle cx="94" cy="142" r="8" fill="#9F1D4A" opacity="0.4" />
              <circle cx="146" cy="142" r="8" fill="#9F1D4A" opacity="0.4" />
              <path d="M 108 152 Q 120 165 132 152" stroke="#881337" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* Rich Berry / Burgundy Knit Sweater */}
              <path
                d="M 50 195 C 80 185 160 185 190 195 L 210 355 L 30 355 Z"
                fill="url(#berryGrad)"
              />
              <path d="M 100 195 C 110 205 130 205 140 195" stroke="#700F2D" strokeWidth="4" fill="none" />

              {/* Hand Holding Smartphone with Shield */}
              <g transform="translate(90, 240)">
                {/* Smartphone Body */}
                <rect x="5" y="0" width="60" height="100" rx="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" filter="url(#gentleShadow)" />
                <rect x="9" y="8" width="52" height="84" rx="6" fill="#FFF9FA" />
                <rect x="27" y="12" width="16" height="2" rx="1" fill="#94204D" />

                {/* Berry Shield on Smartphone Screen */}
                <path
                  d="M 35 28 L 50 35 C 50 55 35 68 35 72 C 35 68 20 55 20 35 Z"
                  fill="#94204D"
                />
                <path
                  d="M 28 46 L 33 51 L 42 41"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="22" y="77" width="26" height="3" rx="1.5" fill="#FADCE2" />

                {/* Left Hand Fingers wrapped securely around the phone */}
                <path d="M 0 35 C 6 35 8 40 8 45 L 8 75 C 8 80 4 85 0 85 Z" fill="url(#skinTone3)" />
                <path d="M 64 45 C 60 45 58 48 58 53 L 58 75 C 58 80 62 83 66 83 Z" fill="url(#skinTone3)" />
              </g>
            </g>
          </svg>

          {/* Bottom Left "PASSKEY ENCRYPTED" Pill Badge */}
          <div className="absolute bottom-5 left-5 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-xs border border-rose-200/90 rounded-full shadow-xs">
            <div className="w-4 h-4 rounded-full bg-rose-100 flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-[#94204D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 tracking-wider font-mono uppercase">
              PASSKEY ENCRYPTED
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

/**
 * 2. THE PROBLEM ILLUSTRATION 1: Fear of Exposure
 * Woman thoughtfully considering whether to speak up, hesitating over a sealed note.
 */
export const ProblemFearExposureIllustration: React.FC<IllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 260 220" className="w-full h-full max-w-[240px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <IllustrationDefs />
        <rect width="260" height="220" rx="28" fill="#FFF1F2" />
        <circle cx="210" cy="50" r="28" fill="#FFE4E6" />
        
        <g transform="translate(30, 20)">
          <path d="M 60 70 C 40 50 30 90 35 130 C 40 160 55 170 70 170 C 85 170 95 140 90 100 Z" fill="url(#hairDark)" />
          <path d="M 68 85 L 68 105 L 82 105 L 82 85 Z" fill="url(#skinTone2)" />
          <ellipse cx="75" cy="70" rx="20" ry="24" fill="url(#skinTone2)" />
          <path d="M 58 60 C 55 85 65 105 75 110 C 80 112 85 108 83 98 C 78 80 75 68 85 55 Z" fill="url(#hairDark)" />
          <path d="M 69 72 Q 74 76 79 72" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="68" cy="78" r="4" fill="#FDA4AF" opacity="0.6" />
          
          <path d="M 45 105 C 60 98 90 98 105 105 L 115 170 L 35 170 Z" fill="url(#roseGrad)" />
          
          {/* Sealed note with private lock */}
          <g transform="translate(105, 75)" filter="url(#gentleShadow)">
            <rect width="70" height="50" rx="10" fill="#FFFFFF" stroke="#FADCE2" />
            <path d="M 5 8 L 35 30 L 65 8" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
            <circle cx="35" cy="32" r="9" fill="#FCECEF" />
            <circle cx="35" cy="30" r="3" fill="#94204D" />
            <rect x="33" y="30" width="4" height="6" rx="1" fill="#94204D" />
          </g>
        </g>
      </svg>
    </div>
  );
};

/**
 * 3. THE PROBLEM ILLUSTRATION 2: Fear of Retaliation
 * Professional young woman with protective shield preventing power imbalance.
 */
export const ProblemFearRetaliationIllustration: React.FC<IllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 260 220" className="w-full h-full max-w-[240px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <IllustrationDefs />
        <rect width="260" height="220" rx="28" fill="#FDF0F3" />
        <circle cx="45" cy="170" r="32" fill="#FCECEF" />
        
        <g transform="translate(50, 15)">
          <circle cx="80" cy="48" r="22" fill="url(#hairAuburn)" />
          <ellipse cx="80" cy="72" rx="18" ry="22" fill="url(#skinTone4)" />
          <path d="M 64 62 C 60 80 68 95 78 100 C 85 95 85 80 82 68 Z" fill="url(#hairAuburn)" />
          
          <ellipse cx="76" cy="72" rx="2.5" ry="3" fill="#1E121E" />
          <ellipse cx="88" cy="72" rx="2.5" ry="3" fill="#1E121E" />
          <path d="M 78 85 Q 82 88 86 85" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          
          <path d="M 55 98 C 68 92 92 92 105 98 L 115 175 L 45 175 Z" fill="url(#berryGrad)" />

          {/* Protective Shield */}
          <g transform="translate(75, 45)">
            <path
              d="M 30 10 L 55 20 C 55 45 42 65 30 75 C 18 65 5 45 5 20 Z"
              fill="#FFFFFF"
              stroke="#94204D"
              strokeWidth="2.5"
              filter="url(#gentleShadow)"
            />
            <path
              d="M 30 46 C 30 46 20 38 20 30 C 20 24 24 22 27 24 C 29 25 30 27 30 27 C 30 27 31 25 33 24 C 36 22 40 24 40 30 C 40 38 30 46 30 46 Z"
              fill="#FB7185"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

/**
 * 4. THE PROBLEM ILLUSTRATION 3: Unclear Bureaucratic Channels
 * Young woman with glasses navigating reporting options with clear guidance.
 */
export const ProblemLostInSystemIllustration: React.FC<IllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 260 220" className="w-full h-full max-w-[240px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <IllustrationDefs />
        <rect width="260" height="220" rx="28" fill="#FFF5F7" />
        <circle cx="210" cy="160" r="30" fill="#FCECEF" />
        
        <g transform="translate(30, 20)">
          <path d="M 80 50 C 100 40 120 70 125 110 C 120 120 105 110 100 95 Z" fill="url(#hairDark)" />
          <ellipse cx="78" cy="72" rx="18" ry="22" fill="url(#skinTone1)" />
          <path d="M 64 62 C 60 78 70 95 80 98 C 84 92 84 80 82 66 Z" fill="url(#hairDark)" />
          
          <rect x="68" y="66" width="10" height="8" rx="2" fill="none" stroke="#94204D" strokeWidth="1.5" />
          <rect x="80" y="66" width="10" height="8" rx="2" fill="none" stroke="#94204D" strokeWidth="1.5" />
          <path d="M 78 70 L 80 70" stroke="#94204D" strokeWidth="1.5" />
          
          <path d="M 52 98 C 65 92 90 92 104 98 L 115 170 L 42 170 Z" fill="url(#plumGrad)" />

          <g transform="translate(115, 40)" filter="url(#gentleShadow)">
            <circle cx="30" cy="30" r="26" fill="#FFFFFF" stroke="#FADCE2" />
            <path d="M 30 12 L 35 27 L 48 30 L 35 33 L 30 48 L 25 33 L 12 30 L 25 27 Z" fill="#94204D" />
            <circle cx="30" cy="30" r="3" fill="#FFFFFF" />
          </g>
        </g>
      </svg>
    </div>
  );
};

/**
 * 5. HOW IT WORKS 01: Woman Choosing Privacy Mode
 */
export const PrivacyChoiceWomanIllustration: React.FC<IllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 320 280" className="w-full h-full max-w-[300px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <IllustrationDefs />
        <rect width="320" height="280" rx="32" fill="#FDF0F3" stroke="#FADCE2" strokeWidth="1.5" />
        
        <g transform="translate(170, 35)" filter="url(#gentleShadow)">
          <rect width="125" height="38" rx="12" fill="#94204D" />
          <text x="14" y="24" fill="#FFFFFF" fontSize="12" fontWeight="700" fontFamily="sans-serif">
            ✓ Anonymous
          </text>
        </g>
        <g transform="translate(180, 85)" filter="url(#gentleShadow)">
          <rect width="115" height="34" rx="10" fill="#FFFFFF" stroke="#FADCE2" />
          <text x="14" y="22" fill="#64748B" fontSize="11" fontWeight="600" fontFamily="sans-serif">
            Confidential
          </text>
        </g>
        <g transform="translate(180, 130)" filter="url(#gentleShadow)">
          <rect width="115" height="34" rx="10" fill="#FFFFFF" stroke="#FADCE2" />
          <text x="14" y="22" fill="#64748B" fontSize="11" fontWeight="600" fontFamily="sans-serif">
            Identified
          </text>
        </g>

        <g transform="translate(30, 30)">
          <path d="M 70 60 C 50 30 20 50 15 90 C 20 110 40 110 50 85 Z" fill="url(#hairDark)" />
          <ellipse cx="80" cy="85" rx="24" ry="28" fill="url(#skinTone1)" />
          <path d="M 64 70 C 60 90 70 110 82 115 C 88 105 86 90 82 72 Z" fill="url(#hairDark)" />
          
          <ellipse cx="78" cy="85" rx="3" ry="3.5" fill="#1E121E" />
          <circle cx="86" cy="94" r="5" fill="#FDA4AF" opacity="0.6" />
          <path d="M 78 98 Q 84 103 90 98" stroke="#94204D" strokeWidth="2" strokeLinecap="round" fill="none" />

          <path d="M 50 120 C 65 110 95 110 110 120 L 120 220 L 40 220 Z" fill="url(#berryGrad)" />
        </g>
      </svg>
    </div>
  );
};

/**
 * 6. HOW IT WORKS 02: Woman Documenting Facts on Laptop
 */
export const DocumentingWomanIllustration: React.FC<IllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 320 280" className="w-full h-full max-w-[300px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <IllustrationDefs />
        <rect width="320" height="280" rx="32" fill="#FFF1F2" stroke="#FFE4E6" strokeWidth="1.5" />

        <g transform="translate(35, 30)">
          <path d="M 60 60 C 40 40 30 80 35 130 C 40 160 65 170 85 170 C 105 170 115 140 110 90 Z" fill="url(#hairAuburn)" />
          <ellipse cx="82" cy="78" rx="22" ry="26" fill="url(#skinTone2)" />
          <path d="M 66 65 C 60 85 70 108 82 112 C 88 105 88 90 84 72 Z" fill="url(#hairAuburn)" />

          <ellipse cx="78" cy="78" rx="3" ry="3.5" fill="#1E121E" />
          <circle cx="74" cy="86" r="4" fill="#FDA4AF" opacity="0.6" />
          <path d="M 76 90 Q 82 93 88 90" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          <path d="M 52 110 C 68 102 96 102 112 110 L 125 210 L 40 210 Z" fill="url(#roseGrad)" />

          <g transform="translate(90, 120)" filter="url(#gentleShadow)">
            <path d="M 0 65 L 120 65 L 110 75 L 10 75 Z" fill="#94A3B8" />
            <rect x="15" y="0" width="90" height="62" rx="6" fill="#1E121E" />
            <rect x="20" y="6" width="80" height="50" rx="3" fill="#FFF9FA" />
            <rect x="26" y="14" width="30" height="3" rx="1.5" fill="#94204D" />
            <rect x="26" y="22" width="60" height="2.5" rx="1" fill="#FDA4AF" />
            <rect x="26" y="28" width="45" height="2.5" rx="1" fill="#CBD5E1" />
            <circle cx="78" cy="40" r="6" fill="#FDF0F3" />
            <path d="M 76 40 L 78 42 L 81 38" stroke="#94204D" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
};

/**
 * 7. HOW IT WORKS 03: Stay In Control / Case Tracking
 */
export const CaseTrackingWomanIllustration: React.FC<IllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 320 280" className="w-full h-full max-w-[300px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <IllustrationDefs />
        <rect width="320" height="280" rx="32" fill="#FDF0F3" stroke="#FADCE2" strokeWidth="1.5" />

        <g transform="translate(30, 25)">
          <path d="M 75 50 C 45 40 40 85 45 125 C 55 140 75 145 90 145 C 105 145 120 135 115 85 Z" fill="url(#hairDark)" />
          <ellipse cx="80" cy="80" rx="22" ry="26" fill="url(#skinTone1)" />
          <path d="M 64 68 C 60 85 70 108 82 112 C 88 105 88 90 84 72 Z" fill="url(#hairDark)" />

          <ellipse cx="78" cy="78" rx="3" ry="3.5" fill="#1E121E" />
          <circle cx="73" cy="86" r="5" fill="#FDA4AF" opacity="0.6" />
          <path d="M 76 90 Q 82 96 88 90" stroke="#94204D" strokeWidth="2" strokeLinecap="round" fill="none" />

          <path d="M 52 110 C 68 102 96 102 112 110 L 125 210 L 40 210 Z" fill="url(#plumGrad)" />

          <g transform="translate(100, 70)" filter="url(#gentleShadow)">
            <rect width="90" height="150" rx="16" fill="#1E121E" stroke="#334155" strokeWidth="2" />
            <rect x="6" y="8" width="78" height="134" rx="10" fill="#FFFFFF" />
            <rect x="12" y="18" width="40" height="4" rx="2" fill="#94204D" />
            <rect x="12" y="28" width="66" height="22" rx="6" fill="#FDF0F3" />
            <text x="18" y="42" fill="#94204D" fontSize="8" fontWeight="700" fontFamily="sans-serif">
              CASE #R-2841
            </text>
            <circle cx="20" cy="62" r="5" fill="#94204D" />
            <rect x="30" y="60" width="38" height="3" rx="1.5" fill="#64748B" />
            <circle cx="20" cy="80" r="5" fill="#94204D" />
            <rect x="30" y="78" width="45" height="3" rx="1.5" fill="#64748B" />
            <circle cx="20" cy="98" r="5" fill="#FDA4AF" />
            <rect x="30" y="96" width="30" height="3" rx="1.5" fill="#FDA4AF" />
          </g>
        </g>
      </svg>
    </div>
  );
};

/**
 * 8. PATTERN DETECTION: 3 Diverse Women Connecting Independent Reports
 */
export const MultiWomanPatternGraphic: React.FC<IllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 680 420" className="w-full h-full max-w-[640px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <IllustrationDefs />

        <rect width="680" height="420" rx="36" fill="#1E121E" stroke="#3D2034" strokeWidth="1.5" />
        <circle cx="340" cy="210" r="140" fill="#94204D" opacity="0.15" />

        {/* Connecting Signal Waves */}
        <path
          d="M 140 180 Q 240 120 340 180"
          stroke="#FDA4AF"
          strokeWidth="2.5"
          strokeDasharray="6 6"
        />
        <path
          d="M 540 180 Q 440 120 340 180"
          stroke="#FDA4AF"
          strokeWidth="2.5"
          strokeDasharray="6 6"
        />
        <path
          d="M 340 330 L 340 230"
          stroke="#FB7185"
          strokeWidth="2.5"
          strokeDasharray="6 6"
        />

        {/* Center Detected Pattern Node */}
        <g transform="translate(250, 130)" filter="url(#gentleShadow)">
          <rect width="180" height="84" rx="20" fill="#FFFFFF" stroke="#94204D" strokeWidth="2" />
          <circle cx="30" cy="32" r="14" fill="#FDF0F3" />
          <path d="M 26 28 L 34 36 M 34 28 L 26 36" stroke="#94204D" strokeWidth="2.5" strokeLinecap="round" />
          <text x="52" y="28" fill="#1E121E" fontSize="11" fontWeight="800" fontFamily="sans-serif">
            PATTERN ALERT
          </text>
          <text x="52" y="42" fill="#94204D" fontSize="10" fontWeight="700" fontFamily="sans-serif">
            3 Independent Signals
          </text>
          <text x="20" y="66" fill="#64748B" fontSize="9" fontWeight="600" fontFamily="sans-serif">
            CS Dept &bull; Lab 3 &bull; Aug 12-19
          </text>
        </g>

        {/* WOMAN 1 (Left): Student in Berry */}
        <g transform="translate(60, 90)">
          <circle cx="60" cy="50" r="32" fill="url(#hairDark)" />
          <ellipse cx="60" cy="52" rx="20" ry="24" fill="url(#skinTone1)" />
          <path d="M 46 42 C 42 58 50 78 62 82 C 68 76 68 64 64 48 Z" fill="url(#hairDark)" />
          <ellipse cx="58" cy="52" rx="2.5" ry="3" fill="#1E121E" />
          <path d="M 55 64 Q 60 67 65 64" stroke="#94204D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M 36 82 C 48 76 72 76 84 82 L 95 160 L 25 160 Z" fill="url(#berryGrad)" />

          <g transform="translate(10, 165)" filter="url(#gentleShadow)">
            <rect width="100" height="38" rx="10" fill="#FFFFFF" stroke="#FADCE2" />
            <text x="12" y="18" fill="#94204D" fontSize="10" fontWeight="800" fontFamily="monospace">
              #R-021
            </text>
            <text x="12" y="30" fill="#64748B" fontSize="8" fontWeight="600" fontFamily="sans-serif">
              Aug 12 &bull; Lab 3
            </text>
          </g>
        </g>

        {/* WOMAN 2 (Right): Researcher in Rose */}
        <g transform="translate(460, 90)">
          <circle cx="60" cy="50" r="32" fill="url(#hairAuburn)" />
          <ellipse cx="60" cy="52" rx="20" ry="24" fill="url(#skinTone2)" />
          <path d="M 46 42 C 42 58 50 78 62 82 C 68 76 68 64 64 48 Z" fill="url(#hairAuburn)" />
          <ellipse cx="58" cy="52" rx="2.5" ry="3" fill="#1E121E" />
          <path d="M 55 64 Q 60 67 65 64" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M 36 82 C 48 76 72 76 84 82 L 95 160 L 25 160 Z" fill="url(#roseGrad)" />

          <g transform="translate(10, 165)" filter="url(#gentleShadow)">
            <rect width="100" height="38" rx="10" fill="#FFFFFF" stroke="#FFE4E6" />
            <text x="12" y="18" fill="#94204D" fontSize="10" fontWeight="800" fontFamily="monospace">
              #R-087
            </text>
            <text x="12" y="30" fill="#64748B" fontSize="8" fontWeight="600" fontFamily="sans-serif">
              Aug 15 &bull; CS Hall
            </text>
          </g>
        </g>

        {/* WOMAN 3 (Bottom Center): Graduate in Plum */}
        <g transform="translate(260, 240)">
          <circle cx="80" cy="40" r="28" fill="url(#hairDark)" />
          <ellipse cx="80" cy="42" rx="18" ry="22" fill="url(#skinTone4)" />
          <path d="M 68 34 C 64 48 72 66 82 70 C 88 64 88 54 84 40 Z" fill="url(#hairDark)" />
          <ellipse cx="78" cy="42" rx="2.5" ry="3" fill="#1E121E" />
          <path d="M 75 52 Q 80 55 85 52" stroke="#94204D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M 58 68 C 68 62 92 62 102 68 L 110 130 L 50 130 Z" fill="url(#plumGrad)" />

          <g transform="translate(30, 132)" filter="url(#gentleShadow)">
            <rect width="100" height="38" rx="10" fill="#FFFFFF" stroke="#FADCE2" />
            <text x="12" y="18" fill="#94204D" fontSize="10" fontWeight="800" fontFamily="monospace">
              #R-143
            </text>
            <text x="12" y="30" fill="#64748B" fontSize="8" fontWeight="600" fontFamily="sans-serif">
              Aug 19 &bull; Workstation 14
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

/**
 * 9. ANONYMOUS VERIFICATION FLOW DIAGRAM
 */
export const AnonymousFlowDiagramGraphic: React.FC<IllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 740 320" className="w-full h-full max-w-[700px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <IllustrationDefs />

        {/* Step 1: Reporter */}
        <g transform="translate(20, 80)" filter="url(#gentleShadow)">
          <rect width="120" height="140" rx="20" fill="#FFFFFF" stroke="#FADCE2" />
          <circle cx="60" cy="45" r="22" fill="#FDF0F3" />
          <circle cx="60" cy="40" r="14" fill="url(#hairDark)" />
          <path d="M 45 75 C 50 65 70 65 75 75 L 80 100 L 40 100 Z" fill="url(#roseGrad)" />
          <text x="60" y="122" textAnchor="middle" fill="#1E121E" fontSize="11" fontWeight="800" fontFamily="sans-serif">
            1. Reporter
          </text>
          <text x="60" y="136" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="sans-serif">
            Submits Account
          </text>
        </g>

        <path d="M 145 150 L 175 150" stroke="#94204D" strokeWidth="2.5" strokeLinecap="round" />

        {/* Step 2: Institution Verification */}
        <g transform="translate(180, 80)" filter="url(#gentleShadow)">
          <rect width="120" height="140" rx="20" fill="#FFFFFF" stroke="#FADCE2" strokeWidth="1.5" />
          <circle cx="60" cy="45" r="22" fill="#FDF0F3" />
          <path d="M 50 45 L 57 52 L 70 38" stroke="#94204D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="60" y="116" textAnchor="middle" fill="#94204D" fontSize="10" fontWeight="800" fontFamily="sans-serif">
            2. Verified Email
          </text>
          <text x="60" y="130" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="sans-serif">
            @university.edu
          </text>
        </g>

        <path d="M 305 150 L 335 150" stroke="#94204D" strokeWidth="2.5" strokeLinecap="round" />

        {/* Step 3: Identity Protected Hash */}
        <g transform="translate(340, 70)" filter="url(#gentleShadow)">
          <rect width="130" height="160" rx="24" fill="#1E121E" stroke="#3D2034" />
          <circle cx="65" cy="50" r="24" fill="#2E1B28" />
          <circle cx="65" cy="48" r="8" fill="#FDA4AF" />
          <rect x="61" y="48" width="8" height="12" rx="2" fill="#FDA4AF" />
          <text x="65" y="112" textAnchor="middle" fill="#FDA4AF" fontSize="11" fontWeight="800" fontFamily="sans-serif">
            3. Privacy Vault
          </text>
          <text x="65" y="128" textAnchor="middle" fill="#E5A8BA" fontSize="8" fontFamily="monospace">
            SHA-256 HASH
          </text>
          <text x="65" y="142" textAnchor="middle" fill="#CBD5E1" fontSize="8" fontFamily="sans-serif">
            Zero reviewer link
          </text>
        </g>

        <path d="M 475 150 L 505 150" stroke="#94204D" strokeWidth="2.5" strokeLinecap="round" />

        {/* Step 4: Neutral Reviewer */}
        <g transform="translate(510, 80)" filter="url(#gentleShadow)">
          <rect width="130" height="140" rx="20" fill="#FFFFFF" stroke="#FADCE2" />
          <circle cx="65" cy="45" r="22" fill="#FDF0F3" />
          <path d="M 52 45 L 78 45 M 65 32 L 65 58" stroke="#94204D" strokeWidth="2" strokeLinecap="round" />
          <text x="65" y="116" textAnchor="middle" fill="#1E121E" fontSize="10" fontWeight="800" fontFamily="sans-serif">
            4. Human Review
          </text>
          <text x="65" y="130" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="sans-serif">
            Evaluates Facts
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 10. EVIDENCE & PRIVACY VAULT ILLUSTRATION
 */
export const EvidenceVaultWomanIllustration: React.FC<IllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 340 300" className="w-full h-full max-w-[320px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <IllustrationDefs />
        <rect width="340" height="300" rx="36" fill="#FDF0F3" stroke="#FADCE2" strokeWidth="1.5" />

        <g transform="translate(150, 45)" filter="url(#gentleShadow)">
          <rect width="150" height="200" rx="20" fill="#FFFFFF" stroke="#FADCE2" />
          <rect x="15" y="18" width="120" height="45" rx="10" fill="#FFF9FA" />
          <text x="25" y="42" fill="#94204D" fontSize="9" fontWeight="700" fontFamily="sans-serif">
            ✓ EXIF Scrubbed
          </text>
          <rect x="15" y="75" width="120" height="45" rx="10" fill="#FFF9FA" />
          <text x="25" y="99" fill="#94204D" fontSize="9" fontWeight="700" fontFamily="sans-serif">
            ✓ Encrypted Vault
          </text>
          <rect x="15" y="132" width="120" height="45" rx="10" fill="#FFF9FA" />
          <text x="25" y="156" fill="#94204D" fontSize="9" fontWeight="700" fontFamily="sans-serif">
            ✓ Zero Cloud Leaks
          </text>
        </g>

        <g transform="translate(25, 40)">
          <circle cx="65" cy="50" r="30" fill="url(#hairDark)" />
          <ellipse cx="65" cy="54" rx="20" ry="24" fill="url(#skinTone1)" />
          <path d="M 50 44 C 46 60 54 80 66 84 C 72 78 72 66 68 50 Z" fill="url(#hairDark)" />
          <ellipse cx="63" cy="54" rx="2.5" ry="3" fill="#1E121E" />
          <path d="M 60 66 Q 65 69 70 66" stroke="#94204D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M 40 86 C 52 80 78 80 90 86 L 100 180 L 30 180 Z" fill="url(#berryGrad)" />
        </g>
      </svg>
    </div>
  );
};

/**
 * 11. RETALIATION CHECK-IN ILLUSTRATION
 */
export const RetaliationCheckInWomanIllustration: React.FC<IllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 340 300" className="w-full h-full max-w-[320px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <IllustrationDefs />
        <rect width="340" height="300" rx="36" fill="#FFF1F2" stroke="#FFE4E6" strokeWidth="1.5" />

        <g transform="translate(130, 35)" filter="url(#gentleShadow)">
          <rect width="170" height="230" rx="24" fill="#1E121E" stroke="#3D2034" />
          <rect x="8" y="10" width="154" height="210" rx="16" fill="#FFFFFF" />
          <text x="20" y="36" fill="#1E121E" fontSize="10" fontWeight="800" fontFamily="sans-serif">
            Private Check-in
          </text>
          <text x="20" y="52" fill="#64748B" fontSize="8" fontFamily="sans-serif">
            Has anything changed?
          </text>

          <rect x="18" y="68" width="134" height="34" rx="8" fill="#FDF0F3" stroke="#FADCE2" />
          <text x="28" y="89" fill="#94204D" fontSize="9" fontWeight="700" fontFamily="sans-serif">
            ✓ Everything is okay
          </text>

          <rect x="18" y="110" width="134" height="34" rx="8" fill="#FFF1F2" stroke="#FFE4E6" />
          <text x="28" y="131" fill="#94204D" fontSize="9" fontWeight="700" fontFamily="sans-serif">
            ⚠ I need support
          </text>

          <rect x="18" y="152" width="134" height="34" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
          <text x="28" y="173" fill="#64748B" fontSize="9" fontWeight="700" fontFamily="sans-serif">
            + New incident occurred
          </text>
        </g>

        <g transform="translate(15, 45)">
          <circle cx="55" cy="50" r="28" fill="url(#hairAuburn)" />
          <ellipse cx="55" cy="54" rx="18" ry="22" fill="url(#skinTone2)" />
          <path d="M 42 44 C 38 60 46 80 58 84 C 64 78 64 66 60 50 Z" fill="url(#hairAuburn)" />
          <ellipse cx="53" cy="54" rx="2.5" ry="3" fill="#1E121E" />
          <path d="M 50 66 Q 55 69 60 66" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M 32 86 C 44 80 68 80 80 86 L 90 170 L 22 170 Z" fill="url(#roseGrad)" />
        </g>
      </svg>
    </div>
  );
};

/**
 * 12. FINAL CTA: Confident Empowered Woman
 */
export const FinalCtaWomanIllustration: React.FC<IllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full max-w-[420px]"
      >
        <svg viewBox="0 0 440 440" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          <IllustrationDefs />

          <circle cx="220" cy="220" r="180" fill="#FFF1F2" />
          <circle cx="220" cy="220" r="150" fill="#FCECEF" opacity="0.6" />

          {/* Decorative Sparkles & Rose Petals */}
          <path d="M 80 140 Q 100 130 110 150 Q 95 165 80 140 Z" fill="#FB7185" opacity="0.7" />
          <path d="M 360 160 Q 380 150 390 170 Q 375 185 360 160 Z" fill="#94204D" opacity="0.7" />

          <g transform="translate(90, 40)">
            <path
              d="M 130 100 C 90 80 60 130 70 210 C 75 270 50 330 80 370 C 110 400 150 400 180 400 C 210 400 240 370 240 310 C 240 240 210 180 190 130 Z"
              fill="url(#hairDark)"
            />

            <path d="M 120 180 L 120 215 L 140 215 L 140 180 Z" fill="url(#skinTone1)" />
            <ellipse cx="130" cy="150" rx="30" ry="34" fill="url(#skinTone1)" />

            <ellipse cx="120" cy="148" rx="3.5" ry="4" fill="#1E121E" />
            <ellipse cx="140" cy="148" rx="3.5" ry="4" fill="#1E121E" />
            <circle cx="114" cy="158" r="6" fill="#FDA4AF" opacity="0.7" />
            <circle cx="146" cy="158" r="6" fill="#FDA4AF" opacity="0.7" />
            <path d="M 122 166 Q 130 174 138 166" stroke="#94204D" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            <path
              d="M 105 130 C 98 160 110 190 125 200 C 132 195 130 180 126 160 C 122 140 135 125 150 135 C 165 145 170 175 172 205 C 176 175 168 120 148 100 Z"
              fill="url(#hairDark)"
            />

            <path
              d="M 75 220 C 105 205 155 205 185 220 L 205 350 L 55 350 Z"
              fill="url(#berryGrad)"
              filter="url(#gentleShadow)"
            />

            <path d="M 120 215 L 130 260 L 140 215 Z" fill="#FFFFFF" />
            <circle cx="130" cy="275" r="5" fill="#F59E0B" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
