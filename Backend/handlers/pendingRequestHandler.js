const {
  getPendingMatchRequests,
} = require("../controllers/matchRequestController");

async function pendingRequestsHandler(req, res) {
  const userId = req.params.id;

  try {
    const result = await getPendingMatchRequests(userId);

    if (result.error) {
      return res.status(500).json({ error: result.error });
    }
    if (req.app.get("io")) {
      const io = req.app.get("io");
      io.to(userId).emit("updatePendingRequests", result.pendingRequests);
    }

    return res.json({ pendingRequests: result.pendingRequests });
  } catch (error) {
    console.error("Error handling pending requests route:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = pendingRequestsHandler;
