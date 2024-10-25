const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const user = mongoose.model("user", UserSchema);
module.exports = user;
