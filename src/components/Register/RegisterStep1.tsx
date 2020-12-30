import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import productsIcon from "../../images/products-icon.png";
import { localStrings as local_Strings } from "../../translations/localStrings";

interface iRegisterStep1 {
  showRegisterStep1Modal: boolean;
  hideRegisterStep1Modal: () => void;
  showRegisterStep2Modal: () => void;
}
function RegisterStep1(registerStep1Props: iRegisterStep1) {
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [openTransactionInfo, setOpenTransactionInfo] = useState(false);

  return (
    <div>
      <Modal
        show={registerStep1Props.showRegisterStep1Modal}
        onHide={registerStep1Props.hideRegisterStep1Modal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-text">
              <h4>{local_Strings.registerTitle}</h4>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={registerStep1Props.hideRegisterStep1Modal}
          >
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box p-4 scrollabel-modal-box">
            <div className="container-fluid">
              <div className="row mb-3">
                <div className="col-md-8 col-sm-12">
                  <h5>{local_Strings.registerStep1Hint}</h5>
                </div>
                <div className="col-md-4 col-sm-12 text-right">
                  <span className="hintStep">
                    {local_Strings.registerStep1StepCount}
                  </span>
                </div>
              </div>

              <div className="mb-5  row ">
                <div className="col-lg-6 form-group">
                  <label>{local_Strings.registerStep1Label1}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="2345678901234567"
                  />
                </div>
                <div className="col-lg-6 form-group">
                  <label>{local_Strings.registerStep1Label2}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="2345678901234567"
                  />
                </div>

                <div className="col-lg-6 form-group">
                  <label>{local_Strings.registerStep1Label3}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="2345678901234567"
                  />
                </div>
                <div className="col-lg-6 form-group">
                  <label>{local_Strings.registerStep1Label4}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="2345678901234567"
                  />
                </div>
              </div>

              <div className="text-right p-3">
                <button
                  id="applyReqBtn"
                  className="btn btn-primary"
                  onClick={registerStep1Props.showRegisterStep2Modal}
                >
                  {local_Strings.registerStep1Button}
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RegisterStep1;
