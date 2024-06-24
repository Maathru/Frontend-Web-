import { Button } from "@/components/ui/button";
import dashboardImage from "../../assets/user/dashboardImage.png";
import blog from "../../assets/user/blog.png";
import forum from "../../assets/user/forum.png";
import vaccine from "../../assets/user/vaccine.png";
import WrapperCard from "@/components/wrapperCard";
import { IoIosWarning } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { LuPhoneCall } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const provinces = [
  "Western",
  "Northern",
  "Southern",
  "Eastern",
  "North Western",
  "South Eastern",
  "Central",
  "Uwa",
  "Sabaragamuwa",
];

const Dashboard = () => {
  const [province, setProvince] = useState("");

  const handleChange = (event) => {
    setProvince(event.target.value);
  };

  const { t } = useTranslation("userDashboard");

  return (
    <div className="container my-10 font-poppins">
      {/* Hero section */}
      <div className="flex lg:justify-center">
        <div className="lg:w-3/5 flex flex-col items-center lg:items-start">
          <h1 className="text-3xl">{t("greeting")} Buddhika</h1>
          <p className="text-xl mt-8 sm:ms-8 tracking-wider">{t("heading")}</p>
          <div className="w-10/12">
            <p className="text-xl my-8 sm:mx-14 text-center">{t("title1")}</p>
            <p className="text-justify sm:mx-14 tracking-wider">
              {t("description1")}
            </p>
            <div className="flex items-center mt-12">
              <Button className="bg-primary-purple px-14 m-auto">
                {t("button1")}
              </Button>
            </div>
          </div>
        </div>
        <div className="w-2/5 lg:flex items-stretch hidden">
          <img
            className="object-cover h-full"
            src={dashboardImage}
            alt="Wedding photo"
          />
        </div>
      </div>

      {/* Service section */}
      <div className="mt-14">
        <div className="flex flex-col items-center sm:px-24">
          <h1 className="text-3xl font-medium">{t("title2")}</h1>
          <p className="mt-12 tracking-wider text-center">
            {t("description2")}
          </p>
          {/* Cards */}
          <div className="flex flex-wrap gap-10 mt-10 mb-10">
            <WrapperCard title={t("card1Title")} url={"/blogs"} image={blog} />
            <WrapperCard title={t("card2Title")} url={"/forum"} image={forum} />
            <WrapperCard
              title={t("card3Title")}
              url={"/vaccine"}
              image={vaccine}
            />
          </div>
        </div>
      </div>

      {/* Eligible */}
      <div className="bg-box-purple rounded-xl sm:m-8 lg:mx-40 relative shadow-md">
        <div
          className="bg-red-700 h-14 ps-4 w-60 rounded-lg flex items-center absolute -top-5"
          role="alert"
        >
          <IoIosWarning size={35} color="white" />
          <p className="text-white ps-3 pe-3">{t("alert")}</p>
          <IoMdCloseCircle className="absolute -top-2 -right-2" size={16} />
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-xl sm:text-3xl font-medium mt-16 px-8">
            {t("title3")}
          </h1>
          <p className="text-sm sm:text-xl m-4">{t("description3")}</p>
          <Button className="bg-primary-purple mt-4 mb-10">
            {t("button2")}
          </Button>
        </div>
      </div>

      {/* Contact */}
      <div className="mt-14 lg:mx-40">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-medium">{t("title4")}</h1>
        </div>
        <h2 className="text-2xl font-medium mt-8">{t("description4")}</h2>

        {/* Dropdown container */}
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap items-center mt-8 gap-5 sm:gap-14">
            {/* province */}
            <Box sx={{ minWidth: 240, maxWidth: 300 }}>
              <FormControl fullWidth>
                <InputLabel id="province-select-label">
                  {t("dropdown1")}
                </InputLabel>
                <Select
                  labelId="province-select-label"
                  id="province-select"
                  value={province}
                  label={t("dropdown1")}
                  onChange={handleChange}
                >
                  {provinces.map((province) => (
                    <MenuItem key={province} value={province}>
                      {province}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {/* District */}
            <Box sx={{ minWidth: 240, maxWidth: 300 }}>
              <FormControl fullWidth>
                <InputLabel id="district-select-label">
                  {t("dropdown2")}
                </InputLabel>
                <Select
                  labelId="district-select-label"
                  id="district-select"
                  value={province}
                  label={t("dropdown2")}
                  onChange={handleChange}
                >
                  {provinces.map((province) => (
                    <MenuItem key={province} value={province}>
                      {province}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {/* Area */}
            <Box sx={{ minWidth: 240, maxWidth: 300 }}>
              <FormControl fullWidth>
                <InputLabel id="area-select-label">{t("dropdown3")}</InputLabel>
                <Select
                  labelId="area-select-label"
                  id="area-select"
                  value={province}
                  label={t("dropdown3")}
                  onChange={handleChange}
                >
                  {provinces.map((province) => (
                    <MenuItem key={province} value={province}>
                      {province}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>

        <div className="bg-box-purple c rounded-xl m-8 shadow-md mx-0">
          <div className="flex flex-wrap sm:flex-nowrap">
            <div className="sm:w-1/2 m-8">
              <h2 className="text-xl font-medium px-2">{t("midwife")}</h2>
              <div className="mx-8 mt-5 text-sm md:text-base">
                <div className="flex my-3 gap-2">
                  <p>{t("name")}</p>
                  <p>Buddhika Senanayake</p>
                </div>
                <div className="flex my-3 gap-2">
                  <p>{t("email")}</p>
                  <p>bnsbuddhika@gmail.com</p>
                </div>
                <div className="flex my-3 gap-2">
                  <p>{t("phone")}</p>
                  <p>071 327 0510</p>
                </div>
              </div>
            </div>
            <div className="sm:w-1/2 m-8">
              <h2 className="text-xl font-medium">{t("contact")}</h2>

              <Button className="bg-primary-purple sm:mx-8 mt-5">
                <HiChatBubbleLeftRight size={25} color="white" />
                <p className="text-white ps-2 pe-3">{t("message")}</p>
              </Button>
              <br />

              <Button className="bg-primary-purple sm:mx-8 mt-4">
                <LuPhoneCall size={25} color="white" />
                <p className="text-white ps-2 pe-3">{t("call")}</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
