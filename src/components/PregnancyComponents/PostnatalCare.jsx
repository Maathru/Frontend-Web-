import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { a11yProps, CustomTabPanel } from "../BasicTabs";
import HealthDetails from "./HealthDetails";
import MarkAttendance from "./MarkAttendance";

const PostnatalCare = ({ formObject, setFormObject, handleChange }) => {
  const [valuePostnatalCare, setValuePostnatalCare] = useState(0);

  const handleChangePostnatalCare = (event, newValue) => {
    setValuePostnatalCare(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={valuePostnatalCare}
            onChange={handleChangePostnatalCare}
            aria-label="Postnatal care tabs"
          >
            <Tab label="Health Details" {...a11yProps(0)} />
            <Tab
              label="Mark Attendance on Antenatal sessions"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={valuePostnatalCare} index={0}>
          <HealthDetails
            formObject={formObject}
            setFormObject={setFormObject}
            handleChangePostnatalCare={handleChangePostnatalCare}
          />
        </CustomTabPanel>

        <CustomTabPanel value={valuePostnatalCare} index={1}>
          <MarkAttendance
            formObject={formObject}
            setFormObject={setFormObject}
            handleChange={handleChange}
          />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default PostnatalCare;
