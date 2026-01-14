import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Video } from 'lucide-react';
import { format } from 'date-fns';

export default function Recordings() {
  const { candidates, sessions } = useApp();

  // Collect all recordings from candidates
  const allRecordings = candidates.flatMap(candidate =>
    candidate.recordings.map(recording => ({
      ...recording,
      candidateName: candidate.name,
      candidateId: candidate.id
    }))
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Recordings</h1>
        <p className="text-neutral-600">View and manage all session recordings</p>
      </div>

      {allRecordings.length === 0 ? (
        <div className="text-center py-12 text-neutral-500">
          <Video className="h-16 w-16 mx-auto mb-4 opacity-40" />
          <p className="mb-1">No recordings yet</p>
          <p className="text-sm">Start adding recordings to your sessions</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allRecordings.map((recording) => (
            <Card key={recording.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-base">{recording.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{recording.candidateName}</Badge>
                  </div>
                  <p className="text-sm text-neutral-600">
                    {format(new Date(recording.date), 'MMMM d, yyyy')}
                  </p>
                  <div className="aspect-video bg-neutral-100 rounded flex items-center justify-center mt-4">
                    <Video className="h-8 w-8 text-neutral-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
