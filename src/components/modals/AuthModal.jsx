import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  UserCheck, 
  Lock, 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle,
  MapPin,
  UserPlus
} from 'lucide-react';
import TermsCheckbox from '../common/TermsCheckbox';

export default function AuthModal() {
  const { 
    activeModal, 
    modalData, 
    closeModal, 
    showToast, 
    loginStudent, 
    openCourseDetails, 
    openModal,
    hasUnderstoodTerms,
    openLegalModal,
    setCurrentPage
  } = useApp();
  const [tab, setTab] = useState('register'); // 'login' | 'register' | 'forgot'
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotError, setForgotError] = useState('');

  useEffect(() => {
    if (activeModal === 'login') {
      setTab('login');
      setForgotSent(false);
    } else if (activeModal === 'auth') {
      setTab('register');
      setForgotSent(false);
    }
  }, [activeModal]);

  useEffect(() => {
    if (hasUnderstoodTerms) {
      setRegData(prev => ({ ...prev, termsAccepted: true }));
      setRegErrors(prev => ({ ...prev, termsAccepted: '' }));
    }
  }, [hasUnderstoodTerms]);

  // Login state
  const [loginData, setLoginData] = useState({
    identifier: '',
    password: '',
    rememberMe: true
  });
  const [loginErrors, setLoginErrors] = useState({});
  const [loginTouched, setLoginTouched] = useState({});

  // Register state
  const [regData, setRegData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: 'Male',
    address: '',
    qualification: "Bachelor's Degree",
    occupation: 'Student',
    referralSource: 'Social Media',
    termsAccepted: true
  });
  const [regErrors, setRegErrors] = useState({});
  const [regTouched, setRegTouched] = useState({});

  if (activeModal !== 'auth' && activeModal !== 'login') return null;

  // Validation functions
  const validateRegister = (data) => {
    const errors = {};
    if (!data.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    } else if (data.fullName.trim().length < 3) {
      errors.fullName = 'Full Name must be at least 3 characters long';
    } else if (!/^[a-zA-Z\s.'-]+$/.test(data.fullName.trim())) {
      errors.fullName = 'Full Name can only contain letters and spaces';
    }

    if (!data.email.trim()) {
      errors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = 'Please enter a valid email address (e.g. name@domain.com)';
    }

    const cleanPhone = data.mobile.replace(/[\s()-]/g, '');
    if (!data.mobile.trim()) {
      errors.mobile = 'Mobile Number is required';
    } else if (!/^(\+?\d{1,3})?\d{10}$/.test(cleanPhone)) {
      errors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
      errors.password = 'Must contain uppercase, lowercase & a number';
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!data.termsAccepted) {
      errors.termsAccepted = 'You must accept the Terms of Service to register';
    }

    return errors;
  };

  const validateLogin = (data) => {
    const errors = {};
    if (!data.identifier.trim()) {
      errors.identifier = 'Email Address or Mobile Number is required';
    }
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setForgotError('Please enter your registered email address or mobile number.');
      return;
    }
    setForgotError('');
    setForgotSent(true);
    showToast(`Password reset link dispatched to ${forgotEmail}`, 'success');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = validateLogin(loginData);
    setLoginErrors(errors);
    setLoginTouched({ identifier: true, password: true });

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      showToast(firstError, 'warning');
      return;
    }

    const userName = loginData.identifier.includes('@') 
      ? loginData.identifier.split('@')[0] 
      : loginData.identifier;
    const userEmail = loginData.identifier.includes('@') 
      ? loginData.identifier 
      : `${loginData.identifier}@nexusacademy.edu`;

    loginStudent({
      name: userName,
      email: userEmail,
      isStudent: true
    });

    showToast(`Welcome back, ${userName}! Student login successful 🎉`, 'success');
    closeModal();

    // If enrolling in a course: return to course and show confirmation, else open student dashboard
    if (modalData?.targetCourse) {
      const target = modalData.targetCourse;
      openCourseDetails(target.id);
      setTimeout(() => {
        openModal('enroll-confirmation', target);
      }, 200);
    } else {
      setCurrentPage('student-dashboard');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = validateRegister(regData);
    setRegErrors(errors);
    setRegTouched({
      fullName: true,
      email: true,
      mobile: true,
      password: true,
      confirmPassword: true,
      termsAccepted: true
    });

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      showToast(firstError, 'warning');
      if (errors.termsAccepted) {
        openLegalModal('terms', () => {
          setRegData(prev => ({ ...prev, termsAccepted: true }));
          setRegErrors(prev => ({ ...prev, termsAccepted: '' }));
        });
      }
      return;
    }

    loginStudent({
      name: regData.fullName,
      email: regData.email,
      phone: regData.mobile,
      isStudent: true
    });

    showToast(`Registration Successful! Welcome to Nexus Academy, ${regData.fullName} 🎉`, 'success');
    closeModal();

    // If enrolling in a course: return to course and show confirmation, else open student dashboard
    if (modalData?.targetCourse) {
      const target = modalData.targetCourse;
      openCourseDetails(target.id);
      setTimeout(() => {
        openModal('enroll-confirmation', target);
      }, 200);
    } else {
      setCurrentPage('student-dashboard');
    }
  };

  const handleRegChange = (field, value) => {
    const updated = { ...regData, [field]: value };
    setRegData(updated);
    if (regTouched[field]) {
      const errors = validateRegister(updated);
      setRegErrors(errors);
    }
  };

  const handleRegBlur = (field) => {
    setRegTouched({ ...regTouched, [field]: true });
    const errors = validateRegister(regData);
    setRegErrors(errors);
  };

  const handleLoginChange = (field, value) => {
    const updated = { ...loginData, [field]: value };
    setLoginData(updated);
    if (loginTouched[field]) {
      const errors = validateLogin(updated);
      setLoginErrors(errors);
    }
  };

  const handleLoginBlur = (field) => {
    setLoginTouched({ ...loginTouched, [field]: true });
    const errors = validateLogin(loginData);
    setLoginErrors(errors);
  };

  const passwordsMatch = regData.password && regData.confirmPassword && regData.password === regData.confirmPassword;

  return (
    <div className="modal-backdrop">
      <div className="modal-card max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
        
        {/* Modal Header */}
        <div className="modal-header px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50 via-white to-purple-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Nexus Student Portal Access
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {tab === 'forgot'
                  ? 'Recover your registered student portal access credentials'
                  : tab === 'login'
                  ? 'Sign in to access your enrolled courses & live schedule'
                  : 'Create your student account to enroll in tech programs'}
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-100/80 p-1.5 gap-1">
          <button
            type="button"
            onClick={() => { setTab('login'); setForgotSent(false); }}
            className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
              tab === 'login' || tab === 'forgot'
                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{tab === 'forgot' ? 'Password Recovery' : 'Student Login'}</span>
          </button>
          <button
            type="button"
            onClick={() => { setTab('register'); setForgotSent(false); }}
            className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
              tab === 'register' 
                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-4 h-4 text-indigo-600" />
            <span>New Student Registration</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[78vh] overflow-y-auto custom-scrollbar">
          
          {/* Enrollment Required Message */}
          {modalData?.targetCourse && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-start gap-3 shadow-xs animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-extrabold text-amber-950 dark:text-amber-100">
                  Please log in or create a student account to enroll in this course.
                </p>
                <p className="text-[11px] text-amber-800 dark:text-amber-300 font-medium">
                  Course: <span className="font-bold underline">{modalData.targetCourse.title}</span>
                </p>
              </div>
            </div>
          )}

          {tab === 'forgot' ? (
            /* FORGOT PASSWORD FORM */
            <div className="space-y-5 max-w-md mx-auto py-2">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto mb-2 shadow-xs">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900">
                  Reset Student Password
                </h4>
                <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
                  Enter your registered student email or mobile number to receive secure reset instructions.
                </p>
              </div>

              {forgotSent ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-emerald-950">
                      Password Reset Link Dispatched!
                    </p>
                    <p className="text-[11px] text-emerald-800 font-medium">
                      We have sent password recovery instructions to <span className="font-extrabold underline">{forgotEmail}</span>. Please verify your inbox and follow the steps.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setForgotSent(false);
                        setForgotEmail('');
                      }}
                      className="btn-secondary w-full py-2.5 text-xs font-bold justify-center cursor-pointer"
                    >
                      Resend Link
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotSent(false);
                        setTab('login');
                      }}
                      className="btn-primary w-full py-2.5 text-xs font-bold justify-center cursor-pointer"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} noValidate className="space-y-4">
                  <div>
                    <label className="field-label mb-1.5 block">
                      Registered Email Address or Mobile <span className="text-red-500 font-bold ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="student@example.com or +91 9876543210"
                        value={forgotEmail}
                        onChange={(e) => {
                          setForgotEmail(e.target.value);
                          if (forgotError) setForgotError('');
                        }}
                        className={`input-field pl-10 ${forgotError ? 'border-red-500 ring-1 ring-red-400' : ''}`}
                      />
                    </div>
                    {forgotError && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {forgotError}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setTab('login')}
                      className="h-11 sm:h-12 btn-secondary w-full text-xs sm:text-sm font-bold cursor-pointer flex items-center justify-center rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="h-11 sm:h-12 btn-primary w-full text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 cursor-pointer flex items-center justify-center rounded-xl"
                    >
                      Send Reset Link
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : tab === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} noValidate className="space-y-4 max-w-md mx-auto py-2">
              <div>
                <label className="field-label mb-1.5 block">
                  Email Address or Mobile Number <span className="text-red-500 font-bold ml-0.5">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="student@example.com or +91 9876543210"
                    value={loginData.identifier}
                    onChange={(e) => handleLoginChange('identifier', e.target.value)}
                    onBlur={() => handleLoginBlur('identifier')}
                    className={`input-field pl-10 ${
                      loginTouched.identifier && loginErrors.identifier 
                        ? 'border-red-500 ring-1 ring-red-400 focus:border-red-500' 
                        : ''
                    }`}
                  />
                </div>
                {loginTouched.identifier && loginErrors.identifier && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {loginErrors.identifier}
                  </p>
                )}
              </div>

              <div>
                <label className="field-label mb-1.5 block">
                  Password <span className="text-red-500 font-bold ml-0.5">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => handleLoginChange('password', e.target.value)}
                    onBlur={() => handleLoginBlur('password')}
                    className={`input-field pl-10 ${
                      loginTouched.password && loginErrors.password 
                        ? 'border-red-500 ring-1 ring-red-400 focus:border-red-500' 
                        : ''
                    }`}
                  />
                </div>
                {loginTouched.password && loginErrors.password && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {loginErrors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={loginData.rememberMe}
                    onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  Remember login session
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setTab('forgot');
                    setForgotSent(false);
                    setForgotError('');
                  }}
                  className="font-bold text-indigo-600 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-11 sm:h-12 btn-secondary w-full text-xs sm:text-sm font-bold cursor-pointer flex items-center justify-center rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-11 sm:h-12 btn-primary w-full text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 cursor-pointer flex items-center justify-center rounded-xl"
                >
                  Sign In
                </button>
              </div>

              <p className="text-xs text-center text-slate-500 pt-2">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setTab('register')}
                  className="font-bold text-indigo-600 hover:underline cursor-pointer"
                >
                  Create Student Account
                </button>
              </p>
            </form>
          ) : (
            /* STRUCTURED REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit} noValidate className="space-y-6">
              
              {/* Section 1: Personal Details */}
              <div className="space-y-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-2 border-b border-slate-200/60 pb-2">
                  <User className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    1. Personal Details
                  </h4>
                </div>

                <div>
                  <label className="field-label mb-1 block">
                    Full Name <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Alexander Vance"
                      value={regData.fullName}
                      onChange={(e) => handleRegChange('fullName', e.target.value)}
                      onBlur={() => handleRegBlur('fullName')}
                      className={`input-field pl-10 ${
                        regTouched.fullName && regErrors.fullName 
                          ? 'border-red-500 ring-1 ring-red-400 focus:border-red-500' 
                          : ''
                      }`}
                    />
                  </div>
                  {regTouched.fullName && regErrors.fullName && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {regErrors.fullName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="field-label mb-1 block">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        value={regData.dob}
                        onChange={(e) => handleRegChange('dob', e.target.value)}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="field-label mb-1 block">Gender</label>
                    <select
                      value={regData.gender}
                      onChange={(e) => handleRegChange('gender', e.target.value)}
                      className="select-field"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-Binary">Non-Binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Contact & Account Security */}
              <div className="space-y-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-2 border-b border-slate-200/60 pb-2">
                  <Lock className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    2. Contact & Account Security
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="field-label mb-1 block">
                      Email Address <span className="text-red-500 font-bold ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="student@domain.com"
                        value={regData.email}
                        onChange={(e) => handleRegChange('email', e.target.value)}
                        onBlur={() => handleRegBlur('email')}
                        className={`input-field pl-10 ${
                          regTouched.email && regErrors.email 
                            ? 'border-red-500 ring-1 ring-red-400 focus:border-red-500' 
                            : ''
                        }`}
                      />
                    </div>
                    {regTouched.email && regErrors.email && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {regErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="field-label mb-1 block">
                      Mobile Number <span className="text-red-500 font-bold ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="+91 9876543210"
                        value={regData.mobile}
                        onChange={(e) => handleRegChange('mobile', e.target.value)}
                        onBlur={() => handleRegBlur('mobile')}
                        className={`input-field pl-10 ${
                          regTouched.mobile && regErrors.mobile 
                            ? 'border-red-500 ring-1 ring-red-400 focus:border-red-500' 
                            : ''
                        }`}
                      />
                    </div>
                    {regTouched.mobile && regErrors.mobile && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {regErrors.mobile}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password & Confirm Password Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="field-label mb-1 block">
                      Password <span className="text-red-500 font-bold ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        placeholder="Minimum 8 characters"
                        value={regData.password}
                        onChange={(e) => handleRegChange('password', e.target.value)}
                        onBlur={() => handleRegBlur('password')}
                        className={`input-field pl-10 ${
                          regTouched.password && regErrors.password 
                            ? 'border-red-500 ring-1 ring-red-400 focus:border-red-500' 
                            : ''
                        }`}
                      />
                    </div>
                    {regTouched.password && regErrors.password && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {regErrors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="field-label mb-1 block">
                      Confirm Password <span className="text-red-500 font-bold ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        placeholder="Re-enter password"
                        value={regData.confirmPassword}
                        onChange={(e) => handleRegChange('confirmPassword', e.target.value)}
                        onBlur={() => handleRegBlur('confirmPassword')}
                        className={`input-field pl-10 ${
                          regTouched.confirmPassword && regErrors.confirmPassword 
                            ? 'border-red-500 ring-1 ring-red-400 focus:border-red-500' 
                            : regData.confirmPassword && passwordsMatch
                              ? 'border-emerald-500 ring-1 ring-emerald-400' 
                              : ''
                        }`}
                      />
                    </div>
                    {regTouched.confirmPassword && regErrors.confirmPassword && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {regErrors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password Match Status Indicator */}
                {regData.confirmPassword && (
                  <div className="flex items-center gap-1.5 text-xs pt-0.5">
                    {passwordsMatch ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match perfectly
                      </span>
                    ) : (
                      <span className="text-red-500 font-bold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Passwords do not match
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Section 3: Academic & Background Information */}
              <div className="space-y-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-2 border-b border-slate-200/60 pb-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    3. Educational & Career Profile
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="field-label mb-1 block">Highest Qualification</label>
                    <select
                      value={regData.qualification}
                      onChange={(e) => handleRegChange('qualification', e.target.value)}
                      className="select-field"
                    >
                      <option value="High School">High School / Secondary</option>
                      <option value="Diploma">Diploma / Associate Degree</option>
                      <option value="Bachelor's Degree">Bachelor's Degree (B.E / B.Tech / B.Sc)</option>
                      <option value="Master's Degree">Master's Degree (M.E / M.Tech / M.Sc)</option>
                      <option value="Doctorate / PhD">Doctorate / PhD</option>
                    </select>
                  </div>

                  <div>
                    <label className="field-label mb-1 block">Current Occupation</label>
                    <select
                      value={regData.occupation}
                      onChange={(e) => handleRegChange('occupation', e.target.value)}
                      className="select-field"
                    >
                      <option value="Student">University Student</option>
                      <option value="Working Professional">Working Software Professional</option>
                      <option value="Job Seeker">Recent Graduate & Job Seeker</option>
                      <option value="Freelancer">Freelancer / Independent Contractor</option>
                      <option value="Career Switcher">Career Switcher</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="field-label mb-1 block">Residential Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <textarea
                      rows={2}
                      placeholder="Street address, City, State, Country..."
                      value={regData.address}
                      onChange={(e) => handleRegChange('address', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Terms & Declaration */}
              <div className="pt-1">
                <TermsCheckbox
                  id="auth-register-terms"
                  checked={regData.termsAccepted}
                  hasUnderstood={hasUnderstoodTerms}
                  onChange={(val) => {
                    handleRegChange('termsAccepted', val);
                    if (val) {
                      setRegErrors(prev => ({ ...prev, termsAccepted: '' }));
                    }
                  }}
                  error={regTouched.termsAccepted && regErrors.termsAccepted ? regErrors.termsAccepted : ''}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-11 sm:h-12 btn-secondary w-full text-xs sm:text-sm font-bold cursor-pointer flex items-center justify-center rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-11 sm:h-12 btn-primary w-full text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 cursor-pointer flex items-center justify-center rounded-xl"
                >
                  Complete Registration
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
