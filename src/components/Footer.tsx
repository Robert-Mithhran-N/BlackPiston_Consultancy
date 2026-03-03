import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowUp, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#080808] border-t border-white/5 mt-auto relative overflow-hidden">
      {/* Decorative gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="container py-14 md:py-20 relative z-10">
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-14 pb-14 border-b border-white/5">
          <div>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
              Stay in the <span className="text-gradient-premium">Fast Lane</span>
            </h3>
            <p className="text-white/40 text-sm max-w-md">
              Get exclusive access to new arrivals and premium offers before anyone else.
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 w-full max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/40 transition-colors"
            />
            <button className="px-6 h-12 bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] hover:from-[#B8913F] hover:to-[#C9A14A] text-[#111111] font-semibold rounded-xl transition-all duration-300 text-sm shrink-0 active:scale-[0.97]">
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-5 flex items-center justify-start">
              <img
                src="/blackpiston-logo.png"
                alt="BlackPiston Consultancy"
                className="h-20 w-auto object-contain opacity-90"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = '/blackpiston-logo.svg';
                  target.onerror = () => {
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  };
                }}
              />
              <div className="hidden flex items-center gap-2">
                <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                  <span className="font-heading font-black text-sm text-foreground">BP</span>
                </div>
                <span className="font-heading font-bold text-white text-lg">
                  Black<span className="text-gradient-gold">Piston</span>
                </span>
              </div>
            </div>
            <p className="text-sm text-white/35 leading-relaxed mb-5">
              Premium automotive consultancy. Discover luxury vehicles with confidence.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {[
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Youtube, label: "YouTube", href: "#" },
                { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/919361081244" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-gold hover:bg-gold/10 hover:border-gold/20 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-bold text-white/70 mb-5 tracking-wider uppercase">Explore</h4>
            <ul className="space-y-3">
              {[
                { to: "/search?type=car", label: "Browse Cars" },
                { to: "/search?type=motorbike", label: "Browse Motorbikes" },
                { to: "/search", label: "All Vehicles" },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-white/35 hover:text-gold transition-colors duration-300">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://wa.me/919361081244" target="_blank" rel="noopener noreferrer" className="text-sm text-white/35 hover:text-gold transition-colors duration-300">
                  Enquire
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-white/70 mb-5 tracking-wider uppercase">Company</h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "About Us" },
                { to: "/search", label: "Seller Verification" },
                { to: "/", label: "Reviews" },
                { to: "/", label: "Careers" },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-white/35 hover:text-gold transition-colors duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold text-white/70 mb-5 tracking-wider uppercase">Legal</h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Terms of Service" },
                { to: "/", label: "Privacy Policy" },
                { to: "/", label: "Cookie Policy" },
                { to: "/", label: "Disclaimer" },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-white/35 hover:text-gold transition-colors duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs font-bold text-white/70 mb-5 tracking-wider uppercase">Contact Us</h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gold/8 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-gold/60" />
                </div>
                <span className="text-sm text-white/35 leading-relaxed">
                  No-6, Melasooriyathotam, Madukkur, Pattukottai, Tanjavur - 614903
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gold/8 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-gold/60" />
                </div>
                <a href="tel:+919361081244" className="text-sm text-white/35 hover:text-gold transition-colors duration-300">
                  +91-9361081244
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gold/8 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-gold/60" />
                </div>
                <a href="mailto:blackpistongarages@gmail.com" className="text-sm text-white/35 hover:text-gold transition-colors duration-300">
                  blackpistongarages@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/25">
            © 2026 BlackPiston Consultancy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/25">Trusted by 10,000+ buyers</span>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/30 hover:text-gold hover:bg-gold/10 hover:border-gold/20 transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
