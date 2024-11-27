// matchRequestController.js
const Match = require("../models/MatchSchema");
const User = require("../models/UserSchema");
const mongoose = require("mongoose");

async function sendMatchRequest(currentUserId, matchUserId, io) {
  try {
    const existingMatch = await Match.findOne({
      $or: [
        { userId: currentUserId, matchId: matchUserId },
        { userId: matchUserId, matchId: currentUserId },
      ],
    });

    if (existingMatch) {
      // return { error: "Match request already exists" };
      if (existingMatch.status === "pending") {
        return {
          message: "Match request already exists and is still pending",
          existingMatch,
        };
      } else {
        return { message: "Match request already exists", existingMatch };
      }
    }

    // Create a new match request
    const matchRequest = new Match({
      userId: currentUserId,
      matchId: matchUserId,
      status: "pending",
      compatibilityScore: Math.random() * 100,
    });

    await matchRequest.save();

    io.to(matchUserId).emit("newMatchRequest", {
      message: "You have a new match request!",
      matchRequest,
    });

    return { message: "Match request sent successfully", matchRequest };
  } catch (error) {
    console.error("Error sending match request:", error);
    return { error: "Internal server error" };
  }
}

async function respondToMatchRequest(currentUserId, matchUserId, action, io) {
  try {
    const matchRequest = await Match.findOne({
      userId: matchUserId,
      matchId: currentUserId,
      status: "pending",
    });

    if (!matchRequest) {
      return { error: "No pending match request found" };
    }

    if (action === "accept") {
      matchRequest.status = "accepted";
    } else if (action === "reject") {
      matchRequest.status = "rejected";
    } else {
      return { error: "Invalid action" };
    }

    await matchRequest.save();

    if (io) {
      io.to(matchUserId).emit("matchRequestResponse", {
        message: `Your match request was ${action}ed`,
        status: matchRequest.status,
        matchedUserId: currentUserId,
      });

      io.to(currentUserId).emit("matchRequestResponse", {
        message: `You have successfully ${action}ed the match request.`,
        status: matchRequest.status,
        matchedUserId: matchUserId,
      });
      if (action === "accept") {
        io.to(currentUserId).emit("matchUpdated", {
          matchedUserId: matchUserId,
        });
        io.to(matchUserId).emit("matchUpdated", {
          matchedUserId: currentUserId,
        });
      }
    } else {
      console.warn("Socket.IO instance is not defined, skipping emit.");
    }

    return {
      message: `Match request ${action}ed successfully`,
      matchRequest,
      currentUserId,
      matchUserId,
    };
  } catch (error) {
    console.error("Error responding to match request:", error);
    return { error: "Internal server error" };
  }
}

async function getPendingMatchRequests(userId) {
  try {
    const pendingRequests = await Match.find({
      matchId: userId,
      status: "pending",
    })
      .lean()
      .populate("userId")
      .populate("matchId");
    return { pendingRequests };
  } catch (error) {
    console.error("Error fetching pending match requests:", error);
    return { error: "Internal server error" };
  }
}

async function getAcceptedMatches(req, res) {
  try {
    const userId = req.params.id;
    console.log("userId", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const acceptedMatches = await Match.find({
      $or: [
        { userId: userId, status: "accepted" },
        { matchId: userId, status: "accepted" },
      ],
    })
      .lean()
      .populate("userId")
      .populate("matchId");

    if (acceptedMatches.length === 0) {
      return res.status(404).json({ error: "No accepted matches found" });
    }
    return res.status(200).json({ acceptedMatches });
  } catch (error) {
    console.error("Error fetching accepted matches:", error);
    return { error: "Internal server error" };
  }
}

module.exports = {
  sendMatchRequest,
  respondToMatchRequest,
  getPendingMatchRequests,
  getAcceptedMatches,
};
