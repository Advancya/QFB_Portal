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
  const [investmentNumber, setReferenceId] = useState<string>("");

  const [showInvestmentsListing, setShowInvestmentsListing] = useState(false);
  const [showInvestmentsDetails, setshowInvestmentsDetails] = useState(false);
  const [showInvestmentsRecievedProfit, setShowInvestmentsRecievedProfit,
  ] = useState(false);
  const [showInvestmentsBuyAndSell, setShowInvestmentsBuyAndSell] = useState(
    false
  );

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
            onClick={() => setShowInvestmentsListing(true)}
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
        hideInvestmentsListingModal={() => setShowInvestmentsListing(false)}
        showInvestmentsDetailsModal={(investmentNumber: string) => {
          setShowInvestmentsListing(false);
          setshowInvestmentsDetails(true);
          setReferenceId(investmentNumber);
        }}
      />
      {investmentNumber && !!investmentNumber &&
        <React.Fragment>
          <InvestmentsDetails
            showInvestmentsDetailsModal={showInvestmentsDetails}
            hideInvestmentsDetailsModal={() => {
              setshowInvestmentsDetails(false);
              setShowInvestmentsBuyAndSell(true);
            }}
            backInvestmentsListingModal={() => {
              setshowInvestmentsDetails(false);
              setShowInvestmentsListing(true);
            }}
            showInvestmentsRecievedProfit={() => {
              setshowInvestmentsDetails(false);
              setShowInvestmentsRecievedProfit(true);
            }}
            showInvestmentsBuyAndSell={() => {
              setshowInvestmentsDetails(false);
              setShowInvestmentsBuyAndSell(true);
            }}
            investmentNumber={investmentNumber}
          />
          <InvestmentsRecievedProfit
            showInvestmentsRecievedProfitModal={showInvestmentsRecievedProfit}
            hideInvestmentsRecievedProfitModal={() => setShowInvestmentsRecievedProfit(false)}
            backInvestmentsRecievedProfitModal={() => {
              setShowInvestmentsRecievedProfit(false);
              setshowInvestmentsDetails(true);
            }}
            investmentNumber={investmentNumber}
          />
          <InvestmentsBuyAndSell
            showInvestmentsBuyAndSellModal={showInvestmentsBuyAndSell}
            hideInvestmentsBuyAndSellModal={() => setShowInvestmentsBuyAndSell(false)}
            backInvestmentsBuyAndSellModal={() => {
              setShowInvestmentsBuyAndSell(false);
              setshowInvestmentsDetails(true);
            }}
            investmentNumber={investmentNumber}
          />
        </React.Fragment>}
    </div>
  );
}

export default Investments;
