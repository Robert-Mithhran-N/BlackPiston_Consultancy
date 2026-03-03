import { useState } from "react";
import { Check, Upload, ArrowRight, ArrowLeft, Image, Car, Bike, Mail, Phone, User, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = ["Vehicle Info", "Condition", "Photos", "Price & Contact", "Review"];

const inputClass =
    "w-full h-12 border border-border/60 rounded-xl bg-card px-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-[#D4B06A]/30 focus:border-[#D4B06A]/40 focus:outline-none transition-all duration-200 hover:border-gold/25";

const labelClass = "block text-xs font-bold text-muted-foreground mb-2 tracking-wider uppercase";

interface FormData {
    type: string;
    make: string;
    model: string;
    year: string;
    trim: string;
    condition: string;
    accidentHistory: string;
    serviceHistory: string;
    vin: string;
    mileage: string;
    fuel: string;
    transmission: string;
    color: string;
    askingPrice: string;
    name: string;
    email: string;
    phone: string;
    notes: string;
}

const SellToUs = () => {
    const [step, setStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [requestId, setRequestId] = useState("");
    const [form, setForm] = useState<FormData>({
        type: "car", make: "", model: "", year: "", trim: "",
        condition: "Good", accidentHistory: "no", serviceHistory: "yes",
        vin: "", mileage: "", fuel: "Petrol", transmission: "Automatic", color: "",
        askingPrice: "", name: "", email: "", phone: "", notes: "",
    });

    const update = (field: keyof FormData, value: string) => setForm(prev => ({ ...prev, [field]: value }));
    const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
    const prev = () => setStep(s => Math.max(s - 1, 0));

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const res = await fetch("/api/sell-requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name, email: form.email, phone: form.phone,
                    vehicle: {
                        type: form.type, make: form.make, model: form.model,
                        year: Number(form.year), trim: form.trim,
                        vin: form.vin, mileage: Number(form.mileage),
                        fuel: form.fuel, transmission: form.transmission,
                        color: form.color, condition: form.condition,
                        accidentHistory: form.accidentHistory === "yes",
                        serviceHistory: form.serviceHistory === "yes",
                    },
                    photos: [],
                    askingPrice: Number(form.askingPrice),
                    notes: form.notes,
                }),
            });
            const data = await res.json();
            setRequestId(data.requestId || "sr_new");
            setSubmitted(true);
        } catch {
            // Error handling
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 bg-background flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-md px-4"
                    >
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#0F3D2E]/15 to-[#0F3D2E]/5 border border-[#0F3D2E]/10 flex items-center justify-center mb-6 shadow-glow-primary">
                            <CheckCircle className="w-10 h-10 text-[#0F3D2E]" />
                        </div>
                        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">Request Submitted!</h1>
                        <p className="text-muted-foreground mb-2">
                            Your sell request <span className="font-bold text-gradient-gold">#{requestId}</span> has been received.
                        </p>
                        <p className="text-muted-foreground text-sm mb-8">
                            Our acquisition team will review your vehicle and contact you within 24–48 hours.
                        </p>
                        <a href="/" className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] hover:from-[#B8913F] hover:to-[#C9A14A] text-[#111111] font-semibold rounded-xl transition-all duration-300 text-sm shadow-glow-gold active:scale-[0.97]">
                            Back to Home <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background">
                {/* Page Header */}
                <div className="bg-gradient-dark border-b border-gold/10">
                    <div className="container py-8 md:py-10">
                        <h1 className="font-heading text-2xl md:text-3xl font-bold text-white">
                            Sell to <span className="text-gradient-premium">BlackPiston</span>
                        </h1>
                        <p className="text-white/40 text-sm mt-2">
                            Submit your vehicle for a competitive acquisition offer
                        </p>
                    </div>
                </div>

                <div className="container max-w-2xl py-8 md:py-12">
                    {/* Progress Bar */}
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-3">
                            {steps.map((s, i) => (
                                <button
                                    key={s}
                                    onClick={() => i < step && setStep(i)}
                                    className="flex flex-col items-center gap-2 group relative"
                                    style={{ flex: 1 }}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${i === step
                                            ? "bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] text-[#111111] shadow-glow-gold scale-110"
                                            : i < step
                                                ? "bg-[#0F3D2E]/15 text-[#0F3D2E] border border-[#0F3D2E]/20"
                                                : "bg-muted text-muted-foreground"
                                        }`}>
                                        {i < step ? <Check className="w-4 h-4" /> : i + 1}
                                    </div>
                                    <span className={`text-[10px] font-semibold transition-colors hidden md:block ${i === step ? "text-gold" : i < step ? "text-foreground/60" : "text-muted-foreground/50"
                                        }`}>
                                        {s}
                                    </span>
                                </button>
                            ))}
                        </div>
                        {/* Progress line */}
                        <div className="h-1 bg-muted/50 rounded-full overflow-hidden mt-1">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            />
                        </div>
                    </div>

                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-luxury"
                    >
                        {/* Step 1: Vehicle Info */}
                        {step === 0 && (
                            <div className="space-y-5">
                                <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="text-gold text-xl">🚗</span> Vehicle Information
                                </h2>
                                <div>
                                    <label className={labelClass}>Vehicle Type</label>
                                    <div className="flex gap-3">
                                        {[
                                            { value: "car", label: "Car", icon: Car },
                                            { value: "motorbike", label: "Motorbike", icon: Bike },
                                        ].map(({ value, label, icon: Icon }) => (
                                            <button
                                                key={value}
                                                type="button"
                                                onClick={() => update("type", value)}
                                                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border text-sm font-semibold transition-all duration-300 ${form.type === value
                                                    ? "border-gold/40 bg-gradient-to-r from-gold/10 to-gold/5 text-foreground shadow-glow-gold"
                                                    : "border-border/60 text-muted-foreground hover:border-gold/25 hover:bg-muted/30"
                                                    }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Make</label>
                                        <input placeholder="e.g. BMW" className={inputClass} value={form.make} onChange={e => update("make", e.target.value)} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Model</label>
                                        <input placeholder="e.g. M4 Competition" className={inputClass} value={form.model} onChange={e => update("model", e.target.value)} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Year</label>
                                        <input type="number" placeholder="2024" className={inputClass} value={form.year} onChange={e => update("year", e.target.value)} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Trim / Variant</label>
                                        <input placeholder="e.g. M Sport" className={inputClass} value={form.trim} onChange={e => update("trim", e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Condition & History */}
                        {step === 1 && (
                            <div className="space-y-5">
                                <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="text-gold text-xl">🔧</span> Condition & History
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Mileage</label>
                                        <input type="number" placeholder="e.g. 25000" className={inputClass} value={form.mileage} onChange={e => update("mileage", e.target.value)} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Condition</label>
                                        <select className={inputClass} value={form.condition} onChange={e => update("condition", e.target.value)}>
                                            <option>Excellent</option><option>Good</option><option>Fair</option><option>Needs Work</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Fuel Type</label>
                                        <select className={inputClass} value={form.fuel} onChange={e => update("fuel", e.target.value)}>
                                            <option>Petrol</option><option>Diesel</option><option>Electric</option><option>Hybrid</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Transmission</label>
                                        <select className={inputClass} value={form.transmission} onChange={e => update("transmission", e.target.value)}>
                                            <option>Automatic</option><option>Manual</option><option>PDK</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Colour</label>
                                        <input placeholder="e.g. Black Sapphire" className={inputClass} value={form.color} onChange={e => update("color", e.target.value)} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>VIN (Optional)</label>
                                        <input placeholder="Vehicle ID number" className={inputClass} value={form.vin} onChange={e => update("vin", e.target.value)} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Accident History</label>
                                        <select className={inputClass} value={form.accidentHistory} onChange={e => update("accidentHistory", e.target.value)}>
                                            <option value="no">No accidents</option>
                                            <option value="yes">Has accident history</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Service History</label>
                                        <select className={inputClass} value={form.serviceHistory} onChange={e => update("serviceHistory", e.target.value)}>
                                            <option value="yes">Full service history</option>
                                            <option value="partial">Partial</option>
                                            <option value="no">None</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Photos */}
                        {step === 2 && (
                            <div className="space-y-5">
                                <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="text-gold text-xl">📸</span> Upload Photos
                                </h2>
                                <div className="border-2 border-dashed border-border/60 rounded-2xl p-12 text-center hover:border-gold/30 hover:bg-gold/[0.02] transition-all duration-300 cursor-pointer group">
                                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gold/10 flex items-center justify-center mb-4 group-hover:shadow-glow-gold transition-all">
                                        <Upload className="w-8 h-8 text-gold/60" />
                                    </div>
                                    <p className="text-sm font-semibold text-foreground mb-1">
                                        Drag & drop photos here
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        or click to browse · Max 20 photos · JPG, PNG, WebP
                                    </p>
                                </div>
                                <div className="grid grid-cols-4 gap-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="aspect-square rounded-xl bg-muted/50 flex items-center justify-center border border-border/40 hover:border-gold/20 transition-colors">
                                            <Image className="w-6 h-6 text-muted-foreground/50" />
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-[#0F3D2E]/5 border border-[#0F3D2E]/10 rounded-xl p-4">
                                    <p className="text-xs text-muted-foreground">
                                        <strong className="text-foreground">💡 Tip:</strong> Include exterior shots from all angles, interior, engine bay, and any damage areas. Better photos help us give you a faster, more accurate offer.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Price & Contact */}
                        {step === 3 && (
                            <div className="space-y-5">
                                <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="text-gold text-xl">💰</span> Asking Price & Contact
                                </h2>
                                <div>
                                    <label className={labelClass}>Your Asking Price (£)</label>
                                    <input type="number" placeholder="e.g. 25000" className={inputClass} value={form.askingPrice} onChange={e => update("askingPrice", e.target.value)} />
                                    <p className="text-xs text-muted-foreground mt-1.5">Our team will provide a final offer after reviewing your vehicle.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className={labelClass}>Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                                            <input placeholder="John Doe" className={`${inputClass} pl-11`} value={form.name} onChange={e => update("name", e.target.value)} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                                            <input type="email" placeholder="you@example.com" className={`${inputClass} pl-11`} value={form.email} onChange={e => update("email", e.target.value)} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Phone</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                                            <input type="tel" placeholder="+91 XXXXX XXXXX" className={`${inputClass} pl-11`} value={form.phone} onChange={e => update("phone", e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Additional Notes</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Any details about your vehicle that may help our assessment..."
                                        className="w-full border border-border/60 rounded-xl bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-[#D4B06A]/30 focus:border-[#D4B06A]/40 focus:outline-none resize-none transition-all duration-200 hover:border-gold/25"
                                        value={form.notes}
                                        onChange={e => update("notes", e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 5: Review */}
                        {step === 4 && (
                            <div className="space-y-5">
                                <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="text-gold text-xl">✅</span> Review Your Submission
                                </h2>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    {[
                                        ["Type", form.type === "car" ? "Car" : "Motorbike"],
                                        ["Vehicle", `${form.year} ${form.make} ${form.model} ${form.trim}`.trim()],
                                        ["Mileage", form.mileage ? `${Number(form.mileage).toLocaleString()} miles` : "—"],
                                        ["Condition", form.condition],
                                        ["Fuel", form.fuel],
                                        ["Transmission", form.transmission],
                                        ["Colour", form.color || "—"],
                                        ["VIN", form.vin || "—"],
                                        ["Accident History", form.accidentHistory === "yes" ? "Yes" : "No"],
                                        ["Service History", form.serviceHistory === "yes" ? "Full" : form.serviceHistory === "partial" ? "Partial" : "None"],
                                        ["Asking Price", form.askingPrice ? `£${Number(form.askingPrice).toLocaleString()}` : "—"],
                                        ["Contact", form.name],
                                        ["Email", form.email],
                                        ["Phone", form.phone],
                                    ].map(([label, val]) => (
                                        <div key={label} className="bg-muted/30 rounded-xl p-3">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
                                            <p className="font-semibold text-foreground">{val || "—"}</p>
                                        </div>
                                    ))}
                                </div>
                                {form.notes && (
                                    <div className="bg-muted/30 rounded-xl p-3">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Notes</p>
                                        <p className="text-sm text-foreground">{form.notes}</p>
                                    </div>
                                )}
                                <div className="bg-gold/8 border border-gold/15 rounded-xl p-4">
                                    <div className="flex items-start gap-2.5">
                                        <AlertCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                                        <p className="text-sm text-foreground leading-relaxed">
                                            By submitting, you confirm the information is accurate. Our acquisition team will review your request and contact you within <strong>24–48 hours</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-border/40">
                            <button
                                onClick={prev}
                                disabled={step === 0}
                                className="flex items-center gap-1.5 px-5 h-11 text-sm font-semibold text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors rounded-xl hover:bg-muted/30"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                            {step === steps.length - 1 ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="flex items-center gap-2 px-7 h-11 bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] hover:from-[#B8913F] hover:to-[#C9A14A] text-[#111111] font-bold rounded-xl transition-all duration-300 text-sm disabled:opacity-50 active:scale-[0.97] shadow-glow-gold"
                                >
                                    {submitting ? "Submitting..." : "Submit Request"}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    onClick={next}
                                    className="flex items-center gap-1.5 px-7 h-11 bg-gradient-to-r from-[#C9A14A] to-[#D4B06A] hover:from-[#B8913F] hover:to-[#C9A14A] text-[#111111] font-bold rounded-xl transition-all duration-300 text-sm active:scale-[0.97] shadow-glow-gold"
                                >
                                    Continue <ArrowRight className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SellToUs;
