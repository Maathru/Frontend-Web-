import { useContext, useEffect, useState } from "react";
import logo from "../assets/nav/maathru-nav-logo.png";
import profilePhoto from "../assets/nav/sample-profile.png";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router-dom";
import enDark from "../assets/nav/en-dark.png";
import enLight from "../assets/nav/en-light.png";
import sinDark from "../assets/nav/sin-dark.png";
import sinLight from "../assets/nav/sin-light.png";
import { Button } from "./ui/button";
import UserService from "@/service/userService";
import { ToastContainer } from "react-toastify";
import { errorType, Toast } from "./toast";
import { userData } from "@/context/userAuth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Navbar = ({ themeFunction, mode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [themeImage, setThemeImage] = useState(enDark);
  const { pathname } = useLocation();
  const { userDetails, setUserDetails } = useContext(userData);

  const { i18n } = useTranslation();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
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
    const token = localStorage.getItem("jwt");
    await UserService.logout(token);

    setUserDetails({
      authenticated: false,
      name: "",
      role: "",
      accessToken: "",
      refreshToken: "",
    });
    Toast("User Logged Out", errorType.INFO);
  };

  return (
    <div className="bg-bg-nav dark:bg-neutral-700">
      <div className="flex justify-between items-center w-[92%] mx-auto">
        <div className="">
          <NavLink to="/">
            <img className="md:w-16 w-12 p-1 my-1.5" src={logo} alt="Logo" />
          </NavLink>
        </div>
        <div
          className={`${
            isMenuOpen ? "top-[8%] bg-white dark:bg-neutral-700" : "top-[-100%]"
          } md:static absolute md:min-h-fit min-h-[50vh] left-0 md:w-auto w-full flex items-center px-5 duration-150 z-50`}
        >
          <div className="flex md:flex-row flex-col md:items-center md:gap-[5vw] gap-8 text-lg font-medium md:ml-0 ml-4">
            <NavLink
              exact="true"
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[#9C33C1] dark:text-[#ff8de7]"
                  : "hover:text-gray-500 text-black dark:text-gray-100"
              }
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
            >
              Discussion Forum
            </NavLink>
            {userDetails.role === "DOCTOR" && (
              <>
                <NavLink
                  to="/clinics"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#9C33C1] dark:text-[#ff8de7]"
                      : "hover:text-gray-500 text-black dark:text-gray-100"
                  }
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
                >
                  Midwife
                </NavLink>
                <NavLink
                  to="/drugs"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#9C33C1] dark:text-[#ff8de7]"
                      : "hover:text-gray-500 text-black dark:text-gray-100"
                  }
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
                >
                  Analysis
                </NavLink>
              </>
            )}
            {userDetails.role === "ELIGIBLE" && (
              <NavLink
                to="/eligible/1"
                className={({ isActive }) =>
                  /^\/eligible(\/.*)?$/.test(pathname)
                    ? "text-[#9C33C1]"
                    : "hover:text-gray-500 text-black dark:text-gray-100"
                }
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

          <img
            src={themeImage}
            className="cursor-pointer"
            alt="Language icon"
            height={40}
            width={40}
            onClick={() => setLanguage((prev) => !prev)}
          />

          {!userDetails.authenticated ? (
            <>
              <Link to="/signup">
                <Button className="md:ms-5 ms-1 bg-white text-[#9C33C1] hover:text-white">
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-[#9C33C1] dark:text-white text-gray-100">
                  Log In
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className="text-2xl hover:text-gray-500">
                <MdNotifications />
              </div>
              <img className="w-10" src={profilePhoto} alt="Profile" />
              <div
                className="text-3xl hover:text-gray-500 cursor-pointer md:hidden"
                onClick={handleMenuClick}
              >
                {isMenuOpen ? <MdClose /> : <MdMenu />}
              </div>

              {/* logout */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-[#9C33C1] dark:text-white text-gray-100">
                    Log Out
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely logout?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
