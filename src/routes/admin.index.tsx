import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { TrendingUp, Eye, DollarSign, Users, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getAdminVehicles, getEnquiries, type ApiVehicle, type ApiEnquiry } from "@/lib/api";
import { getAdminInfo } from "@/lib/auth";
import { Counter } from "@/components/site/Counter";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const [vehicles, setVehicles] = useState<ApiVehicle[]>([]);
  const [enquiries, setEnquiries] = useState<ApiEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const admin = getAdminInfo();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehicleRes, enquiryRes] = await Promise.all([
          getAdminVehicles(),
          getEnquiries(),
        ]);
        setVehicles(vehicleRes.data);
        setEnquiries(enquiryRes.data);
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalValue = vehicles.reduce((sum, v) => sum + v.price, 0);
  const activeCount = vehicles.filter((v) => v.isActive).length;
  const newEnquiries = enquiries.filter((e) => e.status === "New").length;

  const kpis = [
    { Icon: DollarSign, label: "Portfolio value", value: totalValue, prefix: "$" },
    { Icon: Eye, label: "Active listings", value: activeCount },
    { Icon: Users, label: "Enquiries", value: enquiries.length },
    { Icon: TrendingUp, label: "New enquiries", value: newEnquiries },
  ];

  const firstName = admin?.name?.split(" ")[0] || "Admin";

  return (
    <div>
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">Overview</div>
        <h1 className="mt-2 font-display text-4xl">Welcome, {firstName}.</h1>
        <p className="mt-1 text-sm text-muted-foreground">Here's the consultancy at a glance.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : (
        <>
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
                </div>
                <div className="mt-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{k.label}</div>
                <div className="mt-1 font-display text-3xl">
                  {k.prefix}<Counter to={k.value} suffix="" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-border/50 bg-surface p-6 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl">Recent enquiries</h2>
                <Link to="/admin/enquiries" className="text-xs text-gold">View all</Link>
              </div>
              <div className="space-y-2">
                {enquiries.slice(0, 5).map((e) => (
                  <div key={e._id} className="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-surface-elevated">
                    <div>
                      <div className="font-medium">{e.name}</div>
                      <div className="text-xs text-muted-foreground">{e.vehicleName || "General enquiry"}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusPill status={e.status} />
                      <span className="font-mono text-xs text-muted-foreground">
                        {new Date(e.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
                {enquiries.length === 0 && (
                  <div className="py-6 text-center text-sm text-muted-foreground">No enquiries yet.</div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-surface p-6">
              <h2 className="mb-4 font-display text-xl">Top vehicles</h2>
              <div className="space-y-3">
                {vehicles.slice(0, 4).map((v, i) => {
                  const imgUrl = v.images?.[0]?.url || "";
                  return (
                    <div key={v._id} className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-gold/10 font-mono text-xs text-gold">0{i + 1}</div>
                      {imgUrl ? (
                        <img src={imgUrl} alt="" className="h-10 w-14 rounded-md object-cover" />
                      ) : (
                        <div className="h-10 w-14 rounded-md bg-surface-elevated" />
                      )}
                      <div className="flex-1 truncate">
                        <div className="truncate text-sm font-medium">{v.title}</div>
                        <div className="text-xs text-muted-foreground">${v.price.toLocaleString()}</div>
                      </div>
                    </div>
                  );
                })}
                {vehicles.length === 0 && (
                  <div className="py-6 text-center text-sm text-muted-foreground">No vehicles yet.</div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
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
