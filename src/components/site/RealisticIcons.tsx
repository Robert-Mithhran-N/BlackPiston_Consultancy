import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

// Reusable gradients and filters to prevent duplicate definitions in the DOM
const IconDefs = () => (
  <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
    <defs>
      {/* Premium Metallic Gold Gradient */}
      <linearGradient id="gold-metal-3d" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4D0" />
        <stop offset="25%" stopColor="#E6B35C" />
        <stop offset="50%" stopColor="#9C6721" />
        <stop offset="75%" stopColor="#FDE1A8" />
        <stop offset="100%" stopColor="#B88230" />
      </linearGradient>

      {/* Dark Bevel / Shadow Gradient */}
      <linearGradient id="gold-bevel-dark" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4A320E" />
        <stop offset="50%" stopColor="#7E5317" />
        <stop offset="100%" stopColor="#2A1C05" />
      </linearGradient>

      {/* Chrome Highlight Gradient */}
      <linearGradient id="chrome-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.0" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
      </linearGradient>

      {/* Soft Glow Radial Gradient */}
      <radialGradient id="gold-inner-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFECAE" stopOpacity="0.5" />
        <stop offset="60%" stopColor="#D49D3A" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#D49D3A" stopOpacity="0" />
      </radialGradient>

      {/* Volumetric Drop Shadow Filter */}
      <filter id="volumetric-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.6" />
        <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#D49D3A" floodOpacity="0.15" />
      </filter>
    </defs>
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ className, size = 36, ...props }) => {
  return (
    <>
      <IconDefs />
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        filter="url(#volumetric-shadow)"
        {...props}
      >
        {/* Background Glow */}
        <circle cx="32" cy="32" r="22" fill="url(#gold-inner-glow)" />

        {/* Shield Outer Bevel */}
        <path
          d="M32 6 L52 11.5 V27 C52 40.5 43.5 51 32 55.5 C20.5 51 12 40.5 12 27 V11.5 L32 6 Z"
          fill="url(#gold-metal-3d)"
        />

        {/* Shield Inner Dark Face */}
        <path
          d="M32 9.5 L48.5 14 V27 C48.5 38.5 41.5 47.5 32 51.5 C22.5 47.5 15.5 38.5 15.5 27 V14 L32 9.5 Z"
          fill="url(#gold-bevel-dark)"
        />

        {/* Shield Inner Highlight Plate */}
        <path
          d="M32 12 L45 15.6 V27 C45 36.3 39.5 44 32 47.5 C24.5 44 19 36.3 19 27 V15.6 L32 12 Z"
          fill="#1A150E"
          stroke="url(#gold-metal-3d)"
          strokeWidth="1.5"
        />

        {/* Core Security Crest (Beveled Chevron) */}
        <path
          d="M26 23 L32 29 L38 23 M26 31 L32 37 L38 31"
          stroke="url(#gold-metal-3d)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Diagonal Gloss Highlight */}
        <path
          d="M32 12 L19 27 V35 L40 14 L32 12 Z"
          fill="url(#chrome-highlight)"
        />
      </svg>
    </>
  );
};

export const GemIcon: React.FC<IconProps> = ({ className, size = 36, ...props }) => {
  return (
    <>
      <IconDefs />
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        filter="url(#volumetric-shadow)"
        {...props}
      >
        <circle cx="32" cy="32" r="22" fill="url(#gold-inner-glow)" />

        {/* Diamond Outer Frame */}
        <polygon
          points="32,9 50,22 43,53 21,53 14,22"
          fill="url(#gold-bevel-dark)"
          stroke="url(#gold-metal-3d)"
          strokeWidth="1.5"
        />

        {/* Beveled Facets */}
        {/* Table (Top central face) */}
        <polygon
          points="25,22 39,22 36,31 28,31"
          fill="url(#gold-metal-3d)"
          opacity="0.95"
        />

        {/* Top left star facet */}
        <polygon
          points="14,22 25,22 28,31 19,32"
          fill="url(#gold-metal-3d)"
          opacity="0.75"
        />

        {/* Top right star facet */}
        <polygon
          points="39,22 50,22 45,32 36,31"
          fill="url(#gold-metal-3d)"
          opacity="0.85"
        />

        {/* Center bottom facet */}
        <polygon
          points="28,31 36,31 32,53"
          fill="url(#gold-metal-3d)"
          opacity="0.9"
        />

        {/* Left bottom facet */}
        <polygon
          points="19,32 28,31 32,53 21,53"
          fill="url(#gold-metal-3d)"
          opacity="0.65"
        />

        {/* Right bottom facet */}
        <polygon
          points="36,31 45,32 43,53 32,53"
          fill="url(#gold-metal-3d)"
          opacity="0.8"
        />

        {/* Sparkle star overlays */}
        <path
          d="M45 12 L47 16 L51 18 L47 20 L45 24 L43 20 L39 18 L43 16 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />
        <circle cx="45" cy="18" r="2" fill="#FFEBB3" />
      </svg>
    </>
  );
};

export const ClockIcon: React.FC<IconProps> = ({ className, size = 36, ...props }) => {
  return (
    <>
      <IconDefs />
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        filter="url(#volumetric-shadow)"
        {...props}
      >
        <circle cx="32" cy="32" r="22" fill="url(#gold-inner-glow)" />

        {/* Watch Outer Bezel Ring */}
        <circle
          cx="32"
          cy="32"
          r="23"
          fill="url(#gold-bevel-dark)"
          stroke="url(#gold-metal-3d)"
          strokeWidth="2.5"
        />

        {/* Inner Watch Dial */}
        <circle
          cx="32"
          cy="32"
          r="19.5"
          fill="#130F0A"
          stroke="url(#gold-metal-3d)"
          strokeWidth="0.75"
        />

        {/* Chronograph sub-dials */}
        <circle cx="32" cy="24" r="4.5" fill="#1C160F" stroke="url(#gold-metal-3d)" strokeWidth="0.5" />
        <line x1="32" y1="24" x2="32" y2="21" stroke="url(#gold-metal-3d)" strokeWidth="0.75" />
        
        <circle cx="24" cy="32" r="4.5" fill="#1C160F" stroke="url(#gold-metal-3d)" strokeWidth="0.5" />

        {/* Dial Ticks (Hours) */}
        {/* 12, 3, 6, 9 */}
        <line x1="32" y1="14" x2="32" y2="17" stroke="url(#gold-metal-3d)" strokeWidth="2" strokeLinecap="round" />
        <line x1="50" y1="32" x2="47" y2="32" stroke="url(#gold-metal-3d)" strokeWidth="2" strokeLinecap="round" />
        <line x1="32" y1="50" x2="32" y2="47" stroke="url(#gold-metal-3d)" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="32" x2="17" y2="32" stroke="url(#gold-metal-3d)" strokeWidth="2" strokeLinecap="round" />

        {/* Hour and Minute Hands (Chronograph Style, Set to ~10:10) */}
        <line
          x1="32"
          y1="32"
          x2="22"
          y2="24"
          stroke="url(#gold-metal-3d)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="32"
          y1="32"
          x2="44"
          y2="28"
          stroke="url(#gold-metal-3d)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Super thin red/gold sweep second hand */}
        <line x1="32" y1="32" x2="32" y2="44" stroke="#FFECAE" strokeWidth="1" />

        {/* Center Pin */}
        <circle cx="32" cy="32" r="3" fill="url(#gold-metal-3d)" />
        <circle cx="32" cy="32" r="1" fill="#000000" />

        {/* Dial Reflection */}
        <path
          d="M32 14 C41.9 14 50 22.1 50 32 C50 32 40 22 32 20 Z"
          fill="url(#chrome-highlight)"
          opacity="0.3"
        />
      </svg>
    </>
  );
};

export const SparklesIcon: React.FC<IconProps> = ({ className, size = 36, ...props }) => {
  return (
    <>
      <IconDefs />
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        filter="url(#volumetric-shadow)"
        {...props}
      >
        <circle cx="32" cy="32" r="22" fill="url(#gold-inner-glow)" />

        {/* Main Center Sparkle (Beveled 4-Point Star) */}
        {/* Shaded via 8 separate triangular faces for a solid 3D metallic feel */}
        <g transform="translate(6, -2)">
          {/* Top-left tip half */}
          <polygon points="26,28 26,10 21.5,23.5" fill="url(#gold-metal-3d)" />
          {/* Top-right tip half */}
          <polygon points="26,28 26,10 30.5,23.5" fill="url(#gold-bevel-dark)" />
          {/* Right-top tip half */}
          <polygon points="26,28 44,28 30.5,23.5" fill="url(#gold-metal-3d)" />
          {/* Right-bottom tip half */}
          <polygon points="26,28 44,28 30.5,32.5" fill="url(#gold-bevel-dark)" />
          {/* Bottom-right tip half */}
          <polygon points="26,28 26,46 30.5,32.5" fill="url(#gold-metal-3d)" />
          {/* Bottom-left tip half */}
          <polygon points="26,28 26,46 21.5,32.5" fill="url(#gold-bevel-dark)" />
          {/* Left-bottom tip half */}
          <polygon points="26,28 8,28 21.5,32.5" fill="url(#gold-metal-3d)" />
          {/* Left-top tip half */}
          <polygon points="26,28 8,28 21.5,23.5" fill="url(#gold-bevel-dark)" />
        </g>

        {/* Small Sparkle 2 (Bottom Left) */}
        <g transform="translate(14, 38) scale(0.45)">
          <polygon points="20,20 20,4 16,16" fill="url(#gold-metal-3d)" />
          <polygon points="20,20 20,4 24,16" fill="url(#gold-bevel-dark)" />
          <polygon points="20,20 36,20 24,16" fill="url(#gold-metal-3d)" />
          <polygon points="20,20 36,20 24,24" fill="url(#gold-bevel-dark)" />
          <polygon points="20,20 20,36 24,24" fill="url(#gold-metal-3d)" />
          <polygon points="20,20 20,36 16,24" fill="url(#gold-bevel-dark)" />
          <polygon points="20,20 4,20 16,24" fill="url(#gold-metal-3d)" />
          <polygon points="20,20 4,20 16,16" fill="url(#gold-bevel-dark)" />
        </g>

        {/* Small Sparkle 3 (Top Right) */}
        <g transform="translate(42, 12) scale(0.4)">
          <polygon points="20,20 20,4 16,16" fill="url(#gold-metal-3d)" />
          <polygon points="20,20 20,4 24,16" fill="url(#gold-bevel-dark)" />
          <polygon points="20,20 36,20 24,16" fill="url(#gold-metal-3d)" />
          <polygon points="20,20 36,20 24,24" fill="url(#gold-bevel-dark)" />
          <polygon points="20,20 20,36 24,24" fill="url(#gold-metal-3d)" />
          <polygon points="20,20 20,36 16,24" fill="url(#gold-bevel-dark)" />
          <polygon points="20,20 4,20 16,24" fill="url(#gold-metal-3d)" />
          <polygon points="20,20 4,20 16,16" fill="url(#gold-bevel-dark)" />
        </g>

        {/* Glowing Orbs */}
        <circle cx="32" cy="26" r="2.5" fill="#FFFFFF" opacity="0.8" />
        <circle cx="18" cy="42" r="1.5" fill="#FFFFFF" opacity="0.6" />
        <circle cx="48" cy="18" r="1" fill="#FFFFFF" opacity="0.7" />
      </svg>
    </>
  );
};

export const PhoneIcon: React.FC<IconProps> = ({ className, size = 36, ...props }) => {
  return (
    <>
      <IconDefs />
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        filter="url(#volumetric-shadow)"
        {...props}
      >
        <circle cx="32" cy="32" r="22" fill="url(#gold-inner-glow)" />

        {/* 3D Curved Telephone Handle */}
        <path
          d="M20 44 C24 48 38 48 42 44 L44 41 C46 39 42 34 39 34 C36 34 36 36 34 36 C30 36 26 32 26 28 C26 26 28 26 28 23 C28 20 23 16 21 18 L18 20 C14 24 14 38 20 44 Z"
          fill="url(#gold-bevel-dark)"
          stroke="url(#gold-metal-3d)"
          strokeWidth="1.5"
        />

        {/* Volumetric Earpiece Cap */}
        <path
          d="M17 19 C18 16.5 21.5 15.5 23 17 L25.5 19.5 C27 21 26 23.5 24 24.5 Z"
          fill="url(#gold-metal-3d)"
        />

        {/* Volumetric Mouthpiece Cap */}
        <path
          d="M42 44 C44.5 43 45.5 39.5 44 38 L41.5 35.5 C40 34 37.5 35 36.5 37 Z"
          fill="url(#gold-metal-3d)"
        />

        {/* Linear Highlights on the tube handle */}
        <path
          d="M23 41 C27.5 44.5 34.5 44.5 39 41"
          stroke="url(#chrome-highlight)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Dial tones / Wave lines (Outgoing/incoming) */}
        <path
          d="M36 18 C39 20 41 23 41 27 M41 14 C45 17 47 21 47 27"
          stroke="url(#gold-metal-3d)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    </>
  );
};

export const ChatIcon: React.FC<IconProps> = ({ className, size = 36, ...props }) => {
  return (
    <>
      <IconDefs />
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        filter="url(#volumetric-shadow)"
        {...props}
      >
        <circle cx="32" cy="32" r="22" fill="url(#gold-inner-glow)" />

        {/* Back / Shadow bubble frame */}
        <path
          d="M14 43 L10 50 L18 47 C22 49 27 50 32 50 C44 50 54 41 54 30 C54 19 44 10 32 10 C20 10 10 19 10 30 C10 35 12 39.5 14 43 Z"
          fill="url(#gold-bevel-dark)"
          stroke="url(#gold-metal-3d)"
          strokeWidth="1"
        />

        {/* Inner Glassy Medallion */}
        <path
          d="M16 41.5 L13 47 L19 44.5 C22.5 46.5 27 47.5 32 47.5 C42.5 47.5 51 39.5 51 29.5 C51 19.5 42.5 11.5 32 11.5 C21.5 11.5 13 19.5 13 29.5 C13 34 14.5 38 16 41.5 Z"
          fill="#16120C"
          stroke="url(#gold-metal-3d)"
          strokeWidth="1.5"
        />

        {/* Realistic Chat Lines (Volumetric Pills) */}
        <rect x="22" y="22" width="20" height="4.5" rx="2.25" fill="url(#gold-metal-3d)" />
        <rect x="22" y="31.5" width="14" height="4.5" rx="2.25" fill="url(#gold-metal-3d)" />

        {/* Gloss Sheen Reflection */}
        <path
          d="M32 11.5 C42.5 11.5 51 19.5 51 29.5 C51 29.5 40 20.5 32 20.5 C24 20.5 13 29.5 13 29.5 C13 19.5 21.5 11.5 32 11.5 Z"
          fill="url(#chrome-highlight)"
          opacity="0.3"
        />

        {/* Tiny notification dot (embossed gold dot) */}
        <circle cx="43" cy="20" r="3.5" fill="url(#gold-metal-3d)" />
        <circle cx="43" cy="20" r="1.5" fill="#FFFFFF" />
      </svg>
    </>
  );
};

export const MailIcon: React.FC<IconProps> = ({ className, size = 36, ...props }) => {
  return (
    <>
      <IconDefs />
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        filter="url(#volumetric-shadow)"
        {...props}
      >
        <circle cx="32" cy="32" r="22" fill="url(#gold-inner-glow)" />

        {/* Envelope Main Frame (Obsidian Inner) */}
        <rect
          x="10"
          y="16"
          width="44"
          height="32"
          rx="4"
          fill="#1C160F"
          stroke="url(#gold-metal-3d)"
          strokeWidth="2"
        />

        {/* Bottom/Side fold highlights */}
        <path
          d="M10 48 L27 34.5 M54 48 L37 34.5"
          stroke="url(#gold-metal-3d)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Top flap folded down (Golden Metallic Triangle) */}
        <polygon
          points="10,16 32,33 54,16"
          fill="url(#gold-bevel-dark)"
          stroke="url(#gold-metal-3d)"
          strokeWidth="1.5"
        />

        {/* Shiny Edge for 3D look */}
        <polygon
          points="10,16 32,31.5 54,16"
          fill="url(#gold-metal-3d)"
          opacity="0.15"
        />

        {/* Luxury Wax Seal (Crimson Red / Burgundy with Gold highlights) */}
        <circle
          cx="32"
          cy="32"
          r="6"
          fill="radial-gradient(circle, #9A1F26 0%, #4C060B 100%)"
          stroke="url(#gold-metal-3d)"
          strokeWidth="1"
          style={{ fill: "url(#red-wax-gradient)" }}
        />
        {/* Wax Seal detail */}
        <path
          d="M32 29.5 L33 31.5 L35.5 32 L33.5 33.5 L34 36 L32 34.5 L30 36 L30.5 33.5 L28.5 32 L31 31.5 Z"
          fill="url(#gold-metal-3d)"
          opacity="0.95"
        />

        <defs>
          <radialGradient id="red-wax-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DF3743" />
            <stop offset="70%" stopColor="#8A141C" />
            <stop offset="100%" stopColor="#3D0307" />
          </radialGradient>
        </defs>

        {/* Glossy Sheen Overlay */}
        <path
          d="M10 16 H32 L10 35 Z"
          fill="url(#chrome-highlight)"
          opacity="0.25"
        />
      </svg>
    </>
  );
};

export const MapPinIcon: React.FC<IconProps> = ({ className, size = 36, ...props }) => {
  return (
    <>
      <IconDefs />
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        filter="url(#volumetric-shadow)"
        {...props}
      >
        <circle cx="32" cy="32" r="22" fill="url(#gold-inner-glow)" />

        {/* Map Grid/Base in Perspective (Showing it floats) */}
        <ellipse cx="32" cy="50" rx="14" ry="4" fill="#18130B" stroke="url(#gold-metal-3d)" strokeWidth="0.75" />
        <line x1="24" y1="50" x2="40" y2="50" stroke="url(#gold-metal-3d)" strokeWidth="0.5" opacity="0.6" />
        <line x1="32" y1="46" x2="32" y2="54" stroke="url(#gold-metal-3d)" strokeWidth="0.5" opacity="0.6" />

        {/* Floating Pin Body Shadow */}
        <ellipse cx="32" cy="49" rx="5" ry="1.5" fill="#000000" opacity="0.5" />

        {/* Teardrop Pin Body */}
        <path
          d="M32 47 C32 47 46 35 46 23.5 C46 14.5 39.75 7.5 32 7.5 C24.25 7.5 18 14.5 18 23.5 C18 35 32 47 32 47 Z"
          fill="url(#gold-bevel-dark)"
          stroke="url(#gold-metal-3d)"
          strokeWidth="1.75"
        />

        {/* Spherical Inner Cap (Glossy Core) */}
        <path
          d="M21 23 C21 16.5 25.5 10.5 32 10.5 C38.5 10.5 43 16.5 43 23 C43 28 39.5 34 32 41 C24.5 34 21 28 21 23 Z"
          fill="#1F180F"
          opacity="0.9"
        />

        {/* Embossed Inner Gem/Ball */}
        <circle cx="32" cy="22" r="6" fill="url(#gold-metal-3d)" />
        <circle cx="30" cy="20" r="1.5" fill="#FFFFFF" opacity="0.8" />

        {/* Pin Highlights */}
        <path
          d="M23 20 C23 15 27 10 32 10"
          stroke="url(#chrome-highlight)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
};
