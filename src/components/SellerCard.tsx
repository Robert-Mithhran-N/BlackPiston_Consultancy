import { ShieldCheck, Phone, MessageCircle, Calendar, BadgeCheck } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";

interface SellerCardProps {
  seller: Vehicle["seller"];
  badges?: string[];
}

const SellerCard = ({ seller, badges = [] }: SellerCardProps) => (
  <div className="bg-card rounded-xl border border-border p-5 shadow-luxury">
    {/* BlackPiston Dealer Header */}
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-lg bg-[#0F3D2E] flex items-center justify-center">
        <span className="font-heading font-bold text-[#C9A14A] text-sm">BP</span>
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <h4 className="font-heading font-bold text-card-foreground">BlackPiston Motors</h4>
          <ShieldCheck className="w-4 h-4 text-gold" />
        </div>
        <p className="text-xs text-muted-foreground">Certified Dealer · Verified</p>
      </div>
    </div>

    {/* Badges */}
    {badges.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mb-4">
        {badges.map((badge) => (
          <span key={badge} className="flex items-center gap-1 px-2 py-1 bg-[#0F3D2E]/10 text-[#0F3D2E] text-[10px] font-semibold rounded-full">
            <BadgeCheck className="w-3 h-3" />
            {badge}
          </span>
        ))}
      </div>
    )}

    {/* CTA Buttons */}
    <div className="space-y-2">
      <button className="flex items-center justify-center gap-2 w-full h-11 bg-gold hover:bg-gold-dark text-accent-foreground font-semibold rounded-lg transition-colors text-sm">
        <MessageCircle className="w-4 h-4" />
        Enquire Now
      </button>
      <button className="flex items-center justify-center gap-2 w-full h-11 border border-border text-card-foreground hover:border-gold hover:text-gold font-medium rounded-lg transition-colors text-sm">
        <Calendar className="w-4 h-4" />
        Request Test Drive
      </button>
      <a
        href={`tel:${seller.phone}`}
        className="flex items-center justify-center gap-2 w-full h-11 border border-border text-card-foreground hover:border-gold hover:text-gold font-medium rounded-lg transition-colors text-sm"
      >
        <Phone className="w-4 h-4" />
        Call Us
      </a>
    </div>
  </div>
);

export default SellerCard;
