import React, { useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LineChart } from "@mui/x-charts/LineChart";
import { InputLabel, MenuItem, Select, colors } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import ReactApexChart from "react-apexcharts";

const clinicReports = () => {
  const { t } = useTranslation("clinicReports");

  // patient visit line chat chart data starts
  const [options1, setObject1] = useState({
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      colors: "#721D90",
      width: 4,
    },
    
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], 
        opacity: 0.5,
      },
    },
    markers: {
      size: 5,
      colors: "#ffffff",
      strokeColors: "#721D90",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });

  const [series1, setSeries1] = useState([
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 115, 98, 100, 110],
    },
  ]);


  // Patient Visits For each clinic chart data starts
  const [options2, setObject2] = useState({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Clinic1",
        "Clinic2",
        "Clinic3",
        "Clinic4",
        "Clinic5",
        "Clinic6",
        "Clinic7",
        "Clinic8",
        "Clinic9",
      ],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
      colors: "#721D90",
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  });

  const [series2, setSeries2] = useState([
    {
      name: "Net Profit",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
  ]);

  return (
    <div className="p-12 pt-8">
      <div className="pl-10">
        <div className="text-3xl text-[#5B5B5B] font-semibold mb-4">
          <HiChevronLeft className="text-5xl inline" />
          {t("title")}
        </div>

        <div className="flex justify-between">
          <h3 className="text-2xl text-[#5B5B5B] font-semibold mb-8">
            {t("subtitle1")}
          </h3>
          <Button>{t("generate1")}</Button>
        </div>

        <InputLabel className="" shrink="true" id="select-label" margin="0">
          Province
        </InputLabel>

        <Select defaultValue={1} labelId="select-label" id="select">
          <MenuItem value={1}>Western Province</MenuItem>
          <MenuItem value={2}>Eastern Province</MenuItem>
          <MenuItem value={3}>Southern Province</MenuItem>
        </Select>

        <div className="mb-12 mt-8">
        {/* patient visit line chat chart data */}
          <div id="chart" className="shadow-md  rounded-sm">
            <ReactApexChart
              options={options1}
              series={series1}
              type="line"
              height={350}
              width={"100%"}
            />
          </div>
        </div>

        <div className="flex justify-between ml-12 mt-20">
          <h3 className="text-2xl text-[#5B5B5B] font-semibold mb-8">
            {t("subtitle2")}
          </h3>
          <Button>{t("generate2")}</Button>
        </div>

        <div className="mb-12">
        {/* Patient Visits For each clinic chart */}
          <div id="chart" className="shadow-md  rounded-sm">
            <ReactApexChart
              options={options2}
              series={series2}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default clinicReports;
