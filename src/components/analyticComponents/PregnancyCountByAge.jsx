import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import AnalyticsService from "@/service/analyticsService";

const PregnancyCountByAge = () => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AnalyticsService.getPregnancyCountByAge(); // Adjust based on your service method
        const responseData = response; // Assuming response.data is the array of data
        console.log("Pregnancy Count by Age:", responseData);

        // Process data for chart
        const ages = responseData.map((item) => item.age);
        const eligibleCounts = responseData.map((item) => item.eligiblecount);

        console.log("Ages:", ages);
        console.log("Eligible Counts:", eligibleCounts);

        // Update chart configurations
        setChartOptions({
          chart: {
            type: "line",
            height: 350,
            zoom: {
              enabled: false,
            },
          },
          title: {
            text: "Pregnancy Counts by Age",
            align: "center",
          },
          xaxis: {
            categories: ages,
            title: {
              text: "Age",
            },
          },
          yaxis: {
            title: {
              text: "Pregnancy Count",
            },
            stepSize: 1,
            min: 0,
          },
          stroke: {
            curve: "smooth",
          },
        });

        setChartSeries([
          {
            name: "Eligible Count",
            data: eligibleCounts,
          },
        ]);
      } catch (error) {
        console.error("Error fetching eligible counts data:", error);
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
          type="line"
          height={350}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PregnancyCountByAge;
