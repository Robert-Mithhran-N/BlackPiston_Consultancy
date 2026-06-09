import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UploadCloud, X, Loader2, CheckCircle } from "lucide-react";
import { useState, useRef } from "react";
import { createVehicle } from "@/lib/api";

export const Route = createFileRoute("/admin/new")({
  component: AddVehicle,
});

function AddVehicle() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    title: "",
    brand: "",
    category: "car",
    type: "Coupe",
    year: "2025",
    mileage: "0",
    price: "",
    power: "",
    acceleration: "",
    topSpeed: "",
    fuelType: "Petrol",
    transmission: "Automatic",
    color: "",
    tagline: "",
    description: "",
    isActive: true,
    featured: false,
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setImages((prev) => [...prev, ...newFiles]);
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => setPreviews((prev) => [...prev, e.target?.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    const f = featureInput.trim();
    if (f && !features.includes(f)) {
      setFeatures([...features, f]);
      setFeatureInput("");
    }
  };

  const removeFeature = (f: string) => setFeatures(features.filter((x) => x !== f));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.brand || !form.price) {
      setErrorMsg("Title, brand, and price are required.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("brand", form.brand);
      fd.append("category", form.category);
      fd.append("type", form.type);
      fd.append("year", form.year);
      fd.append("mileage", form.mileage);
      fd.append("price", form.price);
      fd.append("power", form.power);
      fd.append("acceleration", form.acceleration);
      fd.append("topSpeed", form.topSpeed);
      fd.append("fuelType", form.fuelType);
      fd.append("transmission", form.transmission);
      fd.append("color", form.color);
      fd.append("tagline", form.tagline);
      fd.append("description", form.description);
      fd.append("isActive", String(form.isActive));
      fd.append("featured", String(form.featured));
      fd.append("features", JSON.stringify(features));

      images.forEach((img) => fd.append("images", img));

      await createVehicle(fd);
      setStatus("success");
      setTimeout(() => navigate({ to: "/admin/inventory" }), 1500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create vehicle.");
      setStatus("error");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">New listing</div>
        <h1 className="mt-2 font-display text-4xl">Add a vehicle</h1>
      </div>

      {status === "success" && (
        <div className="mb-6 flex items-center gap-2 rounded-2xl bg-emerald-500/15 p-4 text-sm text-emerald-300">
          <CheckCircle className="h-5 w-5" /> Vehicle created! Redirecting…
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 rounded-2xl bg-red-500/15 p-4 text-sm text-red-300">{errorMsg}</div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* Upload */}
          <div
            className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
          >
            <UploadCloud className="mx-auto h-10 w-10 text-gold" />
            <div className="mt-3 font-display text-xl">Drop images here</div>
            <p className="mt-1 text-sm text-muted-foreground">PNG · JPG · WEBP · up to 20MB each</p>
            <button type="button" className="mt-5 rounded-full border border-border bg-background px-5 py-2 text-xs">Browse files</button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
          </div>

          {/* Image previews */}
          {previews.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {previews.map((p, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl border border-border/50">
                  <img src={p} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-background/80 text-foreground hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title" placeholder="e.g. Noir GT Coupe" value={form.title} onChange={set("title")} />
            <Field label="Brand" placeholder="Porsche" value={form.brand} onChange={set("brand")} />
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Category</label>
              <select value={form.category} onChange={set("category")} className="mt-2 w-full rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm outline-none focus:border-gold">
                <option value="car">Car</option>
                <option value="bike">Bike</option>
              </select>
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Type</label>
              <select value={form.type} onChange={set("type")} className="mt-2 w-full rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm outline-none focus:border-gold">
                <option>Coupe</option>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Sport</option>
                <option>Cruiser</option>
                <option>Adventure</option>
              </select>
            </div>
            <Field label="Year" placeholder="2025" type="number" value={form.year} onChange={set("year")} />
            <Field label="Mileage (km)" type="number" value={form.mileage} onChange={set("mileage")} />
            <Field label="Price (USD)" type="number" value={form.price} onChange={set("price")} />
            <Field label="Power" placeholder="612 hp" value={form.power} onChange={set("power")} />
            <Field label="0–100" placeholder="2.9s" value={form.acceleration} onChange={set("acceleration")} />
            <Field label="Top Speed" placeholder="330 km/h" value={form.topSpeed} onChange={set("topSpeed")} />
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Fuel</label>
              <select value={form.fuelType} onChange={set("fuelType")} className="mt-2 w-full rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm outline-none focus:border-gold">
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>Hybrid</option>
              </select>
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Transmission</label>
              <select value={form.transmission} onChange={set("transmission")} className="mt-2 w-full rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm outline-none focus:border-gold">
                <option>Automatic</option>
                <option>Manual</option>
              </select>
            </div>
            <Field label="Color" placeholder="Obsidian Black" value={form.color} onChange={set("color")} />
            <Field label="Tagline" placeholder="Forged in shadow..." value={form.tagline} onChange={set("tagline")} />
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Description</label>
            <textarea rows={5} value={form.description} onChange={set("description")} className="mt-2 w-full resize-none rounded-2xl border border-border/60 bg-background/50 px-4 py-3 text-sm outline-none focus:border-gold" />
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Features</label>
            <div className="mt-2 flex gap-2">
              <input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
                placeholder="Add a feature and press Enter"
                className="flex-1 rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm outline-none focus:border-gold"
              />
              <button type="button" onClick={addFeature} className="rounded-xl border border-border bg-glass px-4 py-2 text-xs">Add</button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {features.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 text-xs text-gold">
                  {t} <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(t)} />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Aside */}
        <aside className="space-y-4 lg:sticky lg:top-32 lg:h-fit">
          <div className="rounded-2xl border border-border/50 bg-surface p-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-gold">Visibility</div>
            <label className="mt-3 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="accent-[oklch(0.78_0.13_80)]"
              /> Public site
            </label>
            <label className="mt-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="accent-[oklch(0.78_0.13_80)]"
              /> Featured
            </label>
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-gradient-to-r from-gold to-gold-soft py-3 text-sm font-semibold text-background shadow-gold disabled:opacity-60"
          >
            {status === "loading" ? (
              <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Publishing…</span>
            ) : (
              "Publish vehicle"
            )}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <input {...props} className="mt-2 w-full rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm outline-none focus:border-gold" />
    </div>
  );
}
