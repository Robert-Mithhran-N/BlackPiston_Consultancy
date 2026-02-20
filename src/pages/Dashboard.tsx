import { Heart, Search, MessageCircle, Car, User, Settings } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { vehicles } from "@/data/vehicles";

const tabs = [
  { id: "saved", label: "Saved Vehicles", icon: Heart },
  { id: "searches", label: "Saved Searches", icon: Search },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "listings", label: "My Listings", icon: Car },
  { id: "profile", label: "Profile", icon: User },
];

const Dashboard = () => {
  const [active, setActive] = useState("saved");
  const savedVehicles = vehicles.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container py-8 md:py-12">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">Dashboard</h1>

          <div className="flex gap-8">
            {/* Sidebar Nav */}
            <nav className="hidden md:block w-56 shrink-0 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`flex items-center gap-2.5 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Mobile Tabs */}
            <div className="md:hidden flex gap-1 overflow-x-auto pb-4 mb-4 w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    active === tab.id ? "bg-gold text-accent-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {active === "saved" && (
                <div>
                  <h2 className="font-heading text-xl font-bold mb-4">Saved Vehicles</h2>
                  {savedVehicles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {savedVehicles.map((v) => (
                        <VehicleCard key={v.id} vehicle={v} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState message="No saved vehicles yet" action="Browse vehicles" to="/search" />
                  )}
                </div>
              )}

              {active === "searches" && (
                <EmptyState message="No saved searches" action="Search vehicles" to="/search" />
              )}

              {active === "messages" && (
                <EmptyState message="No messages yet" action="Find a vehicle" to="/search" />
              )}

              {active === "listings" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading text-xl font-bold">My Listings</h2>
                    <Link
                      to="/create-listing"
                      className="text-sm font-medium text-gold hover:text-gold-dark transition-colors"
                    >
                      + Create Listing
                    </Link>
                  </div>
                  <EmptyState message="No listings yet" action="Create your first listing" to="/create-listing" />
                </div>
              )}

              {active === "profile" && (
                <div className="max-w-md">
                  <h2 className="font-heading text-xl font-bold mb-6">Profile Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Full Name</label>
                      <input className="w-full h-11 border border-border rounded-lg bg-card px-4 text-sm text-card-foreground focus:ring-2 focus:ring-gold/50 focus:outline-none" defaultValue="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
                      <input className="w-full h-11 border border-border rounded-lg bg-card px-4 text-sm text-card-foreground focus:ring-2 focus:ring-gold/50 focus:outline-none" defaultValue="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Phone</label>
                      <input className="w-full h-11 border border-border rounded-lg bg-card px-4 text-sm text-card-foreground focus:ring-2 focus:ring-gold/50 focus:outline-none" placeholder="+44 7XXX XXX XXX" />
                    </div>
                    <button className="h-10 px-6 bg-gold hover:bg-gold-dark text-accent-foreground font-semibold rounded-lg transition-colors text-sm">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const EmptyState = ({ message, action, to }: { message: string; action: string; to: string }) => (
  <div className="text-center py-16 bg-card border border-border rounded-xl">
    <p className="text-muted-foreground mb-3">{message}</p>
    <Link to={to} className="text-sm font-medium text-gold hover:text-gold-dark transition-colors">
      {action} →
    </Link>
  </div>
);

export default Dashboard;
