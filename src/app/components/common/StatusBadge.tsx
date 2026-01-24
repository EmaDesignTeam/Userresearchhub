import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';
import { CheckCircle, Clock, Calendar, XCircle, AlertCircle } from 'lucide-react';

type ResearchStatus = 'Completed' | 'Scheduled' | 'To be scheduled' | 'Skipped';
type InsightStatus = 'Picked up' | 'Under development' | 'Resolved' | 'Skipped';
type UserStatus = 'Active' | 'Invited' | 'Inactive';

interface StatusBadgeProps {
  status: ResearchStatus | InsightStatus | UserStatus | string;
  showIcon?: boolean;
  variant?: 'research' | 'insight' | 'user' | 'default';
}

/**
 * StatusBadge - Smart badge that applies consistent colors based on status
 * Supports research status, insight status, and user status
 */
export function StatusBadge({ status, showIcon = false, variant = 'default' }: StatusBadgeProps) {
  const getStatusConfig = () => {
    // Research & Insight Status Colors (matching design system)
    const statusMap: Record<string, { className: string; icon?: typeof CheckCircle }> = {
      // Completed/Resolved - Emerald (Green)
      'Completed': { 
        className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        icon: CheckCircle
      },
      'Resolved': { 
        className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        icon: CheckCircle
      },
      
      // Scheduled/Picked up - Blue
      'Scheduled': { 
        className: 'bg-blue-50 text-blue-700 border-blue-200',
        icon: Calendar
      },
      'Picked up': { 
        className: 'bg-blue-50 text-blue-700 border-blue-200',
        icon: AlertCircle
      },
      
      // To be scheduled/Under development - Amber (Orange)
      'To be scheduled': { 
        className: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: Clock
      },
      'Under development': { 
        className: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: Clock
      },
      
      // Skipped/Inactive - Neutral (Gray)
      'Skipped': { 
        className: 'bg-neutral-100 text-neutral-600 border-neutral-200',
        icon: XCircle
      },
      'Inactive': { 
        className: 'bg-neutral-100 text-neutral-600 border-neutral-200',
        icon: XCircle
      },
      
      // User Status
      'Active': { 
        className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        icon: CheckCircle
      },
      'Invited': { 
        className: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: Clock
      }
    };

    return statusMap[status] || { 
      className: 'bg-neutral-100 text-neutral-600 border-neutral-200',
      icon: undefined
    };
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={cn(config.className, "font-medium")}>
      {showIcon && Icon && <Icon className="h-3 w-3" />}
      {status}
    </Badge>
  );
}
