# Reusable Common Components

This directory contains reusable components that implement the User Research Hub design system. These components ensure consistency across all pages and simplify development.

## 📦 Available Components

### 1. PageHeader
Consistent page header with title, description, and action buttons.

```tsx
import { PageHeader } from '@/components/common';

<PageHeader
  title="Dashboard"
  description="View your research overview"
  action={
    <Button className="bg-emerald-600 hover:bg-emerald-700">
      <Plus className="h-4 w-4 mr-2" />
      Add New
    </Button>
  }
/>
```

**Props:**
- `title` (string) - Page title
- `description` (string, optional) - Page description
- `action` (ReactNode, optional) - Action button(s) in the header

---

### 2. StatCard
Dashboard stat cards with icon, value, and optional trend indicator.

```tsx
import { StatCard } from '@/components/common';
import { Users } from 'lucide-react';

<StatCard
  title="Total Users"
  value={156}
  icon={Users}
  color="emerald"
  trend={{ value: 12, isPositive: true }}
  onClick={() => navigate('/users')}
/>
```

**Props:**
- `title` (string) - Card title
- `value` (string | number) - Stat value to display
- `icon` (LucideIcon) - Icon component from lucide-react
- `color` ('blue' | 'emerald' | 'red' | 'amber' | 'purple') - Card color theme
- `trend` (object, optional) - { value: number, isPositive: boolean }
- `onClick` (function, optional) - Click handler

**Colors:**
- `blue` - Default, information
- `emerald` - Success, positive metrics
- `red` - Errors, critical items
- `amber` - Warnings, pending items
- `purple` - Features, enhancements

---

### 3. StatusBadge
Smart badge that automatically applies correct colors based on status type.

```tsx
import { StatusBadge } from '@/components/common';

{/* Research Status */}
<StatusBadge status="Completed" showIcon />
<StatusBadge status="Scheduled" showIcon />
<StatusBadge status="To be scheduled" showIcon />
<StatusBadge status="Skipped" showIcon />

{/* Insight Status */}
<StatusBadge status="Resolved" showIcon variant="insight" />
<StatusBadge status="Picked up" showIcon variant="insight" />
<StatusBadge status="Under development" showIcon variant="insight" />

{/* User Status */}
<StatusBadge status="Active" showIcon variant="user" />
<StatusBadge status="Invited" showIcon variant="user" />
<StatusBadge status="Inactive" showIcon variant="user" />
```

**Props:**
- `status` (string) - Status value
- `showIcon` (boolean, optional) - Show status icon
- `variant` ('research' | 'insight' | 'user' | 'default') - Status type

**Color Mapping:**
- ✅ Completed/Resolved/Active → Emerald (green)
- 📅 Scheduled/Picked up → Blue
- ⏰ To be scheduled/Under development/Invited → Amber (orange)
- ⏭️ Skipped/Inactive → Neutral (gray)

---

### 4. PriorityBadge
Priority indicator with consistent colors.

```tsx
import { PriorityBadge } from '@/components/common';

<PriorityBadge priority="P0" />
<PriorityBadge priority="P1" showLabel />
<PriorityBadge priority="P2" />
```

**Props:**
- `priority` ('P0' | 'P1' | 'P2') - Priority level
- `showLabel` (boolean, optional) - Show full label (e.g., "P0 - Critical")

**Priority Mapping:**
- 🔴 P0 → Red (Critical)
- 🟠 P1 → Amber (High)
- 🔵 P2 → Blue (Medium)

---

### 5. CategoryBadge
Category/tag badges with color coding.

```tsx
import { CategoryBadge } from '@/components/common';

<CategoryBadge category="Bug" showIcon />
<CategoryBadge category="Feature Enhancement" showIcon />
<CategoryBadge category="Copy Change" showIcon />
<CategoryBadge category="Engineering" />
```

**Props:**
- `category` (string) - Category name
- `showIcon` (boolean, optional) - Show category icon

**Category Colors:**
- Bug → Red
- Feature Enhancement → Purple
- Copy Change → Blue
- Other → Neutral

---

### 6. EmptyState
Consistent empty state component for tables and lists.

```tsx
import { EmptyState } from '@/components/common';
import { Users } from 'lucide-react';

<EmptyState
  icon={Users}
  title="No candidates found"
  description="Try adjusting your filters or add a new candidate"
  action={{
    label: "Add Candidate",
    onClick: () => setIsModalOpen(true)
  }}
/>
```

**Props:**
- `icon` (LucideIcon) - Icon to display
- `title` (string) - Empty state title
- `description` (string, optional) - Description text
- `action` (object, optional) - { label: string, onClick: function }
- `children` (ReactNode, optional) - Custom content

---

### 7. SearchInput
Search input with icon and clear button.

```tsx
import { SearchInput } from '@/components/common';

const [search, setSearch] = useState('');

<SearchInput
  value={search}
  onChange={setSearch}
  placeholder="Search candidates..."
  className="flex-1 max-w-md"
/>
```

**Props:**
- `value` (string) - Current search value
- `onChange` (function) - Change handler
- `placeholder` (string, optional) - Placeholder text
- `className` (string, optional) - Additional classes

**Features:**
- Search icon on the left
- Clear button (X) appears when there's text
- Consistent styling with neutral-50 background

---

### 8. DataTableWrapper
Wrapper for data tables with consistent styling.

```tsx
import { DataTableWrapper } from '@/components/common';
import { Table, TableHeader, TableBody } from '@/components/ui/table';

<DataTableWrapper>
  <Table>
    <TableHeader>
      {/* Headers */}
    </TableHeader>
    <TableBody>
      {/* Rows */}
    </TableBody>
  </Table>
</DataTableWrapper>
```

**Props:**
- `children` (ReactNode) - Table content
- `className` (string, optional) - Additional classes

**Features:**
- White background
- Rounded corners
- Neutral-200 border
- Overflow hidden for rounded corners

---

### 9. InfoCard
Card component for displaying grouped information.

```tsx
import { InfoCard } from '@/components/common';
import { Package } from 'lucide-react';

<InfoCard
  title="Product Name"
  description="5 features"
  icon={Package}
  action={
    <Button variant="ghost" size="sm">
      <Plus className="h-4 w-4 mr-2" />
      Add Feature
    </Button>
  }
>
  {/* Card content */}
</InfoCard>
```

**Props:**
- `title` (string) - Card title
- `description` (string, optional) - Card description
- `icon` (LucideIcon, optional) - Icon in header
- `action` (ReactNode, optional) - Action button in header
- `children` (ReactNode) - Card content
- `className` (string, optional) - Additional classes

---

## 🎨 Design System Colors

### Primary Color: Emerald Green
```tsx
className="bg-emerald-600 hover:bg-emerald-700"
```
Use for all primary actions (Create, Add, Save, Submit)

### Status Colors
- **Emerald (Green)** - Completed, Resolved, Active
- **Blue** - Scheduled, In Progress, Information
- **Amber (Orange)** - Pending, To be scheduled, Warnings
- **Red** - Critical, Errors, P0 Priority
- **Neutral (Gray)** - Skipped, Inactive, Disabled

### Usage Guidelines
1. Always use emerald for primary actions
2. Use StatusBadge for status indicators (auto-colors)
3. Use PriorityBadge for priorities
4. Use CategoryBadge for tags and categories
5. Maintain consistent spacing (p-8, gap-6, gap-4)

---

## 📋 Usage Example: Complete Page

```tsx
import {
  PageHeader,
  StatCard,
  StatusBadge,
  SearchInput,
  DataTableWrapper,
  EmptyState
} from '@/components/common';
import { Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function MyPage() {
  const [search, setSearch] = useState('');
  
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <PageHeader
        title="My Page"
        description="Manage your resources"
        action={
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Total Items"
          value={42}
          icon={Users}
          color="blue"
        />
      </div>

      {/* Search */}
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search..."
      />

      {/* Table */}
      <DataTableWrapper>
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50">
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2}>
                  <EmptyState
                    icon={Users}
                    title="No items found"
                    description="Get started by creating your first item"
                  />
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
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

---

## 🚀 Benefits

### Consistency
- All pages use the same components
- Automatic color application based on status
- Uniform spacing and styling

### Efficiency
- No need to recreate common patterns
- Pre-configured with design system colors
- Copy-paste ready examples

### Maintainability
- Changes in one place affect all pages
- TypeScript types ensure correct usage
- Self-documenting props

---

## 📝 Adding New Components

When creating new reusable components:

1. Create file in `src/app/components/common/`
2. Follow the design system colors
3. Add TypeScript types for all props
4. Export from `index.ts`
5. Document in this README
6. Showcase in Admin page "Component Showcase" tab

**Example:**
```tsx
// MyComponent.tsx
interface MyComponentProps {
  title: string;
  value: number;
}

export function MyComponent({ title, value }: MyComponentProps) {
  return (
    <div className="p-4 bg-white rounded-lg border border-neutral-200">
      <p className="text-sm text-neutral-600">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

// index.ts
export { MyComponent } from './MyComponent';
```

---

## 🎯 Where Components Are Used

| Component | Pages |
|-----------|-------|
| PageHeader | All pages |
| StatCard | Dashboard, Admin |
| StatusBadge | Candidates, Sessions, Analysis, Admin |
| PriorityBadge | Analysis, Insights |
| CategoryBadge | Analysis, Admin |
| EmptyState | All pages (when no data) |
| SearchInput | Candidates, Sessions, Analysis, Admin |
| DataTableWrapper | All pages with tables |
| InfoCard | Admin, Settings, Detail pages |

---

## ✅ Best Practices

1. **Always use PageHeader** for page titles
2. **Use StatusBadge** instead of manual Badge styling
3. **Use SearchInput** for all search functionality
4. **Wrap tables** with DataTableWrapper
5. **Show EmptyState** when lists/tables are empty
6. **Use emerald-600** for primary action buttons
7. **Add icons** to improve visual hierarchy
8. **Include showIcon** prop for status badges

---

**Last Updated:** January 2026  
**Maintained by:** User Research Hub Team
