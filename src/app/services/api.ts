import { projectId, publicAnonKey } from '/utils/supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-f854c4f1`;

// Helper function to make API requests
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      let errorMessage = `API request failed: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch (e) {
        // If JSON parsing fails, use the default error message
      }
      
      console.error(`API Error (${endpoint}):`, errorMessage);
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Network error: ${String(error)}`);
  }
}

// =====================================================
// CANDIDATES API
// =====================================================

export async function getCandidates() {
  return apiRequest('/candidates');
}

export async function getCandidate(id: string) {
  return apiRequest(`/candidates/${id}`);
}

export async function createCandidate(data: any, currentUser: string) {
  return apiRequest('/candidates', {
    method: 'POST',
    body: JSON.stringify({ ...data, current_user: currentUser }),
  });
}

export async function updateCandidate(id: string, data: any, currentUser: string) {
  return apiRequest(`/candidates/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ ...data, current_user: currentUser }),
  });
}

export async function deleteCandidate(id: string) {
  return apiRequest(`/candidates/${id}`, {
    method: 'DELETE',
  });
}

// =====================================================
// SESSIONS API
// =====================================================

export async function getSessions() {
  return apiRequest('/sessions');
}

export async function getSession(id: string) {
  return apiRequest(`/sessions/${id}`);
}

export async function createSession(data: any, currentUser: string) {
  return apiRequest('/sessions', {
    method: 'POST',
    body: JSON.stringify({ ...data, current_user: currentUser }),
  });
}

export async function updateSession(id: string, data: any) {
  return apiRequest(`/sessions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// =====================================================
// INSIGHTS API
// =====================================================

export async function getInsights() {
  return apiRequest('/insights');
}

export async function createInsight(data: any, currentUser: string) {
  return apiRequest('/insights', {
    method: 'POST',
    body: JSON.stringify({ ...data, current_user: currentUser }),
  });
}

export async function updateInsight(id: string, data: any, currentUser: string) {
  return apiRequest(`/insights/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ ...data, current_user: currentUser }),
  });
}

// =====================================================
// RECORDINGS API
// =====================================================

export async function getRecordings() {
  return apiRequest('/recordings');
}

export async function createRecording(data: any) {
  return apiRequest('/recordings', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// =====================================================
// ACTIVITY API
// =====================================================

export async function getActivity() {
  return apiRequest('/activity');
}

// =====================================================
// USERS API
// =====================================================

export async function getUsers() {
  return apiRequest('/users');
}

export async function createUser(data: any) {
  return apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateUser(id: string, data: any) {
  return apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// =====================================================
// DEPARTMENTS & TEAMS API
// =====================================================

export async function getDepartments() {
  return apiRequest('/departments');
}

export async function getTeams() {
  return apiRequest('/teams');
}

// =====================================================
// DASHBOARD STATS API
// =====================================================

export async function getDashboardStats() {
  return apiRequest('/dashboard/stats');
}