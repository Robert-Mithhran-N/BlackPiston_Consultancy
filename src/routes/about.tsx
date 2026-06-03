import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import showroom from "@/assets/showroom.jpg";
import { Reveal } from "@/components/site/PageTransition";
import { Counter } from "@/components/site/Counter";
import { stats } from "@/data/mock";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Consultancy — BlackPiston" },
      { name: "description", content: "The story, the craft, and the people behind BlackPiston." },
      { property: "og:title", content: "Consultancy — BlackPiston" },
      { property: "og:description", content: "A heritage of curated automotive excellence." },
    ],
  }),
  component: About,
});

const timeline = [
  { year: "1997", title: "Founded in Geneva", text: "A single garage, three restored coupes." },
  { year: "2006", title: "Atelier Milano", text: "Second workshop, motorsport-grade specialists." },
  { year: "2014", title: "Concierge service", text: "Hospitality reimagined for automotive clients." },
  { year: "2021", title: "BlackPiston Motorcycles", text: "Motorcycle division opens in Tokyo." },
  { year: "2025", title: "The next chapter", text: "Spatial showcases and digital twins for every vehicle." },
];

function About() {
  return (
    <div className="bg-background pt-32">
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Since 1997</div>
            <h1 className="mt-3 max-w-[14ch] font-display text-7xl leading-[0.95] md:text-9xl">
              An atelier,<br />not a dealership<span className="text-gradient-gold italic">.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
              BlackPiston was founded on the conviction that the world's finest machines deserve a
              custodian — not a salesperson. Three decades on, we remain a private house,
              quietly serving a few hundred families across the world.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="relative mt-16 overflow-hidden">
            <motion.img
              src={showroom}
              alt="The BlackPiston atelier"
              loading="lazy"
              className="h-[60vh] w-full object-cover"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="py-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-12 px-6 md:grid-cols-4 lg:px-10">
          {stats.map((s) => (
            <Reveal key={s.label}>
              <div>
                <div className="font-display text-5xl text-gradient-gold md:text-6xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-border/40 bg-surface/30 py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Journey</div>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">Marked, not measured.</h2>
          </Reveal>

          <div className="relative mt-16">
            <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-gold via-gold/30 to-transparent md:left-1/2" />
            <div className="space-y-12">
              {timeline.map((t, i) => (
                <Reveal key={t.year} delay={i * 0.08}>
                  <div className={`relative grid items-center gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                    <div className={`pl-12 md:pl-0 ${i % 2 ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                      <div className="font-display text-5xl text-gradient-gold">{t.year}</div>
                      <h3 className="mt-2 font-display text-2xl">{t.title}</h3>
                      <p className="mt-2 text-muted-foreground">{t.text}</p>
                    </div>
                    <div className="absolute left-2 top-2 h-4 w-4 rounded-full bg-gold shadow-gold md:left-1/2 md:-translate-x-1/2" />
                    <div className="hidden md:block" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why trust */}
      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <h2 className="font-display text-5xl">Why families trust us.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { t: "Discretion", d: "No public ledgers, no auction theatre. Quiet acquisitions, quiet sales." },
              { t: "Authenticity", d: "Every vehicle independently verified by marque specialists." },
              { t: "Stewardship", d: "We remain involved long after delivery — service, valuation, eventual resale." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.1}>
                <div className="hover-lift h-full rounded-3xl border border-border/50 bg-card p-8">
                  <div className="font-display text-6xl text-gold/30">0{i + 1}</div>
                  <h3 className="mt-4 font-display text-2xl">{c.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
