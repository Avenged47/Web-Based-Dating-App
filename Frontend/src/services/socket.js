// import { io } from "socket.io-client";

// let socket;

// const initializeSocket = () => {
//   const token = localStorage.getItem("token");

//   if (token && !socket) {
//     socket = io("http://localhost:5000", {
//       query: { token },
//       transports: ["websocket"],
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     socket.on("connect", () => {
//       console.log("Socket connected successfully");
//     });

//     socket.on("connect_error", (error) => {
//       console.error("Socket connection error: ", error);
//     });

//     socket.on("disconnect", () => {
//       console.log("Socket disconnected");
//     });

//     socket.on("reconnect", (attempt) => {
//       console.log(`Socket reconnected on attempt ${attempt}`);
//     });
//   } else {
//     console.log("Token not available or socket already initialized.");
//   }
// };

// const reconnectSocket = () => {
//   if (socket && !socket.connected) {
//     console.log("Attempting to reconnect...");
//     socket.connect();
//   }
// };

// export { socket, initializeSocket, reconnectSocket };
