import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Plus, Search, Filter, MoreHorizontal, Video, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import AddCandidateModal from '../components/candidates/AddCandidateModal';
import { format } from 'date-fns';
import type { ResearchStatus, UserType } from '../types';

export default function Candidates() {
  const { candidates, products } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [userTypeFilter, setUserTypeFilter] = useState<string>('all');
  const [productFilter, setProductFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const getStatusColor = (status: ResearchStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Scheduled':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'To be scheduled':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Skipped':
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
    }
  };

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
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Candidates</h1>
          <p className="text-neutral-600">Manage and track your research participants</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Candidate
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[300px] max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search candidates..."
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

      {/* Table */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
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
                  <Badge variant="outline" className={getStatusColor(candidate.researchStatus)}>
                    {candidate.researchStatus}
                  </Badge>
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
                <TableCell>
                  <Badge variant="outline">{candidate.userType}</Badge>
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
          <div className="text-center py-12 text-neutral-500">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p>No candidates found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>

      <AddCandidateModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </div>
  );
}