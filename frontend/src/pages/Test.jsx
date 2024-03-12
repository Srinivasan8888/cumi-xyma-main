import React, { useState } from 'react';
import { MdOutlineDateRange } from "react-icons/md";

const Test = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === 'startdate') {
      setStartDate(value);
    } else if (name === 'enddate') {
      setEndDate(value);
    }
  };

  const handleSubmit = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
    } else {
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);
    }
  };

  return (
    <div className="mx-auto max-w-md mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Select Dates:</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold">Start Date</label>
          <input
            type="date"
            id="startdate"
            name="startdate"
            onChange={handleDateChange}
            value={startDate}
            className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="relative">
          <label className="block font-semibold">End Date</label>
          <div className="flex items-center">
            <input
              type="date"
              id="enddate"
              name="enddate"
              onChange={handleDateChange}
              value={endDate}
              className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pr-8"
            />
            <MdOutlineDateRange className="absolute w-7 h-7  right-7 top-1 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <button onClick={handleSubmit} className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Test;
