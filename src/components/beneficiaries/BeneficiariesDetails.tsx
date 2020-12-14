import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import excelIcon from "../../../images/excel.svg";

interface iBeneficiariesDetails {
  showBeneficiariesDetailsModal: boolean;
  hideBeneficiariesDetailsModal: () => void;
  backBeneficiariesListingModal: () => void;
  showNewTransactionModal: () => void;
}
function BeneficiariesDetails(
  beneficiariesDetailsProps: iBeneficiariesDetails
) {
  return (
    <Modal
      show={beneficiariesDetailsProps.showBeneficiariesDetailsModal}
      onHide={beneficiariesDetailsProps.hideBeneficiariesDetailsModal}
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
              onClick={beneficiariesDetailsProps.backBeneficiariesListingModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4>Beneficiaries</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={beneficiariesDetailsProps.hideBeneficiariesDetailsModal}
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
                  <h4 className="mb-2">Beneficiary ID | 12345678912345</h4>
                  <h4>Transfer to Ahmed</h4>
                </div>
                <div className="col-sm-4 text-sm-right">
                  <span className="status-badge">Qatar</span>
                </div>
              </div>
            </li>
          </ul>
          <div className="py-2">
            <div className="row col-lg-8">
              <div className="col-lg-6 form-group">
                <label>Beneficiary ID</label>

                <div className="readonly">QAR72341838470</div>
              </div>

              <div className="col-lg-6 form-group">
                <label>Beneficiary Bank Swift Code</label>
                <div className="readonly">QAR123456</div>
              </div>

              <div className="col-lg-6 form-group">
                <label>Beneficiary Full Name</label>

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

export default BeneficiariesDetails;
