import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import excelIcon from "../../../images/excel.svg";

interface iFacilitiesDetails {
  showFacilitiesDetailsModal: boolean;
  hideFacilitiesDetailsModal: () => void;
  backFacilitiesListingModal: () => void;
  showFacilitiesOutstandingPayment: () => void;
  showFacilitiesHistoricalPayment: () => void;
}
function FacilitiesDetails(facilitiesDetailsProps: iFacilitiesDetails) {
  return (
    <Modal
      show={facilitiesDetailsProps.showFacilitiesDetailsModal}
      onHide={facilitiesDetailsProps.hideFacilitiesDetailsModal}
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
              onClick={facilitiesDetailsProps.backFacilitiesListingModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4>Facilities</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={facilitiesDetailsProps.hideFacilitiesDetailsModal}
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
                  <h3 className="text-capitalize">Facility</h3>
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
              onClick={facilitiesDetailsProps.showFacilitiesHistoricalPayment}
            >
              View Historical Payments
            </button>
            <a
              id="viewReceivedTransaction"
              href="#"
              className="text-capitalize btn btn-primary maxSizeBtn mx-1"
              onClick={facilitiesDetailsProps.showFacilitiesOutstandingPayment}
            >
              View Outstanding Payments
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default FacilitiesDetails;
