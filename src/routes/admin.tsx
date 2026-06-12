import { createFileRoute, Outlet, Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { LayoutDashboard, Car, Inbox, Plus, LogOut, Search, Bell, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { isAuthenticated, getAdminInfo, clearAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — BlackPiston" },
      { name: "description", content: "BlackPiston Consultancy admin console." },
    ],
  }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { to: "/admin/inventory", label: "Inventory", Icon: Car },
  { to: "/admin/new", label: "Add vehicle", Icon: Plus },
  { to: "/admin/enquiries", label: "Enquiries", Icon: Inbox },
];

function AdminLayout() {
  const { location } = useRouterState();
  const navigate = useNavigate();
  
  const publicPaths = [
    "/admin/login",
    "/admin/forgot-password",
    "/admin/verify-otp",
    "/admin/reset-password"
  ];
  const isPublicPage = publicPaths.includes(location.pathname);
  const [checked, setChecked] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    try {
      const activeTheme = localStorage.getItem("bp_theme") === "light" ? "light" : "dark";
      setTheme(activeTheme);
    } catch (e) {}
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      localStorage.setItem("bp_theme", nextTheme);
      const root = window.document.documentElement;
      if (nextTheme === "light") {
        root.classList.remove("dark");
        root.classList.add("light");
      } else {
        root.classList.remove("light");
        root.classList.add("dark");
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (!isPublicPage && !isAuthenticated()) {
      navigate({ to: "/admin/login" });
    }
    setChecked(true);
  }, [isPublicPage, navigate]);

  if (isPublicPage) {
    return (
      <div className="min-h-dvh w-full bg-background flex items-center justify-center p-4">
        <Outlet />
      </div>
    );
  }

  if (!checked) return null;

  const admin = getAdminInfo();
  const initials = admin?.name
    ? admin.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "BP";

  const handleLogout = () => {
    clearAuth();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="min-h-dvh bg-background pt-8 pb-12">
      <div className="mx-auto max-w-[1500px] px-4 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="sticky top-8 h-fit rounded-3xl border border-border/50 bg-glass p-4">
            <div className="flex items-center gap-2.5 px-3 py-2 border-b border-border/40 pb-4 mb-4">
              <img src={logo} alt="BlackPiston Logo" className="h-6 w-6 object-contain rounded-full" />
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold font-bold">
                BlackPiston · Admin
              </div>
            </div>
            <nav className="space-y-1">
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
              <button
                onClick={handleLogout}
                className="relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground/70 hover:bg-surface-elevated hover:text-foreground transition"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
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
              <button
                onClick={toggleTheme}
                className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-glass text-foreground hover:text-gold transition-colors focus:outline-none"
                title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
              </button>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-soft text-background font-display text-sm font-bold">
                {initials}
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
