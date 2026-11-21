const mongoose = require("mongoose");

const requestQuotationSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Client / customer name is required"],
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
      required: [true, "Mobile / contact number is required"],
      trim: true,
    },
    companyName: {
      type: String,
      default: "",
      trim: true,
    },
    machineryModel: {
      type: String,
      default: "",
      trim: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },
    machineryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machinery",
      required: false,
    },
    quantity: {
      type: String,
      default: "1 Unit",
      trim: true,
    },
    budget: {
      type: String,
      default: "",
      trim: true,
    },
    targetOutput: {
      type: String,
      default: "",
      trim: true,
    },
    floorSpace: {
      type: String,
      default: "",
      trim: true,
    },
    message: {
      type: String,
      default: "",
      trim: true,
    },
    includeBimFiles: {
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

requestQuotationSchema.index({ email: 1, createdAt: -1 });
requestQuotationSchema.index({ status: 1 });

module.exports = mongoose.model("RequestQuotation", requestQuotationSchema);
