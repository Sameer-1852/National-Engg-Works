import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://national-engg-works.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fast in-memory cache and in-flight request deduplication for instant product loading
const responseCache = new Map();
const inFlightRequests = new Map();

const originalGet = api.get.bind(api);

api.get = (url, config = {}) => {
  if (config.noCache) {
    return originalGet(url, config);
  }

  // Cache catalog and product endpoints for ultra-fast response
  if (
    url === "/machinery" ||
    url === "/categories" ||
    url === "/products" ||
    url.startsWith("/machinery/") ||
    url.startsWith("/categories/")
  ) {
    const cacheKey = `${url}_${JSON.stringify(config.params || {})}`;

    if (responseCache.has(cacheKey)) {
      const entry = responseCache.get(cacheKey);
      if (Date.now() - entry.timestamp < 60000) {
        return Promise.resolve(entry.data);
      }
    }

    if (inFlightRequests.has(cacheKey)) {
      return inFlightRequests.get(cacheKey);
    }

    const reqPromise = originalGet(url, config)
      .then((res) => {
        responseCache.set(cacheKey, { data: res, timestamp: Date.now() });
        inFlightRequests.delete(cacheKey);
        return res;
      })
      .catch((err) => {
        inFlightRequests.delete(cacheKey);
        throw err;
      });

    inFlightRequests.set(cacheKey, reqPromise);
    return reqPromise;
  }

  return originalGet(url, config);
};

export const FALLBACK_CATEGORIES = [
  {
    _id: "cat-1",
    categoryName: "Mixing Machines",
    slug: "mixing-machines",
    type: "both",
    description:
      "Heavy-duty spiral mixers, commercial dough kneaders, planetary mixers, and high-torque Khari pastry mixers.",
    image: "/images/cat-sm250s.png",
    icon: "Cog",
    status: "Active",
  },
  {
    _id: "cat-2",
    categoryName: "Dough Processing",
    slug: "dough-processing",
    type: "both",
    description:
      "Precision reversible dough sheeters, automated laminating lines, and volumetric dough dividers.",
    image: "/images/cat-ds650.png",
    icon: "Layers",
    status: "Active",
  },
  {
    _id: "cat-3",
    categoryName: "Slicing Systems",
    slug: "slicing-systems",
    type: "both",
    description:
      "High-speed reciprocating bread slicers and continuous gravity-assisted toast slicing lines.",
    image: "/images/cat-bs450.png",
    icon: "Scissors",
    status: "Active",
  },
  {
    _id: "cat-4",
    categoryName: "Baking Support",
    slug: "baking-support",
    type: "both",
    description:
      "Micro-climate retarder proofer chambers, multi-deck tunnel ovens, and thermal recovery units.",
    image: "/images/cat-pf24.png",
    icon: "Thermometer",
    status: "Active",
  },
  {
    _id: "cat-5",
    categoryName: "Flour & Material Prep",
    slug: "flour-material-prep",
    type: "both",
    description:
      "High-frequency vibratory rotary flour sieving machines with rare-earth magnetic traps.",
    image: "/images/cat-fs500.png",
    icon: "Filter",
    status: "Active",
  },
];

export const FALLBACK_MACHINERY = [
  {
    _id: "AB-SM250S",
    modelCode: "AB-SM250S",
    homeCode: "SM-250SS PRO",
    machineryName: "SPIRAL MIXER (STAINLESS STEEL)",
    homeTitle: "Spiral Mixer – Stainless Steel",
    detailTitle: "Industrial Spiral Mixer – Full Stainless Steel Series",
    matrixTitle: "AB-SM250S Industrial Spiral Kneader",
    badge: "FLAGSHIP",
    homeBadgeRight: "250 KG FLOUR",
    matrixBadgeMid: "HIGH RHEOLOGY",
    matrixBadgeRight: "HEAVY INDUSTRIAL",
    imageSpecOverlay: "Flour: 150 kg | Dough: 250 kg",
    description:
      "Engineered with reinforced dual-motor transmission, heavy stainless steel bowl and spiral arm for non-stop 24/7 industrial dough production.",
    homeDescription:
      "Heavy-duty industrial spiral arm with reverse bowl rotation, dual digital timers, and heavy-gauge sanitary stainless steel construction.",
    detailSubtitle:
      "Engineered for high-volume commercial and industrial bakeries demanding non-stop 24/7 dough production with minimal dough friction and negligible temperature rise (≤ 1.2°C / batch).",
    category: "Mixing Machines",
    categoryLabel: "MIXING SYSTEMS",
    homeCategoryLabel: "DOUGH PREPARATION",
    matrixCategory: "Spiral & Dough Mixers",
    images: [
      "/images/detail-main.png",
      "/images/detail-thumb-1.png",
      "/images/detail-thumb-2.png",
      "/images/detail-thumb-3.png",
      "/images/detail-thumb-4.png",
    ],
    homeImage: "/images/home-mach-1.png",
    catalogImage: "/images/cat-sm250s.png",
    matrixImage: "/images/find-mach-1.png",
    detailMainImage: "/images/detail-main.png",
    capacityRating: "150 kg - 300 kg Batch",
    sanitaryAlloy: "SUS304 Food-Contact Stainless",
    driveTransmission: "Variable Frequency Drive (VFD)",
    hydrationProfile: "High Rheology (52% - 88%+)",
    throughputTier: "1,000 - 3,500 kg/hr",
    automationTier: "Siemens S7-1500 PLC & SCADA",
    featuredOnHome: true,
    featuredOnMatrix: true,
    homeOrder: 1,
    catalogOrder: 1,
    matrixOrder: 1,
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
    matrixBullets: [
      "Siemens S7-1500 PLC Touchscreen with 99-recipe memory",
      "Infrared dough batch thermal telemetry probe",
    ],
    specifications: [
      { parameter: "Model Number", value: "AB-SM250S", notes: "Apex Industrial Series 200" },
      { parameter: "Machine Classification", value: "Heavy-Duty Industrial Spiral Kneader", notes: "Continuous 3-shift duty rating" },
      { parameter: "Flour Load Capacity", value: "150 kg / batch", notes: "Min batch: 25 kg flour" },
      { parameter: "Finished Dough Output", value: "250 kg / batch", notes: "Calculated at 60% hydration index" },
      { parameter: "Bowl Volume Capacity", value: "380 Liters", notes: "Diameter Ø 1,000 mm × Depth 480 mm" },
      { parameter: "Power Consumption", value: "Spiral Motor: 11 kW | Bowl Motor: 1.5 kW", notes: "Total Connected Load: 12.5 kW / 26 A" },
      { parameter: "Voltage / Industrial Frequency", value: "380V - 415V / 50-60Hz (3-Phase + Neutral + Earth)", notes: "Custom 208V/480V UL transformers optional" },
      { parameter: "Dimensions (L × W × H)", value: "1,680 × 1,120 × 1,650 mm", notes: "Max clearance height open guard: 2,150 mm" },
      { parameter: "Construction Alloy", value: "Heavy-Gauge SUS304 Food-Grade Stainless Steel", notes: "Optional SUS316 for brine/acidic doughs" },
      { parameter: "Operating Dry Weight", value: "1,280 kg", notes: "Floor loading load point rating ± 450 kg/cm²" },
      { parameter: "Automation & Control", value: "Siemens S7 PLC with 7\" Color Touchscreen", notes: "99 Program Memory, SCADA Ethernet export" },
    ],
    stockStatus: "In Stock",
    status: "Active",
  },
  {
    _id: "AB-SM130",
    modelCode: "AB-SM130",
    homeCode: "SM-120 COM",
    machineryName: "SPIRAL MIXER",
    homeTitle: "Spiral Mixer – Commercial Series",
    detailTitle: "Commercial Spiral Mixer – Precision Dual-Timer Series",
    matrixTitle: "AB-SM130 Commercial Spiral Mixer",
    badge: "",
    homeBadgeRight: "120 KG FLOUR",
    matrixBadgeMid: "FIXED BOWL",
    matrixBadgeRight: "MID-SCALE COMMERCIAL",
    imageSpecOverlay: "Flour: 80 kg | Dough: 130 kg",
    description:
      "Dual timer digital PLC controller, reverse bowl rotational switch for homogeneous dry-ingredient blending and rapid gluten network formation.",
    homeDescription:
      "Standard commercial production series designed for consistent hydration, gluten development, and mid-capacity daily shifts.",
    detailSubtitle:
      "Reinforced fixed-bowl spiral mixer engineered for artisan and commissary bakeries demanding robust torque and uniform dough development.",
    category: "Mixing Machines",
    categoryLabel: "MIXING SYSTEMS",
    homeCategoryLabel: "DOUGH PREPARATION",
    matrixCategory: "Spiral & Dough Mixers",
    images: ["/images/cat-sm130.png"],
    homeImage: "/images/home-mach-2.png",
    catalogImage: "/images/cat-sm130.png",
    matrixImage: "/images/find-mach-2.png",
    detailMainImage: "/images/cat-sm130.png",
    capacityRating: "50 kg - 150 kg Batch",
    sanitaryAlloy: "SUS304 Food-Contact Stainless",
    driveTransmission: "Dual-Speed Electromechanical",
    hydrationProfile: "Standard Commercial (55% - 75%)",
    throughputTier: "300 - 1,000 kg/hr",
    automationTier: "Dual Digital Timer PLC",
    featuredOnHome: true,
    featuredOnMatrix: true,
    homeOrder: 2,
    catalogOrder: 2,
    matrixOrder: 2,
    matrixBullets: [
      "Dual programmable digital timers for auto low/high shift",
      "Reversible bowl rotation for preliminary dry blending",
    ],
    stockStatus: "In Stock",
    status: "Active",
  },
  {
    _id: "AB-PM80",
    modelCode: "AB-PM80",
    homeCode: "PM-100 GEAR",
    machineryName: "PLANETARY MIXER",
    homeTitle: "Planetary Mixer",
    detailTitle: "Industrial Planetary Mixer – Heavy 3-Speed Gear-Driven Series",
    matrixTitle: "AB-PM80 Industrial Planetary Mixer",
    badge: "",
    homeBadgeRight: "40L - 140L",
    matrixBadgeMid: "PLANETARY 80L",
    matrixBadgeRight: "MULTI-TOOL BATTER",
    imageSpecOverlay: "Bowl: 80 Liters | 3 Attachments",
    description:
      "Equipped with a 3-speed heavy mechanical oil-bath gearbox, precision planetary transmission, and quick-change stainless attachments.",
    homeDescription:
      "Multi-speed heavy gearbox planetary system with quick-change whisk, flat paddle, and spiral hook attachments for versatile whipping and mixing.",
    detailSubtitle:
      "Heavy oil-bath planetary gear transmission engineered for high-viscosity creams, emulsified batters, choux paste, and confectionery fillings.",
    category: "Mixing Machines",
    categoryLabel: "MIXING SYSTEMS",
    homeCategoryLabel: "CONFECTIONERY & BATTER",
    matrixCategory: "Planetary Mixers",
    images: ["/images/cat-pm80.png"],
    homeImage: "/images/home-mach-3.png",
    catalogImage: "/images/cat-pm80.png",
    matrixImage: "/images/find-mach-4.png",
    detailMainImage: "/images/cat-pm80.png",
    capacityRating: "50 kg - 150 kg Batch",
    sanitaryAlloy: "Heavy Cast Iron Transmission Frame",
    driveTransmission: "Dual-Speed Electromechanical",
    hydrationProfile: "Variable Solid & Emulsified Batter",
    throughputTier: "200 - 800 kg/hr",
    automationTier: "Digital Speed Control & Timer",
    featuredOnHome: true,
    featuredOnMatrix: true,
    homeOrder: 3,
    catalogOrder: 3,
    matrixOrder: 4,
    matrixBullets: [
      "Sealed IP65 stainless control panel with digital speed display",
      "Interlocked stainless safety shield with ingredient chute",
    ],
    stockStatus: "In Stock",
    status: "Active",
  },
  {
    _id: "AB-KM100",
    modelCode: "AB-KM100",
    homeCode: "KM-SPECIAL",
    machineryName: "KHARI MIXER",
    homeTitle: "Khari Pastry Mixer",
    detailTitle: "Heavy-Density Khari & Laminated Puff Pastry Mixer",
    matrixTitle: "AB-KM100 Heavy-Density Khari Mixer",
    badge: "HEAVY DENSITY",
    homeBadgeRight: "LAMINATING SPEC",
    matrixBadgeMid: "HIGH TORQUE",
    matrixBadgeRight: "PUFF & KHARI",
    imageSpecOverlay: "Capacity: 100 kg Tough Dough",
    description:
      "Custom engineered for low-hydration puff pastry and Khari doughs requiring extreme shear torque without warming fat layers.",
    homeDescription:
      "Engineered specifically for layered, flaky dough batches and high-fat shortening incorporation without breaking gluten strata.",
    category: "Mixing Machines",
    categoryLabel: "MIXING SYSTEMS",
    homeCategoryLabel: "SPECIALTY PASTRY",
    matrixCategory: "Spiral & Dough Mixers",
    images: ["/images/cat-km100.png"],
    homeImage: "/images/home-mach-4.png",
    catalogImage: "/images/cat-km100.png",
    matrixImage: "/images/cat-km100.png",
    detailMainImage: "/images/cat-km100.png",
    capacityRating: "50 kg - 150 kg Batch",
    sanitaryAlloy: "Heavy Cast Iron Transmission Frame",
    driveTransmission: "Heavy-Duty Double-Belt / Chain Drive",
    featuredOnHome: true,
    featuredOnMatrix: false,
    homeOrder: 4,
    catalogOrder: 4,
    matrixOrder: 7,
    stockStatus: "In Stock",
    status: "Active",
  },
  {
    _id: "AB-DS650",
    modelCode: "AB-DS650",
    homeCode: "DS-650 REV",
    machineryName: "DOUGH SHEETER",
    homeTitle: "Precision Dough Sheeter",
    detailTitle: "Automated Reversible Industrial Dough Sheeter – 650mm Series",
    matrixTitle: "AB-DS650 Reversible Precision Sheeter",
    badge: "FAST-SHIP",
    homeBadgeRight: "0.2 - 50 MM",
    matrixBadgeMid: "LAMINATING SYSTEM",
    matrixBadgeRight: "HIGH PRECISION",
    imageSpecOverlay: "Roller Width: 650 mm | 0.5-45mm",
    description:
      "Reversible motorized synthetic food-grade belts with micrometer digital roller gap calibration for uniform puff, croissant, and pastry lamination.",
    homeDescription:
      "Reversible motorized conveyor table with calibrated micron roller gauge for continuous puff, croissant, and artisanal dough sheeting.",
    category: "Dough Processing",
    categoryLabel: "DOUGH PROCESSING",
    homeCategoryLabel: "DOUGH PROCESSING",
    matrixCategory: "Reversible Dough Sheeters",
    images: ["/images/cat-ds650.png"],
    homeImage: "/images/home-mach-5.png",
    catalogImage: "/images/cat-ds650.png",
    matrixImage: "/images/find-mach-3.png",
    detailMainImage: "/images/cat-ds650.png",
    capacityRating: "50 kg - 150 kg Batch",
    sanitaryAlloy: "SUS304 Food-Contact Stainless",
    driveTransmission: "Variable Frequency Drive (VFD)",
    hydrationProfile: "Fat / Dough Lamination Layers",
    throughputTier: "500 - 2,000 kg/hr",
    automationTier: "Programmable Servo Roller Gap",
    featuredOnHome: true,
    featuredOnMatrix: true,
    homeOrder: 5,
    catalogOrder: 5,
    matrixOrder: 3,
    matrixBullets: [
      "Optical sensor automatic belt reversal with joy-stick override",
      "Toolless belt release system for quick CIP sanitation",
    ],
    stockStatus: "In Stock",
    status: "Active",
  },
  {
    _id: "AB-BS450",
    modelCode: "AB-BS450",
    homeCode: "BS-300 CONT",
    machineryName: "BREAD SLICER",
    homeTitle: "High-Speed Bread Slicer",
    detailTitle: "Continuous Reciprocating High-Speed Industrial Bread Slicer",
    matrixTitle: "AB-BS450 High-Speed Bread Slicer",
    badge: "",
    homeBadgeRight: "1,800 LOAVES/HR",
    imageSpecOverlay: "Max Loaf: 450 mm | 31 Blades",
    description:
      "Precision high-tensile stainless steel reciprocal blades with completely oil-free reciprocating frame for uniform crumb slicing.",
    homeDescription:
      "Continuous gravity and belt-feed multi-blade reciprocating frame engineered for uniform crumb structure without crust deformation.",
    category: "Slicing Systems",
    categoryLabel: "SLICING SYSTEMS",
    homeCategoryLabel: "PORTIONING & PACKAGING",
    matrixCategory: "Loaf & Bun Slicers",
    images: ["/images/cat-bs450.png"],
    homeImage: "/images/home-mach-6.png",
    catalogImage: "/images/cat-bs450.png",
    matrixImage: "/images/cat-bs450.png",
    detailMainImage: "/images/cat-bs450.png",
    capacityRating: "Continuous Industrial Flow",
    sanitaryAlloy: "SUS304 Food-Contact Stainless",
    driveTransmission: "Variable Frequency Drive (VFD)",
    featuredOnHome: true,
    featuredOnMatrix: false,
    homeOrder: 6,
    catalogOrder: 6,
    matrixOrder: 8,
    stockStatus: "In Stock",
    status: "Active",
  },
  {
    _id: "AB-TS300",
    modelCode: "AB-TS300",
    homeCode: "TS-300 AUTO",
    machineryName: "TOAST SLICER",
    homeTitle: "Continuous Toast Slicer",
    detailTitle: "Continuous Dual-Track High-Speed Toast & Loaf Slicer",
    matrixTitle: "AB-TS300 Continuous Loaf Slicer",
    badge: "",
    matrixBadgeMid: "AUTOMATED SLICER",
    matrixBadgeRight: "CONTINUOUS IN-LINE",
    imageSpecOverlay: "Capacity: 600 Loaves / Hr",
    description:
      "Continuous gravity-assisted loaf loading chute with rapid adjustable upper hold-down belt and integrated bagging blower table.",
    category: "Slicing Systems",
    categoryLabel: "SLICING SYSTEMS",
    homeCategoryLabel: "PORTIONING & PACKAGING",
    matrixCategory: "Loaf & Bun Slicers",
    images: ["/images/cat-ts300.png"],
    homeImage: "/images/cat-ts300.png",
    catalogImage: "/images/cat-ts300.png",
    matrixImage: "/images/find-mach-5.png",
    detailMainImage: "/images/cat-ts300.png",
    capacityRating: "Continuous Industrial Flow",
    sanitaryAlloy: "SUS304 Food-Contact Stainless",
    driveTransmission: "Variable Frequency Drive (VFD)",
    featuredOnHome: false,
    featuredOnMatrix: true,
    homeOrder: 7,
    catalogOrder: 7,
    matrixOrder: 5,
    matrixBullets: [
      "Integrated loaf bagger blower table at discharge terminal",
      "Handles delicate crusty sourdough & soft brioche evenly",
    ],
    stockStatus: "In Stock",
    status: "Active",
  },
  {
    _id: "AB-PF24",
    modelCode: "AB-PF24",
    homeCode: "PF-24 CLIM",
    machineryName: "PROOFER CHAMBER",
    homeTitle: "Precision Climate Proofer",
    detailTitle: "Precision Ultrasonic Micro-Climate Industrial Proofer Chamber",
    matrixTitle: "AB-PF24 Climate Retarder Proofer",
    badge: "",
    matrixBadgeMid: "FERMENTATION CONTROL",
    matrixBadgeRight: "DUAL ZONE CLIMATE",
    imageSpecOverlay: "Capacity: 24 Full Trays (600x400)",
    description:
      "Micro-climate ultrasonic vapor injection system with precise dual thermal & humidity PID loops to prevent dough skinning.",
    category: "Baking Support",
    categoryLabel: "BAKING SUPPORT",
    homeCategoryLabel: "FERMENTATION & PROOFING",
    matrixCategory: "Climate Proofers & Retarders",
    images: ["/images/cat-pf24.png"],
    homeImage: "/images/cat-pf24.png",
    catalogImage: "/images/cat-pf24.png",
    matrixImage: "/images/find-mach-6.png",
    detailMainImage: "/images/cat-pf24.png",
    capacityRating: "150 kg - 300 kg Batch",
    sanitaryAlloy: "SUS316 Acid-Resistant Sourdough Spec",
    driveTransmission: "Variable Frequency Drive (VFD)",
    featuredOnHome: false,
    featuredOnMatrix: true,
    homeOrder: 8,
    catalogOrder: 8,
    matrixOrder: 6,
    matrixBullets: [
      "Zero-skinning laminar cross-ventilation system",
      "CIP drain gutters with heavy duty floor bumpers",
    ],
    stockStatus: "In Stock",
    status: "Active",
  },
  {
    _id: "AB-FS500",
    modelCode: "AB-FS500",
    homeCode: "FS-500 VIB",
    machineryName: "FLOUR SIEVING MACHINE",
    homeTitle: "Rotary Flour Sieving Machine",
    detailTitle: "High-Frequency Vibratory Rotary Flour Sieving & Magnetic Trap System",
    matrixTitle: "AB-FS500 Industrial Flour Sieving Unit",
    badge: "",
    imageSpecOverlay: "Rate: 500 kg / Hour",
    description:
      "High-frequency vibratory rotary screen with integrated 10,000 Gauss rare-earth magnetic trap for foreign particle elimination and flour aeration.",
    category: "Flour & Material Prep",
    categoryLabel: "FLOUR & MATERIAL PREP",
    homeCategoryLabel: "FLOUR & MATERIAL PREP",
    matrixCategory: "Spiral & Dough Mixers",
    images: ["/images/cat-fs500.png"],
    homeImage: "/images/cat-fs500.png",
    catalogImage: "/images/cat-fs500.png",
    matrixImage: "/images/cat-fs500.png",
    detailMainImage: "/images/cat-fs500.png",
    capacityRating: "Under 50 kg Batch",
    sanitaryAlloy: "SUS304 Food-Contact Stainless",
    driveTransmission: "Heavy-Duty Double-Belt / Chain Drive",
    featuredOnHome: false,
    featuredOnMatrix: false,
    homeOrder: 9,
    catalogOrder: 9,
    matrixOrder: 9,
    stockStatus: "In Stock",
    status: "Active",
  },
];

export default api;
