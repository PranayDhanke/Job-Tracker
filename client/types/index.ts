export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  company: string;
  role: string;
  location?: string;
  jobUrl?: string;
  description?: string;
  employmentType?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Temporary';
  salaryMin?: number;
  salaryMax?: number;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  job?: Job;
  status: 'Saved' | 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected' | 'Withdrawn';
  appliedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  applicationId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  type: 'Phone Screen' | 'Technical Interview' | 'System Design' | 'Behavioral' | 'Final Round';
  date: string;
  duration: number;
  meetingUrl?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  applicationId: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

export interface DashboardStats {
  totalJobs: number;
  totalApplications: number;
  totalInterviews: number;
  totalOffers: number;
  applicationActivity: { month: string; applications: number }[];
  pipeline: { stage: string; count: number }[];
  upcomingInterviews: Interview[];
  recentApplications: Application[];
}

export interface AdminStats {
  totalUsers: number;
  totalJobs: number;
  totalApplications: number;
  totalInterviews: number;
  userGrowth: { month: string; users: number }[];
  applicationStatusDistribution: { name: string; value: number }[];
  interviewTypes: { name: string; value: number }[];
  monthlyApplications: { month: string; count: number }[];
}
