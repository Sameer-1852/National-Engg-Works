import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  LayoutGrid,
  Cog,
  Layers,
  Scissors,
  Thermometer,
  Filter,
  CheckCircle2,
  ArrowRight,
  Network,
  Wrench,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const CATEGORIES = [
  { name: "All Machinery", icon: LayoutGrid },
  { name: "Mixing Machines", icon: Cog },
  { name: "Dough Processing", icon: Layers },
  { name: "Slicing Systems", icon: Scissors },
  { name: "Baking Support", icon: Thermometer },
  { name: "Flour & Material Prep", icon: Filter },
];

const CAPACITY_OPTIONS = [
  "Under 50 kg Batch",
  "50 kg - 150 kg Batch",
  "150 kg - 300 kg Batch",
  "Continuous Industrial Flow",
];

const ALLOY_OPTIONS = [
  "SUS304 Food-Contact Stainless",
  "Heavy Cast Iron Transmission Frame",
  "SUS316 Acid-Resistant Sourdough Spec",
];

const DRIVE_OPTIONS = [
  "Variable Frequency Drive (VFD)",
  "Dual-Speed Electromechanical",
  "Heavy-Duty Double-Belt / Chain Drive",
];

const ProductsCatalogPage = () => {
  const { machinery, openQuoteModal } = useApp();
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Machinery");
  const [selectedCapacities, setSelectedCapacities] = useState([...CAPACITY_OPTIONS]);
  const [selectedAlloys, setSelectedAlloys] = useState([
    "SUS304 Food-Contact Stainless",
    "Heavy Cast Iron Transmission Frame",
    "SUS316 Acid-Resistant Sourdough Spec",
  ]);
  const [selectedDrives, setSelectedDrives] = useState([...DRIVE_OPTIONS]);

  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      setSelectedCategory(catParam);
    }
  }, [searchParams]);

  const toggleItem = (list, setList, value) => {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("All Machinery");
    setSelectedCapacities([...CAPACITY_OPTIONS]);
    setSelectedAlloys([...ALLOY_OPTIONS]);
    setSelectedDrives([...DRIVE_OPTIONS]);
  };

  const filteredMachinery = useMemo(() => {
    return machinery.filter((item) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchSearch =
          (item.machineryName || "").toLowerCase().includes(q) ||
          (item.modelCode || "").toLowerCase().includes(q) ||
          (item.description || "").toLowerCase().includes(q) ||
          (item.category || "").toLowerCase().includes(q);
        if (!matchSearch) return false;
      }

      // Category filter
      if (selectedCategory !== "All Machinery" && item.category !== selectedCategory) {
        return false;
      }

      // Capacity filter
      if (
        selectedCapacities.length > 0 &&
        selectedCapacities.length < CAPACITY_OPTIONS.length &&
        item.capacityRating &&
        !selectedCapacities.includes(item.capacityRating)
      ) {
        return false;
      }

      // Alloy filter
      if (
        selectedAlloys.length > 0 &&
        selectedAlloys.length < ALLOY_OPTIONS.length &&
        item.sanitaryAlloy &&
        !selectedAlloys.includes(item.sanitaryAlloy)
      ) {
        return false;
      }

      // Drive filter
      if (
        selectedDrives.length > 0 &&
        selectedDrives.length < DRIVE_OPTIONS.length &&
        item.driveTransmission &&
        !selectedDrives.includes(item.driveTransmission)
      ) {
        return false;
      }

      return true;
    });
  }, [
    machinery,
    searchQuery,
    selectedCategory,
    selectedCapacities,
    selectedAlloys,
    selectedDrives,
  ]);

  const getBadgeColor = (badge) => {
    if (badge === "FLAGSHIP") return "bg-[#d97706] text-white";
    if (badge === "FAST-SHIP") return "bg-[#10b981] text-white";
    if (badge === "HEAVY DENSITY") return "bg-[#3b526b] text-white";
    return "bg-[#d97706] text-white";
  };

  return (
    <div className="w-full bg-[#eef4fc]">
      {/* Page Header & Breadcrumb */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pt-7 pb-8">
        <div className="text-xs font-mono-tech text-slate-500 flex items-center gap-1.5 mb-4">
          <Link to="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-[#334e68]">Equipment Catalog</span>
          <span>&gt;</span>
          <span className="text-slate-900 font-semibold">Machinery Line</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight uppercase">
              OUR BAKERY MACHINERY
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              Explore our range of reliable and high-performance bakery machinery for commercial and industrial applications. Precision engineered for high-throughput bakeries and industrial food manufacturing plants.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 shadow-2xs">
              <div className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-wider">
                ACTIVE MODELS
              </div>
              <div className="text-xl font-extrabold text-[#0f172a] mt-0.5">
                {machinery.length || 9} Systems
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 shadow-2xs">
              <div className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-wider">
                STANDARD LEAD
              </div>
              <div className="text-xl font-extrabold text-[#0f172a] mt-0.5">14–21 Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Left Filter Sidebar + Right 3x3 Grid */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* LEFT SIDEBAR */}
          <aside className="lg:col-span-3 space-y-5">
            {/* Search Box */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs">
              <div className="text-xs font-extrabold text-[#0f172a] uppercase tracking-wider mb-3">
                SEARCH UNITS
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search machinery by model, name..."
                  className="w-full h-10 pl-9 pr-3 rounded bg-[#f8fafc] border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#d97706]"
                />
              </div>
            </div>

            {/* Equipment Category */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold text-[#0f172a] uppercase tracking-wider">
                  EQUIPMENT CATEGORY
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[10px] font-mono-tech text-slate-500 hover:text-[#d97706] uppercase cursor-pointer"
                >
                  RESET
                </button>
              </div>

              <div className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const active = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs transition-colors cursor-pointer ${active
                          ? "bg-[#dce8f8] text-[#0f172a] font-bold"
                          : "text-slate-600 hover:bg-slate-50 font-medium"
                        }`}
                    >
                      <Icon className="w-4 h-4 shrink-0 text-slate-700" />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Capacity Rating, Sanitary Alloy, Drive Transmission */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs space-y-6">
              {/* Capacity Rating */}
              <div>
                <div className="text-xs font-extrabold text-[#0f172a] uppercase tracking-wider pb-2 mb-3 border-b border-slate-100">
                  CAPACITY RATING
                </div>
                <div className="space-y-2">
                  {CAPACITY_OPTIONS.map((cap) => (
                    <label
                      key={cap}
                      className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCapacities.includes(cap)}
                        onChange={() =>
                          toggleItem(selectedCapacities, setSelectedCapacities, cap)
                        }
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{cap}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sanitary Alloy / Build */}
              <div>
                <div className="text-xs font-extrabold text-[#0f172a] uppercase tracking-wider pb-2 mb-3 border-b border-slate-100">
                  SANITARY ALLOY / BUILD
                </div>
                <div className="space-y-2">
                  {ALLOY_OPTIONS.map((alloy) => (
                    <label
                      key={alloy}
                      className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAlloys.includes(alloy)}
                        onChange={() =>
                          toggleItem(selectedAlloys, setSelectedAlloys, alloy)
                        }
                        className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="leading-snug">{alloy}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Drive Transmission */}
              <div>
                <div className="text-xs font-extrabold text-[#0f172a] uppercase tracking-wider pb-2 mb-3 border-b border-slate-100">
                  DRIVE TRANSMISSION
                </div>
                <div className="space-y-2">
                  {DRIVE_OPTIONS.map((drv) => (
                    <label
                      key={drv}
                      className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDrives.includes(drv)}
                        onChange={() =>
                          toggleItem(selectedDrives, setSelectedDrives, drv)
                        }
                        className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="leading-snug">{drv}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Line Integration Callout */}
            <div className="bg-[#dce8f8] rounded-xl p-5 border border-blue-200/80">
              <div className="flex items-center gap-2 text-sm font-extrabold text-[#0f172a] uppercase">
                <Network className="w-4 h-4 text-[#0f172a]" />
                <span>LINE INTEGRATION</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mt-2">
                Planning a multi-station line with mixers, proofers, and continuous slicing conveyors? Our application engineers offer facility CAD layout reviews.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech font-bold text-[#0f172a] hover:text-[#d97706] uppercase mt-3 transition-colors"
              >
                <span>SPEAK TO PROJECT ENGINEER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>

          {/* RIGHT 3x3 MACHINERY GRID */}
          <div className="lg:col-span-9">
            {filteredMachinery.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
                <p className="text-slate-600 font-medium text-sm">
                  No machinery units match your current filter selection.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 bg-[#d97706] text-white text-xs font-bold uppercase px-5 py-2.5 rounded cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMachinery.map((item) => (
                  <div
                    key={item._id || item.modelCode}
                    className="bg-white rounded-lg overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image with Top Model Pill & Bottom Spec Overlay */}
                      <div className="relative h-52 bg-slate-200 overflow-hidden">
                        <img
                          src={item.catalogImage || item.homeImage || "/images/cat-sm250s.png"}
                          alt={item.machineryName}
                          className="w-full h-full object-cover"
                        />

                        {/* Top Left Badges */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="bg-[#0d1829] text-white text-[10px] font-mono-tech font-semibold px-2 py-0.5 rounded-xs">
                            {item.modelCode}
                          </span>
                          {item.badge && (
                            <span
                              className={`text-[10px] font-mono-tech font-semibold px-2 py-0.5 rounded-xs uppercase ${getBadgeColor(
                                item.badge
                              )}`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Bottom Spec Pill Overlay */}
                        {item.imageSpecOverlay && (
                          <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-[#0f172a] text-[10.5px] font-mono-tech font-semibold px-2.5 py-1 rounded-xs shadow-xs border border-slate-200">
                            {item.imageSpecOverlay}
                          </div>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="p-5 pb-3">
                        <div className="flex items-center justify-between text-[10px] font-mono-tech">
                          <span className="text-slate-500 uppercase tracking-wider font-semibold">
                            {item.categoryLabel || "MIXING SYSTEMS"}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 font-semibold ${item.stockStatus === "Out of Stock"
                                ? "text-red-600"
                                : "text-emerald-600"
                              }`}
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{item.stockStatus || "In Stock"}</span>
                          </span>
                        </div>

                        <h3 className="text-base font-extrabold text-[#0f172a] uppercase mt-1.5 leading-snug">
                          {item.machineryName}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-2">
                      <Link
                        to={`/products/${item.modelCode}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-[#f1f6fd] hover:bg-[#dce8f8] text-[#0f172a] font-bold text-xs py-2.5 rounded border border-slate-200/80 transition-colors"
                      >
                        <span>View Full Technical Specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom 4-Column Standards Strip */}
      <section className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-[10px] font-mono-tech text-[#334e68] uppercase tracking-wider">
                MATERIAL STANDARD
              </div>
              <div className="text-base font-extrabold text-[#0f172a] mt-0.5">
                100% AISI SUS304
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Non-corrosive food contact cert
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono-tech text-[#334e68] uppercase tracking-wider">
                ELECTRICAL STANDARD
              </div>
              <div className="text-base font-extrabold text-[#0f172a] mt-0.5">
                CE &amp; UL Certified
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Schneider &amp; Siemens switchgear
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono-tech text-[#334e68] uppercase tracking-wider">
                WARRANTY ASSURANCE
              </div>
              <div className="text-base font-extrabold text-[#0f172a] mt-0.5">
                36–Month Warranty
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Gearboxes &amp; structural chassis
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono-tech text-[#334e68] uppercase tracking-wider">
                SPARE PARTS DESK
              </div>
              <div className="text-base font-extrabold text-[#0f172a] mt-0.5">
                48–Hr Global Dispatch
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                OEM belts, bearings &amp; motors
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Navy Turnkey Engineering Division Banner */}
      <section className="bg-[#0d1829] py-14 text-white border-t border-slate-800">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech text-[#f59e0b] uppercase tracking-widest">
              <Wrench className="w-3.5 h-3.5" />
              <span>TURNKEY ENGINEERING DIVISION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase leading-tight">
              NEED A CUSTOMIZED BAKERY LINE?
              <br />
              TALK WITH AN EQUIPMENT
              <br />
              SPECIALIST.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed pt-1">
              From custom flour handling pneumatic transport to high-speed automated slicing and packaging transfers, our industrial engineering team customizes complete multi-machine plants tailored to your square footage and throughput metrics.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="bg-white hover:bg-slate-100 text-[#0f172a] font-extrabold text-xs uppercase tracking-wider px-10 py-5 rounded shadow-lg transition-colors cursor-pointer"
            >
              DIRECT DISPATCH CALL
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsCatalogPage;
