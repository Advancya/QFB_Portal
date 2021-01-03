import React, { useState } from "react";

import depositIcon from "../../../images/deposit-icon.svg";
import { Button, Modal } from "react-bootstrap";
import RMRequestListing from "./RMRequestListing";
import RMDetails from "./RMDetails";
interface iRM {
  showRMListingModal?: () => void;
}
function RM(rMProps: iRM) {
  ///benfeciaries
  const [showRMListing, setShowRMListing] = useState(true);

  const handleCloseRMListing = () => {
    setShowRMListing(false);
  };
  const handleShowRMListing = () => {
    //handleCloseTransactionsListing();
    setShowRMListing(true);
  };
  const handleBackRMListing = () => {
    handleCloseRMListing();

    // handleShowTransactionsListing();
  };

  const [showRMDetails, setshowRMDetails] = useState(false);

  const handleCloseRMDetails = () => setshowRMDetails(false);
  const handleShowRMDetails = () => {
    handleCloseRMListing();
    setshowRMDetails(true);
  };
  const handleBackRMDetails = () => {
    setshowRMDetails(false);

    handleShowRMListing();
  };

  const [showNewBeneficiary, setShowNewBeneficiary] = useState(false);

  const handleCloseNewBeneficiary = () => {
    setShowNewBeneficiary(false);
  };
  const handleShowNewBeneficiary = () => {
    handleCloseRMListing();
    setShowNewBeneficiary(true);
  };
  const handleBackNewBeneficiary = () => {
    setShowNewBeneficiary(false);

    handleShowRMListing();
  };

  return (
    <div>
      <RMRequestListing
        showRMRequestListingModal={showRMListing}
        hideRMRequestListingModal={handleCloseRMListing}
        showRMDetailsModal={handleShowRMDetails}
        backRMRequestListingModal={handleBackRMListing}
        showNewBeneficiaryModal={handleShowNewBeneficiary}
      ></RMRequestListing>
      <RMDetails
        showRMDetailsModal={showRMDetails}
        hideRMDetailsModal={handleCloseRMDetails}
        backRMDetailsgModal={handleBackRMDetails}
        showNewBeneficiaryModal={handleShowNewBeneficiary}
      ></RMDetails>
    </div>
  );
}

export default RM;
