import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Candidate, Session, Insight, User, Product, ActivityItem, Recording } from '../types';

// Sample data based on user's sheets
const initialCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Hiten Vidhani',
    department: 'Engineering',
    title: 'Software Engineer',
    location: 'Mumbai',
    dateOfJoining: '2023-01-15',
    researchStatus: 'Completed',
    featuresTested: ['Voice AIE'],
    userType: 'End User',
    recordings: [],
    notes: 'Very helpful feedback on Voice AIE usability',
    sessions: ['1']
  },
  {
    id: '2',
    name: 'Priyanshu',
    department: 'Product',
    title: 'Product Manager',
    location: 'Bangalore',
    dateOfJoining: '2022-11-20',
    researchStatus: 'Completed',
    featuresTested: ['GWE', 'Auto builder'],
    userType: 'Builder',
    recordings: [],
    notes: 'Great insights on workflow optimization',
    sessions: ['2']
  },
  {
    id: '3',
    name: 'Parth Baghel',
    department: 'Engineering',
    title: 'Senior Engineer',
    location: 'Delhi',
    dateOfJoining: '2023-03-10',
    researchStatus: 'Completed',
    featuresTested: ['GWE', 'Auto builder'],
    userType: 'Builder',
    recordings: [],
    notes: 'Detailed feedback on Auto builder features',
    sessions: ['3']
  },
  {
    id: '4',
    name: 'Somesh Mishra',
    department: 'Design',
    title: 'UX Designer',
    location: 'Pune',
    dateOfJoining: '2022-08-05',
    researchStatus: 'Completed',
    featuresTested: ['Voice AIE'],
    userType: 'Builder',
    recordings: [],
    notes: '',
    sessions: []
  },
  {
    id: '5',
    name: 'Sourodeep Roy',
    department: 'Engineering',
    title: 'Full Stack Developer',
    location: 'Kolkata',
    dateOfJoining: '2023-05-12',
    researchStatus: 'Completed',
    featuresTested: ['GWE', 'Auto builder'],
    userType: 'Builder',
    recordings: [],
    notes: '',
    sessions: []
  },
  {
    id: '6',
    name: 'Ananya Sharma',
    department: 'Product',
    title: 'Associate PM',
    location: 'Mumbai',
    dateOfJoining: '2023-09-01',
    researchStatus: 'Scheduled',
    featuresTested: ['Doc writer'],
    userType: 'End User',
    recordings: [],
    notes: '',
    sessions: []
  },
  {
    id: '7',
    name: 'Rahul Mehta',
    department: 'Engineering',
    title: 'Backend Engineer',
    location: 'Hyderabad',
    dateOfJoining: '2023-07-20',
    researchStatus: 'To be scheduled',
    featuresTested: [],
    userType: 'Builder',
    recordings: [],
    notes: '',
    sessions: []
  }
];

const initialSessions: Session[] = [
  {
    id: '1',
    candidateId: '1',
    product: 'Voice AIE',
    featuresTested: ['Voice AIE'],
    moderator: 'Sarah Johnson',
    date: '2023-12-15',
    time: '14:00',
    duration: '45 mins',
    status: 'Completed',
    sessionNotes: 'User found the interface intuitive but suggested improvements to error handling.',
    objectives: 'Test Voice AIE usability',
    observations: 'User struggled with configuration setup initially',
    quotes: '"The voice recognition is impressive, but I wish error messages were clearer"',
    issuesFound: ['insight1', 'insight2']
  },
  {
    id: '2',
    candidateId: '2',
    product: 'GWE',
    featuresTested: ['GWE', 'Auto builder'],
    moderator: 'Mike Chen',
    date: '2023-12-18',
    time: '10:00',
    duration: '60 mins',
    status: 'Completed',
    sessionNotes: 'Excellent feedback on Auto builder workflow',
    issuesFound: ['insight3', 'insight4']
  },
  {
    id: '3',
    candidateId: '3',
    product: 'Auto builder',
    featuresTested: ['Auto builder'],
    moderator: 'Sarah Johnson',
    date: '2023-12-20',
    time: '15:30',
    duration: '50 mins',
    status: 'Completed',
    sessionNotes: 'Detailed technical insights',
    issuesFound: ['insight1']
  }
];

const initialInsights: Insight[] = [
  {
    id: 'insight1',
    title: 'Shared configuration and Auto builder modal open together. Not sure what to focus on',
    description: 'When both the shared configuration panel and Auto builder modal are open simultaneously, users are confused about which interface to interact with. This creates cognitive overload and decision paralysis.',
    userInterviewed: '2',
    product: 'Auto builder',
    status: 'Under development',
    triageStatus: 'In progress',
    priority: 'P0',
    category: 'Other',
    team: 'FE',
    effort: 'xs',
    attachments: [],
    tags: ['UX', 'confusion'],
    assignee: 'Dev Team',
    createdAt: '2023-12-18T10:00:00Z',
    updatedAt: '2023-12-19T14:30:00Z'
  },
  {
    id: 'insight2',
    title: 'Knowledge search number of chunks selection should not be lesser than 0',
    description: 'Currently the system allows users to set negative values for chunk selection which causes errors. Need to add validation to enforce minimum value of 0.',
    userInterviewed: '1',
    product: 'Voice AIE',
    status: 'Picked up',
    triageStatus: 'Todo',
    priority: 'P0',
    category: 'Bug',
    team: 'FE',
    effort: 'xs',
    attachments: [],
    tags: ['validation', 'bug'],
    createdAt: '2023-12-15T14:00:00Z',
    updatedAt: '2023-12-15T14:00:00Z'
  },
  {
    id: 'insight3',
    title: 'Used templates to create AIE… why is AIE disabled? Error says config output?',
    description: 'Users are confused when they create an AIE using templates but then find it disabled with unclear error messaging about configuration output. Need better error messaging and UX flow.',
    userInterviewed: '2',
    product: 'Voice AIE',
    status: 'Picked up',
    triageStatus: 'Todo',
    priority: 'P0',
    category: 'Feature Enhancement',
    team: 'PM',
    effort: 'sm',
    attachments: [],
    tags: ['templates', 'error-messaging'],
    createdAt: '2023-12-18T10:30:00Z',
    updatedAt: '2023-12-18T10:30:00Z'
  },
  {
    id: 'insight4',
    title: 'Add examples to glossary. Don\'t know what to specify',
    description: 'The glossary feature lacks examples, making it difficult for users to understand what kind of content they should add. Need to provide placeholder examples and tooltips.',
    userInterviewed: '2',
    product: 'GWE',
    status: 'Picked up',
    triageStatus: 'Todo',
    priority: 'P0',
    category: 'Copy Change',
    team: 'UX',
    effort: 'xs',
    attachments: [],
    tags: ['documentation', 'help-text'],
    createdAt: '2023-12-18T11:00:00Z',
    updatedAt: '2023-12-18T11:00:00Z'
  },
  {
    id: 'insight5',
    title: 'Tag creation UI… examples like country/state',
    description: 'Tag creation interface needs contextual examples. Users suggested showing real-world examples like country/state to help them understand the taxonomy structure.',
    userInterviewed: '3',
    product: 'GWE',
    status: 'Resolved',
    triageStatus: 'Done',
    priority: 'P0',
    category: 'Copy Change',
    team: 'UX',
    effort: 'xs',
    attachments: [],
    tags: ['tags', 'examples'],
    createdAt: '2023-12-20T15:30:00Z',
    updatedAt: '2023-12-21T09:00:00Z'
  }
];

const initialProducts: Product[] = [
  { id: '1', name: 'GWE', features: ['Workflow Builder', 'Templates', 'Glossary', 'Tags'] },
  { id: '2', name: 'Auto builder', features: ['Shared Configuration', 'Templates', 'Modal Interface'] },
  { id: '3', name: 'Voice AIE', features: ['Voice Recognition', 'Configuration', 'Knowledge Search'] },
  { id: '4', name: 'Doc writer', features: ['Document Generation', 'Templates', 'Formatting'] }
];

const initialUsers: User[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Admin', team: 'PM', status: 'Active' },
  { id: '2', name: 'Mike Chen', email: 'mike@company.com', role: 'Researcher', team: 'UX', status: 'Active' },
  { id: '3', name: 'Emily Davis', email: 'emily@company.com', role: 'Researcher', team: 'UX', status: 'Active' },
  { id: '4', name: 'David Kim', email: 'david@company.com', role: 'Viewer', team: 'FE', status: 'Active' }
];

const initialActivity: ActivityItem[] = [
  {
    id: 'a1',
    type: 'insight_resolved',
    user: 'Sarah Johnson',
    insightTitle: 'Tag creation UI… examples like country/state',
    timestamp: '2023-12-21T09:00:00Z'
  },
  {
    id: 'a2',
    type: 'status_changed',
    user: 'Mike Chen',
    candidateName: 'Parth Baghel',
    oldStatus: 'Scheduled',
    newStatus: 'Completed',
    timestamp: '2023-12-20T16:00:00Z'
  },
  {
    id: 'a3',
    type: 'insight_created',
    user: 'Sarah Johnson',
    insightTitle: 'Add examples to glossary',
    timestamp: '2023-12-18T11:00:00Z'
  },
  {
    id: 'a4',
    type: 'session_scheduled',
    user: 'Mike Chen',
    candidateName: 'Ananya Sharma',
    timestamp: '2023-12-17T14:30:00Z'
  },
  {
    id: 'a5',
    type: 'candidate_added',
    user: 'Emily Davis',
    candidateName: 'Rahul Mehta',
    timestamp: '2023-12-16T10:00:00Z'
  }
];

interface AppContextType {
  candidates: Candidate[];
  sessions: Session[];
  insights: Insight[];
  products: Product[];
  users: User[];
  activity: ActivityItem[];
  currentUser: User;
  addCandidate: (candidate: Omit<Candidate, 'id'>) => void;
  updateCandidate: (id: string, candidate: Partial<Candidate>) => void;
  deleteCandidate: (id: string) => void;
  addSession: (session: Omit<Session, 'id'>) => void;
  updateSession: (id: string, session: Partial<Session>) => void;
  addInsight: (insight: Omit<Insight, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateInsight: (id: string, insight: Partial<Insight>) => void;
  addActivity: (activity: Omit<ActivityItem, 'id'>) => void;
  addRecording: (candidateId: string, recording: Omit<Recording, 'id'>) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [insights, setInsights] = useState<Insight[]>(initialInsights);
  const [products] = useState<Product[]>(initialProducts);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [activity, setActivity] = useState<ActivityItem[]>(initialActivity);
  const [currentUser] = useState<User>(initialUsers[0]); // Sarah Johnson as current user

  const addCandidate = (candidate: Omit<Candidate, 'id'>) => {
    const newCandidate = {
      ...candidate,
      id: `candidate_${Date.now()}`
    };
    setCandidates(prev => [newCandidate, ...prev]);
    addActivity({
      type: 'candidate_added',
      user: currentUser.name,
      candidateName: candidate.name,
      timestamp: new Date().toISOString()
    });
  };

  const updateCandidate = (id: string, updates: Partial<Candidate>) => {
    setCandidates(prev =>
      prev.map(c => {
        if (c.id === id) {
          const oldStatus = c.researchStatus;
          const newStatus = updates.researchStatus;
          if (oldStatus !== newStatus && newStatus) {
            addActivity({
              type: 'status_changed',
              user: currentUser.name,
              candidateName: c.name,
              oldStatus,
              newStatus,
              timestamp: new Date().toISOString()
            });
          }
          return { ...c, ...updates };
        }
        return c;
      })
    );
  };

  const deleteCandidate = (id: string) => {
    setCandidates(prev => prev.filter(c => c.id !== id));
  };

  const addSession = (session: Omit<Session, 'id'>) => {
    const newSession = {
      ...session,
      id: `session_${Date.now()}`
    };
    setSessions(prev => [newSession, ...prev]);
    
    // Update candidate with session link
    updateCandidate(session.candidateId, {
      sessions: [...(candidates.find(c => c.id === session.candidateId)?.sessions || []), newSession.id]
    });
    
    const candidate = candidates.find(c => c.id === session.candidateId);
    if (candidate) {
      addActivity({
        type: 'session_scheduled',
        user: currentUser.name,
        candidateName: candidate.name,
        timestamp: new Date().toISOString()
      });
    }
  };

  const updateSession = (id: string, updates: Partial<Session>) => {
    setSessions(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  };

  const addInsight = (insight: Omit<Insight, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newInsight = {
      ...insight,
      id: `insight_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setInsights(prev => [newInsight, ...prev]);
    addActivity({
      type: 'insight_created',
      user: currentUser.name,
      insightTitle: insight.title,
      timestamp: new Date().toISOString()
    });
  };

  const updateInsight = (id: string, updates: Partial<Insight>) => {
    setInsights(prev =>
      prev.map(i => {
        if (i.id === id) {
          const wasResolved = i.status !== 'Resolved' && updates.status === 'Resolved';
          if (wasResolved) {
            addActivity({
              type: 'insight_resolved',
              user: currentUser.name,
              insightTitle: i.title,
              timestamp: new Date().toISOString()
            });
          }
          return { ...i, ...updates, updatedAt: new Date().toISOString() };
        }
        return i;
      })
    );
  };

  const addActivity = (newActivity: Omit<ActivityItem, 'id'>) => {
    setActivity(prev => [
      {
        ...newActivity,
        id: `activity_${Date.now()}`
      },
      ...prev
    ]);
  };

  const addRecording = (candidateId: string, recording: Omit<Recording, 'id'>) => {
    const newRecording = {
      ...recording,
      id: `recording_${Date.now()}`,
      candidateId
    };
    updateCandidate(candidateId, {
      recordings: [...(candidates.find(c => c.id === candidateId)?.recordings || []), newRecording]
    });
  };

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = {
      ...user,
      id: `user_${Date.now()}`
    };
    setUsers(prev => [newUser, ...prev]);
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...updates } : u)));
  };

  return (
    <AppContext.Provider
      value={{
        candidates,
        sessions,
        insights,
        products,
        users,
        activity,
        currentUser,
        addCandidate,
        updateCandidate,
        deleteCandidate,
        addSession,
        updateSession,
        addInsight,
        updateInsight,
        addActivity,
        addRecording,
        addUser,
        updateUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
