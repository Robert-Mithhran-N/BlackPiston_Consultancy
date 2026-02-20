import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [showPw, setShowPw] = useState(false);

  const inputClass =
    "w-full h-11 border border-border rounded-lg bg-card px-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold/50 focus:outline-none transition-shadow";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-background py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mb-4">
              <span className="font-heading font-black text-lg text-foreground">BP</span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              {mode === "login" ? "Welcome Back" : mode === "signup" ? "Create Account" : "Reset Password"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "login"
                ? "Sign in to your BlackPiston account"
                : mode === "signup"
                ? "Join the premium automotive marketplace"
                : "We'll send you a reset link"}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-luxury">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Full Name</label>
                  <input type="text" placeholder="John Doe" className={inputClass} />
                </div>
              )}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
                <input type="email" placeholder="you@example.com" className={inputClass} />
              </div>
              {mode !== "forgot" && (
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      placeholder="••••••••"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label="Toggle password visibility"
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {mode === "login" && (
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-xs text-gold hover:text-gold-dark"
                >
                  Forgot password?
                </button>
              )}

              <button
                type="submit"
                className="w-full h-11 bg-gold hover:bg-gold-dark text-accent-foreground font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {mode !== "forgot" && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-card px-3 text-muted-foreground">or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="h-11 border border-border rounded-lg text-sm font-medium text-card-foreground hover:border-gold hover:text-gold transition-colors">
                    Google
                  </button>
                  <button className="h-11 border border-border rounded-lg text-sm font-medium text-card-foreground hover:border-gold hover:text-gold transition-colors">
                    Apple
                  </button>
                </div>
              </>
            )}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button onClick={() => setMode("signup")} className="text-gold hover:text-gold-dark font-medium">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={() => setMode("login")} className="text-gold hover:text-gold-dark font-medium">
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
