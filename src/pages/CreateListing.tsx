import { useState } from "react";
import { Check, Upload, ArrowRight, ArrowLeft, Image, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = ["Basic Info", "Specifications", "Photos", "Pricing", "Preview"];

const inputClass =
  "w-full h-11 border border-border rounded-lg bg-card px-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold/50 focus:outline-none";

const CreateListing = () => {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container max-w-2xl py-8 md:py-12">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            Create Listing
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            List your vehicle on BlackPiston in just a few steps
          </p>

          {/* Stepper */}
          <div className="flex items-center gap-1 mb-10 overflow-x-auto pb-2">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <button
                  onClick={() => setStep(i)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    i === step
                      ? "bg-gold text-accent-foreground"
                      : i < step
                      ? "bg-primary/10 text-primary"
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
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="font-heading text-lg font-bold mb-4">Basic Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Vehicle Type</label>
                    <select className={inputClass} aria-label="Vehicle type">
                      <option>Car</option>
                      <option>Motorbike</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Make</label>
                    <input placeholder="e.g. BMW" className={inputClass} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Model</label>
                    <input placeholder="e.g. M4 Competition" className={inputClass} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Year</label>
                    <input type="number" placeholder="2024" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Title</label>
                  <input placeholder="e.g. 2024 BMW M4 Competition xDrive" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your vehicle..."
                    className="w-full border border-border rounded-lg bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold/50 focus:outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">VIN (Optional)</label>
                  <input placeholder="Vehicle identification number" className={inputClass} />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-heading text-lg font-bold mb-4">Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Mileage</label>
                    <input type="number" placeholder="e.g. 15000" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Fuel Type</label>
                    <select className={inputClass}>
                      <option>Petrol</option>
                      <option>Diesel</option>
                      <option>Electric</option>
                      <option>Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Transmission</label>
                    <select className={inputClass}>
                      <option>Automatic</option>
                      <option>Manual</option>
                      <option>PDK</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Colour</label>
                    <input placeholder="e.g. Black Sapphire" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Engine</label>
                    <input placeholder="e.g. 3.0L Twin-Turbo" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Horsepower</label>
                    <input type="number" placeholder="e.g. 503" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Drivetrain</label>
                    <select className={inputClass}>
                      <option>RWD</option>
                      <option>AWD</option>
                      <option>FWD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Location</label>
                    <input placeholder="e.g. London, UK" className={inputClass} />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-heading text-lg font-bold mb-4">Upload Photos</h2>
                <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-gold/50 transition-colors cursor-pointer">
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
                    <div
                      key={i}
                      className="aspect-square rounded-lg bg-muted flex items-center justify-center border border-border"
                    >
                      <Image className="w-6 h-6 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-heading text-lg font-bold mb-4">Pricing</h2>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Asking Price (£)</label>
                  <input type="number" placeholder="e.g. 65000" className={inputClass} />
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="negotiable" className="rounded border-border text-gold focus:ring-gold" />
                  <label htmlFor="negotiable" className="text-sm text-card-foreground">Price is negotiable</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="exchange" className="rounded border-border text-gold focus:ring-gold" />
                  <label htmlFor="exchange" className="text-sm text-card-foreground">Open to part exchange</label>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5 text-center py-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-heading text-xl font-bold">Ready to Publish</h2>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Review your listing details and publish when ready. Your listing will be live instantly.
                </p>
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
              <button
                onClick={step === steps.length - 1 ? undefined : next}
                className="flex items-center gap-1 px-6 h-10 bg-gold hover:bg-gold-dark text-accent-foreground font-semibold rounded-lg transition-colors text-sm"
              >
                {step === steps.length - 1 ? "Publish Listing" : "Continue"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateListing;
