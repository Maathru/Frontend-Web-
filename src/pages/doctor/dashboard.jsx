// import Calendar from "@/components/Calendar";
import { Button } from "@/components/ui/button";
import WrapperCard from "@/components/userComponents/wrapperCard";
import { Typography } from "@mui/material";
import clinic from "../../assets/doctor/clinic.png";
import patient from "../../assets/doctor/patient.png";
import drugs from "../../assets/doctor/drugs.png";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { Calendar } from "@/components/ui/calendar";

const doctorCards = [
  {
    title: "View Patient Records",
    description: "Access and review detailed patient medical histories",
    image: patient,
    // url: "/clinics",
  },
  {
    title: "Manage drugs",
    description: "Monitor and control drug inventory and usage",
    image: drugs,
    // url: "/midwife",
  },
  {
    title: "Clinic Handling",
    description: "Oversee clinic operations and patient services",
    image: clinic,
    // url: "/growth",
  },
];

const NextClinic = ({ clinicId, clinicName, date, startTime, endTime }) => {
  return (
    <div className="mb-5 w-full h-24 px-5 rounded-lg bg-light-blogcard dark:dark-blogcard flex items-center justify-between">
      <p className="text-lg">
        {`Clinic ${clinicId}: ${clinicName} on `}
        <b>{date}</b> {`at `}
        <b>
          {startTime}
          {` to `}
          {endTime}
        </b>
      </p>
      <Button className="px-10">View More</Button>
    </div>
  );
};

const doctorDashboard = () => {
  const options1 = {
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
  };

  const series1 = [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 115, 98, 100, 110],
    },
  ];
  return (
    <div className="content-container">
      <p className="text-3xl text-light-title dark:text-dark-title font-semibold mb-8">
        Home
      </p>

      <div>
        <Typography variant="h4">Upcoming Clinics</Typography>
        <div className="flex">
          <div className="w-4/12">
            <Calendar />
          </div>

          {/* display next 3 clinics */}
          <div className="w-8/12">
            <NextClinic
              clinicId={"CL04"}
              clinicName={"bla bla"}
              date={"05/08/2024"}
              startTime={"9.00AM"}
              endTime={"12.00PM"}
            />
            <NextClinic
              clinicId={"CL04"}
              clinicName={"bla bla"}
              date={"05/08/2024"}
              startTime={"9.00AM"}
              endTime={"12.00PM"}
            />
            <NextClinic
              clinicId={"CL04"}
              clinicName={"bla bla"}
              date={"05/08/2024"}
              startTime={"9.00AM"}
              endTime={"12.00PM"}
            />
          </div>
        </div>
      </div>

      {/* <div>
        <Typography variant="h4">Our Services</Typography>
      </div> */}

      <div className="mt-14">
        <div className="flex flex-col items-center sm:px-24">
          <Typography variant="h4">Our Services</Typography>
          <div className="flex flex-wrap gap-10 mt-10 mb-10">
            {doctorCards.map((doctorCards, index) => (
              <WrapperCard
                key={index}
                title={doctorCards.title}
                url={doctorCards.url}
                image={doctorCards.image}
                description={doctorCards.description}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <Typography variant="h4">
          Trend Analysis of Pregnant Mothers in MOH Office Area Over Time
        </Typography>

        <ReactApexChart
          options={options1}
          series={series1}
          type="line"
          height={350}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default doctorDashboard;
