import apiClient from "./api";

export const signupUser = async (data) => {
  try {
    const response = await apiClient.post("/api/signup", data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Already used username or email"
      );
    } else {
      throw new Error("Network error, please try again");
    }
  }
};

export const loginUser = async (data) => {
  try {
    const response = await apiClient.post("/api/login", data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Network error, please try again");
    }
  }
};
