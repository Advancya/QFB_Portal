import moment from "moment";
import React, { useContext, useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import excelIcon from "../../../images/excel.svg";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import xIcon from "../../images/x-icon.svg";

interface iRMDetails {
  showRMDetailsModal: boolean;
  hideRMDetailsModal: () => void;
  backRMDetailsgModal: () => void;
  showNewBeneficiaryModal: () => void;
}
function RMDetails(rMDetailsProps: iRMDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  return (
    <Modal
      show={rMDetailsProps.showRMDetailsModal}
      onHide={rMDetailsProps.hideRMDetailsModal}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="d-flex align-items-center">
          <div className="modal-header-text"></div>
          <div className="ib-text">
            <h4>{local_Strings.RMLandingClientRequestDetailsLabel}</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={rMDetailsProps.hideRMDetailsModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>

      <Modal.Body>
        <div className="box modal-box">
          <ul className="box-list" id="reqList1">
            <li className="pb-3">
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <h5 className="mb-2">{local_Strings.dummyDate}</h5>
                  <h4>{local_Strings.dummyTitle}</h4>
                </div>
                <div className="col-sm-4 text-sm-right">
                  {" "}
                  <span className="status-badge ">
                    {local_Strings.RequestListingSampleStatus}
                  </span>{" "}
                </div>
              </div>
            </li>
          </ul>
          <div className="py-2 px-3">
            <div className="row">
              <div className="col-lg-4">
                <label>{local_Strings.RequestFromLabel}</label>
                <input
                  type="date"
                  value="2020-06-01"
                  className="form-control"
                  disabled={true}
                />
              </div>
              <div className="col-lg-4">
                <label>{local_Strings.RequestToLabel}</label>
                <input
                  type="date"
                  value="2020-09-01"
                  className="form-control"
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div className="py-2 px-3">
            <div className="row">
              <div className="col-lg-8">
                <label>{local_Strings.RequestAuditorNameLabel}</label>
                <input
                  type="text"
                  value="Rotana Rotana Rotana Rotana Rotana Rotana Rotana"
                  className="form-control"
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div className="py-2 px-3">
            <div className="row">
              <div className="col-lg-8">
                <label>{local_Strings.RMDetailsRequestDetailsLabel}</label>
                <textarea
                  value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat."
                  className="form-control"
                  disabled={true}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="py-2 px-3">
            <div className="row">
              <div className="col-lg-4">
                <label>{local_Strings.RMDetailsChangeRequestStatusLabel}</label>
                <select className="form-control">
                  <option value="0">
                    {local_Strings.RequestListingFilterStatusOption1}
                  </option>
                  <option value="1">
                    {local_Strings.RequestListingFilterStatusOption2}
                  </option>
                  <option value="2">
                    {local_Strings.RequestListingFilterStatusOption3}
                  </option>
                  <option value="3">
                    {local_Strings.RequestListingFilterStatusOption4}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="text-right py-2 px-3">
            <button id="submitOTPBtn" className="btn btn-primary">
              {local_Strings.RMDetailsbutton}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RMDetails;
