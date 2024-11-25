import axiosInstance from "./axiosInstance";

class ForumService {
  static async getQuestions() {
    try {
      const response = await axiosInstance.get(`/question`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async addQuestion(formData) {
    try {
      const response = await axiosInstance.post(`/question`, {
        ...formData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getQuestion(id) {
    try {
      const response = await axiosInstance.get(`/question/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllQuestionsWithPagination(offset, pageSize) {
    try {
      const response = await axiosInstance.get(
        `/question/pagination/${offset}/${pageSize}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllQuestionsWithDefaultPagination() {
    try {
      const response = await axiosInstance.get(`/question/pagination`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  static async searchQuestionsByKeyword(keyword){
    try{
      const response = await axiosInstance.get(`/question/search/keyword/${keyword}`);
      return response.data;
    }
    catch(error){
      throw error;
    }
  }

  static async editQuestion(id, formData) {
    try {
      const response = await axiosInstance.put(`/question/${id}`, {
        ...formData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteQuestion(id) {
    try {
      const response = await axiosInstance.delete(`/question/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAnswer(id) {
    try {
      const response = await axiosInstance.delete(`/answer/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async editAnswer(id , formData){
    try {
      const response = await axiosInstance.put(`/answer/${id}` , {
        ...formData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ForumService;
