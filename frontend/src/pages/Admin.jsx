import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const Admin = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://cumi.xyma.live/backend/rawdata`);
        const data = await response.json();
        console.log("rawdata:", data);
        setTableData(data.map(({ _id, __v, updatedAt, ...rest }) => rest));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "RawData.xlsx");
  };

  return (
    <div className="h-screen overflow-y-scroll">
      <div className="w-full flex flex-col">
        <div className="overflow-x-auto">
          <div className="shadow-2xl rounded-lg max-w-full overflow-hidden">
            <button
              onClick={downloadExcel}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download as Excel
            </button>
            <br />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                {tableData.map((data, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="font-bold text-black py-4 px-6 hidden sm:table-cell">
                      {data.thickness}
                    </td>
                    <td className="font-bold text-black py-4 px-6">
                      {data.batterylevel}%
                    </td>
                    <td className="font-bold text-black py-4 px-6">
                      {data.devicetemp}°C
                    </td>
                    <td className="font-bold text-black py-4 px-6">
                      {data.signal}%
                    </td>
                    <td className="font-bold text-black py-4 px-6">
                      {data.createdAt}
                    </td>
                  </tr>
                ))}{" "}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
