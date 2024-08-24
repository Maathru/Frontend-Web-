import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";
import { mohData } from "@/data/mohData";
import UserService from "@/service/userService";
import { errorType, Toast } from "@/components/toast";
import { Button } from "../ui/button";

const formatDisplayName = (value) => {
  return value
    .split("_")
    .map((word) => word.toLowerCase())
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const GetRegion = ({
  district,
  setDistrict,
  area,
  setArea,
  region,
  setRegion,
  regions,
  setRegions,
  size,
  variant,
}) => {
  const [province, setProvince] = useState("");

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
    setDistrict("");
    setArea("");
    setRegion("");
    setRegions([]);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
    setArea("");
    setRegion("");
    setRegions([]);
  };

  const handleAreaChange = (event) => {
    setArea(event.target.value);
    setRegion("");
    setRegions([]);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await UserService.getRegions(province, district, area);
        setRegions(response);
      } catch (error) {
        setRegions([]);
        Toast(error.response.data || "Unauthorized", errorType.ERROR);
        console.log(error.response.data);
      }
    };
    return () => {
      if (province && district && area) {
        fetchRegions();
      }
    };
  }, [province, district, area]);

  const availableDistricts = province ? mohData.districts[province] || [] : [];
  const availableAreas = district ? mohData.areas[district] || [] : [];

  return (
    <>
      {/* Dropdown container */}
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap items-center mt-8 gap-5 sm:gap-14">
          {/* Provinces */}
          <Box sx={{ minWidth: 240, maxWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="province-select-label">
                Select province
              </InputLabel>
              <Select
                size={size}
                variant={variant}
                labelId="province-select-label"
                id="province-select"
                value={province}
                label="Select province"
                onChange={handleProvinceChange}
              >
                {mohData.provinces.map((prov) => (
                  <MenuItem key={prov} value={prov}>
                    {formatDisplayName(prov)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Districts */}
          <Box sx={{ minWidth: 240, maxWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="district-select-label">
                Select district
              </InputLabel>
              <Select
                size={size}
                variant={variant}
                labelId="district-select-label"
                id="district-select"
                value={district}
                label="Select district"
                onChange={handleDistrictChange}
                disabled={!province}
              >
                {availableDistricts.length > 0 ? (
                  availableDistricts.map((dist) => (
                    <MenuItem key={dist} value={dist}>
                      {formatDisplayName(dist)}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No districts available</MenuItem>
                )}
              </Select>
              {!province && (
                <FormHelperText>Select a province first</FormHelperText>
              )}
            </FormControl>
          </Box>
        </div>
        <div className="flex flex-wrap items-center mt-16 gap-5 sm:gap-14">
          {/* Areas */}
          <Box sx={{ minWidth: 240, maxWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="area-select-label">Select area</InputLabel>
              <Select
                size={size}
                variant={variant}
                labelId="area-select-label"
                id="area-select"
                value={area}
                label="Select area"
                onChange={handleAreaChange}
                disabled={!district}
              >
                {availableAreas.length > 0 ? (
                  availableAreas.map((a) => (
                    <MenuItem key={a} value={a}>
                      {formatDisplayName(a)}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No areas available</MenuItem>
                )}
              </Select>
              {!district && (
                <FormHelperText>Select a district first</FormHelperText>
              )}
            </FormControl>
          </Box>

          {/* Regions */}
          <Box sx={{ minWidth: 240, maxWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="region-select-label">Select region</InputLabel>
              <Select
                size={size}
                variant={variant}
                labelId="region-select-label"
                id="region-select"
                value={region}
                label="Select region"
                onChange={handleRegionChange}
                disabled={!district}
              >
                {regions.length > 0 ? (
                  regions.map((r) => (
                    <MenuItem key={r.regionId} value={r.regionId}>
                      {formatDisplayName(r.regionName)}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No regions available</MenuItem>
                )}
              </Select>
              {!district && <FormHelperText>Select area first</FormHelperText>}
            </FormControl>
          </Box>
        </div>
      </div>
    </>
  );
};

export default GetRegion;
