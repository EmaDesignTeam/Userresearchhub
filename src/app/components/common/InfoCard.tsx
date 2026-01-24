import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * InfoCard - Reusable card for displaying information
 * Used in detail pages and admin sections
 */
export function InfoCard({ 
  title, 
  description, 
  icon: Icon, 
  action, 
  children,
  className 
}: InfoCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="h-10 w-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <Icon className="h-5 w-5 text-emerald-600" />
            </div>
          )}
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            {description && (
              <p className="text-sm text-neutral-600 mt-1">{description}</p>
            )}
          </div>
        </div>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
