import React, { useState } from "react";

import depositIcon from "../../../images/deposit-icon.svg";
import { Button, Modal } from "react-bootstrap";
import TransactionsListing from "./TransactionsListing";
import TransactionsDetails from "./TransactionsDetails";
import NewTransaction from "./NewTransactions";
import transactionIcon from "../../images/transaction-icon.svg";
import NewBeneficiary from "../beneficiaries/NewBeneficiaries";
import BeneficiariesDetails from "../beneficiaries/BeneficiariesDetails";
import BeneficiariesListing from "../beneficiaries/BeneficiariesListing";

function Transactions() {
  const [showTransactionsListing, setShowTransactionsListing] = useState(false);

  const handleCloseTransactionsListing = () => {
    setShowTransactionsListing(false);
  };
  const handleShowTransactionsListing = () => {
    setShowTransactionsListing(true);
  };

  const [showTransactionsDetails, setshowTransactionsDetails] = useState(false);

  const handleCloseTransactionsDetails = () =>
    setshowTransactionsDetails(false);
  const handleShowTransactionsDetails = () => {
    handleCloseTransactionsListing();
    setshowTransactionsDetails(true);
  };
  const handleBackTransactionsDetails = () => {
    setshowTransactionsDetails(false);

    handleShowTransactionsListing();
  };

  const [showNewTransaction, setShowNewTransaction] = useState(false);

  const handleCloseNewTransaction = () => {
    setShowNewTransaction(false);
  };
  const handleShowNewTransaction = () => {
    handleCloseTransactionsListing();
    setShowNewTransaction(true);
  };
  const handleBackNewTransaction = () => {
    setShowNewTransaction(false);

    handleShowTransactionsListing();
  };
  ///benfeciaries
  const [showBeneficiariesListing, setShowBeneficiariesListing] = useState(
    false
  );

  const handleCloseBeneficiariesListing = () => {
    setShowBeneficiariesListing(false);
  };
  const handleShowBeneficiariesListing = () => {
    handleCloseTransactionsListing();
    setShowBeneficiariesListing(true);
  };
  const handleBackBeneficiariesListing = () => {
    handleCloseBeneficiariesListing();

    handleShowTransactionsListing();
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
      <li className="nav-item">
        <a
          className="nav-link px-2"
          href="#"
          onClick={handleShowTransactionsListing}
        >
          <img src={transactionIcon} className="images-fluid" />
          Transactions
        </a>
      </li>
      <TransactionsListing
        showTransactionsListingModal={showTransactionsListing}
        hideTransactionsListingModal={handleCloseTransactionsListing}
        showTransactionsDetailsModal={handleShowTransactionsDetails}
        showNewTransactionModal={handleShowNewTransaction}
        showBeneficiariesListing={handleShowBeneficiariesListing}
      ></TransactionsListing>
      <TransactionsDetails
        showTransactionsDetailsModal={showTransactionsDetails}
        hideTransactionsDetailsModal={handleCloseTransactionsDetails}
        backTransactionsListingModal={handleBackTransactionsDetails}
        showNewTransactionModal={handleShowNewTransaction}
      ></TransactionsDetails>
      <NewTransaction
        showNewTransactionModal={showNewTransaction}
        hideNewTransactionModal={handleCloseNewTransaction}
        backNewTransactionModal={handleBackNewTransaction}
      ></NewTransaction>
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

export default Transactions;
