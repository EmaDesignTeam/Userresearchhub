import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';

type Priority = 'P0' | 'P1' | 'P2';

interface PriorityBadgeProps {
  priority: Priority;
  showLabel?: boolean;
}

/**
 * PriorityBadge - Priority indicator with consistent colors
 * P0 = Critical (Red), P1 = High (Amber), P2 = Medium (Blue)
 */
export function PriorityBadge({ priority, showLabel = false }: PriorityBadgeProps) {
  const priorityConfig = {
    'P0': {
      className: 'bg-red-50 text-red-700 border-red-200 font-semibold',
      label: 'Critical'
    },
    'P1': {
      className: 'bg-amber-50 text-amber-700 border-amber-200',
      label: 'High'
    },
    'P2': {
      className: 'bg-blue-50 text-blue-700 border-blue-200',
      label: 'Medium'
    }
  };

  const config = priorityConfig[priority];

  return (
    <Badge variant="outline" className={cn(config.className)}>
      {priority}
      {showLabel && ` - ${config.label}`}
    </Badge>
  );
}
