import React, { useContext, useState } from "react";

import depositIcon from "../../../images/deposit-icon.svg";
import { Button, Modal } from "react-bootstrap";
import DepositeListing from "./DepositeListing";
import DepositeDetails from "./DepositeDetails";
import DepositeRecievedProfit from "./DepositeRecievedProfit";
import { AuthContext } from "../../../providers/AuthProvider";
import { PortfolioContext } from "../../../pages/Homepage";
import { localStrings as local_Strings } from "../../../translations/localStrings";

function Deposite() {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);

  const [showDepositeListing, setShowDepositeListing] = useState(false);

  const handleCloseDepositeListing = () => {
    setShowDepositeListing(false);
  };
  const handleShowDepositeListing = () => {
    setShowDepositeListing(true);
  };

  const [showDepositeDetails, setshowDepositeDetails] = useState(false);

  const handleCloseDepositeDetails = () => setshowDepositeDetails(false);
  const handleShowDepositeDetails = () => {
    handleCloseDepositeListing();
    setshowDepositeDetails(true);
    //cashListingProps.hideCashListingModal;
  };
  const handleBackDepositeDetails = () => {
    setshowDepositeDetails(false);

    setShowDepositeListing(true);
  };

  const [showDepositeRecievedProfit, setShowDepositeRecievedProfit] = useState(
    false
  );

  const handleCloseDepositeRecievedProfit = () =>
    setShowDepositeRecievedProfit(false);
  const handleShowDepositeRecievedProfit = () => {
    handleCloseDepositeDetails();
    setShowDepositeRecievedProfit(true);
    //cashListingProps.hideCashListingModal;
  };
  const handleBackDepositeRecievedProfit = () => {
    setShowDepositeRecievedProfit(false);

    setshowDepositeDetails(true);
  };

  return (
    <div className="col-lg-4">
      <div className="inner-box">
        <div className="d-flex align-items-center">
          <div className="ib-icon">
            <img src={depositIcon} className="img-fluid" />
          </div>
          <a href="#" className="ib-text" onClick={handleShowDepositeListing}>
            <h4>{local_Strings.PortfolioAssetsOption3}</h4>
            <h5>
              {userPortfolio.totalDeposits +
                " " +
                currentContext.userSettings.currency}
            </h5>
          </a>
        </div>
      </div>
      <DepositeListing
        showDepositeListingModal={showDepositeListing}
        hideDepositeListingModal={handleCloseDepositeListing}
        showDepositeDetailsModal={handleShowDepositeDetails}
      ></DepositeListing>
      <DepositeDetails
        showDepositeDetailsModal={showDepositeDetails}
        hideDepositeDetailsModal={handleCloseDepositeDetails}
        backDepositeListingModal={handleBackDepositeDetails}
        showDepositeRecievedProfit={handleShowDepositeRecievedProfit}
      ></DepositeDetails>
      <DepositeRecievedProfit
        showDepositeRecievedProfitModal={showDepositeRecievedProfit}
        hideDepositeRecievedProfitModal={handleCloseDepositeRecievedProfit}
        backDepositeRecievedProfitModal={handleBackDepositeRecievedProfit}
      ></DepositeRecievedProfit>
    </div>
  );
}

export default Deposite;
