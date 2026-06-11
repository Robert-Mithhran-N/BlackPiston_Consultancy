import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import { resetPassword } from "@/lib/api";
import { toast } from "sonner";
import { z } from "zod";

const resetPasswordSearchSchema = z.object({
  email: z.string().default(""),
});

export const Route = createFileRoute("/admin/reset-password")({
  validateSearch: resetPasswordSearchSchema,
  component: AdminResetPassword,
});

function AdminResetPassword() {
  const navigate = useNavigate();
  const { email } = Route.useSearch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Missing email address. Please request a new OTP.");
      return;
    }
    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await resetPassword(email, password);
      toast.success(res.message || "Password updated successfully!");
      // Redirect to login
      navigate({ to: "/admin/login" });
    } catch (err: any) {
      toast.error(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-3xl border border-border/50 bg-glass-strong p-10 shadow-elegant"
      >
        <div className="mx-auto flex justify-center mb-6">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-gold/30 p-1 bg-background shadow-gold">
            <img
              src={logo}
              alt="BlackPiston Logo"
              className="h-full w-full object-contain rounded-full"
            />
          </div>
        </div>
        <h1 className="text-center font-display text-3xl">New Password</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Set a secure new password for your admin account.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm outline-none focus:border-gold"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full rounded-full bg-gradient-to-r from-gold to-gold-soft py-3 text-sm font-semibold text-background shadow-gold disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Updating…
            </span>
          ) : (
            "Update Password"
          )}
        </button>

        <div className="mt-6 flex justify-center">
          <Link
            to="/admin/login"
            className="inline-flex items-center gap-2 text-xs text-gold/70 hover:text-gold transition font-medium"
          >
            <ArrowLeft className="h-3 w-3" /> Cancel and sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
