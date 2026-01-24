import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Plus, Filter, MoreHorizontal, Video, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import AddCandidateModal from '../components/candidates/AddCandidateModal';
import { format } from 'date-fns';
import type { ResearchStatus, UserType } from '../types';

// Import reusable components
import { 
  PageHeader, 
  StatusBadge, 
  CategoryBadge, 
  SearchInput, 
  DataTableWrapper,
  EmptyState 
} from '../components/common';

export default function Candidates() {
  const { candidates, products } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [userTypeFilter, setUserTypeFilter] = useState<string>('all');
  const [productFilter, setProductFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);


  // Filter candidates
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || candidate.researchStatus === statusFilter;
    const matchesUserType = userTypeFilter === 'all' || candidate.userType === userTypeFilter;
    const matchesProduct = productFilter === 'all' || 
      candidate.featuresTested.some(f => products.find(p => p.name === productFilter)?.features.includes(f));

    return matchesSearch && matchesStatus && matchesUserType && matchesProduct;
  });

  const statuses: ResearchStatus[] = ['To be scheduled', 'Scheduled', 'Completed', 'Skipped'];
  const userTypes: UserType[] = ['Builder', 'End User'];

  return (
    <div className="p-8 space-y-6">
      {/* Use PageHeader component */}
      <PageHeader
        title="Candidates"
        description="Manage and track your research participants"
        action={
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Candidate
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Use SearchInput component */}
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search candidates..."
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
        <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="User Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {userTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
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

      {/* Results count */}
      <div className="mb-4 text-sm text-neutral-600">
        Showing {filteredCandidates.length} of {candidates.length} candidates
      </div>

      {/* Table - Use DataTableWrapper component */}
      <DataTableWrapper>
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50">
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date of Joining</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Features Tested</TableHead>
              <TableHead>User Type</TableHead>
              <TableHead>Recordings</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow 
                key={candidate.id} 
                className="cursor-pointer hover:bg-neutral-50"
                onClick={() => navigate(`/candidates/${candidate.id}`)}
              >
                <TableCell>{candidate.name}</TableCell>
                <TableCell className="text-neutral-600">{candidate.department}</TableCell>
                <TableCell className="text-neutral-600">{candidate.title}</TableCell>
                <TableCell className="text-neutral-600">{candidate.location}</TableCell>
                <TableCell className="text-neutral-600">
                  {format(new Date(candidate.dateOfJoining), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  {/* Use StatusBadge component */}
                  <StatusBadge status={candidate.researchStatus} showIcon />
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {candidate.featuresTested.slice(0, 2).map((feature, idx) => (
                      <CategoryBadge key={idx} category={feature} />
                    ))}
                    {candidate.featuresTested.length > 2 && (
                      <CategoryBadge category={`+${candidate.featuresTested.length - 2}`} />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <CategoryBadge category={candidate.userType} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-neutral-600">
                    <Video className="h-4 w-4" />
                    {candidate.recordings.length}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/candidates/${candidate.id}`);
                      }}>
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        Schedule session
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        Add recording
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredCandidates.length === 0 && (
          <EmptyState
            icon={Users}
            title="No candidates found"
            description="Try adjusting your filters or add a new candidate"
            action={{
              label: "Add Candidate",
              onClick: () => setIsAddModalOpen(true)
            }}
          />
        )}
      </DataTableWrapper>

      <AddCandidateModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </div>
  );
}