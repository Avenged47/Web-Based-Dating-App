import { useEffect, useState } from "react";
import { getUserRecommendations } from "../services/userRecommendation";
export const useRecommendation = (userId) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isMatchLoading, setIsMatchLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!userId) return;

      setIsMatchLoading(true);
      try {
        const data = await getUserRecommendations(userId);
        if (data?.recommendedMatches?.length) {
          setRecommendations(data.recommendedMatches);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsMatchLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return { recommendations, isMatchLoading, error };
};
