import React, { createContext, useContext, useState, useEffect } from 'react';
import { COURSES, FACULTY } from '../data/mockData';

const AppContext = createContext();

// Default initial notifications for Admin Console
const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'career', // 'career' | 'inquiry' | 'admission' | 'enrollment'
    title: 'New Career Application: Senior AI & Machine Learning Instructor',
    applicant: 'David Miller',
    email: 'david.miller@gmail.com',
    phone: '+1 555-0812',
    role: 'Senior AI & Machine Learning Instructor',
    department: 'Artificial Intelligence',
    details: 'Applied for Senior AI Instructor role. 8+ years experience in PyTorch & Deep Learning.',
    timestamp: '15 mins ago',
    timeISO: new Date(Date.now() - 15 * 60000).toISOString(),
    isRead: false
  },
  {
    id: 'notif-2',
    type: 'inquiry',
    title: 'New Admission Inquiry: Full-Stack Web Development',
    applicant: 'Emma Watson',
    email: 'emma.w@outlook.com',
    phone: '+1 555-0349',
    subject: 'Batch Schedule & Flexible Timings',
    details: 'Asking if weekend batch timings can be accommodated for working professionals.',
    timestamp: '1 hour ago',
    timeISO: new Date(Date.now() - 60 * 60000).toISOString(),
    isRead: false
  }
];

const detectInitialPage = () => {
  try {
    const rawPath = (window.location.pathname || '').toLowerCase().replace(/^\/+|\/+$/g, '');
    const rawHash = (window.location.hash || '').toLowerCase().replace(/^#\/?/, '').replace(/\/+$/, '');
    const rawSearch = (window.location.search || '').toLowerCase();

    if (rawPath === 'admin' || rawHash === 'admin' || rawSearch.includes('admin') || rawSearch.includes('page=admin')) {
      return 'admin';
    }
    if (rawPath === 'student-dashboard' || rawPath === 'dashboard' || rawHash === 'student-dashboard' || rawHash === 'dashboard') {
      return 'student-dashboard';
    }
    const validPages = [
      'about', 'courses', 'course-details', 'programs', 'faculty', 
      'admissions', 'events', 'blog', 'testimonials', 'gallery', 
      'faq', 'contact', 'careers'
    ];
    if (validPages.includes(rawPath)) return rawPath;
  } catch (e) {}
  return 'home';
};

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(detectInitialPage);
  const [selectedCourseId, setSelectedCourseId] = useState('cs-101');

  // Shared Dynamic Courses Catalog (Synchronized between Admin & Website, persisted to localStorage)
  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_courses');
      return saved ? JSON.parse(saved) : COURSES;
    } catch (e) {
      return COURSES;
    }
  });

  const addCourse = (newCourse) => {
    setCourses(prev => {
      const updated = [newCourse, ...prev];
      try { localStorage.setItem('nexus_courses', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  const updateCourse = (updatedCourse) => {
    setCourses(prev => {
      const updated = prev.map(c => c.id === updatedCourse.id ? { ...c, ...updatedCourse } : c);
      try { localStorage.setItem('nexus_courses', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  const deleteCourse = (courseId) => {
    setCourses(prev => {
      const updated = prev.filter(c => c.id !== courseId);
      try { localStorage.setItem('nexus_courses', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  // Shared Dynamic Faculty Roster (Synchronized between Admin & Website, persisted to localStorage)
  const [facultyList, setFacultyList] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_faculty');
      if (saved) return JSON.parse(saved);
      return FACULTY.map((f, i) => ({
        ...f,
        status: i < 3 ? 'Active' : 'Inactive',
        email: `${f.name.split(' ')[0].toLowerCase()}@nexusacademy.edu`,
        assignedBatch: i === 0 ? 'Batch FS-01' : i === 1 ? 'Batch AI-02' : i === 2 ? 'Batch DS-03' : 'Unassigned',
        attendanceStatus: i === 0 ? 'Working' : i === 1 ? 'Working' : i === 2 ? 'On Leave' : 'Day Off',
        attendanceNote: i === 2 ? 'Medical Leave' : i === 3 ? 'Weekly Day Off' : 'Active Duty'
      }));
    } catch (e) {
      return FACULTY;
    }
  });

  const addFaculty = (newFacultyMember) => {
    setFacultyList(prev => {
      const updated = [newFacultyMember, ...prev];
      try { localStorage.setItem('nexus_faculty', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  const updateFaculty = (updatedFacultyMember) => {
    setFacultyList(prev => {
      const updated = prev.map(f => f.id === updatedFacultyMember.id ? { ...f, ...updatedFacultyMember } : f);
      try { localStorage.setItem('nexus_faculty', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  const deleteFaculty = (facultyId) => {
    setFacultyList(prev => {
      const updated = prev.filter(f => f.id !== facultyId);
      try { localStorage.setItem('nexus_faculty', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  // Student Authentication State (Persisted)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_student_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // State for Wishlist and Enrolled Courses (Persisted)
  const [wishlist, setWishlist] = useState(['cs-101']);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_enrolled_courses');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Catalog Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [sortBy, setSortBy] = useState('Popularity');

  // Modals
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  // Fixed light mode
  const [theme] = useState('light');

  // Toast Notification state
  const [toast, setToast] = useState(null);

  // Admin Notifications State (persisted to localStorage)
  const [adminNotifications, setAdminNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_admin_notifications');
      return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
    } catch (e) {
      return DEFAULT_NOTIFICATIONS;
    }
  });

  // Legal Modal & Privacy Center State
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, tab: 'terms', onUnderstood: null });
  const [isPrivacyCenterOpen, setIsPrivacyCenterOpen] = useState(false);
  const [hasUnderstoodTerms, setHasUnderstoodTerms] = useState(false);

  const openLegalModal = (tab = 'terms', onUnderstoodCallback = null) => {
    setLegalModalState({
      isOpen: true,
      tab,
      onUnderstood: onUnderstoodCallback
    });
  };

  const closeLegalModal = () => {
    setLegalModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleLegalUnderstood = () => {
    setHasUnderstoodTerms(true);
    if (legalModalState.onUnderstood) {
      legalModalState.onUnderstood();
    }
  };

  const openPrivacyCenter = () => {
    setIsPrivacyCenterOpen(true);
  };

  const closePrivacyCenter = () => {
    setIsPrivacyCenterOpen(false);
  };

  const openCookieBanner = (openPreferences = true) => {
    window.dispatchEvent(new CustomEvent('open-cookie-banner', { detail: { openPreferences } }));
  };

  // URL synchronization & Route Detection
  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    root.classList.remove('dark');
    body.classList.remove('dark');
    localStorage.removeItem('nexus_theme');

    const checkRouteInUrl = () => {
      const page = detectInitialPage();
      setCurrentPage(page);
    };

    checkRouteInUrl();
    window.addEventListener('hashchange', checkRouteInUrl);
    window.addEventListener('popstate', checkRouteInUrl);

    // Sync state across browser tabs
    const handleStorageChange = (e) => {
      if (e.key === 'nexus_admin_notifications' && e.newValue) {
        try { setAdminNotifications(JSON.parse(e.newValue)); } catch (err) {}
      }
      if (e.key === 'nexus_courses' && e.newValue) {
        try { setCourses(JSON.parse(e.newValue)); } catch (err) {}
      }
      if (e.key === 'nexus_faculty' && e.newValue) {
        try { setFacultyList(JSON.parse(e.newValue)); } catch (err) {}
      }
      if (e.key === 'nexus_enrolled_courses' && e.newValue) {
        try { setEnrolledCourses(JSON.parse(e.newValue)); } catch (err) {}
      }
      if (e.key === 'nexus_student_user') {
        try { setCurrentUser(e.newValue ? JSON.parse(e.newValue) : null); } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('hashchange', checkRouteInUrl);
      window.removeEventListener('popstate', checkRouteInUrl);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('nexus_courses', JSON.stringify(courses));
    } catch (e) {}
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem('nexus_faculty', JSON.stringify(facultyList));
    } catch (e) {}
  }, [facultyList]);

  const toggleTheme = () => {};

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Student Authentication Handlers
  const loginStudent = (userData) => {
    setCurrentUser(userData);
    try {
      localStorage.setItem('nexus_student_user', JSON.stringify(userData));
    } catch (e) {}
  };

  const logoutStudent = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('nexus_student_user');
    } catch (e) {}
    showToast('Logged out of Student Portal successfully.', 'info');
  };

  // Add new Admin Notification when anyone applies or submits enquiry
  const addAdminNotification = (notif) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      timeISO: new Date().toISOString(),
      timestamp: 'Just now',
      isRead: false,
      ...notif
    };
    setAdminNotifications(prev => {
      const updated = [newNotif, ...prev];
      try {
        localStorage.setItem('nexus_admin_notifications', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const markNotificationAsRead = (id) => {
    setAdminNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, isRead: true } : n);
      try {
        localStorage.setItem('nexus_admin_notifications', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const markAllNotificationsAsRead = () => {
    setAdminNotifications(prev => {
      const updated = prev.map(n => ({ ...n, isRead: true }));
      try {
        localStorage.setItem('nexus_admin_notifications', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const clearAllNotifications = () => {
    setAdminNotifications([]);
    try {
      localStorage.removeItem('nexus_admin_notifications');
    } catch (e) {}
  };

  const toggleWishlist = (courseId) => {
    setWishlist(prev => {
      const exists = prev.includes(courseId);
      const updated = exists ? prev.filter(id => id !== courseId) : [...prev, courseId];
      const course = courses.find(c => c.id === courseId) || COURSES.find(c => c.id === courseId);
      showToast(
        exists 
          ? `Removed "${course?.title || 'Course'}" from Wishlist`
          : `Added "${course?.title || 'Course'}" to Wishlist!`,
        exists ? 'warning' : 'success'
      );
      return updated;
    });
  };

  // Enroll in Course (Adds to My Enrolled Courses & persists)
  const enrollInCourse = (courseId) => {
    setEnrolledCourses(prev => {
      if (!prev.includes(courseId)) {
        const updated = [...prev, courseId];
        try {
          localStorage.setItem('nexus_enrolled_courses', JSON.stringify(updated));
        } catch (e) {}
        const course = courses.find(c => c.id === courseId) || COURSES.find(c => c.id === courseId);
        showToast(`Successfully Enrolled in "${course?.title || 'Course'}"! Welcome aboard 🎉`, 'success');
        return updated;
      }
      return prev;
    });
  };

  const openCourseDetails = (courseId) => {
    setSelectedCourseId(courseId);
    navigateTo('course-details');
  };

  // Dedicated Wishlist Opener: navigates straight to Wishlist courses
  const openWishlist = () => {
    setShowWishlistOnly(true);
    navigateTo('courses');
  };

  // Clean Navigation Handler: Removes /admin or #admin from URL when navigating to website pages
  const navigateTo = (page) => {
    if (page === 'terms') {
      openLegalModal('terms');
      return;
    }
    if (page === 'privacy') {
      openLegalModal('privacy');
      return;
    }
    if (page === 'disclaimer') {
      openLegalModal('disclaimer');
      return;
    }
    if (page === 'privacy-center') {
      openPrivacyCenter();
      return;
    }
    if (page === 'refund') {
      openLegalModal('terms');
      return;
    }

    setCurrentPage(page);

    if (page === 'admin') {
      if (window.location.pathname !== '/admin') {
        window.history.pushState({ page: 'admin' }, '', '/admin');
      }
    } else if (page === 'student-dashboard') {
      if (window.location.pathname !== '/student-dashboard') {
        window.history.pushState({ page: 'student-dashboard' }, '', '/student-dashboard');
      }
    } else {
      // If we are currently showing /admin or /student-dashboard, clean URL back to '/'
      const currentPath = window.location.pathname.toLowerCase();
      const currentHash = window.location.hash.toLowerCase();
      const currentSearch = window.location.search.toLowerCase();
      if (
        currentPath.endsWith('/admin') || 
        currentPath.endsWith('/student-dashboard') || 
        currentHash.includes('admin') || 
        currentSearch.includes('admin')
      ) {
        window.history.pushState({ page }, '', '/');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = (type, data = null) => {
    setActiveModal(type);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage: navigateTo,
        selectedCourseId,
        setSelectedCourseId,
        openCourseDetails,
        courses,
        setCourses,
        addCourse,
        updateCourse,
        deleteCourse,
        facultyList,
        setFacultyList,
        addFaculty,
        updateFaculty,
        deleteFaculty,
        wishlist,
        toggleWishlist,
        showWishlistOnly,
        setShowWishlistOnly,
        openWishlist,
        enrolledCourses,
        enrollInCourse,
        currentUser,
        loginStudent,
        logoutStudent,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedLevel,
        setSelectedLevel,
        selectedDuration,
        setSelectedDuration,
        selectedPrice,
        setSelectedPrice,
        sortBy,
        setSortBy,
        activeModal,
        modalData,
        openModal,
        closeModal,
        theme,
        toggleTheme,
        toast,
        showToast,
        adminNotifications,
        addAdminNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearAllNotifications,
        legalModalState,
        openLegalModal,
        closeLegalModal,
        handleLegalUnderstood,
        hasUnderstoodTerms,
        setHasUnderstoodTerms,
        isPrivacyCenterOpen,
        openPrivacyCenter,
        closePrivacyCenter,
        openCookieBanner
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
