import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/nav/maathru-nav-logo.png";
import languageIcon from "../assets/nav/language-icon.png";
import profilePhoto from "../assets/nav/sample-profile.png";
import { MdLightMode } from "react-icons/md";
import { MdNotifications } from "react-icons/md";

const navbar = () => {
  return (
    <div className="w-screen bg-slate-100 grid grid-cols-5">
        <div className="col-span-1">
            <img className="my-4 ml-8 w-20" src={logo} alt="" />
        </div>

        <div className="nav-elements col-span-3 flex justify-around items-center text-xl font-medium">
            <Link>
                <p className="text-black">Home</p>
            </Link>
            <Link>
                <p className="text-[#9C33C1]">Blog</p>
            </Link>
            <Link>
                <p className="text-black">Drugs</p>
            </Link>
            <Link>
                <p className="text-black">Clinic</p>
            </Link>
            <Link>
                <p className="text-black">Midwife</p>
            </Link>
            <Link>
                <p className="text-black">Analysis</p>
            </Link>
        </div>
        <div className="nav-profile flex items-center justify-self-end text-black col-span-1">
             <div className="text-4xl mx-2.5">
                <MdLightMode />
            </div>
            <img className="mx-2.5 w-14" src={languageIcon} alt="" />
            <div className="text-4xl mx-2.5">
                <MdNotifications />
            </div>
            <img className="ml-3.5 mr-7 w-18" src={profilePhoto} alt="" />
        </div>

    </div>
  );
};

export default navbar;
