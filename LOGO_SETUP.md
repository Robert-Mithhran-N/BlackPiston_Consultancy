# BlackPiston Logo Setup Instructions

## ⚠️ IMPORTANT: Add Your Logo Image

The application is configured to display your BlackPiston Consultancy logo, but you need to add the actual image file.

### Step 1: Save Your Logo
1. Take the circular BlackPiston logo image (with piston, flames, and "CONSULTANCY" text)
2. Save it as: `public/blackpiston-logo.png`
3. Recommended specifications:
   - Format: PNG with transparent background (or black background)
   - Minimum size: 400x400 pixels
   - Recommended: 800x800 pixels or higher for crisp display on all devices
   - File size: Keep under 200KB for fast loading

### Step 2: Verify Logo Display
After adding the file, the logo will automatically appear in:
- ✅ Header navigation (all pages)
- ✅ Footer (all pages)
- ✅ Login/Signup page
- ✅ 404 Error page
- ✅ Browser favicon
- ✅ Social media previews (Open Graph)

### Logo Specifications by Location

#### Header (Navigation Bar)
- Mobile: 48px height
- Tablet: 52px height
- Desktop: 56px height
- Auto-width maintaining aspect ratio

#### Footer
- Desktop: 80px height
- Mobile: 64px height

#### Auth Page (Login/Signup)
- Desktop: 96px height
- Mobile: 80px height

#### 404 Page
- Desktop: 112px height
- Mobile: 88px height

### Technical Implementation Details

✅ **Responsive Scaling**: Logo scales proportionally on all screen sizes
✅ **Aspect Ratio**: Maintained at all breakpoints (no stretching/distortion)
✅ **Crisp Rendering**: Optimized for high-DPI displays (Retina, 4K)
✅ **Center Alignment**: Horizontally and vertically centered
✅ **No Modifications**: Original logo used without color changes or effects
✅ **Fallback**: SVG backup logo displays if PNG is missing
✅ **Performance**: Optimized loading with proper image rendering

### Fallback System
If `blackpiston-logo.png` is not found, the system will:
1. Try to load `blackpiston-logo.svg` (currently available)
2. If both fail, display "BP" text logo as final fallback

### File Location
```
project-root/
└── public/
    ├── blackpiston-logo.png  ← ADD YOUR LOGO HERE
    ├── blackpiston-logo.svg  (fallback - already created)
    ├── favicon.ico
    └── robots.txt
```

### Quick Test
1. Add your logo to `public/blackpiston-logo.png`
2. Refresh browser (Ctrl+F5 or Cmd+Shift+R)
3. Logo should appear immediately in header, footer, and all pages

### Troubleshooting
- **Logo not showing?** Check file name is exactly `blackpiston-logo.png`
- **Logo blurry?** Use higher resolution image (800x800px minimum)
- **Logo too large?** File will auto-scale, but keep under 200KB for performance
- **Wrong colors?** Ensure you're using the original logo without modifications

---

**Note**: The logo implementation follows strict rules:
- ✅ Original logo only (no redesign)
- ✅ Scaling and cropping allowed
- ✅ Center alignment
- ✅ Aspect ratio maintained
- ❌ No color changes
- ❌ No effects or filters
- ❌ No stretching or distortion
