import { useState, useEffect, useCallback } from 'react';
import { DataTable, Column } from '@/components/admin/DataTable';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
    Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Search, Eye, UserX, UserCheck, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    lastLogin: string;
    status: string;
    createdAt: string;
    listings: number;
    purchases: number;
    flagReason?: string;
    suspendReason?: string;
}

const roleColors: Record<string, string> = {
    superadmin: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    moderator: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    finance: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    support: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    content: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
    user: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

const statusColors: Record<string, string> = {
    active: 'text-emerald-600',
    flagged: 'text-amber-600',
    suspended: 'text-red-600',
};

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [detailUser, setDetailUser] = useState<User | null>(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.set('search', search);
            if (roleFilter !== 'all') params.set('role', roleFilter);
            const res = await fetch(`/api/admin/users?${params}`);
            const data = await res.json();
            setUsers(data.data || []);
        } catch { /* error state */ }
        finally { setLoading(false); }
    }, [search, roleFilter]);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const toggleSuspend = async (user: User) => {
        const newStatus = user.status === 'suspended' ? 'active' : 'suspended';
        await fetch(`/api/admin/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });
        toast.success(newStatus === 'suspended' ? 'User suspended' : 'User reactivated');
        setDetailUser(null);
        fetchUsers();
    };

    const columns: Column<User>[] = [
        {
            key: 'name', label: 'User', sortable: true,
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0B2E22]/10 dark:bg-[#C9A14A]/10 flex items-center justify-center text-sm font-heading font-semibold text-[#0B2E22] dark:text-[#C9A14A]">
                        {row.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                        <p className="font-medium text-sm">{row.name}</p>
                        <p className="text-xs text-muted-foreground">{row.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'role', label: 'Role', sortable: true,
            render: (row) => (
                <Badge variant="secondary" className={cn('text-xs capitalize', roleColors[row.role])}>
                    {row.role}
                </Badge>
            ),
        },
        {
            key: 'status', label: 'Status', sortable: true,
            render: (row) => (
                <div className="flex items-center gap-1.5">
                    <div className={cn('w-2 h-2 rounded-full', row.status === 'active' ? 'bg-emerald-500' : row.status === 'flagged' ? 'bg-amber-500' : 'bg-red-500')} />
                    <span className={cn('text-sm capitalize', statusColors[row.status])}>{row.status}</span>
                </div>
            ),
        },
        {
            key: 'lastLogin', label: 'Last Login', sortable: true,
            render: (row) => <span className="text-muted-foreground text-sm">{new Date(row.lastLogin).toLocaleDateString()}</span>,
        },
        {
            key: 'listings', label: 'Listings', sortable: true,
            render: (row) => <span className="text-sm">{row.listings}</span>,
        },
        {
            key: 'actions', label: '',
            render: (row) => (
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); setDetailUser(row); }}>
                    <Eye className="w-4 h-4" />
                </Button>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-heading text-2xl font-bold">Users</h1>
                <p className="text-muted-foreground text-sm mt-0.5">Manage users, roles, and access</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[150px]"><SelectValue placeholder="Role" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="superadmin">Superadmin</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                        <SelectItem value="content">Content</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <DataTable
                columns={columns}
                data={users}
                loading={loading}
                onRowClick={setDetailUser}
            />

            {/* User Detail Drawer */}
            <Sheet open={!!detailUser} onOpenChange={(open) => !open && setDetailUser(null)}>
                <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                    {detailUser && (
                        <>
                            <SheetHeader>
                                <SheetTitle className="font-heading flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-[#0B2E22]/10 dark:bg-[#C9A14A]/10 flex items-center justify-center text-lg font-heading font-bold text-[#0B2E22] dark:text-[#C9A14A]">
                                        {detailUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <div>
                                        <div>{detailUser.name}</div>
                                        <div className="text-sm font-normal text-muted-foreground">{detailUser.email}</div>
                                    </div>
                                </SheetTitle>
                                <SheetDescription />
                            </SheetHeader>
                            <div className="mt-6 space-y-6">
                                <div className="flex gap-2">
                                    <Badge variant="secondary" className={cn('capitalize', roleColors[detailUser.role])}>
                                        {detailUser.role}
                                    </Badge>
                                    <Badge variant="secondary" className={cn('capitalize', detailUser.status === 'active' ? 'bg-emerald-100 text-emerald-700' : detailUser.status === 'flagged' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700')}>
                                        {detailUser.status}
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        ['Last Login', new Date(detailUser.lastLogin).toLocaleString()],
                                        ['Member Since', new Date(detailUser.createdAt).toLocaleDateString()],
                                        ['Listings Posted', detailUser.listings],
                                        ['Purchases', detailUser.purchases],
                                    ].map(([label, val]) => (
                                        <div key={String(label)}>
                                            <p className="text-xs text-muted-foreground">{label}</p>
                                            <p className="text-sm font-medium">{val}</p>
                                        </div>
                                    ))}
                                </div>

                                {detailUser.flagReason && (
                                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                                        <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" /> Flag Reason</p>
                                        <p className="text-sm text-amber-600 dark:text-amber-300">{detailUser.flagReason}</p>
                                    </div>
                                )}

                                {detailUser.suspendReason && (
                                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
                                        <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">Suspend Reason</p>
                                        <p className="text-sm text-red-600 dark:text-red-300">{detailUser.suspendReason}</p>
                                    </div>
                                )}

                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant={detailUser.status === 'suspended' ? 'default' : 'destructive'}
                                        className="gap-1.5"
                                        onClick={() => toggleSuspend(detailUser)}
                                    >
                                        {detailUser.status === 'suspended' ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                                        {detailUser.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}
