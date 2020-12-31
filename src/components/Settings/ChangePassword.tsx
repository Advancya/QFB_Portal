import React, { useContext, useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../providers/AuthProvider";

interface iChangePassword {
  showChangePasswordModal: boolean;
  hideChangePasswordModal: () => void;
  backSettingsLandingModal: () => void;
}
function ChangePassword(changePasswordProps: iChangePassword) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);

  return (
    <Modal
      show={changePasswordProps.showChangePasswordModal}
      onHide={changePasswordProps.hideChangePasswordModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="d-flex align-items-center">
          <div className="modal-header-text">
            <a
              href="#"
              onClick={changePasswordProps.backSettingsLandingModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4 id="newReqTxt">{local_Strings.ChangePasswordTitle}</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={changePasswordProps.hideChangePasswordModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box p-4  scrollabel-modal-box ">
          <div className="row">
            <div className="col-lg-5 form-group">
              <label>{local_Strings.ChangePasswordCurrentLabel}</label>
              <input
                type="text"
                className="form-control"
                placeholder="2345678901234567"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-5 form-group">
              <label>{local_Strings.ChangePasswordNewLabel}</label>
              <input
                type="text"
                className="form-control"
                placeholder="2345678901234567"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-5 form-group">
              <label>{local_Strings.ChangePasswordConfirmLabel}</label>
              <input
                type="text"
                className="form-control"
                placeholder="2345678901234567"
              />
            </div>
          </div>
          <div className="text-xs color-grey">
            {local_Strings.registerStep2Label3}
          </div>

          <div className="text-right p-3 ">
            <button id="applyReqBtn" className="btn btn-primary mx-2">
              {local_Strings.SettingSaveButton}
            </button>
            <button
              id="applyReqBtn"
              className="btn btn-primary"
              onClick={changePasswordProps.hideChangePasswordModal}
            >
              {local_Strings.SettingsCancelButton}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ChangePassword;
