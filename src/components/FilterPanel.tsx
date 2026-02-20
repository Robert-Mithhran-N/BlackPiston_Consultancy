import { X } from "lucide-react";
import { makes, fuelTypes, transmissions } from "@/data/vehicles";

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
  "w-full h-10 border border-border rounded-md bg-card px-3 text-sm text-card-foreground focus:ring-2 focus:ring-gold/50 focus:outline-none";

const FilterPanel = ({ filters, onChange, onClose, className = "" }: FilterPanelProps) => {
  const set = (key: keyof Filters, value: string) => onChange({ ...filters, [key]: value });

  return (
    <aside className={`space-y-5 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-lg">Filters</h3>
        {onClose && (
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground" aria-label="Close filters">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Type</label>
        <select value={filters.type} onChange={(e) => set("type", e.target.value)} className={selectClass} aria-label="Vehicle type">
          <option value="">All</option>
          <option value="car">Cars</option>
          <option value="motorbike">Motorbikes</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Make</label>
        <select value={filters.make} onChange={(e) => set("make", e.target.value)} className={selectClass} aria-label="Make">
          <option value="">Any Make</option>
          {makes.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Fuel Type</label>
        <select value={filters.fuel} onChange={(e) => set("fuel", e.target.value)} className={selectClass} aria-label="Fuel type">
          <option value="">Any</option>
          {fuelTypes.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Transmission</label>
        <select value={filters.transmission} onChange={(e) => set("transmission", e.target.value)} className={selectClass} aria-label="Transmission">
          <option value="">Any</option>
          {transmissions.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Min Price</label>
          <input
            type="number"
            placeholder="£0"
            value={filters.priceMin}
            onChange={(e) => set("priceMin", e.target.value)}
            className={selectClass}
            aria-label="Minimum price"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Max Price</label>
          <input
            type="number"
            placeholder="Any"
            value={filters.priceMax}
            onChange={(e) => set("priceMax", e.target.value)}
            className={selectClass}
            aria-label="Maximum price"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Year From</label>
          <input
            type="number"
            placeholder="2015"
            value={filters.yearMin}
            onChange={(e) => set("yearMin", e.target.value)}
            className={selectClass}
            aria-label="Minimum year"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Year To</label>
          <input
            type="number"
            placeholder="2026"
            value={filters.yearMax}
            onChange={(e) => set("yearMax", e.target.value)}
            className={selectClass}
            aria-label="Maximum year"
          />
        </div>
      </div>

      <button
        onClick={() =>
          onChange({ make: "", fuel: "", transmission: "", priceMin: "", priceMax: "", yearMin: "", yearMax: "", type: "" })
        }
        className="w-full h-10 text-sm font-medium text-gold hover:text-gold-dark border border-gold/30 rounded-md transition-colors"
      >
        Clear All Filters
      </button>
    </aside>
  );
};

export default FilterPanel;
