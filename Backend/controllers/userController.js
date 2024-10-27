const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const imageController = require("./imageController");
const { validateProfileData } = require("../validation/userValidation");
const { validateImages } = require("../validation/imageValidation");

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

async function completeProfile(req, res) {
  const id = req.params.id;

  console.log("User ID:", id);

  const validatedData = {
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    dob: req.body.dob,
    gender: req.body.gender,
    sexualOrientation: req.body.sexualOrientation,
    relationshipStatus: req.body.relationshipStatus,
    interestedIn: req.body.interestedIn,
    interests: Array.isArray(req.body.interests)
      ? req.body.interests.map((interest) => interest.trim())
      : [req.body.interests.trim()],
    dislikes: Array.isArray(req.body.dislikes)
      ? req.body.dislikes.map((dislike) => dislike.trim())
      : [req.body.dislikes.trim()],
  };

  const { error: profileError } = validateProfileData(validatedData);
  if (profileError) {
    return res.status(400).json({ msg: profileError.details[0].message });
  }

  let validatedImages = [];
  if (req.files && req.files.length > 0) {
    validatedImages = req.files.map((file) => file.path);
    const { error: imageError } = validateImages(validatedImages);
    if (imageError) {
      return res.status(400).json({ msg: imageError.details[0].message });
    }
  }

  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const {
      firstName,
      lastName,
      dob,
      gender,
      sexualOrientation,
      relationshipStatus,
      interestedIn,
      interests,
      dislikes,
    } = validatedData;

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.dob = dob || user.dob;
    user.gender = gender || user.gender;
    user.sexualOrientation = sexualOrientation || user.sexualOrientation;
    user.relationshipStatus = relationshipStatus || user.relationshipStatus;
    user.interestedIn = interestedIn || user.interestedIn;
    user.interests = Array.isArray(interests) ? interests : [interests];
    user.dislikes = Array.isArray(dislikes) ? dislikes : [dislikes];

    if (validatedImages.length > 0) {
      user.images = [...new Set([...user.images, ...validatedImages])]; // Merge with unique images
    }

    user.isProfileComplete = true;

    await user.save();

    res.status(200).json({ msg: "Profile completed successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}

async function getUser(req, res) {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ msg: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json({ msg: "Users fetched successfully", users });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function checkProfileComplete(req, res) {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (user.isProfileComplete) {
      return res.status(200).json({ msg: "Profile is completed" });
    } else {
      return res.status(200).json({ msg: "Profile is not completed" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = {
  signup,
  login,
  completeProfile,
  getUser,
  getAllUsers,
  checkProfileComplete,
};
