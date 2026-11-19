import React from "react";
import { Link } from "react-router-dom";
import {
  Factory,
  Play,
  Globe,
  Clock,
  Ruler,
  Shield,
  Radio,
  CheckCircle2,
  Award,
  Lightbulb,
  Infinity as InfinityIcon,
  Handshake,
  RefreshCw,
  DollarSign,
  FileCheck,
  Headphones,
  MessageSquare,
  Phone,
  Mail,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const AboutPage = () => {
  const { openQuoteModal } = useApp();

  return (
    <div className="w-full bg-[#f8fafd]">
      {/* Sub-header Bar */}
      <div className="bg-[#eef4fc] border-b border-slate-200/80 py-2.5">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2 text-[10.5px] font-mono-tech">
          <div className="text-slate-600">
            PLANT HQ / <strong className="text-[#0f172a]">CORPORATE PROFILE &amp; HERITAGE</strong>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <span className="text-[#334e68] font-semibold">CAMPUS ID: IL-60638-USA</span>
            <span>•</span>
            <span className="text-[#0f172a] font-semibold">
              EST. 1994 • 30+ YRS ACTIVE PRODUCTION
            </span>
          </div>
        </div>
      </div>

      {/* 1. DARK NAVY HERO SECTION */}
      <section className="bg-[#0d1829] text-white py-14 lg:py-18 border-b border-slate-800">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-block bg-slate-800 border border-slate-700 text-[#f59e0b] text-[10.5px] font-mono-tech font-bold px-3 py-1 rounded-xs uppercase">
                • INDUSTRIAL MACHINERY HERITAGE
              </span>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.12]">
                Engineering Excellence in
                <br />
                Industrial Bakery Machinery
                <br />
                <span className="text-[#d97706]">Since 1994.</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Partnering with commercial bakeries and global food processors to deliver reliable, heavy-duty equipment built to perform under demanding production schedules. From precision dough rheology to fully integrated continuous thermal lines.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => openQuoteModal()}
                  className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded shadow-sm transition-colors cursor-pointer"
                >
                  <Factory className="w-4 h-4" />
                  <span>SCHEDULE FACILITY AUDIT</span>
                </button>

                <a
                  href="#campus-capabilities"
                  className="inline-flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-xs px-6 py-4 rounded border border-slate-700 transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Explore Campus Capabilities</span>
                </a>
              </div>
            </div>

            {/* Right 5 Cols: 3 Stacked Metric Cards */}
            <div className="lg:col-span-5 space-y-3.5">
              <div className="bg-[#162235] rounded-xl p-5 border border-slate-700/80">
                <div className="flex items-center justify-between text-[10px] font-mono-tech text-slate-300 uppercase">
                  <span>GLOBAL INSTALLATIONS</span>
                  <Globe className="w-4 h-4 text-[#f59e0b]" />
                </div>
                <div className="text-3xl font-extrabold text-white mt-1">45+</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Countries serviced with in-region field engineers
                </div>
              </div>

              <div className="bg-[#162235] rounded-xl p-5 border border-slate-700/80">
                <div className="flex items-center justify-between text-[10px] font-mono-tech text-slate-300 uppercase">
                  <span>CONTINUOUS RUNTIME RELIABILITY</span>
                  <Clock className="w-4 h-4 text-[#f59e0b]" />
                </div>
                <div className="text-3xl font-extrabold text-white mt-1">99.82%</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Documented mean uptime across continuous tunnel lines
                </div>
              </div>

              <div className="bg-[#162235] rounded-xl p-5 border border-slate-700/80">
                <div className="flex items-center justify-between text-[10px] font-mono-tech text-slate-300 uppercase">
                  <span>MANUFACTURING SURFACE</span>
                  <Ruler className="w-4 h-4 text-[#f59e0b]" />
                </div>
                <div className="text-3xl font-extrabold text-white mt-1">185,000</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Sq. ft heavy CNC, assembly bays, and cleanrooms
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FACTORY PANORAMA BANNER */}
      <section className="py-10 bg-[#f8fafd]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <img
              src="/images/about-banner.png"
              alt="Integrated Automated Dough Processing System Simulation"
              className="w-full h-auto object-cover block"
            />
          </div>
        </div>
      </section>

      {/* 3. CHAPTER 01 • OUR ORIGIN */}
      <section className="py-14 bg-white border-y border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 6 Cols */}
            <div className="lg:col-span-6 space-y-5">
              <div className="text-[11px] font-mono-tech text-[#334e68] uppercase tracking-widest font-semibold">
                • CHAPTER 01 • OUR ORIGIN
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight">
                Over Three Decades of
                <br />
                Heavy–Duty Mechanical
                <br />
                Engineering
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Founded in 1994 in the industrial heartland of Illinois, ApexBake Industrial began with a direct engineering focus: eliminate mechanical stress fractures and sanitation pain-points commonly found in high-volume industrial bakeries. What started as an engineering consultancy for heavy bakery overhauls has grown into an internationally respected machinery manufacturer.
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Our vertically integrated Chicago manufacturing campus encompasses automated multi-axis fiber laser cutting, CNC horizontal machining centers, certified robotic TIG welding cells, and dedicated EHEDG sanitary finishing bays. By maintaining total internal control over metallurgy, machining tolerance, and PLC architecture, we guarantee every machine fulfills severe-duty 24/7 runtimes.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-[#f4f8fd] rounded-lg p-3.5 border border-slate-200/80">
                  <div className="text-xl font-extrabold text-[#0f172a]">100%</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    In-House CNC Fabrication
                  </div>
                </div>
                <div className="bg-[#f4f8fd] rounded-lg p-3.5 border border-slate-200/80">
                  <div className="text-xl font-extrabold text-[#0f172a]">45+</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Countries Supplied</div>
                </div>
                <div className="bg-[#f4f8fd] rounded-lg p-3.5 border border-slate-200/80">
                  <div className="text-xl font-extrabold text-[#d97706]">12,000</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    Units Active Globally
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Bento Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden border border-slate-200 h-56">
                  <img
                    src="/images/about-cnc.png"
                    alt="CNC Machining"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-[#eff5fc] rounded-xl p-5 border border-blue-100">
                  <div className="text-[10px] font-mono-tech text-[#334e68] uppercase font-bold">
                    METALLURGY INTEGRITY
                  </div>
                  <div className="text-base font-extrabold text-[#0f172a] mt-1">
                    SUS304 / SUS316 Only
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Zero carbon contamination. Strict laser spectrometry validation upon raw material arrival.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-5">
                <div className="bg-[#1e2d42] text-white rounded-xl p-5">
                  <div className="text-[10px] font-mono-tech text-slate-300 uppercase font-bold">
                    PLC INTELLIGENCE
                  </div>
                  <div className="text-base font-extrabold text-white mt-1">
                    Open Architecture
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Rockwell Allen-Bradley and Siemens S7 native integration without proprietary black-boxes.
                  </p>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 h-56">
                  <img
                    src="/images/about-plc.png"
                    alt="PLC Control Assembly"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STRATEGIC ALIGNMENT — OUR ENGINEERING DIRECTIVE */}
      <section className="bg-[#dce8f8] py-16 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-[10.5px] font-mono-tech text-[#334e68] uppercase tracking-widest font-semibold">
              STRATEGIC ALIGNMENT
            </div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1">
              Our Engineering Directive
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Clear principles that shape every blueprint, gear-ratio selection, and clean-in-place (CIP) spray nozzle layout.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {/* Primary Mission */}
            <div className="bg-white rounded-xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-5">
              <div className="w-10 h-10 rounded bg-[#dce8f8] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#334e68]" />
              </div>
              <div className="text-[10.5px] font-mono-tech text-[#d97706] uppercase font-bold">
                PRIMARY MISSION
              </div>
              <h3 className="text-2xl font-extrabold text-[#0f172a] leading-snug">
                Operational Precision for Every
                <br />
                Production Batch
              </h3>
              <p className="text-sm text-slate-600 italic leading-relaxed">
                “To empower commercial and industrial bakers worldwide with robust, hygienic, and energy-efficient bakery machinery that maximizes yield, minimizes downtime, and guarantees consistent product quality.”
              </p>
              <div className="space-y-2 pt-2 text-xs font-mono-tech text-[#0f172a]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                  <span>Sub-millimeter scaling accuracy on volumetric dividers</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                  <span>Up to 24% reduction in thermal BTU consumption in tunnel decks</span>
                </div>
              </div>
            </div>

            {/* Future Horizon */}
            <div className="bg-[#0d1829] text-white rounded-xl p-8 sm:p-10 border border-slate-800 shadow-lg space-y-5">
              <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center">
                <Radio className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div className="text-[10.5px] font-mono-tech text-slate-400 uppercase font-bold">
                FUTURE HORIZON
              </div>
              <h3 className="text-2xl font-extrabold text-white leading-snug">
                Connected Sanitary Food
                <br />
                Processing
              </h3>
              <p className="text-sm text-slate-300 italic leading-relaxed">
                “To be the international benchmark for intelligent bakery machinery manufacturing, pioneering sanitary design and Industry 4.0 IoT plant integration.”
              </p>
              <div className="space-y-2 pt-2 text-xs font-mono-tech text-slate-200">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                  <span>Predictive bearing and motor temperature vibration telemetry</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                  <span>Full compliance with EHEDG Doc 8 hygienic design principles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FIVE CORE PILLARS OF APEXBAKE */}
      <section className="bg-[#f4f8fd] py-16 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-[10.5px] font-mono-tech text-[#334e68] uppercase tracking-widest">
                MANUFACTURING PRINCIPLES
              </div>
              <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1">
                Five Core Pillars of ApexBake
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                The uncompromising engineering benchmarks guiding our designers, welders, and commissioning staff daily.
              </p>
            </div>
            <div className="text-[11px] font-mono-tech text-[#0f172a] font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#d97706]" />
              <span>ISO 9001:2015 AUDITED STANDARDS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pillar 01 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded bg-[#dce8f8] flex items-center justify-center mb-3">
                  <Award className="w-4 h-4 text-[#0f172a]" />
                </div>
                <div className="text-[10px] font-mono-tech text-[#334e68] font-bold">
                  01 / INTEGRITY
                </div>
                <h3 className="text-base font-extrabold text-[#0f172a] mt-1">
                  Uncompromising Quality
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Rigorous non-destructive material testing, X-ray inspected pressure vessels, and genuine German SEW-Eurodrive and Japanese NSK bearing components.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-tech">
                <span className="text-slate-500">METRIC:</span>
                <span className="font-bold text-[#0f172a]">&lt; 0.04% Defect Rate</span>
              </div>
            </div>

            {/* Pillar 02 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded bg-[#dce8f8] flex items-center justify-center mb-3">
                  <Lightbulb className="w-4 h-4 text-[#0f172a]" />
                </div>
                <div className="text-[10px] font-mono-tech text-[#334e68] font-bold">
                  02 / ADVANCEMENT
                </div>
                <h3 className="text-base font-extrabold text-[#0f172a] mt-1">
                  Practical Innovation
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Dedicated test bakeries analyzing gluten network formation and dough hydration rheology to eliminate stress shearing during automated handling.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-tech">
                <span className="text-slate-500">ANNUAL R&amp;D:</span>
                <span className="font-bold text-[#0f172a]">8.5% Gross Revenue</span>
              </div>
            </div>

            {/* Pillar 03 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded bg-[#dce8f8] flex items-center justify-center mb-3">
                  <InfinityIcon className="w-4 h-4 text-[#0f172a]" />
                </div>
                <div className="text-[10px] font-mono-tech text-[#334e68] font-bold">
                  03 / ENDURANCE
                </div>
                <h3 className="text-base font-extrabold text-[#0f172a] mt-1">
                  Severe–Duty Reliability
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Every drive shaft, planetary gear system, and heavy cast hinge is deliberately engineered for uninterrupted 24/7 continuous duty cycles in high-humidity facilities.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-tech">
                <span className="text-slate-500">MTBF BENCHMARK:</span>
                <span className="font-bold text-[#0f172a]">&gt; 38,000 Hours</span>
              </div>
            </div>

            {/* Pillar 04 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded bg-[#dce8f8] flex items-center justify-center mb-3">
                  <Handshake className="w-4 h-4 text-[#0f172a]" />
                </div>
                <div className="text-[10px] font-mono-tech text-[#334e68] font-bold">
                  04 / PARTNERSHIP
                </div>
                <h3 className="text-base font-extrabold text-[#0f172a] mt-1">
                  Lifetime Partnership
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  We operate beyond transactional sales. ApexBake offers direct access to lead mechanical engineers, rapid-dispatch field technicians, and lifetime schematics archives.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-tech">
                <span className="text-slate-500">CLIENT RETENTION:</span>
                <span className="font-bold text-[#0f172a]">94% Over 10 Years</span>
              </div>
            </div>

            {/* Pillar 05 (Spans 2 Columns) */}
            <div className="lg:col-span-2 bg-[#162235] text-white rounded-xl p-7 border border-slate-700 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-2.5">
                <div className="w-9 h-9 rounded bg-slate-800 flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 text-[#f59e0b]" />
                </div>
                <div className="text-[10px] font-mono-tech text-[#f59e0b] font-bold">
                  05 / EVOLUTION
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  Continuous Kaizen &amp; Sanitary Evolution
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Active engineering feedback loops with plant managers continually refine CIP washdown speed, eliminate microbial harboring seams, and streamline operator line changeovers.
                </p>
              </div>
              <div className="md:col-span-5 bg-[#1e2d42] rounded-lg p-4 border border-slate-700/80 space-y-2 text-[11px] font-mono-tech">
                <div className="text-[#f59e0b] font-bold uppercase">
                  STANDARDIZED PROTOCOLS
                </div>
                <div className="text-slate-200">• CIP Cycle Time: -35% vs 2018</div>
                <div className="text-slate-200">• Tool-less Disassembly: 90% Parts</div>
                <div className="text-slate-200">• Ergonomic HMI Navigation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INSIDE THE APEXBAKE MANUFACTURING CAMPUS */}
      <section id="campus-capabilities" className="bg-[#eef4fc] py-16 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-10">
            <div className="text-[10.5px] font-mono-tech text-[#334e68] uppercase tracking-widest">
              FACILITY TOUR &amp; CAPABILITIES
            </div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1 leading-tight">
              Inside the ApexBake Manufacturing
              <br />
              Campus
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Our heavy machinery is engineered from primary certified raw sheets to finished automated cells inside our unified 185,000 sq. ft facility. Here is how precision is manufactured into every ApexBake unit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
              <div className="h-44 bg-slate-100">
                <img
                  src="/images/about-bay-a.png"
                  alt="12kW Fiber Laser Systems"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="text-[10px] font-mono-tech text-[#334e68] font-bold">
                  BAY A • CUTTING
                </div>
                <h3 className="text-sm font-extrabold text-[#0f172a] mt-1">
                  12kW Fiber Laser Systems
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  Tolerances maintained within ±0.05mm on 25mm structural SUS304 frames to prevent structural vibration.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
              <div className="h-44 bg-slate-100">
                <img
                  src="/images/about-bay-b.png"
                  alt="Robotic & Sanitary TIG"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="text-[10px] font-mono-tech text-[#334e68] font-bold">
                  BAY B • SANITARY FABRICATION
                </div>
                <h3 className="text-sm font-extrabold text-[#0f172a] mt-1">
                  Robotic &amp; Sanitary TIG
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  Continuous full-penetration welding ground to Ra &lt; 0.8 μm surface roughness to satisfy EHEDG food-safety rules.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
              <div className="h-44 bg-slate-100">
                <img
                  src="/images/about-bay-c.png"
                  alt="Dynamic Balance Benches"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="text-[10px] font-mono-tech text-[#334e68] font-bold">
                  BAY C • DYNAMICS
                </div>
                <h3 className="text-sm font-extrabold text-[#0f172a] mt-1">
                  Dynamic Balance Benches
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  High-inertia spiral arms and high-speed slicing drums dynamically balanced up to 1,800 RPM to preserve bearing life.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
              <div className="h-44 bg-slate-100">
                <img
                  src="/images/about-bay-d.png"
                  alt="Pre-Shipment FAT Benches"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="text-[10px] font-mono-tech text-[#334e68] font-bold">
                  BAY D • COMMISSIONING
                </div>
                <h3 className="text-sm font-extrabold text-[#0f172a] mt-1">
                  Pre–Shipment FAT Benches
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  Complete client factory simulation with 100% full-load electrical safety insulation and thermal telemetry sign-off.
                </p>
              </div>
            </div>
          </div>

          {/* Standard Pre-Dispatch FAT Protocol */}
          <div className="mt-8 bg-[#dce8f8] rounded-xl p-6 border border-blue-200">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-[10.5px] font-mono-tech font-bold">
              <div className="flex items-center gap-2 text-[#0f172a]">
                <CheckCircle2 className="w-4 h-4 text-[#d97706]" />
                <span>STANDARD PRE-DISPATCH FACTORY ACCEPTANCE TEST (FAT) PROTOCOL</span>
              </div>
              <span className="text-slate-600">DOCUMENTATION: APEX-SOP-904</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="text-[10px] font-mono-tech text-[#334e68] font-bold">STEP 01</div>
                <div className="text-xs font-extrabold text-[#0f172a] mt-0.5">
                  Spectrometry Check
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Positive material identification (PMI) of all steel grades before cutting.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-[10px] font-mono-tech text-[#334e68] font-bold">STEP 02</div>
                <div className="text-xs font-extrabold text-[#0f172a] mt-0.5">
                  Load Ampere Analysis
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Continuous motor draw monitoring under synthetic heavy viscoelastic dough loads.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-[10px] font-mono-tech text-[#334e68] font-bold">STEP 03</div>
                <div className="text-xs font-extrabold text-[#0f172a] mt-0.5">
                  Thermal Scans
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  FLIR infrared thermal profiling across drive transmissions and multi-zone burners.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-[10px] font-mono-tech text-[#334e68] font-bold">STEP 04</div>
                <div className="text-xs font-extrabold text-[#0f172a] mt-0.5">
                  Hygienic Swab Sign–Off
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  ATP bioluminescence testing certifying cleanroom sanitary packaging delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY GLOBAL PLANT DIRECTORS SPECIFY APEXBAKE */}
      <section className="bg-white py-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="max-w-xl mb-10">
            <div className="text-[10.5px] font-mono-tech text-[#334e68] uppercase tracking-widest">
              ENTERPRISE CREDIBILITY
            </div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1 leading-tight">
              Why Global Plant Directors Specify
              <br />
              ApexBake
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Direct capabilities designed to minimize procurement friction, guarantee warranty backing, and preserve asset longevity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#f8fafd] rounded-xl p-6 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded bg-[#dce8f8] flex items-center justify-center mb-3">
                  <DollarSign className="w-4 h-4 text-[#0f172a]" />
                </div>
                <h3 className="text-sm font-extrabold text-[#0f172a]">
                  Direct–from–Manufacturer Pricing
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Eliminate third-party distributor markups and work directly with the mechanical engineers who draft your line integrations.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/70 text-[10.5px] font-mono-tech text-[#334e68] font-bold">
                • Direct OEM Support Channel
              </div>
            </div>

            <div className="bg-[#f8fafd] rounded-xl p-6 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded bg-[#dce8f8] flex items-center justify-center mb-3">
                  <FileCheck className="w-4 h-4 text-[#0f172a]" />
                </div>
                <h3 className="text-sm font-extrabold text-[#0f172a]">
                  100% Stainless Steel Traceability
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Every contact surface includes verifiable EN 10204 3.1 Mill Test Certificates ensuring certified food-grade nickel-chromium content.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/70 text-[10.5px] font-mono-tech text-[#334e68] font-bold">
                • Complete MTR Dossier Provided
              </div>
            </div>

            <div className="bg-[#f8fafd] rounded-xl p-6 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded bg-[#dce8f8] flex items-center justify-center mb-3">
                  <Clock className="w-4 h-4 text-[#0f172a]" />
                </div>
                <h3 className="text-sm font-extrabold text-[#0f172a]">
                  10+ Year Spare Parts Guarantee
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  We warehouse genuine critical wear components, replacement spiral shafts, and heating elements for guaranteed dispatch within 24 hours.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/70 text-[10.5px] font-mono-tech text-[#334e68] font-bold">
                • Guaranteed Parts Availability
              </div>
            </div>

            <div className="bg-[#f8fafd] rounded-xl p-6 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded bg-[#dce8f8] flex items-center justify-center mb-3">
                  <Headphones className="w-4 h-4 text-[#0f172a]" />
                </div>
                <h3 className="text-sm font-extrabold text-[#0f172a]">
                  Multilingual Field Commissioning
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Factory-trained field engineers provide on-site installation, line integration, and secure remote VPN tele-diagnostics worldwide.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/70 text-[10.5px] font-mono-tech text-[#334e68] font-bold">
                • 24/7 Remote Tele-Diagnostics
              </div>
            </div>
          </div>

          {/* Compliance Strip */}
          <div className="mt-10 bg-[#dce8f8] rounded-xl p-6 border border-blue-200">
            <div className="text-[10px] font-mono-tech text-[#334e68] uppercase font-bold">
              COMPLIANCE &amp; CERTIFICATION FRAMEWORK
            </div>
            <div className="text-sm font-extrabold text-[#0f172a] mt-0.5 mb-3">
              Tested &amp; Certified for Regulated Food Production Facilities
            </div>
            <div className="flex flex-wrap gap-2.5">
              {[
                "ISO 9001:2015",
                "CE MACHINERY DIRECTIVE 2006/42/EC",
                "EHEDG HYGIENIC DESIGN",
                "UL 508A PANEL SHOP",
              ].map((cert) => (
                <span
                  key={cert}
                  className="bg-white text-[#0f172a] text-[10.5px] font-mono-tech font-bold px-3 py-1.5 rounded border border-slate-200 inline-flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#334e68]" />
                  <span>{cert}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. BOTTOM DARK NAVY CTA BANNER */}
      <section className="bg-[#0d1829] py-16 text-white text-center border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-4 space-y-5">
          <span className="inline-block bg-slate-800 border border-slate-700 text-slate-200 text-[10px] font-mono-tech font-bold px-3 py-1 rounded">
            • ENGINEERING CONSULTATION • NO OBLIGATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Let’s Build a Better Baking Business
            <br />
            Together.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Whether upgrading a single mixing station or planning a complete turnkey automated bakery facility, our engineering consultants are ready to assist with layouts, capacity calculations, and custom tooling.
          </p>

          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded shadow-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>CONTACT OUR ENGINEERING TEAM</span>
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono-tech text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Direct Desk: +1 (800) 492-7325</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>engineering@apexbake-industrial.com</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Mon-Fri 07:00 - 18:00 CST</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
