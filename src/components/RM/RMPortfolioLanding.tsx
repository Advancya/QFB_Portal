import React, { useState } from "react";

import depositIcon from "../../../images/deposit-icon.svg";
import { Button, Modal } from "react-bootstrap";
import RMPortfolioLandingDetails from "./RMPortfolioDetails";
import Breadcrumb from "../Breadcrumb";
import RMPortfolioListing from "./RMPortfolioListing";
interface iRMPortfolioLanding {
  showRMPortfolioLandingListingModal?: () => void;
}
function RMPortfolioLanding(rMProps: iRMPortfolioLanding) {
  ///benfeciaries
  const [
    showRMPortfolioLandingListing,
    setShowRMPortfolioLandingListing,
  ] = useState(true);

  const handleCloseRMPortfolioLandingListing = () => {
    setShowRMPortfolioLandingListing(false);
  };
  const handleShowRMPortfolioLandingListing = () => {
    //handleCloseTransactionsListing();
    setShowRMPortfolioLandingListing(true);
  };
  const handleBackRMPortfolioLandingListing = () => {
    handleCloseRMPortfolioLandingListing();

    // handleShowTransactionsListing();
  };

  const [
    showRMPortfolioLandingDetails,
    setshowRMPortfolioLandingDetails,
  ] = useState(false);

  const handleCloseRMPortfolioLandingDetails = () =>
    setshowRMPortfolioLandingDetails(false);
  const handleShowRMPortfolioLandingDetails = () => {
    handleCloseRMPortfolioLandingListing();
    setshowRMPortfolioLandingDetails(true);
  };
  const handleBackRMPortfolioLandingDetails = () => {
    setshowRMPortfolioLandingDetails(false);

    handleShowRMPortfolioLandingListing();
  };

  const [showNewBeneficiary, setShowNewBeneficiary] = useState(false);

  const handleCloseNewBeneficiary = () => {
    setShowNewBeneficiary(false);
  };
  const handleShowNewBeneficiary = () => {
    handleCloseRMPortfolioLandingListing();
    setShowNewBeneficiary(true);
  };
  const handleBackNewBeneficiary = () => {
    setShowNewBeneficiary(false);

    handleShowRMPortfolioLandingListing();
  };

  return (
    <div>
      <RMPortfolioListing
        showRMPortfolioListingModal={showRMPortfolioLandingListing}
        hideRMPortfolioListingModal={handleCloseRMPortfolioLandingListing}
        showRMDetailsModal={handleShowRMPortfolioLandingDetails}
        backRMPortfolioListingModal={handleBackRMPortfolioLandingListing}
        showNewBeneficiaryModal={handleShowNewBeneficiary}
      ></RMPortfolioListing>
      <RMPortfolioLandingDetails
        showRMPortfolioDetailsModal={showRMPortfolioLandingDetails}
        hideRMPortfolioDetailsModal={handleCloseRMPortfolioLandingDetails}
        backRMPortfolioDetailsgModal={handleBackRMPortfolioLandingDetails}
        showNewBeneficiaryModal={handleShowNewBeneficiary}
      ></RMPortfolioLandingDetails>
    </div>
  );
}

export default RMPortfolioLanding;
