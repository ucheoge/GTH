export type ActiveTab = 'home' | 'about' | 'fellowship' | 'portal' | 'contact';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: 'candidate' | 'admin';
  createdAt: string;
  isVerified?: boolean;
}

export interface DetailedApplication {
  id: string;
  userId: string;
  email: string;
  status: 'Received' | 'Under Review' | 'Approved' | 'Declined' | 'Offer Accepted' | 'Offer Declined';
  submittedAt: string;
  
  // Section 1: Personal Details
  fullName: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  stateOfResidence: string;
  city: string;
  address: string;

  // Section 2: Education
  highestQualification: string;
  institutionName: string;
  courseOfStudy: string;
  graduationYear: string;
  gradeOrGPA: string;

  // Section 3: Motivation & Track
  preferredTrack: string;
  motivation: string;
  careerGoals: string;
  experienceLevel: string;

  // Review & Offer State
  reviewedAt?: string;
  reviewerFeedback?: string;
  offerSentAt?: string;
  offerAcceptedAt?: string;
  offerDeclinedAt?: string;
  offerExpiryDate?: string;
}

export interface FellowshipApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  state: string;
  educationalBackground: string;
  preferredTrack: string;
  motivation: string;
  submittedAt: string;
  status: 'Received' | 'Screening' | 'Interview scheduled' | 'Accepted' | 'Declined' | 'Offer Accepted';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export interface Sector {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface Track {
  id: string;
  title: string;
  description: string;
  learnPoints: string[];
  duration: string;
  equipment: string[];
  careers: string[];
}

