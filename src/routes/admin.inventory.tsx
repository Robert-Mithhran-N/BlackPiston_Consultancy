import { createFileRoute, Link } from "@tanstack/react-router";
import { vehicles } from "@/data/mock";
import { Edit2, Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/inventory")({
  component: AdminInventory,
});

function AdminInventory() {
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
            {vehicles.map((v) => (
              <tr key={v.id} className="bg-card transition hover:bg-surface-elevated">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img src={v.image} alt="" className="h-12 w-16 rounded-md object-cover" />
                    <div>
                      <div className="font-medium">{v.name}</div>
                      <div className="text-xs text-muted-foreground">{v.brand}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{v.type}</td>
                <td className="px-5 py-4 text-muted-foreground">{v.year}</td>
                <td className="px-5 py-4 font-display text-base text-gold">${v.price.toLocaleString()}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-mono uppercase text-emerald-300">Listed</span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="inline-flex gap-2">
                    <button className="grid h-8 w-8 place-items-center rounded-full border border-border/60 hover:border-gold hover:text-gold">
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button className="grid h-8 w-8 place-items-center rounded-full border border-border/60 hover:border-destructive hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
