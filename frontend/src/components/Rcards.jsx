import React, { useState, useEffect } from "react";
import { FaTemperatureLow, FaSignal, FaSortAmountUpAlt } from "react-icons/fa";
import { PiBatteryFullFill } from "react-icons/pi";
import Carddrop from "./Carddrop";
import CUMI from "../img/CUMI.png";
import PropTypes from "prop-types";

const circle = {
  height: "25px",
  width: "25px",
  borderRadius: "50%",
  display: "inline-block",
};

const Rcards = ({ modelData }) => {
  const [id, setid] = useState(null);
  const [thickness, setThickness] = useState(null);
  const [devicetemp, setDevicetemp] = useState(null);
  const [signal, setSignal] = useState(null);
  const [batterylevel, setBattery] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (modelData) {
      setid(modelData.id);
      setThickness(modelData.thickness);
      setDevicetemp(modelData.devicetemp);
      setSignal(modelData.signal);
      setBattery(modelData.batterylevel);
    }
  }, [modelData]);

  Rcards.propTypes = {
    modelData: PropTypes.shape({
      id: PropTypes.string,
      thickness: PropTypes.string,
      devicetemp: PropTypes.string,
      signal: PropTypes.string,
      batterylevel: PropTypes.string
    })
  };

  const getColorBasedOnPercentage = (percentage) => {
    if (percentage >= 75) {
      return "lightgreen";
    } else if (percentage >= 50) {
      return "orange";
    } else {
      return "red";
    }
  };

  const backgroundColor = getColorBasedOnPercentage(thickness);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex items-end justify-end">
        <p className="mr-3 font-bold text-base mb-1">
          {id ? `${id}` : "Loading..."}
        </p>
        <Carddrop />
        <input
          type="text"
          className="mt-4 ml-3 rounded-lg w-[20%] h-9"
          placeholder="Thickness"
        />
        <button
          type="button"
          className="mr-3 ml-3 inline-block w-20 h-9 font-bold text-center bg-gradient-to-tl from-purple-700 to-pink-500 uppercase align-middle transition-all rounded-lg cursor-pointer leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs text-white"
        >
          Submit
        </button>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div className="flex">
          <img src={CUMI} className="w-44" />
          <div className="mt-3 ml-6">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ ...circle, backgroundColor: "Green" }}></div>
              <p
                style={{ marginLeft: "5px", marginTop: "10px" }}
                className="font-bold mt-3"
              >
                &gt;75%
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
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
          <div className={`flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md mt-3 mb-4 sm:flex-row`} style={{ backgroundColor }}>
            <div className="p-3 mb-2 mr-4 text-blue-500 bg-blue-100 rounded-full sm:mb-0">
              <svg className="w-6 h-6" fill="currentColor" viewBox="-1 -2 18 18">
                <FaSortAmountUpAlt />
              </svg>
            </div>
            <div className="text-sm font-medium text-gray-600 text-center sm:text-left">
              <h5 className="font-bold text-black">Thickness</h5>
              <p className="text-2xl font-bold text-black mt-1">
                {thickness ? `${thickness}%` : "Loading..."}
              </p>
            </div>
            <div className="flex-grow"></div>{" "}
            {/* This will make the next element take up the remaining space */}
            <p className="text-2xl font-bold text-black mt-2 sm:mt-0">
              15.35/77 mm
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
