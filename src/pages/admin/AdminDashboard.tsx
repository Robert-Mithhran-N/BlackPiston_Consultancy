import { useState, useEffect } from 'react';
import {
    Car, Users, ShoppingBag, DollarSign, UserPlus, Ticket,
    CheckCircle, Flag, RefreshCcw, MessageCircle
} from 'lucide-react';
import { KPICard } from '@/components/admin/KPICard';
import { AdminChart } from '@/components/admin/AdminChart';
import { ActivityFeed } from '@/components/admin/ActivityFeed';
import { TimeRangeSelector } from '@/components/admin/TimeRangeSelector';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminDashboard() {
    const [timeRange, setTimeRange] = useState('30d');
    const [kpis, setKpis] = useState<Record<string, number> | null>(null);
    const [revenueData, setRevenueData] = useState<Record<string, unknown>[]>([]);
    const [topModels, setTopModels] = useState<Record<string, unknown>[]>([]);
    const [auditLogs, setAuditLogs] = useState<{ id: string; action: string; actor: string; actorRole: string; target: string; targetLabel: string; details: string; timestamp: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const [kpiRes, revenueRes, modelsRes, auditRes] = await Promise.all([
                    fetch('/api/admin/kpis'),
                    fetch('/api/admin/charts/revenue'),
                    fetch('/api/admin/charts/top-models'),
                    fetch('/api/admin/audit-logs'),
                ]);
                setKpis(await kpiRes.json());
                setRevenueData(await revenueRes.json());
                setTopModels(await modelsRes.json());
                const auditData = await auditRes.json();
                setAuditLogs(auditData.data || []);
            } catch { /* handled by loading state */ }
            finally { setLoading(false); }
        };
        load();
    }, [timeRange]);

    const quickAction = (action: string) => {
        toast.success(`${action} action triggered`, { description: 'This is a mock action. Connect to real API to execute.' });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">Overview of your marketplace performance</p>
                </div>
                <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <KPICard
                    title="Active Listings"
                    value={kpis?.activeListings ?? 0}
                    change={12}
                    changeLabel="last month"
                    icon={<Car className="w-5 h-5" />}
                    loading={loading}
                />
                <KPICard
                    title="Pending Approvals"
                    value={kpis?.pendingApprovals ?? 0}
                    change={-5}
                    changeLabel="last week"
                    icon={<ShoppingBag className="w-5 h-5" />}
                    loading={loading}
                />
                <KPICard
                    title="Sold (30d)"
                    value={kpis?.sold30d ?? 0}
                    change={8}
                    changeLabel="prev 30d"
                    icon={<CheckCircle className="w-5 h-5" />}
                    loading={loading}
                />
                <KPICard
                    title="Revenue (30d)"
                    value={kpis ? `$${(kpis.revenue30d / 1000).toFixed(0)}K` : '$0'}
                    change={15}
                    changeLabel="prev 30d"
                    icon={<DollarSign className="w-5 h-5" />}
                    loading={loading}
                />
                <KPICard
                    title="New Users"
                    value={kpis?.newUsers ?? 0}
                    change={22}
                    changeLabel="prev 30d"
                    icon={<UserPlus className="w-5 h-5" />}
                    loading={loading}
                />
                <KPICard
                    title="Open Tickets"
                    value={kpis?.openTickets ?? 0}
                    change={-10}
                    changeLabel="last week"
                    icon={<Ticket className="w-5 h-5" />}
                    loading={loading}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AdminChart
                    title="Revenue & Listings"
                    type="area"
                    data={revenueData}
                    dataKeys={[
                        { key: 'revenue', color: '#C9A14A', label: 'Revenue ($)' },
                        { key: 'listings', color: '#0B2E22', label: 'Listings Created' },
                    ]}
                    xKey="date"
                    height={280}
                />
                <AdminChart
                    title="Top Models"
                    type="bar"
                    data={topModels}
                    dataKeys={[{ key: 'count', color: '#C9A14A', label: 'Listings' }]}
                    xKey="model"
                    height={280}
                />
            </div>

            {/* Bottom Row: Activity + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ActivityFeed entries={auditLogs} loading={loading} />
                </div>
                <div className="bg-card rounded-xl border border-border p-5 shadow-luxury space-y-3">
                    <h3 className="font-heading font-semibold text-base mb-2">Quick Actions</h3>
                    <Button
                        variant="outline"
                        className="w-full justify-start gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950"
                        onClick={() => quickAction('Approve listing')}
                    >
                        <CheckCircle className="w-4 h-4" />
                        Approve Pending Listing
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full justify-start gap-2 border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-950"
                        onClick={() => quickAction('Flag listing')}
                    >
                        <Flag className="w-4 h-4" />
                        Flag Suspicious Listing
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full justify-start gap-2 border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950"
                        onClick={() => quickAction('Initiate refund')}
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Initiate Refund
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full justify-start gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950"
                        onClick={() => quickAction('Message user')}
                    >
                        <MessageCircle className="w-4 h-4" />
                        Message User
                    </Button>
                </div>
            </div>
        </div>
    );
}
