import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-f854c4f1/health", (c) => {
  return c.json({ status: "ok" });
});

// =====================================================
// CANDIDATES ENDPOINTS
// =====================================================

// Get all candidates
app.get("/make-server-f854c4f1/candidates", async (c) => {
  try {
    const { data, error } = await supabase
      .from('candidates')
      .select(`
        *,
        department:departments(id, name),
        sessions(id)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching candidates:', error);
      return c.json({ error: error.message || 'Failed to fetch candidates' }, 500);
    }
    
    return c.json(data || []);
  } catch (error: any) {
    console.error('Error fetching candidates:', error);
    return c.json({ error: error?.message || 'Unknown error occurred' }, 500);
  }
});

// Get single candidate
app.get("/make-server-f854c4f1/candidates/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const { data, error } = await supabase
      .from('candidates')
      .select(`
        *,
        department:departments(id, name),
        sessions(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return c.json(data);
  } catch (error) {
    console.error('Error fetching candidate:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create candidate
app.post("/make-server-f854c4f1/candidates", async (c) => {
  try {
    const body = await c.req.json();
    const { data, error } = await supabase
      .from('candidates')
      .insert([body])
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await supabase.from('activity_logs').insert([{
      activity_type: 'candidate_added',
      user_name: body.current_user || 'System',
      candidate_name: body.name,
    }]);

    return c.json(data, 201);
  } catch (error) {
    console.error('Error creating candidate:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Update candidate
app.put("/make-server-f854c4f1/candidates/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    // Get old candidate data for activity logging
    const { data: oldData } = await supabase
      .from('candidates')
      .select('*')
      .eq('id', id)
      .single();

    const { data, error } = await supabase
      .from('candidates')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Log status change if applicable
    if (oldData && body.research_status && oldData.research_status !== body.research_status) {
      await supabase.from('activity_logs').insert([{
        activity_type: 'status_changed',
        user_name: body.current_user || 'System',
        candidate_name: data.name,
        old_status: oldData.research_status,
        new_status: body.research_status,
      }]);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error updating candidate:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Delete candidate
app.delete("/make-server-f854c4f1/candidates/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const { error } = await supabase
      .from('candidates')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    return c.json({ error: error.message }, 500);
  }
});

// =====================================================
// SESSIONS ENDPOINTS
// =====================================================

// Get all sessions
app.get("/make-server-f854c4f1/sessions", async (c) => {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select(`
        *,
        candidate:candidates(id, name)
      `)
      .order('session_date', { ascending: false });

    if (error) throw error;
    return c.json(data);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get single session
app.get("/make-server-f854c4f1/sessions/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const { data, error } = await supabase
      .from('sessions')
      .select(`
        *,
        candidate:candidates(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return c.json(data);
  } catch (error) {
    console.error('Error fetching session:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create session
app.post("/make-server-f854c4f1/sessions", async (c) => {
  try {
    const body = await c.req.json();
    const { data, error } = await supabase
      .from('sessions')
      .insert([body])
      .select()
      .single();

    if (error) throw error;

    // Get candidate name for activity log
    const { data: candidate } = await supabase
      .from('candidates')
      .select('name')
      .eq('id', body.candidate_id)
      .single();

    // Log activity
    if (candidate) {
      await supabase.from('activity_logs').insert([{
        activity_type: 'session_scheduled',
        user_name: body.current_user || 'System',
        candidate_name: candidate.name,
      }]);
    }

    return c.json(data, 201);
  } catch (error) {
    console.error('Error creating session:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Update session
app.put("/make-server-f854c4f1/sessions/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { data, error } = await supabase
      .from('sessions')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return c.json(data);
  } catch (error) {
    console.error('Error updating session:', error);
    return c.json({ error: error.message }, 500);
  }
});

// =====================================================
// INSIGHTS ENDPOINTS
// =====================================================

// Get all insights
app.get("/make-server-f854c4f1/insights", async (c) => {
  try {
    const { data, error } = await supabase
      .from('insights')
      .select(`
        *,
        candidate:candidates(id, name),
        team:teams(id, name)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return c.json(data);
  } catch (error) {
    console.error('Error fetching insights:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create insight
app.post("/make-server-f854c4f1/insights", async (c) => {
  try {
    const body = await c.req.json();
    const { data, error } = await supabase
      .from('insights')
      .insert([body])
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await supabase.from('activity_logs').insert([{
      activity_type: 'insight_created',
      user_name: body.current_user || 'System',
      insight_title: body.title,
    }]);

    return c.json(data, 201);
  } catch (error) {
    console.error('Error creating insight:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Update insight
app.put("/make-server-f854c4f1/insights/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();

    // Get old insight data
    const { data: oldData } = await supabase
      .from('insights')
      .select('*')
      .eq('id', id)
      .single();

    const { data, error } = await supabase
      .from('insights')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Log if insight was resolved
    if (oldData && body.status === 'Resolved' && oldData.status !== 'Resolved') {
      await supabase.from('activity_logs').insert([{
        activity_type: 'insight_resolved',
        user_name: body.current_user || 'System',
        insight_title: data.title,
      }]);
    }

    return c.json(data);
  } catch (error) {
    console.error('Error updating insight:', error);
    return c.json({ error: error.message }, 500);
  }
});

// =====================================================
// RECORDINGS ENDPOINTS
// =====================================================

// Get all recordings
app.get("/make-server-f854c4f1/recordings", async (c) => {
  try {
    const { data, error } = await supabase
      .from('recordings')
      .select(`
        *,
        candidate:candidates(id, name),
        session:sessions(id, product)
      `)
      .order('recording_date', { ascending: false });

    if (error) throw error;
    return c.json(data);
  } catch (error) {
    console.error('Error fetching recordings:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create recording
app.post("/make-server-f854c4f1/recordings", async (c) => {
  try {
    const body = await c.req.json();
    const { data, error } = await supabase
      .from('recordings')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    return c.json(data, 201);
  } catch (error) {
    console.error('Error creating recording:', error);
    return c.json({ error: error.message }, 500);
  }
});

// =====================================================
// ACTIVITY LOGS ENDPOINTS
// =====================================================

// Get recent activity
app.get("/make-server-f854c4f1/activity", async (c) => {
  try {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    return c.json(data);
  } catch (error) {
    console.error('Error fetching activity:', error);
    return c.json({ error: error.message }, 500);
  }
});

// =====================================================
// USERS ENDPOINTS
// =====================================================

// Get all users
app.get("/make-server-f854c4f1/users", async (c) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        team:teams(id, name)
      `)
      .order('name');

    if (error) throw error;
    return c.json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create user
app.post("/make-server-f854c4f1/users", async (c) => {
  try {
    const body = await c.req.json();
    const { data, error } = await supabase
      .from('users')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    return c.json(data, 201);
  } catch (error) {
    console.error('Error creating user:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Update user
app.put("/make-server-f854c4f1/users/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { data, error } = await supabase
      .from('users')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return c.json(data);
  } catch (error) {
    console.error('Error updating user:', error);
    return c.json({ error: error.message }, 500);
  }
});

// =====================================================
// DEPARTMENTS & TEAMS ENDPOINTS
// =====================================================

// Get all departments
app.get("/make-server-f854c4f1/departments", async (c) => {
  try {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .order('name');

    if (error) throw error;
    return c.json(data);
  } catch (error) {
    console.error('Error fetching departments:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get all teams
app.get("/make-server-f854c4f1/teams", async (c) => {
  try {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('name');

    if (error) throw error;
    return c.json(data);
  } catch (error) {
    console.error('Error fetching teams:', error);
    return c.json({ error: error.message }, 500);
  }
});

// =====================================================
// DASHBOARD STATS ENDPOINTS
// =====================================================

// Get dashboard statistics
app.get("/make-server-f854c4f1/dashboard/stats", async (c) => {
  try {
    // Get various counts and stats
    const [
      candidatesCount,
      sessionsCount,
      insightsCount,
      candidatesByStatus,
      sessionsByStatus,
      insightsByPriority,
      recentActivity
    ] = await Promise.all([
      supabase.from('candidates').select('*', { count: 'exact', head: true }),
      supabase.from('sessions').select('*', { count: 'exact', head: true }),
      supabase.from('insights').select('*', { count: 'exact', head: true }).neq('status', 'Resolved'),
      supabase.from('candidates').select('research_status'),
      supabase.from('sessions').select('status'),
      supabase.from('insights').select('priority').neq('status', 'Resolved'),
      supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(10)
    ]);

    // Process the data
    const statusCounts: Record<string, number> = {};
    candidatesByStatus.data?.forEach((c: any) => {
      statusCounts[c.research_status] = (statusCounts[c.research_status] || 0) + 1;
    });

    const sessionStatusCounts: Record<string, number> = {};
    sessionsByStatus.data?.forEach((s: any) => {
      sessionStatusCounts[s.status] = (sessionStatusCounts[s.status] || 0) + 1;
    });

    const priorityCounts: Record<string, number> = {};
    insightsByPriority.data?.forEach((i: any) => {
      priorityCounts[i.priority] = (priorityCounts[i.priority] || 0) + 1;
    });

    return c.json({
      totalCandidates: candidatesCount.count || 0,
      totalSessions: sessionsCount.count || 0,
      totalInsights: insightsCount.count || 0,
      candidatesByStatus: statusCounts,
      sessionsByStatus: sessionStatusCounts,
      insightsByPriority: priorityCounts,
      recentActivity: recentActivity.data || []
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);