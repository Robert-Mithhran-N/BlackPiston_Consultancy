import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface KPICardProps {
    title: string;
    value: string | number;
    change?: number;
    changeLabel?: string;
    icon: React.ReactNode;
    loading?: boolean;
}

export function KPICard({ title, value, change, changeLabel, icon, loading }: KPICardProps) {
    if (loading) {
        return (
            <div className="bg-card rounded-xl border border-border p-5 shadow-luxury">
                <div className="flex items-start justify-between mb-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-9 w-9 rounded-lg" />
                </div>
                <Skeleton className="h-8 w-20 mb-2" />
                <Skeleton className="h-3 w-28" />
            </div>
        );
    }

    const trendIcon = change === undefined ? null : change > 0
        ? <TrendingUp className="w-3.5 h-3.5" />
        : change < 0
            ? <TrendingDown className="w-3.5 h-3.5" />
            : <Minus className="w-3.5 h-3.5" />;

    const trendColor = change === undefined ? '' : change > 0
        ? 'text-emerald-600 dark:text-emerald-400'
        : change < 0
            ? 'text-red-500'
            : 'text-muted-foreground';

    return (
        <div className="bg-card rounded-xl border border-border p-5 shadow-luxury hover:shadow-luxury-lg transition-shadow duration-300 group">
            <div className="flex items-start justify-between mb-3">
                <p className="text-sm text-muted-foreground font-medium">{title}</p>
                <div className="w-9 h-9 rounded-lg bg-[#0B2E22]/10 dark:bg-[#C9A14A]/10 flex items-center justify-center text-[#0B2E22] dark:text-[#C9A14A] group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
            </div>
            <p className="text-2xl font-heading font-bold text-foreground mb-1">{value}</p>
            {change !== undefined && (
                <div className={cn('flex items-center gap-1 text-xs font-medium', trendColor)}>
                    {trendIcon}
                    <span>{change > 0 ? '+' : ''}{change}%</span>
                    {changeLabel && <span className="text-muted-foreground ml-1">vs {changeLabel}</span>}
                </div>
            )}
        </div>
    );
}
