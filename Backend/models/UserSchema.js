const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isProfileComplete: {
    type: Boolean,
    default: false,
  },
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  dob: {
    type: Date,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  sexualOrientation: {
    type: String,
    default: null,
  },
  relationshipStatus: {
    type: String,
    default: null,
  },
  interestedIn: {
    type: String,
    default: null,
  },
  interests: {
    type: [String],
    default: [],
  },
  dislikes: {
    type: [String],
    default: [],
  },
  images: {
    type: [String],
    default: [],
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.pre("remove", async function (next) {
  const user = this;

  if (user.images && user.images.length > 0) {
    user.images.forEach((imagePath) => {
      const fullImagePath = path.join(__dirname, "..", imagePath);

      console.log("Attempting to delete:", fullImagePath);

      fs.unlink(fullImagePath, (err) => {
        if (err) {
          console.error("Failed to delete image:", fullImagePath, err);
        } else {
          console.log("Successfully deleted image:", fullImagePath);
        }
      });
    });
  }

  next();
});

const user = mongoose.model("User", UserSchema);
module.exports = user;
