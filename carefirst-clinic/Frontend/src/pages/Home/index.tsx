import React, { useEffect, useState } from "react";
import { api, Clinic, ClinicHours, Doctor } from "../../utils/api";
import FeaturedDoctorCard from "../../components/FeaturedDoctorCard";

export default function Home() {
	const [clinic, setClinic] = useState<Clinic | null>(null);
	const [hours, setHours] = useState<ClinicHours[]>([]);
	const [loadError, setLoadError] = useState("");
	const [featured, setFeatured] = useState<Doctor[]>([]);
	const [todayCounts, setTodayCounts] = useState<Record<number, number>>({});

	// Phase 1: clinic + hours + the 3 featured doctors, all in parallel.
	useEffect(() => {
		Promise.all([
			api.getClinic(),
			api.getClinicHours(),
			api.getDoctors({ featured: true }),
		])
			.then(([c, h, f]) => {
				setClinic(c);
				setHours(h);
				setFeatured(f);
			})
			.catch((e: Error) => setLoadError(e.message));
	}, []);

	// Phase 2: once we know WHO is featured, ask each doctor about TODAY's
	// remaining slots — all requests at once. A failed lookup counts as 0.
	useEffect(() => {
		if (featured.length === 0) return;
		const now = new Date();
		const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
		Promise.all(
			featured.map((d) =>
				api
					.getDaySlots(d.id, todayStr)
					.then((r) => ({ id: d.id, count: r.availableCount }))
					.catch(() => ({ id: d.id, count: 0 }))
			)
		).then((results) => {
			const map: Record<number, number> = {};
			results.forEach((r) => (map[r.id] = r.count));
			setTodayCounts(map);
		});
	}, [featured]);

	// "08:00" -> "8:00 AM"  (backend sends 24-hour strings, phones show 12-hour)
	const formatTime12 = (t: string | null): string => {
		if (!t) return "";
		const [h, m] = t.split(":").map(Number);
		const period = h >= 12 ? "PM" : "AM";
		const hour12 = h % 12 === 0 ? 12 : h % 12;
		return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
	};

	// JS getDay(): 0=Sunday…6=Saturday.  Your database: 1=Monday…7=Sunday.
	const jsDay = new Date().getDay();
	const todayDow = jsDay === 0 ? 7 : jsDay;
	const todayHours = hours.find((h) => h.dayOfWeek === todayDow);

	const toMinutes = (t: string) =>
		Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
	const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
	const isOpenNow =
		!!todayHours?.openTime &&
		!!todayHours?.closeTime &&
		nowMinutes >= toMinutes(todayHours.openTime) &&
		nowMinutes < toMinutes(todayHours.closeTime);

	const openStatus = !todayHours
		? ""
		: isOpenNow
			? `Open Now • Closes ${formatTime12(todayHours.closeTime)}`
			: "Closed Now";

	return (
		<div className="flex flex-col bg-white">
			<div className="self-stretch overflow-clip">
				<div className="flex flex-col self-stretch bg-[#F8F9FF] pb-[1px] gap-3.5">
					<div className="self-stretch">
						<div className="flex items-center self-stretch bg-[#F8F9FFE3] pt-2.5 pb-[11px] px-4 gap-2 border-b border-solid border-b-[#E2E8F0CC]"
							style={{
								boxShadow: "0px 1px 8px #0F172A0D"
							}}>
							<div className="flex flex-1 items-center gap-2">
								<img
									src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/11b85da1-3cf7-454b-b5c6-466b96393813"}
									className="w-8 h-8 object-fill"
								/>
								<div className="flex flex-col shrink-0 items-center">
									<div className="flex flex-col items-center pr-8">
										{clinic?.name ?? "CareFirst Clinic"}
									</div>
									<div className="flex items-center gap-1">
										<div className="bg-emerald-500 w-2 h-2 rounded-[9999px]">
										</div>
										{loadError ? "" : openStatus}
									</div>
								</div>
							</div>
							<img
								src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d4aac354-032c-4226-bb61-06f30d5c4b22"}
								className="w-20 h-11 object-fill"
							/>
						</div>
						<div className="self-stretch pb-8">
							<div className="flex flex-col self-stretch pt-4 px-4 gap-4">
								<div className="flex flex-col items-start self-stretch">
									<div className="flex items-center bg-blue-50 py-[5px] px-[13px] gap-1.5 rounded-[9999px] border border-solid border-blue-100"
										style={{
											boxShadow: "0px 1px 2px #0000000D"
										}}>
										<img
											src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/b9bada59-b646-4e00-9fae-14f29d2696a3"}
											className="w-3.5 h-3.5 rounded-[9999px] object-fill"
										/>
										<span className="text-blue-900 text-xs font-bold" >
											No account or password required
										</span>
									</div>
								</div>
								<div className="flex flex-col self-stretch gap-1.5">
									<span className="text-[#0B1C30] text-[26px] font-bold" >
										Compassionate care, zero hassle.
									</span>
									<span className="text-[#3E4947] text-base" >
										Book licensed physicians in 60 seconds. Instant SMS confirmation directly to your phone.
									</span>
								</div>
								<div className="flex flex-col self-stretch bg-white p-[17px] gap-3 rounded-2xl border border-solid border-slate-200"
									style={{
										boxShadow: "0px 1px 2px #0000000D"
									}}>
									<button data-go="doctors" className="flex items-center self-stretch bg-[#005C55] hover:bg-[#004A44] transition-colors py-3 px-4 gap-[26px] rounded-xl border-0 cursor-pointer"
										style={{
											boxShadow: "0px 2px 4px #0000001A"
										}}>
										<div className="flex flex-1 items-center gap-2">
											<div className="flex flex-col shrink-0 items-start bg-[#FFFFFF26] text-left py-[9px] px-2.5 rounded-lg border-0">
												<img
													src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/090b8a5c-d20c-46e3-b5f1-4c088be98e19"}
													className="w-[15px] h-4 rounded-lg object-fill"
												/>
											</div>
											<div className="flex flex-1 flex-col items-start">
												<span className="text-white text-base font-bold" >
													Book Appointment Now
												</span>
											</div>
										</div>
										<div className="flex shrink-0 items-center gap-[5px]">
											<span className="text-blue-200 text-xs font-bold" >
												60s
											</span>
											<img
												src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/9bded255-72dd-40f1-ac42-5af95e080f01"}
												className="w-3 h-3 object-fill"
											/>
										</div>
									</button>
									<button data-go="manage" className="flex justify-center items-center self-stretch bg-[#EFF4FF] hover:bg-[#DCE7FF] transition-colors text-left py-3 gap-[7px] rounded-xl border border-solid border-slate-200 cursor-pointer"
										style={{
											boxShadow: "0px 1px 2px #0000000D"
										}}
									>
										<img
											src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/de987341-258f-4bcf-a4d5-76f1f130e134"}
											className="w-[13px] h-[13px] rounded-xl object-fill"
										/>
										<span className="text-[#0B1C30] text-sm font-medium" >
											Lookup Existing Booking
										</span>
									</button>
								</div>
							</div>
							<div className="flex items-center self-stretch pt-6 px-4">
								<div className="flex flex-1 flex-col items-center bg-[#E5EEFF] py-[11px] mr-2.5 gap-1 rounded-xl border border-solid border-[#E2E8F0B0]"
									style={{
										boxShadow: "0px 1px 2px #0000000D"
									}}>
									<div className="flex flex-col items-start bg-white p-2 rounded-[9999px]">
										<img
											src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/89792e1a-dfa1-4072-9e8c-6be8327dc018"}
											className="w-[15px] h-[15px] rounded-[9999px] object-fill"
										/>
									</div>
									<span className="text-[#0B1C30] text-xs font-bold" >
										Instant SMS
									</span>
									<span className="text-[#3E4947] text-[11px]" >
										Paperless pass
									</span>
								</div>
								<div className="flex flex-1 flex-col items-center bg-[#E5EEFF] py-[11px] mr-[11px] gap-1 rounded-xl border border-solid border-[#E2E8F0B0]"
									style={{
										boxShadow: "0px 1px 2px #0000000D"
									}}>
									<div className="flex flex-col items-start bg-white py-2 px-2.5 rounded-[9999px]">
										<img
											src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/dababefa-a958-4652-b29a-de50608f6012"}
											className="w-3 h-[15px] rounded-[9999px] object-fill"
										/>
									</div>
									<span className="text-[#0B1C30] text-xs font-bold" >
										Same-Day
									</span>
									<span className="text-[#3E4947] text-[11px]" >
										Guaranteed slot
									</span>
								</div>
								<div className="flex flex-1 flex-col items-center bg-[#E5EEFF] py-[11px] gap-1 rounded-xl border border-solid border-[#E2E8F0B0]"
									style={{
										boxShadow: "0px 1px 2px #0000000D"
									}}>
									<div className="flex flex-col items-start bg-white py-2 px-2.5 rounded-[9999px]">
										<img
											src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f3bd92b7-6906-445c-a738-1dbf0b3d200c"}
											className="w-3 h-[15px] rounded-[9999px] object-fill"
										/>
									</div>
									<span className="text-[#0B1C30] text-xs font-bold" >
										Certified MDs
									</span>
									<span className="text-[#3E4947] text-[11px]" >
										Top-tier ratings
									</span>
								</div>
							</div>
							<div className="self-stretch pt-6">
								<div className="flex justify-between items-center self-stretch pb-2 px-4">
									<div className="flex flex-col shrink-0 items-center">
										<div className="flex flex-col items-start pr-[57px]">
											<span className="text-[#0B1C30] text-xl font-bold" >
												Our Practitioners
											</span>
										</div>
										<span className="text-[#3E4947] text-sm" >
											Available for instant confirmation
										</span>
									</div>
									<div className="flex shrink-0 items-center gap-1">
										<span className="text-[#005C55] text-xs font-bold" >
											See All (6)
										</span>
										<img
											src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/22a5e54f-c718-4833-af42-ec0ba087b4ff"}
											className="w-1 h-2 object-fill"
										/>
									</div>
								</div>
								<div className="flex flex-col self-stretch px-4 gap-2">
									{featured.length === 0 && !loadError && (
										<span className="text-[#6E7977] text-sm" >
											Loading practitioners…
										</span>
									)}
									{loadError && (
										<span className="text-red-600 text-sm" >{loadError}</span>
									)}
									{featured.map((d) => (
										<FeaturedDoctorCard key={d.id} doctor={d} todaySlots={todayCounts[d.id]} />
									))}
								</div>
							</div>
							<div className="flex flex-col self-stretch pt-6 px-4 gap-2">
								<div className="flex flex-col items-start self-stretch">
									<span className="text-[#0B1C30] text-xl font-bold" >
										Clinic &amp; Location
									</span>
								</div>
								<div className="flex flex-col self-stretch bg-white p-[17px] gap-4 rounded-2xl border border-solid border-slate-200"
									style={{
										boxShadow: "0px 1px 2px #0000000D"
									}}>
									<div className="flex flex-col self-stretch gap-1">
										<div className="flex items-center self-stretch gap-8">
											<span className="text-[#0B1C30] text-sm font-bold" >
												Working Hours
											</span>
											<div className="flex flex-1 items-center bg-emerald-50 py-[5px] px-[11px] gap-1.5 rounded-[9999px] border border-solid border-emerald-200">
												<div className="bg-emerald-500 w-2 h-2 rounded-[9999px]">
												</div>
												<div className="flex flex-1 flex-col items-start">
													{openStatus}
												</div>
											</div>
										</div>
										<div className="flex flex-col self-stretch bg-[#EFF4FF] p-[9px] gap-1.5 rounded-xl border border-solid border-[#E2E8F0CC]">
											{hours.map((h) => (
												<div key={h.dayOfWeek} className="flex justify-between items-center self-stretch">
													<span className="text-[#0B1C30] text-sm" >
														{h.dayName}
													</span>
													{h.openTime && h.closeTime ? (
														<span className="text-[#3E4947] text-sm" >
															{formatTime12(h.openTime)} – {formatTime12(h.closeTime)}
														</span>
													) : (
														<span className="flex flex-col shrink-0 items-start bg-[#E5EEFF] py-[3px] px-[9px] rounded border border-solid border-slate-200">
															<span className="text-[#3E4947] text-xs" >
																{h.note ?? "Closed"}
															</span>
														</span>
													)}
												</div>
											))}
											{loadError && (
												<span className="text-red-600 text-sm" >{loadError}</span>
											)}
										</div>
									</div>
									<div className="flex flex-col self-stretch gap-1">
										<div className="flex flex-col items-start self-stretch">
											<span className="text-[#0B1C30] text-sm font-bold" >
												Direct Assistance
											</span>
										</div>
										<div className="flex items-center self-stretch gap-2">
											<div className="flex flex-1 items-center bg-[#EFF4FF] py-3.5 px-[15px] gap-[7px] rounded-xl border border-solid border-slate-200">
												<img
													src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/8a1cf406-8e9e-48ec-a5ff-d80d9f107fb5"}
													className="w-[15px] h-[15px] rounded-xl object-fill"
												/>
												<div className="flex flex-1 flex-col items-start">
													<a href={`tel:${(clinic?.phone ?? "").replace(/[^0-9+]/g, "")}`} className="text-[#005C55] text-sm font-medium text-decoration-none">
														{clinic?.phone ?? ""}
													</a>
												</div>
											</div>
											<div className="flex flex-1 items-center bg-[#EFF4FF] py-3.5 px-[22px] gap-2 rounded-xl border border-solid border-slate-200">
												<img
													src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4cc6c997-d869-41c4-b766-75a60b5b77ad"}
													className="w-4 h-4 rounded-xl object-fill"
												/>
												<div className="flex flex-1 flex-col items-start">
													<span className="text-[#006398] text-sm" >
														SMS Support
													</span>
												</div>
											</div>
										</div>
									</div>
									<div className="flex flex-col self-stretch gap-1">
										<div className="flex items-start self-stretch gap-7">
											<div className="flex flex-1 items-start gap-2">
												<img
													src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/dfd90343-6b95-454d-9e47-cbdcbb8acd6f"}
													className="w-[13px] h-[18px] object-fill"
												/>
												<div className="flex-1">
													<div className="flex flex-col items-start self-stretch">
														<span className="text-[#0B1C30] text-base font-bold" >
															{clinic?.district ?? ""}
														</span>
													</div>
													<div className="flex flex-col items-start self-stretch">
														<span className="text-[#3E4947] text-sm" >
															{clinic?.address ?? ""}
														</span>
													</div>
												</div>
											</div>
											<span className="flex flex-col shrink-0 items-start bg-blue-50 py-[5px] px-[11px] rounded-[9999px] border border-solid border-blue-100">
												<span className="text-[#005C55] text-xs font-bold" >
													{clinic?.parkingInfo ?? ""}
												</span>
											</span>
										</div>
										<div className="flex flex-col self-stretch pt-1">
											<img
												src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4780286e-f2d5-4277-9a5a-0ba784b83cbf"}
												className="self-stretch h-36 rounded-xl object-fill"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="sticky bottom-0 z-30 flex items-center self-stretch bg-[#F8F9FFF0] pt-[9px] pb-2 px-2.5 gap-3.5 border-t border-solid border-t-[#E2E8F0CC]"
						style={{
							boxShadow: "0px -2px 12px #0F172A0D"
						}}>
						<button data-go="home" className="flex flex-1 flex-col items-center py-1.5 px-2.5 bg-transparent border-0 cursor-pointer">
							<img
								src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/56329ded-3c7e-4e0f-9821-8aba1d0d6459"}
								className="w-3.5 h-4 object-fill"
							/>
							<div className="flex flex-col items-center pt-0.5">
								<span className="text-[#005C55] text-xs font-bold" >
									Home
								</span>
							</div>
						</button>
						<button data-go="doctors" className="flex flex-1 flex-col items-center py-[5px] px-2 bg-transparent border-0 cursor-pointer">
							<img
								src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0e67d6dd-247c-4426-8750-0f446321173b"}
								className="w-[18px] h-[18px] object-fill"
							/>
							<div className="flex flex-col items-center pt-0.5">
								<span className="text-[#3E4947] text-xs font-bold" >
									Find Doctors
								</span>
							</div>
						</button>
						<button data-go="manage" className="flex flex-1 flex-col items-center py-[5px] px-2 bg-transparent border-0 cursor-pointer">
							<img
								src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6954ce7a-6e79-4a1b-b6fa-d74fd1d8664b"}
								className="w-4 h-[18px] object-fill"
							/>
							<div className="flex flex-col items-center pt-0.5">
								<span className="text-[#3E4947] text-xs font-bold" >
									My Bookings
								</span>
							</div>
						</button>
						<button data-go="home" className="flex flex-1 flex-col items-center py-[1.5] px-2 bg-transparent border-0 cursor-pointer">
							<img
								src={"https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f8b4f581-9aa7-4d91-8253-fb550ea44629"}
								className="w-4 h-4 object-fill"
							/>
							<div className="flex flex-col items-center pt-0.5">
								<span className="text-[#3E4947] text-xs font-bold" >
									Clinic Info
								</span>
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}