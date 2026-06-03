import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { TrendingUp, Eye, DollarSign, Users } from "lucide-react";
import { vehicles, enquiries } from "@/data/mock";
import { Counter } from "@/components/site/Counter";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const kpis = [
    { Icon: DollarSign, label: "Revenue (MTD)", value: 4280000, prefix: "$" },
    { Icon: Eye, label: "Showroom visits", value: 1842 },
    { Icon: Users, label: "Active enquiries", value: 37 },
    { Icon: TrendingUp, label: "Conversion", value: 18, suffix: "%" },
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">Overview</div>
        <h1 className="mt-2 font-display text-4xl">Good evening, Léa.</h1>
        <p className="mt-1 text-sm text-muted-foreground">Here's the consultancy at a glance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-border/50 bg-surface p-5"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/10 text-gold">
                <k.Icon className="h-4 w-4" />
              </div>
              <span className="text-xs text-emerald-400">+12%</span>
            </div>
            <div className="mt-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{k.label}</div>
            <div className="mt-1 font-display text-3xl">
              {k.prefix}<Counter to={k.value} suffix={k.suffix ?? ""} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/50 bg-surface p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl">Recent enquiries</h2>
            <button className="text-xs text-gold">View all</button>
          </div>
          <div className="space-y-2">
            {enquiries.map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-surface-elevated">
                <div>
                  <div className="font-medium">{e.name}</div>
                  <div className="text-xs text-muted-foreground">{e.vehicle}</div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill status={e.status} />
                  <span className="font-mono text-xs text-muted-foreground">{e.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/50 bg-surface p-6">
          <h2 className="mb-4 font-display text-xl">Top vehicles</h2>
          <div className="space-y-3">
            {vehicles.slice(0, 4).map((v, i) => (
              <div key={v.id} className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gold/10 font-mono text-xs text-gold">0{i + 1}</div>
                <img src={v.image} alt="" className="h-10 w-14 rounded-md object-cover" />
                <div className="flex-1 truncate">
                  <div className="truncate text-sm font-medium">{v.name}</div>
                  <div className="text-xs text-muted-foreground">${v.price.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    New: "bg-gold/15 text-gold",
    Contacted: "bg-blue-500/15 text-blue-300",
    "Test drive": "bg-emerald-500/15 text-emerald-300",
    Negotiation: "bg-orange-500/15 text-orange-300",
    Closed: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-widest ${map[status] ?? "bg-muted"}`}>
      {status}
    </span>
  );
}
