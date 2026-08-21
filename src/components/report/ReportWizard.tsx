import React, { useState } from 'react';
import {
  Shield,
  Lock,
  UserX,
  UserCheck,
  FileText,
  Calendar,
  Clock,
  MapPin,
  Building,
  Upload,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  EyeOff,
  Radio,
  ArrowRight,
  ArrowLeft,
  Trash2,
  FileCheck,
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  ReportingMode,
  IncidentCategory,
  IncidentReport,
  EvidenceItem,
} from '../../types';
import {
  DEPARTMENTS,
  CATEGORIES_METADATA,
} from '../../data/mockData';
import {
  generateCaseNumber,
  generatePasskey,
  generateMockHash,
} from '../../lib/utils';

interface ReportWizardProps {
  initialMode?: ReportingMode;
  onSubmitSuccess: (newReport: IncidentReport) => void;
  onCancel: () => void;
}

export const ReportWizard: React.FC<ReportWizardProps> = ({
  initialMode = 'ANONYMOUS',
  onSubmitSuccess,
  onCancel,
}) => {
  // Wizard Step: 1 (Mode) -> 2 (Details) -> 3 (Evidence) -> 4 (Protection) -> 5 (Confirmation)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [mode, setMode] = useState<ReportingMode>(initialMode);
  const [institutionalEmail, setInstitutionalEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(true); // Pre-verified demo

  // Identified mode contact details
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');

  // Incident specifics
  const [category, setCategory] = useState<IncidentCategory>('verbal_harassment');
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().split('T')[0]);
  const [incidentTime, setIncidentTime] = useState('17:30');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [location, setLocation] = useState('Turing Hall, 3rd Floor');
  const [specificRoomOrSpot, setSpecificRoomOrSpot] = useState('Advanced Systems Lab 3 (Workstations 12-16)');
  const [isRecurring, setIsRecurring] = useState(false);
  const [estimatedOccurrences, setEstimatedOccurrences] = useState(1);

  // Narrative & Person
  const [narrative, setNarrative] = useState(
    'During practical hours, the lab coordinator approached my desk multiple times, made unsolicited personal comments about my appearance, and blocked the walkway when I attempted to leave for the evening.'
  );
  const [personRole, setPersonRole] = useState('Lab Coordinator / Teaching Assistant');
  const [personDetails, setPersonDetails] = useState('Responsible for Friday evening lab batches');

  // AI structuring assistant
  const [isAiStructuring, setIsAiStructuring] = useState(false);
  const [aiStructuredPoints, setAiStructuredPoints] = useState<string[]>([
    'Repeated unsolicited comments during lab hours',
    'Obstruction of doorway/corridor exit',
    'Exploitation of academic supervision authority',
  ]);

  // Evidence files
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([
    {
      id: 'ev-demo-1',
      fileName: 'chat_screenshot_redacted.png',
      fileType: 'image',
      fileSize: '1.4 MB',
      uploadedAt: new Date().toISOString(),
      metadataStripped: true,
      encryptedHash: generateMockHash('screenshot_redacted_evidence'),
      description: 'Exported chat screenshot with sensitive names stripped.',
    },
  ]);

  // Retaliation & Escalation
  const [retaliationShieldEnabled, setRetaliationShieldEnabled] = useState(true);
  const [checkInFrequency, setCheckInFrequency] = useState<'weekly' | 'biweekly' | 'on_status_change'>('weekly');
  const [neutralEscalationRequested, setNeutralEscalationRequested] = useState(false);
  const [neutralEscalationTarget, setNeutralEscalationTarget] = useState<
    'state_human_rights' | 'external_ombudsman' | 'independent_legal_counsel'
  >('external_ombudsman');

  // Final Generated Report info
  const [generatedReport, setGeneratedReport] = useState<IncidentReport | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  // AI Structuring simulation
  const handleAiStructure = () => {
    setIsAiStructuring(true);
    setTimeout(() => {
      setIsAiStructuring(false);
      setAiStructuredPoints([
        'Chronological breakdown: Workplace/study setting',
        'Physical restriction of movement identified',
        'Power dynamic: Supervisor / Evaluator role noted',
      ]);
    }, 600);
  };

  // Add dummy evidence file
  const handleAddSampleEvidence = (type: 'image' | 'audio' | 'document') => {
    const newEv: EvidenceItem = {
      id: `ev-${Date.now()}`,
      fileName:
        type === 'image'
          ? `security_corridor_photo_${Date.now().toString().slice(-4)}.jpg`
          : type === 'audio'
          ? `voice_note_record_${Date.now().toString().slice(-4)}.m4a`
          : `incident_notes_timeline_${Date.now().toString().slice(-4)}.pdf`,
      fileType: type,
      fileSize: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
      uploadedAt: new Date().toISOString(),
      metadataStripped: true,
      encryptedHash: generateMockHash(Date.now().toString()),
      description: 'EXIF metadata purged; AES-256 encrypted payload.',
    };
    setEvidenceList([...evidenceList, newEv]);
  };

  const handleRemoveEvidence = (id: string) => {
    setEvidenceList(evidenceList.filter((e) => e.id !== id));
  };

  // Final Submit
  const handleSubmitReport = () => {
    const caseNum = generateCaseNumber();
    const passkey = generatePasskey();

    const newReport: IncidentReport = {
      id: `rep-${Date.now()}`,
      caseNumber: caseNum,
      passkey: passkey,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      mode: mode,
      isVerifiedInstitutionalUser: true,
      institutionDomain: '@campus.edu',
      reporterContactEncrypted:
        mode === 'CONFIDENTIAL'
          ? 'AES-GCM-256 [Escrow Key Locked]'
          : mode === 'IDENTIFIED'
          ? `${reporterName} (${reporterPhone || 'Verified'})`
          : undefined,
      category: category,
      incidentDate: incidentDate,
      incidentTime: incidentTime,
      department: department,
      location: location,
      specificRoomOrSpot: specificRoomOrSpot,
      isRecurring: isRecurring,
      estimatedOccurrences: isRecurring ? estimatedOccurrences : 1,
      narrative: narrative,
      personDescription: {
        roleOrTitle: personRole,
        aliasOrName: personDetails,
        department: department,
        identifyingDetails: 'Contextual identifiers supplied by reporter',
      },
      structuredSummary: {
        keyIncidentPoints: aiStructuredPoints,
        extractedLocations: [location, specificRoomOrSpot],
        involvedRoleCategories: [personRole],
        riskSignalsDetected: ['Power hierarchy', 'Corridor obstruction'],
      },
      evidenceList: evidenceList,
      retaliationShieldEnabled: retaliationShieldEnabled,
      checkInFrequency: checkInFrequency,
      checkIns: retaliationShieldEnabled
        ? [
            {
              id: `chk-${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              status: 'pending',
            },
          ]
        : [],
      status: 'submitted',
      neutralEscalationRequested: neutralEscalationRequested,
      neutralEscalationTarget: neutralEscalationRequested ? neutralEscalationTarget : undefined,
      timeline: [
        {
          id: `tm-${Date.now()}-1`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: `Report Filed (${mode} Mode)`,
          description: `Cryptographic passkey generated. Institutional ID verified.`,
          actor: 'reporter',
          badgeType: 'info',
        },
        {
          id: `tm-${Date.now()}-2`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: 'Evidence Locked into Vault',
          description: `${evidenceList.length} attachment(s) encrypted with zero metadata.`,
          actor: 'system',
          badgeType: 'success',
        },
      ],
    };

    setGeneratedReport(newReport);
    setCurrentStep(5);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#94204D', '#FDA4AF', '#FDF0F3', '#1E121E'],
      });
    } catch {
      // ignore
    }
  };

  const handleCopyPasskey = () => {
    if (generatedReport?.passkey) {
      navigator.clipboard.writeText(`${generatedReport.caseNumber} / ${generatedReport.passkey}`);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Wizard Header / Steps Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#94204D]">
              Safe &amp; Empathetic Reporting
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E121E] font-display-styled">
              Document &amp; Report Harassment
            </h2>
          </div>
          {currentStep < 5 && (
            <button
              onClick={onCancel}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3.5 py-1.5 rounded-xl border border-rose-100 bg-white transition cursor-pointer"
            >
              Cancel &amp; Exit
            </button>
          )}
        </div>

        {/* Progress Bar */}
        {currentStep < 5 && (
          <div className="grid grid-cols-4 gap-2 pt-2">
            {[
              { num: 1, label: '1. Privacy Mode' },
              { num: 2, label: '2. Incident Facts' },
              { num: 3, label: '3. Evidence Vault' },
              { num: 4, label: '4. Protection' },
            ].map((step) => (
              <div key={step.num} className="space-y-1.5">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentStep >= step.num ? 'bg-[#94204D]' : 'bg-rose-100'
                  }`}
                />
                <span
                  className={`text-[11px] font-semibold block truncate ${
                    currentStep === step.num
                      ? 'text-[#94204D] font-bold'
                      : currentStep > step.num
                      ? 'text-slate-600'
                      : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* STEP 1: CHOOSE PRIVACY MODE */}
      {currentStep === 1 && (
        <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-rose-100 shadow-2xs space-y-6">
          <div>
            <h3 className="text-xl font-bold text-[#1E121E] font-display-styled">
              Step 1: Choose Your Privacy Level
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              You maintain total control over your identity. Reviewers will only receive what you authorize.
            </p>
          </div>

          {/* 3 Mode Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Anonymous */}
            <div
              onClick={() => setMode('ANONYMOUS')}
              className={`p-5 rounded-[24px] border-2 transition-all cursor-pointer flex flex-col justify-between ${
                mode === 'ANONYMOUS'
                  ? 'border-[#94204D] bg-[#FDF0F3] shadow-xs ring-2 ring-[#94204D]/10'
                  : 'border-rose-100 hover:border-rose-300 bg-white'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#FDF0F3] text-[#94204D] flex items-center justify-center">
                    <UserX className="w-5 h-5" />
                  </div>
                  {mode === 'ANONYMOUS' && (
                    <span className="w-3 h-3 rounded-full bg-[#94204D]" />
                  )}
                </div>
                <h4 className="font-bold text-slate-900 text-base font-display-styled">Anonymous</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Identity protected from reviewers. Only the incident narrative and location are logged for pattern correlation.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-200 text-[11px] text-[#94204D] font-bold">
                ✓ Zero reviewer exposure
              </div>
            </div>

            {/* Confidential */}
            <div
              onClick={() => setMode('CONFIDENTIAL')}
              className={`p-5 rounded-[24px] border-2 transition-all cursor-pointer flex flex-col justify-between ${
                mode === 'CONFIDENTIAL'
                  ? 'border-[#94204D] bg-[#FDF0F3] shadow-xs ring-2 ring-[#94204D]/10'
                  : 'border-rose-100 hover:border-rose-300 bg-white'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#94204D] flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  {mode === 'CONFIDENTIAL' && (
                    <span className="w-3 h-3 rounded-full bg-[#94204D]" />
                  )}
                </div>
                <h4 className="font-bold text-slate-900 text-base font-display-styled">Confidential</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Identity sealed in cryptographic key escrow. Unlocked only if a formal statutory legal committee is authorized.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-200 text-[11px] text-[#94204D] font-bold">
                ✓ Escrow protected
              </div>
            </div>

            {/* Identified */}
            <div
              onClick={() => setMode('IDENTIFIED')}
              className={`p-5 rounded-[24px] border-2 transition-all cursor-pointer flex flex-col justify-between ${
                mode === 'IDENTIFIED'
                  ? 'border-[#94204D] bg-[#FDF0F3] shadow-xs ring-2 ring-[#94204D]/10'
                  : 'border-rose-100 hover:border-rose-300 bg-white'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  {mode === 'IDENTIFIED' && (
                    <span className="w-3 h-3 rounded-full bg-[#94204D]" />
                  )}
                </div>
                <h4 className="font-bold text-slate-900 text-base font-display-styled">Identified</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Full formal disclosure for direct committee hearings, immediate disciplinary summons, and direct contact.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-200 text-[11px] text-pink-900 font-bold">
                ✓ Immediate formal hearing
              </div>
            </div>
          </div>

          {/* Institutional Trust Assurance Box */}
          <div className="p-4 rounded-[20px] bg-[#FFF8F9] border border-rose-200/80 text-xs text-slate-700 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#94204D] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">System-Level Verification Safeguard:</span>
              <p className="mt-0.5 text-slate-600">
                SafeReport checks institutional validity (e.g. <code>@university.edu</code>) at the server layer to discourage spam, but in <strong>Anonymous</strong> mode, the reviewer sees absolutely zero identifying tokens.
              </p>
            </div>
          </div>

          {/* Extra inputs for Identified Mode */}
          {mode === 'IDENTIFIED' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-[20px] bg-slate-50 border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full text-sm p-2.5 rounded-xl border border-slate-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Direct Contact Phone / Email</label>
                <input
                  type="text"
                  value={reporterPhone}
                  onChange={(e) => setReporterPhone(e.target.value)}
                  placeholder="e.g. +1 (555) 234-5678"
                  className="w-full text-sm p-2.5 rounded-xl border border-slate-300 bg-white"
                />
              </div>
            </div>
          )}

          {/* Step 1 Actions */}
          <div className="flex justify-end pt-4 border-t border-rose-100">
            <button
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-2 bg-[#94204D] hover:bg-[#7D1B41] text-white font-semibold text-sm px-6 py-3 rounded-2xl shadow-md shadow-[#94204D]/20 transition cursor-pointer"
            >
              <span>Continue to Incident Facts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: INCIDENT DETAILS & AI STRUCTURING */}
      {currentStep === 2 && (
        <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-rose-100 shadow-2xs space-y-6">
          <div>
            <h3 className="text-xl font-bold text-[#1E121E] font-display-styled">
              Step 2: Incident Facts &amp; Timeline
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Provide factual context. You do not need formal legal phrasing—write naturally.
            </p>
          </div>

          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Primary Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CATEGORIES_METADATA.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as IncidentCategory)}
                  className={`p-3 rounded-xl border text-left transition text-xs flex items-start gap-2.5 cursor-pointer ${
                    category === cat.id
                      ? 'border-[#94204D] bg-[#FDF0F3] text-slate-900 font-semibold ring-1 ring-[#94204D]'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${category === cat.id ? 'bg-[#94204D]' : 'bg-slate-300'}`} />
                  <div>
                    <p className="font-semibold text-slate-900">{cat.label}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{cat.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date, Time & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#94204D]" />
                Date of Incident
              </label>
              <input
                type="date"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                className="w-full text-sm p-2.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#94204D]" />
                Approximate Time
              </label>
              <input
                type="time"
                value={incidentTime}
                onChange={(e) => setIncidentTime(e.target.value)}
                className="w-full text-sm p-2.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#94204D]" />
                Department / Division
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full text-sm p-2.5 rounded-xl border border-slate-300 bg-white"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#94204D]" />
                Building / General Area
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Turing Hall, 3rd Floor"
                className="w-full text-sm p-2.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Specific Room / Spot / Station
              </label>
              <input
                type="text"
                value={specificRoomOrSpot}
                onChange={(e) => setSpecificRoomOrSpot(e.target.value)}
                placeholder="e.g. Lab 3, Workstations 12-16"
                className="w-full text-sm p-2.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>
          </div>

          {/* Recurring check */}
          <div className="p-4 rounded-[20px] bg-[#FFF8F9] border border-rose-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900">Has this happened more than once?</p>
              <p className="text-[11px] text-slate-600">Helps the pattern engine calculate recurrence frequency.</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="rounded text-[#94204D] focus:ring-[#94204D] w-4 h-4"
                />
                <span>Yes, recurring</span>
              </label>
              {isRecurring && (
                <input
                  type="number"
                  min={2}
                  max={20}
                  value={estimatedOccurrences}
                  onChange={(e) => setEstimatedOccurrences(parseInt(e.target.value) || 2)}
                  className="w-16 text-xs p-1 rounded-lg border border-rose-300 text-center bg-white"
                />
              )}
            </div>
          </div>

          {/* Subject / Person info without assuming guilt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-[20px] bg-slate-50 border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Role / Title of Person Involved
              </label>
              <input
                type="text"
                value={personRole}
                onChange={(e) => setPersonRole(e.target.value)}
                placeholder="e.g. Lab Coordinator, Professor, Student, Supervisor"
                className="w-full text-sm p-2 rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Identifying Shift or Context
              </label>
              <input
                type="text"
                value={personDetails}
                onChange={(e) => setPersonDetails(e.target.value)}
                placeholder="e.g. Evening TA in Lab 3"
                className="w-full text-sm p-2 rounded-xl border border-slate-300 bg-white"
              />
            </div>
          </div>

          {/* Statement Narrative & AI Structuring Assistant */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                What Happened (In your own words)
              </label>
              <button
                type="button"
                onClick={handleAiStructure}
                disabled={isAiStructuring}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#94204D] hover:text-[#7D1B41] bg-[#FDF0F3] hover:bg-[#FCECEF] px-3 py-1.5 rounded-xl border border-[#FADCE2] transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#94204D]" />
                <span>{isAiStructuring ? 'Analyzing...' : 'Structure Statement with AI'}</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              className="w-full text-sm p-3.5 rounded-2xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#94204D] focus:border-transparent outline-none"
              placeholder="Describe the incident, words used, actions taken, and how you felt. Take your time..."
            />

            {/* AI Structured summary box */}
            {aiStructuredPoints.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#FDF0F3] border border-[#FADCE2] text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#94204D]" />
                  <span>AI Structured Fact Highlights (Reviewer Aid &bull; Non-Judicial)</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-700 text-[11px] pl-1">
                  {aiStructuredPoints.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-rose-100">
            <button
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-sm font-semibold px-4 py-2.5 rounded-xl border border-slate-200 bg-white cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-2 bg-[#94204D] hover:bg-[#7D1B41] text-white font-semibold text-sm px-6 py-3 rounded-2xl shadow-md shadow-[#94204D]/20 transition cursor-pointer"
            >
              <span>Continue to Evidence Vault</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SECURE EVIDENCE VAULT */}
      {currentStep === 3 && (
        <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-rose-100 shadow-2xs space-y-6">
          <div>
            <h3 className="text-xl font-bold text-[#1E121E] font-display-styled">
              Step 3: Secure Evidence Vault
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Attach screenshots, audio notes, photos, or message exports. Evidence is stored in a separate encrypted partition and stripped of identifying device metadata.
            </p>
          </div>

          {/* Security Banner */}
          <div className="p-4 rounded-[20px] bg-[#1E121E] text-white flex items-start gap-3">
            <Lock className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-white">Automated EXIF &amp; Metadata Scrubbing:</span>
              <p className="mt-0.5 text-slate-300">
                Any uploaded photo or screenshot has its GPS coordinates, phone serial numbers, and camera signatures permanently removed before storage.
              </p>
            </div>
          </div>

          {/* Evidence Upload Zone */}
          <div className="border-2 border-dashed border-rose-200 hover:border-rose-400 bg-[#FFF8F9] rounded-[28px] p-6 text-center space-y-4 transition">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF0F3] text-[#94204D] mx-auto flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                Upload Proof, Screenshots or Audio
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                PNG, JPG, PDF, M4A, MP3 up to 25MB per file
              </p>
            </div>

            {/* Quick Sample Attach Buttons */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => handleAddSampleEvidence('image')}
                className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-white border border-rose-200 hover:border-[#94204D] text-slate-800 shadow-2xs cursor-pointer transition"
              >
                + Add Chat Screenshot
              </button>
              <button
                type="button"
                onClick={() => handleAddSampleEvidence('audio')}
                className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-white border border-rose-200 hover:border-[#94204D] text-slate-800 shadow-2xs cursor-pointer transition"
              >
                + Add Audio Recording
              </button>
              <button
                type="button"
                onClick={() => handleAddSampleEvidence('document')}
                className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-white border border-rose-200 hover:border-[#94204D] text-slate-800 shadow-2xs cursor-pointer transition"
              >
                + Add PDF / Export Note
              </button>
            </div>
          </div>

          {/* Uploaded Items List */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Encrypted Attachments in Vault ({evidenceList.length})
            </p>

            {evidenceList.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FDF0F3] text-[#94204D] flex items-center justify-center font-bold text-xs uppercase">
                    {item.fileType.slice(0, 3)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{item.fileName}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{item.fileSize}</span>
                      <span>&bull;</span>
                      <span className="text-[#94204D] font-semibold flex items-center gap-1">
                        <FileCheck className="w-3 h-3" /> EXIF Scrubbed
                      </span>
                      <span>&bull;</span>
                      <span className="font-mono text-[10px] text-slate-600 truncate max-w-[120px]">
                        {item.encryptedHash}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveEvidence(item.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-rose-100">
            <button
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-sm font-semibold px-4 py-2.5 rounded-xl border border-slate-200 bg-white cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setCurrentStep(4)}
              className="inline-flex items-center gap-2 bg-[#94204D] hover:bg-[#7D1B41] text-white font-semibold text-sm px-6 py-3 rounded-2xl shadow-md shadow-[#94204D]/20 transition cursor-pointer"
            >
              <span>Continue to Protection Settings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: PROTECTION & ESCALATION PREFERENCES */}
      {currentStep === 4 && (
        <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-rose-100 shadow-2xs space-y-6">
          <div>
            <h3 className="text-xl font-bold text-[#1E121E] font-display-styled">
              Step 4: Post-Report Protection &amp; Escalation
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Safety doesn't end at submission. Configure post-report check-ins and neutral escalation routes.
            </p>
          </div>

          {/* Retaliation Check-in Toggle */}
          <div className="p-5 rounded-[24px] bg-[#FFF8F9] border border-rose-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#94204D] text-white flex items-center justify-center shadow-md shadow-[#94204D]/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-display-styled">
                    Enable Scheduled Safety Check-Ins
                  </h4>
                  <p className="text-xs text-slate-600">
                    SafeReport will discreetly check in: <em>"Has anything changed since your report?"</em>
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={retaliationShieldEnabled}
                onChange={(e) => setRetaliationShieldEnabled(e.target.checked)}
                className="w-5 h-5 rounded text-[#94204D] focus:ring-[#94204D]"
              />
            </div>

            {retaliationShieldEnabled && (
              <div className="pt-3 border-t border-rose-200/80 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900">Check-in frequency:</span>
                <select
                  value={checkInFrequency}
                  onChange={(e) => setCheckInFrequency(e.target.value as any)}
                  className="p-1.5 rounded-lg border border-rose-300 bg-white text-xs font-medium"
                >
                  <option value="weekly">Weekly Discreet Check-in</option>
                  <option value="biweekly">Bi-weekly Check-in</option>
                  <option value="on_status_change">Only on Case Status Change</option>
                </select>
              </div>
            )}
          </div>

          {/* Neutral Escalation Body */}
          <div className="p-5 rounded-[24px] bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-display-styled">
                    Neutral External Authority Escalation
                  </h4>
                  <p className="text-xs text-slate-600">
                    If the institution fails to act or faces conflict of interest, route a copy to an external neutral oversight body.
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={neutralEscalationRequested}
                onChange={(e) => setNeutralEscalationRequested(e.target.checked)}
                className="w-5 h-5 rounded text-[#94204D] focus:ring-[#94204D]"
              />
            </div>

            {neutralEscalationRequested && (
              <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
                <span className="font-semibold text-slate-800">Target Neutral Body:</span>
                <select
                  value={neutralEscalationTarget}
                  onChange={(e) => setNeutralEscalationTarget(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs"
                >
                  <option value="external_ombudsman">Independent Campus Ombudsman &amp; Civil Reviewer</option>
                  <option value="state_human_rights">State / Regional Women's Safety Commission</option>
                  <option value="independent_legal_counsel">Designated Legal Aid Pro-Bono Counsel</option>
                </select>
              </div>
            )}
          </div>

          {/* Summary Checklist */}
          <div className="p-5 rounded-[24px] bg-[#1E121E] text-slate-200 text-xs space-y-2">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">
              Ready to Submit Your Report:
            </p>
            <div className="grid grid-cols-2 gap-2 text-slate-300">
              <div>Mode: <strong className="text-rose-200">{mode}</strong></div>
              <div>Dept: <strong className="text-rose-200">{department.split(' ')[0]}...</strong></div>
              <div>Evidence: <strong className="text-rose-200">{evidenceList.length} files</strong></div>
              <div>Safety Check-ins: <strong className="text-rose-300">{retaliationShieldEnabled ? 'Active' : 'Off'}</strong></div>
            </div>
          </div>

          {/* Navigation & Final Submit */}
          <div className="flex items-center justify-between pt-4 border-t border-rose-100">
            <button
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-sm font-semibold px-4 py-2.5 rounded-xl border border-slate-200 bg-white cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleSubmitReport}
              className="inline-flex items-center gap-2 bg-[#94204D] hover:bg-[#7D1B41] text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-xl shadow-[#94204D]/30 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Submit Protected Report</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: SUCCESS & CASE CONFIRMATION */}
      {currentStep === 5 && generatedReport && (
        <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-rose-100 shadow-2xs space-y-8 animate-in fade-in zoom-in duration-300">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-[#FDF0F3] text-[#94204D] mx-auto flex items-center justify-center shadow-lg shadow-[#94204D]/20">
              <CheckCircle className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#94204D] bg-[#FDF0F3] px-3.5 py-1 rounded-full border border-[#FADCE2]">
              Report Cryptographically Sealed
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E121E] font-display-styled">
              Thank you for speaking up. You are safe.
            </h2>
            <p className="text-slate-600 text-sm max-w-lg mx-auto">
              Your incident report has been securely registered in <strong>{generatedReport.mode}</strong> mode. Keep your private credentials below to track updates.
            </p>
          </div>

          {/* Primary Case ID & Key Card */}
          <div className="p-6 rounded-[28px] bg-[#1E121E] text-white shadow-xl relative overflow-hidden border border-[#3D2034]">
            <div className="space-y-4 relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-rose-300">
                  Official Tracking Credentials
                </span>
                <span className="text-xs font-semibold bg-white/10 border border-white/10 px-3 py-0.5 rounded-full text-rose-200">
                  Mode: {generatedReport.mode}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <span className="text-[11px] text-rose-300 uppercase block font-semibold">
                    Case Number
                  </span>
                  <span className="text-2xl font-bold font-mono text-white tracking-wider">
                    {generatedReport.caseNumber}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <span className="text-[11px] text-rose-300 uppercase block font-semibold">
                    Private Recovery Passkey
                  </span>
                  <span className="text-xl font-bold font-mono text-rose-200 tracking-wider">
                    {generatedReport.passkey}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-slate-400">
                  Store this securely. You can check case milestones without creating an account.
                </p>

                <button
                  type="button"
                  onClick={handleCopyPasskey}
                  className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl transition cursor-pointer"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-rose-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey ? 'Copied!' : 'Copy Credentials'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#FFF8F9] border border-rose-100">
              <span className="font-bold text-slate-900 block mb-1">1. Pattern Correlation</span>
              <p className="text-slate-600 text-[11px]">
                Your report is continuously matched with other reports to identify recurring patterns.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFF8F9] border border-rose-100">
              <span className="font-bold text-slate-900 block mb-1">2. Human Review</span>
              <p className="text-slate-600 text-[11px]">
                Authorized panel members review the facts without seeing your identity.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFF8F9] border border-rose-100">
              <span className="font-bold text-slate-900 block mb-1">3. Safety Check-ins</span>
              <p className="text-slate-600 text-[11px]">
                You will receive discreet check-ins to confirm your ongoing safety.
              </p>
            </div>
          </div>

          {/* Action to proceed */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onSubmitSuccess(generatedReport)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#94204D] hover:bg-[#7D1B41] text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-[#94204D]/20 transition cursor-pointer"
            >
              <span>View Case #{generatedReport.caseNumber} in Tracker</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
