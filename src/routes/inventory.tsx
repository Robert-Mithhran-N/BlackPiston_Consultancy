import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, LayoutGrid, List, ArrowDownUp } from "lucide-react";
import { vehicles, type Vehicle } from "@/data/mock";
import { VehicleCard } from "@/components/site/VehicleCard";
import { Reveal } from "@/components/site/PageTransition";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory — Aurum" },
      { name: "description", content: "Browse the current Aurum collection of curated automobiles and motorcycles." },
      { property: "og:title", content: "Inventory — Aurum" },
      { property: "og:description", content: "Curated luxury vehicles, by appointment." },
    ],
  }),
  component: Inventory,
});

const tabs = ["All", "Cars", "Bikes"] as const;
const sorts = ["Featured", "Price: low → high", "Price: high → low", "Newest"] as const;

function Inventory() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [q, setQ] = useState("");
  const [maxPrice, setMaxPrice] = useState(300000);

  const filtered = useMemo(() => {
    let r: Vehicle[] = [...vehicles];
    if (tab === "Cars") r = r.filter((v) => v.category === "car");
    if (tab === "Bikes") r = r.filter((v) => v.category === "bike");
    if (q) r = r.filter((v) => (v.name + v.brand).toLowerCase().includes(q.toLowerCase()));
    r = r.filter((v) => v.price <= maxPrice);
    if (sort === "Price: low → high") r.sort((a, b) => a.price - b.price);
    if (sort === "Price: high → low") r.sort((a, b) => b.price - a.price);
    if (sort === "Newest") r.sort((a, b) => b.year - a.year);
    return r;
  }, [tab, sort, q, maxPrice]);

  return (
    <div className="bg-background pt-32">
      {/* Hero */}
      <section className="relative border-b border-border/40 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-radial-gold)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">The collection</div>
            <h1 className="mt-3 font-display text-6xl leading-[1] md:text-8xl">
              Inventory<span className="text-gradient-gold italic">.</span>
            </h1>
            <p className="mt-6 max-w-xl text-muted-foreground">
              Every vehicle is hand-selected, fully documented and ready for private viewing.
            </p>
          </Reveal>

          {/* Toolbar */}
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-border/60 bg-glass px-5 py-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by model or marque"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
              />
            </div>

            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-glass p-1">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative rounded-full px-4 py-2 text-xs font-mono uppercase tracking-widest transition ${
                    tab === t ? "text-background" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {tab === t && (
                    <motion.div
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-gold-soft"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative">{t}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-glass px-4 py-2.5 text-xs">
              <ArrowDownUp className="h-3.5 w-3.5 text-gold" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="bg-transparent text-xs outline-none"
              >
                {sorts.map((s) => <option key={s} className="bg-background">{s}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-1 rounded-full border border-border/60 bg-glass p-1">
              {[
                { v: "grid" as const, Icon: LayoutGrid },
                { v: "list" as const, Icon: List },
              ].map(({ v, Icon }) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`grid h-9 w-9 place-items-center rounded-full transition ${
                    view === v ? "bg-gold text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label={`${v} view`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="relative py-16">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[260px_1fr] lg:px-10">
          {/* Filter panel */}
          <aside className="space-y-6">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Refine
            </div>

            <div className="rounded-3xl border border-border/50 bg-glass p-6">
              <div className="text-xs font-medium">Max price</div>
              <div className="mt-1 font-display text-2xl text-gradient-gold">
                ${maxPrice.toLocaleString()}
              </div>
              <input
                type="range"
                min={20000}
                max={300000}
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-4 w-full accent-[oklch(0.78_0.13_80)]"
              />
            </div>

            <div className="space-y-2 rounded-3xl border border-border/50 bg-glass p-6">
              <div className="mb-2 text-xs font-medium">Body type</div>
              {["Coupe", "Sedan", "SUV", "Sport", "Adventure"].map((t) => (
                <label key={t} className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <input type="checkbox" className="accent-[oklch(0.78_0.13_80)]" /> {t}
                </label>
              ))}
            </div>

            <div className="space-y-2 rounded-3xl border border-border/50 bg-glass p-6">
              <div className="mb-2 text-xs font-medium">Fuel</div>
              {["Petrol", "Hybrid", "Electric", "Diesel"].map((t) => (
                <label key={t} className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <input type="checkbox" className="accent-[oklch(0.78_0.13_80)]" /> {t}
                </label>
              ))}
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="mb-6 flex items-center justify-between text-xs text-muted-foreground">
              <span>{filtered.length} vehicles</span>
              <span className="font-mono uppercase tracking-widest">Updated weekly</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={view + tab + sort}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={view === "grid" ? "grid gap-6 md:grid-cols-2 xl:grid-cols-3" : "space-y-5"}
              >
                {view === "grid"
                  ? filtered.map((v, i) => <VehicleCard key={v.id} v={v} index={i} />)
                  : filtered.map((v, i) => <ListRow key={v.id} v={v} index={i} />)}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="rounded-3xl border border-border/50 bg-glass p-12 text-center text-muted-foreground">
                No matches. Adjust your filters.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function ListRow({ v, index }: { v: Vehicle; index: number }) {
  return (
    <motion.a
      href={`/vehicles/${v.id}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="hover-lift flex flex-col gap-6 rounded-3xl border border-border/50 bg-card p-4 md:flex-row md:items-center"
    >
      <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl md:w-64">
        <img src={v.image} alt={v.name} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
      </div>
      <div className="flex-1 px-2">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{v.brand} · {v.year}</div>
        <h3 className="mt-1 font-display text-2xl">{v.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{v.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
          <span className="rounded-full bg-surface px-3 py-1">{v.power}</span>
          <span className="rounded-full bg-surface px-3 py-1">{v.acceleration}</span>
          <span className="rounded-full bg-surface px-3 py-1">{v.fuel}</span>
        </div>
      </div>
      <div className="px-2 text-right md:pr-6">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">From</div>
        <div className="font-display text-3xl text-gradient-gold">${v.price.toLocaleString()}</div>
      </div>
    </motion.a>
  );
}
