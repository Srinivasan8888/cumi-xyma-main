import React from "react";
import { Line } from "react-chartjs-2";

const Charttwo = () => {
  const data = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "Battery",
        data: [60, 50, 40, 30, 20, 10],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
      {
        label: "Thickness",
        data: [19, 18, 17, 16, 15, 14],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
      }
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        min: 1,
        max: 6,
      },
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div className="container mx-auto">
      <div className="bg-gray-100 p-4 rounded shadow">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Charttwo;
