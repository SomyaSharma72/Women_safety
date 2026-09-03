import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, MainPortal, SurvivorSubView } from './components/Navbar';
import { QuickExitOverlay } from './components/QuickExitOverlay';
import { HeroSection } from './components/landing/HeroSection';
import { LightPatternMapSection } from './components/landing/LightPatternMapSection';
import { TheProblemSection } from './components/landing/TheProblemSection';
import { PatternHighlightSection } from './components/landing/PatternHighlightSection';
import { HowItWorksSection } from './components/landing/HowItWorksSection';
import { AnonymousVerificationSection } from './components/landing/AnonymousVerificationSection';
import { EvidenceSecuritySection } from './components/landing/EvidenceSecuritySection';
import { RetaliationCheckInSection } from './components/landing/RetaliationCheckInSection';
import { FinalCtaSection } from './components/landing/FinalCtaSection';
import { ReportWizard } from './components/report/ReportWizard';
import { CaseTrackerView } from './components/tracker/CaseTrackerView';
import { AuthorityDashboard } from './components/authority/AuthorityDashboard';
import { IccLoginView } from './components/authority/IccLoginView';
import { InstitutionsDirectory } from './components/institutions/InstitutionsDirectory';
import { KillerDemoModal } from './components/demo/KillerDemoModal';
import { Footer } from './components/Footer';
import { INITIAL_REPORTS, PATTERN_ALERTS } from './data/mockData';
import { IncidentReport, ReportingMode, CaseStatus, IccUser } from './types';
import {
  getIccUser,
  getIccToken,
  iccLogout,
  iccGetCases,
  iccUpdateStatus,
} from './lib/api';

export default function App() {
  const [reports, setReports] = useState<IncidentReport[]>(INITIAL_REPORTS);
  const [currentPortal, setCurrentPortal] = useState<MainPortal>('survivor');
  const [survivorSubView, setSurvivorSubView] = useState<SurvivorSubView>('home');
  const [selectedWizardMode, setSelectedWizardMode] = useState<ReportingMode>('ANONYMOUS');
  const [trackerCaseNumber, setTrackerCaseNumber] = useState<string>('');

  // ICC Authentication State
  const [iccUser, setIccUser] = useState<IccUser | null>(getIccUser());

  // Overlays
  const [isQuickExitOpen, setIsQuickExitOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Fetch ICC Cases when ICC user is active
  const loadIccCases = useCallback(async () => {
    if (!getIccToken()) return;
    try {
      const data = await iccGetCases();
      if (data && Array.isArray(data.reports)) {
        setReports(data.reports);
      }
    } catch {
      // ignore or fallback
    }
  }, []);

  useEffect(() => {
    if (iccUser) {
      loadIccCases();
    }
  }, [iccUser, loadIccCases]);

  // Global ESC key listener for Quick Exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || e.repeat) return;

      e.preventDefault();
      const weatherWindow = window.open('https://weather.com/', '_blank', 'noopener,noreferrer');
      if (!weatherWindow) {
        window.location.assign('https://weather.com/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle report submission
  const handleReportCreated = (newReport: IncidentReport) => {
    setReports([newReport, ...reports]);
    setTrackerCaseNumber(newReport.caseNumber);
    setCurrentPortal('survivor');
    setSurvivorSubView('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle updates to existing reports (retaliation check-ins, follow-up notes)
  const handleUpdateReport = (updatedReport: IncidentReport) => {
    setReports(reports.map((r) => (r.caseNumber === updatedReport.caseNumber ? updatedReport : r)));
  };

  // Handle Reviewer status updates from Authority Dashboard (ICC Portal)
  const handleUpdateStatus = async (caseNumber: string, newStatus: CaseStatus, note: string) => {
    try {
      await iccUpdateStatus(caseNumber, newStatus, note);
    } catch {
      // fallback to optimistic state
    }

    setReports((prev) =>
      prev.map((r) => {
        if (r.caseNumber === caseNumber) {
          const updatedTimeline = [
            ...r.timeline,
            {
              id: `tm-${Date.now()}`,
              timestamp: 'Just now',
              title: `Status Changed: ${newStatus.replace(/_/g, ' ')}`,
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

  const handleIccLogout = async () => {
    await iccLogout();
    setIccUser(null);
    setReports(INITIAL_REPORTS);
  };

  // Quick navigation helpers
  const handleStartReportWithMode = (mode: ReportingMode) => {
    setSelectedWizardMode(mode);
    setCurrentPortal('survivor');
    setSurvivorSubView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCaseFromRadar = (caseNumber: string) => {
    setTrackerCaseNumber(caseNumber);
    setCurrentPortal('survivor');
    setSurvivorSubView('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDemoJump = (tab: 'home' | 'report' | 'track' | 'authority', caseNum?: string) => {
    if (tab === 'authority') {
      setCurrentPortal('icc');
    } else {
      setCurrentPortal('survivor');
      setSurvivorSubView(tab as SurvivorSubView);
      if (caseNum) {
        setTrackerCaseNumber(caseNum);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8F9] text-[#1E121E] selection:bg-[#FADCE2] selection:text-[#94204D] font-sans">
      {/* Top Navigation with 2 Main Portals */}
      <Navbar
        currentPortal={currentPortal}
        setCurrentPortal={(portal) => {
          setCurrentPortal(portal);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        survivorSubView={survivorSubView}
        setSurvivorSubView={(view) => {
          setSurvivorSubView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDemo={() => setIsDemoModalOpen(true)}
        onTriggerQuickExit={() => setIsQuickExitOpen(true)}
        activeCaseCount={reports.length}
        patternAlertCount={PATTERN_ALERTS.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* PORTAL 1: SURVIVOR VIEW */}
        {currentPortal === 'survivor' && (
          <div>
            {/* SUBVIEW 1.1: LANDING / HOW IT WORKS */}
            {survivorSubView === 'home' && (
              <div>
                {/* 1. Hero Section */}
                <HeroSection
                  onStartReport={() => handleStartReportWithMode('ANONYMOUS')}
                  onOpenDemo={() => setIsDemoModalOpen(true)}
                  onHowItWorks={() => {
                    const el = document.getElementById('how-it-works-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                />

                {/* 2. New Light Pattern Map (Prominent Spatial Pattern Mapping on Home Page) */}
                <LightPatternMapSection />

                {/* 3. The Problem Section ("Speaking up isn't always easy" - simplified 3 cards) */}
                <TheProblemSection />

                {/* 4. Pattern Highlight Section (Repositioned to upper-middle portion of Home page) */}
                <PatternHighlightSection />

                {/* 5. How SafeReport Works (Compact 3 horizontal step cards in 1 row) */}
                <HowItWorksSection
                  onStartReportWithMode={handleStartReportWithMode}
                />

                {/* 6. Anonymous Verification Section (Identity protected doesn't mean unverified) */}
                <AnonymousVerificationSection />

                {/* 7. Evidence Security Vault (Your evidence stays yours) */}
                <EvidenceSecuritySection />

                {/* 8. Retaliation Check-In & Post-Report Care (Prominent Action Buttons) */}
                <RetaliationCheckInSection
                  onNavigateToTracker={() => {
                    setSurvivorSubView('track');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* 9. Final Empowering Call to Action */}
                <FinalCtaSection
                  onStartReport={() => handleStartReportWithMode('ANONYMOUS')}
                  onViewInstitutions={() => {
                    setSurvivorSubView('institutions');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {/* SUBVIEW 1.2: REPORT INCIDENT WIZARD */}
            {survivorSubView === 'report' && (
              <ReportWizard
                initialMode={selectedWizardMode}
                onSubmitSuccess={handleReportCreated}
                onCancel={() => {
                  setSurvivorSubView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* SUBVIEW 1.3: TRACK CASE & RETALIATION CHECK-IN */}
            {survivorSubView === 'track' && (
              <CaseTrackerView
                reports={reports}
                initialCaseNumber={trackerCaseNumber}
                onUpdateReport={handleUpdateReport}
              />
            )}

            {/* SUBVIEW 1.4: PARTICIPATING INSTITUTIONS DIRECTORY */}
            {survivorSubView === 'institutions' && (
              <InstitutionsDirectory
                onSelectInstitutionReport={(instName) => {
                  setSelectedWizardMode('CONFIDENTIAL');
                  setSurvivorSubView('report');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateToIccPortal={() => {
                  setCurrentPortal('icc');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </div>
        )}

        {/* PORTAL 2: ICC PORTAL (Authorized Investigator & ICC Dashboard) */}
        {currentPortal === 'icc' && (
          iccUser ? (
            <AuthorityDashboard
              reports={reports}
              currentUser={iccUser}
              onLogout={handleIccLogout}
              onSelectCase={handleSelectCaseFromRadar}
              onUpdateReportStatus={handleUpdateStatus}
              onNavigateToSurvivorView={() => {
                setCurrentPortal('survivor');
                setSurvivorSubView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : (
            <IccLoginView
              onLoginSuccess={(user) => {
                setIccUser(user);
                loadIccCases();
              }}
              onCancel={() => {
                setCurrentPortal('survivor');
                setSurvivorSubView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )
        )}
      </main>

      {/* 90-Second Demo Walkthrough Modal */}
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
          setCurrentPortal('icc');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onTriggerQuickExit={() => setIsQuickExitOpen(true)}
      />
    </div>
  );
}
