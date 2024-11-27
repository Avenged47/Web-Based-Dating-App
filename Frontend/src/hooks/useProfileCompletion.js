import { useState, useEffect } from "react";
import { checkProfileComplete } from "../services/userProfile";

export const useProfileCompletion = (userId) => {
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileCompletion = async () => {
      if (!userId) return;

      setIsProfileLoading(true);
      try {
        const result = await checkProfileComplete(userId);
        setIsProfileComplete(result.isComplete);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsProfileLoading(false);
      }
    };

    fetchProfileCompletion();
  }, [userId]);

  return { isProfileComplete, isProfileLoading, error };
};
