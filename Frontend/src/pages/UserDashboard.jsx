import { useEffect, useState } from "react";

import { useSocket } from "../contexts/SocketContext";

import cross from "../assets/images/cross.png";
import home from "../assets/images/home.png";
import add from "../assets/images/add.png";
import messagess from "../assets/images/messagess.png";
import notifications from "../assets/images/notifications.png";
import profile from "../assets/images/profile.png";
import search from "../assets/images/search.png";
import settings from "../assets/images/settings.png";
import image from "../assets/images/OnlineDating1.jpg";

import Logo from "../components/common/Logo";
import Sidebar from "../components/common/Sidebar";
import VerticalLine from "../components/common/VerticalLine";
import CardLayout from "../components/layout/CardLayout";
import ChooseMatchButton from "../components/UI/ChooseMatchButton";
import ProfileName from "../components/common/ProfileName";
import pinkHome from "../assets/images/pinkhome.png";
import pinkProfile from "../assets/images/pinkprofile.png";
import pinkMessages from "../assets/images/pinkmessages.png";
import pinkSearch from "../assets/images/pinksearch.png";
import pinkNotifications from "../assets/images/pinknotifications.png";
import pinkSettings from "../assets/images/pinksettings.png";

import CompleteProfile from "../components/auth/CompleteProfile";
import ChatUi from "../components/UI/ChatUi";
import ProfileUi from "../components/UI/ProfileUi";
import ProfileImage from "../components/common/ProfileImage";
import { useAuthToken } from "../hooks/useAuthToken";
import { checkProfileComplete, logout } from "../services/userProfile";
import { getUserRecommendations } from "../services/userRecommendation";
import MatchRequestsList from "../components/common/matchRequests";
import useUserProfile from "../hooks/useUserProfile";

import {
  respondToMatchRequest,
  sendMatchRequest,
} from "../services/matchRequestService";

import { useAcceptedMatches } from "../hooks/useAcceptedMatches";
import usePendingRequests from "../hooks/usePendingRequests";

function UserDashboard() {
  const userId = useAuthToken();

  const socket = useSocket();

  const [loading, setLoading] = useState(true);

  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] =
    useState(false);

  const [selectedOption, setSelectedOption] = useState("");

  const [recommendations, setRecommendations] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isMatchLoading, setIsMatchLoading] = useState(false);

  const [isProfileLoading, setIsProfileLoading] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const userdata = useUserProfile(userId, refresh);

  const { acceptedMatches } = useAcceptedMatches(socket, userId, refresh);
  const {
    pendingRequests,
    notificationsCount,
    setNotificationsCount,
    setPendingRequests,
  } = usePendingRequests(socket, userId, refresh);

  const { firstName, lastName, images } = userdata;

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);

  //notifications in real time
  useEffect(() => {
    if (!socket) {
      console.warn("Socket not initialized");
      return;
    }

    socket.on("new-notification", (message) => {
      setNotificationsCount((prevCount) => prevCount + 1);
      console.log("New notification received:", message);
      setRefresh((prev) => !prev);
    });

    return () => {
      socket.off("new-notification");
    };
  }, [socket, setNotificationsCount]);

  //profile completion
  useEffect(() => {
    const fetchProfileCompletion = async () => {
      if (!userId) return;

      setIsProfileLoading(true);
      try {
        const result = await checkProfileComplete(userId);
        setIsProfileComplete(result.isComplete);
        // console.log("Profile completion status:", result.isComplete);

        if (!result.isComplete) {
          setSelectedOption("Profile");
        }
      } catch (error) {
        console.error("Error checking profile completeness:", error.message);
      } finally {
        setIsProfileLoading(false);
        setLoading(false);
      }
    };

    fetchProfileCompletion();
  }, [userId]);

  //get recommended matches
  useEffect(() => {
    if (!userId || recommendations.length) return;
    setIsMatchLoading(true);
    const fetchRecommendation = async () => {
      // console.log("userId:", userId);
      if (!userId) return;

      try {
        // setLoading(true);
        const data = await getUserRecommendations(userId);

        if (data?.recommendedMatches?.length) {
          setRecommendations(data.recommendedMatches);
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setIsMatchLoading(false);
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [userId, recommendations, refresh]);

  const handleApprove = async (request) => {
    const currentUserId = request.matchId.id;
    const matchUserId = request.userId.id;
    const action = "accept";

    // console.log("Approving match request for", {
    //   currentUserId,
    //   matchUserId,
    //   action,
    // });

    try {
      const response = await respondToMatchRequest(
        socket,
        currentUserId,
        matchUserId,
        action
      );
      // console.log("Match request response:", response);
      setNotificationsCount((prevCount) => prevCount - 1);

      setPendingRequests((prevRequests) =>
        prevRequests.filter((r) => r.id !== request.id)
      );

      // setRefresh((prev) => !prev);

      socket.emit("matchUpdated", { matchedUserId: matchUserId });
      socket.emit("matchUpdated", { matchedUserId: currentUserId });
    } catch (error) {
      console.error("Error responding to match request:", error);
    }
  };

  const handleReject = async (request) => {
    const currentUserId = request.matchId.id;
    const matchUserId = request.userId.id;
    const action = "reject";

    console.log("Rejecting match request for", {
      currentUserId,
      matchUserId,
      action,
    });

    try {
      const response = await respondToMatchRequest(
        socket,
        currentUserId,
        matchUserId,
        action
      );
      console.log("Match request rejected:", response);

      setNotificationsCount((prevCount) => prevCount - 1);

      setPendingRequests((prevRequests) =>
        prevRequests.filter((r) => r.id !== request.id)
      );
    } catch (error) {
      console.error("Error responding to match request:", error);
    }
  };

  const handleNextUser = async () => {
    if (!recommendations.length) {
      console.log("No matches available.");
      return;
    }

    const currentUserId = userId;
    const matchUserId = recommendations[currentIndex]?.userId;

    console.log(currentUserId, matchUserId);

    if (!matchUserId) {
      console.error("Invalid match user ID.");
      return;
    }

    try {
      const response = await sendMatchRequest(
        socket,
        currentUserId,
        matchUserId
      );
      // console.log("Match request response:", response);

      if (response.notice) {
        console.log(response.notice);
      } else {
        socket.emit("send-notification", {
          recipientUserId: matchUserId,
          message: "You have a new match request!",
        });

        console.log("Notification sent");
      }

      setRecommendations((prevRecommendations) => {
        const updatedRecommendations = prevRecommendations.filter(
          (_, index) => index !== currentIndex
        );
        console.log("Updated recommendations: ", updatedRecommendations);

        const newIndex =
          currentIndex >= updatedRecommendations.length ? 0 : currentIndex;

        setCurrentIndex(newIndex);
        return updatedRecommendations;
      });

      // setSenderRefresh((prev) => !prev);
      // setReceiverRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error sending match request:", error);
    }
  };

  const handleSidebarClick = (option) => {
    if (!isProfileComplete && option !== "Profile") {
      alert("Profile is incomplete. Please complete your profile first.");
      return;
    }

    if (option === "Messages") {
      setRefresh(true);
    }
    if (option === "Home") {
      setRefresh(true);
    }
    if (option === "Notification") {
      setShowNotificationsDropdown((prev) => !prev);
    } else {
      setShowNotificationsDropdown(false);
    }

    if (option === "Settings") {
      setShowSettingsDropdown((prev) => !prev);
    } else {
      setShowSettingsDropdown(false);
    }

    setSelectedOption((prev) => (prev === option ? "" : option));
    console.log("Option selected:", option);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-col pt-14 pl-[79px]">
        <Logo />
        <div className="pt-14 pl-[25px]">
          <ul>
            <Sidebar
              icon={home}
              text="Home"
              isSelected={selectedOption === "Home"}
              selectedSidebarIcon={pinkHome}
              onClick={() => handleSidebarClick("Home")}
            />
            {/* <Sidebar
              icon={search}
              text="Search"
              isSelected={selectedOption === "Search"}
              selectedSidebarIcon={pinkSearch}
              onClick={() => handleSidebarClick("Search")}
            /> */}
            <Sidebar
              icon={messagess}
              text="Messages"
              isSelected={selectedOption === "Messages"}
              selectedSidebarIcon={pinkMessages}
              onClick={() => handleSidebarClick("Messages")}
            />
            <Sidebar
              icon={notifications}
              text="Notification"
              isSelected={selectedOption === "Notification"}
              selectedSidebarIcon={pinkNotifications}
              onClick={() => handleSidebarClick("Notification")}
              notificationsCount={notificationsCount}
            ></Sidebar>

            <Sidebar
              icon={profile}
              text="Profile"
              isSelected={selectedOption === "Profile"}
              selectedSidebarIcon={pinkProfile}
              onClick={() => handleSidebarClick("Profile")}
            />

            <Sidebar
              icon={settings}
              text="Settings"
              isSelected={selectedOption === "Settings"}
              selectedSidebarIcon={pinkSettings}
              onClick={() => handleSidebarClick("Settings")}
            />
            {showSettingsDropdown && (
              <div className="absolute bg-white shadow mt-2 border rounded-lg">
                <button
                  onClick={() => logout(socket)}
                  className="hover:bg-gray-200 px-4 py-2 w-full font-bold text-custom-indigo text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>

      <VerticalLine height="100%" />

      {selectedOption === "Messages" ? (
        <ChatUi acceptedMatches={acceptedMatches} />
      ) : selectedOption === "Profile" ? (
        <div className="flex-grow px-[30px] py-14 overflow-y-auto">
          {isProfileComplete ? (
            <ProfileUi />
          ) : (
            <CompleteProfile onProfileComplete={setIsProfileComplete} />
          )}
        </div>
      ) : selectedOption === "Notification" && showNotificationsDropdown ? (
        <div className="pt-72 pr-[717px] pl-3">
          <MatchRequestsList
            requests={pendingRequests}
            handleApprove={handleApprove}
            handleReject={handleReject}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center px-[50px] md:px-[150px] lg:px-[300px]">
          {recommendations.length > 0 ? (
            <>
              <CardLayout
                name={recommendations[currentIndex].name}
                images={recommendations[currentIndex].pictures}
              />
              <div className="flex flex-row gap-3 pt-3">
                <ChooseMatchButton type="button" onClick={handleNextUser}>
                  <img src={cross} alt="cross icon" />
                </ChooseMatchButton>
                <ChooseMatchButton type="button" onClick={handleNextUser}>
                  <img src={add} alt="add icon" />
                </ChooseMatchButton>
              </div>
            </>
          ) : (
            <p className="px-[79px] font-bold text-center">
              No recommended matches available.
            </p>
          )}
        </div>
      )}

      {selectedOption !== "Profile" && (
        <div className="flex md:flex-row flex-col items-center md:items-start">
          <VerticalLine height="100%" />
          <div className="flex flex-row gap-2 pt-14 pl-2">
            <ProfileImage
              image={
                images?.[0]
                  ? `http://localhost:5000/${images[0]}`
                  : "/default-avatar.png"
              }
            />
            <ProfileName name={`${firstName} ${lastName}`} image={image} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
