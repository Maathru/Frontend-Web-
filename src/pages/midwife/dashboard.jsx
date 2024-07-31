import { IoPeopleCircle } from "react-icons/io5";
import React, { useContext, useState } from "react";
import { MdOutlinePregnantWoman } from "react-icons/md";
import { Link } from "react-router-dom";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { FaCircle } from "react-icons/fa";
import { Button } from "flowbite-react";
import ReactApexChart from "react-apexcharts";
import { userData } from "@/context/userAuth";
import { Calendar } from "@/components/ui/calendar";
import { HiCalendar } from "react-icons/hi";
import { useDarkMode } from "@/context/darkModeContext";
// import { title } from "process";

const Widget = ({ icon: Icon, count, label1, label2 }) => (
  <div className="card w-3/12 shadow-md rounded-lg dark:bg-dark-background">
    <div className="flex gap-5 items-center px-8 py-5">
      <div className="bg-primary-purple w-10 h-10 rounded-lg flex justify-center items-center">
        <Icon className="text-white text-2xl" />
      </div>
      <div>
        <p className="text-4xl font-bold inline">{count}</p>
        <p className="inline text-lg"> {label1}</p>
      </div>
    </div>
    <hr className="w-full" />
    <Link>
      <div className="px-8 py-2 hover:bg-purple-50">
        <p className="text-primary-purple text-sm font-semibold text-center">
          {label2}
        </p>
      </div>
    </Link>
  </div>
);

const dashboard = () => {
  const { isDarkMode } = useDarkMode();
  const { userDetails } = useContext(userData);
  // pregnancy visits line chart data starts
  const pregnancyVisitsOptions = {
    // options: {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 4,
        color: "#000",
        opacity: 0.2,
      },
    },
    title: {
      text: "Pregnancy Visits and Follow-ups over the month",
      // align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "semiBold",
        color: isDarkMode ? "#ffffff" : "#263238",
        padding: "20px",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: "#721D90",
      width: 4,
    },

    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
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
  };
  const pregnancyVisitsSeries = [
    {
      data: [10, 41, 35, 51, 30, 62, 40, 80, 70, 98, 80, 110],
    },
  ];

  // Average Child Growth Rate line chart data starts
  const AverageChildGrowthOptions = {
    chart: {
      type: "line",

      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 4,
        color: "#000",
        opacity: 0.2,
      },
    },
    title: {
      text: "Average Child Growth Rate with the months",
      style: {
        fontSize: "18px",
        fontWeight: "semiBold",
        color: isDarkMode ? "#ffffff" : "#263238",
        padding: "20px",
      },
    },

    stroke: {
      curve: "smooth",
      colors: isDarkMode ? "#ffffff" : "#721D90",
      width: 4,
    },

    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
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
  };

  const AverageChildGrowthSeries = [
    {
      name: "Desktops",
      data: [10, 30, 20, 51, 49, 96, 60, 75, 64, 70, 40, 50],
    },
  ];

  const PregnantStatOptions = {
    chart: {
      type: "donut",
    },
    title: {
      text: "Health statistics on pregnant women",
      style: {
        fontSize: "18px",
        fontWeight: "semiBold",
        color: isDarkMode ? "#ffffff" : "#263238",
        padding: "20px",
      },
    },
    labels: [
      "Condition 1",
      "Condition 2",
      "Condition 3",
      "Condition 4",
      "Condition 5",
    ],
    colors: ["#620084", "#8a3dff", "#9C33C1", "#6a1bff", "#A8B8D8"],
  };

  const PregnantStatSeries = [25, 13, 12, 37, 13];

  const ChildBirthRateOptions = {
    chart: { type: "bar" },
    title: {
      text: "Child birth Rate in your area",
      style: {
        fontSize: "18px",
        fontWeight: "semiBold",
        color: isDarkMode ? "#ffffff" : "#263238",
        padding: "20px",
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    colors: ["#620084"],
    xaxis: {
      categories: ["Region 1", "Region 2", "Region 3", "Region 4", "Region 5"],
    },
    fill: {
      opacity: 1,
    },
  };

  const ChildBirthRateSeries = [
    {
      name: "birthrate",
      data: [10, 20, 30, 40, 50, 60],
    },
  ];

  const handleDayClick = (day, { selected }) => {
    console.log("Day clicked:", day, selected);
    // You can handle the day click event here
  };

  return (
    <div className="container content-container">
      <h1 className="text-3xl mb-5">Welcome {userDetails.name}</h1>
      <div className="flex justify-around flex-wrap mb-12">
        <Widget
          icon={IoPeopleCircle}
          count={25}
          label1="Eligible Couples"
          label2="Manage Eligible Couple Records"
        />
        <Widget
          icon={MdOutlinePregnantWoman}
          count={25}
          label1="Registered Parents"
          label2="Manage Parents Records"
        />
        <Widget
          icon={HiCalendar}
          count={25}
          label1="Clinics this month"
          label2="View Clinic Records"
        />
      </div>
      <div>
        <Typography variant="h4">Upcoming Clinics & Home Visits</Typography>
        <div className="flex">
          <div className="w-5/12">
            <Calendar
              highlightDates={[
                new Date(2024, 6, 20),
                new Date(2024, 7, 5),
                new Date(2024, 7, 8),
              ]}
              highlightColor="#ffcc00"
              onDayClick={handleDayClick}
            />
          </div>
          <div className="w-7/12 flex flex-col gap-9">
            <div className="flex gap-10">
              <p className="text-lg">
                <FaCircle className="text-light-clinics inline" /> Clinics
              </p>
              <p className="text-lg">
                <FaCircle className="text-light-home-visit inline" /> Home
                Visits
              </p>
            </div>
            <div className="bg-[#6e00961c] dark:bg-dark-background w-full p-5 rounded-md flex justify-between items-center">
              <p className="text-lg">
                Your Next Home Visits on: <span>28/08/2024</span>
              </p>
              <Button className="bg-footer-purple">View Home Visits</Button>
            </div>
            <div className="bg-[#6e00961c] dark:bg-dark-background w-full p-5 rounded-md flex justify-between items-center">
              <p className="text-lg">
                Next MOH Clinic on: <span>28/08/2024</span>
              </p>
              <Button className="bg-footer-purple">View MOH Clinics</Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-10">
          <Typography variant="h4">
            Trend Analysis in your Midwife Area
          </Typography>
          <Button>View All</Button>
        </div>

        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <Box sx={{ p: 2 }}>
                <ReactApexChart
                  options={pregnancyVisitsOptions}
                  series={pregnancyVisitsSeries}
                  type="line"
                  height={350}
                  width={"100%"}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <Box sx={{ p: 2 }}>
                <ReactApexChart
                  options={AverageChildGrowthOptions}
                  series={AverageChildGrowthSeries}
                  type="line"
                  height={350}
                  width={"100%"}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <Box sx={{ p: 2 }}>
                <ReactApexChart
                  options={PregnantStatOptions}
                  series={PregnantStatSeries}
                  type="donut"
                  height={350}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <Box sx={{ p: 2 }}>
                <ReactApexChart
                  options={ChildBirthRateOptions}
                  series={ChildBirthRateSeries}
                  type="bar"
                  height={350}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default dashboard;
