const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: { type: String, default: null },
  lastName: { type: String, default: null },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roles: [{ type: String, required: true, default: "user" }],
  active: { type: Boolean, required: true, default: false },
},
{ timestamps: true });

module.exports =  mongoose.model('User', UserSchema);
