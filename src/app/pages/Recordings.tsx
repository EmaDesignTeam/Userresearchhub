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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Video, ExternalLink, FileText } from 'lucide-react';
import { format } from 'date-fns';

// Import reusable components
import { PageHeader, CategoryBadge, DataTableWrapper, EmptyState } from '../components/common';

export default function Recordings() {
  const { recordings, candidates, sessions } = useApp();
  const [selectedRecording, setSelectedRecording] = useState<any>(null);

  const getCandidate = (candidateId?: string) => {
    return candidates.find(c => c.id === candidateId);
  };

  const getSession = (sessionId?: string) => {
    return sessions.find(s => s.id === sessionId);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Use PageHeader component */}
      <PageHeader
        title="Recordings"
        description="View and manage all session recordings and transcripts"
      />

      {recordings.length === 0 ? (
        <EmptyState
          icon={Video}
          title="No recordings yet"
          description="Start adding recordings to your research sessions"
        />
      ) : (
        <DataTableWrapper>
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50">
                <TableHead>Title</TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recordings.map((recording) => {
                const candidate = getCandidate(recording.candidateId);
                const session = getSession(recording.sessionId);
                const hasVideo = recording.url && recording.url !== 'N/A';
                const hasTranscript = recording.transcript && recording.transcript.trim().length > 0;
                
                return (
                  <TableRow 
                    key={recording.id} 
                    className="hover:bg-neutral-50 cursor-pointer"
                    onClick={() => setSelectedRecording(recording)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4 text-neutral-400" />
                        <span className="font-medium">{recording.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {/* Use CategoryBadge component */}
                      <CategoryBadge category={candidate?.name || 'Unknown'} />
                    </TableCell>
                    <TableCell className="text-neutral-600">
                      {session?.product || 'No session linked'}
                    </TableCell>
                    <TableCell className="text-neutral-600">
                      {recording.date ? format(new Date(recording.date), 'MMM d, yyyy') : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {hasVideo && (
                          <CategoryBadge category="Video" showIcon />
                        )}
                        {hasTranscript && (
                          <CategoryBadge category="Transcript" showIcon />
                        )}
                      </div>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-1">
                        {hasVideo && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => window.open(recording.url, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Video
                          </Button>
                        )}
                        {hasTranscript && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedRecording(recording)}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </DataTableWrapper>
      )}

      {/* View Recording/Transcript Dialog */}
      <Dialog open={!!selectedRecording} onOpenChange={() => setSelectedRecording(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedRecording?.title}</DialogTitle>
            <DialogDescription>
              {selectedRecording?.date && format(new Date(selectedRecording.date), 'MMMM d, yyyy')}
              {' • '}
              {getCandidate(selectedRecording?.candidateId)?.name || 'Unknown candidate'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedRecording?.url && selectedRecording.url !== 'N/A' && (
              <div>
                <h3 className="font-medium mb-2">Video Link</h3>
                <Button 
                  variant="outline" 
                  onClick={() => window.open(selectedRecording.url, '_blank')}
                  className="w-full"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Video in New Tab
                </Button>
              </div>
            )}
            {selectedRecording?.transcript && (
              <div>
                <h3 className="font-medium mb-2">Transcript</h3>
                <div className="bg-neutral-50 border rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm font-sans">
                    {selectedRecording.transcript}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
