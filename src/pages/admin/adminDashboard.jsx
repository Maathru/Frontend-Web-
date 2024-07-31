import React, { useContext, useState } from "react";
import { IoPeopleCircle, IoDocumentTextOutline, IoBusiness } from "react-icons/io5";
import { MdOutlinePregnantWoman } from "react-icons/md";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, Button } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { userData } from "@/context/userAuth";
import ApexCharts from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

const Widget = ({ icon: Icon, count, label1, label2 , link }) => (
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
    <Link to={link}>
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
      categories: [
        "last month" , "this month"
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
        99.5, 99.8
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
          link="/manage/blogs"
        />
        <Widget
          icon={IoBusiness}
          count={8}
          label1="Divisions in the Area"
          label2="Manage Divisions"
          link="/regions"
        />
        <Widget
          icon={IoPeopleCircle}
          count={100}
          label1="Registerd Users"
          label2="Manage Users"
          link="/users"
        />
        <Widget
          icon={MdOutlinePregnantWoman}
          count={20}
          label1="Clinics this month"
          label2="Manage Clinic Schedules"
          link="/clinics"
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
                type="donut"
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
