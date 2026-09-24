import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLoginPage from './pages/admin/AdminLoginPage';

// Modals & Floating Components
import QuizModal from './components/QuizModal';
import EnrollmentModal from './components/EnrollmentModal';
import CertificateModal from './components/CertificateModal';
import ApplicationModal from './components/ApplicationModal';
import AuthModal from './components/modals/AuthModal';
import FacultyDashboardModal from './components/modals/FacultyDashboardModal';
import AdminFacultyModal from './components/modals/AdminFacultyModal';
import NotificationToast from './components/NotificationToast';
import LegalModal from './components/legal/LegalModal';
import PrivacyCenterModal from './components/legal/PrivacyCenterModal';
import CookieBanner from './components/legal/CookieBanner';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import ProgramsPage from './pages/ProgramsPage';
import FacultyPage from './pages/FacultyPage';
import AdmissionsPage from './pages/AdmissionsPage';
import EventsPage from './pages/EventsPage';
import BlogPage from './pages/BlogPage';
import TestimonialsPage from './pages/TestimonialsPage';
import GalleryPage from './pages/GalleryPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import AdminPage from './pages/AdminPage';

function MainContent() {
  const { 
    currentPage, 
    legalModalState, 
    closeLegalModal, 
    handleLegalUnderstood, 
    openLegalModal, 
    isPrivacyCenterOpen, 
    closePrivacyCenter, 
    openPrivacyCenter,
    openCookieBanner 
  } = useApp();
  const { isAdminAuthenticated } = useAdminAuth();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'courses':
        return <CoursesPage />;
      case 'course-details':
        return <CourseDetailsPage />;
      case 'programs':
        return <ProgramsPage />;
      case 'faculty':
        return <FacultyPage />;
      case 'admissions':
        return <AdmissionsPage />;
      case 'events':
        return <EventsPage />;
      case 'blog':
        return <BlogPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'faq':
        return <FAQPage />;
      case 'contact':
        return <ContactPage />;
      case 'careers':
        return <CareersPage />;
      case 'student-dashboard':
        return <StudentDashboardPage />;
      case 'privacy':
      case 'terms':
      case 'refund':
        return <HomePage />;
      case 'admin':
        // Auth gate: unauthenticated admins see login page
        return isAdminAuthenticated ? <AdminPage /> : <AdminLoginPage />;
      default:
        return <HomePage />;
    }
  };

  const isAdminPage = currentPage === 'admin';

  return (
    <div className="app-container">
      {!isAdminPage && <Navbar />}
      <main className={`main-content ${isAdminPage ? 'pt-6 pb-12 min-h-screen bg-slate-950/5 dark:bg-slate-950' : ''}`}>
        {renderPage()}
      </main>
      {!isAdminPage && <Footer />}

      {/* Global Modals */}
      <QuizModal />
      <EnrollmentModal />
      <CertificateModal />
      <ApplicationModal />
      <AuthModal />
      <FacultyDashboardModal />
      <AdminFacultyModal />
      <NotificationToast />

      {/* Legal & Compliance Modals */}
      <LegalModal
        isOpen={legalModalState.isOpen}
        activeTab={legalModalState.tab}
        onClose={closeLegalModal}
        onUnderstood={handleLegalUnderstood}
      />

      <PrivacyCenterModal
        isOpen={isPrivacyCenterOpen}
        onClose={closePrivacyCenter}
        onOpenLegal={openLegalModal}
        onOpenCookieSettings={() => openCookieBanner(true)}
      />

      {!isAdminPage && (
        <CookieBanner
          onOpenPrivacyPolicy={() => openLegalModal('privacy')}
          onOpenPrivacyCenter={openPrivacyCenter}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AdminAuthProvider>
        <MainContent />
      </AdminAuthProvider>
    </AppProvider>
  );
}
