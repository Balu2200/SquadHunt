const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    name: String,
    email: String,
    password: { type: String, required: true, select: true },
    role: {
      type: String,
      enum: ["player", "organizer", "admin"], 
      default: "player",
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date,
  },
  { timestamps: true }
);


userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


userSchema.methods.getJWT = function () {
  return jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = mongoose.model("user", userSchema);
