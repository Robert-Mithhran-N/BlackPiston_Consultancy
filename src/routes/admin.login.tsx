import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md rounded-3xl border border-border/50 bg-glass-strong p-10 shadow-elegant">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-soft text-background">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-center font-display text-3xl">Aurum admin</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Atelier console — staff only</p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Email</label>
            <input type="email" placeholder="lea@aurum.com" className="mt-2 w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm outline-none focus:border-gold" />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Password</label>
            <input type="password" placeholder="••••••••" className="mt-2 w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm outline-none focus:border-gold" />
          </div>
        </div>

        <button className="mt-8 w-full rounded-full bg-gradient-to-r from-gold to-gold-soft py-3 text-sm font-semibold text-background shadow-gold">
          Enter atelier
        </button>
        <div className="mt-4 text-center text-xs text-muted-foreground">
          Forgot your credentials? Contact ops@aurum.com
        </div>
      </form>
    </div>
  );
}
