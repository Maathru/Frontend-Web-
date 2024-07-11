import axios from "axios";

class UserService {
  static BASE_URL = "http://localhost:8081/api/v1";

  static async login(email, password) {
    try {
      const response = await axios.post(`${this.BASE_URL}/auth/signin`, {
        email,
        password,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async register(userData, token) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/auth/signup`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers(token) {
    try {
      const response = await axios.get(`${this.BASE_URL}/admin/get-all-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getProfile(token) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/adminuser/get-profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(userId, token) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/admin/get-users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(userId, token) {
    try {
      const response = await axios.delete(
        `${this.BASE_URL}/admin/delete/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(userId, userData, token) {
    try {
      const response = await axios.put(
        `${this.BASE_URL}/admin/update/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async logout(token) {
    try {
      const response = await axios.get(`${this.BASE_URL}/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("jwt");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    // setUserDetails({
    //   authenticated: false,
    //   name: "",
    //   role: "",
    //   accessToken: "",
    //   refreshToken: "",
    // });
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
}

export default UserService;
