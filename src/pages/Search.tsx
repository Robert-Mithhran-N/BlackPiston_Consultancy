import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid3X3, List, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import FilterPanel, { type Filters } from "@/components/FilterPanel";
import { vehicles } from "@/data/vehicles";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const [filters, setFilters] = useState<Filters>({
    make: searchParams.get("make") || "",
    fuel: "",
    transmission: "",
    priceMin: "",
    priceMax: searchParams.get("priceMax") || "",
    yearMin: "",
    yearMax: "",
    type: searchParams.get("type") || "",
  });

  const filtered = useMemo(() => {
    const result = vehicles.filter((v) => {
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
  }, [filters, sortBy]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container py-6 md:py-10">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                {filters.type === "motorbike" ? "Motorbikes" : filters.type === "car" ? "Cars" : "All Vehicles"}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">{filtered.length} results</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="hidden sm:block h-9 border border-border rounded-md bg-card px-3 text-sm text-card-foreground focus:ring-2 focus:ring-gold/50"
                aria-label="Sort by"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
              <button
                onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
                className="hidden md:flex p-2 border border-border rounded-md hover:border-gold text-muted-foreground hover:text-gold transition-colors"
                aria-label="Toggle layout"
              >
                {layout === "grid" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-1 px-3 h-9 border border-border rounded-md text-sm text-muted-foreground hover:border-gold hover:text-gold transition-colors"
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
            {showFilters && (
              <div className="fixed inset-0 z-50 bg-foreground/50 md:hidden" onClick={() => setShowFilters(false)}>
                <div
                  className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-background p-6 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FilterPanel filters={filters} onChange={setFilters} onClose={() => setShowFilters(false)} />
                </div>
              </div>
            )}

            {/* Results */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg mb-2">No vehicles found</p>
                  <button
                    onClick={() =>
                      setFilters({ make: "", fuel: "", transmission: "", priceMin: "", priceMax: "", yearMin: "", yearMax: "", type: "" })
                    }
                    className="text-sm text-gold hover:text-gold-dark font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : layout === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((v) => (
                    <VehicleCard key={v.id} vehicle={v} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((v) => (
                    <VehicleCard key={v.id} vehicle={v} layout="list" />
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
