import { useState, useEffect } from "react";
import { getPendingRequests } from "../services/matchRequestService";

const usePendingRequests = (socket, userId, refresh) => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect triggered due to refresh change", refresh);
    if (!userId) {
      return;
    }

    const fetchPendingRequests = async (
      source = "API",
      realTimeData = null
    ) => {
      setIsRequestLoading(true);
      setError(null);

      try {
        console.log(`Fetching pending requests via: ${source}`);

        const data = realTimeData || (await getPendingRequests(userId));
        console.log(`Data fetched from ${source}:`, data);

        const pendingRequests = Array.isArray(data) ? data : [];

        if (pendingRequests.length > 0) {
          const transformedData = pendingRequests.map((request) => ({
            id: request._id,
            userId: {
              id: request.userId?._id,
              name: `${request.userId?.firstName || "Unknown"} ${request.userId?.lastName || "User"}`,
              profilePic:
                request.userId?.images?.[0] || "default-profile-pic.jpg",
            },
            matchId: {
              id: request.matchId?._id,
              name: `${request.matchId?.firstName || "Unknown"} ${request.matchId?.lastName || "User"}`,
              profilePic:
                request.matchId?.images?.[0] || "default-profile-pic.jpg",
            },
            compatibilityScore: request.compatibilityScore,
            status: request.status,
            matchedAt: request.matchedAt,
            createdAt: request.createdAt,
          }));

          setPendingRequests(transformedData);
          setNotificationsCount(transformedData.length);
        } else {
          setPendingRequests([]);
          setNotificationsCount(0);
        }
      } catch (err) {
        setError(err.message || "Unknown error occurred");
      } finally {
        setIsRequestLoading(false);
      }
    };

    const handleRealTimeUpdate = (realTimeData) => {
      console.log("Real-time data received:", realTimeData);
      if (realTimeData && Array.isArray(realTimeData.pendingRequests)) {
        if (realTimeData.userId === userId) {
          console.log("Handling real-time update for user:", userId);
          fetchPendingRequests("Socket", realTimeData.pendingRequests);
        }
      } else {
        setError("Received invalid data structure");
      }
    };

    fetchPendingRequests("API");

    if (socket) {
      socket.on("updatePendingRequests", handleRealTimeUpdate);
    }

    return () => {
      if (socket) {
        socket.off("updatePendingRequests", handleRealTimeUpdate);
      }
    };
  }, [userId, socket, refresh]);

  return {
    pendingRequests,
    notificationsCount,
    setNotificationsCount,
    isRequestLoading,
    error,
    setPendingRequests,
  };
};

export default usePendingRequests;
