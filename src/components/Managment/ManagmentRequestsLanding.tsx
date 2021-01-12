import React, { useState } from "react";

import depositIcon from "../../../images/deposit-icon.svg";
import { Button, Modal } from "react-bootstrap";
import ManagmentRequestListing from "./ManagmentRequestListing";
import ManagmentDetails from "./ManagmentDetails";
interface iManagment {
  showManagmentListingModal?: () => void;
}
function Managment(managmentProps: iManagment) {
  ///benfeciaries
  const [showManagmentListing, setShowManagmentListing] = useState(true);

  const handleCloseManagmentListing = () => {
    setShowManagmentListing(false);
  };
  const handleShowManagmentListing = () => {
    //handleCloseTransactionsListing();
    setShowManagmentListing(true);
  };
  const handleBackManagmentListing = () => {
    handleCloseManagmentListing();

    // handleShowTransactionsListing();
  };

  const [showManagmentDetails, setshowManagmentDetails] = useState(false);

  const handleCloseManagmentDetails = () => setshowManagmentDetails(false);
  const handleShowManagmentDetails = () => {
    handleCloseManagmentListing();
    setshowManagmentDetails(true);
  };
  const handleBackManagmentDetails = () => {
    setshowManagmentDetails(false);

    handleShowManagmentListing();
  };

  const [showNewBeneficiary, setShowNewBeneficiary] = useState(false);

  const handleCloseNewBeneficiary = () => {
    setShowNewBeneficiary(false);
  };
  const handleShowNewBeneficiary = () => {
    handleCloseManagmentListing();
    setShowNewBeneficiary(true);
  };
  const handleBackNewBeneficiary = () => {
    setShowNewBeneficiary(false);

    handleShowManagmentListing();
  };

  return (
    <div>
      <ManagmentRequestListing
        showManagmentRequestListingModal={showManagmentListing}
        hideManagmentRequestListingModal={handleCloseManagmentListing}
        showManagmentDetailsModal={handleShowManagmentDetails}
        backManagmentRequestListingModal={handleBackManagmentListing}
        showNewBeneficiaryModal={handleShowNewBeneficiary}
      />
      <ManagmentDetails
        showManagmentDetailsModal={showManagmentDetails}
        hideManagmentDetailsModal={handleCloseManagmentDetails}
        backManagmentDetailsgModal={handleBackManagmentDetails}
        showNewBeneficiaryModal={handleShowNewBeneficiary}
      />
    </div>
  );
}

export default Managment;
