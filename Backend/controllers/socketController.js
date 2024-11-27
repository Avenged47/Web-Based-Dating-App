const matchRequestController = require("../controllers/matchRequestController");
const verifySocketToken = require("../middlewares/verifySocketToken");
const messageController = require("../controllers/MessageController");
const Message = require("../models/MessageSchema");

module.exports = (io) => {
  const userSockets = {};
  io.use(verifySocketToken);

  io.on("connection", async (socket) => {
    const userId = socket.userId;

    userSockets[userId] = socket.id;
    // console.log(`User ${userId} connected`);

    socket.on("send-notification", (data) => {
      const { recipientUserId, message } = data;
      console.log(`Sending notification to user ${recipientUserId}`);

      if (userSockets[recipientUserId]) {
        io.to(userSockets[recipientUserId]).emit("new-notification", message);
        console.log(`Notification sent to user ${recipientUserId}`);
      } else {
        console.log(`User ${recipientUserId} not found`);
      }
    });

    socket.on("sendMatchRequest", async (data) => {
      const { currentUserId, matchUserId } = data;

      if (currentUserId === matchUserId) {
        socket.emit("error", "You cannot send a match request to yourself");
        return;
      }

      try {
        const result = await matchRequestController.sendMatchRequest(
          currentUserId,
          matchUserId,
          io
        );

        if (result.error) {
          socket.emit("error", result.error);
        } else {
          socket.emit("matchRequestSent", result.message);

          const recipientPendingRequests =
            await matchRequestController.getPendingMatchRequests(matchUserId);

          if (!recipientPendingRequests.error) {
            io.to(matchUserId).emit("updatePendingRequests", {
              pendingRequests: recipientPendingRequests.pendingRequests,
            });
            console.log(
              `Pending requests for recipient user ${matchUserId} updated`
            );
          }

          // Optionally, you can still send a response to the sender to confirm their request was sent
          const senderPendingRequests =
            await matchRequestController.getPendingMatchRequests(currentUserId);
          if (!senderPendingRequests.error) {
            socket.emit("updateSenderPendingRequests", {
              pendingRequests: senderPendingRequests.pendingRequests,
            });
            console.log(
              `Pending requests for sender user ${currentUserId} updated`
            );
          }
        }
      } catch (error) {
        console.error("Error processing match request:", error);
        socket.emit(
          "error",
          "An error occurred while sending the match request."
        );
      }
    });

    socket.on("respondToMatchRequest", async (data) => {
      const { currentUserId, matchUserId, action } = data;

      try {
        const result = await matchRequestController.respondToMatchRequest(
          currentUserId,
          matchUserId,
          action,
          io
        );

        if (result.error) {
          socket.emit("matchRequestError", result.error);
        } else {
          socket.emit("matchRequestResponse", result.message);

          console.log(`Match request ${action} processed successfully.`);
        }
      } catch (error) {
        console.error("Error processing match request:", error);
        socket.emit("matchRequestError", "Internal server error.");
      }
    });

    socket.on("getAcceptedMatches", async (userId) => {
      const result = await matchRequestController.getAcceptedMatches(userId);
      if (result.error) {
        socket.emit("error", result.error);
      } else {
        socket.emit("acceptedMatches", result.acceptedMatches);
      }
    });

    socket.on("sendMessage", async (data) => {
      try {
        if (!data.sender || !data.receiver || !data.content) {
          console.log("Error: Missing required fields.");
          return socket.emit(
            "error",
            "Missing required fields: sender, receiver, or content."
          );
        }

        console.log(
          `Sender: ${data.sender}, Receiver: ${data.receiver}, Content: ${data.content}`
        );

        const newMessage = new Message({
          sender: data.sender,
          receiver: data.receiver,
          content: data.content,
          messageType: data.messageType || "text",
          readStatus: false,
        });

        const savedMessage = await newMessage.save();

        // Emit to the receiver if they're connected
        if (userSockets[data.receiver]) {
          console.log(`User ${data.receiver} is online, sending message...`);
          io.to(userSockets[data.receiver]).emit("newMessage", savedMessage);
          console.log(`Message sent to user ${data.receiver}`);
        } else {
          console.log(`User ${data.receiver} not found in online users.`);
        }

        // Acknowledge the sender with the saved message
        console.log("Acknowledging sender with saved message...");
        socket.emit("messageSent", savedMessage);
      } catch (error) {
        // Log detailed error message
        console.error("Error processing sendMessage:", error);
        socket.emit(
          "error",
          "An unexpected error occurred while processing your message."
        );
      }
    });

    socket.on("fetchMissedMessages", async (userId) => {
      try {
        // Find messages that are unread (readStatus is false)
        const missedMessages = await Message.find({
          receiver: userId,
          readStatus: false, // Only fetch unread messages
        });

        // Send the missed messages to the user
        missedMessages.forEach((msg) => {
          io.to(socket.id).emit("newMessage", msg);
        });

        // Mark the messages as read once they are sent
        await Message.updateMany(
          { _id: { $in: missedMessages.map((msg) => msg._id) } },
          { $set: { readStatus: true } } // Update to mark as read
        );

        console.log(
          `Sent ${missedMessages.length} missed messages to user ${userId}`
        );
      } catch (error) {
        console.error("Error fetching missed messages:", error);
      }
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log(`User ${socket.userId} disconnected`);
    });
  });
};
