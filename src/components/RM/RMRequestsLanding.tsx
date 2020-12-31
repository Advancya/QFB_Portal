import React, { useState } from "react";

import depositIcon from "../../../images/deposit-icon.svg";
import { Button, Modal } from "react-bootstrap";
import RMListing from "./RMListing";
import RMDetails from "./RMDetails";
import NewBeneficiary from "./NewRM";
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
      <RMListing
        showRMListingModal={showRMListing}
        hideRMListingModal={handleCloseRMListing}
        showRMDetailsModal={handleShowRMDetails}
        backRMListingModal={handleBackRMListing}
        showNewBeneficiaryModal={handleShowNewBeneficiary}
      ></RMListing>
      <RMDetails
        showRMDetailsModal={showRMDetails}
        hideRMDetailsModal={handleCloseRMDetails}
        backRMDetailsgModal={handleBackRMDetails}
        showNewBeneficiaryModal={handleShowNewBeneficiary}
      ></RMDetails>
      <NewBeneficiary
        showNewBeneficiaryModal={showNewBeneficiary}
        hideNewBeneficiaryModal={handleCloseNewBeneficiary}
        backNewBeneficiaryModal={handleBackNewBeneficiary}
      ></NewBeneficiary>
    </div>
  );
}

export default RM;
