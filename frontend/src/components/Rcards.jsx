import React from "react";
import { FaTemperatureLow, FaSignal, FaSortAmountUpAlt } from "react-icons/fa";
import { PiBatteryFullFill } from "react-icons/pi";
const Rcards = () => {
  return (
    <div>
      {/* <div className="container px-6 mx-auto grid mr-3 bt-3 ">
      <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-xs mr-4 w-full">
  <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
      ></path>
    </svg>
  </div>
  <div>
    <p className="mb-2 text-sm font-medium text-gray-600">
      Total Users
    </p>
    <p className="text-lg font-semibold text-gray-700">
      19238
    </p>
  </div>
</div> */}
<div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-md mr-4 mt-3 mb-4">
          <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 19 19">
              <FaSortAmountUpAlt />
            </svg>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">Thickness</p>
            <p className="text-lg font-bold text-gray-700">37.35%</p>
          </div>
          {/* Add the new paragraph for the additional text */}
          <p className="text-lg font-bold text-gray-600 ml-24 mt-2">
            15.35/77 mm
          </p>
        </div>

      <div className="grid gap-1 md:grid-cols-3 xl:grid-cols-3 mb-5">
        {/* <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-md mr-4">
          <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 19 19">
              <FaTemperatureLow />
            </svg>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">Thickness</p>
            <p className="text-lg font-bold text-gray-700">37.35%</p>
          </div>
          <p className="text-lg font-bold text-gray-600 ml-24 mt-2">
            15.35/77 mm
          </p>
        </div> */}

        <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-md mr-4 mt-3">
          <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 19 19">
              <FaTemperatureLow />
            </svg>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">
              Device Temp
            </p>
            <p className="text-lg font-bold text-gray-700">37</p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-md mr-4 mt-3">
          <div className="p-3 mr-4 text-red-500 bg-red-100 rounded-full">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <FaSignal />
            </svg>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">
              Signal Strength
            </p>
            <p className="text-lg font-bold text-gray-700">63</p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-md mr-4 mt-3">
          <div className="p-3 mr-4 text-yellow-500 bg-yellow-100 rounded-full">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <PiBatteryFullFill />
            </svg>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">
              Battery Level
            </p>
            <p className="text-lg font-bold text-gray-700">82%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rcards;
