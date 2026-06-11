import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-border/40 bg-[var(--surface)]">
      <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-radial-gold)]" />
      <div className="relative mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="BlackPiston Logo" className="h-10 w-10 object-contain rounded-full" />
              <div className="font-display text-2xl tracking-wide uppercase font-bold text-gradient-gold">BlackPiston</div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A private consultancy curating the world's most considered automobiles and motorcycles.
              By appointment, by invitation, by design.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-glass transition hover:border-gold hover:text-gold"
                  aria-label="Social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-gold">Explore</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/inventory" className="hover:text-gold">Inventory</Link></li>
              <li><Link to="/about" className="hover:text-gold">The Atelier</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
              <li><Link to="/admin" className="hover:text-gold">Admin</Link></li>
            </ul>
          </div>

          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-gold">Visit</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> No-6, Melasooriyathotaam, Madukkur, Pattukottai, Tanjavur - 614903</li>
              <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> +91 93610 81244</li>
              <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> blackpistonconsultancy@gmail.com</li>
            </ul>
          </div>

          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-gold">Newsletter</div>
            <p className="mb-3 text-sm text-muted-foreground">Quiet dispatches, occasionally.</p>
            <form className="flex overflow-hidden rounded-full border border-border/60 bg-glass" onSubmit={(e)=>e.preventDefault()}>
              <input
                type="email"
                placeholder="your@address.com"
                className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60"
              />
              <button className="bg-gradient-to-r from-gold to-gold-soft px-4 text-sm font-semibold text-background">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/40 pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} BlackPiston Consultancy. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/contact" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
