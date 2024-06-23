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

  return (
    <div className="container my-10 font-poppins">
      {/* Hero section */}
      <div className="flex">
        <div className="w-3/5 flex flex-col">
          <h1 className="text-3xl">Welcome Buddhika</h1>
          <p className="text-xl mt-8 ms-8 tracking-wider">
            Explore our resources and connect with midwives
          </p>
          <div className="w-10/12">
            <p className="text-xl my-8 mx-14 text-center">
              "Motherhood is a journey, and every step is worth and cherishing.”
            </p>
            <p className="text-justify mx-14 tracking-wider">
              At Maathru, we are dedicated to supporting you throughout your
              journey to motherhood. Whether you're looking for expert advice,
              personalized health support, or simply want to connect with a
              community that understands, you'll find it all here. Our platform
              is designed to provide you with the tools and information you need
              to ensure a healthy and happy pregnancy.
            </p>
            <div className="flex items-center mt-12">
              <Button className="bg-primary-purple px-14 m-auto">
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div className="w-2/5 flex items-stretch">
          <img
            className="object-cover h-full"
            src={dashboardImage}
            alt="Wedding photo"
          />
        </div>
      </div>

      {/* Service section */}
      <div className="mt-14">
        <div className="flex flex-col items-center px-24">
          <h1 className="text-3xl font-medium">Our Services</h1>
          <p className="mt-12 tracking-wider text-center">
            As a guest user, Maathru offers you a range of services to support
            and guide you through your pregnancy journey.
            <br />
            From informative blog posts and vibrant community discussions to
            essential vaccine cards, we provide the resources you need for a
            healthy and informed pregnancy experience.
          </p>
          {/* Cards */}
          <div className="flex gap-10 mt-10 mb-10">
            <WrapperCard title={"Visit Blog"} url={"/blogs"} image={blog} />
            <WrapperCard
              title={"Visit Discussion Forum"}
              url={"/forum"}
              image={forum}
            />
            <WrapperCard
              title={"Get Vaccine Card"}
              url={"/vaccine"}
              image={vaccine}
            />
          </div>
        </div>
      </div>

      {/* Eligible */}
      <div className="bg-box-purple rounded-xl m-8 mx-40 relative shadow-md">
        <div
          className="bg-red-700 h-14 ps-4 w-60 rounded-lg flex items-center absolute -top-5"
          role="alert"
        >
          <IoIosWarning size={35} color="white" />
          <p className="text-white ps-3 pe-3">Status Updated</p>
          <IoMdCloseCircle className="absolute -top-2 -right-2" size={16} />
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-medium mt-16 px-8">
            You are now eligible!
          </h1>
          <p className="text-xl m-4">
            Please fill out the necessary details to complete the form.
          </p>
          <Button className="bg-primary-purple mt-4 mb-10">
            Go to the Form
          </Button>
        </div>
      </div>

      {/* Contact */}
      <div className="mt-14 mx-40">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-medium">Contact Your Midwife</h1>
        </div>
        <h2 className="text-2xl font-medium mt-8">
          Select the area to contact:
        </h2>
        {/* Dropdown container */}
        <div className="flex flex-col items-center">
          <div className="flex items-center mt-8 gap-14">
            {/* province */}
            <Box sx={{ minWidth: 240, maxWidth: 300 }}>
              <FormControl fullWidth>
                <InputLabel id="province-select-label">
                  Select the Province
                </InputLabel>
                <Select
                  labelId="province-select-label"
                  id="province-select"
                  value={province}
                  label="Select the Province"
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
                  Select the Area
                </InputLabel>
                <Select
                  labelId="district-select-label"
                  id="district-select"
                  value={province}
                  label="Select the Area"
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
                <InputLabel id="area-select-label">
                  Select the District
                </InputLabel>
                <Select
                  labelId="area-select-label"
                  id="area-select"
                  value={province}
                  label="Select the District"
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

        <div className="c rounded-xl m-8 shadow-md">
          <div className="flex">
            <div className="w-1/2 m-8">
              <h2 className="text-xl font-medium">
                Midwife details of your area:
              </h2>
              <div className="mx-8 mt-5">
                <div className="flex my-3 gap-2">
                  <p>Name :</p>
                  <p>Buddhika Senanayake</p>
                </div>
                <div className="flex my-3 gap-2">
                  <p>Email :</p>
                  <p>bnsbuddhika@gmail.com</p>
                </div>
                <div className="flex my-3 gap-2">
                  <p>Telephone Number :</p>
                  <p>071 327 0510</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 m-8">
              <h2 className="text-xl font-medium">Contact now:</h2>

              <Button className="bg-primary-purple mx-8 mt-5">
                <HiChatBubbleLeftRight size={25} color="white" />
                <p className="text-white ps-2 pe-3">Message</p>
              </Button>
              <br />

              <Button className="bg-primary-purple mx-8 mt-4">
                <LuPhoneCall size={25} color="white" />
                <p className="text-white ps-2 pe-3">Call Now</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
