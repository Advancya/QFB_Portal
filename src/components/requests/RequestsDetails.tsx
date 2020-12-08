import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import excelIcon from "../../../images/excel.svg";

interface iRequestsDetails {
  showRequestsDetailsModal: boolean;
  hideRequestsDetailsModal: () => void;
  backRequestsListingModal: () => void;
  showNewRequestModal: () => void;
}
function RequestsDetails(requestsDetailsProps: iRequestsDetails) {
  return (
    <Modal
      show={requestsDetailsProps.showRequestsDetailsModal}
      onHide={requestsDetailsProps.hideRequestsDetailsModal}
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
              onClick={requestsDetailsProps.backRequestsListingModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4>Requests</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={requestsDetailsProps.hideRequestsDetailsModal}
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
                  <h5 className="mb-2">05/11/2020</h5>
                  <h4>Soler sumitLorem ipsum doler </h4>
                </div>
                <div className="col-sm-4 text-sm-right">
                  {" "}
                  <span className="status-badge ">Pending</span>{" "}
                </div>
              </div>
            </li>
          </ul>
          <div className="py-2 px-3">
            <div className="row">
              <div className="col-lg-4">
                <label>From</label>
                <input
                  type="date"
                  value="2020-06-01"
                  className="form-control"
                  disabled={true}
                />
              </div>
              <div className="col-lg-4">
                <label>To</label>
                <input
                  type="date"
                  value="2020-09-01"
                  className="form-control"
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div className="py-2 px-3">
            <div className="row">
              <div className="col-lg-8">
                <label>Auditor Name</label>
                <input
                  type="text"
                  value="Rotana Rotana Rotana Rotana Rotana Rotana Rotana"
                  className="form-control"
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div className="py-2 px-3">
            <div className="row">
              <div className="col-lg-8">
                <label>Comments</label>
                <textarea
                  value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat."
                  className="form-control"
                  disabled={true}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RequestsDetails;
