import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import transactionIconColor from "../../images/transaction-icon-color.svg";
import Beneficiaries from "../beneficiaries/Beneficiaries";
import BeneficiariesDetails from "../beneficiaries/BeneficiariesDetails";
import BeneficiariesListing from "../beneficiaries/BeneficiariesListing";
import NewBeneficiary from "../beneficiaries/NewBeneficiaries";

interface iTransactionsListing {
  showTransactionsListingModal: boolean;
  hideTransactionsListingModal: () => void;
  showTransactionsDetailsModal: () => void;
  showNewTransactionModal: () => void;
  showBeneficiariesListing: () => void;
}
function TransactionsListing(transactionsListingProps: iTransactionsListing) {
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [showTransactionDateFilter, setShowTransactionDateFilter] = useState(
    false
  );
  const [showTransactionsListing, setShowTransactionsListing] = useState(false);

  const handleCloseTransactionsListing = () => {
    setShowTransactionsListing(false);
  };

  const applyFilter = () => {
    setShowClearFilter(true);
  };

  const clearFilter = () => {
    setShowClearFilter(false);
  };
  const showMoreTransactionsListing = () => {
    console.log("retrieve more from server");
  };
  const requestDateFilterOnchangeHandler = (e: any) => {
    if (e.target.value == 4) {
      setShowTransactionDateFilter(true);
    } else {
      setShowTransactionDateFilter(false);
    }
  };

  return (
    <div>
      <Modal
        show={transactionsListingProps.showTransactionsListingModal}
        onHide={transactionsListingProps.hideTransactionsListingModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-icon bg-icon">
              <img src={transactionIconColor} className="img-fluid" />
            </div>
            <div className="ib-text d-flex align-items-center">
              <h4>Transactions</h4>
              <a
                className="btnOutlineWhite"
                href="#"
                onClick={transactionsListingProps.showNewTransactionModal}
                id="newTransactionBtn"
              >
                <i className="fa fa-plus-circle"></i> New Transaction
              </a>
              <a
                className="btnOutlineWhite bg-white color-gold"
                href="#"
                onClick={transactionsListingProps.showBeneficiariesListing}
                id="newBeneficiaryBtn"
              >
                Beneficiaries
              </a>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={transactionsListingProps.hideTransactionsListingModal}
          >
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <form className="filter-box">
            <div className="row headRow align-items-center">
              <div className="col-sm-3">
                <label>Select Date</label>
                <select
                  className="form-control selectDateDD"
                  id="selectDateDD"
                  onChange={requestDateFilterOnchangeHandler}
                >
                  <option value="0">Select Date</option>
                  <option value="1">Last Week</option>
                  <option value="2">Last Month</option>
                  <option value="3">Last 3 Months</option>
                  <option value="4">Custom Date</option>
                </select>
              </div>
              <div className="col-sm-4">
                <label>Transaction Amount</label>
                <select
                  className="form-control w-50"
                  id="inlineFormCustomSelect3"
                >
                  <option>Equal to</option>
                  <option value="1">Greater than</option>
                  <option value="2">Less than </option>
                  <option value="3">Cancelled</option>
                </select>
                <input
                  type="text"
                  className="form-control w-50"
                  placeholder="Amount"
                />
              </div>

              <div className="col-sm-3 offset-sm-2">
                <label>
                  <button
                    id="resetFilter"
                    type="reset"
                    className={
                      showClearFilter
                        ? "resetBtn resetFilter"
                        : "resetBtn resetFilter invisible"
                    }
                    onClick={clearFilter}
                  >
                    Clear Filter <i className="fa fa-close"></i>
                  </button>
                </label>
                <button
                  id="applyFilter"
                  type="button"
                  className="btn btn-primary btn-sm btn-block applyFilter"
                  onClick={applyFilter}
                >
                  Apply
                </button>
              </div>
              <div
                className={
                  showTransactionDateFilter
                    ? "col-sm-9 py-3 customDate"
                    : "col-sm-9 py-3 customDate d-none"
                }
                id="customDate"
              >
                <div className="row">
                  <div className="col-lg-4">
                    <label>From</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="col-lg-4">
                    <label>To</label>
                    <input type="date" className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="box modal-box">
            <ul className="box-list" id="reqList">
              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={
                    transactionsListingProps.showTransactionsDetailsModal
                  }
                >
                  <div className="col-sm-8">
                    <h5>05/11/2020</h5>
                    <h4>Transfer to My Account (123456789012 - QAR) </h4>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    <span className="status-badge ">Pending</span>
                  </div>
                  <div className="col-4 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={
                    transactionsListingProps.showTransactionsDetailsModal
                  }
                >
                  <div className="col-sm-8">
                    <h5>05/11/2020</h5>
                    <h4>Transfer to My Account (123456789012 - QAR) </h4>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    <span className="status-badge ">Closed</span>
                  </div>
                  <div className="col-4 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={
                    transactionsListingProps.showTransactionsDetailsModal
                  }
                >
                  <div className="col-sm-8">
                    <h5>05/11/2020</h5>
                    <h4>Transfer to My Account (123456789012 - QAR) </h4>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    <span className="status-badge ">Pending</span>
                  </div>
                  <div className="col-4 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={
                    transactionsListingProps.showTransactionsDetailsModal
                  }
                >
                  <div className="col-sm-8">
                    <h5>05/11/2020</h5>
                    <h4>Transfer to My Account (123456789012 - QAR) </h4>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    <span className="status-badge ">Cancelled</span>
                  </div>
                  <div className="col-4 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={
                    transactionsListingProps.showTransactionsDetailsModal
                  }
                >
                  <div className="col-sm-8">
                    <h5>05/11/2020</h5>
                    <h4>Transfer to My Account (123456789012 - QAR) </h4>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    <span className="status-badge ">Pending</span>
                  </div>
                  <div className="col-4 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="hidden">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={
                    transactionsListingProps.showTransactionsDetailsModal
                  }
                >
                  <div className="col-sm-8">
                    <h5>05/11/2020</h5>
                    <h4>Transfer to My Account (123456789012 - QAR) </h4>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    <span className="status-badge ">Cancelled</span>
                  </div>
                  <div className="col-4 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="hidden">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={
                    transactionsListingProps.showTransactionsDetailsModal
                  }
                >
                  <div className="col-sm-8">
                    <h5>05/11/2020</h5>
                    <h4>Transfer to My Account (123456789012 - QAR) </h4>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    <span className="status-badge ">Closed</span>
                  </div>
                  <div className="col-4 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="hidden">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={
                    transactionsListingProps.showTransactionsDetailsModal
                  }
                >
                  <div className="col-sm-8">
                    <h5>05/11/2020</h5>
                    <h4>Transfer to My Account (123456789012 - QAR) </h4>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    <span className="status-badge ">Cancelled</span>
                  </div>
                  <div className="col-4 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <div className="actionScrollButtons">
            <a
              id="moreButton"
              onClick={showMoreTransactionsListing}
              className="d-block"
            >
              More <i className="fa fa-caret-down"></i>
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TransactionsListing;
