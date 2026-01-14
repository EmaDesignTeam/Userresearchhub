# ResearchHub - Quick Start

## 🚀 Setup (2 Minutes)

### 1. Initialize Database
Copy `/supabase/functions/server/database-setup.sql` → Supabase SQL Editor → Run

### 2. Seed Sample Data (Optional)
```bash
cd supabase/functions/server
deno run --allow-net --allow-env seed-sample-data.tsx
```

### 3. Start Application
Your app will automatically connect and load data!

---

## ✅ What's Working

- ✅ All data saved to Supabase PostgreSQL
- ✅ 8 database tables with relationships
- ✅ Full CRUD for candidates, sessions, insights
- ✅ Automatic activity logging
- ✅ Dashboard statistics
- ✅ Loading and error states
- ✅ Type-safe API layer

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `/supabase/functions/server/database-setup.sql` | Database schema |
| `/supabase/functions/server/index.tsx` | REST API server |
| `/src/app/services/api.ts` | API client |
| `/src/app/context/AppContext.tsx` | Data management |

---

## 🔍 Verify Setup

Run in Supabase SQL Editor:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

Should see: departments, teams, users, candidates, sessions, insights, recordings, activity_logs

---

## 🐛 Troubleshooting

**No data showing?**
→ Run sample data seeder

**"Failed to load data" error?**
→ Check browser console
→ Verify database tables exist
→ Check environment variables

**API errors?**
→ Check Supabase Edge Function logs

---

## 📚 Full Documentation

- `MIGRATION_GUIDE.md` - Complete setup guide
- `SUPABASE_SETUP.md` - Database setup details

---

**That's it! Your ResearchHub is now powered by Supabase.** 🎉
