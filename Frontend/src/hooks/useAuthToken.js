// useAuth.js
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
export const useAuthToken = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const decoded = jwtDecode(token);
        setUserId(decoded.id || null);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setUserId(null);
    }
  }, []);

  return userId;
};
