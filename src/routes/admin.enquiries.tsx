import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { getEnquiries, deleteEnquiry, updateEnquiryStatus, type ApiEnquiry } from "@/lib/api";

export const Route = createFileRoute("/admin/enquiries")({
  component: AdminEnquiries,
});

const statuses = ["New", "Contacted", "Test drive", "Negotiation", "Closed"] as const;

function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<ApiEnquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await getEnquiries();
        setEnquiries(res.data);
      } catch (err) {
        console.error("Failed to fetch enquiries:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    try {
      await deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete enquiry.");
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await updateEnquiryStatus(id, status);
      setEnquiries((prev) => prev.map((e) => (e._id === id ? res.data : e)));
    } catch (err: any) {
      alert(err.message || "Failed to update status.");
    }
  };

  const statusMap: Record<string, string> = {
    New: "bg-gold/15 text-gold",
    Contacted: "bg-blue-500/15 text-blue-300",
    "Test drive": "bg-emerald-500/15 text-emerald-300",
    Negotiation: "bg-orange-500/15 text-orange-300",
    Closed: "bg-muted text-muted-foreground",
  };

  return (
    <div>
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">Inbox</div>
        <h1 className="mt-2 font-display text-4xl">Enquiries</h1>
        <p className="mt-1 text-sm text-muted-foreground">{enquiries.length} total enquiries</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : enquiries.length === 0 ? (
        <div className="rounded-2xl border border-border/50 bg-surface p-12 text-center text-muted-foreground">
          No enquiries yet. They'll appear here when visitors submit the contact form.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {enquiries.map((e) => (
            <div key={e._id} className="rounded-2xl border border-border/50 bg-surface p-6 transition hover:border-gold/40">
              <div className="flex items-center justify-between">
                <select
                  value={e.status}
                  onChange={(ev) => handleStatusChange(e._id, ev.target.value)}
                  className={`rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-widest outline-none cursor-pointer ${statusMap[e.status] ?? "bg-muted"}`}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s} className="bg-background text-foreground">{s}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleDelete(e._id)}
                  className="grid h-7 w-7 place-items-center rounded-full border border-border/40 text-muted-foreground hover:border-destructive hover:text-destructive transition"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
              <div className="mt-4 font-display text-2xl">{e.name}</div>
              {e.vehicleName && (
                <div className="text-sm text-muted-foreground">Interested in {e.vehicleName}</div>
              )}
              <div className="mt-2 text-xs text-muted-foreground">{e.email}</div>
              {e.phone && <div className="text-xs text-muted-foreground">{e.phone}</div>}
              <div className="mt-3 rounded-xl bg-background/50 p-3 text-sm text-foreground/80 max-h-24 overflow-y-auto">
                {e.message}
              </div>
              <div className="mt-4 border-t border-border/40 pt-3 text-xs text-muted-foreground font-mono">
                {new Date(e.createdAt).toLocaleDateString()} · {new Date(e.createdAt).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
