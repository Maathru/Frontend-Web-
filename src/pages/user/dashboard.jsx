import { Button } from "@/components/ui/button";
import dashboardImageEligible from "../../assets/user/dashboardImage-eligible.png";
import dashboardImageUser from "../../assets/user/dashboardImage-user.png";
import blog from "../../assets/user/blog.png";
import forum from "../../assets/user/forum.png";
import vaccine from "../../assets/user/vaccine.png";
import clinic from "../../assets/user/clinic.png";
import midwife from "../../assets/user/midwife.png";
import memory from "../../assets/user/memory.png";
import WrapperCard from "@/components/userComponents/wrapperCard";
import { IoIosWarning } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContext, useEffect, useState } from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { LuPhoneCall } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import DateCalendarServerRequest from "@/components/DateCalendarServerRequest";
import { userData } from "@/context/userAuth";
import { mohData } from "@/data/mohData";
import { FormHelperText } from "@mui/material";
import UserService from "@/service/userService";
import { errorType, Toast } from "@/components/toast";
import { useTitle } from "@/hooks/useTitle";

const formatDisplayName = (value) => {
  return value
    .split("_") // Split by underscore
    .map((word) => word.toLowerCase()) // Convert each word to lowercase
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
    .join(" "); // Join words with space
};

const userCards = [
  { title: "Visit Blog", image: blog, url: "/blogs" },
  { title: "Visit Discussion Forum", image: forum, url: "/forum" },
  { title: "Get Vaccine Card", image: vaccine, url: "/vaccine" },
];

const parentCards = [
  {
    title: "Clinic Visits",
    description:
      "Keep track of clinical visit schedules and receive timely reminders to ensure you",
    image: clinic,
    url: "/clinics",
  },
  {
    title: "Contact Midwife",
    description: "Easily connect with your midwife",
    image: midwife,
    url: "/midwife",
  },
  {
    title: "Child Growth",
    description: "Relive precious moments with access to  stored data",
    image: memory,
    url: "/growth",
  },
];

const Dashboard = () => {
  useTitle("Dashboard");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [region, setRegion] = useState("");
  const [regions, setRegions] = useState([]);
  const [midwife, setMidwife] = useState({});
  const [showBanner, setShowBanner] = useState(true);
  const { userDetails } = useContext(userData);
  let { t } = useTranslation(`userDashboard`);

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
    setDistrict(""); // Reset district when province changes
    setArea(""); // Reset area when province changes
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
    setArea(""); // Reset area when district changes
  };

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleGetRegions = async (e) => {
    e.preventDefault();

    if (!province) {
      Toast("Please select a province", errorType.ERROR);
      return;
    }
    if (!district) {
      Toast("Please select a district", errorType.ERROR);
      return;
    }
    if (!area) {
      Toast("Please select a area", errorType.ERROR);
      return;
    }

    try {
      const response = await UserService.getRegions(province, district, area);
      setRegions(response);
    } catch (error) {
      Toast(error.response.data, errorType.ERROR);
      console.log(error.response.data);
    }
  };

  const handleGetMidwife = async (e) => {
    e.preventDefault();

    if (!region) {
      Toast("Please select a region", errorType.ERROR);
      return;
    }

    try {
      const response = await UserService.getMidwife(region);
      setMidwife(response);
      localStorage.setItem("midwife", JSON.stringify(response));
    } catch (error) {
      Toast(error.response.data, errorType.ERROR);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const getFromLocalStorage = () => {
      const jsonString = localStorage.getItem("midwife");
      if (jsonString) {
        return JSON.parse(jsonString);
      }
      return {};
    };

    const obj1 = getFromLocalStorage();
    setMidwife({ ...midwife, ...obj1 });
  }, []);

  const availableDistricts = province ? mohData.districts[province] || [] : [];
  const availableAreas = district ? mohData.areas[district] || [] : [];

  return (
    <div className="container my-10 font-poppins">
      {/* Hero section */}
      <div className="flex lg:justify-center">
        <div className="lg:w-3/5 flex flex-col items-center lg:items-start">
          <h1 className="text-3xl">
            {t("greeting")} {userDetails.name}
          </h1>
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
            src={
              userDetails.role === "ELIGIBLE"
                ? dashboardImageEligible
                : dashboardImageUser
            }
            alt="Dashboard Image"
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
            {userDetails.role === "PARENT"
              ? parentCards.map((card, index) => (
                  <WrapperCard
                    key={index}
                    title={card.title}
                    url={card.url}
                    image={card.image}
                    description={card.description}
                  />
                ))
              : userCards.map((card, index) => (
                  <WrapperCard
                    key={index}
                    title={card.title}
                    url={card.url}
                    image={card.image}
                  />
                ))}
          </div>
        </div>
      </div>

      {userDetails.role === "ELIGIBLE" && (
        <>
          {/* Eligible */}
          <div className="bg-box-purple rounded-xl sm:m-8 lg:mx-40 relative shadow-md">
            {/* Banner */}
            {showBanner && (
              <div
                className="bg-red-700 h-14 ps-4 w-60 rounded-lg flex items-center absolute -top-5"
                role="alert"
              >
                <IoIosWarning size={35} color="white" />
                <p className="text-white ps-3 pe-3">{t("alert")}</p>
                <IoMdCloseCircle
                  className="absolute -top-2 -right-2 cursor-pointer"
                  size={16}
                  onClick={() => setShowBanner(false)}
                />
              </div>
            )}

            <div className="flex flex-col items-center">
              <h1 className="text-xl sm:text-3xl font-medium mt-16 px-8">
                {t("title3")}
              </h1>
              <p className="text-sm sm:text-xl m-4">{t("description3")}</p>
              <Link to="/eligible/1">
                <Button className="bg-primary-purple mt-4 mb-10">
                  {t("button2")}
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Contact */}
      <div className="mt-14 lg:mx-40">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-medium">{t("title4")}</h1>
        </div>
        <h2 className="text-2xl font-medium mt-8">{t("description4")}</h2>

        {/* Dropdown container */}
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap items-center mt-8 gap-5 sm:gap-14">
            {/* Provinces */}
            <Box sx={{ minWidth: 240, maxWidth: 300 }}>
              <FormControl fullWidth>
                <InputLabel id="province-select-label">
                  Select province
                </InputLabel>
                <Select
                  labelId="province-select-label"
                  id="province-select"
                  value={province}
                  label="Select province"
                  onChange={handleProvinceChange}
                >
                  {mohData.provinces.map((prov) => (
                    <MenuItem key={prov} value={prov}>
                      {formatDisplayName(prov)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Districts */}
            <Box sx={{ minWidth: 240, maxWidth: 300 }}>
              <FormControl fullWidth>
                <InputLabel id="district-select-label">
                  Select district
                </InputLabel>
                <Select
                  labelId="district-select-label"
                  id="district-select"
                  value={district}
                  label="Select district"
                  onChange={handleDistrictChange}
                  disabled={!province}
                >
                  {availableDistricts.length > 0 ? (
                    availableDistricts.map((dist) => (
                      <MenuItem key={dist} value={dist}>
                        {formatDisplayName(dist)}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No districts available</MenuItem>
                  )}
                </Select>
                {!province && (
                  <FormHelperText>Select a province first</FormHelperText>
                )}
              </FormControl>
            </Box>

            {/* Areas */}
            <Box sx={{ minWidth: 240, maxWidth: 300 }}>
              <FormControl fullWidth>
                <InputLabel id="area-select-label">Select area</InputLabel>
                <Select
                  labelId="area-select-label"
                  id="area-select"
                  value={area}
                  label="Select area"
                  onChange={handleAreaChange}
                  disabled={!district}
                >
                  {availableAreas.length > 0 ? (
                    availableAreas.map((a) => (
                      <MenuItem key={a} value={a}>
                        {formatDisplayName(a)}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No areas available</MenuItem>
                  )}
                </Select>
                {!district && (
                  <FormHelperText>Select a district first</FormHelperText>
                )}
              </FormControl>
            </Box>
          </div>
        </div>

        <Button onClick={handleGetRegions}>Get Midwife Regions</Button>

        {regions.length != 0 && (
          <>
            {/* Regions */}
            <Box sx={{ minWidth: 240, maxWidth: 300 }}>
              <FormControl fullWidth>
                <InputLabel id="region-select-label">Select region</InputLabel>
                <Select
                  labelId="region-select-label"
                  id="region-select"
                  value={region}
                  label="Select region"
                  onChange={handleRegionChange}
                  disabled={!regions.length > 0}
                >
                  {regions.length > 0 ? (
                    regions.map((r) => (
                      <MenuItem key={r.regionId} value={r.regionId}>
                        {formatDisplayName(r.regionName)}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No regions available</MenuItem>
                  )}
                </Select>
                {!regions.length > 0 && (
                  <FormHelperText>Select other details first</FormHelperText>
                )}
              </FormControl>
            </Box>
            <Button onClick={handleGetMidwife}>Get Midwife Data</Button>
          </>
        )}

        {midwife.name && (
          // Midwife Section
          <div className="bg-box-purple c rounded-xl m-8 shadow-md mx-0">
            <div className="flex flex-wrap sm:flex-nowrap">
              <div className="sm:w-1/2 m-8">
                <h2 className="text-xl font-medium px-2">{t("midwife")}</h2>
                <div className="mx-8 mt-5 text-sm md:text-base">
                  <div className="flex my-3 gap-2">
                    <p>{t("name")}</p>
                    <p>{midwife.name || ""}</p>
                  </div>
                  <div className="flex my-3 gap-2">
                    <p>{t("email")}</p>
                    <p>{midwife.email || ""}</p>
                  </div>
                  <div className="flex my-3 gap-2">
                    <p>{t("phone")}</p>
                    <p>{midwife.phone || ""}</p>
                  </div>
                  <div className="flex my-3 gap-2">
                    <p>Address:</p>
                    <p>{midwife.address || ""}</p>
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
        )}
      </div>

      {userDetails.role === "PARENT" && (
        <>
          <div className="mx-40 mt-24">
            <div className="flex w-full justify-between">
              <h2 className="text-2xl font-semibold">
                Clinics(MOH & Home Visits)
              </h2>
              <Link to="/clinic">
                <Button>Visits Clinic Details</Button>
              </Link>
            </div>

            <div className="mx-auto flex justify-around">
              <div className="mt-4">
                <h1 className="font-xl">MOH Clinic Days</h1>
                <DateCalendarServerRequest />
              </div>
              <div className="mt-4">
                <h1 className="font-xl">Home Visit Days</h1>
                <DateCalendarServerRequest />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
