import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import xIcon from "../../images/x-icon.svg";

interface iManagmentPortfolioDetails {
  showManagmentPortfolioDetailsModal: boolean;
  hideManagmentPortfolioDetailsModal: () => void;
  backManagmentPortfolioDetailsgModal: () => void;
  showNewBeneficiaryModal: () => void;
}
function ManagmentPortfolioDetails(
  managmentPortfolioDetailsProps: iManagmentPortfolioDetails
) {
  return (
    <Modal
      show={managmentPortfolioDetailsProps.showManagmentPortfolioDetailsModal}
      onHide={managmentPortfolioDetailsProps.hideManagmentPortfolioDetailsModal}
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
              onClick={
                managmentPortfolioDetailsProps.backManagmentPortfolioDetailsgModal
              }
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4>Managment portfolio Details</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={
            managmentPortfolioDetailsProps.hideManagmentPortfolioDetailsModal
          }
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
                  <h4>Beneficiary ID | 12345678912345</h4>
                  <h4 className="text-18">Transfer to Ahmed</h4>
                </div>
                <div className="col-sm-4 text-sm-right">
                  <span className="status-badge">Qatar</span>
                </div>
              </div>
            </li>
          </ul>
          <div className="py-2">
            <div className=" col-lg-9">
              <div className="row mb-5">
                <div className="col-lg-6 form-group">
                  <label>Beneficiary ID</label>
                  <div className="readonly">QAR72341838470</div>
                </div>

                <div className="col-lg-6 form-group">
                  <label>Beneficiary Bank Swift Code</label>
                  <div className="readonly">QAR123456</div>
                </div>
                <div className="col-lg-6 form-group">
                  <label>Beneficiary QFB account Number or IBAN</label>

                  <div className="readonly">QAR72341838470</div>
                </div>
                <div className="col-lg-6 form-group">
                  <label>Beneficiary Bank</label>

                  <div className="readonly">QFB</div>
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-lg-6 form-group">
                  <label>Beneficiary Full Name</label>

                  <div className="readonly">Mohamed Ahmed</div>
                </div>

                <div className="col-lg-6 form-group">
                  <label>Beneficiary Account Number</label>

                  <div className="readonly">QAR72341838470</div>
                </div>

                <div className="col-lg-6 form-group">
                  <label>Beneficiary Account Currency</label>

                  <div className="readonly">QAR</div>
                </div>

                <div className="col-lg-6 form-group">
                  <label>Beneficiary IBAN</label>

                  <div className="readonly">QAR72341838470</div>
                </div>

                <div className="col-lg-6 form-group">
                  <label>Beneficiary Country</label>

                  <div className="readonly">Qatar</div>
                </div>
                <div className="col-lg-6 form-group">
                  <label>Beneficiary Address</label>

                  <div className="readonly">
                    Qatar Towers, 123 Street, Doha, Qatar
                  </div>
                </div>

                <div className="col-lg-6 form-group">
                  <label>Beneficiary City</label>

                  <div className="readonly">Doha</div>
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-lg-6 form-group ">
                  <label>Intermediary Bank SWIFT CODE</label>

                  <div className="readonly">QAR72341838470</div>
                </div>
                <div className="col-lg-6 form-group ">
                  <label>Intermediary Bank Name</label>

                  <div className="readonly">QAR72341838470</div>
                </div>

                <div className="col-lg-6 form-group">
                  <label>Routing Number/Sort Code,if any</label>

                  <div className="readonly">QAR72341838470</div>
                </div>
              </div>
            </div>
            <div className="text-right p-3">
              <button id="applyReqBtn" className="btn btn-primary mx-2">
                Edit
              </button>
              <button id="applyReqBtn" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ManagmentPortfolioDetails;
