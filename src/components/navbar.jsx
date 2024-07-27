import { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/nav/maathru-nav-logo.png";
import profilePhoto from "../assets/nav/sample-profile.png";
import {
  MdDarkMode,
  MdLightMode,
  MdNotifications,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import enDark from "../assets/nav/en-dark.png";
import enLight from "../assets/nav/en-light.png";
import sinDark from "../assets/nav/sin-dark.png";
import sinLight from "../assets/nav/sin-light.png";
import { Button } from "./ui/button";
import UserService from "@/service/userService";
import { errorType, Toast } from "./toast";
import { userData } from "@/context/userAuth";
import LogoutDialog from "@/components/logoutDialog";
import { role } from "@/data/roleData";

const Navbar = ({ themeFunction, mode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [themeImage, setThemeImage] = useState(enDark);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(userData);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const { i18n } = useTranslation();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const setLanguage = () => {
    if (i18n.language === "sin") {
      if (mode === "dark") {
        setThemeImage(enDark);
      } else {
        setThemeImage(enLight);
      }
      i18n.changeLanguage("en");
    } else {
      if (mode === "dark") {
        setThemeImage(sinDark);
      } else {
        setThemeImage(sinLight);
      }
      i18n.changeLanguage("sin");
    }
  };

  useEffect(() => {
    if (i18n.language === "sin") {
      if (mode === "dark") {
        setThemeImage(sinDark);
      } else {
        setThemeImage(sinLight);
      }
    } else {
      if (mode === "dark") {
        setThemeImage(enDark);
      } else {
        setThemeImage(enLight);
      }
    }
  }, [mode]);

  const handleLogout = async () => {
    await UserService.logout();

    setUserDetails({
      authenticated: false,
      name: "",
      role: "",
      accessToken: "",
      refreshToken: "",
    });
    Toast("User Logged Out", errorType.INFO);
    navigate("/");
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-bg-nav dark:bg-dark-background">
      <div className="flex justify-between items-center w-[92%] mx-auto">
        <div className="">
          <NavLink to="/">
            <img className="md:w-16 w-12 p-1 my-1.5" src={logo} alt="Logo" />
          </NavLink>
        </div>
        <div
          ref={menuRef}
          className={`${
            isMenuOpen
              ? "top-[8%] bg-white dark:bg-dark-background"
              : "top-[-100%]"
          } md:static absolute md:min-h-fit min-h-[50vh] left-0 md:w-auto w-full flex items-center px-5 duration-150 z-50`}
        >
          <div className="flex md:flex-row flex-col md:items-center md:gap-[5vw] gap-8 text-lg font-medium md:ml-0 ml-4">
            {/* Common links */}
            <NavLink
              exact="true"
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[#9C33C1] dark:text-[#ff8de7]"
                  : "hover:text-gray-500 text-black dark:text-gray-100"
              }
              onClick={handleLinkClick}
            >
              Home
            </NavLink>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                isActive
                  ? "text-[#9C33C1] dark:text-[#ff8de7]"
                  : "hover:text-gray-500 text-black dark:text-gray-100"
              }
              onClick={handleLinkClick}
            >
              Blog
            </NavLink>
            <NavLink
              to="/forum"
              className={({ isActive }) =>
                isActive
                  ? "text-[#9C33C1] dark:text-[#ff8de7]"
                  : "hover:text-gray-500 text-black dark:text-gray-100"
              }
              onClick={handleLinkClick}
            >
              Discussion Forum
            </NavLink>

            {/* Admin Links */}
            {userDetails.role === role.ADMIN && (
              <>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    /^\/users(\/.*)?$/.test(pathname)
                      ? "text-[#9C33C1] dark:text-[#ff8de7]"
                      : "hover:text-gray-500 text-black dark:text-gray-100"
                  }
                  onClick={handleLinkClick}
                >
                  Users
                </NavLink>
              </>
            )}

            {/* Doctor Links */}
            {userDetails.role === role.DOCTOR && (
              <>
                <NavLink
                  to="/clinics"
                  className={({ isActive }) =>
                    /^\/clinics(\/.*)?$/.test(pathname)
                      ? "text-[#9C33C1] dark:text-[#ff8de7]"
                      : "hover:text-gray-500 text-black dark:text-gray-100"
                  }
                  onClick={handleLinkClick}
                >
                  Clinic
                </NavLink>
                <NavLink
                  to="/midwife"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#9C33C1] dark:text-[#ff8de7]"
                      : "hover:text-gray-500 text-black dark:text-gray-100"
                  }
                  onClick={handleLinkClick}
                >
                  Midwife
                </NavLink>
                <NavLink
                  to="/drugs"
                  className={({ isActive }) =>
                    /^\/drugs(\/.*)?$/.test(pathname)
                      ? "text-[#9C33C1] dark:text-[#ff8de7]"
                      : "hover:text-gray-500 text-black dark:text-gray-100"
                  }
                  onClick={handleLinkClick}
                >
                  Drugs
                </NavLink>
                <NavLink
                  to="/analytics"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#9C33C1] dark:text-[#ff8de7]"
                      : "hover:text-gray-500 text-black dark:text-gray-100"
                  }
                  onClick={handleLinkClick}
                >
                  Analysis
                </NavLink>
              </>
            )}

            {/* Midwife links */}
            {userDetails.role === role.MIDWIFE && (
              <>
                <NavLink
                  to="/eligible"
                  className={({ isActive }) =>
                    /^\/eligible(\/.*)?$/.test(pathname)
                      ? "text-[#9C33C1]"
                      : "hover:text-gray-500 text-black dark:text-gray-100"
                  }
                  onClick={handleLinkClick}
                >
                  Eligibles
                </NavLink>
                <NavLink
                  to="/parents"
                  className={({ isActive }) =>
                    /^\/parents(\/.*)?$/.test(pathname)
                      ? "text-[#9C33C1]"
                      : "hover:text-gray-500 text-black dark:text-gray-100"
                  }
                  onClick={handleLinkClick}
                >
                  Parents
                </NavLink>
              </>
            )}

            {/* Parent Links */}
            {userDetails.role === role.PARENT && (
              <>
                <NavLink
                  to="/growth"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#9C33C1]"
                      : "hover:text-gray-500 text-black dark:text-gray-100"
                  }
                  onClick={handleLinkClick}
                >
                  Growth
                </NavLink>
              </>
            )}

            {/* Parent and Eligible links */}
            {(userDetails.role === role.PARENT ||
              userDetails.role === role.ELIGIBLE) && (
              <NavLink
                to="/eligible/1"
                className={({ isActive }) =>
                  /^\/eligible(\/.*)?$/.test(pathname)
                    ? "text-[#9C33C1]"
                    : "hover:text-gray-500 text-black dark:text-gray-100"
                }
                onClick={handleLinkClick}
              >
                Recovery Checklist
              </NavLink>
            )}
          </div>
        </div>

        <div className="nav-profile flex items-center justify-self-end gap-4 md:gap-6 text-black dark:text-gray-100">
          <div
            className="text-2xl hover:text-primary-purple cursor-pointer"
            onClick={themeFunction}
          >
            {mode === "dark" ? <MdLightMode /> : <MdDarkMode />}
          </div>

          {!userDetails.authenticated ? (
            <>
              <Link to="/signup">
                <Button
                  variant="outline"
                  className="md:ms-5 ms-1 bg-white text-[#9C33C1] hover:text-white"
                  onClick={handleLinkClick}
                >
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  className="bg-[#9C33C1] dark:text-white text-gray-100"
                  onClick={handleLinkClick}
                >
                  Log In
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className="text-2xl hover:text-gray-500">
                <MdNotifications />
              </div>
              <div
                className="text-3xl hover:text-gray-500 cursor-pointer md:hidden"
                onClick={handleMenuClick}
              >
                {isMenuOpen ? <MdClose /> : <MdMenu />}
              </div>

              <div className="relative" ref={dropdownRef}>
                <button
                  className="relative flex items-center space-x-2"
                  onClick={handleDropdownClick}
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={profilePhoto}
                    alt="Profile"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white dark:bg-dark-background divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                      <button
                        className="text-gray-900 dark:text-white group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-primary-purple hover:text-white"
                        onClick={() => {
                          handleLinkClick();
                          navigate("/profile");
                        }}
                      >
                        Profile
                      </button>
                      <button
                        className="text-gray-900 dark:text-white group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-primary-purple hover:text-white"
                        onClick={() => setIsLogoutDialogOpen(true)}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {isLogoutDialogOpen && (
        <LogoutDialog
          isOpen={isLogoutDialogOpen}
          onClose={() => setIsLogoutDialogOpen(false)}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Navbar;
