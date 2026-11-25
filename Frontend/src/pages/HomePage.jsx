import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  CheckCircle2,
  ArrowRight,
  Play,
  Sliders,
  ArrowUpRight,
  Shield,
  ShieldCheck,
  Target,
  Network,
  Headphones,
  Store,
  Factory,
  PackageCheck,
  Handshake,
  Utensils,
  Phone,
  MessageSquare,
  Send,
  Lock,
  Cpu,
  Code2,
  Sparkles,
  SlidersHorizontal,
  Building2,
  Gauge,
  Wrench,
  Bookmark,
  AlertTriangle,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const HomePage = () => {
  const { machinery, openQuoteModal, submitEnquiry, showToast } = useApp();

  // Desktop RFQ Form State
  const [rfqForm, setRfqForm] = useState({
    customerName: "",
    email: "",
    companyName: "",
    machineryModel: "Spiral Mixers (250kg / 120kg)",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Mobile RFQ Form State (Matching Screenshot)
  const [mobileCapacity, setMobileCapacity] = useState("< 1,000 kg/h");
  const [mobileCategory, setMobileCategory] = useState("Heavy Spiral & Tilting Mixers");
  const [mobilePhone, setMobilePhone] = useState("+1 (555) 019-2834");
  const [mobileSubmitting, setMobileSubmitting] = useState(false);
  const [mobileUnitsTab, setMobileUnitsTab] = useState("ALL");

  const featuredMachines =
    machinery.filter((m) => m.featuredOnHome).length >= 6
      ? machinery.filter((m) => m.featuredOnHome).slice(0, 6)
      : machinery.slice(0, 6);

  const handleRfqSubmit = async (e) => {
    e.preventDefault();
    if (!rfqForm.customerName.trim() || !rfqForm.email.trim()) {
      showToast("Please provide your full name and corporate email.", "error");
      return;
    }
    try {
      setSubmitting(true);
      await submitEnquiry({
        ...rfqForm,
        enquiryType: "Quick RFQ",
      });
      showToast("Business quote & engineering datasheet request saved! Expect a response within 24 hours.");
      setRfqForm({
        customerName: "",
        email: "",
        companyName: "",
        machineryModel: "Spiral Mixers (250kg / 120kg)",
        message: "",
      });
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to submit RFQ.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMobileRfqSubmit = async (e) => {
    e.preventDefault();
    if (!mobilePhone.trim()) {
      showToast("Please enter your Phone or WhatsApp number.", "error");
      return;
    }
    try {
      setMobileSubmitting(true);
      await submitEnquiry({
        customerName: "Mobile Plant Manager",
        phone: mobilePhone.trim(),
        email: "plant.inquiry@mobile-client.com",
        machineryModel: mobileCategory,
        enquiryType: "Mobile Fast-Track RFQ",
        targetOutput: mobileCapacity,
        message: `Mobile Fast-Track RFQ: Target Capacity: ${mobileCapacity}, Category: ${mobileCategory}`,
      });
      showToast("RFQ successfully submitted to Engineering Desk! A specialist will contact you shortly.");
    } catch (err) {
      showToast("Failed to submit RFQ.", "error");
    } finally {
      setMobileSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 📱 MOBILE VIEW SCREEN (PIXEL-PERFECT MATCH FOR USER MOBILE SCREENSHOT)   */}
      {/* ========================================================================= */}
      <div className="block md:hidden pb-24 bg-white text-[#0f172a] font-sans antialiased">
        {/* 1. MOBILE HERO SECTION */}
        <section className="px-4 pt-5 pb-6 bg-[#f8fafc] border-b border-slate-200">
          {/* Top Badges Row */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 bg-[#dbeafe] text-[#1e40af] border border-blue-200 text-[10.5px] font-mono-tech font-extrabold px-2.5 py-1 rounded">
              <Sparkles className="w-3 h-3 text-[#d97706]" />
              <span>SERIES 1988 • INDUSTRIAL GRADE</span>
            </span>
            <span className="inline-flex items-center bg-[#ffedd5] text-[#9a3412] text-[10.5px] font-mono-tech font-extrabold px-2.5 py-1 rounded">
              APEXBAKE OEM
            </span>
          </div>

          {/* Big Bold Headline */}
          <h1 className="text-[27px] font-extrabold text-[#0f172a] leading-[1.18] tracking-tight">
            Powering Industrial Baking{" "}
            <span className="text-[#d97706]">Since 1988</span>
          </h1>

          {/* Description */}
          <p className="text-slate-600 text-[12.5px] leading-relaxed mt-2.5">
            High-throughput dough processors, precision spiral mixers, and automated plant lines built with cast-iron resonance and EHEDG sanitary standards.
          </p>

          {/* Hero Action Buttons */}
          <div className="mt-4 space-y-2.5">
            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="w-full h-11 bg-[#d97706] hover:bg-[#b45309] text-white font-extrabold text-xs uppercase tracking-wider rounded-md flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Instant Machinery RFQ</span>
            </button>

            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="w-full h-11 bg-[#dbeafe] hover:bg-[#bfdbfe] text-[#1e40af] font-bold text-xs rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Headphones className="w-4 h-4" />
              <span>Consult Plant Engineer</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="mt-4 bg-white rounded-lg border border-slate-200 shadow-2xs py-3 px-2 grid grid-cols-3 divide-x divide-slate-200 text-center">
            <div className="px-1">
              <div className="text-lg font-black text-[#0f172a]">36+</div>
              <div className="text-[9px] font-mono-tech text-slate-500 uppercase font-bold tracking-wider mt-0.5">
                YEARS OEM
              </div>
            </div>
            <div className="px-1">
              <div className="text-lg font-black text-[#0f172a]">45+</div>
              <div className="text-[9px] font-mono-tech text-slate-500 uppercase font-bold tracking-wider mt-0.5">
                COUNTRIES
              </div>
            </div>
            <div className="px-1">
              <div className="text-lg font-black text-[#0f172a]">1.2K+</div>
              <div className="text-[9px] font-mono-tech text-slate-500 uppercase font-bold tracking-wider mt-0.5">
                LINES BUILT
              </div>
            </div>
          </div>
        </section>

        {/* 2. SELECT PRODUCTION INTENT SECTION */}
        <section className="px-4 py-6 border-b border-slate-200">
          <div className="text-[10px] font-mono-tech text-slate-500 uppercase font-bold tracking-widest">
            BASIC INTENT / SIZING
          </div>
          <div className="flex items-center justify-between mt-1 mb-4">
            <h2 className="text-lg font-black text-[#0f172a]">
              Select Production Intent
            </h2>
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          </div>

          <div className="space-y-3.5">
            {/* Card 1: Start Bakery Business */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-[#e0e7ff] text-[#3730a3] flex items-center justify-center">
                  <Factory className="w-4 h-4" />
                </div>
                <span className="bg-[#e0e7ff] text-[#3730a3] text-[9.5px] font-mono-tech font-bold px-2 py-0.5 rounded">
                  STARTUP / GREENFIELD
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-[#0f172a] mt-2.5">
                Start Bakery Business
              </h3>
              <p className="text-[11.5px] text-slate-600 leading-relaxed mt-1">
                Turnkey machinery bundles, modular layout blueprints, and daily output estimations (100 to 5,000 kg).
              </p>
              <Link
                to="/solutions/start-your-business"
                className="inline-flex items-center gap-1 text-[10.5px] font-mono-tech font-bold text-[#d97706] hover:text-[#b45309] mt-3 uppercase"
              >
                <span>EXPLORE GREENFIELD SUITES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 2: Find Your Exact Machinery */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-[#e0e7ff] text-[#3730a3] flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <span className="bg-[#ffedd5] text-[#9a3412] text-[9.5px] font-mono-tech font-bold px-2 py-0.5 rounded">
                  Direct App Sizing
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-[#0f172a] mt-2.5">
                Find Your Exact Machinery
              </h3>
              <p className="text-[11.5px] text-slate-600 leading-relaxed mt-1">
                Filter by dough hydration percentage (45%-85%), planetary torque requirements, and hourly throughput metrics.
              </p>
              <Link
                to="/solutions/find-machinery"
                className="inline-flex items-center gap-1 text-[10.5px] font-mono-tech font-bold text-[#d97706] hover:text-[#b45309] mt-3 uppercase"
              >
                <span>OPEN SPEC CONSULTATOR</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 3: Upgrade & Plant Scale-Up */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-[#e0e7ff] text-[#3730a3] flex items-center justify-center">
                  <Gauge className="w-4 h-4" />
                </div>
                <span className="bg-[#e0e7ff] text-[#3730a3] text-[9.5px] font-mono-tech font-bold px-2 py-0.5 rounded">
                  Capacity: 1.5T+/Day
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-[#0f172a] mt-2.5">
                Upgrade &amp; Plant Scale-Up
              </h3>
              <p className="text-[11.5px] text-slate-600 leading-relaxed mt-1">
                Eliminate mixing and slicing line bottlenecks with drop-in continuous automation modules and retrofits.
              </p>
              <Link
                to="/solutions/upgrade-scale"
                className="inline-flex items-center gap-1 text-[10.5px] font-mono-tech font-bold text-[#d97706] hover:text-[#b45309] mt-3 uppercase"
              >
                <span>AUDIT LINE BOTTLENECKS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. FLAGSHIP PRODUCTION UNITS */}
        <section className="px-4 py-6 border-b border-slate-200 bg-[#f8fafc]">
          <div className="text-[10px] font-mono-tech text-slate-500 uppercase font-bold tracking-widest">
            DIRECT OEM LINEUP
          </div>
          <div className="flex items-center justify-between mt-1 mb-4">
            <h2 className="text-lg font-black text-[#0f172a]">
              Flagship Production Units
            </h2>
            <div className="flex items-center gap-1 bg-slate-200 p-0.5 rounded">
              <button
                type="button"
                onClick={() => setMobileUnitsTab("ALL")}
                className={`px-2 py-0.5 text-[9.5px] font-mono-tech font-bold rounded transition-colors ${mobileUnitsTab === "ALL"
                  ? "bg-[#0d1829] text-white"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                ALL UNITS
              </button>
              <button
                type="button"
                onClick={() => setMobileUnitsTab("MIXING")}
                className={`px-2 py-0.5 text-[9.5px] font-mono-tech font-bold rounded transition-colors ${mobileUnitsTab === "MIXING"
                  ? "bg-[#0d1829] text-white"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                MIXING
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {/* Unit 1: Industrial Dual-Drive Spiral Mixer */}
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
              <div className="relative h-48 bg-slate-100">
                <img
                  src="/images/cat-sm250s.png"
                  alt="Industrial Dual-Drive Spiral Mixer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 bg-[#0d1829] text-white text-[9.5px] font-mono-tech font-bold px-2 py-0.5 rounded">
                  AB-SM250S
                </span>
                <span className="absolute top-2.5 right-2.5 bg-amber-100 text-amber-900 border border-amber-300 text-[9.5px] font-mono-tech font-bold px-2 py-0.5 rounded">
                  250 KG BATCH
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-black text-[#0f172a] leading-tight">
                    Industrial Dual-Drive Spiral Mixer
                  </h3>
                  <span className="text-[10px] font-mono-tech text-blue-700 font-extrabold uppercase shrink-0">
                    SUS304
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Dual motor independent drive for spiral arm and bowl with reverse jog for artisan hydration doughs.
                </p>

                <div className="mt-3 bg-[#f1f5f9] rounded-lg p-2.5 grid grid-cols-3 divide-x divide-slate-200 text-center">
                  <div className="px-1">
                    <div className="text-[8.5px] font-mono-tech text-slate-500 uppercase font-bold">
                      MOTOR POWER
                    </div>
                    <div className="text-xs font-black text-[#0f172a] mt-0.5">
                      12.5 kW
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="text-[8.5px] font-mono-tech text-slate-500 uppercase font-bold">
                      BOWL VOLUME
                    </div>
                    <div className="text-xs font-black text-[#0f172a] mt-0.5">
                      380 Liters
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="text-[8.5px] font-mono-tech text-slate-500 uppercase font-bold">
                      LINE SPEC
                    </div>
                    <div className="text-xs font-black text-[#0f172a] mt-0.5">
                      PLC + VFD
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <Link
                    to="/products/AB-SM250S"
                    className="w-full h-10 bg-[#d97706] hover:bg-[#b45309] text-white font-extrabold text-xs uppercase tracking-wider rounded-md flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span>View Product</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Unit 2: Automated Reversible Dough Sheeter */}
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
              <div className="relative h-48 bg-slate-100">
                <img
                  src="/images/cat-ds650.png"
                  alt="Automated Reversible Dough Sheeter"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 bg-[#0d1829] text-white text-[9.5px] font-mono-tech font-bold px-2 py-0.5 rounded">
                  AB-DS650
                </span>
                <span className="absolute top-2.5 right-2.5 bg-amber-100 text-amber-900 border border-amber-300 text-[9.5px] font-mono-tech font-bold px-2 py-0.5 rounded">
                  0.2 - 50 MM THICKNESS
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-black text-[#0f172a] leading-tight">
                    Automated Reversible Dough Sheeter
                  </h3>
                  <span className="text-[10px] font-mono-tech text-blue-700 font-extrabold uppercase shrink-0">
                    0.5 - 45 mm
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Hard-chrome calibrated cylinders with digital thickness telemetry and synchro-speed reverse belts.
                </p>

                <div className="mt-3 bg-[#f1f5f9] rounded-lg p-2.5 grid grid-cols-3 divide-x divide-slate-200 text-center">
                  <div className="px-1">
                    <div className="text-[8.5px] font-mono-tech text-slate-500 uppercase font-bold">
                      DRIVE
                    </div>
                    <div className="text-xs font-black text-[#0f172a] mt-0.5">
                      1.8 kW VFD
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="text-[8.5px] font-mono-tech text-slate-500 uppercase font-bold">
                      SAFETY
                    </div>
                    <div className="text-xs font-black text-[#0f172a] mt-0.5">
                      CE Interlock
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="text-[8.5px] font-mono-tech text-slate-500 uppercase font-bold">
                      FOOTPRINT
                    </div>
                    <div className="text-xs font-black text-[#0f172a] mt-0.5">
                      3.2 x 1.1 M
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <Link
                    to="/products/AB-DS650"
                    className="w-full h-10 bg-[#d97706] hover:bg-[#b45309] text-white font-extrabold text-xs uppercase tracking-wider rounded-md flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span>View Product</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Unit 3: Continuous Rotary Industrial Slicer */}
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
              <div className="relative h-48 bg-slate-100">
                <img
                  src="/images/cat-bs450.png"
                  alt="Continuous Rotary Industrial Slicer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 bg-[#0d1829] text-white text-[9.5px] font-mono-tech font-bold px-2 py-0.5 rounded">
                  AB-BS450
                </span>
                <span className="absolute top-2.5 right-2.5 bg-amber-100 text-amber-900 border border-amber-300 text-[9.5px] font-mono-tech font-bold px-2 py-0.5 rounded">
                  1,800 LOAVES/HR
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-black text-[#0f172a] leading-tight">
                    Continuous Rotary Industrial Slicer
                  </h3>
                  <span className="text-[10px] font-mono-tech text-blue-700 font-extrabold uppercase shrink-0">
                    Teflon Edge
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Continuous feed gravity &amp; belt feed options with oil-mist blade lubrication for warm or gluten-heavy loaves.
                </p>

                <div className="mt-3 bg-[#f1f5f9] rounded-lg p-2.5 grid grid-cols-3 divide-x divide-slate-200 text-center">
                  <div className="px-1">
                    <div className="text-[8.5px] font-mono-tech text-slate-500 uppercase font-bold">
                      BLADE PITCH
                    </div>
                    <div className="text-xs font-black text-[#0f172a] mt-0.5">
                      10-20 MM
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="text-[8.5px] font-mono-tech text-slate-500 uppercase font-bold">
                      PNEUMATICS
                    </div>
                    <div className="text-xs font-black text-[#0f172a] mt-0.5">
                      6.0 Bar
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="text-[8.5px] font-mono-tech text-slate-500 uppercase font-bold">
                      CONTACT
                    </div>
                    <div className="text-xs font-black text-[#0f172a] mt-0.5">
                      SUS304
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <Link
                    to="/products/AB-BS450"
                    className="w-full h-10 bg-[#d97706] hover:bg-[#b45309] text-white font-extrabold text-xs uppercase tracking-wider rounded-md flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span>View Product</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. THE NEW ENGINEERING STANDARD (DARK NAVY CARD) */}
        <section className="px-4 py-6">
          <div className="bg-[#0d1829] rounded-2xl p-5 text-white shadow-xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-mono-tech uppercase font-bold tracking-widest">
              <Shield className="w-3.5 h-3.5" />
              <span>FACTORY STANDARDS</span>
            </div>
            <h2 className="text-base font-black text-white mt-1">
              The NEW Engineering Standard
            </h2>

            <div className="space-y-3 mt-4">
              {/* Feature 1 */}
              <div className="bg-[#152338] rounded-xl p-3.5 border border-slate-700/60 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-800/90 text-amber-400 flex items-center justify-center shrink-0 border border-slate-700">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">
                    Heavy Cast-Iron Anti-Vibration Base
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    Eliminates line resonance under maximum 24/7 continuous dough sheer loads.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#152338] rounded-xl p-3.5 border border-slate-700/60 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-800/90 text-amber-400 flex items-center justify-center shrink-0 border border-slate-700">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">
                    Full Washdown EHEDG Compliance
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    All dough contact zones built in continuous weld SUS304/316 stainless steel with CIP access.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#152338] rounded-xl p-3.5 border border-slate-700/60 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-800/90 text-amber-400 flex items-center justify-center shrink-0 border border-slate-700">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">
                    24/7 Field Maintenance Hotline
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    OEM spare components guaranteed on dispatch within 24 hours globally to prevent plant downtime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. REQUEST LINE SPECIFICATION & PRICING FORM */}
        <section className="px-4 py-6 bg-[#f8fafc] border-t border-slate-200">
          <div className="text-[10px] font-mono-tech text-[#d97706] uppercase font-bold tracking-widest">
            FAST-TRACK RFQ DESK
          </div>
          <h2 className="text-base font-black text-[#0f172a] mt-1">
            Request Line Specification &amp; Pricing
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
            Submit requirements directly to our senior plant layout engineers.
          </p>

          <form onSubmit={handleMobileRfqSubmit} className="mt-4 space-y-3.5">
            {/* Target Production Capacity */}
            <div>
              <label className="block text-[10px] font-mono-tech uppercase font-bold text-slate-600 mb-1.5 tracking-wider">
                TARGET PRODUCTION CAPACITY
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["< 1,000 kg/h", "1-5 T/h", "> 5 T/h"].map((cap) => (
                  <button
                    key={cap}
                    type="button"
                    onClick={() => setMobileCapacity(cap)}
                    className={`h-9 text-[11px] font-mono-tech font-bold rounded border transition-colors cursor-pointer ${mobileCapacity === cap
                      ? "bg-[#dbeafe] text-[#1e40af] border-blue-400"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>

            {/* Equipment Category */}
            <div>
              <label className="block text-[10px] font-mono-tech uppercase font-bold text-slate-600 mb-1.5 tracking-wider">
                EQUIPMENT CATEGORY
              </label>
              <select
                value={mobileCategory}
                onChange={(e) => setMobileCategory(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded text-xs text-[#0f172a] font-medium focus:outline-none focus:border-[#d97706]"
              >
                <option value="Heavy Spiral & Tilting Mixers">Heavy Spiral &amp; Tilting Mixers</option>
                <option value="Automated Dough Sheeters">Automated Dough Sheeters</option>
                <option value="Continuous Industrial Slicers">Continuous Industrial Slicers</option>
                <option value="Proofing & Thermal Systems">Proofing &amp; Thermal Systems</option>
                <option value="Turnkey Bakery Production Suite">Turnkey Bakery Production Suite</option>
              </select>
            </div>

            {/* Plant Manager Phone / WhatsApp */}
            <div>
              <label className="block text-[10px] font-mono-tech uppercase font-bold text-slate-600 mb-1.5 tracking-wider">
                PLANT MANAGER PHONE / WHATSAPP
              </label>
              <input
                type="tel"
                required
                value={mobilePhone}
                onChange={(e) => setMobilePhone(e.target.value)}
                placeholder="+1 (555) 019-2834"
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded text-xs font-mono-tech text-[#0f172a] focus:outline-none focus:border-[#d97706]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={mobileSubmitting}
              className="w-full h-11 bg-[#d97706] hover:bg-[#b45309] text-white font-extrabold text-xs uppercase tracking-wider rounded-md flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{mobileSubmitting ? "Submitting..." : "Submit RFQ to Engineering Desk"}</span>
            </button>
          </form>

          {/* Quick Contact Buttons Row */}
          <div className="grid grid-cols-2 gap-2.5 mt-3 pt-3 border-t border-slate-200">
            <a
              href="https://wa.me/13125552253"
              target="_blank"
              rel="noreferrer"
              className="h-10 rounded bg-[#dbeafe] text-[#1e40af] font-bold text-[10.5px] font-mono-tech uppercase flex items-center justify-center gap-1.5 hover:bg-[#bfdbfe] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WHATSAPP DESK</span>
            </a>
            <a
              href="tel:+18004927325"
              className="h-10 rounded bg-[#dbeafe] text-[#1e40af] font-bold text-[10.5px] font-mono-tech uppercase flex items-center justify-center gap-1.5 hover:bg-[#bfdbfe] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>HOTLINE CALL</span>
            </a>
          </div>
        </section>

        {/* 6. FLOATING STICKY BATCH NOTIFIER (MOBILE ONLY) */}
        <div className="fixed bottom-14 left-3 right-3 z-40">
          <div className="bg-[#0d1829] text-white rounded-xl p-2.5 px-3 flex items-center justify-between shadow-2xl border border-slate-700/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-6 h-6 rounded bg-[#d97706] text-white font-black text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <div className="truncate">
                <div className="text-[10.5px] font-mono-tech font-bold text-slate-200 truncate">
                  RFQ SPEC BATCH
                </div>
                <div className="text-[9.5px] text-slate-400 truncate">
                  1 Item Selected: Heavy Spiral...
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="bg-[#fef3c7] hover:bg-amber-100 text-[#92400e] text-[11px] font-mono-tech font-extrabold px-3 py-1.5 rounded flex items-center gap-1 shrink-0 ml-2 transition-colors cursor-pointer"
            >
              <span>Proceed</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 💻 DESKTOP VIEW SCREEN (ORIGINAL DESKTOP EXPERIENCE FULLY PRESERVED)      */}
      {/* ========================================================================= */}
      <div className="hidden md:block">
        {/* 1. HERO SECTION */}
        <section
          className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-16 lg:py-22 border-b border-slate-800"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        >
          {/* Dark Gradient Overlay for Text Readability over Cover Image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#091220]/90 via-[#0d1829]/75 to-[#0d1829]/55 pointer-events-none" />

          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="lg:col-span-6 space-y-6">
                {/* <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 px-3.5 py-1.5 rounded text-[11px] font-mono-tech text-[#f59e0b] font-semibold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
                  <span>NEW – NATIONAL ENGINEERING WORKS • B2B INDUSTRIAL SYSTEMS</span>
                </div> */}

                <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-white leading-[1.12] tracking-tight">
                  Powering the Future
                  <br />
                  of <span className="text-[#f59e0b]">Industrial Baking</span>
                </h1>

                <p className="text-slate-300 text-base sm:text-[17px] leading-relaxed max-w-xl">
                  High-performance bakery machinery engineered for operational efficiency, precision processing, and consistent batch quality across 24/7 production environments.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => openQuoteModal()}
                    className="inline-flex items-center gap-2.5 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs tracking-wider uppercase px-6 py-4 rounded shadow-lg shadow-amber-950/40 transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>REQUEST A QUOTE</span>
                  </button>

                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center bg-slate-800/70 hover:bg-slate-700/80 text-white font-bold text-xs tracking-wider uppercase px-7 py-4 rounded border border-slate-600/80 backdrop-blur-xs transition-all"
                  >
                    EXPLORE OUR PRODUCTS
                  </Link>
                </div>
              </div>

              {/* Right Image with Technical Overlays */}
              <div className="lg:col-span-6">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-900 ring-1 ring-white/10">
                  <img
                    src="/images/home-hero.png"
                    alt="Industrial Bakery Production Line"
                    className="w-full h-auto object-cover block"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. STATS BAR */}
        <section className="bg-[#dce8f8] border-b border-slate-200/80 py-8">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-slate-300/70">
              <div className="lg:px-4 first:lg:pl-0">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0f172a]">30+</div>
                <div className="text-[11px] font-mono-tech text-slate-600 uppercase tracking-wider mt-1">
                  YEARS OF ENGINEERING EXCELLENCE
                </div>
              </div>

              <div className="lg:px-8">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#d97706]">45+</div>
                <div className="text-[11px] font-mono-tech text-slate-600 uppercase tracking-wider mt-1">
                  COUNTRIES SERVED
                </div>
              </div>

              <div className="lg:px-8">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0f172a]">1,200+</div>
                <div className="text-[11px] font-mono-tech text-slate-600 uppercase tracking-wider mt-1">
                  BAKERIES EQUIPPED
                </div>
              </div>

              <div className="lg:px-8">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#334e68]">24/7</div>
                <div className="text-[11px] font-mono-tech text-slate-600 uppercase tracking-wider mt-1">
                  TECHNICAL SUPPORT &amp; SLA
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. MACHINERY SOLUTIONS TAILORED TO YOUR GROWTH STAGE */}
        <section className="bg-[#eef4fc] py-16 lg:py-20 border-b border-slate-200/70">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight">
                Machinery Solutions Tailored to Your
                <br />
                Growth Stage
              </h2>
              <p className="text-slate-600 text-sm sm:text-[15px] mt-3 leading-relaxed">
                From greenfield commissary startups to high-output industrial wholesale plants, select your current operational stage for specialized machinery configurations and turnkey technical support.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
              {/* Card 1: Start Your Business */}
              <div className="bg-white rounded-xl p-7 shadow-xs border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#0f172a]">Start Your Business</h3>
                  <p className="text-slate-600 text-xs leading-relaxed mt-2.5">
                    Explore reliable bakery machinery solutions designed to help new businesses establish efficient and scalable production operations.
                  </p>

                  <div className="mt-6 bg-[#f1f6fd] rounded-lg p-4 space-y-3">
                    <div className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-wider font-semibold">
                      INCLUDED ARCHITECTURE:
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                      <span>Free Facility Layout &amp; Space Planning Consultation</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                      <span>Tailored Starter Equipment Packages (100–500 kg/day)</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                      <span>ROI &amp; Production Batch Feasibility Assessment</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/solutions/start-your-business"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>EXPLORE STARTUP SOLUTIONS</span>
                </Link>
              </div>

              {/* Card 2: Find Your Exact Machinery */}
              <div className="bg-white rounded-xl p-7 shadow-md border-2 border-[#f59e0b] flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#0f172a]">Find Your Exact Machinery</h3>
                  <p className="text-slate-600 text-xs leading-relaxed mt-2.5">
                    Find the right industrial machinery based on your production requirements, operational needs, and manufacturing goals.
                  </p>

                  <div className="mt-6 bg-[#f1f6fd] rounded-lg p-4 space-y-3">
                    <div className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-wider font-semibold">
                      ENGINEERING SPECIFICATIONS:
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#334e68] shrink-0 mt-0.5" />
                      <span>Interactive Machinery Selection Based on Dough Type &amp; Production Output</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#334e68] shrink-0 mt-0.5" />
                      <span>Heavy-Duty, Food-Grade SUS304 / SUS316 Stainless Steel Construction</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#334e68] shrink-0 mt-0.5" />
                      <span>Preconfigured Siemens S7 / Allen-Bradley Recipe Automation Systems</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/solutions/find-machinery"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>EXPLORE MACHINERY</span>
                </Link>
              </div>

              {/* Card 3: Upgrade & Scale Up Operations */}
              <div className="bg-white rounded-xl p-7 shadow-xs border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#0f172a]">Upgrade &amp; Scale Up Operations</h3>
                  <p className="text-slate-600 text-xs leading-relaxed mt-2.5">
                    Enhance production efficiency with advanced machinery, automation, and scalable solutions designed for growing manufacturing operations.
                  </p>

                  <div className="mt-6 bg-[#f1f6fd] rounded-lg p-4 space-y-3">
                    <div className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-wider font-semibold">
                      INDUSTRIAL CAPABILITIES:
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                      <span>Production Line Retrofits, Synchronization &amp; High-Speed Conveyors</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                      <span>Multi-Deck Tunnel Ovens &amp; 24-Trolley Climate-Controlled Proofers</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                      <span>Equipment Trade-In Evaluation &amp; Turnkey Plant Expansion</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/solutions/upgrade-scale"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>EXPLORE UPGRADE SOLUTIONS</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TURNKEY OEM & INDUSTRIAL SYSTEMS */}
        <section className="bg-[#f8fafd] py-16 lg:py-20 border-b border-slate-200/70">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                  <img
                    src="/images/home-factory.png"
                    alt="ApexBake Industrial Manufacturing Facility"
                    className="w-full h-auto object-cover block"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#334e68] uppercase tracking-wider font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#334e68]" />
                  <span>TURNKEY OEM &amp; INDUSTRIAL SYSTEMS</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight">
                  ApexBake Industrial: Engineered
                  <br />
                  Durability, High-Throughput
                  <br />
                  Consistency
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                  ApexBake Industrial stands as a distinguished global manufacturer and turnkey provider of robust commercial dough preparation, automated shaping, and continuous thermal processing machinery. Engineered for medium-to-large wholesale production facilities, our systems fuse hygienic mechanical longevity with cutting-edge PLC automation.
                </p>

                <p className="text-slate-600 text-sm leading-relaxed">
                  Every machine is fabricated with certified AISI 304 food-contact stainless steel, high-torque industrial gearboxes, and open-architecture telemetry. From standalone high-capacity spiral mixers to integrated turnkey sheeting lines, we deliver purpose-built reliability that eliminates costly plant downtime.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#e6effa] rounded-lg p-4 border border-blue-200/50">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#0f172a]">
                      <Cpu className="w-4 h-4 text-[#d97706]" />
                      <span>Precision Fabrication</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      Laser-cut thick steel chassis helps reduce vibration during intensive kneading cycles.
                    </p>
                  </div>

                  <div className="bg-[#e6effa] rounded-lg p-4 border border-blue-200/50">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#0f172a]">
                      <Code2 className="w-4 h-4 text-[#d97706]" />
                      <span>Turnkey Line Design</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      Seamless conveyor-linked systems customized to your plant’s geometric footprint.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. EQUIPMENT CATALOG (6 FEATURED MACHINERY CARDS) */}
        <section className="bg-[#eef4fc] py-16 lg:py-20 border-b border-slate-200/70">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="text-xs font-mono-tech text-slate-500 uppercase tracking-widest">
                  EQUIPMENT CATALOG
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] mt-1">
                  Commercial &amp; Industrial Production Machinery
                </h2>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#d97706] hover:text-[#b45309] transition-colors shrink-0"
              >
                <span>View Machinery Line</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {featuredMachines.map((item, idx) => {
                const isOrangeBadge =
                  item.homeBadgeRight === "250 KG FLOUR" ||
                  item.homeBadgeRight === "LAMINATING SPEC" ||
                  idx === 0 ||
                  idx === 3;

                return (
                  <div
                    key={item._id || item.modelCode}
                    className="bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow border border-slate-200/90 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Container with Top Badges */}
                      <div className="relative bg-[#dbe8f8] p-3.5 pb-4">
                        <div className="relative rounded-lg overflow-hidden h-48 bg-slate-100">
                          <img
                            src={item.homeImage || item.catalogImage || "/images/home-mach-1.png"}
                            alt={item.homeTitle || item.machineryName}
                            className="w-full h-full object-cover"
                          />
                          {/* Top Left Model Badge */}
                          <span className="absolute top-2.5 left-2.5 bg-[#0d1829] text-white text-[10px] font-mono-tech font-semibold px-2.5 py-1 rounded-xs">
                            {item.homeCode || item.modelCode}
                          </span>
                          {/* Top Right Spec Badge */}
                          {item.homeBadgeRight && (
                            <span
                              className={`absolute top-2.5 right-2.5 text-white text-[10px] font-mono-tech font-semibold px-2.5 py-1 rounded-xs ${isOrangeBadge ? "bg-[#d97706]" : "bg-[#3b526b]"
                                }`}
                            >
                              {item.homeBadgeRight}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 pb-4">
                        <div className="text-[10.5px] font-mono-tech text-[#334e68] uppercase tracking-wider font-semibold">
                          {item.homeCategoryLabel || item.categoryLabel}
                        </div>
                        <h3 className="text-lg font-extrabold text-[#0f172a] mt-1">
                          {item.homeTitle || item.machineryName}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-3">
                          {item.homeDescription || item.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2">
                      <Link
                        to={`/products/${item.modelCode}`}
                        className="block w-full text-center bg-[#dce8f8] hover:bg-[#c8dbf5] text-[#0f172a] font-bold text-xs py-3 rounded transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. INDUSTRIAL ADVANTAGE */}
        <section className="bg-[#f8fafd] py-16 lg:py-20 border-b border-slate-200/70">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="text-xs font-mono-tech text-slate-500 uppercase tracking-widest">
                INDUSTRIAL ADVANTAGE
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] mt-1.5 leading-tight">
                Why Enterprise Plants Trust ApexBake
                <br />
                Systems
              </h2>
              <p className="text-slate-600 text-sm mt-3">
                Heavy machinery is an investment in operating continuity. Our equipment is engineered from the ground up to endure punishing three-shift production cycles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-[#dce8f8] flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5 text-[#d97706]" />
                </div>
                <h3 className="text-base font-bold text-[#0f172a]">Quality Engineering</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Constructed with certified food-grade SUS304 stainless steel, reinforced stress castings, and premium SKF/SEW-Eurodrive mechanical components.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-[#dce8f8] flex items-center justify-center mb-4">
                  <Target className="w-5 h-5 text-[#d97706]" />
                </div>
                <h3 className="text-base font-bold text-[#0f172a]">Reliable Performance</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Engineered for continuous 24/7 automated plant operation with thermal overload safeguards and preventative vibration sensors.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-[#dce8f8] flex items-center justify-center mb-4">
                  <Network className="w-5 h-5 text-[#d97706]" />
                </div>
                <h3 className="text-base font-bold text-[#0f172a]">Industrial Solutions</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Turnkey end-to-end line design, automated recipe sync, custom transfer conveyors, and full plant layout CAD engineering.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-[#dce8f8] flex items-center justify-center mb-4">
                  <Headphones className="w-5 h-5 text-[#d97706]" />
                </div>
                <h3 className="text-base font-bold text-[#0f172a]">Global Field Support</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  On-site plant commissioning by factory engineers, guaranteed 48-hour critical spare parts dispatch, and remote telemetry support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. SECTOR APPLICATIONS */}
        <section className="bg-[#dce8f8] py-16 lg:py-20">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12">
              <div className="lg:col-span-7">
                <div className="text-xs font-mono-tech text-slate-600 uppercase tracking-widest">
                  SECTOR APPLICATIONS
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] mt-1 leading-tight">
                  Industries Powered by ApexBake
                  <br />
                  Machinery
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Tailored automated solutions addressing the unique sanitary, capacity, and output mandates of diverse commercial baking sectors.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded bg-[#dce8f8] flex items-center justify-center mb-4">
                    <Store className="w-4 h-4 text-[#d97706]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0f172a]">Commercial Bakeries</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Medium retail and multi-outlet commissary kitchens producing artisanal breads, pastries, and buns.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] font-mono-tech text-slate-500 font-semibold">
                  500 - 1,500 KG/DAY
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded bg-[#dce8f8] flex items-center justify-center mb-4">
                    <Factory className="w-4 h-4 text-[#d97706]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0f172a]">Industrial Wholesale Plants</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    High-volume automated mega-facilities with continuous tunnel ovens and automated slicing lines.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] font-mono-tech text-slate-500 font-semibold">
                  5,000+ KG/DAY
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-[#f59e0b] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded bg-amber-100 flex items-center justify-center mb-4">
                    <PackageCheck className="w-4 h-4 text-[#d97706]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0f172a]">Food CPG Manufacturers</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Packaged snack producers, frozen dough packagers, and extruded biscuit processors needing strict PLC sync.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] font-mono-tech text-[#d97706] font-bold">
                  HACCP &amp; SQF READY
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded bg-[#dce8f8] flex items-center justify-center mb-4">
                    <Handshake className="w-4 h-4 text-[#d97706]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0f172a]">Turnkey Contractors</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Engineering EPC firms and bakery distributors specifying certified machinery into greenfield projects.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] font-mono-tech text-slate-500 font-semibold">
                  OEM / BIM COMPATIBLE
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded bg-[#dce8f8] flex items-center justify-center mb-4">
                    <Utensils className="w-4 h-4 text-[#d97706]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0f172a]">Hospitality &amp; Central Kitchens</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Large hotel groups, institutional catering hubs, and quick-service restaurant central prep kitchens.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] font-mono-tech text-slate-500 font-semibold">
                  BATCH FLEXIBILITY
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. B2B ENGINEERING CONSULTATION & QUICK RFQ FORM */}
        <section className="bg-[#0d1829] py-16 lg:py-20 text-white">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Info */}
              <div className="lg:col-span-6 space-y-6">
                <div className="text-xs font-mono-tech text-[#f59e0b] uppercase tracking-widest font-semibold">
                  • B2B ENGINEERING CONSULTATION
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  Looking for the Right Bakery
                  <br />
                  Machinery?
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Tell us about your production requirements. Our specialized team of bakery automation engineers will calculate your batch sizing, review floor schematics, and recommend the optimum machinery lineup.
                </p>

                <div className="pt-4 border-t border-slate-800 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded bg-amber-950/80 border border-amber-700/50 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#f59e0b]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono-tech text-slate-400 uppercase">
                        DIRECT ENGINEERING HOTLINE
                      </div>
                      <div className="text-lg font-bold text-white">+1 (800) 492–7325</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono-tech text-slate-400 uppercase">
                        INSTANT WHATSAPP TECHNICAL DISPATCH
                      </div>
                      <div className="text-lg font-bold text-white">+1 (312) 555–2253</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Interactive Form Box */}
              <div className="lg:col-span-6">
                <div className="bg-[#111e33] border border-slate-700/80 rounded-xl p-8 shadow-2xl">
                  <h3 className="text-xl font-bold text-white tracking-wide uppercase">
                    REQUEST LINE SPECIFICATION &amp; PRICING
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill out the technical parameters below for rapid factory direct pricing.
                  </p>

                  <form onSubmit={handleRfqSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold font-mono-tech uppercase text-slate-300 mb-1.5">
                        CONTACT NAME <span className="text-[#f59e0b]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqForm.customerName}
                        onChange={(e) => setRfqForm({ ...rfqForm, customerName: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full h-11 px-3.5 rounded bg-[#162235] border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#d97706] transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold font-mono-tech uppercase text-slate-300 mb-1.5">
                          CORPORATE EMAIL <span className="text-[#f59e0b]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={rfqForm.email}
                          onChange={(e) => setRfqForm({ ...rfqForm, email: e.target.value })}
                          placeholder="j.doe@commercialbake.com"
                          className="w-full h-11 px-3.5 rounded bg-[#162235] border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#d97706] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold font-mono-tech uppercase text-slate-300 mb-1.5">
                          COMPANY NAME
                        </label>
                        <input
                          type="text"
                          value={rfqForm.companyName}
                          onChange={(e) => setRfqForm({ ...rfqForm, companyName: e.target.value })}
                          placeholder="e.g. Acme Baking Group"
                          className="w-full h-11 px-3.5 rounded bg-[#162235] border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#d97706] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold font-mono-tech uppercase text-slate-300 mb-1.5">
                        PRIMARY MACHINERY CATEGORY / MODEL
                      </label>
                      <select
                        value={rfqForm.machineryModel}
                        onChange={(e) => setRfqForm({ ...rfqForm, machineryModel: e.target.value })}
                        className="w-full h-11 px-3.5 rounded bg-[#162235] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#d97706] transition-colors"
                      >
                        <option value="Spiral Mixers (250kg / 120kg)">Heavy-Duty Spiral Mixers (AB-SM250S / AB-SM130)</option>
                        <option value="Planetary Mixers (80L / 60L)">High-Speed Planetary Mixers (AB-PM80)</option>
                        <option value="Khari Pastry Mixers (100kg)">Specialty Density Khari &amp; Pastry Mixers (AB-KM100)</option>
                        <option value="Reversible Dough Sheeters">Automated Reversible Dough Sheeters (AB-DS650)</option>
                        <option value="High-Speed Industrial Slicers">Continuous Reciprocating Bread Slicers (AB-BS450)</option>
                        <option value="Proofing Chambers & Ovens">24-Trolley Automated Proofing Systems (AB-PF24)</option>
                        <option value="Turnkey Bakery Line">Complete Turnkey Bakery Production Facility</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold font-mono-tech uppercase text-slate-300 mb-1.5">
                        PRODUCTION CAPACITY &amp; LINE REQUIREMENTS
                      </label>
                      <textarea
                        rows="3"
                        value={rfqForm.message}
                        onChange={(e) => setRfqForm({ ...rfqForm, message: e.target.value })}
                        placeholder="Provide details on daily flour volume, target batch sizes, electrical utility voltages (380V/415V), and installation timeframe..."
                        className="w-full p-3.5 rounded bg-[#162235] border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#d97706] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-12 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer disabled:opacity-60"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? "Submitting Inquiry..." : "Submit Line RFQ Request"}</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
