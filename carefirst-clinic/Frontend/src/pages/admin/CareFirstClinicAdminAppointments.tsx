import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface AppointmentItem {
  id: string;
  time: string;
  initials: string;
  patientName: string;
  phone: string;
  doctor: string;
  bookingCode: string;
  status: "Done" | "Booked" | "In progress" | "Cancelled";
}

const INITIAL_APPOINTMENTS: AppointmentItem[] = [
  {
    id: "1",
    time: "09:00 AM",
    initials: "AS",
    patientName: "Aarav Sharma",
    phone: "+91 98201 45821",
    doctor: "Dr. Meena",
    bookingCode: "CF-84920",
    status: "Done",
  },
  {
    id: "2",
    time: "09:30 AM",
    initials: "PP",
    patientName: "Priya Patel",
    phone: "+91 98334 12908",
    doctor: "Dr. Sarah Jenkins",
    bookingCode: "CF-84924",
    status: "Done",
  },
  {
    id: "3",
    time: "10:15 AM",
    initials: "RK",
    patientName: "Rohan Kapoor",
    phone: "+91 98190 77312",
    doctor: "Dr. Michael Chen",
    bookingCode: "CF-84928",
    status: "In progress",
  },
  {
    id: "4",
    time: "11:00 AM",
    initials: "AK",
    patientName: "Ananya Kulkarni",
    phone: "+91 98920 44102",
    doctor: "Dr. Emily Patel",
    bookingCode: "CF-84932",
    status: "Booked",
  },
  {
    id: "5",
    time: "11:45 AM",
    initials: "VM",
    patientName: "Vikram Malhotra",
    phone: "+91 98700 88234",
    doctor: "Dr. Rajesh Iyer",
    bookingCode: "CF-84936",
    status: "Booked",
  },
  {
    id: "6",
    time: "01:30 PM",
    initials: "SR",
    patientName: "Sneha Reddy",
    phone: "+91 98211 99014",
    doctor: "Dr. Meena",
    bookingCode: "CF-84940",
    status: "Booked",
  },
  {
    id: "7",
    time: "02:30 PM",
    initials: "RI",
    patientName: "Rajesh Iyer",
    phone: "+91 98402 11234",
    doctor: "Dr. Sarah Jenkins",
    bookingCode: "CF-84944",
    status: "Booked",
  },
  {
    id: "8",
    time: "03:15 PM",
    initials: "NG",
    patientName: "Neha Gupta",
    phone: "+91 98711 55678",
    doctor: "Dr. Meena",
    bookingCode: "CF-84948",
    status: "Cancelled",
  },
];

export default function CareFirstClinicAdminAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<AppointmentItem[]>(INITIAL_APPOINTMENTS);
  const [search, setSearch] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("All Doctors");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const filteredAppointments = appointments.filter((item) => {
    const matchesSearch =
      item.patientName.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      item.bookingCode.toLowerCase().includes(search.toLowerCase());
    const matchesDoctor =
      doctorFilter === "All Doctors" || item.doctor === doctorFilter;
    const matchesStatus =
      statusFilter === "All Statuses" || item.status === statusFilter;
    return matchesSearch && matchesDoctor && matchesStatus;
  });

  const totalCount = appointments.length;
  const bookedCount = appointments.filter((a) => a.status === "Booked").length;
  const doneCount = appointments.filter((a) => a.status === "Done").length;

  const toggleStatus = (id: string) => {
    setAppointments((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (item.status === "Booked") return { ...item, status: "Done" };
          if (item.status === "Done") return { ...item, status: "Cancelled" };
          return { ...item, status: "Booked" };
        }
        return item;
      })
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Banner / Switch to Patient View */}
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
              <div
                className="flex shrink-0 items-center justify-center bg-teal-700 text-white p-2.5 rounded-xl shadow-sm"
              >
                <img
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0d1cb820-0e1f-4c37-8fde-2d834e5f974d"
                  className="w-5 h-5 object-contain"
                  alt="CareFirst Logo"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <span className="text-[#005C55] text-lg font-bold block leading-none">
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
                className="flex items-center bg-[#005C55] text-white py-3 px-3.5 rounded-xl font-bold text-sm shadow-sm transition-all"
              >
                <img
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6d95be71-f528-434c-bf72-d7415a9b1505"
                  className="w-4 h-4 mr-3 object-contain invert brightness-0"
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
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/2efe6f65-74c2-4d12-8d0d-7eefca286435"
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
                className="flex items-center text-[#3E4947] hover:bg-slate-50 py-3 px-3.5 rounded-xl text-sm font-medium transition-all"
              >
                <img
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f2a43a52-25c3-4957-84b7-af536f6347b7"
                  className="w-4 h-4 mr-3 object-contain"
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
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/789fc302-8193-4877-a955-b0d3ea288450"
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
              src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a3218deb-c028-4b47-b0a8-1bad5c25893a"
              className="w-4 h-4 mr-3 object-contain"
              alt=""
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span>Sign out</span>
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-[#F8F9FF] flex flex-col min-w-0">
          {/* Header Bar */}
          <div
            className="flex justify-between items-center bg-white/90 backdrop-blur py-3.5 px-8 border-b border-[#EFF4FF]"
            style={{ boxShadow: "0px 1px 8px #00000005" }}
          >
            <span className="text-[#6E7977] text-xs font-bold uppercase tracking-wider">
              CLINIC WORKSPACE &bull; OUTPATIENT DESK
            </span>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[#0B1C30] text-xs font-bold block">Dr. Sarah Adams</span>
                <span className="text-[#6E7977] text-[11px] block">Clinical Director</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#005C55] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                SA
              </div>
            </div>
          </div>

          {/* Page Body */}
          <div className="p-8 flex flex-col gap-6">
            {/* Title & Action */}
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h1 className="text-[#0B1C30] text-2xl font-bold tracking-tight mb-1">
                  Appointments
                </h1>
                <p className="text-[#6E7977] text-xs">
                  Manage daily outpatient visits, patient check-ins, and consultation schedules
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="flex items-center bg-white px-3.5 py-2 rounded-full border border-slate-200 shadow-sm text-xs font-bold text-[#0B1C30]"
                >
                  <span className="w-2 h-2 rounded-full bg-teal-600 mr-2"></span>
                  <span>Today, 24 Oct 2026</span>
                </div>

                <Link
                  to="/appointments/add-walk-in"
                  className="flex items-center bg-teal-700 hover:bg-teal-800 transition-colors text-white py-2.5 px-4 gap-2 rounded-lg text-sm font-bold shadow-sm"
                >
                  <span className="text-lg leading-none">+</span>
                  <span>Add walk-in</span>
                </Link>
              </div>
            </div>

            {/* Filter & Stats Row */}
            <div
              className="flex flex-wrap justify-between items-center bg-white p-4 rounded-xl gap-4 border border-slate-100"
              style={{ boxShadow: "0px 1px 2px #0000000D" }}
            >
              <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
                {/* Search */}
                <div className="flex items-center bg-[#F8F9FF] py-2 px-3 rounded-lg border border-slate-200 flex-1 max-w-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-slate-400 mr-2 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search patient name, phone, or code..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent border-0 outline-none text-sm text-[#0B1C30] w-full"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="text-slate-400 hover:text-slate-600 text-xs px-1"
                    >
                      &times;
                    </button>
                  )}
                </div>

                {/* Doctor Filter */}
                <select
                  value={doctorFilter}
                  onChange={(e) => setDoctorFilter(e.target.value)}
                  className="bg-[#F8F9FF] text-sm text-[#0B1C30] py-2 px-3 rounded-lg border border-slate-200 outline-none cursor-pointer"
                >
                  <option value="All Doctors">All Doctors</option>
                  <option value="Dr. Meena">Dr. Meena</option>
                  <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins</option>
                  <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                  <option value="Dr. Emily Patel">Dr. Emily Patel</option>
                  <option value="Dr. Rajesh Iyer">Dr. Rajesh Iyer</option>
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#F8F9FF] text-sm text-[#0B1C30] py-2 px-3 rounded-lg border border-slate-200 outline-none cursor-pointer"
                >
                  <option value="All Statuses">All Statuses</option>
                  <option value="Booked">Booked</option>
                  <option value="In progress">In progress</option>
                  <option value="Done">Done</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Stats Badges */}
              <div className="flex items-center gap-2">
                <div className="bg-[#F8F9FF] border border-slate-200 py-1 px-3 rounded-md text-xs font-semibold text-[#3E4947]">
                  Total: {totalCount}
                </div>
                <div className="bg-blue-50 border border-blue-200 py-1 px-3 rounded-md text-xs font-semibold text-blue-700">
                  Booked: {bookedCount}
                </div>
                <div className="bg-emerald-50 border border-emerald-200 py-1 px-3 rounded-md text-xs font-semibold text-emerald-700">
                  Done: {doneCount}
                </div>
              </div>
            </div>

            {/* Appointments Table */}
            <div
              className="bg-white rounded-xl overflow-hidden border border-slate-200"
              style={{ boxShadow: "0px 1px 2px #0000000D" }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#EFF4FF] border-b border-[#DCE9FF]">
                      <th className="py-3 px-5 text-[#6E7977] text-xs font-bold tracking-wider">TIME</th>
                      <th className="py-3 px-5 text-[#6E7977] text-xs font-bold tracking-wider">PATIENT NAME</th>
                      <th className="py-3 px-5 text-[#6E7977] text-xs font-bold tracking-wider">PHONE</th>
                      <th className="py-3 px-5 text-[#6E7977] text-xs font-bold tracking-wider">DOCTOR</th>
                      <th className="py-3 px-5 text-[#6E7977] text-xs font-bold tracking-wider">BOOKING CODE</th>
                      <th className="py-3 px-5 text-[#6E7977] text-xs font-bold tracking-wider">STATUS</th>
                      <th className="py-3 px-5 text-[#6E7977] text-xs font-bold tracking-wider text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400 text-sm">
                          No appointments found matching your search and filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((appt) => (
                        <tr key={appt.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-5 text-[#0B1C30] text-sm font-bold whitespace-nowrap">
                            {appt.time}
                          </td>
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-2.5">
                              <span className="w-7 h-7 rounded-full bg-[#DCE9FF] text-[#005C55] font-bold text-xs flex items-center justify-center shrink-0">
                                {appt.initials}
                              </span>
                              <span
                                className={`text-[#0B1C30] text-sm font-medium ${
                                  appt.status === "Cancelled" ? "line-through text-slate-400" : ""
                                }`}
                              >
                                {appt.patientName}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-5 text-[#3E4947] text-xs font-mono">
                            {appt.phone}
                          </td>
                          <td className="py-3.5 px-5 text-[#0B1C30] text-sm">
                            {appt.doctor}
                          </td>
                          <td className="py-3.5 px-5">
                            <span className="bg-[#F8F9FF] border border-slate-200 text-[#3E4947] text-xs font-mono font-bold py-0.5 px-2 rounded">
                              {appt.bookingCode}
                            </span>
                          </td>
                          <td className="py-3.5 px-5">
                            {appt.status === "Done" && (
                              <span className="inline-flex items-center bg-emerald-50 text-emerald-700 border border-emerald-200 py-0.5 px-2.5 rounded-full text-xs font-bold gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Done
                              </span>
                            )}
                            {appt.status === "Booked" && (
                              <span className="inline-flex items-center bg-blue-50 text-blue-700 border border-blue-200 py-0.5 px-2.5 rounded-full text-xs font-bold gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                Booked
                              </span>
                            )}
                            {appt.status === "In progress" && (
                              <span className="inline-flex items-center bg-amber-50 text-amber-700 border border-amber-200 py-0.5 px-2.5 rounded-full text-xs font-bold gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                In progress
                              </span>
                            )}
                            {appt.status === "Cancelled" && (
                              <span className="inline-flex items-center bg-slate-100 text-slate-600 border border-slate-300 py-0.5 px-2.5 rounded-full text-xs font-bold gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                Cancelled
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-5 text-right whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => toggleStatus(appt.id)}
                              className="text-xs font-semibold px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-100 text-[#3E4947] transition-colors"
                              title="Click to cycle status (Booked -> Done -> Cancelled)"
                            >
                              Cycle Status
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="flex flex-wrap justify-between items-center bg-[#EFF4FF80] py-3 px-5 text-xs text-[#6E7977] border-t border-[#EFF4FF]">
                <span>Showing all scheduled slots for current operational day</span>
                <span className="font-medium text-[#3E4947]">Clinic hours: 08:30 AM &ndash; 06:00 PM IST</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}