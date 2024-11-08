import { Box, Tab, Tabs } from "@mui/material";
import ForBoth from "./ForBoth";
import SpeciallyForWoman from "./SpeciallyForWoman";
import { a11yProps, CustomTabPanel } from "../BasicTabs";
import { useState } from "react";

const HealthDetails = ({ formObject, setFormObject, handleChange }) => {
  const [valueHealth, setValueHealth] = useState(0);

  const handleChangeHealth = (event, newValue) => {
    setValueHealth(newValue);
    document.getElementById("recoveryCheckListContainer").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            variant="fullWidth"
            textColor="secondary"
            indicatorColor="secondary"
            value={valueHealth}
            onChange={handleChangeHealth}
            aria-label="Health details tabs"
          >
            <Tab label="For Both Details" {...a11yProps(0)} />
            <Tab label="Specialty For Woman  Details" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={valueHealth} index={0}>
          <ForBoth
            formObject={formObject}
            setFormObject={setFormObject}
            handleChangeHealth={handleChangeHealth}
            handleChange={handleChange}
          />
        </CustomTabPanel>
        <CustomTabPanel value={valueHealth} index={1}>
          <SpeciallyForWoman
            formObject={formObject}
            setFormObject={setFormObject}
            handleChange={handleChange}
          />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default HealthDetails;
