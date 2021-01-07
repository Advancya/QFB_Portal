import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import productsIcon from "../../images/products-icon.png";
import { localStrings as local_Strings } from "../../translations/localStrings";

interface iForgotPasswordStep1 {
  showForgotPasswordStep1Modal: boolean;
  hideForgotPasswordStep1Modal: () => void;
  showForgotPasswordStep2Modal: () => void;
}
function ForgotPasswordStep1(forgotPasswordStep1Props: iForgotPasswordStep1) {
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [openTransactionInfo, setOpenTransactionInfo] = useState(false);

  return (
    <div>
      <Modal
        show={forgotPasswordStep1Props.showForgotPasswordStep1Modal}
        onHide={forgotPasswordStep1Props.hideForgotPasswordStep1Modal}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-text">
              <h4>{local_Strings.PasswordResetTitle}</h4>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={forgotPasswordStep1Props.hideForgotPasswordStep1Modal}
          >
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box p-4 scrollabel-modal-box">
            <div className="container-fluid">
              <div className="row mb-3">
                <div className="col-md-12 col-sm-12">
                  <h5>{local_Strings.PasswordResetHint}</h5>
                </div>
              </div>

              <div className="mb-3  row ">
                <div className="col-lg-12 form-group">
                  <label>{local_Strings.PasswordResetUserNameLabel}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="2345678901234567"
                  />
                </div>
                <div className="col-lg-12 form-group">
                  <label>{local_Strings.PasswordResetMobileLabel}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="2345678901234567"
                  />
                </div>

                <div className="col-lg-12 form-group">
                  <label>{local_Strings.PasswordResetEmailLabel}</label>
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
                  onClick={
                    forgotPasswordStep1Props.showForgotPasswordStep2Modal
                  }
                >
                  {local_Strings.PasswordResetButton}
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ForgotPasswordStep1;
