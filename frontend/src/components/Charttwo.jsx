import React from "react";
import { Line } from "react-chartjs-2";

const Charttwo = ({ chartData }) => {
  const maxBatteryLevel = Math.max(...chartData.map(dataItem => parseFloat(dataItem.batterylevel)));
  const maxThickness = Math.max(...chartData.map(dataItem => parseFloat(dataItem.thickness)));

  const data = {
    labels: chartData.map(dataItem => dataItem.createdAt),
    datasets: [
      {
        label: "Battery",
        data: chartData.map(dataItem => parseFloat(dataItem.batterylevel)),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
      {
        label: "Thickness",
        data: chartData.map(dataItem => parseFloat(dataItem.thickness)),
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
        max: Math.max(maxBatteryLevel, maxThickness) + 10, // Set max value dynamically
      },
    },
  };

  return (
    <div className="container w-full mx-auto" style={{ width: "190%", height: "800px", display: "flex", justifyContent: "center" }}>
      <div className="bg-gray-100 p-4 rounded shadow" style={{ width: "190%", height: "100%" }}>
        <div style={{ width: "190%", height: "100%" }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
  
};

export default Charttwo;
