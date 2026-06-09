import { createFileRoute, Link } from "@tanstack/react-router";
import { Edit2, Trash2, Plus, Star, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getAdminVehicles, deleteVehicle, toggleFeatured, toggleStatus, type ApiVehicle } from "@/lib/api";

export const Route = createFileRoute("/admin/inventory")({
  component: AdminInventory,
});

function AdminInventory() {
  const [vehicles, setVehicles] = useState<ApiVehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await getAdminVehicles();
      setVehicles(res.data);
    } catch (err) {
      console.error("Failed to fetch vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVehicles(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteVehicle(id);
      setVehicles((prev) => prev.filter((v) => v._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete vehicle.");
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      const res = await toggleFeatured(id);
      setVehicles((prev) => prev.map((v) => (v._id === id ? res.data : v)));
    } catch (err: any) {
      alert(err.message || "Failed to toggle featured.");
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const res = await toggleStatus(id);
      setVehicles((prev) => prev.map((v) => (v._id === id ? res.data : v)));
    } catch (err: any) {
      alert(err.message || "Failed to toggle status.");
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">Inventory</div>
          <h1 className="mt-2 font-display text-4xl">Manage vehicles</h1>
        </div>
        <Link to="/admin/new" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-soft px-5 py-2.5 text-sm font-semibold text-background shadow-gold">
          <Plus className="h-4 w-4" /> Add vehicle
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : vehicles.length === 0 ? (
        <div className="rounded-2xl border border-border/50 bg-surface p-12 text-center text-muted-foreground">
          No vehicles yet. Add your first vehicle to get started.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/50">
          <table className="w-full text-sm">
            <thead className="bg-surface text-left text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Vehicle</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Year</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {vehicles.map((v) => {
                const imgUrl = v.images?.[0]?.url || "";
                return (
                  <tr key={v._id} className="bg-card transition hover:bg-surface-elevated">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {imgUrl ? (
                          <img src={imgUrl} alt="" className="h-12 w-16 rounded-md object-cover" />
                        ) : (
                          <div className="flex h-12 w-16 items-center justify-center rounded-md bg-surface text-[10px] text-muted-foreground">No img</div>
                        )}
                        <div>
                          <div className="font-medium">{v.title}</div>
                          <div className="text-xs text-muted-foreground">{v.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{v.type}</td>
                    <td className="px-5 py-4 text-muted-foreground">{v.year}</td>
                    <td className="px-5 py-4 font-display text-base text-gold">${v.price.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-mono uppercase ${
                        v.isActive
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {v.isActive ? "Listed" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => handleToggleFeatured(v._id)}
                          title={v.featured ? "Unfeature" : "Feature"}
                          className={`grid h-8 w-8 place-items-center rounded-full border transition ${
                            v.featured
                              ? "border-gold bg-gold/15 text-gold"
                              : "border-border/60 hover:border-gold hover:text-gold"
                          }`}
                        >
                          <Star className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(v._id)}
                          title={v.isActive ? "Hide" : "Show"}
                          className="grid h-8 w-8 place-items-center rounded-full border border-border/60 hover:border-gold hover:text-gold"
                        >
                          {v.isActive ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                        <button
                          onClick={() => handleDelete(v._id, v.title)}
                          className="grid h-8 w-8 place-items-center rounded-full border border-border/60 hover:border-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
