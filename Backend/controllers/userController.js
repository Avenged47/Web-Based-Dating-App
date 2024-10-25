const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs");

async function signup(req, res) {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (user) {
      return res.status(400).json({ msg: "User already exist" });
    }
    user = new User({
      username,
      email,
      password,
    });
    await user.save();

    res.status(200).json({ msg: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function login(req, res) {
  const { email, password, username } = req.body;
  try {
    let user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    res.status(200).json({ msg: "Login successful", user });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = {
  signup,
  login,
};
