import React, { useState } from "react";
import { api } from "../../utils/api";
import { CLINIC_CONFIG, getDynamicDates } from "../../utils/appointmentData";

// What the DateTime page saved in sessionStorage when you pressed Continue.
interface BookingChoice {
  doctorId: number;
  doctorName: string;
  title?: string;
  departmentName?: string;
  room?: string | null;
  date: string;    // "YYYY-MM-DD"
  time24: string;  // "14:30" — what the backend's LocalTime field wants
  time12: string;  // "2:30 PM" — what the screens show
  fee?: number;
}

const readChoice = (): BookingChoice | null => {
  try {
    const raw = sessionStorage.getItem("bookingChoice");
    return raw ? (JSON.parse(raw) as BookingChoice) : null;
  } catch {
    return null;
  }
};

// "2026-10-20" -> "Monday, Oct 20, 2026"  (same style as getDynamicDates)
const fullDateOf = (iso: string): string =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// "2026-10-20" -> "Mon, Oct 20"
const shortDateOf = (iso: string): string =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

export default function PatientDetails() {
  const { todayFull, todayVal } = getDynamicDates();
  const [forMyself, setForMyself] = useState(true);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [choice] = useState<BookingChoice | null>(readChoice);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // POST the booking, then hand the response to the Confirmed page.
  const handleSubmit = async () => {
    const name = fullName.trim();
    const digits = phone.replace(/\D/g, ""); // "98765 43210" -> "9876543210"

    // Same rules the backend enforces (AppointmentRequest), checked here for
    // instant feedback instead of a 400 round-trip.
    if (!/^[A-Za-z .'-]{2,150}$/.test(name)) {
      setSubmitError(
        "Please enter the patient's full name (letters, spaces, dots and hyphens only)."
      );
      return;
    }
    if (!/^[6-9]\d{9}$/.test(digits)) {
      setSubmitError("Please enter a valid 10-digit mobile number starting with 6-9.");
      return;
    }
    if (!choice || !choice.doctorId || !choice.date || !choice.time24) {
      setSubmitError("No slot selected yet — go back and pick a date & time.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const appointment = await api.bookAppointment({
        doctorId: choice.doctorId,
        date: choice.date,
        time: choice.time24,
        patientName: name,
        patientPhone: digits,
      });
      // The Confirmed page reads this key as soon as it mounts
      sessionStorage.setItem("lastBooking", JSON.stringify(appointment));
      window.location.hash = "#/confirmed"; // what data-go used to do for us
      window.scrollTo({ top: 0 });
    } catch (e) {
      // 409 "That slot is already booked…" / 404 / backend unreachable — all land here
      setSubmitError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <div className="self-stretch bg-white overflow-clip">
        <div className="self-stretch bg-[#F8F9FF]">
          {/* Top Bar */}
          <div
            className="flex items-center self-stretch bg-[#F8F9FFCC] py-2.5 px-4 gap-2 border-b border-slate-100"
            style={{ boxShadow: "0px 1px 8px #00000008" }}
          >
            <div className="flex flex-1 items-center gap-2">
              <button
                data-go="datetime"
                className="flex flex-col shrink-0 items-start p-2.5 bg-slate-100 hover:bg-slate-200 transition-colors rounded-full border-0 cursor-pointer">
                <img
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7f787972-95d4-4ea6-8d2e-752519d2a4a0"
                  className="w-4 h-4 rounded-full object-fill"
                  alt="Back"
                />
              </button>
              <div className="flex flex-col shrink-0 items-center">
                <span className="text-[#005C55] text-xs font-bold">
                  CAREFIRST CLINIC
                </span>
                <span className="text-[#0B1C30] text-base font-bold">
                  Patient Details
                </span>
              </div>
            </div>
          </div>

          <div className="self-stretch relative mx-4">
            <div className="self-stretch pb-32">
              {/* Step Info */}
              <div className="flex flex-col self-stretch py-3 gap-1">
                <div className="flex justify-between items-center self-stretch">
                  <span className="text-[#005C55] text-xs font-bold">
                    STEP 2 OF 3
                  </span>
                  <div className="flex shrink-0 items-center gap-1">
                    <img
                      src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/793a4f4d-16bd-49c9-9cef-c6403243e0d3"
                      className="w-3 h-3.5 object-fill"
                      alt="Timer"
                    />
                    <span className="text-[#3E4947] text-xs font-bold">
                      Slot held for 09:42
                    </span>
                  </div>
                </div>
                <div className="self-stretch pt-1">
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#0B1C30] text-[26px] font-bold">
                      Patient Details
                    </span>
                  </div>
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#3E4947] text-sm">
                      Instant booking without account creation
                    </span>
                  </div>
                </div>
              </div>

              {/* Banner */}
              <div
                className="flex items-center self-stretch bg-[#DBEAFEB0] py-[11px] px-[17px] mb-4 gap-2 rounded-full border border-solid border-[#BFDBFE99]"
                style={{ boxShadow: "0px 1px 2px #0000000D" }}
              >
                <img
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/b0a8ad73-ae63-412b-8a38-f26da15ae488"
                  className="w-3 h-[15px] rounded-full object-fill"
                  alt="SMS"
                />
                <div className="flex flex-1 flex-col items-start">
                  <span className="text-[#005C55] text-xs font-bold">
                    Instant SMS Confirmation • Zero password needed
                  </span>
                </div>
              </div>

              {/* Appointment Card Summary */}
              <div
                className="flex flex-col self-stretch bg-white p-4 mb-6 gap-2 rounded-xl border border-solid border-slate-100"
                style={{ boxShadow: "0px 1px 2px #0000000D" }}
              >
                <div className="flex items-start self-stretch gap-2">
                  <div className="flex flex-1 items-center gap-2">
                    <div className="flex-1">
                      <div className="flex flex-col items-start self-stretch">
                        <span className="text-[#0B1C30] text-base font-bold">
                          {choice?.doctorName ?? "Dr. Sarah Jenkins"}
                        </span>
                      </div>
                      <div className="flex flex-col items-start self-stretch">
                        <span className="text-[#3E4947] text-xs font-bold">
                          {choice?.title ? `${choice.title} • ${choice.departmentName}` : "Family Medicine • General Physician"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    data-go="datetime"
                    className="flex flex-col shrink-0 items-start bg-blue-50 hover:bg-blue-100 transition-colors py-1 px-2.5 rounded-full border-0 cursor-pointer"
                  >
                    <span className="text-[#005C55] text-xs font-bold">
                      Change
                    </span>
                  </button>
                </div>
                <div className="flex flex-col self-stretch bg-[#EFF4FFB0] p-2.5 gap-2 rounded-lg">
                  <div className="flex items-center self-stretch gap-2">
                    <img
                      src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e82fa4ea-6500-492e-ba92-ff2236bbca98"
                      className="w-[13px] h-[15px] object-fill"
                      alt="Clock"
                    />
                    <div className="flex flex-1 flex-col items-start">
                      <span className="text-[#0B1C30] text-sm font-medium">
                        {choice ? `${fullDateOf(choice.date)} at ${choice.time12}` : `${todayFull} at 02:30 PM`}
                      </span>
                    </div>
                    <span className="text-[#3E4947] text-xs">(30 min)</span>
                  </div>
                  <div className="flex items-center self-stretch gap-2">
                    <img
                      src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/af11d92a-39c8-44bf-9b7b-bb50219fab13"
                      className="w-3 h-[15px] object-fill"
                      alt="Location"
                    />
                    <div className="flex flex-1 flex-col items-start">
                      <span className="text-[#0B1C30] text-sm">
                        Metro Health District, Suite 210
                      </span>
                    </div>
                    <div className="flex flex-col shrink-0 items-start bg-[#E5EEFF] py-0.5 px-1.5 rounded">
                      <span className="text-[#3E4947] text-xs font-bold">
                        In-Person
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between self-stretch py-1">
                    <span className="text-[#3E4947] text-sm font-medium">
                      Consultation Fee:
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[#005C55] text-base font-bold">
                        {choice?.fee != null ? `₹${choice.fee.toFixed(2)}` : CLINIC_CONFIG.formattedFeeWithDecimals}
                      </span>
                      <span className="text-[#3E4947] text-xs font-bold">
                        (Pay at clinic)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="flex flex-col self-stretch gap-6">
                {/* Who is appointment for */}
                <div className="flex flex-col self-stretch gap-1.5">
                  <span className="text-[#0B1C30] text-base font-bold">
                    Who is this appointment for?
                  </span>
                  <div className="flex items-center self-stretch bg-[#EFF4FF] p-1 gap-2 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setForMyself(true)}
                      className={`flex flex-1 justify-center items-center py-2.5 gap-2 rounded-lg border-0 cursor-pointer font-medium text-sm transition-all ${
                        forMyself
                          ? "bg-[#005C55] text-white shadow-sm"
                          : "bg-transparent text-[#3E4947]"
                      }`}
                    >
                      For myself
                    </button>
                    <button
                      type="button"
                      onClick={() => setForMyself(false)}
                      className={`flex flex-1 justify-center items-center py-2.5 gap-2 rounded-lg border-0 cursor-pointer font-medium text-sm transition-all ${
                        !forMyself
                          ? "bg-[#005C55] text-white shadow-sm"
                          : "bg-transparent text-[#3E4947]"
                      }`}
                    >
                      Someone else
                    </button>
                  </div>
                  <span className="text-[#3E4947] text-xs font-bold text-center mt-1">
                    {forMyself
                      ? "Booking for yourself using your primary mobile number."
                      : "Booking for a family member or friend."}
                  </span>
                </div>

                {/* Form Inputs */}
                <div className="flex flex-col self-stretch gap-4">
                  {/* Full Name Input */}
                  <div className="self-stretch">
                    <div className="flex justify-between items-center self-stretch mb-[5px]">
                      <span className="text-[#0B1C30] text-sm font-bold">
                        Full Legal Name *
                      </span>
                      <span className="text-[#3E4947] text-xs">
                        Photo ID Match
                      </span>
                    </div>
                    <div
                      className="flex items-center self-stretch bg-white py-3 px-3.5 gap-3 rounded-xl border border-slate-200 focus-within:border-teal-600 transition-colors"
                      style={{ boxShadow: "0px 1px 2px #0000000D" }}
                    >
                      <img
                        src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7d43cd5e-15f4-4bc0-b805-2717faaca22e"
                        className="w-4 h-4 object-fill"
                        alt="User"
                      />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className="w-full bg-transparent border-0 outline-none text-[#0B1C30] text-base placeholder:text-[#6E7977]"
                      />
                    </div>
                    <span className="text-[#3E4947] text-xs font-bold mt-1 block">
                      As shown on your Government Photo ID or health insurance
                    </span>
                  </div>

                  {/* Phone Input with +91 */}
                  <div className="self-stretch">
                    <div className="flex justify-between items-center self-stretch mb-[5px]">
                      <span className="text-[#0B1C30] text-sm font-bold">
                        Mobile Phone Number *
                      </span>
                      <span className="text-[#005C55] text-xs font-bold">
                        SMS Pass
                      </span>
                    </div>
                    <div
                      className="flex items-center self-stretch bg-white py-3 px-3.5 gap-3 rounded-xl border border-slate-200 focus-within:border-teal-600 transition-colors"
                      style={{ boxShadow: "0px 1px 2px #0000000D" }}
                    >
                      <span className="text-[#0B1C30] text-sm font-bold">
                        {CLINIC_CONFIG.phoneCountryCode}
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98765 43210"
                        className="w-full bg-transparent border-0 outline-none text-[#0B1C30] text-base placeholder:text-[#6E7977]"
                      />
                    </div>
                    <span className="text-[#3E4947] text-xs font-bold mt-1 block">
                      We'll send your instant SMS appointment pass &amp; reminder 2 hours prior here
                    </span>
                  </div>

                  {/* Privacy standard */}
                  <div className="flex items-start self-stretch bg-[#EFF4FF] p-4 gap-3 rounded-xl">
                    <div className="flex flex-col shrink-0 items-center pt-0.5">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <img
                          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f2e23133-188d-4ff5-aa40-67b98e5bc781"
                          className="w-3.5 h-3.5 object-fill"
                          alt="Shield"
                        />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col items-start">
                      <span className="text-[#0B1C30] text-base font-bold mb-0.5">
                        Strict Privacy Standard
                      </span>
                      <span className="text-[#0B1C30] text-sm mb-1">
                        We collect only your name and phone to manage your appointment.
                      </span>
                      <span className="text-[#3E4947] text-xs font-bold">
                        No password required. Your data is encrypted and strictly protected under clinical privacy standards.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Fixed CTA Bar */}
            <div
              className="flex flex-col self-stretch bg-white fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-30 p-4 gap-2 border-t border-slate-200"
              style={{ boxShadow: "0px -4px 16px #0000000D" }}
            >
              <div className="flex items-center justify-between self-stretch p-1">
                <span className="text-[#0B1C30] text-xs font-bold">
                  {choice?.doctorName ?? "Dr. Sarah Jenkins"} • {choice ? shortDateOf(choice.date) : todayVal} • {choice?.time12 ?? "2:30 PM"}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[#3E4947] text-xs font-bold">
                    Due today:
                  </span>
                  <span className="text-[#005C55] text-sm font-bold">
                    {CLINIC_CONFIG.zeroFee}
                  </span>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex justify-center items-center self-stretch bg-[#005C55] hover:bg-[#004A44] transition-colors text-white py-3.5 px-4 gap-[9px] rounded-xl border-0 cursor-pointer shadow-md disabled:opacity-50"
              >
                <span className="text-white text-base font-bold">
                  {submitting ? "Booking your slot…" : "Confirm Appointment via SMS"}
                </span>
              </button>
              {submitError && (
              <span className="text-red-600 text-xs font-bold text-center block bg-red-50 border border-red-100 rounded-lg py-2 px-3">
                {submitError}
              </span>
            )}
            <span className="text-[#6E7977] text-xs font-bold text-center mt-1 block">
                By continuing, you agree to receive automated booking updates via SMS.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}