import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Rocket, Upload, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

const inputClass =
    "w-full h-11 border border-border rounded-lg bg-card px-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-[#D4B06A]/50 focus:outline-none";

const labelClass = "block text-xs font-medium text-muted-foreground mb-1.5 tracking-wide";

const AdminInventoryCreate = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        type: "car", make: "", model: "", year: "", title: "",
        price: "", mileage: "", fuel: "Petrol", transmission: "Automatic",
        color: "", location: "", description: "",
        engine: "", horsepower: "", topSpeed: "", acceleration: "", drivetrain: "AWD", seats: "5",
        features: "",
    });

    const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

    const handleSubmit = async (publish: boolean) => {
        setSubmitting(true);
        try {
            const body = {
                type: form.type, make: form.make, model: form.model,
                year: Number(form.year),
                title: form.title || `${form.year} ${form.make} ${form.model}`,
                price: Number(form.price), mileage: Number(form.mileage),
                fuel: form.fuel, transmission: form.transmission,
                color: form.color, location: form.location,
                description: form.description,
                images: [],
                specs: {
                    engine: form.engine, horsepower: Number(form.horsepower),
                    topSpeed: form.topSpeed, acceleration: form.acceleration,
                    drivetrain: form.drivetrain, seats: Number(form.seats),
                },
                features: form.features.split(",").map(f => f.trim()).filter(Boolean),
                published: publish,
            };
            await fetch("/api/admin/inventory", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            navigate(publish ? "/admin/inventory/published" : "/admin/inventory/drafts");
        } catch {
            // Error handling
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                </button>
                <div>
                    <h1 className="font-heading text-2xl font-bold text-foreground">Create Inventory Item</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Add a new vehicle to admin inventory</p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-8">
                {/* Vehicle Info */}
                <section className="space-y-4">
                    <h2 className="font-heading text-base font-bold text-foreground">Vehicle Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Type</label>
                            <select className={inputClass} value={form.type} onChange={e => update("type", e.target.value)}>
                                <option value="car">Car</option>
                                <option value="motorbike">Motorbike</option>
                            </select>
                        </div>
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
                        <div className="col-span-2">
                            <label className={labelClass}>Listing Title</label>
                            <input placeholder="Auto-generated if left empty" className={inputClass} value={form.title} onChange={e => update("title", e.target.value)} />
                        </div>
                    </div>
                </section>

                {/* Details */}
                <section className="space-y-4">
                    <h2 className="font-heading text-base font-bold text-foreground">Details & Pricing</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Listing Price (£)</label>
                            <input type="number" placeholder="e.g. 65000" className={inputClass} value={form.price} onChange={e => update("price", e.target.value)} />
                        </div>
                        <div>
                            <label className={labelClass}>Mileage</label>
                            <input type="number" placeholder="e.g. 15000" className={inputClass} value={form.mileage} onChange={e => update("mileage", e.target.value)} />
                        </div>
                        <div>
                            <label className={labelClass}>Fuel</label>
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
                            <label className={labelClass}>Location</label>
                            <input placeholder="e.g. London, UK" className={inputClass} value={form.location} onChange={e => update("location", e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea rows={3} placeholder="Vehicle description..." className="w-full border border-border rounded-lg bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-[#D4B06A]/50 focus:outline-none resize-none" value={form.description} onChange={e => update("description", e.target.value)} />
                    </div>
                </section>

                {/* Specs */}
                <section className="space-y-4">
                    <h2 className="font-heading text-base font-bold text-foreground">Specifications</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div><label className={labelClass}>Engine</label><input placeholder="e.g. 3.0L Twin-Turbo" className={inputClass} value={form.engine} onChange={e => update("engine", e.target.value)} /></div>
                        <div><label className={labelClass}>Horsepower</label><input type="number" placeholder="e.g. 503" className={inputClass} value={form.horsepower} onChange={e => update("horsepower", e.target.value)} /></div>
                        <div><label className={labelClass}>Top Speed</label><input placeholder="e.g. 180 mph" className={inputClass} value={form.topSpeed} onChange={e => update("topSpeed", e.target.value)} /></div>
                        <div><label className={labelClass}>0-60</label><input placeholder="e.g. 3.8s" className={inputClass} value={form.acceleration} onChange={e => update("acceleration", e.target.value)} /></div>
                        <div>
                            <label className={labelClass}>Drivetrain</label>
                            <select className={inputClass} value={form.drivetrain} onChange={e => update("drivetrain", e.target.value)}>
                                <option>AWD</option><option>RWD</option><option>FWD</option><option>Chain</option><option>Shaft</option>
                            </select>
                        </div>
                        <div><label className={labelClass}>Seats</label><input type="number" placeholder="5" className={inputClass} value={form.seats} onChange={e => update("seats", e.target.value)} /></div>
                    </div>
                </section>

                {/* Features */}
                <section className="space-y-4">
                    <h2 className="font-heading text-base font-bold text-foreground">Features</h2>
                    <div>
                        <label className={labelClass}>Comma-separated feature list</label>
                        <input placeholder="e.g. Panoramic Roof, Night Vision, Heated Seats" className={inputClass} value={form.features} onChange={e => update("features", e.target.value)} />
                    </div>
                </section>

                {/* Photos Placeholder */}
                <section className="space-y-4">
                    <h2 className="font-heading text-base font-bold text-foreground">Photos</h2>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-[#D4B06A]/50 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                    </div>
                </section>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border">
                    <Button
                        variant="outline"
                        className="flex-1 h-11 text-sm"
                        disabled={submitting}
                        onClick={() => handleSubmit(false)}
                    >
                        <Save className="w-4 h-4 mr-2" /> Save as Draft
                    </Button>
                    <Button
                        className="flex-1 h-11 text-sm bg-[#C9A14A] text-[#111111] hover:bg-[#C49A52]"
                        disabled={submitting}
                        onClick={() => handleSubmit(true)}
                    >
                        <Rocket className="w-4 h-4 mr-2" /> {submitting ? "Saving..." : "Publish Now"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AdminInventoryCreate;
