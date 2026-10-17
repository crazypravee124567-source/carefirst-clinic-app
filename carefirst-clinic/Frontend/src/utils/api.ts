// Central API client. Every page talks to the backend ONLY through this file.
// In production (Vercel) set VITE_API_BASE at build time to the Render backend
// URL, e.g. https://carefirst-backend.onrender.com — no trailing slash.
// Locally it falls back to the dev backend on port 8081.
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8081";

// ---- Types: these mirror the backend DTOs EXACTLY (field names = JSON keys) ----

export interface Clinic {
  id: number;
  name: string;
  phone: string;
  smsNumber: string | null;
  address: string;
  district: string;
  parkingInfo: string | null;
  mapUrl: string | null;
}

export interface ClinicHours {
  dayOfWeek: number;
  dayName: string;
  openTime: string | null;
  closeTime: string | null;
  note: string | null;
}

export interface Department {
  id: number;
  name: string;
  slug: string;
}

export interface Doctor {
  id: number;
  name: string;
  title: string;
  departmentName: string;
  departmentSlug: string;
  photoUrl: string | null;
  yearsExperience: number;
  consultationFee: number;
  ratingAverage: number;
  ratingCount: number;
  boardCertified: boolean;
  visitType: string;
  room: string | null;
  featured: boolean;
  tags: string[];
}

export interface Slot {
  time: string;       // "HH:mm" 24-hour
  available: boolean;
}

export interface DaySlots {
  date: string;       // "YYYY-MM-DD"
  availableCount: number;
  morning: Slot[];
  afternoon: Slot[];
  evening: Slot[];
}

export interface DayAvailability {
  date: string;
  past: boolean;
  today: boolean;
  availableSlots: number;
}

export interface Appointment {
  bookingCode: string;
  doctorId: number;
  doctorName: string;
  departmentName: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  status: string;     // "BOOKED" | "CANCELLED"
  createdAt: string;
  ratingAverage: number;
  address: string;
  district: string;
}

// ---- One shared request function: handles JSON + errors in ONE place ----

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    // Your backend always answers errors as ApiError { status, message, timestamp }
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body && body.message) message = body.message;
    } catch {
      // response wasn't JSON — keep the generic message
    }
    throw new Error(message);   // pages catch this and show message to the user
  }

  return res.json() as Promise<T>;
}

// ---- One function per endpoint ----

export const api = {
  getClinic: () =>
    request<Clinic>("/api/clinic"),

  getClinicHours: () =>
    request<ClinicHours[]>("/api/clinic/hours"),

  getDepartments: () =>
    request<Department[]>("/api/departments"),

  getDoctors: (params: {
    department?: string;
    search?: string;
    minRating?: number;
    maxFee?: number;
    featured?: boolean;
  } = {}) => {
    const q = new URLSearchParams();
    if (params.department) q.set("department", params.department);
    if (params.search) q.set("search", params.search);
    if (params.minRating !== undefined) q.set("minRating", String(params.minRating));
    if (params.maxFee !== undefined) q.set("maxFee", String(params.maxFee));
    if (params.featured) q.set("featured", "true");
    const qs = q.toString();
    return request<Doctor[]>(`/api/doctors${qs ? "?" + qs : ""}`);
  },

  getDaySlots: (doctorId: number, date: string) =>
    request<DaySlots>(`/api/doctors/${doctorId}/slots?date=${date}`),

  getAvailability: (doctorId: number, month: string) =>   // month = "YYYY-MM"
    request<DayAvailability[]>(`/api/doctors/${doctorId}/availability?month=${month}`),

  bookAppointment: (body: {
    doctorId: number;
    date: string;
    time: string;
    patientName: string;
    patientPhone: string;
  }) =>
    request<Appointment>("/api/appointments", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  lookupAppointment: (code: string, phoneLast4: string) =>
    request<Appointment>(
      `/api/appointments?code=${encodeURIComponent(code)}&phoneLast4=${encodeURIComponent(phoneLast4)}`
    ),

  cancelAppointment: (code: string, reason: string) =>
    request<Appointment>(`/api/appointments/${encodeURIComponent(code)}/cancel`, {
      method: "PATCH",
      body: JSON.stringify({ reason }),
    }),
};