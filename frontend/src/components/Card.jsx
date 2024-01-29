import React from "react";

import Charts from "./Charts";
import Rcards from "./Rcards";
import "./css/card.css";
import RTables from "./RTables";
import Model from "./Model";
// import Circles from "./Circles";

const Card = () => {
  return (
    <div style={{ width: "100%" }}>
      <div className="grid gap-2 items-stretch grid-rows-2 md:grid md:grid-rows-2 sm:grid sm:grid-rows-2">
          <div className="sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-2 md:grid md:grid-cols-2">
            
            <div>
              <Model />
            </div>

            <div className="ml-5">
              <Rcards />
            </div>

          </div>

          <div className="sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-2 md:grid md:grid-cols-2">
            
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
