import React from "react";
import { Line } from "react-chartjs-2";

const Charttwo = ({ chartData }) => {
  // Check if chartData is null or undefined
  if (!chartData || !Array.isArray(chartData)) {
    return <div>No data available</div>;
  }

  const reversedChartData = [...chartData].reverse();
  const maxBatteryLevel = Math.max(...reversedChartData.map(dataItem => parseFloat(dataItem.battery_status)));
  const maxThickness = Math.max(...reversedChartData.map(dataItem => parseFloat(dataItem.thickness)));

  const data = {
    labels: reversedChartData.map(dataItem => dataItem.timestamp),
    datasets: [
      {
        label: "Battery",
        data: reversedChartData.map(dataItem => parseFloat(dataItem.battery_status)),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
      {
        label: "Thickness",
        data: reversedChartData.map(dataItem => parseFloat(dataItem.thickness)),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        time: {
          unit: 'second',
        },
        position: "bottom",
      },
      y: {
        min: 0,
        max: Math.max(maxBatteryLevel, maxThickness) + 10, 
      },
    },
  };

  return (
    <Line data={data} className="shadow-2xl rounded-2xl bg-gray-100 p-4 w-full lg:w-3/4 xl:w-11/12 mx-auto h-full" options={options} />
  );
};

export default Charttwo;
