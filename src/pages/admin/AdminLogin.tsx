import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail, ShieldCheck, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

const ADMIN_EMAIL = 'blackpistongarages@gmail.com';
const ADMIN_PASSWORD = 'admin@2510';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate brief loading for UX
        setTimeout(() => {
            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                localStorage.setItem('isAdmin', 'true');
                navigate('/admin');
            } else {
                setError('Invalid admin credentials');
            }
            setLoading(false);
        }, 600);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B2E22] via-[#0F3D2E] to-[#0B2E22] p-4">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#C9A14A]/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#C9A14A]/5 rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo / Branding */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#C9A14A] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#C9A14A]/20">
                        <ShieldCheck className="w-8 h-8 text-[#0B2E22]" />
                    </div>
                    <h1 className="font-heading text-2xl font-bold text-white">Admin Console</h1>
                    <p className="text-[#D4B06A]/60 text-sm mt-1">BlackPiston Consultancy</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-luxury-lg">
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="admin-email" className="text-[#D4B06A] text-sm">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                <Input
                                    id="admin-email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#C9A14A]/50"
                                    placeholder="Enter admin email"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="admin-password" className="text-[#D4B06A] text-sm">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                <Input
                                    id="admin-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#C9A14A]/50"
                                    placeholder="Enter password"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#C9A14A] hover:bg-[#C9A14A]/90 text-[#0B2E22] font-semibold h-11 transition-all duration-200"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-[#0B2E22]/30 border-t-[#0B2E22] rounded-full animate-spin" />
                                    Signing in...
                                </span>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Security note */}
                    <div className="mt-6 pt-5 border-t border-white/10">
                        <p className="text-white/25 text-xs text-center flex items-center justify-center gap-1.5">
                            <Lock className="w-3 h-3" />
                            Restricted access — authorized administrators only
                        </p>
                    </div>
                </div>

                {/* Back to main site */}
                <p className="text-center mt-6">
                    <a
                        href="/"
                        className="text-[#D4B06A]/40 text-sm hover:text-[#D4B06A]/70 transition-colors"
                    >
                        ← Back to main site
                    </a>
                </p>
            </div>
        </div>
    );
}
