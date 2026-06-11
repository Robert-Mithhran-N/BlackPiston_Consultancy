const API_URL = "http://localhost:5000/api";

/**
 * Base fetch wrapper with auth token injection
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("bp_token") : null;

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  // Don't set Content-Type for FormData (browser sets it with boundary)
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data as T;
}

// ──────────────────────────── Types ────────────────────────────

export type VehicleImage = {
  url: string;
  publicId: string;
  _id?: string;
};

export type ApiVehicle = {
  _id: string;
  title: string;
  slug: string;
  category: "car" | "bike";
  type: "Coupe" | "Sedan" | "SUV" | "Sport" | "Cruiser" | "Adventure";
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Automatic" | "Manual";
  mileage: number;
  power: string;
  topSpeed: string;
  acceleration: string;
  color: string;
  description: string;
  tagline: string;
  features: string[];
  images: VehicleImage[];
  featured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ApiEnquiry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  vehicleId: ApiVehicle | string | null;
  vehicleName: string;
  status: "New" | "Contacted" | "Test drive" | "Negotiation" | "Closed";
  createdAt: string;
  updatedAt: string;
};

export type AdminInfo = {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
};

type VehiclesResponse = {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: ApiVehicle[];
};

type VehicleResponse = {
  success: boolean;
  data: ApiVehicle;
};

type EnquiriesResponse = {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: ApiEnquiry[];
};

type EnquiryResponse = {
  success: boolean;
  data: ApiEnquiry;
};

type AuthResponse = {
  success: boolean;
  data: AdminInfo;
};

type MessageResponse = {
  success: boolean;
  message: string;
};

// ──────────────────────────── Auth ────────────────────────────

export async function adminLogin(email: string, password: string) {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function getAdminMe() {
  return apiFetch<AuthResponse>("/auth/me");
}

export async function forgotPassword(email: string) {
  return apiFetch<{ success: boolean; message: string }>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function verifyOtp(email: string, otp: string) {
  return apiFetch<{ success: boolean; message: string }>("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({ email, otp }),
  });
}

export async function resetPassword(email: string, newPassword: string) {
  return apiFetch<{ success: boolean; message: string }>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email, newPassword }),
  });
}

// ──────────────────────────── Vehicles (Public) ────────────────────────────

export async function getVehicles(params: Record<string, string> = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch<VehiclesResponse>(`/vehicles${query ? `?${query}` : ""}`);
}

export async function getVehicleBySlug(slug: string) {
  return apiFetch<VehicleResponse>(`/vehicles/slug/${slug}`);
}

export async function getVehicleById(id: string) {
  return apiFetch<VehicleResponse>(`/vehicles/${id}`);
}

export async function getFeaturedVehicles() {
  return apiFetch<VehiclesResponse>("/vehicles/featured");
}

// ──────────────────────────── Vehicles (Admin) ────────────────────────────

export async function getAdminVehicles() {
  return apiFetch<VehiclesResponse>("/vehicles?admin=true&limit=200");
}

export async function createVehicle(formData: FormData) {
  return apiFetch<VehicleResponse>("/vehicles", {
    method: "POST",
    body: formData,
  });
}

export async function updateVehicle(id: string, formData: FormData) {
  return apiFetch<VehicleResponse>(`/vehicles/${id}`, {
    method: "PUT",
    body: formData,
  });
}

export async function deleteVehicle(id: string) {
  return apiFetch<MessageResponse>(`/vehicles/${id}`, {
    method: "DELETE",
  });
}

export async function toggleFeatured(id: string) {
  return apiFetch<VehicleResponse>(`/vehicles/${id}/featured`, {
    method: "PATCH",
  });
}

export async function toggleStatus(id: string) {
  return apiFetch<VehicleResponse>(`/vehicles/${id}/status`, {
    method: "PATCH",
  });
}

export async function deleteVehicleImage(vehicleId: string, imageIndex: number) {
  return apiFetch<VehicleResponse>(
    `/vehicles/${vehicleId}/images/${imageIndex}`,
    { method: "DELETE" }
  );
}

// ──────────────────────────── Enquiries ────────────────────────────

export async function createEnquiry(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  vehicleId?: string;
  vehicleName?: string;
}) {
  return apiFetch<EnquiryResponse>("/enquiries", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getEnquiries() {
  return apiFetch<EnquiriesResponse>("/enquiries");
}

export async function updateEnquiryStatus(id: string, status: string) {
  return apiFetch<EnquiryResponse>(`/enquiries/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function deleteEnquiry(id: string) {
  return apiFetch<MessageResponse>(`/enquiries/${id}`, {
    method: "DELETE",
  });
}
