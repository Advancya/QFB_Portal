import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import excelIcon from "../../../images/excel.svg";

interface iTransactionsDetails {
  showTransactionsDetailsModal: boolean;
  hideTransactionsDetailsModal: () => void;
  backTransactionsListingModal: () => void;
  showNewTransactionModal: () => void;
}
function TransactionsDetails(transactionsDetailsProps: iTransactionsDetails) {
  return (
    <Modal
      show={transactionsDetailsProps.showTransactionsDetailsModal}
      onHide={transactionsDetailsProps.hideTransactionsDetailsModal}
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
              onClick={transactionsDetailsProps.backTransactionsListingModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4>Transactions</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={transactionsDetailsProps.hideTransactionsDetailsModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box">
          <ul className="box-list" id="reqList1">
            <li className="pb-3">
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <h5 className="mb-2">27 October 2020</h5>
                  <h4>Transfer to Ahmed</h4>
                </div>
                <div className="col-sm-4 text-sm-right">
                  <span className="status-badge">In Progress</span>
                </div>
              </div>
            </li>
          </ul>
          <div className="py-2">
            <div className="row col-lg-9">
              <div className="col-lg-6 form-group">
                <label>From Account</label>

                <div className="readonly">2345678374656789 (QAR)</div>
              </div>

              <div className="col-lg-6 form-group">
                <label>To Account</label>
                <div className="readonly">2345678374656789 (QAR)</div>
              </div>

              <div className="col-lg-6 form-group">
                <label>Select Transfer Currency</label>

                <div className="readonly">QAR</div>
              </div>

              <div className="col-lg-6 form-group">
                <label>Amount</label>

                <div className="readonly">250.000,000 (QAR)</div>
              </div>
              <div className="col-lg-6 form-group">
                <label>Beneficiary</label>

                <div className="readonly">Ahmed Ali</div>
              </div>
              <div className="col-lg-6 form-group customDate">
                <label>Request Date</label>

                <div className="readonly date d-flex justify-content-between align-items-center">
                  2020-09-01
                  <i className="fa fa-calendar-o" aria-hidden="true"></i>
                </div>
              </div>
              <div className="col-lg-12">
                <label>Description / Purpose Of Payment</label>

                <div className="readonly">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default TransactionsDetails;
