import { useState, useEffect, useCallback } from 'react';
import { DataTable, Column } from '@/components/admin/DataTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
    Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription
} from '@/components/ui/sheet';
import {
    Search, Download, CheckCircle, XCircle, Archive, Eye, Car, Bike
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import * as XLSX from 'xlsx';

interface Listing {
    id: string;
    title: string;
    type: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    status: string;
    sellerName: string;
    vin: string;
    location: string;
    badges: string[];
    createdAt: string;
    views: number;
    inquiries: number;
    flagReason?: string;
    fuel: string;
    transmission: string;
    color: string;
}

const statusColors: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    sold: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    flagged: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    archived: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

export default function AdminListings() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [detailListing, setDetailListing] = useState<Listing | null>(null);

    const fetchListings = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (statusFilter !== 'all') params.set('status', statusFilter);
            if (typeFilter !== 'all') params.set('type', typeFilter);
            if (search) params.set('search', search);
            const res = await fetch(`/api/admin/listings?${params}`);
            const data = await res.json();
            setListings(data.data || []);
        } catch { /* error state */ }
        finally { setLoading(false); }
    }, [statusFilter, typeFilter, search]);

    useEffect(() => { fetchListings(); }, [fetchListings]);

    const bulkAction = async (action: string) => {
        await fetch('/api/admin/listings/bulk-action', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: selectedIds, action }),
        });
        toast.success(`${action} applied to ${selectedIds.length} listing(s)`);
        setSelectedIds([]);
        fetchListings();
    };

    const exportCSV = () => {
        const ws = XLSX.utils.json_to_sheet(listings.map(l => ({
            ID: l.id, Title: l.title, Type: l.type, Make: l.make, Model: l.model,
            Year: l.year, Price: l.price, Mileage: l.mileage, Status: l.status,
            Seller: l.sellerName, VIN: l.vin, Location: l.location, Views: l.views,
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Listings');
        XLSX.writeFile(wb, 'listings-export.xlsx');
        toast.success('Export complete', { description: 'listings-export.xlsx downloaded' });
    };

    const columns: Column<Listing>[] = [
        {
            key: 'title', label: 'Vehicle', sortable: true,
            render: (row) => (
                <div className="flex items-center gap-3 min-w-[200px]">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        {row.type === 'car' ? <Car className="w-5 h-5 text-muted-foreground" /> : <Bike className="w-5 h-5 text-muted-foreground" />}
                    </div>
                    <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{row.title}</p>
                        <p className="text-xs text-muted-foreground">{row.vin}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'price', label: 'Price', sortable: true,
            render: (row) => <span className="font-semibold">${row.price.toLocaleString()}</span>,
        },
        {
            key: 'status', label: 'Status', sortable: true,
            render: (row) => (
                <Badge variant="secondary" className={cn('text-xs font-medium capitalize', statusColors[row.status])}>
                    {row.status}
                </Badge>
            ),
        },
        { key: 'sellerName', label: 'Seller', sortable: true },
        { key: 'location', label: 'Location', sortable: true },
        {
            key: 'views', label: 'Views', sortable: true,
            render: (row) => <span className="text-muted-foreground">{row.views.toLocaleString()}</span>,
        },
        {
            key: 'actions', label: '',
            render: (row) => (
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); setDetailListing(row); }}>
                    <Eye className="w-4 h-4" />
                </Button>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-heading text-2xl font-bold">Listings</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">Manage vehicle listings across the marketplace</p>
                </div>
                <Button onClick={exportCSV} variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export XLSX
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by title, make, model..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                        <SelectItem value="flagged">Flagged</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[130px]"><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="car">Cars</SelectItem>
                        <SelectItem value="bike">Bikes</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={listings}
                loading={loading}
                selectable
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                onRowClick={setDetailListing}
                bulkActions={
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => bulkAction('approve')}>
                            <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-red-600" onClick={() => bulkAction('reject')}>
                            <XCircle className="w-3.5 h-3.5" /> Reject
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => bulkAction('archive')}>
                            <Archive className="w-3.5 h-3.5" /> Archive
                        </Button>
                    </div>
                }
            />

            {/* Detail Drawer */}
            <Sheet open={!!detailListing} onOpenChange={(open) => !open && setDetailListing(null)}>
                <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                    {detailListing && (
                        <>
                            <SheetHeader>
                                <SheetTitle className="font-heading">{detailListing.title}</SheetTitle>
                                <SheetDescription>VIN: {detailListing.vin}</SheetDescription>
                            </SheetHeader>
                            <div className="mt-6 space-y-6">
                                {/* Status */}
                                <div className="flex items-center gap-3">
                                    <Badge variant="secondary" className={cn('capitalize', statusColors[detailListing.status])}>
                                        {detailListing.status}
                                    </Badge>
                                    {detailListing.badges.map(b => (
                                        <Badge key={b} variant="outline" className="text-xs border-[#C9A14A]/50 text-[#C9A14A]">{b}</Badge>
                                    ))}
                                </div>

                                {/* Specs Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        ['Price', `$${detailListing.price.toLocaleString()}`],
                                        ['Year', detailListing.year],
                                        ['Mileage', `${detailListing.mileage.toLocaleString()} mi`],
                                        ['Fuel', detailListing.fuel],
                                        ['Transmission', detailListing.transmission],
                                        ['Color', detailListing.color],
                                        ['Location', detailListing.location],
                                        ['Seller', detailListing.sellerName],
                                        ['Views', detailListing.views.toLocaleString()],
                                        ['Inquiries', detailListing.inquiries],
                                    ].map(([label, val]) => (
                                        <div key={String(label)}>
                                            <p className="text-xs text-muted-foreground">{label}</p>
                                            <p className="text-sm font-medium">{val}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Flag reason */}
                                {detailListing.flagReason && (
                                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
                                        <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">Flag Reason</p>
                                        <p className="text-sm text-red-600 dark:text-red-300">{detailListing.flagReason}</p>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                    {detailListing.status === 'pending' && (
                                        <Button
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
                                            onClick={() => { toast.success('Listing approved'); setDetailListing(null); fetchListings(); }}
                                        >
                                            <CheckCircle className="w-4 h-4" /> Approve
                                        </Button>
                                    )}
                                    {detailListing.status !== 'archived' && (
                                        <Button variant="outline" className="gap-1.5 text-red-600" onClick={() => { toast.success('Listing rejected'); setDetailListing(null); fetchListings(); }}>
                                            <XCircle className="w-4 h-4" /> Reject
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}
