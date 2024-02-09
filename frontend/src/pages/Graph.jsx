import React, { useState, useEffect } from "react";
import Sidebars from "../components/Sidebars";
import Combobox from "../components/Combobox";
import Charttwo from "../components/Charttwo";

const Graph = () => {
  

  return (
    <div className="h-full w-full flex flex-col">
      <Sidebars />
      <div className="p-4 sm:ml-64">
        <Combobox />
        <Charttwo />
      </div>
    </div>
  );
};

export default Graph;
