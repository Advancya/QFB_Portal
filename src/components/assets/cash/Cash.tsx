import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import cashIcon from "../../../images/cash-icon.svg";
import CashListing from "./CashListing";
import CashDetails from "./CashDetails";
import { AuthContext } from "../../../providers/AuthProvider";
import { PortfolioContext } from "../../../pages/Homepage";
import { localStrings as local_Strings } from "../../../translations/localStrings";

function Cash() {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);
  const [params, setDetailScreenParams] = useState<{ accountNumber: string, balance: number }>({ accountNumber: "", balance: 0 });
  const [showCashListing, setShowCashListing] = useState(false);

  const handleCloseCashListing = () => {
    setShowCashListing(false);
  };
  const handleShowCashListing = () => {
    setShowCashListing(true);
  };

  const [showCashDetails, setshowCashDetails] = useState(false);

  const handleCloseCashDetails = () => setshowCashDetails(false);
  const handleShowCashDetails = (accountNumber: string, balance: number) => {
    handleCloseCashListing();
    setshowCashDetails(true);
    setDetailScreenParams({ accountNumber, balance });
  };
  const handleBackCashDetails = () => {
    setshowCashDetails(false);

    setShowCashListing(true);
  };

  return (
    <div className="col-lg-4 ">
      <div className="inner-box">
        <div className="d-flex align-items-center">
          <div className="ib-icon">
            <img src={cashIcon} className="img-fluid" />
          </div>
          <a href="#" className="ib-text" onClick={handleShowCashListing}>
            <h4>{local_Strings.PortfolioAssetsOption1}</h4>
            <h5>
              {(userPortfolio.totalCash || "0") +
                " " +
                currentContext.userSettings.currency}
            </h5>
          </a>
        </div>
      </div>
      <CashListing
        showCashListingModal={showCashListing}
        hideCashListingModal={handleCloseCashListing}
        showCashDetailsModal={handleShowCashDetails}
      />
      {!!params.accountNumber &&
        <CashDetails
          showCashDetailsModal={showCashDetails}
          hideCashDetailsModal={handleCloseCashDetails}
          backCashListingModal={handleBackCashDetails}
          params={params}
        />
      }
    </div>
  );
}

export default Cash;
