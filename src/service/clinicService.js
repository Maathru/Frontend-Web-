import axiosInstance from "./axiosInstance";

class ClinicService {
  // By Admin
  static async getDoctorsByMohAreaAndDistrict(district, mohArea) {
    try {
      const response = await axiosInstance.get(
        `/employee/doctor/${district}/${mohArea}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // By Admin
  static async addClinic(formData) {
    try {
      const response = await axiosInstance.post(`/clinic`, {
        ...formData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // By Admin
  static async getRegions() {
    try {
      const response = await axiosInstance.get("/clinic/regions");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // By Admin
  static async getDoctors() {
    try {
      const response = await axiosInstance.get("/clinic/doctors");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getClinicsByDate(date) {
    try {
      const response = await axiosInstance.get(`/clinic/by/${date}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getClinicsByMonth(date) {
    try {
      const response = await axiosInstance.get(`/clinic/month/${date}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getClinic(clinicId) {
    try {
      const response = await axiosInstance.get(`/clinic/${clinicId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ClinicService;
