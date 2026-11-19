import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Shield,
  Cpu,
  Clock,
  ArrowRight,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const MATRIX_TABS = [
  "All Equipment",
  "Spiral & Dough Mixers",
  "Reversible Dough Sheeters",
  "Planetary Mixers",
  "Loaf & Bun Slicers",
  "Climate Proofers & Retarders",
];

const VISCOSITY_ROWS = [
  {
    color: "bg-[#d97706]",
    formulation: "Pretzels & Heavy Bagels",
    hydration: "48% – 54%",
    viscosity: "Extreme shear resistance; high motor torque load",
    tool: "Dual Inverter Spiral Tool, Reinforced Center Breaker Bar",
    thermal: "Glycol Chilled Bowl Jacket",
    system: "AB-SM250S Series",
  },
  {
    color: "bg-blue-500",
    formulation: "Pullman & Sandwich Loaves",
    hydration: "58% – 66%",
    viscosity: "Balanced extensible gluten matrix; fast absorption",
    tool: "Standard Two-Speed Spiral with Auto Timer Shift",
    thermal: "Ambient / Chilled Water Dosing",
    system: "AB-SM130 / AB-TS300",
  },
  {
    color: "bg-emerald-500",
    formulation: "Open-Crumb Sourdough & Ciabatta",
    hydration: "72% – 88%+",
    viscosity: "Acidic pH (<4.0), high liquefaction risk, gentle aeration needed",
    tool: "Slow-rev variable torque, SUS316 anti-acid metallurgy",
    thermal: "Sub-Ambient Infusion",
    system: "AB-SM250S (SUS316 Edition)",
  },
  {
    color: "bg-purple-500",
    formulation: "Laminated Croissants & Danishes",
    hydration: "Fat / Dough Layers",
    viscosity: "Zero shear heating permissible; temperature threshold <16°C",
    tool: "Precision Reversible Sheeter with Non-Stick Polyurethane Belts",
    thermal: "Retarder Chamber -5°C Holding",
    system: "AB-DS650 + AB-PF24",
  },
  {
    color: "bg-amber-700",
    formulation: "Dense Fruitcake, Cookies & Batters",
    hydration: "Variable Solid",
    viscosity: "Heavy particulate suspension, non-gluten binding",
    tool: "Heavy Planetary Flat Beater with Continuous Wall Scrapers",
    thermal: "Ambient Controlled",
    system: "AB-PM80 Industrial",
  },
];

const FAQS = [
  {
    q: "How do I determine whether my plant requires a fixed bowl vs. removable bowl spiral mixer?",
    a: "Fixed bowl machines (such as our AB-SM130) are engineered for direct manual batch emptying, ideal for commissary kitchens producing up to 1,500 kg per shift across multiple distinct recipes. Conversely, removable bowl systems (AB-SM250S) integrate seamlessly with hydraulic bowl lifters and overhead dividers. If your target continuous dough processing throughput exceeds 2,000 kg per shift, removable bowls allow uninterrupted batch sequencing where one bowl is mixing while another is resting or in the tipping cycle.",
  },
  {
    q: "Can ApexBake machinery withstand natural high–acid sourdough formulations without pitting?",
    a: "Standard industrial bakery machinery typically employs SUS304 grade stainless steel, which is susceptible to micro-pitting corrosion over extended contact with low-pH (below 3.8) organic acetic and lactic sourdough mother cultures. ApexBake offers dedicated SUS316 molybdenum-alloyed stainless contact packages across our spiral bowls, breaker shafts, and scraper blades to ensure zero acid degradation and EHEDG certified sanitary compliance.",
  },
  {
    q: "How does ApexBake prevent dough friction heat spikes during high–speed kneading cycles?",
    a: "High-speed friction causes unwanted thermal development, pre-activating yeast before dough reaches proofing stages. Our industrial spiral mixers utilize double-walled glycol cooling jackets integrated into the bowl shell, coupled with computer-optimized spiral-to-breaker geometry that maximizes gluten shear while cutting mechanical friction by up to 28% compared to traditional hemispherical bowls.",
  },
  {
    q: "What are the exact electrical and compressed air facility requirements for continuous lines?",
    a: "All continuous ApexBake heavy machinery ships calibrated for three-phase power (480V 60Hz North American or 400V 50Hz CE-compliant standard). Pneumatic functions (such as slicer belt tensioning, sheeter reverse clutches, and scraper lifts) mandate a clean, dry, oil-free compressed air feed of 6 to 8 bar (87–116 PSI) at a minimum volume of 15 CFM.",
  },
];

const FindMachineryPage = () => {
  const { machinery } = useApp();

  const [activeTab, setActiveTab] = useState("All Equipment");
  const [hydrationFilter, setHydrationFilter] = useState("Any Hydration Rating");
  const [throughputFilter, setThroughputFilter] = useState("All Production Volumes");
  const [automationFilter, setAutomationFilter] = useState("All Automation Architectures");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const matrixItems = useMemo(() => {
    const base =
      machinery.filter((m) => m.featuredOnMatrix).length >= 6
        ? machinery.filter((m) => m.featuredOnMatrix)
        : machinery;

    return base.filter((item) => {
      if (activeTab !== "All Equipment" && item.matrixCategory !== activeTab) {
        return false;
      }
      if (
        hydrationFilter !== "Any Hydration Rating" &&
        !(item.hydrationProfile || "").toLowerCase().includes(hydrationFilter.toLowerCase())
      ) {
        return false;
      }
      if (
        throughputFilter !== "All Production Volumes" &&
        !(item.throughputTier || "").toLowerCase().includes(throughputFilter.toLowerCase())
      ) {
        return false;
      }
      if (
        automationFilter !== "All Automation Architectures" &&
        !(item.automationTier || "").toLowerCase().includes(automationFilter.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [machinery, activeTab, hydrationFilter, throughputFilter, automationFilter]);

  return (
    <div className="w-full bg-[#f4f8fd]">
      {/* Breadcrumb Bar */}
      <div className="bg-[#eef4fc] border-b border-slate-200/80 py-3">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 text-xs font-mono-tech text-slate-500 flex items-center gap-1.5">
          <Link to="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#334e68]">Solutions</span>
          <span>/</span>
          <span className="text-slate-900 font-bold">
            Find Your Exact Machinery &amp; Engineering Selector
          </span>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="bg-white py-12 lg:py-16 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-[#eff5fc] border border-blue-200 px-3 py-1 rounded text-[10.5px] font-mono-tech text-[#0f172a] font-bold">
                <span>• DIRECT ENGINEERING RECONCILIATION ENGINE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0f172a] leading-[1.13]">
                Find Your Exact Industrial
                <br />
                Machinery
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Configure by dough hydration, daily batch throughput, sanitary metallurgy, and automation tier. Our engineering engine matches your exact formulation to certified heavy-duty continuous and batch machinery engineered for 24/7 uptime.
              </p>

              <div className="pt-2">
                <a
                  href="#matching-matrix"
                  className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider px-7 py-4 rounded shadow-sm transition-colors"
                >
                  <span>EXPLORE MACHINERY</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right 5 Cols: FAT Runoff Readiness Dark Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#0d1829] text-white rounded-xl p-6 sm:p-7 shadow-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-[11px] font-mono-tech text-[#f59e0b] uppercase font-bold">
                    FAT RUNOFF READINESS
                  </span>
                  <span className="bg-slate-800 border border-slate-700 text-slate-300 text-[9.5px] font-mono-tech px-2.5 py-0.5 rounded">
                    SYSTEM VERIFIED
                  </span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-mono-tech font-bold text-white">
                        100% Rheology Guarantee
                      </div>
                      <div className="text-slate-400 mt-0.5">
                        Validated for 52% to 88%+ gluten hydration bands
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-mono-tech font-bold text-white">
                        SUS304 / SUS316 Contact
                      </div>
                      <div className="text-slate-400 mt-0.5">
                        Full acid resistance for active sourdough mother cultures
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Cpu className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-mono-tech font-bold text-white">
                        Siemens S7-1500 &amp; Rockwell
                      </div>
                      <div className="text-slate-400 mt-0.5">
                        EtherNet/IP &amp; PROFINET SCADA integration ready
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-mono-tech font-bold text-white">
                        48-Hr Live-Dough FAT
                      </div>
                      <div className="text-slate-400 mt-0.5">
                        Factory Acceptance Testing with your specific flour blends
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            <div className="bg-[#f8fafd] rounded-xl p-5 border border-slate-200/80">
              <div className="text-[10px] font-mono-tech text-[#334e68] uppercase">
                RHEOLOGY RANGE
              </div>
              <div className="text-2xl font-extrabold text-[#0f172a] mt-1">
                52% — 88%+
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Stiff bagels to high-hydration ciabatta
              </div>
            </div>

            <div className="bg-[#f8fafd] rounded-xl p-5 border border-slate-200/80">
              <div className="text-[10px] font-mono-tech text-[#334e68] uppercase">
                SANITARY STANDARD
              </div>
              <div className="text-2xl font-extrabold text-[#0f172a] mt-1">
                EHEDG &amp; USDA
              </div>
              <div className="text-xs text-slate-500 mt-1">
                IP69K washdown and toolless disassembly
              </div>
            </div>

            <div className="bg-[#f8fafd] rounded-xl p-5 border border-slate-200/80">
              <div className="text-[10px] font-mono-tech text-[#334e68] uppercase">
                PEAK LINE CAPACITY
              </div>
              <div className="text-2xl font-extrabold text-[#0f172a] mt-1">
                8,500 kg/hr
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Continuous automated high-speed extrusion
              </div>
            </div>

            <div className="bg-[#f8fafd] rounded-xl p-5 border border-slate-200/80">
              <div className="text-[10px] font-mono-tech text-[#334e68] uppercase">
                GLOBAL DEPLOYMENTS
              </div>
              <div className="text-2xl font-extrabold text-[#0f172a] mt-1">
                1,420+ Units
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Operational across 64 global territories
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE EQUIPMENT MATCHING MATRIX */}
      <section id="matching-matrix" className="bg-[#eef4fc] py-16 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-[11px] font-mono-tech text-[#334e68] uppercase tracking-widest">
                // SPECIFICATION FILTER ENGINE
              </div>
              <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1">
                Interactive Equipment Matching Matrix
              </h2>
            </div>

            <div className="text-xs font-mono-tech text-slate-600 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#d97706]" />
              <span>
                Showing: <strong className="text-[#0f172a]">{matrixItems.length} Machines</strong> configured to current criteria
              </span>
            </div>
          </div>

          {/* Filter Control Box */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-5 mb-10">
            <div>
              <div className="text-[10px] font-mono-tech text-[#334e68] uppercase font-bold mb-2.5">
                1. EQUIPMENT CATEGORY
              </div>
              <div className="flex flex-wrap gap-2">
                {MATRIX_TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-3.5 py-2 rounded text-xs font-mono-tech font-bold transition-colors cursor-pointer ${
                      activeTab === tab
                        ? "bg-[#0d1829] text-white"
                        : "bg-[#dce8f8] text-[#0f172a] hover:bg-[#c8dbf5]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-[10px] font-mono-tech text-[#334e68] uppercase font-bold mb-1.5">
                  2. RHEOLOGY &amp; HYDRATION PROFILE
                </label>
                <select
                  value={hydrationFilter}
                  onChange={(e) => setHydrationFilter(e.target.value)}
                  className="w-full h-10 px-3 rounded bg-[#eff5fc] border border-blue-100 text-xs font-medium text-[#0f172a]"
                >
                  <option>Any Hydration Rating</option>
                  <option value="High Rheology">High Rheology (52% - 88%+)</option>
                  <option value="Standard">Standard Commercial (55% - 75%)</option>
                  <option value="Fat">Fat / Dough Lamination Layers</option>
                  <option value="Variable">Variable Solid &amp; Emulsified Batter</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono-tech text-[#334e68] uppercase font-bold mb-1.5">
                  3. DAILY THROUGHPUT TIER
                </label>
                <select
                  value={throughputFilter}
                  onChange={(e) => setThroughputFilter(e.target.value)}
                  className="w-full h-10 px-3 rounded bg-[#eff5fc] border border-blue-100 text-xs font-medium text-[#0f172a]"
                >
                  <option>All Production Volumes</option>
                  <option value="200">200 - 800 kg/hr</option>
                  <option value="500">500 - 2,500 kg/hr</option>
                  <option value="1,000">1,000 - 3,500 kg/hr</option>
                  <option value="Loaves">600 - 2,200 Loaves/hr</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono-tech text-[#334e68] uppercase font-bold mb-1.5">
                  4. AUTOMATION TIER
                </label>
                <select
                  value={automationFilter}
                  onChange={(e) => setAutomationFilter(e.target.value)}
                  className="w-full h-10 px-3 rounded bg-[#eff5fc] border border-blue-100 text-xs font-medium text-[#0f172a]"
                >
                  <option>All Automation Architectures</option>
                  <option value="Siemens">Siemens S7-1500 PLC &amp; SCADA</option>
                  <option value="Timer">Dual Digital Timer PLC</option>
                  <option value="Servo">Programmable Servo Roller Gap</option>
                  <option value="PID">PID Climate &amp; Retarder PLC</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3x2 Machinery Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {matrixItems.map((item) => (
              <div
                key={item._id || item.modelCode}
                className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with 3 Header Badges */}
                  <div className="bg-[#dce8f8] p-3 relative">
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <div className="flex items-center gap-1">
                        <span className="bg-[#0d1829] text-white text-[9.5px] font-mono-tech font-bold px-2 py-0.5 rounded-xs">
                          {item.modelCode}
                        </span>
                        {item.matrixBadgeMid && (
                          <span
                            className={`text-[9.5px] font-mono-tech font-bold px-2 py-0.5 rounded-xs ${
                              item.matrixBadgeMid.includes("HIGH") ||
                              item.matrixBadgeMid.includes("FERMENTATION")
                                ? "bg-[#d97706] text-white"
                                : "bg-[#c8dbf5] text-[#0f172a]"
                            }`}
                          >
                            {item.matrixBadgeMid}
                          </span>
                        )}
                      </div>
                      {item.matrixBadgeRight && (
                        <span className="bg-white text-[#334e68] text-[9.5px] font-mono-tech font-bold px-2 py-0.5 rounded-xs">
                          {item.matrixBadgeRight}
                        </span>
                      )}
                    </div>

                    <div className="rounded-lg overflow-hidden h-44 bg-slate-100">
                      <img
                        src={item.matrixImage || item.catalogImage || "/images/find-mach-1.png"}
                        alt={item.matrixTitle || item.machineryName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 pb-4">
                    <h3 className="text-lg font-extrabold text-[#0f172a] leading-snug">
                      {item.matrixTitle || `${item.modelCode} ${item.homeTitle || item.machineryName}`}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-2">
                      {item.detailSubtitle || item.description}
                    </p>

                    <div className="space-y-2 mt-4 text-xs text-slate-700">
                      {(item.matrixBullets && item.matrixBullets.length > 0
                        ? item.matrixBullets
                        : [
                            "Siemens S7-1500 PLC Touchscreen with 99-recipe memory",
                            "Heavy-gauge SUS304 food-contact sanitary construction",
                          ]
                      ).map((b, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#334e68] shrink-0 mt-0.5" />
                          <span className="leading-snug">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    to={`/products/${item.modelCode}`}
                    className="block w-full text-center bg-[#dce8f8] hover:bg-[#c8dbf5] text-[#0f172a] font-mono-tech font-bold text-xs py-2.5 rounded transition-colors"
                  >
                    Specs &amp; CAD
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FORMULATION VISCOSITY VS. MACHINERY SPECIFICATION MATRIX */}
      <section className="bg-[#f8fafd] py-16 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-8">
            <div className="text-[11px] font-mono-tech text-[#334e68] uppercase tracking-widest">
              // RHEOLOGICAL ENGINEERING ALIGNMENT
            </div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1 leading-tight">
              Formulation Viscosity vs. Machinery Specification
              <br />
              Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Bakery failures are overwhelmingly mechanical: selecting insufficient torque motors for low-hydration doughs, or undersized hydraulic bowls for acidic sourdoughs. Refer to our engineered compatibility standard:
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0d1829] text-white text-[10.5px] font-mono-tech uppercase tracking-wider">
                  <th className="py-3.5 px-4">DOUGH FORMULATION</th>
                  <th className="py-3.5 px-4">HYDRATION %</th>
                  <th className="py-3.5 px-4">VISCOSITY &amp; GLUTEN</th>
                  <th className="py-3.5 px-4">TOOL &amp; KINETIC MODEL</th>
                  <th className="py-3.5 px-4">THERMAL PROTECTION</th>
                  <th className="py-3.5 px-4">TARGET APEXBAKE SYSTEM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {VISCOSITY_ROWS.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-4 px-4 font-bold text-[#0f172a]">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${row.color}`} />
                        <span>{row.formulation}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono-tech text-[#334e68] font-semibold">
                      {row.hydration}
                    </td>
                    <td className="py-4 px-4 text-slate-600">{row.viscosity}</td>
                    <td className="py-4 px-4 text-slate-600">{row.tool}</td>
                    <td className="py-4 px-4 font-mono-tech text-slate-700 font-medium">
                      {row.thermal}
                    </td>
                    <td className="py-4 px-4 font-mono-tech font-bold text-[#0f172a]">
                      {row.system}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ADDRESSED SIZING & INTEGRATION QUERIES */}
      <section className="bg-[#eef4fc] py-16">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
          <div className="mb-8">
            <div className="text-[11px] font-mono-tech text-[#334e68] uppercase tracking-widest">
              // MACHINERY PROCUREMENT INTELLIGENCE
            </div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1">
              Frequently Addressed Sizing &amp; Integration Queries
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-extrabold text-[#0f172a]">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FindMachineryPage;
