const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    companyName: {
      type: String,
      default: "",
      trim: true,
    },
    roleTitle: {
      type: String,
      default: "",
      trim: true,
    },
    facilityLocation: {
      type: String,
      default: "",
      trim: true,
    },
    engineeringDiscipline: {
      type: String,
      default: "New Turnkey Line Sizing",
      trim: true,
    },
    machineryModel: {
      type: String,
      default: "",
      trim: true,
    },
    subject: {
      type: String,
      default: "General Contact / Engineering Inquiry",
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    ndaRequested: {
      type: Boolean,
      default: false,
    },
    sendSpecBook: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["New", "Pending", "Contacted", "In Progress", "Completed", "Rejected"],
      default: "New",
    },
    adminNotes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ status: 1 });

module.exports = mongoose.model("Contact", contactSchema);
