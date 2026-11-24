import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Store,
  Compass,
  FlaskConical,
  Truck,
  Croissant,
  TrendingUp,
  Sliders,
  ArrowRight,
  Info,
  Lock,
  Users,
  Phone,
  MessageSquare,
  ClipboardList,
  Send,
  HelpCircle,
  X,
  User,
  Mail,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const STARTUP_PROFILES = [
  {
    code: "PROFILE A // HIGH-VALUE ARTISAN",
    outputLabel: "200 – 600\nkg/day",
    title: "Artisan Sourdough & Crusty Rustic Breads",
    description:
      "Designed for high-hydration sourdough formulas (72–84%), extended cold-retardation, and stone-baked blistered crusts.",
    minFootprint: "1,200 sq ft",
    powerSupply: "3-Phase 40A",
    dailyCapacity: "~450 Loaves",
    leadTime: "8 Weeks",
    machines: [
      { name: "AB-SM130 Spiral", sub: "130kg bowl, dual timer" },
      { name: "AB-RP20 Retarder", sub: "2-door, 40-tray controlled" },
      { name: "AB-DK4 Modular", sub: "4-Deck stone hearth oven" },
    ],
  },
  {
    code: "PROFILE B // WHOLESALE COMMISSARY",
    outputLabel: "800 – 2,500\nloaves/shift",
    title: "Commercial Sandwich Bread & Buns",
    description:
      "Engineered for continuous institutional loaves, soft hamburger buns, and uniform pan-baked sliced products for grocery chains.",
    minFootprint: "2,800 sq ft",
    powerSupply: "3-Phase 80A",
    dailyCapacity: "~2,500 Loaves",
    leadTime: "10 Weeks",
    machines: [
      { name: "AB-SM250S Heavy", sub: "Hydraulic tilt-over mixer" },
      { name: "AB-VD600 Divider", sub: "Oil-free precision rounder" },
      { name: "AB-TS300 Toast Slicer", sub: "High-speed blade matrix" },
    ],
  },
  {
    code: "PROFILE C // HIGH-MARGIN PASTRY",
    outputLabel: "1,500 – 4,000\nunits/shift",
    title: "Laminated Pastry, Croissant & Viennoiserie",
    description:
      "Precise dough-butter layer preservation. Calibrated micro-thickness reduction without tearing delicate laminated butter sheets.",
    minFootprint: "1,800 sq ft",
    powerSupply: "3-Phase 50A",
    dailyCapacity: "~3,500 Croissants",
    leadTime: "8 Weeks",
    machines: [
      { name: "AB-DS650 Reversible", sub: "Digital motorized gap roller" },
      { name: "AB-PM80 Planetary", sub: "80L cream & brioche mixer" },
      { name: "AB-BF20 Shock Freezer", sub: "-40°C blast preservation" },
    ],
  },
  {
    code: "PROFILE D // ETHNIC & FLATBREAD",
    outputLabel: "500 – 1,500\nkg/day",
    title: "Flatbread, Pita, Lavash & Pizza Bases",
    description:
      "High-throughput rolling, sheeting, and continuous direct-flame or high-heat radiant tunnel baking for thin unleavened doughs.",
    minFootprint: "2,400 sq ft",
    powerSupply: "3-Phase 70A + Gas",
    dailyCapacity: "~6,000 Pitas/day",
    leadTime: "12 Weeks",
    machines: [
      { name: "AB-KM100 Mixer", sub: "Heavy stiff-dough dual arm" },
      { name: "AB-FS500 Rotary", sub: "Continuous flour sifter & feed" },
      { name: "AB-TO8 Tunnel", sub: "8m gas high-temp tunnel" },
    ],
  },
];

const StartBusinessPage = () => {
  const { submitEnquiry, bookOneOnOneSession, showToast } = useApp();
  const formRef = useRef(null);

  // Book 1-on-1 Free Session Form State
  const [sessionForm, setSessionForm] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isSubmittingSession, setIsSubmittingSession] = useState(false);
  const [sessionSuccess, setSessionSuccess] = useState(false);

  const handleBookSessionSubmit = async (e) => {
    e.preventDefault();
    if (!sessionForm.name.trim() || !sessionForm.phone.trim() || !sessionForm.email.trim()) {
      showToast("Please provide your Name, Mobile Number, and Email.", "error");
      return;
    }

    try {
      setIsSubmittingSession(true);
      await bookOneOnOneSession({
        name: sessionForm.name.trim(),
        phone: sessionForm.phone.trim(),
        email: sessionForm.email.trim(),
      });
      setSessionSuccess(true);
      showToast("Your 1-on-1 Free Session has been booked and saved in MongoDB!");
      setTimeout(() => {
        setSessionForm({ name: "", phone: "", email: "" });
        setSessionSuccess(false);
        setIsSessionModalOpen(false);
      }, 3000);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to book session. Please try again.", "error");
    } finally {
      setIsSubmittingSession(false);
    }
  };

  // Interactive Quick Bakery Utility Sizing Calculator State
  const [calcProduct, setCalcProduct] = useState("Artisan Sourdough & Rustic Bread");
  const [calcOutput, setCalcOutput] = useState("400 – 800 kg / day");
  const [calcSpace, setCalcSpace] = useState("1,800 – 3,500 sq ft");
  const [calcDate, setCalcDate] = useState("Standard (60–90 Days)");

  // Dynamic Calculator Results
  const getCalculatorOutput = () => {
    if (calcProduct.includes("Sandwich")) {
      return {
        load: "72 kW / 110A",
        units: "5 Machines",
        oven: "Rotary Rack + Proofer",
        mixer: "250 kg Spiral",
      };
    }
    if (calcProduct.includes("Pastry") || calcProduct.includes("Croissant")) {
      return {
        load: "54 kW / 85A",
        units: "4 Machines",
        oven: "Convection 10-Tray",
        mixer: "80L Planetary + Sheeter",
      };
    }
    if (calcProduct.includes("Flatbread") || calcProduct.includes("Pizza")) {
      return {
        load: "64 kW / 95A",
        units: "4 Machines",
        oven: "8m Gas Tunnel Oven",
        mixer: "100 kg Khari / Stiff",
      };
    }
    return {
      load: "48 kW / 75A",
      units: "4 Machines",
      oven: "Stone Deck 4–Chamber",
      mixer: "130 kg Spiral",
    };
  };

  const calcResult = getCalculatorOutput();

  // Advisory Form State
  const [intakeForm, setIntakeForm] = useState({
    customerName: "",
    companyName: "",
    email: "",
    phone: "",
    facilityLocation: "",
    targetOutput: "500 – 1,500 kg / day",
    message: "",
    ndaRequested: true,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleConfigurePath = (profile) => {
    const suiteText = profile.machines.map((m) => m.name).join(" + ");
    setIntakeForm((prev) => ({
      ...prev,
      targetOutput: profile.outputLabel.replace("\n", " "),
      message: `Selected Startup Profile: ${profile.title} (${profile.code}). Recommended Suite: ${suiteText}. Minimum Footprint: ${profile.minFootprint}, Power: ${profile.powerSupply}.`,
    }));
    showToast(`Populated consultation brief with ${profile.title}!`);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTransferCalculator = () => {
    setIntakeForm((prev) => ({
      ...prev,
      targetOutput: calcOutput,
      message: `Utility Sizing Calculator Assessment — Product: ${calcProduct}, Output: ${calcOutput}, Floor Space: ${calcSpace}, Target Launch: ${calcDate}. Estimated 3-Phase Load: ${calcResult.load}, Core Units: ${calcResult.units}, Recommended Oven: ${calcResult.oven}, Est. Mixer: ${calcResult.mixer}.`,
    }));
    showToast("Transferred utility sizing assessment to Advisory Intake Form!");
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleIntakeSubmit = async (e) => {
    e.preventDefault();
    if (!intakeForm.customerName.trim() || !intakeForm.email.trim()) {
      showToast("Please fill in your Full Name and Work Email.", "error");
      return;
    }
    try {
      setSubmitting(true);
      await submitEnquiry({
        ...intakeForm,
        enquiryType: "Startup Venture Advisory",
      });
      showToast("Sizing brief submitted! A Senior Systems Engineer will contact you within 2 hours.");
      setIntakeForm({
        customerName: "",
        companyName: "",
        email: "",
        phone: "",
        facilityLocation: "",
        targetOutput: "500 – 1,500 kg / day",
        message: "",
        ndaRequested: true,
      });
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to submit advisory brief.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white">
      {/* 1. HERO SECTION */}
      <section className="py-10 lg:py-14 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          {/* Breadcrumb */}
          <div className="text-xs font-mono-tech text-slate-500 flex items-center gap-1.5 mb-5">
            <Link to="/" className="hover:text-slate-900">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-[#334e68]">Solutions</span>
            <span>&gt;</span>
            <span className="text-slate-900 font-semibold">
              Start Your Business &amp; Advisory
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-[#eff5fc] border border-blue-200/80 px-3 py-1 rounded text-[10.5px] font-mono-tech text-[#0f172a] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#d97706]" />
                <span>
                  // STAGE 01 // VENTURE ONBOARDING &amp; COMMISSARY ADVISORY // ZERO-OBLIGATION CONSULTATION
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0f172a] leading-[1.15]">
                Start Your Bakery Business: Expert
                <br />
                Guidance on Products, Opportunities &amp;
                <br />
                Machinery
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Turning commercial baking concepts into profitable, compliant, and high-throughput realities. We partner with culinary entrepreneurs, regional commissary planners, and business investors to evaluate product viability, calculate utility sizing, and select the right machinery from day one.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsSessionModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded shadow-sm transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK 1–ON–1 SESSION FREE</span>
                </button>
              </div>
            </div>

            {/* Right 5 Columns: Consultation Desk Box */}
            <div className="lg:col-span-5">
              <div className="bg-[#eff5fc] rounded-xl p-6 border border-blue-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono-tech text-[#334e68] uppercase font-semibold">
                    CONSULTATION DESK
                  </span>
                  <span className="bg-[#dce8f8] text-[#0f172a] text-[10px] font-mono-tech font-bold px-2.5 py-0.5 rounded">
                    SLOTS OPEN TODAY
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-[#0f172a]">
                  Meet with a Senior Systems Engineer
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Avoid costly CapEx mistakes. We verify recipe hydration levels, daily volume throughput, and facility 3-phase drops prior to issuing machine quotes.
                </p>

                <div className="space-y-2 pt-1 text-xs font-mono-tech text-[#334e68]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#d97706]" />
                    <span>Avg Response Speed: &lt; 2 Hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d97706]" />
                    <span>ASME &amp; EHEDG Certified Advisory Staff</span>
                  </div>
                </div>

                {/* <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSessionModalOpen(true)}
                    className="w-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>BOOK 1–ON–1 SESSION FREE</span>
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          {/* 4 Metric Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            <div className="bg-[#eff5fc] rounded-xl p-5 border border-blue-100 flex items-center gap-4">
              <Store className="w-6 h-6 text-[#d97706] shrink-0" />
              <div>
                <div className="text-2xl font-extrabold text-[#0f172a]">350+</div>
                <div className="text-xs text-slate-600">New Bakeries Launched</div>
              </div>
            </div>

            <div className="bg-[#eff5fc] rounded-xl p-5 border border-blue-100 flex items-center gap-4">
              <Compass className="w-6 h-6 text-[#d97706] shrink-0" />
              <div>
                <div className="text-2xl font-extrabold text-[#0f172a]">100% Free</div>
                <div className="text-xs text-slate-600">2D CAD &amp; Utility Layouts</div>
              </div>
            </div>

            <div className="bg-[#eff5fc] rounded-xl p-5 border border-blue-100 flex items-center gap-4">
              <FlaskConical className="w-6 h-6 text-[#d97706] shrink-0" />
              <div>
                <div className="text-2xl font-extrabold text-[#0f172a]">Guaranteed</div>
                <div className="text-xs text-slate-600">Rheology &amp; Hydration Match</div>
              </div>
            </div>

            <div className="bg-[#eff5fc] rounded-xl p-5 border border-blue-100 flex items-center gap-4">
              <Truck className="w-6 h-6 text-[#d97706] shrink-0" />
              <div>
                <div className="text-2xl font-extrabold text-[#0f172a]">60–90 Days</div>
                <div className="text-xs text-slate-600">Turnkey Staged Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE CRITICAL PILLARS OF A SUCCESSFUL COMMERCIAL BAKERY LAUNCH */}
      <section className="bg-[#f4f8fd] py-16 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-10">
            <div className="text-[11px] font-mono-tech text-[#334e68] uppercase tracking-widest">
              // THE ADVISORY FOUNDATION
            </div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1 leading-tight">
              Three Critical Pillars of a Successful Commercial
              <br />
              Bakery Launch
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
              Over 68% of commercial bakery failures originate from improper machine sizing, mismatched hydration capabilities, or under-engineered utility drops. Our engineering team addresses each vector systematically before you purchase any equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
            {/* Pillar 1 */}
            <div className="bg-white rounded-xl p-7 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded bg-[#dce8f8] flex items-center justify-center mb-3">
                  <Croissant className="w-5 h-5 text-[#d97706]" />
                </div>
                <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                  PILLAR 01
                </div>
                <h3 className="text-lg font-extrabold text-[#0f172a] mt-1">
                  1. Choosing the Right Bakery Products &amp; Recipes
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  We analyze dough rheology, target shelf-life, crust hardness, crumb aeration, and unit margin profiles to establish the ideal SKU lineup.
                </p>

                <div className="space-y-3 mt-5 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                    <span>
                      <strong>Hydration Profiling:</strong> Exact mixer bowl speed adaptation for low (55%) to ultra-high (82%+) hydration artisan formulations.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                    <span>
                      <strong>Fermentation Timelines:</strong> Sizing proofing chambers and retarder systems for cold-ferment vs. rapid commercial bread yeasts.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                    <span>
                      <strong>Portioning Tolerances:</strong> Precision volumetric divider recommendations to limit raw material giveaway to under 1.5 grams/unit.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-[#eff5fc] rounded-lg p-3 flex items-center justify-between text-[11px] font-mono-tech">
                <span className="text-slate-500">KEY SKUS:</span>
                <span className="font-bold text-[#0f172a]">
                  Artisan / Pullman / Buns / Croissants
                </span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-xl p-7 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded bg-[#dce8f8] flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5 text-[#d97706]" />
                </div>
                <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                  PILLAR 02
                </div>
                <h3 className="text-lg font-extrabold text-[#0f172a] mt-1">
                  2. Evaluating Market Opportunities &amp; Business Models
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Every production setup must align with your distribution channel: local retail storefront, hub-and-spoke satellite delivery, or automated wholesale contracts.
                </p>

                <div className="space-y-3 mt-5 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                    <span>
                      <strong>Wholesale vs. Commissary:</strong> Evaluating high-volume blast freezing requirements vs. daily fresh dispatch schedules.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                    <span>
                      <strong>CapEx Break-Even Modeling:</strong> Projecting daily kilograms needed to cover commercial lease, payroll, and power inputs.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                    <span>
                      <strong>Labor Reduction Ratios:</strong> Automated divider-rounders &amp; reversible sheeters that replace 3.5 manual labor shifts.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-[#eff5fc] rounded-lg p-3 flex items-center justify-between text-[11px] font-mono-tech">
                <span className="text-slate-500">FINANCIAL TARGET:</span>
                <span className="font-bold text-[#0f172a]">
                  14-22 Month CapEx Recapture
                </span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-xl p-7 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded bg-[#dce8f8] flex items-center justify-center mb-3">
                  <Sliders className="w-5 h-5 text-[#d97706]" />
                </div>
                <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                  PILLAR 03
                </div>
                <h3 className="text-lg font-extrabold text-[#0f172a] mt-1">
                  3. Precision Machinery &amp; Utility Sizing
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Machinery footprint is only half the equation. We calculate industrial phase amp requirements, water softeners, ventilation CFM, and floor loads.
                </p>

                <div className="space-y-3 mt-5 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                    <span>
                      <strong>Starter Machinery Configuration:</strong> Dual-speed spiral mixers (AB-SM series), heavy reversible sheeters, and deck chambers.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                    <span>
                      <strong>Electrical &amp; Utility Sizing:</strong> Calculating 208V, 380V or 480V 3-phase amperage, steam injection bar ratings, and floor PSI.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                    <span>
                      <strong>Sanitary Compliance:</strong> NSF/ANSI 8 sanitation, EHEDG hygienic washdown protocols, CE marking, and OSHA safety interlocks.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-[#eff5fc] rounded-lg p-3 flex items-center justify-between text-[11px] font-mono-tech">
                <span className="text-slate-500">COMPLIANCE:</span>
                <span className="font-bold text-[#0f172a]">
                  NSF • EHEDG • CE • ASME
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMMERCIAL STARTUP PROFILES & MACHINERY SUITES */}
      <section className="bg-[#eef4fc] py-16 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-[11px] font-mono-tech text-[#334e68] uppercase tracking-widest">
                // TURNKEY MACHINERY COMBINATIONS
              </div>
              <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1 leading-tight">
                Commercial Startup Profiles &amp; Machinery
                <br />
                Suites
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl">
                Explore 4 pre-engineered machinery paths mapped to specific daily output thresholds. Select any profile to automatically populate your consultation brief.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg px-4 py-2.5 inline-flex items-center gap-2 text-xs font-mono-tech text-[#334e68] shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#d97706]" />
              <span>Tested for 24/7 continuous industrial duty cycle</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {STARTUP_PROFILES.map((prof, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-7 border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-5"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-block bg-[#dce8f8] text-[#0f172a] text-[10px] font-mono-tech font-bold px-2.5 py-1 rounded">
                        {prof.code}
                      </span>
                      <h3 className="text-xl font-extrabold text-[#0f172a] mt-2.5 leading-snug">
                        {prof.title}
                      </h3>
                    </div>
                    <div className="text-right font-mono-tech text-xs font-bold text-[#d97706] whitespace-pre-line shrink-0">
                      {prof.outputLabel}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {prof.description}
                  </p>

                  {/* 3 Metric Bar */}
                  <div className="grid grid-cols-3 gap-2 bg-[#eff5fc] rounded-lg p-3 mt-4 text-xs">
                    <div>
                      <div className="text-[9.5px] font-mono-tech text-slate-500 uppercase">
                        MIN FOOTPRINT
                      </div>
                      <div className="font-mono-tech font-bold text-[#0f172a]">
                        {prof.minFootprint}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9.5px] font-mono-tech text-slate-500 uppercase">
                        POWER SUPPLY
                      </div>
                      <div className="font-mono-tech font-bold text-[#0f172a]">
                        {prof.powerSupply}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9.5px] font-mono-tech text-slate-500 uppercase">
                        DAILY CAPACITY
                      </div>
                      <div className="font-mono-tech font-bold text-[#0f172a]">
                        {prof.dailyCapacity}
                      </div>
                    </div>
                  </div>

                  {/* Recommended Machinery Suite */}
                  <div className="mt-4">
                    <div className="text-[10px] font-mono-tech text-slate-500 uppercase mb-2">
                      RECOMMENDED MACHINERY SUITE:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {prof.machines.map((m, i) => (
                        <div key={i} className="bg-[#dce8f8] rounded p-2.5">
                          <div className="text-xs font-bold text-[#0f172a]">{m.name}</div>
                          <div className="text-[10px] text-slate-600 mt-0.5">{m.sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono-tech text-slate-500">
                    Turnkey Lead Time: <strong className="text-slate-700">{prof.leadTime}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleConfigurePath(prof)}
                    className="inline-flex items-center gap-1.5 bg-[#0d1829] hover:bg-slate-800 text-white font-mono-tech font-bold text-[11px] uppercase px-4 py-2.5 rounded transition-colors cursor-pointer"
                  >
                    <span>CONFIGURE THIS PATH</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 4. QUICK BAKERY UTILITY SIZING CALCULATOR */}
          <div className="mt-14 bg-[#0d1829] text-white rounded-2xl p-7 sm:p-10 shadow-xl border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left 7 Cols */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="text-[11px] font-mono-tech text-[#f59e0b] uppercase tracking-widest">
                    // ESTIMATION ENGINE
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Quick Bakery Utility Sizing Calculator
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                    Select your intended production metrics to immediately estimate required 3-phase electrical load, floor space requirements, and starter machinery count.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[10px] font-mono-tech text-slate-400 uppercase mb-1.5">
                      PRIMARY PRODUCT TYPE
                    </label>
                    <select
                      value={calcProduct}
                      onChange={(e) => setCalcProduct(e.target.value)}
                      className="w-full h-11 px-3 rounded bg-white text-[#0f172a] text-xs font-semibold"
                    >
                      <option>Artisan Sourdough &amp; Rustic Bread</option>
                      <option>Commercial Sandwich Bread &amp; Buns</option>
                      <option>Laminated Pastry &amp; Croissants</option>
                      <option>Flatbread, Pita &amp; Pizza Bases</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono-tech text-slate-400 uppercase mb-1.5">
                      PLANNED DAILY OUTPUT (KG DOUGH)
                    </label>
                    <select
                      value={calcOutput}
                      onChange={(e) => setCalcOutput(e.target.value)}
                      className="w-full h-11 px-3 rounded bg-white text-[#0f172a] text-xs font-semibold"
                    >
                      <option>200 – 400 kg / day</option>
                      <option>400 – 800 kg / day</option>
                      <option>800 – 2,000 kg / day</option>
                      <option>2,500+ kg / day (Industrial)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono-tech text-slate-400 uppercase mb-1.5">
                      AVAILABLE FLOOR SPACE
                    </label>
                    <select
                      value={calcSpace}
                      onChange={(e) => setCalcSpace(e.target.value)}
                      className="w-full h-11 px-3 rounded bg-white text-[#0f172a] text-xs font-semibold"
                    >
                      <option>1,000 – 1,800 sq ft</option>
                      <option>1,800 – 3,500 sq ft</option>
                      <option>3,500 – 7,000 sq ft</option>
                      <option>7,000+ sq ft</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono-tech text-slate-400 uppercase mb-1.5">
                      TARGET COMMISSIONING DATE
                    </label>
                    <select
                      value={calcDate}
                      onChange={(e) => setCalcDate(e.target.value)}
                      className="w-full h-11 px-3 rounded bg-white text-[#0f172a] text-xs font-semibold"
                    >
                      <option>Urgent (30–45 Days)</option>
                      <option>Standard (60–90 Days)</option>
                      <option>Q3 / Q4 Greenfield Planning</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Projected Specifications */}
              <div className="lg:col-span-5">
                <div className="bg-[#162235] rounded-xl p-6 border border-slate-700/80 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] font-mono-tech text-[#f59e0b] uppercase font-semibold">
                      PROJECTED SPECIFICATIONS
                    </span>
                    <span className="bg-[#d97706] text-white text-[9.5px] font-mono-tech font-bold px-2 py-0.5 rounded-xs">
                      PRE-AUDIT
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                        EST. 3-PHASE LOAD
                      </div>
                      <div className="text-xl font-extrabold text-white mt-0.5">
                        {calcResult.load}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                        CORE UNITS NEEDED
                      </div>
                      <div className="text-xl font-extrabold text-white mt-0.5">
                        {calcResult.units}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                        RECOMMENDED OVEN
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        {calcResult.oven}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                        EST. MIXER BOWL
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        {calcResult.mixer}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/80 rounded p-3 flex items-start gap-2 text-[11px] font-mono-tech text-slate-300">
                    <Info className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                    <span>
                      Based on 8-hour shift output standard. Values confirmed during technical CAD drafting.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleTransferCalculator}
                    className="w-full h-11 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                  >
                    TRANSFER ASSESSMENT TO ADVISORY FORM
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REQUEST YOUR FREE BAKERY BUSINESS ADVISORY CALL */}
      <section ref={formRef} className="bg-[#f8fafd] py-16 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 5 Cols */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="text-[11px] font-mono-tech text-[#334e68] uppercase tracking-widest">
                  // ZERO-OBLIGATION CONSULTATION
                </div>
                <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1 leading-tight">
                  Request Your Free Bakery
                  <br />
                  Business Advisory Call
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  Connect directly with an ApexBake application engineer. We review your menu concept, product volumes, electrical hookups, and floor dimensions before advising on machinery.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-4 h-4 text-[#d97706] shrink-0 mt-1" />
                  <div>
                    <div className="text-xs font-extrabold text-[#0f172a]">
                      Strict Mutual NDA Protected
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Your secret recipes, proprietary formulations, and geographic launch territories remain 100% confidential.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-[#d97706] shrink-0 mt-1" />
                  <div>
                    <div className="text-xs font-extrabold text-[#0f172a]">
                      Direct Technical Advisory
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      You talk directly with sizing engineers with real bakery plant experience—not commissioned retail salespeople.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#d97706] shrink-0 mt-1" />
                  <div>
                    <div className="text-xs font-extrabold text-[#0f172a]">
                      Rapid Initial Blueprinting
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Complimentary preliminary 2D equipment placement layout generated within 72 hours of consultation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#eff5fc] rounded-xl p-4 border border-blue-100">
                <div className="text-[10px] font-mono-tech text-[#334e68] uppercase font-semibold mb-2.5">
                  PREFER DIRECT INSTANT CONTACT?
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:+18004927325"
                    className="bg-white rounded-lg p-3 border border-slate-200 flex items-center gap-2.5 hover:border-[#d97706] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#d97706]" />
                    <div>
                      <div className="text-[9.5px] font-mono-tech text-slate-400">HOTLINE</div>
                      <div className="text-xs font-mono-tech font-bold text-[#0f172a]">
                        +1 (800) 492-7325
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/13125550199"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white rounded-lg p-3 border border-slate-200 flex items-center gap-2.5 hover:border-emerald-500 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="text-[9.5px] font-mono-tech text-slate-400">WHATSAPP</div>
                      <div className="text-xs font-mono-tech font-bold text-[#0f172a]">
                        +1 (312) 555-0199
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Venture Sizing & Advisory Intake Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-7 sm:p-9 shadow-lg border border-slate-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0f172a]">
                      Venture Sizing &amp; Advisory Intake
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fill in as much detail as known. Preliminary estimates are fully welcome.
                    </p>
                  </div>
                  <ClipboardList className="w-6 h-6 text-[#d97706]" />
                </div>

                <form onSubmit={handleIntakeSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0f172a] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={intakeForm.customerName}
                        onChange={(e) =>
                          setIntakeForm({ ...intakeForm, customerName: e.target.value })
                        }
                        placeholder="e.g. Marcus Vance"
                        className="w-full h-10 px-3 rounded bg-[#eff5fc] border border-blue-100 text-xs focus:outline-none focus:border-[#d97706]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0f172a] mb-1">
                        Business / Venture Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={intakeForm.companyName}
                        onChange={(e) =>
                          setIntakeForm({ ...intakeForm, companyName: e.target.value })
                        }
                        placeholder="e.g. Heritage Artisan Baking Co."
                        className="w-full h-10 px-3 rounded bg-[#eff5fc] border border-blue-100 text-xs focus:outline-none focus:border-[#d97706]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0f172a] mb-1">
                        Work / Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={intakeForm.email}
                        onChange={(e) =>
                          setIntakeForm({ ...intakeForm, email: e.target.value })
                        }
                        placeholder="mvance@heritagebaking.com"
                        className="w-full h-10 px-3 rounded bg-[#eff5fc] border border-blue-100 text-xs focus:outline-none focus:border-[#d97706]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0f172a] mb-1">
                        Direct Phone (with country code) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={intakeForm.phone}
                        onChange={(e) =>
                          setIntakeForm({ ...intakeForm, phone: e.target.value })
                        }
                        placeholder="+1 (312) 890-4412"
                        className="w-full h-10 px-3 rounded bg-[#eff5fc] border border-blue-100 text-xs focus:outline-none focus:border-[#d97706]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0f172a] mb-1">
                        Planned Facility City &amp; Country *
                      </label>
                      <input
                        type="text"
                        required
                        value={intakeForm.facilityLocation}
                        onChange={(e) =>
                          setIntakeForm({ ...intakeForm, facilityLocation: e.target.value })
                        }
                        placeholder="e.g. Austin, TX, United States"
                        className="w-full h-10 px-3 rounded bg-[#eff5fc] border border-blue-100 text-xs focus:outline-none focus:border-[#d97706]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0f172a] mb-1">
                        Target Daily Output Volume
                      </label>
                      <input
                        type="text"
                        value={intakeForm.targetOutput}
                        onChange={(e) =>
                          setIntakeForm({ ...intakeForm, targetOutput: e.target.value })
                        }
                        className="w-full h-10 px-3 rounded bg-[#eff5fc] border border-blue-100 text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1">
                      Bakery Concept, Target Products &amp; Current Space Status
                    </label>
                    <textarea
                      rows={3}
                      value={intakeForm.message}
                      onChange={(e) =>
                        setIntakeForm({ ...intakeForm, message: e.target.value })
                      }
                      placeholder="Describe your primary baked goods (e.g. baguettes, brioche buns, croissants), current facility stage (signed lease, looking for building), and any specific questions regarding 3-phase power or gas connections..."
                      className="w-full p-3 rounded bg-[#eff5fc] border border-blue-100 text-xs focus:outline-none focus:border-[#d97706]"
                    />
                  </div>

                  <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={intakeForm.ndaRequested}
                      onChange={(e) =>
                        setIntakeForm({ ...intakeForm, ndaRequested: e.target.checked })
                      }
                      className="rounded border-slate-300 text-blue-600"
                    />
                    <span>Apply ApexBake Standard Mutual Engineering NDA to this submission.</span>
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 bg-[#d97706] hover:bg-[#b45309] disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {submitting
                        ? "SUBMITTING BRIEF..."
                        : "SUBMIT SIZING BRIEF & SCHEDULE ENGINEERING CALL"}
                    </span>
                  </button>

                  <div className="text-center text-[10px] font-mono-tech text-slate-500">
                    Confidential transmission • No unsolicited marketing • Assigned to an ApexBake Application Engineer
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS BY NEW BAKERY ENTREPRENEURS */}
      <section className="bg-[#eef4fc] py-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-10">
            <div className="text-[11px] font-mono-tech text-[#334e68] uppercase tracking-widest">
              // CLARITY &amp; PROTOCOL
            </div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1 leading-tight">
              Frequently Asked Questions by New Bakery
              <br />
              Entrepreneurs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Common queries regarding electrical permits, machinery scaling, financing options, and industrial formulation adaptation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200/90 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                <h3 className="text-sm font-extrabold text-[#0f172a]">
                  What is the realistic minimum CapEx required to outfit a commercial bakery?
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                A standard artisanal wholesale startup (200-500 kg daily capacity) typically requires between $45,000 to $95,000 in heavy core equipment (heavy spiral mixer, retarder proofer chamber, and multi-deck hearth oven). Larger automated wholesale bun or bread lines with automatic dividers scale from $120,000 to $280,000. ApexBake offers modular purchasing paths so you only buy what you need for Year 1.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200/90 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                <h3 className="text-sm font-extrabold text-[#0f172a]">
                  Can our artisan or home recipes scale directly into ApexBake industrial spiral mixers?
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                Yes, but scaling requires mathematical hydration compensation. Because industrial spiral kneaders generate friction heat during high-speed gluten development, our bakery technologists convert your baker's percentages to use chilled jacketed water (3°C to 5°C) to maintain target dough temperature (24°C - 26°C) at final mix.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200/90 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                <h3 className="text-sm font-extrabold text-[#0f172a]">
                  Does ApexBake assist with municipal health, fire, and electrical permits?
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                Yes. We furnish certified submittal packages including full 2D AutoCAD equipment footprints, utility connection schedules (water, drainage, gas BTU ratings, and 3-phase 208V/380V/480V amp drawings), along with verified NSF and CE compliance sheets to hand directly to your city inspectors and mechanical engineers.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200/90 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                <h3 className="text-sm font-extrabold text-[#0f172a]">
                  Are equipment leasing and staged payment milestones available?
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                ApexBake partners with leading industrial food equipment financing groups to offer 24- to 60-month lease-to-own programs with deferred payment structures during facility construction. Standard machinery orders follow structured milestones: 30% upon engineering confirmation, 50% upon live dough FAT runoff, and 20% post-commissioning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1-on-1 Free Session Booking Modal */}
      {isSessionModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsSessionModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsSessionModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 bg-[#fef3c7] text-[#d97706] rounded-lg">
                <Calendar className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-extrabold text-[#0f172a]">
                  Book 1–on–1 Session Free
                </h3>
                <span className="text-[11px] font-mono-tech text-emerald-600 font-semibold">
                  // ZERO OBLIGATION // 100% FREE CONSULTATION
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Speak directly with our senior bakery engineering team. We'll evaluate your recipes, production volume, and machinery requirements.
            </p>

            {sessionSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-extrabold text-sm">Session Booked Successfully!</div>
                <p className="text-xs text-emerald-700">
                  Your booking details have been stored securely in MongoDB. Our senior systems engineer will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookSessionSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={sessionForm.name}
                      onChange={(e) =>
                        setSessionForm({ ...sessionForm, name: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9876543210"
                      value={sessionForm.phone}
                      onChange={(e) =>
                        setSessionForm({ ...sessionForm, phone: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={sessionForm.email}
                      onChange={(e) =>
                        setSessionForm({ ...sessionForm, email: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmittingSession}
                    className="w-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>
                      {isSubmittingSession ? "Booking Session..." : "Confirm 1-on-1 Free Session"}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StartBusinessPage;
