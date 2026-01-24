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
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import CreateSessionModal from '../components/sessions/CreateSessionModal';

// Import reusable components
import {
  PageHeader,
  StatusBadge,
  CategoryBadge,
  SearchInput,
  DataTableWrapper,
  EmptyState
} from '../components/common';

export default function Sessions() {
  const { sessions, candidates } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateSessionModalOpen, setIsCreateSessionModalOpen] = useState(false);

  const filteredSessions = sessions.filter((session) => {
    const candidate = candidates.find(c => c.id === session.candidateId);
    const matchesSearch = 
      candidate?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.product.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-6">
      {/* Use PageHeader component */}
      <PageHeader
        title="Sessions"
        description="Schedule and manage research sessions"
        action={
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsCreateSessionModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Session
          </Button>
        }
      />

      <div className="flex gap-4">
        {/* Use SearchInput component */}
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search sessions..."
          className="flex-1 max-w-md"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Skipped">Skipped</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Use DataTableWrapper component */}
      <DataTableWrapper>
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50">
              <TableHead>Candidate</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Features</TableHead>
              <TableHead>Moderator</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSessions.map((session) => {
              const candidate = candidates.find(c => c.id === session.candidateId);
              return (
                <TableRow
                  key={session.id}
                  className="cursor-pointer hover:bg-neutral-50"
                  onClick={() => navigate(`/sessions/${session.id}`)}
                >
                  <TableCell>{candidate?.name}</TableCell>
                  <TableCell>{session.product}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {session.featuresTested.slice(0, 2).map((feature, idx) => (
                        <CategoryBadge key={idx} category={feature} />
                      ))}
                      {session.featuresTested.length > 2 && (
                        <CategoryBadge category={`+${session.featuresTested.length - 2}`} />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-neutral-600">{session.moderator}</TableCell>
                  <TableCell>
                    <div>
                      <div>{format(new Date(session.date), 'MMM d, yyyy')}</div>
                      <div className="text-sm text-neutral-500">{session.time}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-neutral-600">{session.duration}</TableCell>
                  <TableCell>
                    {/* Use StatusBadge component */}
                    <StatusBadge status={session.status} showIcon />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {filteredSessions.length === 0 && (
          <EmptyState
            icon={CalendarIcon}
            title="No sessions found"
            description="Create your first research session"
            action={{
              label: "Create Session",
              onClick: () => setIsCreateSessionModalOpen(true)
            }}
          />
        )}
      </DataTableWrapper>

      {/* Create Session Modal */}
      <CreateSessionModal 
        open={isCreateSessionModalOpen} 
        onOpenChange={setIsCreateSessionModalOpen} 
      />
    </div>
  );
}
