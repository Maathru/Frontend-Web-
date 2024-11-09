import axiosInstance from "./axiosInstance";

class EmployeeService {
  static async register(formData) {
    try {
      const response = await axiosInstance.post(`/employee`, {
        ...formData,
      });
      return response.data;
    } catch (error) {
      throw error;
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
}

export default EmployeeService;
