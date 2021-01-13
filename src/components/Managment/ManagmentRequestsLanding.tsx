import React, { useState } from "react";

import depositIcon from "../../../images/deposit-icon.svg";
import { Button, Modal } from "react-bootstrap";
import ManagmentRequestListing from "./ManagmentRequestListing";
import PositionAnalysis from "./PositionAnalysis";
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

  const [showPositionAnalysis, setshowPositionAnalysis] = useState(false);

  const handleClosePositionAnalysis = () => setshowPositionAnalysis(false);
  const handleShowPositionAnalysis = () => {
    handleCloseManagmentListing();
    setshowPositionAnalysis(true);
  };
  const handleBackPositionAnalysis = () => {
    setshowPositionAnalysis(false);

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
        showPositionAnalysisModal={handleShowPositionAnalysis}
        backManagmentRequestListingModal={handleBackManagmentListing}
        showNewBeneficiaryModal={handleShowNewBeneficiary}
      />
      <PositionAnalysis
        showPositionAnalysisModal={showPositionAnalysis}
        hidePositionAnalysisModal={handleClosePositionAnalysis}
        backPositionAnalysisgModal={handleBackPositionAnalysis}
        showNewBeneficiaryModal={handleShowNewBeneficiary}
      />
    </div>
  );
}

export default Managment;
