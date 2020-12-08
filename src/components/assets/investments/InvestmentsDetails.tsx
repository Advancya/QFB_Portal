import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import excelIcon from "../../../images/excel.svg";

interface iInvestmentsDetails {
  showInvestmentsDetailsModal: boolean;
  hideInvestmentsDetailsModal: () => void;
  backInvestmentsListingModal: () => void;
  showInvestmentsRecievedProfit: () => void;
  showInvestmentsBuyAndSell: () => void;
}
function InvestmentsDetails(investmentsDetailsProps: iInvestmentsDetails) {
  return (
    <Modal
      show={investmentsDetailsProps.showInvestmentsDetailsModal}
      onHide={investmentsDetailsProps.hideInvestmentsDetailsModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="d-flex align-items-center">
          <div className="modal-header-text">
            <a
              href="#"
              onClick={investmentsDetailsProps.backInvestmentsListingModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4>Investments</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={investmentsDetailsProps.hideInvestmentsDetailsModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box">
          <ul className="box-list" id="investmentModalDetails">
            <li className="pb-3 px-4">
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <h3 className="text-capitalize">Investment</h3>
                  <h3 className="text-sm">300,000,000</h3>
                </div>
                <div className="col-sm-4 text-sm-right">
                  <strong className="status-badge status-badge-lg color-black text-xs">
                    QAR
                  </strong>
                  <br />
                  <strong className="status-badge status-badge-lg">
                    2.2 %
                  </strong>
                </div>
              </div>
            </li>
          </ul>
          <div className="px-4">
            <div className="formGrp">
              <label>Name</label>
              <p>Lorem Ipsum Dolor Sit</p>
            </div>
            <div className="formGrp">
              <label>Location</label>
              <p>Lorem Ipsum Dolor Sit</p>
            </div>
            <div className="formGrp">
              <label>Start Date</label>
              <p>22/11/2020</p>
            </div>
            <div className="formGrp">
              <label>Expected Profit Rate</label>
              <p>100,000</p>
            </div>
            <div className="formGrp">
              <label>Profit Distribution Term</label>
              <p>100,000</p>
            </div>
          </div>
          <div className="text-right px-4">
            <button
              id="viewBuySellTransaction"
              className="text-capitalize btn btn-primary maxSizeBtn mx-1"
              onClick={investmentsDetailsProps.showInvestmentsBuyAndSell}
            >
              View Buy And Sell Transaction
            </button>
            <a
              id="viewReceivedTransaction"
              href="#"
              className="text-capitalize btn btn-primary maxSizeBtn mx-1"
              onClick={investmentsDetailsProps.showInvestmentsRecievedProfit}
            >
              View Received Profit Transaction to date
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default InvestmentsDetails;
