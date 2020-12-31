import React, { useContext, useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../providers/AuthProvider";

interface iChangeCurrency {
  showChangeCurrencyModal: boolean;
  hideChangeCurrencyModal: () => void;
  backSettingsLandingModal: () => void;
}
function ChangeCurrency(changeCurrencyProps: iChangeCurrency) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);

  return (
    <Modal
      show={changeCurrencyProps.showChangeCurrencyModal}
      onHide={changeCurrencyProps.hideChangeCurrencyModal}
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
              onClick={changeCurrencyProps.backSettingsLandingModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4 id="newReqTxt">{local_Strings.ChangeCurrencyTitle}</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={changeCurrencyProps.hideChangeCurrencyModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box p-4  scrollabel-modal-box ">
          <div className="form-group">
            <div className="mb-2 text-18">
              {local_Strings.ChangeCurrencyLabelTitle}
            </div>
            <div className="custom-control custom-radio mx-2">
              <input
                type="radio"
                id="customRadio1"
                name="customRadio"
                className="custom-control-input"
              />
              <label
                className="custom-control-label color-black"
                htmlFor="customRadio1"
              >
                {local_Strings.ChangeCurrencyQAR}
              </label>
            </div>
            <div className="custom-control custom-radio  mx-2">
              <input
                type="radio"
                id="customRadio2"
                name="customRadio"
                className="custom-control-input"
              />
              <label
                className="custom-control-label color-black"
                htmlFor="customRadio2"
              >
                {local_Strings.ChangeCurrencyUSD}
              </label>
            </div>
            <div className="custom-control custom-radio  mx-2">
              <input
                type="radio"
                id="customRadio3"
                name="customRadio"
                className="custom-control-input"
              />
              <label
                className="custom-control-label color-black"
                htmlFor="customRadio3"
              >
                {local_Strings.ChangeCurrencyGPB}
              </label>
            </div>
            <div className="custom-control custom-radio  mx-2">
              <input
                type="radio"
                id="customRadio4"
                name="customRadio"
                className="custom-control-input"
              />
              <label
                className="custom-control-label color-black"
                htmlFor="customRadio4"
              >
                {local_Strings.ChangeCurrencyEUR}
              </label>
            </div>
          </div>
          <div className="text-right p-3 mt-5">
            <button id="applyReqBtn" className="btn btn-primary mx-2">
              {local_Strings.SettingSaveButton}
            </button>
            <button id="applyReqBtn" className="btn btn-primary">
              {local_Strings.SettingsCancelButton}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ChangeCurrency;
