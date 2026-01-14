import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
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
import { Plus, Search, Filter, MoreHorizontal, AlertCircle, Paperclip } from 'lucide-react';
import { format } from 'date-fns';
import type { InsightStatus, Priority, Category, Team, Effort } from '../types';

export default function Analysis() {
  const { insights, candidates, products, updateInsight } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [teamFilter, setTeamFilter] = useState<string>('all');
  const [productFilter, setProductFilter] = useState<string>('all');

  const getStatusColor = (status: InsightStatus) => {
    switch (status) {
      case 'Picked up':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Under development':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Skipped':
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'P0':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'P1':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'P2':
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case 'Bug':
        return 'bg-red-50 text-red-700';
      case 'Feature Enhancement':
        return 'bg-purple-50 text-purple-700';
      case 'Copy Change':
        return 'bg-blue-50 text-blue-700';
      case 'Other':
        return 'bg-neutral-50 text-neutral-700';
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
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Analysis & Insights</h1>
          <p className="text-neutral-600">Track and triage research insights and issues</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Insight
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[300px] max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
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

      {/* Table */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
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
                <TableRow key={insight.id} className="hover:bg-neutral-50">
                  <TableCell>
                    <Badge variant="outline" className={getPriorityColor(insight.priority)}>
                      {insight.priority}
                    </Badge>
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
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button>
                          <Badge variant="outline" className={getStatusColor(insight.status)}>
                            {insight.status}
                          </Badge>
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
                    <Badge variant="secondary" className={getCategoryColor(insight.category)}>
                      {insight.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{insight.team}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{insight.effort}</Badge>
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
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Mark resolved</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {filteredInsights.length === 0 && (
          <div className="text-center py-12 text-neutral-500">
            <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p>No insights found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
