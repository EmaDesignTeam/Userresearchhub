# 🔧 Fix: Supabase Database & Edge Function Setup

## Issue
"Failed to add candidate" error occurs because:
1. ❌ Database tables haven't been created yet
2. ❌ Edge function needs to be deployed

## 🚀 Quick Fix (5 minutes)

### Step 1: Initialize Database Tables

1. **Open your Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/orygtvywltqgjgzchavf

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar

3. **Copy & Run the Setup SQL**
   - Open the file: `/supabase/functions/server/database-setup.sql`
   - Copy ALL the contents (entire file)
   - Paste into the SQL Editor
   - Click **"Run"** button

4. **Verify Tables Were Created**
   Run this query in the SQL Editor:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public'
   ORDER BY table_name;
   ```
   
   You should see these 8 tables:
   - ✅ activity_logs
   - ✅ candidates
   - ✅ departments
   - ✅ insights
   - ✅ recordings
   - ✅ sessions
   - ✅ teams
   - ✅ users

### Step 2: Deploy Edge Function

#### Option A: Using Supabase CLI (Recommended)

1. **Install Supabase CLI** (if not installed):
   ```bash
   # macOS
   brew install supabase/tap/supabase
   
   # Windows
   scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
   scoop install supabase
   
   # Linux
   brew install supabase/tap/supabase
   ```

2. **Login to Supabase**:
   ```bash
   supabase login
   ```

3. **Link Your Project**:
   ```bash
   cd /Users/saudbakhar/Desktop/Userresearchhub
   supabase link --project-ref orygtvywltqgjgzchavf
   ```

4. **Deploy the Edge Function**:
   ```bash
   supabase functions deploy make-server-f854c4f1 --project-ref orygtvywltqgjgzchavf
   ```

#### Option B: Using Supabase Dashboard (Manual)

1. **Go to Edge Functions**
   - Dashboard → Edge Functions → "Create a new function"

2. **Create Function**
   - Name: `make-server-f854c4f1`
   - Copy the entire contents of `/supabase/functions/server/index.tsx`
   - Paste into the function editor
   - Click "Deploy"

3. **Set Environment Variables**
   The function automatically has access to:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Test the Connection

1. **Refresh your application**
2. **Try adding a candidate again**
3. **Check for success!** ✅

## 🔍 Verify Everything Works

Run these checks in your browser console (F12):

```javascript
// Test API connection
fetch('https://orygtvywltqgjgzchavf.supabase.co/functions/v1/make-server-f854c4f1/health', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yeWd0dnl3bHRxZ2pnemNoYXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNTI5OTMsImV4cCI6MjA4MjcyODk5M30.9Sb7bRiG_FcnHF4qXNT92RMEV7YMG8IvRUiuhUPVcY8'
  }
})
.then(r => r.json())
.then(console.log);
// Should return: {status: "ok"}

// Test getting departments
fetch('https://orygtvywltqgjgzchavf.supabase.co/functions/v1/make-server-f854c4f1/departments', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yeWd0dnl3bHRxZ2pnemNoYXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNTI5OTMsImV4cCI6MjA4MjcyODk5M30.9Sb7bRiG_FcnHF4qXNT92RMEV7YMG8IvRUiuhUPVcY8'
  }
})
.then(r => r.json())
.then(console.log);
// Should return: Array of departments
```

## 🐛 Troubleshooting

### Error: "relation 'candidates' does not exist"
→ Database tables weren't created. Go back to Step 1.

### Error: "Function not found"
→ Edge function not deployed. Go back to Step 2.

### Error: "Failed to fetch"
→ Check your internet connection and Supabase project status.

### Error: "Violates foreign key constraint"
→ Make sure you selected a department when adding a candidate.

## 📊 What Happens After Setup

Once setup is complete:

1. ✅ All data will be saved to Supabase PostgreSQL
2. ✅ You can add/edit/delete candidates, sessions, and insights
3. ✅ Activity logs will track all changes
4. ✅ Dashboard statistics will show real data
5. ✅ Data persists across browser sessions

## 🎯 Quick Commands Reference

```bash
# Check if Supabase CLI is installed
supabase --version

# Login to Supabase
supabase login

# Link your project
cd /Users/saudbakhar/Desktop/Userresearchhub
supabase link --project-ref orygtvywltqgjgzchavf

# Deploy edge function
supabase functions deploy make-server-f854c4f1

# View function logs (debugging)
supabase functions logs make-server-f854c4f1

# Test function locally (optional)
supabase functions serve make-server-f854c4f1
```

## ✨ Optional: Seed Sample Data

After setup, you can add sample data to test the system:

```bash
cd supabase/functions/server
deno run --allow-net --allow-env seed-sample-data.tsx
```

This will create sample candidates, sessions, and insights for testing.

---

**Need Help?** 
- Check the browser console (F12) for detailed error messages
- View Edge Function logs in Supabase Dashboard → Edge Functions → Logs
- Review TROUBLESHOOTING.md for more solutions
