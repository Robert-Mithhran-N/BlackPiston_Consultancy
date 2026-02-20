import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Heart, User, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/search", label: "Buy" },
  { to: "/search?type=motorbike", label: "Motorbikes" },
  { to: "/create-listing", label: "Sell" },
  { to: "/dashboard", label: "Dashboard" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-gradient-dark border-b border-gold/10">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
            <span className="font-heading font-black text-sm text-foreground">BP</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-heading font-bold text-primary-foreground text-lg tracking-tight">
              Black<span className="text-gradient-gold">Piston</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.to
                  ? "text-gold bg-gold/10"
                  : "text-primary-foreground/70 hover:text-gold hover:bg-gold/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/search"
            className="p-2 rounded-md text-primary-foreground/70 hover:text-gold hover:bg-gold/5 transition-colors"
            aria-label="Search vehicles"
          >
            <Search className="w-5 h-5" />
          </Link>
          <Link
            to="/dashboard"
            className="hidden sm:flex p-2 rounded-md text-primary-foreground/70 hover:text-gold hover:bg-gold/5 transition-colors"
            aria-label="Saved vehicles"
          >
            <Heart className="w-5 h-5" />
          </Link>
          <Link
            to="/auth"
            className="hidden sm:flex p-2 rounded-md text-primary-foreground/70 hover:text-gold hover:bg-gold/5 transition-colors"
            aria-label="Account"
          >
            <User className="w-5 h-5" />
          </Link>
          <Link
            to="/create-listing"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-gold hover:bg-gold-dark text-accent-foreground text-sm font-semibold rounded-md transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Sell Vehicle
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-primary-foreground/70 hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-gradient-dark border-t border-gold/10"
            aria-label="Mobile navigation"
          >
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? "text-gold bg-gold/10"
                      : "text-primary-foreground/70 hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-md text-sm font-medium text-primary-foreground/70 hover:text-gold transition-colors"
              >
                Sign In
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
