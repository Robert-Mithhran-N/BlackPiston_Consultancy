import type { AdminInfo } from "./api";

const TOKEN_KEY = "bp_token";
const ADMIN_KEY = "bp_admin";

export function setAuth(admin: AdminInfo) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, admin.token);
  localStorage.setItem(
    ADMIN_KEY,
    JSON.stringify({ _id: admin._id, name: admin.name, email: admin.email, role: admin.role })
  );
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getAdminInfo(): Omit<AdminInfo, "token"> | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ADMIN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}
