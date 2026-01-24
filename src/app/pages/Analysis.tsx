import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Plus, Filter, MoreHorizontal, AlertCircle, Paperclip } from 'lucide-react';
import { format } from 'date-fns';
import type { InsightStatus, Priority, Category, Team, Effort, Insight } from '../types';
import CreateInsightModal from '../components/insights/CreateInsightModal';
import EditInsightModal from '../components/insights/EditInsightModal';

// Import reusable components
import {
  PageHeader,
  StatusBadge,
  PriorityBadge,
  CategoryBadge,
  SearchInput,
  DataTableWrapper,
  EmptyState
} from '../components/common';

export default function Analysis() {
  const { insights, candidates, products, updateInsight } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [teamFilter, setTeamFilter] = useState<string>('all');
  const [productFilter, setProductFilter] = useState<string>('all');
  const [isCreateInsightModalOpen, setIsCreateInsightModalOpen] = useState(false);
  const [isEditInsightModalOpen, setIsEditInsightModalOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  const handleEditInsight = (insight: Insight) => {
    setSelectedInsight(insight);
    setIsEditInsightModalOpen(true);
  };

  const handleMarkResolved = async (insight: Insight) => {
    try {
      await updateInsight(insight.id, { status: 'Resolved' });
    } catch (error) {
      console.error('Error marking resolved:', error);
    }
  };


  const filteredInsights = insights.filter((insight) => {
    const matchesSearch = 
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || insight.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || insight.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || insight.category === categoryFilter;
    const matchesTeam = teamFilter === 'all' || insight.team === teamFilter;
    const matchesProduct = productFilter === 'all' || insight.product === productFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesTeam && matchesProduct;
  });

  const statuses: InsightStatus[] = ['Picked up', 'Under development', 'Resolved', 'Skipped'];
  const priorities: Priority[] = ['P0', 'P1', 'P2'];
  const categories: Category[] = ['Bug', 'Feature Enhancement', 'Copy Change', 'Other'];
  const teams: Team[] = ['FE', 'PM', 'UX'];
  const efforts: Effort[] = ['xs', 'sm', 'md', 'lg'];

  return (
    <div className="p-8 space-y-6">
      {/* Use PageHeader component */}
      <PageHeader
        title="Analysis & Insights"
        description="Track and triage research insights and issues"
        action={
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsCreateInsightModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Insight
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Use SearchInput component */}
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search insights..."
          className="flex-1 min-w-[300px] max-w-md"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            {priorities.map((priority) => (
              <SelectItem key={priority} value={priority}>
                {priority}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={teamFilter} onValueChange={setTeamFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Teams</SelectItem>
            {teams.map((team) => (
              <SelectItem key={team} value={team}>
                {team}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={productFilter} onValueChange={setProductFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.name}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4 text-sm text-neutral-600">
        Showing {filteredInsights.length} of {insights.length} insights
      </div>

      {/* Table - Use DataTableWrapper component */}
      <DataTableWrapper>
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50">
              <TableHead className="w-[50px]">Priority</TableHead>
              <TableHead>User Interviewed</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Effort</TableHead>
              <TableHead>Attachments</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInsights.map((insight) => {
              const candidate = candidates.find(c => c.id === insight.userInterviewed);
              return (
                <TableRow 
                  key={insight.id} 
                  className="hover:bg-neutral-50 cursor-pointer"
                  onClick={() => handleEditInsight(insight)}
                >
                  <TableCell>
                    {/* Use PriorityBadge component */}
                    <PriorityBadge priority={insight.priority} />
                  </TableCell>
                  <TableCell className="text-neutral-600">{candidate?.name}</TableCell>
                  <TableCell>
                    <div className="max-w-md">
                      <p className="line-clamp-2">{insight.title}</p>
                      <p className="text-xs text-neutral-500 mt-1">
                        Created {format(new Date(insight.createdAt), 'MMM d')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button>
                          {/* Use StatusBadge component */}
                          <StatusBadge status={insight.status} showIcon variant="insight" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {statuses.map((status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() => updateInsight(insight.id, { status })}
                          >
                            {status}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    {/* Use CategoryBadge component */}
                    <CategoryBadge category={insight.category} showIcon />
                  </TableCell>
                  <TableCell>
                    <CategoryBadge category={insight.team} />
                  </TableCell>
                  <TableCell>
                    <CategoryBadge category={insight.effort} />
                  </TableCell>
                  <TableCell>
                    {insight.attachments.length > 0 && (
                      <div className="flex items-center gap-1 text-sm text-neutral-600">
                        <Paperclip className="h-4 w-4" />
                        {insight.attachments.length}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-neutral-600">{insight.product}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditInsight(insight)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMarkResolved(insight)}>
                          Mark resolved
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {filteredInsights.length === 0 && (
          <EmptyState
            icon={AlertCircle}
            title="No insights found"
            description="Try adjusting your filters or create your first insight"
            action={{
              label: "Create Insight",
              onClick: () => setIsCreateInsightModalOpen(true)
            }}
          />
        )}
      </DataTableWrapper>

      {/* Create Insight Modal */}
      <CreateInsightModal 
        open={isCreateInsightModalOpen} 
        onOpenChange={setIsCreateInsightModalOpen} 
      />

      {/* Edit Insight Modal */}
      <EditInsightModal 
        open={isEditInsightModalOpen} 
        onOpenChange={setIsEditInsightModalOpen}
        insight={selectedInsight}
      />
    </div>
  );
}
