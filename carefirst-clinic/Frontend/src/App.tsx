import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";

// Admin Portal Pages
import CareFirstClinicAdminAppointments from "./pages/admin/CareFirstClinicAdminAppointments";
import CareFirstClinicAdminLoginTealWhite from "./pages/admin/CareFirstClinicAdminLoginTealWhite";
import CareFirstClinicAdminAppointmentsAddWalkInModal from "./pages/admin/CareFirstClinicAdminAppointmentsAddWalkInModal";
import CareFirstClinicAdminDoctorsAddDoctorModal from "./pages/admin/CareFirstClinicAdminDoctorsAddDoctorModal";
import CareFirstClinicAdminSchedule from "./pages/admin/CareFirstClinicAdminSchedule";

// Patient Booking Pages
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import DateTime from "./pages/DateTime";
import PatientDetails from "./pages/PatientDetails";
import Confirmed from "./pages/Confirmed";
import Manage from "./pages/Manage";
import Cancel from "./pages/Cancel";

// Patient App Component
type PatientRoute = "home" | "doctors" | "datetime" | "patient" | "confirmed" | "manage" | "cancel";
const PATIENT_ROUTES: PatientRoute[] = [
  "home",
  "doctors",
  "datetime",
  "patient",
  "confirmed",
  "manage",
  "cancel",
];

const fromHash = (): PatientRoute => {
  const r = window.location.hash.replace("#/", "").replace("#", "") as PatientRoute;
  return PATIENT_ROUTES.includes(r) ? r : "home";
};

function PatientPortalApp() {
  const [route, setRoute] = useState<PatientRoute>(fromHash());

  useEffect(() => {
    const onHash = () => setRoute(fromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (to: PatientRoute) => {
    window.location.hash = "#/" + to;
    setRoute(to);
    window.scrollTo({ top: 0 });
  };

  const onClick = (e: React.MouseEvent) => {
    let el = e.target as HTMLElement | null;
    for (let i = 0; el && i < 8; i++, el = el.parentElement) {
      if (el.tagName === "A") return;
      const dg = el.getAttribute("data-go");
      if (dg && PATIENT_ROUTES.includes(dg as PatientRoute)) {
        go(dg as PatientRoute);
        return;
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center">
      {/* Top Banner with Switch to Admin */}
      <div className="w-full bg-[#005C55] text-white py-2 px-4 flex justify-between items-center text-xs shadow-md z-40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-semibold tracking-wide">CareFirst Patient Booking Portal</span>
        </div>
        <Link
          to="/appointments"
          className="bg-white/15 hover:bg-white/25 text-white font-medium px-3 py-1 rounded transition-colors flex items-center gap-1.5"
        >
          <span>Switch to Staff Admin Portal</span>
          <span>&rarr;</span>
        </Link>
      </div>

      <div className="relative w-full max-w-[430px] bg-white shadow-xl min-h-[calc(100vh-36px)]" onClick={onClick}>
        {route === "home" && <Home />}
        {route === "doctors" && <Doctors />}
        {route === "datetime" && <DateTime />}
        {route === "patient" && <PatientDetails />}
        {route === "confirmed" && <Confirmed />}
        {(route === "manage" || route === "cancel") && <Manage />}
        {route === "cancel" && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center bg-slate-900/40">
            <div className="w-full max-w-[430px]">
              <Cancel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Check root path to decide default view
function RootRedirect() {
  // If hash is present (e.g. #home, #doctors), show Patient portal
  if (window.location.hash) {
    return <PatientPortalApp />;
  }
  // Default to Admin Appointments view
  return <CareFirstClinicAdminAppointments />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Portal Routes */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="/appointments" element={<CareFirstClinicAdminAppointments />} />
        <Route path="/appointments/add-walk-in" element={<CareFirstClinicAdminAppointmentsAddWalkInModal />} />
        <Route path="/doctors" element={<CareFirstClinicAdminDoctorsAddDoctorModal />} />
        <Route path="/doctors/add" element={<CareFirstClinicAdminDoctorsAddDoctorModal />} />
        <Route path="/schedule" element={<CareFirstClinicAdminSchedule />} />
        <Route path="/login" element={<CareFirstClinicAdminLoginTealWhite />} />

        {/* Patient Portal Routes */}
        <Route path="/patient" element={<PatientPortalApp />} />
        <Route path="/booking" element={<PatientPortalApp />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/appointments" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
