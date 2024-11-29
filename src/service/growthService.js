import axiosInstance from "./axiosInstance";

class GrowthService {
  static async getDob() {
    try {
      return axiosInstance.get("/growth/dob");
    } catch (error) {
        throw error;
    }
  }

  static async getDop() {
    try {
      return axiosInstance.get("/growth/dop");
    } catch (error) {
        throw error;
    }
  }
}

export default GrowthService;