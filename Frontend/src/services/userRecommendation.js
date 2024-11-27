import apiClient from "./api";

export const getUserRecommendations = async (userId) => {
  try {
    const response = await apiClient.get(
      `/api/getRecommendedMatches/${userId}`
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        "Failed to fetch recommendations. Status: " + response.status
      );
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);

    throw new Error(
      error.response
        ? error.response.data.message
        : error.message || "Unknown error"
    );
  }
};
