import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";

interface iAuthOfferRequest {
  showAuthOfferRequestModal: boolean;
  hideAuthOfferRequestModal: () => void;
  backAuthOffersRequestModal: () => void;
}
function AuthOfferRequest(authOfferRequestProps: iAuthOfferRequest) {
  const showMoreAuthOfferRequest = () => {
    console.log("retrieve more from server");
  };

  return (
    <Modal
      show={authOfferRequestProps.showAuthOfferRequestModal}
      onHide={authOfferRequestProps.hideAuthOfferRequestModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="modal-header-text">
          <div className="d-flex align-items-center">
            <div className="ib-icon">
              <a
                href="#"
                onClick={authOfferRequestProps.backAuthOffersRequestModal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">Request To Subscribe</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={authOfferRequestProps.hideAuthOfferRequestModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
          <ul className="box-list mb-0">
            <li className="shown">
              <div className="row align-items-center py-2">
                <div className="col-md-12 ">
                  <div className="text-xs color-grey">
                    Wednesday 22 Nov 2020
                  </div>
                  <h6 className="mb-1 text-600 text-18 ">
                    Qatar First Bank aquires BSN sports’ HQ Building “Varsity
                    Brands” located in Texas
                  </h6>
                </div>
              </div>
            </li>
          </ul>
          <div className="container-fluid">
            <div className="p-3 mb-5 row">
              <div className="col-lg-6 form-group">
                <label>Subscription Amount</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="2345678901234567"
                />
              </div>
              <div className="col-lg-6 form-group">
                <label>Select Currency</label>
                <select className="form-control">
                  <option value="0">QAR</option>
                  <option value="1">USD</option>
                  <option value="2">AED</option>
                  <option value="3">EGY</option>
                </select>
              </div>
            </div>

            <div className="text-right p-3">
              <button id="applyReqBtn" className="btn btn-primary">
                Request to subscribe
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AuthOfferRequest;
