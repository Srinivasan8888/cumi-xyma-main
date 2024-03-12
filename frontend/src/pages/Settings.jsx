import React, { useState } from "react";
import Sidebars from "../components/Sidebars";

const Settings = () => {
  
  return (
    <div className="h-full w-full flex flex-col">
      <Sidebars />
      <div className="p-4 sm:ml-64">
        settings page
      </div>
    </div>
  );
};

export default Settings;

