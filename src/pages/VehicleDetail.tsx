import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Share2, ChevronLeft, ChevronRight, MapPin, Gauge, Fuel, Settings2, Car, Users } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SellerCard from "@/components/SellerCard";
import VehicleCard from "@/components/VehicleCard";
import { vehicles } from "@/data/vehicles";

const VehicleDetail = () => {
  const { id } = useParams();
  const vehicle = vehicles.find((v) => v.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [saved, setSaved] = useState(false);

  if (!vehicle) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold mb-2">Vehicle Not Found</h1>
            <Link to="/search" className="text-gold hover:text-gold-dark text-sm">Browse all vehicles</Link>
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
      <main className="flex-1 bg-background">
        <div className="container py-4 md:py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/search" className="flex items-center gap-1 hover:text-gold transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Search
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Gallery */}
              <div className="relative rounded-xl overflow-hidden bg-muted aspect-[16/10]">
                <motion.img
                  key={activeImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={vehicle.images[activeImg]}
                  alt={`${vehicle.title} - Image ${activeImg + 1}`}
                  className="w-full h-full object-cover"
                />
                {vehicle.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg((p) => (p === 0 ? vehicle.images.length - 1 : p - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 backdrop-blur hover:bg-card text-card-foreground transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImg((p) => (p === vehicle.images.length - 1 ? 0 : p + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 backdrop-blur hover:bg-card text-card-foreground transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {vehicle.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${i === activeImg ? "bg-gold" : "bg-card/60"}`}
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
                      className={`shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-colors ${
                        i === activeImg ? "border-gold" : "border-transparent hover:border-border"
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
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{vehicle.location}</span>
                    <span>{vehicle.mileage.toLocaleString()} miles</span>
                    <span>{vehicle.year}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-heading text-3xl font-bold text-gold">
                    £{vehicle.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => setSaved(!saved)}
                    className={`p-2 rounded-lg border transition-colors ${
                      saved ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground hover:text-gold hover:border-gold"
                    }`}
                    aria-label={saved ? "Unsave" : "Save"}
                  >
                    <Heart className="w-5 h-5" fill={saved ? "currentColor" : "none"} />
                  </button>
                  <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-gold hover:border-gold transition-colors" aria-label="Share">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <spec.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{spec.label}</div>
                      <div className="text-sm font-semibold text-card-foreground">{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{vehicle.description}</p>
              </div>

              {/* Features */}
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">Features</h2>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((f) => (
                    <span key={f} className="px-3 py-1.5 bg-muted text-muted-foreground text-sm rounded-md">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Performance */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-gradient-primary rounded-lg p-4 text-center">
                  <div className="text-2xl font-heading font-bold text-primary-foreground">{vehicle.specs.acceleration}</div>
                  <div className="text-xs text-primary-foreground/60 mt-1">0-60 mph</div>
                </div>
                <div className="bg-gradient-primary rounded-lg p-4 text-center">
                  <div className="text-2xl font-heading font-bold text-primary-foreground">{vehicle.specs.topSpeed}</div>
                  <div className="text-xs text-primary-foreground/60 mt-1">Top Speed</div>
                </div>
                <div className="bg-gradient-primary rounded-lg p-4 text-center">
                  <div className="text-2xl font-heading font-bold text-primary-foreground">{vehicle.specs.horsepower} hp</div>
                  <div className="text-xs text-primary-foreground/60 mt-1">Power</div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <SellerCard seller={vehicle.seller} />

              {/* Sticky Mobile CTA */}
              <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-card border-t border-border p-3 flex gap-2">
                <div className="flex-1">
                  <div className="font-heading font-bold text-xl text-gold">£{vehicle.price.toLocaleString()}</div>
                </div>
                <a
                  href={`tel:${vehicle.seller.phone}`}
                  className="flex items-center gap-1 px-6 py-2.5 bg-gold hover:bg-gold-dark text-accent-foreground font-semibold rounded-lg transition-colors text-sm"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Similar Vehicles */}
          {similar.length > 0 && (
            <section className="mt-16">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Similar Vehicles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
