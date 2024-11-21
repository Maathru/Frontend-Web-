import { Box, Tab, Tabs } from "@mui/material";
import { a11yProps, CustomTabPanel } from "../BasicTabs";
import { useState } from "react";
import ParentsDetails from "./ParentsDetails";
import FamilyHistoryDetails from "./FamilyHistoryDetails";
import PregnancyHistory from "./PregnancyHistory";
import CurrentPregnancyStatus from "./CurrentPregnancyStatus";

const MainDetails = ({ formObject, setFormObject, handleChange }) => {
  const [valueMainDetails, setValueMainDetails] = useState(0);

  const handleChangeMainDetails = (event, newValue) => {
    setValueMainDetails(newValue);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    document.getElementById("pregnancyCardContainer")?.scrollIntoView({
      behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
    });
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={valueMainDetails}
            onChange={handleChangeMainDetails}
            aria-label="Main details tabs"
          >
            <Tab label="Parent's Details" {...a11yProps(0)} />
            <Tab label="Family History Details" {...a11yProps(1)} />
            <Tab label="Pregnancy History" {...a11yProps(2)} />
            <Tab label="Current pregnancy status" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={valueMainDetails} index={0}>
          <ParentsDetails
            formObject={formObject}
            setFormObject={setFormObject}
            handleChangeMainDetails={handleChangeMainDetails}
          />
        </CustomTabPanel>
        <CustomTabPanel value={valueMainDetails} index={1}>
          <FamilyHistoryDetails
            formObject={formObject}
            setFormObject={setFormObject}
            handleChangeMainDetails={handleChangeMainDetails}
          />
        </CustomTabPanel>
        <CustomTabPanel value={valueMainDetails} index={2}>
          <PregnancyHistory
            formObject={formObject}
            setFormObject={setFormObject}
            handleChangeMainDetails={handleChangeMainDetails}
          />
        </CustomTabPanel>
        <CustomTabPanel value={valueMainDetails} index={3}>
          <CurrentPregnancyStatus
            formObject={formObject}
            setFormObject={setFormObject}
            handleChange={handleChange}
          />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default MainDetails;
