const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, trim: true },
    type: { type: String, enum: ["machinery", "product", "both"], default: "both" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    icon: { type: String, default: "Cog" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
