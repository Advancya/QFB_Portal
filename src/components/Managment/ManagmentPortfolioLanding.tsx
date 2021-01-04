import React, { useState } from "react";

import depositIcon from "../../../images/deposit-icon.svg";
import { Button, Modal } from "react-bootstrap";
import ManagmentPortfolioLandingDetails from "./ManagmentPortfolioDetails";
import Breadcrumb from "../Breadcrumb";
import ManagmentPortfolioListing from "./ManagmentPortfolioListing";
interface iManagmentPortfolioLanding {
  showManagmentPortfolioLandingListingModal?: () => void;
}
function ManagmentPortfolioLanding(managmentProps: iManagmentPortfolioLanding) {
  ///benfeciaries
  const [
    showManagmentPortfolioLandingListing,
    setShowManagmentPortfolioLandingListing,
  ] = useState(true);

  const handleCloseManagmentPortfolioLandingListing = () => {
    setShowManagmentPortfolioLandingListing(false);
  };
  const handleShowManagmentPortfolioLandingListing = () => {
    //handleCloseTransactionsListing();
    setShowManagmentPortfolioLandingListing(true);
  };
  const handleBackManagmentPortfolioLandingListing = () => {
    handleCloseManagmentPortfolioLandingListing();

    // handleShowTransactionsListing();
  };

  const [
    showManagmentPortfolioLandingDetails,
    setshowManagmentPortfolioLandingDetails,
  ] = useState(false);

  const handleCloseManagmentPortfolioLandingDetails = () =>
    setshowManagmentPortfolioLandingDetails(false);
  const handleShowManagmentPortfolioLandingDetails = () => {
    handleCloseManagmentPortfolioLandingListing();
    setshowManagmentPortfolioLandingDetails(true);
  };
  const handleBackManagmentPortfolioLandingDetails = () => {
    setshowManagmentPortfolioLandingDetails(false);

    handleShowManagmentPortfolioLandingListing();
  };

  const [showNewBeneficiary, setShowNewBeneficiary] = useState(false);

  const handleCloseNewBeneficiary = () => {
    setShowNewBeneficiary(false);
  };
  const handleShowNewBeneficiary = () => {
    handleCloseManagmentPortfolioLandingListing();
    setShowNewBeneficiary(true);
  };
  const handleBackNewBeneficiary = () => {
    setShowNewBeneficiary(false);

    handleShowManagmentPortfolioLandingListing();
  };

  return (
    <div>
      <ManagmentPortfolioListing
        showManagmentPortfolioListingModal={
          showManagmentPortfolioLandingListing
        }
        hideManagmentPortfolioListingModal={
          handleCloseManagmentPortfolioLandingListing
        }
        showManagmentDetailsModal={handleShowManagmentPortfolioLandingDetails}
        backManagmentPortfolioListingModal={
          handleBackManagmentPortfolioLandingListing
        }
        showNewBeneficiaryModal={handleShowNewBeneficiary}
      ></ManagmentPortfolioListing>
      {/*  <ManagmentPortfolioLandingDetails
        showManagmentPortfolioDetailsModal={
          showManagmentPortfolioLandingDetails
        }
        hideManagmentPortfolioDetailsModal={
          handleCloseManagmentPortfolioLandingDetails
        }
        backManagmentPortfolioDetailsgModal={
          handleBackManagmentPortfolioLandingDetails
        }
        showNewBeneficiaryModal={handleShowNewBeneficiary}
      ></ManagmentPortfolioLandingDetails> */}
    </div>
  );
}

export default ManagmentPortfolioLanding;
