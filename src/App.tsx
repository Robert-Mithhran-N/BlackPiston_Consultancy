import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Search from "./pages/Search";
import VehicleDetail from "./pages/VehicleDetail";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import SellToUs from "./pages/SellToUs";
import NotFound from "./pages/NotFound";

// Admin imports
import { AdminShell } from "./components/admin/AdminShell";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminListings from "./pages/admin/AdminListings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPurchaseRequests from "./pages/admin/AdminPurchaseRequests";
import AdminInventoryDrafts from "./pages/admin/AdminInventoryDrafts";
import AdminInventoryPublished from "./pages/admin/AdminInventoryPublished";
import AdminInventoryCreate from "./pages/admin/AdminInventoryCreate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* User-facing routes */}
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<Search />} />
          <Route path="/vehicle/:id" element={<VehicleDetail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sell-to-us" element={<SellToUs />} />

          {/* Admin routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminShell />}>
            <Route index element={<AdminDashboard />} />
            <Route path="listings" element={<AdminListings />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="purchase-requests" element={<AdminPurchaseRequests />} />
            <Route path="inventory/drafts" element={<AdminInventoryDrafts />} />
            <Route path="inventory/published" element={<AdminInventoryPublished />} />
            <Route path="inventory/create" element={<AdminInventoryCreate />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
