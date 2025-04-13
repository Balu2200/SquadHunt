const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validations");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

authRouter.post("/signup", async (req, res) => {
  try {
    const data = validateSignUpData(req);
    const { firstName, lastName, email, password, adminCode } = data;
    const passwordhash = await bcrypt.hash(password, 10);

    let role = "user";
    if (adminCode === process.env.ADMIN_SIGNUP_CODE) {
      role = "admin";
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordhash,
      role,
    });

    await user.save();
    return res.status(200).send("User Created Successfully");
  } catch (err) {
    console.error("Error Detected:", err.message);
    return res.status(500).send("Error:" + err.message);
  }
});


authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email }).select("+password"); // Corrected to User
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});



authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logout Successfully");
  } catch (err) {
    res.send("Error:" + err.message);
  }
});

module.exports = authRouter;
