# User Research Hub - Data Flow Guide

A simplified overview of how data moves through the app for each screen.

---

## 🏗️ How the App Works (Big Picture)

```mermaid
flowchart LR
    User((👤 User))
    FE[🖥️ React App]
    API[☁️ Edge Function]
    DB[(🗄️ Database)]
    
    User -->|interacts| FE
    FE -->|sends requests| API
    API -->|reads/writes| DB
    DB -->|returns data| API
    API -->|sends response| FE
    FE -->|shows updated UI| User
```

### The Three Layers

| Layer | What it does |
|-------|--------------|
| **React App** | What users see and interact with |
| **Edge Function** | The middleman that talks to the database |
| **Database** | Where all the data lives (Supabase PostgreSQL) |

---

## 🔐 Login Flow

```mermaid
flowchart LR
    A[User enters email/password] --> B[Supabase Auth verifies]
    B --> C{Valid?}
    C -->|Yes| D[Load all app data]
    C -->|No| E[Show error]
    D --> F[Go to Dashboard]
```

**What happens:** User signs in → App fetches ALL data at once → User sees the dashboard

---

## 📊 Dashboard

```mermaid
flowchart TD
    subgraph "Data Already Loaded"
        candidates[Candidates]
        sessions[Sessions]
        insights[Insights]
        activity[Activity Log]
    end
    
    subgraph "Dashboard Shows"
        stats[📈 Stats Cards]
        upcoming[📅 Upcoming Sessions]
        resolved[✅ Recently Resolved]
        feed[🔔 Activity Feed]
    end
    
    candidates --> stats
    sessions --> stats
    sessions --> upcoming
    insights --> stats
    insights --> resolved
    activity --> feed
```

**No new data requests!** Dashboard uses data already loaded when user logged in.

| Card | Counts... |
|------|-----------|
| Upcoming Sessions | Sessions with status "Scheduled" |
| To be Scheduled | Candidates waiting to be scheduled |
| Open P0 Insights | High-priority unresolved insights |
| Under Development | Insights being worked on |

---

## 👥 Candidates

### Viewing Candidates

```mermaid
flowchart LR
    A[Candidates List] --> B[Filter locally]
    B --> C[Show filtered results]
```

**Filtering happens in the browser** - no new database requests when you search or filter.

### Adding a Candidate

```mermaid
flowchart LR
    A[Fill form] --> B[Save]
    B --> C[Create in database]
    C --> D[Log activity]
    D --> E[Update UI]
```

**What gets saved:**

| Field | Where it goes |
|-------|---------------|
| Name, Title, Location | `candidates` table |
| Department | Links to `departments` table |
| Status, Features, Notes | `candidates` table |

**Automatically logged:** "Sarah added candidate John Doe" appears in activity feed

---

## 📅 Sessions

### Creating a Session

```mermaid
flowchart LR
    A[Pick candidate] --> B[Fill details]
    B --> C[Save]
    C --> D[Create session]
    D --> E[Log activity]
```

**What gets saved:**

| Field | Where it goes |
|-------|---------------|
| Candidate | Links to `candidates` table |
| Product, Features | `sessions` table |
| Date, Time, Duration | `sessions` table |
| Moderator | `sessions` table |

**Automatically logged:** "Sarah scheduled a session with John Doe"

---

## 💡 Analysis & Insights

### Creating an Insight

```mermaid
flowchart LR
    A[Fill insight form] --> B[Save]
    B --> C[Create insight]
    C --> D[Log activity]
```

### Changing Insight Status

```mermaid
flowchart LR
    A[Click status dropdown] --> B[Select new status]
    B --> C[Update database]
    C --> D{Resolved?}
    D -->|Yes| E[Log "insight resolved"]
    D -->|No| F[Just update UI]
```

**Status options:** Picked up → Under development → Resolved / Skipped

**Automatically logged when resolved:** "Sarah resolved insight 'Confusing button label'"

---

## 🎬 Recordings

### Adding a Recording

```mermaid
flowchart LR
    A[Add Recording button] --> B[Enter title + URL]
    B --> C[Optional: paste transcript]
    C --> D[Save]
    D --> E[Linked to candidate]
```

**Recordings can have:**
- Video link (YouTube, Loom, etc.)
- Text transcript
- Or both!

---

## 👑 Admin

### Inviting a User

```mermaid
flowchart LR
    A[Click Invite User] --> B[Fill name, email, role, team]
    B --> C[Send invitation]
    C --> D[User appears as "Invited"]
```

**Roles:** Admin, Researcher, Viewer  
**Teams:** FE, PM, UX

---

## ⚙️ Settings

### Updating Profile

```mermaid
flowchart LR
    A[Change name or team] --> B[Save Changes]
    B --> C[Update database]
    C --> D[UI reflects changes]
```

**Can change:** Name, Team  
**Can't change:** Email (locked to login)

---

## 🗄️ What's in the Database?

```mermaid
erDiagram
    CANDIDATES ||--o{ SESSIONS : "participates in"
    CANDIDATES ||--o{ INSIGHTS : "mentioned in"
    CANDIDATES ||--o{ RECORDINGS : "has"
    SESSIONS ||--o{ RECORDINGS : "has"
    DEPARTMENTS ||--o{ CANDIDATES : "employs"
    TEAMS ||--o{ USERS : "contains"
    TEAMS ||--o{ INSIGHTS : "owns"
```

### Main Tables

| Table | What it stores |
|-------|----------------|
| `candidates` | Research participants |
| `sessions` | Scheduled/completed research sessions |
| `insights` | Findings from research |
| `recordings` | Video links & transcripts |
| `users` | Team members using the app |
| `activity_logs` | Automatic history of actions |
| `departments` | Engineering, Product, Design, etc. |
| `teams` | FE, PM, UX |

---

## 🔄 Activity Logging (Automatic!)

The app automatically tracks these events:

| Action | What's logged |
|--------|---------------|
| Add candidate | "Sarah added candidate John Doe" |
| Change candidate status | "Sarah changed John's status from Scheduled to Completed" |
| Schedule session | "Sarah scheduled a session with John Doe" |
| Create insight | "Sarah created insight 'Button too small'" |
| Resolve insight | "Sarah resolved insight 'Button too small'" |

This feeds into the **Activity Feed** on the Dashboard.

---

## 🎯 Quick Reference: What Happens When...

| User Action | Database Changes |
|-------------|------------------|
| Sign in | Nothing (just auth) |
| View any page | Nothing (data already loaded) |
| Filter/search | Nothing (done locally) |
| Add candidate | New row in `candidates` + activity log |
| Add session | New row in `sessions` + activity log |
| Add insight | New row in `insights` + activity log |
| Change insight status | Update `insights` row + maybe activity log |
| Add recording | New row in `recordings` |
| Invite user | New row in `users` |
| Update profile | Update row in `users` |

---

## 📱 Page → Data Summary

| Page | Reads From | Writes To |
|------|------------|-----------|
| Dashboard | candidates, sessions, insights, activity | nothing |
| Candidates | candidates, products | candidates, activity_logs |
| Candidate Detail | candidates, sessions, insights, recordings | candidates, insights, recordings |
| Sessions | sessions, candidates | sessions, activity_logs |
| Session Detail | sessions, candidates | nothing (read-only) |
| Analysis | insights, candidates, products | insights, activity_logs |
| Recordings | recordings, candidates, sessions | recordings |
| Admin | users, products | users |
| Settings | users, teams | users |
