import React, { useState } from 'react';
import { EyeOff, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

interface QuickExitOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickExitOverlay: React.FC<QuickExitOverlayProps> = ({ isOpen, onClose }) => {
  const [redirecting, setRedirecting] = useState(false);

  const handleInstantRedirect = (url: string) => {
    setRedirecting(true);
    setTimeout(() => {
      window.location.href = url;
    }, 150);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-rose-100 animate-in fade-in zoom-in duration-200">
        <div className="w-14 h-14 rounded-2xl bg-[#FDF0F3] text-[#94204D] flex items-center justify-center mb-5">
          <EyeOff className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-bold text-[#1E121E] tracking-tight mb-2 font-display-styled">
          Safety Privacy Discretion
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          If someone is approaching or you need to clear your screen instantly, choose a harmless destination or press <strong>ESC</strong> at any time.
        </p>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleInstantRedirect('https://weather.com/')}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-rose-100 hover:border-[#94204D]/40 hover:bg-[#FFF8F9] text-left transition group cursor-pointer"
          >
            <div>
              <p className="font-semibold text-slate-900 text-sm">Open Weather Forecast</p>
              <p className="text-xs text-slate-500">weather.com</p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#94204D] transition" />
          </button>

          <button
            onClick={() => handleInstantRedirect('https://en.wikipedia.org/wiki/Main_Page')}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-rose-100 hover:border-[#94204D]/40 hover:bg-[#FFF8F9] text-left transition group cursor-pointer"
          >
            <div>
              <p className="font-semibold text-slate-900 text-sm">Open Wikipedia Homepage</p>
              <p className="text-xs text-slate-500">wikipedia.org/wiki/Main_Page</p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#94204D] transition" />
          </button>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-rose-100">
          <button
            onClick={onClose}
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl transition cursor-pointer"
          >
            Return to Silent Shield
          </button>

          <button
            onClick={() => handleInstantRedirect('https://www.google.com')}
            className="bg-[#94204D] hover:bg-[#7D1B41] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>Exit Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
