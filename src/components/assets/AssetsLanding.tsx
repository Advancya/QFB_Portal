import React, { useContext, useState } from "react";
import Cash from "./cash/Cash";
import Investments from "./investments/Investments";
import Deposite from "./deposite/Deposite";
import { AuthContext } from "../../providers/AuthProvider";
import { PortfolioContext } from "../../pages/Homepage";
import { localStrings as local_Strings } from "../../translations/localStrings";

function AssetsLanding() {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);

  return (
    <div className="box min-h-16">
      <h3 className="mt-1">{local_Strings.PortfolioAssetsTitle}</h3>
      <h2 className="mb-2">
        {(userPortfolio.totalAssets || "0") + " "}
        <small>{currentContext.userSettings.currency}</small>
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
