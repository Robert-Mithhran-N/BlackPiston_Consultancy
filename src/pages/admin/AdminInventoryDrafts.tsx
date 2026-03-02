import { useState, useEffect, useCallback } from "react";
import { Search, Edit, Rocket, Eye, Trash2 } from "lucide-react";
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
    images: string[];
    published: boolean;
    status: string;
    acquisitionPrice?: number;
    createdAt: string;
}

const AdminInventoryDrafts = () => {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editPrice, setEditPrice] = useState("");

    const fetchDrafts = useCallback(async () => {
        setLoading(true);
        const params = new URLSearchParams({ published: "false" });
        if (search) params.set("search", search);
        const res = await fetch(`/api/admin/inventory?${params}`);
        const data = await res.json();
        setItems(data.data || []);
        setLoading(false);
    }, [search]);

    useEffect(() => { fetchDrafts(); }, [fetchDrafts]);

    const publishItem = async (id: string, price?: number) => {
        await fetch(`/api/admin/inventory/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ published: true, ...(price ? { price } : {}) }),
        });
        setEditingId(null);
        fetchDrafts();
    };

    const updatePrice = async (id: string) => {
        if (!editPrice) return;
        await fetch(`/api/admin/inventory/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: Number(editPrice) }),
        });
        setEditingId(null);
        setEditPrice("");
        fetchDrafts();
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-heading text-2xl font-bold text-foreground">Inventory Drafts</h1>
                <p className="text-sm text-muted-foreground mt-1">Acquired vehicles awaiting preparation and publishing</p>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    placeholder="Search drafts..."
                    className="w-full h-10 pl-10 pr-4 border border-border rounded-lg text-sm bg-card focus:ring-2 focus:ring-[#D4B06A]/50 focus:outline-none"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {/* Grid */}
            {loading ? (
                <p className="text-sm text-muted-foreground text-center py-12">Loading drafts...</p>
            ) : items.length === 0 ? (
                <div className="text-center py-16 bg-card border border-border rounded-xl">
                    <p className="text-muted-foreground mb-3">No draft vehicles</p>
                    <p className="text-xs text-muted-foreground">Approve purchase requests to add vehicles here, or create manually.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map(item => (
                        <div key={item.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-luxury transition-shadow">
                            {/* Image */}
                            <div className="aspect-video bg-muted relative overflow-hidden">
                                {item.images?.[0] ? (
                                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No image</div>
                                )}
                                <span className="absolute top-2 left-2 px-2 py-1 rounded-full text-[10px] font-semibold bg-yellow-100 text-yellow-800">
                                    Draft
                                </span>
                            </div>
                            {/* Details */}
                            <div className="p-4 space-y-3">
                                <div>
                                    <h3 className="font-heading text-sm font-bold text-foreground truncate">{item.title}</h3>
                                    <p className="text-xs text-muted-foreground">{item.mileage?.toLocaleString()} mi · {item.color}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Listing Price</p>
                                        {editingId === item.id ? (
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <span className="text-xs">£</span>
                                                <input
                                                    type="number"
                                                    className="w-24 h-7 border border-border rounded px-2 text-sm focus:ring-1 focus:ring-[#D4B06A] focus:outline-none"
                                                    value={editPrice}
                                                    onChange={e => setEditPrice(e.target.value)}
                                                    autoFocus
                                                />
                                                <button onClick={() => updatePrice(item.id)} className="text-xs text-[#0F3D2E] font-medium">Save</button>
                                            </div>
                                        ) : (
                                            <p className="font-heading text-lg font-bold text-[#D4B06A]">£{item.price?.toLocaleString()}</p>
                                        )}
                                    </div>
                                    {item.acquisitionPrice && (
                                        <div className="text-right">
                                            <p className="text-xs text-muted-foreground">Acquired at</p>
                                            <p className="text-sm font-medium text-foreground">£{item.acquisitionPrice.toLocaleString()}</p>
                                        </div>
                                    )}
                                </div>
                                {/* Actions */}
                                <div className="flex gap-2 pt-2 border-t border-border">
                                    <Button
                                        size="sm"
                                        className="flex-1 h-8 text-xs bg-[#C9A14A] text-[#111111] hover:bg-[#C49A52]"
                                        onClick={() => publishItem(item.id, item.price)}
                                    >
                                        <Rocket className="w-3 h-3 mr-1" /> Publish
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 w-8 p-0"
                                        onClick={() => { setEditingId(item.id); setEditPrice(String(item.price || "")); }}
                                    >
                                        <Edit className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminInventoryDrafts;
