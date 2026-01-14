# ResearchHub Supabase Migration - Setup Checklist

## Pre-Launch Checklist

Use this checklist to ensure your ResearchHub Supabase integration is properly set up.

---

## ✅ Backend Setup

### Database Tables
- [ ] Open Supabase Dashboard → SQL Editor
- [ ] Copy entire `/supabase/functions/server/database-setup.sql`
- [ ] Paste and click **Run**
- [ ] Verify success message (no errors)

### Verify Tables Created
In SQL Editor, run:
```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

**Expected tables (8):**
- [ ] departments
- [ ] teams
- [ ] users
- [ ] candidates
- [ ] sessions
- [ ] insights
- [ ] recordings
- [ ] activity_logs

### Check Seed Data
```sql
SELECT COUNT(*) FROM departments; -- Should be 5
SELECT COUNT(*) FROM teams;       -- Should be 5
SELECT COUNT(*) FROM users;       -- Should be 4
```

- [ ] Departments count = 5
- [ ] Teams count = 5
- [ ] Users count = 4

---

## ✅ Sample Data (Optional but Recommended)

Run the seeder:
```bash
cd supabase/functions/server
deno run --allow-net --allow-env seed-sample-data.tsx
```

**Expected output:**
- [ ] 6 candidates added
- [ ] 3 sessions added
- [ ] 5 insights added
- [ ] No errors in output

---

## ✅ Environment Variables

Verify in Supabase dashboard:
- [ ] `SUPABASE_URL` is set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set
- [ ] `SUPABASE_ANON_KEY` is accessible to frontend

---

## ✅ Connection Test

1. Start your application
2. Navigate to `/test`
3. Click "Run Connection Tests"

**All tests should pass:**
- [ ] Candidates endpoint ✅
- [ ] Sessions endpoint ✅
- [ ] Insights endpoint ✅
- [ ] Departments endpoint ✅
- [ ] Teams endpoint ✅
- [ ] Users endpoint ✅
- [ ] Activity endpoint ✅

---

## ✅ Application Tests

### Test 1: View Dashboard
- [ ] Navigate to `/dashboard`
- [ ] Dashboard loads without errors
- [ ] Statistics cards show data
- [ ] Activity feed appears (may be empty if no actions yet)

### Test 2: Add Candidate
- [ ] Navigate to `/candidates`
- [ ] Click "Add Candidate"
- [ ] Fill in required fields:
  - [ ] Name
  - [ ] Department (should be dropdown with 5 options)
  - [ ] Title
- [ ] Submit form
- [ ] Success toast appears
- [ ] New candidate appears in table

### Test 3: Update Candidate Status
- [ ] Find a candidate in the table
- [ ] Change their status (e.g., "To be scheduled" → "Scheduled")
- [ ] Status updates immediately
- [ ] Check dashboard activity feed
- [ ] Status change appears in activity

### Test 4: Create Session
- [ ] Navigate to `/sessions`
- [ ] Click "Schedule Session"
- [ ] Select a candidate
- [ ] Fill in session details
- [ ] Submit form
- [ ] Success toast appears
- [ ] Session appears in table

### Test 5: Add Insight
- [ ] Navigate to `/analysis`
- [ ] Click "Add Insight"
- [ ] Fill in required fields
- [ ] Submit form
- [ ] Success toast appears
- [ ] Insight appears in table

### Test 6: Data Persistence
- [ ] Perform any action (add candidate, change status, etc.)
- [ ] Refresh the browser page (F5)
- [ ] Data is still there ✅
- [ ] No data loss!

---

## ✅ Error Handling

### Test Error Recovery
1. **Disconnect from internet**
2. Try to add a candidate
3. Should see error message
4. **Reconnect to internet**
5. Click "Try Again"
6. Should work now ✅

---

## 🐛 Troubleshooting

### Issue: Connection tests fail

**Check:**
- [ ] Database tables exist (run verification SQL)
- [ ] Environment variables are set correctly
- [ ] Supabase Edge Function is deployed
- [ ] Check Edge Function logs for errors

**Solution:**
Re-run database setup SQL if tables don't exist

---

### Issue: "Failed to load data" on startup

**Check:**
- [ ] Browser console for error details
- [ ] Network tab shows 500 errors?
- [ ] Edge Function logs show errors?

**Solution:**
1. Run `/test` to diagnose
2. Check specific endpoint that's failing
3. Review error message in console

---

### Issue: No data showing after setup

**Check:**
- [ ] Tables exist and have data
- [ ] Run sample data seeder

**Solution:**
```bash
cd supabase/functions/server
deno run --allow-net --allow-env seed-sample-data.tsx
```

---

### Issue: Department dropdown is empty

**Check:**
- [ ] Departments table has 5 records
- [ ] API endpoint `/departments` returns data

**Solution:**
Re-run the database setup SQL (includes seed data)

---

## ✅ Performance Checks

### Database Performance
- [ ] Candidate list loads in < 2 seconds
- [ ] Sessions list loads in < 2 seconds
- [ ] Insights list loads in < 2 seconds
- [ ] Dashboard loads in < 3 seconds

### UI Responsiveness
- [ ] Forms submit without lag
- [ ] Status changes are instant
- [ ] Toast notifications appear immediately
- [ ] Loading states show during operations

---

## ✅ Documentation Review

Have you read:
- [ ] README.md - Project overview
- [ ] QUICK_START.md - Setup guide
- [ ] IMPLEMENTATION.md - What was built
- [ ] MIGRATION_GUIDE.md - Architecture details

---

## 🎉 Launch Ready!

If all items above are checked, your ResearchHub is ready for use!

**Final Test:**
- [ ] Show app to a colleague
- [ ] Have them add a candidate
- [ ] Have them create a session
- [ ] Both of you see the same data
- [ ] No errors occur

---

## 📝 Post-Launch

After successful launch, consider:
- [ ] Set up regular database backups
- [ ] Monitor Edge Function logs for errors
- [ ] Track usage metrics
- [ ] Gather user feedback
- [ ] Plan next features

---

## 🆘 Need Help?

1. Check browser console for errors
2. Run `/test` for diagnostics
3. Review Supabase Edge Function logs
4. Re-read documentation files
5. Verify all checklist items above

---

**Questions? Review the documentation files in the root directory!** 📚
