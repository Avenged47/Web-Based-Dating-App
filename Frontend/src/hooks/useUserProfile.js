import { useState, useEffect } from "react";
import { getUserProfile } from "../services/userProfile";

const useUserProfile = (userId, refresh) => {
  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    sexualOrientation: "",
    relationshipStatus: "",
    interestedIn: "",
    interests: [],
    dislikes: [],
    images: [],
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userProfile = await getUserProfile(userId);

        if (userProfile && userProfile.user) {
          setUserData((prevData) => ({
            ...prevData,
            email: userProfile.user.email || "",
            userName: userProfile.user.username || "",
            firstName: userProfile.user.firstName || "",
            lastName: userProfile.user.lastName || "",
            gender: userProfile.user.gender || "",
            dob: userProfile.user.dob || "",
            sexualOrientation: userProfile.user.sexualOrientation || "",
            relationshipStatus: userProfile.user.relationshipStatus || "",
            interestedIn: userProfile.user.interestedIn || "",
            interests: userProfile.user.interests || [],
            dislikes: userProfile.user.dislikes || [],
            images: userProfile.user.images || [],
          }));
        } else {
          console.error("User data is missing or not properly structured.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    }

    if (userId) fetchUserData();
  }, [userId, refresh]);

  return userData;
};

export default useUserProfile;
