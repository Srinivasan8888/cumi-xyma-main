import React, { useState, useEffect, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import Toggle from "../components/Toggle";
import CircularProgress from '@mui/material/CircularProgress';

export default function Combobox({ onChartData }) {
  const [infoGraph, setInfoGraph] = useState([]);
  const [selectedCylinder, setSelectedCylinder] = useState(null);
  const [batteryEnabled, setBatteryEnabled] = useState(false);
  const [thicknessEnabled, setThicknessEnabled] = useState(false);
  const [selectedId, setSelectedId] = useState("xy001"); // Initialize with default value
  const [valuebat, setValueBat] = useState("true");
  const [valuethick, setValueThick] = useState("true");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/sensor/data");
      let infoVal = await response.json();
      infoVal = infoVal.reverse();
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
    console.log("Selected Cylinder ID:", cylinderId);
  };

  useEffect(() => {
    const apidate = async () => {
      if (selectedId !== null) {
        try {
          const response = await fetch(
            `http://localhost:4000/sensor/getdata/${selectedId}?battery=${valuebat}&thickness=${valuethick}`
          );
          const data = await response.json();
          console.log("Data:", data);
          onChartData(data); // Pass chart data to parent component
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    apidate();
  }, [selectedId, valuebat, valuethick]);

  const handleBatteryToggle = () => {
    setBatteryEnabled(!batteryEnabled);
    setValueBat(batteryEnabled ? "true" : "false");
  };

  const handleThicknessToggle = () => {
    setThicknessEnabled(!thicknessEnabled);
    setValueThick(thicknessEnabled ? "true" : "false");
  };

  return (
    <div className="relative flex justify-center items-center mt-24 sm:mt-0 z-20">
      <div className="relative w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-44">
        <Listbox value={selectedCylinder} onChange={handleCylinderChange}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-center text-xs md:text-sm font-medium text-gray-700 mb-2">
                Select Device
              </Listbox.Label>
              <div className="relative">
                <span className="inline-block w-full">
                  <Listbox.Button className="flex justify-between items-center pl-2 md:pl-3 py-1 md:py-2 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 relative border shadow-sm border-gray-300 rounded text-gray-800">
                    <span className="truncate">{selectedCylinder}</span>
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
                                  active ? "text-white" : "text-indigo-600"
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
                                active ? "font-semibold" : "font-normal"
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

      <div className="flex items-center ml-5 mt-5 mb-4">
        <span className="mr-4">Battery</span>
        <Toggle onToggle={handleBatteryToggle} />

        <span className="mr-4 ml-8">Thickness</span>
        <Toggle onToggle={handleThicknessToggle} />
      </div>
    </div>
  );
}
