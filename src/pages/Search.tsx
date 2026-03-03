import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid3X3, List, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import FilterPanel, { type Filters } from "@/components/FilterPanel";
import { vehicles } from "@/data/vehicles";

const defaultFilters: Filters = {
  make: "",
  fuel: "",
  transmission: "",
  priceMin: "",
  priceMax: "",
  yearMin: "",
  yearMax: "",
  type: "",
};

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [textQuery, setTextQuery] = useState(searchParams.get("q") || "");

  const [filters, setFiltersState] = useState<Filters>(() => ({
    ...defaultFilters,
    make: searchParams.get("make") || "",
    priceMax: searchParams.get("priceMax") || "",
    type: searchParams.get("type") || "",
    fuel: searchParams.get("fuel") || "",
    transmission: searchParams.get("transmission") || "",
    priceMin: searchParams.get("priceMin") || "",
    yearMin: searchParams.get("yearMin") || "",
    yearMax: searchParams.get("yearMax") || "",
  }));

  useEffect(() => {
    setFiltersState({
      make: searchParams.get("make") || "",
      fuel: searchParams.get("fuel") || "",
      transmission: searchParams.get("transmission") || "",
      priceMin: searchParams.get("priceMin") || "",
      priceMax: searchParams.get("priceMax") || "",
      yearMin: searchParams.get("yearMin") || "",
      yearMax: searchParams.get("yearMax") || "",
      type: searchParams.get("type") || "",
    });
    setTextQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const setFilters = useCallback(
    (newFilters: Filters) => {
      setFiltersState(newFilters);
      const params = new URLSearchParams();
      if (textQuery) params.set("q", textQuery);
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });
      setSearchParams(params, { replace: true });
    },
    [setSearchParams, textQuery]
  );

  const handleTextSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (textQuery) params.set("q", textQuery);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params, { replace: true });
  };

  const filtered = useMemo(() => {
    const q = textQuery.toLowerCase().trim();
    const result = vehicles.filter((v) => {
      if (q && !(
        v.title.toLowerCase().includes(q) ||
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.color.toLowerCase().includes(q) ||
        v.fuel.toLowerCase().includes(q)
      )) return false;
      if (filters.type && v.type !== filters.type) return false;
      if (filters.make && v.make !== filters.make) return false;
      if (filters.fuel && v.fuel !== filters.fuel) return false;
      if (filters.transmission && v.transmission !== filters.transmission) return false;
      if (filters.priceMin && v.price < Number(filters.priceMin)) return false;
      if (filters.priceMax && v.price > Number(filters.priceMax)) return false;
      if (filters.yearMin && v.year < Number(filters.yearMin)) return false;
      if (filters.yearMax && v.year > Number(filters.yearMax)) return false;
      return true;
    });

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return result;
  }, [filters, sortBy, textQuery]);

  // Active filter chips
  const activeFilters = Object.entries(filters)
    .filter(([, value]) => value)
    .map(([key, value]) => ({ key, value, label: `${key}: ${value}` }));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <div className="bg-gradient-dark border-b border-gold/10">
          <div className="container py-8 md:py-12">
            <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              {filters.type === "motorbike" ? "Motorbikes" : filters.type === "car" ? "Cars" : "All Vehicles"}
            </h1>
            <p className="text-white/40 text-sm mt-2">
              Explore our curated collection of <span className="text-gold">{filtered.length}</span> premium vehicles
            </p>
          </div>
        </div>

        <div className="container py-6 md:py-8">
          {/* Active Filter Chips */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mb-5">
              <span className="text-xs text-muted-foreground font-medium">Active:</span>
              {activeFilters.map(({ key, value }) => (
                <button
                  key={key}
                  onClick={() => setFilters({ ...filters, [key]: "" })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-semibold border border-gold/15 hover:bg-gold/20 transition-colors group"
                >
                  <span className="capitalize">{key}:</span> {value}
                  <X className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
              <button
                onClick={() => setFilters(defaultFilters)}
                className="text-xs text-muted-foreground hover:text-gold transition-colors font-medium"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="hidden sm:block h-10 border border-border/60 rounded-xl bg-card px-4 text-sm text-card-foreground focus:ring-2 focus:ring-gold/30 focus:outline-none transition-all hover:border-gold/25"
                aria-label="Sort by"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
                className="hidden md:flex p-2.5 border border-border/60 rounded-xl hover:border-gold/30 text-muted-foreground hover:text-gold transition-all"
                aria-label="Toggle layout"
              >
                {layout === "grid" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-1.5 px-4 h-10 border border-border/60 rounded-xl text-sm text-muted-foreground hover:border-gold/30 hover:text-gold transition-all font-medium"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filters */}
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              className="hidden md:block w-64 shrink-0"
            />

            {/* Mobile Filter Overlay */}
            <AnimatePresence>
              {showFilters && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => setShowFilters(false)}
                  />
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    className="fixed right-0 top-0 bottom-0 z-50 w-80 max-w-full bg-background p-6 overflow-y-auto md:hidden shadow-luxury-xl border-l border-border/30"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FilterPanel filters={filters} onChange={setFilters} onClose={() => setShowFilters(false)} />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Results */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="text-center py-24">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-muted/50 flex items-center justify-center mb-5">
                    <span className="text-3xl">🔍</span>
                  </div>
                  <p className="text-foreground font-heading font-bold text-lg mb-2">No vehicles found</p>
                  <p className="text-muted-foreground text-sm mb-5">Try adjusting your filters or search terms</p>
                  <button
                    onClick={() => setFilters(defaultFilters)}
                    className="text-sm font-semibold text-gold hover:text-gold-dark transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : layout === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                  {filtered.map((v, i) => (
                    <motion.div
                      key={v.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
                    >
                      <VehicleCard vehicle={v} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((v, i) => (
                    <motion.div
                      key={v.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
                    >
                      <VehicleCard vehicle={v} layout="list" />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
