import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function CareFirstClinicAdminLoginTealWhite() {
  const [email, setEmail] = useState("admin@carefirstclinic.com");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email) {
      setError("Please enter your staff email.");
      return;
    }
    navigate("/appointments");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FF]">
      {/* Top Navigation / Portal Switcher */}
      <div className="flex justify-between items-center px-8 py-3 bg-white border-b border-[#EFF4FF]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-xs font-semibold text-[#0B1C30]">CareFirst Clinic System</span>
        </div>
        <Link
          to="/patient"
          className="text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
        >
          <span>Go to Patient Booking Portal</span>
          <span>&rarr;</span>
        </Link>
      </div>

      <div className="self-stretch overflow-hidden flex-1 flex flex-col justify-between">
        {/* Header Branding */}
        <div className="flex flex-col items-center self-stretch pt-8 pb-4">
          <div className="flex items-center gap-[9px]">
            <button
              type="button"
              className="flex shrink-0 items-center justify-center bg-[#005C55] text-white p-2.5 rounded-xl border-0 shadow-sm"
              style={{ boxShadow: "0px 1px 8px #0000000D" }}
            >
              <img
                src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/70f9dd26-dcf5-46f9-ad4e-09195c6f12e1"
                className="w-4 h-4 object-contain"
                alt="Logo icon"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </button>
            <span className="text-[#0B1C30] text-lg font-bold tracking-tight">
              CareFirst Clinical
            </span>
          </div>
        </div>

        {/* Login Card */}
        <div className="flex flex-col items-center self-stretch py-4 px-6">
          <form
            onSubmit={handleSignIn}
            className="flex flex-col items-start bg-white w-full max-w-[448px] p-10 gap-1 rounded-2xl border border-slate-100"
            style={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)" }}
          >
            <div className="flex shrink-0 items-center justify-center bg-teal-700 text-white p-3 rounded-xl shadow-sm mb-2">
              <img
                src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7edb7938-9b10-49a2-9efa-d0b6b636da7a"
                className="w-4 h-4 object-contain"
                alt="Clinic icon"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="flex items-center self-stretch pt-3 gap-[11px]">
              <span className="text-[#0B1C30] text-2xl font-bold">CareFirst Clinic</span>
              <div className="flex flex-col shrink-0 items-start bg-[#EFF4FF] py-0.5 px-[7px] rounded">
                <span className="text-[#005C55] text-xs font-bold uppercase tracking-wider">
                  Admin
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start self-stretch mb-2">
              <span className="text-[#3E4947] text-base">Staff sign-in</span>
            </div>

            {error && (
              <div className="w-full bg-red-50 text-red-600 text-sm py-2 px-3 rounded-lg mt-2">
                {error}
              </div>
            )}

            <div className="flex flex-col self-stretch pt-3 gap-5">
              <div className="flex flex-col self-stretch gap-2">
                <label className="text-[#0B1C30] text-sm font-semibold">Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@carefirstclinic.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  className="self-stretch text-[#0B1C30] bg-[#EFF4FF] text-base py-3 px-4 rounded-lg border border-transparent focus:border-teal-600 focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="flex flex-col self-stretch gap-2">
                <label className="text-[#0B1C30] text-sm font-semibold">Password</label>
                <div className="flex items-center self-stretch bg-[#EFF4FF] rounded-lg border border-transparent focus-within:border-teal-600 focus-within:bg-white transition-all">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter password"
                    className="flex-1 bg-transparent text-[#0B1C30] text-base py-3 px-4 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex shrink-0 items-center justify-center px-3.5 py-3 text-[#6E7977] hover:text-[#0B1C30]"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      {showPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="flex flex-col items-center justify-center self-stretch bg-[#005C55] hover:bg-teal-800 transition-colors text-white py-3 rounded-lg border-0 font-bold text-base cursor-pointer shadow-sm mt-1"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="flex flex-col items-center pt-6">
            <span className="text-[#6E7977] text-sm">&copy; 2026 CareFirst Clinic</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap justify-between items-center self-stretch p-6 text-xs text-[#3E4947] border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>HIPAA Compliant System</span>
            </div>
            <span>&copy; 2026 CareFirst Health. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}