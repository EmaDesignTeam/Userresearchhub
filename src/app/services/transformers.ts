import type { Candidate, Session, Insight, User, ActivityItem, Recording } from '../types';

// =====================================================
// DATABASE TO FRONTEND TRANSFORMERS
// =====================================================

export function transformCandidate(dbCandidate: any): Candidate {
  if (!dbCandidate) {
    throw new Error('Cannot transform null or undefined candidate');
  }
  
  return {
    id: dbCandidate.id,
    name: dbCandidate.name || 'Unknown',
    department: dbCandidate.department?.name || 'Unknown',
    title: dbCandidate.title || '',
    location: dbCandidate.location || '',
    dateOfJoining: dbCandidate.date_of_joining || '',
    researchStatus: dbCandidate.research_status || 'To be scheduled',
    featuresTested: Array.isArray(dbCandidate.features_tested) ? dbCandidate.features_tested : [],
    userType: dbCandidate.user_type || 'Builder',
    recordings: [],
    notes: dbCandidate.notes || '',
    sessions: Array.isArray(dbCandidate.sessions) ? dbCandidate.sessions.map((s: any) => s.id) : []
  };
}

export function transformSession(dbSession: any): Session {
  if (!dbSession) {
    throw new Error('Cannot transform null or undefined session');
  }
  
  return {
    id: dbSession.id,
    candidateId: dbSession.candidate_id || '',
    product: dbSession.product || '',
    featuresTested: Array.isArray(dbSession.features_tested) ? dbSession.features_tested : [],
    moderator: dbSession.moderator || '',
    date: dbSession.session_date || '',
    time: dbSession.session_time || '',
    duration: dbSession.duration || '',
    status: dbSession.status || 'Scheduled',
    recordingLink: dbSession.recording_link,
    sessionNotes: dbSession.session_notes || '',
    objectives: dbSession.objectives,
    observations: dbSession.observations,
    quotes: dbSession.quotes,
    issuesFound: []
  };
}

export function transformInsight(dbInsight: any): Insight {
  if (!dbInsight) {
    throw new Error('Cannot transform null or undefined insight');
  }
  
  return {
    id: dbInsight.id,
    title: dbInsight.title || 'Untitled',
    description: dbInsight.description || '',
    userInterviewed: dbInsight.user_interviewed || '',
    product: dbInsight.product || '',
    status: dbInsight.status || 'Picked up',
    triageStatus: dbInsight.triage_status || 'Todo',
    priority: dbInsight.priority || 'P2',
    category: dbInsight.category || 'Other',
    team: dbInsight.team?.name || 'FE',
    effort: dbInsight.effort || 'md',
    attachments: Array.isArray(dbInsight.attachments) ? dbInsight.attachments : [],
    tags: Array.isArray(dbInsight.tags) ? dbInsight.tags : [],
    assignee: dbInsight.assignee,
    createdAt: dbInsight.created_at || new Date().toISOString(),
    updatedAt: dbInsight.updated_at || new Date().toISOString()
  };
}

export function transformUser(dbUser: any): User {
  if (!dbUser) {
    throw new Error('Cannot transform null or undefined user');
  }
  
  return {
    id: dbUser.id,
    name: dbUser.name || 'Unknown User',
    email: dbUser.email || '',
    role: dbUser.role || 'Viewer',
    team: dbUser.team?.name || 'FE',
    status: dbUser.status || 'Active'
  };
}

export function transformActivity(dbActivity: any): ActivityItem {
  if (!dbActivity) {
    throw new Error('Cannot transform null or undefined activity');
  }
  
  return {
    id: dbActivity.id,
    type: dbActivity.activity_type,
    user: dbActivity.user_name || 'Unknown',
    candidateName: dbActivity.candidate_name,
    oldStatus: dbActivity.old_status,
    newStatus: dbActivity.new_status,
    insightTitle: dbActivity.insight_title,
    timestamp: dbActivity.created_at || new Date().toISOString()
  };
}

export function transformRecording(dbRecording: any): Recording {
  return {
    id: dbRecording.id,
    title: dbRecording.title,
    url: dbRecording.url,
    date: dbRecording.recording_date,
    candidateId: dbRecording.candidate_id,
    sessionId: dbRecording.session_id
  };
}

// =====================================================
// FRONTEND TO DATABASE TRANSFORMERS
// =====================================================

export function toDbCandidate(candidate: Partial<Candidate>, departmentId?: string) {
  return {
    name: candidate.name,
    department_id: departmentId,
    title: candidate.title,
    location: candidate.location,
    date_of_joining: candidate.dateOfJoining,
    research_status: candidate.researchStatus,
    features_tested: candidate.featuresTested,
    user_type: candidate.userType,
    notes: candidate.notes
  };
}

export function toDbSession(session: Partial<Session>) {
  return {
    candidate_id: session.candidateId,
    product: session.product,
    features_tested: session.featuresTested,
    moderator: session.moderator,
    session_date: session.date,
    session_time: session.time,
    duration: session.duration,
    status: session.status,
    recording_link: session.recordingLink,
    session_notes: session.sessionNotes,
    objectives: session.objectives,
    observations: session.observations,
    quotes: session.quotes
  };
}

export function toDbInsight(insight: Partial<Insight>, teamId?: string) {
  return {
    title: insight.title,
    description: insight.description,
    user_interviewed: insight.userInterviewed,
    product: insight.product,
    status: insight.status,
    triage_status: insight.triageStatus,
    priority: insight.priority,
    category: insight.category,
    team_id: teamId,
    effort: insight.effort,
    attachments: insight.attachments,
    tags: insight.tags,
    assignee: insight.assignee
  };
}

export function toDbUser(user: Partial<User>, teamId?: string) {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
    team_id: teamId,
    status: user.status
  };
}

export function toDbRecording(recording: Partial<Recording>) {
  return {
    title: recording.title,
    url: recording.url,
    recording_date: recording.date,
    candidate_id: recording.candidateId,
    session_id: recording.sessionId
  };
}