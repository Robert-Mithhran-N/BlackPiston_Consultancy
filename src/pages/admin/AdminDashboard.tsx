import { useState, useEffect } from 'react';
import {
    Package, Users, ShoppingBag, DollarSign, UserPlus, CheckCircle,
    Plus, Eye, ClipboardList
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

    const nav = useNavigate();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">Admin inventory & acquisition overview</p>
                </div>
                <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <KPICard
                    title="Pending Requests"
                    value={kpis?.pendingRequests ?? 0}
                    change={-5}
                    changeLabel="last week"
                    icon={<ShoppingBag className="w-5 h-5" />}
                    loading={loading}
                />
                <KPICard
                    title="Acquisitions"
                    value={kpis?.acquisitionsThisMonth ?? 0}
                    change={12}
                    changeLabel="this month"
                    icon={<CheckCircle className="w-5 h-5" />}
                    loading={loading}
                />
                <KPICard
                    title="Active Inventory"
                    value={kpis?.inventoryActive ?? 0}
                    change={8}
                    changeLabel="last month"
                    icon={<Package className="w-5 h-5" />}
                    loading={loading}
                />
                <KPICard
                    title="Vehicles Sold"
                    value={kpis?.vehiclesSold ?? 0}
                    change={5}
                    changeLabel="prev 30d"
                    icon={<DollarSign className="w-5 h-5" />}
                    loading={loading}
                />
                <KPICard
                    title="Revenue (30d)"
                    value={kpis ? `£${(kpis.revenue30d / 1000).toFixed(0)}K` : '£0'}
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
                        className="w-full justify-start gap-2 border-[#0F3D2E]/30 text-[#0F3D2E] hover:bg-[#0F3D2E]/5"
                        onClick={() => nav('/admin/purchase-requests')}
                    >
                        <ClipboardList className="w-4 h-4" />
                        Review Purchase Requests
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full justify-start gap-2 border-[#C9A14A]/30 text-[#C9A14A] hover:bg-[#C9A14A]/5"
                        onClick={() => nav('/admin/inventory/create')}
                    >
                        <Plus className="w-4 h-4" />
                        Create Inventory Item
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full justify-start gap-2 border-[#0F3D2E]/30 text-[#0F3D2E] hover:bg-[#0F3D2E]/5"
                        onClick={() => nav('/admin/inventory/drafts')}
                    >
                        <Eye className="w-4 h-4" />
                        View Draft Inventory
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full justify-start gap-2 border-[#C9A14A]/30 text-[#C9A14A] hover:bg-[#C9A14A]/5"
                        onClick={() => nav('/admin/inventory/published')}
                    >
                        <Package className="w-4 h-4" />
                        Published Inventory
                    </Button>
                </div>
            </div>
        </div>
    );
}
