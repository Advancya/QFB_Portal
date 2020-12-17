import React, { useContext, useState } from "react";
import Chart from "../images/Chart.png";
import { AuthContext } from "../providers/AuthProvider";
import { PortfolioContext } from "../pages/Homepage";
import { localStrings as local_Strings } from "../translations/localStrings";

function TotalNetWorth() {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);

  return (
    <div className="col-lg-7 col-container">
      <div className="box box min-h-24">
        <h3>{local_Strings.PortfolioTotalNetWorth}</h3>
        <h2 className="mb-3">
          {userPortfolio.networth + " "}
          <small>{currentContext.userSettings.currency}</small>
        </h2>
        <div className="chart-block">
          <img src={Chart} className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default TotalNetWorth;
