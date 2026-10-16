import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface DoctorItem {
  id: string;
  name: string;
  license: string;
  specialization: string;
  active: boolean;
  avatarText: string;
}

const INITIAL_DOCTORS: DoctorItem[] = [
  {
    id: "1",
    name: "Dr. Sarah Jenkins",
    license: "CF-89241",
    specialization: "Family Medicine & General Practice",
    active: true,
    avatarText: "SJ",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    license: "CF-62319",
    specialization: "Cardiology & Internal Medicine",
    active: true,
    avatarText: "MC",
  },
  {
    id: "3",
    name: "Dr. Emily Patel",
    license: "CF-78104",
    specialization: "Pediatrics & Child Health",
    active: true,
    avatarText: "EP",
  },
  {
    id: "4",
    name: "Dr. Rajesh Iyer",
    license: "CF-44092",
    specialization: "Orthopedics & Sports Medicine",
    active: false,
    avatarText: "RI",
  },
];

export default function CareFirstClinicAdminDoctorsAddDoctorModal() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<DoctorItem[]>(INITIAL_DOCTORS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  // Add Doctor Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDoctorName, setNewDoctorName] = useState("");
  const [newSpecialization, setNewSpecialization] = useState("");
  const [newLicense, setNewLicense] = useState("");

  const toggleDoctorActive = (id: string) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, active: !d.active } : d))
    );
  };

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoctorName.trim() || !newSpecialization.trim()) return;

    const initials = newDoctorName
      .replace("Dr.", "")
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "DR";

    const newDoc: DoctorItem = {
      id: String(Date.now()),
      name: newDoctorName.startsWith("Dr.") ? newDoctorName : `Dr. ${newDoctorName}`,
      license: newLicense || `CF-${Math.floor(10000 + Math.random() * 90000)}`,
      specialization: newSpecialization,
      active: true,
      avatarText: initials,
    };

    setDoctors((prev) => [newDoc, ...prev]);
    setShowAddModal(false);
    setNewDoctorName("");
    setNewSpecialization("");
    setNewLicense("");
  };

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase()) ||
      doc.license.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All Statuses" ||
      (statusFilter === "Active" && doc.active) ||
      (statusFilter === "Inactive" && !doc.active);
    return matchesSearch && matchesStatus;
  });

  const activeCount = doctors.filter((d) => d.active).length;

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
              <div className="flex shrink-0 items-center justify-center bg-teal-700 text-white p-2.5 rounded-xl shadow-sm">
                <img
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/447f93f4-270f-4422-88de-7a291ee15c02"
                  className="w-5 h-5 object-contain"
                  alt="CareFirst Logo"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <span className="text-[#0B1C30] text-base font-bold block leading-none">
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
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/12681b80-ff6a-42f0-8ce8-aa2290a4eec9"
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
                className="flex items-center bg-teal-700 text-white py-3 px-3.5 rounded-xl font-bold text-sm shadow-sm transition-all"
              >
                <img
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/389e3a24-815a-4709-b2f1-a3c206ab32bf"
                  className="w-4 h-4 mr-3 object-contain invert brightness-0"
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
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e1ede5a1-24d5-4e95-933c-2b6fb97e5e29"
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
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6285763e-6c50-45a5-b63c-3fa152497f4a"
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
              src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/b5a15d55-06d8-4780-849f-b004ab8668d1"
              className="w-4 h-4 mr-3 object-contain"
              alt=""
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span>Sign out</span>
          </button>
        </aside>

        {/* Main Section */}
        <main className="flex-1 bg-[#F8F9FF] flex flex-col min-w-0">
          {/* Header */}
          <div
            className="flex justify-between items-center bg-white/90 backdrop-blur py-3.5 px-8 border-b border-[#EFF4FF]"
            style={{ boxShadow: "0px 1px 8px #00000008" }}
          >
            <span className="text-[#6E7977] text-xs font-bold uppercase tracking-wider">
              CLINIC WORKSPACE &bull; DOCTOR DIRECTORY
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

          {/* Content Area */}
          <div className="p-8 flex flex-col gap-6">
            {/* Header Titles */}
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#6E7977]">
                  <span>CLINICAL ADMINISTRATION</span>
                  <span className="text-teal-700">&bull;</span>
                  <span className="text-teal-700">PRACTITIONER DIRECTORY</span>
                </div>
                <h1 className="text-[#0B1C30] text-3xl font-bold tracking-tight">Doctors</h1>
                <p className="text-[#3E4947] text-sm mt-1">
                  Manage clinic practitioners, medical specializations, and working status
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="flex items-center bg-teal-700 hover:bg-teal-800 transition-colors text-white py-2.5 px-4 gap-2 rounded-xl text-sm font-medium shadow-sm cursor-pointer border-0"
              >
                <span className="text-base leading-none">+</span>
                <span>Add doctor</span>
              </button>
            </div>

            {/* Doctors Container Card */}
            <div
              className="bg-white rounded-xl overflow-hidden border border-slate-200"
              style={{ boxShadow: "0px 1px 2px #0000000D" }}
            >
              {/* Search & Status Badges */}
              <div className="flex flex-wrap justify-between items-center bg-[#EFF4FF66] p-4 gap-4 border-b border-[#EFF4FF]">
                <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
                  {/* Search */}
                  <div className="flex items-center bg-white py-2.5 px-3.5 rounded-xl border border-slate-200 flex-1 max-w-md shadow-sm">
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
                      placeholder="Search doctor by name or specialty..."
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

                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-white text-sm text-[#0B1C30] py-2.5 px-3.5 rounded-xl border border-slate-200 outline-none shadow-sm cursor-pointer"
                  >
                    <option value="All Statuses">All Statuses</option>
                    <option value="Active">Active Only</option>
                    <option value="Inactive">Inactive Only</option>
                  </select>
                </div>

                <div className="flex items-center bg-[#E5EEFF] py-1.5 px-3.5 gap-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#005C55]"></span>
                  <span className="text-[#3E4947] text-xs font-bold">
                    Total: {doctors.length} Doctors &bull; {activeCount} Active
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#EFF4FF99] border-b border-[#EFF4FF]">
                      <th className="py-3 px-6 text-[#6E7977] text-xs font-bold tracking-wider">NAME</th>
                      <th className="py-3 px-6 text-[#6E7977] text-xs font-bold tracking-wider">SPECIALIZATION</th>
                      <th className="py-3 px-6 text-[#6E7977] text-xs font-bold tracking-wider">STATUS</th>
                      <th className="py-3 px-6 text-[#6E7977] text-xs font-bold tracking-wider text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredDoctors.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-12 text-center text-slate-400 text-sm">
                          No doctors found matching your filter.
                        </td>
                      </tr>
                    ) : (
                      filteredDoctors.map((doc) => (
                        <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3.5">
                              <div className="w-10 h-10 rounded-full bg-[#E5EEFF] text-[#005C55] font-bold text-sm flex items-center justify-center shrink-0 border border-teal-100">
                                {doc.avatarText}
                              </div>
                              <div>
                                <span className="text-[#0B1C30] text-sm font-bold block">
                                  {doc.name}
                                </span>
                                <span className="text-[#6E7977] text-xs block font-mono">
                                  License: {doc.license}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-6">
                            <span className="inline-block bg-[#DCE9FF] text-[#3E4947] text-xs py-1 px-3 rounded-full font-medium">
                              {doc.specialization}
                            </span>
                          </td>

                          <td className="py-4 px-6">
                            <button
                              type="button"
                              onClick={() => toggleDoctorActive(doc.id)}
                              className="flex items-center gap-2.5 bg-transparent border-0 cursor-pointer p-0"
                              title="Click to toggle status"
                            >
                              <div
                                className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                                  doc.active ? "bg-teal-700 justify-end" : "bg-slate-300 justify-start"
                                }`}
                              >
                                <div className="bg-white w-4 h-4 rounded-full shadow-sm"></div>
                              </div>
                              <span
                                className={`text-xs font-bold ${
                                  doc.active ? "text-[#005C55]" : "text-[#6E7977]"
                                }`}
                              >
                                {doc.active ? "Active" : "Inactive"}
                              </span>
                            </button>
                          </td>

                          <td className="py-4 px-6 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => alert(`Editing doctor: ${doc.name}`)}
                                className="flex items-center bg-[#E5EEFF] hover:bg-[#d4e3fc] text-[#3E4947] text-xs font-semibold py-1.5 px-3 rounded-lg border-0 cursor-pointer transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => navigate("/schedule")}
                                className="flex items-center bg-[#E5EEFF] hover:bg-[#d4e3fc] text-[#3E4947] text-xs font-semibold py-1.5 px-3 rounded-lg border-0 cursor-pointer transition-colors"
                              >
                                Schedule
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Doctor Modal Overlay */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center py-4 px-6 border-b border-[#EFF4FF]">
              <h3 className="text-[#0B1C30] font-bold text-lg">Add New Practitioner</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl border-0 bg-transparent cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddDoctor} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#0B1C30]">Doctor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Ananya Sen"
                  value={newDoctorName}
                  onChange={(e) => setNewDoctorName(e.target.value)}
                  className="bg-[#F8F9FF] text-sm py-2 px-3 rounded-lg border border-slate-200 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#0B1C30]">Specialization *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dermatology & Cosmetology"
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  className="bg-[#F8F9FF] text-sm py-2 px-3 rounded-lg border border-slate-200 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#0B1C30]">Medical License Number</label>
                <input
                  type="text"
                  placeholder="e.g. CF-90123"
                  value={newLicense}
                  onChange={(e) => setNewLicense(e.target.value)}
                  className="bg-[#F8F9FF] text-sm py-2 px-3 rounded-lg border border-slate-200 outline-none"
                />
              </div>

              <div className="flex justify-end items-center gap-3 pt-3 border-t border-[#EFF4FF]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-sm font-semibold text-[#3E4947] px-4 py-2 bg-transparent border-0 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-700 hover:bg-teal-800 text-white text-sm font-bold py-2 px-5 rounded-lg border-0 cursor-pointer shadow-sm"
                >
                  Save Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}