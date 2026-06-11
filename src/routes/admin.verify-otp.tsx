import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import { verifyOtp } from "@/lib/api";
import { toast } from "sonner";
import { z } from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const verifyOtpSearchSchema = z.object({
  email: z.string().default(""),
});

export const Route = createFileRoute("/admin/verify-otp")({
  validateSearch: verifyOtpSearchSchema,
  component: AdminVerifyOtp,
});

function AdminVerifyOtp() {
  const navigate = useNavigate();
  const { email } = Route.useSearch();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Missing email address. Please request a new OTP.");
      return;
    }
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit OTP code.");
      return;
    }

    setLoading(true);

    try {
      const res = await verifyOtp(email, otp);
      toast.success(res.message || "OTP verified successfully!");
      // Redirect to reset-password with email as search param
      navigate({
        to: "/admin/reset-password",
        search: { email },
      });
    } catch (err: any) {
      toast.error(err.message || "Invalid or expired OTP. Please try again.");
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
        <h1 className="text-center font-display text-3xl">Verify OTP</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          We sent a verification code to{" "}
          <span className="text-gold font-medium break-all">
            {email || "your email"}
          </span>
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground self-start">
            Verification Code
          </label>
          <div className="flex justify-center w-full my-2">
            <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)}>
              <InputOTPGroup className="gap-2">
                <InputOTPSlot
                  index={0}
                  className="h-12 w-12 text-lg border border-border/60 rounded-xl bg-background/50 text-foreground focus:border-gold focus:ring-1 focus:ring-gold"
                />
                <InputOTPSlot
                  index={1}
                  className="h-12 w-12 text-lg border border-border/60 rounded-xl bg-background/50 text-foreground focus:border-gold focus:ring-1 focus:ring-gold"
                />
                <InputOTPSlot
                  index={2}
                  className="h-12 w-12 text-lg border border-border/60 rounded-xl bg-background/50 text-foreground focus:border-gold focus:ring-1 focus:ring-gold"
                />
                <InputOTPSlot
                  index={3}
                  className="h-12 w-12 text-lg border border-border/60 rounded-xl bg-background/50 text-foreground focus:border-gold focus:ring-1 focus:ring-gold"
                />
                <InputOTPSlot
                  index={4}
                  className="h-12 w-12 text-lg border border-border/60 rounded-xl bg-background/50 text-foreground focus:border-gold focus:ring-1 focus:ring-gold"
                />
                <InputOTPSlot
                  index={5}
                  className="h-12 w-12 text-lg border border-border/60 rounded-xl bg-background/50 text-foreground focus:border-gold focus:ring-1 focus:ring-gold"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || otp.length !== 6}
          className="mt-8 w-full rounded-full bg-gradient-to-r from-gold to-gold-soft py-3 text-sm font-semibold text-background shadow-gold disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Verifying…
            </span>
          ) : (
            "Verify OTP"
          )}
        </button>

        <div className="mt-6 flex justify-between text-xs">
          <Link
            to="/admin/forgot-password"
            className="inline-flex items-center gap-1.5 text-gold/70 hover:text-gold transition font-medium"
          >
            <ArrowLeft className="h-3 w-3" /> Resend OTP
          </Link>
          <Link
            to="/admin/login"
            className="text-muted-foreground hover:text-foreground transition font-medium"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
