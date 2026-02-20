import { Link } from "react-router-dom";
import { Heart, MapPin, Gauge, Fuel, Settings2 } from "lucide-react";
import { useState } from "react";
import type { Vehicle } from "@/data/vehicles";

interface VehicleCardProps {
  vehicle: Vehicle;
  layout?: "grid" | "list";
}

const VehicleCard = ({ vehicle, layout = "grid" }: VehicleCardProps) => {
  const [saved, setSaved] = useState(false);

  if (layout === "list") {
    return (
      <Link
        to={`/vehicle/${vehicle.id}`}
        className="group flex gap-4 md:gap-6 bg-card rounded-lg overflow-hidden shadow-luxury hover-lift border border-border"
      >
        <div className="relative w-40 md:w-64 shrink-0">
          <img
            src={vehicle.images[0]}
            alt={vehicle.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {vehicle.featured && (
            <span className="absolute top-2 left-2 bg-gold text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded">
              Featured
            </span>
          )}
        </div>
        <div className="flex-1 py-3 pr-4 flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-card-foreground group-hover:text-gold transition-colors line-clamp-1">
              {vehicle.title}
            </h3>
            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{vehicle.location}</span>
              <span className="flex items-center gap-1"><Gauge className="w-3 h-3" />{vehicle.mileage.toLocaleString()} mi</span>
              <span className="flex items-center gap-1"><Fuel className="w-3 h-3" />{vehicle.fuel}</span>
            </div>
          </div>
          <div className="flex items-end justify-between mt-2">
            <span className="font-heading font-bold text-xl text-gold">
              £{vehicle.price.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">{vehicle.seller.name}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-luxury hover-lift border border-border">
      <Link to={`/vehicle/${vehicle.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={vehicle.images[0]}
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {vehicle.featured && (
            <span className="absolute top-3 left-3 bg-gold text-accent-foreground text-xs font-semibold px-2.5 py-1 rounded">
              Featured
            </span>
          )}
          <button
            onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
              saved ? "bg-gold text-accent-foreground" : "bg-card/80 backdrop-blur text-card-foreground hover:bg-gold hover:text-accent-foreground"
            }`}
            aria-label={saved ? "Unsave vehicle" : "Save vehicle"}
          >
            <Heart className="w-4 h-4" fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/vehicle/${vehicle.id}`}>
          <h3 className="font-heading font-bold text-card-foreground group-hover:text-gold transition-colors line-clamp-1">
            {vehicle.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          {vehicle.location}
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Gauge className="w-3.5 h-3.5" />{vehicle.mileage.toLocaleString()}</span>
          <span className="flex items-center gap-1"><Fuel className="w-3.5 h-3.5" />{vehicle.fuel}</span>
          <span className="flex items-center gap-1"><Settings2 className="w-3.5 h-3.5" />{vehicle.transmission}</span>
        </div>
        <div className="flex items-end justify-between mt-4 pt-3 border-t border-border">
          <span className="font-heading font-bold text-xl text-gold">
            £{vehicle.price.toLocaleString()}
          </span>
          {vehicle.seller.verified && (
            <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded">
              Verified
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
