import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import xIcon from "../../images/x-icon.svg";
import React, { useContext, useEffect, useState } from "react";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import {
  DeleteDeneficiary,
  iBeneficiary,
} from "../../services/transactionService";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import Swal from "sweetalert2";

interface iBeneficiariesDetails {
  showBeneficiariesDetailsModal: boolean;
  hideBeneficiariesDetailsModal: () => void;
  backBeneficiariesDetailsgModal: () => void;
  showEditBeneficiaryModal: () => void;
  beneficiary: iBeneficiary;
  refreshBeneficiariesListing: () => void;
}

function BeneficiariesDetails(props: iBeneficiariesDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);

  return (
    <Modal
      show={props.showBeneficiariesDetailsModal}
      onHide={props.hideBeneficiariesDetailsModal}
      //   size="lg"
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
              onClick={props.backBeneficiariesDetailsgModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4>{local_Strings.BeneficiariesDetailsTitle}</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideBeneficiariesDetailsModal}
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
                  <h4>
                    {local_Strings.BeneficiariesListingIDLabel +
                      props.beneficiary?.beneficiaryId}
                  </h4>
                  <h4 className="text-18">
                    {props.beneficiary?.beneficiaryFullName}
                  </h4>
                </div>
                <div className="col-sm-4 text-sm-right">
                  <span className="status-badge">
                    {props.beneficiary?.country || ""}
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <div className="py-2 px-4">
            <div className="row">
              {props.beneficiary?.typeId === "1" && (
                <div className="  col-xl-12">
                  <div className="row mb-5">
                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.BeneficiaryIDLabel}</label>
                      <div className="readonly">
                        {props.beneficiary.beneficiaryId || ""}
                      </div>
                    </div>

                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.BeneficiaryFullNameLabel}</label>
                      <div className="readonly">
                        {props.beneficiary.beneficiaryFullName || ""}
                      </div>
                    </div>
                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.BeneficiaryQFBAccountOrIBAN}</label>

                      <div className="readonly">
                        {props.beneficiary.qfbaccount || ""}
                      </div>
                    </div>
                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.TransactionCurrencyLabel}</label>

                      <div className="readonly">
                        {props.beneficiary.beneficiaryCurrency || ""}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {props.beneficiary?.typeId === "2" && (
                <div className="  col-xl-12">
                  <div className="row mb-5">
                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.BeneficiaryIDLabel}</label>
                      <div className="readonly">
                        {props.beneficiary.beneficiaryId || ""}
                      </div>
                    </div>
                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.BeneficiaryFullNameLabel}</label>
                      <div className="readonly">
                        {props.beneficiary.beneficiaryFullName || ""}
                      </div>
                    </div>
                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.BeneficiaryBankLabel}</label>
                      <div className="readonly">
                        {props.beneficiary.beneficiaryBank || ""}
                      </div>
                    </div>
                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.BeneficiarySwiftCodeLabel}</label>
                      <div className="readonly">
                        {props.beneficiary.beneficiaryBankSwiftCode || ""}
                      </div>
                    </div>
                    <div className="col-lg-6 form-group">
                      <label>
                        {local_Strings.BeneficiaryForeignCurrencyLabel}
                      </label>
                      <div className="readonly">
                        {props.beneficiary.beneficiaryCurrency || ""}
                      </div>
                    </div>
                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.BeneficiaryAddressLabel}</label>
                      <div className="readonly">
                        {props.beneficiary.beneficiaryAddress || ""}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {props.beneficiary?.typeId === "3" && (
                <div className="  col-xl-12">
                  <div className="row mb-5">
                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.BeneficiaryIDLabel}</label>
                      <div className="readonly">
                        {props.beneficiary.beneficiaryId || ""}
                      </div>
                    </div>

                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.BeneficiaryFullNameLabel}</label>
                      <div className="readonly">
                        {props.beneficiary.beneficiaryFullName || ""}
                      </div>
                    </div>

                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.BeneficiarySwiftCodeLabel}</label>
                      <div className="readonly">
                        {props.beneficiary.beneficiarySwiftCode || ""}
                      </div>
                    </div>

                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.BeneficiaryBankLabel}</label>
                      <div className="readonly">
                        {props.beneficiary.beneficiaryBank || ""}
                      </div>
                    </div>

                    <div className="col-lg-6 form-group">
                      <label>
                        {local_Strings.BeneficiaryAccountNumberLabel}
                      </label>
                      <div className="readonly">
                        {props.beneficiary.beneficiaryAccountNumber || ""}
                      </div>
                    </div>
                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.BeneficiaryIBANLabel}</label>
                      <div className="readonly">
                        {props.beneficiary.beneficiaryIban || ""}
                      </div>
                    </div>
                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.BeneficiaryAddressLabel}</label>
                      <div className="readonly">
                        {props.beneficiary.beneficiaryAddress || ""}
                      </div>
                    </div>
                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.BeneficiaryCountryLabel}</label>
                      <div className="readonly">
                        {props.beneficiary.country || ""}
                      </div>
                    </div>
                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.BeneficiaryCityLabel}</label>
                      <div className="readonly">
                        {props.beneficiary.beneficiaryCity || ""}
                      </div>
                    </div>
                    <div className="col-lg-6 form-group">
                      <label>
                        {
                          local_Strings.BeneficiaryIntermediaryBankSwiftCodeLabel
                        }
                      </label>
                      <div className="readonly">
                        {props.beneficiary.intermediaryBankSwiftCode || ""}
                      </div>
                    </div>
                    <div className="col-lg-6 form-group">
                      <label>
                        {local_Strings.BeneficiaryIntermediaryBankLabel}
                      </label>
                      <div className="readonly">
                        {props.beneficiary.intermediaryBankName || ""}
                      </div>
                    </div>
                    <div className="col-lg-6 form-group">
                      <label>
                        {local_Strings.BeneficiaryRoutingNumberLabel}
                      </label>
                      <div className="readonly">
                        {props.beneficiary.routingNumber || ""}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {currentContext.userRole === "CUSTOMER" && (
              <div className="text-right">
                <LoadingOverlay
                  active={isLoading}
                  spinner={
                    <PuffLoader
                      size={Constant.SpnnerSize}
                      color={Constant.SpinnerColor}
                    />
                  }
                />
                <button
                  id="applyReqBtn"
                  className="btn btn-primary mx-2"
                  type="button"
                  onClick={() => props.showEditBeneficiaryModal()}
                >
                  {local_Strings.BeneficiaryEditButton}
                </button>
                <button
                  id="applyReqBtn"
                  className="btn btn-primary"
                  type="button"
                  onClick={(e) => {
                    Swal.fire({
                      title: local_Strings.DeleteConfirmationTitle,
                      text: local_Strings.DeleteConfirmationBody,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#6b4f44",
                      confirmButtonText: local_Strings.OfferDeleteButton,
                      cancelButtonText: local_Strings.cancelBtn,
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        setLoading(true);
                        const res = await DeleteDeneficiary(
                          props.beneficiary.id
                        );
                        if (res) {
                          setLoading(false);
                          props.refreshBeneficiariesListing();
                        }
                        setLoading(false);
                      }
                    });
                  }}
                >
                  {local_Strings.BeneficiaryDeleteButton}
                </button>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default BeneficiariesDetails;
