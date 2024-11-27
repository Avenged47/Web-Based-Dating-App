const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const userController = require("../controllers/userController");
const imageController = require("../controllers/imageController");
const matchController = require("../controllers/matchController");
const matchRequestController = require("../controllers/matchRequestController");
const messageController = require("../controllers/MessageController");
const pendingRequestHandler = require("../handlers/pendingRequestHandler");
const { verify } = require("jsonwebtoken");

router.post("/api/signup", userController.signup);
router.post("/api/login", userController.login);

router.put(
  "/api/completeProfile/:id",
  verifyToken,
  imageController.uploadImages,
  userController.completeProfile
);

router.get("/api/getUser/:id", verifyToken, userController.getUser);
router.get("/api/getAllUsers", userController.getAllUsers);

router.get(
  "/api/getRecommendedMatches/:id",
  verifyToken,
  matchController.getRecommendedMatches
);

router.get(
  "/api/checkProfileComplete/:id",
  verifyToken,
  userController.checkProfileComplete
);

router.delete("/api/deleteUser/:id", userController.deleteUser);

//match  requests routes
router.post(
  "/api/matchRequests/send-match/:userId/:matchId",
  verifyToken,
  async (req, res) => {
    const { userId, matchId } = req.params;
    if (userId === matchId) {
      return res
        .status(400)
        .json({ error: "You cannot send a match request to yourself" });
    }

    const result = await matchRequestController.sendMatchRequest(
      userId,
      matchId
    );

    if (result.error) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  }
);

router.post(
  "/api/matchRequests/respond-to-match/:userId/:matchId",
  verifyToken,
  async (req, res) => {
    const { userId, matchId } = req.params;
    const { action } = req.body;

    if (!action || (action !== "accept" && action !== "reject")) {
      return res.status(400).json({ error: "Invalid action" });
    }

    const result = await matchRequestController.respondToMatchRequest(
      userId,
      matchId,
      action
    );

    if (result.error) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  }
);

router.get("/api/pending-requests/:id", verifyToken, pendingRequestHandler);

router.get(
  "/api/getAcceptedMatches/:id",
  verifyToken,
  matchRequestController.getAcceptedMatches
);

router.post("/api/send-message", messageController.sendMessage);

router.get("/api/get-messages/:id", verifyToken, messageController.getMessages);

module.exports = router;
