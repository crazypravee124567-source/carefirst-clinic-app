import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import DateTime from './pages/DateTime';
import PatientDetails from './pages/PatientDetails';
import Confirmed from './pages/Confirmed';
import Manage from './pages/Manage';
import Cancel from './pages/Cancel';

// All valid route names in this app.
type Route = 'home' | 'doctors' | 'datetime' | 'patient' | 'confirmed' | 'manage' | 'cancel';
const ROUTES: Route[] = ['home', 'doctors', 'datetime', 'patient', 'confirmed', 'manage', 'cancel'];

// Read the hash (#/home, #/doctors …) and return the matching route.
// Any unknown hash falls back to 'home' so the app never shows a blank screen.
const fromHash = (): Route => {
  const r = window.location.hash.replace('#/', '') as Route;
  return ROUTES.includes(r) ? r : 'home';
};

export default function App() {
  const [route, setRoute] = useState<Route>(fromHash());

  // Keep state in sync when the user presses browser Back/Forward.
  useEffect(() => {
    const onHash = () => setRoute(fromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Central navigation helper. Updates the hash and scrolls to top.
  const go = (to: Route) => {
    window.location.hash = '#/' + to;
    setRoute(to);
    window.scrollTo({ top: 0 });
  };

  // Single click handler attached to the root wrapper.
  // Walks up to 8 parent elements looking for a data-go attribute and navigates.
  // Native <a> elements are let through so their href works normally.
  const onClick = (e: React.MouseEvent) => {
    let el = e.target as HTMLElement | null;
    for (let i = 0; el && i < 8; i++, el = el.parentElement) {
      if (el.tagName === 'A') return; // native links (tel:, sms:, https:…) work on their own
      const dg = el.getAttribute('data-go');
      if (dg && ROUTES.includes(dg as Route)) {
        go(dg as Route);
        return;
      }
    }
  };

  // The Cancel screen is a modal that floats on top of the Manage screen.
  // Both are rendered at the same time when route === 'cancel'.
  return (
    <div className="min-h-screen bg-slate-200 flex justify-center">
      <div className="relative w-full max-w-[430px] bg-white shadow-xl" onClick={onClick}>
        {route === 'home' && <Home />}
        {route === 'doctors' && <Doctors />}
        {route === 'datetime' && <DateTime />}
        {route === 'patient' && <PatientDetails />}
        {route === 'confirmed' && <Confirmed />}
        {(route === 'manage' || route === 'cancel') && <Manage />}
        {route === 'cancel' && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center">
            <div className="w-full max-w-[430px]"><Cancel /></div>
          </div>
        )}
      </div>
    </div>
  );
}
