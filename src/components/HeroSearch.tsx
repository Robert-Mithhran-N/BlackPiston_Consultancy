import { useState } from "react";
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
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Luxury vehicle showroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
      </div>

      <div className="relative z-10 container text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-4">
            Premium Automotive Marketplace
          </span>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground leading-tight mb-4">
            Find Your Perfect
            <br />
            <span className="text-gradient-gold">Machine</span>
          </h1>
          <p className="text-primary-foreground/60 text-base md:text-lg max-w-xl mx-auto mb-10">
            Curated luxury cars and motorbikes from verified sellers across the UK
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass-dark rounded-xl p-2 md:p-3 max-w-3xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-2">
            {/* Type Toggle */}
            <div className="flex bg-card/10 rounded-lg p-1">
              {["car", "motorbike"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    type === t
                      ? "bg-gold text-accent-foreground"
                      : "text-primary-foreground/60 hover:text-primary-foreground"
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
                className="w-full h-11 bg-card/10 border-0 rounded-lg px-4 text-sm text-primary-foreground appearance-none cursor-pointer focus:ring-2 focus:ring-gold/50 focus:outline-none"
                aria-label="Select make"
              >
                <option value="">Any Make</option>
                {makes.map((m) => (
                  <option key={m} value={m} className="text-foreground">{m}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40 pointer-events-none" />
            </div>

            {/* Price */}
            <div className="relative flex-1">
              <select
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full h-11 bg-card/10 border-0 rounded-lg px-4 text-sm text-primary-foreground appearance-none cursor-pointer focus:ring-2 focus:ring-gold/50 focus:outline-none"
                aria-label="Maximum price"
              >
                <option value="">Any Price</option>
                {[10000, 25000, 50000, 75000, 100000, 150000].map((p) => (
                  <option key={p} value={p} className="text-foreground">Up to £{p.toLocaleString()}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40 pointer-events-none" />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-accent-foreground font-semibold px-8 h-11 rounded-lg transition-colors duration-200"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </motion.form>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center gap-8 md:gap-16 mt-10"
        >
          {[
            { value: "2,500+", label: "Vehicles Listed" },
            { value: "98%", label: "Satisfied Buyers" },
            { value: "500+", label: "Verified Sellers" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading font-bold text-2xl md:text-3xl text-gold">{stat.value}</div>
              <div className="text-xs md:text-sm text-primary-foreground/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSearch;
