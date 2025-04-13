const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  name: String, 
  email: String,
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: ["player", "organizer", "admin"],
    default: "player",
  },
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date,
});

module.exports = mongoose.model("user", userSchema);
