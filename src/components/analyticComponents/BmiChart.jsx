import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import AnalyticsService from "@/service/analyticsService";

const BMIChart = () => {
    const [bmiCategories, setBmiCategories] = useState({});

    useEffect(() => {

    const fetchBmiData = async () =>{
        try {
            const data = await AnalyticsService.getBmiData();
            console.log("Data:", data);
            setBmiCategories(data);
        } catch (error) {
            console.error("Error fetching analysis data:", error);
        }}
        fetchBmiData();
    }, []);

    const chartOptions = {
        chart: {
            id: 'bmi-analysis-chart',
            type: 'pie',
        },
        labels: Object.keys(bmiCategories),
        title: {
            text: 'BMI Analysis of Pregnant Mothers',
            align: 'center',
        },
    };

    const chartSeries = Object.values(bmiCategories);

    return (
        <div>
            <Chart
                options={chartOptions}
                series={chartSeries}
                type="pie"
                width="500"
                height="500"
            />
        </div>
    );
};

export default BMIChart;
