import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import AnalyticsService from "@/service/analyticsService";

// Function to calculate the percentile
const calculatePercentile = (arr, percentile) => {
  const sorted = [...arr].sort((a, b) => a - b);
  const index = (percentile / 100) * (sorted.length - 1);
  return sorted[Math.round(index)];
};

const BirthWeightBoxPlot = ({ birthWeightData }) => {
  const min = Math.min(...birthWeightData);
  const max = Math.max(...birthWeightData);
  const q1 = calculatePercentile(birthWeightData, 25);
  const median = calculatePercentile(birthWeightData, 50);
  const q3 = calculatePercentile(birthWeightData, 75);

  const boxPlotOptions = {
    chart: {
      height: 350,
      type: "boxPlot",
    },
    title: {
      text: "Birth Weight Distribution (Boxplot)",
      align: "center",
    },
    xaxis: {
      categories: ["Birth Weights"], // Label for the boxplot axis
    },
    yaxis: {
      title: {
        text: "Birth Weight (kg)",
      },
    },
    series: [
      {
        name: "Birth Weight",
        data: [
          {
            x: "Birth Weights", // Label for the boxplot
            y: [min, q1, median, q3, max], // Minimum, Q1, Median, Q3, Maximum
          },
        ],
      },
    ],
  };

  return (
    <div className="chart-container">
      <ReactApexChart
        options={boxPlotOptions}
        series={boxPlotOptions.series}
        type="boxPlot"
        height={350}
      />
    </div>
  );
};

const BirthWeightAnalysis = () => {
  const [birthWeightData, setBirthWeightData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the AnalyticsService
  const fetchData = async () => {
    try {
      // Call the actual service to get birth weight data
      const data = await AnalyticsService.getBirthWeights();
      setBirthWeightData(data);
      setLoading(false);
      console.log("Birth weight data:", data);
    } catch (error) {
      console.error("Error fetching birth weight data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BirthWeightBoxPlot birthWeightData={birthWeightData} />
      )}
    </div>
  );
};

export default BirthWeightAnalysis;
