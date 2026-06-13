import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Gauge, Zap } from "lucide-react";
import type { ApiVehicle } from "@/lib/api";

export function VehicleCard({ v, index = 0 }: { v: ApiVehicle; index?: number }) {
  const imageUrl = v.images?.[0]?.url || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <Link
        to="/vehicles/$id"
        params={{ id: v._id }}
        className="block overflow-hidden rounded-3xl border border-border/50 bg-card shadow-elegant"
      >
        <div className="relative aspect-[16/11] overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={v.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface">
              <span className="font-mono text-xs text-muted-foreground">No image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          <div className="absolute left-4 top-4 flex gap-2">
            <span className="rounded-full bg-glass px-3 py-1 text-[10px] text-foreground font-mono uppercase tracking-widest">
              {v.year}
            </span>
            <span className="rounded-full bg-gold/15 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-gold">
              {v.type}
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-soft text-background opacity-0 transition group-hover:opacity-100"
          >
            <ArrowUpRight className="h-5 w-5" />
          </motion.div>
        </div>

        <div className="space-y-4 p-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {v.brand}
            </div>
            <h3 className="mt-1 font-display text-2xl">{v.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{v.tagline}</p>
          </div>

          <div className="flex items-center gap-4 border-t border-border/40 pt-4 text-xs text-muted-foreground">
            {v.power && <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-gold" /> {v.power}</span>}
            {v.acceleration && <span className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5 text-gold" /> {v.acceleration}</span>}
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">From</div>
              <div className="font-display text-2xl text-gradient-gold">
                ₹{v.price.toLocaleString('en-IN')}
              </div>
            </div>
            <span className="text-xs text-foreground/70 underline-offset-4 group-hover:text-gold group-hover:underline">
              Discover →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
