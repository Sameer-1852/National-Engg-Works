import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Globe,
  AlertTriangle,
  Calendar,
  Zap,
  Send,
  MessageSquare,
  Plane,
  MapPin,
  Clock,
  Building2,
  ShieldCheck,
  Ship,
  ArrowRight,
  ListChecks,
  Cpu,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const REQUEST_TYPES = [
  "New Turnkey Line Sizing",
  "Aftermarket Spares & Tooling",
  "Field Service & Commissioning",
  "Campus Tour & FAT Demo",
  "Dealership & Engineering Distribution Inquiry",
];

const ContactPage = () => {
  const { submitContact, submitEnquiry, showToast } = useApp();

  const [form, setForm] = useState({
    engineeringDiscipline: "New Turnkey Line Sizing",
    customerName: "",
    roleTitle: "",
    email: "",
    phone: "",
    companyName: "",
    facilityLocation: "",
    machineryModel: "Select Machinery System (or Multi-Section Integrated Line)",
    message: "",
    ndaRequested: false,
    sendSpecBook: true,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customerName.trim() || !form.email.trim() || !form.message.trim()) {
      showToast("Please fill in your Contact Name, Work Email, and Operational Specifications.", "error");
      return;
    }
    try {
      setSubmitting(true);
      const submitFn = submitContact || submitEnquiry;
      await submitFn({
        ...form,
        enquiryType: "Direct Engineering Inquiry",
      });
      showToast("Inquiry routed to Senior Engineering Desk! Tier-1 response guaranteed within 2 hours.");
      setForm({
        engineeringDiscipline: "New Turnkey Line Sizing",
        customerName: "",
        roleTitle: "",
        email: "",
        phone: "",
        companyName: "",
        facilityLocation: "",
        machineryModel: "Select Machinery System (or Multi-Section Integrated Line)",
        message: "",
        ndaRequested: false,
        sendSpecBook: true,
      });
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to submit inquiry.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#f4f8fd]">
      {/* Breadcrumb Bar */}
      <div className="bg-[#eef4fc] border-b border-slate-200/80 py-2.5">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tech">
          <div className="text-slate-600">
            <Link to="/" className="hover:text-slate-900">
              Home
            </Link>{" "}
            / Global Support /{" "}
            <strong className="text-[#0f172a]">Contact ApexBake Engineering</strong>
          </div>
          <div className="text-[10.5px] text-[#334e68] font-bold">
            ISO 9001:2015 AUDITED SUPPORT • 24/7 HOTLINE
          </div>
        </div>
      </div>

      {/* 1. HEADER & FORM + HOTLINE */}
      <section className="py-12 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="max-w-3xl mb-8">
            <div className="text-[11px] font-mono-tech text-[#d97706] uppercase tracking-widest font-bold">
              — GLOBAL DIRECTORY &amp; TECHNICAL INQUIRIES
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0f172a] mt-1 leading-tight">
              Connect with ApexBake
              <br />
              Engineering &amp; Global Support
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
              Whether planning a greenfield automated bakery, requesting immediate field service, ordering critical OEM spare parts, or scheduling a visit to our Chicago manufacturing campus, our technical applications engineers are ready to assist.
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              <a
                href="#inquiry-form"
                className="inline-flex items-center gap-1.5 bg-[#dce8f8] text-[#0f172a] text-xs font-bold px-3.5 py-2 rounded"
              >
                <FileText className="w-3.5 h-3.5 text-[#334e68]" />
                <span>Technical Inquiry Form</span>
              </a>
              <a
                href="#global-hubs"
                className="inline-flex items-center gap-1.5 bg-[#dce8f8] text-[#0f172a] text-xs font-bold px-3.5 py-2 rounded"
              >
                <Globe className="w-3.5 h-3.5 text-[#334e68]" />
                <span>Global Regional Hubs</span>
              </a>
              <a
                href="#hotline-box"
                className="inline-flex items-center gap-1.5 bg-[#dce8f8] text-[#0f172a] text-xs font-bold px-3.5 py-2 rounded"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-[#d97706]" />
                <span>24/7 Urgent Line Support</span>
              </a>
              <a
                href="#campus-map"
                className="inline-flex items-center gap-1.5 bg-[#dce8f8] text-[#0f172a] text-xs font-bold px-3.5 py-2 rounded"
              >
                <Calendar className="w-3.5 h-3.5 text-[#334e68]" />
                <span>Schedule Campus &amp; FAT Tour</span>
              </a>
            </div>
          </div>

          {/* 2-Column Main Inquiry Layout */}
          <div id="inquiry-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Direct Engineering & Operational Inquiry Form */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-xs">
              <div className="flex flex-wrap items-start justify-between gap-2 pb-5 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-extrabold text-[#0f172a]">
                    Direct Engineering &amp; Operational Inquiry
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Direct routing to senior applications, mechanical, and electrical engineers.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 bg-[#dce8f8] text-[#0f172a] text-[10px] font-mono-tech font-bold px-3 py-1 rounded">
                  <Zap className="w-3 h-3 text-[#334e68]" />
                  <span>TIER-1 ROUTED &lt; 2 HRS</span>
                </span>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Discipline Radios */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-[#0f172a]">
                      Select Engineering Discipline / Request Type
                    </label>
                    <span className="text-[10px] font-mono-tech text-[#334e68]">
                      MANDATORY FIELD
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {REQUEST_TYPES.map((type) => {
                      const active = form.engineeringDiscipline === type;
                      return (
                        <label
                          key={type}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                            active
                              ? "bg-[#eff5fc] border-[#d97706] font-bold text-[#0f172a]"
                              : "bg-[#f8fafc] border-slate-200 text-slate-700"
                          }`}
                        >
                          <input
                            type="radio"
                            name="discipline"
                            checked={active}
                            onChange={() =>
                              setForm({ ...form, engineeringDiscipline: type })
                            }
                            className="text-[#d97706] focus:ring-[#d97706]"
                          />
                          <span className="leading-tight">{type}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1">
                      Full Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.customerName}
                      onChange={(e) =>
                        setForm({ ...form, customerName: e.target.value })
                      }
                      placeholder="e.g. Henrik Lindqvist"
                      className="w-full h-10 px-3 rounded bg-[#eff5fc] border border-blue-100 text-xs focus:outline-none focus:border-[#d97706]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1">
                      Corporate Title / Role *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.roleTitle}
                      onChange={(e) =>
                        setForm({ ...form, roleTitle: e.target.value })
                      }
                      placeholder="e.g. Plant Director / Chief Engineer"
                      className="w-full h-10 px-3 rounded bg-[#eff5fc] border border-blue-100 text-xs focus:outline-none focus:border-[#d97706]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-[#0f172a]">
                        Work Email *
                      </label>
                      <span className="text-[9.5px] font-mono-tech text-[#334e68]">
                        ENTERPRISE DOMAIN PRIORITY
                      </span>
                    </div>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="h.lindqvist@commercialbakery.com"
                      className="w-full h-10 px-3 rounded bg-[#eff5fc] border border-blue-100 text-xs focus:outline-none focus:border-[#d97706]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1">
                      Direct Phone &amp; Country Code *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 (312) 000-0000"
                      className="w-full h-10 px-3 rounded bg-[#eff5fc] border border-blue-100 text-xs focus:outline-none focus:border-[#d97706]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1">
                      Conglomerate Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.companyName}
                      onChange={(e) =>
                        setForm({ ...form, companyName: e.target.value })
                      }
                      placeholder="e.g. Continental Food Group"
                      className="w-full h-10 px-3 rounded bg-[#eff5fc] border border-blue-100 text-xs focus:outline-none focus:border-[#d97706]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1">
                      Facility Location &amp; Target Port
                    </label>
                    <input
                      type="text"
                      value={form.facilityLocation}
                      onChange={(e) =>
                        setForm({ ...form, facilityLocation: e.target.value })
                      }
                      placeholder="e.g. Rotterdam, Netherlands (Port of RTM)"
                      className="w-full h-10 px-3 rounded bg-[#eff5fc] border border-blue-100 text-xs focus:outline-none focus:border-[#d97706]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1">
                    Machinery System of Reference (Optional)
                  </label>
                  <select
                    value={form.machineryModel}
                    onChange={(e) =>
                      setForm({ ...form, machineryModel: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded bg-[#eff5fc] border border-blue-100 text-xs font-medium"
                  >
                    <option>
                      Select Machinery System (or Multi-Section Integrated Line)
                    </option>
                    <option>AB-SM250S — Industrial Spiral Mixer (Stainless Steel)</option>
                    <option>AB-SM130 — Commercial Spiral Mixer</option>
                    <option>AB-PM80 — Industrial Planetary Mixer</option>
                    <option>AB-KM100 — Heavy-Density Khari Mixer</option>
                    <option>AB-DS650 — Reversible Precision Dough Sheeter</option>
                    <option>AB-BS450 — High-Speed Bread Slicer</option>
                    <option>AB-TS300 — Continuous Toast Slicer</option>
                    <option>AB-PF24 — Precision Climate Proofer Chamber</option>
                    <option>AB-FS500 — Rotary Flour Sieving Machine</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1">
                    Detailed Inquiry / Operational Specifications *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Please detail target batch volume (kg/hr), dough hydration/viscosity, daily operating cycles, line integration parameters, or existing machinery serial numbers for spare parts."
                    className="w-full p-3 rounded bg-[#eff5fc] border border-blue-100 text-xs focus:outline-none focus:border-[#d97706]"
                  />
                  <div className="text-[10px] font-mono-tech text-slate-500 mt-1">
                    Accepted documentation formats (PDF, STEP, DWG) can be attached upon confirmation email acknowledgment.
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.ndaRequested}
                      onChange={(e) =>
                        setForm({ ...form, ndaRequested: e.target.checked })
                      }
                      className="mt-0.5 rounded border-slate-300 text-[#d97706]"
                    />
                    <span>
                      Request confidential <strong>Non-Disclosure Agreement (NDA)</strong> countersigned prior to proprietary factory layout or CAD exchange.
                    </span>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.sendSpecBook}
                      onChange={(e) =>
                        setForm({ ...form, sendSpecBook: e.target.checked })
                      }
                      className="mt-0.5 rounded border-slate-300 text-[#d97706]"
                    />
                    <span>
                      Send electronic copy of the <strong>2024 ApexBake Industrial Machinery Spec Book</strong> (18MB Engineering PDF).
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded inline-flex items-center gap-2 shadow-md transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {submitting
                      ? "ROUTING TO ENGINEERING DESK..."
                      : "SUBMIT INQUIRY TO ENGINEERING DESK"}
                  </span>
                </button>
              </form>
            </div>

            {/* Right 4 Cols: 24/7 Breakdown Hotline & OEM Parts Express Dispatch */}
            <div id="hotline-box" className="lg:col-span-4 space-y-6">
              {/* Dark Navy Breakdown Hotline */}
              <div className="bg-[#0d1829] text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                    <h3 className="text-base font-extrabold text-white">
                      24/7 Breakdown Hotline
                    </h3>
                  </div>
                  <span className="bg-amber-950 text-[#f59e0b] border border-amber-700/60 text-[9.5px] font-mono-tech font-bold px-2 py-0.5 rounded">
                    PRIORITY P1
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Immediate telephone triage for unplanned line stoppages, servo drive anomalies, and PLC diagnostic alarms.
                </p>

                <div className="space-y-2.5 font-mono-tech">
                  <div className="bg-[#162235] rounded-lg p-3.5 border border-slate-700/80 flex items-center justify-between">
                    <div>
                      <div className="text-[9.5px] text-slate-400 uppercase">
                        AMERICAS EMERGENCY HOTLINE:
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        +1 (800) 492-7325
                      </div>
                    </div>
                    <span className="bg-amber-900/50 text-[#f59e0b] text-[9px] px-2 py-0.5 rounded">
                      TOLL FREE
                    </span>
                  </div>

                  <div className="bg-[#162235] rounded-lg p-3.5 border border-slate-700/80">
                    <div className="text-[9.5px] text-slate-400 uppercase">
                      EMEA EMERGENCY DISPATCH (FRANKFURT):
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      +49 69 900 120
                    </div>
                  </div>

                  <div className="bg-[#162235] rounded-lg p-3.5 border border-slate-700/80">
                    <div className="text-[9.5px] text-slate-400 uppercase">
                      APAC URGENT SUPPORT (SINGAPORE):
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      +65 6712 8800
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/13125552253"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full h-11 bg-[#10b981] hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WHATSAPP DISPATCH</span>
                </a>

                <div className="text-center text-[10px] font-mono-tech text-slate-400">
                  SLA: Senior mechanical/PLC engineer connected within 15 mins.
                </div>
              </div>

              {/* OEM Parts Express Dispatch */}
              <div className="bg-[#eff5fc] rounded-2xl p-6 border border-blue-200/80 space-y-3">
                <div className="flex items-center gap-2 text-sm font-extrabold text-[#0f172a]">
                  <Plane className="w-4 h-4 text-[#334e68]" />
                  <span>OEM Parts Express Dispatch</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Centralized warehouse stockpiles in Chicago and Frankfurt with 24-48hr global air courier dispatch for critical components.
                </p>
                <div className="bg-white rounded-lg p-3.5 border border-slate-200 font-mono-tech text-xs">
                  <div className="text-[10px] text-[#334e68] uppercase">
                    DIRECT PARTS DESK:
                  </div>
                  <div className="font-bold text-[#0f172a] mt-0.5">
                    parts@apexbake-industrial.com
                  </div>
                  <div className="text-[10.5px] text-slate-500 mt-1">
                    Drive belts, planetary seals, heating coils &amp; PLC cards.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WORLDWIDE FACILITIES & ENGINEERING HUBS */}
      <section id="global-hubs" className="py-16 bg-[#eef4fc] border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-[11px] font-mono-tech text-[#d97706] uppercase tracking-widest font-bold">
                — GLOBAL FOOTPRINT
              </div>
              <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1">
                Worldwide Facilities &amp; Engineering Hubs
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Strategically located heavy production plants, testing centers, and regional spare parts depots servicing commercial bakeries across 45+ countries.
              </p>
            </div>

            <span className="bg-[#dce8f8] text-[#0f172a] text-[10.5px] font-mono-tech font-bold px-3.5 py-1.5 rounded shrink-0">
              3 PRIMARY HUBS • 45+ COUNTRIES
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {/* Hub 1: Chicago */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 border-t-4 border-t-[#d97706] shadow-2xs flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono-tech">
                  <span className="bg-amber-100 text-[#d97706] font-bold px-2.5 py-0.5 rounded">
                    PRIMARY CAMPUS
                  </span>
                  <span className="text-slate-500">AMER REGION</span>
                </div>
                <h3 className="text-lg font-extrabold text-[#0f172a] mt-3">
                  Chicago Manufacturing Campus
                </h3>
                <div className="text-xs text-slate-500">
                  Heavy Fabrication &amp; Engineering HQ
                </div>

                <div className="space-y-2.5 mt-4 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#334e68] shrink-0 mt-0.5" />
                    <span>
                      4800 Industrial Parkway, Sector 9, Chicago, IL 60638, USA
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-[#334e68] shrink-0 mt-0.5" />
                    <span>
                      Core Assembly, CNC Lasers, Automated Spiral Welds, Pre-Shipment FAT Bays
                    </span>
                  </div>
                  <div className="flex items-start gap-2 font-mono-tech text-[11px]">
                    <Clock className="w-4 h-4 text-[#334e68] shrink-0 mt-0.5" />
                    <span>Mon-Fri: 07:00 - 18:00 CST (Emergency: 24/7)</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1 text-xs font-mono-tech">
                <div className="flex justify-between">
                  <span className="text-slate-500">Direct:</span>
                  <strong className="text-[#0f172a]">+1 (312) 555-0198</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Desk:</span>
                  <strong className="text-[#0f172a]">chicago-hq@apexbake.com</strong>
                </div>
              </div>
            </div>

            {/* Hub 2: Frankfurt */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 border-t-4 border-t-[#334e68] shadow-2xs flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono-tech">
                  <span className="bg-[#dce8f8] text-[#0f172a] font-bold px-2.5 py-0.5 rounded">
                    TECH &amp; SPARES DEPOT
                  </span>
                  <span className="text-slate-500">EMEA REGION</span>
                </div>
                <h3 className="text-lg font-extrabold text-[#0f172a] mt-3">
                  Frankfurt Regional Hub
                </h3>
                <div className="text-xs text-slate-500">
                  European Technical Operations
                </div>

                <div className="space-y-2.5 mt-4 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#334e68] shrink-0 mt-0.5" />
                    <span>
                      Industriestraße 42, 60314 Frankfurt am Main, Germany
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-[#334e68] shrink-0 mt-0.5" />
                    <span>
                      CE &amp; EHEDG Compliance Center, Central European Spares, Field Service Fleet
                    </span>
                  </div>
                  <div className="flex items-start gap-2 font-mono-tech text-[11px]">
                    <Clock className="w-4 h-4 text-[#334e68] shrink-0 mt-0.5" />
                    <span>Mon-Fri: 08:00 - 17:30 CET</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1 text-xs font-mono-tech">
                <div className="flex justify-between">
                  <span className="text-slate-500">Direct:</span>
                  <strong className="text-[#0f172a]">+49 69 900 120</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Desk:</span>
                  <strong className="text-[#0f172a]">emea-hub@apexbake.com</strong>
                </div>
              </div>
            </div>

            {/* Hub 3: Singapore */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 border-t-4 border-t-[#0d1829] shadow-2xs flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono-tech">
                  <span className="bg-[#dce8f8] text-[#0f172a] font-bold px-2.5 py-0.5 rounded">
                    LOGISTICS &amp; FIELD SERVICE
                  </span>
                  <span className="text-slate-500">APAC REGION</span>
                </div>
                <h3 className="text-lg font-extrabold text-[#0f172a] mt-3">
                  Singapore Logistics Office
                </h3>
                <div className="text-xs text-slate-500">
                  Asia-Pacific Commissioning Command
                </div>

                <div className="space-y-2.5 mt-4 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#334e68] shrink-0 mt-0.5" />
                    <span>
                      12 Marina Blvd, MBFC Tower 3, Singapore 018982
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-[#334e68] shrink-0 mt-0.5" />
                    <span>
                      Southeast Asia &amp; Australasia Technical Commissioning, Rapid Diagnostics
                    </span>
                  </div>
                  <div className="flex items-start gap-2 font-mono-tech text-[11px]">
                    <Clock className="w-4 h-4 text-[#334e68] shrink-0 mt-0.5" />
                    <span>Mon-Fri: 08:30 - 18:00 SGT</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1 text-xs font-mono-tech">
                <div className="flex justify-between">
                  <span className="text-slate-500">Direct:</span>
                  <strong className="text-[#0f172a]">+65 6712 8800</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Desk:</span>
                  <strong className="text-[#0f172a]">apac-service@apexbake.com</strong>
                </div>
              </div>
            </div>
          </div>

          {/* 3. CHICAGO MANUFACTURING CAMPUS BLUEPRINT & TRANSIT */}
          <div
            id="campus-map"
            className="mt-12 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs"
          >
            <div className="p-6 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100">
              <div>
                <div className="text-[10px] font-mono-tech text-[#334e68] uppercase font-bold">
                  FACILITY LOGISTICS &amp; ACCESS
                </div>
                <h3 className="text-xl font-extrabold text-[#0f172a] mt-0.5">
                  Chicago Manufacturing Campus Blueprint &amp; Transit
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 text-[10.5px] font-mono-tech text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>SECURITY GATE 2 OPEN • PPE CLEARANCE REQUIRED</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 bg-slate-100">
                <img
                  src="/images/contact-map.png"
                  alt="Chicago Manufacturing Campus Map"
                  className="w-full h-full object-cover block"
                />
              </div>

              <div className="lg:col-span-5 bg-[#eff5fc] p-7 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <h4 className="text-sm font-extrabold text-[#0f172a]">
                    Campus Arrival Specifications
                  </h4>

                  <div className="flex items-start gap-2.5 text-xs">
                    <Plane className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#0f172a]">Airport Proximity</div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">
                        22 minutes (16.4 miles) from Chicago O'Hare International (ORD); 14 mins from Midway (MDW). Corporate shuttle available upon advance FAT notice.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <Ship className="w-4 h-4 text-[#334e68] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#0f172a]">
                        Freight &amp; Container Ports
                      </div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">
                        Direct access to Illinois International Port District (Calumet Harbor) and direct Class 1 BNSF / Union Pacific rail loading sidings.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <ShieldCheck className="w-4 h-4 text-[#334e68] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#0f172a]">
                        Visitor Safety Protocol
                      </div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">
                        Steel-toe safety shoes, hi-vis vest, and safety glasses mandated on manufacturing floor. Temporary gear and visitor badges provided at Gate 2 reception.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3.5 border border-slate-200 flex items-center justify-between text-xs font-mono-tech">
                  <span className="font-bold text-[#0f172a]">
                    ITAR &amp; OSHA 1910 Compliant
                  </span>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#d97706] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Get Gate 2 Directions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ANSWERED TECHNICAL QUESTIONS */}
      <section className="py-16 bg-[#f4f8fd]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="max-w-xl mb-10">
            <div className="text-[11px] font-mono-tech text-[#d97706] uppercase tracking-widest font-bold">
              — PROTOCOL &amp; SLA GUIDELINES
            </div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1">
              Frequently Answered Technical Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Guidelines regarding factory acceptance trials, emergency dispatch SLAs, and proprietary automation line integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200/90 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <ListChecks className="w-4 h-4 text-[#334e68] shrink-0 mt-1" />
                <h3 className="text-sm font-extrabold text-[#0f172a]">
                  What information should I prepare before contacting engineering?
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                For rapid turnkey sizing, please have your desired production throughput (loaves, buns, or kg/hr), dough formulation hydration percentages, facility electrical specifications (voltage, frequency, phase), and floor ceiling clearances ready.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200/90 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#d97706] shrink-0 mt-1" />
                <h3 className="text-sm font-extrabold text-[#0f172a]">
                  How quickly can a field technician deploy for emergency on–site service?
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                For critical unplanned downtime, North American and Western European locations receive on-site flight-deployed field service engineers within 12–24 hours. APAC clients are serviced within 18–36 hours from our Singapore command hub.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200/90 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#334e68] shrink-0 mt-1" />
                <h3 className="text-sm font-extrabold text-[#0f172a]">
                  Can our engineering team inspect equipment during pre–shipment FAT?
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                Yes. Every industrial machinery system undergoes rigorous Factory Acceptance Testing (FAT) in Chicago. Your engineering team is invited to run live batch trials with your actual flour raw materials before crating and export packaging.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200/90 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <Cpu className="w-4 h-4 text-[#334e68] shrink-0 mt-1" />
                <h3 className="text-sm font-extrabold text-[#0f172a]">
                  Do you provide direct engineering for Siemens or Allen–Bradley integration?
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                All ApexBake machinery is engineered on open-architecture Rockwell Automation (Allen-Bradley) ControlLogix or Siemens S7-1500 platforms with PackML compliance, allowing native SCADA/MES connectivity out-of-the-box.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
