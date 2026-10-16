// In-progress booking state that survives a refresh mid-booking.
// Written by DateTime (when a slot is chosen) and PatientDetails (when the
// patient types their name/phone or toggles "for myself / someone else").
// Cleared by PatientDetails.handleSubmit on successful booking.
//
// NOTE: this is a durability convenience for the in-progress flow only.
// The post-submit handoff (sessionStorage.lastBooking -> Confirmed page) is
// a separate concern and is left untouched.

const LOCAL_DRAFT_KEY = "booking_draft";

export interface BookingDraft {
  doctorId?: number;
  doctorName?: string;
  title?: string;
  departmentName?: string;
  room?: string | null;
  date?: string; // "YYYY-MM-DD"
  time24?: string; // "14:30"
  time12?: string; // "2:30 PM"
  fee?: number;
  name?: string;
  phone?: string;
  forMyself?: boolean;
}

export const readDraft = (): BookingDraft => {
  try {
    const raw = localStorage.getItem(LOCAL_DRAFT_KEY);
    return raw ? (JSON.parse(raw) as BookingDraft) : {};
  } catch {
    return {};
  }
};

export const writeDraft = (patch: BookingDraft) => {
  try {
    const current = readDraft();
    const next: BookingDraft = { ...current, ...patch };
    localStorage.setItem(LOCAL_DRAFT_KEY, JSON.stringify(next));
  } catch {
    // storage full / disabled — best-effort, never block the user
  }
};

export const clearDraft = () => {
  try {
    localStorage.removeItem(LOCAL_DRAFT_KEY);
  } catch {
    // no-op
  }
};
