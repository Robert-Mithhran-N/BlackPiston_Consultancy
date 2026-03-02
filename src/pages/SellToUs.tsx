import { useState } from "react";
import { Check, Upload, ArrowRight, ArrowLeft, Image, Car, Bike, Mail, Phone, User, AlertCircle, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = ["Vehicle Info", "Condition", "Photos", "Price & Contact", "Review"];

const inputClass =
    "w-full h-11 border border-border rounded-lg bg-card px-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-[#D4B06A]/50 focus:outline-none transition-all duration-200";

const labelClass = "block text-xs font-medium text-muted-foreground mb-1.5 tracking-wide";

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
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
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
                    <div className="text-center max-w-md px-4 animate-fade-in-up">
                        <div className="w-20 h-20 mx-auto rounded-full bg-[#0F3D2E]/10 flex items-center justify-center mb-6">
                            <CheckCircle className="w-10 h-10 text-[#0F3D2E]" />
                        </div>
                        <h1 className="font-heading text-2xl font-bold text-foreground mb-3">Request Submitted</h1>
                        <p className="text-muted-foreground mb-2">
                            Your sell request <span className="font-semibold text-[#D4B06A]">#{requestId}</span> has been received.
                        </p>
                        <p className="text-muted-foreground text-sm mb-8">
                            Our acquisition team will review your vehicle and contact you within 24–48 hours.
                        </p>
                        <a href="/" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C9A14A] hover:bg-[#C49A52] text-[#111111] font-semibold rounded-lg transition-all duration-200 text-sm">
                            Back to Home <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background">
                <div className="container max-w-2xl py-8 md:py-12">
                    <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
                        Sell to BlackPiston
                    </h1>
                    <p className="text-muted-foreground text-sm mb-8">
                        Submit your vehicle for a competitive acquisition offer
                    </p>

                    {/* Stepper */}
                    <div className="flex items-center gap-1 mb-10 overflow-x-auto pb-2">
                        {steps.map((s, i) => (
                            <div key={s} className="flex items-center gap-1">
                                <button
                                    onClick={() => i < step && setStep(i)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${i === step
                                            ? "bg-[#D4B06A] text-[#111111]"
                                            : i < step
                                                ? "bg-[#0F3D2E]/10 text-[#0F3D2E]"
                                                : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    {i < step ? <Check className="w-3 h-3" /> : <span>{i + 1}</span>}
                                    {s}
                                </button>
                                {i < steps.length - 1 && <div className="w-4 h-px bg-border shrink-0" />}
                            </div>
                        ))}
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-luxury">
                        {/* Step 1: Vehicle Info */}
                        {step === 0 && (
                            <div className="space-y-5">
                                <h2 className="font-heading text-lg font-bold mb-4">Vehicle Information</h2>
                                {/* Type Toggle */}
                                <div>
                                    <label className={labelClass}>Vehicle Type</label>
                                    <div className="flex gap-2">
                                        {[
                                            { value: "car", label: "Car", icon: Car },
                                            { value: "motorbike", label: "Motorbike", icon: Bike },
                                        ].map(({ value, label, icon: Icon }) => (
                                            <button
                                                key={value}
                                                type="button"
                                                onClick={() => update("type", value)}
                                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${form.type === value
                                                        ? "border-[#D4B06A] bg-[#D4B06A]/10 text-[#111111]"
                                                        : "border-border text-muted-foreground hover:border-[#D4B06A]/50"
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
                                <h2 className="font-heading text-lg font-bold mb-4">Condition & History</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Mileage</label>
                                        <input type="number" placeholder="e.g. 25000" className={inputClass} value={form.mileage} onChange={e => update("mileage", e.target.value)} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Condition</label>
                                        <select className={inputClass} value={form.condition} onChange={e => update("condition", e.target.value)}>
                                            <option>Excellent</option>
                                            <option>Good</option>
                                            <option>Fair</option>
                                            <option>Needs Work</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Fuel Type</label>
                                        <select className={inputClass} value={form.fuel} onChange={e => update("fuel", e.target.value)}>
                                            <option>Petrol</option>
                                            <option>Diesel</option>
                                            <option>Electric</option>
                                            <option>Hybrid</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Transmission</label>
                                        <select className={inputClass} value={form.transmission} onChange={e => update("transmission", e.target.value)}>
                                            <option>Automatic</option>
                                            <option>Manual</option>
                                            <option>PDK</option>
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
                                <h2 className="font-heading text-lg font-bold mb-4">Upload Photos</h2>
                                <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-[#D4B06A]/50 transition-colors cursor-pointer">
                                    <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                                    <p className="text-sm font-medium text-foreground mb-1">
                                        Drag & drop photos here
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        or click to browse · Max 20 photos · JPG, PNG, WebP
                                    </p>
                                </div>
                                <div className="grid grid-cols-4 gap-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="aspect-square rounded-lg bg-muted flex items-center justify-center border border-border">
                                            <Image className="w-6 h-6 text-muted-foreground" />
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-[#0F3D2E]/5 border border-[#0F3D2E]/10 rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground">
                                        <strong>Tip:</strong> Include exterior shots from all angles, interior, engine bay, and any damage areas. Better photos help us give you a faster, more accurate offer.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Price & Contact */}
                        {step === 3 && (
                            <div className="space-y-5">
                                <h2 className="font-heading text-lg font-bold mb-4">Asking Price & Contact</h2>
                                <div>
                                    <label className={labelClass}>Your Asking Price (£)</label>
                                    <input type="number" placeholder="e.g. 25000" className={inputClass} value={form.askingPrice} onChange={e => update("askingPrice", e.target.value)} />
                                    <p className="text-xs text-muted-foreground mt-1">Our team will provide a final offer after reviewing your vehicle.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className={labelClass}>Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input placeholder="John Doe" className={`${inputClass} pl-10`} value={form.name} onChange={e => update("name", e.target.value)} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input type="email" placeholder="you@example.com" className={`${inputClass} pl-10`} value={form.email} onChange={e => update("email", e.target.value)} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Phone</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input type="tel" placeholder="+44 7XXX XXX XXX" className={`${inputClass} pl-10`} value={form.phone} onChange={e => update("phone", e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Additional Notes</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Any details about your vehicle that may help our assessment..."
                                        className="w-full border border-border rounded-lg bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-[#D4B06A]/50 focus:outline-none resize-none"
                                        value={form.notes}
                                        onChange={e => update("notes", e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 5: Review */}
                        {step === 4 && (
                            <div className="space-y-5">
                                <h2 className="font-heading text-lg font-bold mb-4">Review Your Submission</h2>
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
                                        <div key={label}>
                                            <p className="text-xs text-muted-foreground">{label}</p>
                                            <p className="font-medium text-foreground">{val || "—"}</p>
                                        </div>
                                    ))}
                                </div>
                                {form.notes && (
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Notes</p>
                                        <p className="text-sm text-foreground">{form.notes}</p>
                                    </div>
                                )}
                                <div className="bg-[#D4B06A]/10 border border-[#D4B06A]/20 rounded-lg p-4">
                                    <div className="flex items-start gap-2">
                                        <AlertCircle className="w-4 h-4 text-[#D4B06A] mt-0.5 shrink-0" />
                                        <p className="text-sm text-foreground">
                                            By submitting, you confirm the information is accurate. Our acquisition team will review your request and contact you within <strong>24–48 hours</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-border">
                            <button
                                onClick={prev}
                                disabled={step === 0}
                                className="flex items-center gap-1 px-5 h-10 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                            {step === steps.length - 1 ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="flex items-center gap-2 px-6 h-10 bg-[#C9A14A] hover:bg-[#C49A52] text-[#111111] font-semibold rounded-lg transition-all duration-200 text-sm disabled:opacity-50 active:scale-[0.97]"
                                >
                                    {submitting ? "Submitting..." : "Submit Request"}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    onClick={next}
                                    className="flex items-center gap-1 px-6 h-10 bg-[#C9A14A] hover:bg-[#C49A52] text-[#111111] font-semibold rounded-lg transition-all duration-200 text-sm active:scale-[0.97]"
                                >
                                    Continue <ArrowRight className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SellToUs;
