export interface Vehicle {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  color: string;
  location: string;
  images: string[];
  description: string;
  specs: {
    engine: string;
    horsepower: number;
    topSpeed: string;
    acceleration: string;
    drivetrain: string;
    seats: number;
  };
  seller: {
    name: string;
    type: "dealer" | "private";
    rating: number;
    reviewCount: number;
    verified: boolean;
    memberSince: string;
    phone: string;
  };
  features: string[];
  type: "car" | "motorbike";
  featured: boolean;
  createdAt: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "1",
    title: "2023 Mercedes-Benz S-Class S580",
    make: "Mercedes-Benz",
    model: "S-Class",
    year: 2023,
    price: 124900,
    mileage: 8500,
    fuel: "Petrol",
    transmission: "Automatic",
    color: "Obsidian Black",
    location: "London, UK",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80",
      "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&q=80",
    ],
    description: "Immaculate S-Class with full dealer history. Loaded with every option including Executive Rear Package, Burmester 4D sound, and MBUX augmented reality navigation.",
    specs: { engine: "4.0L V8 Biturbo", horsepower: 496, topSpeed: "155 mph", acceleration: "4.4s 0-60", drivetrain: "AWD", seats: 5 },
    seller: { name: "Mayfair Motors", type: "dealer", rating: 4.9, reviewCount: 234, verified: true, memberSince: "2019", phone: "+44 20 7946 0958" },
    features: ["Panoramic Roof", "Night Vision", "Rear Entertainment", "Air Suspension", "Head-Up Display", "Massage Seats"],
    type: "car",
    featured: true,
    createdAt: "2025-12-15",
  },
  {
    id: "2",
    title: "2022 BMW M4 Competition",
    make: "BMW",
    model: "M4",
    year: 2022,
    price: 67500,
    mileage: 15200,
    fuel: "Petrol",
    transmission: "Automatic",
    color: "Isle of Man Green",
    location: "Manchester, UK",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80",
    ],
    description: "Stunning M4 Competition in rare Isle of Man Green. Carbon fibre roof, M Drive Professional, and Harman Kardon surround sound.",
    specs: { engine: "3.0L I6 Twin-Turbo", horsepower: 503, topSpeed: "180 mph", acceleration: "3.8s 0-60", drivetrain: "RWD", seats: 4 },
    seller: { name: "James Carter", type: "private", rating: 4.7, reviewCount: 12, verified: true, memberSince: "2021", phone: "+44 161 496 0123" },
    features: ["Carbon Roof", "M Sport Exhaust", "Adaptive Suspension", "Laser Lights", "Wireless Charging"],
    type: "car",
    featured: true,
    createdAt: "2025-11-20",
  },
  {
    id: "3",
    title: "2024 Porsche 911 Carrera S",
    make: "Porsche",
    model: "911",
    year: 2024,
    price: 112000,
    mileage: 3200,
    fuel: "Petrol",
    transmission: "PDK",
    color: "GT Silver",
    location: "Surrey, UK",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    ],
    description: "Nearly new 911 Carrera S with Sport Chrono, PASM, and Bose surround. Full Porsche warranty remaining.",
    specs: { engine: "3.0L Flat-6 Twin-Turbo", horsepower: 443, topSpeed: "191 mph", acceleration: "3.3s 0-60", drivetrain: "RWD", seats: 4 },
    seller: { name: "Porsche Centre Surrey", type: "dealer", rating: 5.0, reviewCount: 187, verified: true, memberSince: "2018", phone: "+44 1234 567890" },
    features: ["Sport Chrono", "PASM", "Sport Exhaust", "Bose Audio", "Rear Axle Steering"],
    type: "car",
    featured: true,
    createdAt: "2026-01-05",
  },
  {
    id: "4",
    title: "2023 Range Rover Sport D350",
    make: "Land Rover",
    model: "Range Rover Sport",
    year: 2023,
    price: 89995,
    mileage: 12400,
    fuel: "Diesel",
    transmission: "Automatic",
    color: "Carpathian Grey",
    location: "Birmingham, UK",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    ],
    description: "Range Rover Sport Dynamic HSE with every luxury option. Air suspension, meridian sound, 360 cameras.",
    specs: { engine: "3.0L I6 Diesel", horsepower: 346, topSpeed: "140 mph", acceleration: "5.7s 0-60", drivetrain: "AWD", seats: 5 },
    seller: { name: "Premium Auto Group", type: "dealer", rating: 4.8, reviewCount: 156, verified: true, memberSince: "2020", phone: "+44 121 496 7890" },
    features: ["Air Suspension", "Meridian Sound", "360 Cameras", "Heated Steering", "Pixel LED Lights"],
    type: "car",
    featured: true,
    createdAt: "2025-10-28",
  },
  {
    id: "5",
    title: "2023 Ducati Panigale V4 S",
    make: "Ducati",
    model: "Panigale V4 S",
    year: 2023,
    price: 28500,
    mileage: 2100,
    fuel: "Petrol",
    transmission: "Manual",
    color: "Ducati Red",
    location: "Bristol, UK",
    images: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80",
    ],
    description: "Immaculate Panigale V4 S with Öhlins semi-active suspension, quick-shifter, and Akrapovič exhaust.",
    specs: { engine: "1103cc V4", horsepower: 214, topSpeed: "186 mph", acceleration: "2.9s 0-60", drivetrain: "Chain", seats: 2 },
    seller: { name: "Moto Elite", type: "dealer", rating: 4.9, reviewCount: 89, verified: true, memberSince: "2017", phone: "+44 117 496 3456" },
    features: ["Öhlins Suspension", "Quick-Shifter", "Akrapovič Exhaust", "GPS Lap Timer", "Cornering ABS"],
    type: "motorbike",
    featured: true,
    createdAt: "2026-01-10",
  },
  {
    id: "6",
    title: "2021 Audi RS6 Avant",
    make: "Audi",
    model: "RS6",
    year: 2021,
    price: 82000,
    mileage: 28000,
    fuel: "Petrol",
    transmission: "Automatic",
    color: "Nardo Grey",
    location: "Leeds, UK",
    images: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80",
    ],
    description: "Nardo Grey RS6 with carbon styling pack, sport exhaust, and dynamic package plus. Full Audi history.",
    specs: { engine: "4.0L V8 TFSI", horsepower: 591, topSpeed: "174 mph", acceleration: "3.6s 0-60", drivetrain: "AWD", seats: 5 },
    seller: { name: "Richard Holmes", type: "private", rating: 4.5, reviewCount: 8, verified: false, memberSince: "2023", phone: "+44 113 496 7890" },
    features: ["Carbon Styling Pack", "Sport Exhaust", "Dynamic Package Plus", "Night Vision", "B&O Sound"],
    type: "car",
    featured: false,
    createdAt: "2025-09-15",
  },
  {
    id: "7",
    title: "2024 BMW R 1300 GS Adventure",
    make: "BMW",
    model: "R 1300 GS",
    year: 2024,
    price: 22500,
    mileage: 4800,
    fuel: "Petrol",
    transmission: "Manual",
    color: "Kalamata Metallic",
    location: "Edinburgh, UK",
    images: [
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&q=80",
      "https://images.unsplash.com/photo-1558980394-da1f85d3b540?w=800&q=80",
    ],
    description: "Latest R 1300 GS Adventure with full luggage system, Dynamic ESA, and Connectivity package.",
    specs: { engine: "1300cc Boxer Twin", horsepower: 145, topSpeed: "137 mph", acceleration: "3.5s 0-60", drivetrain: "Shaft", seats: 2 },
    seller: { name: "Highland Moto", type: "dealer", rating: 4.7, reviewCount: 45, verified: true, memberSince: "2019", phone: "+44 131 496 2345" },
    features: ["Full Luggage", "Dynamic ESA", "Heated Grips", "Cruise Control", "TFT Display"],
    type: "motorbike",
    featured: false,
    createdAt: "2026-02-01",
  },
  {
    id: "8",
    title: "2022 Tesla Model S Plaid",
    make: "Tesla",
    model: "Model S",
    year: 2022,
    price: 79900,
    mileage: 18500,
    fuel: "Electric",
    transmission: "Automatic",
    color: "Pearl White",
    location: "Cambridge, UK",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&q=80",
    ],
    description: "Model S Plaid with full self-driving capability, yoke steering, and all white interior.",
    specs: { engine: "Tri Motor Electric", horsepower: 1020, topSpeed: "200 mph", acceleration: "1.99s 0-60", drivetrain: "AWD", seats: 5 },
    seller: { name: "EV Specialists", type: "dealer", rating: 4.6, reviewCount: 67, verified: true, memberSince: "2021", phone: "+44 1223 496 789" },
    features: ["Full Self-Driving", "Yoke Steering", "22\" Wheels", "Gaming Computer", "Premium Audio"],
    type: "car",
    featured: false,
    createdAt: "2025-12-01",
  },
];

export const makes = [...new Set(vehicles.map(v => v.make))];
export const fuelTypes = [...new Set(vehicles.map(v => v.fuel))];
export const transmissions = [...new Set(vehicles.map(v => v.transmission))];
export const locations = [...new Set(vehicles.map(v => v.location))];
