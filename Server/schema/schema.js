const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // Associate todo with a user
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
