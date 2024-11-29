import axiosInstance from "./axiosInstance";

class ImageService {
  static async upload(formData) {
    if (!formData || !(formData instanceof FormData)) {
      throw new Error('Invalid form data provided');
    }

    const file = formData.get('image');
    if (file && file.size > 5 * 1024 * 1024) {  // 5MB limit
      throw new Error('File size exceeds 5MB limit');
    }

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
      if (error.response) {
        console.error(`Upload failed with status ${error.response.status}:`, error.response.data);
        throw new Error(`Upload failed: ${error.response.data.message || 'Server error'}`);
      }
      if (error.request) {
        console.error('Upload failed: No response received');
        throw new Error('Upload failed: No response from server');
      }
      console.error('Upload configuration error:', error.message);
      throw new Error('Upload failed: Please try again');
    }
  }
}

export default ImageService;
