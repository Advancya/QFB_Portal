import React, { useState } from "react";

import depositIcon from "../../../images/deposit-icon.svg";
import { Button, Modal } from "react-bootstrap";
import BeneficiariesListing from "./BeneficiariesListing";
import BeneficiariesDetails from "./BeneficiariesDetails";
import NewTransaction from "./NewBeneficiaries";
import transactionIcon from "../../images/transaction-icon.svg";
interface iBeneficiaries {
  hideTransactionsListingModal: () => void;
}
function Beneficiaries(beneficiariesProps: iBeneficiaries) {
  const [showBeneficiariesListing, setShowBeneficiariesListing] = useState(
    false
  );

  const handleCloseBeneficiariesListing = () => {
    setShowBeneficiariesListing(false);
  };
  const handleShowBeneficiariesListing = () => {
    //beneficiariesProps.hideTransactionsListingModal();
    setShowBeneficiariesListing(true);
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

  const [showNewTransaction, setShowNewTransaction] = useState(false);

  const handleCloseNewTransaction = () => {
    setShowNewTransaction(false);
  };
  const handleShowNewTransaction = () => {
    handleCloseBeneficiariesListing();
    setShowNewTransaction(true);
  };
  const handleBackNewTransaction = () => {
    setShowNewTransaction(false);

    handleShowBeneficiariesListing();
  };

  return (
    <div>
      <a
        className="btnOutlineWhite bg-white color-gold"
        href="#"
        onClick={handleShowBeneficiariesListing}
        id="newTransactionBtn"
      >
        Beneficiaries
      </a>
      <BeneficiariesListing
        showBeneficiariesListingModal={showBeneficiariesListing}
        hideBeneficiariesListingModal={handleCloseBeneficiariesListing}
        showBeneficiariesDetailsModal={handleShowBeneficiariesDetails}
        showNewTransactionModal={handleShowNewTransaction}
      ></BeneficiariesListing>
      <BeneficiariesDetails
        showBeneficiariesDetailsModal={showBeneficiariesDetails}
        hideBeneficiariesDetailsModal={handleCloseBeneficiariesDetails}
        backBeneficiariesListingModal={handleBackBeneficiariesDetails}
        showNewTransactionModal={handleShowNewTransaction}
      ></BeneficiariesDetails>
      <NewTransaction
        showNewTransactionModal={showNewTransaction}
        hideNewTransactionModal={handleCloseNewTransaction}
        backNewTransactionModal={handleBackNewTransaction}
      ></NewTransaction>
    </div>
  );
}

export default Beneficiaries;
