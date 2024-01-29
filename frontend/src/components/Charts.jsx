import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Charts = () => {
  const CHART_COLORS = {
    red: "#f26c6d",
  };

  const data = {
    labels: ["May1", "May 8", "May 9", "May 10", "May 11", "May 12"],
    datasets: [
      {
        data: [3, 4, 2, 2, 11, 12, 14],
        borderColor: CHART_COLORS.red,
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.4,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Chart.js Line Chart - Cubic interpolation mode",
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Value",
          },
          suggestedMin: -10,
          suggestedMax: 10,
        },
      },
    },
  };

  return (
    <div
      className="flex items-center bg-gray-50 shadow-md rounded-lg"
      style={{ width: "100%", height: "90.5%" }}
    >
      <Line {...config} className="mt-5"/>
    </div>
  );
};

export default Charts;
