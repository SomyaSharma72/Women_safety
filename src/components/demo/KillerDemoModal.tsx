import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  UserX,
  Radio,
  AlertTriangle,
  Shield,
  FileText,
  Activity,
  Play,
  RotateCcw,
} from 'lucide-react';

interface KillerDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToTab: (tab: 'home' | 'report' | 'track' | 'authority', caseNum?: string) => void;
}

export const KillerDemoModal: React.FC<KillerDemoModalProps> = ({
  isOpen,
  onClose,
  onJumpToTab,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const DEMO_STEPS = [
    {
      stepNumber: 1,
      title: '1. Victim Opens SafeReport with Complete Safety',
      summary: 'A victim seeking to report harassment without fear opens SafeReport. An immediate Quick Exit safety button and clear privacy guarantees are provided.',
      targetTab: 'home' as const,
      highlight: 'You deserve to report it safely.',
      callout: 'SOS is for immediate physical emergency. SafeReport is for persistent documentation, pattern discovery, and safe accountability.',
    },
    {
      stepNumber: 2,
      title: '2. Selects Anonymous Mode (Identity Protected)',
      summary: 'Victim chooses Anonymous Mode. Institutional email verifies they are real at system level, but reviewers receive zero identifying name, email, or device tokens.',
      targetTab: 'report' as const,
      highlight: 'Identity Protected ≠ Unverified. System verifies affiliation, but shields it completely from reviewers.',
      callout: 'Victim retains total autonomy over what level of identity they disclose.',
    },
    {
      stepNumber: 3,
      title: '3. Submits Incident Facts & Encrypted Evidence',
      summary: 'Victim enters incident facts (CS Dept, Lab 3) and attaches chat/audio proof. Automated metadata stripping purges EXIF & device fingerprints.',
      targetTab: 'report' as const,
      highlight: 'Separate encrypted vault partition keeps evidence isolated from personal identity.',
      callout: 'AI Structuring assistant helps organize factual notes with zero emotional judgment.',
    },
    {
      stepNumber: 4,
      title: '4. Receives Private Case #R-2841 & Safety Check-ins',
      summary: 'System generates Case #R-2841 with a private passkey. Evidence security feature activates scheduled check-ins: "Has anything changed since your report?"',
      targetTab: 'track' as const,
      caseNumber: 'R-2841',
      highlight: 'Case #R-2841 cryptographically sealed. User can check progress anytime.',
      callout: 'Post-report retaliation is documented safely via discreet check-ins.',
    },
    {
      stepNumber: 5,
      title: '5. Authorized Committee Opens Reviewer Radar',
      summary: 'Internal Complaints Committee (ICC) reviewer logs into the authorized institutional radar. Individual victim names remain masked.',
      targetTab: 'authority' as const,
      highlight: 'Institutional oversight dashboard without compromising reporter identities.',
      callout: 'Enables institutions to see systemic problems rather than treating each complaint as isolated.',
    },
    {
      stepNumber: 6,
      title: '6. Three Independent Reports Overlap in CS Lab 3',
      summary: 'Reports #021 (Aug 12), #087 (Aug 15), and #143 (Aug 19) all report unwanted conduct in the same CS Department Lab 3.',
      targetTab: 'authority' as const,
      highlight: 'Overlapping signals: Location (Lab 3), Role (Evening Coordinator), Cadence (Weekday evenings).',
      callout: 'Single anonymous reports cannot be weaponized, but multiple overlapping independent reports reveal serial misconduct.',
    },
    {
      stepNumber: 7,
      title: '7. System Generates Pattern Alert #PAT-8821',
      summary: 'SafeReport flags "Potential recurring pattern detected: CS Dept / Lab 3" with 94% statistical correlation.',
      targetTab: 'authority' as const,
      highlight: 'Potential recurring pattern detected.',
      callout: 'Transforms disconnected individual signals into concrete institutional patterns.',
    },
    {
      stepNumber: 8,
      title: '8. Authorized Human Reviewer Opens the Case File',
      summary: 'Reviewer inspects the time cluster, facility access timestamps, and corroborated patterns while protecting the victims.',
      targetTab: 'authority' as const,
      highlight: 'Due Process safeguards ensure fair, structured investigation.',
      callout: 'Neutral external escalation ensures accountability if the institution has a conflict of interest.',
    },
    {
      stepNumber: 9,
      title: '9. Core Principle Enforced: AI Flags. Humans Decide.',
      summary: 'The platform explicitly mandates: "AI signal detected · Human review required."',
      targetTab: 'authority' as const,
      highlight: 'Privacy for the victim. Due process for all parties.',
      callout: 'AI never declares guilt, penalizes, or dismisses complaints. Human judgment remains sovereign.',
    },
  ];

  if (!isOpen) return null;

  const currentStep = DEMO_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      onJumpToTab(DEMO_STEPS[nextIdx].targetTab, DEMO_STEPS[nextIdx].caseNumber);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      onJumpToTab(DEMO_STEPS[prevIdx].targetTab, DEMO_STEPS[prevIdx].caseNumber);
    }
  };

  const handleJump = (idx: number) => {
    setCurrentStepIndex(idx);
    onJumpToTab(DEMO_STEPS[idx].targetTab, DEMO_STEPS[idx].caseNumber);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-rose-100 space-y-6 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#94204D] text-white flex items-center justify-center shadow-md shadow-[#94204D]/20">
              <Sparkles className="w-4 h-4 text-rose-200" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#94204D]">
                The 90-Second Walkthrough
              </span>
              <h3 className="text-xl font-bold text-[#1E121E] font-display-styled">
                SafeReport Concept in Action
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-400 hover:text-slate-800 p-1.5 rounded-lg border border-slate-200 cursor-pointer"
          >
            Close Guide
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
          {DEMO_STEPS.map((s, idx) => (
            <button
              key={s.stepNumber}
              onClick={() => handleJump(idx)}
              className={`w-7 h-7 rounded-full text-xs font-bold transition flex items-center justify-center shrink-0 cursor-pointer ${
                currentStepIndex === idx
                  ? 'bg-[#94204D] text-white shadow-md scale-110'
                  : currentStepIndex > idx
                  ? 'bg-[#FDF0F3] text-[#94204D]'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {s.stepNumber}
            </button>
          ))}
        </div>

        {/* Active Step Content Box */}
        <div className="p-6 rounded-[28px] bg-[#FFF8F9] border border-rose-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#94204D] bg-[#FDF0F3] px-3 py-1 rounded-full border border-[#FADCE2]">
              Step {currentStep.stepNumber} of 9
            </span>

            <button
              onClick={() => onJumpToTab(currentStep.targetTab, currentStep.caseNumber)}
              className="text-xs font-semibold text-[#94204D] hover:text-[#7D1B41] flex items-center gap-1 underline cursor-pointer"
            >
              <span>View this screen in background</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <h4 className="text-xl font-bold text-[#1E121E] font-display-styled">
            {currentStep.title}
          </h4>

          <p className="text-sm text-slate-700 leading-relaxed">
            {currentStep.summary}
          </p>

          <div className="p-3.5 rounded-2xl bg-white border border-rose-100 text-xs text-slate-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#94204D] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 mb-0.5">Key Insight:</strong>
              <span>{currentStep.highlight}</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 font-mono italic">
            &bull; {currentStep.callout}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 ${
              currentStepIndex === 0
                ? 'opacity-40 cursor-not-allowed'
                : 'text-slate-700 hover:bg-slate-50 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Step</span>
          </button>

          {currentStepIndex < DEMO_STEPS.length - 1 ? (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 bg-[#94204D] hover:bg-[#7D1B41] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition cursor-pointer"
            >
              <span>Next Demo Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 bg-[#94204D] hover:bg-[#7D1B41] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Walkthrough</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
