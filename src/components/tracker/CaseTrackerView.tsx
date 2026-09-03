import React, { useState } from 'react';
import {
  Search,
  Key,
  Shield,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Lock,
  Plus,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Check,
} from 'lucide-react';
import { IncidentReport, RetaliationCheckIn } from '../../types';
import { formatDate } from '../../lib/utils';
import { trackCase } from '../../lib/api';

interface CaseTrackerViewProps {
  reports: IncidentReport[];
  initialCaseNumber?: string;
  onUpdateReport: (updated: IncidentReport) => void;
}

export const CaseTrackerView: React.FC<CaseTrackerViewProps> = ({
  reports,
  initialCaseNumber = '',
  onUpdateReport,
}) => {
  const [searchCaseId, setSearchCaseId] = useState(initialCaseNumber);
  const [searchPasskey, setSearchPasskey] = useState('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCase, setSelectedCase] = useState<IncidentReport | null>(
    initialCaseNumber ? reports.find((r) => r.caseNumber === initialCaseNumber) || null : reports[0] || null
  );

  // Retaliation Check-in response state
  const [checkInResponse, setCheckInResponse] = useState<
    'all_ok' | 'new_incident' | 'feeling_unsafe' | 'request_escalation' | null
  >(null);
  const [checkInNotes, setCheckInNotes] = useState('');
  const [checkInSubmitted, setCheckInSubmitted] = useState(false);

  // New follow-up note
  const [newFollowUpNote, setNewFollowUpNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    const query = searchCaseId.trim().toUpperCase();
    if (!query) {
      setSearchError('Please enter a case number.');
      return;
    }

    // 1. Search in local memory
    const foundLocal = reports.find(
      (r) => r.caseNumber.toUpperCase() === query || r.caseNumber.toUpperCase() === `R-${query}`
    );
    if (foundLocal) {
      setSelectedCase(foundLocal);
      setCheckInSubmitted(false);
      setCheckInResponse(null);
      return;
    }

    // 2. Fetch from backend server
    setIsSearching(true);
    try {
      const res = await trackCase(query);
      if (res && res.caseData) {
        setSelectedCase(res.caseData);
        setCheckInSubmitted(false);
        setCheckInResponse(null);
      } else {
        setSearchError(`Case "${query}" was not found. Please double-check your case reference number.`);
      }
    } catch {
      setSearchError(`Case "${query}" was not found on the secure registry.`);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectQuickCase = (cNumber: string) => {
    setSearchCaseId(cNumber);
    const found = reports.find((r) => r.caseNumber === cNumber);
    if (found) {
      setSelectedCase(found);
      setCheckInSubmitted(false);
      setCheckInResponse(null);
    }
  };

  const handleRetaliationSubmit = () => {
    if (!selectedCase || !checkInResponse) return;

    const newCheckIn: RetaliationCheckIn = {
      id: `chk-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      response: checkInResponse,
      notes: checkInNotes,
      responseTimestamp: new Date().toISOString(),
    };

    const updatedTimeline = [...selectedCase.timeline];

    if (checkInResponse === 'new_incident' || checkInResponse === 'feeling_unsafe') {
      updatedTimeline.push({
        id: `tm-${Date.now()}`,
        timestamp: 'Just now',
        title: 'Safety Check-in Alert Logged',
        description: `Reporter indicated: "${checkInResponse.replace('_', ' ')}". Priority elevated.`,
        actor: 'reporter',
        badgeType: 'alert',
      });
    } else if (checkInResponse === 'request_escalation') {
      updatedTimeline.push({
        id: `tm-${Date.now()}`,
        timestamp: 'Just now',
        title: 'External Neutral Escalation Requested',
        description: 'Reporter requested direct handover to external independent ombudsman.',
        actor: 'reporter',
        badgeType: 'warning',
      });
    }

    const updatedReport: IncidentReport = {
      ...selectedCase,
      checkIns: [newCheckIn, ...selectedCase.checkIns],
      timeline: updatedTimeline,
      neutralEscalationRequested:
        checkInResponse === 'request_escalation' ? true : selectedCase.neutralEscalationRequested,
    };

    setSelectedCase(updatedReport);
    onUpdateReport(updatedReport);
    setCheckInSubmitted(true);
  };

  const handleAddFollowUp = () => {
    if (!selectedCase || !newFollowUpNote.trim()) return;

    const updatedTimeline = [
      ...selectedCase.timeline,
      {
        id: `tm-${Date.now()}`,
        timestamp: 'Just now',
        title: 'Reporter Follow-up Note Appended',
        description: newFollowUpNote,
        actor: 'reporter' as const,
        badgeType: 'info' as const,
      },
    ];

    const updatedReport: IncidentReport = {
      ...selectedCase,
      timeline: updatedTimeline,
    };

    setSelectedCase(updatedReport);
    onUpdateReport(updatedReport);
    setNewFollowUpNote('');
    setIsAddingNote(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header & Search Bar */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-rose-100 shadow-2xs">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#94204D]">
            Confidential Case Management
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E121E] mt-1 font-display-styled">
            Track Case Status &amp; Safety Check-in
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Enter your Case Number to check review progress, answer private safety check-ins, or submit additional evidence.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchCaseId}
              onChange={(e) => setSearchCaseId(e.target.value)}
              placeholder="Enter Case # (e.g. R-4821)"
              className="w-full pl-10 pr-4 py-3 text-sm rounded-2xl border border-rose-200 bg-[#FFF8F9] focus:bg-white focus:ring-2 focus:ring-[#94204D] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="inline-flex items-center justify-center gap-2 bg-[#94204D] hover:bg-[#7D1B41] text-white font-semibold text-sm px-6 py-3 rounded-2xl shadow-xs transition cursor-pointer disabled:opacity-50"
          >
            <span>{isSearching ? 'Searching...' : 'Search Case'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {searchError && (
          <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
            {searchError}
          </div>
        )}

        {/* Quick Preloads if active reports exist */}
        {reports.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500">Active Reports:</span>
            {reports.map((r) => (
              <button
                key={r.caseNumber}
                type="button"
                onClick={() => handleSelectQuickCase(r.caseNumber)}
                className={`px-3 py-1 rounded-xl border font-mono font-medium transition cursor-pointer ${
                  selectedCase?.caseNumber === r.caseNumber
                    ? 'bg-[#94204D] text-white border-[#94204D]'
                    : 'bg-[#FDF0F3] hover:bg-[#FCECEF] text-[#94204D] border-[#FADCE2]'
                }`}
              >
                #{r.caseNumber} ({r.mode})
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedCase ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column: Status & Timeline & Check-in */}
          <div className="lg:col-span-8 space-y-6">
            {/* Case Header Card */}
            <div className="bg-white rounded-[32px] p-6 sm:p-7 border border-rose-100 shadow-2xs space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-rose-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold font-mono text-[#1E121E]">
                      CASE #{selectedCase.caseNumber}
                    </span>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                        selectedCase.mode === 'ANONYMOUS'
                          ? 'bg-[#FDF0F3] text-[#94204D] border-[#FADCE2]'
                          : selectedCase.mode === 'CONFIDENTIAL'
                          ? 'bg-rose-50 text-[#94204D] border-rose-200'
                          : 'bg-pink-50 text-pink-700 border-pink-200'
                      }`}
                    >
                      {selectedCase.mode} MODE
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Filed on {formatDate(selectedCase.createdAt)} &bull; {selectedCase.department}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#FDF0F3] px-3 py-1.5 rounded-xl border border-[#FADCE2]">
                  <Lock className="w-3.5 h-3.5 text-[#94204D]" />
                  <span className="text-xs font-mono text-[#94204D] font-bold">
                    Passkey: {selectedCase.passkey}
                  </span>
                </div>
              </div>

              {/* Milestone Tracker */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Investigation Milestone Status:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {[
                    { label: 'Report Submitted', done: true, current: false },
                    { label: 'Evidence Encrypted', done: true, current: false },
                    {
                      label: 'Pattern Review',
                      done: selectedCase.status !== 'submitted',
                      current: selectedCase.status === 'pattern_alert_triggered',
                    },
                    {
                      label: 'Human Review',
                      done:
                        selectedCase.status === 'under_investigation' ||
                        selectedCase.status === 'escalated_external' ||
                        selectedCase.status === 'action_taken',
                      current: selectedCase.status === 'under_investigation',
                    },
                    {
                      label: 'Escalation / Action',
                      done: selectedCase.status === 'escalated_external' || selectedCase.status === 'action_taken',
                      current: selectedCase.status === 'escalated_external',
                    },
                  ].map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center space-y-1.5 ${
                        step.current
                          ? 'bg-[#FDF0F3] border-[#94204D] ring-2 ring-[#94204D]/20'
                          : step.done
                          ? 'bg-[#FFF8F9] border-rose-200 text-slate-900'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          step.done ? 'bg-[#94204D] text-white' : 'bg-slate-300 text-white'
                        }`}
                      >
                        {step.done ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                      </div>
                      <span className="text-[11px] font-semibold leading-tight">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Retaliation Check-in Component */}
            <div className="bg-[#1E121E] text-white rounded-[32px] p-6 sm:p-7 shadow-xl border border-[#3D2034] relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#94204D] text-white flex items-center justify-center shadow-md shadow-[#94204D]/20">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white font-display-styled">
                        Safety &amp; Retaliation Check-in
                      </h4>
                      <p className="text-xs text-slate-300">
                        Discreet post-report safety audit
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/10 text-rose-200 px-2.5 py-0.5 rounded-full border border-white/10">
                    Private &amp; Encrypted
                  </span>
                </div>

                {!checkInSubmitted ? (
                  <div className="space-y-4 pt-2">
                    <p className="text-sm text-slate-200 font-medium">
                      Has anything changed or occurred since your report?
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { id: 'all_ok', label: 'Everything is okay', icon: '🌱' },
                        { id: 'new_incident', label: 'New incident occurred', icon: '⚠️' },
                        { id: 'feeling_unsafe', label: 'I feel unsafe / monitored', icon: '🚨' },
                        { id: 'request_escalation', label: 'Request external neutral escalation', icon: '⚖️' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setCheckInResponse(opt.id as any)}
                          className={`p-3 rounded-2xl text-left text-xs font-semibold flex items-center gap-2.5 transition cursor-pointer border ${
                            checkInResponse === opt.id
                              ? 'bg-[#94204D] text-white border-rose-400 ring-2 ring-white/30'
                              : 'bg-[#281425] hover:bg-[#34182E] text-slate-200 border-[#482240]'
                          }`}
                        >
                          <span className="text-base">{opt.icon}</span>
                          <span>{opt.label}</span>
                        </button>
                      ))}
                    </div>

                    {checkInResponse && (
                      <div className="space-y-3 pt-2">
                        <textarea
                          rows={2}
                          value={checkInNotes}
                          onChange={(e) => setCheckInNotes(e.target.value)}
                          placeholder="Optional: Add any notes or updates about your situation..."
                          className="w-full text-xs p-3 rounded-xl bg-[#281425] border border-[#482240] text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#94204D]"
                        />

                        <button
                          type="button"
                          onClick={handleRetaliationSubmit}
                          className="w-full py-3 rounded-xl bg-[#94204D] hover:bg-[#7D1B41] text-white font-bold text-xs shadow-md transition cursor-pointer"
                        >
                          Submit Safety Response
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-[#281425] border border-rose-500/40 flex items-center gap-3 text-xs text-rose-100">
                    <CheckCircle2 className="w-5 h-5 text-rose-300 shrink-0" />
                    <div>
                      <p className="font-bold text-white">Check-in Response Logged</p>
                      <p className="text-[11px] text-slate-300">
                        Your response has been appended to the protected audit log. If you selected unsafe/escalation, priority has been raised.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Case Timeline Activity Log */}
            <div className="bg-white rounded-[32px] p-6 sm:p-7 border border-rose-100 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-rose-100">
                <h4 className="text-base font-bold text-[#1E121E] font-display-styled">
                  Case Activity &amp; Audit Trail
                </h4>
                <button
                  onClick={() => setIsAddingNote(!isAddingNote)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#94204D] hover:text-[#7D1B41] bg-[#FDF0F3] px-3 py-1.5 rounded-xl border border-[#FADCE2] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Follow-up Note</span>
                </button>
              </div>

              {isAddingNote && (
                <div className="p-4 rounded-2xl bg-[#FFF8F9] border border-rose-200 space-y-2.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Add supplemental details or new events to your case
                  </label>
                  <textarea
                    rows={3}
                    value={newFollowUpNote}
                    onChange={(e) => setNewFollowUpNote(e.target.value)}
                    placeholder="Provide additional details or changes in behavior..."
                    className="w-full text-xs p-2.5 rounded-xl border border-rose-300 bg-white outline-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsAddingNote(false)}
                      className="px-3 py-1.5 text-xs text-slate-600 rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddFollowUp}
                      className="px-4 py-1.5 text-xs font-semibold bg-[#94204D] text-white rounded-lg hover:bg-[#7D1B41] cursor-pointer"
                    >
                      Save to Timeline
                    </button>
                  </div>
                </div>
              )}

              {/* Timeline list */}
              <div className="space-y-4 pt-2">
                {selectedCase.timeline.map((event, idx) => (
                  <div key={event.id || idx} className="flex items-start gap-3">
                    <div
                      className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                        event.badgeType === 'alert'
                          ? 'bg-rose-500 animate-pulse'
                          : event.badgeType === 'warning'
                          ? 'bg-amber-500'
                          : event.badgeType === 'success'
                          ? 'bg-[#94204D]'
                          : 'bg-[#94204D]'
                      }`}
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{event.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{event.timestamp}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Evidence & Summary Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Encrypted Evidence Container */}
            <div className="bg-white rounded-[32px] p-6 border border-rose-100 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-display-styled">
                  Locked Evidence ({selectedCase.evidenceList.length})
                </h4>
                <Lock className="w-4 h-4 text-[#94204D]" />
              </div>

              <div className="space-y-2.5">
                {selectedCase.evidenceList.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3.5 rounded-2xl bg-[#FFF8F9] border border-rose-100 text-xs space-y-1"
                  >
                    <p className="font-semibold text-slate-900 truncate">{ev.fileName}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>{ev.fileSize}</span>
                      <span className="text-[#94204D] font-bold">Metadata Scrubbed</span>
                    </div>
                    <p className="font-mono text-[9px] text-slate-600 truncate">{ev.encryptedHash}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Structured Points Card */}
            {selectedCase.structuredSummary && (
              <div className="bg-[#FDF0F3] rounded-[32px] p-6 border border-[#FADCE2] space-y-3">
                <div className="flex items-center gap-2 text-[#94204D] font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-[#94204D]" />
                  <span>Extracted Structured Points</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-1">
                  {selectedCase.structuredSummary.keyIncidentPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-rose-200/60 text-[10px] text-slate-600 font-medium italic">
                  AI extracts structured data for speed; human reviewers make all findings.
                </div>
              </div>
            )}

            {/* External Neutral Escalation Status */}
            {selectedCase.neutralEscalationRequested && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <ExternalLink className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Neutral Oversight Active:</span>
                  <p className="mt-0.5 text-amber-800">
                    A mirror copy is designated for independent external review (Campus Ombudsman / Civil Board).
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-[32px] p-8 border border-rose-100">
          <FileText className="w-12 h-12 text-[#94204D]/40 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">Please enter or select a valid Case ID to view.</p>
        </div>
      )}
    </div>
  );
};
