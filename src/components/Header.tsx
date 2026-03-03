import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchOverlay from "@/components/SearchOverlay";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/search", label: "Inventory" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-[#0a0a0a]/95 backdrop-blur-2xl shadow-luxury-lg"
        : "bg-gradient-dark backdrop-blur-md"
        }`}
    >
      {/* Gold accent line */}
      <div className="header-accent-line" />

      <div className="container flex items-center justify-between h-16 md:h-20 gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center group shrink-0">
          <img
            src="/blackpiston-logo.png"
            alt="BlackPiston Consultancy"
            className="h-14 md:h-[72px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
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
            <span className="font-heading font-bold text-primary-foreground text-lg tracking-tight">
              Black<span className="text-gradient-gold">Piston</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to || (link.to !== "/" && location.pathname.startsWith(link.to.split("?")[0]));
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover-underline ${isActive
                  ? "text-gold"
                  : "text-primary-foreground/60 hover:text-primary-foreground"
                  }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-gold to-gold-light rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2.5 rounded-xl text-primary-foreground/50 hover:text-gold hover:bg-gold/5 transition-all duration-300"
            aria-label="Search vehicles"
          >
            <Search className="w-5 h-5" />
          </button>
          <a
            href="tel:+919361081244"
            className="hidden md:flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] hover:from-[#B8913F] hover:to-[#C9A14A] text-[#111111] text-sm font-semibold rounded-xl transition-all duration-300 shadow-glow-gold active:scale-[0.97]"
          >
            <Phone className="w-4 h-4" />
            Contact Us
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-primary-foreground/60 hover:text-gold transition-colors rounded-xl"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute left-0 right-0 top-full z-50 bg-[#0a0a0a]/98 backdrop-blur-2xl border-t border-gold/10"
              aria-label="Mobile navigation"
            >
              <div className="container py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3.5 min-h-[44px] flex items-center rounded-xl text-sm font-medium transition-all duration-200 ${location.pathname === link.to
                      ? "text-gold bg-gold/8"
                      : "text-primary-foreground/60 hover:text-gold hover:bg-gold/5"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="section-divider my-2" />
                <a
                  href="tel:+919361081244"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 mx-2 mt-1 px-5 py-3 bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] text-[#111111] text-sm font-semibold rounded-xl transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </a>
                <a
                  href="https://wa.me/919361081244"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-primary-foreground/50 hover:text-gold transition-colors text-center"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};

export default Header;
