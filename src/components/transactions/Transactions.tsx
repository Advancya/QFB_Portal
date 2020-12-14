import React, { useState } from "react";

import depositIcon from "../../../images/deposit-icon.svg";
import { Button, Modal } from "react-bootstrap";
import TransactionsListing from "./TransactionsListing";
import TransactionsDetails from "./TransactionsDetails";
import NewTransaction from "./NewTransactions";
import transactionIcon from "../../images/transaction-icon.svg";

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
    </div>
  );
}

export default Transactions;
