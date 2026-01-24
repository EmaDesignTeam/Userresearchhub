# shadcn/ui Component Implementation Plan
## User Research Hub Design System

> **Document Purpose**: This plan maps shadcn/ui components to User Research Hub pages and provides customization guidance to match the existing design language.

---

## Table of Contents
1. [Design System Overview](#design-system-overview)
2. [Component Inventory](#component-inventory)
3. [Page-by-Page Component Mapping](#page-by-page-component-mapping)
4. [Customization Guidelines](#customization-guidelines)
5. [Component Enhancement Opportunities](#component-enhancement-opportunities)
6. [Implementation Priority](#implementation-priority)

---

## Design System Overview

### Current Design Characteristics

#### Color Palette
- **Primary/Accent**: Emerald Green (`#10B981` / `emerald-600`)
  - Used for primary actions, active states, success indicators
- **Background**: White (`#ffffff`) with Neutral-50 (`#FAFAFA`) for page backgrounds
- **Text**: Neutral-700 for primary, Neutral-600 for secondary, Neutral-500 for tertiary
- **Border**: Neutral-200 with subtle shadows

#### Status Colors
```typescript
// Status Badge Colors
'Completed' | 'Resolved' → emerald (green)
'Scheduled' | 'Picked up' → blue
'To be scheduled' | 'Under development' → amber (orange/yellow)
'Skipped' → neutral (gray)

// Priority Colors
'P0' → red (critical)
'P1' → amber (high)
'P2' → blue (medium)

// Category Colors
'Bug' → red
'Feature Enhancement' → purple
'Copy Change' → blue
'Other' → neutral
```

#### Typography
- **Headings**: 
  - H1: `text-3xl` (30px) - Page titles
  - H2: `text-2xl` (24px) - Card titles, section headers
  - H3: `text-xl` (20px) - Subsection headers
- **Body**: `text-base` (16px)
- **Small**: `text-sm` (14px) - Table cells, descriptions
- **Extra Small**: `text-xs` (12px) - Badges, metadata

#### Spacing & Layout
- **Page Padding**: `p-8` (32px)
- **Card Gaps**: `gap-6` (24px)
- **Component Spacing**: `space-y-4` or `space-y-6`
- **Border Radius**: `rounded-lg` (0.625rem) for cards, `rounded-md` for inputs

#### Design Principles
1. **Clean & Minimal**: Lots of whitespace, subtle borders
2. **Information Density**: Tables and lists for data-heavy views
3. **Status Visibility**: Heavy use of badges for quick status recognition
4. **Action Clarity**: Primary actions use emerald green, secondary use outline/ghost variants
5. **Professional**: Enterprise-grade appearance suitable for research teams

---

## Component Inventory

### ✅ Currently Implemented (Already in Use)

| Component | Location | Usage |
|-----------|----------|-------|
| **Button** | All pages | Primary actions, secondary actions, icon buttons |
| **Card** | Dashboard, Detail pages | Content containers, stat cards |
| **Badge** | All pages | Status indicators, tags, categories |
| **Input** | Forms, Filters | Search bars, text fields |
| **Table** | Candidates, Sessions, Analysis | Data display |
| **Select** | Filters | Dropdown filters |
| **DropdownMenu** | Tables, Header | Actions menu, user menu |
| **Tabs** | CandidateDetail | Content organization |
| **Avatar** | Header | User profile display |
| **Switch** | Settings | Toggle preferences |
| **Separator** | Settings | Visual dividers |
| **Dialog** | Modals | Create/Edit forms |
| **Textarea** | Notes, Forms | Multi-line input |
| **Label** | Forms | Form field labels |

### 🟡 Available but Not Yet Used (Enhancement Opportunities)

| Component | Potential Use | Priority |
|-----------|--------------|----------|
| **Skeleton** | Loading states | High |
| **Toast (Sonner)** | Success/Error notifications | High |
| **Progress** | Session progress, upload progress | Medium |
| **Tooltip** | Icon explanations, help text | High |
| **Accordion** | FAQ section, collapsible filters | Medium |
| **Breadcrumb** | Navigation hierarchy | Medium |
| **Command** | Global search (⌘K) | Low |
| **Hover Card** | Quick preview on hover | Medium |
| **Pagination** | Table pagination | High |
| **Scroll Area** | Long lists, sidebar | Low |
| **Calendar** | Date picker for sessions | High |
| **Checkbox** | Bulk actions, multi-select | Medium |
| **Radio Group** | Single-choice selections | Low |
| **Slider** | Priority selection, filters | Low |
| **Toggle** | View mode switches | Low |
| **Alert** | Inline notifications, warnings | Medium |
| **Popover** | Filter panels, quick actions | Medium |
| **Sheet** | Side panels, filter drawer | Medium |
| **Collapsible** | Expandable sections | Low |

---

## Page-by-Page Component Mapping

### 1. Dashboard Page
**Current Layout**: Hero header → Stats grid → Two-column layout (Sessions/Insights) → Activity feed

#### Components Used
```typescript
✅ Card, CardContent, CardHeader, CardTitle
✅ Button
✅ Badge
✅ Icons (lucide-react)
```

#### Recommended Additions
```typescript
🟡 Skeleton - For loading states on stats cards
🟡 Hover Card - Show candidate details on hover in sessions list
🟡 Progress - Show session completion progress
🟡 Tooltip - Explain stat metrics on icon hover
```

#### Component Breakdown

**Stat Cards**
```tsx
<Card>
  <CardContent className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-neutral-600">{stat.title}</p>
        <p className="text-3xl">{stat.value}</p>
      </div>
      <div className="h-12 w-12 rounded-lg bg-{color}-50">
        <Icon className="h-6 w-6 text-{color}-600" />
      </div>
    </div>
  </CardContent>
</Card>
```

**Recommendation**: Add `Skeleton` wrapper for loading:
```tsx
{isLoading ? (
  <Card>
    <CardContent className="p-6">
      <Skeleton className="h-20 w-full" />
    </CardContent>
  </Card>
) : (
  // Stat card content
)}
```

**Activity Feed**
- Current: Custom implementation with icons and text
- Enhance with: `Tooltip` on activity icons, `Hover Card` for user profiles

**Session Cards**
- Add: `Tooltip` on external link icon
- Add: `Hover Card` showing candidate details

---

### 2. Candidates Page
**Current Layout**: Header with search → Filters bar → Data table → Actions dropdown

#### Components Used
```typescript
✅ Table (full suite)
✅ Input (with search icon)
✅ Select (filters)
✅ Button
✅ Badge (status, features, user type)
✅ DropdownMenu (row actions)
```

#### Recommended Additions
```typescript
🟡 Pagination - Navigate through large candidate lists
🟡 Checkbox - Bulk selection for batch operations
🟡 Skeleton - Table row loading states
🟡 Tooltip - Show full feature list on hover
🟡 Sheet - Side panel for quick candidate preview
🟡 Alert - Show filter results summary
```

#### Component Breakdown

**Search & Filters Section**
```tsx
// Current implementation is good
// Enhancement: Add filter count badge
<Select>
  <SelectTrigger>
    <Filter className="h-4 w-4 mr-2" />
    <SelectValue placeholder="Status" />
    {activeFilters > 0 && (
      <Badge variant="secondary" className="ml-2">{activeFilters}</Badge>
    )}
  </SelectTrigger>
</Select>
```

**Table with Pagination**
```tsx
<div className="bg-white rounded-lg border">
  <Table>
    {/* Table content */}
  </Table>
  
  {/* Add Pagination */}
  <div className="border-t px-4 py-3">
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        {/* ... */}
      </PaginationContent>
    </Pagination>
  </div>
</div>
```

**Bulk Actions**
```tsx
// Add checkboxes to table
<TableHead className="w-[50px]">
  <Checkbox 
    checked={selectedAll}
    onCheckedChange={handleSelectAll}
  />
</TableHead>

// Show bulk actions bar when items selected
{selectedCount > 0 && (
  <Alert className="mb-4">
    <AlertDescription>
      {selectedCount} candidates selected
      <Button size="sm" className="ml-4">Schedule Sessions</Button>
      <Button size="sm" variant="outline">Export</Button>
    </AlertDescription>
  </Alert>
)}
```

**Feature Badges with Tooltip**
```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Badge>
        +{candidate.featuresTested.length - 2}
      </Badge>
    </TooltipTrigger>
    <TooltipContent>
      <div className="space-y-1">
        {candidate.featuresTested.slice(2).map(f => (
          <div key={f}>{f}</div>
        ))}
      </div>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

### 3. Sessions Page
**Current Layout**: Header → Search & Filter → Data table

#### Components Used
```typescript
✅ Table
✅ Input (search)
✅ Select (status filter)
✅ Button
✅ Badge
✅ Dialog (CreateSessionModal)
```

#### Recommended Additions
```typescript
🟡 Calendar - Visual date picker for scheduling
🟡 Pagination - Navigate session list
🟡 Tooltip - Show session details on hover
🟡 Popover - Quick edit session time/status
🟡 Badge with icon - Add calendar/clock icons to status badges
🟡 Breadcrumb - Show product → feature hierarchy
```

#### Component Breakdown

**Session Table Enhancements**
```tsx
// Add Calendar icon to date cells
<TableCell>
  <div className="flex items-center gap-2">
    <Calendar className="h-4 w-4 text-neutral-500" />
    <div>
      <div>{format(new Date(session.date), 'MMM d, yyyy')}</div>
      <div className="text-sm text-neutral-500">{session.time}</div>
    </div>
  </div>
</TableCell>

// Add quick status change with Popover
<TableCell>
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost" size="sm">
        <Badge variant="outline">{session.status}</Badge>
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-48">
      <div className="space-y-2">
        <p className="text-sm font-medium">Change Status</p>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          Scheduled
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          Completed
        </Button>
      </div>
    </PopoverContent>
  </Popover>
</TableCell>
```

**Calendar Integration for CreateSessionModal**
```tsx
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Schedule Session</DialogTitle>
    </DialogHeader>
    
    {/* Replace text input with Calendar component */}
    <div className="space-y-4">
      <Label>Select Date</Label>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  </DialogContent>
</Dialog>
```

---

### 4. Analysis Page (Insights)
**Current Layout**: Header → Multi-filter bar → Complex data table

#### Components Used
```typescript
✅ Table
✅ Input (search)
✅ Select (multiple filters)
✅ Badge (priority, status, category, team, effort)
✅ DropdownMenu (status change, actions)
✅ Button
✅ Dialog (Create/Edit Insight Modal)
```

#### Recommended Additions
```typescript
🟡 Accordion - Collapsible filter groups (Advanced Filters)
🟡 Pagination - Handle large insight lists
🟡 Sheet - Side panel for insight details/edit
🟡 Tooltip - Explain priority levels, effort estimates
🟡 Checkbox - Multi-select for bulk operations
🟡 Toggle Group - Switch between grid/table view
🟡 Command Palette - Quick search/filter insights (⌘K)
```

#### Component Breakdown

**Advanced Filters with Accordion**
```tsx
<div className="mb-6">
  {/* Basic filters (always visible) */}
  <div className="flex gap-4 mb-4">
    <Input placeholder="Search..." />
    <Select>{/* Status */}</Select>
    <Select>{/* Priority */}</Select>
  </div>
  
  {/* Advanced filters (collapsible) */}
  <Accordion type="single" collapsible>
    <AccordionItem value="advanced">
      <AccordionTrigger className="text-sm">
        Advanced Filters
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-4 gap-4 pt-4">
          <Select>{/* Category */}</Select>
          <Select>{/* Team */}</Select>
          <Select>{/* Product */}</Select>
          <Select>{/* Effort */}</Select>
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>
```

**Insight Detail Sheet (instead of modal for viewing)**
```tsx
<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetContent className="w-[600px] sm:max-w-[600px]">
    <SheetHeader>
      <SheetTitle>{insight.title}</SheetTitle>
      <SheetDescription>
        Created {format(new Date(insight.createdAt), 'MMM d, yyyy')}
      </SheetDescription>
    </SheetHeader>
    
    <div className="space-y-6 py-6">
      {/* Insight details */}
      <div>
        <Label>Priority</Label>
        <Badge>{insight.priority}</Badge>
      </div>
      
      <Separator />
      
      <div>
        <Label>Description</Label>
        <p className="text-sm">{insight.description}</p>
      </div>
      
      {/* Timeline, Comments, Attachments */}
    </div>
  </SheetContent>
</Sheet>
```

**Priority Badges with Tooltips**
```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Badge variant="outline" className="bg-red-50 text-red-700">
        P0
      </Badge>
    </TooltipTrigger>
    <TooltipContent>
      <p className="font-medium">P0 - Critical</p>
      <p className="text-xs">Blocks core functionality</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**View Toggle**
```tsx
<div className="flex items-center gap-2">
  <ToggleGroup type="single" value={view} onValueChange={setView}>
    <ToggleGroupItem value="table">
      <TableIcon className="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="kanban">
      <KanbanIcon className="h-4 w-4" />
    </ToggleGroupItem>
  </ToggleGroup>
</div>
```

---

### 5. Candidate Detail Page
**Current Layout**: Back button → Header with actions → Tabs (Overview, Sessions, Insights, Notes, Recordings)

#### Components Used
```typescript
✅ Button
✅ Badge
✅ Card
✅ Tabs, TabsList, TabsTrigger, TabsContent
✅ Textarea
```

#### Recommended Additions
```typescript
🟡 Breadcrumb - Navigation path (Candidates > [Name])
🟡 Separator - Visual section breaks
🟡 Tooltip - Explain status meanings
🟡 Alert - Show important candidate notes/warnings
🟡 Progress - Show session completion rate
🟡 Hover Card - Preview session details without navigating
🟡 Dialog - Confirm destructive actions
```

#### Component Breakdown

**Breadcrumb Navigation**
```tsx
<Breadcrumb className="mb-6">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/candidates">Candidates</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>{candidate.name}</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

**Overview Tab Enhancement**
```tsx
<TabsContent value="overview">
  {/* Add alert for important notes */}
  {candidate.importantNote && (
    <Alert className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Important Note</AlertTitle>
      <AlertDescription>{candidate.importantNote}</AlertDescription>
    </Alert>
  )}
  
  {/* Add progress indicator */}
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>Research Progress</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Sessions Completed</span>
          <span>{completedSessions}/{totalSessions}</span>
        </div>
        <Progress value={(completedSessions/totalSessions) * 100} />
      </div>
    </CardContent>
  </Card>
  
  {/* Existing profile cards */}
</TabsContent>
```

**Session Cards with Hover Preview**
```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <div className="p-4 border rounded-lg hover:bg-neutral-50 cursor-pointer">
      <p>{session.product}</p>
    </div>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="space-y-2">
      <h4 className="font-medium">{session.product}</h4>
      <p className="text-sm text-neutral-600">
        {format(new Date(session.date), 'PPP')}
      </p>
      <div className="flex gap-2">
        {session.featuresTested.map(f => (
          <Badge key={f} variant="secondary">{f}</Badge>
        ))}
      </div>
      <Separator />
      <div className="text-sm">
        <p>Moderator: {session.moderator}</p>
        <p>Duration: {session.duration}</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

**Notes Tab with Confirmation**
```tsx
<TabsContent value="notes">
  <Card>
    <CardContent>
      <Textarea value={notes} onChange={setNotes} />
      
      <div className="flex justify-end gap-2 mt-4">
        {/* Add confirmation dialog for important action */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Convert to Insight</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Convert Notes to Insight?</DialogTitle>
              <DialogDescription>
                This will create a new insight from these notes. 
                You can edit the details after creation.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleConvertToInsight}>
                Create Insight
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Button onClick={handleSaveNotes}>Save Notes</Button>
      </div>
    </CardContent>
  </Card>
</TabsContent>
```

---

### 6. Recordings Page
**Current Layout**: Header → Grid of recording cards

#### Components Used
```typescript
✅ Card, CardHeader, CardTitle, CardContent
✅ Badge
```

#### Recommended Additions
```typescript
🟡 Input - Search recordings
🟡 Select - Filter by candidate/date
🟡 AspectRatio - Maintain video thumbnail aspect ratio
🟡 Dialog - Video player modal
🟡 DropdownMenu - Recording actions (download, share, delete)
🟡 Hover Card - Show recording metadata on hover
🟡 Skeleton - Loading placeholder for video thumbnails
```

#### Component Breakdown

**Search & Filter Bar**
```tsx
<div className="flex gap-4 mb-6">
  <div className="flex-1 max-w-md relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
    <Input 
      placeholder="Search recordings..." 
      className="pl-10"
      value={searchQuery}
      onChange={setSearchQuery}
    />
  </div>
  <Select>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Filter by candidate" />
    </SelectTrigger>
    <SelectContent>
      {candidates.map(c => (
        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
```

**Enhanced Recording Cards**
```tsx
<Card className="group cursor-pointer hover:shadow-md transition-shadow">
  <CardHeader className="flex flex-row items-start justify-between">
    <CardTitle className="text-base">{recording.title}</CardTitle>
    
    {/* Add actions dropdown */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Play className="h-4 w-4 mr-2" />
          Play
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download className="h-4 w-4 mr-2" />
          Download
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Share className="h-4 w-4 mr-2" />
          Share
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </CardHeader>
  
  <CardContent>
    <div className="space-y-3">
      <Badge variant="secondary">{recording.candidateName}</Badge>
      <p className="text-sm text-neutral-600">
        {format(new Date(recording.date), 'MMMM d, yyyy')}
      </p>
      
      {/* Use AspectRatio for video thumbnail */}
      <AspectRatio ratio={16/9}>
        <div className="bg-neutral-100 rounded flex items-center justify-center h-full">
          {isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <Video className="h-8 w-8 text-neutral-400" />
          )}
        </div>
      </AspectRatio>
      
      {/* Add duration and size */}
      <div className="flex justify-between text-xs text-neutral-500">
        <span>Duration: {recording.duration}</span>
        <span>Size: {recording.size}</span>
      </div>
    </div>
  </CardContent>
</Card>
```

---

### 7. Settings Page
**Current Layout**: Header → Stacked cards (Profile, Notifications, Preferences)

#### Components Used
```typescript
✅ Card, CardHeader, CardTitle, CardContent
✅ Label
✅ Input
✅ Button
✅ Switch
✅ Separator
```

#### Recommended Additions
```typescript
🟡 Tabs - Organize settings into categories
🟡 Alert - Show unsaved changes warning
🟡 RadioGroup - Single-choice preferences
🟡 Select - Theme selection, timezone
🟡 Slider - Adjust notification frequency
🟡 AlertDialog - Confirm dangerous actions (delete account)
```

#### Component Breakdown

**Tabbed Settings Organization**
```tsx
<Tabs defaultValue="profile" className="w-full">
  <TabsList>
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
    <TabsTrigger value="preferences">Preferences</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
  </TabsList>
  
  <TabsContent value="profile">
    {/* Profile settings */}
  </TabsContent>
  
  <TabsContent value="notifications">
    {/* Notification settings */}
  </TabsContent>
  
  {/* ... */}
</Tabs>
```

**Enhanced Preferences**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Appearance</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Theme selection with RadioGroup */}
    <div>
      <Label>Theme</Label>
      <RadioGroup value={theme} onValueChange={setTheme}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="light" id="light" />
          <Label htmlFor="light">Light</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="dark" id="dark" />
          <Label htmlFor="dark">Dark</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="system" id="system" />
          <Label htmlFor="system">System</Label>
        </div>
      </RadioGroup>
    </div>
    
    <Separator />
    
    {/* Notification frequency with Slider */}
    <div>
      <div className="flex justify-between mb-2">
        <Label>Notification Frequency</Label>
        <span className="text-sm text-neutral-500">{frequency}x/day</span>
      </div>
      <Slider 
        value={[frequency]} 
        onValueChange={setFrequency}
        max={10}
        step={1}
      />
    </div>
  </CardContent>
</Card>
```

**Danger Zone with Confirmation**
```tsx
<Card className="border-red-200">
  <CardHeader>
    <CardTitle className="text-red-600">Danger Zone</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">Delete Account</p>
        <p className="text-sm text-neutral-600">
          Permanently delete your account and all data
        </p>
      </div>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete Account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </CardContent>
</Card>
```

**Unsaved Changes Alert**
```tsx
{hasUnsavedChanges && (
  <Alert className="mb-6">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Unsaved Changes</AlertTitle>
    <AlertDescription>
      You have unsaved changes. Don't forget to save before leaving.
      <Button size="sm" className="ml-4" onClick={handleSave}>
        Save Changes
      </Button>
    </AlertDescription>
  </Alert>
)}
```

---

### 8. Main Layout (Sidebar & Header)
**Current Layout**: Sidebar (logo + nav) + Main area (header + content)

#### Components Used
```typescript
✅ Input (search in header)
✅ Button (notification bell)
✅ DropdownMenu (user menu)
✅ Avatar
```

#### Recommended Additions
```typescript
🟡 Command - Global command palette (⌘K)
🟡 Tooltip - Explain navigation items
🟡 Badge - Show notification count
🟡 Popover - Notifications panel
🟡 Separator - Divide nav sections
🟡 ScrollArea - Scrollable sidebar if many items
```

#### Component Breakdown

**Command Palette Integration**
```tsx
import { CommandDialog } from '@/components/ui/command'

export default function MainLayout() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      {/* Add command trigger to search bar */}
      <div className="relative" onClick={() => setOpen(true)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
        <Input 
          placeholder="Search... (⌘K)" 
          className="pl-10"
          readOnly
        />
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => navigate('/candidates')}>
              <Users className="mr-2 h-4 w-4" />
              <span>Candidates</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate('/sessions')}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Sessions</span>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Recent">
            {recentItems.map(item => (
              <CommandItem key={item.id}>
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
```

**Enhanced Notifications**
```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
        >
          {unreadCount}
        </Badge>
      )}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-80" align="end">
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Notifications</h4>
        <Button variant="ghost" size="sm">Mark all read</Button>
      </div>
      
      <Separator />
      
      <ScrollArea className="h-[300px]">
        {notifications.map(notif => (
          <div key={notif.id} className="p-3 hover:bg-neutral-50 rounded">
            <p className="text-sm">{notif.message}</p>
            <p className="text-xs text-neutral-500 mt-1">
              {format(notif.timestamp, 'MMM d, h:mm a')}
            </p>
          </div>
        ))}
      </ScrollArea>
    </div>
  </PopoverContent>
</Popover>
```

**Navigation with Tooltips & Grouping**
```tsx
<nav className="flex-1 p-4 space-y-6">
  {/* Main Navigation */}
  <div className="space-y-1">
    <p className="text-xs uppercase text-neutral-500 px-3 mb-2">Main</p>
    {mainNavigation.map((item) => (
      <TooltipProvider key={item.name}>
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink to={item.href} className="...">
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ))}
  </div>
  
  <Separator />
  
  {/* Admin Section */}
  {currentUser?.role === 'Admin' && (
    <div className="space-y-1">
      <p className="text-xs uppercase text-neutral-500 px-3 mb-2">Admin</p>
      {/* Admin nav items */}
    </div>
  )}
</nav>
```

---

## Customization Guidelines

### Matching User Research Hub Design Language

#### 1. Color Customizations

**Primary Action Buttons**
```tsx
// Current pattern - maintain this
<Button className="bg-emerald-600 hover:bg-emerald-700">
  Primary Action
</Button>

// For variants, use emerald accent
const buttonVariants = cva(
  "...",
  {
    variants: {
      variant: {
        default: "bg-emerald-600 text-white hover:bg-emerald-700",
        // Keep other variants as-is
      }
    }
  }
)
```

**Status Badges**
```tsx
// Maintain current color mapping
const getStatusColor = (status: ResearchStatus) => {
  const colors = {
    'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Scheduled': 'bg-blue-50 text-blue-700 border-blue-200',
    'To be scheduled': 'bg-amber-50 text-amber-700 border-amber-200',
    'Skipped': 'bg-neutral-100 text-neutral-600 border-neutral-200',
  }
  return colors[status]
}

// Apply with outline variant
<Badge variant="outline" className={getStatusColor(status)}>
  {status}
</Badge>
```

**Priority Badges**
```tsx
const getPriorityColor = (priority: Priority) => {
  const colors = {
    'P0': 'bg-red-50 text-red-700 border-red-200',
    'P1': 'bg-amber-50 text-amber-700 border-amber-200',
    'P2': 'bg-blue-50 text-blue-700 border-blue-200',
  }
  return colors[priority]
}
```

#### 2. Border Radius & Shadows

**Cards**
```tsx
// Maintain current style
<Card className="rounded-lg border border-neutral-200">
  {/* Content */}
</Card>

// For elevated cards (hover states)
<Card className="rounded-lg border border-neutral-200 hover:shadow-md transition-shadow">
  {/* Content */}
</Card>
```

**Input Fields**
```tsx
// Keep consistent with current design
<Input className="rounded-md border-neutral-200 bg-neutral-50" />
```

#### 3. Typography & Spacing

**Page Headers**
```tsx
<div className="mb-8">
  <h1 className="text-3xl mb-2">{pageTitle}</h1>
  <p className="text-neutral-600">{pageDescription}</p>
</div>
```

**Card Headers**
```tsx
<CardHeader>
  <CardTitle className="text-xl">{cardTitle}</CardTitle>
  {cardDescription && (
    <p className="text-sm text-neutral-600">{cardDescription}</p>
  )}
</CardHeader>
```

**Consistent Spacing**
```tsx
// Page-level
<div className="p-8 space-y-8">
  {/* Content sections */}
</div>

// Card-level
<CardContent className="p-6 space-y-4">
  {/* Card content */}
</CardContent>

// Grid gaps
<div className="grid grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

#### 4. Component-Specific Tweaks

**Table Styling**
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

**Empty States**
```tsx
<div className="text-center py-12 text-neutral-500">
  <Icon className="h-12 w-12 mx-auto mb-3 opacity-40" />
  <p className="mb-1">{emptyStateTitle}</p>
  <p className="text-sm">{emptyStateDescription}</p>
</div>
```

**Icon Sizes**
```tsx
// In buttons
<Button>
  <Icon className="h-4 w-4 mr-2" />
  Button Text
</Button>

// In navigation
<NavLink>
  <Icon className="h-5 w-5" />
  Nav Item
</NavLink>

// In stat cards
<Icon className="h-6 w-6 text-emerald-600" />

// In empty states
<Icon className="h-12 w-12 opacity-40" />
```

---

## Component Enhancement Opportunities

### High Priority Enhancements

#### 1. Add Toast Notifications (Sonner)
**Current**: Using console.log or no feedback
**Improvement**: Add toast notifications for all user actions

```tsx
import { toast } from 'sonner'

// Success actions
toast.success('Candidate added successfully')

// Error handling
toast.error('Failed to schedule session')

// Loading states
const toastId = toast.loading('Saving changes...')
// After completion
toast.success('Changes saved', { id: toastId })

// With actions
toast('Session scheduled', {
  action: {
    label: 'View',
    onClick: () => navigate(`/sessions/${id}`)
  }
})
```

#### 2. Implement Skeleton Loading States
**Current**: No loading indicators
**Improvement**: Add skeleton placeholders

```tsx
// Dashboard stat cards
{isLoading ? (
  <Card>
    <CardContent className="p-6">
      <Skeleton className="h-20 w-full" />
    </CardContent>
  </Card>
) : (
  <StatCard {...stat} />
)}

// Table rows
{isLoading ? (
  <>
    {[...Array(5)].map((_, i) => (
      <TableRow key={i}>
        <TableCell><Skeleton className="h-4 w-full" /></TableCell>
        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
      </TableRow>
    ))}
  </>
) : (
  // Actual data
)}
```

#### 3. Add Pagination to Tables
**Current**: Showing all results
**Improvement**: Add pagination component

```tsx
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 20
const paginatedData = useMemo(() => {
  const start = (currentPage - 1) * itemsPerPage
  return filteredData.slice(start, start + itemsPerPage)
}, [filteredData, currentPage])

<div className="bg-white rounded-lg border">
  <Table>
    {/* Table content with paginatedData */}
  </Table>
  
  <div className="border-t px-4 py-3 flex items-center justify-between">
    <p className="text-sm text-neutral-600">
      Showing {((currentPage-1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, total)} of {total} results
    </p>
    
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        
        {[...Array(totalPages)].map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
</div>
```

#### 4. Add Tooltips for Better UX
**Current**: Icons without explanations
**Improvement**: Add tooltips to all icons and actions

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <ExternalLink className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Open in new tab</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

#### 5. Integrate Calendar Component
**Current**: Text input for dates
**Improvement**: Visual date picker

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" className="justify-start text-left font-normal">
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

### Medium Priority Enhancements

#### 6. Command Palette (⌘K)
Quick access to all pages and actions

#### 7. Checkbox for Bulk Actions
Select multiple items for batch operations

#### 8. Sheet for Detail Views
Side panel instead of full page for quick edits

#### 9. Progress Indicators
Show completion status for candidates/sessions

#### 10. Hover Cards
Quick preview of related information

---

## Implementation Priority

### Phase 1: Critical UX Improvements (Week 1)
1. ✅ **Toast Notifications** - Immediate feedback for all actions
2. ✅ **Skeleton Loading** - Professional loading states
3. ✅ **Tooltips** - Explain all icons and actions
4. ✅ **Calendar Component** - Better date selection for sessions

### Phase 2: Enhanced Functionality (Week 2)
5. ✅ **Pagination** - Handle large datasets
6. ✅ **Alert Component** - Important messages and warnings
7. ✅ **Breadcrumb Navigation** - Better wayfinding
8. ✅ **Progress Indicators** - Visual completion status

### Phase 3: Advanced Features (Week 3)
9. ✅ **Command Palette** - Global search and navigation
10. ✅ **Sheet Component** - Quick edit panels
11. ✅ **Hover Cards** - Rich hover previews
12. ✅ **Checkbox + Bulk Actions** - Multi-select operations

### Phase 4: Polish & Refinement (Week 4)
13. ✅ **Accordion for Filters** - Collapsible advanced filters
14. ✅ **Toggle Groups** - View mode switches
15. ✅ **Alert Dialogs** - Confirmations for destructive actions
16. ✅ **Enhanced Empty States** - Better messaging and CTAs

---

## Component Installation Commands

### Already Installed (Currently in Use)
```bash
# These are already in your project
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add input
npx shadcn@latest add table
npx shadcn@latest add select
npx shadcn@latest add dropdown-menu
npx shadcn@latest add tabs
npx shadcn@latest add avatar
npx shadcn@latest add switch
npx shadcn@latest add separator
npx shadcn@latest add dialog
npx shadcn@latest add textarea
npx shadcn@latest add label
```

### To Install for Enhancements
```bash
# Phase 1 - Critical
npx shadcn@latest add sonner        # Toast notifications
npx shadcn@latest add skeleton      # Loading states
npx shadcn@latest add tooltip       # Help text
npx shadcn@latest add calendar      # Date picker

# Phase 2 - Enhanced Functionality
npx shadcn@latest add pagination    # Table pagination
npx shadcn@latest add alert         # Notifications
npx shadcn@latest add breadcrumb    # Navigation
npx shadcn@latest add progress      # Progress bars

# Phase 3 - Advanced Features
npx shadcn@latest add command       # Command palette
npx shadcn@latest add sheet         # Side panels
npx shadcn@latest add hover-card    # Hover previews
npx shadcn@latest add checkbox      # Multi-select

# Phase 4 - Polish
npx shadcn@latest add accordion     # Collapsible sections
npx shadcn@latest add toggle-group  # View toggles
npx shadcn@latest add alert-dialog  # Confirmations
npx shadcn@latest add popover       # Popovers
npx shadcn@latest add scroll-area   # Custom scrollbars
npx shadcn@latest add aspect-ratio  # Video thumbnails
```

---

## Example: Before & After Comparison

### Candidates Page - Before
```tsx
// Basic implementation
<div className="p-8">
  <div className="flex items-center justify-between mb-8">
    <h1 className="text-3xl">Candidates</h1>
    <Button onClick={() => setIsAddModalOpen(true)}>
      Add Candidate
    </Button>
  </div>
  
  <Table>
    {/* Table content */}
  </Table>
</div>
```

### Candidates Page - After (Enhanced)
```tsx
import { Skeleton } from '@/components/ui/skeleton'
import { Pagination } from '@/components/ui/pagination'
import { Tooltip } from '@/components/ui/tooltip'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert } from '@/components/ui/alert'
import { toast } from 'sonner'

<div className="p-8">
  {/* Header with breadcrumb */}
  <Breadcrumb className="mb-6">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Candidates</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
  
  {/* Enhanced header */}
  <div className="flex items-center justify-between mb-8">
    <div>
      <h1 className="text-3xl mb-2">Candidates</h1>
      <p className="text-neutral-600">
        Manage and track your research participants
      </p>
    </div>
    
    <div className="flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Export to CSV</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <Button 
        className="bg-emerald-600 hover:bg-emerald-700"
        onClick={() => {
          setIsAddModalOpen(true)
          toast.info('Fill in candidate details')
        }}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Candidate
      </Button>
    </div>
  </div>
  
  {/* Bulk actions alert */}
  {selectedCount > 0 && (
    <Alert className="mb-6">
      <Users className="h-4 w-4" />
      <AlertTitle>{selectedCount} candidates selected</AlertTitle>
      <AlertDescription className="flex gap-2 mt-2">
        <Button size="sm" onClick={handleBulkSchedule}>
          Schedule Sessions
        </Button>
        <Button size="sm" variant="outline" onClick={handleBulkExport}>
          Export
        </Button>
      </AlertDescription>
    </Alert>
  )}
  
  {/* Enhanced table with loading states */}
  <div className="bg-white rounded-lg border">
    <Table>
      <TableHeader>
        <TableRow className="bg-neutral-50">
          <TableHead className="w-[50px]">
            <Checkbox 
              checked={selectedAll}
              onCheckedChange={handleSelectAll}
            />
          </TableHead>
          <TableHead>Name</TableHead>
          {/* ... other headers */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <>
            {[...Array(10)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
              </TableRow>
            ))}
          </>
        ) : (
          paginatedCandidates.map(candidate => (
            <TableRow key={candidate.id}>
              <TableCell>
                <Checkbox 
                  checked={selectedIds.includes(candidate.id)}
                  onCheckedChange={() => handleSelectCandidate(candidate.id)}
                />
              </TableCell>
              {/* ... table cells */}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
    
    {/* Pagination */}
    <div className="border-t px-4 py-3 flex justify-between">
      <p className="text-sm text-neutral-600">
        Showing {startIndex} to {endIndex} of {totalCandidates}
      </p>
      <Pagination>
        {/* Pagination controls */}
      </Pagination>
    </div>
  </div>
</div>
```

---

## Conclusion

This plan provides a comprehensive roadmap for leveraging shadcn/ui components throughout the User Research Hub application. By following these guidelines and implementing components in phases, you'll create a consistent, professional, and highly usable interface.

### Key Takeaways

1. **Maintain Brand Identity**: Always use emerald-600 for primary actions
2. **Consistency is Key**: Use the same color mappings for status badges across all pages
3. **Progressive Enhancement**: Start with critical UX improvements (toasts, loading, tooltips)
4. **Component Composition**: Prefer composing multiple simple components over one complex component
5. **Accessibility First**: shadcn/ui components are accessible by default—don't break that
6. **Performance Matters**: Use Skeleton loading states and pagination for large datasets

### Next Steps

1. ✅ Review this plan with your team
2. ✅ Install Phase 1 components (critical UX improvements)
3. ✅ Implement toast notifications across all actions
4. ✅ Add skeleton loading states to all async operations
5. ✅ Gradually work through Phase 2-4 enhancements
6. ✅ Document any custom component variants you create
7. ✅ Test accessibility with keyboard navigation and screen readers

---

**Last Updated**: January 2026  
**Version**: 1.0  
**Maintainer**: User Research Hub Team
