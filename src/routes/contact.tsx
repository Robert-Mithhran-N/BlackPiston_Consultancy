import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, MessageCircle, ArrowRight, CheckCircle, Loader2, Clock, Globe } from "lucide-react";
import { Reveal } from "@/components/site/PageTransition";
import { useState } from "react";
import { createEnquiry } from "@/lib/api";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — BlackPiston Consultancy" },
      { name: "description", content: "Get in touch with BlackPiston Consultancy. Reach us by phone, email, or visit our office in Madukkur, Pattukottai, Tanjavur." },
      { property: "og:title", content: "Contact Us — BlackPiston Consultancy" },
      { property: "og:description", content: "Reach out for vehicle consultancy, private viewings, and more." },
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
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Get In Touch</div>
            <h1 className="mt-3 max-w-[14ch] font-display text-7xl leading-[0.95] md:text-9xl">
              Contact us<span className="text-gradient-gold italic">.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground">
              We respond personally — and privately — within 24 hours. Reach out by phone, email, or visit us at our office.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-20">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
          {[
            { Icon: Phone, label: "Call Us", value: "+91 93610 81244", sub: "Mon–Sat · 09:00–20:00 IST", href: "tel:+919361081244" },
            { Icon: MessageCircle, label: "WhatsApp", value: "+91 93610 81244", sub: "Same-day reply, 7 days", href: "https://wa.me/919361081244" },
            { Icon: Mail, label: "Email", value: "blackpistonconsultancy@gmail.com", sub: "Within 24 hours", href: "mailto:blackpistonconsultancy@gmail.com" },
            { Icon: MapPin, label: "Visit Us", value: "Madukkur, Pattukottai", sub: "Tanjavur - 614903", href: "https://maps.google.com/?q=Madukkur,Pattukottai,Tanjavur,614903" },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="block hover-lift h-full rounded-3xl border border-border/50 bg-card p-8 transition-colors hover:border-gold/40"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-soft text-background">
                  <c.Icon className="h-5 w-5" />
                </div>
                <div className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.label}</div>
                <div className="mt-1 font-display text-xl lg:text-2xl break-all">{c.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{c.sub}</div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Address detail strip */}
      <section className="border-y border-border/40 bg-surface/30">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-8 py-12 md:grid-cols-3">
            <Reveal>
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-gold">Office Address</div>
                  <div className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    No-6, Melasooriyathotaam,<br />
                    Madukkur, Pattukottai,<br />
                    Tanjavur - 614903,<br />
                    Tamil Nadu, India
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-gold">Business Hours</div>
                  <div className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Monday – Saturday<br />
                    09:00 AM – 08:00 PM IST<br />
                    Sunday: By appointment only
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-gold">Services Available</div>
                  <div className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Vehicle Consultancy<br />
                    Buy & Sell Assistance<br />
                    Private Viewings & Test Drives
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Form + map */}
      <section className="py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[1.2fr_1fr] lg:px-10">
          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-border/50 bg-glass-strong p-8 md:p-10"
            >
              <h2 className="font-display text-3xl">Send us a message</h2>
              <p className="mt-2 text-sm text-muted-foreground">All fields kept strictly confidential.</p>

              {status === "success" && (
                <div className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-500/15 p-4 text-sm text-emerald-300">
                  <CheckCircle className="h-5 w-5" />
                  Thank you! We'll get back to you within 24 hours.
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
                <Field label="Phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <Field label="Interest" placeholder="Vehicle model or type" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} />
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
                  <>Send message <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></>
                )}
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative h-full min-h-[500px] overflow-hidden rounded-[2rem] border border-border/50">
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31361.2!2d79.39!3d10.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baab7a3c0000001%3A0x0!2sMadukkur%2C%20Tamil%20Nadu%20614903!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BlackPiston Consultancy Location - Madukkur, Pattukottai, Tanjavur"
              />
              {/* Overlay info card */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-glass-strong backdrop-blur-xl p-5 border border-border/50">
                <div className="font-mono text-[10px] uppercase tracking-widest text-gold">Our Office</div>
                <div className="mt-1 font-display text-xl">No-6, Melasooriyathotaam</div>
                <div className="text-sm text-muted-foreground">Madukkur, Pattukottai, Tanjavur - 614903</div>
                <a
                  href="https://maps.google.com/?q=Madukkur,Pattukottai,Tanjavur,614903"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-gold hover:underline"
                >
                  Open in Google Maps <ArrowRight className="h-3 w-3" />
                </a>
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
