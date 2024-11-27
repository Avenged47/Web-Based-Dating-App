import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext"; // Import AuthContext

const SocketContext = createContext();

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}

export function SocketProvider({ children }) {
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log("Auth state change detected:", {
    //   isAuthenticated,
    //   authLoading,
    // });

    if (authLoading) {
      return;
    }

    if (isAuthenticated) {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      if (socket) return;

      const socketConnection = io("http://localhost:5000", {
        query: { token },
      });

      socketConnection.on("connect", () => {
        // console.log("Socket connected:", socketConnection.id);
        setIsLoading(false);
      });

      socketConnection.on("disconnect", () => {
        // console.log("Socket disconnected");
      });

      setSocket(socketConnection);

      return () => {
        socketConnection.disconnect();
        // console.log("Socket disconnected");
      };
    } else {
      setSocket(null);
      setIsLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
