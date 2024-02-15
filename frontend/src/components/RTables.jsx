import React, { useState, useEffect } from "react";

const RTables = ({ deviceNumber }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/sensor/table/xy00${deviceNumber}`
        );
        const data = await response.json();
        console.log(data);
        setTableData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, [deviceNumber]);

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <div className="max-h-[445px] overflow-y-auto ">
        <div className="shadow-lg sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
              <tr>
                <th className="py-3 px-6 hidden sm:table-cell">Thickness</th>
                <th className="py-3 px-6">Battery Level</th>
                <th className="py-3 px-6">Device Temp</th>
                <th className="py-3 px-6">Signal Strength</th>
                <th className="py-3 px-6">Time</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-4 px-6 hidden sm:table-cell">
                    {data.thickness}
                  </td>
                  <td className="py-4 px-6">{data.batterylevel}</td>
                  <td className="py-4 px-6">{data.devicetemp}</td>
                  <td className="py-4 px-6">{data.signal}</td>
                  <td className="py-4 px-6">{data.updatedAt}</td>
                </tr>
              ))}{" "}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RTables;
