import { useState, useEffect, useCallback } from "react";
import { Search, Eye, EyeOff, ExternalLink, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InventoryItem {
    id: string;
    title: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    color: string;
    location: string;
    images: string[];
    published: boolean;
    status: string;
    badges: string[];
    publishedAt: string | null;
    createdAt: string;
}

const statusLabel: Record<string, { text: string; cls: string }> = {
    available: { text: "Available", cls: "bg-[#0F3D2E]/10 text-[#0F3D2E]" },
    reserved: { text: "Reserved", cls: "bg-blue-100 text-blue-800" },
    sold: { text: "Sold", cls: "bg-[#D4B06A]/20 text-[#D4B06A]" },
};

const AdminInventoryPublished = () => {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchPublished = useCallback(async () => {
        setLoading(true);
        const params = new URLSearchParams({ published: "true" });
        if (search) params.set("search", search);
        const res = await fetch(`/api/admin/inventory?${params}`);
        const data = await res.json();
        setItems(data.data || []);
        setLoading(false);
    }, [search]);

    useEffect(() => { fetchPublished(); }, [fetchPublished]);

    const updateItem = async (id: string, body: Record<string, unknown>) => {
        await fetch(`/api/admin/inventory/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        fetchPublished();
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-heading text-2xl font-bold text-foreground">Published Inventory</h1>
                <p className="text-sm text-muted-foreground mt-1">Live vehicles visible to the public on the marketplace</p>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    placeholder="Search published inventory..."
                    className="w-full h-10 pl-10 pr-4 border border-border rounded-lg text-sm bg-card focus:ring-2 focus:ring-[#D4B06A]/50 focus:outline-none"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-muted/30">
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Vehicle</th>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Location</th>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Price</th>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Published</th>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                            <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} className="text-center py-12 text-muted-foreground">Loading...</td></tr>
                        ) : items.length === 0 ? (
                            <tr><td colSpan={6} className="text-center py-12 text-muted-foreground">No published vehicles</td></tr>
                        ) : items.map(item => (
                            <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                                            {item.images?.[0] && <img src={item.images[0]} alt="" className="w-full h-full object-cover" />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground truncate max-w-[200px]">{item.title}</p>
                                            <p className="text-xs text-muted-foreground">{item.mileage?.toLocaleString()} mi · {item.color}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{item.location}</td>
                                <td className="px-4 py-3 font-semibold text-foreground">£{item.price?.toLocaleString()}</td>
                                <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">
                                    {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "—"}
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusLabel[item.status]?.cls || "bg-muted text-muted-foreground"}`}>
                                        {statusLabel[item.status]?.text || item.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-end gap-1">
                                        {item.status === "available" && (
                                            <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => updateItem(item.id, { status: "sold" })}>
                                                <Tag className="w-3 h-3" /> Sold
                                            </Button>
                                        )}
                                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => updateItem(item.id, { published: false, status: "draft" })}>
                                            <EyeOff className="w-3 h-3" /> Unpublish
                                        </Button>
                                        <a href={`/vehicle/${item.id}`} target="_blank" rel="noreferrer">
                                            <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                                                <ExternalLink className="w-3 h-3" />
                                            </Button>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminInventoryPublished;
