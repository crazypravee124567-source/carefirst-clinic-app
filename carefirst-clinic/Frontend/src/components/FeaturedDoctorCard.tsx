import React from "react";
import { Doctor } from "../utils/api";

// Compact card for the Home page "Our Practitioners" strip.
// todaySlots: undefined = still loading, 0 = no slots today, >0 = real count
export default function FeaturedDoctorCard({
  doctor,
  todaySlots,
}: {
  doctor: Doctor;
  todaySlots: number | undefined;
}) {
  const avatar = doctor.photoUrl ?? `https://i.pravatar.cc/150?img=${40 + doctor.id}`;
  const firstName = doctor.name.replace(/^Dr\.\s*/, "").split(" ")[0];

  return (
    <div
      className="flex flex-col self-stretch bg-white p-[17px] gap-2 rounded-2xl border border-solid border-slate-200"
      style={{ boxShadow: "0px 1px 2px #0000000D" }}
    >
      <div className="flex items-center self-stretch gap-2">
        <div
          className="shrink-0 items-start bg-cover bg-center pt-[42px] pl-[42px] rounded-[9999px]"
          style={{ backgroundImage: `url('${avatar}')` }}
        >
          <div
            className="bg-[#FFFFFF00] w-3.5 h-3.5 rounded-[9999px]"
            style={{ boxShadow: "0px 1px 2px #0000000D" }}
          ></div>
        </div>
        <div className="flex-1">
          <div className="flex items-center self-stretch gap-[41px]">
            <div className="flex flex-1 flex-col items-start">
              <span className="text-[#0B1C30] text-base font-bold">
                {doctor.name}
              </span>
            </div>
            <div className="flex shrink-0 items-center bg-amber-50 py-[3px] px-[9px] gap-1 rounded-[9999px] border border-solid border-amber-200">
              <span className="text-amber-950 text-xs font-bold">
                {doctor.ratingAverage}
              </span>
              <span className="text-[#3E4947] text-[11px]">
                ({doctor.ratingCount})
              </span>
            </div>
          </div>
          <div className="flex flex-col self-stretch pr-[22px]">
            <span className="text-[#3E4947] text-sm">
              {doctor.title} • {doctor.departmentName}
            </span>
          </div>
          <div className="flex items-center self-stretch py-1 gap-1.5">
            <div
              className={`w-1.5 h-1.5 rounded-[9999px] ${todaySlots === undefined
                  ? "bg-slate-400"
                  : todaySlots > 0
                    ? "bg-emerald-500"
                    : "bg-amber-500"
                }`}
            ></div>
            <span
              className={`text-xs ${todaySlots === undefined
                  ? "text-slate-500"
                  : todaySlots > 0
                    ? "text-emerald-700"
                    : "text-amber-700"
                }`}
            >
              {todaySlots === undefined
                ? "Checking availability…"
                : todaySlots > 0
                  ? `Available Today • ${todaySlots} slots left`
                  : "No open slots today"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center self-stretch py-[9px] border-t border-solid border-t-slate-100">
        <div className="flex flex-col shrink-0 items-center">
          <span className="text-[#3E4947] text-[11px] font-bold">
            CONSULTATION
          </span>
          <div className="flex flex-col items-start pr-[65px]">
            <span className="text-[#0B1C30] text-base font-bold">
              ₹{doctor.consultationFee}
            </span>
          </div>
        </div>
        <button
          data-go="datetime"
          onClick={() => sessionStorage.setItem("selectedDoctorId", String(doctor.id))}
          className="flex shrink-0 items-center bg-[#005C55] text-left py-2.5 px-4 gap-[7px] rounded-xl border-0"
          style={{ boxShadow: "0px 1px 2px #0000000D" }}
        >
          <span className="text-white text-sm">
            Book with Dr. {firstName}
          </span>
        </button>
      </div>
    </div>
  );
}