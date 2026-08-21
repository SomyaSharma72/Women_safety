import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { QuickExitOverlay } from './components/QuickExitOverlay';
import { HeroSection } from './components/landing/HeroSection';
import { SaferPathSection } from './components/landing/SaferPathSection';
import { TheProblemSection } from './components/landing/TheProblemSection';
import { SosVsSafeReport, ModesComparisonSection } from './components/landing/SosVsSafeReport';
import { HowItWorksSection } from './components/landing/HowItWorksSection';
import { AnonymousVerificationSection } from './components/landing/AnonymousVerificationSection';
import { EvidenceSecuritySection } from './components/landing/EvidenceSecuritySection';
import { PatternHighlightSection } from './components/landing/PatternHighlightSection';
import { RetaliationCheckInSection } from './components/landing/RetaliationCheckInSection';
import { FinalCtaSection } from './components/landing/FinalCtaSection';
import { ReportWizard } from './components/report/ReportWizard';
import { CaseTrackerView } from './components/tracker/CaseTrackerView';
import { AuthorityDashboard } from './components/authority/AuthorityDashboard';
import { KillerDemoModal } from './components/demo/KillerDemoModal';
import { Footer } from './components/Footer';
import { INITIAL_REPORTS, PATTERN_ALERTS } from './data/mockData';
import { IncidentReport, ReportingMode, CaseStatus } from './types';

export default function App() {
  const [reports, setReports] = useState<IncidentReport[]>(INITIAL_REPORTS);
  const [activeTab, setActiveTab] = useState<'home' | 'report' | 'track' | 'authority'>('home');
  const [selectedWizardMode, setSelectedWizardMode] = useState<ReportingMode>('ANONYMOUS');
  const [trackerCaseNumber, setTrackerCaseNumber] = useState<string>('R-2841');

  // Overlays
  const [isQuickExitOpen, setIsQuickExitOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Global ESC key listener for Quick Exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsQuickExitOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle report submission
  const handleReportCreated = (newReport: IncidentReport) => {
    setReports([newReport, ...reports]);
    setTrackerCaseNumber(newReport.caseNumber);
    setActiveTab('track');
  };

  // Handle updates to existing reports (retaliation check-ins, follow-up notes)
  const handleUpdateReport = (updatedReport: IncidentReport) => {
    setReports(reports.map((r) => (r.caseNumber === updatedReport.caseNumber ? updatedReport : r)));
  };

  // Handle Reviewer status updates from Authority Dashboard
  const handleUpdateStatus = (caseNumber: string, newStatus: CaseStatus, note: string) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.caseNumber === caseNumber) {
          const updatedTimeline = [
            ...r.timeline,
            {
              id: `tm-${Date.now()}`,
              timestamp: 'Just now',
              title: `Status Changed: ${newStatus.replace('_', ' ')}`,
              description: note,
              actor: 'authorized_reviewer' as const,
              badgeType: (newStatus === 'escalated_external' ? 'warning' : 'success') as any,
            },
          ];

          return {
            ...r,
            status: newStatus,
            timeline: updatedTimeline,
            reviewerNotes: [
              ...(r.reviewerNotes || []),
              {
                author: 'Authorized Reviewer (ICC)',
                timestamp: new Date().toISOString(),
                content: note,
                confidential: true,
              },
            ],
          };
        }
        return r;
      })
    );
  };

  // Quick navigation handlers
  const handleStartReportWithMode = (mode: ReportingMode) => {
    setSelectedWizardMode(mode);
    setActiveTab('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCaseFromRadar = (caseNumber: string) => {
    setTrackerCaseNumber(caseNumber);
    setActiveTab('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDemoJump = (tab: 'home' | 'report' | 'track' | 'authority', caseNum?: string) => {
    setActiveTab(tab);
    if (caseNum) {
      setTrackerCaseNumber(caseNum);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-teal-200 selection:text-teal-900 font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(t) => {
          setActiveTab(t);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDemo={() => setIsDemoModalOpen(true)}
        onTriggerQuickExit={() => setIsQuickExitOpen(true)}
        activeCaseCount={reports.length}
        patternAlertCount={PATTERN_ALERTS.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: LANDING & STORYTELLING */}
        {activeTab === 'home' && (
          <div>
            {/* 1. Hero Section */}
            <HeroSection
              onStartReport={() => handleStartReportWithMode('ANONYMOUS')}
              onViewRadar={() => {
                setActiveTab('authority');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenDemo={() => setIsDemoModalOpen(true)}
            />

            {/* 2. A Safer Path from Experience to Action & Not Ready Banner */}
            <SaferPathSection
              onStartReport={() => handleStartReportWithMode('ANONYMOUS')}
              onTrackCase={() => {
                setActiveTab('track');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewInstitutions={() => {
                setActiveTab('authority');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenDemo={() => setIsDemoModalOpen(true)}
              onHowItWorks={() => {
                const el = document.getElementById('how-it-works-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: 900, behavior: 'smooth' });
                }
              }}
            />

            {/* 3. The Problem Section */}
            <TheProblemSection />

            {/* 3. SOS vs SafeReport Paradigm */}
            <SosVsSafeReport
              onStartReport={() => handleStartReportWithMode('ANONYMOUS')}
            />

            {/* 4. How It Works (3 Steps + Visual Character Illustrations) */}
            <HowItWorksSection
              onStartReportWithMode={handleStartReportWithMode}
            />

            {/* 5. Anonymous Verification & AI Due Process */}
            <AnonymousVerificationSection />

            {/* 6. Evidence Security Vault */}
            <EvidenceSecuritySection />

            {/* 7. Multi-Report Pattern Highlight & Radar */}
            <PatternHighlightSection
              onExploreRadar={() => {
                setActiveTab('authority');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 8. Retaliation Check-In & Post-Report Care */}
            <RetaliationCheckInSection
              onNavigateToTracker={() => {
                setActiveTab('track');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 9. Final Empowering Call to Action */}
            <FinalCtaSection
              onStartReport={() => handleStartReportWithMode('ANONYMOUS')}
              onViewRadar={() => {
                setActiveTab('authority');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* VIEW 2: REPORT INCIDENT WIZARD */}
        {activeTab === 'report' && (
          <ReportWizard
            initialMode={selectedWizardMode}
            onSubmitSuccess={handleReportCreated}
            onCancel={() => setActiveTab('home')}
          />
        )}

        {/* VIEW 3: TRACK CASE & RETALIATION CHECK-IN */}
        {activeTab === 'track' && (
          <CaseTrackerView
            reports={reports}
            initialCaseNumber={trackerCaseNumber}
            onUpdateReport={handleUpdateReport}
          />
        )}

        {/* VIEW 4: AUTHORIZED REVIEWER & PATTERN RADAR */}
        {activeTab === 'authority' && (
          <AuthorityDashboard
            reports={reports}
            onSelectCase={handleSelectCaseFromRadar}
            onUpdateReportStatus={handleUpdateStatus}
          />
        )}
      </main>

      {/* 90-Second Killer Demo Walkthrough Modal */}
      <KillerDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onJumpToTab={handleDemoJump}
      />

      {/* Quick Escape Privacy Overlay */}
      <QuickExitOverlay
        isOpen={isQuickExitOpen}
        onClose={() => setIsQuickExitOpen(false)}
      />

      {/* Footer */}
      <Footer
        onStartReport={() => handleStartReportWithMode('ANONYMOUS')}
        onViewRadar={() => {
          setActiveTab('authority');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onTriggerQuickExit={() => setIsQuickExitOpen(true)}
      />
    </div>
  );
}
