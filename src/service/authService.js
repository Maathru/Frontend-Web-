import axiosInstance from "./axiosInstance";

class AuthService {
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
    return role === role.ADMIN;
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === role.USER;
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

  static getUserId() {
    return localStorage.getItem("userId");
  }

  static getAccessToken() {
    return localStorage.getItem("jwt");
  }

  static getRefreshToken() {
    return localStorage.getItem("refresh");
  }
}

export default AuthService;
