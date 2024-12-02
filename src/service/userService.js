import { role } from "@/data/roleData";
import axiosInstance from "./axiosInstance";

class UserService {
  static async getUser() {
    try {
      const response = await axiosInstance.get(`/user`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateProfile(formData) {
    const url =
      formData.role == role.ADMIN ||
      formData.role == role.DOCTOR ||
      formData.role == role.MIDWIFE
        ? "/user/employee"
        : "/user";

    try {
      const response = await axiosInstance.put(url, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // by user
  static async getRegions(province, district, area) {
    try {
      const response = await axiosInstance.get(
        `/user/${province}/${district}/${area}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // By user
  static async getMidwife(region) {
    try {
      const response = await axiosInstance.get(`/user/midwife/${region}`);
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // By admin
  static async getAllUsers() {
    try {
      const response = await axiosInstance.get(`/user/getAll`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // By midwife
  static async getUserIdByEmail(email) {
    try {
      const response = await axiosInstance.get(`/user/midwife/get/${email}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
