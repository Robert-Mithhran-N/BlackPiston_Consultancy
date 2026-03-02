import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';

export interface Column<T> {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (row: T) => React.ReactNode;
    className?: string;
}

interface DataTableProps<T extends { id: string }> {
    columns: Column<T>[];
    data: T[];
    loading?: boolean;
    selectable?: boolean;
    selectedIds?: string[];
    onSelectionChange?: (ids: string[]) => void;
    pageSize?: number;
    bulkActions?: React.ReactNode;
    emptyMessage?: string;
    onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id: string }>({
    columns, data, loading, selectable, selectedIds = [],
    onSelectionChange, pageSize = 10, bulkActions, emptyMessage = 'No data found',
    onRowClick,
}: DataTableProps<T>) {
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(0);

    const sorted = useMemo(() => {
        if (!sortKey) return data;
        return [...data].sort((a, b) => {
            const av = (a as Record<string, unknown>)[sortKey];
            const bv = (b as Record<string, unknown>)[sortKey];
            if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
            return sortDir === 'asc'
                ? String(av).localeCompare(String(bv))
                : String(bv).localeCompare(String(av));
        });
    }, [data, sortKey, sortDir]);

    const paginated = sorted.slice(page * pageSize, (page + 1) * pageSize);
    const totalPages = Math.ceil(data.length / pageSize);

    const allSelected = paginated.length > 0 && paginated.every(r => selectedIds.includes(r.id));

    const toggleAll = () => {
        if (!onSelectionChange) return;
        if (allSelected) {
            onSelectionChange(selectedIds.filter(id => !paginated.find(r => r.id === id)));
        } else {
            const newIds = [...new Set([...selectedIds, ...paginated.map(r => r.id)])];
            onSelectionChange(newIds);
        }
    };

    const toggleRow = (id: string) => {
        if (!onSelectionChange) return;
        onSelectionChange(
            selectedIds.includes(id) ? selectedIds.filter(i => i !== id) : [...selectedIds, id]
        );
    };

    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    if (loading) {
        return (
            <div className="bg-card rounded-xl border border-border shadow-luxury overflow-hidden">
                <div className="p-4 space-y-3">
                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-lg" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-xl border border-border shadow-luxury overflow-hidden">
            {/* Bulk action bar */}
            {selectedIds.length > 0 && bulkActions && (
                <div className="bg-[#0B2E22]/5 dark:bg-[#C9A14A]/10 border-b border-border px-4 py-2.5 flex items-center gap-3">
                    <span className="text-sm font-medium text-[#0B2E22] dark:text-[#C9A14A]">
                        {selectedIds.length} selected
                    </span>
                    {bulkActions}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm" role="table">
                    <thead>
                        <tr className="border-b border-border bg-muted/30">
                            {selectable && (
                                <th className="w-10 p-3">
                                    <Checkbox
                                        checked={allSelected}
                                        onCheckedChange={toggleAll}
                                        aria-label="Select all rows"
                                    />
                                </th>
                            )}
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={cn(
                                        'text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-3',
                                        col.sortable && 'cursor-pointer select-none hover:text-foreground transition-colors',
                                        col.className
                                    )}
                                    onClick={() => col.sortable && handleSort(col.key)}
                                    aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
                                >
                                    <div className="flex items-center gap-1">
                                        {col.label}
                                        {col.sortable && (
                                            sortKey === col.key
                                                ? (sortDir === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />)
                                                : <ChevronsUpDown className="w-3.5 h-3.5 opacity-40" />
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (selectable ? 1 : 0)} className="text-center py-12 text-muted-foreground">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            paginated.map((row) => (
                                <tr
                                    key={row.id}
                                    className={cn(
                                        'border-b border-border/50 hover:bg-muted/30 transition-colors',
                                        selectedIds.includes(row.id) && 'bg-[#0B2E22]/5 dark:bg-[#C9A14A]/5',
                                        onRowClick && 'cursor-pointer'
                                    )}
                                    onClick={() => onRowClick?.(row)}
                                >
                                    {selectable && (
                                        <td className="w-10 p-3" onClick={e => e.stopPropagation()}>
                                            <Checkbox
                                                checked={selectedIds.includes(row.id)}
                                                onCheckedChange={() => toggleRow(row.id)}
                                                aria-label={`Select row ${row.id}`}
                                            />
                                        </td>
                                    )}
                                    {columns.map((col) => (
                                        <td key={col.key} className={cn('p-3', col.className)}>
                                            {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '')}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                        Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, data.length)} of {data.length}
                    </p>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={page === 0}
                            onClick={() => setPage(p => p - 1)}
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Button
                                key={i}
                                variant={page === i ? 'default' : 'ghost'}
                                size="icon"
                                className={cn('h-8 w-8 text-xs', page === i && 'bg-[#0B2E22] text-[#C9A14A] hover:bg-[#0B2E22]/90')}
                                onClick={() => setPage(i)}
                            >
                                {i + 1}
                            </Button>
                        ))}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={page >= totalPages - 1}
                            onClick={() => setPage(p => p + 1)}
                            aria-label="Next page"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
