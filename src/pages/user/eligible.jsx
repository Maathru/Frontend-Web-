import { useEffect, useState } from "react";
import {
  basicInfo,
  conditions1,
  conditions2,
  facilities1,
  facilities2,
  habits1,
  habits2,
  meals,
  nutrition,
  specials1,
  specials2,
  specials4,
} from "@/data/eligibleData";
import { errorType, Toast } from "@/components/toast";
import EligibleService from "@/service/eligibleService";
import Heading from "@/components/ui/heading";
import { useTranslation } from "react-i18next";
import { useTitle } from "@/hooks/useTitle";
import { Box, Tab, Tabs } from "@mui/material";
import { a11yProps, CustomTabPanel } from "@/components/BasicTabs";
import MainDetails from "@/components/EligibleComponents/MainDetails";
import HealthDetails from "@/components/EligibleComponents/HealthDetails";
import FamilyHealthDetails from "@/components/EligibleComponents/FamilyHealthDetails";
import OtherDetails from "@/components/EligibleComponents/OtherDetails";
import { useLocation } from "react-router-dom";
import { getQueryParam } from "@/utils/getQueryParam";

const Eligible = () => {
  useTitle("Recovery Checklist - Page 1");
  const [formObject, setFormObject] = useState({});
  const [value, setValue] = useState(0);
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const element = document.getElementById("recoveryCheckListContainer");
    if (element) {
      try {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        element.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      } catch (e) {
        // Fallback for browsers that don't support smooth scroll
        element.scrollIntoView();
      }
    }
  };

  const initiateFields = () => {
    const initialData = {};

    initialData.stage = 1;

    basicInfo.forEach((info) => {
      initialData[info.name + "_man"] = "";
      initialData[info.name + "_woman"] = "";
    });
    conditions1.forEach((condition) => {
      initialData[condition.name + "_man"] = "";
      initialData[condition.name + "_woman"] = "";
      initialData[condition.name + "_other"] = "";
    });
    initialData.marriage = null;
    initialData.area = "";
    initialData.district = "";
    initialData.region = "";

    initialData["breast_woman"] = false;
    initialData["breast_other"] = "";

    specials1.forEach((special) => {
      initialData[special.name + "_woman"] = false;
      initialData[special.name + "_other"] = "";
    });

    initialData["periods_woman"] = false;
    initialData["periods_other"] = "";
    initialData["periods_pattern"] = "Orderly";

    specials2.forEach((special) => {
      initialData[special.name + "_woman"] = false;
      initialData[special.name + "_other"] = "";
    });

    specials4.forEach((special) => {
      initialData[special.name + "_woman"] = false;
      initialData[special.name + "_other"] = "";
    });

    conditions2.forEach((condition) => {
      initialData[condition.name + "_woman"] = false;
      initialData[condition.name + "_man"] = false;
      initialData[condition.name + "_other"] = "";
    });

    initialData["meal_woman"] = false;
    initialData["meal_man"] = false;
    initialData["meal_other"] = "";

    meals.forEach((meal) => {
      initialData[meal.name + "_woman"] = false;
      initialData[meal.name + "_man"] = false;
      initialData[meal.name + "_other"] = "";
    });

    nutrition.forEach((n) => {
      initialData[n.name + "_man"] = false;
      initialData[n.name + "_woman"] = false;
      initialData[n.name + "_other"] = "";
    });

    habits1.forEach((habit) => {
      initialData[habit.name + "_woman"] = false;
      initialData[habit.name + "_man"] = false;
      initialData[habit.name + "_other"] = "";
    });

    habits2.forEach((habit) => {
      initialData[habit.name + "_woman"] = false;
      initialData[habit.name + "_man"] = false;
      initialData[habit.name + "_other"] = "";
    });

    facilities1.forEach((facility) => {
      initialData[facility.name + "_woman"] = false;
      initialData[facility.name + "_man"] = false;
      initialData[facility.name + "_other"] = "";
    });

    initialData["hazardous_woman"] = false;
    initialData["hazardous_man"] = false;
    initialData["hazardous_other"] = "";

    facilities2.forEach((facility) => {
      initialData[facility.name + "_woman"] = false;
      initialData[facility.name + "_man"] = false;
      initialData[facility.name + "_other"] = "";
    });

    initialData["noisy_woman"] = false;
    initialData["noisy_man"] = false;
    initialData["noisy_other"] = "";

    initialData["saving_woman"] = false;
    initialData["saving_man"] = false;
    initialData["saving_other"] = "";

    return initialData;
  };

  useEffect(() => {
    const getFromLocalStorage = () => {
      const jsonString = localStorage.getItem("formObject");
      if (jsonString) {
        return JSON.parse(jsonString);
      }
      return {};
    };

    const fetchEligibleInfo = async () => {
      try {
        const response = await EligibleService.getEligibleInfo(
          getQueryParam("user", location)
        );
        const existing = EligibleService.mapDtoToFormObject(response);
        setFormObject({ ...formObject, ...existing });
      } catch (error) {
        console.log(error.message);

        console.log(error);
        const data = error.response.data;
        console.log(data);
        Toast(data, errorType.ERROR);
      }
    };

    const obj1 = initiateFields();
    const obj2 = getFromLocalStorage();
    fetchEligibleInfo();
    setFormObject({ ...formObject, ...obj1, ...obj2 });
  }, []);

  const { t } = useTranslation("eligible1");

  return (
    <div
      className="container my-10 font-poppins"
      id="recoveryCheckListContainer"
    >
      {/* Hero section */}
      <>
        <Heading title={t("title")} />

        <p className="text-xl mt-8 mb-4">
          With the arrival of a new baby, you are stepping into a beautiful and
          joyous journey. Every mother wants to bring her baby into this world
          healthily and happily. We are here to support you in this precious
          journey.
        </p>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mt: "40px" }}>
            <Tabs
              variant="fullWidth"
              textColor="secondary"
              indicatorColor="secondary"
              value={value}
              onChange={handleChange}
              aria-label="Recovery checklist tabs"
            >
              <Tab label="Main Details" {...a11yProps(0)} />
              <Tab label="Health Details" {...a11yProps(1)} />
              <Tab label="Family Health Details" {...a11yProps(2)} />
              <Tab label="Other Details" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <MainDetails
              formObject={formObject}
              setFormObject={setFormObject}
              handleChange={handleChange}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <HealthDetails
              formObject={formObject}
              setFormObject={setFormObject}
              handleChange={handleChange}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <FamilyHealthDetails
              formObject={formObject}
              setFormObject={setFormObject}
              handleChange={handleChange}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <OtherDetails formObject={formObject} />
          </CustomTabPanel>
        </Box>
      </>
    </div>
  );
};

export default Eligible;
