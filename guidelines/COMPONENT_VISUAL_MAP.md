# User Research Hub - Visual Component Map
## At-a-Glance Component Reference by Page

> **Purpose**: Quick visual reference showing exactly which shadcn/ui components are used on each page.

---

## 🎨 Color Legend

```
✅ Currently Implemented
🟡 High Priority Addition
🟢 Medium Priority Addition
⚪ Low Priority / Optional
```

---

## 📱 Page Layouts

### Dashboard Page

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
│ ✅ h1: "Welcome back, {name}"                              │
│ ✅ p: Description text (text-neutral-600)                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ STAT CARDS GRID (grid-cols-4 gap-6)                        │
├────────────────┬────────────────┬────────────────┬──────────┤
│ ✅ Card        │ ✅ Card        │ ✅ Card        │ ✅ Card  │
│ ├─ Icon       │ ├─ Icon       │ ├─ Icon       │ ├─ Icon  │
│ ├─ Title      │ ├─ Title      │ ├─ Title      │ ├─ Title │
│ └─ Value      │ └─ Value      │ └─ Value      │ └─ Value │
│               │               │               │          │
│ 🟡 Skeleton   │ 🟡 Skeleton   │ 🟡 Skeleton   │ 🟡 Skel. │
│ 🟡 Tooltip    │ 🟡 Tooltip    │ 🟡 Tooltip    │ 🟡 Tool. │
└────────────────┴────────────────┴────────────────┴──────────┘

┌─────────────────────────────────────────────────────────────┐
│ TWO COLUMN LAYOUT (grid-cols-2 gap-6)                      │
├──────────────────────────────┬──────────────────────────────┤
│ ✅ Card: Upcoming Sessions   │ ✅ Card: Recently Resolved   │
│ ├─ CardHeader               │ ├─ CardHeader               │
│ │  ├─ CardTitle             │ │  ├─ CardTitle             │
│ │  └─ ✅ Button (View all)  │ │  └─ ✅ Button (View all)  │
│ ├─ CardContent              │ ├─ CardContent              │
│ │  ├─ Session item          │ │  ├─ Insight item          │
│ │  │  ├─ ✅ Badge (status)  │ │  │  ├─ ✅ Badge (priority)│
│ │  │  └─ ✅ Button (Add rec)│ │  │  └─ ✅ Badge (category)│
│ │  └─ Empty state (icon)    │ │  └─ Empty state (icon)    │
│ │                            │ │                            │
│ │ 🟡 Hover Card (preview)   │ │ 🟢 Progress indicator     │
│ │ 🟡 Tooltip (on icons)     │ │                            │
└──────────────────────────────┴──────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ✅ Card: Recent Activity                                    │
│ ├─ CardHeader > CardTitle                                  │
│ ├─ CardContent                                             │
│ │  ├─ Activity item (with icon)                           │
│ │  ├─ Activity item (with ✅ Badge)                        │
│ │  └─ Activity item                                        │
│ │                                                           │
│ │ 🟡 Scroll Area (if many items)                          │
└─────────────────────────────────────────────────────────────┘
```

**Components Used:**
- ✅ **Card**, CardHeader, CardTitle, CardContent
- ✅ **Button** (ghost, outline variants)
- ✅ **Badge** (status, priority)
- 🟡 **Skeleton** (loading states)
- 🟡 **Tooltip** (icon explanations)
- 🟡 **Hover Card** (session previews)
- 🟢 **Progress** (completion indicators)

---

### Candidates Page

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
│ ├─ Left: h1 + description                                  │
│ └─ Right: ✅ Button "Add Candidate" (emerald-600)         │
│           └─ 🟡 Tooltip "Add new research participant"    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FILTERS BAR (flex gap-4)                                    │
├─────────────────┬─────────┬─────────┬─────────┬────────────┤
│ ✅ Input        │ ✅ Select│ ✅ Select│ ✅ Select│           │
│ └─ Search icon │ Status  │ Type    │ Product │           │
│                │         │         │         │           │
│ 🟡 Clear filters button (if active)                        │
│ 🟢 Accordion (Advanced Filters)                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🟡 Alert (when items selected)                             │
│ "5 candidates selected"                                     │
│ ├─ ✅ Button "Schedule Sessions"                           │
│ └─ ✅ Button "Export" (outline)                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ DATA TABLE (border rounded-lg)                             │
├──┬─────────┬─────────┬──────┬──────────┬────────┬─────┬───┤
│☐│Name     │Dept     │Title │Location  │Status  │Feat │...│
├──┼─────────┼─────────┼──────┼──────────┼────────┼─────┼───┤
│☐│John Doe │Eng      │SWE   │Mumbai    │✅ Badge│✅ B.│⋮ │
│  │         │         │      │          │        │🟡 T.│   │
│  │ 🟡 Checkbox for bulk selection                     │   │
│  │ 🟡 Skeleton (when loading)                         │   │
│  │ 🟡 Tooltip (on +2 features badge)                  │   │
│  │ ✅ DropdownMenu (actions: View, Schedule, Delete)  │   │
├──┴─────────┴─────────┴──────┴──────────┴────────┴─────┴───┤
│ EMPTY STATE (when no results)                              │
│ ├─ Icon (opacity-40)                                       │
│ ├─ Message                                                 │
│ └─ ✅ Button "Add Candidate"                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FOOTER (border-t px-4 py-3)                                │
│ ├─ Left: "Showing X to Y of Z"                            │
│ └─ Right: 🟡 Pagination (prev, 1, 2, 3, next)            │
└─────────────────────────────────────────────────────────────┘
```

**Components Used:**
- ✅ **Button** (primary, outline, ghost, icon)
- ✅ **Input** (with icon)
- ✅ **Select** (filters)
- ✅ **Table** (full suite)
- ✅ **Badge** (status, features)
- ✅ **DropdownMenu** (actions)
- 🟡 **Checkbox** (bulk selection)
- 🟡 **Pagination** (navigate pages)
- 🟡 **Skeleton** (loading)
- 🟡 **Tooltip** (badge overflow)
- 🟡 **Alert** (bulk actions bar)
- 🟢 **Accordion** (advanced filters)
- 🟢 **Sheet** (quick preview panel)

---

### Sessions Page

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
│ ├─ Left: h1 + description                                  │
│ └─ Right: ✅ Button "Create Session" (emerald-600)        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FILTERS (flex gap-4)                                        │
├─────────────────────────┬───────────────────────────────────┤
│ ✅ Input (search)       │ ✅ Select (status filter)        │
│ └─ Search icon          │                                   │
└─────────────────────────┴───────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ DATA TABLE                                                  │
├──────────┬────────┬─────────┬────────┬──────────┬──────────┤
│Candidate │Product │Features │Modertr │Date/Time │Status    │
├──────────┼────────┼─────────┼────────┼──────────┼──────────┤
│John Doe  │App X   │✅ Badge │Alice   │Jan 20    │✅ Badge  │
│          │        │✅ Badge │        │2:00 PM   │          │
│          │        │         │        │          │          │
│ 🟡 Calendar icon before date                               │
│ 🟡 Popover (quick status change)                           │
│ 🟡 Tooltip (session details)                               │
├──────────┴────────┴─────────┴────────┴──────────┴──────────┤
│ EMPTY STATE: Calendar icon + message                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ✅ Dialog: Create Session Modal                            │
│ ├─ DialogHeader                                            │
│ │  ├─ DialogTitle "Schedule Session"                      │
│ │  └─ DialogDescription                                    │
│ ├─ DialogContent                                           │
│ │  ├─ ✅ Select "Candidate"                               │
│ │  ├─ ✅ Select "Product"                                 │
│ │  ├─ 🟡 Calendar (date picker) + 🟡 Popover             │
│ │  ├─ ✅ Input "Time"                                     │
│ │  └─ ✅ Textarea "Notes"                                 │
│ └─ DialogFooter                                            │
│    ├─ ✅ Button "Cancel" (outline)                        │
│    └─ ✅ Button "Schedule" (emerald)                      │
│       └─ 🟡 Loader icon (when submitting)                 │
└─────────────────────────────────────────────────────────────┘
```

**Components Used:**
- ✅ **Button**, Input, Select, Badge
- ✅ **Table**, Dialog, Textarea
- 🟡 **Calendar** (date selection)
- 🟡 **Popover** (quick actions)
- 🟡 **Tooltip** (details on hover)
- 🟡 **Pagination**
- 🟢 **Breadcrumb** (product > feature)

---

### Analysis Page (Insights)

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER + ✅ Button "Create Insight" (emerald)             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FILTERS BAR (flex flex-wrap gap-4)                         │
├────────┬────────┬────────┬────────┬──────┬──────┬─────────┤
│✅ Input│✅ Sel. │✅ Sel. │✅ Sel. │✅ S. │✅ S. │✅ Sel.  │
│Search  │Status  │Priority│Category│Team  │Prod  │         │
│        │        │        │        │      │      │         │
│ 🟢 Accordion: Advanced Filters (collapse/expand)          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ "Showing X of Y insights"                                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ DATA TABLE (complex with many columns)                     │
├───┬────────┬──────┬────────┬────────┬────┬──────┬──────┬──┤
│Pri│User    │Issue │Status  │Category│Team│Effort│Attach│..│
├───┼────────┼──────┼────────┼────────┼────┼──────┼──────┼──┤
│✅B│John    │Title │🔽 Drop │✅ Badge│✅ B│✅ B. │📎 2  │⋮│
│P0 │        │Desc  │✅ Badge│        │    │      │      │  │
│   │        │Date  │        │        │    │      │      │  │
│   │                                                          │
│   │ 🟡 Tooltip (on P0: "Critical - blocks core function")  │
│   │ ✅ DropdownMenu (click badge to change status)         │
│   │ 🟢 Sheet (click row to open side panel for details)    │
│   │ 🟡 Checkbox (bulk selection)                           │
├───┴──────────────────────────────────────────────────────────┤
│ EMPTY STATE: AlertCircle icon + message                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🟡 Pagination                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ✅ Dialog: Create Insight Modal                            │
│ ├─ DialogHeader                                            │
│ ├─ DialogContent (form fields)                             │
│ │  ├─ ✅ Input "Title"                                    │
│ │  ├─ ✅ Textarea "Description"                           │
│ │  ├─ ✅ Select "Priority"                                │
│ │  ├─ ✅ Select "Category"                                │
│ │  ├─ ✅ Select "Team"                                    │
│ │  └─ ✅ Select "Effort"                                  │
│ └─ DialogFooter                                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🟢 Sheet: Edit Insight (side panel)                        │
│ ├─ SheetHeader                                             │
│ │  ├─ SheetTitle                                           │
│ │  └─ SheetDescription                                     │
│ ├─ SheetContent                                            │
│ │  ├─ Form fields                                          │
│ │  ├─ 🟡 Separator                                        │
│ │  ├─ Comments section                                     │
│ │  └─ Attachments                                          │
│ └─ SheetFooter                                             │
└─────────────────────────────────────────────────────────────┘
```

**Components Used:**
- ✅ **Table**, Input, Select, Badge
- ✅ **Button**, Dialog, Textarea, DropdownMenu
- 🟡 **Tooltip** (priority/effort explanations)
- 🟡 **Checkbox** (bulk operations)
- 🟡 **Pagination**
- 🟢 **Accordion** (advanced filters)
- 🟢 **Sheet** (detail panel)
- 🟢 **Toggle Group** (table/kanban view)
- 🟢 **Command** (⌘K search)

---

### Candidate Detail Page

```
┌─────────────────────────────────────────────────────────────┐
│ 🟢 Breadcrumb: Candidates > John Doe                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ✅ Button "← Back" (ghost)                                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
│ ├─ Left                                                     │
│ │  ├─ h1: Name                                             │
│ │  └─ Details (Title • Dept • Location)                   │
│ └─ Right (flex gap-3)                                      │
│    ├─ ✅ Badge (status)                                    │
│    ├─ ✅ Button "Schedule Session" (emerald)              │
│    └─ ✅ Button "Add Recording" (outline)                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🟡 Alert (if important note exists)                        │
│ "⚠️  Important Note"                                        │
│ └─ Description                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ✅ Tabs                                                     │
│ ├─ TabsList                                                │
│ │  ├─ TabsTrigger "Overview"                              │
│ │  ├─ TabsTrigger "Sessions (5)"                          │
│ │  ├─ TabsTrigger "Insights (12)"                         │
│ │  ├─ TabsTrigger "Notes"                                 │
│ │  └─ TabsTrigger "Recordings (3)"                        │
│ │                                                           │
│ ├─ TabsContent "overview"                                  │
│ │  │                                                        │
│ │  ├─ 🟢 Progress: Research Progress                      │
│ │  │  └─ "5/8 sessions completed"                         │
│ │  │                                                        │
│ │  └─ Grid (grid-cols-2 gap-6)                            │
│ │     ├─ ✅ Card: Profile Info                            │
│ │     │  ├─ CardHeader > CardTitle                        │
│ │     │  └─ CardContent (data rows)                       │
│ │     │                                                     │
│ │     └─ ✅ Card: Research Details                        │
│ │        ├─ CardHeader > CardTitle                        │
│ │        └─ CardContent                                    │
│ │           └─ ✅ Badge (features tested)                 │
│ │                                                           │
│ ├─ TabsContent "sessions"                                  │
│ │  ├─ ✅ Card                                              │
│ │  │  ├─ CardHeader (with ✅ Button "Schedule New")      │
│ │  │  └─ CardContent                                      │
│ │  │     ├─ Session items (clickable)                     │
│ │  │     │  └─ 🟡 Hover Card (preview on hover)          │
│ │  │     └─ Empty state                                   │
│ │  │                                                        │
│ ├─ TabsContent "insights"                                  │
│ │  ├─ ✅ Card (similar to sessions)                       │
│ │  │  └─ Insight items with multiple ✅ Badges           │
│ │  │                                                        │
│ ├─ TabsContent "notes"                                     │
│ │  ├─ ✅ Card                                              │
│ │  │  └─ CardContent                                      │
│ │  │     ├─ ✅ Textarea (min-h-[300px])                  │
│ │  │     └─ Footer                                        │
│ │  │        ├─ ✅ Button "Convert to Insight" (outline)  │
│ │  │        │  └─ 🟢 Dialog (confirmation)               │
│ │  │        └─ ✅ Button "Save" (emerald)                │
│ │  │           └─ 🟡 Loader (when saving)                │
│ │  │                                                        │
│ └─ TabsContent "recordings"                                │
│    ├─ ✅ Card                                              │
│    │  └─ Grid (grid-cols-2 gap-4)                        │
│    │     ├─ Recording card                                │
│    │     │  ├─ Title + Date                               │
│    │     │  └─ 🟢 AspectRatio (16/9 thumbnail)           │
│    │     └─ Empty state                                   │
└─────────────────────────────────────────────────────────────┘
```

**Components Used:**
- ✅ **Button**, Badge, Card, Tabs, Textarea
- 🟡 **Alert** (important notes)
- 🟡 **Hover Card** (session preview)
- 🟢 **Breadcrumb** (navigation)
- 🟢 **Progress** (completion indicator)
- 🟢 **Dialog** (confirmations)
- 🟢 **AspectRatio** (video thumbnails)
- ✅ **Separator** (section dividers)

---

### Recordings Page

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER (h1 + description)                                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FILTERS (flex gap-4)                                        │
├─────────────────────────────┬───────────────────────────────┤
│ 🟡 Input (search)           │ 🟡 Select (filter candidate) │
│ └─ Search icon              │                               │
└─────────────────────────────┴───────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ GRID (grid-cols-3 gap-6)                                   │
├────────────────┬────────────────┬────────────────┬──────────┤
│ ✅ Card (hover)│ ✅ Card        │ ✅ Card        │          │
│ ├─ CardHeader │ ├─ CardHeader │ ├─ CardHeader │          │
│ │  ├─ Title   │ │  └─ 🟡 Drop │ │              │          │
│ │  └─ 🟡 Drop │ │     (actions)│ │              │          │
│ ├─ CardContent│ ├─ CardContent│ ├─ CardContent│          │
│ │  ├─ ✅ Badge│ │  ├─ Date     │ │  └─ Video   │          │
│ │  ├─ Date    │ │  ├─ 🟢 Aspect│ │     thumb   │          │
│ │  ├─ 🟢 Aspect│ │  │  Ratio   │ │             │          │
│ │  │  Ratio   │ │  │  (16/9)   │ │             │          │
│ │  │  (16/9)   │ │  └─ 🟡 Skel. │ │             │          │
│ │  │  video    │ │     (loading)│ │             │          │
│ │  └─ Duration│ │              │ │             │          │
│ │     & Size  │ │              │ │             │          │
│ │             │ │              │ │             │          │
│ │ 🟡 DropdownMenu (Play, Download, Share, Delete)         │
│ │ 🟡 Dialog (video player on click)                       │
│ │ 🟡 Skeleton (thumbnail loading)                         │
│ │ 🟡 Hover Card (metadata preview)                        │
├────────────────┴────────────────┴────────────────┴──────────┤
│ EMPTY STATE: Video icon + message + CTA                    │
└─────────────────────────────────────────────────────────────┘
```

**Components Used:**
- ✅ **Card**, Badge
- 🟡 **Input**, Select (search/filter)
- 🟡 **DropdownMenu** (actions)
- 🟡 **Dialog** (video player)
- 🟡 **Skeleton** (loading)
- 🟢 **AspectRatio** (video thumbnails)
- 🟢 **Hover Card** (metadata)

---

### Settings Page

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER (h1 + description)                                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🟢 Tabs (organize settings into sections)                  │
│ ├─ TabsList                                                │
│ │  ├─ TabsTrigger "Profile"                               │
│ │  ├─ TabsTrigger "Notifications"                         │
│ │  ├─ TabsTrigger "Preferences"                           │
│ │  └─ TabsTrigger "Security"                              │
│ │                                                           │
│ └─ OR: Stacked Cards (current implementation)             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🟡 Alert (if unsaved changes)                              │
│ "⚠️  Unsaved Changes"                                       │
│ └─ ✅ Button "Save Changes"                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ✅ Card: Profile Information                               │
│ ├─ CardHeader > CardTitle                                 │
│ ├─ CardContent (space-y-4)                                │
│ │  ├─ ✅ Label + ✅ Input "Name"                         │
│ │  ├─ ✅ Label + ✅ Input "Email"                        │
│ │  ├─ ✅ Label + ✅ Input "Role" (disabled)              │
│ │  └─ ✅ Label + ✅ Input "Team" (disabled)              │
│ └─ ✅ Button "Save Changes" (emerald)                     │
│    └─ 🟡 Loader (when saving)                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ✅ Card: Notifications                                     │
│ ├─ CardHeader > CardTitle                                 │
│ ├─ CardContent (space-y-4)                                │
│ │  ├─ Setting row (flex justify-between)                 │
│ │  │  ├─ Text + description                              │
│ │  │  └─ ✅ Switch                                        │
│ │  ├─ ✅ Separator                                        │
│ │  ├─ Setting row                                         │
│ │  │  └─ ✅ Switch                                        │
│ │  │                                                       │
│ │  │ 🟢 Slider (notification frequency)                  │
│ │  │ "Notify me: [slider] times per day"                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ✅ Card: Preferences                                       │
│ ├─ CardHeader > CardTitle                                 │
│ ├─ CardContent                                            │
│ │  ├─ "Theme"                                             │
│ │  │  └─ 🟢 RadioGroup                                   │
│ │  │     ├─ RadioGroupItem "Light"                       │
│ │  │     ├─ RadioGroupItem "Dark"                        │
│ │  │     └─ RadioGroupItem "System"                      │
│ │  │                                                       │
│ │  ├─ ✅ Separator                                        │
│ │  │                                                       │
│ │  └─ Switch rows (Compact view, etc.)                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ✅ Card: Danger Zone (border-red-200)                     │
│ ├─ CardHeader > CardTitle (text-red-600)                 │
│ ├─ CardContent                                            │
│ │  ├─ Description                                         │
│ │  └─ 🟢 AlertDialog                                     │
│ │     ├─ AlertDialogTrigger                              │
│ │     │  └─ ✅ Button "Delete Account" (destructive)    │
│ │     └─ AlertDialogContent                              │
│ │        ├─ AlertDialogHeader                            │
│ │        │  ├─ AlertDialogTitle                          │
│ │        │  └─ AlertDialogDescription                    │
│ │        └─ AlertDialogFooter                            │
│ │           ├─ AlertDialogCancel                         │
│ │           └─ AlertDialogAction (onClick={handleDelete})│
└─────────────────────────────────────────────────────────────┘
```

**Components Used:**
- ✅ **Card**, Label, Input, Button, Switch, Separator
- 🟡 **Alert** (unsaved changes)
- 🟢 **Tabs** (organize settings)
- 🟢 **RadioGroup** (theme selection)
- 🟢 **Slider** (frequency)
- 🟢 **AlertDialog** (delete confirmation)
- 🟢 **Select** (timezone, language)

---

### Main Layout (Sidebar + Header)

```
┌─────────────┬───────────────────────────────────────────────┐
│ SIDEBAR     │ HEADER                                        │
│ (w-64)      │ (h-16 border-b)                              │
│             ├───────────────────────────────────────────────┤
│             │ ├─ 🟢 Command trigger (⌘K)                  │
│             │ │  └─ ✅ Input (search, readonly)           │
│             │ ├─ 🟡 Popover: Notifications                │
│             │ │  └─ ✅ Button (bell icon)                 │
│             │ │     └─ Badge (unread count)               │
│             │ └─ ✅ DropdownMenu: User Menu               │
│             │    └─ ✅ Avatar                             │
│             │                                               │
├─────────────┼───────────────────────────────────────────────┤
│ Logo area   │                                               │
│ ├─ Icon     │                                               │
│ └─ Name     │                                               │
│             │                                               │
├─────────────┤ MAIN CONTENT AREA                            │
│             │                                               │
│ 🟢 ScrollArea│                                               │
│             │                                               │
│ NAV         │                                               │
│ ├─ Section  │                                               │
│ │  ├─ Label │                                               │
│ │  ├─ NavLink│                                               │
│ │  │  ├─ Icon│                                               │
│ │  │  ├─ Text│                                               │
│ │  │  └─ 🟡 B│ [Page content rendered here via <Outlet />] │
│ │  │    (badge)                                             │
│ │  │  └─ 🟡 T│                                               │
│ │  │    (tooltip)                                           │
│ │  │         │                                               │
│ │  └─ NavLink│                                               │
│ │            │                                               │
│ ├─ ✅ Separator                                             │
│ │            │                                               │
│ └─ Admin    │                                               │
│    section  │                                               │
│    (conditional)                                             │
│             │                                               │
├─────────────┤                                               │
│             │                                               │
│ USER SECTION│                                               │
│ (border-t)  │                                               │
│ ✅ Dropdown │                                               │
│ ├─ ✅ Avatar│                                               │
│ ├─ Name     │                                               │
│ ├─ Email    │                                               │
│ └─ Icon     │                                               │
└─────────────┴───────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🟢 CommandDialog (⌘K opens)                               │
│ ├─ CommandInput                                            │
│ ├─ CommandList                                             │
│ │  ├─ CommandGroup "Quick Actions"                        │
│ │  │  ├─ CommandItem "Add Candidate"                      │
│ │  │  └─ CommandItem "Schedule Session"                   │
│ │  ├─ CommandSeparator                                    │
│ │  ├─ CommandGroup "Navigation"                           │
│ │  │  ├─ CommandItem "Dashboard"                          │
│ │  │  └─ CommandItem "Candidates"                         │
│ │  ├─ CommandSeparator                                    │
│ │  └─ CommandGroup "Recent"                               │
│ │     └─ CommandItem (recent candidates/sessions)         │
│ └─ CommandEmpty "No results"                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🟡 Popover: Notifications Panel                           │
│ ├─ Header (with "Mark all read" button)                   │
│ ├─ 🟢 ScrollArea (h-[400px])                              │
│ │  └─ Notification items                                  │
│ │     ├─ Icon (colored bg)                                │
│ │     ├─ Title + message                                  │
│ │     ├─ Timestamp                                         │
│ │     └─ Unread indicator (blue dot)                      │
│ └─ Footer                                                  │
│    └─ ✅ Button "View all"                                │
└─────────────────────────────────────────────────────────────┘
```

**Components Used:**
- ✅ **Input**, Button, Avatar, DropdownMenu, Separator
- 🟡 **Tooltip** (nav item descriptions)
- 🟡 **Badge** (notification count, nav badges)
- 🟡 **Popover** (notifications panel)
- 🟢 **Command** (⌘K palette)
- 🟢 **ScrollArea** (sidebar, notifications)

---

## 📊 Component Usage Summary

### Most Used (Every Page)
- ✅ Button (primary, outline, ghost, icon)
- ✅ Badge (status, priority, category)
- ✅ Card (content containers)

### Frequently Used (3+ Pages)
- ✅ Input (search, forms)
- ✅ Select (filters, dropdowns)
- ✅ Table (data display)
- ✅ DropdownMenu (actions)

### Moderately Used (1-2 Pages)
- ✅ Tabs (content organization)
- ✅ Dialog (modals)
- ✅ Textarea (notes, descriptions)
- ✅ Avatar (user profiles)
- ✅ Switch (preferences)
- ✅ Separator (visual breaks)

### High Priority Additions
- 🟡 Toast (Sonner) - User feedback
- 🟡 Skeleton - Loading states
- 🟡 Tooltip - Help text
- 🟡 Calendar - Date selection
- 🟡 Pagination - Large lists
- 🟡 Checkbox - Bulk selection
- 🟡 Alert - Important messages

### Medium Priority Additions
- 🟢 Command - Global search
- 🟢 Sheet - Side panels
- 🟢 Breadcrumb - Navigation
- 🟢 Progress - Indicators
- 🟢 Hover Card - Previews
- 🟢 Accordion - Collapsible sections
- 🟢 AlertDialog - Confirmations
- 🟢 AspectRatio - Media containers
- 🟢 Popover - Quick actions

### Low Priority / Optional
- ⚪ RadioGroup - Single choice
- ⚪ Slider - Range selection
- ⚪ Toggle Group - View modes
- ⚪ Collapsible - Expandable content
- ⚪ ScrollArea - Custom scrollbars

---

## 🎯 Implementation Checklist

### Phase 1: Critical (This Week) ⚡
- [ ] Install & implement Toast (Sonner)
- [ ] Add Skeleton loading states to all async operations
- [ ] Add Tooltips to all icon buttons
- [ ] Replace date inputs with Calendar component

### Phase 2: Enhanced (Next Week) 📈
- [ ] Add Pagination to all tables
- [ ] Implement Alert for important messages
- [ ] Add Breadcrumb navigation to detail pages
- [ ] Show Progress indicators where relevant

### Phase 3: Advanced (Week 3) 🚀
- [ ] Implement Command palette (⌘K)
- [ ] Add Sheet component for quick edits
- [ ] Enable Hover Cards for previews
- [ ] Add Checkbox for bulk selections

### Phase 4: Polish (Week 4) ✨
- [ ] Add Accordion for collapsible filters
- [ ] Implement Toggle Groups for view modes
- [ ] Add AlertDialog for confirmations
- [ ] Polish empty states

---

**Quick Tip**: Use this visual map during development to quickly see which components you need for each page!

**Last Updated**: January 2026
