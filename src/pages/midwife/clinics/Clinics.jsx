import { useState } from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import MohClinics from "./mohClinics";
import HomeVisits from "./HomeVisits";

const Clinics = () => {
  const [selectedTab, setSelectedTab] = useState("clinics");

  const handleChange = (event, newTab) => {
    if (newTab !== null) {
      setSelectedTab(newTab);
    }
  };

  return (
    <div className="content-container">
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <ToggleButtonGroup
          value={selectedTab}
          exclusive
          onChange={handleChange}
          sx={{
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <ToggleButton
            value="clinics"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              color: selectedTab === "clinics" ? "white" : "#9C33C1",
              backgroundColor:
                selectedTab === "clinics" ? "#9C33C1" : "#FEE2FE",
            }}
          >
            MOH Clinics
          </ToggleButton>
          <ToggleButton
            value="home-visits"
            sx={{
              px: 4,
              py: 1,
              fontWeight: "strong",
              color: selectedTab === "home-visits" ? "white" : "#000",
              backgroundColor:
                selectedTab === "home-visits" ? "#000" : "#FEE2FE",
              "&:hover": {
                backgroundColor:
                  selectedTab === "home-visits" ? "#000" : "#FDE1FE",
              },
            }}
          >
            Home Visits
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <div style={{ marginTop: "20px" }}>
        {selectedTab === "clinics" && <MohClinics />}
        {selectedTab === "home-visits" && <HomeVisits />}
      </div>
    </div>
  );
};

export default Clinics;
