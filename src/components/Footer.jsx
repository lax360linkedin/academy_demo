import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  const { setCurrentPage, openLegalModal, openPrivacyCenter, openCookieBanner } = useApp();

  return (
    <footer className="footer">
      
      {/* Main Footer Links */}
      <div className="footer-grid">
        
        {/* Col 1: Academy Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div 
            onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }} 
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-600/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              NEXUS ACADEMY
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
            Nexus Academy is a premier accredited institute delivering hands-on, industry-vetted education in Web Development, Artificial Intelligence, Data Science, and Cybersecurity.
          </p>

          <div className="pt-2 space-y-2.5 text-sm text-slate-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
              <span>750 Technology Boulevard, Innovation Park, NY 10001</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4.5 h-4.5 text-indigo-400 shrink-0" />
              <span>+1 (800) 555-NEXUS / +1 (212) 987-6543</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4.5 h-4.5 text-indigo-400 shrink-0" />
              <span>admissions@nexusacademy.edu</span>
            </div>
          </div>
        </div>

        {/* Col 2: Core Academic Modules */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="footer-title">
              Academic Modules
            </h4>
          </div>
          <ul className="space-y-3 text-sm sm:text-[15px]">
            {[
              { id: 'courses', label: 'Course Catalogue' },
              { id: 'programs', label: 'Diploma & Batches' },
              { id: 'faculty', label: 'Trainers & Faculty' },
              { id: 'admissions', label: 'Admissions & Fees' },
              { id: 'events', label: 'Events & Webinars' }
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => { setCurrentPage(item.id); window.scrollTo(0, 0); }}
                  className="footer-link group"
                >
                  <ArrowRight className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.95)] shrink-0 group-hover:translate-x-1.5 transition-transform" /> 
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Student Community */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="footer-title">
              Student & Alumni
            </h4>
          </div>
          <ul className="space-y-3 text-sm sm:text-[15px]">
            {[
              { id: 'testimonials', label: 'Student Testimonials' },
              { id: 'blog', label: 'Blog & Industry News' },
              { id: 'gallery', label: 'Campus Gallery' },
              { id: 'faq', label: 'Help & FAQ' },
              { id: 'careers', label: 'Career Center' }
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => { setCurrentPage(item.id); window.scrollTo(0, 0); }}
                  className="footer-link group"
                >
                  <ArrowRight className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.95)] shrink-0 group-hover:translate-x-1.5 transition-transform" /> 
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Institutional Policies */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="footer-title">
              Policies &amp; Legal
            </h4>
          </div>
          <ul className="space-y-3 text-sm sm:text-[15px]">
            <li>
              <button
                type="button"
                onClick={() => openLegalModal('terms')}
                className="footer-link group cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.95)] shrink-0 group-hover:translate-x-1.5 transition-transform" /> 
                <span>Terms &amp; Conditions</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => openLegalModal('privacy')}
                className="footer-link group cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.95)] shrink-0 group-hover:translate-x-1.5 transition-transform" /> 
                <span>Privacy Policy</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => openLegalModal('disclaimer')}
                className="footer-link group cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.95)] shrink-0 group-hover:translate-x-1.5 transition-transform" /> 
                <span>Disclaimer</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={openPrivacyCenter}
                className="footer-link group cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.95)] shrink-0 group-hover:translate-x-1.5 transition-transform" /> 
                <span>Privacy Center</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => openCookieBanner(true)}
                className="footer-link group cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.95)] shrink-0 group-hover:translate-x-1.5 transition-transform" /> 
                <span>Cookie Preferences</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => { setCurrentPage('contact'); window.scrollTo(0, 0); }}
                className="footer-link group cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.95)] shrink-0 group-hover:translate-x-1.5 transition-transform" /> 
                <span>Contact Support</span>
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal & Accreditations Bar */}
      <div className="footer-bottom">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between text-sm text-slate-400 gap-4">
          <p>© 2026 Nexus Academy Inc. All rights reserved. Empowering future tech leaders.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-300">
            <button type="button" onClick={() => openLegalModal('terms')} className="hover:text-amber-400 transition-colors cursor-pointer">Terms &amp; Conditions</button>
            <button type="button" onClick={() => openLegalModal('privacy')} className="hover:text-amber-400 transition-colors cursor-pointer">Privacy Policy</button>
            <button type="button" onClick={() => openLegalModal('disclaimer')} className="hover:text-amber-400 transition-colors cursor-pointer">Disclaimer</button>
            <button type="button" onClick={openPrivacyCenter} className="hover:text-amber-400 transition-colors cursor-pointer">Privacy Center</button>
            <button type="button" onClick={() => openCookieBanner(true)} className="hover:text-amber-400 transition-colors cursor-pointer">Cookie Settings</button>
          </div>
        </div>
      </div>

    </footer>
  );
}
