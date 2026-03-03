import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Award, Zap, Star, ChevronRight } from "lucide-react";
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

        {/* Trust Badges */}
        <TrustBadges />

        {/* Featured Vehicles */}
        <section className="py-16 md:py-24 bg-muted/30 relative">
          <div className="absolute inset-0 bg-gradient-luxury pointer-events-none" />
          <div className="container relative z-10">
            <div className="flex items-end justify-between mb-10">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block text-gold text-xs font-bold tracking-super-wide uppercase mb-2"
                >
                  Handpicked
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
                >
                  Featured <span className="text-gradient-gold">Vehicles</span>
                </motion.h2>
              </div>
              <Link
                to="/search"
                className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-dark transition-colors group"
              >
                View all
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {featured.slice(0, 6).map((vehicle, i) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <VehicleCard vehicle={vehicle} />
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center md:hidden">
              <Link
                to="/search"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-dark"
              >
                View all vehicles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 section-divider" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-gold text-xs font-bold tracking-super-wide uppercase">Simple Process</span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
                How It <span className="text-gradient-gold">Works</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
              {/* Connecting line (desktop only) */}
              <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

              {[
                { step: "01", title: "Browse & Discover", desc: "Explore our curated collection of premium vehicles, each inspected and certified by our team.", icon: "🔍" },
                { step: "02", title: "Connect & Enquire", desc: "Reach out to our dedicated team for any questions, arrange viewings, or request valuations.", icon: "💬" },
                { step: "03", title: "Drive Away Happy", desc: "Complete your purchase with confidence knowing every vehicle meets our quality standards.", icon: "🏁" },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center relative"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-gold/15 to-gold/5 border border-gold/10 flex items-center justify-center mb-5 text-2xl relative z-10 shadow-glow-gold">
                    {item.icon}
                  </div>
                  <span className="text-gold/30 font-heading font-black text-4xl absolute -top-2 left-1/2 -translate-x-1/2 z-0">{item.step}</span>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose BlackPiston */}
        <section className="py-16 md:py-24 bg-[#080808] relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0F3D2E]/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A14A]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-gold text-xs font-bold tracking-super-wide uppercase">Why Choose Us</span>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 mb-5">
                  The <span className="text-gradient-premium">Premium</span> Standard
                </h2>
                <p className="text-white/40 leading-relaxed mb-8 max-w-lg">
                  BlackPiston sets the benchmark for automotive excellence. Every vehicle in our collection undergoes rigorous inspection, ensuring you receive nothing but the finest.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: ShieldCheck, title: "150-Point Inspection", desc: "Every vehicle passes our comprehensive quality assessment" },
                    { icon: Award, title: "Certified Pre-Owned", desc: "Full documentation and transparent vehicle history" },
                    { icon: Zap, title: "Instant Valuations", desc: "Get a fair market price for your vehicle within minutes" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                      className="flex gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0 group-hover:border-gold/20 group-hover:bg-gold/5 transition-all duration-300">
                        <item.icon className="w-5 h-5 text-gold/70 group-hover:text-gold transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-white text-sm mb-1">{item.title}</h4>
                        <p className="text-white/35 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { value: "8+", label: "Years of Experience", accent: "from-emerald-500/15 to-emerald-600/5" },
                  { value: "1,200+", label: "Vehicles Sold", accent: "from-amber-500/15 to-amber-600/5" },
                  { value: "99%", label: "Customer Satisfaction", accent: "from-blue-500/15 to-blue-600/5" },
                  { value: "24/7", label: "Expert Support", accent: "from-purple-500/15 to-purple-600/5" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className={`relative rounded-2xl bg-gradient-to-b ${stat.accent} border border-white/5 p-6 md:p-8 text-center group hover:border-gold/15 transition-all duration-500`}
                  >
                    <div className="font-heading font-black text-3xl md:text-4xl text-gradient-premium mb-2">
                      {stat.value}
                    </div>
                    <p className="text-white/40 text-xs md:text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 section-divider" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-gold text-xs font-bold tracking-super-wide uppercase">Testimonials</span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
                What Our <span className="text-gradient-gold">Clients</span> Say
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Ravi Kumar", role: "BMW M4 Owner", quote: "BlackPiston made buying my dream car incredibly smooth. The team was transparent, professional, and the vehicle exceeded expectations.", rating: 5 },
                { name: "Priya Sharma", role: "Porsche 911 Owner", quote: "Selling my car through BlackPiston was hassle-free. They offered a fair price and the entire process was completed within days.", rating: 5 },
                { name: "Arun Patel", role: "Mercedes GLE Owner", quote: "The quality of vehicles in their collection is outstanding. Every car is well-maintained and fully documented. Highly recommend!", rating: 5 },
              ].map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card rounded-2xl border border-border/60 p-6 md:p-8 relative group hover:border-gold/20 hover:shadow-glow-gold transition-all duration-500"
                >
                  {/* Quote mark */}
                  <div className="text-gold/10 font-heading font-black text-6xl absolute top-4 right-6 leading-none">"</div>

                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-[#C9A14A] fill-[#C9A14A]" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 relative z-10">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                      <span className="font-heading font-bold text-gold text-sm">{t.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-heading font-bold text-foreground text-sm">{t.name}</p>
                      <p className="text-muted-foreground text-xs">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Marquee */}
        <section className="py-12 md:py-16 bg-muted/20 overflow-hidden">
          <div className="container mb-8">
            <p className="text-center text-xs font-semibold text-muted-foreground tracking-super-wide uppercase">Brands We Deal In</p>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} className="flex items-center gap-12 mx-6">
                  {["BMW", "Mercedes-Benz", "Porsche", "Audi", "Lamborghini", "Ferrari", "Ducati", "Kawasaki", "Royal Enfield", "Yamaha", "Honda", "KTM"].map(
                    (brand) => (
                      <span key={`${setIdx}-${brand}`} className="text-xl md:text-2xl font-heading font-bold text-foreground/10 hover:text-gold/30 transition-colors duration-300 cursor-default select-none">
                        {brand}
                      </span>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-28 bg-gradient-to-br from-[#0F3D2E] via-[#0a2e21] to-[#0F3D2E] relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-30 bg-noise pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A14A]/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="container text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-gold text-xs font-semibold tracking-wider uppercase mb-6">
                Get In Touch
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
                Interested in a <span className="text-gradient-premium">Vehicle</span>?
              </h2>
              <p className="text-white/40 max-w-lg mx-auto mb-10 leading-relaxed">
                Reach out to our team for enquiries, viewings, or expert advice. We're here to help you find your perfect machine.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+919361081244"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] hover:from-[#B8913F] hover:to-[#C9A14A] text-[#111111] font-bold px-10 py-4 rounded-xl transition-all duration-300 text-base shadow-lg shadow-[#C9A14A]/20 active:scale-[0.97] group"
                >
                  Call Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://wa.me/919361081244"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-white/5 border border-white/15 hover:bg-white/10 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 text-base backdrop-blur-sm active:scale-[0.97]"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
