import { Star, ShieldCheck, Phone, MessageCircle, Calendar } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";

interface SellerCardProps {
  seller: Vehicle["seller"];
}

const SellerCard = ({ seller }: SellerCardProps) => (
  <div className="bg-card rounded-xl border border-border p-5 shadow-luxury">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="font-heading font-bold text-primary text-lg">
          {seller.name.charAt(0)}
        </span>
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <h4 className="font-heading font-bold text-card-foreground">{seller.name}</h4>
          {seller.verified && <ShieldCheck className="w-4 h-4 text-gold" />}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="w-3 h-3 text-gold fill-gold" />
          {seller.rating} · {seller.reviewCount} reviews · {seller.type === "dealer" ? "Dealer" : "Private"} · Since {seller.memberSince}
        </div>
      </div>
    </div>

    <div className="space-y-2">
      <a
        href={`tel:${seller.phone}`}
        className="flex items-center justify-center gap-2 w-full h-11 bg-gold hover:bg-gold-dark text-accent-foreground font-semibold rounded-lg transition-colors text-sm"
      >
        <Phone className="w-4 h-4" />
        Call Seller
      </a>
      <button className="flex items-center justify-center gap-2 w-full h-11 border border-border text-card-foreground hover:border-gold hover:text-gold font-medium rounded-lg transition-colors text-sm">
        <MessageCircle className="w-4 h-4" />
        Message Seller
      </button>
      <button className="flex items-center justify-center gap-2 w-full h-11 border border-border text-card-foreground hover:border-gold hover:text-gold font-medium rounded-lg transition-colors text-sm">
        <Calendar className="w-4 h-4" />
        Book Test Drive
      </button>
    </div>
  </div>
);

export default SellerCard;
