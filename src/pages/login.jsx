import google from "../assets/google.png";
import fb from "../assets/facebook.png";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import loginImg from "../assets/loginImg.png";
import { useTranslation } from "react-i18next";

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import React from "react";
import { Button } from "@/components/ui/button";

const login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { t } = useTranslation("login");
  return (
    <div className="h- w-screen">
      <img
        src={loginImg}
        alt=""
        className="absolute xl:w-4/12 lg:w-3/12 xl:left-56 xl:top-56 lg:left-48 lg:top-64 hidden lg:block"
      />
      <div className="flex md:p-12 md:py-4 h-full justify-center">
        <div className="bg-[#620084] rounded-l-2xl w-4/12 shadow-sm hidden lg:block ">
          <p className="w-56 text-lg font-semibold text-center m-8 text-white">
            {t("image-text")}
          </p>
        </div>

        <div className="flex flex-col items-center w-full md:w-8/12 justify-center shadow-md rounded-r-2xl py-16">
          <p className="text-[#202244] font-bold text-2xl mb-8">{t("title")}</p>

          <TextField
            label={t("username")}
            variant="outlined"
            InputProps={{ sx: { borderRadius: 8, width: "30vw" } }}
          />
          <br />
          <div className="flex flex-col">
            <FormControl sx={{ m: 1, width: "30vw" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                {t("password")}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                sx={{ borderRadius: 8 }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Link>
              <p className="text-xs float-right text-[#545454]">
                {t("forgot")}
              </p>
            </Link>
          </div>

          <p className="mt-12">{t("continue")}</p>
          <div className="flex gap-5">
            <Link>
              <div className="w-12 h-12 rounded-3xl shadow-md flex items-center justify-center">
                <img className="w-7" src={google} alt="" />
              </div>
            </Link>
            <Link>
              <div className="w-12 h-12 rounded-3xl shadow-md flex items-center justify-center">
                <img className="" src={fb} alt="" />
              </div>
            </Link>
          </div>

          <div className="mt-6 bg-[#9C33C1] text-white w-72 text-center p-1 text-lg rounded-3xl">
            <span className="align-middle font-semibold">{t("login")}</span>
            <Button
              pill="true"
              className="h-10 w-10 grid flexbox justify-center align-middle rounded-full bg-white float-right hover:bg-purple-100"
            >
              <HiOutlineArrowRight className="h-5 w-5 text-[#9C33C1]" />
            </Button>
          </div>

          <p className="mt-2 font-semibold">
            {t("newMember")}
            <Link to="/signup">
              <span className="text-[#9C33C1]"> {t("signup")}</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default login;
