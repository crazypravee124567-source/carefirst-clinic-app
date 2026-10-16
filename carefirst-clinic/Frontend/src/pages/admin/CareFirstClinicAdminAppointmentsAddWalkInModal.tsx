import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SLOTS = [
  { time: "09:00 AM", available: false },
  { time: "10:15 AM", available: false },
  { time: "11:30 AM", available: true },
  { time: "02:00 PM", available: true },
  { time: "03:15 PM", available: true },
  { time: "04:30 PM", available: true },
  { time: "05:15 PM", available: true },
  { time: "05:45 PM", available: false },
];

export default function CareFirstClinicAdminAppointmentsAddWalkInModal() {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [doctor, setDoctor] = useState("Dr. Meena");
  const [date, setDate] = useState("Today, 24 Oct 2026");
  const [selectedSlot, setSelectedSlot] = useState("03:15 PM");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!patientName.trim()) {
      setErrorMsg("Please enter the patient's name.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("Please enter a phone number.");
      return;
    }
    if (!selectedSlot) {
      setErrorMsg("Please select an available time slot.");
      return;
    }

    setSuccessMsg("Walk-in appointment booked successfully!");
    setTimeout(() => {
      navigate("/appointments");
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900/60 backdrop-blur-sm justify-center items-center p-4">
      <div
        className="flex flex-col bg-white w-full max-w-[520px] rounded-2xl border border-slate-200 overflow-hidden shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center py-4 px-6 border-b border-[#EFF4FF] bg-white">
          <div className="flex items-center gap-3">
            <div className="flex shrink-0 items-center justify-center bg-teal-50 text-teal-700 p-2.5 rounded-xl border border-teal-100">
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-[#0B1C30] text-lg font-bold">Add walk-in booking</h2>
              <p className="text-[#6E7977] text-xs">Create on-spot outpatient appointment slot</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/appointments")}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-lg text-lg leading-none cursor-pointer border-0 bg-transparent"
            title="Close"
          >
            &times;
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {errorMsg && (
            <div className="bg-red-50 text-red-600 text-xs py-2 px-3 rounded-lg">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="bg-emerald-50 text-emerald-700 text-xs py-2 px-3 rounded-lg font-semibold">
              {successMsg}
            </div>
          )}

          {/* Patient Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#0B1C30] text-xs font-bold">Patient Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Kumar"
              value={patientName}
              onChange={(e) => {
                setPatientName(e.target.value);
                setErrorMsg("");
              }}
              className="w-full text-[#0B1C30] bg-[#F8F9FF] text-sm py-2.5 px-3.5 rounded-lg border border-slate-200 outline-none focus:border-teal-600 focus:bg-white transition-all"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#0B1C30] text-xs font-bold">Phone Number *</label>
            <div className="flex items-center rounded-lg border border-slate-200 overflow-hidden bg-[#F8F9FF] focus-within:border-teal-600 focus-within:bg-white transition-all">
              <span className="bg-[#EFF4FF] py-2.5 px-3 text-[#3E4947] text-xs font-semibold border-r border-slate-200">
                +91
              </span>
              <input
                type="tel"
                required
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrorMsg("");
                }}
                className="flex-1 bg-transparent text-sm text-[#0B1C30] py-2.5 px-3 outline-none"
              />
            </div>
          </div>

          {/* Doctor & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#0B1C30] text-xs font-bold">Doctor *</label>
              <select
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                className="w-full bg-[#F8F9FF] text-sm text-[#0B1C30] py-2.5 px-3 rounded-lg border border-slate-200 outline-none cursor-pointer"
              >
                <option value="Dr. Meena">Dr. Meena (General Medicine)</option>
                <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins (Family Practice)</option>
                <option value="Dr. Michael Chen">Dr. Michael Chen (Cardiology)</option>
                <option value="Dr. Emily Patel">Dr. Emily Patel (Pediatrics)</option>
                <option value="Dr. Rajesh Iyer">Dr. Rajesh Iyer (Orthopedics)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#0B1C30] text-xs font-bold">Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#F8F9FF] text-sm text-[#0B1C30] py-2.5 px-3 rounded-lg border border-slate-200 outline-none"
              />
            </div>
          </div>

          {/* Available Time Slots */}
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-[#0B1C30] text-xs font-bold">Available Time Slots</span>
              <span className="text-[#6E7977] text-[11px]">Slot duration: 20 mins</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {SLOTS.map((slot) => {
                const isSelected = selectedSlot === slot.time;
                if (!slot.available) {
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled
                      className="py-2 px-1 text-center bg-slate-100 text-slate-400 text-xs rounded-lg border border-transparent line-through cursor-not-allowed"
                    >
                      {slot.time}
                    </button>
                  );
                }
                return (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => {
                      setSelectedSlot(slot.time);
                      setErrorMsg("");
                    }}
                    className={`py-2 px-1 text-center text-xs font-medium rounded-lg border transition-all ${
                      isSelected
                        ? "bg-[#005C55] text-white border-[#005C55] shadow-sm font-bold"
                        : "bg-white text-[#0B1C30] border-slate-200 hover:border-teal-600 hover:bg-teal-50/50"
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 pt-1 text-[11px] text-[#6E7977]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-white border border-slate-300"></span>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#005C55]"></span>
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-200"></span>
                <span>Booked</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end items-center gap-3 pt-4 border-t border-[#EFF4FF] mt-2">
            <button
              type="button"
              onClick={() => navigate("/appointments")}
              className="px-4 py-2 text-sm font-semibold text-[#3E4947] hover:text-[#0B1C30] bg-transparent border-0 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center bg-teal-700 hover:bg-teal-800 transition-colors text-white py-2.5 px-6 gap-2 rounded-lg font-bold text-sm shadow-sm cursor-pointer border-0"
            >
              <span>+</span>
              <span>Add booking</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}