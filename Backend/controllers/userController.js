const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const imageController = require("./imageController");
const { validateProfileData } = require("../validation/userValidation");
const {
  validatePictures,
  validateDuplicatePictures,
} = require("../validation/imageValidation");

const jwt = require("jsonwebtoken");

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
    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({ msg: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function completeProfile(req, res) {
  const id = req.params.id;

  const validatedData = {
    firstName: req.body.firstName ? req.body.firstName.trim() : "",
    lastName: req.body.lastName ? req.body.lastName.trim() : "",
    dob: req.body.dob,
    gender: req.body.gender,
    sexualOrientation: req.body.sexualOrientation,
    relationshipStatus: req.body.relationshipStatus,
    interestedIn: req.body.interestedIn,
    interests: Array.isArray(req.body.interests)
      ? req.body.interests.map((interest) => interest.trim())
      : req.body.interests
      ? [req.body.interests.trim()]
      : [],
    dislikes: Array.isArray(req.body.dislikes)
      ? req.body.dislikes.map((dislike) => dislike.trim())
      : req.body.dislikes
      ? [req.body.dislikes.trim()]
      : [],
  };

  const { error: profileError } = validateProfileData(validatedData);
  if (profileError) {
    return res.status(400).json({ msg: profileError.details[0].message });
  }

  let validatedImages = [];
  if (req.files && req.files.length > 0) {
    validatedImages = req.files.map((file) => file.path);

    try {
      validatePictures(req.files, false); // Skip minimum validation for updates
      validateDuplicatePictures(req.files);
    } catch (imageError) {
      return res.status(400).json({ msg: imageError.message });
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

    // Handle image updates
    const imagesToRemove = req.body.imagesToRemove || [];
    user.images = user.images.filter(
      (image) => !imagesToRemove.includes(image)
    );

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) =>
        file.path.replace(/\\/g, "/").trim()
      );
      user.images = [...new Set([...user.images, ...newImages])];
    }

    // Enforce the 3-image rule only if profile is not complete
    if (!user.isProfileComplete && user.images.length < 3) {
      return res.status(400).json({
        msg: "At least 3 images are required to complete the profile.",
      });
    }

    // Mark profile as complete if necessary
    user.isProfileComplete = true;

    await user.save();

    res.status(200).json({ msg: "Profile updated successfully", user });
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
      return res.status(404).json({ msg: "User not found", isComplete: false });
    }
    return res.status(200).json({
      msg: user.isProfileComplete
        ? "Profile is completed"
        : "Profile is not completed",
      isComplete: user.isProfileComplete,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", isComplete: false });
  }
}

async function deleteUser(req, res) {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ msg: "User deleted successfully", user });
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
  deleteUser,
};
