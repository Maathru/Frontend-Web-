import {
  HiCheckCircle,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import React from "react";
import google from "../assets/google.png";
import fb from "../assets/facebook.png";
import signupImg from "../assets/signupImg.png";
import { CgShapeCircle } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import {
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Button } from "@/components/ui/button";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const signup = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { t } = useTranslation("signup");
  return (
    <div className="w-screen">
      <div className="flex md:p-12 md:py-2 justify-center">
        <img
          src={signupImg}
          alt=""
          className="absolute xl:w-5/12 lg:w-4/12 xl:left-56 xl:top-36 lg:left-48 lg:top-64 hidden lg:block"
        />
        <div className="bg-[#620084] rounded-l-2xl w-4/12 shadow-sm hidden lg:block ">
          <p className="w-56 text-lg font-semibold text-center m-8 text-white">{t("image-text")}</p>
        </div>

        <div className="md:w-8/12 shadow-md rounded-2xl pb-10">
          <div className="flex flex-col items-center lg:ml-36">
            <p className="text-[#202244] font-bold text-2xl my-8">
              {t("title")}
            </p>

            <TextField
              label={t("firstName")}
              variant="outlined"
              InputProps={{ sx: { borderRadius: 8, width: "30vw", mb: 1 } }}
            />
            <TextField
              label={t("lastName")}
              variant="outlined"
              InputProps={{ sx: { borderRadius: 8, width: "30vw", mb: 1 } }}
            />
            <TextField
              label={t("email")}
              variant="outlined"
              InputProps={{ sx: { borderRadius: 8, width: "30vw", mb: 1 } }}
            />
            <FormControl sx={{ width: "30vw", mb: 1 }} variant="outlined">
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
            <FormControl sx={{ width: "30vw" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                {t("cPassword")}
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
                label="Confirm Password"
              />
            </FormControl>

            <p className="mt-3">
              <Checkbox
                {...label}
                icon={<HiOutlineCheckCircle size={22} />}
                checkedIcon={<HiCheckCircle size={22} />}
                sx={{
                  padding: 1,
                }}
              />
              {/* <CgShapeCircle className="text-[#D590FF] inline text-2xl" /> */}
              {t("agree")}
              <Link className=""> {t("terms")}</Link>
            </p>

              <p className="font-semibold mt-4">{t("continue")}</p>
            <div className="flex items-center gap-5">
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
              <span className="align-middle font-semibold">{t("signup")}</span>
              <Button
                pill="true"
                className="h-10 w-10 grid flexbox justify-center align-middle rounded-full bg-white float-right hover:bg-purple-100"
              >
                <HiOutlineArrowRight className="h-5 w-5 text-[#9C33C1]" />
              </Button>
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
