import { ShieldCheck, Award, Clock, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { icon: ShieldCheck, title: "Verified Sellers", desc: "Every dealer is vetted and verified" },
  { icon: Award, title: "Quality Assured", desc: "Full inspection reports available" },
  { icon: Clock, title: "Fast & Simple", desc: "Contact sellers in under 3 taps" },
  { icon: Headphones, title: "Expert Support", desc: "Dedicated consultancy team" },
];

const TrustBadges = () => (
  <section className="py-16 md:py-20 bg-background">
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <badge.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-foreground">{badge.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{badge.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;
