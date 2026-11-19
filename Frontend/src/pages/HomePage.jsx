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
} from "lucide-react";
import { useApp } from "../context/AppContext";

const HomePage = () => {
  const { machinery, openQuoteModal, submitEnquiry, showToast } = useApp();

  const [rfqForm, setRfqForm] = useState({
    customerName: "",
    email: "",
    companyName: "",
    machineryModel: "Spiral Mixers (250kg / 120kg)",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

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

  return (
    <div className="w-full">
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
              <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 px-3.5 py-1.5 rounded text-[11px] font-mono-tech text-[#f59e0b] font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
                <span>NEW – NATIONAL ENGINEERING WORKS • B2B INDUSTRIAL SYSTEMS</span>
              </div>

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
                TECHNICAL SUPPORT & SLA
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
                    <span>Free Facility Layout & Space Planning Consultation</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                    <span>Tailored Starter Equipment Packages (100–500 kg/day)</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                    <span>ROI & Production Batch Feasibility Assessment</span>
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

            {/* Card 2: Find Your Exact Machinery (Highlighted Border) */}
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
                    <span>Interactive Machinery Selection Based on Dough Type & Production Output</span>
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
                <h3 className="text-xl font-bold text-[#0f172a]">Upgrade & Scale Up Operations</h3>
                <p className="text-slate-600 text-xs leading-relaxed mt-2.5">
                  Enhance production efficiency with advanced machinery, automation, and scalable solutions designed for growing manufacturing operations.
                </p>

                <div className="mt-6 bg-[#f1f6fd] rounded-lg p-4 space-y-3">
                  <div className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-wider font-semibold">
                    INDUSTRIAL CAPABILITIES:
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                    <span>Production Line Retrofits, Synchronization & High-Speed Conveyors</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                    <span>Multi-Deck Tunnel Ovens & 24-Trolley Climate-Controlled Proofers</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                    <span>Equipment Trade-In Evaluation & Turnkey Plant Expansion</span>
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
                <span>TURNKEY OEM & INDUSTRIAL SYSTEMS</span>
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
                Commercial & Industrial Production Machinery
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
                            className={`absolute top-2.5 right-2.5 text-white text-[10px] font-mono-tech font-semibold px-2.5 py-1 rounded-xs ${
                              isOrangeBadge ? "bg-[#d97706]" : "bg-[#3b526b]"
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

      {/* 6. INDUSTRIAL ADVANTAGE — WHY ENTERPRISE PLANTS TRUST APEXBAKE SYSTEMS */}
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

      {/* 7. SECTOR APPLICATIONS — INDUSTRIES POWERED BY APEXBAKE MACHINERY */}
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
            {/* Industry 1 */}
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

            {/* Industry 2 */}
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

            {/* Industry 3 (Highlighted) */}
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
                HACCP & SQF READY
              </div>
            </div>

            {/* Industry 4 */}
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

            {/* Industry 5 */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded bg-[#dce8f8] flex items-center justify-center mb-4">
                  <Utensils className="w-4 h-4 text-[#d97706]" />
                </div>
                <h3 className="text-sm font-bold text-[#0f172a]">Hospitality & Central Kitchens</h3>
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
                    <div className="text-lg font-bold text-white">+1 (312) 555–BAKE (2253)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right White Card: Quick RFQ / Specification Form */}
            <div className="lg:col-span-6">
              <div className="bg-white text-[#0f172a] rounded-xl p-7 sm:p-8 shadow-2xl">
                <h3 className="text-xl font-extrabold text-[#0f172a]">
                  Quick RFQ / Specification Form
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Receive a formal commercial proposal & engineering datasheet within 24 business hours.
                </p>

                <form onSubmit={handleRfqSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10.5px] font-mono-tech font-bold uppercase text-slate-700 mb-1">
                        YOUR FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqForm.customerName}
                        onChange={(e) =>
                          setRfqForm({ ...rfqForm, customerName: e.target.value })
                        }
                        placeholder="e.g. Robert Vance"
                        className="w-full h-10 px-3 rounded border border-slate-300 text-xs focus:outline-none focus:border-[#d97706]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10.5px] font-mono-tech font-bold uppercase text-slate-700 mb-1">
                        CORPORATE EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={rfqForm.email}
                        onChange={(e) => setRfqForm({ ...rfqForm, email: e.target.value })}
                        placeholder="robert@bakerygroup.com"
                        className="w-full h-10 px-3 rounded border border-slate-300 text-xs focus:outline-none focus:border-[#d97706]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10.5px] font-mono-tech font-bold uppercase text-slate-700 mb-1">
                        COMPANY / PLANT NAME
                      </label>
                      <input
                        type="text"
                        value={rfqForm.companyName}
                        onChange={(e) =>
                          setRfqForm({ ...rfqForm, companyName: e.target.value })
                        }
                        placeholder="e.g. Apex Continental Foods"
                        className="w-full h-10 px-3 rounded border border-slate-300 text-xs focus:outline-none focus:border-[#d97706]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10.5px] font-mono-tech font-bold uppercase text-slate-700 mb-1">
                        MACHINERY OF INTEREST
                      </label>
                      <select
                        value={rfqForm.machineryModel}
                        onChange={(e) =>
                          setRfqForm({ ...rfqForm, machineryModel: e.target.value })
                        }
                        className="w-full h-10 px-3 rounded border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#d97706]"
                      >
                        <option>Spiral Mixers (250kg / 120kg)</option>
                        <option>Planetary Mixers (80L Gear-Driven)</option>
                        <option>Khari & Laminated Pastry Mixers</option>
                        <option>Reversible Dough Sheeters (AB-DS650)</option>
                        <option>High-Speed Bread & Toast Slicers</option>
                        <option>Climate Retarder Proofer Chambers</option>
                        <option>Rotary Flour Sieving Systems</option>
                        <option>Complete Turnkey Production Line</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-mono-tech font-bold uppercase text-slate-700 mb-1">
                      TARGET PRODUCTION VOLUME & SPECS
                    </label>
                    <textarea
                      rows={3}
                      value={rfqForm.message}
                      onChange={(e) => setRfqForm({ ...rfqForm, message: e.target.value })}
                      placeholder="Describe required throughput (kg/hr or loaves/hr), facility electrical power (e.g. 480V 3-Phase 60Hz), and installation timeframe..."
                      className="w-full p-3 rounded border border-slate-300 text-xs focus:outline-none focus:border-[#d97706]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 bg-[#d97706] hover:bg-[#b45309] disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {submitting ? "SUBMITTING RFQ..." : "GET A BUSINESS QUOTE / RFQ"}
                    </span>
                  </button>

                  <div className="text-center text-[10.5px] font-mono-tech text-slate-500 flex items-center justify-center gap-1.5 pt-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span>Enterprise NDA Protected • ISO 9001:2015 Compliant Processing</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
