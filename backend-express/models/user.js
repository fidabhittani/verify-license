const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, required: true }, // e.g., "Valid" or "Expired"
},
{ timestamps: true });

module.exports =  mongoose.model('User', UserSchema);
