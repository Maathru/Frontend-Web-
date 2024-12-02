import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import AnalyticsService from "@/service/analyticsService";

const PregnancyAnalysisByRegion = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: [],
      },
      title: {
        text: "Number of Pregnancies by Region",
        align: "center",
        style: {
          fontSize: "18px",
        },
      },
    },
    series: [
      {
        name: "Pregnancy Count",
        data: [],
      },
    ],
  });

  useEffect(() => {
    // Fetch data from the backend
    const fetchAnalysisData = async () => {
      try {
        const data = await AnalyticsService.getPregnancyCountByRegion();
        // console.log("Data:", data);

        // Extract region names and counts
        const regions = data.map((entry) => entry.regionName);
        const counts = data.map((entry) => entry.pregnancyCount);

        // console.log("Regions:", regions);
        // console.log("Counts:", counts);

        // Update chart data
        setChartData((prevState) => ({
          ...prevState,
          options: {
            ...prevState.options,
            xaxis: { categories: regions },
          },
          series: [{ name: "Pregnancy Count", data: counts }],
        }));
      } catch (error) {
        console.error("Error fetching analysis data:", error);
      }
    };

    fetchAnalysisData();
  }, []);

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={400}
      />
    </div>
  );
};

export default PregnancyAnalysisByRegion;
