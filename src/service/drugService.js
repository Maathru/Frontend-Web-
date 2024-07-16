import axiosInstance from "./axiosInstance";

class DrugService {
  static async getDrugs() {
    try {
      const response = await axiosInstance.get(`/drug`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async addDrug(formData) {
    try {
      const response = await axiosInstance.post(`/drug`, {
        ...formData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default DrugService;
