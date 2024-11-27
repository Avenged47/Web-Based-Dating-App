import apiClient from "./api";

export const checkProfileComplete = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required to check profile completeness.");
  }

  try {
    const response = await apiClient.get(`/api/checkProfileComplete/${userId}`);
    return response.data;
    console.log(response);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error checking profile completeness"
    );
  }
};

export const completeYourProfile = async (userId, profileData, token) => {
  if (!userId) {
    throw new Error("User ID is required to complete your profile.");
  }

  try {
    const response = await apiClient.put(
      `/api/completeProfile/${userId}`,
      profileData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error completing your profile"
    );
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await apiClient.get(`/api/getUser/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching profile");
  }
};

export const logout = (socket) => {
  console.log("socket", socket);
  try {
    if (socket && socket.connected) {
      socket.disconnect();
      console.log("Socket disconnected");
    }

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    window.location.href = "/";

    console.log("Logout successful");
  } catch (error) {
    console.log("Error logging out:", error);
    throw new Error(error.response?.data?.message || "Error logging out");
  }
};
