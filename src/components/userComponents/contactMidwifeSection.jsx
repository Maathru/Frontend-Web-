import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { LuPhoneCall } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import GetRegion from "./getRegion";
import { errorType, Toast } from "../toast";
import UserService from "@/service/userService";

const formatPhoneNumber = (phone) => {
  if (!phone) return "";

  phone = phone.replace(/\D/g, "");

  if (phone.startsWith("0")) {
    phone = "+94" + phone.slice(1);
  } else if (!phone.startsWith("+94")) {
    phone = "+94" + phone;
  }

  return phone;
};

const ContactMidwifeSection = () => {
  const [midwife, setMidwife] = useState({});
  const [regions, setRegions] = useState([]);
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [region, setRegion] = useState("");
  let { t } = useTranslation(`userDashboard`);

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
      Toast(error.response.data || "Unauthorized", errorType.ERROR);
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

  return (
    <>
      {/* Contact */}
      <div className="mt-14 lg:mx-40">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-medium">{t("title4")}</h1>
        </div>
        <h2 className="text-2xl font-medium mt-8">{t("description4")}</h2>

        <div className="flex flex-col items-center gap-8">
          <GetRegion
            district={district}
            setDistrict={setDistrict}
            area={area}
            setArea={setArea}
            region={region}
            setRegion={setRegion}
            regions={regions}
            setRegions={setRegions}
            variant="outlined"
          />
          {region && (
            <Button className="px-12 mb-8" onClick={handleGetMidwife}>
              Get Midwife Data
            </Button>
          )}
        </div>

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

                <a href={`sms:${formatPhoneNumber(midwife.phone)}`}>
                  <Button className="bg-primary-purple sm:mx-8 mt-5">
                    <HiChatBubbleLeftRight size={25} color="white" />
                    <p className="text-white ps-2 pe-3">{t("message")}</p>
                  </Button>
                </a>
                <br />

                <a href={`tel:${formatPhoneNumber(midwife.phone)}`}>
                  <Button className="bg-primary-purple sm:mx-8 mt-4">
                    <LuPhoneCall size={25} color="white" />
                    <p className="text-white ps-2 pe-3">{t("call")}</p>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactMidwifeSection;
