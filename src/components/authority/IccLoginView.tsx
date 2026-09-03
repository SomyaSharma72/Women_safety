import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  AlertCircle,
  Building,
  RefreshCw,
  BadgeCheck,
  CheckCircle2,
} from 'lucide-react';
import { IccUser } from '../../types';
import { iccLogin } from '../../lib/api';

interface IccLoginViewProps {
  onLoginSuccess: (user: IccUser) => void;
}

export const IccLoginView: React.FC<IccLoginViewProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('testmail@shield.com');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await iccLogin(email, password);
      onLoginSuccess(res.user);
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseDemoCredentials = () => {
    setEmail('testmail@shield.com');
    setPassword('123');
    setErrorMessage(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#94204D] uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" />
          Statutory Internal Complaints Committee Portal
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E121E] font-display-styled">
          ICC Officer Authentication
        </h1>
        <p className="text-sm text-slate-600">
          Strict role-based access. Only authorized institutional review committee members may access case dossiers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Main Login Box (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-[32px] p-6 sm:p-8 border border-rose-100 shadow-sm space-y-6">
          {/* Security Notice */}
          <div className="p-3.5 rounded-2xl bg-[#FFF8F9] border border-rose-200/80 flex items-start gap-3 text-xs text-slate-700">
            <Lock className="w-4 h-4 text-[#94204D] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Statutory Isolation Enforced:</span>
              <p className="mt-0.5 text-slate-600">
                Case dossiers are cryptographically isolated per institution. Unverified or unauthorized access is prohibited by law and logged.
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <div>
                <span className="font-bold">Access Denied:</span>
                <p className="mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* CREDENTIALS FORM */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Official ICC Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="testmail@shield.com"
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-2xl border border-slate-200 focus:border-[#94204D] focus:ring-2 focus:ring-[#94204D]/10 bg-slate-50/50 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security password"
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-2xl border border-slate-200 focus:border-[#94204D] focus:ring-2 focus:ring-[#94204D]/10 bg-slate-50/50 outline-none transition"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || !password || !email}
                className="w-full flex items-center justify-center gap-2 bg-[#94204D] hover:bg-[#7D1B41] text-white font-bold text-sm py-3.5 px-6 rounded-2xl shadow-md shadow-[#94204D]/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Authenticating Session...</span>
                  </>
                ) : (
                  <>
                    <BadgeCheck className="w-4 h-4" />
                    <span>Log In to ICC Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Notice: No Public Registration */}
          <div className="text-center pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            Internal statutory accounts are provisioned exclusively by authorized campus administration.
          </div>
        </div>

        {/* Right Panel: Demo Credentials & Institutional Isolation Protocol (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Demo Credentials Box */}
          <div className="p-5 rounded-2xl bg-[#FFF8F9] border border-rose-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#94204D] uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" />
                Demo Credentials (Judges &amp; Evaluators)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-[#94204D]">
                DEMO ONLY
              </span>
            </div>

            <p className="text-xs text-slate-600">
              For evaluation, use the verified demo ICC Presiding Officer account:
            </p>

            <div className="p-3 rounded-xl bg-white border border-rose-100 space-y-1.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">Email:</span>
                <span className="font-bold text-slate-800">testmail@shield.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">Password:</span>
                <span className="font-bold text-[#94204D]">123</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100 text-[11px] font-sans">
                <span className="text-slate-400">Institution:</span>
                <span className="text-slate-700 font-semibold">Crestview Institute of Technology</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleUseDemoCredentials}
              className="w-full py-2 px-3 text-xs font-semibold rounded-xl bg-rose-100/70 hover:bg-rose-200/80 text-[#94204D] transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Fill Demo Credentials</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <Building className="w-3.5 h-3.5 text-[#94204D]" />
              Institutional Isolation Protocol
            </h4>
            <p className="leading-relaxed">
              When logged into <strong>Crestview Institute</strong>, you will only see cases assigned to Crestview. You cannot view Apex, Northbridge, or NovaTech cases. The backend derives the scope strictly from the authenticated token.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
