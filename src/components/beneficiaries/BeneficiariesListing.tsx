import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import transactionIconColor from "../../images/transaction-icon-color.svg";

interface iBeneficiariesListing {
  showBeneficiariesListingModal: boolean;
  hideBeneficiariesListingModal: () => void;
  showBeneficiariesDetailsModal: () => void;
  showNewTransactionModal: () => void;
}
function BeneficiariesListing(
  beneficiariesListingProps: iBeneficiariesListing
) {
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [showTransactionDateFilter, setShowTransactionDateFilter] = useState(
    false
  );

  const applyFilter = () => {
    setShowClearFilter(true);
  };

  const clearFilter = () => {
    setShowClearFilter(false);
  };
  const showMoreBeneficiariesListing = () => {
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
        show={beneficiariesListingProps.showBeneficiariesListingModal}
        onHide={beneficiariesListingProps.hideBeneficiariesListingModal}
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
              <h4>Beneficiaries</h4>
              <a
                className="btnOutlineWhite"
                href="#"
                onClick={beneficiariesListingProps.showNewTransactionModal}
                id="newTransactionBtn"
              >
                <i className="fa fa-plus-circle"></i> New Beneficiaries
              </a>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={beneficiariesListingProps.hideBeneficiariesListingModal}
          >
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box">
            <ul className="box-list" id="reqList">
              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={
                    beneficiariesListingProps.showBeneficiariesDetailsModal
                  }
                >
                  <div className="col-sm-8">
                    <h4>Beneficiary ID | 12345678912345 </h4>
                    <h5>Ahmed Mohsen</h5>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    <span className="status-badge ">Qatar</span>
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
                    beneficiariesListingProps.showBeneficiariesDetailsModal
                  }
                >
                  <div className="col-sm-8">
                    <h4>Beneficiary ID | 12345678912345 </h4>
                    <h5>Ahmed Mohsen</h5>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    <span className="status-badge ">Qatar</span>
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
                    beneficiariesListingProps.showBeneficiariesDetailsModal
                  }
                >
                  <div className="col-sm-8">
                    <h4>Beneficiary ID | 12345678912345 </h4>
                    <h5>Ahmed Mohsen</h5>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    <span className="status-badge ">Qatar</span>
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
                    beneficiariesListingProps.showBeneficiariesDetailsModal
                  }
                >
                  <div className="col-sm-8">
                    <h4>Beneficiary ID | 12345678912345 </h4>
                    <h5>Ahmed Mohsen</h5>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    <span className="status-badge ">Qatar</span>
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
                    beneficiariesListingProps.showBeneficiariesDetailsModal
                  }
                >
                  <div className="col-sm-8">
                    <h4>Beneficiary ID | 12345678912345 </h4>
                    <h5>Ahmed Mohsen</h5>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    <span className="status-badge ">Qatar</span>
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
                    beneficiariesListingProps.showBeneficiariesDetailsModal
                  }
                >
                  <div className="col-sm-8">
                    <h4>Beneficiary ID | 12345678912345 </h4>
                    <h5>Ahmed Mohsen</h5>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    <span className="status-badge ">Qatar</span>
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
                    beneficiariesListingProps.showBeneficiariesDetailsModal
                  }
                >
                  <div className="col-sm-8">
                    <h4>Beneficiary ID | 12345678912345 </h4>
                    <h5>Ahmed Mohsen</h5>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    <span className="status-badge ">Qatar</span>
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
                    beneficiariesListingProps.showBeneficiariesDetailsModal
                  }
                >
                  <div className="col-sm-8">
                    <h4>Beneficiary ID | 12345678912345 </h4>
                    <h5>Ahmed Mohsen</h5>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    <span className="status-badge ">Qatar</span>
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
              onClick={showMoreBeneficiariesListing}
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

export default BeneficiariesListing;
