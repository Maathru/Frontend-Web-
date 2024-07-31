import google from "../assets/google.png";
import fb from "../assets/facebook.png";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/loginImg.png";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { errorType, Toast } from "@/components/toast";
import { userData } from "@/context/userAuth";
import { useTitle } from "@/hooks/useTitle";
import AuthService from "@/service/authService";

const Login = () => {
  useTitle("Log In");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUserDetails } = useContext(userData);
  const { t } = useTranslation("login");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Username is required";
        break;
      case "password":
        if (!value) return "Password is required";
        break;
      default:
        break;
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Username is required";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await AuthService.login(email, password);
      if (response.status === 200) {
        localStorage.setItem("jwt", response.data.access_token);
        localStorage.setItem("refresh", response.data.refresh_token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("userId" , response.data.id);

        setUserDetails({
          authenticated: true,
          name: response.data.name,
          role: response.data.role,
          userId: response.data.id,
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
        });

        Toast(response.data.message, errorType.SUCCESS);
        navigate("/");
      } else {
        console.log(response);
      }
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
          <p className="text-[#202244] dark:text-[#eae0f4] font-bold text-2xl mb-8">
            {t("title")}
          </p>

          <div className="sm:w-6/12 w-9/12">
            <TextField
              label={t("username")}
              name="email"
              variant="outlined"
              InputProps={{
                sx: { borderRadius: 8},
                className: "dark:bg-dark-background",
              }}
              value={email}
              onChange={handleInputChange}
              fullWidth
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <br />
          <div className="flex flex-col sm:w-6/12 w-9/12">
            <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                {t("password")}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
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
                value={password}
                onChange={handleInputChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
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
              onClick={handleSubmit}
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

export default Login;
