import React, { useState, useEffect } from "react";
import { CLINIC_CONFIG, maskPhoneNumber, getDynamicDates } from "../../utils/appointmentData";
import { api, type Appointment } from "../../utils/api";

export default function Manage() {
  const { todayFull } = getDynamicDates();
  const [bookingCode, setBookingCode] = useState<string>("");
  const [phoneLast4, setPhoneLast4] = useState<string>("");
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const [copied, setCopied] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("verifiedBookingCode");
    const storedPhone = sessionStorage.getItem("verifiedPhoneLast4");
    if (stored && storedPhone) {
      setBookingCode(stored);
      setPhoneLast4(storedPhone);
      revalidateLookup(stored, storedPhone);
    }
  }, []);

  const revalidateLookup = async (code: string, last4: string) => {
    setLookupError("");
    setIsVerified(false);
    setAppointment(null);
    try {
      const data = await api.lookupAppointment(code, last4);
      setAppointment(data);
      setIsVerified(true);
      sessionStorage.setItem("verifiedBookingCode", code);
      sessionStorage.setItem("verifiedPhoneLast4", last4);
    } catch (e: any) {
      setLookupError(e.message || "Lookup failed");
      setIsVerified(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = bookingCode.trim().toUpperCase();
    const cleanLast4 = phoneLast4.trim();

    if (!cleanCode || cleanLast4.length !== 4) {
      setLookupError("Please provide both the full booking reference and the last 4 digits of your phone.");
      setIsVerified(false);
      return;
    }
    revalidateLookup(cleanCode, cleanLast4);
  };

  const handleCancel = async (e: React.MouseEvent) => {
    if (!appointment || !appointment.bookingCode) return;
    if (cancelling) return;
    setCancelling(true);
    try {
      const data = await api.cancelAppointment(appointment.bookingCode, "Cancelled from Manage page");
      setAppointment(data);
      setCancelError("");
    } catch (e: any) {
      setCancelError(e.message || "Cancel failed");
    } finally {
      setCancelling(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResendSMS = () => {
    setSmsSent(true);
    setTimeout(() => setSmsSent(false), 3000);
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <div className="self-stretch bg-white overflow-clip">
        <div className="self-stretch bg-[#FFFFFF00]" style={{boxShadow: "0px 8px 10px #0000001A"}}>
          <div className="flex justify-between items-center self-stretch bg-[#FFFFFFF0] py-3 px-4 mb-[15px] mx-[1px] border-b border-solid border-b-[#CCE5E14D]">
            <button data-go="home" className="flex flex-col shrink-0 items-start py-[11px] px-3 rounded-lg bg-transparent border-0 cursor-pointer">
              <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/56af7809-562f-49e3-bc34-644313db94ce" className="w-4 h-4 rounded-lg object-fill" alt="Back"/>
            </button>
            <div className="flex flex-col shrink-0 items-center">
              <span className="text-[#0F2E2B] text-base font-bold">CareFirst Clinic</span>
              <div className="flex flex-col items-start px-[9px]">
                <span className="text-teal-700 text-[11px] font-bold">PATIENT PORTAL</span>
              </div>
            </div>
            <div className="flex flex-col shrink-0 items-start p-2.5 rounded-lg">
              <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/53ad79ef-6aad-4a71-a836-b9991f2f30fe" className="w-[18px] h-[18px] rounded-lg object-fill" alt="Portal Icon"/>
            </div>
          </div>
          <div className="self-stretch mb-[35px] mx-[17px]">
            <div className="flex flex-col items-start self-stretch mb-[25px] gap-3">
              <div className="flex items-center bg-teal-50 py-[7px] px-[13px] gap-2 rounded-lg border border-solid border-[#CCE5E199]">
                <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/26f9c314-b242-4572-986f-10d14c27ee9b" className="w-3 h-[15px] rounded-lg object-fill" alt="SMS"/>
                <span className="text-teal-700 text-xs font-bold">Instant SMS Pass • Verified Patient Access</span>
              </div>
              <div className="flex flex-col self-stretch gap-0.5">
                <div className="flex flex-col items-start self-stretch">
                  <span className="text-[#0F2E2B] text-2xl font-bold">Manage Your Appointment</span>
                </div>
                <div className="flex flex-col self-stretch">
                  <span className="text-[#3F5653] text-sm">Enter your secure booking code and phone number digits to view consultation details or modify your visit.</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleLookup} className="flex flex-col self-stretch bg-[#F0FDFACC] p-[17px] mb-6 gap-3 rounded-xl border border-solid border-[#CCE5E199]">
              <div className="flex items-center self-stretch justify-between">
                <span className="text-[#0F2E2B] text-xs font-bold">SECURE BOOKING LOOKUP</span>
                <div className="flex shrink-0 items-center gap-1">
                  <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/3d21f84c-db1e-4ecf-9903-e27273f68e33" className="w-3 h-3 object-fill" alt="Security Check"/>
                  <span className="text-teal-700 text-[11px] font-bold">2-Factor Verification</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#3F5653] text-[11px] font-bold">Booking Reference Code (e.g. CF-84920713)</label>
                <div className="flex justify-between items-center self-stretch bg-white py-2 px-[15px] rounded-lg border border-solid border-[#CCE5E1] focus-within:border-teal-600">
                  <input type="text" value={bookingCode} onChange={(e) => setBookingCode(e.target.value.toUpperCase())} placeholder="e.g. CF-84920713" className="text-[#0F2E2B] text-base font-bold bg-transparent border-0 outline-none flex-1 uppercase tracking-wider"/>
                  <button type="button" onClick={handleCopy} className="flex shrink-0 items-center px-1 gap-1.5 bg-transparent border-0 cursor-pointer">
                    <span className="text-teal-700 text-xs font-bold">{copied ? "Copied!" : "Copy"}</span>
                    <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/34e704f1-2a09-482f-bf70-5f529bbaabd6" className="w-[14px] h-[14px] rounded object-fill" alt="Copy"/>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#3F5653] text-[11px] font-bold">Last 4 Digits of Mobile Phone *</label>
                <div className="flex items-center self-stretch bg-white py-2 px-[15px] rounded-lg border border-solid border-[#CCE5E1] focus-within:border-teal-600">
                  <span className="text-[#3F5653] text-sm font-medium mr-2">+91 ••••••</span>
                  <input maxLength={4} type="text" value={phoneLast4} onChange={(e) => setPhoneLast4(e.target.value.replace(/\\D/g, ''))} placeholder="3210" className="text-[#0F2E2B] text-base font-bold bg-transparent border-0 outline-none flex-1 tracking-widest"/>
                </div>
              </div>

              {lookupError && (
                <div className="bg-red-50 text-red-700 p-2.5 rounded-lg text-xs font-medium border border-red-200">
                  {lookupError}
                </div>
              )}

              <div className="flex justify-between items-center self-stretch py-0.5">
                <div className="flex shrink-0 items-center gap-1">
                  <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/783d141b-6933-48e7-bd13-829fe43356ef" className="w-[9px] h-[13px] object-fill" alt="Phone icon"/>
                  <span className="text-[#3F5653] text-xs font-medium">Linked to {maskPhoneNumber(CLINIC_CONFIG.defaultPatientPhone)}</span>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <div className="bg-teal-700 w-1.5 h-1.5 rounded-[9999px]"></div>
                  <span className="text-teal-700 text-xs font-bold">{isVerified ? "Verified Active" : "Unverified"}</span>
                </div>
              </div>

              <button type="submit" className="flex justify-center items-center self-stretch bg-teal-700 hover:bg-teal-800 transition-colors py-[11px] gap-2 rounded-lg border-0 cursor-pointer shadow-sm text-white">
                <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/bf693516-d57f-407c-a73c-ebca91096b67" className="w-[13px] h-[13px] rounded-lg object-fill" alt="Search icon"/>
                <span className="text-white text-sm font-bold">Lookup Appointment</span>
              </button>
            </form>

            {isVerified && appointment && (
              <div className="self-stretch bg-white p-[1px] mb-6 rounded-xl border border-solid border-[#CCE5E199]" style={{boxShadow: "0px 1px 2px #0000000D"}}>
                <div className="flex justify-between items-center self-stretch p-4" style={{background: "linear-gradient(180deg, #F0FDFA, #FFFFFF)"}}>
                  <div className="flex shrink-0 items-center gap-2">
                    <div className="bg-teal-700 w-2.5 h-2.5 rounded-[9999px]"></div>
                    <span className="text-teal-700 text-xs font-bold">CONFIRMED & UPCOMING</span>
                  </div>
                  <div className="flex flex-col shrink-0 items-start bg-[#CCFBF199] py-0.5 px-2 rounded">
                    <span className="text-teal-700 text-xs font-bold">{appointment.bookingCode}</span>
                  </div>
                </div>
                <div className="flex items-start self-stretch py-[17px] px-4 gap-3.5 border-t border-solid border-t-[#CCE5E14D]">
                  <div className="flex flex-col shrink-0 items-start bg-teal-50 text-left p-[1px] rounded-xl border border-solid border-[#CCE5E180]">
                    <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/ec571f85-dba9-403c-869b-c7e2383c945e" className="w-[54px] h-[54px] rounded-xl object-fill" alt="Doctor avatar"/>
                  </div>
                  <div className="flex flex-1 flex-col items-start pb-[1px] gap-0.5">
                    <div className="flex justify-between items-center self-stretch">
                      <span className="text-[#0F2E2B] text-base font-bold">{appointment.doctorName}</span>
                      <div className="flex shrink-0 items-center bg-teal-50 py-0.5 px-1.5 gap-1 rounded">
                        <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/873a4a72-7a11-4767-8d7d-90665138acc3" className="w-2.5 h-2.5 rounded object-fill" alt="Rating star"/>
                        <span className="text-[#0F2E2B] text-[11px] font-bold">{appointment.ratingAverage}</span>
                      </div>
                    </div>
                    <div className="flex flex-col self-stretch pr-[46px]">
                      <span className="text-[#3F5653] text-xs">General Physician • {appointment.departmentName}</span>
                    </div>
                    <div className="flex items-center py-1.5 gap-[5px]">
                      <span className="text-[#0F2E2B] text-sm font-bold">{CLINIC_CONFIG.formattedFeeWithDecimals}</span>
                      <span className="text-[#3F5653] text-[11px]">(Pay at clinic upon arrival)</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start self-stretch py-[17px] px-4 gap-3 border-t border-solid border-t-[#CCE5E14D]">
                  <div className="flex flex-col shrink-0 items-start bg-teal-50 text-left py-[9px] px-2.5 rounded-lg border-0">
                    <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0a912a62-9c99-4237-bf18-017edcdb97e7" className="w-[15px] h-4 rounded-lg object-fill" alt="Calendar icon"/>
                  </div>
                  <div className="flex flex-1 flex-col gap-[1px]">
                    <div className="flex flex-col items-start self-stretch">
                      <span className="text-[#3F5653] text-xs">Scheduled Date & Time</span>
                    </div>
                    <div className="flex flex-col items-start self-stretch">
                      <span className="text-[#0F2E2B] text-sm font-bold">{appointment.date} at {appointment.time.endsWith("PM") ? appointment.time : appointment.time + " PM"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start self-stretch py-[17px] px-4 gap-3 border-t border-solid border-t-[#CCE5E14D]">
                  <div className="flex flex-col shrink-0 items-start bg-teal-50 text-left py-[9px] px-[11px] rounded-lg border-0">
                    <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/5b4aebaf-58b2-468c-986d-043be595c065" className="w-[13px] h-4 rounded-lg object-fill" alt="Clinic location icon"/>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex flex-col items-start self-stretch">
                      <div className="flex flex-col items-start self-stretch">
                        <span className="text-[#3F5653] text-xs">Clinic Location</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start self-stretch">
                      <span className="text-[#0F2E2B] text-sm font-bold">{appointment.address || CLINIC_CONFIG.defaultPatientName}</span>
                    </div>
                    <div className="flex flex-col items-start self-stretch">
                      <span className="text-[#3F5653] text-xs">{appointment.district || "Metro Health District"}</span>
                    </div>
                  </div>
                  <a href="https://maps.google.com/?q=Metro+Health+District+Suite+210" target="_blank" rel="noopener noreferrer" className="flex items-center py-1.5 gap-1">
                    <span className="text-teal-700 text-xs font-bold">Get Directions</span>
                    <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/43c64620-72d2-4fbf-a7ad-a62507c82de2" className="w-2.5 h-2.5 object-fill" alt="Arrow"/>
                  </a>
                </div>
                <div className="flex items-center self-stretch bg-teal-50 p-[11px] gap-2 rounded-lg border border-solid border-[#CCE5E166]">
                  <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f49fb76f-0940-4f0e-b7a8-772e8db61876" className="w-[9px] h-[13px] rounded-lg object-fill" alt="Parking icon"/>
                  <div className="flex flex-1 flex-col items-start">
                    <span className="text-[#0F2E2B] text-xs leading-relaxed">Complimentary Patient Parking: Garage B, Bay 2</span>
                  </div>
                </div>

                <div className="flex justify-between items-center self-stretch bg-[#F0FDFA80] py-[17px] px-4 border-t border-solid border-t-[#CCE5E14D]">
                  <div className="flex shrink-0 items-center gap-2.5">
                    <div className="flex flex-col shrink-0 items-start bg-[#CCFBF1B0] py-[7px] px-[8px] rounded-[9999px]">
                      <span className="text-teal-700 text-xs font-bold">AM</span>
                    </div>
                    <div className="flex flex-col shrink-0 items-start">
                      <span className="text-[#0F2E2B] text-xs font-bold">{maskPhoneNumber(appointment.patientPhone)}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center bg-white py-[5px] px-[9px] gap-1 rounded-md border border-solid border-[#CCE5E199]">
                    <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/1104d6fe-13f3-464d-ba1b-58bea8ea71b7" className="w-2.5 h-2.5 rounded-md object-fill" alt="Check"/>
                    <span className="text-teal-700 text-[11px] font-bold">SMS Pass Active</span>
                  </div>
                </div>

                <div className="flex items-center self-stretch bg-white py-[17px] px-4 gap-3 border-t border-solid border-t-[#CCE5E14D]">
                  <a href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Dr.+${appointment.doctorName}+Appointment&details=CareFirst+Clinic+Appointment+${appointment.bookingCode}&location=Metro+Health+District+Suite+210`} target="_blank" rel="noopener noreferrer" className="flex flex-1 justify-center items-center bg-[#CCFBF180] hover:bg-[#CCFBF1] transition-colors py-3 gap-1.5 rounded-lg border border-solid border-[#0F766E4D] text-decoration-none">
                    <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/ad2393ac-7442-4588-8e26-047fcf175bc5" className="w-[13px] h-[13px] rounded-lg object-fill" alt="Calendar"/>
                    <span className="text-teal-700 text-xs font-bold">Add to Calendar</span>
                  </a>
                  <button type="button" onClick={handleCancel} className="flex flex-1 justify-center items-center bg-white hover:bg-slate-50 transition-colors p-[15px] gap-[38px] rounded-xl border border-solid border-[#CCE5E199] cursor-pointer text-left">
                    <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6dd6c38d-a5d7-4dfd-8521-554f7b6e613e" className="w-[13px] h-[15px] rounded-xl object-fill" alt="Cancel icon"/>
                    <span className="text-[#93000A] text-xs font-bold">Cancel Booking</span>
                  </button>
                </div>

                <div className="flex flex-col self-stretch mb-6 gap-3">
                  <div className="flex items-center self-stretch bg-teal-50 p-[15px] gap-2.5 rounded-xl border border-solid border-[#0F766E33]">
                    <div className="flex flex-col shrink-0 items-center pt-0.5">
                      <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/fbe74bf7-1e15-4b8a-b2a5-c8ab4eb0b9a9" className="w-4 h-[57px] object-fill" alt="Notice icon"/>
                    </div>
                    <div className="flex flex-1 flex-col items-start">
                      <span className="text-[#0F2E2B] text-xs font-bold">Need to make changes? Free cancellation or rescheduling up to 2 hours before your appointment. SMS reminder sent 2 hours prior.</span>
                    </div>
                  </div>
                  <button data-go="datetime" className="flex items-center justify-between self-stretch bg-white hover:bg-slate-50 transition-colors p-[15px] gap-[38px] rounded-xl border border-solid border-[#CCE5E199] cursor-pointer text-left">
                    <div className="flex flex-1 items-center gap-3">
                      <div className="flex flex-col shrink-0 items-start bg-teal-50 p-2.5 rounded-lg border-0">
                        <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7e64f33f-28b6-448d-a7a7-6a871c429805" className="w-[15px] h-[15px] rounded-lg object-fill" alt="Reschedule"/>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col items-start self-stretch">
                          <span className="text-[#0F2E2B] text-sm font-bold">Reschedule Appointment</span>
                        </div>
                        <div className="flex flex-col items-start self-stretch">
                          <span className="text-[#3F5653] text-xs">Select a new date or slot on the 30-min grid with {appointment.doctorName}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                  <button data-go="cancel" className="flex justify-center items-center self-stretch bg-[#FFDAD699] hover:bg-[#FFCDD2] transition-colors text-left py-3.5 gap-2 rounded-xl border border-solid border-[#FFDAD6] cursor-pointer">
                    <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6dd6c38d-a5d7-4dfd-8521-554f7b6e613e" className="w-[13px] h-[15px] rounded-xl object-fill" alt="Cancel icon"/>
                    <span className="text-[#93000A] text-xs font-bold">Cancel Booking</span>
                  </button>
                </div>

                <div className="flex flex-col self-stretch bg-white p-[17px] gap-3 rounded-xl border border-solid border-[#CCE5E166]">
                  <div className="flex flex-col items-center self-stretch">
                    <span className="text-[#0F2E2B] text-xs font-bold">Need immediate assistance?</span>
                  </div>
                  <div className="flex flex-col items-center self-stretch">
                    <span className="text-[#3F5653] text-xs">Clinic Concierge Desk • Open Mon-Sat 8AM-8PM</span>
                  </div>
                </div>
                <a href={`tel:${CLINIC_CONFIG.receptionPhoneTel}`} className="flex justify-center items-center self-stretch bg-teal-700 hover:bg-teal-800 transition-colors py-3 gap-2 rounded-lg border-0 cursor-pointer text-decoration-none" style={{boxShadow: "0px 1px 2px #0000000D"}}>
                  <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4b50ee32-700d-4f8b-b29d-7b707dad80f6" className="w-[13px] h-[13px] rounded-lg object-fill" alt="Phone"/>
                  <span className="text-white text-xs font-bold">Call {CLINIC_CONFIG.receptionPhoneShort}</span>
                </a>
              </div>
            )}

            {!isVerified && (
              <div className="self-stretch bg-white p-[1px] mb-6 rounded-xl border border-solid border-[#CCE5E199]" style={{boxShadow: "0px 1px 2px #0000000D"}}>
                <div className="flex flex-col items-center self-stretch py-12 gap-4">
                  <span className="text-[#607F7A] text-xs">Enter your booking code and phone to view your appointment.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}