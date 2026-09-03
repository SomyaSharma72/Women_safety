import React from 'react';
import { Shield, ShieldAlert, Heart, Phone, Lock, Scale, ExternalLink } from 'lucide-react';

interface FooterProps {
  onStartReport: () => void;
  onViewRadar: () => void;
  onTriggerQuickExit: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onStartReport,
  onViewRadar,
  onTriggerQuickExit,
}) => {
  return (
    <footer className="bg-[#1E121E] text-slate-300 pt-16 pb-12 border-t border-[#3D2034]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: SafeReport Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#94204D] flex items-center justify-center shadow-lg shadow-[#94204D]/30">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold font-display-styled text-white">
                Safe<span className="text-rose-300">Report</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Privacy-first reporting for safer institutions.
              <br />
              Empowering women in colleges and workplaces to speak up safely, prevent retaliation, and uncover recurring patterns.
            </p>

            <div className="pt-2">
              <button
                onClick={onTriggerQuickExit}
                className="inline-flex items-center gap-1.5 bg-[#94204D] hover:bg-[#7D1B41] text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Quick Escape (ESC)</span>
              </button>
              <p className="mt-2 text-[11px] text-slate-500">Press Esc for Quick Exit</p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-rose-300 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={onStartReport} className="hover:text-rose-200 transition text-left cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={onStartReport} className="hover:text-rose-200 transition text-left cursor-pointer">
                  Privacy Protocol
                </button>
              </li>
              <li>
                <button onClick={onViewRadar} className="hover:text-rose-200 transition text-left cursor-pointer">
                  Institutional Access
                </button>
              </li>
              <li>
                <button onClick={onStartReport} className="hover:text-rose-200 transition text-left cursor-pointer">
                  Report an Incident
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Emergency Helplines */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-rose-300 font-mono">
              Emergency &amp; Support Lines
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Women's Safety Helpline: <strong>1091 / 911</strong> (24/7 Free)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Campus Emergency Dispatch: <strong>Ext. 4444</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                <span>Ombudsman &amp; Independent Legal Aid</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & empathy badge */}
        <div className="pt-8 border-t border-[#3D2034] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} SafeReport &bull; Privacy-first reporting for safer institutions.
          </p>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Built with empathy, safety &amp; care</span>
            <Heart className="w-3.5 h-3.5 text-[#FB7185] fill-[#FB7185]" />
          </div>
        </div>

      </div>
    </footer>
  );
};
