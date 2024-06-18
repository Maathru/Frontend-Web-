import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/nav/maathru-nav-logo.png";
import languageIcon from "../assets/nav/language-icon.png";
import profilePhoto from "../assets/nav/sample-profile.png";
import { MdLightMode } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";

const navBarBg = "bg-[rgb(48,0,65,0.02)]";

const navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="dark:bg-neutral-800">
      <div className="flex justify-between items-center w-[92%] mx-auto">
        <div className="">
          <img className="md:w-16 w-12 p-1 my-1.5" src={logo} alt="" />
        </div>
        <div className={`${isMenuOpen ? "top-[10.5%] bg-white" : "top-[-100%]"} md:static absolute md:min-h-fit min-h-[50vh] left-0 md:w-auto w-full flex items-center px-5 duration-150`}>
          <div className="flex md:flex-row flex-col md:items-center md:gap-[5vw] gap-8 text-lg font-medium md:ml-0 ml-4">
            <Link>
              <p className="hover:text-gray-500 text-black">Home</p>
            </Link>
            <Link>
              <p className="hover:text-gray-500 text-[#9C33C1]">Blog</p>
            </Link>
            <Link>
              <p className="hover:text-gray-500 text-black">Drugs</p>
            </Link>
            <Link>
              <p className="hover:text-gray-500 text-black">Clinic</p>
            </Link>
            <Link>
              <p className="hover:text-gray-500 text-black">Midwife</p>
            </Link>
            <Link>
              <p className="hover:text-gray-500 text-black">Analysis</p>
            </Link>
          </div>
        </div>

        <div className="nav-profile flex items-center justify-self-end gap-4 md:gap-6 text-black">
          <div className="text-2xl hover:text-gray-500">
            <MdLightMode />
          </div>
          <img className="w-8" src={languageIcon} alt="" />
          <div className="text-2xl hover:text-gray-500">
            <MdNotifications />
          </div>
          <img className="w-10" src={profilePhoto} alt="" />
          <div className="text-3xl hover:text-gray-500 cursor-pointer md:hidden" onClick={handleMenuClick}>
            {isMenuOpen ? <MdClose /> : <MdMenu />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default navbar;
