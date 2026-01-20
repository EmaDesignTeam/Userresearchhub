# 🚀 Setup Instructions - Follow These Steps Now

## ✅ Step 1: Initialize Database (DO THIS FIRST)

### Instructions:

1. **Open this file in your project:**
   ```
   /Users/saudbakhar/Desktop/Userresearchhub/supabase/functions/server/database-setup.sql
   ```

2. **Copy ALL the contents** (Select All → Copy or Cmd+A → Cmd+C)

3. **Go to your Supabase Dashboard:**
   - Click this link: https://supabase.com/dashboard/project/orygtvywltqgjgzchavf
   - If not logged in, log in first

4. **Navigate to SQL Editor:**
   - Look for "SQL Editor" in the left sidebar
   - Click it

5. **Create a new query:**
   - Click "+ New Query" button (top right)

6. **Paste the SQL:**
   - Delete any placeholder text
   - Paste all the SQL you copied (Cmd+V)

7. **Run the SQL:**
   - Click the "Run" button (or press Cmd+Enter)
   - Wait for it to complete (should take 2-5 seconds)
   - You should see "Success" message

8. **Verify it worked:**
   - In the SQL Editor, run this query:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public'
   ORDER BY table_name;
   ```
   - You should see 8 tables listed:
     * activity_logs
     * candidates
     * departments
     * insights
     * recordings
     * sessions
     * teams
     * users

---

## ✅ Step 2: Deploy Edge Function

### Option A: Automatic (Using Script)

Open your terminal and run:

```bash
cd /Users/saudbakhar/Desktop/Userresearchhub
./deploy-function.sh
```

**If you get "command not found: supabase":**
- Follow Option B below instead

### Option B: Manual (In Dashboard)

1. **Go to Edge Functions:**
   - Dashboard: https://supabase.com/dashboard/project/orygtvywltqgjgzchavf
   - Click "Edge Functions" in left sidebar

2. **Create New Function:**
   - Click "+ New Function" button
   - Function name: `make-server-f854c4f1`
   - Click "Create function"

3. **Copy the function code:**
   - Open this file: `/Users/saudbakhar/Desktop/Userresearchhub/supabase/functions/make-server-f854c4f1/index.ts`
   - Copy ALL contents

4. **Paste and Deploy:**
   - Paste the code into the function editor
   - Click "Deploy" button
   - Wait for deployment to complete

5. **Verify deployment:**
   - You should see the function listed in Edge Functions
   - Status should be "Active" or "Deployed"

---

## ✅ Step 3: Test Everything

1. **Go back to your ResearchHub application**

2. **Refresh the page** (Cmd+R or F5)

3. **Try adding a candidate:**
   - Go to Candidates page
   - Click "Add Candidate" button
   - Fill in the form:
     * Name: Test User
     * Department: Engineering
     * Title: Software Engineer
   - Click "Add Candidate"
   - You should see "Candidate added successfully" ✅

4. **If it works:**
   - 🎉 Congratulations! Setup is complete!
   - You can now use all features of ResearchHub

5. **If it still fails:**
   - Open browser console (F12 → Console tab)
   - Try adding a candidate again
   - Copy the error message
   - Share it with me for troubleshooting

---

## 🆘 Quick Troubleshooting

### "Failed to add candidate" still appears:
- Did you complete Step 1? Check by running the verify query
- Did you complete Step 2? Check Edge Functions dashboard
- Check browser console (F12) for specific error

### "relation 'candidates' does not exist":
- Step 1 wasn't completed successfully
- Go back and re-run the database-setup.sql

### "Function not found":
- Step 2 wasn't completed successfully
- Deploy the edge function again

### "department_id violates foreign key constraint":
- Make sure you selected a department when adding candidate
- The database needs to have departments (they're created in Step 1)

---

## 📞 Need Help?

If you get stuck:
1. Take a screenshot of the error
2. Check the browser console (F12) for details
3. Share the specific error message

Let me know when you've completed each step!
