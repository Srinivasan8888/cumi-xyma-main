import React from "react";
import { IoWarningOutline } from "react-icons/io5";
import { GoCheckCircle } from "react-icons/go";
import Rcards from "../components/dashboardcomp/Rcards";

const Test = () => {
  return (
    <div>
      {/* <div
        className="fixed bottom-4 right-4 z-50 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow"
        role="alert"
      >
        <div className="flex">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-200 rounded-lg">
            <IoWarningOutline />{" "}
          </div>
          <div className="ms-3 text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-red-500">
              ER01
            </span>
            <div className="mb-2 text-sm font-normal">
              Electronics modules and ceramics haven't been set properly or
              Check the fittings properly to get the signal.
            </div>
          </div>
          <button
            type="button"
            className="ml-3 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
            aria-label="Close"
            // onClick={() => setErrorAlert(false)}
          >
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <div
          className="fixed bottom-4 right-4 z-50 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow mb-44"
          role="alert"
        >
          <div className="flex">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-200 rounded-lg">
              <IoWarningOutline />{" "}
            </div>
            <div className="ms-3 text-sm font-normal">
              <span className="mb-1 text-sm font-semibold text-red-500">
                ER02
              </span>
              <div className="mb-2 text-sm font-normal">
                Unexpected Error cause the FGA to crash!!!
              </div>
            </div>
            <button
              type="button"
              className="ml-3 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
              aria-label="Close"
              // onClick={() => setErrorAlert(false)}
            >
              <span className="sr-only">Close</span>
              <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 14 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div> */}
      <Rcards/>
    </div>
  );
};

export default Test;
