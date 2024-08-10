// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { EmailIcon } = require("@chakra-ui/icons");

// Sign Up
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).json({ token, EmailIcon });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Sign In
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = user.generateAuthToken();
    res.status(200).json({ token, email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
