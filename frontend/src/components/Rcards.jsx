import React from "react";
import { FaTemperatureLow, FaSignal, FaSortAmountUpAlt } from "react-icons/fa";
import { PiBatteryFullFill } from "react-icons/pi";

const Rcards = () => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md mt-3 mb-4 sm:flex-row">
        <div className="p-3 mb-2 mr-4 text-blue-500 bg-blue-100 rounded-full sm:mb-0">
          <svg className="w-6 h-6" fill="currentColor" viewBox="-1 -2 18 18">
            <FaSortAmountUpAlt />
          </svg>
        </div>
        <div className="mb-2 text-sm font-medium text-gray-600 text-center sm:text-left">
          <p>Thickness</p>
          <p className="text-lg font-bold text-gray-700 mt-1">37.35%</p>
          <p className="text-lg font-bold text-gray-600 mt-2 sm:mt-0">15.35/77 mm</p>
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
            <p>Device Temp</p>
            <p className="text-lg font-bold text-gray-700 mt-1">37</p>
          </div>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4 sm:flex-row">
          <div className="p-3 mb-2 mr-4 text-red-500 bg-red-100 rounded-full sm:mb-0">
            <svg className="w-5 h-5" fill="currentColor" viewBox="-1 -2 18 18">
              <FaSignal />
            </svg>
          </div>
          <div className="text-sm font-medium text-gray-600 text-center sm:text-left">
            <p>Signal Strength</p>
            <p className="text-lg font-bold text-gray-700 mt-1">63</p>
          </div>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4 sm:flex-row">
          <div className="p-3 mb-2 mr-4 text-yellow-500 bg-yellow-100 rounded-full sm:mb-0">
            <svg className="w-6 h-6 items-center" fill="currentColor" viewBox="-1 -2 18 18">
              <PiBatteryFullFill />
            </svg>
          </div>
          <div className="text-sm font-medium text-gray-600 text-center sm:text-left">
            <p>Battery Level</p>
            <p className="text-lg font-bold text-gray-700 mt-1">82%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rcards;
