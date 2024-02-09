import React from "react";
import { Line } from "react-chartjs-2";

const Charttwo = () => {
  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"],

    
    datasets: [
      {
        label: "Battery",
        data: [60, 50, 40, 30, 20, 10, 22, 23 ,23 ,25, 25 ,25 ,25,34],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
      {
        label: "Thickness",
        data: [19, 18, 17, 16, 15, 14, 23 ,23 ,25, 55 ,25 ,25, 25, 34],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
      },
    ],
    
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        min: 1,
        max: 50,
      },
      y: {
        min: 0,
        max: 70,
      },
    },
  };

  return (
    <div className="container w-full mx-auto">
      <div className="bg-gray-100 p-4 rounded shadow">
      <div style={{ width: "100%", height: "100%" }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Charttwo;
