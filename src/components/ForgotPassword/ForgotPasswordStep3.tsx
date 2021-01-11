import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from "../../translations/localStrings";
import xIcon from "../../images/x-icon.svg";

interface iForgotPasswordStep3 {
  showForgotPasswordStep3Modal: boolean;
  hideForgotPasswordStep3Modal: () => void;
  backForgotPasswordStep2Modal: () => void;
  showForgotPasswordStep4Modal: () => void;
}
function ForgotPasswordStep3(forgotPasswordStep3Props: iForgotPasswordStep3) {
  const showMoreForgotPasswordStep3 = () => {
    console.log("retrieve more from server");
  };

  return (
    <Modal
      show={forgotPasswordStep3Props.showForgotPasswordStep3Modal}
      onHide={forgotPasswordStep3Props.hideForgotPasswordStep3Modal}
      // size="lg"
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
                onClick={forgotPasswordStep3Props.backForgotPasswordStep2Modal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.PasswordResetRequestTitle}</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={forgotPasswordStep3Props.hideForgotPasswordStep3Modal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box p-4  scrollabel-modal-box">
          <div className="container-fluid">
            <div className="row mb-3">
              <div className="col-md-12 col-sm-12">
                <h5>{local_Strings.PasswordResetRequestHint}</h5>
              </div>
            </div>

            <div className="mb-3 row">
              <div className="col-lg-12 form-group">
                <label>{local_Strings.PasswordResetRequestEnterPassword}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="2345678901234567"
                />
              </div>
              <div className="col-lg-12 form-group">
                <label>
                  {local_Strings.PasswordResetRequestResendConfirmPassword}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="2345678901234567"
                />
              </div>
            </div>

            <div className="text-right">
              <button
                id="applyReqBtn"
                className="btn btn-primary"
                onClick={forgotPasswordStep3Props.showForgotPasswordStep4Modal}
              >
                {local_Strings.PasswordResetRequestButton}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ForgotPasswordStep3;
