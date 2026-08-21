import React, { useEffect, useState } from 'react';
import { Shield, ShieldAlert, FileText, Search, Activity, Sparkles, Phone, Lock } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'report' | 'track' | 'authority';
  setActiveTab: (tab: 'home' | 'report' | 'track' | 'authority') => void;
  onOpenDemo: () => void;
  onTriggerQuickExit: () => void;
  activeCaseCount: number;
  patternAlertCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDemo,
  onTriggerQuickExit,
  activeCaseCount,
  patternAlertCount,
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
      {/* Top Emergency Information Bar (Discreet, supportive, not alarmist) */}
      <div className="bg-[#0F172A] text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white uppercase tracking-wider">
              Immediate Danger?
            </span>
            <span className="text-slate-300 text-[11px] sm:text-xs">
              If you're in direct physical danger right now, contact emergency services (<strong>911 / 112 / 1091</strong>) or your campus security immediately.
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onTriggerQuickExit}
              className="inline-flex items-center gap-1.5 bg-rose-600/90 hover:bg-rose-600 text-white font-semibold text-[11px] px-3 py-1 rounded-full transition shadow-xs cursor-pointer"
              title="Quickly exit this tab to a neutral site (Press ESC)"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Quick Exit (ESC)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar matching image.png */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-rose-100'
            : 'bg-[#FFF7F8]/90 backdrop-blur-xs border-b border-rose-100/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* SafeReport Brand Logo */}
            <div
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-[#94204D] rounded-2xl flex items-center justify-center shadow-md shadow-[#94204D]/25 group-hover:scale-105 transition-transform duration-200">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#1E121E] font-display-styled">
                  SafeReport
                </span>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  Privacy-first reporting &amp; pattern detection
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links - Soft Blush Pill Bar */}
            <nav className="hidden md:flex items-center gap-1 bg-[#FDF0F3] px-2 py-1.5 rounded-full border border-[#FADCE2]/80">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  activeTab === 'home'
                    ? 'bg-white text-[#94204D] shadow-xs'
                    : 'text-slate-700 hover:text-[#94204D]'
                }`}
              >
                How it works
              </button>

              <button
                onClick={() => setActiveTab('report')}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  activeTab === 'report'
                    ? 'bg-white text-[#94204D] shadow-xs'
                    : 'text-slate-700 hover:text-[#94204D]'
                }`}
              >
                Report incident
              </button>

              <button
                onClick={() => setActiveTab('track')}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'track'
                    ? 'bg-white text-[#94204D] shadow-xs'
                    : 'text-slate-700 hover:text-[#94204D]'
                }`}
              >
                Case tracker
                {activeCaseCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-[#94204D]" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('authority')}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'authority'
                    ? 'bg-white text-[#94204D] shadow-xs'
                    : 'text-slate-700 hover:text-[#94204D]'
                }`}
              >
                Institutions
                {patternAlertCount > 0 && (
                  <span className="bg-[#94204D] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {patternAlertCount}
                  </span>
                )}
              </button>
            </nav>

            {/* Right CTAs matching screenshot */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={onOpenDemo}
                className="hidden sm:inline-flex items-center gap-2 bg-[#FDF0F3] hover:bg-[#FCECEF] text-[#94204D] text-xs font-bold px-4 py-2.5 rounded-full border border-[#FADCE2] shadow-xs transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#94204D]" />
                <span>90s walkthrough</span>
              </button>

              <button
                onClick={() => setActiveTab('report')}
                className="inline-flex items-center gap-1.5 bg-[#94204D] hover:bg-[#7D1B41] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-md shadow-[#94204D]/20 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                <span>Report incident</span>
                <span className="text-sm font-light">&rarr;</span>
              </button>
            </div>

          </div>

          {/* Mobile Navigation Row */}
          <div className="md:hidden flex items-center justify-around py-2.5 border-t border-rose-100 bg-[#FFF7F8]">
            <button
              onClick={() => setActiveTab('home')}
              className={`text-xs py-1 px-2.5 rounded-lg font-medium ${
                activeTab === 'home' ? 'text-[#94204D] font-bold bg-[#FDF0F3]' : 'text-slate-600'
              }`}
            >
              How it works
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`text-xs py-1 px-2.5 rounded-lg font-medium ${
                activeTab === 'report' ? 'text-[#94204D] font-bold bg-[#FDF0F3]' : 'text-slate-600'
              }`}
            >
              Report
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`text-xs py-1 px-2.5 rounded-lg font-medium ${
                activeTab === 'track' ? 'text-[#94204D] font-bold bg-[#FDF0F3]' : 'text-slate-600'
              }`}
            >
              Track
            </button>
            <button
              onClick={() => setActiveTab('authority')}
              className={`text-xs py-1 px-2.5 rounded-lg font-medium ${
                activeTab === 'authority' ? 'text-[#94204D] font-bold bg-[#FDF0F3]' : 'text-slate-600'
              }`}
            >
              Institutions
            </button>
            <button
              onClick={onOpenDemo}
              className="text-xs py-1 px-2.5 rounded-lg text-[#94204D] font-bold bg-[#FDF0F3] flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#94204D]" />
              Demo
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
