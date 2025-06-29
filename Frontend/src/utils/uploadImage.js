// import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

/**
 * Uploads an image to the server using multipart/form-data.
 * @param {File} imageFile - The image file to be uploaded.
 * @returns {Promise<Object>} - The response data from the server.
 */
const uploadImage = async (imageFile) => {
  if (!imageFile) {
    throw new Error("No image file provided");
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(`${BASE_URL}/api/auth/upload-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error uploading image:", error?.response?.data || error.message);
    throw error;
  }
};

export default uploadImage;
