import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin, Gauge, Fuel, Settings2, Car, Users, Phone, MessageCircle, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SellerCard from "@/components/SellerCard";
import VehicleCard from "@/components/VehicleCard";
import { vehicles } from "@/data/vehicles";

const VehicleDetail = () => {
  const { id } = useParams();
  const vehicle = vehicles.find((v) => v.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowStickyBar(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!vehicle) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-muted/50 flex items-center justify-center mb-5">
              <span className="text-3xl">🚗</span>
            </div>
            <h1 className="font-heading text-2xl font-bold mb-3">Vehicle Not Found</h1>
            <Link to="/search" className="text-gold hover:text-gold-dark text-sm font-semibold transition-colors">Browse all vehicles</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const similar = vehicles.filter((v) => v.id !== vehicle.id && v.make === vehicle.make).slice(0, 3);
  if (similar.length < 3) {
    const more = vehicles.filter((v) => v.id !== vehicle.id && !similar.includes(v)).slice(0, 3 - similar.length);
    similar.push(...more);
  }

  const specs = [
    { icon: Car, label: "Engine", value: vehicle.specs.engine },
    { icon: Gauge, label: "Power", value: `${vehicle.specs.horsepower} hp` },
    { icon: Settings2, label: "Transmission", value: vehicle.transmission },
    { icon: Fuel, label: "Fuel", value: vehicle.fuel },
    { icon: MapPin, label: "Drivetrain", value: vehicle.specs.drivetrain },
    { icon: Users, label: "Seats", value: vehicle.specs.seats },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Sticky Price Bar (Desktop) */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 md:top-20 left-0 right-0 z-40 hidden lg:block bg-card/95 backdrop-blur-xl border-b border-border/30 shadow-luxury-lg"
          >
            <div className="container flex items-center justify-between h-14">
              <div className="flex items-center gap-4">
                <h2 className="font-heading font-bold text-foreground text-sm truncate max-w-md">{vehicle.title}</h2>
                <span className="text-xs text-muted-foreground">{vehicle.year} · {vehicle.mileage.toLocaleString()} mi</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-heading font-bold text-xl text-gold">£{vehicle.price.toLocaleString()}</span>
                <a
                  href="tel:+919361081244"
                  className="px-5 py-2 bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] text-[#111111] font-semibold rounded-lg text-sm transition-all active:scale-[0.97] shadow-glow-gold flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 bg-background">
        <div className="container py-4 md:py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
            <Link to="/search" className="flex items-center gap-1 hover:text-gold transition-colors hover-underline">
              <ArrowLeft className="w-4 h-4" />
              Back to Search
            </Link>
            <span className="text-border">·</span>
            <span className="text-muted-foreground/60 truncate">{vehicle.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Gallery */}
              <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[16/10] shadow-luxury-lg">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    src={vehicle.images[activeImg]}
                    alt={`${vehicle.title} - Image ${activeImg + 1}`}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                {vehicle.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg((p) => (p === 0 ? vehicle.images.length - 1 : p - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-black/30 backdrop-blur-md hover:bg-black/50 text-white transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImg((p) => (p === vehicle.images.length - 1 ? 0 : p + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-black/30 backdrop-blur-md hover:bg-black/50 text-white transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                {/* Image counter */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
                  {activeImg + 1} / {vehicle.images.length}
                </div>
                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {vehicle.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeImg ? "bg-gold w-5" : "bg-white/40 hover:bg-white/60"
                        }`}
                      aria-label={`View image ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              {vehicle.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {vehicle.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 ${i === activeImg ? "border-gold shadow-glow-gold" : "border-transparent hover:border-border opacity-70 hover:opacity-100"
                        }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}

              {/* Title & Price */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{vehicle.title}</h1>
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-gold/50" />{vehicle.location}</span>
                    <span className="text-border">·</span>
                    <span>{vehicle.mileage.toLocaleString()} miles</span>
                    <span className="text-border">·</span>
                    <span>{vehicle.year}</span>
                  </div>
                </div>
                <span className="font-heading text-3xl font-bold text-gradient-gold">
                  £{vehicle.price.toLocaleString()}
                </span>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-card border border-border/60 rounded-xl p-4 flex items-center gap-3 hover:border-gold/15 transition-colors group">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/12 to-primary/4 flex items-center justify-center shrink-0 group-hover:shadow-glow-primary transition-all">
                      <spec.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{spec.label}</div>
                      <div className="text-sm font-bold text-card-foreground">{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="bg-card border border-border/60 rounded-2xl p-6">
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{vehicle.description}</p>
              </div>

              {/* Features */}
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-4">Features</h2>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((f) => (
                    <span key={f} className="px-3.5 py-2 bg-card border border-border/60 text-muted-foreground text-sm rounded-xl hover:border-gold/15 transition-colors">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Performance */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { value: vehicle.specs.acceleration, label: "0-60 mph", icon: "⚡" },
                  { value: vehicle.specs.topSpeed, label: "Top Speed", icon: "🏎️" },
                  { value: `${vehicle.specs.horsepower} hp`, label: "Power", icon: "💪" },
                ].map((perf) => (
                  <div key={perf.label} className="bg-gradient-to-br from-[#0F3D2E] to-[#0a2e21] rounded-2xl p-5 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="text-lg mb-1 block">{perf.icon}</span>
                    <div className="text-2xl font-heading font-black text-white relative z-10">{perf.value}</div>
                    <div className="text-xs text-white/40 mt-1 relative z-10">{perf.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <SellerCard seller={vehicle.seller} badges={vehicle.badges} />
            </div>
          </div>

          {/* Mobile Contact Bar */}
          <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-card/95 backdrop-blur-xl border-t border-border/30 p-3 flex gap-2 shadow-luxury-lg">
            <a
              href="tel:+919361081244"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] text-[#111111] font-semibold rounded-xl transition-all text-sm active:scale-[0.97] shadow-glow-gold"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
            <a
              href="https://wa.me/919361081244"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-border hover:border-gold/40 text-card-foreground font-medium rounded-xl transition-all text-sm hover:bg-gold/5"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href="mailto:blackpistongarages@gmail.com"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-border hover:border-gold/40 text-card-foreground font-medium rounded-xl transition-all text-sm hover:bg-gold/5"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>

          {/* Similar Vehicles */}
          {similar.length > 0 && (
            <section className="mt-16 mb-12 lg:mb-0">
              <div className="section-divider mb-10" />
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Similar Vehicles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {similar.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VehicleDetail;
