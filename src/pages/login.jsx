import { Button, FloatingLabel } from "flowbite-react";
import React from "react";
import google from "../assets/google.png";
import fb from "../assets/facebook.png";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import loginImg from "../assets/loginImg.png";

const login = () => {
  return (
    <div className="h-screen w-screen">
      <img
        src={loginImg}
        alt=""
        className="absolute xl:w-5/12 lg:w-4/12 xl:left-56 xl:top-36 lg:left-48 lg:top-64 hidden lg:block"
      />
      <div className="flex md:p-12 h-full justify-center">
        <div className="bg-[#620084] rounded-l-2xl w-4/12 shadow-sm hidden lg:block ">
          <p className="w-48 text-center m-8 text-white">
            “Two lives, one journey. Together, we protect the bond between
            mother and child for a healthier future.”
          </p>
        </div>

        <div className="flex flex-col items-center w-full md:w-8/12 justify-center shadow-md rounded-2xl">
          <p className="text-[#202244] font-bold text-2xl mt-8">
            Log in with Maathru
          </p>

          <div className="mt-8 w-80 md:w-96 ">
            <FloatingLabel
              variant="outlined"
              label="Username"
              className="rounded-3xl font-semibold text-md"
            />
          </div>
          <div className="">
            <div className="mt-5 w-80 md:w-96">
              <FloatingLabel
                variant="outlined"
                label="Password"
                type="Password"
                className="rounded-3xl font-semibold text-md"
              />
            </div>
            <Link>
              <p className="text-xs float-right text-[#545454]">
                Forgot Passowrd?
              </p>
            </Link>
          </div>

          <p className="mt-12">Or Continue With</p>
          <div className="flex gap-5">
            <div className="w-12 h-12 rounded-3xl shadow-md flex items-center justify-center">
              <img className="w-7" src={google} alt="" />
            </div>
            <div className="w-12 h-12 rounded-3xl shadow-md flex items-center justify-center">
              <img className="" src={fb} alt="" />
            </div>
          </div>

          <div className="mt-6 bg-[#9C33C1] text-white w-72 text-center p-1 text-lg rounded-3xl">
            <span className="align-middle font-semibold">Log In</span>
            <Button pill className="h-10 w-10 bg-white float-right">
              <HiOutlineArrowRight className="h-5 w-5 text-[#9C33C1]" />
            </Button>
          </div>

          <p className="mt-2 font-semibold">
            New member?
            <Link to="/">
              <span className="text-[#9C33C1]"> SIGN UP</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default login;
