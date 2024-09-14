import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { a11yProps, CustomTabPanel } from "../BasicTabs";
import FilledByMidwife from "./FilledByMidwife";
import FilledByMOHDoctor from "./FilledByMOHDoctor";

const OtherDetails = ({ formObject }) => {
  const [valueOtherDetails, setValueOtherDetails] = useState(0);

  const handleChangeOtherDetails = (event, newValue) => {
    setValueOtherDetails(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={valueOtherDetails}
            onChange={handleChangeOtherDetails}
            aria-label="Other details tabs"
          >
            <Tab label="Filled By Midwife" {...a11yProps(0)} />
            <Tab label="Filled By MOH Doctor" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={valueOtherDetails} index={0}>
          <FilledByMidwife formObject={formObject} />
        </CustomTabPanel>
        <CustomTabPanel value={valueOtherDetails} index={1}>
          <FilledByMOHDoctor formObject={formObject} />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default OtherDetails;
