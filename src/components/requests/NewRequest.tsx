import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import requestSentIcon from "../../images/req-sent.svg";

interface iNewRequest {
  showNewRequestModal: boolean;
  hideNewRequestModal: () => void;
  backNewRequestModal: () => void;
}
function NewRequest(newRequestProps: iNewRequest) {
  const [showRequestFields, setShowRequestFields] = useState(false);
  const [valideForm, setValideForm] = useState(false);
  const [valideFormOTP, setvalideFormOTP] = useState(false);

  const requestTypeOnchangeHandler = (e: any) => {
    if (e.target.value != 0) {
      setShowRequestFields(true);
    } else {
      setShowRequestFields(false);
    }
  };

  const applyRequestHandler = () => {
    setValideForm(true);
  };
  const applyOTPRequestHandler = () => {
    setvalideFormOTP(true);
  };
  return (
    <Modal
      show={newRequestProps.showNewRequestModal}
      onHide={newRequestProps.hideNewRequestModal}
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
                onClick={newRequestProps.backNewRequestModal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">NEW REQUESTS</h4>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="close"
          onClick={newRequestProps.hideNewRequestModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div
          className={valideForm ? "box modal-box d-none" : "box modal-box"}
          id="applyReqBox"
        >
          <div className="py-2 px-3">
            <div className="row">
              <div className="col-lg-8">
                <label>Request Type</label>
                <select
                  className="form-control"
                  id="reqTypeSelect"
                  onChange={requestTypeOnchangeHandler}
                >
                  <option value="0">Select Type</option>
                  <option value="1">Account Statement</option>
                  <option value="2">Change Mobile Number</option>
                  <option value="3">Audit Balance Confirmation </option>
                  <option value="4">Change Email Address</option>
                  <option value="5">Upload Renewed Documents</option>
                  <option value="6">
                    Change Monthly Portfolio Statement Reference Currency
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div
            className={
              showRequestFields ? "newReqFields" : "newReqFields d-none"
            }
            id="newReqFields"
          >
            <div className="py-2 px-3">
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
            <div className="py-2 px-3">
              <div className="row">
                <div className="col-lg-8">
                  <label>Auditor Name</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
            <div className="py-2 px-3">
              <div className="row">
                <div className="col-lg-8">
                  <label>Comments</label>
                  <textarea value="" className="form-control">
                    {" "}
                  </textarea>
                </div>
              </div>
            </div>
            <div className="text-right p-3">
              <button
                id="applyReqBtn"
                className="btn btn-primary"
                onClick={applyRequestHandler}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <div
          className={
            valideForm && !valideFormOTP
              ? "box modal-box p-4"
              : "box modal-box p-4 d-none"
          }
          id="confirmOTPBox"
        >
          <p>Kindly enter the one time code you received.</p>
          <div className="row">
            <div className="col-lg-6">
              <label>Enter OTP</label>
              <input
                type="password"
                placeholder="• • • • • •"
                className="form-control"
              />
              <div className="text-right">
                <small>
                  <a href="#">Resend OTP ?</a>
                </small>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button
              id="submitOTPBtn"
              className="btn btn-primary"
              onClick={applyOTPRequestHandler}
            >
              Submit
            </button>
          </div>
        </div>

        <div
          className={valideFormOTP ? "box modal-box" : "box modal-box d-none"}
          id="confirmReqBox"
        >
          <div className="py-2 px-3 text-center text-sm-left">
            <div className="row align-items-center justify-content-center">
              <div className="col-sm-2">
                <img src={requestSentIcon} className="img-fluid my-3" />
              </div>
              <div className="col-sm-8">
                <h2 className="m-0 mb-4">Request Sent</h2>
                <h5>Your request has been sent successfully to your RM</h5>
              </div>
            </div>
          </div>
          <div className="text-right p-3">
            <button
              id="doneRequestBtn"
              data-dismiss="modal"
              className="btn btn-primary"
            >
              Done
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default NewRequest;
