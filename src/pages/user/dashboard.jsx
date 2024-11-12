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
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Calendar from "@/components/Calendar";
import { userData } from "@/context/userAuth";
import { useTitle } from "@/hooks/useTitle";
import ContactMidwifeSection from "@/components/userComponents/contactMidwifeSection";
import ParentClinicsSection from "@/components/userComponents/ParentClincsSection";

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
    url: "#contactMidwife",
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
  const [showBanner, setShowBanner] = useState(true);
  const { userDetails } = useContext(userData);
  let { t } = useTranslation(`userDashboard`);

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

      <ContactMidwifeSection id="contactMidwife" />

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
              <ParentClinicsSection />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
