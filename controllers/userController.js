const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).send({ success: true });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid login credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid login credentials");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.send({ success: true, token });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};
