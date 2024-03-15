import React, { useState, useEffect } from "react";
import Charts from "../components/dashboardcomp/Charts.jsx";
import Rcards from "../components/dashboardcomp/Rcards.jsx";
import "../components/css/card.css";
import RTables from "../components/dashboardcomp/RTables.jsx";
import Model from "../components/dashboardcomp/Model.jsx";
import Navbar from "../components/Navbar.jsx";
// import Card from "../components/Card.jsx";
import "./css/dashboard.css";
import Sidebars from "../components/Sidebar/Sidebars.jsx";
// import Sidebars from "../Sidebar/Sidebars.jsx";

function Dashboard() {
  const [deviceData, setDeviceData] = useState(null);
  const [deviceNumberForEffect, setDeviceNumberForEffect] = useState(1);
  const [limitValues, setLimitValues] = useState([]);
  const [limitData, setLimitData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/sensor/getdata/xy00${deviceNumberForEffect}?battery=true&thickness=true`
        );
        const data = await response.json();
        console.log(data);

        if (data && data.length > 0) {
          setDeviceData(data[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, [deviceNumberForEffect]);

  const handleSmallBoxClick = async (text) => {
    const deviceNumber = parseInt(text.replace("Device ", ""), 10);
    setDeviceNumberForEffect(deviceNumber);

    // setLimitValues(limitValues);
  };

  const handleLimitValuesChange = (newLimitValues, newLimitData) => {
    setLimitValues(newLimitValues);
    setLimitData(newLimitData);
  };

  console.log("devicedata", deviceData);

  return (
    <div className="flex flex-col h-screen">
  <Sidebars />
  <div className="flex-grow p-4 sm:ml-64">
    <Navbar />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 cont1">
      <div className="md:col-span-1 ">
        <Model
          handleSmallBoxClick={handleSmallBoxClick}
          onLimitValuesChange={handleLimitValuesChange}
          className="h-full"
        />
      </div>
      <div className="md:col-span-1 rcards-container">
        <Rcards
          deviceData={deviceData}
          limitValues={limitValues}
          limitData={limitData}
          className="h-full"
        />
      </div>
      <div className="md:col-span-1">
        <RTables deviceNumber={deviceNumberForEffect} className="h-full" />
      </div>
      <div className="md:col-span-1">
        <Charts deviceNumber={deviceNumberForEffect} className="h-full" />
      </div>
    </div>
  </div>
</div>

  
  );
}

export default Dashboard;
