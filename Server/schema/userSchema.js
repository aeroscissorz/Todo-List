const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
      fullname: { type: String, required: true },
      email: { type: String, required: true, unique: true }, // Email must be unique
      password: { type: String, required: true },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("User", userSchema);