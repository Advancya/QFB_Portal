import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from "../../translations/localStrings";

interface iForgotPasswordStep4 {
  showForgotPasswordStep4Modal: boolean;
  hideForgotPasswordStep4Modal: () => void;
  backForgotPasswordStep3Modal: () => void;
}
function ForgotPasswordStep4(ForgotPasswordStep4Props: iForgotPasswordStep4) {
  const showMoreForgotPasswordStep4 = () => {
    console.log("retrieve more from server");
  };

  return (
    <Modal
      show={ForgotPasswordStep4Props.showForgotPasswordStep4Modal}
      onHide={ForgotPasswordStep4Props.hideForgotPasswordStep4Modal}
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
                onClick={ForgotPasswordStep4Props.backForgotPasswordStep3Modal}
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
          onClick={ForgotPasswordStep4Props.hideForgotPasswordStep4Modal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box p-4  scrollabel-modal-box">
          <div className="container-fluid">
            <div className="text-right p-3">
              <button
                id="applyReqBtn"
                className="btn btn-primary"
                onClick={ForgotPasswordStep4Props.hideForgotPasswordStep4Modal}
              >
                {local_Strings.ConfirmationDone}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ForgotPasswordStep4;
