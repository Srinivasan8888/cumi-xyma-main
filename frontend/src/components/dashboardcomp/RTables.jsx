import React, { useState, useEffect } from "react";

const RTables = ({ deviceNumber }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/sensor/table/${deviceNumber}`
        );
        const data = await response.json();
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
                const updatedAt = new Date(data.updatedAt);
                const date = updatedAt.toISOString().split('T')[0];

                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="font-md text-black py-4 px-6 hidden sm:table-cell">{(((data.thickness - 0) * (100 - 0)) / (data.inputthickness - 0)).toFixed(2)}</td>
                    <td className="font-md text-black py-4 px-6">{data.batterylevel}%</td>
                    <td className="font-md text-black py-4 px-6">{data.devicetemp}°C</td>
                    <td className="font-md text-black py-4 px-6">{data.signal}%</td>
                    <td className="font-md text-black py-4 px-6">{date}</td>
                  </tr>
                );
              })}{" "}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RTables;
