import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import beneficiarySentIcon from "../../images/req-sent.svg";
import xIcon from "../../images/x-icon.svg";

interface iNewBeneficiary {
  showNewBeneficiaryModal: boolean;
  hideNewBeneficiaryModal: () => void;
  backNewBeneficiaryModal: () => void;
}
function NewBeneficiary(newBeneficiaryProps: iNewBeneficiary) {
  const [showBeneficiaryFields, setShowBeneficiaryFields] = useState(false);
  const [valideForm, setValideForm] = useState(false);
  const [valideFormOTP, setvalideFormOTP] = useState(false);

  const beneficiaryTypeOnchangeHandler = (e: any) => {
    if (e.target.value != 0) {
      setShowBeneficiaryFields(true);
    } else {
      setShowBeneficiaryFields(false);
    }
  };

  const applyBeneficiaryHandler = () => {
    setValideForm(true);
  };
  const applyOTPBeneficiaryHandler = () => {
    setvalideFormOTP(true);
  };
  return (
    <Modal
      show={newBeneficiaryProps.showNewBeneficiaryModal}
      onHide={newBeneficiaryProps.hideNewBeneficiaryModal}
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
                onClick={newBeneficiaryProps.backNewBeneficiaryModal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">New Beneficiaries Request</h4>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="close"
          onClick={newBeneficiaryProps.hideNewBeneficiaryModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
        <div
          className={valideForm ? "box modal-box d-none" : "box modal-box"}
          id="applyReqBox"
        >
          <div className="container-fluid">
            <div className="row ">
              <div className="col-lg-9 form-group">
                <label>Beneficiary Type</label>
                <select
                  className="form-control"
                  id="reqTypeSelect"
                  onChange={beneficiaryTypeOnchangeHandler}
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
              showBeneficiaryFields ? "newReqFields" : "newReqFields d-none"
            }
            id="newReqFields"
          >
            <div className="py-2">
              <div className=" col-lg-9">
                <div className="row mb-5">
                  <div className="col-lg-6 form-group">
                    <label>Beneficiary ID</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="QAR72341838470"
                    />
                  </div>

                  <div className="col-lg-6 form-group">
                    <label>Beneficiary Bank Swift Code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="QAR72341838470"
                    />
                  </div>
                  <div className="col-lg-6 form-group">
                    <label>Beneficiary QFB account Number or IBAN</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="QAR72341838470"
                    />
                  </div>
                  <div className="col-lg-6 form-group">
                    <label>Beneficiary Bank</label>
                    <select className="form-control">
                      <option value="0">QFB</option>
                      <option value="1">QFB</option>
                      <option value="2">QFB</option>
                      <option value="3">QFB</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-lg-6 form-group">
                    <label>Beneficiary Full Name</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mohamed Ahmed"
                    />
                  </div>

                  <div className="col-lg-6 form-group">
                    <label>Beneficiary Account Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mohamed Ahmed"
                    />
                  </div>

                  <div className="col-lg-6 form-group">
                    <label>Beneficiary Account Currency</label>

                    <select className="form-control">
                      <option value="0">QAR</option>
                      <option value="1">EGy</option>
                      <option value="2">USD</option>
                      <option value="3">AED</option>
                    </select>
                  </div>

                  <div className="col-lg-6 form-group">
                    <label>Beneficiary IBAN</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mohamed Ahmed"
                    />
                  </div>

                  <div className="col-lg-6 form-group">
                    <label>Beneficiary Country</label>

                    <select className="form-control">
                      <option value="0">Qatar</option>
                      <option value="1">USA</option>
                      <option value="2">Egypt</option>
                      <option value="3">UAE</option>
                    </select>
                  </div>
                  <div className="col-lg-6 form-group">
                    <label>Beneficiary City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Doha"
                    />
                  </div>
                  <div className="col-lg-12 form-group">
                    <label>Beneficiary Address</label>

                    <textarea
                      value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore"
                      className="form-control"
                    ></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 form-group ">
                    <label>Intermediary Bank SWIFT CODE</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="123"
                    />
                  </div>
                  <div className="col-lg-6 form-group ">
                    <label>Intermediary Bank Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Bank Name"
                    />
                  </div>

                  <div className="col-lg-6 form-group">
                    <label>Routing Number/Sort Code,if any</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="124345"
                    />
                  </div>
                </div>
              </div>
              <div className="text-right p-3">
                <button id="applyReqBtn" className="btn btn-primary">
                  Submit
                </button>
              </div>
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
              onClick={applyOTPBeneficiaryHandler}
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
                <img src={beneficiarySentIcon} className="img-fluid my-3" />
              </div>
              <div className="col-sm-8">
                <h2 className="m-0 mb-4">Beneficiary Sent</h2>
                <h5>Your beneficiary has been sent successfully to your RM</h5>
              </div>
            </div>
          </div>
          <div className="text-right p-3">
            <button
              id="doneBeneficiaryBtn"
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

export default NewBeneficiary;
