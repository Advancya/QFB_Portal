import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import guaranteesIcon from "../../../images/guaranties-icon.svg";

interface iGuaranteesListing {
  showGuaranteesListingModal: boolean;
  hideGuaranteesListingModal: () => void;
  showGuaranteesDetailsModal: () => void;
}
function GuaranteesListing(guaranteesListingProps: iGuaranteesListing) {
  const showMoreGuaranteesListing = () => {
    console.log("retrieve more from server");
  };

  return (
    <div>
      <Modal
        show={guaranteesListingProps.showGuaranteesListingModal}
        onHide={guaranteesListingProps.hideGuaranteesListingModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-icon">
              <img src={guaranteesIcon} className="img-fluid" />
            </div>
            <div className="ib-text">
              <h4>Guarantees</h4>
              <h5>3,150,000.00 QAR</h5>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={guaranteesListingProps.hideGuaranteesListingModal}
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
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="hidden">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="hidden">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="hidden">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="hidden">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="hidden">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="hidden">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="hidden">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="hidden">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="hidden">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="hidden">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="hidden">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="hidden">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
              <li className="hidden">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={guaranteesListingProps.showGuaranteesDetailsModal}
                >
                  <div className="col-2 col-sm-1">
                    <span className="curr-icon">QAR</span>
                  </div>
                  <div className="col-8 col-sm-4">
                    <h5>Account No.</h5>
                    <h4>1223245672802900</h4>
                  </div>
                  <div className="col-8 offset-2 offset-sm-0 col-sm-6">
                    <h5>Balance</h5>
                    <h4>3,150,000.00 QAR</h4>
                  </div>
                  <div className="col-2 col-sm-1 text-right">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="actionScrollButtons">
            <a
              id="moreButton"
              onClick={showMoreGuaranteesListing}
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

export default GuaranteesListing;
