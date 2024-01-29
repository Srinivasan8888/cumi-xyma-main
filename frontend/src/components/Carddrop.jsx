import React, { useState, useEffect, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";


const fakeData = [
  { id: "5 Min" },
  { id: "1 Day" },
  { id: "7 Days" },
  { id: "30 Days" },
];

export default function Carddrop() {
  const [cylinders, setCylinders] = useState([]);
  const [selectedCylinder, setselectedCylinder] = useState(null);

  useEffect(() => {
    // For demonstration purposes, you can use the fakeData directly.
    // Replace the fakeData with your actual API call when needed.
    setCylinders(fakeData);
    if (fakeData.length > 0) {
      setselectedCylinder(fakeData[0].id);
    }
  }, []);

  return (
    <div className="relative flex justify-center items-center mt-24 sm:mt-0 z-20">
      <div className="relative w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-44">
        <Listbox as="div" value={selectedCylinder} onChange={setselectedCylinder}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-center text-xs md:text-sm font-medium text-gray-700 mb-2">
                Select Time
              </Listbox.Label>
              <div className="relative">
                <span className="inline-block w-full">
                  <Listbox.Button className="flex justify-between items-center pl-2 md:pl-3 py-1 md:py-2 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 relative border shadow-sm border-gray-300 rounded text-gray-800">
                    <span className="truncate">{selectedCylinder}</span>
                    {open ? 
                      (<ChevronUpIcon className="h-4 md:h-5 w-4 md:w-5 text-gray-400" aria-hidden="true" />)
                      : 
                      (<ChevronDownIcon className="h-4 md:h-5 w-4 md:w-5 text-gray-400" aria-hidden="true" />)
                    }
                  </Listbox.Button>
                </span>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 pl-0 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {cylinders.map((cylinderItem) => (
                      <Listbox.Option key={cylinderItem.id} value={cylinderItem.id}>
                        {({ selected, active }) => (
                          <div className={`${active ? "text-white bg-indigo-600" : "text-gray-900"} cursor-default select-none relative py-2 md:pl-0`}>
                            {selected && (
                              <span className={`${active ? "text-white" : "text-indigo-600"} absolute inset-y-0 left-0 flex items-center pl-1 text-amber-600`}>
                                <CheckIcon className="h-4 md:h-5 w-4 md:w-5" aria-hidden="true" />
                              </span>
                            )}
                            <span className={`text-xs md:text-base ${active ? "font-semibold" : "font-normal"} pl-6`}>{cylinderItem.id}</span>
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
  );
}
