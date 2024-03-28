import React, { useState, useRef, useEffect, Fragment } from "react";
import Sidebars from "../components/Sidebar/Sidebars";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { MdOutlineDateRange } from "react-icons/md";
import "./css/Report.css";
import * as XLSX from "xlsx"; 
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import productimg from "../img/cumi_product.png"
import xymaimg from '../img/logo.png'
import coverImg from '../img/pdfcover.jpg'
import disclaimerPage from '../img/disclaimerPage.jpg'
import Chart from 'chart.js/auto';
import { baseUrl } from "../components/config";

const Report = () => {
  const [selectedId, setSelectedId] = useState("XY00001");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);
  const [infoGraph, setInfoGraph] = useState([]);
  const [selectedCylinder, setSelectedCylinder] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/data`);
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

  const handleCylinderChange = (cylinderId) => {
    setSelectedCylinder(cylinderId);
    setSelectedId(cylinderId);
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === "startdate") {
      setStartDate(value);
    } else if (name === "enddate") {
      setEndDate(value);
    }
  };

  
  
  
  
  
  


  const pdfSubmit = (filteredData) => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
    } else {
      try {
        const doc = new jsPDF();
        const logo = xymaimg;
        const cover = coverImg;
        const disclaimer = disclaimerPage;
  
        doc.addImage(cover, 'JPG', 0, 0, 210, 297);
        doc.addPage();
        doc.addImage(logo, 'PNG', 10, 10, 40, 20);
  
        doc.autoTable({
          head: [['s.no','id', 'thickness', 'devicetemp', 'signal', 'batterylevel', 'createdAt']],
          body: filteredData.map(({ id, thickness, devicetemp, signal, batterylevel, createdAt }, index) => {
            return [index + 1, id, thickness, devicetemp, signal, batterylevel, createdAt];
          }),
          startY: 40,
          headerStyles: {
            fillColor: [222, 121, 13]
          }
        });
        doc.addPage();
        doc.addImage(logo, 'PNG', 10, 10, 40, 20);
        doc.addImage(disclaimer, 'PNG', 0, 50, 210, 250);
        doc.save('sensor_reports.pdf');
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };
  

  const handleSubmit = () => {
    if (!startDate || !endDate) {
        alert("Please select both start and end dates.");
    } else {
        const apidate = async () => {
            if (selectedId !== null) {
                try {
                    const response = await fetch(
                        `${baseUrl}/dataexcel?id=${selectedId}&date1=${startDate}T00:00:01Z&date2=${endDate}T23:59:59Z`
                    );
                    console.log(response);
                    const data = await response.json();
                    console.log(response);
                    
                    // Check if data is an array
                    if (Array.isArray(data)) {
                        const modifiedData = data.map(obj => {
                            const { _id, __v, updatedAt, ...rest } = obj;
                            return rest;
                        });

                        pdfSubmit(modifiedData);

                        const wb = XLSX.utils.book_new();
                        const ws = XLSX.utils.json_to_sheet(modifiedData);
                        XLSX.utils.book_append_sheet(wb, ws, "Data");
                        XLSX.writeFile(wb, `${selectedId} report.xlsx`);
                        console.log("Data:", modifiedData);
                    } else {
                        console.error("Data received is not an array:", data);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        apidate();
        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="  bg-[#F2F2F2] h-full w-full">
        <section className="">
          <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
              <img
                alt=""
                src={productimg}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </aside>

            <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
              <div className="max-w-xl lg:max-w-3xl">
                <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Reports Page 📝
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Select from two different dates!
                </p>

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
                      onClick={() => pdfSubmit(infoGraph)}
                      className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    >
                      Download The PDF
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
