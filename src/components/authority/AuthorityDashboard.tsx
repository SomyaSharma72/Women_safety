import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Shield,
  ShieldCheck,
  ShieldAlert,
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
  Scale,
  Download,
  Share2,
  FileCheck,
  CornerDownRight,
  Radio,
  FileWarning,
  Flame,
  CheckCircle2,
  HelpCircle,
  GraduationCap,
  Briefcase,
} from 'lucide-react';
import { IncidentReport, PatternSignal, CaseStatus, ReportingMode, IccUser } from '../../types';
import { PATTERN_ALERTS, DEPARTMENTS, CATEGORIES_METADATA } from '../../data/mockData';
import { formatDate } from '../../lib/utils';
import { iccGetEvidenceFile } from '../../lib/api';
import { LogOut, UserCheck as OfficerIcon } from 'lucide-react';

interface AuthorityDashboardProps {
  reports: IncidentReport[];
  currentUser?: IccUser | null;
  onLogout?: () => void;
  onSelectCase?: (caseNumber: string) => void;
  onUpdateReportStatus: (caseNumber: string, newStatus: CaseStatus, note: string) => void;
  onNavigateToSurvivorView?: () => void;
}

export const AuthorityDashboard: React.FC<AuthorityDashboardProps> = ({
  reports,
  currentUser,
  onLogout,
  onSelectCase,
  onUpdateReportStatus,
  onNavigateToSurvivorView,
}) => {
  const [selectedCaseNumber, setSelectedCaseNumber] = useState<string>(reports[0]?.caseNumber || '');
  
  // Filters for Left Case List
  const [filterSector, setFilterSector] = useState<'all' | 'college' | 'company'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [patternOnly, setPatternOnly] = useState<boolean>(false);

  // Status Action Modal / State
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionStatus, setActionStatus] = useState<CaseStatus>('under_investigation');
  const [actionNote, setActionNote] = useState('');
  const [escalationTarget, setEscalationTarget] = useState<'external_ombudsman' | 'state_human_rights' | 'independent_legal_counsel'>('external_ombudsman');
  const [activeEvidenceId, setActiveEvidenceId] = useState<string | null>(null);

  // Selected Report Object
  const selectedReport = reports.find((r) => r.caseNumber === selectedCaseNumber) || reports[0] || null;

  // Correlated Pattern for Selected Report (if any)
  const matchingPattern = PATTERN_ALERTS.find((pat) =>
    pat.matchedReports.some((m) => m.caseNumber === selectedReport?.caseNumber)
  );

  const collegeReportsCount = reports.filter((r) => r.organizationType === 'college').length;
  const companyReportsCount = reports.filter((r) => r.organizationType === 'company').length;

  // Filtered reports list for Left Column
  const filteredReports = reports.filter((r) => {
    const matchesSector = filterSector === 'all' || r.organizationType === filterSector;
    const matchesSearch =
      r.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.narrative.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.organizationName && r.organizationName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = filterDepartment === 'all' || r.department === filterDepartment;
    const matchesSeverity = filterSeverity === 'all' || r.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchesPattern = !patternOnly || r.patternFlagged || r.status === 'pattern_alert_triggered';

    return matchesSector && matchesSearch && matchesDept && matchesSeverity && matchesStatus && matchesPattern;
  });

  const handleApplyStatusChange = () => {
    if (!selectedReport) return;
    const noteText = actionNote.trim() || `Status updated to ${actionStatus.replace(/_/g, ' ')} by Authorized ICC Reviewer.`;
    onUpdateReportStatus(selectedReport.caseNumber, actionStatus, noteText);
    setIsActionModalOpen(false);
    setActionNote('');
  };

  const handleEvidenceAccess = async (evidenceId: string, download: boolean) => {
    if (!selectedReport) return;
    setActiveEvidenceId(evidenceId);
    try {
      const blob = await iccGetEvidenceFile(selectedReport.caseNumber, evidenceId, download);
      const url = URL.createObjectURL(blob);
      if (download) {
        const link = document.createElement('a');
        link.href = url;
        link.download = selectedReport.evidenceList.find((file) => file.id === evidenceId)?.fileName || 'evidence-file';
        link.click();
        URL.revokeObjectURL(url);
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } catch (err: any) {
      window.alert(err.message || 'Unable to access evidence.');
    } finally {
      setActiveEvidenceId(null);
    }
  };

  const getSeverityBadge = (severity?: string) => {
    switch (severity) {
      case 'critical':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">Critical Severity</span>;
      case 'high':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">High Urgency</span>;
      case 'medium':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">Standard Review</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">Routine</span>;
    }
  };

  const getStatusBadge = (status: CaseStatus) => {
    switch (status) {
      case 'submitted':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">New Intake</span>;
      case 'evidence_locked':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">Evidence Sealed</span>;
      case 'pattern_alert_triggered':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FDF0F3] text-[#94204D] border border-[#FADCE2]">Pattern Alert</span>;
      case 'under_investigation':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">Under Inquiry</span>;
      case 'escalated_external':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">Escalated (Ombudsman)</span>;
      case 'action_taken':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Action Enforced</span>;
      case 'closed':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 text-slate-700">Concluded</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* 1. Header Banner & Safety Mandate */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-rose-100 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#94204D] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#94204D] font-bold">
                Institutional Complaints Committee (ICC) &bull; Authorized Reviewer Portal
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display-styled text-[#1E121E]">
              Case Dossiers &amp; Multi-Report Investigation Desk
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Authorized institutional workstation. Review incoming case dossiers, correlate pattern alerts across independent anonymous reports, verify encrypted evidence vaults, and maintain statutory due process.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="px-4 py-3 rounded-2xl bg-[#FDF0F3] border border-[#FADCE2] text-center min-w-[110px] flex-1 sm:flex-initial">
              <span className="text-[10px] text-[#94204D] block font-bold uppercase tracking-wider">
                Total Dossiers
              </span>
              <span className="text-2xl font-bold font-mono text-[#94204D]">
                {reports.length}
              </span>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-[#FFF9FA] border border-rose-100 text-center min-w-[110px] flex-1 sm:flex-initial">
              <span className="text-[10px] text-slate-600 block font-bold uppercase tracking-wider">
                Under Inquiry
              </span>
              <span className="text-2xl font-bold font-mono text-slate-900">
                {reports.filter((r) => r.status === 'under_investigation' || r.status === 'submitted').length}
              </span>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-[#FFF9FA] border border-rose-100 text-center min-w-[110px] flex-1 sm:flex-initial">
              <span className="text-[10px] text-slate-600 block font-bold uppercase tracking-wider">
                Evidence Vaults
              </span>
              <span className="text-xs font-bold font-mono text-emerald-700 block mt-2">
                {reports.filter((r) => r.evidenceVaultSealed).length} Sealed
              </span>
            </div>
          </div>
        </div>

        {/* Mandatory AI Safety Guardrail Directive Badge */}
        <div className="mt-6 pt-4 border-t border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF0F3] text-[#94204D] font-bold border border-[#FADCE2]">
            <AlertTriangle className="w-4 h-4 text-[#94204D] shrink-0" />
            <span>Institutional Protocol &bull; Human Decision Mandate</span>
          </div>
          <span className="text-slate-600 text-xs leading-relaxed max-w-2xl">
            Confidential intake workstation. All evidence is cryptographically sealed with zero survivor exposure. <strong>Final findings and corrective actions remain solely with authorized human committee members.</strong>
          </span>
        </div>
      </div>

      {/* 2. Top Header Navigation Bar & Authenticated Session Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#94204D] text-white shadow-xs flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>Active Case Dossiers ({reports.length})</span>
          </div>
          {currentUser && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{currentUser.institutionName} &bull; {currentUser.name} ({currentUser.role})</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {currentUser && onLogout && (
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-rose-200 bg-white text-rose-800 hover:bg-rose-50 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>End ICC Session</span>
            </button>
          )}

          {onNavigateToSurvivorView && (
            <button
              onClick={onNavigateToSurvivorView}
              className="text-xs font-bold text-[#94204D] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>&larr; Switch to Survivor View</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. MAIN CONTENT: SPLIT PANE MASTER-DETAIL LAYOUT (Case Dossiers) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: LIST OF INCOMING CASES (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Search & Filter Header */}
            <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-2xs space-y-3">
              
              {/* Organization Sector Filter Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#FFF8F9] rounded-xl border border-rose-100">
                <button
                  onClick={() => setFilterSector('all')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition text-center cursor-pointer ${
                    filterSector === 'all'
                      ? 'bg-[#94204D] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-[#94204D]'
                  }`}
                >
                  All ({reports.length})
                </button>
                <button
                  onClick={() => setFilterSector('college')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                    filterSector === 'college'
                      ? 'bg-[#94204D] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-[#94204D]'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>College ({collegeReportsCount})</span>
                </button>
                <button
                  onClick={() => setFilterSector('company')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                    filterSector === 'company'
                      ? 'bg-[#94204D] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-[#94204D]'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Company ({companyReportsCount})</span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Complaints ({filteredReports.length})
                </span>
                <button
                  onClick={() => setPatternOnly(!patternOnly)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition cursor-pointer flex items-center gap-1 ${
                    patternOnly
                      ? 'bg-[#94204D] text-white shadow-2xs'
                      : 'bg-rose-50 text-[#94204D] hover:bg-rose-100'
                  }`}
                >
                  <Activity className="w-3 h-3" />
                  <span>Pattern Flagged Only</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by Case ID, organization, location..."
                  className="w-full pl-9 pr-3 py-2 bg-[#FFF9FA] border border-rose-100 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#94204D]"
                />
              </div>

              {/* Department & Severity Filters */}
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="text-xs bg-white border border-rose-200 rounded-xl px-2.5 py-1.5 text-slate-700 font-medium"
                >
                  <option value="all">All Departments</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="text-xs bg-white border border-rose-200 rounded-xl px-2.5 py-1.5 text-slate-700 font-medium"
                >
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* Scrollable Case List Items */}
            <div className="space-y-3 max-h-[820px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredReports.map((rep) => {
                const isSelected = rep.caseNumber === selectedCaseNumber;
                const hasPattern = rep.patternFlagged || rep.status === 'pattern_alert_triggered';
                const isCollege = rep.organizationType === 'college';
                
                return (
                  <div
                    key={rep.id}
                    onClick={() => setSelectedCaseNumber(rep.caseNumber)}
                    className={`p-4 rounded-2xl border transition-all duration-150 cursor-pointer text-left space-y-2.5 relative ${
                      isSelected
                        ? 'bg-[#FFF9FA] border-[#94204D] shadow-md shadow-[#94204D]/10 ring-1 ring-[#94204D]'
                        : 'bg-white border-rose-100 hover:border-rose-300 hover:shadow-2xs'
                    }`}
                  >
                    {/* Top Row: Case ID, Severity & Mode */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#94204D]">
                          #{rep.caseNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[10px] font-bold uppercase">
                          {rep.mode}
                        </span>
                        {/* Sector Badge */}
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 ${
                          isCollege ? 'bg-amber-50 text-amber-800 border border-amber-200/60' : 'bg-blue-50 text-blue-800 border border-blue-200/60'
                        }`}>
                          {isCollege ? <GraduationCap className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                          <span>{isCollege ? 'College' : 'Company'}</span>
                        </span>
                      </div>
                      {getSeverityBadge(rep.severity)}
                    </div>

                    {/* Organization & Category */}
                    <div>
                      {rep.organizationName && (
                        <p className="text-[11px] font-bold text-slate-500 line-clamp-1 mb-0.5">
                          {rep.organizationName}
                        </p>
                      )}
                      <h4 className="text-xs sm:text-sm font-bold text-[#1E121E] capitalize line-clamp-1">
                        {rep.category.replace(/_/g, ' ')}
                      </h4>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#94204D] shrink-0" />
                        <span className="truncate">{rep.department}</span>
                      </p>
                    </div>

                    {/* Short Narrative Snippet */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {rep.narrative}
                    </p>

                    {/* Pattern Signal Alert Tag (if applicable) */}
                    {hasPattern && (
                      <div className="px-2.5 py-1 rounded-xl bg-[#FDF0F3] border border-[#FADCE2] flex items-center justify-between text-[11px] text-[#94204D] font-bold">
                        <div className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-[#94204D]" />
                          <span>Pattern Alert Triggered</span>
                        </div>
                        <span className="text-[10px] font-semibold underline">Correlated</span>
                      </div>
                    )}

                    {/* Bottom Status & Timestamp */}
                    <div className="pt-2 border-t border-rose-100/70 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Filed: {formatDate(rep.createdAt)}</span>
                      {getStatusBadge(rep.status)}
                    </div>
                  </div>
                );
              })}

              {filteredReports.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-rose-100 p-6 space-y-2">
                  <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-bold text-slate-600">No cases match your filters</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilterDepartment('all');
                      setFilterSeverity('all');
                      setFilterStatus('all');
                      setPatternOnly(false);
                    }}
                    className="text-xs text-[#94204D] font-bold hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: DETAILED CASE DOSSIER & INVESTIGATION VIEW (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {selectedReport ? (
              <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-rose-100 shadow-xs space-y-6">
                
                {/* Dossier Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-rose-100">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-xl sm:text-2xl text-[#94204D]">
                        Case Dossier #{selectedReport.caseNumber}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FDF0F3] text-[#94204D] border border-[#FADCE2]">
                        {selectedReport.mode} Mode
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                        selectedReport.organizationType === 'college'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-blue-50 text-blue-800 border border-blue-200'
                      }`}>
                        {selectedReport.organizationType === 'college' ? (
                          <GraduationCap className="w-3.5 h-3.5" />
                        ) : (
                          <Briefcase className="w-3.5 h-3.5" />
                        )}
                        <span>{selectedReport.organizationType === 'college' ? 'College' : 'Company'}</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      {selectedReport.organizationName && (
                        <>
                          <span className="font-bold text-slate-800">{selectedReport.organizationName}</span>
                          <span>&bull;</span>
                        </>
                      )}
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        Institution: {selectedReport.organizationName || 'Unspecified'}
                      </span>
                      <span>&bull;</span>
                      <span>Filed: {formatDate(selectedReport.createdAt)}</span>
                    </div>
                  </div>

                  {/* Actions Header */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActionStatus(selectedReport.status);
                        setIsActionModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#94204D] hover:bg-[#7D1B41] text-white text-xs font-bold shadow-2xs transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>Take Action / Update</span>
                    </button>
                  </div>
                </div>

                {/* Status and Severity Summary Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-2xl bg-[#FFF9FA] border border-rose-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Status</span>
                    <div className="mt-1">{getStatusBadge(selectedReport.status)}</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FFF9FA] border border-rose-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Severity</span>
                    <div className="mt-1">{getSeverityBadge(selectedReport.severity)}</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FFF9FA] border border-rose-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Category</span>
                    <span className="text-xs font-bold text-slate-800 block mt-1 truncate capitalize">
                      {selectedReport.category.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FFF9FA] border border-rose-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Evidence Files</span>
                    <span className="text-xs font-bold font-mono text-slate-800 block mt-1">
                      {selectedReport.evidenceList.length} Sealed Item(s)
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                    Authorized Reporter Contact
                  </span>
                  <div className="text-sm font-semibold text-emerald-950 mt-1">
                    {selectedReport.reporterEmail || 'Email not provided'}
                  </div>
                  <p className="text-[11px] text-emerald-800 mt-1">
                    Available to authorized ICC officers for case handling. This contact is not included in public case tracking.
                  </p>
                </div>

                {/* PATTERN RADAR ALERT BOX (If Correlated with other cases) */}
                {matchingPattern && (
                  <div className="p-5 rounded-2xl bg-[#FDF0F3] border-2 border-[#FADCE2] space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-[#94204D] text-white flex items-center justify-center shadow-xs">
                          <Activity className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#94204D] block">
                            Pattern Radar Cluster #{matchingPattern.id}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-[#1E121E]">
                            {matchingPattern.title}
                          </h4>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white text-[#94204D] border border-[#FADCE2]">
                        {matchingPattern.confidenceScore}% Overlap
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      {matchingPattern.signals.modusOperandiSnippet}
                    </p>

                    {/* Matched Reports in this cluster */}
                    <div className="space-y-2 pt-2 border-t border-[#FADCE2]">
                      <span className="text-[11px] font-bold uppercase text-slate-500 block">
                        Related Independent Reports ({matchingPattern.matchedReports.length}):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {matchingPattern.matchedReports.map((m) => (
                          <button
                            key={m.caseNumber}
                            onClick={() => setSelectedCaseNumber(m.caseNumber)}
                            className={`p-2.5 rounded-xl border text-left text-xs transition cursor-pointer ${
                              m.caseNumber === selectedReport.caseNumber
                                ? 'bg-[#94204D] text-white border-[#94204D]'
                                : 'bg-white text-slate-800 border-[#FADCE2] hover:border-[#94204D]'
                            }`}
                          >
                            <div className="font-mono font-bold flex items-center justify-between">
                              <span>#{m.caseNumber}</span>
                              <span className="text-[10px] opacity-80">{m.date}</span>
                            </div>
                            <div className="text-[10px] truncate mt-0.5 opacity-90">{m.location}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#94204D]" />
                      <span>{matchingPattern.aiDisclaimer}</span>
                    </div>
                  </div>
                )}

                {/* Incident Narrative Section */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Survivor Incident Narrative (Verbatim Sealed Statement)
                    </h3>
                    <span className="text-[11px] font-medium text-slate-500">
                      Occurred on: {selectedReport.incidentDate} {selectedReport.incidentTime ? `at ${selectedReport.incidentTime}` : ''}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FFF9FA] border border-rose-100 text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {selectedReport.narrative}
                  </div>
                </div>

                {/* Location & Person Description Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-rose-100 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Incident Location &amp; Spot
                    </span>
                    <div className="text-xs font-bold text-slate-900">{selectedReport.location}</div>
                    <div className="text-xs text-slate-600">{selectedReport.specificRoomOrSpot}</div>
                    <div className="text-[11px] text-slate-500">
                      Department: <strong className="text-slate-700">{selectedReport.department}</strong>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-rose-100 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Involved Role / Person Description
                    </span>
                    <div className="text-xs font-bold text-slate-900">
                      {selectedReport.personDescription.roleOrTitle || 'Unspecified Title'}
                    </div>
                    <div className="text-xs text-slate-600">
                      {selectedReport.personDescription.aliasOrName || 'Identity masked in confidential intake'}
                    </div>
                    {selectedReport.personDescription.identifyingDetails && (
                      <div className="text-[11px] text-slate-500">
                        Details: {selectedReport.personDescription.identifyingDetails}
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Structured Extraction (Assistive Signals for Reviewer) */}
                {selectedReport.structuredSummary && (
                  <div className="p-4 rounded-2xl bg-[#FDF0F3]/60 border border-[#FADCE2] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#94204D]" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#94204D]">
                          AI Signal Extraction &bull; Assistive Summary
                        </h4>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500">Requires Human Review</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="font-bold text-slate-700 block mb-1">Key Extracted Points:</span>
                        <ul className="space-y-1 list-disc list-inside text-slate-600">
                          {selectedReport.structuredSummary.keyIncidentPoints.map((pt, i) => (
                            <li key={i}>{pt}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-bold text-slate-700 block mb-1">Risk Indicators Flagged:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedReport.structuredSummary.riskSignalsDetected.map((sig, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md bg-white text-[#94204D] border border-[#FADCE2] text-[10px] font-semibold"
                            >
                              {sig}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Evidence Dossier Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Evidence Vault Dossier ({selectedReport.evidenceList.length} Files Sealed)
                    </h3>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      EXIF Metadata Stripped &amp; Encrypted
                    </span>
                  </div>

                  <div className="space-y-2">
                    {selectedReport.evidenceList.map((file) => (
                      <div
                        key={file.id}
                        className="p-3.5 rounded-2xl bg-white border border-rose-100 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#94204D] shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 block truncate">{file.fileName}</span>
                            <span className="text-[11px] text-slate-500 font-mono">
                              {file.fileType} &bull; {file.fileSize} &bull; {file.encryptedHash.substring(0, 24)}...
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                            Verified Hash
                          </span>
                          <button
                            type="button"
                            onClick={() => handleEvidenceAccess(file.id, false)}
                            disabled={activeEvidenceId === file.id}
                            className="px-2.5 py-1 rounded-lg border border-slate-300 text-slate-700 font-bold text-[10px] hover:border-[#94204D] hover:text-[#94204D] disabled:opacity-50"
                          >
                            <Eye className="w-3 h-3 inline mr-1" />View Evidence
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEvidenceAccess(file.id, true)}
                            disabled={activeEvidenceId === file.id}
                            className="px-2.5 py-1 rounded-lg bg-[#94204D] text-white font-bold text-[10px] hover:bg-[#7D1B41] disabled:opacity-50"
                          >
                            <Download className="w-3 h-3 inline mr-1" />Download Evidence
                          </button>
                        </div>
                      </div>
                    ))}

                    {selectedReport.evidenceList.length === 0 && (
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                        No external attachments uploaded with this initial statement.
                      </div>
                    )}
                  </div>
                </div>

                {/* Retaliation Shield Status */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                      <ShieldAlert className="w-4 h-4 text-[#94204D]" />
                      <span>Retaliation Shield Protection Status</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {selectedReport.retaliationShieldEnabled ? 'Active Weekly Monitoring' : 'Disabled by Reporter'}
                    </span>
                  </div>
                  <p className="text-slate-600">
                    Frequency: <strong>{selectedReport.checkInFrequency}</strong> check-ins. If survivor reports new intimidation or unsafe conditions, the case is automatically escalated.
                  </p>
                  {selectedReport.checkIns.length > 0 && (
                    <div className="space-y-1 pt-2 border-t border-slate-200">
                      <span className="font-bold text-slate-700 block text-[11px]">Latest Check-In Response:</span>
                      {selectedReport.checkIns.map((chk) => (
                        <div key={chk.id} className="text-[11px] text-slate-600 flex items-center justify-between">
                          <span>{chk.date}: {chk.response === 'all_ok' ? 'Survivor confirmed feeling safe' : chk.response}</span>
                          <span className="font-mono text-emerald-600 font-bold">✓ Logged</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Case Timeline & Audit Log */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Verified Cryptographic Audit Trail
                  </h3>
                  <div className="space-y-3 relative pl-6 border-l-2 border-rose-100">
                    {selectedReport.timeline.map((event) => (
                      <div key={event.id} className="relative space-y-1">
                        <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#94204D] border-2 border-white" />
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">{event.title}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{event.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviewer Notes (if any) */}
                {selectedReport.reviewerNotes && selectedReport.reviewerNotes.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-rose-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Confidential ICC Review Notes
                    </h4>
                    <div className="space-y-2">
                      {selectedReport.reviewerNotes.map((note, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                          <div className="flex items-center justify-between font-bold text-slate-700 text-[11px]">
                            <span>{note.author}</span>
                            <span className="text-slate-400 font-normal">{formatDate(note.timestamp)}</span>
                          </div>
                          <p className="text-slate-600">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-[32px] p-12 text-center border border-rose-100 space-y-3">
                <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-slate-700">
                  {reports.length === 0 ? 'No Incident Reports Logged' : 'No Case Selected'}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {reports.length === 0
                    ? 'No incident reports have been submitted to this institutional committee yet. Reports registered by students, faculty, or staff will appear here in real time.'
                    : 'Select a case dossier from the list on the left to review facts and evidence.'}
                </p>
              </div>
            )}
          </div>
        </div>

      {/* 4. ACTION / STATUS UPDATE MODAL */}
      {isActionModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-lg w-full p-6 sm:p-8 border border-rose-100 shadow-xl space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#94204D]">
                  Case #{selectedReport.caseNumber} Review
                </span>
                <h3 className="text-xl font-bold font-display-styled text-[#1E121E]">
                  Update Investigation Status
                </h3>
              </div>
              <button
                onClick={() => setIsActionModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Select New Investigation Status:
                </label>
                <select
                  value={actionStatus}
                  onChange={(e) => setActionStatus(e.target.value as CaseStatus)}
                  className="w-full px-3 py-2.5 bg-[#FFF9FA] border border-rose-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#94204D]"
                >
                  <option value="under_investigation">Under Formal Investigation (ICC Inquiry)</option>
                  <option value="evidence_locked">Evidence Sealed / Preserved in Vault</option>
                  <option value="pattern_alert_triggered">Pattern Alert Triggered (Multi-Report)</option>
                  <option value="escalated_external">Escalate to Neutral External Ombudsman</option>
                  <option value="action_taken">Corrective Disciplinary Action Enforced</option>
                  <option value="closed">Case Inquiry Concluded &amp; Closed</option>
                </select>
              </div>

              {actionStatus === 'escalated_external' && (
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
                  <label className="text-xs font-bold text-purple-900 block">
                    Escalation Authority:
                  </label>
                  <select
                    value={escalationTarget}
                    onChange={(e) => setEscalationTarget(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-purple-200 rounded-lg text-xs text-purple-900 font-medium"
                  >
                    <option value="external_ombudsman">Independent Civil Rights Ombudsman</option>
                    <option value="state_human_rights">State Human Rights Commission Liaison</option>
                    <option value="independent_legal_counsel">Independent External Legal Counsel Panel</option>
                  </select>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Confidential Reviewer Audit Note:
                </label>
                <textarea
                  value={actionNote}
                  onChange={(e) => setActionNote(e.target.value)}
                  rows={3}
                  placeholder="Record justification, steps taken, or committee resolution details..."
                  className="w-full p-3 bg-[#FFF9FA] border border-rose-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#94204D]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-rose-100">
              <button
                onClick={() => setIsActionModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyStatusChange}
                className="px-5 py-2 rounded-xl bg-[#94204D] hover:bg-[#7D1B41] text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                Apply Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
