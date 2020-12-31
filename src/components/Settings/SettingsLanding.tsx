import React, { useContext, useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import ChangeCurrency from "./ChangeCurrency";

interface iSettingsLanding {
  showSettingsLandingModal: boolean;
  hideSettingsLandingModal: () => void;
  showChangeCurrencyModal: () => void;
  showChangePasswordModal: () => void;
  showChangeOTPMethodModal: () => void;
  showChangeLanguageModal: () => void;
}
function SettingsLanding(settingsLandingProps: iSettingsLanding) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);

  return (
    <Modal
      show={settingsLandingProps.showSettingsLandingModal}
      onHide={settingsLandingProps.hideSettingsLandingModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="modal-header-text">
          <div className="d-flex align-items-center">
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.SettingsLandingTitle}</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={settingsLandingProps.hideSettingsLandingModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box   scrollabel-modal-box ">
          <ul className="box-list">
            <li>
              <div className="box-list-details">
                <div className="row no-gutters align-items-center">
                  <div className="col-md-6">
                    <h6 className="mb-1 text-600 text-18 ">
                      Ahmed Hammad Nasser
                    </h6>
                    <div className="color-gray">CIF | 56789009</div>
                  </div>
                  <div className="col-md-6 text-md-right">
                    <a
                      href="tel:+974 00000000"
                      className="mx-1 color-gold text-xs d-block"
                    >
                      +974 00000000
                      <i
                        className="fa fa-mobile color-gold text-sm mx-1"
                        aria-hidden="true"
                      ></i>
                    </a>
                    <a
                      href="mailto:ahmedmohamed@gmail.com"
                      className=" color-gold text-xs d-block"
                    >
                      ahmedmohamed@gmail.com
                      <i
                        className="fa fa-envelope color-gold text-xs mx-1"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="p-4">
            <div className="row mb-4">
              <button
                id="applyReqBtn"
                className="btn btn-primary col-sm-8 col-md-4   mx-auto"
                onClick={settingsLandingProps.showChangeCurrencyModal}
              >
                {local_Strings.SettingsLandingButton1}
              </button>
            </div>
            <div className="row mb-4">
              <button
                id="applyReqBtn"
                className="btn btn-primary col-sm-8 col-md-4   mx-auto"
                onClick={settingsLandingProps.showChangePasswordModal}
              >
                {local_Strings.SettingsLandingButton2}
              </button>
            </div>
            <div className="row mb-4">
              <button
                id="applyReqBtn"
                className="btn btn-primary col-sm-8 col-md-4   mx-auto"
                onClick={settingsLandingProps.showChangeOTPMethodModal}
              >
                {local_Strings.SettingsLandingButton3}
              </button>
            </div>
            <div className="row mb-4">
              <button
                id="applyReqBtn"
                className="btn btn-primary col-sm-8 col-md-4   mx-auto"
                onClick={settingsLandingProps.showChangeLanguageModal}
              >
                {local_Strings.SettingsLandingButton4}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SettingsLanding;
