import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  Gauge,
  Box,
  CheckCircle2,
  RefreshCw,
  Scale,
  Truck,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const SCALING_TABS = [
  "All Scaling Paths",
  "Mixing & Dough Handling (Batch to Continuous)",
  "Forming & Sheeting Automation",
  "Thermal & Proofing Throughput",
  "High-Speed Slicing & Packaging",
];

const RETROFIT_PATHWAYS = [
  {
    id: "pathway-1",
    tab: "Mixing & Dough Handling (Batch to Continuous)",
    badge: "PATHWAY #01 • DOUGH PREP & MIXING",
    title: "Batch to Continuous Dough Streamlining",
    subtitle:
      "Transform fragmented manual batch kneading into a continuous, high-volume automated dough flow.",
    bottleneck:
      "Manual bowl handling, single 80kg batch delays, operator exhaustion, and inconsistent dough rest intervals.",
    upgrade:
      "AB-SM250S Heavy Twin Kneader Suite + Hydraulic Automated Bowl Tipper feeding directly into automated divider hoppers.",
    throughput: "250 → 1,800 kg/hr",
    payback: "8 - 11 Months",
    metricLabel: "LABOR REALLOCATION",
    metricValue: "65% Reassigned",
    modelRef: "MODEL: AB-SM250S + HBT-300",
    linkCode: "AB-SM250S",
  },
  {
    id: "pathway-2",
    tab: "Forming & Sheeting Automation",
    badge: "PATHWAY #02 • LAMINATION & SHEETING",
    title: "Artisan Lamination & Sheeting Acceleration",
    subtitle:
      "Eliminate manual hand-crank calibrators while keeping pastry fat layers uniform and cool under high velocity.",
    bottleneck:
      "Manual reversible sheeter bottlenecks, roller thickness discrepancies, butter warm-up, and high dough edge scrap.",
    upgrade:
      "AB-DS650 Multi-Pass Motorized Sheeter with digital servo gauge + continuous food-grade conveyor with chilled tables.",
    throughput: "1.2k → 6.5k units/shift",
    payback: "6 - 9 Months",
    metricLabel: "SCRAP REDUCTION",
    metricValue: "< 0.8% Target",
    modelRef: "MODEL: AB-DS650 SERVO-PRO",
    linkCode: "AB-DS650",
  },
  {
    id: "pathway-3",
    tab: "Thermal & Proofing Throughput",
    badge: "PATHWAY #03 • THERMAL PROCESSING",
    title: "Tunnel Oven & Continuous Proofing Transition",
    subtitle:
      "Replace batch rack trolleys with uninterrupted inline thermal processing and automated steam profiling.",
    bottleneck:
      "Floor trolley congestion, severe heat loss during door cycles, manual proof timing errors, and crust inconsistency.",
    upgrade:
      "AB-TO8 Multi-Zone Modular Tunnel Oven coupled with an ApexBake Continuous Spiral Proofer with ultrasonic climate sensors.",
    throughput: "800 → 3,600 loaves/hr",
    payback: "14 - 18 Months",
    metricLabel: "BTU EFFICIENCY",
    metricValue: "+34% Thermal Recov",
    modelRef: "MODEL: AB-TO8 MODULAR TUNNEL",
    linkCode: "AB-PF24",
  },
  {
    id: "pathway-4",
    tab: "High-Speed Slicing & Packaging",
    badge: "PATHWAY #04 • POST-BAKE & SLICING",
    title: "Automated Continuous Slicing & Infeed",
    subtitle:
      "Upgrade from labor-intensive individual slice stations to continuous inline twin-track synchronized slicing.",
    bottleneck:
      "Countertop slicer blade friction, frequent crumb tears, manual bagging bottlenecks, and operator knife injuries.",
    upgrade:
      "AB-TS300 Continuous Dual-Track Serrated Slicer with automated loaf spacer and direct horizontal flow-wrapper synchronization.",
    throughput: "400 → 2,200 loaves/hr",
    payback: "5 - 7 Months",
    metricLabel: "CRUMB RETENTION",
    metricValue: "< 0.3% Loss",
    modelRef: "MODEL: AB-TS300 DUAL-TRACK",
    linkCode: "AB-TS300",
  },
];

const RETROFIT_FAQS = [
  {
    q: "How does ApexBake ensure line modernization happens without stopping our daily baking output?",
    a: "We utilize our 4-Step Zero-Downtime Scaling Framework. Every machine is pre-assembled and live-dough tested (FAT) at our Chicago campus while we pre-stage 480V drops and pneumatic manifolds at your facility. Physical mechanical installation and PLC interlock cutover are executed within a scheduled 36-hour weekend maintenance window.",
  },
  {
    q: "Can new ApexBake mixers and proofers interface with our existing legacy third–party ovens and dividers?",
    a: "Yes. All ApexBake systems run on open-architecture Siemens S7-1500 or Rockwell Allen-Bradley ControlLogix PLCs with native PackML and OPC-UA telemetry. We provide custom transition conveyors, optical photo-eye accumulation buffers, and speed-matching VFD handshakes for seamless third-party line synchronization.",
  },
  {
    q: "What trade–in value can we expect for our older machinery?",
    a: "Under the ApexBake Guaranteed Buy-Back & Trade-In Program, we credit between 20% and 40% of fair market appraisal value toward your new high-throughput line. We accept both legacy ApexBake models and major commercial brands (Hobart, Bongard, MIWE, Polin, Diosna) and cover all rigging and extraction logistics.",
  },
  {
    q: "Does our electrical service need an upgrade to support high–speed continuous lines?",
    a: "Not necessarily. Modern ApexBake VFD inverter drives and high-efficiency IE4 motors draw up to 24% less peak starting current than older direct-on-line contactor mixers. Our OEE diagnostic audit includes a complete 3-phase load balance study of your existing switchgear.",
  },
  {
    q: "How does SCADA and PLC remote telemetry monitor our expanded line efficiency?",
    a: "Each upgraded line includes secure Ethernet/IP and cloud-optional OEE dashboards tracking batch cycle times, dough temperature curves, motor amperage draw, and preventative maintenance intervals in real time.",
  },
];

const UpgradeMachineryPage = () => {
  const { openQuoteModal } = useApp();
  const [selectedTab, setSelectedTab] = useState("All Scaling Paths");
  const [openFaq, setOpenFaq] = useState(0);

  const visiblePathways =
    selectedTab === "All Scaling Paths"
      ? RETROFIT_PATHWAYS
      : RETROFIT_PATHWAYS.filter((p) => p.tab === selectedTab);

  return (
    <div className="w-full bg-[#f8fafd]">
      {/* Top Breadcrumb */}
      <div className="bg-[#eef4fc] border-b border-slate-200/80 py-3">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 text-xs font-mono-tech text-slate-500 flex items-center gap-1.5">
          <Link to="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#334e68]">Solutions</span>
          <span>/</span>
          <span className="text-slate-900 font-bold">
            Upgrade &amp; Scale Up Operations
          </span>
        </div>
      </div>

      {/* 1. DARK NAVY HERO SECTION */}
      <section className="bg-[#0d1829] text-white pt-12 pb-10 border-b border-slate-800">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-12 border-b border-slate-800">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech text-[#f59e0b] uppercase tracking-widest font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>B2B MACHINERY SCALABILITY • OEE OPTIMIZATION ENGINE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.13]">
                Upgrade Machinery &amp; Scale Production
                <br />
                Capacity Up to{" "}
                <span className="text-[#f59e0b]">10,000+ kg/hr</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Overcome production bottlenecks, automate manual line transitions, and expand shift throughput without halting your daily bakery schedule. Our industrial engineers modernize existing lines with modular mixers, high-speed automated slicers, continuous tunnel ovens, and seamless PLC SCADA synchronization.
              </p>

              <div className="pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-sm font-mono-tech font-bold text-[#f59e0b] hover:text-amber-300 uppercase tracking-wider"
                >
                  <span>VIEW PRODUCTS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right 5 Cols: Telemetry Benchmark Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#162235] rounded-xl p-5 border border-slate-700/80 shadow-xl space-y-3.5">
                <div className="flex items-center justify-between text-[10px] font-mono-tech">
                  <span className="text-slate-300 uppercase">TELEMETRY BENCHMARK</span>
                  <span className="text-[#f59e0b] font-bold uppercase">
                    LIVE FACILITY SCADA
                  </span>
                </div>

                <div className="relative rounded-lg overflow-hidden h-44 bg-slate-900">
                  <img
                    src="/images/upgrade-telemetry.png"
                    alt="Live Facility SCADA Retrofit"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-[#0d1829]/90 backdrop-blur-xs px-3 py-1.5 rounded text-[10px] font-mono-tech text-slate-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <span>ACTIVE RETROFIT: MILWAUKEE COMMERCIAL LINE #4</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#0d1829] rounded-lg p-3 border border-slate-800">
                    <div className="text-[9.5px] font-mono-tech text-slate-400 uppercase">
                      PRE-UPGRADE OUTPUT
                    </div>
                    <div className="text-lg font-mono-tech font-bold text-white mt-0.5">
                      1,240 <span className="text-xs font-normal text-slate-400">kg/hr</span>
                    </div>
                  </div>
                  <div className="bg-[#0d1829] rounded-lg p-3 border border-slate-800">
                    <div className="text-[9.5px] font-mono-tech text-[#f59e0b] uppercase">
                      POST-RETROFIT CAPACITY
                    </div>
                    <div className="text-lg font-mono-tech font-bold text-white mt-0.5">
                      4,800 <span className="text-xs font-normal text-slate-400">kg/hr</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 4 Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#f59e0b]">+180%</div>
              <div className="text-xs font-bold text-white mt-1">Avg Throughput Increase</div>
              <div className="text-[11px] font-mono-tech text-slate-400 mt-0.5">
                Validated across 420+ facilities
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">ZERO</div>
              <div className="text-xs font-bold text-white mt-1">Unplanned Downtime</div>
              <div className="text-[11px] font-mono-tech text-slate-400 mt-0.5">
                Phased weekend hot-swap cutover
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#f59e0b]">
                UP TO 40%
              </div>
              <div className="text-xs font-bold text-white mt-1">Trade-In Asset Credit</div>
              <div className="text-[11px] font-mono-tech text-slate-400 mt-0.5">
                Direct write-down on new lines
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                PLUG &amp; PLAY
              </div>
              <div className="text-xs font-bold text-white mt-1">Siemens &amp; Rockwell</div>
              <div className="text-[11px] font-mono-tech text-slate-400 mt-0.5">
                PackML &amp; OPC-UA native standard
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TARGETED MACHINERY RETROFITS BY PROCESS STAGE */}
      <section className="py-16 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-6">
            <h2 className="text-3xl font-extrabold text-[#0f172a]">
              Targeted Machinery Retrofits by Process Stage
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Identify your facility's current choke point to deploy modular machinery upgrades that elevate output without requiring whole-plant reconstruction.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {SCALING_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded text-xs font-bold transition-colors cursor-pointer ${
                  selectedTab === tab
                    ? "bg-[#0d1829] text-white"
                    : "bg-[#dce8f8] text-[#0f172a] hover:bg-[#c8dbf5]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 2x2 Pathway Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {visiblePathways.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl p-7 border border-slate-200 shadow-2xs flex flex-col justify-between space-y-5"
              >
                <div>
                  <span className="inline-block bg-[#dce8f8] text-[#0f172a] text-[10px] font-mono-tech font-bold px-2.5 py-1 rounded">
                    {p.badge}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0f172a] mt-3">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {p.subtitle}
                  </p>

                  {/* Comparison Split Boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                    <div className="bg-[#f1f6fd] rounded-lg p-4">
                      <div className="text-[10px] font-mono-tech text-red-600 font-bold uppercase">
                        CURRENT BOTTLENECK
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                        {p.bottleneck}
                      </p>
                    </div>

                    <div className="bg-[#dce8f8] rounded-lg p-4">
                      <div className="text-[10px] font-mono-tech text-[#334e68] font-bold uppercase">
                        APEXBAKE UPGRADE
                      </div>
                      <p className="text-xs text-[#0f172a] font-semibold leading-relaxed mt-1.5">
                        {p.upgrade}
                      </p>
                    </div>
                  </div>

                  {/* 3 Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 bg-[#eff5fc] rounded-lg p-3.5 mt-4 text-xs">
                    <div>
                      <div className="text-[9.5px] font-mono-tech text-slate-500 uppercase">
                        THROUGHPUT
                      </div>
                      <div className="font-mono-tech font-bold text-[#0f172a] mt-0.5">
                        {p.throughput}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9.5px] font-mono-tech text-slate-500 uppercase">
                        PAYBACK ENVELOPE
                      </div>
                      <div className="font-mono-tech font-bold text-[#0f172a] mt-0.5">
                        {p.payback}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9.5px] font-mono-tech text-slate-500 uppercase">
                        {p.metricLabel}
                      </div>
                      <div className="font-mono-tech font-bold text-[#d97706] mt-0.5">
                        {p.metricValue}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10.5px] font-mono-tech text-slate-500">
                    {p.modelRef}
                  </span>
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/products/${p.linkCode}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0f172a] hover:text-[#d97706]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Specs</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        openQuoteModal({
                          modelCode: p.linkCode,
                          machineryName: p.title,
                        })
                      }
                      className="bg-[#0d1829] hover:bg-slate-800 text-white font-mono-tech font-bold text-[11px] uppercase px-4 py-2 rounded transition-colors cursor-pointer"
                    >
                      ASSESS LINE &gt;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE 4-STEP ZERO-DOWNTIME SCALING FRAMEWORK */}
      <section className="bg-[#eef4fc] py-16 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-[10.5px] font-mono-tech text-[#334e68] uppercase tracking-widest font-semibold">
              ENGINEERING METHODOLOGY
            </div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1">
              The 4–Step Zero–Downtime Scaling Framework
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              We install and commission industrial baking upgrades around your active shipping commitments. Your plant continues meeting grocery purchase orders without disruption.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 01 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono-tech font-extrabold text-[#334e68]">
                    01
                  </span>
                  <Gauge className="w-5 h-5 text-[#334e68]" />
                </div>
                <h3 className="text-base font-extrabold text-[#0f172a]">
                  OEE &amp; Bottleneck Diagnostic
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  ApexBake systems engineers analyze actual line cycle times, thermal dissipation rates, and operator transfer friction points on site.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] font-mono-tech text-[#334e68] font-bold uppercase">
                OUTPUT: 36-POINT AUDIT REPORT
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono-tech font-extrabold text-[#334e68]">
                    02
                  </span>
                  <Box className="w-5 h-5 text-[#334e68]" />
                </div>
                <h3 className="text-base font-extrabold text-[#0f172a]">
                  3D Digital Twin Layout
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  We generate millimetric 3D CAD factory simulations to verify exact drain trenches, 480V drops, pneumatic drops, and ceiling height envelope.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] font-mono-tech text-[#334e68] font-bold uppercase">
                OUTPUT: BIM/CAD INTEGRATION PACK
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono-tech font-extrabold text-[#334e68]">
                    03
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-[#334e68]" />
                </div>
                <h3 className="text-base font-extrabold text-[#0f172a]">
                  Pre–Commissioning FAT Runoff
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Factory Acceptance Testing at our Chicago facility using your proprietary flour, dough hydration ratio, and proofing recipes before shipping.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] font-mono-tech text-[#334e68] font-bold uppercase">
                OUTPUT: ZERO-DEFECT SIGN-OFF
              </div>
            </div>

            {/* Step 04 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono-tech font-extrabold text-[#d97706]">
                    04
                  </span>
                  <RefreshCw className="w-5 h-5 text-[#d97706]" />
                </div>
                <h3 className="text-base font-extrabold text-[#0f172a]">
                  Weekend Hot–Swap Cutover
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Staged mechanical anchoring and electrical interlock synchronization completed within a 36-hour window, followed by live operator SOP training.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] font-mono-tech text-[#d97706] font-bold uppercase">
                OUTPUT: MONDAY 05:00 FULL RUN
              </div>
            </div>
          </div>

          {/* 4. APEXBAKE GUARANTEED BUY-BACK & TRADE-IN PROGRAM */}
          <div className="mt-14 bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left 7 Cols */}
              <div className="lg:col-span-7 space-y-5">
                <span className="inline-block bg-[#dce8f8] text-[#0f172a] text-[10px] font-mono-tech font-bold px-3 py-1 rounded">
                  • CAPEX EFFICIENCY INITIATIVE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] leading-tight">
                  ApexBake Guaranteed Buy–Back &amp;
                  <br />
                  Trade–In Program
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Don't let depreciated, slow equipment drag down your balance sheet. ApexBake acquires your existing legacy mixers, spiral coolers, rack ovens, and sheeters—whether ApexBake original equipment or legacy third-party manufacturers (Hobart, Bongard, MIWE, Polin, Diosna)—providing immediate capital credits up to 40% against your new high-throughput production line.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono-tech font-bold text-[#0f172a]">
                      <Scale className="w-4 h-4 text-[#d97706]" />
                      <span>Fair Market Appraisal</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      Certified mechanical appraisal within 48 hours of photo submission.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono-tech font-bold text-[#0f172a]">
                      <Truck className="w-4 h-4 text-[#d97706]" />
                      <span>Zero Rigging Friction</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      ApexBake covers professional rigging and heavy logistics extraction.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono-tech font-bold text-[#0f172a]">
                      <CheckCircle2 className="w-4 h-4 text-[#d97706]" />
                      <span>Synced Replacement</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      Old machinery leaves only when the new unit is in position.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Dark Trade-In Value Brackets */}
              <div className="lg:col-span-5">
                <div className="bg-[#0d1829] text-white rounded-xl p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-[10.5px] font-mono-tech text-[#f59e0b] uppercase font-bold">
                    <span>TRADE-IN VALUE BRACKETS</span>
                    <ShieldCheck className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="space-y-2 text-xs font-mono-tech">
                    <div className="bg-[#162235] px-3.5 py-2.5 rounded flex items-center justify-between">
                      <span className="text-slate-200">Spiral Kneaders (2014+)</span>
                      <span className="text-[#f59e0b] font-bold">30% - 40% Credit</span>
                    </div>
                    <div className="bg-[#162235] px-3.5 py-2.5 rounded flex items-center justify-between">
                      <span className="text-slate-200">Rotary Rack Ovens (Gas/Elec)</span>
                      <span className="text-[#f59e0b] font-bold">25% - 35% Credit</span>
                    </div>
                    <div className="bg-[#162235] px-3.5 py-2.5 rounded flex items-center justify-between">
                      <span className="text-slate-200">Semi-Auto Dough Sheeters</span>
                      <span className="text-[#f59e0b] font-bold">20% - 32% Credit</span>
                    </div>
                    <div className="bg-[#162235] px-3.5 py-2.5 rounded flex items-center justify-between">
                      <span className="text-slate-200">Multi-Drop Slicing Systems</span>
                      <span className="text-[#f59e0b] font-bold">28% - 38% Credit</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openQuoteModal({
                        modelCode: "TRADE-IN",
                        machineryName: "Trade-In & Line Upgrade Assessment",
                      })
                    }
                    className="w-full h-10 bg-[#dce8f8] hover:bg-white text-[#0f172a] font-mono-tech font-bold text-xs uppercase rounded transition-colors cursor-pointer"
                  >
                    INCLUDE TRADE-IN IN AUDIT INTAKE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INDUSTRIAL RETROFIT & MODERNIZATION FAQ */}
      <section className="bg-[#eef4fc] py-16">
        <div className="max-w-[960px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <div className="text-[10.5px] font-mono-tech text-[#334e68] uppercase tracking-widest font-semibold">
              ENGINEERING CONSULTATION FAQ
            </div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1">
              Industrial Retrofit &amp; Modernization FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Direct engineering answers regarding integration, legacy hardware compatibility, utility needs, and cutover protocols.
            </p>
          </div>

          <div className="space-y-3.5">
            {RETROFIT_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/90 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-extrabold text-[#0f172a]">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
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

export default UpgradeMachineryPage;
