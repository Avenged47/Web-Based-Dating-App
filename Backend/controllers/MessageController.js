const Message = require("../models/MessageSchema");

// Send a message
const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content, messageType } = req.body;

    if (!sender || !receiver || !content || !messageType) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newMessage = new Message({
      sender,
      receiver,
      content,
      messageType,
    });

    const savedMessage = await newMessage.save();

    res.status(201).json({
      message: "Message sent successfully!",
      data: savedMessage,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error sending message",
      error: error.message,
    });
  }
};

// Get messages between two users
const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const { otherUserId } = req.query;

    if (!otherUserId) {
      return res.status(400).json({ message: "otherUserId is required." });
    }

    const messages = await Message.find({
      $or: [
        { sender: id, receiver: otherUserId },
        { sender: otherUserId, receiver: id },
      ],
    })
      .sort({ timestamp: 1 })
      .populate("sender receiver", "name email");

    res.status(200).json({
      message: "Messages retrieved successfully!",
      data: messages,
    });
    // console.log(messages);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving messages",
      error: error.message,
    });
  }
};

// Mark a message as read
// const markAsRead = async (req, res) => {
//   try {
//     const { messageId } = req.params;

//     // Find the message and update its read status
//     const message = await Message.findByIdAndUpdate(
//       messageId,
//       { readStatus: true },
//       { new: true } // Return updated document
//     );

//     if (!message) {
//       return res.status(404).json({
//         message: "Message not found",
//       });
//     }

//     res.status(200).json({
//       message: "Message marked as read",
//       data: message,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error marking message as read",
//       error: error.message,
//     });
//   }
// };

// Delete a message (optional)
// const deleteMessage = async (req, res) => {
//   try {
//     const { messageId } = req.params;

//     // Find the message and delete it
//     const message = await Message.findByIdAndDelete(messageId);

//     if (!message) {
//       return res.status(404).json({
//         message: "Message not found",
//       });
//     }

//     res.status(200).json({
//       message: "Message deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error deleting message",
//       error: error.message,
//     });
//   }
// };

module.exports = {
  sendMessage,
  getMessages,
  // markAsRead,
  // deleteMessage,
};
