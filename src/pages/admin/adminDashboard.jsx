import React, { useContext, useState } from "react";
import { IoPeopleCircle, IoDocumentTextOutline, IoBusiness } from "react-icons/io5";
import { MdOutlinePregnantWoman, MdPersonOutline, MdEventNote } from "react-icons/md";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardActions, Button } from "@mui/material";
import { FaCircle } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import { userData } from "@/context/userAuth";
import ApexCharts from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

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

const AdminDashboard = () => {
  const { userDetails } = useContext(userData);
  const { t } = useTranslation('HealthStatistics');

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

  // Crucial Statistics chart data
  const data = {
    crucialStats: {
      series: [
        { name: 'Rate of maternal health complications', data: [5, 10, 15, 10, 15, 20, 25] },
        { name: 'Rate of preterm births', data: [5, 7, 9, 8, 7, 10, 12] },
      ],
      options: {
        chart: { type: 'line' },
        xaxis: { categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'] },
        colors: ['#620084', '#8a3dff'],
        stroke: { curve: 'smooth' },
      },
    },
  };

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
    colors: ["#6c757d", "#007bff", "#28a745", "#dc3545"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  const [seriesPie, setSeriesPie] = useState([15, 15, 15, 15]);

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
      colors: ["#34a853"],
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
        "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7",
        "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13", "Day 14",
        "Day 15", "Day 16", "Day 17", "Day 18", "Day 19", "Day 20", "Day 21",
        "Day 22", "Day 23", "Day 24", "Day 25", "Day 26", "Day 27", "Day 28",
        "Day 29", "Day 30",
      ],
    },
    yaxis: {
      title: {
        text: 'Uptime (%)'
      },
      min: 99,
      max: 100,
      tickAmount: 5,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}%`
      }
    }
  });

  const [series3, setSeries3] = useState([
    {
      name: "Uptime",
      data: [
        99.5, 99.8, 100, 99.7, 99.9, 99.8, 99.9, 99.8, 100, 99.9, 99.7, 99.8, 
        99.9, 99.8, 99.9, 100, 99.9, 99.8, 99.7, 99.9, 100, 99.8, 99.9, 99.8, 
        100, 99.9, 99.8, 99.7, 99.9, 100
      ],
    },
  ]);



  return (
    <div className="container content-container">
      <h1 className="text-3xl mb-5">Welcome {userDetails.name}</h1>
      <div className="flex gap-3 justify-around mb-12">
        <Widget
          icon={IoDocumentTextOutline}
          count={10}
          label1="Blogs to Confirm"
          label2="Manage Blogs"
        />
        <Widget
          icon={IoBusiness}
          count={8}
          label1="Divisions in the Area"
          label2="Manage Divisions"
        />
        <Widget
          icon={IoPeopleCircle}
          count={100}
          label1="Registerd Users"
          label2="Manage Users"
        />
        <Widget
          icon={MdOutlinePregnantWoman}
          count={20}
          label1="Clinics this month"
          label2="Manage Clinic Schedules"
        />
      </div>
      <div>
        <Typography variant="h4">{t("Health Statistics")}</Typography>
        <div className="shadow-md rounded-sm p-5">
          <ApexCharts
            options={data.crucialStats.options}
            series={data.crucialStats.series}
            type="line"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
      <div>
        <div className="mb-10">
          <div className="flex justify-between">
            <Typography variant="h4">
              System Analytics
            </Typography>
            <Button>View All</Button>
          </div>
          <Typography className="mr-4 mb-10" variant="h6">
            Key Metrics and KPI
          </Typography>
        </div>
        <div className="grid gap-12 grid-cols-3">
          <div className="grid gap-12 grid-cols-2">
            <Card>
              <CardContent>
                <Typography>
                  Uptime: <p className="text-purple-800 inline font-large">99.9%</p>
                </Typography>
                <Typography>
                  Downtime events: <p className="text-purple-800 inline font-large">99.9%</p>
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography>
                  Current Error Rate: <p className="text-purple-800 inline font-large">0.5%</p>
                </Typography>
                <Typography>
                  Current Active Users: <p className="text-purple-800 inline font-large">250</p>
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography>
                  Avg. Response Time: <p className="text-purple-800 inline font-large">200ms</p>
                </Typography>
                <Typography>
                  Peak Response Time: <p className="text-purple-800 inline font-large">1.5 sec</p>
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography>
                  Most Recent Errors: <p className="text-purple-800 inline font-large">20/06/2024, 10:15 AM</p>
                </Typography>
                <Typography>
                  <p className="text-purple-800 inline font-large">18/06/2024, 06:15 AM</p>
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div id="" className="shadow-md rounded-sm p-5">
          <ReactApexChart
            options={options}
            series={series3}
            type="line"
            height={350}
            width={"100%"}
          />
          </div>
          <div id="" className="shadow-md rounded-sm p-5">
            <ReactApexChart
                options={optionsPie}
                series={seriesPie}
                type="pie"
                height={350}
                width={"100%"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
