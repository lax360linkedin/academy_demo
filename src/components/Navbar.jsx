import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Search, 
  Heart, 
  Menu, 
  X, 
  ChevronDown,
  UserCheck,
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';

export default function Navbar() {
  const { 
    currentPage, 
    setCurrentPage, 
    wishlist, 
    openWishlist,
    currentUser,
    logoutStudent,
    searchQuery,
    setSearchQuery,
    openModal,
    openLegalModal,
    openPrivacyCenter
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [portalsDropdownOpen, setPortalsDropdownOpen] = useState(false);

  const mainLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Academy' },
    { id: 'courses', label: 'Courses' },
    { id: 'programs', label: 'Programs' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'admissions', label: 'Admissions' }
  ];

  const morePages = [
    { id: 'events', label: 'Events & Webinars' },
    { id: 'blog', label: 'Blog & Articles' },
    { id: 'testimonials', label: 'Student Testimonials' },
    { id: 'gallery', label: 'Campus Gallery' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'careers', label: 'Careers' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'disclaimer', label: 'Disclaimer' },
    { id: 'privacy-center', label: 'Privacy Center' }
  ];

  const handleNavClick = (pageId, modalType) => {
    if (pageId === 'privacy') {
      openLegalModal('privacy');
    } else if (pageId === 'terms') {
      openLegalModal('terms');
    } else if (pageId === 'disclaimer') {
      openLegalModal('disclaimer');
    } else if (pageId === 'privacy-center') {
      openPrivacyCenter();
    } else if (modalType) {
      openModal(modalType);
    } else {
      setCurrentPage(pageId);
    }
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setPortalsDropdownOpen(false);
  };

  return (
    <header className="navbar bg-blue-50/95 border-b border-blue-200/80 sticky top-0 z-40 w-full shadow-sm">
      <div className="w-full px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 w-full gap-2 sm:gap-4">
          
          {/* Logo - Kept at Left Margin */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="navbar-brand flex items-center gap-2 sm:gap-2.5 cursor-pointer shrink-0 min-w-0"
          >
            <div className="navbar-brand-logo w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 shrink-0">
              <GraduationCap className="w-4.5 h-4.5 sm:w-6 sm:h-6" />
            </div>
            <span className="navbar-brand-text text-base sm:text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight whitespace-nowrap">
              NEXUS ACADEMY
            </span>
          </div>

          {/* Desktop Nav Links - Shifted towards Right / Centered with Equal Spacing */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-4 xl:mx-8 gap-1.5 xl:gap-2.5">
            {mainLinks.map((link) => {
              const isActive = currentPage === link.id || (link.id === 'courses' && currentPage === 'course-details');
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={isActive 
                    ? 'px-3 py-2 rounded-xl text-xs xl:text-sm font-extrabold bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/40 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap' 
                    : 'px-3 py-2 rounded-xl text-xs xl:text-sm font-bold text-slate-700 hover:text-indigo-600 hover:bg-white/80 transition-all cursor-pointer whitespace-nowrap'
                  }
                >
                  {link.label}
                </button>
              );
            })}

            {/* Dropdown for More Pages */}
            {(() => {
              const isMorePagesActive = morePages.some(page => page.id === currentPage);

              return (
                <div className="relative">
                  <button
                    onClick={() => { setDropdownOpen(!dropdownOpen); setPortalsDropdownOpen(false); }}
                    className={isMorePagesActive 
                      ? 'px-3 py-2 rounded-xl text-xs xl:text-sm font-extrabold bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400/40 flex items-center gap-1 cursor-pointer whitespace-nowrap' 
                      : 'px-3 py-2 rounded-xl text-xs xl:text-sm font-bold text-slate-700 hover:text-indigo-600 hover:bg-white/80 flex items-center gap-1 cursor-pointer whitespace-nowrap'
                    }
                  >
                    <span>More Pages</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <div 
                      className="navbar-dropdown absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150"
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      {morePages.map((page) => {
                        const isSelected = currentPage === page.id;
                        return (
                          <button
                            key={page.id}
                            onClick={() => handleNavClick(page.id, page.isModal)}
                            className={isSelected 
                              ? 'w-full text-left px-4 py-2.5 text-xs font-extrabold bg-indigo-600 text-white border-l-4 border-amber-400 flex items-center justify-between cursor-pointer' 
                              : 'w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-between cursor-pointer'
                            }
                          >
                            <span>{page.label}</span>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()}
          </nav>

          {/* Right Utilities & Portals Dropdown */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            
            {/* Compact Search Input */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim().toLowerCase() === 'admin' || searchQuery.trim().toLowerCase() === '/admin') {
                  setCurrentPage('admin');
                } else if (currentPage !== 'courses') {
                  setCurrentPage('courses');
                }
              }}
              className="relative hidden xl:block w-40"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchQuery(val);
                  if (val.trim().toLowerCase() === 'admin' || val.trim().toLowerCase() === '/admin') {
                    setCurrentPage('admin');
                  } else if (currentPage !== 'courses') {
                    setCurrentPage('courses');
                  }
                }}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white/90 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500 shadow-sm font-medium"
              />
            </form>

            {/* Wishlist Icon */}
            <button
              onClick={openWishlist}
              className="navbar-icon-btn relative p-1.5 sm:p-2 rounded-lg text-slate-700 hover:bg-white/80 transition-colors cursor-pointer shrink-0"
              title="View Wishlist"
              aria-label="View Wishlist"
            >
              <Heart className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="navbar-counter-badge absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center bg-rose-500 shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Student Login & Account Action */}
            <div className="relative shrink-0">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => { setPortalsDropdownOpen(!portalsDropdownOpen); setDropdownOpen(false); }}
                    className="flex items-center gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs xl:text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md cursor-pointer whitespace-nowrap"
                  >
                    <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                      {currentUser.name?.[0]?.toUpperCase() || 'S'}
                    </div>
                    <span className="hidden sm:inline">{currentUser.name?.split(' ')[0] || 'Student'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${portalsDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {portalsDropdownOpen && (
                    <div 
                      className="navbar-dropdown absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150"
                      onMouseLeave={() => setPortalsDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-100">
                        <div className="font-extrabold text-xs text-slate-900 line-clamp-1">{currentUser.name}</div>
                        <div className="text-[10px] text-slate-400">{currentUser.email}</div>
                      </div>
                      <button
                        onClick={() => {
                          logoutStudent();
                          setPortalsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => { openModal('auth'); setPortalsDropdownOpen(false); }}
                  className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs xl:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md shadow-indigo-600/25 cursor-pointer whitespace-nowrap"
                >
                  <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="hidden sm:inline">Student Login</span>
                  <span className="sm:hidden">Login</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-700 hover:bg-white/80 shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-blue-50/95 border-b border-blue-200 px-3 sm:px-6 pt-2 pb-6 space-y-4 max-w-full overflow-hidden">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim().toLowerCase() === 'admin' || searchQuery.trim().toLowerCase() === '/admin') {
                setCurrentPage('admin');
                setMobileMenuOpen(false);
              } else {
                if (currentPage !== 'courses') setCurrentPage('courses');
                setMobileMenuOpen(false);
              }
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Search courses or type admin..."
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                if (val.trim().toLowerCase() === 'admin' || val.trim().toLowerCase() === '/admin') {
                  setCurrentPage('admin');
                  setMobileMenuOpen(false);
                } else if (currentPage !== 'courses') {
                  setCurrentPage('courses');
                }
              }}
              className="flex-1 px-4 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900"
            />
          </form>

          {/* Quick Student Login in Mobile View */}
          <div className="w-full">
            {currentUser ? (
              <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    {currentUser.name?.[0]?.toUpperCase() || 'S'}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">{currentUser.name}</div>
                    <div className="text-[10px] text-slate-400">Student Account</div>
                  </div>
                </div>
                <button
                  onClick={() => { logoutStudent(); setMobileMenuOpen(false); }}
                  className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { openModal('auth'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold text-center shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Student Login</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 border-t border-blue-200/60 pt-3">
            {[...mainLinks, ...morePages].map((page) => (
              <button
                key={page.id}
                onClick={() => handleNavClick(page.id, page.isModal)}
                className={`text-left px-2.5 py-2 rounded-lg text-xs font-semibold transition-colors min-w-0 flex items-center justify-between gap-1 ${
                  currentPage === page.id
                    ? 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-400'
                    : 'text-slate-700 hover:bg-white/80'
                }`}
              >
                <span className="truncate">{page.label}</span>
                {currentPage === page.id && <span className="shrink-0 text-emerald-300 font-bold">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
