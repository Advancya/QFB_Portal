import React, { useContext, useState } from "react";
import investIcon from "../../../images/invest-icon.svg";
import { Button, Modal } from "react-bootstrap";
import InvestmentsListing from "./InvestmentsListing";
import InvestmentsDetails from "./InvestmentsDetails";
import InvestmentsRecievedProfit from "./InvestmentsRecievedProfit";
import InvestmentsBuyAndSell from "./InvestmentsBuyAndSell";
import { AuthContext } from "../../../providers/AuthProvider";
import { PortfolioContext } from "../../../pages/Homepage";
import { localStrings as local_Strings } from "../../../translations/localStrings";

function Investments() {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);

  const [showInvestmentsListing, setShowInvestmentsListing] = useState(false);

  const handleCloseInvestmentsListing = () => {
    setShowInvestmentsListing(false);
  };
  const handleShowInvestmentsListing = () => {
    setShowInvestmentsListing(true);
  };

  const [showInvestmentsDetails, setshowInvestmentsDetails] = useState(false);

  const handleCloseInvestmentsDetails = () => setshowInvestmentsDetails(false);
  const handleShowInvestmentsDetails = () => {
    handleCloseInvestmentsListing();
    setshowInvestmentsDetails(true);
    //cashListingProps.hideCashListingModal;
  };
  const handleBackInvestmentsDetails = () => {
    setshowInvestmentsDetails(false);

    setShowInvestmentsListing(true);
  };

  const [
    showInvestmentsRecievedProfit,
    setShowInvestmentsRecievedProfit,
  ] = useState(false);

  const handleCloseInvestmentsRecievedProfit = () =>
    setShowInvestmentsRecievedProfit(false);
  const handleShowInvestmentsRecievedProfit = () => {
    handleCloseInvestmentsDetails();
    setShowInvestmentsRecievedProfit(true);
    //cashListingProps.hideCashListingModal;
  };
  const handleBackInvestmentsRecievedProfit = () => {
    setShowInvestmentsRecievedProfit(false);

    setshowInvestmentsDetails(true);
  };

  const [showInvestmentsBuyAndSell, setShowInvestmentsBuyAndSell] = useState(
    false
  );

  const handleCloseInvestmentsBuyAndSell = () =>
    setShowInvestmentsRecievedProfit(false);
  const handleShowInvestmentsBuyAndSell = () => {
    handleCloseInvestmentsDetails();
    setShowInvestmentsBuyAndSell(true);
    //cashListingProps.hideCashListingModal;
  };
  const handleBackInvestmentsBuyAndSell = () => {
    setShowInvestmentsBuyAndSell(false);

    setshowInvestmentsDetails(true);
  };
  return (
    <div className="col-lg-4">
      <div className="inner-box">
        <div className="d-flex align-items-center">
          <div className="ib-icon">
            <img src={investIcon} className="img-fluid" />
          </div>
          <a
            href="#"
            className="ib-text"
            onClick={handleShowInvestmentsListing}
          >
            <h4>{local_Strings.PortfolioAssetsOption2}</h4>
            <h5>
              {(userPortfolio.totalInvestment || "0") +
                " " +
                currentContext.userSettings.currency}
            </h5>
          </a>
        </div>
      </div>
      <InvestmentsListing
        showInvestmentsListingModal={showInvestmentsListing}
        hideInvestmentsListingModal={handleCloseInvestmentsListing}
        showInvestmentsDetailsModal={handleShowInvestmentsDetails}
      ></InvestmentsListing>
      <InvestmentsDetails
        showInvestmentsDetailsModal={showInvestmentsDetails}
        hideInvestmentsDetailsModal={handleCloseInvestmentsDetails}
        backInvestmentsListingModal={handleBackInvestmentsDetails}
        showInvestmentsRecievedProfit={handleShowInvestmentsRecievedProfit}
        showInvestmentsBuyAndSell={handleShowInvestmentsBuyAndSell}
      ></InvestmentsDetails>
      <InvestmentsRecievedProfit
        showInvestmentsRecievedProfitModal={showInvestmentsRecievedProfit}
        hideInvestmentsRecievedProfitModal={
          handleCloseInvestmentsRecievedProfit
        }
        backInvestmentsRecievedProfitModal={handleBackInvestmentsRecievedProfit}
      ></InvestmentsRecievedProfit>
      <InvestmentsBuyAndSell
        showInvestmentsBuyAndSellModal={showInvestmentsBuyAndSell}
        hideInvestmentsBuyAndSellModal={handleCloseInvestmentsBuyAndSell}
        backInvestmentsBuyAndSellModal={handleBackInvestmentsBuyAndSell}
      ></InvestmentsBuyAndSell>
    </div>
  );
}

export default Investments;
