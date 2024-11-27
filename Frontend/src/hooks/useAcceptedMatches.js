import { useState, useEffect } from "react";
import { getAcceptedMatches } from "../services/matchRequestService";

export const useAcceptedMatches = (socket, userId, refresh) => {
  const [acceptedMatches, setAcceptedMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchAcceptedMatches = async () => {
      setIsLoading(true);
      try {
        const matches = await getAcceptedMatches(
          socket,
          userId
          // (updatedMatches) => {
          //   setAcceptedMatches(updatedMatches);
          // }
        );

        setAcceptedMatches(matches);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAcceptedMatches();

    const handleMatchUpdated = ({ matchedUserId }) => {
      console.log("Received match update for user:", matchedUserId);
      if (matchedUserId === userId) {
        console.log("Fetching updated matches for user:", userId);
        fetchAcceptedMatches();
      }
    };

    socket.on("matchUpdated", handleMatchUpdated);

    // Cleanup socket event listener
    return () => {
      socket.off("matchUpdated", handleMatchUpdated);
    };
  }, [socket, userId, refresh]);

  return { acceptedMatches, isLoading, error };
};
