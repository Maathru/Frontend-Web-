import React from "react";
import { HiChevronLeft } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LineChart } from "@mui/x-charts/LineChart";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const clinicReports = () => {
  const { t } = useTranslation("clinicReports");

  return (
    <div className="p-12 pt-8">
      <div className="">
        <div className="text-3xl text-[#5B5B5B] font-semibold mb-4">
          <HiChevronLeft className="text-5xl inline" />
          {t("title")}
        </div>

        <div className="flex justify-between ml-12">
          <h3 className="text-2xl text-[#5B5B5B] font-semibold mb-8">
            {t("subtitle1")}
          </h3>
          <Button>{t("generate1")}</Button>
        </div>

        <InputLabel
          className=""
          shrink="true"
          id="select-label"
          margin="0"
          sx={{ marginLeft: 6 }}
        >
          Province
        </InputLabel>

        <Select
          defaultValue={1}
          labelId="select-label"
          id="select"
          sx={{ marginLeft: 6 }}
        >
          <MenuItem value={1}>Western Province</MenuItem>
          <MenuItem value={2}>Eastern Province</MenuItem>
          <MenuItem value={3}>Southern Province</MenuItem>
        </Select>

        <div className="mb-12">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={500}
            height={300}
          />
        </div>
        <div className="flex justify-between ml-12">
          <h3 className="text-2xl text-[#5B5B5B] font-semibold mb-8">
            {t("subtitle1")}
          </h3>
          <Button>{t("generate1")}</Button>
        </div>

        <div className="mb-12">
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: ["group A", "group B", "group C", "D"],
              },
            ]}
            series={[{ data: [4, 3, 5, 1] }]}
            width={350}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default clinicReports;
