import React, { useState } from 'react';
import {
  Building2,
  Search,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  ChevronRight,
  Scale,
  Info,
  Lock,
  FileText,
} from 'lucide-react';
import { InstitutionItem } from '../../types';
import { MOCK_INSTITUTIONS } from '../../data/mockData';

interface InstitutionsDirectoryProps {
  onSelectInstitutionReport?: (institutionName: string) => void;
  onNavigateToIccPortal?: () => void;
}

export const InstitutionsDirectory: React.FC<InstitutionsDirectoryProps> = ({
  onSelectInstitutionReport,
  onNavigateToIccPortal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedIccStatus, setSelectedIccStatus] = useState<string>('All');
  const [activeInstitutionModal, setActiveInstitutionModal] = useState<InstitutionItem | null>(null);

  const institutionTypes = ['All', 'University', 'Medical / Health', 'Polytechnic', 'Research Institute', 'College'];
  const iccStatusFilters = ['All', 'Active Statutory ICC', 'Compliance Certified', 'Independent Panel', '24/7 Intake Board'];

  const filteredInstitutions = MOCK_INSTITUTIONS.filter((inst) => {
    const matchesSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.designatedContact.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'All' || inst.type === selectedType;
    const matchesIccStatus = selectedIccStatus === 'All' || inst.iccStatus === selectedIccStatus;

    return matchesSearch && matchesType && matchesIccStatus;
  });

  const totalActiveCases = MOCK_INSTITUTIONS.reduce((acc, curr) => acc + curr.activeCasesCount, 0);
  const totalResolvedCases = MOCK_INSTITUTIONS.reduce((acc, curr) => acc + curr.resolvedCasesCount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      {/* Top Header - Concise & Direct */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100/90 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#94204D] font-mono">
              Campus &amp; Workplace Directory
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-display-styled text-[#1E121E] tracking-tight">
              Participating Institutions &amp; ICC Boards
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Find your institution's authorized Internal Complaints Committee (ICC) to submit protected reports or connect with presiding officers.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
            <div className="px-5 py-3 rounded-2xl bg-[#FFF8F9] border border-rose-100 text-center">
              <span className="text-[11px] text-slate-500 block font-bold uppercase tracking-wider font-mono">
                Partners
              </span>
              <span className="text-2xl font-bold font-mono text-[#94204D]">
                {MOCK_INSTITUTIONS.length}
              </span>
            </div>

            <div className="px-5 py-3 rounded-2xl bg-[#FFF8F9] border border-rose-100 text-center">
              <span className="text-[11px] text-slate-500 block font-bold uppercase tracking-wider font-mono">
                Under Review
              </span>
              <span className="text-2xl font-bold font-mono text-slate-900">
                {totalActiveCases}
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1 px-5 py-3 rounded-2xl bg-[#FFF8F9] border border-rose-100 text-center">
              <span className="text-[11px] text-slate-500 block font-bold uppercase tracking-wider font-mono">
                Resolved
              </span>
              <span className="text-2xl font-bold font-mono text-slate-900">
                {totalResolvedCases}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by institution name, location, or presiding officer..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FFF9FA] border border-rose-100 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#94204D]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full md:w-auto px-3 py-2 bg-white border border-rose-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#94204D]"
            >
              {institutionTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'All' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Simplified Institutions Grid: Answers 4 core questions at a glance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredInstitutions.map((inst) => (
          <div
            key={inst.id}
            className="bg-white rounded-[24px] p-5 border border-rose-100/90 shadow-2xs hover:shadow-md hover:border-[#94204D]/30 transition-all duration-200 flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              {/* Q1: Which Institution & Type */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#FDF0F3] border border-[#FADCE2] flex items-center justify-center font-mono font-bold text-xs text-[#94204D]">
                    {inst.shortCode}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#1E121E] font-display-styled leading-snug group-hover:text-[#94204D] transition-colors">
                      {inst.name}
                    </h3>
                    <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#94204D]" />
                      {inst.location} &bull; <span className="font-semibold text-slate-600">{inst.type}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Q2: Who is Responsible (ICC Presiding Officer & Role) */}
              <div className="p-3 rounded-xl bg-[#FFF9FA] border border-rose-100/80 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  ICC Presiding Officer
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {inst.designatedContact.name}
                </div>
                <div className="text-[11px] text-slate-600">
                  {inst.designatedContact.role}
                </div>
              </div>

              {/* Q3: Current Status & Active Cases */}
              <div className="flex items-center justify-between text-xs px-2">
                <span className="text-slate-500 font-medium">Active Cases Under Review:</span>
                <span className="font-mono font-bold text-[#94204D] bg-[#FDF0F3] px-2 py-0.5 rounded-full border border-[#FADCE2]">
                  {inst.activeCasesCount} active
                </span>
              </div>
            </div>

            {/* Q4: Where Can I Report / View Details (Action Buttons) */}
            <div className="pt-2 border-t border-rose-100 flex items-center gap-2">
              <button
                onClick={() => setActiveInstitutionModal(inst)}
                className="flex-1 py-2 px-3 rounded-xl bg-[#FDF0F3] hover:bg-[#FCECEF] text-[#94204D] text-xs font-bold border border-[#FADCE2] transition cursor-pointer flex items-center justify-center gap-1"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Details</span>
              </button>

              <button
                onClick={() => {
                  if (onSelectInstitutionReport) {
                    onSelectInstitutionReport(inst.name);
                  }
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-[#94204D] hover:bg-[#7D1B41] text-white text-xs font-bold shadow-2xs transition cursor-pointer flex items-center justify-center gap-1"
              >
                <span>Report Here</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredInstitutions.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-rose-100 p-6 space-y-2">
          <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No matching institutions found</h3>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('All');
              setSelectedIccStatus('All');
            }}
            className="mt-2 px-4 py-1.5 bg-[#94204D] text-white text-xs font-bold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Institution Detail Modal */}
      {activeInstitutionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[28px] max-w-xl w-full p-6 sm:p-7 border border-rose-100 shadow-xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveInstitutionModal(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer text-xs"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF0F3] border border-[#FADCE2] flex items-center justify-center font-mono font-bold text-base text-[#94204D] shrink-0">
                {activeInstitutionModal.shortCode}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#94204D]">
                  {activeInstitutionModal.type}
                </span>
                <h2 className="text-lg sm:text-xl font-bold font-display-styled text-[#1E121E]">
                  {activeInstitutionModal.name}
                </h2>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#94204D]" />
                  <span>{activeInstitutionModal.location}</span>
                </p>
              </div>
            </div>

            {/* ICC Authority Contact */}
            <div className="p-4 rounded-2xl bg-[#FFF9FA] border border-rose-100 space-y-2 text-xs">
              <div className="font-bold text-slate-800 text-sm">
                {activeInstitutionModal.designatedContact.name}
              </div>
              <div className="text-slate-600">
                <strong>Role:</strong> {activeInstitutionModal.designatedContact.role}
              </div>
              <div className="text-slate-600">
                <strong>Official Email:</strong> <span className="font-mono">{activeInstitutionModal.designatedContact.emailDomain}</span>
              </div>
              <div className="text-slate-600">
                <strong>ICC Committee Status:</strong> <span className="font-semibold text-emerald-700">{activeInstitutionModal.iccStatus}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-rose-100">
              <button
                onClick={() => setActiveInstitutionModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const instName = activeInstitutionModal.name;
                  setActiveInstitutionModal(null);
                  if (onSelectInstitutionReport) {
                    onSelectInstitutionReport(instName);
                  }
                }}
                className="px-5 py-2 rounded-xl bg-[#94204D] hover:bg-[#7D1B41] text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1"
              >
                <span>Report Here</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
