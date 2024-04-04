import React, { useState, useEffect } from "react";
import { FaTemperatureLow, FaSignal, FaSortAmountUpAlt } from "react-icons/fa";
import { PiBatteryFullFill } from "react-icons/pi";
import Carddrop from "../Carddrop";
import CUMI from "../../img/CUMI.png";
import "../css/rcard.css";
import { GoCheckCircle } from "react-icons/go";
import { MdAdd } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { IoAlertCircleSharp } from "react-icons/io5";
import { baseUrl } from "../config";

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
  const [selectedValue, setSelectedValue] = useState("1 Min");
  const [userInput, setUserInput] = useState("");
  const [sensorData, setSensorData] = useState(null);
  const [limitvalue, setLimitValue] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [TimeData, setTimeData] = useState(null);
  const [errorAlert1, setErrorAlert1] = useState(false);
  const [errorAlert2, setErrorAlert2] = useState(false);
  const [errorAlert3, setErrorAlert3] = useState(false);
  const [deviceTime, setDeviceTime] = useState(null);
  const [calcthickness, setCalcthickness] = useState(false);

  useEffect(() => {
    if (deviceData) {
      setId(deviceData.device_name);
      setThickness(deviceData.thickness);
      setDevicetemp(deviceData.device_status);
      setSignal(deviceData.signal_strength);
      setBattery(deviceData.battery_status);
      setTimeData(deviceData.timestamp);
    }
    console.log("Rcard data", deviceData);
  }, [deviceData]);

  useEffect(() => {
    if (thickness !== null) {
      if (thickness <= 0) {
        setErrorAlert1(true);
        setErrorAlert2(false);
      } else if (thickness == 9999) {
        setErrorAlert1(false);
        setErrorAlert2(true);
      } else {
        setErrorAlert1(false);
        setErrorAlert2(false);
      }
    }
  }, [thickness]);

  useEffect(() => {
    if (sensorData) {
      const valuess = sensorData.inputthickness;
      const userthickness = parseFloat(valuess) + parseFloat(2);
      const calculatedThickness  = thickness > userthickness;;
      setCalcthickness(calculatedThickness);
      console.log("setCalthinkess", calculatedThickness)
    }
  }, [sensorData]); 

  useEffect(() => {
    if (limitvalue > 108 && limitvalue < 9998) {
      setErrorAlert3(true);
    } else {
      setErrorAlert3(false);
    }
  }, [limitvalue]);

  const getColorBasedOnPercentage = (limitvalue) => {
    if (calcthickness == true) {
      return "#38BDF8"; // blue
    } else if (limitvalue >= 75 && calcthickness == false) {
      return "#28a33d"; // orange
    } else if (limitvalue >= 50 && limitvalue < 75) {
      return "#ED7014"; // green 
    } else {
      return "#EF4444"; // red
    }
  };

  const backgroundColor = getColorBasedOnPercentage(limitvalue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/alllimitdata`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const sensorData = data.find((sensor) => sensor.device_name === id);
        console.log("sensorData", sensorData);
        setSensorData(sensorData);
        
        const time = sensorData ? sensorData.time : null;
        console.log("rcard time", time);
        let encodedtime = deviceTime;
        if (deviceTime == "1") {
          encodedtime = "1 Min";
        } else if (deviceTime == "5") {
          encodedtime = "5 Min";
        } else if (deviceTime == "1440") {
          encodedtime = "1 Day";
        } else if (deviceTime == "2880") {
          encodedtime = "2 Days";
        } else if (deviceTime == "10080") {
          encodedtime = "7 Days";
        } else if (deviceTime == "5") {
          encodedtime = "15 Days";
        }
        setDeviceTime(time);

        if (sensorData) {
          if (!isNaN(sensorData.inputthickness)) {
            const limitvalue =
              ((thickness - 0) * (100 - 0)) / (sensorData.inputthickness - 0) +
              0;
            setLimitValue(limitvalue);
          } else {
            console.error("Input thickness is not a valid number.");
          }
        } else {
          console.log("Sensor data not found for id:", id);
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
    // console.log(value);
  };

  const handleSelectionChange = (selectedValue) => {
    setSelectedValue(selectedValue);
    // alert(`Selected value: ${selectedValue}`);
  };

  const handleSubmit = async () => {
    if (!selectedValue || !userInput) {
      // Show error alert
      setErrorAlert(true);
      // Hide the error alert after 3 seconds
      setTimeout(() => {
        setErrorAlert(false);
      }, 5000);
      return; // Exit early
    }

    const url = `${baseUrl}/setlimit?device_name=${id}&time=${selectedValue}&inputthickness=${userInput}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          device_name: id,
          inputthickness: userInput,
          time: selectedValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      // console.log(result);

      // Show the success alert after successful API call
      setShowAlert(true);
      // Hide the success alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const epochTime = new Date(TimeData).getTime() / 1000;
  const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
  const sensorseconds = sensorData ? sensorData.time : "N/A";
  let finialtime = epochTime + sensorseconds * 60 + 300;
  let isActive = currentTimeInSeconds <= finialtime;

  console.log("status,", isActive);

  const calculatePercentage = signal ? Math.min(Math.max(((signal - 0) * (100 - 0)) / (32 - 0), 0), 100).toFixed(2) : "Loading...";
  const batteryPercentage = batterylevel ? `${Math.min(Math.max(((batterylevel - 265) * (100 - 0)) / (540 - 265), 0), 100).toFixed(2)}%`: "Loading...";

  return (
    <div>
      <div className="flex items-end justify-end mb-1">
        <div
          className="text-base font-bold mr-1"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div
            className={`blink-${isActive ? "green" : "red"}`}
            style={{ marginBottom: "2px" }}
          >
            {id ? (
              <>
                <IoAlertCircleSharp
                  className={`text-lg inline-block align-middle ${
                    isActive ? "text-green-500" : "text-red-500"
                  }`}
                />
                <span className="align-middle">&nbsp;{`${id}`}</span>
              </>
            ) : (
              "Loading..."
            )}
            &nbsp;
          </div>
          <div style={{ marginLeft: "auto" }}>
            <span style={{ color: "black", fontStyle: "normal" }}>
              Last Updated:{" "}
            </span>
            <span style={{ color: isActive ? "green" : "red" }}>
              {TimeData ? `${TimeData}` : "Loading..."}
              &nbsp;
            </span>
          </div>
        </div>

        <Carddrop
          deviceTime={deviceTime}
          deviceData={deviceData}
          onSelectionChange={handleSelectionChange}
        />

        <form class="items-center ml-4">
          <label for="simple-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                />
              </svg>
            </div>
            <input
              type="number"
              className=" h-9  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Thickness"
              value={userInput}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <button
          type="button"
          class="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {showAlert && (
          <div
            className="fixed top-16 right-0 z-50 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow"
            role="alert"
          >
            <div className="flex">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-blue-100 rounded-lg">
                <GoCheckCircle />
              </div>
              <div className="ms-3 text-sm font-normal">
                <span className="mb-1 text-md font-bold text-green-500">
                  Success
                </span>
                <div className="mb-2 text-md text-black font-bold">
                  Your preferred thickness has been updated successfully!
                </div>
              </div>
              <button
                type="button"
                className="-mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-i inline-flex h-8 w-8"
                aria-label="Close"
                onClick={() => setShowAlert(false)}
              >
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {errorAlert && (
          <div
            className="fixed top-16 right-0 z-50 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow"
            role="alert"
          >
            <div className="flex">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-200 rounded-lg">
                <IoWarningOutline />{" "}
              </div>
              <div className="ms-3 text-sm font-normal">
                <span className="mb-1 text-md font-bold text-red-500">
                  Error
                </span>
                <div className="mb-2 text-md text-black font-bold">
                  Please fill in all the fields.
                </div>
              </div>
              <button
                type="button"
                className="ml-3 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
                aria-label="Close"
                onClick={() => setErrorAlert(false)}
              >
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {errorAlert1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="absolute inset-0 bg-black opacity-25"></div>
          <div className="relative z-10 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow">
            <div className="flex">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-200 rounded-lg">
                <IoWarningOutline />
              </div>
              <div className="ms-3 text-sm font-normal">
                <span className="mb-1 text-md font-bold text-red-500">
                  ER01
                </span>
                <div className="mb-2 text-md text-black font-bold">
                  Electronics modules and ceramics haven't been set properly or
                  Check the fittings properly to get the signal.
                </div>
              </div>
              <button
                type="button"
                className="ml-3 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 z-20"
                aria-label="Close"
                onClick={() => setErrorAlert1(false)}
              >
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {errorAlert2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="absolute inset-0 bg-black opacity-25"></div>
          <div className="relative z-10 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow">
            <div className="flex">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-200 rounded-lg">
                <IoWarningOutline />
              </div>
              <div className="ms-3 text-sm font-normal">
                <span className="mb-1 text-md font-bold text-red-500">
                  ER02
                </span>
                <div className="mb-2 text-md text-black font-bold">
                  Unexpected error cause the FGA to crash!!!
                </div>
              </div>
              <button
                type="button"
                className="ml-3 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 z-20"
                aria-label="Close"
                onClick={() => setErrorAlert2(false)}
              >
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {errorAlert3 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="absolute inset-0 bg-transparent opacity-25"></div>
          <div className="relative z-10 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow">
            <div className="flex">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-200 rounded-lg">
                <IoWarningOutline />
              </div>
              <div className="ms-3 text-sm font-normal">
                <span className="mb-1 text-md font-bold text-red-500">
                  ER03
                </span>
                <div className="mb-2 text-md text-black font-bold">
                  Overlimit Warning!!! ⚠️
                </div>
              </div>
              <button
                type="button"
                className="ml-3 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 z-20"
                aria-label="Close"
                onClick={() => setErrorAlert3(false)}
              >
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-12">
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
                {/* <FaSortAmountUpAlt /> */}
                <svg fill="currentColor" viewBox="2 2 16 16">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 21 21"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M19.875 12c.621 0 1.125 .512 1.125 1.143v5.714c0 .631 -.504 1.143 -1.125 1.143h-15.875a1 1 0 0 1 -1 -1v-5.857c0 -.631 .504 -1.143 1.125 -1.143h15.75z"></path>
                    <path d="M9 12v2"></path>
                    <path d="M6 12v3"></path>
                    <path d="M12 12v3"></path>
                    <path d="M18 12v3"></path>
                    <path d="M15 12v2"></path>
                    <path d="M3 3v4"></path>
                    <path d="M3 5h18"></path>
                    <path d="M21 3v4"></path>
                  </svg>
                </svg>
              </svg>
            </div>

            {/* Conditional rendering based on the value of thickness */}
            <div className={``}>
              {/* {console.log("Current thickness:", thickness)} */}
              {limitvalue > 108 && limitvalue < 9998 ? (
                <>
                  <h5 className="flex items-center justify-center">⚠️</h5>
                  <p className="text-lg sm:text-2xl font-bold text-white mt-1">
                    Overlimit <br />{" "}
                    <span className="text-lg sm:text-2xl font-bold text-white  flex items-center justify-center">
                      ER03
                    </span>{" "}
                  </p>
                </>
              ) : thickness === "0" ? (
                <>
                  <h5 className="flex items-center justify-center">⚠️</h5>
                  <p className="text-lg sm:text-2xl font-bold text-white mt-1">
                    Fitting problem <br />{" "}
                    <span className="text-lg sm:text-2xl font-bold text-white  flex items-center justify-center">
                      ER01
                    </span>{" "}
                  </p>
                </>
              ) : thickness === "9999" ? (
                <>
                  <h5 className="flex items-center justify-center">⚠️</h5>
                  <p className="text-lg sm:text-2xl font-bold text-white mt-1">
                    FPGA Error <br />{" "}
                    <span className="text-lg sm:text-2xl font-bold text-white  flex items-center justify-center">
                      ER02
                    </span>{" "}
                  </p>
                </>
              ) : null}
            </div>

            <div className="flex-grow"></div>

            {/* Displaying the thickness value */}
            <div className="text-center text-sm font-medium text-gray-600 ">
              <h3 className="font-bold text-white">Thickness</h3>
              {limitvalue !== null ? (
                <>
                  <p className="text-xl sm:text-2xl font-bold text-white mt-1">
                    {limitvalue.toFixed(2)}%
                  </p>
                  {/* {console.log("limit value: ", limitvalue)} */}
                </>
              ) : (
                <p className="text-lg sm:text-2xl font-bold text-white mt-1">
                  Loading...
                </p>
              )}
            </div>

            <div className="flex-grow"></div>

            {/* Displaying the thickness and input thickness */}
            <p className="text-lg sm:text-2xl font-bold text-white mt-2 sm:mt-0">
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

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-3 sm:grid-cols-1 mb-5 ">
        <div
          className={`flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4 sm:flex-row border-2 ${
            devicetemp &&
            (parseInt(devicetemp) < 0 || parseInt(devicetemp) > 70)
              ? "border-red-700 animate-pulse border-4"
              : ""
          }`}
        >
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

        <div
          className={`flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4 sm:flex-row border-2 ${
            signal && (parseInt(signal) < 10 || parseInt(signal) > 100)
              ? "border-red-700 animate-pulse border-4"
              : ""
          }`}
        >
          <div className="p-3 mb-2 mr-4 text-red-500 bg-red-100 rounded-full sm:mb-0">
            <svg className="w-5 h-5" fill="currentColor" viewBox="-1 -2 18 18">
              <FaSignal />
            </svg>
          </div>

          <div className="text-sm font-medium text-gray-600 text-center sm:text-left">
            <h5 className="font-bold  text-black">Signal Strength</h5>
            <p className="text-2xl font-bold text-black mt-1">
              {/* {calculatePercentage ? `${calculatePercentage}` : "Loading..."} */}
              {calculatePercentage}
              {/* {signal ? ( (((signal) - 0) * (100 - 0)) / (32 - 0) ).toFixed(2) + "%" : "Loading..."} */}
            </p>
          </div>
        </div>

        <div
          className={`flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4 sm:flex-row border-2 ${
            batterylevel &&
            (parseInt(batterylevel) < 20 || parseInt(batterylevel) > 100)
              ? "border-red-700 animate-pulse border-4"
              : ""
          }`}
        >
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
              {/* {batterylevel
                ? (
                    ((batterylevel - 265) * (100 - 0)) / (540 - 265) +
                    0
                  ).toFixed(2) + "%"
                : "Loading..."} */}
              {/* {batterylevel ? `${batterylevel}%` : "Loading..."} */}
              {batteryPercentage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rcards;
