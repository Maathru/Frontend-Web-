import React from "react";
import { HiChevronLeft } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
// import { Select as BaseSelect } from "@mui/base/Select";
// import { Option as BaseOption } from "@mui/base/Option";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const clinicReports = () => {
  const { t } = useTranslation("clinicReports");

  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="p-12 pt-8">
      <div className="">
        <div className="text-3xl text-[#5B5B5B] font-semibold mb-4">
          <HiChevronLeft className="text-5xl inline" />
          {t("title")}
        </div>

        <div className="flex justify-between ml-12">
          <h3 className="text-2xl text-[#5B5B5B] font-semibold mb-8">{t("subtitle1")}</h3>
          <Button>{t("generate1")}</Button>
        </div>

        <InputLabel className="" shrink="true" id="select-label" margin="0" >
          Province
        </InputLabel>

        <Select defaultValue={1} labelId="select-label" id="select">
          <MenuItem value={1}>Western Province</MenuItem>
          <MenuItem value={2}>Eastern Province</MenuItem>
          <MenuItem value={3}>Southern Province</MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default clinicReports;
