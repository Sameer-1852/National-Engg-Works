const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, trim: true },
    modelCode: { type: String, default: "AB-PRD100", trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: [String], default: ["/images/cat-sm250s.png"] },
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
    price: { type: String, default: "Request Official Quotation (RFQ)" },
    badge: { type: String, default: "" },
    imageSpecOverlay: { type: String, default: "" },
    status: { type: String, enum: ["Active", "Inactive", "In Stock", "Out of Stock"], default: "In Stock" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
