import { io } from "socket.io-client";
import apiClient from "../services/api";

export const sendMatchRequest = (socket, currentUserId, matchUserId) => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      console.error("Socket is not connected.");

      socket.connect();
      socket.once("connect", () => {
        console.log("Socket reconnected successfully.");

        sendMatchRequest(currentUserId, matchUserId)
          .then(resolve)
          .catch(reject);
      });

      socket.once("connect_error", (error) => {
        console.error("Socket connection error:", error);
        reject("Socket connection error.");
      });
      return;
    }

    if (currentUserId === matchUserId) {
      reject("You cannot send a match request to yourself");
      return;
    }

    console.log("Sending match request:", { currentUserId, matchUserId });
    socket.emit("sendMatchRequest", { currentUserId, matchUserId });

    socket.once("matchRequestSent", (message) => {
      if (message.error && message.error === "Match request already exists") {
        console.warn("Match request already exists, moving to the next user.");
        resolve({ notice: "Match request already exists" });
      } else if (message.error) {
        console.error("Error:", message.error);
        reject(message.error);
      } else {
        console.log("Match request sent response:", message);
        resolve(message);
      }
    });

    socket.once("error", (errorMessage) => {
      console.error("Error received:", errorMessage);
      reject(errorMessage);
    });
  });
};

export const getPendingRequests = (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  return apiClient
    .get(`/api/pending-requests/${userId}`)
    .then((response) => {
      const pendingRequests = response.data.pendingRequests || response.data; // Ensure we check the correct property
      if (Array.isArray(pendingRequests)) {
        return pendingRequests;
      } else {
        throw new Error("Pending requests data is not an array");
      }
    })
    .catch((error) => {
      const errorMessage =
        error.response?.data?.message || "Error fetching pending requests";
      console.error(errorMessage);
      throw new Error(errorMessage);
    });
};

export const respondToMatchRequest = (
  socket,
  currentUserId,
  matchUserId,
  action
) => {
  console.log("you are inside the respond to match request service");
  return new Promise((resolve, reject) => {
    if (!socket || !socket.connected) {
      console.error("Socket is not connected.");

      socket.connect();
      socket.once("connect", () => {
        console.log("Socket reconnected successfully.");

        respondToMatchRequest(currentUserId, matchUserId, action)
          .then(resolve)
          .catch(reject);
      });

      socket.once("connect_error", (error) => {
        console.error("Socket connection error:", error);
        reject("Socket connection error.");
      });
      return;
    }

    if (currentUserId === matchUserId) {
      reject("You cannot respond to your own match request");
      return;
    }

    console.log("Responding to match request:", {
      currentUserId,
      matchUserId,
      action,
    });

    socket.emit("respondToMatchRequest", {
      currentUserId,
      matchUserId,
      action,
    });

    socket.emit("respondToMatchRequest", {
      currentUserId,
      matchUserId,
      action,
    });

    // Listen for the backend response after emitting
    socket.once("matchRequestResponse", (response) => {
      if (response.error) {
        console.error("Error:", response.error);
        reject(response.error);
      } else {
        console.log("Match request response received:", response);

        // Notify both users of the action
        socket.emit("matchUpdated", { matchedUserId: matchUserId }); // Notify current user
        socket.emit("matchUpdated", { matchedUserId: currentUserId }); // Notify matched user

        // Resolve with the response from the backend
        resolve(response);
      }
    });

    socket.once("error", (errorMessage) => {
      console.error("Error received:", errorMessage);
      reject(errorMessage);
    });
  });
};

export const getAcceptedMatches = (socket, userId, onUpdate) => {
  // console.log("Inside the get accepted matches service");
  if (!userId) {
    throw new Error("User ID is required");
  }
  return new Promise((resolve, reject) => {
    apiClient
      .get(`/api/getAcceptedMatches/${userId}`)
      .then((response) => {
        const acceptedMatches = response.data;

        socket.on("updateAcceptedMatches", (updatedMatches) => {
          if (typeof onUpdate === "function") {
            onUpdate(updatedMatches);
          }
        });

        resolve(acceptedMatches);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Error fetching accepted matches";
        console.error(errorMessage);
        reject(errorMessage);
      });
  });
};
