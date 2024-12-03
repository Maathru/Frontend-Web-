import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Axios from "axios"; // You can use any HTTP client
import AnalyticsService from "@/service/analyticsService";

const BirthsByMonthChart = () => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AnalyticsService.getBirthsByMonth();
        console.log(data);

        // Prepare data for the chart
        const months = Object.keys(data).map(Number);  
        const counts = Object.values(data);          

        // Set up the chart options
        setChartOptions({
          chart: {
            type: "bar",
            height: 350,
            zoom: {
              enabled: false,
            },
          },
          title: {
            text: "Birth Counts by Month",
            align: "center",
          },
          xaxis: {
            categories: months.map(month => {
              // Use month names (e.g., January, February, etc.)
              const date = new Date(2020, month - 1);  // Using any year for month names
              return date.toLocaleString("default", { month: "long" });
            }),
            title: {
              text: "Month",
            },
          },
          yaxis: {
            title: {
              text: "Number of Births",
            },
            stepSize: 1,
          },
        });

        setChartSeries([
          {
            name: "Births",
            data: counts,
          },
        ]);
      } catch (error) {
        console.error("Error fetching birth counts by month data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {chartSeries.length > 0 ? (
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BirthsByMonthChart;
