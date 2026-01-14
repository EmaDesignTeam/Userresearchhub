# ResearchHub - Supabase Setup Guide

## Database Initialization

The ResearchHub application uses Supabase for its backend database. Follow these steps to set up the database:

### Prerequisites
- Access to your Supabase project dashboard
- `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` environment variables configured

### Option 1: SQL Editor (Recommended)

1. Go to your Supabase dashboard
2. Navigate to the **SQL Editor** section
3. Copy the entire contents of `/supabase/functions/server/database-setup.sql`
4. Paste it into the SQL Editor
5. Click **Run** to execute the SQL

This will create:
- 8 tables: departments, teams, users, candidates, sessions, insights, recordings, activity_logs
- All necessary indexes for performance
- Triggers for automatic timestamp updates
- Dashboard analytics views
- Seed data (default departments, teams, and users)

### Option 2: Deno Script

Run the initialization script from the Supabase Functions directory:

```bash
cd supabase/functions/server
deno run --allow-net --allow-env --allow-read init-database.tsx
```

### Database Schema Overview

**Tables Created:**

1. **departments** - Engineering, Product, Design, Marketing, Sales
2. **teams** - FE, PM, UX, Backend, Data
3. **users** - Team members with roles (Admin, Researcher, Viewer)
4. **candidates** - Research participants with status tracking
5. **sessions** - Research sessions with notes and recordings
6. **insights** - Research findings with priority and status
7. **recordings** - Video/audio recordings linked to sessions
8. **activity_logs** - Audit trail of all actions

**Key Relationships:**
- Candidates belong to departments
- Users belong to teams
- Sessions link to candidates
- Insights link to candidates and teams
- Recordings link to candidates and sessions

### Verify Setup

After running the SQL, verify the tables were created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

You should see all 8 tables listed.

### Seed Data

The setup includes default seed data:
- 5 departments (Engineering, Product, Design, Marketing, Sales)
- 5 teams (FE, PM, UX, Backend, Data)
- 4 users (Sarah Johnson - Admin, Mike Chen - Researcher, Emily Davis - Researcher, David Kim - Viewer)

### Frontend Configuration

The frontend automatically connects to Supabase using environment variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your public anon key (safe for frontend)

The backend server uses:
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (never exposed to frontend)

### API Endpoints

All data operations go through the Hono server at:
`https://${projectId}.supabase.co/functions/v1/make-server-f854c4f1`

Endpoints include:
- `GET /candidates` - Fetch all candidates
- `POST /candidates` - Create new candidate
- `PUT /candidates/:id` - Update candidate
- `DELETE /candidates/:id` - Delete candidate
- Similar CRUD operations for sessions, insights, recordings, users
- `GET /activity` - Get recent activity logs
- `GET /dashboard/stats` - Get dashboard statistics

### Troubleshooting

**Error: "relation does not exist"**
- Tables were not created. Re-run the SQL setup.

**Error: "Failed to fetch"**
- Check that your Supabase URL and keys are correct
- Verify the edge function is deployed

**Error: "permission denied"**
- RLS is disabled per your requirements, but if issues persist, check table permissions

### Next Steps

Once the database is set up:
1. The app will automatically fetch all data on load
2. You can start adding candidates, sessions, and insights
3. All changes are persisted to Supabase in real-time
4. Activity logs are automatically created for key actions

For any issues, check the browser console for detailed error messages from the API service.
