import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { ArrowLeft, Calendar, User, Package } from 'lucide-react';
import { format } from 'date-fns';

// Import reusable components
import { StatusBadge, CategoryBadge, InfoCard } from '../components/common';

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
          {/* Use StatusBadge component */}
          <StatusBadge status={session.status} showIcon />
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Add Recording
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          {/* Use InfoCard component */}
          <InfoCard title="Session Details" icon={Calendar}>
            <div className="space-y-4">
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
                    <CategoryBadge key={idx} category={feature} />
                  ))}
                </div>
              </div>
            </div>
          </InfoCard>
        </div>

        <div className="col-span-2 space-y-6">
          <InfoCard title="Objectives">
            <div>
              <Textarea
                placeholder="Session objectives..."
                value={session.objectives || ''}
                className="min-h-[100px]"
                readOnly
              />
            </div>
          </InfoCard>

          <InfoCard title="Observations">
            <div>
              <Textarea
                placeholder="Key observations..."
                value={session.observations || ''}
                className="min-h-[150px]"
                readOnly
              />
            </div>
          </InfoCard>

          <InfoCard title="Quotes">
            <div>
              <Textarea
                placeholder="Notable quotes..."
                value={session.quotes || ''}
                className="min-h-[100px]"
                readOnly
              />
            </div>
          </InfoCard>

          <InfoCard 
            title="Session Notes"
            action={
              <Button size="sm">Create Insight</Button>
            }
          >
            <div>
              <Textarea
                placeholder="Additional session notes..."
                value={session.sessionNotes}
                className="min-h-[200px]"
                readOnly
              />
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
}