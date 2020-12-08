import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import facilitiesIcon from "../../../images/facilities-icon.svg";

interface iFacilitiesListing {
  showFacilitiesListingModal: boolean;
  hideFacilitiesListingModal: () => void;
  showFacilitiesDetailsModal: () => void;
}
function FacilitiesListing(facilitiesListingProps: iFacilitiesListing) {
  const showMoreFacilitiesListing = () => {
    console.log("retrieve more from server");
  };

  return (
    <div>
      <Modal
        show={facilitiesListingProps.showFacilitiesListingModal}
        onHide={facilitiesListingProps.hideFacilitiesListingModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-icon">
              <img src={facilitiesIcon} className="img-fluid" />
            </div>
            <div className="ib-text">
              <h4>Facilities</h4>
              <h5>3,150,000.00 QAR</h5>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={facilitiesListingProps.hideFacilitiesListingModal}
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
                  onClick={facilitiesListingProps.showFacilitiesDetailsModal}
                >
                  <div className="col-6 col-sm-4">
                    <h5>Facility No.</h5>
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
                  onClick={facilitiesListingProps.showFacilitiesDetailsModal}
                >
                  <div className="col-6 col-sm-4">
                    <h5>Facility No.</h5>
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
                  onClick={facilitiesListingProps.showFacilitiesDetailsModal}
                >
                  <div className="col-6 col-sm-4">
                    <h5>Facility No.</h5>
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
                  onClick={facilitiesListingProps.showFacilitiesDetailsModal}
                >
                  <div className="col-6 col-sm-4">
                    <h5>Facility No.</h5>
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
                  onClick={facilitiesListingProps.showFacilitiesDetailsModal}
                >
                  <div className="col-6 col-sm-4">
                    <h5>Facility No.</h5>
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
              onClick={showMoreFacilitiesListing}
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

export default FacilitiesListing;
