import { Button, FloatingLabel } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import React from "react";
import google from "../assets/google.png";
import fb from "../assets/facebook.png";
import signupImg from "../assets/signupImg.png";
import { CgShapeCircle } from "react-icons/cg";
import { useTranslation } from "react-i18next";

const signup = () => {
  const { t } = useTranslation("signup");
  return (
    <div className="w-screen">
      <img
        src={signupImg}
        alt=""
        className="absolute xl:w-5/12 lg:w-4/12 xl:left-56 xl:top-24 lg:left-48 lg:top-64 hidden lg:block"
      />
      <div className="flex md:p-12 justify-center">
        <div className="bg-[#620084] rounded-l-2xl w-4/12 shadow-sm hidden lg:block ">
          <p className="w-48 text-center m-8 text-white">{t("image-text")}</p>
        </div>

        <div className="md:w-8/12 shadow-md rounded-2xl pb-10">
          <div className="flex flex-col items-center lg:ml-36">
            <p className="text-[#202244] font-bold text-2xl mt-8">
              {t("title")}
            </p>

            <div className="mt-8 w-80 md:w-8/12 ">
              <FloatingLabel
                variant="outlined"
                label={t("firstName")}
                className="rounded-3xl font-semibold text-md"
              />
            </div>
            <div className="mt-2 w-80 md:w-8/12 ">
              <FloatingLabel
                variant="outlined"
                label={t("lastName")}
                className="rounded-3xl font-semibold text-md"
              />
            </div>
            <div className="mt-2 w-80 md:w-8/12 ">
              <FloatingLabel
                variant="outlined"
                label={t("email")}
                type="email"
                className="rounded-3xl font-semibold text-md"
              />
            </div>
            <div className="mt-2 w-80 md:w-8/12">
              <FloatingLabel
                variant="outlined"
                label={t("password")}
                type="Password"
                className="rounded-3xl font-semibold text-md"
              />
            </div>
            <div className="mt-2 w-80 md:w-8/12">
              <FloatingLabel
                variant="outlined"
                label={t("cPassword")}
                type="Password"
                className="rounded-3xl font-semibold text-md"
              />
            </div>

            <p className="mt-3">
              <CgShapeCircle className="text-[#D590FF] inline text-2xl" />
              {t("agree")}
              <Link className=""> {t("terms")}</Link>
            </p>

            <div className="flex items-center gap-5 mt-4">
              <p className="font-semibold">{t("continue")}</p>
              <div className="w-12 h-12 rounded-3xl shadow-md flex items-center justify-center">
                <img className="w-7" src={google} alt="" />
              </div>
              <div className="w-12 h-12 rounded-3xl shadow-md flex items-center justify-center">
                <img className="" src={fb} alt="" />
              </div>
            </div>

            <div className="mt-6 bg-[#9C33C1] text-white w-72 text-center p-1 text-lg rounded-3xl">
              <span className="align-middle font-semibold">{t("signup")}</span>
              <button
                pill="true"
                className="h-10 w-10 grid flexbox justify-center align-middle rounded-full bg-white float-right hover:bg-purple-100"
              >
                <HiOutlineArrowRight className="h-5 w-5 text-[#9C33C1]" />
              </button>
            </div>

            <p className="mt-2 font-semibold">
              {t("member")}
              <Link to="/login">
                <span className="text-[#9C33C1]"> {t("login")}</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signup;
