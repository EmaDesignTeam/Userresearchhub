# Reusable Components - Visual Guide
## Quick Reference for User Research Hub Components

> **Use this guide** when building new features or updating existing pages.

---

## 🎯 The 9 Core Components

### 1. PageHeader 📄
**When to use**: Start of every page  
**Purpose**: Consistent page titles with optional actions

```tsx
<PageHeader
  title="Page Title"
  description="Optional description"
  action={<Button>Action</Button>}
/>
```

**Used in**: Dashboard, Candidates, Sessions, Analysis, Recordings, Settings, Admin

---

### 2. StatCard 📊
**When to use**: Dashboard metrics, KPI displays  
**Purpose**: Show numbers with icons and optional trends

```tsx
<StatCard
  title="Metric Name"
  value={42}
  icon={Calendar}
  color="blue"
  trend={{ value: 12, isPositive: true }}
  onClick={() => navigate('/page')}
/>
```

**Colors**: `blue` `emerald` `red` `amber` `purple`  
**Used in**: Dashboard, Admin

---

### 3. StatusBadge ✅
**When to use**: Show research/insight/user status  
**Purpose**: Auto-colored status indicators

```tsx
<StatusBadge status="Completed" showIcon />
<StatusBadge status="Scheduled" showIcon />
<StatusBadge status="Under development" showIcon variant="insight" />
<StatusBadge status="Active" showIcon variant="user" />
```

**Auto Colors**:
- ✅ Completed/Resolved → 🟢 Emerald
- 📅 Scheduled/Picked up → 🔵 Blue
- ⏰ Pending/Development → 🟠 Amber
- ⏭️ Skipped/Inactive → ⚪ Gray

**Used in**: Dashboard, Candidates, Sessions, Analysis, CandidateDetail, SessionDetail, Admin

---

### 4. PriorityBadge 🔴
**When to use**: Show P0/P1/P2 priority  
**Purpose**: Priority indicators with consistent colors

```tsx
<PriorityBadge priority="P0" />
<PriorityBadge priority="P1" showLabel />
```

**Auto Colors**:
- P0 → 🔴 Red (Critical)
- P1 → 🟠 Amber (High)
- P2 → 🔵 Blue (Medium)

**Used in**: Analysis, CandidateDetail

---

### 5. CategoryBadge 🏷️
**When to use**: Tags, categories, features, teams  
**Purpose**: General-purpose category badges

```tsx
<CategoryBadge category="Bug" showIcon />
<CategoryBadge category="Feature Enhancement" showIcon />
<CategoryBadge category="Engineering" />
```

**Special Colors**:
- Bug → 🔴 Red
- Feature Enhancement → 🟣 Purple
- Copy Change → 🔵 Blue
- Other/Default → ⚪ Gray

**Used in**: Candidates, Sessions, Analysis, CandidateDetail, SessionDetail, Recordings, Admin

---

### 6. SearchInput 🔍
**When to use**: Any search functionality  
**Purpose**: Search with icon + auto clear button

```tsx
<SearchInput
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Search candidates..."
  className="flex-1 max-w-md"
/>
```

**Features**:
- 🔍 Search icon on left
- ❌ Clear button (appears when text exists)
- Consistent `bg-neutral-50` style

**Used in**: Candidates, Sessions, Analysis, Admin

---

### 7. DataTableWrapper 📋
**When to use**: Wrap all tables  
**Purpose**: Consistent table container

```tsx
<DataTableWrapper>
  <Table>
    <TableHeader>...</TableHeader>
    <TableBody>...</TableBody>
  </Table>
</DataTableWrapper>
```

**Features**:
- White background
- Rounded corners
- Border styling
- Overflow hidden

**Used in**: Candidates, Sessions, Analysis, Recordings, Admin

---

### 8. EmptyState 🌫️
**When to use**: No data in tables/lists  
**Purpose**: Consistent, actionable empty states

```tsx
<EmptyState
  icon={Users}
  title="No items found"
  description="Try adjusting filters"
  action={{
    label: "Create Item",
    onClick: () => setModalOpen(true)
  }}
/>
```

**Features**:
- Icon with opacity
- Clear message
- Optional description
- Optional action button

**Used in**: All pages with lists/tables

---

### 9. InfoCard 📇
**When to use**: Grouped information sections  
**Purpose**: Cards with headers, icons, and actions

```tsx
<InfoCard
  title="Card Title"
  description="Optional subtitle"
  icon={Package}
  action={<Button>Action</Button>}
>
  {/* Card content */}
</InfoCard>
```

**Features**:
- Optional icon in header (emerald colored)
- Optional action button
- Consistent padding
- CardHeader + CardContent structure

**Used in**: CandidateDetail, SessionDetail, Settings, Admin

---

## 🎨 Color Decision Tree

### Is it a primary action?
```tsx
<Button className="bg-emerald-600 hover:bg-emerald-700">
  Primary Action
</Button>
```

### Is it a status?
```tsx
<StatusBadge status={status} showIcon />
// Auto-applies: green/blue/amber/gray
```

### Is it a priority?
```tsx
<PriorityBadge priority="P0" />
// Auto-applies: red/amber/blue
```

### Is it a category/tag/feature?
```tsx
<CategoryBadge category={name} showIcon />
// Special colors for Bug/Feature/Copy, neutral for others
```

---

## 📋 Page Templates

### Data List Page Template
```tsx
import {
  PageHeader,
  SearchInput,
  DataTableWrapper,
  StatusBadge,
  EmptyState
} from '@/components/common';

export default function ListPage() {
  const [search, setSearch] = useState('');
  const filtered = items.filter(/* ... */);
  
  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Items"
        description="Manage items"
        action={
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        }
      />
      
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search items..."
        className="flex-1 max-w-md"
      />
      
      <DataTableWrapper>
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50">
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2}>
                  <EmptyState
                    icon={Users}
                    title="No items found"
                    description="Adjust filters or create new"
                  />
                </TableCell>
              </TableRow>
            ) : (
              filtered.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} showIcon />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DataTableWrapper>
    </div>
  );
}
```

### Dashboard Page Template
```tsx
import { PageHeader, StatCard } from '@/components/common';

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <PageHeader
        title="Dashboard"
        description="Overview of metrics"
      />
      
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={156}
          icon={Users}
          color="emerald"
          onClick={() => navigate('/users')}
        />
        {/* More stat cards */}
      </div>
      
      {/* Rest of dashboard */}
    </div>
  );
}
```

### Detail Page Template
```tsx
import { InfoCard, StatusBadge, CategoryBadge } from '@/components/common';

export default function DetailPage() {
  return (
    <div className="p-8 space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl mb-2">{item.name}</h1>
          <p className="text-neutral-600">{item.description}</p>
        </div>
        <StatusBadge status={item.status} showIcon />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <InfoCard title="Details" icon={Info}>
          {/* Details */}
        </InfoCard>
        
        <InfoCard title="Metadata" icon={FileText}>
          {/* Metadata */}
        </InfoCard>
      </div>
    </div>
  );
}
```

---

## 🔍 Where to Find What

### Need a page header?
→ `<PageHeader />` from `@/components/common`

### Need a status badge?
→ `<StatusBadge />` - auto colors!

### Need a priority badge?
→ `<PriorityBadge />` - auto colors!

### Need any other badge?
→ `<CategoryBadge />` - general purpose

### Need search?
→ `<SearchInput />` with clear button

### Need table wrapper?
→ `<DataTableWrapper>` wrap your `<Table>`

### Need empty state?
→ `<EmptyState />` with icon, title, action

### Need info card?
→ `<InfoCard />` with icon and action

### Need stat card?
→ `<StatCard />` with trend indicator

---

## ✅ Quick Checklist

Before committing new pages:
- [ ] Uses `PageHeader` at top
- [ ] Uses `SearchInput` for search (not manual Input)
- [ ] Uses `StatusBadge` for statuses (not manual Badge)
- [ ] Uses `DataTableWrapper` for tables
- [ ] Uses `EmptyState` for no data
- [ ] Uses `bg-emerald-600` for primary actions
- [ ] Has icons from lucide-react
- [ ] Has proper spacing (p-8, gap-6, gap-4)

---

**Remember**: These components ensure consistency and reduce code duplication. Always use them instead of recreating patterns manually!

**Last Updated**: January 2026
