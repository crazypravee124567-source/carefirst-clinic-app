import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface DaySchedule {
  day: string;
  short: string;
  open: boolean;
  startTime: string;
  endTime: string;
  slotLength: string;
}

const DEFAULT_SCHEDULE: DaySchedule[] = [
  { day: "Monday", short: "MO", open: true, startTime: "08:30 AM", endTime: "05:00 PM", slotLength: "20 minutes" },
  { day: "Tuesday", short: "TU", open: true, startTime: "08:30 AM", endTime: "05:00 PM", slotLength: "20 minutes" },
  { day: "Wednesday", short: "WE", open: true, startTime: "08:30 AM", endTime: "05:00 PM", slotLength: "20 minutes" },
  { day: "Thursday", short: "TH", open: true, startTime: "08:30 AM", endTime: "05:00 PM", slotLength: "20 minutes" },
  { day: "Friday", short: "FR", open: true, startTime: "08:30 AM", endTime: "05:00 PM", slotLength: "20 minutes" },
  { day: "Saturday", short: "SA", open: true, startTime: "09:00 AM", endTime: "01:00 PM", slotLength: "20 minutes" },
  { day: "Sunday", short: "SU", open: false, startTime: "Closed", endTime: "Closed", slotLength: "N/A" },
];

export default function CareFirstClinicAdminSchedule() {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState("Dr. Sarah Jenkins (Family Medicine)");
  const [slotDuration, setSlotDuration] = useState("20 mins");
  const [schedule, setSchedule] = useState<DaySchedule[]>(DEFAULT_SCHEDULE);
  const [savedToast, setSavedToast] = useState(false);

  const toggleDayOpen = (dayIndex: number) => {
    setSchedule((prev) =>
      prev.map((item, idx) => {
        if (idx === dayIndex) {
          const willOpen = !item.open;
          return {
            ...item,
            open: willOpen,
            startTime: willOpen ? "08:30 AM" : "Closed",
            endTime: willOpen ? "05:00 PM" : "Closed",
            slotLength: willOpen ? "20 minutes" : "N/A",
          };
        }
        return item;
      })
    );
  };

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Banner / Switcher */}
      <div className="flex justify-between items-center px-8 py-2.5 bg-[#005C55] text-white text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-semibold tracking-wide">CAREFIRST CLINICAL ADMIN SYSTEM</span>
        </div>
        <Link
          to="/patient"
          className="bg-white/10 hover:bg-white/20 text-white font-medium px-3 py-1 rounded transition-colors flex items-center gap-1.5"
        >
          <span>Switch to Patient Booking Portal</span>
          <span>&rarr;</span>
        </Link>
      </div>

      <div className="flex flex-1 items-stretch">
        {/* Sidebar */}
        <aside
          className="bg-white w-64 py-6 px-4 flex flex-col justify-between shrink-0 border-r border-[#EFF4FF]"
          style={{ boxShadow: "0px 1px 8px #00000008" }}
        >
          <div className="flex flex-col gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3 px-2">
              <div className="flex shrink-0 items-center justify-center bg-[#005C55] text-white p-2.5 rounded-xl shadow-sm">
                <img
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7ce114e4-44c3-423a-b2d2-1b0456f8c1ca"
                  className="w-5 h-5 object-contain"
                  alt="CareFirst Logo"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <span className="text-[#0B1C30] text-lg font-bold block leading-none">
                  CareFirst
                </span>
                <span className="text-[#6E7977] text-[10px] font-bold tracking-wider uppercase">
                  Clinical Admin
                </span>
              </div>
            </div>

            {/* Nav Items */}
            <nav className="flex flex-col gap-1.5">
              <Link
                to="/appointments"
                className="flex items-center text-[#3E4947] hover:bg-slate-50 py-3 px-3.5 rounded-xl text-sm font-medium transition-all"
              >
                <img
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/ed9f81cf-6f5e-4c88-8f9d-818ff21eb769"
                  className="w-4 h-4 mr-3 object-contain"
                  alt=""
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span>Appointments</span>
              </Link>

              <Link
                to="/doctors"
                className="flex items-center text-[#3E4947] hover:bg-slate-50 py-3 px-3.5 rounded-xl text-sm font-medium transition-all"
              >
                <img
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/35f165a8-5877-45d8-afb6-4856495a02d7"
                  className="w-4 h-4 mr-3 object-contain"
                  alt=""
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span>Doctors</span>
              </Link>

              <Link
                to="/schedule"
                className="flex items-center bg-[#005C55] text-white py-3 px-3.5 rounded-xl font-bold text-sm shadow-sm transition-all"
              >
                <img
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0ec82b4b-9704-47c5-9e6e-185ae01c7af8"
                  className="w-4 h-4 mr-3 object-contain invert brightness-0"
                  alt=""
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span>Schedule</span>
              </Link>

              <Link
                to="/appointments"
                className="flex items-center text-[#3E4947] hover:bg-slate-50 py-3 px-3.5 rounded-xl text-sm font-medium transition-all"
              >
                <img
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/745cd207-3145-4293-9167-7f0caacd3852"
                  className="w-4 h-4 mr-3 object-contain"
                  alt=""
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span>Dashboard</span>
              </Link>
            </nav>
          </div>

          {/* Sign Out */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center text-[#BA1A1A] hover:bg-red-50 py-3 px-3.5 rounded-xl text-sm font-medium transition-all border-0 bg-transparent cursor-pointer"
          >
            <img
              src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/73aa93e7-4bee-45cb-98c7-ec91af98a7d4"
              className="w-4 h-4 mr-3 object-contain"
              alt=""
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span>Sign out</span>
          </button>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 bg-[#F8F9FF] flex flex-col min-w-0">
          {/* Header Bar */}
          <div
            className="flex justify-between items-center bg-white/90 backdrop-blur py-3.5 px-8 border-b border-[#EFF4FF]"
            style={{ boxShadow: "0px 1px 8px #00000008" }}
          >
            <span className="text-[#6E7977] text-xs font-bold uppercase tracking-wider">
              CLINIC WORKSPACE &bull; PRACTITIONER ROSTER
            </span>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[#0B1C30] text-sm font-bold block">Dr. Sarah Adams</span>
                <span className="text-[#3E4947] text-xs block">Clinical Director</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#005C55] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                SA
              </div>
            </div>
          </div>

          {/* Page Body */}
          <div className="p-8 flex flex-col gap-8">
            {/* Top Config Row */}
            <div className="flex flex-wrap justify-between items-end gap-6">
              <div className="flex-1 min-w-[300px]">
                <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-[#6E7977]">
                  <span>CLINICAL ADMINISTRATION</span>
                  <span className="text-teal-700">&bull;</span>
                  <span className="text-teal-700">PRACTITIONER SCHEDULES</span>
                </div>
                <h1 className="text-[#0B1C30] text-3xl font-bold tracking-tight">Schedule</h1>
                <p className="text-[#3E4947] text-sm mt-1 max-w-xl">
                  Configure weekly operational hours, slot duration, and working days per practitioner for in-clinic consultations.
                </p>
              </div>

              {/* Practitioner Select */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[#6E7977] text-[11px] font-bold uppercase tracking-wider">
                    ASSIGNED PRACTITIONER
                  </label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="bg-white text-sm text-[#0B1C30] py-2.5 px-4 rounded-xl border border-slate-200 outline-none shadow-sm cursor-pointer font-medium"
                  >
                    <option value="Dr. Sarah Jenkins (Family Medicine)">
                      Dr. Sarah Jenkins (Family Medicine)
                    </option>
                    <option value="Dr. Michael Chen (Cardiology)">
                      Dr. Michael Chen (Cardiology)
                    </option>
                    <option value="Dr. Emily Patel (Pediatrics)">
                      Dr. Emily Patel (Pediatrics)
                    </option>
                    <option value="Dr. Rajesh Iyer (Orthopedics)">
                      Dr. Rajesh Iyer (Orthopedics)
                    </option>
                    <option value="Dr. Meena (General Medicine)">
                      Dr. Meena (General Medicine)
                    </option>
                  </select>
                </div>

                <div className="self-end pb-1">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm py-2.5 px-5 rounded-xl shadow-sm border-0 cursor-pointer transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {savedToast && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-3 rounded-xl flex items-center justify-between shadow-sm">
                <span>Working schedule for {selectedDoctor} has been updated successfully.</span>
                <span className="font-bold cursor-pointer" onClick={() => setSavedToast(false)}>
                  &times;
                </span>
              </div>
            )}

            {/* Weekly Working Hours Card */}
            <div
              className="bg-white rounded-2xl overflow-hidden border border-slate-200"
              style={{ boxShadow: "0px 1px 2px #0000000D" }}
            >
              {/* Card Header */}
              <div className="flex flex-wrap justify-between items-center p-6 border-b border-[#EFF4FF] gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#EFF4FF] p-3 rounded-xl text-teal-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-[#0B1C30] text-lg font-bold">Weekly Working Hours</h2>
                    <p className="text-[#3E4947] text-sm">
                      Set shifts and appointment intervals for in-clinic consultations
                    </p>
                  </div>
                </div>

                {/* Slot Duration Switcher */}
                <div className="flex items-center gap-2 bg-[#EFF4FF] p-1.5 rounded-xl text-xs font-semibold text-[#3E4947]">
                  <span className="px-2">Current Slot Duration:</span>
                  {(["15 mins", "20 mins", "30 mins", "45 mins"] as const).map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setSlotDuration(dur)}
                      className={`px-3 py-1 rounded-lg border-0 cursor-pointer transition-all ${
                        slotDuration === dur
                          ? "bg-[#005C55] text-white font-bold shadow-sm"
                          : "bg-transparent text-[#3E4947] hover:bg-white"
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table of Days */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#EFF4FF99] border-b border-[#EFF4FF]">
                      <th className="py-3 px-8 text-[#6E7977] text-xs font-bold tracking-wider">DAY</th>
                      <th className="py-3 px-6 text-[#6E7977] text-xs font-bold tracking-wider">STATUS</th>
                      <th className="py-3 px-6 text-[#6E7977] text-xs font-bold tracking-wider">START TIME</th>
                      <th className="py-3 px-6 text-[#6E7977] text-xs font-bold tracking-wider">END TIME</th>
                      <th className="py-3 px-6 text-[#6E7977] text-xs font-bold tracking-wider">SLOT LENGTH</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {schedule.map((item, idx) => (
                      <tr key={item.day} className="hover:bg-slate-50/70 transition-colors">
                        {/* Day */}
                        <td className="py-4 px-8">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-[#EFF4FF] text-[#005C55] font-bold text-xs flex items-center justify-center shrink-0">
                              {item.short}
                            </span>
                            <span className="text-[#0B1C30] text-sm font-bold">{item.day}</span>
                          </div>
                        </td>

                        {/* Status Toggle */}
                        <td className="py-4 px-6">
                          <button
                            type="button"
                            onClick={() => toggleDayOpen(idx)}
                            className="flex items-center gap-2 bg-transparent border-0 cursor-pointer"
                            title="Click to toggle open/closed"
                          >
                            <div
                              className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                                item.open ? "bg-[#005C55] justify-end" : "bg-slate-300 justify-start"
                              }`}
                            >
                              <div className="bg-white w-4 h-4 rounded-full shadow-sm"></div>
                            </div>
                            <span
                              className={`text-xs font-bold py-0.5 px-2 rounded-full ${
                                item.open
                                  ? "bg-teal-50 text-teal-700"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {item.open ? "Open" : "Closed"}
                            </span>
                          </button>
                        </td>

                        {/* Start Time */}
                        <td className="py-4 px-6">
                          {item.open ? (
                            <select
                              value={item.startTime}
                              onChange={(e) => {
                                const val = e.target.value;
                                setSchedule((prev) =>
                                  prev.map((s, i) => (i === idx ? { ...s, startTime: val } : s))
                                );
                              }}
                              className="bg-[#EFF4FF] text-xs font-medium text-[#0B1C30] py-2 px-3 rounded-lg border border-slate-200 outline-none cursor-pointer"
                            >
                              <option value="08:00 AM">08:00 AM</option>
                              <option value="08:30 AM">08:30 AM</option>
                              <option value="09:00 AM">09:00 AM</option>
                              <option value="09:30 AM">09:30 AM</option>
                              <option value="10:00 AM">10:00 AM</option>
                            </select>
                          ) : (
                            <span className="text-slate-400 text-xs italic">&ndash;</span>
                          )}
                        </td>

                        {/* End Time */}
                        <td className="py-4 px-6">
                          {item.open ? (
                            <select
                              value={item.endTime}
                              onChange={(e) => {
                                const val = e.target.value;
                                setSchedule((prev) =>
                                  prev.map((s, i) => (i === idx ? { ...s, endTime: val } : s))
                                );
                              }}
                              className="bg-[#EFF4FF] text-xs font-medium text-[#0B1C30] py-2 px-3 rounded-lg border border-slate-200 outline-none cursor-pointer"
                            >
                              <option value="01:00 PM">01:00 PM</option>
                              <option value="04:00 PM">04:00 PM</option>
                              <option value="05:00 PM">05:00 PM</option>
                              <option value="06:00 PM">06:00 PM</option>
                              <option value="07:00 PM">07:00 PM</option>
                            </select>
                          ) : (
                            <span className="text-slate-400 text-xs italic">&ndash;</span>
                          )}
                        </td>

                        {/* Slot Length */}
                        <td className="py-4 px-6">
                          {item.open ? (
                            <span className="bg-[#EFF4FF] text-[#0B1C30] text-xs py-1.5 px-3 rounded-lg font-medium inline-block">
                              {slotDuration}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-xs italic">N/A</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}