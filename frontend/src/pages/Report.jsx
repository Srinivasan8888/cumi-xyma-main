import React, { useState, useRef, useEffect, Fragment } from "react";
import Sidebars from "../components/Sidebar/Sidebars";
// import Dropdownbox from "../components/Dropdownbox";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { MdOutlineDateRange } from "react-icons/md";
import "./css/Report.css";
import * as XLSX from "xlsx"; 

const Report = () => {
  const [selectedId, setSelectedId] = useState("xy001");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);
  const [infoGraph, setInfoGraph] = useState([]);
  const [selectedCylinder, setSelectedCylinder] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/sensor/data");
      let infoVal = await response.json();
      infoVal = infoVal;
      setInfoGraph(infoVal);
      if (infoVal.length > 0) {
        setSelectedCylinder(infoVal[0].id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   const apidate = async () => {
  //     if (selectedId !== null) {
  //       try {
  //         const response = await fetch(
  //           `http://localhost:4000/sensor/dataexcel?id=${selectedId}&date1=${startDate}T00:00:00Z&date2=${endDate}T23:59:59Z`
  //         );
  //         const data = await response.json();
  //         console.log("Data:", data);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     }
  //   };

  //   apidate();
  //   const intervalId = setInterval(apidate, 1000);
  //   return () => clearInterval(intervalId); 
  // });

  const handleCylinderChange = (cylinderId) => {
    setSelectedCylinder(cylinderId);
    setSelectedId(cylinderId);
    console.log("Selected Cylinder ID:", cylinderId);
  };
  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === "startdate") {
      setStartDate(value);
    } else if (name === "enddate") {
      setEndDate(value);
    }
  };

  const handleIconClick = (ref) => {
    ref.current.click();
  };

  const handleSubmit = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
    } else {
      const apidate = async () => {
        if (selectedId !== null) {
          try {
            const response = await fetch(
              `http://localhost:4000/sensor/dataexcel?id=${selectedId}&date1=${startDate}T00:00:00Z&date2=${endDate}T23:59:59Z`
            );
            const data = await response.json();
            
            const modifiedData = data.map(obj => {
              const { _id, __v, updatedAt, ...rest } = obj;
              return rest;
            });
  
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(modifiedData);
            XLSX.utils.book_append_sheet(wb, ws, "Data");
            XLSX.writeFile(wb, `${selectedId} report.xlsx`);
            console.log("Data:", modifiedData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      };
  
      apidate();
      // console.log("Start Date:", startDate);
      // console.log("End Date:", endDate);
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <Sidebars />
      <div className="p-4 sm:ml-64 h-full w-full">
        <section className="bg-white">
          <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </aside>

            <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
              <div className="max-w-xl lg:max-w-3xl">
                <a className="block text-blue-600">
                  <span className="sr-only">Home</span>
                  <svg
                    className="h-8 sm:h-10"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Reports Page 📝
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Select from two different dates!
                </p>

                {/* <Dropdownbox /> */}

                <div className="relative flex justify-start  mt-24 sm:mt-0 z-20">
                  <div className="relative w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-44">
                    <Listbox
                      value={selectedCylinder}
                      onChange={handleCylinderChange}
                    >
                      {({ open }) => (
                        <>
                          <Listbox.Label className="block text-center text-xs md:text-sm font-medium text-gray-700 mb-2">
                            Select Device
                          </Listbox.Label>
                          <div className="relative">
                            <span className="inline-block w-full">
                              <Listbox.Button className="flex justify-between items-center pl-2 md:pl-3 py-1 md:py-2 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 relative border shadow-sm border-gray-300 rounded text-gray-800">
                                <span className="truncate">
                                  {selectedCylinder}
                                </span>
                                {open ? (
                                  <ChevronUpIcon
                                    className="h-4 md:h-5 w-4 md:w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <ChevronDownIcon
                                    className="h-4 md:h-5 w-4 md:w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                )}
                              </Listbox.Button>
                            </span>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 pl-0 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {infoGraph.map((cylinderItem) => (
                                  <Listbox.Option
                                    key={cylinderItem.id}
                                    value={cylinderItem.id}
                                  >
                                    {({ selected, active }) => (
                                      <div
                                        className={`${
                                          active
                                            ? "text-white bg-indigo-600"
                                            : "text-gray-900"
                                        } cursor-default select-none relative py-2 md:pl-0`}
                                      >
                                        {selected && (
                                          <span
                                            className={`${
                                              active
                                                ? "text-white"
                                                : "text-indigo-600"
                                            } absolute inset-y-0 left-0 flex items-center pl-1 text-amber-600`}
                                          >
                                            <CheckIcon
                                              className="h-4 mt-1 md:h-5 w-4 md:w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        )}
                                        <span
                                          className={`text-xs md:text-base ${
                                            active
                                              ? "font-semibold"
                                              : "font-normal"
                                          } pl-8`}
                                        >
                                          {cylinderItem.id}
                                        </span>
                                      </div>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3 relative">
                    <label
                      htmlFor="StartDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startdate"
                      name="startdate"
                      onChange={handleDateChange}
                      value={startDate}
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm pl-8"
                      ref={startDateInputRef}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 relative">
                    <label
                      htmlFor="EndDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      id="enddate"
                      name="enddate"
                      onChange={handleDateChange}
                      value={endDate}
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-black shadow-sm pl-8"
                      ref={endDateInputRef}
                    />
                  </div>

                  <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                      onClick={handleSubmit}
                      className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    >
                      Download The Excel
                    </button>

                    <button
                      onClick={handleSubmit}
                      className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    >
                      Download All Device Date
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Report;
