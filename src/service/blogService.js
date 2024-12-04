import axiosInstance from "./axiosInstance";

class BlogService {
  static async getBlogs() {
    try {
      const response = await axiosInstance.get(`/blogs`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getApprovedBlogs() {
    try {
      const response = await axiosInstance.get(`/blogs/approved`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getPendingBlogs() {
    try {
      const response = await axiosInstance.get(`/blogs/pending`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async addBlog(articleData) {
    try {
      const response = await axiosInstance.post(`/blogs`, {
        ...articleData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getArticle(id) {
    try {
      const response = await axiosInstance.get(`/blogs/article/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async uploadImage(imageData) {
    try {
      const response = await axiosInstance.post(`/upload`, imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async approveArticle(id) {
    try {
      const response = await axiosInstance.put(`/blogs/approve/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //   static async getAllQuestionsWithPagination(offset, pageSize) {
  //     try {
  //       const response = await axiosInstance.get(
  //         `/question/pagination/${offset}/${pageSize}`
  //       );
  //       return response.data;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
}

export default BlogService;
