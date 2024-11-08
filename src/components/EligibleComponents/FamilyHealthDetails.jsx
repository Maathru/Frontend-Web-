import { useState } from "react";
import DiseasesDetails from "./DiseasesDetails";
import FamilyNutrition from "./FamilyNutrition";
import { Box, Tab, Tabs } from "@mui/material";
import { a11yProps, CustomTabPanel } from "../BasicTabs";
import Habits from "./Habits";
import HomeAndWorkplace from "./HomeAndWorkplace";

const FamilyHealthDetails = ({ formObject, setFormObject, handleChange }) => {
  const [valueFamilyHealth, setValueFamilyHealth] = useState(0);

  const handleChangeFamilyHealth = (event, newValue) => {
    setValueFamilyHealth(newValue);
    const element = document.getElementById("recoveryCheckListContainer");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            variant="fullWidth"
            textColor="secondary"
            indicatorColor="secondary"
            value={valueFamilyHealth}
            onChange={handleChangeFamilyHealth}
            aria-label="Health details tabs"
          >
            <Tab label="Diseases Details" {...a11yProps(0)} />
            <Tab label="Family Nutrition" {...a11yProps(1)} />
            <Tab label="Habits" {...a11yProps(2)} />
            <Tab label="Home and workplace" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={valueFamilyHealth} index={0}>
          <DiseasesDetails
            formObject={formObject}
            setFormObject={setFormObject}
            handleChange={handleChange}
            handleChangeFamilyHealth={handleChangeFamilyHealth}
          />
        </CustomTabPanel>
        <CustomTabPanel value={valueFamilyHealth} index={1}>
          <FamilyNutrition
            formObject={formObject}
            setFormObject={setFormObject}
            handleChange={handleChange}
            handleChangeFamilyHealth={handleChangeFamilyHealth}
          />
        </CustomTabPanel>
        <CustomTabPanel value={valueFamilyHealth} index={2}>
          <Habits
            formObject={formObject}
            setFormObject={setFormObject}
            handleChange={handleChange}
            handleChangeFamilyHealth={handleChangeFamilyHealth}
          />
        </CustomTabPanel>
        <CustomTabPanel value={valueFamilyHealth} index={3}>
          <HomeAndWorkplace
            formObject={formObject}
            setFormObject={setFormObject}
            handleChange={handleChange}
          />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default FamilyHealthDetails;
