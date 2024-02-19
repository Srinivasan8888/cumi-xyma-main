import React, { useState, useEffect } from "react";
import { FaTemperatureLow, FaSignal, FaSortAmountUpAlt } from "react-icons/fa";
import { PiBatteryFullFill } from "react-icons/pi";
import Carddrop from "./Carddrop";
import CUMI from "../img/CUMI.png";
import "./css/rcard.css";

const circle = {
  height: "25px",
  width: "25px",
  borderRadius: "50%",
  display: "inline-block",
};

const Rcards = ({ deviceData }) => {
  const [id, setId] = useState(null);
  const [thickness, setThickness] = useState(null);
  const [devicetemp, setDevicetemp] = useState(null);
  const [signal, setSignal] = useState(null);
  const [batterylevel, setBattery] = useState(null);
  const [selectedValue, setSelectedValue] = useState("5 Min");
  const [userInput, setUserInput] = useState("");
  const [sensorData, setSensorData] = useState(null); // Define sensorData state
  const [limitvalue, setLimitValue] = useState(null); // Define limitvalue state

  useEffect(() => {
    if (deviceData) {
      setId(deviceData.id);
      setThickness(deviceData.thickness);
      setDevicetemp(deviceData.devicetemp);
      setSignal(deviceData.signal);
      setBattery(deviceData.batterylevel);
    }
  }, [deviceData]);

  const getColorBasedOnPercentage = (limitvalue) => {
    if (limitvalue >= 75) {
      return "lightgreen";
    } else if (limitvalue >= 50) {
      return "orange";
    } else {
      return "red";
    }
  };

  const backgroundColor = getColorBasedOnPercentage(limitvalue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/sensor/alllimitdata"
        );
        //          `http://localhost:4000/sensor/idlimit/${id}`

        const data = await response.json();

        const sensorData = data.find((sensor) => sensor.id === id);
        setSensorData(sensorData); // Set sensorData state

        if (sensorData) {
          console.log("Sensor data for ID:", id);
          console.log("Input Thickness:", sensorData.inputthickness);
          console.log("Other sensor data:", sensorData);

          // Check if inputthickness is a valid number
          if (!isNaN(sensorData.inputthickness)) {
            const limitvalue =
              ((thickness - 0) * (100 - 0)) / (sensorData.inputthickness - 0) +
              0;
            console.log("limit value of", limitvalue);
            setLimitValue(limitvalue); // Set the limit value
          } else {
            console.error("Input thickness is not a valid number.");
          }
        } else {
          console.error("Sensor data not found for id:", id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, [id, thickness]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    console.log(value); // Log the value entered by the user
  };

  const handleSelectionChange = (selectedValue) => {
    setSelectedValue(selectedValue);
    alert(`Selected value: ${selectedValue}`);
  };

  const handleSubmit = async () => {
    if (selectedValue && userInput) {
      const encodedSelectedValue = encodeURIComponent(selectedValue);
      const url = `http://localhost:4000/sensor/setlimit?id=${id}&time=${encodedSelectedValue}&inputthickness=${userInput}`;

      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            id: id,
            time: encodedSelectedValue,
            inputthickness: userInput,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    } else {
      console.error("Selected value or user input is empty.");
    }
  };

  return (
    <div className="max-w-fit h-0 ml-5 ">
      <div className="flex items-end justify-end">
        <p className="mr-3 font-bold text-base mb-1">
          {id ? `${id}` : "Loading..."}
        </p>
        <Carddrop
          deviceData={deviceData}
          onSelectionChange={handleSelectionChange}
        />
        <input
          type="number"
          className="mt-4 ml-3 rounded-lg w-[20%] h-9"
          placeholder="Thickness"
          value={userInput}
          onChange={handleInputChange}
        />

        <button
          type="button"
          className="mr-3 ml-3 inline-block w-20 h-9 font-bold text-center bg-gradient-to-tl from-purple-700 to-pink-500 uppercase align-middle transition-all rounded-lg cursor-pointer leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div className="flex flex-col lg:flex-row">
          <img src={CUMI} className="w-44" />
          <div className="mt-3 ml-4 lg:flex lg:flex-col">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ ...circle, backgroundColor: "lightGreen" }}></div>
              <p
                style={{ marginLeft: "5px", marginTop: "10px" }}
                className="font-bold mt-3"
              >
                &gt;75%
              </p>
            </div>
            <div
              style={{ display: "flex", width: "100px", alignItems: "center" }}
            >
              <div style={{ ...circle, backgroundColor: "Orange" }}></div>
              <p
                style={{ marginLeft: "5px", marginTop: "10px" }}
                className="font-bold mt-3"
              >
                75 - 50
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ ...circle, backgroundColor: "Red" }}></div>
              <p
                style={{ marginLeft: "5px", marginTop: "10px" }}
                className="font-bold mt-3"
              >
                &lt;50%
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <div
            className={`flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md mt-3 mb-4 sm:flex-row lg:ml-6`}
            style={{ backgroundColor }}
          >
            <div className="p-3 mb-2 mr-4 text-blue-500 bg-blue-100 rounded-full sm:mb-0">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="-1 -2 18 18"
              >
                <FaSortAmountUpAlt />
              </svg>
            </div>
            <div className="text-sm font-medium text-gray-600 text-center sm:text-left">
              <h5 className="font-bold text-black">Thickness</h5>
              {limitvalue !== null ? (
                <>
                  <p className="text-lg sm:text-2xl font-bold text-black mt-1">
                    {limitvalue.toFixed(2)}%
                  </p>
                  {console.log("limit value: ", limitvalue)}
                </>
              ) : (
                <p className="text-lg sm:text-2xl font-bold text-black mt-1">
                  Loading...
                </p>
              )}
            </div>
            <div className="flex-grow"></div>
            <p className="text-lg sm:text-2xl font-bold text-black mt-2 sm:mt-0">
              {thickness ? `${thickness}` : "Loading..."} /{" "}
              {sensorData
                ? sensorData.inputthickness > 0
                  ? `${sensorData.inputthickness}`
                  : "Loading..."
                : "Loading..."}{" "}
              mm
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-3 sm:grid-cols-1 mb-5">
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4 sm:flex-row">
          <div className="p-3 mb-2 mr-4 text-green-500 bg-green-100 rounded-full sm:mb-0">
            <svg className="w-6 h-6" fill="currentColor" viewBox="-1 -2 18 18">
              <FaTemperatureLow />
            </svg>
          </div>
          <div className="text-sm font-medium text-gray-600 text-center sm:text-left">
            <h5 className="font-bold  text-black">Device Temp</h5>
            <p className="text-2xl font-bold text-black mt-1">
              {devicetemp ? `${devicetemp}°C` : "Loading..."}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4 sm:flex-row">
          <div className="p-3 mb-2 mr-4 text-red-500 bg-red-100 rounded-full sm:mb-0">
            <svg className="w-5 h-5" fill="currentColor" viewBox="-1 -2 18 18">
              <FaSignal />
            </svg>
          </div>
          <div className="text-sm font-medium text-gray-600 text-center sm:text-left">
            <h5 className="font-bold  text-black">Signal Strength</h5>
            <p className="text-2xl font-bold text-black mt-1">
              {signal ? `${signal}` : "Loading..."}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4 sm:flex-row">
          <div className="p-3 mb-2 mr-4 text-yellow-500 bg-yellow-100 rounded-full sm:mb-0">
            <svg
              className="w-6 h-6 items-center"
              fill="currentColor"
              viewBox="-1 -2 18 18"
            >
              <PiBatteryFullFill />
            </svg>
          </div>
          <div className="text-sm font-medium text-gray-600 text-center sm:text-left">
            <h5 className="font-bold  text-black">Battery Level</h5>
            <p className="text-2xl font-bold text-black mt-1">
              {batterylevel ? `${batterylevel}%` : "Loading..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rcards;
