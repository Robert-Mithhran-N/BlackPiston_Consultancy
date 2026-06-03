import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Calendar, Gauge, Zap, Fuel, Cog, Palette, Phone, MessageCircle, Mail } from "lucide-react";
import { vehicles, type Vehicle } from "@/data/mock";
import { VehicleCard } from "@/components/site/VehicleCard";
import { Reveal } from "@/components/site/PageTransition";

export const Route = createFileRoute("/vehicles/$id")({
  loader: ({ params }): Vehicle => {
    const v = vehicles.find((x) => x.id === params.id);
    if (!v) throw notFound();
    return v;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Vehicle"} — BlackPiston` },
      { name: "description", content: loaderData?.tagline ?? "Premium vehicle detail." },
      { property: "og:title", content: `${loaderData?.name ?? "Vehicle"} — BlackPiston` },
      { property: "og:description", content: loaderData?.tagline ?? "" },
      { property: "og:image", content: loaderData?.image ?? "" },
    ],
  }),
  component: VehicleDetail,
  notFoundComponent: () => (
    <div className="grid min-h-dvh place-items-center pt-32 text-center">
      <div>
        <div className="font-display text-4xl">Vehicle not found</div>
        <Link to="/inventory" className="mt-6 inline-flex rounded-full bg-gold px-5 py-2.5 text-sm text-background">Back to inventory</Link>
      </div>
    </div>
  ),
});

function VehicleDetail() {
  const v = Route.useLoaderData() as Vehicle;
  const [active, setActive] = useState(0);
  const similar = vehicles.filter((x) => x.id !== v.id && x.category === v.category).slice(0, 3);

  return (
    <div className="bg-background pt-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Link to="/inventory" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-gold">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to inventory
        </Link>
      </div>

      {/* Hero gallery */}
      <section className="relative mt-8">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[16/11] overflow-hidden rounded-[2rem] border border-border/50 shadow-elegant"
            >
              <img src={v.gallery[active]} alt={v.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card/40 to-transparent" />
              <div className="absolute left-6 top-6 rounded-full bg-glass px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-gold">
                {v.brand} · {v.year}
              </div>
            </motion.div>

            <div className="flex flex-col gap-4">
              <Reveal>
                <div className="rounded-[2rem] border border-border/50 bg-glass p-8">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{v.type}</div>
                  <h1 className="mt-3 font-display text-5xl leading-tight">{v.name}</h1>
                  <p className="mt-3 text-muted-foreground">{v.tagline}</p>

                  <div className="mt-6 border-t border-border/40 pt-6">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Price on request, from</div>
                    <div className="font-display text-5xl text-gradient-gold">${v.price.toLocaleString()}</div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <button className="rounded-2xl bg-gradient-to-r from-gold to-gold-soft py-3 text-xs font-semibold text-background shadow-gold">
                      <Phone className="mx-auto mb-1 h-4 w-4" />
                      Call
                    </button>
                    <button className="rounded-2xl border border-border bg-glass py-3 text-xs font-semibold">
                      <MessageCircle className="mx-auto mb-1 h-4 w-4 text-gold" />
                      Chat
                    </button>
                    <button className="rounded-2xl border border-border bg-glass py-3 text-xs font-semibold">
                      <Mail className="mx-auto mb-1 h-4 w-4 text-gold" />
                      Email
                    </button>
                  </div>
                </div>
              </Reveal>

              <div className="grid flex-1 grid-cols-3 gap-3">
                {v.gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`relative aspect-square overflow-hidden rounded-2xl border transition ${
                      active === i ? "border-gold ring-2 ring-gold/40" : "border-border/50 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={g} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-[1fr_1.4fr] lg:px-10">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Specifications</div>
            <h2 className="mt-3 font-display text-5xl">Engineered to a standard, not a price.</h2>
            <p className="mt-4 text-muted-foreground">{v.description}</p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[
              { Icon: Zap, label: "Power", value: v.power },
              { Icon: Gauge, label: "Top speed", value: v.topSpeed },
              { Icon: Gauge, label: "0–100", value: v.acceleration },
              { Icon: Fuel, label: "Fuel", value: v.fuel },
              { Icon: Cog, label: "Gearbox", value: v.transmission },
              { Icon: Palette, label: "Finish", value: v.color },
              { Icon: Calendar, label: "Year", value: String(v.year) },
              { Icon: Gauge, label: "Mileage", value: `${v.mileage.toLocaleString()} km` },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="hover-lift h-full rounded-2xl border border-border/50 bg-card p-5">
                  <s.Icon className="h-4 w-4 text-gold" />
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
                  <div className="mt-1 font-display text-xl">{s.value}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border/40 bg-surface/40 py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Highlights</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Equipped with intention.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {v.features.map((f, i) => (
              <Reveal key={f} delay={i * 0.05}>
                <div className="rounded-2xl border border-border/50 bg-glass p-5">
                  <div className="font-mono text-[10px] text-gold">0{i + 1}</div>
                  <div className="mt-2 font-display text-lg">{f}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Similar */}
      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <h2 className="mb-10 font-display text-4xl">You may also consider</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {similar.map((s, i) => <VehicleCard key={s.id} v={s} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
