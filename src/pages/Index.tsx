import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSearch from "@/components/HeroSearch";
import TrustBadges from "@/components/TrustBadges";
import VehicleCard from "@/components/VehicleCard";
import { vehicles } from "@/data/vehicles";

const featured = vehicles.filter((v) => v.featured);

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HeroSearch />
        <TrustBadges />

        {/* Featured Vehicles */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-gold text-sm font-semibold tracking-widest uppercase">Handpicked</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-1">
                  Featured Vehicles
                </h2>
              </div>
              <Link
                to="/search"
                className="hidden md:flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-dark transition-colors"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.slice(0, 6).map((vehicle, i) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <VehicleCard vehicle={vehicle} />
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center md:hidden">
              <Link
                to="/search"
                className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-dark"
              >
                View all vehicles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-gradient-primary">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Sell Your Vehicle?
              </h2>
              <p className="text-primary-foreground/60 max-w-lg mx-auto mb-8">
                List your car or motorbike on BlackPiston and reach thousands of verified buyers
              </p>
              <Link
                to="/create-listing"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-accent-foreground font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Create Free Listing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
