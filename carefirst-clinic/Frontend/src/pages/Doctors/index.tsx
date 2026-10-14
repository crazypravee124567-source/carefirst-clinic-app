import React, { useEffect, useState } from "react";
import { api, Doctor } from "../../utils/api";
import DoctorCard from "../../components/DoctorCard";

export default function Doctors() {
	const [doctors, setDoctors] = useState<Doctor[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		api
			.getDoctors()
			.then(setDoctors)
			.catch((e: Error) => setError(e.message))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className="flex flex-col bg-white">
			<div className="self-stretch bg-white overflow-clip">
				<div className="self-stretch relative">
					<div className="self-stretch bg-[#F8F9FF]">
						<div className="self-stretch bg-[#F8F9FFE3] h-16"
							style={{
								boxShadow: "0px 1px 8px #00000008"
							}}>
						</div>
						<div className="self-stretch mb-4">
							<div className="self-stretch pt-4 px-4">
								<div className="flex justify-between items-center self-stretch mb-2">
									<div className="flex flex-col shrink-0 items-center">
										<div className="flex items-center gap-1">
											<div className="bg-blue-600 w-2 h-2 rounded-[9999px]">
											</div>
											<span className="text-blue-700 text-xs font-bold" >
												LIVE AVAILABILITY
											</span>
										</div>
										<span className="text-[#0B1C30] text-[26px] font-bold" >
											Find Doctors
										</span>
									</div>
									<a href="sms:12345" className="flex shrink-0 items-center bg-blue-50 text-left py-[7px] px-[13px] gap-[5px] rounded-[9999px] border border-solid border-blue-100"
										style={{
											boxShadow: "0px 1px 2px #0000000D"
										}}
									>
										<img
											src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7660fca1-93c6-42f7-8459-490a7cd11c34"}
											className="w-4 h-[15px] rounded-[9999px] object-fill"
										/>
										<span className="text-blue-700 text-xs font-bold" >
											Direct SMS
										</span>
									</a>
								</div>
								<div className="flex flex-col items-start self-stretch mb-2">
									<span className="text-[#3E4947] text-sm w-[357px]" >
										No account needed. Instant appointment confirmation\nsent directly to your phone.
									</span>
								</div>
								<div className="flex items-center self-stretch bg-white my-1 gap-[15px] rounded-xl border border-solid border-slate-200"
									style={{
										boxShadow: "0px 1px 2px #0000000D"
									}}>
									<div className="flex flex-col shrink-0 items-start py-[15px] pl-3.5">
										<img
											src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/8bd12d5e-3f32-438c-8ac6-3a1b532d82fb"}
											className="w-4 h-4 object-fill"
										/>
									</div>
									<div className="flex flex-1 items-center">
										<div className="flex-1 h-[17px]">
										</div>
										<div className="w-3.5 h-2.5">
										</div>
									</div>
								</div>
							</div>
							<div className="flex items-center self-stretch py-1">
								<button className="flex shrink-0 items-center bg-[#005C55] text-left py-2 px-4 ml-4 mr-[11px] gap-1.5 rounded-[9999px] border-0"
									style={{
										boxShadow: "0px 1px 2px #0000000D"
									}}
								>
									<img
										src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0cf80f37-2ee2-4db0-9210-8e2330fc9a00"}
										className="w-[15px] h-[15px] rounded-[9999px] object-fill"
									/>
									<span className="text-white text-sm" >
										All Specialists
									</span>
								</button>
							</div>
							<div className="flex items-center self-stretch py-2">
								<div className="flex shrink-0 items-center bg-[#EFF4FF] py-2 px-[13px] ml-4 mr-2 gap-1.5 rounded-[9999px] border border-solid border-slate-200">
									<div className="bg-blue-600 w-1.5 h-1.5 rounded-[9999px]">
									</div>
									<span className="text-[#3E4947] text-xs font-bold" >
										Available Today
									</span>
								</div>
								<button className="flex shrink-0 items-center bg-[#EFF4FF] text-left py-2 px-[13px] gap-[5px] rounded-[9999px] border border-solid border-slate-200"
								>
									<img
										src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0555d9e5-e9e6-40a5-ac3b-2b6b01a26467"}
										className="w-3 h-[11px] rounded-[9999px] object-fill"
									/>
									<span className="text-[#3E4947] text-xs font-bold" >
										Top Rated 4.9+
									</span>
								</button>
								<button className="flex shrink-0 items-center bg-[#EFF4FF] text-left py-2 px-[13px] gap-[5px] rounded-[9999px] border border-solid border-slate-200"
								>
									<img
										src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c9006929-5e0e-41db-8802-aa51c78da366"}
										className="w-3 h-[11px] rounded-[9999px] object-fill"
									/>
									<span className="text-[#3E4947] text-xs font-bold" >
										Under ₹800
									</span>
								</button>
							</div>
							<div className="flex justify-between items-center self-stretch py-2 px-4">
								<span className="text-[#3E4947] text-xs font-bold" >
									Showing {doctors.length} verified clinicians
								</span>
								<div className="flex shrink-0 items-center gap-[3px]">
									<img
										src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a2828f40-d3fa-4e24-a99e-90c224e5b085"}
										className="w-3 h-3 object-fill"
									/>
									<span className="text-blue-700 text-xs font-bold" >
										NMC Registered Specialist
									</span>
								</div>
							</div>
							<div className="flex flex-col self-stretch py-1 px-4 gap-4">
								{loading && (
									<span className="text-[#6E7977] text-sm">
										Loading doctors…
									</span>
								)}
								{error && (
									<span className="text-red-600 text-sm">
										{error}
									</span>
								)}
								{!loading && !error && doctors.length === 0 && (
									<span className="text-[#6E7977] text-sm">
										No doctors found.
									</span>
								)}
								{doctors.map((d) => (
									<DoctorCard key={d.id} doctor={d} />
								))}
							</div>
							<div className="flex items-center self-stretch bg-[#EFF4FF] p-[17px] my-5 mx-4 gap-3.5 rounded-2xl border border-solid border-[#E2E8F0CC]"
								style={{
									boxShadow: "0px 1px 2px #0000000D"
								}}>
								<button className="flex flex-col shrink-0 items-start bg-white text-left p-3 rounded-xl border-0"
									style={{
										boxShadow: "0px 1px 2px #0000000D"
									}}
								>
									<img
										src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6e072c51-755b-49bd-be98-b3bcc7fe368f"}
										className="w-5 h-5 rounded-xl object-fill"
									/>
								</button>
								<div className="flex-1">
									<div className="flex flex-col self-stretch pr-[23px]">
										<span className="text-[#0B1C30] text-base font-bold" >
											Instant SMS Booking Guarantee
										</span>
									</div>
									<div className="flex flex-col items-start self-stretch">
										<span className="text-[#3E4947] text-sm" >
											Zero paperwork. Show up 5 mins before
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="sticky bottom-0 z-30 flex items-center self-stretch bg-[#F8F9FFF0] py-2 px-2.5 gap-3.5"
							style={{
								boxShadow: "0px -2px 12px #00000008"
							}}>
							<button data-go="home" className="flex shrink-0 flex-col items-center py-1.5 px-2.5 bg-transparent border-0 cursor-pointer">
								<img
									src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/dbc4d55b-3611-464e-b9c3-bf294f9b9401"}
									className="w-3.5 h-4 object-fill"
								/>
								<div className="flex flex-col items-center pt-0.5">
									<span className="text-[#3E4947] text-xs font-bold" >
										Home
									</span>
								</div>
							</button>
							<div className="flex flex-1 flex-col items-center py-[5px]">
								<img
									src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6773bf13-afba-497f-ae06-72ee782c79f2"}
									className="w-[18px] h-[18px] object-fill"
								/>
								<div className="flex flex-col items-start self-stretch pt-0.5 mx-2">
									<span className="text-[#005C55] text-xs font-bold" >
										Find Doctors
									</span>
								</div>
							</div>
							<button data-go="manage" className="flex flex-1 flex-col items-center py-[5px] bg-transparent border-0 cursor-pointer">
								<img
									src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/1f4404e7-0f92-4801-99a3-80a1db92db0a"}
									className="w-4 h-[18px] object-fill"
								/>
								<div className="flex flex-col items-start self-stretch pt-0.5 mx-2">
									<span className="text-[#3E4947] text-xs font-bold" >
										My Bookings
									</span>
								</div>
							</button>
							<button data-go="home" className="flex flex-1 flex-col items-center py-1.5 bg-transparent border-0 cursor-pointer">
								<img
									src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/125c0522-3205-4b37-bb71-f3b8a98fa60b"}
									className="w-4 h-4 object-fill"
								/>
								<div className="flex flex-col items-start self-stretch pt-0.5 mx-2">
									<span className="text-[#3E4947] text-xs font-bold" >
										Clinic Info
									</span>
								</div>
							</button>
						</div>
					</div>
					<div className="self-stretch bg-white h-[74px] absolute top-[-16px] right-4 left-4 rounded-2xl border border-solid border-slate-100">
					</div>
					<div className="self-stretch bg-[#FFFFFF00] absolute top-[-16px] right-4 left-4 p-[15px] rounded-2xl"
						style={{
							boxShadow: "0px 8px 10px #0000001A"
						}}>
						<div className="flex items-center self-stretch gap-3">
							<button className="flex flex-col shrink-0 items-start bg-blue-100 text-left p-[7px] rounded-[9999px] border-0"
							>
								<img
									src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f83136fc-045d-475a-b9bc-5b36d56765da"}
									className="w-4 h-4 rounded-[9999px] object-fill"
								/>
							</button>
							<div className="flex flex-1 flex-col items-start">
								<span className="text-[#0B1C30] text-base font-bold" >
									Appointment Reserved!
								</span>
								<span className="text-[#3E4947] text-sm" >
									SMS confirmation sent. See you soon!
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}