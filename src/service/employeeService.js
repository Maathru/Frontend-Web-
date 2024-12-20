import axiosInstance from "./axiosInstance";

class EmployeeService {
  static async register(formData) {
    try {
      const response = await axiosInstance.post(`/employee`, {
        ...formData,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Employee registration failed: ${
            error.response.data.message || "Unknown error"
          }`
        );
      }
      throw new Error("Network error while registering employee");
    }
  }

  static async getMidwives() {
    try {
      const response = await axiosInstance.get(`/employee/midwife`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //By admin
  static async getAdminDashboardData() {
    try {
      const response = await axiosInstance.get(`/employee/dashboard/admin`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //By midwife
  static async getMidwifeDashboardData() {
    try {
      const response = await axiosInstance.get(`/employee/dashboard/midwife`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //By midwife
  static async getMidwifeHomeVisitsData(id) {
    if (!id) {
      throw new Error("Midwife ID is required");
    }
    const response = await axiosInstance.get(`/employee/home-visits/${id}`);
    return response.data;
  }
}

export default EmployeeService;
