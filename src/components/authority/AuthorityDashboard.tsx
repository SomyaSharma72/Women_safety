import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Shield,
  ShieldCheck,
  Lock,
  UserCheck,
  UserX,
  FileText,
  MapPin,
  Building,
  Calendar,
  Eye,
  CheckCircle,
  X,
  ChevronRight,
  Users,
  Search,
  Filter,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { IncidentReport, PatternSignal } from '../../types';
import { PATTERN_ALERTS, DEPARTMENTS } from '../../data/mockData';
import { formatDate } from '../../lib/utils';

interface AuthorityDashboardProps {
  reports: IncidentReport[];
  onSelectCase: (caseNumber: string) => void;
  onUpdateReportStatus: (caseNumber: string, newStatus: any, note: string) => void;
}

export const AuthorityDashboard: React.FC<AuthorityDashboardProps> = ({
  reports,
  onSelectCase,
  onUpdateReportStatus,
}) => {
  const [selectedPattern, setSelectedPattern] = useState<PatternSignal | null>(PATTERN_ALERTS[0]);
  const [isPatternDetailOpen, setIsPatternDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'patterns' | 'all_cases' | 'audit_log'>('patterns');
  const [filterDept, setFilterDept] = useState<string>('all');
  const [selectedReportDetail, setSelectedReportDetail] = useState<IncidentReport | null>(null);

  // Actions on case modal
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'under_investigation' | 'escalated_external' | 'action_taken'>('under_investigation');
  const [actionNote, setActionNote] = useState('');

  const filteredReports = reports.filter((r) => {
    if (filterDept !== 'all' && r.department !== filterDept) return false;
    return true;
  });

  const handleApplyAction = () => {
    if (!selectedReportDetail) return;
    onUpdateReportStatus(
      selectedReportDetail.caseNumber,
      actionType,
      actionNote || `Action updated to ${actionType.replace('_', ' ')} by Authorized Reviewer.`
    );
    setIsActionModalOpen(false);
    setActionNote('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header: Scannable, Professional, Berry & Charcoal */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-xs border border-rose-100 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#94204D] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#94204D] font-bold">
                Authorized Reviewer Portal &bull; Institutional Panel
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display-styled text-[#1E121E]">
              Pattern Radar &amp; Case Verification
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Confidential institutional dashboard. Identities are strictly masked while multi-report patterns are correlated to ensure timely intervention.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-[#FDF0F3] border border-[#FADCE2] text-center min-w-[120px]">
              <span className="text-[11px] text-[#94204D] block font-bold uppercase tracking-wider">
                Pattern Clusters
              </span>
              <span className="text-2xl font-bold font-mono text-[#94204D]">
                {PATTERN_ALERTS.length}
              </span>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-[#FFF9FA] border border-rose-100 text-center min-w-[120px]">
              <span className="text-[11px] text-slate-600 block font-bold uppercase tracking-wider">
                Total Reports
              </span>
              <span className="text-2xl font-bold font-mono text-slate-900">
                {reports.length}
              </span>
            </div>
          </div>
        </div>

        {/* Scannable AI Guardrail Directive Badge */}
        <div className="mt-5 pt-4 border-t border-rose-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF0F3] text-[#94204D] font-bold border border-[#FADCE2]">
            <AlertTriangle className="w-4 h-4 text-[#94204D]" />
            <span>AI signal detected &bull; Human review required.</span>
          </div>
          <span className="text-slate-500 text-xs">
            Algorithms flag multi-report overlap &bull; Authorized committees lead all evaluations &amp; actions.
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-100 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('patterns')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'patterns'
                ? 'bg-[#94204D] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-rose-50 border border-rose-100'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Pattern Radar ({PATTERN_ALERTS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('all_cases')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'all_cases'
                ? 'bg-[#94204D] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-rose-50 border border-rose-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>All Incidents ({reports.length})</span>
          </button>
        </div>

        {activeTab === 'all_cases' && (
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="text-xs bg-white border border-rose-200 rounded-xl px-3 py-1.5 text-slate-700 font-semibold"
            >
              <option value="all">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: PATTERN RADAR */}
      {activeTab === 'patterns' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PATTERN_ALERTS.map((pattern) => (
              <div
                key={pattern.id}
                className="bg-white rounded-[28px] p-6 border border-rose-100 shadow-2xs hover:border-[#94204D]/40 transition-all flex flex-col justify-between space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#94204D] uppercase tracking-wider block">
                      Pattern Alert #{pattern.id}
                    </span>
                    <h3 className="text-lg font-bold text-[#1E121E] font-display-styled mt-0.5">
                      {pattern.title}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FDF0F3] text-[#94204D] border border-[#FADCE2] shrink-0">
                    {pattern.confidenceScore}% Overlap
                  </span>
                </div>

                {/* Key Metrics Badges in Scannable Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-100/80 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#94204D] shrink-0" />
                    <span className="font-semibold text-slate-800 truncate">
                      {pattern.department}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-100/80 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#94204D] shrink-0" />
                    <span className="font-semibold text-slate-800">
                      {pattern.dateRange}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-100/80 flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#94204D] shrink-0" />
                    <span className="font-semibold text-slate-800">
                      {pattern.reportCount} Independent Reports
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-100/80 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#94204D] shrink-0" />
                    <span className="font-semibold text-slate-800">
                      Identities Masked
                    </span>
                  </div>
                </div>

                {/* Short Summary */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {pattern.summary}
                </p>

                {/* Correlated Report Badges */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] font-bold text-slate-500">Correlated:</span>
                  {pattern.correlatedReportIds.map((id) => (
                    <span
                      key={id}
                      className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-800 font-mono text-[11px] font-bold"
                    >
                      {id}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    setSelectedPattern(pattern);
                    setIsPatternDetailOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#94204D] hover:bg-[#7D1B41] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Review Pattern</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ALL INCIDENTS */}
      {activeTab === 'all_cases' && (
        <div className="bg-white rounded-[28px] border border-rose-100 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFF9FA] border-b border-rose-100 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Case Number</th>
                  <th className="p-4">Mode</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-50">
                {filteredReports.map((report) => (
                  <tr key={report.caseNumber} className="hover:bg-[#FFF9FA] transition">
                    <td className="p-4 font-mono font-bold text-[#94204D]">
                      {report.caseNumber}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        report.mode === 'ANONYMOUS'
                          ? 'bg-[#FDF0F3] text-[#94204D]'
                          : report.mode === 'CONFIDENTIAL'
                          ? 'bg-rose-50 text-[#94204D]'
                          : 'bg-pink-50 text-pink-700'
                      }`}>
                        {report.mode}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-800 capitalize">
                      {report.category.replace('_', ' ')}
                    </td>
                    <td className="p-4 text-slate-600">
                      {report.department}
                    </td>
                    <td className="p-4 text-slate-500 font-mono">
                      {formatDate(report.incidentDate)}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold capitalize">
                        {report.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedReportDetail(report);
                          setIsActionModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#FDF0F3] hover:bg-[#FCECEF] text-[#94204D] font-bold text-xs transition cursor-pointer"
                      >
                        Review Case
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: PATTERN DETAIL REVIEW */}
      {isPatternDetailOpen && selectedPattern && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-2xl w-full p-6 sm:p-8 border border-rose-100 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-rose-100">
              <div>
                <span className="text-xs font-mono font-bold text-[#94204D] uppercase">
                  Pattern Alert #{selectedPattern.id}
                </span>
                <h3 className="text-xl font-bold text-[#1E121E] font-display-styled">
                  {selectedPattern.title}
                </h3>
              </div>
              <button
                onClick={() => setIsPatternDetailOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#FDF0F3] border border-[#FADCE2] text-xs text-[#94204D] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span><strong>AI signal detected &bull; Human review required.</strong> No automated penalties are enacted without committee quorum.</span>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                Pattern Analysis Summary
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-[#FFF9FA] p-4 rounded-2xl border border-rose-100">
                {selectedPattern.summary}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                Correlated Case Reports ({selectedPattern.reportCount})
              </h4>
              <div className="space-y-2">
                {selectedPattern.correlatedReportIds.map((cid, i) => (
                  <div key={cid} className="p-3 rounded-xl bg-white border border-rose-100 flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#94204D]">Report {cid}</span>
                    <span className="text-slate-500">Temporal &amp; Location Match</span>
                    <button
                      onClick={() => {
                        setIsPatternDetailOpen(false);
                        onSelectCase(cid);
                      }}
                      className="text-[#94204D] font-bold hover:underline cursor-pointer"
                    >
                      View Case &rarr;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-rose-100">
              <button
                onClick={() => setIsPatternDetailOpen(false)}
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Formal institutional review convened. Notifications dispatched to authorized panel.');
                  setIsPatternDetailOpen(false);
                }}
                className="px-5 py-2.5 rounded-full bg-[#94204D] hover:bg-[#7D1B41] text-white text-xs font-bold cursor-pointer shadow-xs"
              >
                Convene Formal Inquiry Quorum
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CASE ACTION & STATUS UPDATE */}
      {isActionModalOpen && selectedReportDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-lg w-full p-6 sm:p-8 border border-rose-100 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-rose-100">
              <div>
                <span className="text-xs font-mono font-bold text-[#94204D]">
                  Case #{selectedReportDetail.caseNumber}
                </span>
                <h3 className="text-lg font-bold text-[#1E121E]">
                  Update Institutional Action
                </h3>
              </div>
              <button
                onClick={() => setIsActionModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Status Update
              </label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => setActionType('under_investigation')}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold cursor-pointer ${
                    actionType === 'under_investigation'
                      ? 'border-[#94204D] bg-[#FDF0F3] text-[#94204D]'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  Under Active Investigation
                </button>
                <button
                  type="button"
                  onClick={() => setActionType('escalated_external')}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold cursor-pointer ${
                    actionType === 'escalated_external'
                      ? 'border-[#94204D] bg-[#FDF0F3] text-[#94204D]'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  Escalated to Independent Ombudsman / Legal
                </button>
                <button
                  type="button"
                  onClick={() => setActionType('action_taken')}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold cursor-pointer ${
                    actionType === 'action_taken'
                      ? 'border-[#94204D] bg-[#FDF0F3] text-[#94204D]'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  Formal Disciplinary Action Resolved
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Official Panel Resolution Note
              </label>
              <textarea
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
                placeholder="Document factual investigation steps, hearings, or protective arrangements..."
                className="w-full h-24 text-xs p-3 rounded-xl border border-slate-200 focus:border-[#94204D] bg-white outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-rose-100">
              <button
                onClick={() => setIsActionModalOpen(false)}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyAction}
                className="px-5 py-2 rounded-full bg-[#94204D] hover:bg-[#7D1B41] text-white text-xs font-bold cursor-pointer shadow-xs"
              >
                Record Decision
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
