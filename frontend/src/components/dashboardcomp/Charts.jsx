import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const Charts = ({ deviceNumber }) => {
  const [chartDataState, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/sensor/table/xy00${deviceNumber}`
        );
        const data = await response.json();
        data.reverse();
        console.log(data);
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, [deviceNumber]);

  const extractDataForChart = (data) => {
    const labels = data.map((entry) => entry.createdAt);
    const thicknessValues = data.map((entry) => parseInt(entry.thickness, 10));
    return {
      labels: labels,
      data: thicknessValues,
    };
  };

  const { labels, data: thicknessData } = extractDataForChart(chartDataState);

  const CHART_COLORS = {
    red: "#f26c6d",
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: thicknessData,
        borderColor: CHART_COLORS.red,
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.4,
      },
    ],
  };

  const chartConfig = {
    type: "line",
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Chart.js Line Chart - Cubic interpolation mode",
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              var label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y;
              }
              return label;
            }
          }
        }
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
            text: "Thickness",
          },
          suggestedMin: Math.min(...thicknessData),
          suggestedMax: Math.max(...thicknessData),
        },
      },
    },
  };
  

  return (
    <div
      className="flex items-center bg-gray-50 shadow-md rounded-lg"
      style={{ width: "100%", height: "99%" }}
    >
      <Line {...chartConfig} className="mt-2" />
    </div>
  );
};

export default Charts;
