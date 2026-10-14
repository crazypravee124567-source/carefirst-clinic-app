import React, { useEffect, useState } from "react";
import { api, Doctor, Slot } from "../../utils/api";
import { CLINIC_CONFIG } from "../../utils/appointmentData";

const DOCTOR_KEY = "selectedDoctorId";
const CHOICE_KEY = "bookingChoice"; // saved for PatientDetails on Continue

// "14:30" -> "2:30 PM"  (backend speaks 24h, screens speak 12h)
const to12h = (t: string): string => {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
};

// "2:30 PM" -> "14:30"  (reverse, so we can POST the booking later)
const to24h = (display: string): string => {
  const m = display.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return "";
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  return `${String(h).padStart(2, "0")}:${m[2]}`;
};

const localIso = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// The existing date-strip markup expects this exact shape:
// { val, day, date, tag?, slots, disabled }
interface StripDay {
  val: string;
  day: string;
  date: number;
  tag?: string;
  slots: number;
  disabled: boolean;
}

// The slot grids expect { time: "2:30 PM", status?: "booked" }
const toSlotView = (s: Slot) => ({
  time: to12h(s.time),
  status: s.available ? undefined : "booked",
});

export default function DateTime() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [dates, setDates] = useState<StripDay[]>([]);
  const [daySlots, setDaySlots] = useState<{
    morning: { time: string; status?: string }[];
    afternoon: { time: string; status?: string }[];
    evening: { time: string; status?: string }[];
  }>({ morning: [], afternoon: [], evening: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedDate, setSelectedDate] = useState(localIso(new Date()));
  const [selectedTime, setSelectedTime] = useState("");

  const currentMonthYear = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Phase 1: which doctor + this month's day-by-day availability
  useEffect(() => {
    const id = Number(sessionStorage.getItem(DOCTOR_KEY) ?? "1");
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    Promise.all([api.getDoctors({}), api.getAvailability(id, month)])
      .then(([all, days]) => {
        setDoctor(all.find((d) => d.id === id) ?? null);
        setDates(
          days.map((day) => ({
            val: day.date,
            day: new Date(day.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" }),
            date: Number(day.date.slice(8, 10)),
            tag: day.today ? "Today" : undefined,
            slots: day.availableSlots,
            disabled: day.past,
          }))
        );
        const firstOpen = days.find((x) => !x.past && x.availableSlots > 0);
        setSelectedDate(firstOpen ? firstOpen.date : localIso(new Date()));
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Phase 2: whenever the selected date changes, load that day's real slots
  useEffect(() => {
    const id = Number(sessionStorage.getItem(DOCTOR_KEY) ?? "1");
    api
      .getDaySlots(id, selectedDate)
      .then((day) => {
        setDaySlots({
          morning: day.morning.map(toSlotView),
          afternoon: day.afternoon.map(toSlotView),
          evening: day.evening.map(toSlotView),
        });
        const firstFree = [...day.morning, ...day.afternoon, ...day.evening].find(
          (s) => s.available
        );
        setSelectedTime(firstFree ? to12h(firstFree.time) : "");
      })
      .catch((e: Error) => setError(e.message));
  }, [selectedDate]);

  const morningSlots = daySlots.morning;
  const afternoonSlots = daySlots.afternoon;
  const eveningSlots = daySlots.evening;

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <div className="self-stretch bg-white overflow-clip">
        <div className="self-stretch bg-[#F8F9FF]">
          {/* Top Header */}
          <div
            className="flex items-center self-stretch bg-[#F8F9FFE3] py-2.5 px-4 gap-2"
            style={{ boxShadow: "0px 1px 8px #00000008" }}
          >
            <div className="flex flex-1 items-center gap-2">
              <button
                data-go="doctors"
                className="flex flex-col shrink-0 items-start bg-[#E5EEFF] hover:bg-[#D4E3FF] transition-colors text-left p-3 rounded-xl border-0 cursor-pointer">
                <img
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e255b4b7-10d5-4944-841b-0b8901459f7e"
                  className="w-3.5 h-3.5 rounded-xl object-fill"
                  alt="Back"
                />
              </button>
              <div className="flex-1">
                <div className="flex flex-col items-start self-stretch">
                  <span className="text-[#0B1C30] text-base font-bold">
                    CareFirst Clinic Book Appointment
                  </span>
                </div>
                <div className="flex flex-col items-start self-stretch">
                  <span className="text-[#3E4947] text-xs font-bold">
                    CareFirst Medical Services
                  </span>
                </div>
              </div>
            </div>
            <button className="flex flex-col shrink-0 items-start bg-blue-50 text-left p-3 rounded-xl border-0">
              <img
                src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6537a832-7f47-40f6-ad7c-50e1db9fb35c"
                className="w-[15px] h-[15px] rounded-xl object-fill"
                alt="Info"
              />
            </button>
          </div>

          <div className="flex flex-col self-stretch pb-[149px] gap-[15px]">
            {/* Stepper Header */}
            <div className="flex flex-col self-stretch bg-[#EFF4FF] py-2 px-4 gap-1 border-b border-solid border-b-slate-100">
              <div className="flex justify-between items-center self-stretch">
                <div className="flex shrink-0 items-center gap-1.5">
                  <div className="flex flex-col shrink-0 items-start bg-[#005C55] py-[1px] px-[7px] rounded-[9999px]">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <span className="text-[#005C55] text-base font-bold">
                    Select Date &amp; Time
                  </span>
                </div>
                <span className="text-[#3E4947] text-sm font-medium">
                  Step 1 of 3
                </span>
              </div>
              <div className="flex items-center self-stretch bg-slate-200 rounded-[9999px]">
                <div className="bg-[#005C55] w-[119px] h-1.5 rounded-[9999px]"></div>
                <div className="flex-1 bg-slate-200 h-1.5"></div>
              </div>
              <div className="flex justify-between items-center self-stretch">
                <span className="text-[#005C55] text-[11px] font-bold">
                  1. Date &amp; Slot
                </span>
                <span className="text-[#3E4947] text-[11px]">
                  2. Patient Details
                </span>
                <span className="text-[#3E4947] text-[11px]">
                  3. Confirmation
                </span>
              </div>
            </div>

            <div className="self-stretch relative mx-4">
              <div className="self-stretch">
                {/* Instant SMS Banner */}
                <div className="flex items-center self-stretch bg-blue-50 py-[5px] px-[17px] mb-6 gap-1.5 rounded-xl border border-solid border-blue-100">
                  <img
                    src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/ed1ca424-8e28-4d2c-9f78-fca0a8b2dc2f"
                    className="w-3 h-[15px] rounded-xl object-fill"
                    alt="SMS icon"
                  />
                  <div className="flex flex-1 flex-col items-start">
                    <span className="text-[#005C55] text-sm font-medium">
                      Instant SMS Confirmation • No account needed
                    </span>
                  </div>
                </div>

                {/* Doctor Card Summary */}
                <div
                  className="flex items-center self-stretch bg-white p-[17px] mb-6 gap-4 rounded-xl border border-solid border-slate-100"
                  style={{ boxShadow: "0px 1px 2px #0000000D" }}
                >
                  <div className="flex flex-col shrink-0 items-center">
                    <div
                      className="flex flex-col items-start bg-cover bg-center pt-[39px] pl-10 rounded-[9999px]"
                      style={{ backgroundImage: `url('${doctor?.photoUrl ?? `https://i.pravatar.cc/150?img=${40 + (doctor?.id ?? 1)}`}')` }}
                    >
                      <div
                        className="flex flex-col items-start bg-[#FFFFFF00] py-[5px] px-1 rounded-[9999px]"
                        style={{ boxShadow: "0px 1px 2px #0000000D" }}
                      >
                        <img
                          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e45112d7-8513-40ca-bcbf-8c7a7cff2fc3"
                          className="w-[7px] h-[5px] rounded-[9999px] object-fill"
                          alt="Doctor"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center self-stretch">
                      <span className="text-[#0B1C30] text-lg font-bold">
                        {doctor?.name ?? "Dr. Sarah Jenkins"}
                      </span>
                      <span className="text-[#005C55] text-lg font-bold">
                        {doctor ? `₹${doctor.consultationFee}` : CLINIC_CONFIG.formattedFee}
                      </span>
                    </div>
                    <div className="self-stretch">
                      <div className="flex flex-col self-stretch pr-3.5">
                        <span className="text-[#3E4947] text-sm">
                          {doctor ? `${doctor.title} • ${doctor.departmentName}` : "General Physician • Family Medicine"}
                        </span>
                      </div>
                      <div className="flex items-center self-stretch pt-1 gap-2">
                        <div className="flex shrink-0 items-center">
                          <img
                            src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d01dc0aa-15b7-4a12-a7cd-433a391db4fb"
                            className="w-3 h-[11px] object-fill"
                            alt="Star"
                          />
                          <div className="flex flex-col shrink-0 items-start px-0.5 mr-[1px]">
                            <span className="text-[#0B1C30] text-xs font-bold">
                              {doctor?.ratingAverage ?? 4.9}
                            </span>
                          </div>
                          <div className="flex flex-col shrink-0 items-start px-0.5">
                            <span className="text-[#3E4947] text-xs font-bold">
                              ({doctor?.ratingCount ?? 128})
                            </span>
                          </div>
                        </div>
                        <span className="text-slate-300 text-base">•</span>
                        <span className="text-[#3E4947] text-xs font-bold">
                          In-Person Visit
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real Dynamic Date Selection with Past-Date Logic */}
                <div className="flex flex-col self-stretch pb-[3px] mb-[25px] gap-3">
                  <div className="flex justify-between items-center self-stretch">
                    <div className="flex shrink-0 items-center gap-2">
                      <img
                        src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/cde3dcdc-8226-4b46-8846-ab12a1e10a61"
                        className="w-[15px] h-4 object-fill"
                        alt="Calendar"
                      />
                      <span className="text-[#0B1C30] text-lg font-bold">
                        {currentMonthYear}
                      </span>
                    </div>
                    <span className="text-[#6E7977] text-xs font-medium">
                      Real-time Slot Calendar
                    </span>
                  </div>
                  <div className="flex items-center self-stretch overflow-x-auto pb-1 gap-2.5">
                    {dates.map((d, idx) => {
                      const isSelected = selectedDate === d.val;
                      if (d.disabled) {
                        return (
                          <div
                            key={idx}
                            title="Past date - unavailable for booking"
                            className="flex flex-col shrink-0 items-center bg-[#EFF4FF] py-[15px] px-[17px] rounded-xl border border-solid border-slate-100 opacity-60 cursor-not-allowed select-none"
                          >
                            <span className="text-[#3E4947] text-xs font-bold line-through">
                              {d.day}
                            </span>
                            <span className="text-[#3E4947] text-xl font-bold line-through pt-0.5">
                              {d.date}
                            </span>
                            <span className="text-[#3E4947] text-[10px] pt-1 font-medium">
                              Past
                            </span>
                          </div>
                        );
                      }
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedDate(d.val)}
                          className={`flex flex-col shrink-0 items-center py-[12px] px-[14px] rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#005C55] text-white border-[#005C55] shadow-md"
                              : "bg-white text-[#0B1C30] border-slate-200 hover:border-teal-500"
                          }`}
                        >
                          {d.tag && (
                            <span
                              className={`text-[10px] font-bold ${
                                isSelected ? "text-blue-100" : "text-teal-700"
                              }`}
                            >
                              {d.tag}
                            </span>
                          )}
                          <span
                            className={`text-xl font-bold ${
                              isSelected ? "text-white" : "text-[#0B1C30]"
                            }`}
                          >
                            {d.date}
                          </span>
                          <span
                            className={`text-xs font-bold ${
                              isSelected ? "text-blue-100" : "text-[#3E4947]"
                            }`}
                          >
                            {d.day}
                          </span>
                          <div
                            className={`mt-1 py-[1px] px-1.5 rounded-full text-[9px] font-bold ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-blue-50 text-[#005C55]"
                            }`}
                          >
                            {d.slots}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Available Slots Header */}
                <div className="flex flex-col self-stretch mb-6 gap-2">
                  <div className="flex justify-between items-center self-stretch">
                    <div>
                      <span className="text-[#0B1C30] text-lg font-bold block">
                        Available Slots
                      </span>
                      <span className="text-[#6E7977] text-xs">
                        Fixed 30-Minute Consultation Grid
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 bg-teal-50 px-2 py-1 rounded-md">
                      <div className="bg-[#005C55] w-2 h-2 rounded-[9999px]"></div>
                      <span className="text-[#005C55] text-xs font-bold">
                        {selectedDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center self-stretch py-1 gap-4">
                    <div className="flex shrink-0 items-center gap-1.5">
                      <div className="bg-white w-3.5 h-3.5 rounded-md border border-solid border-slate-200 shadow-sm"></div>
                      <span className="text-[#3E4947] text-[11px]">
                        Available
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <div className="flex flex-col shrink-0 items-start bg-[#005C55] p-1 rounded-md">
                        <div className="w-1.5 h-1 bg-white rounded-sm"></div>
                      </div>
                      <span className="text-[#0B1C30] text-[11px] font-bold">
                        Selected
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <div className="bg-slate-200 w-3.5 h-3.5 rounded-md"></div>
                      <span className="text-[#3E4947] text-[11px]">Booked</span>
                    </div>
                  </div>
                </div>

                {/* Morning Slots (30-min grid) */}
                <div className="flex flex-col self-stretch mb-6 gap-2">
                  <div className="flex items-center self-stretch gap-2">
                    <span className="text-[#3E4947] text-sm font-bold">
                      Morning
                    </span>
                    <span className="text-[#3E4947] text-xs">
                      (9:00 AM – 12:00 PM • 30m slots)
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {morningSlots.map((slot, i) => {
                      const isSelected = selectedTime === slot.time;
                      if (slot.status === "booked") {
                        return (
                          <div
                            key={i}
                            className="flex flex-col items-center justify-center bg-[#EFF4FF] py-3 rounded-xl border border-slate-100 opacity-60"
                          >
                            <span className="text-[#3E4947] text-base font-bold line-through">
                              {slot.time}
                            </span>
                            <span className="text-[#3E4947] text-[10px]">
                              Taken
                            </span>
                          </div>
                        );
                      }
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedTime(slot.time)}
                          className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#005C55] text-white border-[#005C55] shadow-md"
                              : "bg-white text-[#0B1C30] border-slate-200 hover:border-teal-500"
                          }`}
                        >
                          <span
                            className={`text-base font-bold ${
                              isSelected ? "text-white" : "text-[#0B1C30]"
                            }`}
                          >
                            {slot.time}
                          </span>
                          <span
                            className={`text-[10px] ${
                              isSelected ? "text-blue-100" : "text-[#005C55]"
                            }`}
                          >
                            {isSelected ? "Selected" : "Available"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Afternoon Slots (30-min grid) */}
                <div className="flex flex-col self-stretch mb-6 gap-2">
                  <div className="flex items-center self-stretch gap-2">
                    <span className="text-[#3E4947] text-sm font-bold">
                      Afternoon
                    </span>
                    <span className="text-[#3E4947] text-xs">
                      (12:00 PM – 4:00 PM • 30m slots)
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {afternoonSlots.map((slot, i) => {
                      const isSelected = selectedTime === slot.time;
                      if (slot.status === "booked") {
                        return (
                          <div
                            key={i}
                            className="flex flex-col items-center justify-center bg-[#EFF4FF] py-3 rounded-xl border border-slate-100 opacity-60"
                          >
                            <span className="text-[#3E4947] text-base font-bold line-through">
                              {slot.time}
                            </span>
                            <span className="text-[#3E4947] text-[10px]">
                              Taken
                            </span>
                          </div>
                        );
                      }
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedTime(slot.time)}
                          className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#005C55] text-white border-[#005C55] shadow-md"
                              : "bg-white text-[#0B1C30] border-slate-200 hover:border-teal-500"
                          }`}
                        >
                          <span
                            className={`text-base font-bold ${
                              isSelected ? "text-white" : "text-[#0B1C30]"
                            }`}
                          >
                            {slot.time}
                          </span>
                          <span
                            className={`text-[10px] ${
                              isSelected ? "text-blue-100" : "text-[#005C55]"
                            }`}
                          >
                            {isSelected ? "Selected" : "Available"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Evening Slots (30-min grid) */}
                <div className="flex flex-col self-stretch mb-6 gap-2">
                  <div className="flex items-center self-stretch gap-2">
                    <span className="text-[#3E4947] text-sm font-bold">
                      Evening
                    </span>
                    <span className="text-[#3E4947] text-xs">
                      (4:00 PM – 7:00 PM • 30m slots)
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {eveningSlots.map((slot, i) => {
                      const isSelected = selectedTime === slot.time;
                      if (slot.status === "booked") {
                        return (
                          <div
                            key={i}
                            className="flex flex-col items-center justify-center bg-[#EFF4FF] py-3 rounded-xl border border-slate-100 opacity-60"
                          >
                            <span className="text-[#3E4947] text-base font-bold line-through">
                              {slot.time}
                            </span>
                            <span className="text-[#3E4947] text-[10px]">
                              Taken
                            </span>
                          </div>
                        );
                      }
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedTime(slot.time)}
                          className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#005C55] text-white border-[#005C55] shadow-md"
                              : "bg-white text-[#0B1C30] border-slate-200 hover:border-teal-500"
                          }`}
                        >
                          <span
                            className={`text-base font-bold ${
                              isSelected ? "text-white" : "text-[#0B1C30]"
                            }`}
                          >
                            {slot.time}
                          </span>
                          <span
                            className={`text-[10px] ${
                              isSelected ? "text-blue-100" : "text-[#005C55]"
                            }`}
                          >
                            {isSelected ? "Selected" : "Available"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Consultation details with 2-hour reminder & cancellation aligned */}
                <div className="flex flex-col self-stretch bg-[#EFF4FF] p-[17px] gap-2 rounded-xl border border-solid border-slate-100">
                  <div className="flex justify-between items-center self-stretch border-b border-solid border-b-slate-200 pb-2">
                    <span className="text-[#0B1C30] text-sm font-medium">
                      Consultation Duration
                    </span>
                    <span className="text-[#005C55] text-sm font-bold">
                      30 mins (Fixed Grid)
                    </span>
                  </div>
                  <div className="flex justify-between items-center self-stretch border-b border-solid border-b-slate-200 pb-2">
                    <span className="text-[#0B1C30] text-sm font-medium">
                      Clinic Location
                    </span>
                    <span className="text-[#3E4947] text-sm font-medium">
                      Metro District, Ste 210
                    </span>
                  </div>
                  <div className="flex items-start self-stretch py-1 gap-2">
                    <span className="text-[#3E4947] text-xs">
                      Free cancellation or rescheduling up to 2 hours prior to
                      appointment time. SMS reminder sent 2 hours prior.
                    </span>
                  </div>
                </div>
              </div>

              {/* Fixed Bottom CTA Bar */}
              <div
                className="flex flex-col self-stretch bg-white fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-30 p-4 gap-2 border-t border-slate-200"
                style={{ boxShadow: "0px -4px 16px #0000001A" }}
              >
                <div className="flex justify-between items-center self-stretch px-1">
                  <div className="flex flex-col shrink-0 items-start">
                    <span className="text-[#3E4947] text-xs font-bold">
                      Selected Appointment
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#0B1C30] text-base font-bold">
                        {selectedDate} • {selectedTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col shrink-0 items-center">
                    <span className="text-[#3E4947] text-xs font-bold">
                      Consult Fee
                    </span>
                    <span className="text-[#005C55] text-xl font-bold">
                      {doctor ? `₹${doctor.consultationFee.toFixed(2)}` : CLINIC_CONFIG.formattedFeeWithDecimals}
                    </span>
                  </div>
                </div>
                               <button
                  data-go="patient"
                  disabled={!selectedTime}
                  onClick={() =>
                    sessionStorage.setItem(
                      "bookingChoice",
                      JSON.stringify({
                        doctorId: doctor?.id,
                        doctorName: doctor?.name,
                        title: doctor?.title,
                        departmentName: doctor?.departmentName,
                        room: doctor?.room,
                        date: selectedDate,
                        time24: to24h(selectedTime),
                        time12: selectedTime,
                        fee: doctor?.consultationFee,
                      })
                    )
                  }
                  className="flex justify-center items-center self-stretch bg-[#005C55] hover:bg-[#004A44] transition-colors text-white py-3 px-4 gap-[9px] rounded-xl border-0 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <span className="text-white text-base font-bold">
                    Continue to Patient Details
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}