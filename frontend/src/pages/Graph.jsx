import React, { useState } from "react";
import Sidebars from "../components/Sidebar/Sidebars";
import Combobox from "../components/Combobox";
import Charttwo from "../components/Charttwo";

const Graph = () => {
  const [chartData, setChartData] = useState(null); // State to hold chart data

  // Callback function to receive chart data from Combobox
  const handleChartData = (data) => {
    setChartData(data);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <Sidebars />
      <div className="p-4 sm:ml-64">
        <Combobox onChartData={handleChartData} />
        {chartData && <Charttwo chartData={chartData} />} {/* Render Charttwo only if chartData is not null */}
      </div>
    </div>
  );
};

export default Graph;
