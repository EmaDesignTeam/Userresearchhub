import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import { ArrowLeft, Calendar, Video, Plus } from 'lucide-react';
import { format } from 'date-fns';
import type { ResearchStatus } from '../types';

export default function CandidateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { candidates, sessions, updateCandidate } = useApp();
  
  const candidate = candidates.find(c => c.id === id);
  const candidateSessions = sessions.filter(s => s.candidateId === id);

  if (!candidate) {
    return <div className="p-8">Candidate not found</div>;
  }

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
          <Badge variant="outline" className={getStatusColor(candidate.researchStatus)}>
            {candidate.researchStatus}
          </Badge>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
          <Button variant="outline">
            <Video className="h-4 w-4 mr-2" />
            Add Recording
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sessions">Sessions ({candidateSessions.length})</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="recordings">Recordings ({candidate.recordings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  <Badge variant="outline">{candidate.userType}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Research Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-neutral-600 mb-2">Features Tested</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.featuresTested.length > 0 ? (
                      candidate.featuresTested.map((feature, idx) => (
                        <Badge key={idx} variant="secondary">
                          {feature}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-neutral-500">No features tested yet</p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Research Status</p>
                  <Badge variant="outline" className={getStatusColor(candidate.researchStatus)}>
                    {candidate.researchStatus}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Total Sessions</p>
                  <p>{candidateSessions.length}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Recordings</p>
                  <p>{candidate.recordings.length}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sessions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Sessions</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Schedule New
              </Button>
            </CardHeader>
            <CardContent>
              {candidateSessions.length === 0 ? (
                <div className="text-center py-12 text-neutral-500">
                  <Calendar className="h-12 w-12 mx-auto mb-3 opacity-40" />
                  <p>No sessions scheduled yet</p>
                </div>
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
                        <Badge variant="outline">{session.status}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {session.featuresTested.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Research Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add notes about this candidate..."
                value={candidate.notes}
                onChange={(e) => updateCandidate(candidate.id, { notes: e.target.value })}
                className="min-h-[300px]"
              />
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">Convert to Insight</Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Save Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recordings">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recordings</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Recording
              </Button>
            </CardHeader>
            <CardContent>
              {candidate.recordings.length === 0 ? (
                <div className="text-center py-12 text-neutral-500">
                  <Video className="h-12 w-12 mx-auto mb-3 opacity-40" />
                  <p>No recordings added yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {candidate.recordings.map((recording) => (
                    <div key={recording.id} className="p-4 border rounded-lg hover:bg-neutral-50 cursor-pointer">
                      <p className="mb-1">{recording.title}</p>
                      <p className="text-sm text-neutral-600">
                        {format(new Date(recording.date), 'MMM d, yyyy')}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
