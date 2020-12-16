import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import transactionSentIcon from "../../images/req-sent.svg";

interface iNewTransaction {
  showNewTransactionModal: boolean;
  hideNewTransactionModal: () => void;
  backNewTransactionModal: () => void;
}
function NewTransaction(newTransactionProps: iNewTransaction) {
  const [showTransactionFields, setShowTransactionFields] = useState(false);
  const [valideForm, setValideForm] = useState(false);
  const [valideFormOTP, setvalideFormOTP] = useState(false);

  const transactionTypeOnchangeHandler = (e: any) => {
    if (e.target.value != 0) {
      setShowTransactionFields(true);
    } else {
      setShowTransactionFields(false);
    }
  };

  const applyTransactionHandler = () => {
    setValideForm(true);
  };
  const applyOTPTransactionHandler = () => {
    setvalideFormOTP(true);
  };
  return (
    <Modal
      show={newTransactionProps.showNewTransactionModal}
      onHide={newTransactionProps.hideNewTransactionModal}
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
                onClick={newTransactionProps.backNewTransactionModal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">New Transactions Request</h4>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="close"
          onClick={newTransactionProps.hideNewTransactionModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div
          className={valideForm ? "box modal-box d-none" : "box modal-box"}
          id="applyReqBox"
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-9 form-group">
                <label>Transaction Type</label>
                <select
                  className="form-control"
                  id="reqTypeSelect"
                  onChange={transactionTypeOnchangeHandler}
                >
                  <option value="0">Select Type</option>
                  <option value="1">Within my account</option>
                  <option value="2">Local</option>
                  <option value="3">International </option>
                </select>
              </div>
            </div>
          </div>
          <div
            className={
              showTransactionFields ? "newReqFields" : "newReqFields d-none"
            }
            id="newReqFields"
          >
            <div className="py-2">
              <div className="row col-lg-9">
                <div className="col-lg-6 form-group">
                  <label>From Account</label>
                  <select className="form-control">
                    <option value="0">2345678374656789 (QAR)</option>
                    <option value="1">2345678374656789 (QAR)</option>
                    <option value="2">2345678374656789 (QAR)</option>
                    <option value="3">2345678374656789 (QAR) </option>
                  </select>
                </div>

                <div className="col-lg-6 form-group">
                  <label>To Account</label>
                  <select className="form-control">
                    <option value="0">2345678374656789 (QAR)</option>
                    <option value="1">2345678374656789 (QAR)</option>
                    <option value="2">2345678374656789 (QAR)</option>
                    <option value="3">2345678374656789 (QAR) </option>
                  </select>
                </div>

                <div className="col-lg-6 form-group">
                  <label>Select Transfer Currency</label>
                  <select className="form-control">
                    <option value="0">QAR</option>
                    <option value="1">EGy</option>
                    <option value="2">USD</option>
                    <option value="3">AED</option>
                  </select>
                </div>

                <div className="col-lg-6 form-group">
                  <label>Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="250.000,000 (QAR)"
                  />
                </div>
                <div className="col-lg-6 form-group">
                  <label>Beneficiary</label>
                  <select className="form-control">
                    <option value="0">Ahmed Ali</option>
                    <option value="1">Ahmed Ali</option>
                    <option value="2">Ahmed Ali</option>
                    <option value="3">Ahmed Ali</option>
                  </select>
                </div>
                <div className="col-lg-6 form-group customDate">
                  <label>Request Date</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="col-lg-12">
                  <label>Description / Purpose Of Payment</label>
                  <textarea value="" className="form-control"></textarea>
                </div>
              </div>
            </div>

            <div className="text-right p-3">
              <button
                id="applyReqBtn"
                className="btn btn-primary"
                onClick={applyTransactionHandler}
              >
                Submit
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
              onClick={applyOTPTransactionHandler}
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
                <img src={transactionSentIcon} className="img-fluid my-3" />
              </div>
              <div className="col-sm-8">
                <h2 className="m-0 mb-4">Transaction Sent</h2>
                <h5>Your transaction has been sent successfully to your RM</h5>
              </div>
            </div>
          </div>
          <div className="text-right p-3">
            <button
              id="doneTransactionBtn"
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

export default NewTransaction;
