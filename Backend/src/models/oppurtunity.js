const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["pending", "approved", "closed"],
    default: "pending",
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("opportunities", opportunitySchema);
