import axiosInstance from "./axiosInstance";

class ImageService {
  static async upload(formData) {
    try {
      const response = await axiosInstance.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          console.log(`Uploading: ${progress}%`);
        },
      });
      return response;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  }
}

export default ImageService;
