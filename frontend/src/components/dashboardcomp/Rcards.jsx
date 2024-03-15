import React, { useState, useEffect } from "react";
import { FaTemperatureLow, FaSignal, FaSortAmountUpAlt } from "react-icons/fa";
import { PiBatteryFullFill } from "react-icons/pi";
import Carddrop from "../Carddrop";
import CUMI from "../../img/CUMI.png";
import "../css/rcard.css";
import { GoCheckCircle } from "react-icons/go";
import { MdAdd } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";

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
  const [sensorData, setSensorData] = useState(null);
  const [limitvalue, setLimitValue] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [TimeData, setTimeData] = useState(null);
  const [status, setStatus] = useState("");
  const [errorAlert1, setErrorAlert1] = useState(false); 
  const [errorAlert2, setErrorAlert2] = useState(false);

  useEffect(() => {
    if (deviceData) {
      setId(deviceData.id);
      setThickness(deviceData.thickness);
      setDevicetemp(deviceData.devicetemp);
      setSignal(deviceData.signal);
      setBattery(deviceData.batterylevel);
      setTimeData(new Date(deviceData.createdAt));
    }
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

  const getColorBasedOnPercentage = (limitvalue) => {
    if (limitvalue > 100) {
      return "lightblue";
    } else if (limitvalue >= 75) {
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
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const sensorData = data.find((sensor) => sensor.id === id);
        setSensorData(sensorData);

        if (sensorData) {
          function getCurrentIST(date) {
            const options = {
              timeZone: "Asia/Kolkata",
              hour12: true,
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              year: "numeric",
              month: "numeric",
              day: "numeric",
            };
            return date.toLocaleString("en-IN", options);
          }

          const currentTime = getCurrentIST(new Date());
          const dbcreatedtime = new Date(sensorData.createdAt); // Convert UTC string to Date object
          dbcreatedtime.setHours(dbcreatedtime.getHours() + 5); // Convert to IST
          dbcreatedtime.setMinutes(dbcreatedtime.getMinutes() + 30); // Add 30 minutes for IST

          const userInputMinutes = parseInt(sensorData.time);
          const totalMinutes =
            dbcreatedtime.getTime() / (1000 * 60) + userInputMinutes; // Convert milliseconds to minutes and add user input

          const updatedTime = new Date(dbcreatedtime); // Create a new Date object with the same date
          updatedTime.setMinutes(totalMinutes); // Set the total minutes

          const formattedTime = getCurrentIST(updatedTime);

          console.log("Current Time in IST:", currentTime);
          console.log("dbCreated Time in UTC:", sensorData.createdAt);
          console.log("Userinput Time:", sensorData.time);
          console.log(
            "12hrs of dbtime in UTC:",
            dbcreatedtime.toLocaleString()
          );
          console.log(
            "Updated Time after adding sensorData.time in UTC:",
            updatedTime.toLocaleString()
          );

          // Convert updatedTime directly to IST using getCurrentIST function
          const updatedTimeIST = getCurrentIST(updatedTime);
          console.log("Updated Time after converting to IST:", updatedTimeIST);

          if (formattedTime <= currentTime) {
            console.log("Active");
            setStatus("Active");
          } else {
            console.log("In-Active");
            setStatus("In-Active");
          }

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
    console.log(value);
  };

  const handleSelectionChange = (selectedValue) => {
    setSelectedValue(selectedValue);
    alert(`Selected value: ${selectedValue}`);
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

    let encodedSelectedValue = encodeURIComponent(selectedValue);
    if ((encodedSelectedValue = "1 Min")) {
      encodedSelectedValue = "1";
    } else if ((encodedSelectedValue = "5 Min")) {
      encodedSelectedValue = "5";
    } else if ((encodedSelectedValue = "1 Day")) {
      encodedSelectedValue = "1440";
    } else if ((encodedSelectedValue = "7 Days")) {
      encodedSelectedValue = "10080";
    } else if ((encodedSelectedValue = "15 Days")) {
      encodedSelectedValue = "21600";
    }

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

  return (
    <div >
      <div className="flex items-end justify-end">
        {/* <p className="mr-3 font-bold text-base mb-1">
          {id ? `${id}` : "Loading..."} */}

        {/* <div>Sensor Status: {status}</div> */}
        <div className="text-xs font-bold mr-3 mb-2">
            Last Updated Time:{" "}
            {TimeData
              ? new Date(TimeData).toLocaleString("en-US", {
                  timeZone: "Asia/Kolkata",
                })
              : "Loading..."}
          </div>
        {/* </p>  */}

        <Carddrop
          deviceData={deviceData}
          onSelectionChange={handleSelectionChange}
        />

        {/* <input
          type="number"
          className="mt-4 ml-3 rounded-lg w-[20%] h-9  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Thickness"
          value={userInput}
          onChange={handleInputChange}
        /> */}

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
          {/* <MdAdd className=" ml-2 w-5 h-auto" /> */}
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
                <span className="mb-1 text-sm font-semibold text-green-500">
                  Success
                </span>
                <div className="mb-2 text-sm font-normal">
                  Your preferred thickness has been updated successfully!
                </div>
              </div>
              <button
                type="button"
                className="-mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
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
                <span className="mb-1 text-sm font-semibold text-red-500">
                  Error
                </span>
                <div className="mb-2 text-sm font-normal">
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
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
          <div className="flex">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-200 rounded-lg">
              <IoWarningOutline />
            </div>
            <div className="ms-3 text-sm font-normal">
              <span className="mb-1 text-sm font-semibold text-red-500">ER01</span>
              <div className="mb-2 text-sm font-normal">
                Electronics modules and ceramics haven't been set properly or Check the fittings properly to get the signal.
              </div>
            </div>
            <button
              type="button"
              className="ml-3 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
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
      )}

{errorAlert2 && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
          <div className="flex">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-200 rounded-lg">
              <IoWarningOutline />
            </div>
            <div className="ms-3 text-sm font-normal">
              <span className="mb-1 text-sm font-semibold text-red-500">ER02</span>
              <div className="mb-2 text-sm font-normal">
                Unexpected error cause the FGA to crash!!!
              </div>
            </div>
            <button
              type="button"
              className="ml-3 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
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
      )}

      <div class="grid grid-cols-3 gap-4">
        {/* <div className="flex flex-col lg:flex-row">
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
        </div> */}

        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4 sm:flex-row">
          <div className="flex items-center">
            <div className="flex flex-col mr-2">
              {/* Container for dots */}
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-300 mr-1 "></div>
                <span className="text-sm font-bold">&gt;75%</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-[#ED7014] mr-1"></div>
                <span className="text-sm font-bold sm:text-base lg:text-sm xl:text-xs">
                  75 - 50
                </span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-red-600 mr-1"></div>
                <span className="text-sm font-bold">&lt;50%</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-auto text-right">
            <p className="font-bold text-sm text-black mb-2">
              Device id: {id ? `${id}` : "Loading..."}
            </p>
            {/* <p className="font-bold text-sm text-black mb-2">
              Last updated Time:
            </p>
            <div className="text-sm font-bold text-black">
              {TimeData ? (
                <span>
                  {new Date(TimeData).toLocaleString("en-US", {
                    timeZone: "Asia/Kolkata",
                  })}
                </span>
              ) : (
                "Loading..."
              )}
            </div> */}
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
