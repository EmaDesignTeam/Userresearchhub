# shadcn/ui Component Quick Reference
## User Research Hub - Visual Component Map

> **Quick Reference**: Use this as a cheat sheet when building or enhancing pages.

---

## 🎨 Design Tokens

### Colors
```css
Primary Action: bg-emerald-600 hover:bg-emerald-700
Secondary Action: variant="outline" or variant="ghost"
Background: bg-white / bg-neutral-50
Text: text-neutral-700 / text-neutral-600 / text-neutral-500
Border: border-neutral-200
```

### Status Colors
```typescript
✅ Completed/Resolved     → emerald (green)
📅 Scheduled/Picked up    → blue
⏰ To be scheduled/Dev    → amber (orange)
⏭️  Skipped               → neutral (gray)

🔴 P0 Critical            → red
🟠 P1 High                → amber
🔵 P2 Medium              → blue
```

### Spacing
```css
Page padding: p-8 (32px)
Section gap: gap-6 (24px)
Component gap: gap-4 (16px)
Card padding: p-6 (24px)
```

---

## 📄 Page Component Matrix

| Page | Core Components | Enhancement Opportunities |
|------|----------------|---------------------------|
| **Dashboard** | Card, Badge, Button | Skeleton, Hover Card, Progress, Tooltip |
| **Candidates** | Table, Input, Select, Badge | Pagination, Checkbox, Sheet, Tooltip |
| **Sessions** | Table, Badge, Dialog | Calendar, Popover, Pagination |
| **Analysis** | Table, Select, Badge | Accordion, Sheet, Command, Toggle Group |
| **Candidate Detail** | Tabs, Card, Textarea | Breadcrumb, Progress, Hover Card, Alert |
| **Recordings** | Card, Badge | Input, Select, AspectRatio, Dialog |
| **Settings** | Input, Switch, Separator | Tabs, RadioGroup, Slider, AlertDialog |
| **Layout** | Avatar, DropdownMenu | Command, Tooltip, Popover, ScrollArea |

---

## 🔧 Common Patterns

### Pattern 1: Page Header
```tsx
<div className="mb-8">
  <h1 className="text-3xl mb-2">{pageTitle}</h1>
  <p className="text-neutral-600">{description}</p>
</div>
```

### Pattern 2: Action Header
```tsx
<div className="flex items-center justify-between mb-8">
  <div>
    <h1 className="text-3xl mb-2">{title}</h1>
    <p className="text-neutral-600">{description}</p>
  </div>
  <Button className="bg-emerald-600 hover:bg-emerald-700">
    <Plus className="h-4 w-4 mr-2" />
    {actionText}
  </Button>
</div>
```

### Pattern 3: Search & Filter Bar
```tsx
<div className="flex gap-4 mb-6">
  <div className="flex-1 max-w-md relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
    <Input placeholder="Search..." className="pl-10" />
  </div>
  <Select>{/* Filter 1 */}</Select>
  <Select>{/* Filter 2 */}</Select>
</div>
```

### Pattern 4: Data Table with Hover
```tsx
<Table>
  <TableHeader>
    <TableRow className="bg-neutral-50">
      <TableHead>{/* Headers */}</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow className="hover:bg-neutral-50 cursor-pointer">
      <TableCell className="text-neutral-600">{/* Data */}</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Pattern 5: Status Badge
```tsx
<Badge 
  variant="outline" 
  className={getStatusColor(status)}
>
  {status}
</Badge>
```

### Pattern 6: Empty State
```tsx
<div className="text-center py-12 text-neutral-500">
  <Icon className="h-12 w-12 mx-auto mb-3 opacity-40" />
  <p className="mb-1">{emptyTitle}</p>
  <p className="text-sm">{emptyDescription}</p>
</div>
```

### Pattern 7: Stat Card
```tsx
<Card>
  <CardContent className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-neutral-600 mb-1">{title}</p>
        <p className="text-3xl">{value}</p>
      </div>
      <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
    </div>
  </CardContent>
</Card>
```

### Pattern 8: Action Dropdown
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## 🎯 Icon Sizes

```tsx
// Button icons
<Icon className="h-4 w-4 mr-2" />

// Navigation icons
<Icon className="h-5 w-5" />

// Stat card icons
<Icon className="h-6 w-6" />

// Empty state icons
<Icon className="h-12 w-12 opacity-40" />

// Page headers (decorative)
<Icon className="h-8 w-8" />
```

---

## 📦 Component Import Cheat Sheet

```tsx
// Layout
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// Forms
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'

// Selection
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

// Data Display
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'

// Navigation
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

// Feedback
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Overlays
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

// Advanced
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { Calendar } from '@/components/ui/calendar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AspectRatio } from '@/components/ui/aspect-ratio'
```

---

## 🚀 Quick Implementation Examples

### Add Toast Notifications
```tsx
import { toast } from 'sonner'

// Success
toast.success('Candidate added successfully')

// Error
toast.error('Failed to save changes')

// Loading
const id = toast.loading('Saving...')
// Later: toast.success('Saved!', { id })

// With action
toast('New session scheduled', {
  action: {
    label: 'View',
    onClick: () => navigate('/sessions')
  }
})
```

### Add Loading Skeletons
```tsx
{isLoading ? (
  <Card>
    <CardContent className="p-6">
      <Skeleton className="h-20 w-full" />
    </CardContent>
  </Card>
) : (
  <Card>{/* Actual content */}</Card>
)}

// Table skeleton
{isLoading ? (
  <>
    {[...Array(5)].map((_, i) => (
      <TableRow key={i}>
        <TableCell><Skeleton className="h-4 w-full" /></TableCell>
      </TableRow>
    ))}
  </>
) : (
  // Actual rows
)}
```

### Add Tooltips
```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <HelpCircle className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Click for help</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Add Pagination
```tsx
const [page, setPage] = useState(1)
const itemsPerPage = 20
const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage)

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious 
        onClick={() => setPage(p => Math.max(1, p - 1))}
        disabled={page === 1}
      />
    </PaginationItem>
    
    {[...Array(totalPages)].map((_, i) => (
      <PaginationItem key={i}>
        <PaginationLink
          isActive={page === i + 1}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    ))}
    
    <PaginationItem>
      <PaginationNext 
        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
      />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

### Add Calendar Date Picker
```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" className="justify-start">
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, 'PPP') : 'Pick a date'}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      initialFocus
    />
  </PopoverContent>
</Popover>
```

### Add Bulk Selection
```tsx
const [selected, setSelected] = useState<string[]>([])

<TableHead className="w-[50px]">
  <Checkbox 
    checked={selected.length === data.length}
    onCheckedChange={(checked) => 
      setSelected(checked ? data.map(d => d.id) : [])
    }
  />
</TableHead>

{/* In each row */}
<TableCell>
  <Checkbox 
    checked={selected.includes(item.id)}
    onCheckedChange={(checked) =>
      setSelected(prev => 
        checked 
          ? [...prev, item.id]
          : prev.filter(id => id !== item.id)
      )
    }
  />
</TableCell>

{/* Show bulk actions */}
{selected.length > 0 && (
  <Alert>
    <AlertDescription>
      {selected.length} items selected
      <Button size="sm" className="ml-4">Bulk Action</Button>
    </AlertDescription>
  </Alert>
)}
```

### Add Confirmation Dialog
```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Add Command Palette (⌘K)
```tsx
const [open, setOpen] = useState(false)

useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen(true)
    }
  }
  document.addEventListener('keydown', down)
  return () => document.removeEventListener('keydown', down)
}, [])

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Navigation">
      <CommandItem onSelect={() => navigate('/candidates')}>
        <Users className="mr-2 h-4 w-4" />
        Candidates
      </CommandItem>
      <CommandItem onSelect={() => navigate('/sessions')}>
        <Calendar className="mr-2 h-4 w-4" />
        Sessions
      </CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>
```

---

## 🎨 Color Helper Functions

```tsx
// Status colors for badges
const getStatusColor = (status: ResearchStatus) => {
  const colors = {
    'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Scheduled': 'bg-blue-50 text-blue-700 border-blue-200',
    'To be scheduled': 'bg-amber-50 text-amber-700 border-amber-200',
    'Skipped': 'bg-neutral-100 text-neutral-600 border-neutral-200',
  }
  return colors[status] || 'bg-neutral-100 text-neutral-600'
}

// Priority colors
const getPriorityColor = (priority: Priority) => {
  const colors = {
    'P0': 'bg-red-50 text-red-700 border-red-200',
    'P1': 'bg-amber-50 text-amber-700 border-amber-200',
    'P2': 'bg-blue-50 text-blue-700 border-blue-200',
  }
  return colors[priority]
}

// Category colors
const getCategoryColor = (category: Category) => {
  const colors = {
    'Bug': 'bg-red-50 text-red-700',
    'Feature Enhancement': 'bg-purple-50 text-purple-700',
    'Copy Change': 'bg-blue-50 text-blue-700',
    'Other': 'bg-neutral-50 text-neutral-700',
  }
  return colors[category]
}

// Icon background colors (for stat cards)
const getIconBgColor = (type: string) => {
  const colors = {
    'sessions': 'bg-blue-50',
    'candidates': 'bg-emerald-50',
    'insights': 'bg-red-50',
    'completed': 'bg-emerald-50',
  }
  return colors[type]
}

const getIconColor = (type: string) => {
  const colors = {
    'sessions': 'text-blue-600',
    'candidates': 'text-emerald-600',
    'insights': 'text-red-600',
    'completed': 'text-emerald-600',
  }
  return colors[type]
}
```

---

## 📋 Component Decision Tree

### When to Use What?

**Need to show data in rows/columns?**
→ Use `Table`

**Need to filter/search data?**
→ Use `Input` + `Select` + `DropdownMenu`

**Need to show status/category?**
→ Use `Badge`

**Need to group content?**
→ Use `Card`

**Need user confirmation?**
→ Use `AlertDialog` (destructive) or `Dialog` (regular)

**Need to show progress?**
→ Use `Progress` or `Skeleton` (loading)

**Need quick info on hover?**
→ Use `Tooltip` (short) or `Hover Card` (detailed)

**Need date selection?**
→ Use `Calendar` + `Popover`

**Need to organize content in sections?**
→ Use `Tabs` or `Accordion`

**Need side panel for details?**
→ Use `Sheet`

**Need full modal for forms?**
→ Use `Dialog`

**Need to show notifications?**
→ Use `toast` (transient) or `Alert` (persistent)

**Need pagination?**
→ Use `Pagination`

**Need bulk actions?**
→ Use `Checkbox` + `Alert` for action bar

**Need global search?**
→ Use `Command`

---

## ✅ Pre-flight Checklist

Before implementing a new component:

- [ ] Does it match the emerald color scheme?
- [ ] Does it follow spacing patterns (p-6, gap-4, mb-8)?
- [ ] Does it use correct text colors (neutral-600/700)?
- [ ] Does it have hover states?
- [ ] Does it have loading states (Skeleton)?
- [ ] Does it show feedback (toast)?
- [ ] Does it have tooltips on icons?
- [ ] Is it keyboard accessible?
- [ ] Does it handle empty states?
- [ ] Does it handle error states?

---

**Quick Tip**: Keep this reference open while coding. It will save you time looking up component patterns and imports!

**Last Updated**: January 2026
