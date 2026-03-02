import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
    const [step, setStep] = useState<'login' | '2fa'>('login');
    const [email, setEmail] = useState('admin@blackpiston.com');
    const [password, setPassword] = useState('admin123');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error || 'Login failed'); return; }
            if (data.requires2FA) { setStep('2fa'); }
            else { navigate('/admin'); }
        } catch { setError('Network error'); }
        finally { setLoading(false); }
    };

    const handleVerify2FA = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/admin/verify-2fa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error || 'Verification failed'); return; }
            navigate('/admin');
        } catch { setError('Network error'); }
        finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B2E22] via-[#0F3D2E] to-[#0B2E22] p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#C9A14A] flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <ShieldCheck className="w-8 h-8 text-[#0B2E22]" />
                    </div>
                    <h1 className="font-heading text-2xl font-bold text-white">Admin Console</h1>
                    <p className="text-[#E7D3A3]/60 text-sm mt-1">BlackPiston Consultancy</p>
                </div>

                {/* Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-luxury-lg">
                    {step === 'login' ? (
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[#E7D3A3] text-sm">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#C9A14A]/50"
                                        placeholder="admin@blackpiston.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-[#E7D3A3] text-sm">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#C9A14A]/50"
                                        placeholder="Enter password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {error && <p className="text-red-400 text-sm">{error}</p>}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#C9A14A] hover:bg-[#C9A14A]/90 text-[#0B2E22] font-semibold h-11"
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>

                            <p className="text-white/30 text-xs text-center mt-4">
                                Mock credentials: admin@blackpiston.com / admin123
                            </p>
                        </form>
                    ) : (
                        <form onSubmit={handleVerify2FA} className="space-y-5">
                            <div className="text-center mb-2">
                                <ShieldCheck className="w-10 h-10 text-[#C9A14A] mx-auto mb-2" />
                                <h2 className="font-heading text-lg font-semibold text-white">Two-Factor Authentication</h2>
                                <p className="text-white/50 text-sm mt-1">Enter the 6-digit code from your authenticator</p>
                            </div>
                            <div className="space-y-2">
                                <Input
                                    id="2fa-code"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    value={code}
                                    onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                                    className="text-center text-2xl tracking-[0.5em] bg-white/5 border-white/10 text-white font-mono focus-visible:ring-[#C9A14A]/50 h-14"
                                    placeholder="000000"
                                    autoFocus
                                    required
                                />
                            </div>

                            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                            <Button
                                type="submit"
                                disabled={loading || code.length !== 6}
                                className="w-full bg-[#C9A14A] hover:bg-[#C9A14A]/90 text-[#0B2E22] font-semibold h-11"
                            >
                                {loading ? 'Verifying...' : 'Verify'}
                            </Button>

                            <button
                                type="button"
                                onClick={() => { setStep('login'); setError(''); }}
                                className="text-[#E7D3A3]/50 text-sm w-full text-center hover:text-[#E7D3A3] transition-colors"
                            >
                                Back to login
                            </button>

                            <p className="text-white/30 text-xs text-center">Mock code: 123456</p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
