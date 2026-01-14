import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Users, Calendar, AlertCircle, TrendingUp, Clock, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { candidates, sessions, insights, activity, currentUser } = useApp();
  const navigate = useNavigate();

  // Calculate stats
  const toBeScheduled = candidates.filter(c => c.researchStatus === 'To be scheduled').length;
  const upcomingSessions = sessions.filter(s => s.status === 'Scheduled').length;
  const p0Insights = insights.filter(i => i.priority === 'P0' && i.status !== 'Resolved').length;
  const underDevelopment = insights.filter(i => i.status === 'Under development').length;
  const recentlyResolved = insights.filter(i => i.status === 'Resolved').slice(0, 3);

  const stats = [
    {
      title: 'Upcoming Sessions',
      value: upcomingSessions,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'To be Scheduled',
      value: toBeScheduled,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      title: 'Open P0 Insights',
      value: p0Insights,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Under Development',
      value: underDevelopment,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'candidate_added':
        return <Users className="h-4 w-4" />;
      case 'session_scheduled':
        return <Calendar className="h-4 w-4" />;
      case 'insight_created':
      case 'insight_resolved':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActivityText = (item: typeof activity[0]) => {
    switch (item.type) {
      case 'candidate_added':
        return (
          <>
            <strong>{item.user}</strong> added candidate{' '}
            <strong>{item.candidateName}</strong>
          </>
        );
      case 'status_changed':
        return (
          <>
            <strong>{item.user}</strong> changed {item.candidateName}'s status from{' '}
            <Badge variant="outline" className="text-xs">{item.oldStatus}</Badge> to{' '}
            <Badge variant="outline" className="text-xs">{item.newStatus}</Badge>
          </>
        );
      case 'session_scheduled':
        return (
          <>
            <strong>{item.user}</strong> scheduled a session with{' '}
            <strong>{item.candidateName}</strong>
          </>
        );
      case 'insight_created':
        return (
          <>
            <strong>{item.user}</strong> created insight "{item.insightTitle}"
          </>
        );
      case 'insight_resolved':
        return (
          <>
            <strong>{item.user}</strong> resolved insight "{item.insightTitle}"
          </>
        );
      default:
        return <>{item.type}</>;
    }
  };

  const scheduledSessions = sessions.filter(s => s.status === 'Scheduled').slice(0, 5);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Welcome back, {currentUser?.name || 'User'}</h1>
        <p className="text-neutral-600">Here's what's happening with your research today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">{stat.title}</p>
                  <p className="text-3xl">{stat.value}</p>
                </div>
                <div className={`h-12 w-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Sessions</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/sessions')}>
              View all
            </Button>
          </CardHeader>
          <CardContent>
            {scheduledSessions.length === 0 ? (
              <div className="text-center py-8 text-neutral-500">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p>No upcoming sessions</p>
              </div>
            ) : (
              <div className="space-y-4">
                {scheduledSessions.map((session) => {
                  const candidate = candidates.find(c => c.id === session.candidateId);
                  return (
                    <div
                      key={session.id}
                      className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
                      onClick={() => navigate(`/sessions/${session.id}`)}
                    >
                      <div className="flex-1">
                        <p className="mb-1">{candidate?.name}</p>
                        <p className="text-sm text-neutral-600 mb-2">{session.product}</p>
                        <div className="flex items-center gap-4 text-xs text-neutral-500">
                          <span>{format(new Date(session.date), 'MMM d, yyyy')}</span>
                          <span>{session.time}</span>
                          <span>{session.duration}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Add recording
                        </Button>
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recently Resolved */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recently Resolved</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/analysis')}>
              View all
            </Button>
          </CardHeader>
          <CardContent>
            {recentlyResolved.length === 0 ? (
              <div className="text-center py-8 text-neutral-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p>No resolved insights yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentlyResolved.map((insight) => (
                  <div
                    key={insight.id}
                    className="p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
                    onClick={() => navigate('/analysis')}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        {insight.priority}
                      </Badge>
                      <Badge variant="outline">{insight.category}</Badge>
                    </div>
                    <p className="text-sm line-clamp-2">{insight.title}</p>
                    <p className="text-xs text-neutral-500 mt-2">
                      Resolved {format(new Date(insight.updatedAt), 'MMM d')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activity.slice(0, 8).map((item) => (
              <div key={item.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                <div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  {getActivityIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{getActivityText(item)}</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    {format(new Date(item.timestamp), 'MMM d, h:mm a')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}