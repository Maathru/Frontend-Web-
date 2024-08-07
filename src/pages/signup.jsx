import {
  HiCheckCircle,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import google from "../assets/google.png";
import fb from "../assets/facebook.png";
import signupImg from "../assets/signupImg.png";
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
import { errorType, Toast } from "@/components/toast";
import { useTitle } from "@/hooks/useTitle";
import AuthService from "@/service/authService";
import { useState } from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Signup = () => {
  useTitle("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { t } = useTranslation("signup");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value) return "First name is required";
        break;
      case "lastName":
        if (!value) return "Last name is required";
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return "Email is required";
        if (!emailPattern.test(value)) return "Email is not valid";
        break;
      case "password":
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!value) return "Password is required";
        if (!passwordPattern.test(value))
          return "Password must be at least 6 characters and contain both letters and numbers";
        break;
      case "confirmPassword":
        if (!value) return "Confirm password is required";
        if (value !== formData.password) return "Passwords do not match";
        break;
      default:
        break;
    }
    return "";
  };

  const validate = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    if (!agree) {
      Toast("You have to agree", errorType.ERROR);
      return;
    }

    try {
      const response = await AuthService.register(formData);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      Toast(response.message.split("/")[1], errorType.SUCCESS);
      navigate("/login");
    } catch (error) {
      console.log(error.message);

      const data = error.response.data;
      if (data) {
        if (Array.isArray(data)) {
          const newErrors = {};
          data.map((msg) => {
            Toast(msg.message, errorType.ERROR);
            newErrors[msg.field] = msg.message;
          });

          setErrors(newErrors);
        } else {
          console.log(data);
          Toast(data || "Error occurred", errorType.ERROR);
        }
      }
    }
  };

  return (
    <div className="w-screen ">
      <div className="flex md:p-12 md:py-2 justify-center">
        <img
          src={signupImg}
          alt=""
          className="absolute xl:w-5/12 lg:w-4/12 xl:left-56 xl:top-44 lg:left-48 lg:top-64 hidden lg:block"
        />
        <div className="bg-[#620084] rounded-l-2xl w-4/12 shadow-sm hidden lg:block ">
          <p className="w-56 text-lg font-semibold text-center m-8 text-white">
            {t("image-text")}
          </p>
        </div>

        <div className="md:w-8/12 w-full shadow-md rounded-2xl pb-10">
          <div className="flex flex-col items-center lg:ml-36">
            <p className="text-[#202244] dark:text-[#eae0f4] font-bold text-2xl my-8">
              {t("title")}
            </p>

            <div className="sm:w-7/12 w-9/12">
              <TextField
                label={t("firstName")}
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                variant="outlined"
                InputProps={{ sx: { borderRadius: 8, mb: 1 } }}
                fullWidth
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>

            <div className="sm:w-7/12 w-9/12">
              <TextField
                label={t("lastName")}
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                variant="outlined"
                InputProps={{ sx: { borderRadius: 8, mb: 1 } }}
                fullWidth
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>

            <div className="sm:w-7/12 w-9/12">
              <TextField
                label={t("email")}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                variant="outlined"
                InputProps={{ sx: { borderRadius: 8, mb: 1 } }}
                fullWidth
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="sm:w-7/12 w-9/12">
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  {t("password")}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  sx={{ borderRadius: 8, mb: 1 }}
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
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </FormControl>
            </div>

            <div className="sm:w-7/12 w-9/12">
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password-confirm">
                  {t("cPassword")}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-confirm"
                  type={showPassword ? "text" : "password"}
                  sx={{ borderRadius: 8, mb: 1 }}
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
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword}</p>
                )}
              </FormControl>
            </div>

            <p className="mt-3">
              <Checkbox
                {...label}
                icon={<HiOutlineCheckCircle size={22} />}
                checkedIcon={<HiCheckCircle size={22} />}
                sx={{
                  padding: 1,
                }}
                value={agree}
                onClick={() => setAgree((pre) => !pre)}
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
                onClick={handleSubmit}
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

export default Signup;
