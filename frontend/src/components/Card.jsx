import React, { useState, useEffect } from "react";
import Charts from "./Charts";
import Rcards from "./Rcards";
import "./css/card.css";
import RTables from "./RTables";
import Model from "./Model";

const Card = () => {
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
        // Assuming you want to send the first data item to Rcards
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
  // Pass limitValues to Rcards component
  // setLimitValues(limitValues);
  };

 const handleLimitValuesChange = (newLimitValues, newLimitData) => {
    setLimitValues(newLimitValues);
    setLimitData(newLimitData);
  };

  // console.log("devicedata", deviceData);

  return (
    <div style={{ width: "100%", overflow: "hidden"}}>
      <div className="grid items-stretch grid-rows-2 md:grid md:grid-rows-2 sm:grid sm:grid-rows-1">
        <div className="sm:grid sm:grid-cols-1 lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 ">
         
          <div>
            <Model handleSmallBoxClick={handleSmallBoxClick} onLimitValuesChange={handleLimitValuesChange} />

          </div >
          <div>
          <Rcards deviceData={deviceData} limitValues={limitValues} limitData={limitData} />
          

          </div>
        </div>
        <div className="sm:grid sm:grid-cols-1 lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 gap-2 mt-3">
          <div>
            <RTables deviceNumber={deviceNumberForEffect} />
          </div>
          <div className="ml-5">
            <Charts deviceNumber={deviceNumberForEffect} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
