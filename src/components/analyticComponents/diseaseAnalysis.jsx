import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import AnalyticsService from "@/service/analyticsService";

const DiseaseAnalysis = () => {
  const { t } = useTranslation("growth");
  const [healthData, setHealthData] = useState(null);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const data = await AnalyticsService.getDiseaseAnalysis();
        setHealthData(data);
      } catch (error) {
        console.error("Error fetching health data:", error);
      }
    };

    fetchHealthData();
  }, []);

  // Prepare chart data once the health data is available
  const chartData = {
    series: [
      {
        name: "Count",
        data: [
          healthData?.diabetes || 0,
          healthData?.malaria || 0,
          healthData?.heartDiseases || 0,
          healthData?.kidneyDiseases || 0,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 300,
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          horizontal: false,
        },
      },
      xaxis: {
        categories: [
          t("Diabetes"),
          t("Malaria"),
          t("HeartDiseases"),
          t("KidneyDiseases"),
        ],
      },
      title: {
        text: 'Number of Preganants with Different Diseases',
        align: 'center',
      },
    },
  };

  if (!healthData) {
    return <p>{t("loading")}</p>;
  }

  return (
    <div>
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default DiseaseAnalysis;
