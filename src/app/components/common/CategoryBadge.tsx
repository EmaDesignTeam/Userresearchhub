import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';
import { AlertCircle, Sparkles, FileText, MoreHorizontal } from 'lucide-react';

type Category = 'Bug' | 'Feature Enhancement' | 'Copy Change' | 'Other';

interface CategoryBadgeProps {
  category: Category | string;
  showIcon?: boolean;
}

/**
 * CategoryBadge - Category indicator with consistent colors
 * Bug = Red, Feature = Purple, Copy = Blue, Other = Neutral
 */
export function CategoryBadge({ category, showIcon = false }: CategoryBadgeProps) {
  const categoryConfig: Record<string, { className: string; icon: typeof AlertCircle }> = {
    'Bug': {
      className: 'bg-red-50 text-red-700',
      icon: AlertCircle
    },
    'Feature Enhancement': {
      className: 'bg-purple-50 text-purple-700',
      icon: Sparkles
    },
    'Copy Change': {
      className: 'bg-blue-50 text-blue-700',
      icon: FileText
    },
    'Other': {
      className: 'bg-neutral-50 text-neutral-700',
      icon: MoreHorizontal
    }
  };

  const config = categoryConfig[category] || categoryConfig['Other'];
  const Icon = config.icon;

  return (
    <Badge variant="secondary" className={cn(config.className)}>
      {showIcon && <Icon className="h-3 w-3" />}
      {category}
    </Badge>
  );
}
