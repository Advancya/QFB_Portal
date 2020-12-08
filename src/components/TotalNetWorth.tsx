import React from "react";
import Chart from "../images/Chart.png";

function TotalNetWorth() {
  return (
    <div className="col-lg-7 col-container">
      <div className="box box min-h-24">
        <h3>Total Net Worth</h3>
        <h2 className="mb-3">
          15,450,000.00 <small>QAR</small>
        </h2>
        <div className="chart-block">
          <img src={Chart} className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default TotalNetWorth;
