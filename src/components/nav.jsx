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
import { errorType, Toast } from "./toast";
import { userData } from "@/context/userAuth";
import LogoutDialog from "@/components/logoutDialog";
import AuthService from "@/service/authService";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { role } from "@/data/roleData";
import { navConfig } from "@/config/navConfig";

const Nav = ({ themeFunction, mode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
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

  const handleDropdownClick = (index) => {
    setIsDropdownOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const setLanguage = () => {
    if (i18n.language === "sin") {
      setThemeImage(mode === "dark" ? enDark : enLight);
      i18n.changeLanguage("en");
    } else {
      setThemeImage(mode === "dark" ? sinDark : sinLight);
      i18n.changeLanguage("sin");
    }
  };

  useEffect(() => {
    setThemeImage(
      i18n.language === "sin"
        ? mode === "dark"
          ? sinDark
          : sinLight
        : mode === "dark"
        ? enDark
        : enLight
    );
  }, [mode]);

  const handleLogout = async () => {
    await AuthService.logout();

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
    setIsDropdownOpen({});
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsDropdownOpen({});
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActiveLink = (linkPath) => {
    const baseLinkPath = linkPath.split("/")[1];
    const basePathname = pathname.split("/")[1];
    return baseLinkPath === basePathname;
  };

  const renderNavLinks = () => {
    const roleNavConfig = navConfig[userDetails.role] || navConfig[role.USER];
    return roleNavConfig.map((item, index) => {
      if (item.links) {
        const isActiveDropdown = item.links.some((link) =>
          pathname.includes(link.path)
        );
        return (
          <div className="relative" ref={dropdownRef} key={index}>
            <div
              className={`flex items-center gap-2 cursor-pointer ${
                isActiveDropdown ? "text-[#9C33C1] dark:text-[#ff8de7]" : ""
              }`}
              onClick={() => handleDropdownClick(index)}
            >
              <span>{item.name}</span>
              {isDropdownOpen[index] ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {isDropdownOpen[index] && (
              <div className="absolute w-48 mt-2 origin-top-right bg-white dark:bg-dark-background divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-2 py-2">
                  {item.links.map((link, subIndex) => (
                    <button
                      key={subIndex}
                      className={`text-gray-900 dark:text-white group flex rounded-md items-center w-full pe-2 ps-3 py-2 my-1 text-sm ${
                        pathname.includes(link.path)
                          ? "bg-primary-purple text-white"
                          : "hover:bg-primary-purple hover:text-white"
                      }`}
                      onClick={() => {
                        handleLinkClick();
                        navigate(link.path);
                      }}
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }
      return (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            isActiveLink(item.path) || isActive
              ? "text-[#9C33C1] dark:text-[#ff8de7]"
              : "hover:text-gray-500 text-black dark:text-gray-100"
          }
          onClick={handleLinkClick}
        >
          {item.name}
        </NavLink>
      );
    });
  };

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
          } md:static absolute md:min-h-fit min-h-[50vh] left-0 md:w-auto w-full flex items-center px-5 duration-150`}
        >
          <div className="flex md:flex-row flex-col md:items-center md:gap-[5vw] gap-8 text-lg font-medium md:ml-0 ml-4">
            {renderNavLinks()}
          </div>
        </div>
        <div className="nav-profile flex items-center justify-self-end gap-4 md:gap-6 text-black dark:text-gray-100">
          <div
            className="text-2xl hover:text-primary-purple cursor-pointer"
            onClick={themeFunction}
          >
            {mode === "dark" ? <MdLightMode /> : <MdDarkMode />}
          </div>
          <img
            src={themeImage}
            className="cursor-pointer"
            alt="Language icon"
            height={40}
            width={40}
            onClick={setLanguage}
          />
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
                  onClick={() => handleDropdownClick("profile")}
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={profilePhoto}
                    alt="Profile"
                  />
                </button>
                {isDropdownOpen["profile"] && (
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
        <>
          <LogoutDialog
            isOpen={isLogoutDialogOpen}
            onClose={() => setIsLogoutDialogOpen(false)}
            handleLogout={handleLogout}
          />
        </>
      )}
    </div>
  );
};

export default Nav;
