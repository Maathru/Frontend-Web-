import { IoPeopleCircle } from "react-icons/io5";
import React, { useContext, useState } from "react";
import { MdOutlinePregnantWoman } from "react-icons/md";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { FaCircle } from "react-icons/fa";
import { Button } from "flowbite-react";
import ReactApexChart from "react-apexcharts";
import Calendar from "@/components/Calendar";
import { userData } from "@/context/userAuth";

const Widget = ({ icon: Icon, count, label1, label2 }) => (
  <div className="card w-3/12 shadow-md rounded-lg ">
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
  const { userDetails } = useContext(userData);
  // pregnancy visits line chart data starts
  const [options1, setObject1] = useState({
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
        color: "#263238",
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
  });

  const [series1, setSeries1] = useState([
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 115, 98, 100, 110],
    },
  ]);

  // Average Child Growth Rate line chart data starts
  const [options2, setObject2] = useState({
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
      text: "Average Child Growth Rate with the months",
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
  });

  const [series2, setSeries2] = useState([
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 115, 98, 100, 110],
    },
  ]);

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
      </div>
      <div>
        <Typography variant="h4">Upcoming Clinics & Home Visits</Typography>
        <div className="flex">
          <div className="w-7/12">
            <Calendar />
          </div>
          <div className="w-5/12 flex flex-col gap-9">
            <div className="flex gap-10">
              <p className="text-lg">
                <FaCircle className="text-light-clinics inline" /> Clinics
              </p>
              <p className="text-lg">
                <FaCircle className="text-light-home-visit inline" /> Home
                Visits
              </p>
            </div>
            <div className="bg-[#6e00961c] w-full p-5 rounded-md flex justify-between items-center">
              <p className="text-lg">
                Your Next Home Visits on: <span>28/08/2024</span>
              </p>
              <Button className="bg-footer-purple">View Home Visits</Button>
            </div>
            <div className="bg-[#6e00961c] w-full p-5 rounded-md flex justify-between items-center">
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
        <div className="grid gap-12 grid-cols-2">
          <div id="" className="shadow-md rounded-sm p-5">
            <ReactApexChart
              options={options1}
              series={series1}
              type="line"
              height={350}
              width={"100%"}
            />
          </div>
          <div id="" className="shadow-md rounded-sm p-5">
            <ReactApexChart
              options={options2}
              series={series2}
              type="line"
              height={350}
              width={"100%"}
            />
          </div>
          <div id="" className="shadow-md rounded-sm p-5">
            <ReactApexChart
              options={options2}
              series={series2}
              type="line"
              height={350}
              width={"100%"}
            />
          </div>
          <div id="" className="shadow-md rounded-sm p-5">
            <ReactApexChart
              options={options2}
              series={series2}
              type="line"
              height={350}
              width={"100%"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
