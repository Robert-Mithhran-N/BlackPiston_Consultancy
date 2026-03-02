import { formatDistanceToNow } from 'date-fns';
import {
    CheckCircle2, AlertTriangle, XCircle, UserMinus, RefreshCcw,
    ShieldCheck, PlusCircle, Settings2, ShoppingBag
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuditEntry {
    id: string;
    action: string;
    actor: string;
    actorRole: string;
    target: string;
    targetLabel: string;
    details: string;
    timestamp: string;
}

interface ActivityFeedProps {
    entries: AuditEntry[];
    loading?: boolean;
}

const actionConfig: Record<string, { icon: React.ElementType; color: string }> = {
    'listing.approved': { icon: CheckCircle2, color: 'text-emerald-500' },
    'listing.flagged': { icon: AlertTriangle, color: 'text-amber-500' },
    'listing.created': { icon: PlusCircle, color: 'text-blue-500' },
    'listing.sold': { icon: ShoppingBag, color: 'text-[#C9A14A]' },
    'user.suspended': { icon: UserMinus, color: 'text-red-500' },
    'refund.initiated': { icon: RefreshCcw, color: 'text-orange-500' },
    'seller.verified': { icon: ShieldCheck, color: 'text-emerald-500' },
    'settings.updated': { icon: Settings2, color: 'text-muted-foreground' },
};

export function ActivityFeed({ entries, loading }: ActivityFeedProps) {
    if (loading) {
        return (
            <div className="bg-card rounded-xl border border-border p-5 shadow-luxury">
                <h3 className="font-heading font-semibold text-base mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex gap-3 animate-pulse">
                            <div className="w-8 h-8 rounded-full bg-muted shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 bg-muted rounded w-3/4" />
                                <div className="h-2.5 bg-muted rounded w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-xl border border-border p-5 shadow-luxury">
            <h3 className="font-heading font-semibold text-base mb-4">Recent Activity</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                {entries.map((entry) => {
                    const config = actionConfig[entry.action] || { icon: XCircle, color: 'text-muted-foreground' };
                    const Icon = config.icon;
                    return (
                        <div key={entry.id} className="flex gap-3 group">
                            <div className={cn('w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-muted/50', config.color)}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm leading-snug">
                                    <span className="font-medium">{entry.actor}</span>
                                    <span className="text-muted-foreground mx-1">{entry.action.replace('.', ' ')}</span>
                                    <span className="font-medium text-foreground">{entry.targetLabel}</span>
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5 truncate">{entry.details}</p>
                                <p className="text-[11px] text-muted-foreground/60 mt-0.5">
                                    {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
