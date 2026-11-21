import React, { useState, useMemo } from "react";
import {
  Search,
  ArrowRight,
  Bookmark,
  Clock,
  Download,
  FolderOpen,
  Bell,
  Check,
  Send,
  X,
  FileText,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const INSIGHT_CATEGORIES = [
  "ALL INSIGHTS",
  "BAKERY INDUSTRY NEWS",
  "MACHINERY GUIDES",
  "PRODUCT KNOWLEDGE",
  "MAINTENANCE TIPS",
  "BAKING TECHNOLOGY",
  "BUSINESS INSIGHTS",
];

const ARCHIVE_ARTICLES = [
  {
    id: "SOP-DS-04",
    category: "MAINTENANCE TIPS",
    badgeColor: "bg-[#0d1829]",
    date: "SEP 28, 2024",
    readTime: "6 MIN",
    title: "Preventative Maintenance Checklist for Industrial Dough Sheeters & Reversible Belts",
    summary:
      "Actionable inspection schedules for scraper blade tension, belt tracking alignment tolerances, bearing lubrications with NSF H1 food-grade grease, and roller gap calibration.",
    image: "/images/insight-1.png",
  },
  {
    id: "ROI-CALC-88",
    category: "BAKING TECHNOLOGY",
    badgeColor: "bg-[#d97706]",
    date: "SEP 15, 2024",
    readTime: "10 MIN",
    title: "PLC Automation vs Manual Controls: Calculating ROI for Commercial Planetary Mixers",
    summary:
      "A quantitative financial model analyzing energy demand curtailment, ingredient batch repeatability, cycle-time reductions, and scrap elimination across 3-shift plants.",
    image: "/images/insight-2.png",
  },
  {
    id: "IND-REP-2025",
    category: "BAKERY INDUSTRY NEWS",
    badgeColor: "bg-[#0d1829]",
    date: "AUG 30, 2024",
    readTime: "7 MIN",
    title: "Global B2B Bakery Equipment Trends: Cleanability, CIP Standards, and Energy Reduction",
    summary:
      "How European EHEDG protocols and US FSMA mandates are redefining stainless conveyor fabrication, tool-less teardown geometry, and washdown enclosures.",
    image: "/images/insight-3.png",
  },
  {
    id: "MET-SPEC-316",
    category: "PRODUCT KNOWLEDGE",
    badgeColor: "bg-[#0d1829]",
    date: "AUG 12, 2024",
    readTime: "5 MIN",
    title: "Selecting the Correct Stainless Steel Grade: SUS304 vs SUS316 in Food Processing Machinery",
    summary:
      "Metallurgical comparison highlighting pitting resistance equivalent numbers (PREN), caustic sanitation chemical reactions, and salt-brine sourdough longevity.",
    image: "/images/insight-4.png",
  },
  {
    id: "ENG-SLC-120",
    category: "MACHINERY GUIDES",
    badgeColor: "bg-[#d97706]",
    date: "JUL 24, 2024",
    readTime: "9 MIN",
    title: "Precision Slicing Technology: Minimizing Crumb Waste in High-Speed Toast Lines",
    summary:
      "Engineering analysis of blade pitch, micro-serration tooth profiles, oil mist lubrication systems, and internal crumb loss ratios in high-output bread slicers.",
    image: "/images/insight-5.png",
  },
  {
    id: "CAPEX-PLN-01",
    category: "BUSINESS INSIGHTS",
    badgeColor: "bg-[#0d1829]",
    date: "JUL 05, 2024",
    readTime: "11 MIN",
    title: "Scaling from Artisan Production to Semi-Automated Lines: A Plant Director's Blueprint",
    summary:
      "Key transition phases from batch artisan handling to modular continuous systems without degrading loaf crumb structure, crust blister, or fermentation aroma.",
    image: "/images/insight-6.png",
  },
];

const BLUEPRINTS = [
  {
    tag: "CAD / BIM PACK",
    title: "Continuous Tunnel Oven Series TX-900 Layout Schematics",
    desc: "Full 3D envelope models, floor load deflection calculations, utility tie-in coordinates (Gas, Electric, Exhaust), and foundation anchoring specs.",
    formats: [".STEP", ".DWG", ".REVIT"],
    btnLabel: "DOWNLOAD ENGINEERING PACK",
  },
  {
    tag: "WHITE PAPER",
    title: "Industrial Thermal Heat Recovery in Commercial Baking Lines",
    desc: "Comprehensive report on flume gas heat exchange units reducing boiler fuel consumption by up to 26.4% in high-volume flatbread production facilities.",
    formats: ["ISO 50001", "PEER-REVIEWED"],
    btnLabel: "DOWNLOAD WHITE PAPER",
  },
  {
    tag: "COMPLIANCE & CERT",
    title: "EHEDG Hygienic Engineering Declarations & Materials Dossier",
    desc: "Complete certificates of compliance for SUS316 stainless welds, FDA food-contact synthetic belt elastomer validations, and IP69K washdown ratings.",
    formats: ["EHEDG DOC 8", "FDA CFR 21"],
    btnLabel: "DOWNLOAD DOSSIER",
  },
];

const InsightsPage = () => {
  const { submitEnquiry, showToast } = useApp();

  const [selectedCategory, setSelectedCategory] = useState("ALL INSIGHTS");
  const [searchInput, setSearchInput] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [activeArticleModal, setActiveArticleModal] = useState(null);

  const [bulletinEmail, setBulletinEmail] = useState("");
  const [bulletinInterest, setBulletinInterest] = useState(
    "Industrial Mixing & Spiral Kneading"
  );
  const [submitting, setSubmitting] = useState(false);

  const filteredArticles = useMemo(() => {
    return ARCHIVE_ARTICLES.filter((art) => {
      if (selectedCategory !== "ALL INSIGHTS" && art.category !== selectedCategory) {
        return false;
      }
      if (searchInput.trim()) {
        const q = searchInput.toLowerCase();
        return (
          art.title.toLowerCase().includes(q) ||
          art.summary.toLowerCase().includes(q) ||
          art.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, searchInput]);

  const handleDownloadBlueprint = (bp) => {
    showToast(`Downloading ${bp.title} (${bp.formats.join(", ")})...`);
  };

  const handleBulletinSubmit = async (e) => {
    e.preventDefault();
    if (!bulletinEmail.trim()) {
      showToast("Please enter your Corporate / Plant Email.", "error");
      return;
    }
    try {
      setSubmitting(true);
      await submitEnquiry({
        customerName: bulletinEmail.split("@")[0],
        email: bulletinEmail,
        enquiryType: "Technical Bulletin Subscription",
        engineeringDiscipline: bulletinInterest,
        message: `Subscribed to Monthly Technical Digest (${bulletinInterest})`,
      });
      showToast("Subscribed to the ApexBake Technical Bulletin!");
      setBulletinEmail("");
    } catch (err) {
      showToast("Failed to subscribe. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#f4f8fd]">
      {/* 1. HEADER & SEARCH */}
      <section className="bg-[#eef4fc] pt-8 pb-10 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          {/* Top Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[10.5px] font-mono-tech text-slate-500 mb-5">
            <div className="flex items-center gap-2 text-[#334e68] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#d97706]" />
              <span>APEXBAKE KNOWLEDGE BASE // REPOSITORY REV 4.2</span>
            </div>
            <div className="flex items-center gap-3">
              <span>INDEXED ENTRIES: 148</span>
              <span>/</span>
              <span>WHITE PAPERS: 24</span>
              <span>/</span>
              <span>UPDATED: OCT 2024</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] uppercase tracking-tight">
                INSIGHTS &amp; RESOURCES
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
                Engineering guides, technical bakery whitepapers, maintenance best practices, and international bakery production trends.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white p-1.5 rounded-lg border border-slate-200 shadow-2xs flex items-center">
                <Search className="w-4 h-4 text-slate-400 ml-2.5 mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search articles, machinery guides"
                  className="w-full text-xs text-slate-800 focus:outline-none"
                />
                <button
                  type="button"
                  className="bg-[#0d1829] hover:bg-slate-800 text-white font-mono-tech font-bold text-[10.5px] uppercase px-4 py-2.5 rounded cursor-pointer"
                >
                  SEARCH
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-7">
            {INSIGHT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded text-[10.5px] font-mono-tech font-bold uppercase transition-colors cursor-pointer ${selectedCategory === cat
                  ? "bg-[#0d1829] text-white"
                  : "bg-white text-[#0f172a] border border-slate-200 hover:bg-slate-50"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. FEATURED TECHNICAL GUIDE */}
      <section className="py-12">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12">
            {/* Left Image */}
            <div className="lg:col-span-7 relative min-h-[340px] bg-slate-900">
              <img
                src="/images/insight-featured.png"
                alt="Optimizing Dough Rheology and Hydration Control"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Text */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-[11px] font-mono-tech text-[#0f172a] uppercase font-bold tracking-wider">
                  MACHINERY GUIDES
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mt-2 leading-tight uppercase">
                  OPTIMIZING DOUGH RHEOLOGY AND HYDRATION CONTROL IN AUTOMATED SPIRAL MIXING LINES
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4">
                  A deep dive into how bowl RPM, spiral geometry, and temperature-controlled stainless jackets prevent thermal dough stress in 24/7 continuous industrial bread plants. Includes real-time sensor feedback integration diagrams and gluten matrix optimization formulas.
                </p>

                {/* Author Card */}
                <div className="mt-6 bg-[#eff5fc] rounded-lg p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#0d1829] text-white font-mono-tech font-bold text-xs flex items-center justify-center shrink-0">
                    CAE
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-[#0f172a]">
                      Chief Automation Engineer
                    </div>
                    <div className="text-[10.5px] font-mono-tech text-[#334e68]">
                      ApexBake Applied Rheology Center
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveArticleModal({
                      id: "APX-710",
                      category: "MACHINERY GUIDES",
                      title:
                        "OPTIMIZING DOUGH RHEOLOGY AND HYDRATION CONTROL IN AUTOMATED SPIRAL MIXING LINES",
                      summary:
                        "Full engineering guide covering bowl RPM ratios (105/210 RPM spiral to 12/24 RPM bowl), glycol jacket cooling calculations, and inline infrared temperature feedback loops for 24/7 industrial bread plants.",
                    })
                  }
                  className="flex-1 h-12 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <span>READ FULL ENGINEERING GUIDE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => showToast("Engineering guide bookmarked!")}
                  className="w-12 h-12 rounded bg-[#eff5fc] hover:bg-[#dce8f8] text-[#0f172a] flex items-center justify-center border border-blue-200/60 cursor-pointer"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ENGINEERING & OPERATIONS ARCHIVE */}
      <section className="py-10 border-b border-slate-200/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="mb-8">
            <div className="text-[11px] font-mono-tech text-[#334e68] uppercase tracking-widest">
              CURATED KNOWLEDGE
            </div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] uppercase mt-1">
              ENGINEERING &amp; OPERATIONS ARCHIVE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 bg-slate-200">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between text-[10.5px] font-mono-tech text-slate-500">
                      <span>{art.date}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{art.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-[#0f172a] mt-2 leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-3">
                      {art.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveArticleModal(art)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#d97706] hover:text-[#b45309] cursor-pointer"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Row */}
          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono-tech text-slate-500">
              SHOWING <strong className="text-[#0f172a]">{filteredArticles.length}</strong> OF{" "}
              <strong className="text-[#0f172a]">48</strong> TECHNICAL PAPERS
            </div>

            <div className="flex items-center gap-1.5 font-mono-tech text-xs">
              <button
                type="button"
                onClick={() => setActivePage(Math.max(1, activePage - 1))}
                className="px-3.5 py-2 rounded bg-[#dce8f8] text-[#0f172a] font-bold hover:bg-[#c8dbf5] cursor-pointer"
              >
                PREV PAGE
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setActivePage(p)}
                  className={`w-9 h-9 rounded font-bold cursor-pointer ${activePage === p
                    ? "bg-[#0d1829] text-white"
                    : "bg-[#dce8f8] text-[#0f172a] hover:bg-[#c8dbf5]"
                    }`}
                >
                  0{p}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setActivePage(Math.min(3, activePage + 1))}
                className="px-3.5 py-2 rounded bg-[#dce8f8] text-[#0f172a] font-bold hover:bg-[#c8dbf5] cursor-pointer"
              >
                NEXT PAGE
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* 5. STAY AHEAD OF BAKERY PROCESSING INNOVATIONS (DARK NAVY BULLETIN) */}
      <section className="bg-[#0d1829] py-16 text-white border-t border-slate-800">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech text-[#f59e0b] uppercase tracking-widest font-semibold">
                <Bell className="w-3.5 h-3.5" />
                <span>APEXBAKE INDUSTRIAL DISPATCH // MONTHLY TECHNICAL DIGEST</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase leading-tight">
                STAY AHEAD OF BAKERY
                <br />
                PROCESSING INNOVATIONS
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Quarterly peer-reviewed automation case studies, dough rheology whitepapers, preventative maintenance benchmarks, and regulatory compliance updates directly from our engineering team.
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-2 text-[11px] font-mono-tech text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>NO SPAM GUARANTEE</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>100% TECHNICAL CONTENT</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>DIRECT CHIEF ENGINEER BULLETINS</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white text-[#0f172a] rounded-xl p-7 shadow-2xl">
                <form onSubmit={handleBulletinSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                      Corporate / Plant Email
                    </label>
                    <input
                      type="email"
                      required
                      value={bulletinEmail}
                      onChange={(e) => setBulletinEmail(e.target.value)}
                      placeholder="p.manager@bakerygroup.com"
                      className="w-full h-11 px-3.5 rounded bg-[#eff5fc] border border-blue-100 text-xs focus:outline-none focus:border-[#d97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                      Primary Area of Interest
                    </label>
                    <select
                      value={bulletinInterest}
                      onChange={(e) => setBulletinInterest(e.target.value)}
                      className="w-full h-11 px-3.5 rounded bg-[#eff5fc] border border-blue-100 text-xs font-semibold"
                    >
                      <option>Industrial Mixing &amp; Spiral Kneading</option>
                      <option>Lamination &amp; Dough Sheeting Lines</option>
                      <option>Thermal Tunnel Ovens &amp; Proofing</option>
                      <option>High-Speed Slicing &amp; Packaging</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-13 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {submitting
                        ? "SUBSCRIBING..."
                        : "SUBSCRIBE TO TECHNICAL BULLETIN"}
                    </span>
                  </button>

                  <div className="text-center text-[10.5px] text-slate-500">
                    Strict enterprise privacy. Unsubscribe anytime via single-click token.
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Paper Reader Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 p-4">
          <div className="bg-white max-w-2xl w-full rounded-xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-[#0d1829] px-6 py-4 flex items-center justify-between text-white">
              <span className="text-xs font-mono-tech text-[#f59e0b] font-bold">
                {activeArticleModal.category} // {activeArticleModal.id}
              </span>
              <button
                type="button"
                onClick={() => setActiveArticleModal(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-7 space-y-4">
              <h3 className="text-xl font-extrabold text-[#0f172a]">
                {activeArticleModal.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeArticleModal.summary}
              </p>
              <div className="bg-[#eff5fc] p-4 rounded-lg text-xs text-slate-700 space-y-2 font-mono-tech">
                <div>• Standard Reference: ISO 9001:2015 / EHEDG Doc 8</div>
                <div>• Validated Equipment: ApexBake AB-SM250S, AB-DS650, AB-TS300</div>
                <div>• Engineering Contact: rfq@apexbake-industrial.com</div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => {
                    showToast("Full PDF Engineering Guide downloaded!");
                    setActiveArticleModal(null);
                  }}
                  className="bg-[#d97706] text-white text-xs font-bold uppercase px-5 py-2.5 rounded cursor-pointer"
                >
                  Download PDF Whitepaper
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsPage;
