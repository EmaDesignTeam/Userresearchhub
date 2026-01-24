import { ReactNode } from 'react';
import { cn } from '../ui/utils';

interface DataTableWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * DataTableWrapper - Consistent wrapper for data tables
 * Provides standard border, background, and rounded corners
 */
export function DataTableWrapper({ children, className }: DataTableWrapperProps) {
  return (
    <div className={cn(
      "bg-white rounded-lg border border-neutral-200 overflow-hidden",
      className
    )}>
      {children}
    </div>
  );
}
