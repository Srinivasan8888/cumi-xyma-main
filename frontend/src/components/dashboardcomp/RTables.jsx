import React, { useState, useEffect } from "react";
import { baseUrl } from "../config";

const RTables = ({ deviceNumber }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}table/${deviceNumber}`
        );
        const data = await response.json();

        setTableData(data);
        console.log("rtable", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, [deviceNumber]);

  return (
    <div className="overflow-x-auto shadow-2xl rounded-lg">
      <div className="max-h-[445px] overflow-y-auto ">
        <div className="shadow-lg sm:rounded-lg">
          <table className="w-full text-sm text-left text-black dark:text-gray-400">
            <thead className="text-xs text-back font-bold uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
              <tr>
                <th className="py-3 px-6 hidden sm:table-cell">Thickness</th>
                <th className="py-3 px-6">Battery Level</th>
                <th className="py-3 px-6">Device Temp</th>
                <th className="py-3 px-6">Signal Strength</th>
                <th className="py-3 px-6">Time</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => {
                const timestamp = (data.timestamp);
                
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="font-md text-black py-4 px-6 hidden sm:table-cell">
                      {/* {(
                        ((data.thickness - 0) * (100 - 0)) /
                        (data.inputthickness - 0)
                      ).toFixed(2)} */}
                       {data.thickness}
                    </td>
                    <td className="font-md text-black py-4 px-6">
                      {data.battery_status}%
                    </td>
                    <td className="font-md text-black py-4 px-6">
                      {data.device_status}°C
                    </td>
                    <td className="font-md text-black py-4 px-6">
                      {data.signal_strength}%
                    </td>
                    <td className="font-md text-black py-4 px-6">
                      {data.timestamp}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RTables;
