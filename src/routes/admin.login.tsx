import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import logo from "@/assets/logo.png";
import { adminLogin } from "@/lib/api";
import { setAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await adminLogin(email, password);
      setAuth(res.data);
      navigate({ to: "/admin" });
    } catch (err: any) {
      setError(err.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="w-full rounded-3xl border border-border/50 bg-glass-strong p-10 shadow-elegant">
        <div className="mx-auto flex justify-center mb-6">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-gold/30 p-1 bg-background shadow-gold">
            <img src={logo} alt="BlackPiston Logo" className="h-full w-full object-contain rounded-full" />
          </div>
        </div>
        <h1 className="text-center font-display text-3xl">BlackPiston</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Management console — staff only</p>

        {error && (
          <div className="mt-4 rounded-xl bg-red-500/15 p-3 text-center text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="mt-8 space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Email</label>
            <input
              type="email"
              placeholder="admin@blackpiston.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm outline-none focus:border-gold"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full rounded-full bg-gradient-to-r from-gold to-gold-soft py-3 text-sm font-semibold text-background shadow-gold disabled:opacity-60"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</span>
          ) : (
            "Enter console"
          )}
        </button>
        <div className="mt-6 text-center text-xs">
          <Link
            to="/admin/forgot-password"
            className="text-gold/70 hover:text-gold transition font-medium"
          >
            Forgot password?
          </Link>
        </div>
        <Link to="/" className="mt-4 block text-center text-xs text-muted-foreground hover:text-foreground transition">
          Back to website
        </Link>
      </form>
    </div>
  );
}
