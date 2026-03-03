import { ShieldCheck, Award, Clock, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { icon: ShieldCheck, title: "Verified Sellers", desc: "Every dealer is vetted and verified", color: "from-emerald-500/20 to-emerald-600/5" },
  { icon: Award, title: "Quality Assured", desc: "Full inspection reports available", color: "from-amber-500/20 to-amber-600/5" },
  { icon: Clock, title: "Fast & Simple", desc: "Contact sellers in under 3 taps", color: "from-blue-500/20 to-blue-600/5" },
  { icon: Headphones, title: "Expert Support", desc: "Dedicated consultancy team", color: "from-purple-500/20 to-purple-600/5" },
];

const TrustBadges = () => (
  <section className="py-16 md:py-24 bg-background relative overflow-hidden">
    {/* Subtle background accent */}
    <div className="absolute inset-0 bg-gradient-luxury pointer-events-none" />

    <div className="container relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative bg-card rounded-2xl border border-border/60 p-6 md:p-7 text-center transition-all duration-500 hover:border-gold/20 hover:shadow-glow-gold"
          >
            {/* Gradient glow background */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${badge.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="relative z-10">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:shadow-glow-primary">
                <badge.icon className="w-7 h-7 text-primary transition-colors duration-300 group-hover:text-gold" />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-1.5">{badge.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{badge.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;
