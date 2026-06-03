import { createFileRoute } from "@tanstack/react-router";
import { UploadCloud, X } from "lucide-react";

export const Route = createFileRoute("/admin/new")({
  component: AddVehicle,
});

function AddVehicle() {
  return (
    <div>
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">New listing</div>
        <h1 className="mt-2 font-display text-4xl">Add a vehicle</h1>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* Upload */}
          <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
            <UploadCloud className="mx-auto h-10 w-10 text-gold" />
            <div className="mt-3 font-display text-xl">Drop images here</div>
            <p className="mt-1 text-sm text-muted-foreground">PNG · JPG · WEBP · up to 20MB each</p>
            <button className="mt-5 rounded-full border border-border bg-background px-5 py-2 text-xs">Browse files</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" placeholder="e.g. Noir GT Coupe" />
            <Field label="Brand" placeholder="Aurum" />
            <Field label="Type" placeholder="Coupe / SUV / Sport" />
            <Field label="Year" placeholder="2025" type="number" />
            <Field label="Mileage (km)" type="number" />
            <Field label="Price (USD)" type="number" />
            <Field label="Power" placeholder="612 hp" />
            <Field label="0–100" placeholder="2.9s" />
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Description</label>
            <textarea rows={5} className="mt-2 w-full resize-none rounded-2xl border border-border/60 bg-background/50 px-4 py-3 text-sm outline-none focus:border-gold" />
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Features</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Carbon-ceramic brakes", "Bang & Olufsen", "Massage seats", "Carbon roof"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 text-xs text-gold">
                  {t} <X className="h-3 w-3 cursor-pointer" />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Aside */}
        <aside className="space-y-4 lg:sticky lg:top-32 lg:h-fit">
          <div className="rounded-2xl border border-border/50 bg-surface p-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-gold">Status</div>
            <select className="mt-2 w-full rounded-xl border border-border/60 bg-background px-3 py-2.5 text-sm outline-none">
              <option>Draft</option>
              <option>Listed</option>
              <option>Reserved</option>
              <option>Sold</option>
            </select>
          </div>
          <div className="rounded-2xl border border-border/50 bg-surface p-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-gold">Visibility</div>
            <label className="mt-3 flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked className="accent-[oklch(0.78_0.13_80)]" /> Public site
            </label>
            <label className="mt-2 flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-[oklch(0.78_0.13_80)]" /> Featured
            </label>
          </div>
          <button className="w-full rounded-full bg-gradient-to-r from-gold to-gold-soft py-3 text-sm font-semibold text-background shadow-gold">
            Publish vehicle
          </button>
          <button className="w-full rounded-full border border-border bg-glass py-3 text-sm">Save draft</button>
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
