import React, { useContext, useState } from "react";
import Facilities from "./Facilities/Facilities";
import Guarantees from "./Guarantees/Guarantees";
import { AuthContext } from "../../providers/AuthProvider";
import { PortfolioContext } from "../../pages/Homepage";

function LiabilitiesLanding() {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);

  return (
    <div className="col-lg-5 col-container">
      <div className="box box min-h-24">
        <h3>Liabilities</h3>
        <h2 className="mb-4">
          {userPortfolio.totalLiabilities + " "}<small>{currentContext.userSettings.currency}</small>
        </h2>
        <Facilities></Facilities>
        <Guarantees></Guarantees>
      </div>
    </div>
  );
}

export default LiabilitiesLanding;
