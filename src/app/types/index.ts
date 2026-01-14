export type ResearchStatus = 'To be scheduled' | 'Scheduled' | 'Completed' | 'Skipped';
export type UserType = 'Builder' | 'End User';
export type InsightStatus = 'Picked up' | 'Under development' | 'Resolved' | 'Skipped';
export type TriageStatus = 'Todo' | 'In progress' | 'Done';
export type Priority = 'P0' | 'P1' | 'P2';
export type Category = 'Bug' | 'Feature Enhancement' | 'Copy Change' | 'Other';
export type Team = 'FE' | 'PM' | 'UX';
export type Effort = 'xs' | 'sm' | 'md' | 'lg';
export type UserRole = 'Admin' | 'Researcher' | 'Viewer';
export type SessionStatus = 'Scheduled' | 'Completed' | 'Skipped';

export interface Recording {
  id: string;
  title: string;
  url: string;
  date: string;
  candidateId?: string;
  sessionId?: string;
}

export interface Candidate {
  id: string;
  name: string;
  department: string;
  title: string;
  location: string;
  dateOfJoining: string;
  researchStatus: ResearchStatus;
  featuresTested: string[];
  userType: UserType;
  recordings: Recording[];
  notes: string;
  sessions: string[]; // session IDs
}

export interface Session {
  id: string;
  candidateId: string;
  product: string;
  featuresTested: string[];
  moderator: string;
  date: string;
  time: string;
  duration: string;
  status: SessionStatus;
  recordingLink?: string;
  sessionNotes: string;
  objectives?: string;
  observations?: string;
  quotes?: string;
  issuesFound?: string[];
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  userInterviewed: string; // candidate ID
  product: string;
  status: InsightStatus;
  triageStatus: TriageStatus;
  priority: Priority;
  category: Category;
  team: Team;
  effort: Effort;
  attachments: string[];
  tags: string[];
  assignee?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  team: Team;
  status: 'Invited' | 'Active' | 'Disabled';
}

export interface Product {
  id: string;
  name: string;
  features: string[];
}

export interface ActivityItem {
  id: string;
  type: 'candidate_added' | 'status_changed' | 'session_scheduled' | 'insight_created' | 'insight_resolved';
  user: string;
  candidateName?: string;
  oldStatus?: string;
  newStatus?: string;
  insightTitle?: string;
  timestamp: string;
}
