import { LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
}

/**
 * EmptyState - Consistent empty state component
 * Used when tables/lists have no data
 */
export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  children 
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 text-neutral-500">
      <Icon className="h-12 w-12 mx-auto mb-3 opacity-40" />
      <p className="mb-1 font-medium text-neutral-700">{title}</p>
      {description && (
        <p className="text-sm mb-4">{description}</p>
      )}
      {action && (
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700 mt-2"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
      {children}
    </div>
  );
}
