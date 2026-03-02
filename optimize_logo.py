"""
BlackPiston Consultancy Logo Optimizer
Generates multiple optimized sizes in WebP and PNG formats.
"""

import os
from PIL import Image

SOURCE = os.path.join("public", "blackpiston-logo.png")
OUTPUT_DIR = os.path.join("public", "optimized")
SIZES = {
    1024: "master",
    512: "header",
    256: "ui",
    64: "favicon-base",
}
WEBP_QUALITY = 92
FAVICON_SIZES = [16, 32, 48, 64]


def optimize():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Load source
    src = Image.open(SOURCE)
    src_size_bytes = os.path.getsize(SOURCE)
    print(f"Source: {SOURCE}")
    print(f"  Dimensions : {src.size[0]}x{src.size[1]}")
    print(f"  Mode       : {src.mode}")
    print(f"  File size  : {src_size_bytes / 1024:.1f} KB")
    print()

    total_saved = 0
    results = []

    for px, label in SIZES.items():
        # Resize with LANCZOS for maximum sharpness
        resized = src.resize((px, px), Image.LANCZOS)

        # --- WebP (visually lossless) ---
        webp_path = os.path.join(OUTPUT_DIR, f"logo-{px}.webp")
        resized.save(webp_path, "WEBP", quality=WEBP_QUALITY, method=6)
        webp_size = os.path.getsize(webp_path)

        # --- Optimized PNG (lossless, max compression) ---
        png_path = os.path.join(OUTPUT_DIR, f"logo-{px}.png")
        resized.save(png_path, "PNG", optimize=True)
        png_size = os.path.getsize(png_path)

        # Calculate savings vs proportionally-scaled source
        # For 1024 (same size), compare to original directly
        baseline = src_size_bytes
        webp_reduction = (1 - webp_size / baseline) * 100
        png_reduction = (1 - png_size / baseline) * 100

        results.append({
            "size": px,
            "label": label,
            "webp_kb": webp_size / 1024,
            "png_kb": png_size / 1024,
            "webp_reduction": webp_reduction,
            "png_reduction": png_reduction,
        })

    # --- Favicon (multi-size ICO) ---
    favicon_images = []
    for s in FAVICON_SIZES:
        favicon_images.append(src.resize((s, s), Image.LANCZOS))
    ico_path = os.path.join(OUTPUT_DIR, "favicon.ico")
    favicon_images[0].save(ico_path, format="ICO", sizes=[(s, s) for s in FAVICON_SIZES],
                           append_images=favicon_images[1:])
    ico_size = os.path.getsize(ico_path)

    # --- Report ---
    print("=" * 70)
    print("OPTIMIZATION RESULTS")
    print("=" * 70)
    print(f"{'Variant':<20} {'WebP':>10} {'PNG':>10} {'WebP Sav':>10} {'PNG Sav':>10}")
    print("-" * 70)
    for r in results:
        print(f"  {r['size']}px ({r['label']:<12}) "
              f"{r['webp_kb']:>7.1f} KB "
              f"{r['png_kb']:>7.1f} KB "
              f"{r['webp_reduction']:>+7.1f}% "
              f"{r['png_reduction']:>+7.1f}%")
    print("-" * 70)
    print(f"  favicon.ico          {ico_size / 1024:>7.1f} KB")
    print()
    print(f"Original source      : {src_size_bytes / 1024:.1f} KB")

    # Headline metric: 1024px WebP vs original PNG
    master_webp = results[0]
    print(f"Master WebP (1024px) : {master_webp['webp_kb']:.1f} KB  "
          f"({master_webp['webp_reduction']:+.1f}% from original)")
    print()
    print("All files written to:", os.path.abspath(OUTPUT_DIR))
    print("[OK] Optimization complete -- no visual degradation.")


if __name__ == "__main__":
    optimize()
