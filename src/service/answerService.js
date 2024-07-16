import axiosInstance from "./axiosInstance";

class AnswerService {
  static async addAnswer(formData) {
    try {
      const response = await axiosInstance.post(`/answer`, {
        ...formData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAnswersByQuestion(questionId) {
    console.log("getAnswersByQuestion");
    try {
      const response = await axiosInstance.get(
        `/answer/question/${questionId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AnswerService;
