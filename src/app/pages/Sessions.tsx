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
import { Plus, Search, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

export default function Sessions() {
  const { sessions, candidates } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredSessions = sessions.filter((session) => {
    const candidate = candidates.find(c => c.id === session.candidateId);
    const matchesSearch = 
      candidate?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.product.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Sessions</h1>
          <p className="text-neutral-600">Schedule and manage research sessions</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Session
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
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

      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
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
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {session.featuresTested.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{session.featuresTested.length - 2}
                        </Badge>
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
                    <Badge variant="outline">{session.status}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {filteredSessions.length === 0 && (
          <div className="text-center py-12 text-neutral-500">
            <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p>No sessions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
