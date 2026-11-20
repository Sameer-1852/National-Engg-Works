import React, { useState } from "react";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import api from "../api";

const LoginPage = ({ onLoginSuccess, allUsers }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      // First try live authentication against MongoDB API
      const res = await api.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      if (res.data?.success && res.data?.data) {
        setLoading(false);
        onLoginSuccess(res.data.data);
        return;
      }
    } catch (err) {
      console.warn("MongoDB API direct login error, verifying with stored user cache:", err.message);
    }

    // Fallback verification against MongoDB loaded user list
    const normalizedEmail = email.trim().toLowerCase();
    const matchedUser = allUsers.find(
      (u) => (u.email || "").toLowerCase() === normalizedEmail
    );

    if (!matchedUser) {
      setError("Account not found with this email in MongoDB. Please check credentials.");
      setLoading(false);
      return;
    }

    if (matchedUser.password !== password) {
      setError("Invalid password. Please check your password and try again.");
      setLoading(false);
      return;
    }

    const role = (matchedUser.role || "").trim().toLowerCase();
    if (role !== "admin" && role !== "author") {
      setError("Access Denied: Only Admin or Author accounts are authorized to access the B2B Dashboard.");
      setLoading(false);
      return;
    }

    setLoading(false);
    onLoginSuccess(matchedUser);
  };

  // Quick 1-click preset login buttons for test & review
  const handleQuickLogin = (presetEmail, presetPassword) => {
    setEmail(presetEmail);
    setPassword(presetPassword);
    setError("");

    const matchedUser = allUsers.find(
      (u) => (u.email || "").toLowerCase() === presetEmail.toLowerCase()
    );
    if (matchedUser) {
      onLoginSuccess(matchedUser);
    }
  };

  return (
    <div className="min-h-screen bg-[#09111e] flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d97706]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#0d1829] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative z-10">
        {/* Card Header with Brand Logo */}
        <div className="p-8 pb-6 text-center border-b border-slate-800/80 bg-[#111e33]">
          <div className="inline-flex items-center justify-center bg-white p-2.5 rounded-xl shadow-md mb-4">
            <img
              src="/images/logo.png"
              alt="NEW Logo"
              className="h-10 w-auto object-contain"
            />
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-wide">
            NEW <span className="text-[#f59e0b]">• ADMIN PORTAL</span>
          </h1>
          <p className="text-[11px] font-mono-tech text-slate-400 uppercase tracking-widest mt-1">
            B2B INDUSTRIAL MACHINERY DASHBOARD
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10.5px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Restricted: Admin &amp; Author Access Only</span>
          </div>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="mx-7 mt-5 p-3 rounded-lg bg-red-950/70 border border-red-700/80 flex items-start gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-7 space-y-4">
          <div>
            <label className="block text-xs font-bold font-mono-tech uppercase text-slate-300 mb-1.5 tracking-wider">
              Gmail / Email Address <span className="text-[#f59e0b]">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@new-engineering.com"
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#162235] border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#d97706] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold font-mono-tech uppercase text-slate-300 mb-1.5 tracking-wider">
              Password <span className="text-[#f59e0b]">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 pl-10 pr-10 rounded-lg bg-[#162235] border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#d97706] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? "Authenticating Credentials..." : "Sign In To Dashboard"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Quick Demo Access Box (Author & Admin 1-Click Login) */}
        {/* <div className="px-7 pb-7 pt-2 border-t border-slate-800/80 bg-[#0b1422]">
          <div className="text-[10px] font-mono-tech text-slate-400 uppercase font-bold text-center mb-3">
            QUICK ACCESS PRESETS (1-CLICK TEST)
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickLogin("author@new-engineering.com", "Author@123")}
              className="p-2.5 rounded-lg bg-purple-950/40 hover:bg-purple-900/50 border border-purple-700/50 text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-tech font-bold text-purple-300">AUTHOR</span>
                <span className="text-[9px] bg-purple-800 text-purple-200 px-1.5 py-0.2 rounded font-mono-tech">SUPER</span>
              </div>
              <div className="text-xs font-bold text-white mt-1 group-hover:text-purple-200">
                Author Login
              </div>
              <div className="text-[10px] text-slate-400 font-mono-tech truncate">
                Author@123
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("admin@new-engineering.com", "Admin@123")}
              className="p-2.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 border border-amber-700/50 text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-tech font-bold text-amber-300">ADMIN</span>
                <span className="text-[9px] bg-amber-800 text-amber-200 px-1.5 py-0.2 rounded font-mono-tech">OPS</span>
              </div>
              <div className="text-xs font-bold text-white mt-1 group-hover:text-amber-200">
                Admin Login
              </div>
              <div className="text-[10px] text-slate-400 font-mono-tech truncate">
                Admin@123
              </div>
            </button>
          </div>
        </div> */}
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-center text-xs text-slate-500 font-mono-tech">
        NEW – National Engineering Works &bull; Secure Industrial Gateway v2.0
      </div>
    </div>
  );
};

export default LoginPage;
