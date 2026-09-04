import React, { useEffect, useState } from 'react';
import {
  Shield,
  Sparkles,
  Compass,
  Scale,
} from 'lucide-react';

export type MainPortal = 'survivor' | 'icc';
export type SurvivorSubView = 'home' | 'report' | 'track' | 'institutions';

interface NavbarProps {
  currentPortal: MainPortal;
  setCurrentPortal: (portal: MainPortal) => void;
  survivorSubView: SurvivorSubView;
  setSurvivorSubView: (view: SurvivorSubView) => void;
  onOpenDemo: () => void;
  onTriggerQuickExit?: () => void;
  activeCaseCount?: number;
  patternAlertCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPortal,
  setCurrentPortal,
  survivorSubView,
  setSurvivorSubView,
  onOpenDemo,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Emergency Information Bar */}
      <div className="bg-[#0F172A] text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white uppercase tracking-wider">
              Immediate Danger?
            </span>
            <span className="text-slate-300 text-[11px] sm:text-xs">
              If you're in direct physical danger right now, contact emergency services (<strong>911 / 112 / 1091</strong>) or campus dispatch immediately.
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-rose-100/80'
            : 'bg-[#FFF8F9]/90 backdrop-blur-xs border-b border-rose-100/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-6">
            
            {/* Silent Shield Brand Logo */}
            <div
              onClick={() => {
                setCurrentPortal('survivor');
                setSurvivorSubView('home');
              }}
              className="flex items-center gap-3.5 cursor-pointer group shrink-0"
            >
              <div className="w-10 h-10 bg-[#94204D] rounded-xl flex items-center justify-center shadow-sm shadow-[#94204D]/20 group-hover:scale-105 transition-transform duration-200">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#1E121E] font-display-styled">
                  Silent Shield
                </span>
                <p className="text-[11px] text-slate-500 font-normal hidden sm:block">
                  Privacy-first reporting &amp; pattern detection
                </p>
              </div>
            </div>

            {/* Central Portal Switcher & Spacious Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Main Dual-Portal Segmented Selector */}
              <div className="flex items-center bg-[#F4E3E7]/60 p-1 rounded-full border border-[#FADCE2]/80">
                <button
                  onClick={() => setCurrentPortal('survivor')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                    currentPortal === 'survivor'
                      ? 'bg-white text-[#94204D] shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-[#94204D]'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Survivor View</span>
                </button>

                <button
                  onClick={() => setCurrentPortal('icc')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                    currentPortal === 'icc'
                      ? 'bg-[#94204D] text-white shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-[#94204D]'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>ICC Portal</span>
                </button>
              </div>

              {/* Survivor Sub-Links with ample horizontal spacing */}
              {currentPortal === 'survivor' && (
                <nav className="flex items-center gap-6 text-xs text-slate-600 font-medium">
                  <button
                    onClick={() => setSurvivorSubView('home')}
                    className={`transition-colors cursor-pointer py-1 ${
                      survivorSubView === 'home'
                        ? 'text-[#94204D] font-bold border-b-2 border-[#94204D]'
                        : 'hover:text-[#94204D]'
                    }`}
                  >
                    How it works
                  </button>

                  <button
                    onClick={() => setSurvivorSubView('report')}
                    className={`transition-colors cursor-pointer py-1 ${
                      survivorSubView === 'report'
                        ? 'text-[#94204D] font-bold border-b-2 border-[#94204D]'
                        : 'hover:text-[#94204D]'
                    }`}
                  >
                    Report incident
                  </button>

                  <button
                    onClick={() => setSurvivorSubView('track')}
                    className={`transition-colors cursor-pointer py-1 ${
                      survivorSubView === 'track'
                        ? 'text-[#94204D] font-bold border-b-2 border-[#94204D]'
                        : 'hover:text-[#94204D]'
                    }`}
                  >
                    Case tracker
                  </button>

                  <button
                    onClick={() => setSurvivorSubView('institutions')}
                    className={`transition-colors cursor-pointer py-1 ${
                      survivorSubView === 'institutions'
                        ? 'text-[#94204D] font-bold border-b-2 border-[#94204D]'
                        : 'hover:text-[#94204D]'
                    }`}
                  >
                    Institutions
                  </button>
                </nav>
              )}
            </div>

            {/* Right CTAs */}
            <div className="flex items-center gap-3.5 shrink-0">
              <button
                onClick={onOpenDemo}
                className="hidden sm:inline-flex items-center gap-1.5 bg-white hover:bg-[#FDF0F3] text-slate-700 hover:text-[#94204D] text-xs font-semibold px-4 py-2.5 rounded-full border border-rose-200/80 shadow-2xs transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#94204D]" />
                <span>90s walkthrough</span>
              </button>

              {currentPortal === 'survivor' ? (
                <button
                  onClick={() => setSurvivorSubView('report')}
                  className="inline-flex items-center gap-1.5 bg-[#94204D] hover:bg-[#7D1B41] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm shadow-[#94204D]/20 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer"
                >
                  <span>Report incident</span>
                  <span className="text-sm font-light">&rarr;</span>
                </button>
              ) : (
                <button
                  onClick={() => setCurrentPortal('survivor')}
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-[#FDF0F3] text-[#94204D] text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full border border-[#FADCE2] shadow-2xs transition cursor-pointer"
                >
                  <span>&larr; Exit ICC Desk</span>
                </button>
              )}
            </div>

          </div>

          {/* Mobile Portal & Navigation Row */}
          <div className="lg:hidden flex flex-col gap-2 py-2.5 border-t border-rose-100 bg-[#FFF7F8]">
            {/* Mobile Dual Portal Toggle */}
            <div className="flex items-center justify-center gap-2 bg-[#F4E3E7]/80 p-1 rounded-full border border-[#FADCE2] mx-auto">
              <button
                onClick={() => setCurrentPortal('survivor')}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  currentPortal === 'survivor' ? 'bg-white text-[#94204D] shadow-2xs' : 'text-slate-700'
                }`}
              >
                Survivor View
              </button>
              <button
                onClick={() => setCurrentPortal('icc')}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  currentPortal === 'icc' ? 'bg-[#94204D] text-white shadow-2xs' : 'text-slate-700'
                }`}
              >
                ICC Portal
              </button>
            </div>

            {/* Mobile Survivor Sub-Links */}
            {currentPortal === 'survivor' && (
              <div className="flex items-center justify-around text-xs pt-1">
                <button
                  onClick={() => setSurvivorSubView('home')}
                  className={`py-1 px-2 rounded-lg font-semibold ${
                    survivorSubView === 'home' ? 'text-[#94204D] bg-[#FDF0F3]' : 'text-slate-600'
                  }`}
                >
                  How it works
                </button>
                <button
                  onClick={() => setSurvivorSubView('report')}
                  className={`py-1 px-2 rounded-lg font-semibold ${
                    survivorSubView === 'report' ? 'text-[#94204D] bg-[#FDF0F3]' : 'text-slate-600'
                  }`}
                >
                  Report
                </button>
                <button
                  onClick={() => setSurvivorSubView('track')}
                  className={`py-1 px-2 rounded-lg font-semibold ${
                    survivorSubView === 'track' ? 'text-[#94204D] bg-[#FDF0F3]' : 'text-slate-600'
                  }`}
                >
                  Track
                </button>
                <button
                  onClick={() => setSurvivorSubView('institutions')}
                  className={`py-1 px-2 rounded-lg font-semibold ${
                    survivorSubView === 'institutions' ? 'text-[#94204D] bg-[#FDF0F3]' : 'text-slate-600'
                  }`}
                >
                  Institutions
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
