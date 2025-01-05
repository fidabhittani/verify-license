const mongoose = require("mongoose");

const LicenseSchema = new mongoose.Schema(
  {
    licenseNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    fatherName: { type: String, required: true, default: null },
    cnic: { type: String, required: true, unique: true , default: null},
    licenseType: {
      type: String,
      enum: ["M-CYCLE", "MOTOR-CAR", "LTV", "HTV"],
      default: "MOTOR-CAR",
    },
    district: { type: String, default: null, required: true },
    initialLicenseType: {
      type: String,
      enum: ["M-CYCLE", "MOTOR-CAR", "LTV", "HTV"],
      default: "MOTOR-CAR",
    },
    issueDate: { type: Date, required: true , default: null},
    expiryDate: { type: Date, required: true, default: null },
    initialLicenseIssueDate: { type: Date, default: null },
    internationalDrivingPermit: { type: Boolean, default: false },
    status: { type: String, default: null }, // e.g., "Valid" or "Expired"
  },
  { timestamps: true }
);

module.exports = mongoose.model("License", LicenseSchema);
