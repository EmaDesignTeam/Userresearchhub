import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Candidate, Session, Insight, User, Product, ActivityItem, Recording } from '../types';
import * as api from '../services/api';
import * as transformers from '../services/transformers';

// Sample products (not stored in DB yet)
const initialProducts: Product[] = [
  { id: '1', name: 'GWE', features: ['Workflow Builder', 'Templates', 'Glossary', 'Tags'] },
  { id: '2', name: 'Auto builder', features: ['Shared Configuration', 'Templates', 'Modal Interface'] },
  { id: '3', name: 'Voice AIE', features: ['Voice Recognition', 'Configuration', 'Knowledge Search'] },
  { id: '4', name: 'Doc writer', features: ['Document Generation', 'Templates', 'Formatting'] }
];

interface AppContextType {
  candidates: Candidate[];
  sessions: Session[];
  insights: Insight[];
  products: Product[];
  users: User[];
  activity: ActivityItem[];
  currentUser: User | null;
  departments: any[];
  teams: any[];
  loading: boolean;
  error: string | null;
  addCandidate: (candidate: Omit<Candidate, 'id'>) => Promise<void>;
  updateCandidate: (id: string, candidate: Partial<Candidate>) => Promise<void>;
  deleteCandidate: (id: string) => Promise<void>;
  addSession: (session: Omit<Session, 'id'>) => Promise<void>;
  updateSession: (id: string, session: Partial<Session>) => Promise<void>;
  addInsight: (insight: Omit<Insight, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateInsight: (id: string, insight: Partial<Insight>) => Promise<void>;
  addActivity: (activity: Omit<ActivityItem, 'id'>) => void;
  addRecording: (candidateId: string, recording: Omit<Recording, 'id'>) => Promise<void>;
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [products] = useState<Product[]>(initialProducts);
  const [users, setUsers] = useState<User[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [departments, setDepartments] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data on mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        candidatesData,
        sessionsData,
        insightsData,
        usersData,
        activityData,
        departmentsData,
        teamsData
      ] = await Promise.all([
        api.getCandidates(),
        api.getSessions(),
        api.getInsights(),
        api.getUsers(),
        api.getActivity(),
        api.getDepartments(),
        api.getTeams()
      ]);

      // Transform and filter out null/undefined values
      const transformedCandidates = (candidatesData || [])
        .filter(Boolean)
        .map(transformers.transformCandidate)
        .filter(Boolean);
      
      const transformedSessions = (sessionsData || [])
        .filter(Boolean)
        .map(transformers.transformSession)
        .filter(Boolean);
      
      const transformedInsights = (insightsData || [])
        .filter(Boolean)
        .map(transformers.transformInsight)
        .filter(Boolean);
      
      const transformedUsers = (usersData || [])
        .filter(Boolean)
        .map(transformers.transformUser)
        .filter(Boolean);
      
      const transformedActivity = (activityData || [])
        .filter(Boolean)
        .map(transformers.transformActivity)
        .filter(Boolean);

      setCandidates(transformedCandidates);
      setSessions(transformedSessions);
      setInsights(transformedInsights);
      setUsers(transformedUsers);
      setActivity(transformedActivity);
      setDepartments(departmentsData || []);
      setTeams(teamsData || []);

      // Set first admin user as current user
      const adminUser = (usersData || []).find((u: any) => u.role === 'Admin');
      if (adminUser) {
        setCurrentUser(transformers.transformUser(adminUser));
      } else {
        // Fallback: create a default user if none exists
        console.warn('No admin user found, using fallback user');
        setCurrentUser({
          id: 'fallback',
          name: 'Admin User',
          email: 'admin@researchhub.com',
          role: 'Admin',
          team: 'FE',
          status: 'Active'
        });
      }
    } catch (err) {
      console.error('Error loading initial data:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await loadInitialData();
  };

  const addCandidate = async (candidate: Omit<Candidate, 'id'>) => {
    try {
      // Find department ID
      const department = departments.find(d => d.name === candidate.department);
      const dbData = transformers.toDbCandidate(candidate, department?.id);
      
      const newCandidate = await api.createCandidate(dbData, currentUser?.name || 'System');
      setCandidates(prev => [transformers.transformCandidate(newCandidate), ...prev]);
      
      // Refresh activity
      const activityData = await api.getActivity();
      setActivity(activityData.map(transformers.transformActivity));
    } catch (err) {
      console.error('Error adding candidate:', err);
      throw err;
    }
  };

  const updateCandidate = async (id: string, updates: Partial<Candidate>) => {
    try {
      const department = departments.find(d => d.name === updates.department);
      const dbData = transformers.toDbCandidate(updates, department?.id);
      
      const updatedCandidate = await api.updateCandidate(id, dbData, currentUser?.name || 'System');
      setCandidates(prev =>
        prev.map(c => (c.id === id ? transformers.transformCandidate(updatedCandidate) : c))
      );
      
      // Refresh activity if status changed
      if (updates.researchStatus) {
        const activityData = await api.getActivity();
        setActivity(activityData.map(transformers.transformActivity));
      }
    } catch (err) {
      console.error('Error updating candidate:', err);
      throw err;
    }
  };

  const deleteCandidate = async (id: string) => {
    try {
      await api.deleteCandidate(id);
      setCandidates(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting candidate:', err);
      throw err;
    }
  };

  const addSession = async (session: Omit<Session, 'id'>) => {
    try {
      const dbData = transformers.toDbSession(session);
      const newSession = await api.createSession(dbData, currentUser?.name || 'System');
      setSessions(prev => [transformers.transformSession(newSession), ...prev]);
      
      // Refresh activity
      const activityData = await api.getActivity();
      setActivity(activityData.map(transformers.transformActivity));
    } catch (err) {
      console.error('Error adding session:', err);
      throw err;
    }
  };

  const updateSession = async (id: string, updates: Partial<Session>) => {
    try {
      const dbData = transformers.toDbSession(updates);
      const updatedSession = await api.updateSession(id, dbData);
      setSessions(prev =>
        prev.map(s => (s.id === id ? transformers.transformSession(updatedSession) : s))
      );
    } catch (err) {
      console.error('Error updating session:', err);
      throw err;
    }
  };

  const addInsight = async (insight: Omit<Insight, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const team = teams.find(t => t.name === insight.team);
      const dbData = transformers.toDbInsight(insight, team?.id);
      
      const newInsight = await api.createInsight(dbData, currentUser?.name || 'System');
      setInsights(prev => [transformers.transformInsight(newInsight), ...prev]);
      
      // Refresh activity
      const activityData = await api.getActivity();
      setActivity(activityData.map(transformers.transformActivity));
    } catch (err) {
      console.error('Error adding insight:', err);
      throw err;
    }
  };

  const updateInsight = async (id: string, updates: Partial<Insight>) => {
    try {
      const team = teams.find(t => t.name === updates.team);
      const dbData = transformers.toDbInsight(updates, team?.id);
      
      const updatedInsight = await api.updateInsight(id, dbData, currentUser?.name || 'System');
      setInsights(prev =>
        prev.map(i => (i.id === id ? transformers.transformInsight(updatedInsight) : i))
      );
      
      // Refresh activity if insight was resolved
      if (updates.status === 'Resolved') {
        const activityData = await api.getActivity();
        setActivity(activityData.map(transformers.transformActivity));
      }
    } catch (err) {
      console.error('Error updating insight:', err);
      throw err;
    }
  };

  const addActivity = (newActivity: Omit<ActivityItem, 'id'>) => {
    // Activity is handled by backend, just refresh
    api.getActivity().then(data => {
      setActivity(data.map(transformers.transformActivity));
    });
  };

  const addRecording = async (candidateId: string, recording: Omit<Recording, 'id'>) => {
    try {
      const dbData = transformers.toDbRecording({ ...recording, candidateId });
      await api.createRecording(dbData);
      
      // Refresh recordings - for now, we'll just note that the recording was added
      // In a full implementation, you'd fetch the candidate's recordings
    } catch (err) {
      console.error('Error adding recording:', err);
      throw err;
    }
  };

  const addUser = async (user: Omit<User, 'id'>) => {
    try {
      const team = teams.find(t => t.name === user.team);
      const dbData = transformers.toDbUser(user, team?.id);
      
      const newUser = await api.createUser(dbData);
      setUsers(prev => [transformers.transformUser(newUser), ...prev]);
    } catch (err) {
      console.error('Error adding user:', err);
      throw err;
    }
  };

  const updateUser = async (id: string, updates: Partial<User>) => {
    try {
      const team = teams.find(t => t.name === updates.team);
      const dbData = transformers.toDbUser(updates, team?.id);
      
      const updatedUser = await api.updateUser(id, dbData);
      setUsers(prev =>
        prev.map(u => (u.id === id ? transformers.transformUser(updatedUser) : u))
      );
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
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
        departments,
        teams,
        loading,
        error,
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
        updateUser,
        refreshData
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