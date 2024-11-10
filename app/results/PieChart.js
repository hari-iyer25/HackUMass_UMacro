// components/PieChart.js
"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PieChart({ data }) {
    // Default data to handle loading state
    const chartData = data
        ? {
            labels: ["Protein", "Fat", "Carbs"],
            datasets: [
                {
                    data: data,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                },
            ],
        }
        : {
            labels: [],
            datasets: [{ data: [] }],
        };

    return <Pie data={chartData} />;
}