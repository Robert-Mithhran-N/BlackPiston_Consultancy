import { X, ChevronDown } from "lucide-react";
import { makes, fuelTypes, transmissions } from "@/data/vehicles";
import { useState } from "react";

export interface Filters {
  make: string;
  fuel: string;
  transmission: string;
  priceMin: string;
  priceMax: string;
  yearMin: string;
  yearMax: string;
  type: string;
}

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClose?: () => void;
  className?: string;
}

const selectClass =
  "w-full h-11 border border-border/60 rounded-xl bg-card px-4 text-sm text-card-foreground focus:ring-2 focus:ring-gold/30 focus:border-gold/40 focus:outline-none transition-all duration-200 hover:border-gold/25 appearance-none cursor-pointer";

const inputClass =
  "w-full h-11 border border-border/60 rounded-xl bg-card px-4 text-sm text-card-foreground focus:ring-2 focus:ring-gold/30 focus:border-gold/40 focus:outline-none transition-all duration-200 hover:border-gold/25";

interface FilterSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const FilterSection = ({ title, defaultOpen = true, children }: FilterSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/40 pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-1 mb-2 group"
      >
        <span className="text-xs font-bold text-foreground/80 tracking-wider uppercase">{title}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        {children}
      </div>
    </div>
  );
};

const FilterPanel = ({ filters, onChange, onClose, className = "" }: FilterPanelProps) => {
  const set = (key: keyof Filters, value: string) => onChange({ ...filters, [key]: value });

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <aside className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h3 className="font-heading font-bold text-lg">Filters</h3>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-gold/15 text-gold text-[10px] font-bold">
              {activeCount}
            </span>
          )}
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Close filters">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <FilterSection title="Type">
        <div className="flex gap-2">
          {[
            { value: "", label: "All" },
            { value: "car", label: "Cars" },
            { value: "motorbike", label: "Bikes" },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => set("type", value)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${filters.type === value
                  ? "bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] text-[#111111] shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Make">
        <div className="relative">
          <select value={filters.make} onChange={(e) => set("make", e.target.value)} className={selectClass} aria-label="Make">
            <option value="">Any Make</option>
            {makes.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
        </div>
      </FilterSection>

      <FilterSection title="Fuel Type">
        <div className="relative">
          <select value={filters.fuel} onChange={(e) => set("fuel", e.target.value)} className={selectClass} aria-label="Fuel type">
            <option value="">Any</option>
            {fuelTypes.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
        </div>
      </FilterSection>

      <FilterSection title="Transmission">
        <div className="relative">
          <select value={filters.transmission} onChange={(e) => set("transmission", e.target.value)} className={selectClass} aria-label="Transmission">
            <option value="">Any</option>
            {transmissions.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min £"
            value={filters.priceMin}
            onChange={(e) => set("priceMin", e.target.value)}
            className={inputClass}
            aria-label="Minimum price"
          />
          <input
            type="number"
            placeholder="Max £"
            value={filters.priceMax}
            onChange={(e) => set("priceMax", e.target.value)}
            className={inputClass}
            aria-label="Maximum price"
          />
        </div>
      </FilterSection>

      <FilterSection title="Year" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="From"
            value={filters.yearMin}
            onChange={(e) => set("yearMin", e.target.value)}
            className={inputClass}
            aria-label="Minimum year"
          />
          <input
            type="number"
            placeholder="To"
            value={filters.yearMax}
            onChange={(e) => set("yearMax", e.target.value)}
            className={inputClass}
            aria-label="Maximum year"
          />
        </div>
      </FilterSection>

      <button
        onClick={() =>
          onChange({ make: "", fuel: "", transmission: "", priceMin: "", priceMax: "", yearMin: "", yearMax: "", type: "" })
        }
        className="w-full h-11 text-sm font-semibold text-gold hover:text-gold-dark border border-gold/20 hover:border-gold/40 rounded-xl transition-all duration-200 hover:bg-gold/5"
      >
        Clear All Filters
      </button>
    </aside>
  );
};

export default FilterPanel;
