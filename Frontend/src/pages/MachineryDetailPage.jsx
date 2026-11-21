import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FileText,
  Phone,
  CheckCircle2,
  Gauge,
  Droplets,
  Shield,
  Volume2,
  ArrowLeftRight,
  Minimize2,
  Cpu,
  Clock,
  Wrench,
  Send,
  MessageSquare,
  ArrowRight,
  Hash,
  Cog,
  Zap,
  Maximize2,
  Scale,
  Copy,
  Check,
  X,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import api from "../utils/api";

const COMPANY_PHONE = "+91 98765 43210";
const COMPANY_PHONE_RAW = "+919876543210";

const MachineryDetailPage = () => {
  const { id } = useParams();
  const { machinery, openQuoteModal, submitQuotation, submitEnquiry, showToast } = useApp();

  const [item, setItem] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(COMPANY_PHONE);
    setCopiedPhone(true);
    if (showToast) {
      showToast("Company contact number copied to clipboard!");
    }
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const [rfqForm, setRfqForm] = useState({
    customerName: "",
    companyName: "",
    email: "",
    phone: "",
    machineryModel: "",
    quantity: "1 Unit (Single Replacement / Pilot)",
    message: "",
    includeBimFiles: true,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const loadItem = async () => {
      try {
        const normalizedId = decodeURIComponent(id || "").toLowerCase().trim();
        const foundLocal = machinery.find(
          (m) =>
            (m.modelCode && m.modelCode.toLowerCase().trim() === normalizedId) ||
            (m.homeCode && m.homeCode.toLowerCase().trim() === normalizedId) ||
            (m.slug && m.slug.toLowerCase().trim() === normalizedId) ||
            (m._id && String(m._id).toLowerCase().trim() === normalizedId)
        );
        if (foundLocal) {
          setItem(foundLocal);
          setActiveImage(foundLocal.detailMainImage || foundLocal.catalogImage);
          setRfqForm((prev) => ({
            ...prev,
            machineryModel: `${foundLocal.modelCode} - ${foundLocal.homeTitle || foundLocal.machineryName}`,
          }));
          setLoading(false);
          return;
        }

        setLoading(true);
        const res = await api.get(`/machinery/${id}`);
        if (res.data?.data) {
          const data = res.data.data;
          setItem(data);
          setActiveImage(data.detailMainImage || data.catalogImage);
          setRfqForm((prev) => ({
            ...prev,
            machineryModel: `${data.modelCode} - ${data.homeTitle || data.machineryName}`,
          }));
        }
      } catch (err) {
        console.warn("Detail fetch fallback:", err.message);
        if (machinery.length > 0) {
          setItem(machinery[0]);
          setActiveImage(machinery[0].detailMainImage || machinery[0].catalogImage);
        }
      } finally {
        setLoading(false);
      }
    };
    loadItem();
  }, [id, machinery]);

  const currentMachine = item || machinery[0] || {
    modelCode: "AB-SM250S",
    machineryName: "SPIRAL MIXER (STAINLESS STEEL)",
    detailTitle: "Industrial Spiral Mixer – Full Stainless Steel Series",
    detailSubtitle:
      "Engineered for high-volume commercial and industrial bakeries demanding non-stop 24/7 dough production with minimal dough friction and negligible temperature rise (≤ 1.2°C / batch).",
    detailMainImage: "/images/detail-main.png",
    keySpecsGrid: [
      { label: "DOUGH BATCH CAPACITY", value: "250", unit: "kg / batch", sub: "Max flour load: 150 kg" },
      { label: "BOWL TOTAL VOLUME", value: "380", unit: "Liters", sub: "Heavy gauge SUS304" },
      { label: "CYCLE MIXING TIME", value: "8 – 12", unit: "min", sub: "Two-speed automatic shift" },
      { label: "NET MACHINE MASS", value: "1,280", unit: "kg", sub: "Solid cast-base dampener" },
    ],
    featurePills: [
      "FOOD-GRADE SUS304 BODY",
      "DIGITAL TOUCHSCREEN PLC",
      "DUAL TIMER AUTO SHIFT",
      "HYDRAULIC BOWL LIFT OPTION",
    ],
    specifications: [],
  };

  const thumbnails =
    currentMachine.images && currentMachine.images.length > 0
      ? currentMachine.images.slice(0, 4)
      : [
        currentMachine.detailMainImage ||
        currentMachine.catalogImage ||
        "/images/detail-thumb-1.png",
      ];

  const handleRfqSubmit = async (e) => {
    e.preventDefault();
    if (!rfqForm.customerName.trim() || !rfqForm.email.trim()) {
      showToast("Please fill in your Full Name and Corporate Business Email.", "error");
      return;
    }
    try {
      setSubmitting(true);
      const submitFn = submitQuotation || submitEnquiry;
      await submitFn({
        ...rfqForm,
        enquiryType: "Official Machinery RFQ",
      });
      showToast("Official Machinery Quotation request submitted! CAD drawings and bid pack will be dispatched within 24 hours.");
      setRfqForm((prev) => ({
        ...prev,
        customerName: "",
        companyName: "",
        email: "",
        phone: "",
        message: "",
      }));
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to submit quotation request.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#eef4fc]">
      {/* 1. TOP PRODUCT HERO & GALLERY */}
      <section className="py-10 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 items-start">
            {/* Left Column: Main Image + 4 Thumbnails */}
            <div className="lg:col-span-7 space-y-3.5">
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 h-[380px] sm:h-[460px]">
                <img
                  src={activeImage || currentMachine.detailMainImage || "/images/detail-main.png"}
                  alt={currentMachine.detailTitle || currentMachine.machineryName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-4 gap-3">
                {thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(thumb)}
                    className={`rounded-lg overflow-hidden border-2 h-24 cursor-pointer transition-all ${activeImage === thumb
                      ? "border-[#d97706] shadow-sm"
                      : "border-slate-200 hover:border-slate-400"
                      }`}
                  >
                    <img
                      src={thumb}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Machine Summary, 2x2 Key Specs, Pills & CTA Box */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="inline-block bg-[#0d1829] text-white text-[11px] font-mono-tech font-semibold px-3 py-1 rounded-xs">
                  MODEL: {currentMachine.modelCode}
                </span>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mt-3 leading-tight">
                  {currentMachine.detailTitle || currentMachine.machineryName}
                </h1>

                <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed mt-3">
                  {currentMachine.detailSubtitle || currentMachine.description}
                </p>
              </div>

              {/* 2x2 Key Specs Grid */}
              <div className="bg-white rounded-xl p-4 border border-slate-200/80 grid grid-cols-2 gap-3">
                {(currentMachine.keySpecsGrid || []).map((spec, i) => (
                  <div key={i} className="bg-[#eff5fc] rounded-lg p-3.5">
                    <div className="text-[10px] font-mono-tech text-[#334e68] uppercase font-bold">
                      {spec.label}
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                        {spec.value}
                      </span>
                      <span className="text-xs font-mono-tech text-slate-700 font-semibold">
                        {spec.unit}
                      </span>
                    </div>
                    <div className="text-[10.5px] font-mono-tech text-slate-500 mt-0.5">
                      {spec.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2">
                {(currentMachine.featurePills || []).map((pill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-[#dce8f8] text-[#0f172a] text-[10px] font-mono-tech font-bold px-3 py-1.5 rounded"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#334e68]" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>

              {/* Enterprise Pricing Tier Box */}
              <div className="bg-[#e3edf9] rounded-xl p-5 border border-blue-200/70 space-y-3">
                <div className="text-xs font-bold text-[#0f172a]">
                  Enterprise Pricing Tier:
                </div>

                <button
                  type="button"
                  onClick={() => openQuoteModal(currentMachine)}
                  className="w-full h-12 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>REQUEST OFFICIAL QUOTATION (RFQ)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCallModalOpen(true)}
                  className="w-full h-11 bg-[#486581] hover:bg-[#334e68] text-white font-mono-tech font-semibold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>CALL NOW</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DETAILED TECHNICAL INFORMATION TABLE */}
      <section className="bg-white py-14 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="text-[11px] font-mono-tech text-[#334e68] uppercase tracking-widest font-semibold">
            ENGINEERING SPECIFICATION ARCHITECTURE
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mt-1 mb-6">
            Detailed Technical Information
          </h2>

          <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-2xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0d1829] text-white text-[11px] font-mono-tech uppercase tracking-wider">
                  <th className="py-3.5 px-5 w-1/4">MACHINERY PARAMETER</th>
                  <th className="py-3.5 px-5 w-2/5">STANDARD FACTORY SPECIFICATION</th>
                  <th className="py-3.5 px-5 text-right">ENGINEERING NOTES / TOLERANCES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {(currentMachine.specifications || []).map((row, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#f4f8fd]"}
                  >
                    <td className="py-3.5 px-5 font-bold text-[#0f172a]">
                      <div className="flex items-center gap-2">
                        <Cog className="w-3.5 h-3.5 text-[#334e68] shrink-0" />
                        <span>{row.parameter}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 font-mono-tech font-semibold text-slate-800">
                      {row.value}
                    </td>
                    <td className="py-3.5 px-5 font-mono-tech text-slate-500 text-right">
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. THERMAL FRICTION MITIGATION & CERTIFIED INDUSTRIAL APPLICATIONS */}
      <section className="bg-[#f8fafd] py-16 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="text-[11px] font-mono-tech text-[#334e68] uppercase tracking-widest font-semibold">
                  THERMAL FRICTION MITIGATION
                </div>
                <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1 leading-tight">
                  Engineered For Non–Stop Kneading Without
                  <br />
                  Dough Overheating
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mt-3">
                  The {currentMachine.modelCode} addresses the central failure point of high-capacity commercial bakeries: gluten destruction through thermal runaway. Featuring an engineered three-curve spiral arm profile calibrated to the parabolic inner contour of the 380L bowl, dough is rolled smoothly upwards through the mixing zone without shear compaction.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#eef4fc] rounded-xl p-5 border border-blue-100">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-[#0f172a]">
                    <Gauge className="w-4 h-4 text-[#334e68]" />
                    <span>Dual–Speed Transition</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Automatic smooth ramping from slow incorporation (105 RPM spiral / 12 RPM bowl) to high-speed development (210 RPM spiral / 24 RPM bowl) under digital timing loops.
                  </p>
                </div>

                <div className="bg-[#eef4fc] rounded-xl p-5 border border-blue-100">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-[#0f172a]">
                    <Droplets className="w-4 h-4 text-[#334e68]" />
                    <span>Automated Dosing Ready</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Integrated dust hood features a top pneumatic inlet port designed for direct connection to industrial automated water and liquid yeast dosing silos.
                  </p>
                </div>

                <div className="bg-[#eef4fc] rounded-xl p-5 border border-blue-100">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-[#0f172a]">
                    <Shield className="w-4 h-4 text-[#334e68]" />
                    <span>Hermetic Bearing Seals</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Machined SKF dual tapered bearings sealed with food-grade fluorosilicone o-rings prevent fine flour ingress and eliminate lubricant cross-contamination entirely.
                  </p>
                </div>

                <div className="bg-[#eef4fc] rounded-xl p-5 border border-blue-100">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-[#0f172a]">
                    <Volume2 className="w-4 h-4 text-[#334e68]" />
                    <span>Silent Belt Transmission</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Multi-groove Poly-V heavy tension industrial drive belts deliver silent 68 dB operation, dampening sudden torque spikes caused by frozen butter or cold dough additions.
                  </p>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Dark Navy Certified Industrial Applications Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#0d1829] text-white rounded-xl p-7 shadow-xl border border-slate-800 space-y-5">
                <div>
                  <div className="text-[10.5px] font-mono-tech text-[#f59e0b] uppercase tracking-widest font-semibold">
                    • PRODUCTION LINE COMPATIBILITY
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-1">
                    Certified Industrial Applications
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                    Validated across high-throughput commercial processing lines supplying supermarkets, QSR chains, and cold-chain frozen distribution networks:
                  </p>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">Artisan Baguettes &amp; Sourdough</div>
                      <div className="text-slate-400 mt-0.5">
                        Gentle stretching maintains open alveoli crumb structure at up to 78% hydration.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">High-Speed Pan Loaves &amp; Toast Bread</div>
                      <div className="text-slate-400 mt-0.5">
                        Rapid gluten network development for tight, uniform slice density and shelf freshness.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">Croissant &amp; Laminated Pastry Blocks</div>
                      <div className="text-slate-400 mt-0.5">
                        Uniform mixing prevents premature gluten tightening prior to the sheeting lamination stage.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">Industrial Pizza Bases &amp; Flatbreads</div>
                      <div className="text-slate-400 mt-0.5">
                        High-torque capability effortlessly kneads stiff, low-water dough formulations without motor stall.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">Par-Baked &amp; Blast Frozen Dough</div>
                      <div className="text-slate-400 mt-0.5">
                        Strict cell temperature control ensures stable shelf life and reliable bake-off lift after thaw.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono-tech">
                  <span className="text-slate-400">PLANT AUDIT COMPLIANT:</span>
                  <span className="text-[#f59e0b] font-semibold">
                    FDA 21 CFR • CE MD 2006/42/EC
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MACHINERY HIGHLIGHTS & HEAVY-DUTY STRUCTURAL FEATURES */}
      <section className="bg-[#eef4fc] py-16 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-[11px] font-mono-tech text-[#334e68] uppercase tracking-widest font-semibold">
              BUILT FOR ZERO UNPLANNED DOWNTIME
            </div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1 leading-tight">
              Machinery Highlights &amp; Heavy–Duty Structural
              <br />
              Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded bg-[#dce8f8] flex items-center justify-center mb-4">
                  <ArrowLeftRight className="w-5 h-5 text-[#334e68]" />
                </div>
                <h3 className="text-sm font-extrabold text-[#0f172a]">
                  Two–Speed Bidirectional Drive
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Independent motor controls allow bowl reverse rotation during slow kneading, ensuring zero dead spots and homogenous dispersion of micro-ingredients.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10.5px] font-mono-tech text-[#334e68] font-semibold">
                Reversible Bowl: ±12 / ±24 RPM
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded bg-[#dce8f8] flex items-center justify-center mb-4">
                  <Minimize2 className="w-5 h-5 text-[#334e68]" />
                </div>
                <h3 className="text-sm font-extrabold text-[#0f172a]">
                  Ergonomic Hydraulic Bowl Clamp
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Optional quick-release hydraulic locking clamps secure mobile bowls firmly to the heavy vibration-dampening machine chassis during vigorous high-load mixing.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10.5px] font-mono-tech text-[#334e68] font-semibold">
                Clamping Force: 2,400 kgf
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded bg-[#dce8f8] flex items-center justify-center mb-4">
                  <Volume2 className="w-5 h-5 text-[#334e68]" />
                </div>
                <h3 className="text-sm font-extrabold text-[#0f172a]">
                  Heavy–Duty Poly–V Belt Drive
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Eliminates high-maintenance oil gearboxes. Engineered belt system absorbs abrupt load shocks while maintaining quiet operator floor conditions below 70 dB.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10.5px] font-mono-tech text-[#334e68] font-semibold">
                Service Interval: 12,000 Hours
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded bg-[#dce8f8] flex items-center justify-center mb-4">
                  <Cpu className="w-5 h-5 text-[#334e68]" />
                </div>
                <h3 className="text-sm font-extrabold text-[#0f172a]">
                  IP65 Washdown Electrical Box
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Stainless control console and power housing rated for daily high-pressure chemical washdowns (CIP protocol), safeguarding delicate logic boards against steam and moisture.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10.5px] font-mono-tech text-[#334e68] font-semibold">
                NEMA 4X / IP65 Certified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REQUEST AN OFFICIAL MACHINERY QUOTATION (SPLIT CARD) */}
      <section className="py-16 bg-[#f8fafd] border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 grid grid-cols-1 lg:grid-cols-12">
            {/* Left Dark Navy Panel */}
            <div className="lg:col-span-5 bg-[#0d1829] text-white p-8 sm:p-10 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="text-[11px] font-mono-tech text-[#f59e0b] uppercase tracking-widest font-semibold">
                  • DIRECT MANUFACTURER RFQ
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Request an Official
                  <br />
                  Machinery Quotation
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Receive engineering CAD drawings, plant footprint recommendations, unit price breaks, and freight schedules directly from ApexBake mechanical engineers within 24 business hours.
                </p>

                <div className="space-y-3 pt-2 text-xs text-slate-200">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#f59e0b] shrink-0" />
                    <span>Guaranteed 24-Hour Bid Pack Response</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wrench className="w-4 h-4 text-[#f59e0b] shrink-0" />
                    <span>Custom Hopper &amp; Voltage Customization Available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Send className="w-4 h-4 text-[#f59e0b] shrink-0" />
                    <span>Direct Export to Over 85 Countries</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
                <div className="text-[10.5px] font-mono-tech text-slate-400 uppercase">
                  URGENT LINE INTEGRATION OR SPARES?
                </div>
                <div className="flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-slate-300">Americas Desk:</span>
                  <span className="text-[#f59e0b] font-bold">+1 (800) 555-BAKE</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-slate-300">Europe Desk:</span>
                  <span className="text-[#f59e0b] font-bold">+44 20 7946 0912</span>
                </div>
                <a
                  href="https://wa.me/13125552253"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 w-full h-10 bg-[#10b981] hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WHATSAPP INSTANT DISPATCH</span>
                </a>
              </div>
            </div>

            {/* Right White Form Panel */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10">
              <form onSubmit={handleRfqSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1">
                      Full Name &amp; Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={rfqForm.customerName}
                      onChange={(e) =>
                        setRfqForm({ ...rfqForm, customerName: e.target.value })
                      }
                      placeholder="e.g. Marcus Vance, Plant Operations Dir."
                      className="w-full h-10 px-3 rounded border border-slate-200 text-xs focus:outline-none focus:border-[#d97706]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1">
                      Bakery Facility / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={rfqForm.companyName}
                      onChange={(e) =>
                        setRfqForm({ ...rfqForm, companyName: e.target.value })
                      }
                      placeholder="e.g. Continental Baking Group LLC"
                      className="w-full h-10 px-3 rounded border border-slate-200 text-xs focus:outline-none focus:border-[#d97706]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1">
                      Corporate Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={rfqForm.email}
                      onChange={(e) => setRfqForm({ ...rfqForm, email: e.target.value })}
                      placeholder="m.vance@continentalbakery.com"
                      className="w-full h-10 px-3 rounded border border-slate-200 text-xs focus:outline-none focus:border-[#d97706]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1">
                      Corporate Direct Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={rfqForm.phone}
                      onChange={(e) => setRfqForm({ ...rfqForm, phone: e.target.value })}
                      placeholder="+1 (312) 555-0188"
                      className="w-full h-10 px-3 rounded border border-slate-200 text-xs focus:outline-none focus:border-[#d97706]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1">
                      Selected Machinery Model
                    </label>
                    <input
                      type="text"
                      value={rfqForm.machineryModel}
                      onChange={(e) =>
                        setRfqForm({ ...rfqForm, machineryModel: e.target.value })
                      }
                      className="w-full h-10 px-3 rounded bg-[#dce8f8] border border-blue-200 text-xs font-mono-tech font-bold text-[#0f172a]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1">
                      Estimated Required Quantity *
                    </label>
                    <select
                      value={rfqForm.quantity}
                      onChange={(e) =>
                        setRfqForm({ ...rfqForm, quantity: e.target.value })
                      }
                      className="w-full h-10 px-3 rounded border border-slate-200 text-xs bg-white"
                    >
                      <option>1 Unit (Single Replacement / Pilot)</option>
                      <option>2 - 3 Units (Production Line Expansion)</option>
                      <option>4+ Units (Turnkey Industrial Plant)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1">
                    Target Daily Dough Volume &amp; Plant Electrical Notes
                  </label>
                  <textarea
                    rows={3}
                    value={rfqForm.message}
                    onChange={(e) => setRfqForm({ ...rfqForm, message: e.target.value })}
                    placeholder="Please specify your target loaves per hour, dough types (e.g. ciabatta, tin loaf), factory electrical voltage (e.g. 480V 60Hz), or if an automated bowl tipper elevator is required..."
                    className="w-full p-3 rounded border border-slate-200 text-xs focus:outline-none focus:border-[#d97706]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer max-w-xs">
                    <input
                      type="checkbox"
                      checked={rfqForm.includeBimFiles}
                      onChange={(e) =>
                        setRfqForm({ ...rfqForm, includeBimFiles: e.target.checked })
                      }
                      className="mt-0.5 rounded border-slate-300 text-blue-600"
                    />
                    <span>Include 2D/3D BIM layout files in the bid packet</span>
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#d97706] hover:bg-[#b45309] disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded shadow-md transition-colors cursor-pointer"
                  >
                    {submitting
                      ? "SUBMITTING RFQ..."
                      : "SUBMIT BUSINESS INQUIRY / REQUEST RFQ"}
                  </button>
                </div>

                <div className="text-[10px] font-mono-tech text-slate-400 pt-2">
                  * Non-disclosure agreement (NDA) honored automatically for all proprietary flour batch formulations.
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPLEMENTARY INDUSTRIAL MACHINERY */}
      <section className="py-16 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-[11px] font-mono-tech text-[#334e68] uppercase tracking-widest font-semibold">
                COMPLETE CONTINUOUS LINE ENGINEERING
              </div>
              <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1">
                Complementary Industrial Machinery
              </h2>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-bold text-[#334e68] hover:text-[#d97706]"
            >
              <span>View All 42 Production Line Units</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* Comp 1 */}
            <div className="bg-[#eff5fc] rounded-xl overflow-hidden border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="relative h-52 bg-slate-100">
                  <img
                    src="/images/detail-comp-1.png"
                    alt="Automated Reversible Dough Sheeter"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 pb-4">
                  <div className="text-[10.5px] font-mono-tech text-[#334e68] uppercase font-semibold">
                    POST-MIXING FORMATION
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0f172a] mt-1">
                    Automated Reversible Dough Sheeter
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Micro-adjustable stainless steel rollers for laminating laminated pastry blocks, yeast doughs, and thin bakery sheets.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-5 pt-2 flex justify-end">
                <Link
                  to="/products/AB-DS650"
                  className="text-xs font-bold text-[#334e68] hover:text-[#d97706] inline-flex items-center gap-1"
                >
                  <span>View Product &gt;</span>
                </Link>
              </div>
            </div>

            {/* Comp 2 */}
            <div className="bg-[#eff5fc] rounded-xl overflow-hidden border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="relative h-52 bg-slate-100">
                  <img
                    src="/images/detail-comp-2.png"
                    alt="Precision Climate Industrial Proofer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 pb-4">
                  <div className="text-[10.5px] font-mono-tech text-[#334e68] uppercase font-semibold">
                    FERMENTATION &amp; PROOFING
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0f172a] mt-1">
                    Precision Climate Industrial Proofer
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Steam-injected micro-climate air control system regulating humidity (±2% RH) and thermal staging for uniform proofing.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-5 pt-2 flex justify-end">
                <Link
                  to="/products/AB-PF24"
                  className="text-xs font-bold text-[#334e68] hover:text-[#d97706] inline-flex items-center gap-1"
                >
                  <span>View Product &gt;</span>
                </Link>
              </div>
            </div>

            {/* Comp 3 */}
            <div className="bg-[#eff5fc] rounded-xl overflow-hidden border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="relative h-52 bg-slate-100">
                  <img
                    src="/images/detail-comp-3.png"
                    alt="Continuous High-Speed Bread Slicer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 pb-4">
                  <div className="text-[10.5px] font-mono-tech text-[#334e68] uppercase font-semibold">
                    FINAL PACKAGING &amp; FINISHING
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0f172a] mt-1">
                    Continuous High–Speed Bread Slicer
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Teflon-coated harmonic blades capable of slicing warm artisan sandwich loaves with zero tearing, crumbing, or compression.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-5 pt-2 flex justify-end">
                <Link
                  to="/products/AB-BS450"
                  className="text-xs font-bold text-[#334e68] hover:text-[#d97706] inline-flex items-center gap-1"
                >
                  <span>View Product &gt;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex items-center gap-2.5 shadow-lg">
        <button
          type="button"
          onClick={() => setIsCallModalOpen(true)}
          className="flex-1 h-10 bg-[#486581] hover:bg-[#334e68] text-white font-mono-tech font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>CALL NOW</span>
        </button>
        <button
          type="button"
          onClick={() => openQuoteModal(currentMachine)}
          className="flex-1 h-10 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>GET QUOTE</span>
        </button>
      </div>

      {/* Call Now Modal Pop-up (Responsive for Mobile & Desktop) */}
      {isCallModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsCallModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0f172a] text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#d97706]/20 border border-[#d97706]/40 flex items-center justify-center text-[#d97706]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold tracking-tight">
                    Company Contact Hotline
                  </h3>
                  <p className="text-[11px] font-mono-tech text-slate-400">
                    National Engineering Works (ApexBake)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCallModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono-tech uppercase font-bold text-[#334e68] tracking-widest bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60 inline-block">
                  24/7 Technical &amp; Sales Support
                </span>
                <p className="text-xs text-slate-600 mt-2">
                  Speak directly with our senior machinery engineers regarding pricing, plant integration, or custom tooling.
                </p>
              </div>

              {/* Company Contact Display Card */}
              <div className="bg-[#f4f8fd] border border-blue-200/80 rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                <div className="text-[11px] font-mono-tech text-slate-500 font-semibold uppercase tracking-wider">
                  Company Contact Number
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono-tech text-[#0f172a] tracking-tight">
                  {COMPANY_PHONE}
                </div>
                <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Lines active • Instant dispatch
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                {/* 1-Click Copy Number Button */}
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className={`w-full h-12 rounded-xl font-mono-tech font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer ${copiedPhone
                    ? "bg-emerald-600 text-white"
                    : "bg-[#0f172a] hover:bg-slate-800 text-white"
                    }`}
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>NUMBER COPIED TO CLIPBOARD!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>COPY COMPANY NUMBER</span>
                    </>
                  )}
                </button>

                {/* Quick Direct Call & WhatsApp Row */}
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${COMPANY_PHONE_RAW}`}
                    className="h-11 bg-[#486581] hover:bg-[#334e68] text-white font-mono-tech font-semibold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>DIRECT CALL</span>
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY_PHONE_RAW.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 bg-[#25D366] hover:bg-[#20ba59] text-white font-mono-tech font-semibold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WHATSAPP</span>
                  </a>
                </div>
              </div>

              {/* Modal Footer note */}
              <div className="text-[11px] text-center text-slate-400 font-mono-tech">
                Available 24/7 • National Engineering Works
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MachineryDetailPage;
