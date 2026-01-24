import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { Switch } from '../components/ui/switch';
import { Slider } from '../components/ui/slider';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Skeleton } from '../components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';
import { Calendar } from '../components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';
import {
  RadioGroup,
  RadioGroupItem,
} from '../components/ui/radio-group';
import { 
  Plus, 
  Users as UsersIcon, 
  Package, 
  Shield, 
  UserCheck,
  UserPlus,
  Settings,
  AlertCircle,
  CheckCircle,
  Info,
  Calendar as CalendarIcon,
  Mail,
  Search,
  X,
  Download,
  Upload,
  HelpCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import type { UserRole, Team } from '../types';

// Import reusable components
import {
  PageHeader,
  StatCard,
  StatusBadge,
  EmptyState,
  SearchInput,
  DataTableWrapper,
  InfoCard,
  CategoryBadge
} from '../components/common';

export default function Admin() {
  const { users, products, addUser } = useApp();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [inviteData, setInviteData] = useState({
    name: '',
    email: '',
    role: 'Researcher' as UserRole,
    team: 'UX' as Team
  });

  // Calculate stats
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const invitedUsers = users.filter(u => u.status === 'Invited').length;
  const totalProducts = products.length;
  const totalFeatures = products.reduce((acc, p) => acc + p.features.length, 0);

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({
      ...inviteData,
      status: 'Invited'
    });
    toast.success('User invitation sent');
    setIsInviteModalOpen(false);
    setInviteData({
      name: '',
      email: '',
      role: 'Researcher',
      team: 'UX'
    });
  };

  return (
    <div className="p-8 space-y-8">
      {/* Use PageHeader component */}
      <PageHeader
        title="Admin Dashboard"
        description="Manage users, products, and team settings"
        action={
          <>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsInviteModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Invite User
            </Button>
          </>
        }
      />

      {/* Stats Grid - Using StatCard component */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Users"
          value={activeUsers}
          icon={UserCheck}
          color="emerald"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Pending Invites"
          value={invitedUsers}
          icon={UserPlus}
          color="amber"
        />
        <StatCard
          title="Products"
          value={totalProducts}
          icon={Package}
          color="blue"
        />
        <StatCard
          title="Features"
          value={totalFeatures}
          icon={Shield}
          color="purple"
        />
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">
            Users ({users.length})
          </TabsTrigger>
          <TabsTrigger value="products">
            Products ({products.length})
          </TabsTrigger>
          <TabsTrigger value="teams">
            Teams (3)
          </TabsTrigger>
          <TabsTrigger value="components">
            🎨 Component Showcase
          </TabsTrigger>
          <TabsTrigger value="ui-components">
            🧩 UI Components
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {/* Search bar using SearchInput component */}
          <div className="flex justify-between items-center gap-4">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search users by name, email, or role..."
              className="flex-1 max-w-md"
            />
            <div className="flex items-center gap-2">
              <p className="text-sm text-neutral-600">
                {filteredUsers.length} of {users.length} users
              </p>
            </div>
          </div>

          {/* Table using DataTableWrapper component */}
          <DataTableWrapper>
            <Table>
              <TableHeader>
                <TableRow className="bg-neutral-50">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <EmptyState
                        icon={UsersIcon}
                        title="No users found"
                        description="Try adjusting your search criteria"
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-neutral-50 cursor-pointer">
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="text-neutral-600">{user.email}</TableCell>
                      <TableCell>
                        <CategoryBadge category={user.role} />
                      </TableCell>
                      <TableCell>
                        <CategoryBadge category={user.team} />
                      </TableCell>
                      <TableCell>
                        {/* Using StatusBadge component */}
                        <StatusBadge status={user.status} showIcon variant="user" />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </DataTableWrapper>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-neutral-600">{products.length} products • {totalFeatures} features</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          <div className="grid gap-4">
            {products.map((product) => (
              <InfoCard
                key={product.id}
                title={product.name}
                description={`${product.features.length} features`}
                icon={Package}
                action={
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add feature
                  </Button>
                }
              >
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, idx) => (
                    <CategoryBadge key={idx} category={feature} />
                  ))}
                </div>
              </InfoCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-neutral-600">3 teams • {users.length} total members</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Team
            </Button>
          </div>

          <div className="grid gap-4">
            {(['FE', 'PM', 'UX'] as Team[]).map((team) => {
              const teamUsers = users.filter(u => u.team === team);
              const activeCount = teamUsers.filter(u => u.status === 'Active').length;
              
              return (
                <InfoCard
                  key={team}
                  title={`${team} Team`}
                  description={`${activeCount} active • ${teamUsers.length} total members`}
                  icon={UsersIcon}
                >
                  {teamUsers.length === 0 ? (
                    <EmptyState
                      icon={UsersIcon}
                      title="No team members"
                      description="Invite users to join this team"
                      action={{
                        label: "Invite User",
                        onClick: () => setIsInviteModalOpen(true)
                      }}
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {teamUsers.map((user) => (
                        <CategoryBadge key={user.id} category={user.name} />
                      ))}
                    </div>
                  )}
                </InfoCard>
              );
            })}
          </div>
        </TabsContent>

        {/* New Component Showcase Tab */}
        <TabsContent value="components" className="space-y-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Component Showcase</h2>
              <p className="text-neutral-600">
                Preview of all reusable components matching the User Research Hub design system
              </p>
            </div>

            {/* StatusBadge Showcase */}
            <InfoCard title="Status Badges" description="Consistent status indicators across the app">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-2">Research Status</p>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status="Completed" showIcon />
                    <StatusBadge status="Scheduled" showIcon />
                    <StatusBadge status="To be scheduled" showIcon />
                    <StatusBadge status="Skipped" showIcon />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-2">Insight Status</p>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status="Resolved" showIcon />
                    <StatusBadge status="Picked up" showIcon />
                    <StatusBadge status="Under development" showIcon />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-2">User Status</p>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status="Active" showIcon variant="user" />
                    <StatusBadge status="Invited" showIcon variant="user" />
                    <StatusBadge status="Inactive" showIcon variant="user" />
                  </div>
                </div>
              </div>
            </InfoCard>

            {/* CategoryBadge Showcase */}
            <InfoCard title="Category Badges" description="Color-coded categories and tags">
              <div className="flex flex-wrap gap-2">
                <CategoryBadge category="Bug" showIcon />
                <CategoryBadge category="Feature Enhancement" showIcon />
                <CategoryBadge category="Copy Change" showIcon />
                <CategoryBadge category="Other" showIcon />
                <CategoryBadge category="Engineering" />
                <CategoryBadge category="Product" />
                <CategoryBadge category="Design" />
              </div>
            </InfoCard>

            {/* Button Variations */}
            <InfoCard title="Button Variations" description="All button styles in the design system">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-2">Primary Actions</p>
                  <div className="flex flex-wrap gap-2">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Primary Action
                    </Button>
                    <Button variant="destructive">
                      Delete
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-2">Secondary Actions</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="link">Link Button</Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-2">Sizes</p>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </InfoCard>

            {/* Empty State */}
            <InfoCard title="Empty State" description="Consistent empty state across all pages">
              <DataTableWrapper>
                <EmptyState
                  icon={UsersIcon}
                  title="No items found"
                  description="This is what an empty state looks like with an action button"
                  action={{
                    label: "Create New Item",
                    onClick: () => toast.info('Empty state action clicked')
                  }}
                />
              </DataTableWrapper>
            </InfoCard>

            {/* SearchInput */}
            <InfoCard title="Search Input" description="Consistent search pattern with clear button">
              <div className="max-w-md">
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search anything..."
                />
              </div>
            </InfoCard>
          </div>
        </TabsContent>

        {/* New UI Components Showcase Tab */}
        <TabsContent value="ui-components" className="space-y-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">shadcn/ui Components Library</h2>
              <p className="text-neutral-600">
                All 45 shadcn/ui components available in <code className="px-2 py-1 bg-neutral-100 rounded text-sm">src/app/components/ui</code>
              </p>
            </div>

            {/* Buttons */}
            <InfoCard title="Button" description="Versatile button component with variants and sizes">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-3">Variants</p>
                  <div className="flex flex-wrap gap-2">
                    <Button>Default</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-3">Sizes</p>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon"><Plus className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-3">With Icons</p>
                  <div className="flex flex-wrap gap-2">
                    <Button><Mail className="h-4 w-4 mr-2" />Email</Button>
                    <Button variant="outline"><Download className="h-4 w-4 mr-2" />Download</Button>
                    <Button variant="secondary"><Upload className="h-4 w-4 mr-2" />Upload</Button>
                  </div>
                </div>
              </div>
            </InfoCard>

            {/* Input */}
            <InfoCard title="Input" description="Text input field for forms">
              <div className="space-y-3 max-w-md">
                <Input placeholder="Default input..." />
                <Input type="email" placeholder="Email input..." />
                <Input type="password" placeholder="Password input..." />
                <Input disabled placeholder="Disabled input..." />
              </div>
            </InfoCard>

            {/* Textarea */}
            <InfoCard title="Textarea" description="Multi-line text input">
              <Textarea placeholder="Type your message here..." className="max-w-md" rows={4} />
            </InfoCard>

            {/* Checkbox */}
            <InfoCard title="Checkbox" description="Checkbox for selections">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="marketing" defaultChecked />
                  <Label htmlFor="marketing">Receive marketing emails</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="disabled" disabled />
                  <Label htmlFor="disabled" className="text-neutral-500">Disabled checkbox</Label>
                </div>
              </div>
            </InfoCard>

            {/* Radio Group */}
            <InfoCard title="Radio Group" description="Radio buttons for single selection">
              <RadioGroup defaultValue="option1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="option1" />
                  <Label htmlFor="option1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="option2" />
                  <Label htmlFor="option2">Option 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="option3" />
                  <Label htmlFor="option3">Option 3</Label>
                </div>
              </RadioGroup>
            </InfoCard>

            {/* Switch */}
            <InfoCard title="Switch" description="Toggle switch for on/off states">
              <div className="space-y-3">
                <div className="flex items-center justify-between max-w-md">
                  <Label>Airplane Mode</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between max-w-md">
                  <Label>Notifications</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between max-w-md">
                  <Label>Disabled</Label>
                  <Switch disabled />
                </div>
              </div>
            </InfoCard>

            {/* Select */}
            <InfoCard title="Select" description="Dropdown selection component">
              <div className="max-w-md space-y-3">
                <div>
                  <Label>Select a fruit</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                      <SelectItem value="grape">Grape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </InfoCard>

            {/* Slider */}
            <InfoCard title="Slider" description="Range slider for numeric input">
              <div className="max-w-md space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Volume</Label>
                    <span className="text-sm text-neutral-500">50%</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Price Range</Label>
                    <span className="text-sm text-neutral-500">$200 - $800</span>
                  </div>
                  <Slider defaultValue={[200, 800]} max={1000} step={10} />
                </div>
              </div>
            </InfoCard>

            {/* Progress */}
            <InfoCard title="Progress" description="Progress bar indicator">
              <div className="space-y-4 max-w-md">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Uploading...</Label>
                    <span className="text-sm text-neutral-500">33%</span>
                  </div>
                  <Progress value={33} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Completed</Label>
                    <span className="text-sm text-neutral-500">100%</span>
                  </div>
                  <Progress value={100} />
                </div>
              </div>
            </InfoCard>

            {/* Badge */}
            <InfoCard title="Badge" description="Badge component for labels and tags">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </InfoCard>

            {/* Avatar */}
            <InfoCard title="Avatar" description="User avatar display">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className="bg-emerald-100 text-emerald-700">JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className="bg-blue-100 text-blue-700">AB</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-purple-100 text-purple-700">XL</AvatarFallback>
                </Avatar>
              </div>
            </InfoCard>

            {/* Skeleton */}
            <InfoCard title="Skeleton" description="Loading placeholder skeleton">
              <div className="space-y-3 max-w-md">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              </div>
            </InfoCard>

            {/* Alert */}
            <InfoCard title="Alert" description="Alert messages for important information">
              <div className="space-y-3">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    This is an informational alert with a neutral appearance.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Your session has expired. Please log in again.
                  </AlertDescription>
                </Alert>
              </div>
            </InfoCard>

            {/* Separator */}
            <InfoCard title="Separator" description="Visual divider for sections">
              <div className="space-y-3">
                <div>Section 1</div>
                <Separator />
                <div>Section 2</div>
                <Separator />
                <div>Section 3</div>
              </div>
            </InfoCard>

            {/* Accordion */}
            <InfoCard title="Accordion" description="Collapsible content sections">
              <Accordion type="single" collapsible className="max-w-md">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches your theme.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It's animated by default with smooth transitions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </InfoCard>

            {/* Tooltip */}
            <InfoCard title="Tooltip" description="Contextual information on hover">
              <div className="flex gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a tooltip</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="outline">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Get help</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </InfoCard>

            {/* Calendar */}
            <InfoCard title="Calendar" description="Date picker calendar">
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={new Date()}
                  className="rounded-md border"
                />
              </div>
            </InfoCard>

            {/* Popover */}
            <InfoCard title="Popover" description="Floating content panel">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">Popover Content</h4>
                    <p className="text-sm text-neutral-600">
                      This is a popover with custom content. You can put anything here.
                    </p>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm">Action</Button>
                      <Button size="sm" variant="outline">Cancel</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </InfoCard>

            {/* AlertDialog */}
            <InfoCard title="Alert Dialog" description="Modal dialog for confirmations">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => toast.success('Action confirmed')}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </InfoCard>

            {/* Toast Examples */}
            <InfoCard title="Toast (Sonner)" description="Notification toasts">
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => toast.success('Success toast!')}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Success Toast
                </Button>
                <Button onClick={() => toast.error('Error toast!')} variant="destructive">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Error Toast
                </Button>
                <Button onClick={() => toast.info('Info toast!')} variant="outline">
                  <Info className="h-4 w-4 mr-2" />
                  Info Toast
                </Button>
                <Button onClick={() => toast('Default toast')} variant="secondary">
                  Default Toast
                </Button>
                <Button 
                  onClick={() => {
                    const id = toast.loading('Loading...');
                    setTimeout(() => {
                      toast.success('Loaded!', { id });
                    }, 2000);
                  }}
                  variant="outline"
                >
                  Loading Toast
                </Button>
              </div>
            </InfoCard>

            {/* Additional Components List */}
            <InfoCard title="All Available Components" description="Complete list of 45 shadcn/ui components">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  'Accordion', 'Alert', 'Alert Dialog', 'Aspect Ratio', 'Avatar',
                  'Badge', 'Breadcrumb', 'Button', 'Calendar', 'Card',
                  'Carousel', 'Chart', 'Checkbox', 'Collapsible', 'Command',
                  'Context Menu', 'Dialog', 'Drawer', 'Dropdown Menu', 'Form',
                  'Hover Card', 'Input', 'Input OTP', 'Label', 'Menubar',
                  'Navigation Menu', 'Pagination', 'Popover', 'Progress', 'Radio Group',
                  'Resizable', 'Scroll Area', 'Select', 'Separator', 'Sheet',
                  'Sidebar', 'Skeleton', 'Slider', 'Sonner', 'Switch',
                  'Table', 'Tabs', 'Textarea', 'Toggle', 'Toggle Group', 'Tooltip'
                ].map((component) => (
                  <div
                    key={component}
                    className="px-3 py-2 bg-neutral-50 rounded-lg border border-neutral-200 text-sm text-center hover:bg-neutral-100 transition-colors"
                  >
                    {component}
                  </div>
                ))}
              </div>
            </InfoCard>

            {/* Code Example */}
            <InfoCard title="Usage Example" description="How to import and use UI components">
              <div className="bg-neutral-900 text-neutral-100 p-4 rounded-lg max-w-2xl overflow-x-auto">
                <pre className="text-sm">
{`import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function MyPage() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <Input placeholder="Enter name..." />
          <Badge>New Feature</Badge>
          <Button>Submit</Button>
        </div>
      </CardContent>
    </Card>
  );
}`}
                </pre>
              </div>
            </InfoCard>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite User</DialogTitle>
            <DialogDescription>
              Send an invitation to join your research workspace
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInviteUser}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={inviteData.name}
                  onChange={(e) => setInviteData({ ...inviteData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={inviteData.email}
                  onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={inviteData.role}
                  onValueChange={(value) => setInviteData({ ...inviteData, role: value as UserRole })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Researcher">Researcher</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="team">Team</Label>
                <Select
                  value={inviteData.team}
                  onValueChange={(value) => setInviteData({ ...inviteData, team: value as Team })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FE">FE</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                    <SelectItem value="UX">UX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsInviteModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                Send Invitation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
