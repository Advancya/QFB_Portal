import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from "../../translations/localStrings";

interface iForgotPasswordStep2 {
  showForgotPasswordStep2Modal: boolean;
  hideForgotPasswordStep2Modal: () => void;
  backForgotPasswordStep1Modal: () => void;
  showForgotPasswordStep3Modal: () => void;
}
function ForgotPasswordStep2(forgotPasswordStep2Props: iForgotPasswordStep2) {
  const showMoreForgotPasswordStep2 = () => {
    console.log("retrieve more from server");
  };

  return (
    <Modal
      show={forgotPasswordStep2Props.showForgotPasswordStep2Modal}
      onHide={forgotPasswordStep2Props.hideForgotPasswordStep2Modal}
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
                onClick={forgotPasswordStep2Props.backForgotPasswordStep1Modal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.registerTitle}</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={forgotPasswordStep2Props.hideForgotPasswordStep2Modal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box p-4  scrollabel-modal-box">
          <div className="container-fluid">
            <div className="row mb-3">
              <div className="col-md-8 col-sm-12">
                <h5>{local_Strings.registerStep2Hint}</h5>
              </div>
              <div className="col-md-4 col-sm-12 text-right">
                <span className="hintStep">
                  {local_Strings.registerStep2StepCount}
                </span>
              </div>
            </div>

            <div className="mb-3 row">
              <div className="col-lg-6 form-group">
                <label>{local_Strings.registerStep2Label1}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="2345678901234567"
                />
              </div>
              <div className="col-lg-6 form-group">
                <label>{local_Strings.registerStep2Label2}</label>
                <select className="form-control">
                  <option value="0">QAR</option>
                  <option value="1">USD</option>
                  <option value="2">AED</option>
                  <option value="3">EGY</option>
                </select>
              </div>
            </div>
            <div className="text-xs">{local_Strings.registerStep2Label3}</div>

            <div className="text-right p-3">
              <button
                id="applyReqBtn"
                className="btn btn-primary"
                onClick={forgotPasswordStep2Props.showForgotPasswordStep3Modal}
              >
                {local_Strings.registerStep2Button}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ForgotPasswordStep2;
