import React, { useState, useEffect } from "react";
import Charts from "../components/dashboardcomp/Charts.jsx";
import Rcards from "../components/dashboardcomp/Rcards.jsx";
import "../components/css/card.css";
import RTables from "../components/dashboardcomp/RTables.jsx";
import Model from "../components/dashboardcomp/Model.jsx";
import Navbar from "../components/Navbar.jsx";
import "./css/dashboard.css";
import Sidebars from "../components/Sidebar/Sidebars.jsx";
import { baseUrl } from "../components/config.js";

function Dashboard() {
  const [deviceData, setDeviceData] = useState(null);
  const [deviceNumberForEffect, setDeviceNumberForEffect] = useState("XY00001");
  const [limitValues, setLimitValues] = useState([]);
  const [limitData, setLimitData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}getdata/${deviceNumberForEffect}?battery=true&thickness=true`
        );
        const data = await response.json();
        console.log("fetchdata for devicenumberforeffect", data);

        if (data && data.length > 0) {
          setDeviceData(data[0]);
        }

        // if (data && data.length > 0) {
        //   const { createdAt, devicetemp, id, signal, updatedAt } = data[0];
        //   setDeviceData({ createdAt, devicetemp, id, signal, updatedAt });
        //   console.log("Updated deviceData:", { createdAt, devicetemp, id, signal, updatedAt });
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, [deviceNumberForEffect]);

  const handleSmallBoxClick = (text) => {
    // Call the function passed from props directly
    console.log("Small box clicked dash:", text);
    const deviceNumber = text;
    setDeviceNumberForEffect(deviceNumber);
  };

  const handleLimitValuesChange = (newLimitValues, newLimitData) => {
    setLimitValues(newLimitValues);
    setLimitData(newLimitData);
  };

  console.log("deviceData", deviceData);
  // useEffect(() => {
  //   console.log("deviceData", deviceData);
  // }, [deviceData]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 cont1">
        <div className="md:col-span-1 modelview">
          <Model
            handleSmallBoxClick={handleSmallBoxClick}
            onLimitValuesChange={handleLimitValuesChange}
          />
        </div>
        <div className="md:col-span-1 sm:col-span">
          <Rcards
            deviceData={deviceData}
            limitValues={limitValues}
            limitData={limitData}
            className="h-full"
          />
        </div>
        <div className="md:col-span-1 sm:col-span-4">
          <RTables deviceNumber={deviceNumberForEffect} className="h-full" />
        </div>
        <div className="md:col-span-1 sm:col-span-4">
          <Charts deviceNumber={deviceNumberForEffect} className="h-full" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
