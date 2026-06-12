import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/inventory", label: "Inventory" },
  { to: "/about", label: "Atelier" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.85]);
  const blur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(18px)"]);
  const { location } = useRouterState();

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className="absolute inset-0 -z-10 bg-header-bg border-b border-border/40"
      />
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gold/30 bg-background/50 p-0.5 shadow-gold">
            <img src={logo} alt="BlackPiston Logo" className="h-full w-full object-contain rounded-full" />
            <div className="absolute inset-0 rounded-full ring-1 ring-gold/40 transition group-hover:ring-gold" />
          </div>
          <div className="leading-none">
            <div className="font-display text-lg tracking-wide uppercase font-bold text-gradient-gold">BlackPiston</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
              Consultancy
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = l.to === "/" ? location.pathname === "/" : location.pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className="group relative px-4 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground"
              >
                {l.label}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-gold to-transparent transition-transform duration-500 group-hover:scale-x-100 ${
                    active ? "scale-x-100" : ""
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/contact"
            className="rounded-full bg-gradient-to-r from-gold to-gold-soft px-5 py-2.5 text-sm font-semibold text-background shadow-gold transition hover:brightness-110"
          >
            Book a viewing
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-full border border-border/60 bg-glass lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="bg-glass-strong border-t border-border/40 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-medium hover:bg-surface-elevated"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-full bg-gradient-to-r from-gold to-gold-soft px-5 py-3 text-center text-sm font-semibold text-background"
              >
                Book a viewing
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
