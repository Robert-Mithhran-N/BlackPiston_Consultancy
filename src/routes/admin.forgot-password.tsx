import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import { forgotPassword } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/forgot-password")({
  component: AdminForgotPassword,
});

function AdminForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await forgotPassword(email);
      toast.success(res.message || "OTP sent successfully!");
      // Redirect to verify otp page with email as search param
      navigate({
        to: "/admin/verify-otp",
        search: { email },
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to send OTP. Please check the email.");
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
        <h1 className="text-center font-display text-3xl">Reset Password</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Enter admin email to receive a 6-digit OTP code.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@blackpiston.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              <Loader2 className="h-4 w-4 animate-spin" /> Sending OTP…
            </span>
          ) : (
            "Send OTP"
          )}
        </button>

        <div className="mt-6 flex justify-center">
          <Link
            to="/admin/login"
            className="inline-flex items-center gap-2 text-xs text-gold/70 hover:text-gold transition font-medium"
          >
            <ArrowLeft className="h-3 w-3" /> Back to sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
