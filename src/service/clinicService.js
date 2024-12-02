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

  static async getClinicsByDateToAdmin(date) {
    try {
      const response = await axiosInstance.get(`/clinic/admin/by/${date}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getClinicsByDateToMidwife(date) {
    try {
      const response = await axiosInstance.get(`/clinic/midwife/by/${date}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getClinicsByDateToDoctor(date) {
    try {
      const response = await axiosInstance.get(`/clinic/doctor/by/${date}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getClinicsByMonthForAdmin(date) {
    try {
      const response = await axiosInstance.get(
        `/clinic/month/clinic/admin/${date}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getClinicsByMonthForMidwife(date) {
    try {
      const response = await axiosInstance.get(
        `/clinic/month/clinic/midwife/${date}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getClinicsDatesGivenMonthForParent(date) {
    try {
      const response = await axiosInstance.get(`/clinic/month/parent/${date}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getClinicsDatesGivenMonthForMidwife(date) {
    try {
      const response = await axiosInstance.get(`/clinic/month/midwife/${date}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getClinicsDatesGivenMonthForDoctor(date) {
    try {
      const response = await axiosInstance.get(`/clinic/month/doctor/${date}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getUpcomingClinicsForMidwife() {
    try {
      const response = await axiosInstance.get(`/clinic/upcoming/midwife`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getUpcomingClinicsForDoctor() {
    try {
      const response = await axiosInstance.get(`/clinic/upcoming/doctor`);
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
