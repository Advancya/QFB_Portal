import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import depositeIcon from "../../../images/deposit-icon.svg";

interface iDepositeListing {
  showDepositeListingModal: boolean;
  hideDepositeListingModal: () => void;
  showDepositeDetailsModal: () => void;
}
function DepositeListing(depositeListingProps: iDepositeListing) {
  const showMoreDepositeListing = () => {
    console.log("retrieve more from server");
  };

  return (
    <div>
      <Modal
        show={depositeListingProps.showDepositeListingModal}
        onHide={depositeListingProps.hideDepositeListingModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-icon">
              <img src={depositeIcon} className="img-fluid" />
            </div>
            <div className="ib-text">
              <h4>Deposite</h4>
              <h5>3,150,000.00 QAR</h5>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={depositeListingProps.hideDepositeListingModal}
          >
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box">
            <ul className="box-list" id="dataList">
              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={depositeListingProps.showDepositeDetailsModal}
                >
                  <div className="col-6 col-sm-4">
                    <h5>Deposite No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-6 col-sm-4">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-10 col-sm-3">
                    <h5>Percentage</h5>
                    <h4>2.2%</h4>
                  </div>
                  <div className="col-2 col-sm-1 caretArrow">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>

              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={depositeListingProps.showDepositeDetailsModal}
                >
                  <div className="col-6 col-sm-4">
                    <h5>Deposite No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-6 col-sm-4">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-10 col-sm-3">
                    <h5>Percentage</h5>
                    <h4>2.2%</h4>
                  </div>
                  <div className="col-2 col-sm-1 caretArrow">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>

              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={depositeListingProps.showDepositeDetailsModal}
                >
                  <div className="col-6 col-sm-4">
                    <h5>Deposite No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-6 col-sm-4">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-10 col-sm-3">
                    <h5>Percentage</h5>
                    <h4>2.2%</h4>
                  </div>
                  <div className="col-2 col-sm-1 caretArrow">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>

              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={depositeListingProps.showDepositeDetailsModal}
                >
                  <div className="col-6 col-sm-4">
                    <h5>Deposite No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-6 col-sm-4">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-10 col-sm-3">
                    <h5>Percentage</h5>
                    <h4>2.2%</h4>
                  </div>
                  <div className="col-2 col-sm-1 caretArrow">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>

              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={depositeListingProps.showDepositeDetailsModal}
                >
                  <div className="col-6 col-sm-4">
                    <h5>Deposite No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-6 col-sm-4">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-10 col-sm-3">
                    <h5>Percentage</h5>
                    <h4>2.2%</h4>
                  </div>
                  <div className="col-2 col-sm-1 caretArrow">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="actionScrollButtons">
            <a
              id="moreButton"
              onClick={showMoreDepositeListing}
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

export default DepositeListing;
