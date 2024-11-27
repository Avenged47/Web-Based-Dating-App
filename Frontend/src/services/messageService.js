import apiClient from "../services/api";
import { io } from "socket.io-client";

export const sendMessage = async (socket, data, useRealTime = true) => {
  if (!socket) {
    console.log("Socket is not connected");
  }

  try {
    console.log("Attempting to send message:", data);
    console.log("Socket connected:", socket?.connected);
    console.log("Use real-time:", useRealTime);

    if (useRealTime && socket?.connected) {
      console.log("Sending message via socket...");
      socket.emit("sendMessage", data);
      console.log("Message sent via socket.");

      return { success: true, message: "Message sent via socket." };
    }

    console.log("Socket not connected or real-time not enabled. Using API...");
    const response = await apiClient.post("/api/send-message", data);
    console.log("Message sent via API. Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error in sendMessage:", error);

    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to send message.";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error(error.message || "An unexpected error occurred.");
    }
  }
};

export const getMessages = async (userId, otherUserId) => {
  console.log("Fetching messages:", userId, otherUserId);
  try {
    const response = await apiClient.get(`/api/get-messages/${userId}`, {
      params: { otherUserId: otherUserId },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error(error.response?.data?.message || "Error fetching messages");
  }
};
