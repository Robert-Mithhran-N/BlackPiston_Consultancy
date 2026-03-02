import { useState, useEffect, useCallback } from "react";
import { Search, Eye, CheckCircle, XCircle, Phone, Clock, ChevronRight, X, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SellRequest {
    id: string;
    name: string;
    email: string;
    phone: string;
    vehicle: {
        type: string; make: string; model: string; year: number;
        vin?: string; mileage: number; fuel: string; transmission: string;
        color: string; condition: string; accidentHistory: boolean; serviceHistory: boolean;
    };
    photos: string[];
    askingPrice: number;
    notes: string;
    status: string;
    adminNotes?: string;
    acquisitionPrice?: number;
    createdAt: string;
}

const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    contacted: "bg-blue-100 text-blue-800",
    approved: "bg-[#0F3D2E]/10 text-[#0F3D2E]",
    rejected: "bg-red-100 text-red-800",
};

const AdminPurchaseRequests = () => {
    const [requests, setRequests] = useState<SellRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selected, setSelected] = useState<SellRequest | null>(null);
    const [contactModal, setContactModal] = useState(false);

    const fetchRequests = useCallback(async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (statusFilter !== "all") params.set("status", statusFilter);
        if (search) params.set("search", search);
        const res = await fetch(`/api/admin/sell-requests?${params}`);
        const data = await res.json();
        setRequests(data.data || []);
        setLoading(false);
    }, [statusFilter, search]);

    useEffect(() => { fetchRequests(); }, [fetchRequests]);

    const updateStatus = async (id: string, status: string, extra: Record<string, unknown> = {}) => {
        await fetch(`/api/admin/sell-requests/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status, ...extra }),
        });
        fetchRequests();
        if (selected?.id === id) setSelected(null);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-heading text-2xl font-bold text-foreground">Purchase Requests</h1>
                <p className="text-sm text-muted-foreground mt-1">Review and manage vehicle sell requests from users</p>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        placeholder="Search by name, email, or vehicle..."
                        className="w-full h-10 pl-10 pr-4 border border-border rounded-lg text-sm bg-card focus:ring-2 focus:ring-[#D4B06A]/50 focus:outline-none"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="h-10 border border-border rounded-lg px-3 text-sm bg-card focus:ring-2 focus:ring-[#D4B06A]/50"
                >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-muted/30">
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Request</th>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Vehicle</th>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Asking</th>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                            <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="text-center py-12 text-muted-foreground">Loading...</td></tr>
                        ) : requests.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-12 text-muted-foreground">No requests found</td></tr>
                        ) : requests.map(req => (
                            <tr key={req.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => setSelected(req)}>
                                <td className="px-4 py-3">
                                    <div className="font-medium text-foreground">{req.name}</div>
                                    <div className="text-xs text-muted-foreground">{req.id} · {new Date(req.createdAt).toLocaleDateString()}</div>
                                </td>
                                <td className="px-4 py-3 hidden md:table-cell">
                                    <div className="text-foreground">{req.vehicle.year} {req.vehicle.make} {req.vehicle.model}</div>
                                    <div className="text-xs text-muted-foreground">{req.vehicle.mileage?.toLocaleString()} mi · {req.vehicle.condition}</div>
                                </td>
                                <td className="px-4 py-3 hidden lg:table-cell font-semibold text-foreground">
                                    £{req.askingPrice?.toLocaleString()}
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[req.status] || "bg-muted text-muted-foreground"}`}>
                                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <ChevronRight className="w-4 h-4 text-muted-foreground inline" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Detail Drawer */}
            {selected && (
                <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelected(null)}>
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="relative w-full max-w-lg bg-card h-full overflow-y-auto shadow-luxury-lg" onClick={e => e.stopPropagation()}>
                        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
                            <h2 className="font-heading text-lg font-bold">Request {selected.id}</h2>
                            <button onClick={() => setSelected(null)} className="p-1 hover:bg-muted rounded"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Contact */}
                            <div>
                                <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Contact</h3>
                                <div className="space-y-1 text-sm">
                                    <p className="font-medium text-foreground">{selected.name}</p>
                                    <p className="text-muted-foreground flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{selected.email}</p>
                                    <p className="text-muted-foreground flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{selected.phone}</p>
                                </div>
                            </div>
                            {/* Vehicle */}
                            <div>
                                <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Vehicle Details</h3>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    {[
                                        ["Type", selected.vehicle.type],
                                        ["Make", selected.vehicle.make],
                                        ["Model", selected.vehicle.model],
                                        ["Year", selected.vehicle.year],
                                        ["Mileage", `${selected.vehicle.mileage?.toLocaleString()} mi`],
                                        ["Fuel", selected.vehicle.fuel],
                                        ["Transmission", selected.vehicle.transmission],
                                        ["Colour", selected.vehicle.color],
                                        ["Condition", selected.vehicle.condition],
                                        ["VIN", selected.vehicle.vin || "—"],
                                        ["Accidents", selected.vehicle.accidentHistory ? "Yes" : "No"],
                                        ["Service History", selected.vehicle.serviceHistory ? "Full" : "None"],
                                    ].map(([label, val]) => (
                                        <div key={String(label)}>
                                            <p className="text-xs text-muted-foreground">{label}</p>
                                            <p className="font-medium text-foreground">{String(val)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Price & Status */}
                            <div className="flex items-center justify-between py-3 px-4 bg-muted/30 rounded-lg">
                                <div>
                                    <p className="text-xs text-muted-foreground">Asking Price</p>
                                    <p className="font-heading text-xl font-bold text-[#D4B06A]">£{selected.askingPrice?.toLocaleString()}</p>
                                </div>
                                <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${statusColors[selected.status]}`}>
                                    {selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
                                </span>
                            </div>
                            {/* Notes */}
                            {selected.notes && (
                                <div>
                                    <h3 className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Notes</h3>
                                    <p className="text-sm text-foreground">{selected.notes}</p>
                                </div>
                            )}
                            {/* Actions */}
                            <div className="space-y-2 pt-4 border-t border-border">
                                {selected.status === "pending" && (
                                    <>
                                        <Button className="w-full h-10 bg-[#0F3D2E] text-white hover:bg-[#0B2E22]" onClick={() => updateStatus(selected.id, "contacted")}>
                                            <Phone className="w-4 h-4 mr-2" /> Mark as Contacted
                                        </Button>
                                        <Button className="w-full h-10 bg-[#C9A14A] text-[#111111] hover:bg-[#C49A52]" onClick={() => updateStatus(selected.id, "approved", { acquisitionPrice: selected.askingPrice * 0.85 })}>
                                            <CheckCircle className="w-4 h-4 mr-2" /> Approve for Acquisition
                                        </Button>
                                        <Button className="w-full h-10 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200" onClick={() => updateStatus(selected.id, "rejected")}>
                                            <XCircle className="w-4 h-4 mr-2" /> Reject
                                        </Button>
                                    </>
                                )}
                                {selected.status === "contacted" && (
                                    <>
                                        <Button className="w-full h-10 bg-[#C9A14A] text-[#111111] hover:bg-[#C49A52]" onClick={() => updateStatus(selected.id, "approved", { acquisitionPrice: selected.askingPrice * 0.85 })}>
                                            <CheckCircle className="w-4 h-4 mr-2" /> Approve for Acquisition
                                        </Button>
                                        <Button className="w-full h-10 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200" onClick={() => updateStatus(selected.id, "rejected")}>
                                            <XCircle className="w-4 h-4 mr-2" /> Reject
                                        </Button>
                                    </>
                                )}
                                {(selected.status === "approved" || selected.status === "rejected") && (
                                    <p className="text-sm text-muted-foreground text-center py-2">
                                        This request has been {selected.status}. {selected.status === "approved" ? "Check Inventory Drafts." : ""}
                                    </p>
                                )}
                                <Button variant="outline" className="w-full h-10" onClick={() => setContactModal(true)}>
                                    <MessageSquare className="w-4 h-4 mr-2" /> Send Message
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Contact Modal */}
            {contactModal && selected && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center" onClick={() => setContactModal(false)}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative bg-card rounded-xl p-6 w-full max-w-md shadow-luxury-lg" onClick={e => e.stopPropagation()}>
                        <h3 className="font-heading text-lg font-bold mb-4">Contact Owner</h3>
                        <p className="text-sm text-muted-foreground mb-3">Send a message to {selected.name}</p>
                        <textarea
                            rows={4}
                            className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-card focus:ring-2 focus:ring-[#D4B06A]/50 focus:outline-none resize-none"
                            defaultValue={`Hi ${selected.name},\n\nThank you for your interest in selling your ${selected.vehicle.year} ${selected.vehicle.make} ${selected.vehicle.model}. We'd like to discuss the acquisition further.\n\nBest regards,\nBlackPiston Acquisitions Team`}
                        />
                        <div className="flex gap-2 mt-4">
                            <Button variant="outline" className="flex-1 h-10" onClick={() => setContactModal(false)}>Cancel</Button>
                            <Button className="flex-1 h-10 bg-[#C9A14A] text-[#111111] hover:bg-[#C49A52]" onClick={() => { setContactModal(false); updateStatus(selected.id, "contacted"); }}>
                                Send & Mark Contacted
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPurchaseRequests;
