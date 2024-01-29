import React from "react";
import Sidebars from "../components/Sidebars";
import Combobox from "../components/Combobox";
import Toggle from "../components/Toggle";
import Charttwo from "../components/Charttwo";

const Graph = () => {
  return (
    <div className="h-full flex flex-col b">
      <Sidebars />
      <div className="p-4 sm:ml-64">
        {/* Combobox */}
        <Combobox />

        {/* Toggle Components in a single line */}
        
        <Charttwo/>
      </div>
    </div>
  );
};

export default Graph;
