import React, { useState } from "react";
import Cash from "./cash/Cash";
import Investments from "./investments/Investments";
import Deposite from "./deposite/Deposite";

function AssetsLanding() {
  return (
    <div className="box min-h-16">
      <h3 className="mt-1">Assets</h3>
      <h2 className="mb-2">
        9,450,000.00 <small>QAR</small>
      </h2>

      <div className="inner-boxes">
        <div className="row">
          <Cash></Cash>
          <Investments></Investments>
          <Deposite></Deposite>
        </div>
      </div>
    </div>
  );
}

export default AssetsLanding;
