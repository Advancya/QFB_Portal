import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import requestIcon from "../../images/request-icon-color.svg";

interface iRequestsListing {
  showRequestsListingModal: boolean;
  hideRequestsListingModal: () => void;
  showRequestsDetailsModal: () => void;
  showNewRequestModal: () => void;
}
function RequestsListing(requestsListingProps: iRequestsListing) {
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [showRequestDateFilter, setShowRequestDateFilter] = useState(false);

  const applyFilter = () => {
    setShowClearFilter(true);
  };

  const clearFilter = () => {
    setShowClearFilter(false);
  };
  const showMoreRequestsListing = () => {
    console.log("retrieve more from server");
  };
  const requestDateFilterOnchangeHandler = (e: any) => {
    if (e.target.value == 4) {
      setShowRequestDateFilter(true);
    } else {
      setShowRequestDateFilter(false);
    }
  };

  return (
    <div>
      <Modal
        show={requestsListingProps.showRequestsListingModal}
        onHide={requestsListingProps.hideRequestsListingModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-icon bg-icon">
              <img src={requestIcon} className="img-fluid" />
            </div>
            <div className="ib-text d-flex align-items-center">
              <h4>Requests</h4>
              <a
                className="btnOutlineWhite"
                href="#"
                onClick={requestsListingProps.showNewRequestModal}
                id="newRequestBtn"
              >
                <i className="fa fa-plus-circle"></i> New Request
              </a>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={requestsListingProps.hideRequestsListingModal}
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
              <div className="col-sm-3">
                <label>Request Status</label>
                <select className="form-control" id="inlineFormCustomSelect3">
                  <option>All</option>
                  <option value="1">Pending</option>
                  <option value="2">Closed </option>
                  <option value="3">Cancelled</option>
                </select>
              </div>
              <div className="col-sm-3">
                <label>Request Type</label>
                <select className="form-control" id="selectReqTypeDD">
                  <option value="0">Select Type</option>
                  <option value="1">Account Statement</option>
                  <option value="2">Change Mobile Number</option>
                  <option value="3">Audit Balance Confirmation </option>
                  <option value="4">Change Email Address</option>
                  <option value="5">Upload Renewed Documents</option>
                  <option value="6">
                    Change Monthly Portfolio Statement Reference Currency{" "}
                  </option>
                </select>
              </div>
              <div className="col-sm-3">
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
                  showRequestDateFilter
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
                {" "}
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={requestsListingProps.showRequestsDetailsModal}
                >
                  <div className="col-sm-8">
                    <h5>05/11/2020</h5>
                    <h4>Soler sumitLorem ipsum doler </h4>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    {" "}
                    <span className="status-badge ">Pending</span>{" "}
                  </div>
                  <div className="col-4 col-sm-1 text-right">
                    {" "}
                    <i className="fa fa-chevron-right"></i>{" "}
                  </div>
                </a>{" "}
              </li>
              <li className="shown">
                {" "}
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={requestsListingProps.showRequestsDetailsModal}
                >
                  <div className="col-sm-8">
                    <h5>05/11/2020</h5>
                    <h4>Soler sumitLorem ipsum doler </h4>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    {" "}
                    <span className="status-badge ">Closed</span>{" "}
                  </div>
                  <div className="col-4 col-sm-1 text-right">
                    {" "}
                    <i className="fa fa-chevron-right"></i>{" "}
                  </div>
                </a>{" "}
              </li>
              <li className="shown">
                {" "}
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={requestsListingProps.showRequestsDetailsModal}
                >
                  <div className="col-sm-8">
                    <h5>05/11/2020</h5>
                    <h4>Soler sumitLorem ipsum doler </h4>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    {" "}
                    <span className="status-badge ">Pending</span>{" "}
                  </div>
                  <div className="col-4 col-sm-1 text-right">
                    {" "}
                    <i className="fa fa-chevron-right"></i>{" "}
                  </div>
                </a>{" "}
              </li>
              <li className="shown">
                {" "}
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={requestsListingProps.showRequestsDetailsModal}
                >
                  <div className="col-sm-8">
                    <h5>05/11/2020</h5>
                    <h4>Soler sumitLorem ipsum doler </h4>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    {" "}
                    <span className="status-badge ">Cancelled</span>{" "}
                  </div>
                  <div className="col-4 col-sm-1 text-right">
                    {" "}
                    <i className="fa fa-chevron-right"></i>{" "}
                  </div>
                </a>{" "}
              </li>
              <li className="shown">
                {" "}
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={requestsListingProps.showRequestsDetailsModal}
                >
                  <div className="col-sm-8">
                    <h5>05/11/2020</h5>
                    <h4>Soler sumitLorem ipsum doler </h4>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    {" "}
                    <span className="status-badge ">Pending</span>{" "}
                  </div>
                  <div className="col-4 col-sm-1 text-right">
                    {" "}
                    <i className="fa fa-chevron-right"></i>{" "}
                  </div>
                </a>{" "}
              </li>
              <li className="hidden">
                {" "}
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={requestsListingProps.showRequestsDetailsModal}
                >
                  <div className="col-sm-8">
                    <h5>05/11/2020</h5>
                    <h4>Soler sumitLorem ipsum doler </h4>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    {" "}
                    <span className="status-badge ">Cancelled</span>{" "}
                  </div>
                  <div className="col-4 col-sm-1 text-right">
                    {" "}
                    <i className="fa fa-chevron-right"></i>{" "}
                  </div>
                </a>{" "}
              </li>
              <li className="hidden">
                {" "}
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={requestsListingProps.showRequestsDetailsModal}
                >
                  <div className="col-sm-8">
                    <h5>05/11/2020</h5>
                    <h4>Soler sumitLorem ipsum doler </h4>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    {" "}
                    <span className="status-badge ">Closed</span>{" "}
                  </div>
                  <div className="col-4 col-sm-1 text-right">
                    {" "}
                    <i className="fa fa-chevron-right"></i>{" "}
                  </div>
                </a>{" "}
              </li>
              <li className="hidden">
                {" "}
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={requestsListingProps.showRequestsDetailsModal}
                >
                  <div className="col-sm-8">
                    <h5>05/11/2020</h5>
                    <h4>Soler sumitLorem ipsum doler </h4>
                  </div>
                  <div className="col-8 col-sm-3 text-sm-right">
                    {" "}
                    <span className="status-badge ">Cancelled</span>{" "}
                  </div>
                  <div className="col-4 col-sm-1 text-right">
                    {" "}
                    <i className="fa fa-chevron-right"></i>{" "}
                  </div>
                </a>{" "}
              </li>
            </ul>
          </div>

          <div className="actionScrollButtons">
            <a
              id="moreButton"
              onClick={showMoreRequestsListing}
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

export default RequestsListing;
