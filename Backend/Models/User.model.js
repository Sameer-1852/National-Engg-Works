const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    plainPassword: { type: String, default: "" },
    phone: { type: String, default: "" },
    companyName: { type: String, default: "NEW – National Engineering Works" },
    role: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
