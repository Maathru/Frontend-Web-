import axiosInstance from "./axiosInstance";

class MedicalRecordService {
  static async getAllRecords() {
    try {
      const response = await axiosInstance.get(`/record/getall`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default MedicalRecordService;