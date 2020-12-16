import React, { useState } from "react";

import depositIcon from "../../../images/deposit-icon.svg";
import { Button, Modal } from "react-bootstrap";
import BeneficiariesListing from "./BeneficiariesListing";
import BeneficiariesDetails from "./BeneficiariesDetails";
import NewBeneficiary from "./NewBeneficiaries";
interface iBeneficiaries {
  showBeneficiariesListingModal?: () => void;
}
function Beneficiaries(beneficiariesProps: iBeneficiaries) {
  ///benfeciaries
  const [showBeneficiariesListing, setShowBeneficiariesListing] = useState(
    false
  );

  const handleCloseBeneficiariesListing = () => {
    setShowBeneficiariesListing(false);
  };
  const handleShowBeneficiariesListing = () => {
    //handleCloseTransactionsListing();
    setShowBeneficiariesListing(true);
  };
  const handleBackBeneficiariesListing = () => {
    handleCloseBeneficiariesListing();

    // handleShowTransactionsListing();
  };

  const [showBeneficiariesDetails, setshowBeneficiariesDetails] = useState(
    false
  );

  const handleCloseBeneficiariesDetails = () =>
    setshowBeneficiariesDetails(false);
  const handleShowBeneficiariesDetails = () => {
    handleCloseBeneficiariesListing();
    setshowBeneficiariesDetails(true);
  };
  const handleBackBeneficiariesDetails = () => {
    setshowBeneficiariesDetails(false);

    handleShowBeneficiariesListing();
  };

  const [showNewBeneficiary, setShowNewBeneficiary] = useState(false);

  const handleCloseNewBeneficiary = () => {
    setShowNewBeneficiary(false);
  };
  const handleShowNewBeneficiary = () => {
    handleCloseBeneficiariesListing();
    setShowNewBeneficiary(true);
  };
  const handleBackNewBeneficiary = () => {
    setShowNewBeneficiary(false);

    handleShowBeneficiariesListing();
  };

  return (
    <div>
      {/*   <a
        className="btnOutlineWhite bg-white color-gold"
        href="#"
        onClick={handleShowBeneficiariesListing}
        id="newBeneficiaryBtn"
      >
        Beneficiaries
        
      </a> */}

      <BeneficiariesListing
        showBeneficiariesListingModal={showBeneficiariesListing}
        hideBeneficiariesListingModal={handleCloseBeneficiariesListing}
        showBeneficiariesDetailsModal={handleShowBeneficiariesDetails}
        backBeneficiariesListingModal={handleBackBeneficiariesListing}
        showNewBeneficiaryModal={handleShowNewBeneficiary}
      ></BeneficiariesListing>
      <BeneficiariesDetails
        showBeneficiariesDetailsModal={showBeneficiariesDetails}
        hideBeneficiariesDetailsModal={handleCloseBeneficiariesDetails}
        backBeneficiariesDetailsgModal={handleBackBeneficiariesDetails}
        showNewBeneficiaryModal={handleShowNewBeneficiary}
      ></BeneficiariesDetails>
      <NewBeneficiary
        showNewBeneficiaryModal={showNewBeneficiary}
        hideNewBeneficiaryModal={handleCloseNewBeneficiary}
        backNewBeneficiaryModal={handleBackNewBeneficiary}
      ></NewBeneficiary>
    </div>
  );
}

export default Beneficiaries;
