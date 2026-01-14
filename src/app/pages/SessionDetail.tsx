import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export default function SessionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sessions, candidates } = useApp();
  
  const session = sessions.find(s => s.id === id);
  const candidate = session ? candidates.find(c => c.id === session.candidateId) : null;

  if (!session || !candidate) {
    return <div className="p-8">Session not found</div>;
  }

  return (
    <div className="p-8">
      <Button variant="ghost" className="mb-6" onClick={() => navigate('/sessions')}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Sessions
      </Button>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Session with {candidate.name}</h1>
          <p className="text-neutral-600">{session.product} • {format(new Date(session.date), 'MMMM d, yyyy')} at {session.time}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline">{session.status}</Badge>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Add Recording
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Candidate</p>
                <p>{candidate.name}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 mb-1">Product</p>
                <p>{session.product}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 mb-1">Date & Time</p>
                <p>{format(new Date(session.date), 'MMM d, yyyy')} at {session.time}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 mb-1">Duration</p>
                <p>{session.duration}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 mb-1">Moderator</p>
                <p>{session.moderator}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 mb-2">Features Tested</p>
                <div className="flex flex-wrap gap-1">
                  {session.featuresTested.map((feature, idx) => (
                    <Badge key={idx} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Session objectives..."
                value={session.objectives || ''}
                className="min-h-[100px]"
                readOnly
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Observations</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Key observations..."
                value={session.observations || ''}
                className="min-h-[150px]"
                readOnly
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quotes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Notable quotes..."
                value={session.quotes || ''}
                className="min-h-[100px]"
                readOnly
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Session Notes</CardTitle>
              <Button size="sm">Create Insight</Button>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Additional session notes..."
                value={session.sessionNotes}
                className="min-h-[200px]"
                readOnly
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}