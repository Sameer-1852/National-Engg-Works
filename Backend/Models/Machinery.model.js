const mongoose = require("mongoose");

const machinerySchema = new mongoose.Schema(
  {
    modelCode: { type: String, required: true, trim: true },
    homeCode: { type: String, default: "" },
    machineryName: { type: String, required: true, trim: true },
    homeTitle: { type: String, default: "" },
    detailTitle: { type: String, default: "" },
    matrixTitle: { type: String, default: "" },
    badge: { type: String, default: "" },
    homeBadgeRight: { type: String, default: "" },
    matrixBadgeMid: { type: String, default: "" },
    matrixBadgeRight: { type: String, default: "" },
    imageSpecOverlay: { type: String, default: "" },
    description: { type: String, required: true },
    homeDescription: { type: String, default: "" },
    detailSubtitle: { type: String, default: "" },
    category: { type: String, required: true },
    categoryLabel: { type: String, default: "MIXING SYSTEMS" },
    homeCategoryLabel: { type: String, default: "DOUGH PREPARATION" },
    matrixCategory: { type: String, default: "Spiral & Dough Mixers" },
    manufacturer: { type: String, default: "NEW – National Engineering Works (ApexBake Industrial)" },
    images: { type: [String], default: ["/images/cat-sm250s.png"] },
    homeImage: { type: String, default: "/images/home-mach-1.png" },
    catalogImage: { type: String, default: "/images/cat-sm250s.png" },
    matrixImage: { type: String, default: "/images/find-mach-1.png" },
    detailMainImage: { type: String, default: "/images/detail-main.png" },
    capacityRating: { type: String, default: "150 kg - 300 kg Batch" },
    sanitaryAlloy: { type: String, default: "SUS304 Food-Contact Stainless" },
    driveTransmission: { type: String, default: "Variable Frequency Drive (VFD)" },
    hydrationProfile: { type: String, default: "52% - 88%+ High Rheology" },
    throughputTier: { type: String, default: "500 - 2,500 kg/hr" },
    automationTier: { type: String, default: "Siemens S7-1500 PLC & SCADA" },
    featuredOnHome: { type: Boolean, default: false },
    featuredOnMatrix: { type: Boolean, default: false },
    homeOrder: { type: Number, default: 99 },
    catalogOrder: { type: Number, default: 99 },
    matrixOrder: { type: Number, default: 99 },
    keySpecsGrid: {
      type: [
        {
          label: String,
          value: String,
          unit: String,
          sub: String,
        },
      ],
      default: [],
    },
    featurePills: {
      type: [String],
      default: [
        "FOOD-GRADE SUS304 BODY",
        "DIGITAL TOUCHSCREEN PLC",
        "DUAL TIMER AUTO SHIFT",
        "HYDRAULIC BOWL LIFT OPTION",
      ],
    },
    matrixBullets: {
      type: [String],
      default: [],
    },
    specifications: {
      type: [
        {
          parameter: String,
          value: String,
          notes: String,
        },
      ],
      default: [],
    },
    price: { type: String, default: "Enterprise Pricing Tier (RFQ)" },
    stockStatus: { type: String, default: "In Stock" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Machinery", machinerySchema);
