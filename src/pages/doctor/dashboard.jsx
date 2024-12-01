// import Calendar from "@/components/Calendar";
import { Button } from "@/components/ui/button";
import WrapperCard from "@/components/userComponents/wrapperCard";
import { Typography } from "@mui/material";
import clinic from "../../assets/doctor/clinic.png";
import patient from "../../assets/doctor/patient.png";
import drugs from "../../assets/doctor/drugs.png";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Calendar from "@/components/Calendar";
import ClinicService from "@/service/clinicService";
import { errorType, Toast } from "@/components/toast";
import { formatTime } from "@/utils/FormatTime";

const doctorCards = [
  {
    title: "View Patient Records",
    description: "Access and review detailed patient medical histories",
    image: patient,
    url: "/clinics",
  },
  {
    title: "Manage drugs",
    description: "Overview MOH drug inventory and usage",
    image: drugs,
    url: "/drugs",
  },
  {
    title: "Clinic Handling",
    description: "Oversee clinic operations and patient services",
    image: clinic,
    url: "/clinics",
  },
];

const NextClinic = ({ region, clinicName, date, startTime, endTime }) => {
  return (
    <div className="mb-5 w-[99%] h-24 px-5 rounded-lg bg-light-blogcard dark:bg-dark-blogcard flex items-center justify-between">
      <p className="text-lg">
        {`You are assigned to ${clinicName} on `}
        <span className="font-semibold">{date}</span> {`from `}
        <span className="font-semibold">{formatTime(startTime)}</span>
        {` to `}
        <span className="font-semibold">{formatTime(endTime)}</span>
      </p>
      <Button className="px-10 cursor-auto hover:bg-primary-purple">
        {region}
      </Button>
    </div>
  );
};

const doctorDashboard = () => {
  const [dates, setDates] = useState([]);
  const [clinics, setClinics] = useState([]);

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

  useEffect(() => {
    fetchClinicsForGivenMonth(new Date().toISOString().split("T")[0]);
    fetchUpcomingClinicsForDoctor();
  }, []);

  const fetchClinicsForGivenMonth = async (date) => {
    try {
      const response = await ClinicService.getClinicsGivenMonthForDoctor(date);
      setDates(response);
    } catch (error) {
      Toast(error.response.data || "Unauthorized", errorType.ERROR);
      console.log(error.response.data);
    }
  };

  const handleMonthChange = async (date) => {
    await fetchClinicsForGivenMonth(date.format("YYYY-MM-DD"));
  };

  const fetchUpcomingClinicsForDoctor = async () => {
    try {
      const response = await ClinicService.getUpcomingClinicsForDoctor();
      setClinics(response);
    } catch (error) {
      Toast(error.response.data || "Unauthorized", errorType.ERROR);
      console.log(error.response.data);
    }
  };

  return (
    <div className="content-container">
      <p className="text-3xl text-light-title dark:text-dark-title font-semibold mb-8">
        Home
      </p>

      <div>
        <Typography variant="h4">Upcoming Clinics</Typography>
        <div className="flex">
          <div className="w-4/12">
            <Calendar
              handleMonthChange={handleMonthChange}
              highlightedDays={dates}
            />
          </div>

          {/* display next 3 clinics */}
          <div className="w-8/12 h-80 overflow-y-auto">
            {clinics.map((clinic) => (
              <NextClinic
                key={clinic.clinicId}
                region={clinic.other}
                clinicName={clinic.name}
                date={clinic.date}
                startTime={clinic.startTime}
                endTime={clinic.endTime}
              />
            ))}
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
