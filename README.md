# ResearchHub - User Research Management Platform

> A comprehensive B2B web application for managing user research recruiting, session tracking, and insights triage, powered by React and Supabase.

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Backend](https://img.shields.io/badge/Backend-Supabase-green)
![Frontend](https://img.shields.io/badge/Frontend-React%2018-blue)

---

## 🚀 Quick Start

### Prerequisites
- Access to your Supabase project
- Environment variables configured (`SUPABASE_URL`, keys)

### Setup (2 Minutes)

1. **Initialize Database**
   ```bash
   # Copy SQL to Supabase SQL Editor and run
   /supabase/functions/server/database-setup.sql
   ```

2. **Seed Sample Data (Optional)**
   ```bash
   cd supabase/functions/server
   deno run --allow-net --allow-env seed-sample-data.tsx
   ```

3. **Test Connection**
   - Visit `/test` in your app
   - Click "Run Connection Tests"
   - Verify all tests pass ✅

4. **Start Using!**
   - Navigate to `/dashboard`
   - Add candidates, sessions, and insights
   - All data persists to Supabase

---

## 📚 Documentation

| Document | Purpose | Read Time |
|----------|---------|-----------|
| **[QUICK_START.md](./QUICK_START.md)** | Fast setup guide | 2 min |
| **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** | Step-by-step checklist | 5 min |
| **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** | What was implemented | 10 min |
| **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** | Complete architecture | 15 min |
| **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** | Database details | 10 min |

---

## ✨ Features

### Core Functionality
- ✅ **Candidate Management** - Track research participants with status, department, features tested
- ✅ **Session Tracking** - Schedule and document research sessions with notes and recordings
- ✅ **Insight Management** - Triage research findings with priority, status, and team assignment
- ✅ **Activity Logging** - Automatic audit trail of all actions
- ✅ **Dashboard Analytics** - Real-time statistics and charts
- ✅ **Role-based Permissions** - Admin, Researcher, and Viewer roles

### Technical Features
- ✅ Persistent data storage with Supabase PostgreSQL
- ✅ Full CRUD operations via REST API
- ✅ Type-safe API with TypeScript
- ✅ Loading and error states
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Form validations

---

## 🏗️ Architecture

```
┌─────────────────────────────────┐
│   Frontend (React + Tailwind)   │
│   - Components & Pages          │
│   - State Management            │
└───────────┬─────────────────────┘
            │
            ▼
┌─────────────────────────────────┐
│    API Service Layer (api.ts)   │
│    - Type-safe requests         │
│    - Error handling             │
└───────────┬─────────────────────┘
            │
            ▼
┌─────────────────────────────────┐
│  Hono REST Server (Edge Fn)     │
│  - CRUD endpoints               │
│  - Activity logging             │
└───────────┬─────────────────────┘
            │
            ▼
┌─────────────────────────────────┐
│    Supabase PostgreSQL          │
│    - 8 normalized tables        │
│    - Relationships & indexes    │
└─────────────────────────────────┘
```

---

## 📊 Database Schema

| Table | Purpose | Records (Initial) |
|-------|---------|-------------------|
| **candidates** | Research participants | 0-6 |
| **sessions** | Research sessions | 0-3 |
| **insights** | Research findings | 0-5 |
| **users** | Team members | 4 |
| **departments** | Department lookup | 5 |
| **teams** | Team lookup | 5 |
| **recordings** | Session recordings | 0 |
| **activity_logs** | Audit trail | Auto-populated |

---

## 🧪 Testing

### Connection Test Page
Visit `/test` to run comprehensive diagnostics:
- ✅ Tests all 7 API endpoints
- ✅ Visual status indicators
- ✅ Detailed error messages
- ✅ Troubleshooting guidance

### Manual Testing
1. Add a candidate → ✅ Appears in table
2. Change status → ✅ Activity log updates
3. Create session → ✅ Links to candidate
4. Add insight → ✅ Appears in analysis
5. Refresh page → ✅ All data persists!

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Component primitives
- **shadcn/ui** - Component library
- **React Router v6** - Routing
- **Lucide React** - Icons
- **Recharts** - Charts & graphs

### Backend
- **Supabase** - PostgreSQL database
- **Edge Functions** - Serverless API
- **Hono** - Web framework
- **TypeScript** - Server-side logic

---

## 📦 Project Structure

```
/src/app/
  ├── components/         # Reusable UI components
  │   ├── candidates/     # Candidate-specific
  │   ├── layout/         # Layout components
  │   └── ui/             # Base UI components
  ├── context/            # AppContext (state)
  ├── pages/              # Page components
  ├── services/           # API client + transformers
  └── types/              # TypeScript types

/supabase/functions/server/
  ├── index.tsx                # REST API server
  ├── database-setup.sql       # Database schema
  ├── init-database.tsx        # Setup script
  └── seed-sample-data.tsx     # Sample data seeder
```

---

## 🎯 Common Tasks

| Task | Steps |
|------|-------|
| **Add Candidate** | Dashboard → Candidates → Add Candidate |
| **Schedule Session** | Dashboard → Sessions → Schedule Session |
| **Create Insight** | Dashboard → Analysis → Add Insight |
| **View Activity** | Dashboard → Activity Feed (right side) |
| **Export Data** | (Coming soon) |

---

## 🐛 Troubleshooting

### Quick Fixes

| Issue | Solution |
|-------|----------|
| Connection errors | Run `/test` page, check console |
| No data showing | Run sample data seeder |
| API errors | Check Supabase Edge Function logs |
| Form not submitting | Check browser console, verify fields |

### Detailed Help
See [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) for comprehensive troubleshooting.

---

## 🎉 Success Checklist

Before considering setup complete:

- ✅ Database tables created (8 tables)
- ✅ Sample data seeded (optional)
- ✅ Connection test passes (all 7 endpoints)
- ✅ Can add candidates
- ✅ Can create sessions
- ✅ Can add insights
- ✅ Data persists after refresh
- ✅ Activity logs appear
- ✅ No errors in console

---

## 📖 Need Help?

1. **Check Documentation** - Review files in root directory
2. **Run Diagnostics** - Visit `/test` page
3. **Review Logs** - Browser console + Supabase logs
4. **Follow Checklist** - See SETUP_CHECKLIST.md

---

## 🚦 Status

- ✅ **Backend**: 100% Complete - All endpoints working
- ✅ **Frontend**: 100% Complete - Full integration
- ✅ **Testing**: Connection test page available
- ✅ **Documentation**: Comprehensive guides available
- ✅ **Production Ready**: Yes!

---

**Ready to manage your user research effectively!** 🚀

*Built with React, TypeScript, Tailwind CSS, and Supabase*