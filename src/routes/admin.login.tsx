import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  return (
    <div className="w-full max-w-md">
      <form onSubmit={(e) => e.preventDefault()} className="w-full rounded-3xl border border-border/50 bg-glass-strong p-10 shadow-elegant">
        <div className="mx-auto flex justify-center mb-6">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-gold/30 p-1 bg-background shadow-gold">
            <img src={logo} alt="BlackPiston Logo" className="h-full w-full object-contain rounded-full" />
          </div>
        </div>
        <h1 className="text-center font-display text-3xl">BlackPiston</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Management console — staff only</p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Email</label>
            <input type="email" placeholder="staff@blackpiston.com" className="mt-2 w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm outline-none focus:border-gold" />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Password</label>
            <input type="password" placeholder="••••••••" className="mt-2 w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm outline-none focus:border-gold" />
          </div>
        </div>

        <button className="mt-8 w-full rounded-full bg-gradient-to-r from-gold to-gold-soft py-3 text-sm font-semibold text-background shadow-gold">
          Enter console
        </button>
        <div className="mt-6 text-center text-xs text-muted-foreground">
          Forgot your credentials? Contact ops@blackpiston.com
        </div>
        <Link to="/" className="mt-4 block text-center text-xs text-gold/70 hover:text-gold transition">
          Back to website
        </Link>
      </form>
    </div>
  );
}
