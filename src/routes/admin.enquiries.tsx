import { createFileRoute } from "@tanstack/react-router";
import { enquiries } from "@/data/mock";

export const Route = createFileRoute("/admin/enquiries")({
  component: AdminEnquiries,
});

function AdminEnquiries() {
  return (
    <div>
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">Inbox</div>
        <h1 className="mt-2 font-display text-4xl">Enquiries</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {enquiries.map((e) => (
          <div key={e.id} className="rounded-2xl border border-border/50 bg-surface p-6 transition hover:border-gold/40">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-widest text-gold">{e.id}</div>
              <span className="rounded-full bg-gold/15 px-3 py-1 text-[10px] font-mono uppercase text-gold">{e.status}</span>
            </div>
            <div className="mt-4 font-display text-2xl">{e.name}</div>
            <div className="text-sm text-muted-foreground">Interested in {e.vehicle}</div>
            <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground">
              <span className="font-mono">{e.date}</span>
              <button className="text-gold">Open →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
