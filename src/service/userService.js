import axiosInstance from "./axiosInstance";

class UserService {
  static async login(email, password) {
    try {
      const response = await axiosInstance.post(`/auth/signin`, {
        email,
        password,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async register(formData) {
    try {
      const response = await axiosInstance.post(`/auth/signup`, {
        ...formData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async logout() {
    try {
      const response = await axiosInstance.get(`/logout`);
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("jwt");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("jwt");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }

  static adminOnly() {
    return this.isAuthenticated() && this.isAdmin();
  }

  static getRole() {
    return localStorage.getItem("role");
  }

  static getName() {
    return localStorage.getItem("name");
  }

  static getAccessToken() {
    return localStorage.getItem("jwt");
  }

  static getRefreshToken() {
    return localStorage.getItem("refresh");
  }

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

  static async getMidwife(region) {
    try {
      const response = await axiosInstance.get(`/user/midwife/${region}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      const response = await axiosInstance.get(`/user/getAll`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
