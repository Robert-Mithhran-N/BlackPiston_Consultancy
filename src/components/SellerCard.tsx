import { ShieldCheck, Phone, MessageCircle, Mail, BadgeCheck, Star, Clock } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";

interface SellerCardProps {
  seller: Vehicle["seller"];
  badges?: string[];
}

const SellerCard = ({ seller, badges = [] }: SellerCardProps) => (
  <div className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-luxury">
    {/* Gradient header strip */}
    <div className="h-1.5 bg-gradient-to-r from-[#0F3D2E] via-[#C9A14A] to-[#0F3D2E]" />

    <div className="p-5 md:p-6">
      {/* Dealer Header */}
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-[#0F3D2E] to-[#143d2e] flex items-center justify-center shadow-lg shadow-[#0F3D2E]/20">
          <span className="font-heading font-bold text-[#C9A14A] text-sm">BP</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-heading font-bold text-card-foreground">BlackPiston Motors</h4>
            <ShieldCheck className="w-4 h-4 text-gold" />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Certified Dealer · Verified</p>
        </div>
      </div>

      {/* Rating & Response */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-3.5 h-3.5 text-[#C9A14A] fill-[#C9A14A]" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">5.0</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>Responds in 2h</span>
        </div>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {badges.map((badge) => (
            <span key={badge} className="flex items-center gap-1 px-2.5 py-1 bg-[#0F3D2E]/8 text-[#0F3D2E] text-[10px] font-bold rounded-lg border border-[#0F3D2E]/10">
              <BadgeCheck className="w-3 h-3" />
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* Contact Buttons */}
      <div className="space-y-2.5">
        <a
          href="tel:+919361081244"
          className="flex items-center justify-center gap-2 w-full h-12 bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] hover:from-[#B8913F] hover:to-[#C9A14A] text-[#111111] font-semibold rounded-xl transition-all duration-300 text-sm shadow-lg shadow-[#C9A14A]/15 active:scale-[0.97]"
        >
          <Phone className="w-4 h-4" />
          Call Us
        </a>
        <a
          href="https://wa.me/919361081244"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full h-11 border border-border hover:border-gold/40 text-card-foreground hover:text-gold font-medium rounded-xl transition-all duration-300 text-sm hover:bg-gold/5"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
        <a
          href="mailto:blackpistongarages@gmail.com"
          className="flex items-center justify-center gap-2 w-full h-11 border border-border hover:border-gold/40 text-card-foreground hover:text-gold font-medium rounded-xl transition-all duration-300 text-sm hover:bg-gold/5"
        >
          <Mail className="w-4 h-4" />
          Email Us
        </a>
      </div>
    </div>
  </div>
);

export default SellerCard;
