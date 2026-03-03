import { Heart, Search, MessageCircle, Car, User, FileText, TrendingUp, Eye, Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { vehicles } from "@/data/vehicles";

const tabs = [
  { id: "saved", label: "Saved Vehicles", icon: Heart },
  { id: "searches", label: "Saved Searches", icon: Search },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "requests", label: "My Sell Requests", icon: FileText },
  { id: "profile", label: "Profile", icon: User },
];

const Dashboard = () => {
  const [active, setActive] = useState("saved");
  const savedVehicles = vehicles.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <div className="bg-gradient-dark border-b border-gold/10">
          <div className="container py-8 md:py-10">
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-white">
              My <span className="text-gradient-premium">Dashboard</span>
            </h1>
            <p className="text-white/40 text-sm mt-2">Manage your vehicles, requests, and preferences</p>
          </div>
        </div>

        <div className="container py-6 md:py-10">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            {[
              { icon: Heart, label: "Saved", value: "3", color: "from-rose-500/15 to-rose-600/5" },
              { icon: Eye, label: "Viewed This Week", value: "12", color: "from-blue-500/15 to-blue-600/5" },
              { icon: FileText, label: "Pending Requests", value: "1", color: "from-amber-500/15 to-amber-600/5" },
              { icon: TrendingUp, label: "Market Alerts", value: "5", color: "from-emerald-500/15 to-emerald-600/5" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`bg-gradient-to-b ${stat.color} rounded-2xl border border-border/40 p-4 md:p-5 group hover:border-gold/15 transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
                  <span className="font-heading font-black text-2xl text-foreground">{stat.value}</span>
                </div>
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-8">
            {/* Sidebar Nav */}
            <nav className="hidden md:block w-56 shrink-0 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`relative flex items-center gap-2.5 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${active === tab.id
                      ? "bg-gold/10 text-gold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  {active === tab.id && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-2 bottom-2 w-[3px] bg-gradient-to-b from-[#C9A14A] to-[#D4B06A] rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Mobile Tabs */}
            <div className="md:hidden flex gap-1.5 overflow-x-auto pb-4 mb-4 w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${active === tab.id
                      ? "bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] text-[#111111] shadow-sm"
                      : "bg-muted/50 text-muted-foreground"
                    }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {active === "saved" && (
                  <div>
                    <h2 className="font-heading text-xl font-bold mb-5">Saved Vehicles</h2>
                    {savedVehicles.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {savedVehicles.map((v) => (
                          <VehicleCard key={v.id} vehicle={v} />
                        ))}
                      </div>
                    ) : (
                      <EmptyState icon="💜" message="No saved vehicles yet" action="Browse vehicles" to="/search" />
                    )}
                  </div>
                )}

                {active === "searches" && (
                  <EmptyState icon="🔍" message="No saved searches" action="Search vehicles" to="/search" />
                )}

                {active === "messages" && (
                  <EmptyState icon="💬" message="No messages yet" action="Browse inventory" to="/search" />
                )}

                {active === "requests" && (
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="font-heading text-xl font-bold">My Sell Requests</h2>
                      <Link
                        to="/sell-to-us"
                        className="text-sm font-semibold text-gold hover:text-gold-dark transition-colors flex items-center gap-1"
                      >
                        + Submit a Vehicle
                      </Link>
                    </div>
                    <EmptyState icon="📋" message="No sell requests yet" action="Sell a vehicle to BlackPiston" to="/sell-to-us" />
                  </div>
                )}

                {active === "profile" && (
                  <div className="max-w-md">
                    <h2 className="font-heading text-xl font-bold mb-6">Profile Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground mb-2 tracking-wider uppercase">Full Name</label>
                        <input className="w-full h-12 border border-border/60 rounded-xl bg-card px-4 text-sm text-card-foreground focus:ring-2 focus:ring-gold/30 focus:border-gold/40 focus:outline-none transition-all hover:border-gold/25" defaultValue="John Doe" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground mb-2 tracking-wider uppercase">Email</label>
                        <input className="w-full h-12 border border-border/60 rounded-xl bg-card px-4 text-sm text-card-foreground focus:ring-2 focus:ring-gold/30 focus:border-gold/40 focus:outline-none transition-all hover:border-gold/25" defaultValue="john@example.com" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground mb-2 tracking-wider uppercase">Phone</label>
                        <input className="w-full h-12 border border-border/60 rounded-xl bg-card px-4 text-sm text-card-foreground focus:ring-2 focus:ring-gold/30 focus:border-gold/40 focus:outline-none transition-all hover:border-gold/25" placeholder="+91 XXXXX XXXXX" />
                      </div>
                      <button className="h-11 px-7 bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] hover:from-[#B8913F] hover:to-[#C9A14A] text-[#111111] font-semibold rounded-xl transition-all duration-300 text-sm active:scale-[0.97] shadow-glow-gold">
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const EmptyState = ({ icon, message, action, to }: { icon: string; message: string; action: string; to: string }) => (
  <div className="text-center py-16 bg-card border border-border/60 rounded-2xl">
    <div className="w-16 h-16 mx-auto rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
      <span className="text-2xl">{icon}</span>
    </div>
    <p className="text-foreground font-heading font-bold mb-2">{message}</p>
    <Link to={to} className="text-sm font-semibold text-gold hover:text-gold-dark transition-colors">
      {action} →
    </Link>
  </div>
);

export default Dashboard;
