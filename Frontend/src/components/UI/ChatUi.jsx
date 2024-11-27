import ChatMessage from "../common/ChatMessage";
import SearchUI from "./SearchUI";
import ProfileName from "../common/ProfileName";
import ProfileImage from "../common/ProfileImage";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useSocket } from "../../contexts/SocketContext";
import useMessages from "../../hooks/useMessages";

function ChatUi({ acceptedMatches }) {
  const socket = useSocket();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const token = localStorage.getItem("token");
  const [ReceiverId, setReceiverId] = useState(null);
  const loginUserId = jwtDecode(token).id;

  const { messages, loading, error } = useMessages(loginUserId, ReceiverId);
  const [currentMessage, setCurrentMessage] = useState("");
  const [localMessages, setLocalMessages] = useState(messages);

  let matchDetails = [];

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const loggedInUserId = decodedToken.id;
      const matchesArray = acceptedMatches.acceptedMatches;

      if (Array.isArray(matchesArray)) {
        matchesArray.forEach((match) => {
          const { matchId, userId } = match;
          let otherUser = null;

          if (userId._id !== loggedInUserId) {
            otherUser = userId;
          } else if (matchId._id !== loggedInUserId) {
            otherUser = matchId;
          }

          if (otherUser) {
            const fullName = `${otherUser.firstName} ${otherUser.lastName}`;
            const image = `http://localhost:5000/${otherUser.images?.[0] || "default-profile-pic.jpg"}`;

            matchDetails.push({ fullName, image, id: otherUser._id });
          }
        });
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setReceiverId(profile.id);
    setLocalMessages(messages);
  };

  const handleSendMessage = async (message) => {
    const messageData = {
      sender: loginUserId,
      receiver: ReceiverId,
      content: message,
      messageType: "text",
    };

    try {
      if (socket?.connected) {
        socket.emit("sendMessage", messageData);
        setLocalMessages((prevMessages) => [
          ...prevMessages,
          { ...messageData, sender: { _id: loginUserId } },
        ]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      if (
        newMessage.receiver === ReceiverId ||
        newMessage.sender === ReceiverId
      ) {
        setLocalMessages((prevMessages) => {
          if (!prevMessages.some((msg) => msg._id === newMessage._id)) {
            return [...prevMessages, newMessage];
          }
          return prevMessages;
        });
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, ReceiverId]);

  const allMessages = [...localMessages];

  return (
    <div className="flex flex-row gap-2 pt-[110px] pb-14 pl-8 h-screen">
      <div className="flex flex-col bg-slate-100 rounded-3xl w-[300px] h-full">
        <div className="py-7 pl-4">
          <p className="pb-4 font-bold text-4xl text-custom-indigo">Chat</p>
          <SearchUI />
        </div>

        <div className="flex-grow px-4 max-h-full overflow-y-auto">
          {matchDetails.length > 0 ? (
            matchDetails.map((match, index) => (
              <div
                key={index}
                onClick={() => handleProfileClick(match)}
                className="cursor-pointer"
              >
                <ChatMessage
                  key={index}
                  name={match.fullName}
                  message={"show last message"}
                  image={match.image}
                />
              </div>
            ))
          ) : (
            <p>No matches available.</p>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-between bg-slate-100 px-2 py-2 rounded-3xl w-[660px] h-full">
        {selectedProfile && (
          <div className="flex flex-row gap-2 bg-indigo-100 pt-2 rounded-3xl w-full">
            <ProfileImage image={selectedProfile.image} />
            <ProfileName name={selectedProfile.fullName} />
          </div>
        )}

        <div className="flex flex-col flex-grow p-2 overflow-y-auto">
          {loading ? (
            <p>Select a profile to view the conversation</p>
          ) : error ? (
            <p>{error}</p>
          ) : selectedProfile ? (
            allMessages.map((message, index) => {
              const isSender = message.sender._id === loginUserId;

              return (
                <div
                  key={index}
                  className={`flex items-start mb-4 ${isSender ? "justify-end" : "justify-start"}`}
                >
                  {!isSender && (
                    <ProfileImage image={selectedProfile.image} alt="Sender" />
                  )}

                  <div
                    className={`max-w-[60%] py-3 rounded-lg ${
                      isSender
                        ? "bg-custom-indigo text-white"
                        : "bg-gray-100 text-black"
                    }`}
                  >
                    <div className="flex items-center shadow-sm px-3 rounded-lg">
                      {message.content}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">
              Select a profile to view the conversation
            </p>
          )}
        </div>

        {selectedProfile && (
          <div className="flex items-center bg-white shadow-md mt-2 px-4 py-2 rounded-full">
            <input
              type="text"
              placeholder="Type a message..."
              className="border-none w-full focus:outline-none text-base"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && currentMessage.trim()) {
                  handleSendMessage(currentMessage);
                  setCurrentMessage("");
                }
              }}
            />
            <button
              className="px-4 font-bold text-custom-indigo hover:text-custom-pink"
              onClick={() => {
                if (currentMessage.trim()) {
                  handleSendMessage(currentMessage);
                  setCurrentMessage("");
                }
              }}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatUi;
