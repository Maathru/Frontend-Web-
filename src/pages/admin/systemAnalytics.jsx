import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { userData } from "@/context/userAuth";
import { useTranslation } from "react-i18next";

const Widget = ({ icon: Icon, count, label1, label2, link }) => (
  <div className="card w-full md:w-6/12 lg:w-3/12 shadow-md rounded-lg">
    <div className="flex gap-5 items-center px-6 py-4">
      <div className="bg-primary-purple w-10 h-10 rounded-lg flex justify-center items-center">
        <Icon className="text-dark-text text-2xl" />
      </div>
      <div>
        <p className="text-4xl font-bold inline">{count}</p>
        <p className="inline text-lg"> {label1}</p>
      </div>
    </div>
    <hr className="w-full border-muted" />
    <Link to={link}>
      <div className="px-6 py-2 hover:bg-light-blogcard">
        <p className="text-primary-purple text-sm font-semibold text-center">
          {label2}
        </p>
      </div>
    </Link>
  </div>
);

const SystemAnalytics = () => {
  const { userDetails } = useContext(userData);
  const { t } = useTranslation("SystemAnalytics");

  const [optionsPie, setOptionsPie] = useState({
    chart: {
      type: "pie",
    },
    title: {
      text: "Error Type Distribution",
      style: {
        fontSize: "18px",
        fontWeight: "semiBold",
        color: "#263238",
        padding: "20px",
      },
    },
    labels: ["500 Errors", "400 Errors", "404 Errors", "401 Errors"],
    colors: ["#E0B0FF", "#DA70D6", "#DF73FF", "#7851A9"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  const [seriesPie, setSeriesPie] = useState([50, 12, 32, 45]);

  const [options, setOptions] = useState({
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 4,
        color: "#000",
        opacity: 0.2,
      },
    },
    title: {
      text: "Server Uptime Over the Past Month",
      style: {
        fontSize: "18px",
        fontWeight: "semiBold",
        color: "#263238",
        padding: "20px",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["#7851A9"],
      width: 4,
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ["last month", "this month"],
    },
    yaxis: {
      title: {
        text: "Uptime (%)",
      },
      min: 99,
      max: 100,
      tickAmount: 5,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}%`,
      },
    },
  });

  const [series3, setSeries3] = useState([
    {
      name: "Uptime",
      data: [99.5, 99.8],
    },
  ]);

  return (
    <div className="container mx-auto px-8 mb-10"> {/* Added margin-bottom */}
      <div className="mb-10">
        <div className="flex justify-between">
          <Typography variant="h4" className="text-dark-title">System Analytics</Typography>
        </div>
        <Typography className="mr-4 mb-10 text-light-subtitle" variant="h6">
          Key Metrics and KPI
        </Typography>
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
          <Card className="bg-light-blogcard">
            <CardContent>
              <Typography className="text-light-title">
                Uptime:{" "}
                <span className="text-light-clinics inline font-large">99.9%</span>
              </Typography>
              <Typography className="text-light-title">
                Downtime events:{" "}
                <span className="text-light-clinics inline font-large">99.9%</span>
              </Typography>
            </CardContent>
          </Card>
          <Card className="bg-light-blogcard">
            <CardContent>
              <Typography className="text-light-title">
                Current Error Rate:{" "}
                <span className="text-light-clinics inline font-large">0.5%</span>
              </Typography>
              <Typography className="text-light-title">
                Current Active Users:{" "}
                <span className="text-light-clinics inline font-large">250</span>
              </Typography>
            </CardContent>
          </Card>
          <Card className="bg-light-blogcard">
            <CardContent>
              <Typography className="text-light-title">
                Avg. Response Time:{" "}
                <span className="text-light-clinics inline font-large">200ms</span>
              </Typography>
              <Typography className="text-light-title">
                Peak Response Time:{" "}
                <span className="text-light-clinics inline font-large">1.5 sec</span>
              </Typography>
            </CardContent>
          </Card>
          <Card className="bg-light-blogcard">
            <CardContent>
              <Typography className="text-light-title">
                Most Recent Errors:{" "}
                <span className="text-light-clinics inline font-large">
                  20/06/2024, 10:15 AM
                </span>
              </Typography>
              <Typography className="text-light-title">
                <span className="text-light-clinics inline font-large">
                  18/06/2024, 06:15 AM
                </span>
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="shadow-md rounded-sm p-5 bg-light-blogcard">
          <ReactApexChart
            options={options}
            series={series3}
            type="line"
            height={350}
            width={"100%"}
          />
        </div>
        <div className="shadow-md rounded-sm p-5 bg-light-blogcard">
          <ReactApexChart
            options={optionsPie}
            series={seriesPie}
            type="donut"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;