import React, { useState } from "react";
import { Appointment } from "../../utils/api";
import { CLINIC_CONFIG, maskPhoneNumber, getDynamicDates } from "../../utils/appointmentData";

// "14:30" or "14:30:00" -> "2:30 PM"
const to12h = (t: string): string => {
	const [h, m] = t.split(":").map(Number);
	const period = h >= 12 ? "PM" : "AM";
	const hour12 = h % 12 === 0 ? 12 : h % 12;
	return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
};

// "2026-10-20" -> "Monday, Oct 20, 2026"  (same style as getDynamicDates)
const fullDateOf = (iso: string): string =>
	new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
		weekday: "long",
		month: "short",
		day: "numeric",
		year: "numeric",
	});

export default function Confirmed() {
	const { todayFull } = getDynamicDates();
	const [copied, setCopied] = useState(false);
	// The POST /api/appointments response that PatientDetails saved before navigating here
	const [booking] = useState<Appointment | null>(() => {
		try {
			const raw = sessionStorage.getItem("lastBooking");
			return raw ? (JSON.parse(raw) as Appointment) : null;
		} catch {
			return null;
		}
	});

	// Real values when we have them — the old demo values only as fallbacks
	const bookingCode = booking?.bookingCode ?? CLINIC_CONFIG.defaultBookingCode;
	const patientName = booking?.patientName ?? CLINIC_CONFIG.defaultPatientName;
	const patientPhone = maskPhoneNumber(booking?.patientPhone ?? CLINIC_CONFIG.defaultPatientPhone);
	const doctorName = booking?.doctorName ?? "Dr. Sarah Jenkins";
	const whenFull = booking ? fullDateOf(booking.date) : todayFull;
	const whenTime = booking ? to12h(booking.time) : "02:30 PM";
	const periodBadge = booking && Number(booking.time.slice(0, 2)) >= 12 ? "PM" : "AM";

	const handleCopy = () => {
		navigator.clipboard?.writeText(bookingCode);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="flex flex-col bg-white min-h-screen">
			<div className="self-stretch bg-white overflow-clip">
				<div className="self-stretch bg-[#F0FDFA80] py-3 px-4 border-b border-solid border-b-teal-100">
					<div className="flex items-center self-stretch gap-2">
						<button data-go="home" className="flex flex-col shrink-0 items-start bg-teal-50 hover:bg-teal-100 transition-colors p-2.5 rounded-full border-0 cursor-pointer">
							<img
								src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/154fa9bf-25c2-4a0b-93ca-ee65fcfbf0d3"} 
								className="w-4 h-4 rounded-full object-fill"
								alt="Back"
							/>
						</button>
						<div className="flex-1">
							<div className="flex flex-col items-start self-stretch">
								<span className="text-[#0F2E2B] text-base font-bold" >
									CareFirst Clinic
								</span>
							</div>
							<div className="flex flex-col items-start self-stretch">
								<span className="text-teal-700 text-xs font-bold" >
									Instant Self-Service Pass
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="self-stretch pt-[25px] pb-12 px-4">
					<div className="flex flex-col items-center self-stretch mb-6">
						<div className="flex flex-col shrink-0 items-start bg-teal-50 p-3 mb-3 rounded-[9999px]">
							<div className="flex flex-col shrink-0 items-start bg-teal-700 p-3 rounded-[9999px]">
								<img
									src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7936a7ea-cf90-410a-8451-d4615ec588e7"} 
									className="w-7 h-7 rounded-[9999px] object-fill"
									alt="Checkmark"
								/>
							</div>
						</div>
						<div className="flex flex-col shrink-0 items-center bg-teal-50 py-1 px-3 mb-2 rounded-[9999px] border border-solid border-teal-200">
							<span className="text-teal-700 text-xs font-bold" >
								STEP 3 OF 3: COMPLETE
							</span>
						</div>
						<div className="flex flex-col items-center self-stretch pt-1.5">
							<span className="text-slate-900 text-2xl font-bold" >
								Appointment Confirmed!
							</span>
						</div>
						<div className="flex flex-col items-center self-stretch py-2 px-4 text-center">
							<span className="text-slate-600 text-sm" >
								SMS confirmation with digital pass sent to <span className="text-slate-900 font-bold">{patientPhone}</span>. Reminder will be sent 2 hours before appointment.
							</span>
						</div>
					</div>
					<div className="items-start self-stretch relative p-5 mb-[25px] rounded-2xl" 
						style={{
							background: "linear-gradient(180deg, #0F766E, #115E59, #134E4A)"
						}}>
						<div className="bg-[#FFFFFF0D] w-[120px] h-[120px] absolute bottom-[-1px] right-0 rounded-[9999px] blur-[24px]"></div>
						<div className="bg-[#2DD4BF33] w-32 h-32 absolute top-0 left-0 rounded-[9999px] blur-[16px]"></div>
						<div className="flex flex-col items-center self-stretch">
							<div className="flex justify-between items-start self-stretch pb-[13px] mb-[17px] border-b border-solid border-b-[#FFFFFF26]">
								<div className="flex flex-col shrink-0 items-start">
									<span className="text-teal-200 text-[11px] font-bold" >
										CLINIC PASS ID (8-DIGIT SECURE)
									</span>
									<span className="text-white text-2xl font-bold tracking-wider" >
										{bookingCode}
									</span>
								</div>
								<button 
									type="button"
									onClick={handleCopy}
									className="flex shrink-0 items-center bg-[#FFFFFF26] hover:bg-[#FFFFFF33] transition-colors py-[7px] px-[15px] gap-[5px] rounded-lg border border-solid border-[#FFFFFF33] cursor-pointer"
								>
									<img
										src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4ad266fd-3c72-4730-a31c-66141948ba2b"} 
										className="w-[11px] h-[13px] rounded-lg object-fill"
										alt="Copy"
									/>
									<span className="text-white text-xs font-bold" >
										{copied ? "Copied!" : "Copy"}
									</span>
								</button>
							</div>
							<div className="flex items-center self-stretch bg-white p-3.5 mb-4 gap-4 rounded-xl">
								<div className="flex flex-col shrink-0 items-start bg-slate-900 p-1.5 gap-[9px] rounded-lg" 
									style={{
										boxShadow: "0px 1px 2px #0000000D"
									}}>
									<div className="flex flex-col items-start bg-white p-1 rounded">
										<img
											src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c2cb3788-cb94-4696-8575-cfd628f26d2e"} 
											className="w-[50px] h-[50px] rounded object-fill"
											alt="QR Pass"
										/>
									</div>
								</div>
								<div className="flex flex-1 flex-col items-start gap-0.5">
									<div className="flex flex-col items-start self-stretch">
										<span className="text-slate-900 text-sm font-bold" >
											Digital Clinic Pass
										</span>
									</div>
									<div className="flex flex-col items-start self-stretch">
										<span className="text-slate-500 text-xs" >
											Present at reception check-in desk
										</span>
									</div>
									<div className="flex items-center self-stretch pt-1 gap-1">
										<div className="bg-teal-700 w-1.5 h-1.5 rounded-[9999px]"></div>
										<span className="text-teal-700 text-xs font-bold" >
											Valid for Entry • No App Needed
										</span>
									</div>
								</div>
							</div>
							<div className="flex justify-between items-center self-stretch bg-[#FFFFFF1A] py-2 px-3 rounded-xl border border-solid border-[#FFFFFF1A]">
								<div className="flex shrink-0 items-center gap-2">
									<div className="flex flex-col shrink-0 items-start bg-teal-200 py-[5px] px-[3px] rounded-[9999px]">
										<span className="text-teal-900 text-[11px] font-bold" >
											{periodBadge}
										</span>
									</div>
									<div className="flex flex-col items-start">
										<span className="text-white text-xs font-bold" >
											{patientName}
										</span>
										{/* Strictly masked phone */}
										<span className="text-teal-200 text-[11px]" >
											{patientPhone}
										</span>
									</div>
								</div>
								<div className="flex flex-col shrink-0 items-start bg-[#2DD4BF33] py-0.5 px-2 rounded">
									<span className="text-teal-200 text-xs font-bold" >
										Self Check-in
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="self-stretch bg-white p-[1px] mb-6 rounded-2xl border border-solid border-slate-200" 
						style={{
							boxShadow: "0px 1px 2px #0000000D"
						}}>
						<div className="flex justify-between items-center self-stretch bg-slate-50 p-4 rounded-t-2xl border-b border-solid border-b-slate-100">
							<span className="text-slate-900 text-sm font-bold" >
								Appointment Summary
							</span>
							<div className="flex shrink-0 items-center gap-1">
								<div className="bg-teal-700 w-2 h-2 rounded-[9999px]"></div>
								<span className="text-teal-700 text-xs font-bold" >
									Confirmed
								</span>
							</div>
						</div>
						<div className="flex flex-col self-stretch p-4 gap-3.5">
							<div className="flex items-start self-stretch gap-3">
								<button className="flex flex-col shrink-0 items-start bg-teal-50 text-left p-[1px] rounded-xl border border-solid border-teal-200">
									<img
										src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/302a65d5-91df-4b95-a4f6-7b830d1d61ee"} 
										className="w-12 h-12 rounded-xl object-fill"
										alt={doctorName}
									/>
								</button>
								<div className="flex flex-1 flex-col items-start gap-0.5">
									<div className="flex flex-col items-start self-stretch">
									<span className="text-slate-900 text-base font-bold" >
										{doctorName}
										</span>
									</div>
									<div className="flex flex-col items-start self-stretch">
										<span className="text-slate-500 text-xs" >
											{booking ? booking.departmentName : "General Physician • Family Medicine"}
										</span>
									</div>
									<div className="flex items-center self-stretch pt-0.5 gap-2">
										<div className="flex flex-col shrink-0 items-start bg-teal-50 py-0.5 px-1.5 rounded">
											<span className="text-teal-700 text-xs font-bold" >
												In-Person
											</span>
										</div>
										<span className="text-slate-400 text-xs" >
											Room 304 • 3rd Floor
										</span>
									</div>
								</div>
							</div>
							<div className="flex items-start self-stretch bg-slate-50 p-[13px] gap-3 rounded-xl border border-solid border-slate-100">
								<div className="flex flex-col shrink-0 items-center pt-0.5">
									<div className="flex flex-col items-start bg-teal-50 py-[7px] px-2 rounded-lg border border-solid border-teal-100">
										<img
											src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/93d297cf-48c3-45e4-a91e-d6844413d85b"} 
											className="w-[15px] h-4 rounded-lg object-fill"
											alt="Calendar"
										/>
									</div>
								</div>
								<div className="flex-1">
									<div className="flex flex-col items-start self-stretch">
										<span className="text-slate-500 text-[11px] font-bold" >
											DATE &amp; TIME
										</span>
									</div>
									<div className="flex flex-col items-start self-stretch">
										<span className="text-slate-900 text-sm font-bold" >
											{whenFull}
										</span>
									</div>
									<div className="flex flex-col items-start self-stretch">
										<span className="text-slate-600 text-xs" >
											{whenTime} (30 min consultation • Fixed Grid)
										</span>
									</div>
								</div>
							</div>
							<div className="flex items-start self-stretch bg-slate-50 p-[13px] gap-3 rounded-xl border border-solid border-slate-100">
								<div className="flex flex-col shrink-0 items-center pt-0.5">
									<div className="flex flex-col items-start bg-teal-50 py-[7px] px-[9px] rounded-lg border border-solid border-teal-100">
										<img
											src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d217ecd6-6552-4bf4-bc3c-d14c258d3acf"} 
											className="w-[13px] h-4 rounded-lg object-fill"
											alt="Location"
										/>
									</div>
								</div>
								<div className="flex-1">
									<div className="flex items-center self-stretch justify-between">
										<span className="text-slate-500 text-[11px] font-bold" >
											CLINIC LOCATION
										</span>
										{/* Get Directions — real external link */}
										<a href="https://maps.google.com/?q=Metro+Health+District+Suite+210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-[3px] text-decoration-none">
											<span className="text-teal-700 text-xs font-bold" >
												Get Directions
											</span>
											<img
												src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/88813a04-6b41-4b54-8cb3-a4dc07b38487"} 
												className="w-2.5 h-2.5 object-fill"
												alt="Arrow"
											/>
										</a>
									</div>
									<div className="flex flex-col items-start self-stretch">
										<span className="text-slate-900 text-sm font-bold" >
											CareFirst Medical Services
										</span>
									</div>
									<div className="flex flex-col items-start self-stretch">
										<span className="text-slate-600 text-xs" >
											Metro Health District, Suite 210
										</span>
									</div>
								</div>
							</div>
							<div className="flex items-start self-stretch bg-green-50 p-[13px] gap-3 rounded-xl border border-solid border-green-100">
								<div className="flex flex-col shrink-0 items-center pt-0.5">
									<div className="flex flex-col items-start bg-green-100 py-[9px] px-1.5 rounded-lg">
										<img
											src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e7bafa2e-d238-4055-bb9b-a755c6c01cae"} 
											className="w-[18px] h-[13px] rounded-lg object-fill"
											alt="Payment"
										/>
									</div>
								</div>
								<div className="flex flex-1 flex-col">
									<div className="flex justify-between items-center self-stretch">
										<span className="text-green-700 text-[11px] font-bold" >
											PAYMENT STATUS
										</span>
										<div className="flex flex-col shrink-0 items-start bg-white py-[3px] px-[9px] rounded-[9999px] border border-solid border-green-200">
											<span className="text-green-700 text-xs font-bold" >
												{CLINIC_CONFIG.formattedFeeWithDecimals} Due
											</span>
										</div>
									</div>
									<div className="flex flex-col items-start self-stretch pt-0.5">
										<span className="text-green-900 text-xs font-bold" >
											Pay at clinic upon arrival
										</span>
									</div>
									<span className="text-green-800 text-[11px]" >
										{CLINIC_CONFIG.zeroFee} charged today. UPI, Card or Cash accepted at desk.
									</span>
								</div>
							</div>
							<div className="flex items-center self-stretch pt-1 gap-2">
								{/* Add to Google Calendar — dynamic link */}
								<a
									href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(doctorName + " Appointment")}&details=${encodeURIComponent("CareFirst Clinic Appointment " + bookingCode)}&location=Metro+Health+District+Suite+210`}
									target="_blank"
									rel="noopener noreferrer"
									className="flex flex-1 justify-center items-center bg-teal-50 hover:bg-teal-100 transition-colors py-[11px] gap-2 rounded-xl border border-solid border-teal-200 text-decoration-none"
								>
									<img
										src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4646f008-e545-4aae-8617-49886437ca12"} 
										className="w-[13px] h-[15px] rounded-xl object-fill"
										alt="Calendar"
									/>
									<span className="text-teal-700 text-xs font-bold text-center" >
										Add to Google Calendar
									</span>
								</a>
								{/* Manage Appointment Button */}
								<button
									data-go="manage"
									className="flex flex-1 justify-center items-center bg-teal-50 hover:bg-teal-100 transition-colors py-[11px] gap-2 rounded-xl border border-solid border-teal-200 cursor-pointer"
								>
									<img
										src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/1d1319b1-f266-4de1-89c9-0144c89bc78c"} 
										className="w-[13px] h-[15px] rounded-xl object-fill"
										alt="Manage"
									/>
									<span className="text-teal-700 text-xs font-bold" >
										Manage Booking
									</span>
								</button>
							</div>
						</div>
					</div>
					<div className="flex items-start self-stretch bg-teal-50 p-[17px] mb-6 gap-3.5 rounded-2xl border border-solid border-teal-200">
						<div className="flex flex-col shrink-0 items-start bg-teal-700 p-2 rounded-[9999px]">
							<img
								src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/2b7405d6-8488-4001-9ea0-ee1d8a834162"} 
								className="w-4 h-4 rounded-[9999px] object-fill"
								alt="Arrival"
							/>
						</div>
						<div className="flex flex-1 flex-col items-start gap-1">
							<span className="text-[#0F2E2B] text-sm font-bold" >
								Arrival Instructions
							</span>
							<span className="text-slate-700 text-xs leading-relaxed" >
								Please arrive 5–10 minutes early. Present your Government Photo ID and digital booking code (<span className="text-teal-700 font-bold">{bookingCode}</span>).
							</span>
							<span className="text-slate-600 text-xs leading-relaxed" >
								Park in the designated Patient P2 garage with complimentary validation at our reception desk.
							</span>
						</div>
					</div>
					<div className="flex flex-col self-stretch pt-2 gap-3">
						<button data-go="home" className="flex justify-center items-center self-stretch bg-[#005C55] hover:bg-[#004A44] transition-colors text-left py-3.5 gap-[9px] rounded-xl border-0 cursor-pointer shadow-md">
							<span className="text-white text-sm font-bold" >
								Return to Clinic Home
							</span>
							<img
								src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/355c4cb7-98cc-4256-bdc5-9219bc2d4f8e"} 
								className="w-3 h-3 rounded-xl object-fill"
								alt="Home"
							/>
						</button>
						<div className="self-stretch bg-slate-50 py-[13px] px-[19px] rounded-xl border border-solid border-[#E2E8F0CC]">
							<div className="flex flex-col items-center self-stretch text-center gap-1">
								<span className="text-slate-500 text-xs" >
									Need to change plans? Free cancellation or rescheduling up to 2 hours prior via SMS link or{" "}
									<span data-go="manage" className="text-teal-700 font-bold underline cursor-pointer">
										Cancel booking
									</span>.
								</span>
							</div>
						</div>
						<div className="flex items-center self-stretch py-1 px-[18px]">
							<img
								src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4c76bbe6-34d4-4675-a4b5-70a3281c1f15"} 
								className="w-[13px] h-3 mr-[7px] object-fill"
								alt="Phone"
							/>
							<div className="flex flex-1 flex-col items-start mr-2">
								<span className="text-slate-500 text-xs" >
									Questions? Call Clinic Reception:
								</span>
							</div>
							{/* Phone number — real Indian tel: link */}
							<a href={`tel:${CLINIC_CONFIG.receptionPhoneTel}`} className="text-teal-700 text-xs font-bold text-decoration-none">
								{CLINIC_CONFIG.receptionPhoneShort}
							</a>
						</div>
					</div>
				</div>
				<div className="flex flex-col self-stretch mx-[21px] pb-6 gap-1 border-t border-solid border-t-slate-100 pt-3">
					<div className="flex items-center justify-center self-stretch gap-1.5">
						<img
							src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7ee37edc-b411-41d2-8e51-f34d21df6af9"} 
							className="w-[11px] h-3 object-fill"
							alt="Security"
						/>
						<span className="text-slate-500 text-[11px] font-medium" >
							{CLINIC_CONFIG.securityText}
						</span>
					</div>
					<div className="flex flex-col items-center self-stretch">
						<span className="text-slate-400 text-[11px]" >
							© {new Date().getFullYear()} CareFirst Health Network. All rights reserved.
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}