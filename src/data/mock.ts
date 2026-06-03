import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import bike1 from "@/assets/bike-1.jpg";
import bike2 from "@/assets/bike-2.jpg";
import hero from "@/assets/hero-car.jpg";

export type Vehicle = {
  id: string;
  name: string;
  brand: string;
  type: "Coupe" | "Sedan" | "SUV" | "Sport" | "Cruiser" | "Adventure";
  category: "car" | "bike";
  price: number;
  year: number;
  mileage: number;
  fuel: "Petrol" | "Hybrid" | "Electric" | "Diesel";
  transmission: "Automatic" | "Manual";
  power: string;
  topSpeed: string;
  acceleration: string;
  color: string;
  image: string;
  gallery: string[];
  tagline: string;
  description: string;
  features: string[];
};

export const vehicles: Vehicle[] = [
  {
    id: "noir-gt",
    name: "Noir GT Coupe",
    brand: "Porsche",
    type: "Coupe",
    category: "car",
    price: 184500,
    year: 2025,
    mileage: 0,
    fuel: "Hybrid",
    transmission: "Automatic",
    power: "612 hp",
    topSpeed: "330 km/h",
    acceleration: "2.9s 0–100",
    color: "Obsidian Black",
    image: hero,
    gallery: [hero, car1, car3],
    tagline: "Forged in shadow. Tuned for legend.",
    description:
      "A hand-assembled grand tourer blending hybrid V8 thrust with bespoke nappa interiors. The Noir GT redefines the cinematic drive.",
    features: ["Carbon-ceramic brakes", "Active aero", "Bang & Olufsen audio", "Hand-stitched leather"],
  },
  {
    id: "midnight-saloon",
    name: "Midnight Saloon S90",
    brand: "Mercedes-Benz",
    type: "Sedan",
    category: "car",
    price: 96200,
    year: 2025,
    mileage: 120,
    fuel: "Electric",
    transmission: "Automatic",
    power: "503 hp",
    topSpeed: "270 km/h",
    acceleration: "3.4s 0–100",
    color: "Carbon Midnight",
    image: car1,
    gallery: [car1, hero, car2],
    tagline: "Boardroom presence. Racetrack pulse.",
    description:
      "Executive silhouette wrapped around a dual-motor electric platform. Whisper-quiet, ruthlessly composed.",
    features: ["Dual motor AWD", "Massage seats", "Augmented HUD", "Air suspension"],
  },
  {
    id: "summit-suv",
    name: "Summit X7",
    brand: "Land Rover",
    type: "SUV",
    category: "car",
    price: 142000,
    year: 2024,
    mileage: 3400,
    fuel: "Hybrid",
    transmission: "Automatic",
    power: "557 hp",
    topSpeed: "260 km/h",
    acceleration: "4.1s 0–100",
    color: "Slate Steel",
    image: car2,
    gallery: [car2, car1, hero],
    tagline: "Engineered to dominate every horizon.",
    description:
      "A flagship SUV with adaptive terrain modes, four-zone climate and a panoramic atmosphere roof.",
    features: ["Adaptive AWD", "Pano roof", "7 seats", "Night vision"],
  },
  {
    id: "scarlet-spider",
    name: "Scarlet Spider RS",
    brand: "Ferrari",
    type: "Sport",
    category: "car",
    price: 268000,
    year: 2025,
    mileage: 0,
    fuel: "Petrol",
    transmission: "Automatic",
    power: "740 hp",
    topSpeed: "350 km/h",
    acceleration: "2.5s 0–100",
    color: "Inferno Red",
    image: car3,
    gallery: [car3, hero, car1],
    tagline: "A scream of red across the asphalt.",
    description: "Track-bred mid-engine missile with carbon monocoque and motorsport-grade aero.",
    features: ["Carbon monocoque", "Active rear wing", "Track telemetry", "Race harness"],
  },
  {
    id: "obsidian-rr",
    name: "Obsidian RR",
    brand: "Ducati",
    type: "Sport",
    category: "bike",
    price: 38500,
    year: 2025,
    mileage: 0,
    fuel: "Petrol",
    transmission: "Manual",
    power: "215 hp",
    topSpeed: "310 km/h",
    acceleration: "2.6s 0–100",
    color: "Obsidian Gold",
    image: bike1,
    gallery: [bike1, bike2],
    tagline: "Liquid graphite on two wheels.",
    description: "Superbike geometry, semi-active suspension, MotoGP-derived electronics.",
    features: ["Öhlins suspension", "Quick-shifter", "TC + ABS Pro", "Carbon fairing"],
  },
  {
    id: "ronin-adv",
    name: "Ronin Adventure 1200",
    brand: "Triumph",
    type: "Adventure",
    category: "bike",
    price: 24900,
    year: 2024,
    mileage: 1200,
    fuel: "Petrol",
    transmission: "Manual",
    power: "152 hp",
    topSpeed: "245 km/h",
    acceleration: "3.4s 0–100",
    color: "Graphite",
    image: bike2,
    gallery: [bike2, bike1],
    tagline: "Continents folded into kilometers.",
    description: "Long-range adventure tourer ready for tarmac and trail in equal measure.",
    features: ["Cornering ABS", "Cruise control", "TFT dash", "All-terrain modes"],
  },
];

export const brands = ["Porsche", "Mercedes-Benz", "Land Rover", "Ferrari", "BMW", "Audi", "Jaguar", "Tata", "Mahindra", "Royal Enfield", "Ducati", "Triumph", "KTM"];

export const stats = [
  { value: 28, suffix: "+", label: "Years of craft" },
  { value: 4200, suffix: "+", label: "Vehicles delivered" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 42, suffix: "", label: "Global ateliers" },
];

export const testimonials = [
  {
    quote:
      "The most considered car-buying experience I've ever had. Every touchpoint felt curated, every detail intentional.",
    author: "Elena Marchetti",
    role: "Collector, Milan",
  },
  {
    quote:
      "From the showroom lighting to the delivery ritual — this is hospitality at the level of a five-star hotel.",
    author: "Idris Okonkwo",
    role: "CEO, Lagos",
  },
  {
    quote:
      "They didn't just sell me a car. They built a relationship around my taste, my time, and my expectations.",
    author: "Mei Tanaka",
    role: "Architect, Tokyo",
  },
];

export const enquiries = [
  { id: "E-2041", name: "Lorenzo Vitale", vehicle: "Noir GT Coupe", status: "New", date: "2025-11-02" },
  { id: "E-2040", name: "Amelia Hart", vehicle: "Midnight Saloon S90", status: "Contacted", date: "2025-11-02" },
  { id: "E-2039", name: "Rajiv Menon", vehicle: "Scarlet Spider RS", status: "Test drive", date: "2025-11-01" },
  { id: "E-2038", name: "Sofia Becker", vehicle: "Summit X7", status: "Negotiation", date: "2025-10-31" },
  { id: "E-2037", name: "Hiroshi Aoki", vehicle: "Obsidian RR", status: "Closed", date: "2025-10-30" },
];
