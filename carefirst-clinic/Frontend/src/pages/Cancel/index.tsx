import React, { useState } from "react";
import { getDynamicDates } from "../../utils/appointmentData";

export default function Cancel() {
  const { todayFull } = getDynamicDates();
  const [selectedReason, setSelectedReason] = useState("");

  const reasons = [
    "Schedule conflict",
    "Feeling better",
    "Need another date",
    "Other",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="self-stretch overflow-clip">
        <div className="self-stretch bg-black/60 py-[80px] px-4 min-h-screen flex justify-center items-center">
          <div
            className="self-stretch bg-white py-[24px] px-5 rounded-3xl w-full max-w-[390px] border border-slate-100"
            style={{ boxShadow: "0px 25px 50px rgba(0, 0, 0, 0.25)" }}
          >
            {/* Modal Icon and Title */}
            <div className="flex flex-col items-center self-stretch mb-5 gap-2 text-center">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-1">
                <img
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/63b7a1e5-f0bd-42c4-a882-5a27a9bbd25b"
                  className="w-8 h-8 rounded-2xl object-fill"
                  alt="Cancel icon"
                />
              </div>
              <span className="text-[#0F2E2B] text-xl font-bold">
                Cancel Appointment?
              </span>
              <span className="text-[#3F5653] text-xs text-center px-2">
                Are you sure you want to release this time slot? You will need to re-book if you change your mind.
              </span>
            </div>

            {/* Appointment Summary Box */}
            <div className="flex flex-col self-stretch bg-teal-50/80 p-3.5 mb-5 gap-3 rounded-2xl border border-teal-100">
              <div className="flex items-center self-stretch gap-3">
                <div className="flex flex-col shrink-0 items-center bg-[#E6F6F3] rounded-xl p-1">
                  <img
                    src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a071bfc4-36e4-46b0-8368-d207a73eb11e"
                    className="w-10 h-10 rounded-xl object-fill"
                    alt="Doctor"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center self-stretch">
                    <span className="text-[#0F2E2B] text-sm font-bold">
                      Dr. Sarah Jenkins
                    </span>
                    <span className="text-teal-700 text-[10px] font-bold bg-[#CCF0EA] py-0.5 px-1.5 rounded">
                      In-Person
                    </span>
                  </div>
                  <span className="text-[#3F5653] text-[11px] block">
                    Family Medicine • Routine Checkup
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center self-stretch bg-white p-2.5 rounded-xl border border-teal-100">
                <div className="flex items-center gap-2">
                  <img
                    src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a577e5a9-35e8-4bfe-840b-9105eabffa75"
                    className="w-[13px] h-[15px] object-fill"
                    alt="Calendar"
                  />
                  <div>
                    <span className="text-[#0F2E2B] text-xs font-bold block">
                      {todayFull}
                    </span>
                    <span className="text-[#3F5653] text-[11px] block">
                      02:30 PM (30 min • Fixed Grid)
                    </span>
                  </div>
                </div>
                <span className="text-teal-700 text-[11px] bg-[#9CF2E866] py-1 px-2 rounded-lg font-medium">
                  Room 304
                </span>
              </div>

              <div className="flex items-center self-stretch bg-[#DDF2EE] py-1.5 px-2.5 gap-1.5 rounded-lg">
                <img
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/928ea1e5-b099-4d66-b2da-d36df3cd9457"
                  className="w-3.5 h-3.5 rounded-lg object-fill"
                  alt="Info"
                />
                <span className="text-teal-700 text-[11px] font-medium">
                  Eligible for free cancellation (&gt;2 hrs notice)
                </span>
              </div>
            </div>

            {/* Optional Reasons */}
            <div className="flex flex-col self-stretch mb-5 gap-2">
              <div className="flex items-center gap-1">
                <span className="text-[#0F2E2B] text-xs font-bold">
                  Why are you cancelling?
                </span>
                <span className="text-[#3F5653] text-[11px]">(Optional)</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {reasons.map((r, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedReason(r)}
                    className={`py-1.5 px-3 rounded-full text-[11px] font-medium transition-colors cursor-pointer border-0 ${
                      selectedReason === r
                        ? "bg-teal-700 text-white"
                        : "bg-teal-50 text-[#3F5653] hover:bg-teal-100"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col self-stretch gap-2.5 mb-4">
              <button
                data-go="manage"
                className="flex justify-center items-center self-stretch bg-[#005C55] hover:bg-[#004A44] transition-colors text-white py-3.5 gap-2 rounded-xl border-0 cursor-pointer font-bold text-sm shadow-md"
              >
                No, Keep Appointment
              </button>
              <button
                data-go="home"
                className="flex justify-center items-center self-stretch bg-red-50 hover:bg-red-100 text-red-700 transition-colors py-3 gap-2 rounded-xl border border-red-200 cursor-pointer font-bold text-xs"
              >
                Yes, Cancel Booking
              </button>
            </div>

            {/* Reschedule Option */}
            <button
              data-go="datetime"
              className="flex items-center justify-center self-stretch py-2 gap-1 bg-transparent border-0 cursor-pointer text-teal-700 hover:text-teal-900 transition-colors"
            >
              <span className="text-xs font-bold">
                Need to reschedule instead? Pick a new time slot
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}