import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  FileText, 
  Award, 
  User, 
  Mail, 
  Phone, 
  TrendingUp, 
  Video, 
  ExternalLink, 
  Download, 
  LogOut,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function StudentDashboardPage() {
  const { 
    currentUser, 
    logoutStudent, 
    setCurrentPage, 
    openModal, 
    openCourseDetails,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'schedule' | 'assignments' | 'certificates'

  // If student is not logged in, show login prompt
  if (!currentUser) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center p-8 bg-white rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Student Portal Access</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Please sign in with your student credentials or register for an account to access your courses, live cohorts, and gradebook.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => openModal('auth')}
              className="flex-1 btn-primary py-3 text-sm shadow-md"
            >
              Student Login / Register
            </button>
            <button
              onClick={() => setCurrentPage('home')}
              className="px-5 py-3 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Enrolled courses mock data customized for this student
  const enrolledCourses = [
    {
      id: 'cs-101',
      title: 'Full-Stack Web Development Masterclass',
      category: 'Web Development',
      progress: 75,
      completedLessons: 24,
      totalLessons: 32,
      instructor: 'Dr. Sarah Jenkins',
      nextLesson: 'State Management with Redux Toolkit & RTK Query',
      nextClassTime: 'Today at 6:30 PM',
      batch: 'Cohort FS-2026-A',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'ai-201',
      title: 'Applied Artificial Intelligence & Machine Learning',
      category: 'AI & Data',
      progress: 52,
      completedLessons: 18,
      totalLessons: 35,
      instructor: 'Prof. Michael Chang',
      nextLesson: 'Fine-Tuning LLMs with LoRA & Retrieval Augmented Generation',
      nextClassTime: 'Wednesday at 7:00 PM',
      batch: 'Cohort AI-2026-B',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'cloud-301',
      title: 'Cloud DevOps, Docker & Kubernetes Engineering',
      category: 'Cloud & Infrastructure',
      progress: 35,
      completedLessons: 10,
      totalLessons: 28,
      instructor: 'Dr. Elena Rostova',
      nextLesson: 'Automated CI/CD Pipelines with GitHub Actions',
      nextClassTime: 'Friday at 6:00 PM',
      batch: 'Cohort CLD-2026-A',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80'
    }
  ];

  const upcomingSchedule = [
    {
      id: 'sched-1',
      course: 'Full-Stack Web Development Masterclass',
      topic: 'Live Coding Lab: Deploying Microservices on AWS ECS',
      instructor: 'Dr. Sarah Jenkins',
      date: 'Today, September 24',
      time: '06:30 PM - 08:30 PM',
      mode: 'Live Interactive Session',
      status: 'Starts in 1 hour'
    },
    {
      id: 'sched-2',
      course: 'Applied Artificial Intelligence & Machine Learning',
      topic: 'Vector Databases (Pinecone/Milvus) & Embedding Models',
      instructor: 'Prof. Michael Chang',
      date: 'Wednesday, September 26',
      time: '07:00 PM - 09:00 PM',
      mode: 'Live Workshop & Q&A',
      status: 'Upcoming'
    },
    {
      id: 'sched-3',
      course: 'Cloud DevOps, Docker & Kubernetes Engineering',
      topic: 'Kubernetes Pod Scheduling, Ingress & Helm Charts',
      instructor: 'Dr. Elena Rostova',
      date: 'Friday, September 28',
      time: '06:00 PM - 08:00 PM',
      mode: 'Hands-on Cloud Lab',
      status: 'Upcoming'
    }
  ];

  const assignments = [
    {
      id: 'asg-1',
      title: 'Full-Stack E-Commerce API with PostgreSQL & Prisma',
      course: 'Full-Stack Web Development',
      dueDate: 'Sep 28, 2026',
      status: 'Submitted',
      grade: '98 / 100 (A+)',
      feedback: 'Excellent schema design and relational index optimization.'
    },
    {
      id: 'asg-2',
      title: 'RAG Pipeline Implementation with LlamaIndex & ChromaDB',
      course: 'Applied AI & ML',
      dueDate: 'Oct 02, 2026',
      status: 'In Progress',
      grade: 'Pending Review',
      feedback: 'Make sure to evaluate context recall metrics before submitting.'
    },
    {
      id: 'asg-3',
      title: 'Multi-Stage Dockerfile Optimization & Compose Setup',
      course: 'Cloud DevOps Engineering',
      dueDate: 'Sep 15, 2026',
      status: 'Completed',
      grade: '95 / 100 (A)',
      feedback: 'Reduced image size by 78% using Alpine multi-stage build.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      
      {/* Top Banner / Student Greeting Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Student Info */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-2xl sm:text-3xl shadow-xl shadow-indigo-500/20 border-2 border-white/20">
                {currentUser.name?.[0]?.toUpperCase() || 'S'}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    {currentUser.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-[11px]">
                    Active Student
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-indigo-200">
                  ID: <span className="font-mono font-bold text-white">STU-2026-8841</span> • {currentUser.email}
                </p>
                <p className="text-[11px] text-slate-300">
                  Enrolled Track: <span className="text-amber-300 font-semibold">Enterprise Full-Stack &amp; Applied AI Program</span>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5 self-stretch sm:self-auto justify-end flex-wrap">
              <button
                onClick={() => setCurrentPage('courses')}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/10 transition-colors cursor-pointer"
              >
                Browse Catalogue
              </button>
              <button
                onClick={() => openModal('application')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                Book 1:1 Mentor Session
              </button>
              <button
                onClick={() => {
                  logoutStudent();
                  setCurrentPage('home');
                }}
                className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* 4 Academic KPI Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-indigo-900/50">
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider">Enrolled Courses</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-1">3 Active</div>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider">Overall Progress</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">68% Done</div>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider">Live Attendance</div>
              <div className="text-xl sm:text-2xl font-black text-indigo-300 mt-1">96.4%</div>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider">Academic Grade</div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 mt-1">3.94 CGPA</div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
          {[
            { id: 'courses', label: 'My Enrolled Courses', count: enrolledCourses.length, icon: BookOpen },
            { id: 'schedule', label: 'Live Schedule & Classes', count: upcomingSchedule.length, icon: Calendar },
            { id: 'assignments', label: 'Assignments & Projects', count: assignments.length, icon: FileText },
            { id: 'certificates', label: 'Certificates & Credentials', count: 1, icon: Award }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-extrabold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-xl'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ENROLLED COURSES */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900">Your Active Learning Programs</h2>
                <p className="text-xs text-slate-500">Pick up right where you left off in your modules</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(course => (
                <div 
                  key={course.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Course Banner */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-white font-bold text-[10px]">
                        {course.batch}
                      </div>
                      <div className="absolute top-3 right-3 bg-emerald-500 text-white font-black text-[10px] px-2 py-0.5 rounded-md shadow-sm">
                        {course.progress}% Completed
                      </div>
                    </div>

                    {/* Course Body */}
                    <div className="p-5 space-y-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">{course.category}</span>
                        <h3 className="text-base font-black text-slate-900 mt-0.5 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Mentor: <span className="font-semibold text-slate-700">{course.instructor}</span>
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>Syllabus Progress</span>
                          <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Next Up Lesson */}
                      <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100/80 space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-700 uppercase">
                          <Play className="w-3 h-3 fill-indigo-700" />
                          <span>Next Up</span>
                        </div>
                        <p className="text-xs font-bold text-slate-900 line-clamp-1">{course.nextLesson}</p>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-indigo-500" /> {course.nextClassTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Course Card Footer */}
                  <div className="p-5 pt-0 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => openCourseDetails(course.id)}
                      className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Continue Class</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openCourseDetails(course.id)}
                      className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                      title="View Course Modules"
                    >
                      Syllabus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LIVE SCHEDULE */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-black text-slate-900">Upcoming Live Cohorts &amp; Masterclasses</h2>
              <p className="text-xs text-slate-500">Join real-time interactive lectures, doubt resolutions, and coding labs</p>
            </div>

            <div className="space-y-4">
              {upcomingSchedule.map(session => (
                <div 
                  key={session.id}
                  className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <Video className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded">
                        {session.course}
                      </span>
                      <h3 className="text-base font-black text-slate-900">{session.topic}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {session.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {session.time}</span>
                        <span>Instructor: <span className="font-semibold text-slate-700">{session.instructor}</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      {session.status}
                    </span>
                    <button
                      onClick={() => showToast(`Connecting to live classroom for: ${session.topic}...`, 'info')}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Live Room</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ASSIGNMENTS & GRADES */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-black text-slate-900">Module Submissions &amp; Gradebook</h2>
              <p className="text-xs text-slate-500">Track your project reviews, code feedback, and grades</p>
            </div>

            <div className="space-y-4">
              {assignments.map(asg => (
                <div 
                  key={asg.id}
                  className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-3"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{asg.course}</span>
                      <h3 className="text-base font-black text-slate-900">{asg.title}</h3>
                      <p className="text-xs text-slate-400">Due Date: {asg.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                        asg.status === 'Submitted' || asg.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {asg.status}
                      </span>
                      <div className="text-xs font-bold text-slate-700 mt-1">{asg.grade}</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-600 border border-slate-100">
                    <span className="font-bold text-slate-800">Faculty Review Note: </span>
                    {asg.feedback}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CERTIFICATES & CREDENTIALS */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-black text-slate-900">Your Official Certifications</h2>
              <p className="text-xs text-slate-500">Cryptographically verifiable certificates recognized by 500+ tech hiring partners</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Credential ID: NX-2026-9812</span>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">Frontend Engineering &amp; Modern React Architecture</h3>
                  <p className="text-xs text-slate-500 mt-1">Issued by Nexus Academy Academic Council • Verified on Blockchain</p>
                </div>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => openModal('certificate')}
                    className="btn-primary text-xs px-4 py-2.5 shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>View &amp; Download Certificate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
