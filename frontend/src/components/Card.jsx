import React, { useState, useEffect } from "react";
import Charts from "./Charts";
import Rcards from "./Rcards";
import "./css/card.css";
import RTables from "./RTables";
import Model from "./Model";

const Card = () => {
  const [deviceNumberForEffect, setDeviceNumberForEffect] = useState('1');
  const [dataForRcards, setDataForRcards] = useState('null'); // Define dataForRcards state

  useEffect(() => {
    const fetchData = async () => {
      if (deviceNumberForEffect !== null) {
        try {
          const response = await fetch(
            `http://localhost:4000/sensor/getdata/xy00${deviceNumberForEffect}`
          );
          const data = await response.json();
          setDataForRcards(data); // Set dataForRcards state
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [deviceNumberForEffect]);

  return (
    <div style={{ width: "100%" }}>
      <div className="grid gap-2 items-stretch grid-rows-2 md:grid md:grid-rows-2 sm:grid sm:grid-rows-1">
        <div className="sm:grid sm:grid-cols-1 lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 gap-2">
          <div>
            <Model setDeviceNumberForEffect={setDeviceNumberForEffect} />{" "}
            {/* Pass setDeviceNumberForEffect as a prop */}
          </div>
          <div className="ml-5">
            <Rcards
              deviceNumberForEffect={deviceNumberForEffect}
              dataForRcards={dataForRcards} // Pass dataForRcards as a prop
            />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-1 lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 gap-2">
          <div>
            <RTables />
          </div>
          <div className="ml-5">
            <Charts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
