const mongoose = require("mongoose");

const bookSessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Mobile Number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["New", "Pending", "Scheduled", "Completed", "Cancelled"],
      default: "New",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

bookSessionSchema.index({ phone: 1, email: 1 });
bookSessionSchema.index({ status: 1 });

module.exports = mongoose.model("BookSession", bookSessionSchema);
