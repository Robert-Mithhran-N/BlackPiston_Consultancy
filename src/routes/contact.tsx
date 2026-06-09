import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, MessageCircle, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { Reveal } from "@/components/site/PageTransition";
import { useState } from "react";
import { createEnquiry } from "@/lib/api";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BlackPiston" },
      { name: "description", content: "Begin a private conversation with the BlackPiston concierge." },
      { property: "og:title", content: "Contact — BlackPiston" },
      { property: "og:description", content: "Private viewings, by appointment." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please fill in name, email and message.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await createEnquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.interest ? `[Interest: ${form.interest}] ${form.message}` : form.message,
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", interest: "", message: "" });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to send. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="bg-background pt-32">
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-radial-gold)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Concierge</div>
            <h1 className="mt-3 max-w-[12ch] font-display text-7xl leading-[0.95] md:text-9xl">
              Let's talk<span className="text-gradient-gold italic">.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground">
              We respond personally — and privately — within 24 hours. By appointment, by invitation, by design.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-20">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-6 md:grid-cols-3 lg:px-10">
          {[
            { Icon: Phone, label: "Call", value: "+33 1 40 00 00 00", sub: "Mon–Sat · 09:00–20:00 CET" },
            { Icon: MessageCircle, label: "WhatsApp", value: "+33 6 00 00 00 00", sub: "Same-day reply, 7 days" },
            { Icon: Mail, label: "Email", value: "concierge@blackpiston.com", sub: "Within 24 hours" },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <div className="hover-lift h-full rounded-3xl border border-border/50 bg-card p-8">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-soft text-background">
                  <c.Icon className="h-5 w-5" />
                </div>
                <div className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.label}</div>
                <div className="mt-1 font-display text-2xl">{c.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{c.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form + map */}
      <section className="py-12">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[1.2fr_1fr] lg:px-10">
          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-border/50 bg-glass-strong p-8 md:p-10"
            >
              <h2 className="font-display text-3xl">Begin a conversation</h2>
              <p className="mt-2 text-sm text-muted-foreground">All fields kept strictly confidential.</p>

              {status === "success" && (
                <div className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-500/15 p-4 text-sm text-emerald-300">
                  <CheckCircle className="h-5 w-5" />
                  Thank you. We'll respond within 24 hours.
                </div>
              )}

              {status === "error" && (
                <div className="mt-4 rounded-2xl bg-red-500/15 p-4 text-sm text-red-300">
                  {errorMsg}
                </div>
              )}

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <Field label="Name" placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Field label="Email" type="email" placeholder="you@domain.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Field label="Phone" placeholder="+1 555 000 0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <Field label="Interest" placeholder="Model or marque" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} />
              </div>

              <div className="mt-5">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us what you're looking for…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-2 w-full resize-none rounded-2xl border border-border/60 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold/40"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-soft px-8 py-4 text-sm font-semibold text-background shadow-gold disabled:opacity-60"
              >
                {status === "loading" ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                ) : (
                  <>Send privately <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></>
                )}
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative h-full min-h-[400px] overflow-hidden rounded-[2rem] border border-border/50 bg-glass-strong">
              {/* Map placeholder */}
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-crimson/10" />
              <div className="absolute inset-0 bg-noise opacity-[0.08]" />

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-gold/40" />
                  <div className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-soft text-background shadow-gold">
                    <MapPin className="h-6 w-6" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-glass-strong p-5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-gold">Flagship Atelier</div>
                <div className="mt-1 font-display text-xl">14 Avenue Montaigne</div>
                <div className="text-sm text-muted-foreground">75008 Paris, France</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        {...props}
        className="mt-2 w-full rounded-2xl border border-border/60 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold/40"
      />
    </div>
  );
}
