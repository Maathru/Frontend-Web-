import axiosInstance from "./axiosInstance";

class EmployeeService {
  static async getMidwives() {
    try {
      const response = await axiosInstance.get(`/employee/midwife`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default EmployeeService;
