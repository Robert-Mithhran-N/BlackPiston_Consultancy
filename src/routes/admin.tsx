import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { LayoutDashboard, Car, Inbox, Plus, LogOut, Search, Bell } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Aurum" },
      { name: "description", content: "Aurum atelier admin console (mock)." },
    ],
  }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { to: "/admin/inventory", label: "Inventory", Icon: Car },
  { to: "/admin/new", label: "Add vehicle", Icon: Plus },
  { to: "/admin/enquiries", label: "Enquiries", Icon: Inbox },
  { to: "/admin/login", label: "Login", Icon: LogOut },
];

function AdminLayout() {
  const { location } = useRouterState();

  return (
    <div className="min-h-dvh bg-background pt-24">
      <div className="mx-auto max-w-[1500px] px-4 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="sticky top-24 h-fit rounded-3xl border border-border/50 bg-glass p-4">
            <div className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
              Aurum · Admin
            </div>
            <nav className="mt-2 space-y-1">
              {nav.map((n) => {
                const active = n.exact ? location.pathname === n.to : location.pathname.startsWith(n.to);
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                      active ? "bg-gold/10 text-gold" : "text-foreground/70 hover:bg-surface-elevated hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="admin-active"
                        className="absolute inset-0 rounded-xl ring-1 ring-gold/40"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <n.Icon className="relative h-4 w-4" />
                    <span className="relative">{n.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main */}
          <div className="min-h-[70vh] rounded-3xl border border-border/50 bg-card p-6 md:p-10">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-2 rounded-full border border-border/60 bg-glass px-4 py-2.5">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input placeholder="Search anything…" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60" />
              </div>
              <button className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-glass">
                <Bell className="h-4 w-4" />
              </button>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-soft text-background font-display text-sm font-bold">
                LM
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
