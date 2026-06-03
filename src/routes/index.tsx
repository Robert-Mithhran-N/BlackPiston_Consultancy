import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ChevronDown, Sparkles, Shield, Gem, Clock } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import showroom from "@/assets/showroom.jpg";
import { vehicles, brands, stats, testimonials } from "@/data/mock";
import { VehicleCard } from "@/components/site/VehicleCard";
import { Counter } from "@/components/site/Counter";
import { Reveal } from "@/components/site/PageTransition";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurum — Atelier Automobile" },
      { name: "description", content: "Private atelier for the world's most considered automobiles and motorcycles." },
      { property: "og:title", content: "Aurum — Atelier Automobile" },
      { property: "og:description", content: "Cinematic luxury vehicle showcase." },
    ],
  }),
  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const cars = vehicles.filter((v) => v.category === "car").slice(0, 3);
  const bikes = vehicles.filter((v) => v.category === "bike");

  return (
    <div className="overflow-hidden bg-background">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-dvh">
        <motion.div style={{ scale, y }} className="absolute inset-0">
          <img src={heroCar} alt="Aurum signature coupe" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-grid opacity-20 mask-fade-b" />

        <motion.div style={{ opacity }} className="relative z-10 mx-auto flex min-h-dvh max-w-[1400px] flex-col justify-end px-6 pb-24 pt-40 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-glass px-4 py-1.5 text-xs font-mono uppercase tracking-[0.25em] text-gold"
          >
            <Sparkles className="h-3 w-3" /> Collection 2025
          </motion.div>

          <h1 className="max-w-[18ch] font-display text-[clamp(3rem,8vw,8rem)] font-medium leading-[0.95] tracking-tight">
            {"Drive the".split("").map((c, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.03 }}
                className="inline-block"
              >
                {c === " " ? "\u00A0" : c}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-gradient-gold italic"
            >
              extraordinary.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            A private atelier curating limited-edition automobiles and motorcycles —
            sourced, restored and delivered with hotel-grade hospitality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/inventory"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold to-gold-soft px-8 py-4 text-sm font-semibold text-background shadow-gold transition hover:brightness-110"
            >
              Explore inventory
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-glass px-8 py-4 text-sm font-semibold transition hover:border-gold hover:text-gold"
            >
              Private viewing
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-16 grid w-fit grid-cols-2 gap-x-12 gap-y-6 border-t border-border/40 pt-8 md:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl text-gradient-gold md:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </section>

      {/* BRAND STRIP */}
      <section className="border-y border-border/40 bg-surface/40 py-10">
        <div className="overflow-hidden">
          <div className="marquee flex w-max gap-16 whitespace-nowrap font-display text-3xl text-muted-foreground/60 md:text-4xl">
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className="flex items-center gap-16">
                <span className="hover:text-gold">{b}</span>
                <span className="text-gold/40">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3D SHOWCASE / SPLINE PLACEHOLDER */}
      <section className="relative py-32">
        <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-radial-gold)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Spatial showcase</div>
              <h2 className="mt-4 font-display text-5xl leading-[1.05] md:text-6xl">
                Step inside.<br />
                <span className="text-gradient-gold italic">In three dimensions.</span>
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground">
                Inspect every contour, every stitch, every reflection. Our interactive scenes
                bring each vehicle into your room — rotate, light, configure.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {["Rotate", "Re-light", "Configure"].map((t) => (
                  <div key={t} className="rounded-2xl border border-border/50 bg-glass px-4 py-3 text-center text-xs font-mono uppercase tracking-widest">
                    {t}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border/50 bg-glass-strong shadow-elegant">
                <img src={showroom} alt="Spatial showcase scene" className="absolute inset-0 h-full w-full object-cover opacity-80" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />

                {/* Floating orbs */}
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [0, 90, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute right-8 top-8 h-32 w-32 rounded-full bg-gradient-to-br from-gold/40 to-transparent blur-2xl"
                />
                <motion.div
                  animate={{ y: [0, 30, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-12 left-10 h-40 w-40 rounded-full bg-gradient-to-tr from-crimson/30 to-transparent blur-3xl"
                />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between rounded-2xl bg-glass-strong p-5">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-gold">Live scene</div>
                    <div className="font-display text-xl">Noir GT · 360°</div>
                  </div>
                  <button className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-soft text-background">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURED CARS */}
      <section className="relative py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Featured · Automobiles</div>
              <h2 className="mt-3 font-display text-5xl md:text-6xl">The current bench</h2>
            </div>
            <Link to="/inventory" className="group inline-flex items-center gap-2 text-sm">
              View all <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((v, i) => <VehicleCard key={v.id} v={v} index={i} />)}
          </div>
        </div>
      </section>

      {/* FEATURED BIKES */}
      <section className="relative py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Featured · Two wheels</div>
              <h2 className="mt-3 font-display text-5xl md:text-6xl">Lean angle royalty</h2>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {bikes.map((v, i) => <VehicleCard key={v.id} v={v} index={i} />)}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="relative py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Why Aurum</div>
              <h2 className="mt-3 font-display text-5xl md:text-6xl">A standard, not a service.</h2>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { i: Shield, t: "Vetted provenance", d: "Each vehicle independently authenticated and historied." },
              { i: Gem, t: "Bespoke restoration", d: "In-atelier ateliers for paint, leather and mechanicals." },
              { i: Clock, t: "Concierge delivery", d: "White-glove logistics, anywhere in the world." },
              { i: Sparkles, t: "Lifetime stewardship", d: "Ongoing care, valuation and resale support." },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 0.08}>
                <div className="hover-lift group h-full rounded-3xl border border-border/50 bg-glass p-7">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-soft text-background">
                    <f.i className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl">{f.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Clients</div>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">Quiet endorsements.</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.1}>
                <div className="hover-lift h-full rounded-3xl border border-border/50 bg-card p-8">
                  <div className="font-display text-4xl text-gold/60">"</div>
                  <p className="text-lg leading-relaxed">{t.quote}</p>
                  <div className="mt-8 border-t border-border/40 pt-5">
                    <div className="font-display text-lg">{t.author}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-gold/20 bg-gradient-to-br from-surface-elevated to-surface p-12 shadow-elegant md:p-20">
              <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-crimson/20 blur-3xl" />
              <div className="relative max-w-3xl">
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">By appointment</div>
                <h2 className="mt-4 font-display text-5xl leading-[1.05] md:text-7xl">
                  Let us prepare<br />
                  <span className="text-gradient-gold italic">your next chapter.</span>
                </h2>
                <p className="mt-6 max-w-xl text-muted-foreground">
                  Tell us what you're looking for. We'll respond personally within 24 hours.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-soft px-8 py-4 text-sm font-semibold text-background shadow-gold">
                    Begin a conversation <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/inventory" className="inline-flex items-center gap-2 rounded-full border border-border bg-glass px-8 py-4 text-sm font-semibold">
                    Browse the collection
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
