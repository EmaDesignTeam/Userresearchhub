-- ResearchHub Database Schema
-- This file contains all table definitions, indexes, and triggers

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- DEPARTMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TEAMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('Admin', 'Researcher', 'Viewer')),
  team_id UUID REFERENCES teams(id),
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Invited', 'Active', 'Disabled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- CANDIDATES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  department_id UUID REFERENCES departments(id),
  title TEXT,
  location TEXT,
  date_of_joining DATE,
  research_status TEXT NOT NULL DEFAULT 'To be scheduled' CHECK (research_status IN ('To be scheduled', 'Scheduled', 'Completed', 'Skipped')),
  features_tested TEXT[] DEFAULT '{}',
  user_type TEXT CHECK (user_type IN ('Builder', 'End User')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SESSIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
  product TEXT,
  features_tested TEXT[] DEFAULT '{}',
  moderator TEXT,
  session_date DATE,
  session_time TIME,
  duration TEXT,
  status TEXT NOT NULL DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Completed', 'Skipped')),
  recording_link TEXT,
  session_notes TEXT,
  objectives TEXT,
  observations TEXT,
  quotes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INSIGHTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  user_interviewed UUID REFERENCES candidates(id),
  session_id UUID REFERENCES sessions(id),
  product TEXT,
  status TEXT NOT NULL DEFAULT 'Picked up' CHECK (status IN ('Picked up', 'Under development', 'Resolved', 'Skipped')),
  triage_status TEXT NOT NULL DEFAULT 'Todo' CHECK (triage_status IN ('Todo', 'In progress', 'Done')),
  priority TEXT NOT NULL CHECK (priority IN ('P0', 'P1', 'P2')),
  category TEXT NOT NULL CHECK (category IN ('Bug', 'Feature Enhancement', 'Copy Change', 'Other')),
  team_id UUID REFERENCES teams(id),
  effort TEXT CHECK (effort IN ('xs', 'sm', 'md', 'lg')),
  attachments TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  assignee TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- RECORDINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS recordings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  recording_date DATE,
  candidate_id UUID REFERENCES candidates(id),
  session_id UUID REFERENCES sessions(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ACTIVITY LOGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  activity_type TEXT NOT NULL CHECK (activity_type IN ('candidate_added', 'status_changed', 'session_scheduled', 'insight_created', 'insight_resolved')),
  user_name TEXT NOT NULL,
  candidate_name TEXT,
  old_status TEXT,
  new_status TEXT,
  insight_title TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SESSION-INSIGHTS JUNCTION TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS session_insights (
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  insight_id UUID REFERENCES insights(id) ON DELETE CASCADE,
  PRIMARY KEY (session_id, insight_id)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_candidates_research_status ON candidates(research_status);
CREATE INDEX IF NOT EXISTS idx_candidates_department ON candidates(department_id);
CREATE INDEX IF NOT EXISTS idx_sessions_candidate ON sessions(candidate_id);
CREATE INDEX IF NOT EXISTS idx_sessions_date ON sessions(session_date);
CREATE INDEX IF NOT EXISTS idx_insights_status ON insights(status);
CREATE INDEX IF NOT EXISTS idx_insights_priority ON insights(priority);
CREATE INDEX IF NOT EXISTS idx_insights_user ON insights(user_interviewed);
CREATE INDEX IF NOT EXISTS idx_activity_logs_type ON activity_logs(activity_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON activity_logs(created_at DESC);

-- =====================================================
-- TRIGGERS FOR AUTO-UPDATING TIMESTAMPS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_candidates_updated_at BEFORE UPDATE ON candidates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_insights_updated_at BEFORE UPDATE ON insights
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recordings_updated_at BEFORE UPDATE ON recordings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VIEWS FOR DASHBOARD ANALYTICS
-- =====================================================

-- Candidates by Status
CREATE OR REPLACE VIEW candidates_by_status AS
SELECT 
  research_status,
  COUNT(*) as count
FROM candidates
GROUP BY research_status;

-- Sessions by Status
CREATE OR REPLACE VIEW sessions_by_status AS
SELECT 
  status,
  COUNT(*) as count
FROM sessions
GROUP BY status;

-- Insights by Priority
CREATE OR REPLACE VIEW insights_by_priority AS
SELECT 
  priority,
  COUNT(*) as count
FROM insights
WHERE status != 'Resolved'
GROUP BY priority;

-- Insights by Category
CREATE OR REPLACE VIEW insights_by_category AS
SELECT 
  category,
  COUNT(*) as count
FROM insights
WHERE status != 'Resolved'
GROUP BY category;

-- Recent Activity (last 50 items)
CREATE OR REPLACE VIEW recent_activity AS
SELECT 
  id,
  activity_type,
  user_name,
  candidate_name,
  old_status,
  new_status,
  insight_title,
  metadata,
  created_at
FROM activity_logs
ORDER BY created_at DESC
LIMIT 50;

-- =====================================================
-- SEED DATA
-- =====================================================

-- Insert default departments
INSERT INTO departments (name) VALUES 
  ('Engineering'),
  ('Product'),
  ('Design'),
  ('Marketing'),
  ('Sales')
ON CONFLICT (name) DO NOTHING;

-- Insert default teams
INSERT INTO teams (name) VALUES 
  ('FE'),
  ('PM'),
  ('UX'),
  ('Backend'),
  ('Data')
ON CONFLICT (name) DO NOTHING;

-- Insert sample users
INSERT INTO users (name, email, role, team_id, status) 
SELECT 
  'Sarah Johnson',
  'sarah@company.com',
  'Admin',
  (SELECT id FROM teams WHERE name = 'PM'),
  'Active'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'sarah@company.com');

INSERT INTO users (name, email, role, team_id, status) 
SELECT 
  'Mike Chen',
  'mike@company.com',
  'Researcher',
  (SELECT id FROM teams WHERE name = 'UX'),
  'Active'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'mike@company.com');

INSERT INTO users (name, email, role, team_id, status) 
SELECT 
  'Emily Davis',
  'emily@company.com',
  'Researcher',
  (SELECT id FROM teams WHERE name = 'UX'),
  'Active'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'emily@company.com');

INSERT INTO users (name, email, role, team_id, status) 
SELECT 
  'David Kim',
  'david@company.com',
  'Viewer',
  (SELECT id FROM teams WHERE name = 'FE'),
  'Active'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'david@company.com');
