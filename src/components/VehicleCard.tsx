import { Link } from "react-router-dom";
import { MapPin, Gauge, Fuel, Settings2, Camera } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";

interface VehicleCardProps {
  vehicle: Vehicle;
  layout?: "grid" | "list";
}

const VehicleCard = ({ vehicle, layout = "grid" }: VehicleCardProps) => {
  if (layout === "list") {
    return (
      <Link
        to={`/vehicle/${vehicle.id}`}
        className="group flex gap-4 md:gap-6 bg-card rounded-xl overflow-hidden card-premium border-0 h-full"
      >
        <div className="relative w-40 md:w-72 shrink-0 overflow-hidden">
          <img
            src={vehicle.images[0]}
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/10" />
          {vehicle.featured && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] text-[#111111] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-lg">
              Featured
            </span>
          )}
        </div>
        <div className="flex-1 py-4 pr-4 flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-card-foreground group-hover:text-gold transition-colors duration-300 line-clamp-1">
              {vehicle.title}
            </h3>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{vehicle.location}</span>
              <span className="flex items-center gap-1"><Gauge className="w-3 h-3" />{vehicle.mileage.toLocaleString()} mi</span>
              <span className="flex items-center gap-1"><Fuel className="w-3 h-3" />{vehicle.fuel}</span>
            </div>
          </div>
          <div className="flex items-end justify-between mt-3">
            <span className="font-heading font-bold text-xl text-gradient-gold">
              £{vehicle.price.toLocaleString()}
            </span>
            {vehicle.source === "admin" && (
              <span className="text-[10px] text-[#0F3D2E] font-bold bg-[#0F3D2E]/8 px-2.5 py-1 rounded-md flex items-center gap-1 border border-[#0F3D2E]/10">
                ✓ BP Certified
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="group bg-card rounded-2xl overflow-hidden card-premium border-0 flex flex-col h-full">
      <Link to={`/vehicle/${vehicle.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={vehicle.images[0]}
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          {/* Hover overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Top badges row */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            <div className="flex gap-2">
              {vehicle.featured && (
                <span className="bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] text-[#111111] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-lg backdrop-blur-sm">
                  Featured
                </span>
              )}
              {vehicle.source === "admin" && (
                <span className="bg-[#0F3D2E]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-lg">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  Certified
                </span>
              )}
            </div>
          </div>

          {/* Image count badge */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm text-white/80 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Camera className="w-3 h-3" />
            {vehicle.images.length}
          </div>

          {/* Bottom price reveal on hover */}
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="font-heading font-bold text-lg text-white drop-shadow-lg">
              £{vehicle.price.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4 md:p-5 flex flex-col flex-1">
        <Link to={`/vehicle/${vehicle.id}`}>
          <h3 className="font-heading font-bold text-card-foreground group-hover:text-gold transition-colors duration-300 line-clamp-1">
            {vehicle.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 text-gold/60" />
          <span>{vehicle.location}</span>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/50">
          <span className="flex items-center gap-1° text-xs text-muted-foreground">
            <div className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center">
              <Gauge className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <span className="ml-1">{vehicle.mileage.toLocaleString()}</span>
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <div className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center">
              <Fuel className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <span className="ml-1">{vehicle.fuel}</span>
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <div className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center">
              <Settings2 className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <span className="ml-1">{vehicle.transmission}</span>
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-end justify-between mt-auto pt-4">
          <span className="font-heading font-bold text-xl text-gold">
            £{vehicle.price.toLocaleString()}
          </span>
          <Link
            to={`/vehicle/${vehicle.id}`}
            className="text-xs font-semibold text-gold/70 hover:text-gold transition-colors flex items-center gap-1"
          >
            View Details
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
