# ⚠️ KNOWN ISSUES AND FIXES

## Issues Resolved

The following issues have been identified and fixed:

### 1. **Null/Undefined User Errors** ✅ FIXED
**Problem:** MainLayout component was trying to access `currentUser.name` before the user was loaded, causing app crashes.

**Fix Applied:**
- Added null check in MainLayout to show loading state
- Added optional chaining (`?.`) for all currentUser accesses
- Implemented fallback user if no admin exists in database

### 2. **Error Handling in API Calls** ✅ FIXED
**Problem:** API errors weren't being properly caught and displayed.

**Fix Applied:**
- Improved error handling in `api.ts` with try-catch blocks
- Better error message extraction from responses
- Added comprehensive logging for debugging

### 3. **Data Transformation Errors** ✅ FIXED
**Problem:** Null/undefined data from the database could crash the transformers.

**Fix Applied:**
- Added null checks in all transformer functions
- Proper default values for arrays and optional fields
- Array.isArray() checks before mapping operations
- Filter out null/undefined values before transformation

### 4. **App-Level Error Boundary** ✅ FIXED
**Problem:** Uncaught errors would crash the entire application.

**Fix Applied:**
- Created ErrorBoundary component
- Wrapped entire app with ErrorBoundary
- Added error recovery options

## Testing Your Setup

### Step 1: Test Database Connection

1. Open your browser to: `http://localhost:5173/test` (or your deployed URL + `/test`)
2. Click "Run Connection Tests"
3. **Expected Result:** All endpoints should show ✅ Success

**If tests fail:**
- Check that you've run the database setup SQL in Supabase SQL Editor
- Verify your Edge Function is deployed
- Check Supabase Edge Function logs for errors

### Step 2: Check Dashboard

1. Navigate to the main app: `http://localhost:5173/dashboard`
2. **Expected Result:** Dashboard loads with sample data

**If you see an error:**
- Click "Run Connection Test" button to diagnose
- Check browser console (F12) for detailed error messages
- Verify Edge Function logs in Supabase dashboard

### Step 3: Common Error Messages

#### "Error Loading Data"
**Cause:** Database tables might not exist or Edge Function isn't running

**Fix:**
1. Go to Supabase SQL Editor
2. Run the contents of `/supabase/functions/server/database-setup.sql`
3. Deploy the Edge Function if not deployed
4. Refresh the page

#### "No admin user found, using fallback user"
**Cause:** No users exist in the database yet

**Fix:**
1. This is expected on first run - a fallback user is created
2. Go to Admin page and add real users
3. Or run the seed data script

#### "API request failed: 404"
**Cause:** Edge Function route not found

**Fix:**
1. Verify Edge Function is deployed
2. Check that the function name matches in `/utils/supabase/info.tsx`
3. Verify CORS is enabled in Edge Function

#### "relation does not exist"
**Cause:** Database tables haven't been created

**Fix:**
1. Run `/supabase/functions/server/database-setup.sql` in Supabase SQL Editor
2. Verify all tables were created successfully
3. Check for any SQL errors in the output

## Deployment Checklist

- [ ] Database tables created (run `database-setup.sql`)
- [ ] Edge Function deployed to Supabase
- [ ] Environment variables set (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
- [ ] Sample data seeded (optional, run `seed-sample-data.tsx`)
- [ ] Connection test passes at `/test` route
- [ ] Dashboard loads without errors
- [ ] Can create new candidates/sessions/insights
- [ ] Activity feed shows recent actions

## Quick Commands

### Deploy Edge Function
```bash
supabase functions deploy make-server-f854c4f1
```

### Check Edge Function Logs
```bash
supabase functions logs make-server-f854c4f1
```

### Run Database Setup
In Supabase SQL Editor, paste and run:
```sql
-- Copy contents of /supabase/functions/server/database-setup.sql
```

### Seed Sample Data (Optional)
```bash
deno run --allow-net --allow-env supabase/functions/server/seed-sample-data.tsx
```

## Support

If you encounter issues not covered here:
1. Check browser console (F12 → Console tab)
2. Check Supabase Edge Function logs
3. Check Supabase database logs
4. Review the error message details

## Next Steps

Once everything is working:
1. Add real users in the Admin page
2. Start adding candidates for research
3. Schedule research sessions
4. Log insights from sessions
5. Review activity feed to track team progress
