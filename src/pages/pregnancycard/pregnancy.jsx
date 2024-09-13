import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  conditions1,
  familyDisease,
  basicInfo,
  presentObstetricDates,
  currentPregnancyStatus,
  otherSituations,
} from "@/data/pregnancyData";
import { errorType, Toast } from "@/components/toast";
import EligibleService from "@/service/eligibleService";
import Heading from "@/components/ui/heading";
import { useTranslation } from "react-i18next";
import { Box, Tab, Tabs } from "@mui/material";
import { useTitle } from "@/hooks/useTitle";
import MainDetails from "@/components/PregnancyComponents/MainDetails";
import PostnatalCare from "@/components/PregnancyComponents/PostnatalCare";
import ClinicalConservation from "@/components/PregnancyComponents/ClinicalConservation";
import PrenatalCareRelated from "@/components/PregnancyComponents/PrenatalCareRelated";
import { a11yProps, CustomTabPanel } from "@/components/BasicTabs";

const Pregnancy1 = () => {
  useTitle("Pregnancy Card");
  const [formObject, setFormObject] = useState({});
  const [value, setValue] = useState(0);
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const editMode =
    location.pathname.split("/")[2] === "add" ||
    location.pathname.split("/")[2] === "edit";

  useEffect(() => {
    const fetchEligibleInfo = async () => {
      try {
        const response = await EligibleService.getEligibleInfo();
        const existing = EligibleService.mapDtoToFormObject(response);
        localStorage.setItem("pregnancy", JSON.stringify(existing));
      } catch (error) {
        console.log(error.message);
        Toast(error.message, errorType.ERROR);

        const data = error.response.data;
        console.log(data);
        Toast(data, errorType.ERROR);
      }
    };

    // fetchEligibleInfo();
  }, []);

  const initiateFields = () => {
    const initialData = {};

    initialData.stage = 1;

    initialData.name_woman = "";
    initialData.name_man = "";
    initialData.address = "";
    initialData.phone_woman = "";
    initialData.phone_man = "";
    initialData.dob_woman = "";
    initialData.dob_man = "";

    basicInfo.forEach((info) => {
      initialData[info.name + "_man"] = "";
      initialData[info.name + "_woman"] = "";
    });

    initialData.duration = "";

    conditions1.forEach((condition) => {
      initialData[condition.name + "_woman"] = "";
      initialData[condition.name + "_other"] = "";
    });

    familyDisease.forEach((disease) => {
      initialData[disease.name + "_woman"] = "";
      initialData[disease.name + "_other"] = "";
    });

    initialData.pregnancies_g = "";
    initialData.pregnancies_p = "";
    initialData.living_children = "";

    presentObstetricDates.forEach((input) => {
      initialData[input.name] = "";
    });

    initialData.gestational_weeks = "";
    initialData.family_methods_type = "";
    initialData.family_methods = "";

    currentPregnancyStatus.forEach((input) => {
      initialData[input.name] = "";
      initialData[input.name + "_other"] = "";
    });

    otherSituations.forEach((input) => {
      initialData[input.name] = "";
      initialData[input.name + "_other"] = "";
    });

    return initialData;
  };

  useEffect(() => {
    const getFromLocalStorage = () => {
      const jsonString = localStorage.getItem("pregnancy");
      if (jsonString) {
        return JSON.parse(jsonString);
      }
      return {};
    };

    const obj1 = initiateFields();
    const obj2 = getFromLocalStorage();
    setFormObject((prevFormObject) => ({
      ...prevFormObject,
      ...obj1,
      ...obj2,
    }));
  }, []);

  const { t } = useTranslation("pregnancy1");

  return (
    <div className="container my-10 font-poppins">
      {/* Hero section */}
      <div>
        <Heading title={t("title")} />

        <p className="text-xl font-bold mt-8">
          Mother&apos;s Name : A.P. Gamage
        </p>

        <div className="flex flex-row-reverse gap-10">
          <Button>Primigravida</Button>
          <Button className="bg-red-500">In Danger</Button>
        </div>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Pregnancy card tabs"
            >
              <Tab label="Main Details" {...a11yProps(0)} />
              <Tab label="Postnatal Care" {...a11yProps(1)} />
              <Tab
                label="Clinical Conservation & Child Birth"
                {...a11yProps(2)}
              />
              <Tab label="Prenatal care Related" {...a11yProps(3)} />
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
            <PostnatalCare
              formObject={formObject}
              setFormObject={setFormObject}
              handleChange={handleChange}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <ClinicalConservation
              formObject={formObject}
              setFormObject={setFormObject}
              handleChange={handleChange}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <PrenatalCareRelated
              formObject={formObject}
              setFormObject={setFormObject}
              handleChange={handleChange}
            />
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

export default Pregnancy1;
