import AuthService from "@/service/authService";
import { createContext, useState } from "react";

export const userData = createContext();

const UserAuth = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    authenticated: AuthService.isAuthenticated(),
    name: AuthService.getName(),
    role: AuthService.getRole(),
    userId: AuthService.getUserId(),
    accessToken: AuthService.getAccessToken(),
    refreshToken: AuthService.getRefreshToken(),
  });
  return (
    <userData.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </userData.Provider>
  );
};

export default UserAuth;
