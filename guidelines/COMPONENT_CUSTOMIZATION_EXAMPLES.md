# shadcn/ui Component Customization Examples
## Tailoring Components to User Research Hub Design

> **Purpose**: Step-by-step examples showing how to customize shadcn/ui components to perfectly match User Research Hub's design language.

---

## Table of Contents
1. [Button Customizations](#button-customizations)
2. [Badge Customizations](#badge-customizations)
3. [Card Customizations](#card-customizations)
4. [Table Customizations](#table-customizations)
5. [Form Component Customizations](#form-component-customizations)
6. [Modal & Dialog Customizations](#modal--dialog-customizations)
7. [Navigation Customizations](#navigation-customizations)
8. [Advanced Patterns](#advanced-patterns)

---

## Button Customizations

### Default shadcn/ui Button
```tsx
// Standard shadcn button
<Button>Click me</Button>
// Result: Black background, white text
```

### ✅ Customized for User Research Hub
```tsx
// Primary action button (emerald green)
<Button className="bg-emerald-600 hover:bg-emerald-700">
  <Plus className="h-4 w-4 mr-2" />
  Add Candidate
</Button>

// Secondary action button
<Button variant="outline">
  Cancel
</Button>

// Ghost button for tertiary actions
<Button variant="ghost">
  View all
</Button>

// Icon button
<Button variant="ghost" size="icon">
  <MoreHorizontal className="h-4 w-4" />
</Button>

// Destructive button (keep default red)
<Button variant="destructive">
  Delete
</Button>
```

### Button Variants in Context

**Header Actions Pattern**
```tsx
<div className="flex items-center gap-3">
  {/* Primary action - always emerald */}
  <Button className="bg-emerald-600 hover:bg-emerald-700">
    <Plus className="h-4 w-4 mr-2" />
    Create New
  </Button>
  
  {/* Secondary actions - outline or ghost */}
  <Button variant="outline">
    <Download className="h-4 w-4 mr-2" />
    Export
  </Button>
  
  <Button variant="ghost" size="icon">
    <Settings className="h-4 w-4" />
  </Button>
</div>
```

**Table Row Actions**
```tsx
// Dropdown trigger button
<DropdownMenuTrigger asChild>
  <Button variant="ghost" size="icon">
    <MoreHorizontal className="h-4 w-4" />
  </Button>
</DropdownMenuTrigger>

// Quick action buttons
<div className="flex gap-2">
  <Button variant="ghost" size="sm">
    <Calendar className="h-4 w-4 mr-2" />
    Schedule
  </Button>
  <Button variant="ghost" size="sm">
    <Video className="h-4 w-4 mr-2" />
    Add Recording
  </Button>
</div>
```

---

## Badge Customizations

### Default shadcn/ui Badge
```tsx
<Badge>Default</Badge>
// Result: Black background
```

### ✅ Customized Status Badges

**Research Status Badges**
```tsx
// Helper function (add to utils)
const getResearchStatusBadge = (status: ResearchStatus) => {
  const variants = {
    'Completed': {
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: CheckCircle
    },
    'Scheduled': {
      className: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Calendar
    },
    'To be scheduled': {
      className: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: Clock
    },
    'Skipped': {
      className: 'bg-neutral-100 text-neutral-600 border-neutral-200',
      icon: XCircle
    }
  }
  
  const variant = variants[status]
  const Icon = variant.icon
  
  return (
    <Badge variant="outline" className={variant.className}>
      <Icon className="h-3 w-3 mr-1" />
      {status}
    </Badge>
  )
}

// Usage
{getResearchStatusBadge(candidate.researchStatus)}
```

**Priority Badges**
```tsx
const getPriorityBadge = (priority: Priority) => {
  const variants = {
    'P0': {
      className: 'bg-red-50 text-red-700 border-red-200 font-semibold',
      label: 'P0 - Critical'
    },
    'P1': {
      className: 'bg-amber-50 text-amber-700 border-amber-200',
      label: 'P1 - High'
    },
    'P2': {
      className: 'bg-blue-50 text-blue-700 border-blue-200',
      label: 'P2 - Medium'
    }
  }
  
  const variant = variants[priority]
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={variant.className}>
            {priority}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{variant.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

**Category Badges**
```tsx
const getCategoryBadge = (category: Category) => {
  const variants = {
    'Bug': {
      className: 'bg-red-50 text-red-700',
      icon: AlertCircle
    },
    'Feature Enhancement': {
      className: 'bg-purple-50 text-purple-700',
      icon: Sparkles
    },
    'Copy Change': {
      className: 'bg-blue-50 text-blue-700',
      icon: FileText
    },
    'Other': {
      className: 'bg-neutral-50 text-neutral-700',
      icon: MoreHorizontal
    }
  }
  
  const variant = variants[category]
  const Icon = variant.icon
  
  return (
    <Badge variant="secondary" className={variant.className}>
      <Icon className="h-3 w-3 mr-1" />
      {category}
    </Badge>
  )
}
```

**Feature/Tag Badges**
```tsx
// Simple feature tags
<Badge variant="secondary" className="text-xs">
  {feature}
</Badge>

// With count badge
<div className="flex flex-wrap gap-1">
  {features.slice(0, 2).map((feature, idx) => (
    <Badge key={idx} variant="secondary" className="text-xs">
      {feature}
    </Badge>
  ))}
  {features.length > 2 && (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="secondary" className="text-xs cursor-help">
            +{features.length - 2}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            {features.slice(2).map((f, i) => (
              <div key={i} className="text-sm">{f}</div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )}
</div>
```

**Interactive Status Badge (Clickable)**
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button className="focus:outline-none">
      <Badge 
        variant="outline" 
        className="bg-blue-50 text-blue-700 border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
      >
        {status}
        <ChevronDown className="h-3 w-3 ml-1" />
      </Badge>
    </button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    {statuses.map(s => (
      <DropdownMenuItem key={s} onClick={() => updateStatus(s)}>
        {s}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>
```

---

## Card Customizations

### Default shadcn/ui Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```

### ✅ Customized Stat Card (Dashboard)
```tsx
interface StatCardProps {
  title: string
  value: number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color: 'blue' | 'emerald' | 'red' | 'amber'
}

function StatCard({ title, value, icon: Icon, trend, color }: StatCardProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100'
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100'
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-100'
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100'
    }
  }
  
  const colors = colorClasses[color]
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-600 mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-semibold">{value}</p>
              {trend && (
                <span className={`text-sm flex items-center ${
                  trend.isPositive ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {trend.isPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {trend.value}%
                </span>
              )}
            </div>
          </div>
          <div className={`h-12 w-12 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center`}>
            <Icon className={`h-6 w-6 ${colors.text}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Usage
<StatCard
  title="Upcoming Sessions"
  value={12}
  icon={Calendar}
  color="blue"
  trend={{ value: 12, isPositive: true }}
/>
```

### ✅ Interactive List Card
```tsx
function SessionCard({ session }: { session: Session }) {
  const candidate = useCandidateById(session.candidateId)
  
  return (
    <Card className="group hover:shadow-md transition-all cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-medium mb-1">{candidate?.name}</h3>
            <p className="text-sm text-neutral-600">{session.product}</p>
          </div>
          
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {session.status}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(session.date), 'MMM d, yyyy')}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {session.time}
          </span>
          <span className="flex items-center gap-1">
            <Timer className="h-3 w-3" />
            {session.duration}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {session.featuresTested.slice(0, 3).map((feature, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
        
        {/* Actions appear on hover */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" className="flex-1">
            <Video className="h-4 w-4 mr-2" />
            Add Recording
          </Button>
          <Button variant="ghost" size="sm">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

### ✅ Card with Header Actions
```tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between pb-4">
    <div>
      <CardTitle className="text-xl">Recent Activity</CardTitle>
      <p className="text-sm text-neutral-600 mt-1">
        Latest updates from your team
      </p>
    </div>
    
    <div className="flex gap-2">
      <Button variant="ghost" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
      <Button variant="ghost" size="sm" onClick={() => navigate('/activity')}>
        View all
      </Button>
    </div>
  </CardHeader>
  
  <CardContent>
    {/* Card content */}
  </CardContent>
</Card>
```

---

## Table Customizations

### Default shadcn/ui Table
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Header</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### ✅ Customized Data Table with All Features
```tsx
function CandidatesTable() {
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const itemsPerPage = 20
  
  const isAllSelected = selected.length === filteredCandidates.length
  const isSomeSelected = selected.length > 0 && !isAllSelected
  
  return (
    <>
      {/* Bulk actions bar */}
      {selected.length > 0 && (
        <Alert className="mb-4">
          <Users className="h-4 w-4" />
          <AlertTitle>{selected.length} candidates selected</AlertTitle>
          <AlertDescription className="flex gap-2 mt-2">
            <Button 
              size="sm" 
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={handleBulkSchedule}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Sessions
            </Button>
            <Button size="sm" variant="outline" onClick={handleBulkExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setSelected([])}
            >
              Clear Selection
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      {/* Table container */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50 hover:bg-neutral-50">
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isSomeSelected}
                  onCheckedChange={(checked) => {
                    setSelected(
                      checked 
                        ? filteredCandidates.map(c => c.id)
                        : []
                    )
                  }}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Features Tested</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {isLoading ? (
              // Loading skeletons
              <>
                {[...Array(10)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                  </TableRow>
                ))}
              </>
            ) : filteredCandidates.length === 0 ? (
              // Empty state
              <TableRow>
                <TableCell colSpan={8}>
                  <div className="text-center py-12 text-neutral-500">
                    <Users className="h-12 w-12 mx-auto mb-3 opacity-40" />
                    <p className="mb-1 font-medium">No candidates found</p>
                    <p className="text-sm">Try adjusting your filters or add a new candidate</p>
                    <Button 
                      className="mt-4 bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => setIsAddModalOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Candidate
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Data rows
              paginatedCandidates.map((candidate) => (
                <TableRow 
                  key={candidate.id}
                  className="cursor-pointer hover:bg-neutral-50 transition-colors"
                  onClick={() => navigate(`/candidates/${candidate.id}`)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selected.includes(candidate.id)}
                      onCheckedChange={(checked) => {
                        setSelected(prev =>
                          checked
                            ? [...prev, candidate.id]
                            : prev.filter(id => id !== candidate.id)
                        )
                      }}
                    />
                  </TableCell>
                  
                  <TableCell className="font-medium">
                    {candidate.name}
                  </TableCell>
                  
                  <TableCell className="text-neutral-600">
                    {candidate.department}
                  </TableCell>
                  
                  <TableCell className="text-neutral-600">
                    {candidate.title}
                  </TableCell>
                  
                  <TableCell className="text-neutral-600">
                    {candidate.location}
                  </TableCell>
                  
                  <TableCell>
                    {getResearchStatusBadge(candidate.researchStatus)}
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {candidate.featuresTested.slice(0, 2).map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {candidate.featuresTested.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{candidate.featuresTested.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/candidates/${candidate.id}`)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleScheduleSession}>
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Session
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        
        {/* Pagination footer */}
        {filteredCandidates.length > 0 && (
          <div className="border-t border-neutral-200 px-4 py-3 flex items-center justify-between">
            <p className="text-sm text-neutral-600">
              Showing {((page - 1) * itemsPerPage) + 1} to {Math.min(page * itemsPerPage, filteredCandidates.length)} of {filteredCandidates.length} candidates
            </p>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].slice(
                  Math.max(0, page - 3),
                  Math.min(totalPages, page + 2)
                ).map((_, i) => {
                  const pageNum = Math.max(0, page - 3) + i + 1
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => setPage(pageNum)}
                        isActive={page === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  )
}
```

---

## Form Component Customizations

### ✅ Custom Input with Icon
```tsx
// Search input
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
  <Input
    placeholder="Search..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="pl-10 bg-neutral-50 border-neutral-200"
  />
  {searchQuery && (
    <button
      onClick={() => setSearchQuery('')}
      className="absolute right-3 top-1/2 -translate-y-1/2"
    >
      <X className="h-4 w-4 text-neutral-400 hover:text-neutral-600" />
    </button>
  )}
</div>
```

### ✅ Form Field Group
```tsx
function FormField({ 
  label, 
  required, 
  error, 
  helpText,
  children 
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
        {helpText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3 w-3 text-neutral-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{helpText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </Label>
      
      {children}
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
}

// Usage
<FormField 
  label="Email Address" 
  required 
  error={errors.email}
  helpText="We'll use this to send session reminders"
>
  <Input
    type="email"
    placeholder="name@company.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className={errors.email ? 'border-red-500' : ''}
  />
</FormField>
```

### ✅ Select with Search
```tsx
<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      role="combobox"
      className="w-full justify-between"
    >
      {value
        ? candidates.find((c) => c.id === value)?.name
        : "Select candidate..."}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-full p-0">
    <Command>
      <CommandInput placeholder="Search candidates..." />
      <CommandEmpty>No candidate found.</CommandEmpty>
      <CommandGroup>
        {candidates.map((candidate) => (
          <CommandItem
            key={candidate.id}
            value={candidate.id}
            onSelect={(currentValue) => {
              setValue(currentValue === value ? "" : currentValue)
              setOpen(false)
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                value === candidate.id ? "opacity-100" : "opacity-0"
              )}
            />
            <div>
              <p>{candidate.name}</p>
              <p className="text-sm text-neutral-500">
                {candidate.department} • {candidate.title}
              </p>
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  </PopoverContent>
</Popover>
```

---

## Modal & Dialog Customizations

### ✅ Full Create/Edit Modal
```tsx
function CreateCandidateModal({ open, onOpenChange }: ModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    title: '',
    location: ''
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await createCandidate(formData)
      toast.success('Candidate added successfully')
      onOpenChange(false)
    } catch (error) {
      toast.error('Failed to add candidate')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Candidate</DialogTitle>
          <DialogDescription>
            Enter the candidate's details to add them to your research pool.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Full Name" required>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe"
                disabled={isSubmitting}
              />
            </FormField>
            
            <FormField label="Email" required>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@company.com"
                disabled={isSubmitting}
              />
            </FormField>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Department" required>
              <Select 
                value={formData.department}
                onValueChange={(value) => setFormData({...formData, department: value})}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            
            <FormField label="Job Title" required>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Software Engineer"
                disabled={isSubmitting}
              />
            </FormField>
          </div>
          
          <FormField label="Location" required>
            <Select 
              value={formData.location}
              onValueChange={(value) => setFormData({...formData, location: value})}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          
          <Separator />
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Candidate
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
```

### ✅ Confirmation Dialog
```tsx
function DeleteConfirmationDialog({ 
  open, 
  onOpenChange, 
  itemName, 
  onConfirm 
}: DeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  
  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onConfirm()
      toast.success(`${itemName} deleted successfully`)
      onOpenChange(false)
    } catch (error) {
      toast.error(`Failed to delete ${itemName}`)
    } finally {
      setIsDeleting(false)
    }
  }
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {itemName}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{' '}
            <strong>{itemName}</strong> and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

---

## Navigation Customizations

### ✅ Enhanced Sidebar Navigation
```tsx
function Sidebar() {
  const { currentUser } = useApp()
  const location = useLocation()
  
  return (
    <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col">
      {/* Logo section */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold">ResearchHub</span>
        </div>
      </div>
      
      {/* Navigation */}
      <ScrollArea className="flex-1">
        <nav className="p-4 space-y-6">
          {/* Main navigation */}
          <div className="space-y-1">
            <p className="text-xs uppercase text-neutral-500 font-semibold px-3 mb-2">
              Main
            </p>
            {mainNavigation.map((item) => {
              const isActive = location.pathname === item.href
              
              return (
                <TooltipProvider key={item.name}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <NavLink
                        to={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
                          isActive
                            ? "bg-emerald-50 text-emerald-700 font-medium"
                            : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                        )}
                      >
                        <item.icon className={cn(
                          "h-5 w-5 transition-transform",
                          isActive && "scale-110"
                        )} />
                        <span>{item.name}</span>
                        
                        {item.badge && (
                          <Badge 
                            variant="secondary" 
                            className="ml-auto text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </div>
          
          <Separator />
          
          {/* Admin section (conditional) */}
          {currentUser?.role === 'Admin' && (
            <div className="space-y-1">
              <p className="text-xs uppercase text-neutral-500 font-semibold px-3 mb-2">
                Admin
              </p>
              {adminNavigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                      isActive
                        ? "bg-red-50 text-red-700"
                        : "text-neutral-700 hover:bg-neutral-100"
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          )}
        </nav>
      </ScrollArea>
      
      {/* User section at bottom */}
      <div className="p-4 border-t border-neutral-200">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-100 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-emerald-100 text-emerald-700">
                  {currentUser?.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left overflow-hidden">
                <p className="text-sm font-medium truncate">
                  {currentUser?.name}
                </p>
                <p className="text-xs text-neutral-500 truncate">
                  {currentUser?.email}
                </p>
              </div>
              <MoreVertical className="h-4 w-4 text-neutral-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
```

---

## Advanced Patterns

### ✅ Notification Panel with Popover
```tsx
function NotificationButton() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const unreadCount = notifications.filter(n => !n.read).length
  
  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
    toast.success('All notifications marked as read')
  }
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={markAllRead}
            disabled={unreadCount === 0}
          >
            Mark all read
          </Button>
        </div>
        
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p>No notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={cn(
                    "p-4 hover:bg-neutral-50 cursor-pointer transition-colors",
                    !notif.read && "bg-blue-50/50"
                  )}
                  onClick={() => handleNotificationClick(notif)}
                >
                  <div className="flex gap-3">
                    <div className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                      notif.type === 'session' && "bg-blue-100",
                      notif.type === 'insight' && "bg-red-100",
                      notif.type === 'candidate' && "bg-emerald-100"
                    )}>
                      {notif.type === 'session' && <Calendar className="h-5 w-5 text-blue-600" />}
                      {notif.type === 'insight' && <AlertCircle className="h-5 w-5 text-red-600" />}
                      {notif.type === 'candidate' && <Users className="h-5 w-5 text-emerald-600" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-1">
                        {notif.title}
                      </p>
                      <p className="text-sm text-neutral-600 line-clamp-2">
                        {notif.message}
                      </p>
                      <p className="text-xs text-neutral-500 mt-2">
                        {formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                    
                    {!notif.read && (
                      <div className="h-2 w-2 rounded-full bg-blue-600 flex-shrink-0 mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full"
            onClick={() => navigate('/notifications')}
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
```

### ✅ Command Palette Implementation
```tsx
export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { candidates, sessions } = useApp()
  
  // Listen for Cmd+K
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
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() => {
              navigate('/candidates/new')
              setOpen(false)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>Add Candidate</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              navigate('/sessions/new')
              setOpen(false)
            }}
          >
            <Calendar className="mr-2 h-4 w-4" />
            <span>Schedule Session</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              navigate('/analysis/new')
              setOpen(false)
            }}
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            <span>Create Insight</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => { navigate('/dashboard'); setOpen(false) }}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => { navigate('/candidates'); setOpen(false) }}>
            <Users className="mr-2 h-4 w-4" />
            <span>Candidates</span>
          </CommandItem>
          <CommandItem onSelect={() => { navigate('/sessions'); setOpen(false) }}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Sessions</span>
          </CommandItem>
          <CommandItem onSelect={() => { navigate('/analysis'); setOpen(false) }}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Analysis</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Recent Candidates">
          {candidates.slice(0, 5).map((candidate) => (
            <CommandItem
              key={candidate.id}
              onSelect={() => {
                navigate(`/candidates/${candidate.id}`)
                setOpen(false)
              }}
            >
              <User className="mr-2 h-4 w-4" />
              <span>{candidate.name}</span>
              <span className="ml-auto text-xs text-neutral-500">
                {candidate.department}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
```

---

## Conclusion

These customization examples show how to adapt shadcn/ui components to match User Research Hub's design language. The key principles are:

1. **Consistent Colors**: Always use emerald-600 for primary actions
2. **Spacing & Typography**: Follow the established patterns
3. **Interactive States**: Add hover, loading, and empty states
4. **Accessibility**: Maintain keyboard navigation and screen reader support
5. **Feedback**: Use toasts for actions, tooltips for help

Copy these patterns and adapt them to your specific needs!

---

**Last Updated**: January 2026
