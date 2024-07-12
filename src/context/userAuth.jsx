import UserService from "@/service/userService";
import { createContext, useState } from "react";

export const userData = createContext();

const UserAuth = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    authenticated: UserService.isAuthenticated(),
    name: UserService.getName(),
    role: UserService.getRole(),
    accessToken: UserService.getAccessToken(),
    refreshToken: UserService.getRefreshToken(),
  });
  return (
    <userData.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </userData.Provider>
  );
};

export default UserAuth;
