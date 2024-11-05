import apiClient from "./api";

export const checkProfileComplete = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required to check profile completeness.");
  }

  try {
    const response = await apiClient.get(`/api/checkProfileComplete/${userId}`);
    return response.data;
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
