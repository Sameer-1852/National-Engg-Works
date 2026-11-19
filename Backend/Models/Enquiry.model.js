const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    email: { type: String, default: "", trim: true },
    phone: { type: String, default: "", trim: true },
    companyName: { type: String, default: "", trim: true },
    roleTitle: { type: String, default: "" },
    facilityLocation: { type: String, default: "" },
    enquiryType: {
      type: String,
      default: "Business Enquiry",
    },
    engineeringDiscipline: { type: String, default: "" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: false },
    machineryId: { type: mongoose.Schema.Types.ObjectId, ref: "Machinery", required: false },
    machineryModel: { type: String, default: "" },
    quantity: { type: String, default: "1 Unit" },
    targetOutput: { type: String, default: "" },
    floorSpace: { type: String, default: "" },
    budget: { type: String, default: "" },
    message: { type: String, default: "" },
    includeBimFiles: { type: Boolean, default: false },
    ndaRequested: { type: Boolean, default: false },
    sendSpecBook: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["New", "Pending", "Contacted", "In Progress", "Completed", "Rejected"],
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
