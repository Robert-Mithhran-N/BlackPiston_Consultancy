import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { makes } from "@/data/vehicles";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSearch = () => {
  const navigate = useNavigate();
  const [make, setMake] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [type, setType] = useState("car");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (priceMax) params.set("priceMax", priceMax);
    if (type) params.set("type", type);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Luxury vehicle showroom"
          className="w-full h-full object-cover scale-110"
        />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-hero-accent" />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      <div className="relative z-10 container text-center px-4">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-gold/20 backdrop-blur-sm text-gold text-xs font-semibold tracking-super-wide uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-glow" />
            Premium Automotive Marketplace
          </span>
        </motion.div>

        {/* Heading with staggered reveal */}
        <motion.h1
          className="font-heading text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] mb-5 text-shadow-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Find Your Perfect
          <br />
          <span className="text-gradient-premium">Machine</span>
        </motion.h1>

        <motion.p
          className="text-white/50 text-base md:text-lg lg:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Curated luxury cars and motorbikes, handpicked by our expert acquisition team
        </motion.p>

        {/* Search Bar — Glassmorphic */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative max-w-3xl mx-auto"
        >
          {/* Glow effect behind */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/5 to-gold/20 rounded-2xl blur-xl opacity-50" />

          <div className="relative bg-[#0a2a1e]/90 backdrop-blur-2xl rounded-2xl p-3 md:p-4 border border-gold/15 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-2.5">
              {/* Type Toggle */}
              <div className="flex rounded-xl p-1 gap-1 bg-white/5" role="radiogroup" aria-label="Vehicle type">
                {["car", "motorbike"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="radio"
                    aria-checked={type === t}
                    onClick={() => setType(t)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B06A] ${type === t
                        ? "bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] text-[#111111] shadow-lg shadow-[#C9A14A]/20"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {t === "car" ? "Cars" : "Motorbikes"}
                  </button>
                ))}
              </div>

              {/* Make */}
              <div className="relative flex-1">
                <select
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full h-11 bg-white/8 text-white border border-white/10 rounded-lg px-4 text-sm appearance-none cursor-pointer transition-all duration-200 focus:outline-none focus:border-gold/40 focus:bg-white/12 hover:bg-white/10"
                  aria-label="Select make"
                >
                  <option value="" className="bg-[#0a2a1e] text-white">Any Make</option>
                  {makes.map((m) => (
                    <option key={m} value={m} className="bg-[#0a2a1e] text-white">{m}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>

              {/* Price */}
              <div className="relative flex-1">
                <select
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full h-11 bg-white/8 text-white border border-white/10 rounded-lg px-4 text-sm appearance-none cursor-pointer transition-all duration-200 focus:outline-none focus:border-gold/40 focus:bg-white/12 hover:bg-white/10"
                  aria-label="Maximum price"
                >
                  <option value="" className="bg-[#0a2a1e] text-white">Any Price</option>
                  {[10000, 25000, 50000, 75000, 100000, 150000].map((p) => (
                    <option key={p} value={p} className="bg-[#0a2a1e] text-white">Up to £{p.toLocaleString()}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] hover:from-[#B8913F] hover:to-[#C9A14A] text-[#111111] font-semibold px-8 h-11 rounded-lg transition-all duration-300 shadow-lg shadow-[#C9A14A]/20 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B06A]"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>
        </motion.form>

        {/* Stats with animated counters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center gap-8 md:gap-16 mt-12"
        >
          {[
            { value: "2,500+", label: "Vehicles Listed" },
            { value: "98%", label: "Satisfied Buyers" },
            { value: "500+", label: "Verified Sellers" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
            >
              <div className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-gradient-premium">{stat.value}</div>
              <div className="text-xs md:text-sm text-white/40 mt-1.5 tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-gold"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* Floating Particles Component */
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default HeroSearch;
