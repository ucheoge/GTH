/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User as UserType, 
  DetailedApplication, 
  Track 
} from '../types';
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Download, 
  Check, 
  Shield, 
  LogOut, 
  ArrowRight, 
  ArrowLeft, 
  Briefcase, 
  BookOpen, 
  Award,
  AlertTriangle,
  Search,
  Filter,
  UserCheck,
  Send,
  X
} from 'lucide-react';
import GreenageLogo from './GreenageLogo';

// Mock/Local Storage database keys
const USERS_KEY = 'gth_portal_users';
const APPS_KEY = 'gth_portal_applications';

export default function ApplicationPortal() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [applications, setApplications] = useState<DetailedApplication[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  
  // Auth Form State
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  
  // Form values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  // Track selection (sync from Fellowship view or select)
  const [tracks] = useState<string[]>([
    'Solar Inverter & Power Electronics',
    'Solar Installation',
    'Energy Management',
    'Electric Vehicle Systems',
    'Power Electronics Repair',
    'Robotics & Automation'
  ]);

  // Form Section Active Index
  const [formStep, setFormStep] = useState<number>(1);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // 3-Section Application Form State
  const [appForm, setAppForm] = useState({
    // Section 1: Personal
    fullName: '',
    phone: '',
    gender: 'Male',
    dateOfBirth: '1998-05-15',
    stateOfResidence: 'Enugu',
    city: 'Enugu',
    address: '',

    // Section 2: Education
    highestQualification: 'B.Sc/B.Eng/HND',
    institutionName: '',
    courseOfStudy: '',
    graduationYear: '2022',
    gradeOrGPA: '',

    // Section 3: Motivation & Program
    preferredTrack: 'Solar Inverter & Power Electronics',
    motivation: '',
    careerGoals: '',
    experienceLevel: 'Beginner'
  });

  // Admin View State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [trackFilter, setTrackFilter] = useState<string>('All');
  const [selectedApp, setSelectedApp] = useState<DetailedApplication | null>(null);
  const [adminFeedback, setAdminFeedback] = useState('');

  // Email Verification Flow States
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [pendingUser, setPendingUser] = useState<UserType | null>(null);
  const [verificationError, setVerificationError] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState('');
  const [activeNotification, setActiveNotification] = useState<{ email: string; code: string; show: boolean } | null>(null);

  // Load database and session on mount
  useEffect(() => {
    // 1. Initialise users
    const storedUsers = localStorage.getItem(USERS_KEY);
    let currentUsers: UserType[] = [];
    if (storedUsers) {
      try {
        currentUsers = JSON.parse(storedUsers);
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed initial Admin and Candidate accounts for frictionless demoing
      currentUsers = [
        {
          id: 'admin-01',
          email: 'admin@gth.ng',
          fullName: 'Greenage Admissions Director',
          phone: '+234 813 736 9642',
          role: 'admin',
          createdAt: '2026-01-01',
          isVerified: true
        },
        {
          id: 'cand-01',
          email: 'candidate@gth.ng',
          fullName: 'Chinedu Okafor',
          phone: '+234 803 123 4567',
          role: 'candidate',
          createdAt: '2026-07-01',
          isVerified: true
        },
        {
          id: 'cand-02',
          email: 'amaka.eze@gth.ng',
          fullName: 'Amaka Eze',
          phone: '+234 812 345 6789',
          role: 'candidate',
          createdAt: '2026-07-02',
          isVerified: true
        }
      ];
      localStorage.setItem(USERS_KEY, JSON.stringify(currentUsers));
    }
    setUsers(currentUsers);

    // 2. Initialise applications
    const storedApps = localStorage.getItem(APPS_KEY);
    let currentApps: DetailedApplication[] = [];
    if (storedApps) {
      try {
        currentApps = JSON.parse(storedApps);
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed initial dummy applications to bring the admin board to life immediately
      currentApps = [
        {
          id: 'GTH-APP-873912',
          userId: 'cand-01',
          email: 'candidate@gth.ng',
          status: 'Received',
          submittedAt: '2026-07-10 14:32',
          fullName: 'Chinedu Okafor',
          phone: '+234 803 123 4567',
          gender: 'Male',
          dateOfBirth: '1999-04-12',
          stateOfResidence: 'Enugu',
          city: 'Enugu Urban',
          address: '12 Chime Avenue, New Haven, Enugu',
          highestQualification: 'B.Sc/B.Eng/HND',
          institutionName: 'University of Nigeria, Nsukka',
          courseOfStudy: 'Mechanical Engineering',
          graduationYear: '2023',
          gradeOrGPA: 'First Class (4.62/5.0)',
          preferredTrack: 'Solar Inverter & Power Electronics',
          motivation: 'I am highly passionate about green infrastructure in Nigeria. Our current power grid gridlock requires distributed hardware solutions. I want to build commercial assembly skills to set up solar inverter service hubs.',
          careerGoals: 'To establish a solar manufacturing firm in Enugu and create employment for 50 local technicians.',
          experienceLevel: 'Beginner'
        },
        {
          id: 'GTH-APP-492108',
          userId: 'cand-02',
          email: 'amaka.eze@gth.ng',
          status: 'Approved',
          submittedAt: '2026-07-09 10:15',
          fullName: 'Amaka Eze',
          phone: '+234 812 345 6789',
          gender: 'Female',
          dateOfBirth: '2000-11-20',
          stateOfResidence: 'Anambra',
          city: 'Awka',
          address: '45 Zik Avenue, Awka',
          highestQualification: 'B.Sc/B.Eng/HND',
          institutionName: 'Nnamdi Azikiwe University',
          courseOfStudy: 'Electronic & Computer Engineering',
          graduationYear: '2022',
          gradeOrGPA: 'Second Class Upper (4.10/5.0)',
          preferredTrack: 'Robotics & Automation',
          motivation: 'Automation is the baseline of modern clean production. I have built minor microcontroller sensor setups and want to transition to heavy industrial programming systems with GTH.',
          careerGoals: 'I intend to become a lead field diagnostics architect for sustainable industrial systems in Africa.',
          experienceLevel: 'Intermediate',
          reviewedAt: '2026-07-11 09:00',
          reviewerFeedback: 'Outstanding technical profile. Background in electronic engineering fits perfectly with robotics & PLC automation tracking. Issued admission.',
          offerSentAt: '2026-07-11 09:00',
          offerExpiryDate: '2026-08-10'
        }
      ];
      localStorage.setItem(APPS_KEY, JSON.stringify(currentApps));
    }
    setApplications(currentApps);

    // 3. Initialise session from localStorage
    const savedSession = localStorage.getItem('gth_portal_session');
    if (savedSession) {
      try {
        const parsedUser = JSON.parse(savedSession);
        // Find fresh record from local array in case role changed
        const freshUser = currentUsers.find(u => u.id === parsedUser.id || u.email === parsedUser.email);
        if (freshUser) {
          setCurrentUser(freshUser);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Update appForm when candidate logs in
  useEffect(() => {
    if (currentUser && currentUser.role === 'candidate') {
      const candidateApp = applications.find(a => a.userId === currentUser.id);
      if (candidateApp) {
        // sync form if they already submitted
        setAppForm(candidateApp);
      } else {
        // prefill default details from user profile
        const preselected = localStorage.getItem('gth_preselected_track');
        if (preselected) {
          localStorage.removeItem('gth_preselected_track');
        }
        setAppForm(prev => ({
          ...prev,
          fullName: currentUser.fullName,
          phone: currentUser.phone,
          preferredTrack: preselected || prev.preferredTrack
        }));
      }
    }
  }, [currentUser, applications]);

  // Auth Operations
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (authMode === 'login') {
      if (!email.trim() || !password.trim()) {
        setAuthError('Please fill in all fields.');
        return;
      }
      // Check validation
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!foundUser) {
        setAuthError('No account found with this email. Please create one!');
        return;
      }
      
      if (foundUser.isVerified) {
        // Log in immediately since they are verified
        setCurrentUser(foundUser);
        localStorage.setItem('gth_portal_session', JSON.stringify(foundUser));
        setAuthSuccess(`Welcome back, ${foundUser.fullName}!`);
      } else {
        // Trigger verification
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setSentCode(code);
        setPendingUser(foundUser);
        setShowVerification(true);
        setVerificationError('');
        setVerificationSuccess(`A 6-digit verification code has been generated for ${foundUser.email}`);
        setActiveNotification({ email: foundUser.email, code, show: true });
      }
    } else {
      if (!email.trim() || !password.trim() || !fullName.trim() || !phone.trim()) {
        setAuthError('Please fill in all fields.');
        return;
      }
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        setAuthError('An account with this email already exists.');
        return;
      }

      const newUser: UserType = {
        id: `user-${Math.floor(1000 + Math.random() * 9000)}`,
        email: email.toLowerCase(),
        fullName,
        phone,
        role: 'candidate',
        createdAt: new Date().toLocaleDateString(),
        isVerified: false // Needs verification
      };

      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
      
      // Trigger verification immediately
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setSentCode(code);
      setPendingUser(newUser);
      setShowVerification(true);
      setVerificationError('');
      setVerificationSuccess(`A 6-digit verification code has been generated for ${newUser.email}`);
      setActiveNotification({ email: newUser.email, code, show: true });
    }
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError('');
    setVerificationSuccess('');

    if (verificationCode.trim() !== sentCode) {
      setVerificationError('Invalid 6-digit verification code. Please check your verification notification.');
      return;
    }

    if (!pendingUser) {
      setVerificationError('Verification session expired. Please reload and try again.');
      return;
    }

    // Mark verified
    const updatedUsers = users.map(u => {
      if (u.id === pendingUser.id) {
        return { ...u, isVerified: true };
      }
      return u;
    });

    const verifiedUser = { ...pendingUser, isVerified: true };
    setUsers(updatedUsers);
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

    // Log them in
    setCurrentUser(verifiedUser);
    localStorage.setItem('gth_portal_session', JSON.stringify(verifiedUser));

    // Reset verification state
    setShowVerification(false);
    setPendingUser(null);
    setVerificationCode('');
    setSentCode('');
    setActiveNotification(null);
    setAuthSuccess(`Email successfully verified! Welcome to your dashboard, ${verifiedUser.fullName}!`);
  };

  const handleResendCode = () => {
    setVerificationError('');
    setVerificationSuccess('');
    if (!pendingUser) return;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(code);
    setVerificationSuccess('A new 6-digit code has been successfully dispatched to your email.');
    setActiveNotification({ email: pendingUser.email, code, show: true });
  };

  const handleCancelVerification = () => {
    setShowVerification(false);
    setPendingUser(null);
    setVerificationCode('');
    setSentCode('');
    setVerificationError('');
    setVerificationSuccess('');
    setActiveNotification(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('gth_portal_session');
    setEmail('');
    setPassword('');
    setFullName('');
    setPhone('');
    setFormStep(1);
    setSelectedApp(null);
  };

  // Section forms navigation & validation
  const validateStep = (step: number) => {
    const errors: Record<string, string> = {};
    if (step === 1) {
      if (!appForm.fullName.trim()) errors.fullName = 'Full name is required';
      if (!appForm.phone.trim()) errors.phone = 'Phone number is required';
      if (!appForm.address.trim()) errors.address = 'Residential address is required';
      if (!appForm.city.trim()) errors.city = 'City is required';
    } else if (step === 2) {
      if (!appForm.institutionName.trim()) errors.institutionName = 'Institution name is required';
      if (!appForm.courseOfStudy.trim()) errors.courseOfStudy = 'Course of study is required';
      if (!appForm.gradeOrGPA.trim()) errors.gradeOrGPA = 'Grade / GPA representation is required';
    } else if (step === 3) {
      if (!appForm.motivation.trim()) {
        errors.motivation = 'Please share your motivation statement';
      } else if (appForm.motivation.length < 25) {
        errors.motivation = 'Motivation statement should be at least 25 characters';
      }
      if (!appForm.careerGoals.trim()) errors.careerGoals = 'Career goals statement is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(formStep)) {
      setFormStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setFormStep(prev => prev - 1);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppForm(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // Submit Completed Application
  const handleAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    if (!currentUser) return;

    const newApp: DetailedApplication = {
      id: `GTH-APP-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: currentUser.id,
      email: currentUser.email,
      status: 'Received',
      submittedAt: new Date().toLocaleDateString('en-NG', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...appForm
    };

    const updatedApps = [newApp, ...applications.filter(a => a.userId !== currentUser.id)];
    setApplications(updatedApps);
    localStorage.setItem(APPS_KEY, JSON.stringify(updatedApps));
    setFormStep(1);
  };

  // Candidate Actions: Accept Offer
  const handleAcceptOffer = (appId: string) => {
    const today = new Date().toLocaleDateString('en-NG', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    
    const updated = applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: 'Offer Accepted' as const,
          offerAcceptedAt: today
        };
      }
      return app;
    });

    setApplications(updated);
    localStorage.setItem(APPS_KEY, JSON.stringify(updated));
    if (selectedApp?.id === appId) {
      setSelectedApp(prev => prev ? { ...prev, status: 'Offer Accepted', offerAcceptedAt: today } : null);
    }
  };

  // Admin Actions: Approve
  const handleAdminApprove = (appId: string) => {
    const today = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(today.getDate() + 30); // Valid for 30 days

    const formattedToday = today.toLocaleDateString('en-NG', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ' ' + today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedExpiry = expiryDate.toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' });

    const updated = applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: 'Approved' as const,
          reviewedAt: formattedToday,
          reviewerFeedback: adminFeedback || 'Your application aligns perfectly with the standards of the Greenage Talent Hub program. We are thrilled to offer you admission!',
          offerSentAt: formattedToday,
          offerExpiryDate: formattedExpiry
        };
      }
      return app;
    });

    setApplications(updated);
    localStorage.setItem(APPS_KEY, JSON.stringify(updated));
    setSelectedApp(null);
    setAdminFeedback('');
  };

  // Admin Actions: Decline
  const handleAdminDecline = (appId: string) => {
    const today = new Date().toLocaleDateString('en-NG', { year: 'numeric', month: '2-digit', day: '2-digit' });

    const updated = applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: 'Declined' as const,
          reviewedAt: today,
          reviewerFeedback: adminFeedback || 'Thank you for your application. Unfortunately, we are unable to offer you a fellowship seat at this time due to high competition.'
        };
      }
      return app;
    });

    setApplications(updated);
    localStorage.setItem(APPS_KEY, JSON.stringify(updated));
    setSelectedApp(null);
    setAdminFeedback('');
  };

  // Reset Application for testing
  const resetCandidateApp = (userId: string) => {
    const updated = applications.filter(a => a.userId !== userId);
    setApplications(updated);
    localStorage.setItem(APPS_KEY, JSON.stringify(updated));
    setFormStep(1);
  };

  // Dynamic Printable Document (Simulated PDF download via Native Print Dialog)
  const generatePrintableDocument = (type: 'application' | 'offer', app: DetailedApplication) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocker is preventing download. Please allow popups for this site!');
      return;
    }

    const titleText = type === 'offer' 
      ? `GTH Admission Offer - ${app.fullName}` 
      : `GTH Fellowship Application - ${app.fullName}`;

    let contentHtml = '';

    if (type === 'offer') {
      contentHtml = `
        <div style="font-family: 'Inter', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #1e293b; line-height: 1.6;">
          <!-- Letterhead header -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #10b981; padding-bottom: 20px; margin-bottom: 30px;">
            <div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 900; color: #0f172a; letter-spacing: -0.05em;">GREENAGE</h1>
              <p style="margin: 3px 0 0 0; font-size: 11px; font-weight: 700; color: #10b981; letter-spacing: 0.3em; text-transform: uppercase;">TALENT HUB</p>
            </div>
            <div style="text-align: right; font-size: 12px; color: #64748b;">
              <p style="margin: 0;"><strong>Greenage Technologies</strong></p>
              <p style="margin: 2px 0;">Enugu Development Laboratory</p>
              <p style="margin: 2px 0;">Enugu State, Nigeria</p>
              <p style="margin: 2px 0;">www.gth.ng | uche@greenagetech.com</p>
            </div>
          </div>

          <!-- Letter Meta -->
          <div style="display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 14px;">
            <div>
              <p style="margin: 0 0 4px 0;"><strong>To Candidate:</strong></p>
              <p style="margin: 0 0 2px 0; font-size: 16px; color: #0f172a;"><strong>${app.fullName}</strong></p>
              <p style="margin: 0 0 2px 0;">Email: ${app.email}</p>
              <p style="margin: 0;">Phone: ${app.phone}</p>
            </div>
            <div style="text-align: right;">
              <p style="margin: 0 0 4px 0;"><strong>Document Info:</strong></p>
              <p style="margin: 0 0 2px 0;">Ref: <strong>GTH-ADM-${app.id.split('-')[2] || 'OFFER'}</strong></p>
              <p style="margin: 0 0 2px 0;">Date issued: ${app.offerSentAt?.split(' ')[0] || '12/07/2026'}</p>
              <p style="margin: 0; color: #b45309;"><strong>Accept by: ${app.offerExpiryDate || '11/08/2026'} (30 Days)</strong></p>
            </div>
          </div>

          <!-- Letter Title -->
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 15px 20px; margin-bottom: 30px; text-align: center;">
            <h2 style="margin: 0; font-size: 18px; color: #047857; text-transform: uppercase; letter-spacing: 0.02em;">OFFER OF ADMISSION: GREEN WORKFORCE FELLOWSHIP</h2>
          </div>

          <!-- Body Text -->
          <div style="font-size: 15px; space-y: 15px; margin-bottom: 40px; text-align: justify;">
            <p>Dear ${app.fullName.split(' ')[0]},</p>
            
            <p>On behalf of the Governing Board and the Academic Admissions Committee of <strong>Greenage Talent Hub (GTH)</strong>, we are incredibly pleased to offer you formal admission into our prestigious <strong>6-Month Green Workforce Fellowship Residency Program</strong>.</p>
            
            <p>Your application was selected from a highly competitive pool of thousands of candidates across Sub-Saharan Africa. The Admissions Board was particularly inspired by your technical aspirations and motivation statement: <em>"${app.motivation}"</em></p>
            
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; color: #475569; letter-spacing: 0.05em;">YOUR RESIDENCY DETAILS:</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; width: 40%;"><strong>Career Track Assigned:</strong></td>
                  <td style="padding: 6px 0; color: #0f172a;"><strong>${app.preferredTrack}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>Program Location:</strong></td>
                  <td style="padding: 6px 0; color: #0f172a;">GTH Laboratory & Production Campus, Enugu</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>Program Duration:</strong></td>
                  <td style="padding: 6px 0; color: #0f172a;">6 Months (Full-Time Immersive Residency)</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>Scholarship Coverage:</strong></td>
                  <td style="padding: 6px 0; color: #10b981;"><strong>100% Fully-funded Technical Tuition</strong></td>
                </tr>
              </table>
            </div>

            <p><strong>Next Steps & Form of Acceptance:</strong></p>
            <p>To accept this offer of admission and secure your seat in the residency laboratory, you must click the <strong>"Accept Offer"</strong> button inside your candidate portal. This offer of admission is valid for exactly <strong>thirty (30) days</strong> from the date of issue and will expire on <strong>${app.offerExpiryDate || '11/08/2026'}</strong> if not accepted.</p>

            <p>Administrative Counselor's Remarks:<br />
            <span style="font-style: italic; color: #475569; font-size: 14px; display: block; border-left: 2.5px solid #10b981; padding-left: 10px; margin-top: 5px;">"${app.reviewerFeedback || 'Great technical potential. We look forward to welcome you on board!'}"</span></p>

            <p>Congratulations once again! We look forward to welcoming you into our campus community and working together to engineer a sustainable African future.</p>
          </div>

          <!-- Signoff & Footer -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; pt-30px;">
            <div>
              <p style="margin: 0 0 45px 0;">Sincerely,</p>
              <div style="font-size: 14px; line-height: 1.4;">
                <p style="margin: 0; font-weight: 700; color: #0f172a;"><strong>Admissions Committee</strong></p>
                <p style="margin: 0; color: #64748b;">Greenage Talent Hub Board</p>
                <p style="margin: 0; font-size: 12px; color: #94a3b8;">Document digitally generated via GTH Core Registry Engine</p>
              </div>
            </div>
            <div style="text-align: right; margin-right: 20px;">
              <!-- Simulated Stamp -->
              <div style="border: 2px dashed #10b981; color: #10b981; font-weight: 800; font-size: 11px; padding: 12px; border-radius: 50%; transform: rotate(-8deg); display: inline-block; text-align: center; width: 90px; height: 90px; box-sizing: border-box; line-height: 1.2; padding-top: 22px; uppercase;">
                OFFICIAL SEAL<br/>GTH ENUGU
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      contentHtml = `
        <div style="font-family: 'Inter', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #1e293b; line-height: 1.6;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #10b981; padding-bottom: 20px; margin-bottom: 30px;">
            <div>
              <h1 style="margin: 0; font-size: 26px; font-weight: 900; color: #0f172a;">GREENAGE</h1>
              <p style="margin: 3px 0 0 0; font-size: 10px; font-weight: 700; color: #10b981; letter-spacing: 0.3em;">TALENT HUB</p>
            </div>
            <div style="text-align: right; font-size: 12px; color: #64748b;">
              <p style="margin: 0;"><strong>Fellowship Application Record</strong></p>
              <p style="margin: 2px 0;">REGISTRY NO: ${app.id}</p>
              <p style="margin: 0;">Submitted: ${app.submittedAt}</p>
            </div>
          </div>

          <div style="background-color: #f1f5f9; border-radius: 8px; padding: 12px 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; color: #475569;">CANDIDATE DOSSIER</span>
            <span style="font-size: 12px; font-weight: 700; background-color: #10b981; color: white; padding: 4px 10px; border-radius: 4px;">STATUS: ${app.status.toUpperCase()}</span>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="border-bottom: 1.5px solid #cbd5e1; padding-bottom: 6px; font-size: 15px; color: #0f172a; text-transform: uppercase; margin-bottom: 15px;">SECTION 1: PERSONAL PARTICULARS</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 30%;">Full Name:</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${app.fullName}</td>
                <td style="padding: 8px 0; color: #64748b; width: 20%;">Gender:</td>
                <td style="padding: 8px 0; color: #0f172a;">${app.gender}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Email Address:</td>
                <td style="padding: 8px 0; color: #0f172a;">${app.email}</td>
                <td style="padding: 8px 0; color: #64748b;">Date of Birth:</td>
                <td style="padding: 8px 0; color: #0f172a;">${app.dateOfBirth}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Phone Number:</td>
                <td style="padding: 8px 0; color: #0f172a;">${app.phone}</td>
                <td style="padding: 8px 0; color: #64748b;">Residence:</td>
                <td style="padding: 8px 0; color: #0f172a;">${app.city}, ${app.stateOfResidence} State</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Full Address:</td>
                <td colspan="3" style="padding: 8px 0; color: #0f172a;">${app.address}</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="border-bottom: 1.5px solid #cbd5e1; padding-bottom: 6px; font-size: 15px; color: #0f172a; text-transform: uppercase; margin-bottom: 15px;">SECTION 2: EDUCATIONAL BACKGROUND</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 30%;">Qualification:</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${app.highestQualification}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Institution Name:</td>
                <td style="padding: 8px 0; color: #0f172a;">${app.institutionName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Course of Study:</td>
                <td style="padding: 8px 0; color: #0f172a;">${app.courseOfStudy}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Graduation Year:</td>
                <td style="padding: 8px 0; color: #0f172a;">${app.graduationYear}</td>
                <td style="padding: 8px 0; color: #64748b; width: 20%;">Grade/GPA:</td>
                <td style="padding: 8px 0; color: #0f172a;">${app.gradeOrGPA}</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 40px;">
            <h3 style="border-bottom: 1.5px solid #cbd5e1; padding-bottom: 6px; font-size: 15px; color: #0f172a; text-transform: uppercase; margin-bottom: 15px;">SECTION 3: PROGRAM SPECIFIC & MOTIVATION</h3>
            <div style="font-size: 14px; margin-bottom: 15px;">
              <p style="margin: 0 0 5px 0; color: #64748b;"><strong>Preferred Fellowship Track:</strong></p>
              <p style="margin: 0; font-size: 16px; color: #047857; font-weight: 700;">${app.preferredTrack}</p>
            </div>
            
            <div style="font-size: 14px; margin-bottom: 15px;">
              <p style="margin: 0 0 5px 0; color: #64748b;"><strong>Prior Experience Level:</strong></p>
              <p style="margin: 0; color: #0f172a;">${app.experienceLevel}</p>
            </div>

            <div style="font-size: 14px; margin-bottom: 15px; text-align: justify;">
              <p style="margin: 0 0 5px 0; color: #64748b;"><strong>Motivation for the Program:</strong></p>
              <p style="margin: 0; color: #1e293b; background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px; font-style: italic;">"${app.motivation}"</p>
            </div>

            <div style="font-size: 14px; text-align: justify;">
              <p style="margin: 0 0 5px 0; color: #64748b;"><strong>Career Goals inside Green Economy:</strong></p>
              <p style="margin: 0; color: #1e293b; background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px;">${app.careerGoals}</p>
            </div>
          </div>

          <div style="border-top: 1.5px solid #cbd5e1; padding-top: 20px; display: flex; justify-content: space-between; font-size: 12px; color: #94a3b8;">
            <span>Registry ID: ${app.id}</span>
            <span>Greenage Talent Hub Digital Registry Engine</span>
            <span>Printed: ${new Date().toLocaleDateString('en-NG')}</span>
          </div>
        </div>
      `;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${titleText}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
          <style>
            @media print {
              body { padding: 0 !important; margin: 0 !important; }
              button { display: none !important; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 20px; background-color: #f8fafc;">
          <!-- Floating Action Print Button -->
          <div style="text-align: center; margin-bottom: 20px; padding: 10px; background: white; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 100; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
            <button onclick="window.print()" style="background-color: #10b981; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-family: 'Inter', sans-serif; cursor: pointer; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.25);">
              Print Document / Save as PDF
            </button>
            <p style="margin: 8px 0 0 0; font-size: 11px; font-family: 'Inter', sans-serif; color: #64748b;">Click the button above and select <strong>"Save as PDF"</strong> in your browser's print destination to export.</p>
          </div>
          <div style="background-color: white; border-radius: 12px; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); padding: 20px; margin: 0 auto; max-width: 850px;">
            ${contentHtml}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Received':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Under Review':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Approved':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Declined':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'Offer Accepted':
        return 'bg-teal-500/20 text-teal-300 border-teal-500/30 font-bold';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  // Helper to count metrics
  const getAdminMetrics = () => {
    return {
      total: applications.length,
      pending: applications.filter(a => a.status === 'Received' || a.status === 'Under Review').length,
      approved: applications.filter(a => a.status === 'Approved').length,
      accepted: applications.filter(a => a.status === 'Offer Accepted').length
    };
  };

  const metrics = getAdminMetrics();
 
  return (
    <div className="w-full max-w-7xl mx-auto pt-24 pb-12 sm:pt-28 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn" id="application-portal">
      
      {/* Active Secure Dispatch Interceptor Toast */}
      {activeNotification && activeNotification.show && (
        <div className="fixed bottom-6 right-6 max-w-sm bg-slate-900/95 border-2 border-emerald-500/40 text-white rounded-2xl p-4 shadow-2xl z-50 animate-fadeIn backdrop-blur-md">
          <div className="flex items-start space-x-3 text-left font-sans">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl mt-0.5">
              <Mail className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-display font-extrabold text-[10px] text-emerald-400 uppercase tracking-widest">
                  Secure Dispatch Relay
                </span>
                <button 
                  onClick={() => setActiveNotification(null)}
                  className="text-slate-400 hover:text-white transition cursor-pointer p-0.5"
                  title="Dismiss notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                Admissions Board securely dispatched a 6-digit access token to <strong className="text-white font-semibold">{activeNotification.email}</strong>:
              </p>
              <div className="bg-slate-950 p-2.5 rounded-xl text-center font-mono text-xl font-black tracking-widest text-emerald-400 border border-emerald-500/10 shadow-inner">
                {activeNotification.code}
              </div>
              <p className="text-[9px] text-slate-500 leading-normal font-sans">
                In production, this security code is routed via email. In active preview mode, the system intercepts the secure handshake here.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* 1. NOT LOGGED IN AUTH VIEWS */}
      {!currentUser ? (
        showVerification ? (
          /* EMAIL VERIFICATION DASHBOARD */
          <div className="max-w-md mx-auto space-y-8 animate-fadeIn text-left">
            <div className="text-center space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono font-bold text-emerald-400 tracking-widest uppercase inline-block">
                Verification Required
              </span>
              <h1 className="font-display font-black text-3xl text-white tracking-tight leading-none">
                Verify Your Email
              </h1>
              <p className="text-sm text-slate-400 font-sans leading-relaxed">
                To secure your admission dossier, please verify your email identity with the 6-digit code.
              </p>
            </div>

            {/* Verification Form Card */}
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-2xl rounded-full" />
              
              <div className="text-center mb-6 space-y-2">
                <div className="mx-auto w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="font-display font-extrabold text-lg text-white">Enter 6-Digit Code</h2>
                <p className="text-xs text-slate-400">
                  Sent to <strong className="text-slate-200">{pendingUser?.email}</strong>
                </p>
              </div>

              {verificationError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl mb-4 text-xs text-red-400 text-left flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{verificationError}</span>
                </div>
              )}

              {verificationSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-4 text-xs text-emerald-400 text-left flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{verificationSuccess}</span>
                </div>
              )}

              <form onSubmit={handleVerifySubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Verification Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 123456"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-center tracking-[0.5em] font-mono text-xl py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-display font-semibold text-xs text-center hover:brightness-110 active:scale-[0.99] transition shadow-lg shadow-emerald-600/10 cursor-pointer"
                >
                  Verify & Activate Dashboard
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between text-xs">
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                >
                  Resend Code
                </button>
                <button
                  type="button"
                  onClick={handleCancelVerification}
                  className="text-slate-400 hover:text-white font-medium cursor-pointer"
                >
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* A. PREMIUM ADMISSION PORTAL HERO SECTION */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono font-bold text-emerald-400 tracking-widest uppercase inline-block">
                Greenage Talent Hub
              </span>
              <h1 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight leading-none">
                Admission & Fellowship Portal
              </h1>
              <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed">
                Register your secure dossier folder, navigate our 3-section screening modules, and track your board-signed admission offer in real-time.
              </p>
            </div>

            {/* Uniqueness Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#0F141E] border border-white/5 space-y-4 hover:border-emerald-500/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-white">Direct Industry Placement</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Our curriculum is designed in partnership with leading renewable developers and EV hubs, guaranteeing direct recruitment channels for graduates.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F141E] border border-white/5 space-y-4 hover:border-emerald-500/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-white">State-of-the-Art Labs</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Train on real-world industrial kits, PLC systems, high-power solar inverters, and battery testing machinery under physical expert supervision.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F141E] border border-white/5 space-y-4 hover:border-emerald-500/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-white">Official Board Accreditation</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Graduate with a comprehensive, verified digital dossier certified by the Greenage Academic Board, opening technical roles globally.
                </p>
              </div>
            </div>

            {/* B. MAIN SPLIT SECTION: Highlights & Authentication Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
              
              {/* Left side: Program details & stats */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900/40 to-slate-950/80 border border-white/5 space-y-6">
                  <div>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      Why the Greenage Fellowship is Different
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-sans">
                      A vocational tech accelerator built for real engineering outcomes.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3.5">
                      <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400 mt-0.5 shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-white">100% Practical and Physical</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          Zero abstract lectures. Every single day in the hub is spent wiring, fabricating, and debugging mechanical and electrical components.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5">
                      <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400 mt-0.5 shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-white">Tailored Career Mentorship</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          Every fellow is assigned an active senior industry expert who oversees their design thesis and aids job matchmaking upon graduation.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5">
                      <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400 mt-0.5 shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-white">Zero Tuition Barrier</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          Highly competitive, fully-funded fellowship packages are awarded to the top-scoring applicants each cohort.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Micro Stats Row */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <span className="font-display font-black text-2xl text-emerald-400 block">120+</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-sans block">Youths Trained</span>
                    </div>
                    <div>
                      <span className="font-display font-black text-2xl text-teal-400 block">6+</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-sans block">Tech Tracks</span>
                    </div>
                    <div>
                      <span className="font-display font-black text-2xl text-blue-400 block">95%</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-sans block">Employment Rate</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side: Login / Signup Form */}
              <div className="lg:col-span-5">
                <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                  {/* Accent radial bg */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-2xl rounded-full" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full" />
                  
                  <div className="text-center space-y-4 mb-6">
                    <div className="flex justify-center mb-1">
                      <GreenageLogo theme="dark" className="h-10" />
                    </div>
                    <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                      Fellowship Application Portal
                    </h2>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      Create an account or login to apply, track your eligibility status, and secure admission.
                    </p>
                  </div>

                  {/* Mode Tabs */}
                  <div className="grid grid-cols-2 bg-slate-950/80 p-1 rounded-xl mb-6 border border-white/5">
                    <button
                      onClick={() => { setAuthMode('login'); setAuthError(''); }}
                      className={`py-2 rounded-lg font-display text-xs font-semibold tracking-wide transition cursor-pointer ${
                        authMode === 'login' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Log In
                    </button>
                    <button
                      onClick={() => { setAuthMode('register'); setAuthError(''); }}
                      className={`py-2 rounded-lg font-display text-xs font-semibold tracking-wide transition cursor-pointer ${
                        authMode === 'register' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Create Account
                    </button>
                  </div>

                  {authError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl mb-4 text-xs text-red-400 text-left flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{authError}</span>
                    </div>
                  )}

                  {authSuccess && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-4 text-xs text-emerald-400 text-left flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{authSuccess}</span>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleAuthSubmit} className="space-y-4 text-left">
                  {authMode === 'register' && (
                    <>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Chinedu Okafor"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Active Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +234 803 123 4567"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. candidate@gth.ng"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Secure Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-display font-semibold text-xs text-center hover:brightness-110 active:scale-[0.99] transition shadow-lg shadow-emerald-600/10 cursor-pointer"
                  >
                    {authMode === 'login' ? 'Log In to Portal' : 'Register Account'}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <span className="text-[10px] text-slate-500 font-sans">
                    Are you an administrator? Use <strong className="text-slate-400 font-semibold">admin@gth.ng</strong> to manage admissions.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    ) : (
        /* 2. LOGGED IN VIEWS */
        <div className="space-y-8">
          
          {/* Header Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
                {currentUser.role === 'admin' ? <Shield className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                <span>{currentUser.role === 'admin' ? 'Admissions Workspace' : 'Candidate Space'}</span>
              </div>
              <h2 className="font-display font-black text-2xl text-white mt-1 leading-none">
                {currentUser.fullName}
              </h2>
              <span className="text-xs text-slate-400 block mt-1.5">{currentUser.email}</span>
            </div>
            
            <div className="flex items-center space-x-3 w-full md:w-auto">
              {currentUser.role === 'candidate' && applications.some(a => a.userId === currentUser.id) && (
                <button
                  onClick={() => resetCandidateApp(currentUser.id)}
                  className="px-3.5 py-1.5 rounded-lg border border-white/10 hover:border-red-500/20 hover:bg-red-500/10 text-[10px] text-slate-400 hover:text-red-400 font-bold transition cursor-pointer"
                >
                  Reset Application (Test)
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 font-bold flex items-center space-x-2 transition cursor-pointer w-full md:w-auto justify-center"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* CANDIDATE FLOW */}
          {currentUser.role === 'candidate' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
              
              {/* Left Segment: Submission state tracker OR 3-Section Form */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* CHECK IF CANDIDATE HAS SUBMITTED AN APPLICATION */}
                {applications.some(a => a.userId === currentUser.id) ? (
                  // CANDIDATE DASHBOARD
                  (() => {
                    const candidateApp = applications.find(a => a.userId === currentUser.id)!;
                    const isApproved = candidateApp.status === 'Approved' || candidateApp.status === 'Offer Accepted';
                    const isOfferAccepted = candidateApp.status === 'Offer Accepted';

                    return (
                      <div className="space-y-6">
                        
                        {/* Process tracker */}
                        <div className="p-6 rounded-2xl bg-[#0d121f] border border-white/10 space-y-4">
                          <h3 className="font-display font-bold text-lg text-white">Application Status</h3>
                          
                          <div className="grid grid-cols-3 gap-2 relative">
                            {/* Track bar background */}
                            <div className="absolute top-4 left-10 right-10 h-0.5 bg-slate-800 z-0" />
                            {/* Fill bar */}
                            <div 
                              className="absolute top-4 left-10 h-0.5 bg-emerald-500 z-0 transition-all duration-500" 
                              style={{ 
                                width: candidateApp.status === 'Received' ? '15%' : isApproved ? '100%' : '50%' 
                              }}
                            />

                            <div className="flex flex-col items-center text-center z-10">
                              <div className="w-9 h-9 rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center font-bold text-xs shadow-md shadow-emerald-500/20">
                                <Check className="w-4 h-4" />
                              </div>
                              <span className="text-[10px] font-bold text-white mt-2">1. Submitted</span>
                              <span className="text-[9px] text-slate-500 font-mono mt-0.5">{candidateApp.submittedAt.split(' ')[0]}</span>
                            </div>

                            <div className="flex flex-col items-center text-center z-10">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-colors ${
                                candidateApp.status !== 'Received' 
                                  ? 'bg-emerald-500 text-slate-900' 
                                  : 'bg-slate-800 text-slate-400 border border-white/5'
                              }`}>
                                {candidateApp.status !== 'Received' ? <Check className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                              </div>
                              <span className="text-[10px] font-bold text-white mt-2">2. Processing</span>
                              <span className="text-[9px] text-slate-500 font-mono mt-0.5">
                                {candidateApp.status === 'Received' ? 'In Queue' : 'Reviewed'}
                              </span>
                            </div>

                            <div className="flex flex-col items-center text-center z-10">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-colors ${
                                isApproved 
                                  ? 'bg-emerald-500 text-slate-900' 
                                  : candidateApp.status === 'Declined' 
                                    ? 'bg-red-500 text-white' 
                                    : 'bg-slate-800 text-slate-400 border border-white/5'
                              }`}>
                                {isApproved ? (
                                  <Award className="w-4 h-4 text-slate-900" />
                                ) : candidateApp.status === 'Declined' ? (
                                  <XCircle className="w-4 h-4" />
                                ) : (
                                  <Award className="w-4 h-4 text-slate-500" />
                                )}
                              </div>
                              <span className="text-[10px] font-bold text-white mt-2">3. Decision</span>
                              <span className="text-[9px] text-slate-500 font-mono mt-0.5">
                                {isApproved ? 'Offer Issued' : candidateApp.status === 'Declined' ? 'Declined' : 'Pending'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 3. GOLDEN ADMISSION OFFER CARD (IF APPROVED OR ACCEPTED) */}
                        {isApproved && (
                          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121E16] via-[#111C1A] to-[#0D121F] border border-emerald-500/30 text-left relative overflow-hidden space-y-6 shadow-xl">
                            {/* Background elements */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full" />
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />

                            <div className="flex items-center space-x-3.5">
                              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                                <Award className="w-7 h-7" />
                              </div>
                              <div>
                                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block">GTH BOARD REF: GTH-ADM-{candidateApp.id.split('-')[2]}</span>
                                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">Admission Offer Extended</h3>
                              </div>
                            </div>

                            <div className="text-sm text-slate-300 space-y-3 leading-relaxed">
                              <p>
                                Congratulations! The Admissions Committee of Greenage Talent Hub has officially approved your application for the fellowship program. You have been awarded a fully-funded technical residency seat.
                              </p>
                              
                              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                                <div>
                                  <span className="text-[10px] text-slate-500 block uppercase">ASSIGNED TRACK:</span>
                                  <span className="text-white font-bold block mt-0.5">{candidateApp.preferredTrack}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-500 block uppercase">OFFER EXPIRY DATE:</span>
                                  <span className="text-amber-400 font-bold block mt-0.5">{candidateApp.offerExpiryDate || '11/08/2026'} (Within 30 Days)</span>
                                </div>
                              </div>

                              {candidateApp.reviewerFeedback && (
                                <div className="p-3.5 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-xs italic text-slate-400">
                                  " {candidateApp.reviewerFeedback} "
                                </div>
                              )}
                            </div>

                            {/* Offer acceptance button */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                              {!isOfferAccepted ? (
                                <button
                                  onClick={() => handleAcceptOffer(candidateApp.id)}
                                  className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 text-white font-display font-bold text-xs text-center flex items-center justify-center space-x-2 transition active:scale-95 cursor-pointer"
                                >
                                  <CheckCircle className="w-4 h-4 animate-bounce" />
                                  <span>Accept GTH Admission Offer</span>
                                </button>
                              ) : (
                                <div className="py-3 px-5 rounded-xl bg-emerald-600/10 border border-emerald-600/30 text-emerald-400 font-display font-bold text-xs flex items-center space-x-2.5">
                                  <Check className="w-4 h-4" />
                                  <span>Offer Formally Accepted on {candidateApp.offerAcceptedAt || '12/07/2026'}!</span>
                                </div>
                              )}

                              <button
                                onClick={() => generatePrintableDocument('offer', candidateApp)}
                                className="py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 font-display font-bold text-xs text-center flex items-center justify-center space-x-2 transition cursor-pointer"
                              >
                                <Download className="w-4 h-4 text-emerald-400" />
                                <span>Download Offer PDF</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* DECLINED NOTIFICATION */}
                        {candidateApp.status === 'Declined' && (
                          <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-left space-y-4">
                            <div className="flex items-center space-x-2.5 text-rose-400">
                              <XCircle className="w-5 h-5" />
                              <h4 className="font-display font-bold text-white">Application Review Completed</h4>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              Thank you for your application to join the Greenage Talent Hub program. Unfortunately, we are unable to offer you a technical seat in this fellowship cohort due to capacity constraints and highly competitive scores.
                            </p>
                            {candidateApp.reviewerFeedback && (
                              <div className="p-3 bg-white/5 rounded-xl text-xs font-mono text-slate-300 italic">
                                Feedback: "{candidateApp.reviewerFeedback}"
                              </div>
                            )}
                          </div>
                        )}

                        {/* DETAILED SUBMITTED APPLICATION SUMMARY CARD */}
                        <div className="p-6 rounded-2xl bg-[#0e1424] border border-white/10 text-left space-y-6">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/5">
                            <div>
                              <h3 className="font-display font-bold text-lg text-white">My Dossier Record</h3>
                              <span className="text-[10px] text-slate-400 font-mono block mt-0.5">REG ID: {candidateApp.id}</span>
                            </div>
                            
                            <button
                              onClick={() => generatePrintableDocument('application', candidateApp)}
                              className="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-white/10 hover:border-emerald-500/30 rounded-xl text-xs font-semibold text-slate-300 flex items-center space-x-1.5 transition cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download Application PDF</span>
                            </button>
                          </div>

                          <div className="space-y-6 font-sans text-xs">
                            {/* Section 1 */}
                            <div>
                              <h4 className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase mb-3 flex items-center space-x-1">
                                <Briefcase className="w-3 h-3" />
                                <span>Section 1: Personal Particulars</span>
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-slate-950/40 p-4 rounded-xl border border-white/5 text-slate-300">
                                <div>
                                  <span className="text-[9px] text-slate-500 uppercase block">Candidate Name</span>
                                  <span className="font-medium text-white block mt-0.5">{candidateApp.fullName}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-slate-500 uppercase block">Email Address</span>
                                  <span className="block mt-0.5">{candidateApp.email}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-slate-500 uppercase block">Phone Number</span>
                                  <span className="block mt-0.5">{candidateApp.phone}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-slate-500 uppercase block">Gender</span>
                                  <span className="block mt-0.5">{candidateApp.gender}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-slate-500 uppercase block">Date of Birth</span>
                                  <span className="block mt-0.5">{candidateApp.dateOfBirth}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-slate-500 uppercase block">Residence</span>
                                  <span className="block mt-0.5">{candidateApp.city}, {candidateApp.stateOfResidence}</span>
                                </div>
                                <div className="sm:col-span-2">
                                  <span className="text-[9px] text-slate-500 uppercase block">Address</span>
                                  <span className="block mt-0.5">{candidateApp.address}</span>
                                </div>
                              </div>
                            </div>

                            {/* Section 2 */}
                            <div>
                              <h4 className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase mb-3 flex items-center space-x-1">
                                <BookOpen className="w-3 h-3" />
                                <span>Section 2: Educational Credentials</span>
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-slate-950/40 p-4 rounded-xl border border-white/5 text-slate-300">
                                <div className="sm:col-span-2">
                                  <span className="text-[9px] text-slate-500 uppercase block">Institution Name</span>
                                  <span className="font-medium text-white block mt-0.5">{candidateApp.institutionName}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-slate-500 uppercase block">Highest Qualification</span>
                                  <span className="block mt-0.5">{candidateApp.highestQualification}</span>
                                </div>
                                <div className="sm:col-span-2">
                                  <span className="text-[9px] text-slate-500 uppercase block">Course of Study</span>
                                  <span className="block mt-0.5">{candidateApp.courseOfStudy}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-slate-500 uppercase block">Graduation / Grade</span>
                                  <span className="block mt-0.5">{candidateApp.graduationYear} (Grade: {candidateApp.gradeOrGPA})</span>
                                </div>
                              </div>
                            </div>

                            {/* Section 3 */}
                            <div>
                              <h4 className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase mb-3 flex items-center space-x-1">
                                <Award className="w-3 h-3" />
                                <span>Section 3: Program Path & Motivation</span>
                              </h4>
                              <div className="space-y-4 bg-slate-950/40 p-4 rounded-xl border border-white/5 text-slate-300">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <span className="text-[9px] text-slate-500 uppercase block">Preferred Residency Track</span>
                                    <span className="font-semibold text-emerald-400 block mt-0.5">{candidateApp.preferredTrack}</span>
                                  </div>
                                  <div>
                                    <span className="text-[9px] text-slate-500 uppercase block">Technical Level</span>
                                    <span className="block mt-0.5">{candidateApp.experienceLevel}</span>
                                  </div>
                                </div>
                                <div>
                                  <span className="text-[9px] text-slate-500 uppercase block">Motivation Statement</span>
                                  <p className="block mt-0.5 italic text-slate-400 leading-relaxed bg-[#0a0f1d] p-3 rounded-lg">
                                    "{candidateApp.motivation}"
                                  </p>
                                </div>
                                <div>
                                  <span className="text-[9px] text-slate-500 uppercase block">Career Aspirations</span>
                                  <p className="block mt-0.5 text-slate-400 leading-relaxed bg-[#0a0f1d] p-3 rounded-lg">
                                    {candidateApp.careerGoals}
                                  </p>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>
                    );
                  })()
                ) : (
                  // CANDIDATE APPLICATION FORM (3-STEPS VIEW)
                  <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-white/10 space-y-6 relative shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
                    
                    {/* Header */}
                    <div className="space-y-2 border-b border-white/5 pb-4">
                      <span className="text-[10px] text-emerald-400 font-mono tracking-widest font-bold uppercase block">SECURE GTH SUBMISSION DOSSIER</span>
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">Fellowship Admission Dossier</h3>
                      <p className="text-xs text-slate-400">
                        Please fill out all three sections of the technical fellowship dossier carefully.
                      </p>
                    </div>

                    {/* Progress indicators */}
                    <div className="grid grid-cols-3 gap-2 py-2">
                      {[
                        { num: 1, label: '1. Personal Profile' },
                        { num: 2, label: '2. Education Details' },
                        { num: 3, label: '3. Track & Motivation' }
                      ].map(step => (
                        <div key={step.num} className="space-y-1.5">
                          <div className={`h-1.5 rounded-full transition-all ${
                            formStep >= step.num ? 'bg-emerald-500' : 'bg-slate-800'
                          }`} />
                          <span className={`text-[10px] font-bold block ${
                            formStep === step.num ? 'text-emerald-400 font-black' : 'text-slate-500'
                          }`}>
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                      
                      {/* STEP 1: PERSONAL PARTICULARS */}
                      {formStep === 1 && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Full Name</label>
                              <input
                                type="text"
                                name="fullName"
                                value={appForm.fullName}
                                onChange={handleFormChange}
                                placeholder="e.g. Chinedu Okafor"
                                className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 ${
                                  formErrors.fullName ? 'border-red-500' : 'border-white/10'
                                }`}
                              />
                              {formErrors.fullName && <span className="text-[9px] text-red-400">{formErrors.fullName}</span>}
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Phone Number</label>
                              <input
                                type="tel"
                                name="phone"
                                value={appForm.phone}
                                onChange={handleFormChange}
                                placeholder="+234 803 123 4567"
                                className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 ${
                                  formErrors.phone ? 'border-red-500' : 'border-white/10'
                                }`}
                              />
                              {formErrors.phone && <span className="text-[9px] text-red-400">{formErrors.phone}</span>}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Gender</label>
                              <select
                                name="gender"
                                value={appForm.gender}
                                onChange={handleFormChange}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                              >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Date of Birth</label>
                              <input
                                type="date"
                                name="dateOfBirth"
                                value={appForm.dateOfBirth}
                                onChange={handleFormChange}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">State of Residence (Nigeria)</label>
                              <select
                                name="stateOfResidence"
                                value={appForm.stateOfResidence}
                                onChange={handleFormChange}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                              >
                                {['Enugu', 'Anambra', 'Ebonyi', 'Abia', 'Imo', 'Lagos', 'Abuja', 'Kano', 'Rivers', 'Other'].map(s => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">City</label>
                              <input
                                type="text"
                                name="city"
                                value={appForm.city}
                                onChange={handleFormChange}
                                placeholder="e.g. Enugu Urban"
                                className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 ${
                                  formErrors.city ? 'border-red-500' : 'border-white/10'
                                }`}
                              />
                              {formErrors.city && <span className="text-[9px] text-red-400">{formErrors.city}</span>}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Residential Address</label>
                            <input
                              type="text"
                              name="address"
                              value={appForm.address}
                              onChange={handleFormChange}
                              placeholder="e.g. 12 Chime Avenue, New Haven, Enugu"
                              className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 ${
                                formErrors.address ? 'border-red-500' : 'border-white/10'
                              }`}
                            />
                            {formErrors.address && <span className="text-[9px] text-red-400">{formErrors.address}</span>}
                          </div>

                          <div className="pt-4 flex justify-end">
                            <button
                              type="button"
                              onClick={handleNextStep}
                              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-display font-semibold text-xs flex items-center space-x-1.5 cursor-pointer"
                            >
                              <span>Next Section: Education</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* STEP 2: EDUCATION DETAILS */}
                      {formStep === 2 && (
                        <div className="space-y-4 text-left">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Highest Academic Qualification</label>
                              <select
                                name="highestQualification"
                                value={appForm.highestQualification}
                                onChange={handleFormChange}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                              >
                                <option value="Secondary School Cert">O'Level / SSCE</option>
                                <option value="OND / NCE">OND / NCE</option>
                                <option value="B.Sc/B.Eng/HND">B.Sc / B.Eng / HND</option>
                                <option value="Postgraduate Degree">M.Sc / Ph.D</option>
                                <option value="Self-taught Pioneer">Self-taught pioneer</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Graduation Year</label>
                              <input
                                type="number"
                                name="graduationYear"
                                value={appForm.graduationYear}
                                onChange={handleFormChange}
                                min="2010"
                                max="2026"
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">University / Polytechnic / College Name</label>
                            <input
                              type="text"
                              name="institutionName"
                              value={appForm.institutionName}
                              onChange={handleFormChange}
                              placeholder="e.g. University of Nigeria, Nsukka"
                              className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 ${
                                formErrors.institutionName ? 'border-red-500' : 'border-white/10'
                              }`}
                            />
                            {formErrors.institutionName && <span className="text-[9px] text-red-400">{formErrors.institutionName}</span>}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Course of Study</label>
                              <input
                                type="text"
                                name="courseOfStudy"
                                value={appForm.courseOfStudy}
                                onChange={handleFormChange}
                                placeholder="e.g. Electrical Engineering"
                                className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 ${
                                  formErrors.courseOfStudy ? 'border-red-500' : 'border-white/10'
                                }`}
                              />
                              {formErrors.courseOfStudy && <span className="text-[9px] text-red-400">{formErrors.courseOfStudy}</span>}
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Grade / Class / GPA</label>
                              <input
                                type="text"
                                name="gradeOrGPA"
                                value={appForm.gradeOrGPA}
                                onChange={handleFormChange}
                                placeholder="e.g. Second Class Upper (3.92/5.0) or Distinction"
                                className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 ${
                                  formErrors.gradeOrGPA ? 'border-red-500' : 'border-white/10'
                                }`}
                              />
                              {formErrors.gradeOrGPA && <span className="text-[9px] text-red-400">{formErrors.gradeOrGPA}</span>}
                            </div>
                          </div>

                          <div className="pt-4 flex justify-between">
                            <button
                              type="button"
                              onClick={handlePrevStep}
                              className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-white/10 text-slate-400 font-display font-semibold text-xs flex items-center space-x-1.5 cursor-pointer"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                              <span>Back</span>
                            </button>
                            <button
                              type="button"
                              onClick={handleNextStep}
                              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-display font-semibold text-xs flex items-center space-x-1.5 cursor-pointer"
                            >
                              <span>Next Section: Motivation</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* STEP 3: PROGRAM SPECIFIC & MOTIVATION */}
                      {formStep === 3 && (
                        <div className="space-y-4 text-left">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Preferred Specialization Track</label>
                              <select
                                name="preferredTrack"
                                value={appForm.preferredTrack}
                                onChange={handleFormChange}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                              >
                                {tracks.map(t => (
                                  <option key={t} value={t}>{t}</option>
                                ))}
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Technical Prior Experience Level</label>
                              <select
                                name="experienceLevel"
                                value={appForm.experienceLevel}
                                onChange={handleFormChange}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                              >
                                <option value="Beginner">Beginner (No prior hardware background)</option>
                                <option value="Intermediate">Intermediate (Some basic laboratory or repair skill)</option>
                                <option value="Advanced">Advanced (Experienced technician or robotics enthusiast)</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide flex justify-between">
                              <span>Motivation statement for the program</span>
                              <span className="text-[8px] text-slate-500 font-normal">Min. 25 characters</span>
                            </label>
                            <textarea
                              name="motivation"
                              rows={4}
                              value={appForm.motivation}
                              onChange={handleFormChange}
                              placeholder="Why are you applying for this fellowship at GTH? What specific hardware passion drives you?"
                              className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 resize-none ${
                                formErrors.motivation ? 'border-red-500' : 'border-white/10'
                              }`}
                            />
                            {formErrors.motivation && <span className="text-[9px] text-red-400">{formErrors.motivation}</span>}
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">What are your long-term career goals inside the green hardware ecosystem?</label>
                            <textarea
                              name="careerGoals"
                              rows={3}
                              value={appForm.careerGoals}
                              onChange={handleFormChange}
                              placeholder="e.g. To set up a regional inverter diagnostics clinic or join a leading solar assembly plant."
                              className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 resize-none ${
                                formErrors.careerGoals ? 'border-red-500' : 'border-white/10'
                              }`}
                            />
                            {formErrors.careerGoals && <span className="text-[9px] text-red-400">{formErrors.careerGoals}</span>}
                          </div>

                          <div className="pt-4 flex justify-between">
                            <button
                              type="button"
                              onClick={handlePrevStep}
                              className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-white/10 text-slate-400 font-display font-semibold text-xs flex items-center space-x-1.5 cursor-pointer"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                              <span>Back</span>
                            </button>
                            
                            <button
                              type="button"
                              onClick={handleAppSubmit}
                              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 text-white font-display font-bold text-xs flex items-center space-x-2 shadow-lg shadow-emerald-600/10 cursor-pointer"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Submit Completed Application</span>
                            </button>
                          </div>
                        </div>
                      )}

                    </form>
                  </div>
                )}
              </div>

              {/* Right Segment: Guidelines & Track overview */}
              <div className="lg:col-span-4 space-y-6">
                
                <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4">
                  <h4 className="font-display font-bold text-white text-sm">Admissions Guideline</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    The GTH Admissions committee reviews folders on a rolling basis. Ensure all statements represent your indigenous drive.
                  </p>
                  
                  <ul className="space-y-3 text-[11px] text-slate-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Personal details</strong>: Full compliance with standard state identifiers.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Education details</strong>: Official qualifications. No certificate transcripts required at this step.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Program motivation</strong>: Emphasize practical hardware alignment.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-[#090e1a] border border-white/10 space-y-4">
                  <h4 className="font-display font-bold text-emerald-400 text-xs tracking-wider uppercase">Active Academies</h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded bg-slate-900/60 text-slate-300">
                      <span className="font-bold text-white block">Green Workforce Academy</span>
                      <span className="text-[10px] text-slate-500">Intense 6-month hands-on solar & power mechanics.</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900/60 text-slate-300">
                      <span className="font-bold text-white block">Innovation Lab & Prototyping</span>
                      <span className="text-[10px] text-slate-500">Venture assembly & localized clean energy equipment manufacturing.</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ADMIN PORTAL FLOW */}
          {currentUser.role === 'admin' && (
            <div className="space-y-6 text-left">
              
              {/* Metric Cards row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#0e1424] border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider block">Total Folders Received</span>
                  <span className="font-display font-black text-2xl text-white block">{metrics.total}</span>
                </div>
                <div className="p-5 rounded-2xl bg-[#0e1424] border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider block">In Review / Pending</span>
                  <span className="font-display font-black text-2xl text-amber-400 block">{metrics.pending}</span>
                </div>
                <div className="p-5 rounded-2xl bg-[#0e1424] border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider block">Admission Offers Issued</span>
                  <span className="font-display font-black text-2xl text-emerald-400 block">{metrics.approved}</span>
                </div>
                <div className="p-5 rounded-2xl bg-[#0e1424] border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider block">Offers Formally Accepted</span>
                  <span className="font-display font-black text-2xl text-teal-300 block">{metrics.accepted}</span>
                </div>
              </div>

              {/* Master Control Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left side: Applications board table */}
                <div className="lg:col-span-8 p-6 rounded-2xl bg-[#0e1424] border border-white/10 space-y-6">
                  
                  {/* Filters Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="font-display font-bold text-lg text-white">Registry Board</h3>
                    
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      <div className="relative flex-grow sm:flex-grow-0">
                        <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
                        <input
                          type="text"
                          placeholder="Search candidate name..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full sm:w-48 pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-white/5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="py-1.5 px-2 bg-slate-950 border border-white/5 rounded-lg text-xs text-slate-400 focus:outline-none"
                      >
                        <option value="All">All Statuses</option>
                        <option value="Received">Received</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Approved">Approved</option>
                        <option value="Declined">Declined</option>
                        <option value="Offer Accepted">Offer Accepted</option>
                      </select>
                    </div>
                  </div>

                  {/* Desktop applications table */}
                  <div className="overflow-x-auto rounded-xl border border-white/5 bg-slate-950/40">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-slate-950 text-slate-400 font-mono text-[9px] uppercase tracking-wider">
                          <th className="p-4 font-bold">Candidate / Registry ID</th>
                          <th className="p-4 font-bold">Track Chosen</th>
                          <th className="p-4 font-bold">Submitted</th>
                          <th className="p-4 font-bold">Status Badge</th>
                          <th className="p-4 font-bold text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {applications
                          .filter(app => {
                            const matchSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase());
                            const matchStatus = statusFilter === 'All' || app.status === statusFilter;
                            return matchSearch && matchStatus;
                          })
                          .map(app => (
                            <tr 
                              key={app.id} 
                              className={`hover:bg-white/5 transition cursor-pointer ${
                                selectedApp?.id === app.id ? 'bg-white/5 border-l-2 border-emerald-500' : ''
                              }`}
                              onClick={() => {
                                setSelectedApp(app);
                                setAdminFeedback(app.reviewerFeedback || '');
                              }}
                            >
                              <td className="p-4">
                                <span className="font-bold text-white block">{app.fullName}</span>
                                <span className="font-mono text-[10px] text-slate-500 block mt-0.5">{app.id}</span>
                              </td>
                              <td className="p-4">
                                <span className="text-slate-300 font-medium block">{app.preferredTrack}</span>
                                <span className="text-[10px] text-slate-500 block mt-0.5">{app.highestQualification}</span>
                              </td>
                              <td className="p-4 text-slate-400 font-mono text-[10px]">
                                {app.submittedAt}
                              </td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded border text-[9px] font-bold block text-center ${getStatusColor(app.status)}`}>
                                  {app.status}
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <button
                                  type="button"
                                  className="px-3 py-1.5 rounded-lg bg-emerald-600/10 border border-emerald-600/30 text-emerald-400 text-[10px] font-bold hover:bg-emerald-600 hover:text-white transition cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedApp(app);
                                    setAdminFeedback(app.reviewerFeedback || '');
                                  }}
                                >
                                  Review Folder
                                </button>
                              </td>
                            </tr>
                          ))}
                        
                        {applications.filter(app => {
                          const matchSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase());
                          const matchStatus = statusFilter === 'All' || app.status === statusFilter;
                          return matchSearch && matchStatus;
                        }).length === 0 && (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-slate-500">
                              No fellowship applications found matching the criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>

                {/* Right side: Selected Application Review Drawer */}
                <div className="lg:col-span-4 space-y-6">
                  {selectedApp ? (
                    <div className="p-6 rounded-2xl bg-[#0e1424] border border-emerald-500/20 text-left space-y-6 shadow-xl relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
                      
                      <div className="flex justify-between items-start pb-2 border-b border-white/5">
                        <div>
                          <span className="text-[9px] text-slate-500 font-mono block">EXAMINING REG NO:</span>
                          <h4 className="font-display font-extrabold text-white text-base leading-none mt-1">
                            {selectedApp.fullName}
                          </h4>
                        </div>
                        <button
                          onClick={() => setSelectedApp(null)}
                          className="p-1 hover:bg-white/5 text-slate-400 hover:text-white rounded transition cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Folder Meta Details in Tabs */}
                      <div className="space-y-4 font-sans text-xs">
                        
                        {/* Section 1 */}
                        <div className="space-y-2">
                          <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider block">1. Particulars Profile</span>
                          <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5 space-y-1 text-slate-300">
                            <p><strong>Email:</strong> {selectedApp.email}</p>
                            <p><strong>Phone:</strong> {selectedApp.phone}</p>
                            <p><strong>Gender/DOB:</strong> {selectedApp.gender} | {selectedApp.dateOfBirth}</p>
                            <p><strong>Residence:</strong> {selectedApp.city}, {selectedApp.stateOfResidence}</p>
                            <p><strong>Address:</strong> {selectedApp.address}</p>
                          </div>
                        </div>

                        {/* Section 2 */}
                        <div className="space-y-2">
                          <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider block">2. Academic Credentials</span>
                          <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5 space-y-1 text-slate-300">
                            <p><strong>Qualification:</strong> {selectedApp.highestQualification}</p>
                            <p><strong>Institution:</strong> {selectedApp.institutionName}</p>
                            <p><strong>Course/Grad Year:</strong> {selectedApp.courseOfStudy} ({selectedApp.graduationYear})</p>
                            <p><strong>Grade Performance:</strong> {selectedApp.gradeOrGPA}</p>
                          </div>
                        </div>

                        {/* Section 3 */}
                        <div className="space-y-2">
                          <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider block">3. Program Path & Drive</span>
                          <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5 space-y-1 text-slate-300">
                            <p><strong>Specialization:</strong> <strong className="text-emerald-400">{selectedApp.preferredTrack}</strong></p>
                            <p><strong>Exp Level:</strong> {selectedApp.experienceLevel}</p>
                            <p className="mt-2 text-slate-400 bg-black/30 p-2 rounded italic">
                              Motivation: "${selectedApp.motivation}"
                            </p>
                            <p className="mt-2 text-slate-400 bg-black/30 p-2 rounded">
                              Goals: ${selectedApp.careerGoals}
                            </p>
                          </div>
                        </div>

                        {/* Interactive Board Review Decision block */}
                        <div className="space-y-3 pt-3 border-t border-white/5">
                          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide block">Reviewer Feedback Note</label>
                          <textarea
                            rows={3}
                            placeholder="Add your comments to admission letter or decline notice..."
                            value={adminFeedback}
                            onChange={(e) => setAdminFeedback(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none resize-none"
                          />

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => handleAdminApprove(selectedApp.id)}
                              className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-xs text-center flex items-center justify-center space-x-1 transition cursor-pointer"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Approve Folder</span>
                            </button>
                            
                            <button
                              type="button"
                              onClick={() => handleAdminDecline(selectedApp.id)}
                              className="py-2.5 rounded-xl bg-rose-950 hover:bg-rose-900 border border-rose-500/30 text-rose-300 font-display font-bold text-xs text-center flex items-center justify-center space-x-1 transition cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Decline Folder</span>
                            </button>
                          </div>
                        </div>

                        {/* Print action directly for admin */}
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => generatePrintableDocument('application', selectedApp)}
                            className="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-white/5 text-slate-300 font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 transition cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Download Full Application Dossier</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-[#0e1424] border border-white/10 text-center py-12 text-slate-500 space-y-3">
                      <FileText className="w-8 h-8 mx-auto text-slate-600" />
                      <p className="text-xs">
                        Select a fellowship application dossier from the table on the left to review its details and make an admission decision.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
