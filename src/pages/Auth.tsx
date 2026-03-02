import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, AlertCircle } from "lucide-react";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [showPw, setShowPw] = useState(false);
  const [error] = useState("");

  const inputBase =
    "w-full h-12 bg-white/5 border border-white/10 rounded-lg px-4 pl-11 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A14A]/50 focus:border-transparent transition-all duration-200";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B2E22] via-[#0F3D2E] to-[#0B2E22] p-4 relative overflow-hidden">
      {/* Decorative background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#C9A14A]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#C9A14A]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A14A]/3 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Branding */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="mx-auto mb-5 flex justify-center items-center" style={{ minHeight: "80px" }}>
            <img
              src="/blackpiston-logo.png"
              alt="BlackPiston Consultancy"
              className="h-24 w-auto object-contain mx-auto drop-shadow-2xl"
              onError={(e) => {
                const target = e.currentTarget;
                target.src = "/blackpiston-logo.svg";
                target.onerror = () => {
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                };
              }}
            />
            <div className="hidden w-14 h-14 rounded-xl bg-[#C9A14A] flex items-center justify-center mx-auto shadow-lg shadow-[#C9A14A]/20">
              <span className="font-heading font-black text-xl text-[#0B2E22]">BP</span>
            </div>
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">
            {mode === "login" ? "Welcome Back" : mode === "signup" ? "Create Account" : "Reset Password"}
          </h1>
          <p className="text-[#D4B06A]/50 text-sm mt-1.5">
            {mode === "login"
              ? "Sign in to your BlackPiston account"
              : mode === "signup"
                ? "Join the premium automotive marketplace"
                : "We'll send you a reset link"}
          </p>
        </div>

        {/* Glass Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-7 shadow-luxury-lg animate-fade-in-up-delay-1">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {/* Full Name (signup only) */}
            {mode === "signup" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#D4B06A]/80 tracking-wide">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={inputBase}
                    autoComplete="name"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#D4B06A]/80 tracking-wide">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={inputBase}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            {mode !== "forgot" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#D4B06A]/80 tracking-wide">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    className={`${inputBase} pr-11`}
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Forgot Password Link */}
            {mode === "login" && (
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-xs text-[#C9A14A]/70 hover:text-[#C9A14A] transition-colors"
              >
                Forgot password?
              </button>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 bg-[#C9A14A] hover:bg-[#B8913F] text-[#111111] font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm shadow-[#C9A14A]/20 active:scale-[0.97] mt-2"
            >
              {mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Login */}
          {mode !== "forgot" && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-transparent px-3 text-white/30">or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="h-11 border border-white/10 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:border-white/20 hover:text-white transition-all duration-200 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button className="h-11 border border-white/10 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:border-white/20 hover:text-white transition-all duration-200 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Apple
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mode Toggle */}
        <p className="text-center text-sm text-white/40 mt-6 animate-fade-in-up-delay-2">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button onClick={() => setMode("signup")} className="text-[#C9A14A] hover:text-[#D4B06A] font-medium transition-colors">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setMode("login")} className="text-[#C9A14A] hover:text-[#D4B06A] font-medium transition-colors">
                Sign in
              </button>
            </>
          )}
        </p>

        {/* Admin Login Link */}
        <p className="text-center mt-4 animate-fade-in-up-delay-3">
          <Link
            to="/admin-login"
            className="text-xs text-white/20 hover:text-white/40 transition-colors"
          >
            Admin Login →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
