# Testing Guide - Reusable Components Implementation

## 🎯 Quick Test (5 Minutes)

### Your Dev Server
✅ Already running at: **http://localhost:5173**

---

## 🚀 Step-by-Step Testing

### 1. Component Showcase (MAIN DEMO)

**Navigate to**: `/admin` → Click **"🎨 Component Showcase"** tab

**What to verify:**
- [ ] Status badges show correct colors:
  - ✅ Completed/Resolved = Green
  - 📅 Scheduled = Blue
  - ⏰ Pending = Amber
  - ⏭️ Skipped = Gray
- [ ] Category badges display with icons
- [ ] All button variations render
- [ ] Empty state example works
- [ ] Search input demo functional

**Expected**: All components display correctly with proper colors and styling.

---

### 2. Dashboard Page (`/dashboard`)

**What to verify:**
- [ ] Page header displays: "Welcome back, [Your Name]"
- [ ] 4 stat cards show different colors (blue, amber, red, emerald)
- [ ] Click each stat card → Should navigate to respective page
- [ ] "Upcoming Sessions" card shows data or empty state
- [ ] "Recently Resolved" card shows resolved insights
- [ ] Activity feed displays with status badges

**Expected**: Clickable stat cards, consistent empty states, activity with badges.

---

### 3. Candidates Page (`/candidates`)

**What to verify:**
- [ ] Page header with "Add Candidate" button (emerald green)
- [ ] Search bar with search icon on left
- [ ] Type in search → Clear button (X) appears
- [ ] Click X → Search clears
- [ ] Status badges in table:
  - Completed = Green
  - Scheduled = Blue
  - To be scheduled = Amber
- [ ] Feature badges display as category badges
- [ ] Clear search to see empty state with action button

**Expected**: Functional search, correct badge colors, actionable empty state.

---

### 4. Sessions Page (`/sessions`)

**What to verify:**
- [ ] Page header with "Create Session" button
- [ ] Search functionality with clear button
- [ ] Status badges show icons
- [ ] Feature badges display
- [ ] Empty state (if no sessions)

**Expected**: Same pattern as Candidates page, status badges with icons.

---

### 5. Analysis Page (`/analysis`)

**What to verify:**
- [ ] Page header with "Create Insight" button
- [ ] Search bar functional
- [ ] Priority badges:
  - P0 = 🔴 Red
  - P1 = 🟠 Amber
  - P2 = 🔵 Blue
- [ ] Status badges (insight variant)
- [ ] Category badges with icons:
  - Bug = Red with AlertCircle
  - Feature = Purple with Sparkles
  - Copy = Blue with FileText
- [ ] Team badges display
- [ ] Empty state shows when no results

**Expected**: All badge types display correctly with auto-colors and icons.

---

### 6. Candidate Detail Page (`/candidates/:id`)

**Navigate**: Click any candidate from Candidates page

**What to verify:**
- [ ] Status badge in header with icon
- [ ] "Profile Information" card has icon
- [ ] "Research Details" card has icon
- [ ] Feature badges use CategoryBadge
- [ ] Switch between tabs:
  - Overview ✅
  - Sessions ✅ (empty state if no sessions)
  - Insights ✅ (priority badges if has insights)
  - Notes ✅
  - Recordings ✅ (empty state if none)
- [ ] Empty states in tabs show helpful messages

**Expected**: All tabs work, InfoCards have icons, badges consistent.

---

### 7. Session Detail Page (`/sessions/:id`)

**Navigate**: Click any session from Sessions page

**What to verify:**
- [ ] Status badge in header
- [ ] "Session Details" card has calendar icon
- [ ] Feature badges display correctly
- [ ] All content cards use InfoCard
- [ ] "Session Notes" card has action button

**Expected**: InfoCards with icons, feature badges consistent.

---

### 8. Recordings Page (`/recordings`)

**What to verify:**
- [ ] Page header displays
- [ ] Table wrapped properly
- [ ] Candidate names show as category badges
- [ ] Video/Transcript badges display
- [ ] Empty state (if no recordings)

**Expected**: Consistent table styling, category badges for types.

---

### 9. Settings Page (`/settings`)

**What to verify:**
- [ ] Page header displays
- [ ] "Profile Information" card has User icon
- [ ] "Notifications" card has Bell icon
- [ ] "Preferences" card has Settings icon
- [ ] All form fields functional

**Expected**: InfoCards with icons, consistent styling.

---

## ✅ Visual Verification

### Colors Should Match

**Primary Actions** (buttons, active states):
```
bg-emerald-600 with hover:bg-emerald-700
```

**Status Badges**:
- Completed/Resolved → `bg-emerald-50 text-emerald-700` 🟢
- Scheduled/Picked up → `bg-blue-50 text-blue-700` 🔵
- Pending/Development → `bg-amber-50 text-amber-700` 🟠
- Skipped/Inactive → `bg-neutral-100 text-neutral-600` ⚪

**Priority Badges**:
- P0 → `bg-red-50 text-red-700` 🔴
- P1 → `bg-amber-50 text-amber-700` 🟠
- P2 → `bg-blue-50 text-blue-700` 🔵

---

## 🔍 Interaction Testing

### Search Functionality
1. Go to Candidates page
2. Type "test" in search
3. **Verify**: X button appears on right
4. Click X
5. **Verify**: Search clears

### Empty States
1. Go to Candidates page
2. Search for "zzzzz" (no results)
3. **Verify**: Empty state with icon, message, and "Add Candidate" button
4. Click "Add Candidate"
5. **Verify**: Modal opens

### Stat Cards (Dashboard)
1. Go to Dashboard
2. Click "Upcoming Sessions" stat card
3. **Verify**: Navigates to /sessions
4. Go back to Dashboard
5. Click other stat cards
6. **Verify**: Each navigates to correct page

### Status Badge Dropdown (Analysis)
1. Go to Analysis page
2. Click on a status badge in the table
3. **Verify**: Dropdown appears with status options
4. Select a status
5. **Verify**: Status updates

---

## 🐛 Known Non-Issues

### Linter Warnings
You might see warnings about "React UMD global". These are:
- ✅ **Safe to ignore** - Configuration warnings
- ✅ **Don't affect functionality** - Code works fine
- ✅ **Vite handles automatically** - Modern JSX transform

**Why they appear**: Linter expects explicit `import React from 'react'` but Vite's React plugin handles JSX automatically with the new transform.

**Fix (optional)**: Update ESLint config to recognize automatic JSX transform, but not necessary.

---

## ✅ Success Checklist

After testing, verify:
- [ ] All 8 pages load without errors
- [ ] Component Showcase tab displays all components
- [ ] Search bars work with clear button
- [ ] Status badges show correct colors automatically
- [ ] Priority badges: P0=red, P1=amber, P2=blue
- [ ] Primary action buttons are emerald green
- [ ] Empty states show when no data
- [ ] Stat cards navigate on click (Dashboard)
- [ ] All tables have white background with borders
- [ ] Icons display correctly (lucide-react)

---

## 🎊 If Everything Works

**Congratulations!** Your design system is fully functional.

### Next Steps:
1. ✅ Review component showcase on Admin page
2. ✅ Read component documentation: `src/app/components/common/README.md`
3. ✅ Start using components in new features
4. ✅ Share with your team

### To use in new pages:
```tsx
import {
  PageHeader,
  StatusBadge,
  SearchInput,
  DataTableWrapper,
  EmptyState
} from '@/components/common';
```

---

## 🆘 Troubleshooting

### Components Not Displaying
**Check**: Import path is correct
```tsx
import { StatusBadge } from '@/components/common';  // ✅ Correct
```

### Colors Look Wrong
**Check**: Using the component correctly
```tsx
<StatusBadge status="Completed" showIcon />  // ✅ Auto-colored
<Badge className="bg-emerald-50">...</Badge>  // ❌ Manual
```

### Empty State Not Showing
**Check**: Wrapped in table cell if in table
```tsx
<TableRow>
  <TableCell colSpan={5}>
    <EmptyState icon={Icon} title="..." />
  </TableCell>
</TableRow>
```

---

## 📞 Help

- **Component API**: `src/app/components/common/README.md`
- **Quick Reference**: `REUSABLE_COMPONENTS_GUIDE.md`
- **Full Details**: `IMPLEMENTATION_COMPLETE.md`
- **Design System**: `guidelines/README_DESIGN_SYSTEM.md`

---

**Happy Testing! 🚀**
