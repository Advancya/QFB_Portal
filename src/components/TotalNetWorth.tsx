import React, { useContext, useState } from "react";
import Chart from "../images/Chart.png";
import { AuthContext } from "../providers/AuthProvider";
import { PortfolioContext } from "../pages/Homepage";
import { localStrings as local_Strings } from "../translations/localStrings";
import TotalNetWorthDetails from "./TotalNetWorthDetails";

function TotalNetWorth() {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);
  const [showTotalNetWorthDetails, setShowTotalNetWorthDetails] = useState(
    false
  );

  const handleCloseTotalNetWorthDetails = () => {
    setShowTotalNetWorthDetails(false);
  };
  const handleShowTotalNetWorthDetails = () => {
    setShowTotalNetWorthDetails(true);
  };

  return (
    <div className="col-lg-7 col-container">
      <div className="box box min-h-24">
        <h3>{local_Strings.PortfolioTotalNetWorth}</h3>
        <h2 className="mb-3">
          {(userPortfolio.networth || "0") + " "}
          <small>{currentContext.userSettings.currency}</small>
        </h2>
        <a
          href="#"
          onClick={handleShowTotalNetWorthDetails}
          className="chart-block"
        >
          <img src={Chart} className="img-fluid" />
        </a>
      </div>
      <TotalNetWorthDetails
        showTotalNetWorthDetailsModal={showTotalNetWorthDetails}
        hideTotalNetWorthDetailsModal={handleCloseTotalNetWorthDetails}
      ></TotalNetWorthDetails>
    </div>
  );
}

export default TotalNetWorth;
