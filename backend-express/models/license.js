const mongoose = require("mongoose");

const LicenseSchema = new mongoose.Schema({
  licenseNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  issueDate: { type: String, required: true },
  expiryDate: { type: String, required: true },
  status: { type: String, required: true }, // e.g., "Valid" or "Expired"
});

module.exports =  mongoose.model('License', LicenseSchema);
