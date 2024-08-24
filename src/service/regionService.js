import axiosInstance from "./axiosInstance";

class RegionService {
  static async getRegions() {
    try {
      const response = await axiosInstance.get(`/region`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getRegion(id) {
    try {
      const response = await axiosInstance.get(`/region/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async addRegion(formData) {
    try {
      const response = await axiosInstance.post(`/region`, {
        ...formData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteRegion(id) {
    try {
      const response = await axiosInstance.delete(`/region/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getMidwives() {
    try {
      const response = await axiosInstance.get(`/region/midwife`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default RegionService;
