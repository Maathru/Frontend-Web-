import axiosInstance from "./axiosInstance";

class AnalyticsService {
  static async getPregnancyCountByRegion() {
    try {
      const response = await axiosInstance.get(`/analytics/pregnancy-count-by-region`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getPregnancyCountByAge() {
    try {
      const response = await axiosInstance.get(`/analytics/pregnancy-count-by-age`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getBirthsByMonth() {
    try {
      const response = await axiosInstance.get(`/analytics/births-by-month`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getBirthWeights() {
    try {
      const response = await axiosInstance.get(`/analytics/birth-weights`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getDiseaseAnalysis() {
    try {
      const response = await axiosInstance.get(`/analytics/health-conditions-stats`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getBmiData() {
    try {
      const response = await axiosInstance.get(`/analytics/bmi`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AnalyticsService;