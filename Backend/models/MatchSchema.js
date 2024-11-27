const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    compatibilityScore: {
      type: Number,
      default: 0,
    },
    matchedAt: {
      type: Date,
      default: Date.now,
    },
    lastInteraction: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

MatchSchema.index({ userId: 1, matchId: 1 }, { unique: true });

const Match = mongoose.model("Match", MatchSchema);
module.exports = Match;
