import React from "react";
import { Doctor } from "../utils/api";

// One doctor card, generated from data instead of hardcoded JSX.
// Visual style copied from your original Figma-exported card.
export default function DoctorCard({ doctor }: { doctor: Doctor }) {
    // photoUrl is NULL in the database today, so fall back to a
    // deterministic avatar (same doctor always gets the same face).
    const avatar = doctor.photoUrl ?? `https://i.pravatar.cc/150?img=${40 + doctor.id}`;

    return (
        <div
            className="flex flex-col self-stretch bg-white py-[15px] px-[17px] gap-[26px] rounded-2xl border border-solid border-[#E2E8F0CC]"
            style={{ boxShadow: "0px 1px 2px #0000000D" }}
        >
            <div className="flex items-start self-stretch gap-3.5">
                <div
                    className="flex flex-col shrink-0 items-start bg-cover bg-center pt-12 pl-12 rounded-[9999px]"
                    style={{ backgroundImage: `url('${avatar}')` }}
                >
                    <div className="items-start bg-[#FFFFFF00] p-[5px] rounded-[9999px]">
                        <div className="bg-white w-1.5 h-1.5 rounded-[9999px]"></div>
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center self-stretch gap-[11px]">
                        <div className="flex flex-1 flex-col items-start">
                            <span className="text-[#0B1C30] text-lg font-bold">
                                {doctor.name}
                            </span>
                        </div>
                        <div className="flex shrink-0 items-center bg-amber-50 py-0.5 px-2 rounded-[9999px]">
                            <span className="text-[#0B1C30] text-xs font-bold mr-[5px]">
                                {doctor.ratingAverage}
                            </span>
                            <span className="text-[#6E7977] text-xs font-bold">
                                ({doctor.ratingCount})
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-start self-stretch">
                        <span className="text-[#3E4947] text-sm">
                            {doctor.title} • {doctor.departmentName}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center self-stretch pt-1 gap-2">
                        <div className="flex flex-col shrink-0 items-start bg-[#EFF4FF] py-0.5 px-2 rounded-md">
                            <span className="text-[#3E4947] text-xs font-bold">
                                {doctor.yearsExperience} yrs exp
                            </span>
                        </div>
                        {doctor.tags.map((tag) => (
                            <div key={tag} className="flex flex-col items-start bg-[#EFF4FF] py-0.5 px-2 rounded-md">
                                <span className="text-[#3E4947] text-xs font-bold">{tag}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center self-stretch">
                <div className="flex flex-col shrink-0 items-center gap-0.5">
                    <div className="flex items-center gap-[5px]">
                        <span className="text-[#0B1C30] text-base font-bold">
                            ₹{doctor.consultationFee}
                        </span>
                        <span className="text-[#6E7977] text-xs">/ consult</span>
                    </div>
                </div>
                <button
                    data-go="datetime"
                    onClick={() => sessionStorage.setItem("selectedDoctorId", String(doctor.id))}
                    className="flex shrink-0 items-center bg-[#005C55] text-left py-3 px-5 gap-[9px] rounded-xl border-0"
                    style={{ boxShadow: "0px 1px 2px #0000000D" }}
                >
                    <span className="text-white text-sm">Book</span>
                </button>
            </div>
        </div>
    );
}