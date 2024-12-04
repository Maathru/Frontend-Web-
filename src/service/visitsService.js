import axiosInstance from "./axiosInstance";

class VisitsService {
  static async saveHomeVisits(formData) {
    try {
      const response = await axiosInstance.post(`/visits`, {
        ...formData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getHomeVisits(userId) {
    try {
      const response = await axiosInstance.get(`/visits/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getHomeVisitsByMonthForMidwife(date) {
    try {
      const response = await axiosInstance.get(`/visits/month/midwife/${date}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getHomeVisitsByDateForMidwife(date) {
    try {
      const response = await axiosInstance.get(`/visits/date/midwife/${date}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getHomeVisitDatesByDateForParent(date) {
    try {
      const response = await axiosInstance.get(`/visits/list/parent/${date}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default VisitsService;
