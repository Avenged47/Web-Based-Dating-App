import { useState, useEffect } from "react";
import { getMessages } from "../services/messageService";

const useMessages = (userId, otherUserId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages(userId, otherUserId);
        console.log(userId, otherUserId);
        setMessages(data.data);
      } catch (error) {
        setError("Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    };

    if (userId && otherUserId) {
      fetchMessages();
    }
  }, [userId, otherUserId]);

  return { messages, loading, error };
};

export default useMessages;
