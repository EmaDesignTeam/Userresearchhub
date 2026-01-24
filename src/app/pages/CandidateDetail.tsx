import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { ArrowLeft, Calendar, Video, Plus, AlertCircle, ExternalLink, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import type { ResearchStatus, InsightStatus, Priority, Category, Insight } from '../types';
import CreateInsightModal from '../components/insights/CreateInsightModal';
import EditInsightModal from '../components/insights/EditInsightModal';
import AddRecordingModal from '../components/recordings/AddRecordingModal';

// Import reusable components
import {
  StatusBadge,
  PriorityBadge,
  CategoryBadge,
  EmptyState,
  InfoCard
} from '../components/common';

export default function CandidateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { candidates, sessions, insights, recordings, updateCandidate } = useApp();
  
  const candidate = candidates.find(c => c.id === id);
  const candidateSessions = sessions.filter(s => s.candidateId === id);
  const candidateInsights = insights.filter(i => i.userInterviewed === id);
  const candidateRecordings = recordings.filter(r => r.candidateId === id);
  
  // Local state for notes
  const [notes, setNotes] = useState(candidate?.notes || '');
  const [isSaving, setIsSaving] = useState(false);
  
  // Modal states
  const [isCreateInsightModalOpen, setIsCreateInsightModalOpen] = useState(false);
  const [isEditInsightModalOpen, setIsEditInsightModalOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [isAddRecordingModalOpen, setIsAddRecordingModalOpen] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState<any>(null);
  
  // Update local state when candidate changes
  useEffect(() => {
    if (candidate) {
      setNotes(candidate.notes || '');
    }
  }, [candidate?.id, candidate?.notes]);

  const handleEditInsight = (insight: Insight) => {
    setSelectedInsight(insight);
    setIsEditInsightModalOpen(true);
  };

  if (!candidate) {
    return <div className="p-8">Candidate not found</div>;
  }
  
  const handleSaveNotes = async () => {
    setIsSaving(true);
    try {
      await updateCandidate(candidate.id, { notes });
      toast.success('Notes saved successfully');
    } catch (error) {
      console.error('Error saving notes:', error);
      toast.error('Failed to save notes');
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <div className="p-8">
      <Button variant="ghost" className="mb-6" onClick={() => navigate('/candidates')}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Candidates
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">{candidate.name}</h1>
          <div className="flex items-center gap-4 text-neutral-600">
            <span>{candidate.title}</span>
            <span>•</span>
            <span>{candidate.department}</span>
            <span>•</span>
            <span>{candidate.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Use StatusBadge component */}
          <StatusBadge status={candidate.researchStatus} showIcon />
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
          <Button variant="outline" onClick={() => setIsAddRecordingModalOpen(true)}>
            <Video className="h-4 w-4 mr-2" />
            Add Recording
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sessions">Sessions ({candidateSessions.length})</TabsTrigger>
          <TabsTrigger value="insights">Insights ({candidateInsights.length})</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="recordings">Recordings ({candidateRecordings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Use InfoCard component */}
            <InfoCard title="Profile Information">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Department</p>
                  <p>{candidate.department}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Title</p>
                  <p>{candidate.title}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Location</p>
                  <p>{candidate.location}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Date of Joining</p>
                  <p>{format(new Date(candidate.dateOfJoining), 'MMMM d, yyyy')}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">User Type</p>
                  <CategoryBadge category={candidate.userType} />
                </div>
              </div>
            </InfoCard>

            <InfoCard title="Research Details">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-neutral-600 mb-2">Features Tested</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.featuresTested.length > 0 ? (
                      candidate.featuresTested.map((feature, idx) => (
                        <CategoryBadge key={idx} category={feature} />
                      ))
                    ) : (
                      <p className="text-sm text-neutral-500">No features tested yet</p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Research Status</p>
                  <StatusBadge status={candidate.researchStatus} showIcon />
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Total Sessions</p>
                  <p>{candidateSessions.length}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Recordings</p>
                  <p>{candidateRecordings.length}</p>
                </div>
              </div>
            </InfoCard>
          </div>
        </TabsContent>

        <TabsContent value="sessions">
          <InfoCard 
            title="Sessions"
            action={
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Schedule New
              </Button>
            }
          >
            {candidateSessions.length === 0 ? (
              <EmptyState
                icon={Calendar}
                title="No sessions scheduled yet"
                description="Schedule a research session with this candidate"
              />
            ) : (
                <div className="space-y-4">
                  {candidateSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-4 border rounded-lg hover:bg-neutral-50 cursor-pointer"
                      onClick={() => navigate(`/sessions/${session.id}`)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="mb-1">{session.product}</p>
                          <p className="text-sm text-neutral-600">
                            {format(new Date(session.date), 'MMMM d, yyyy')} at {session.time}
                          </p>
                        </div>
                        <StatusBadge status={session.status} showIcon />
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {session.featuresTested.map((feature, idx) => (
                          <CategoryBadge key={idx} category={feature} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </InfoCard>
        </TabsContent>

        <TabsContent value="insights">
          <InfoCard
            title="Research Insights"
            action={
              <Button size="sm" onClick={() => setIsCreateInsightModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Insight
              </Button>
            }
          >
            {candidateInsights.length === 0 ? (
              <EmptyState
                icon={AlertCircle}
                title="No insights created yet"
                description="Insights will appear here once created"
              />
            ) : (
                <div className="space-y-4">
                  {candidateInsights.map((insight) => (
                    <div
                      key={insight.id}
                      className="p-4 border rounded-lg hover:bg-neutral-50 cursor-pointer"
                      onClick={() => handleEditInsight(insight)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{insight.title}</h3>
                          {insight.description && (
                            <p className="text-sm text-neutral-600 line-clamp-2">
                              {insight.description}
                            </p>
                          )}
                        </div>
                        <PriorityBadge priority={insight.priority} />
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <StatusBadge status={insight.status} showIcon variant="insight" />
                        <CategoryBadge category={insight.category} showIcon />
                        <CategoryBadge category={insight.team} />
                        <CategoryBadge category={insight.effort} />
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <div className="flex items-center gap-4">
                          {insight.product && <span>Product: {insight.product}</span>}
                          {insight.assignee && <span>Assignee: {insight.assignee}</span>}
                        </div>
                        <span>Created {format(new Date(insight.createdAt), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </InfoCard>
        </TabsContent>

        <TabsContent value="notes">
          <InfoCard title="Research Notes">
            <div>
              <Textarea
                placeholder="Add notes about this candidate..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[300px]"
                disabled={isSaving}
              />
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">Convert to Insight</Button>
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={handleSaveNotes}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Notes'}
                </Button>
              </div>
            </div>
          </InfoCard>
        </TabsContent>

        <TabsContent value="recordings">
          <InfoCard
            title="Recordings"
            action={
              <Button size="sm" onClick={() => setIsAddRecordingModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Recording
              </Button>
            }
          >
            {candidateRecordings.length === 0 ? (
              <EmptyState
                icon={Video}
                title="No recordings added yet"
                description="Add recordings to capture interview insights"
              />
            ) : (
                <div className="space-y-3">
                  {candidateRecordings.map((recording) => {
                    const hasVideo = recording.url && recording.url !== 'N/A';
                    const hasTranscript = recording.transcript && recording.transcript.trim().length > 0;
                    return (
                      <div 
                        key={recording.id} 
                        className="p-4 border rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
                        onClick={() => setSelectedRecording(recording)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Video className="h-4 w-4 text-neutral-400" />
                              <h4 className="font-medium">{recording.title}</h4>
                            </div>
                            <div className="flex gap-2 mb-2">
                              {hasVideo && (
                                <Badge variant="outline" className="text-xs">
                                  <Video className="h-3 w-3 mr-1" />
                                  Video
                                </Badge>
                              )}
                              {hasTranscript && (
                                <Badge variant="outline" className="text-xs">
                                  <FileText className="h-3 w-3 mr-1" />
                                  Transcript
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-neutral-600">
                              {recording.date ? format(new Date(recording.date), 'MMMM d, yyyy') : 'No date'}
                            </p>
                          </div>
                          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            {hasVideo && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => window.open(recording.url, '_blank')}
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Open
                              </Button>
                            )}
                            {hasTranscript && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedRecording(recording)}
                              >
                                <FileText className="h-3 w-3 mr-1" />
                                View
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
          </InfoCard>
        </TabsContent>
      </Tabs>

      {/* Create Insight Modal */}
      <CreateInsightModal 
        open={isCreateInsightModalOpen} 
        onOpenChange={setIsCreateInsightModalOpen}
        defaultCandidateId={candidate.id}
      />

      {/* Edit Insight Modal */}
      <EditInsightModal 
        open={isEditInsightModalOpen} 
        onOpenChange={setIsEditInsightModalOpen}
        insight={selectedInsight}
      />

      {/* Add Recording Modal */}
      <AddRecordingModal 
        open={isAddRecordingModalOpen} 
        onOpenChange={setIsAddRecordingModalOpen}
        candidateId={candidate.id}
        candidateName={candidate.name}
      />

      {/* View Recording/Transcript Dialog */}
      <Dialog open={!!selectedRecording} onOpenChange={() => setSelectedRecording(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedRecording?.title}</DialogTitle>
            <DialogDescription>
              {selectedRecording?.date && format(new Date(selectedRecording.date), 'MMMM d, yyyy')}
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
