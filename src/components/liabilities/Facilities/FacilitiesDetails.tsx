import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { localStrings as local_Strings } from "../../../translations/localStrings";
import { AuthContext } from "../../../providers/AuthProvider";
import {
  emptyLoanDetail,
  ILoanDetail,
} from "../../../Helpers/publicInterfaces";
import Constant from "../../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { GetFacilityDetails } from "../../../services/cmsService";
import * as helper from "../../../Helpers/helper";
import xIcon from "../../../images/x-icon.svg";

interface iFacilitiesDetails {
  showFacilitiesDetailsModal: boolean;
  hideFacilitiesDetailsModal: () => void;
  backFacilitiesListingModal: () => void;
  showFacilitiesOutstandingPayment: () => void;
  showFacilitiesHistoricalPayment: () => void;
  facilityNumber: string;
}

function FacilitiesDetails(props: iFacilitiesDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const [item, setDetail] = useState<ILoanDetail>(emptyLoanDetail);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    GetFacilityDetails(currentContext.selectedCIF, props.facilityNumber)
      .then((responseData: any) => {
        if (responseData && responseData.length > 0 && isMounted) {
          const _detail = helper.transformingStringToJSON(
            responseData[0],
            currentContext.language
          );
          setDetail(_detail);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [props.facilityNumber]);

  return (
    <Modal
      show={props.showFacilitiesDetailsModal}
      onHide={props.hideFacilitiesDetailsModal}
      // size="lg"
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
              onClick={props.backFacilitiesListingModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4>{local_Strings.LoanDetail}</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideFacilitiesDetailsModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box">
          <LoadingOverlay
            active={isLoading}
            spinner={
              <PuffLoader
                size={Constant.SpnnerSize}
                color={Constant.SpinnerColor}
              />
            }
          />
          <ul className="box-list" id="investmentModalDetails">
            <li className="py-3 px-4 mb-3 border-bottom rounded-0">
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <h3 className="text-capitalize color-gold">
                    {local_Strings.LoanNo + " | " + props.facilityNumber}
                  </h3>
                  <h3 className="text-sm">
                    {item.OutstandingAmount.value || "0"}
                  </h3>
                </div>
                <div className="col-sm-4 text-sm-right">
                  <strong className="status-badge status-badge-lg color-gold text-xs">
                    {item.Currency.value || ""}
                  </strong>
                  <br />
                  <strong className="status-badge status-badge-lg">
                    {item.ProfitRate.value || ""}
                  </strong>
                </div>
              </div>
            </li>
          </ul>
          <div className="px-4">
            <div className="formGrp">
              <label>{item.FacilityReference.label}</label>
              <p>{item.FacilityReference.value || ""}</p>
            </div>
            <div className="formGrp">
              <label>{item.Currency.label}</label>
              <p>{item.Currency.value || ""}</p>
            </div>
            <div className="formGrp">
              <label>{item.OutstandingAmount.label}</label>
              <p>{item.OutstandingAmount.value || ""}</p>
            </div>
            <div className="formGrp">
              <label>{item.StartDate.label}</label>
              <p>{item.StartDate.value || ""}</p>
            </div>
            <div className="formGrp">
              <label>{item.MaturityDate.label}</label>
              <p>{item.MaturityDate.value || ""}</p>
            </div>
            <div className="formGrp">
              <label>{item.ProfitRate.label}</label>
              <p>{item.ProfitRate.value || ""}</p>
            </div>
          </div>
          <div className="text-right px-4">
            <button
              id="viewBuySellTransaction"
              className="text-capitalize btn btn-primary maxSizeBtn mx-1"
              onClick={props.showFacilitiesHistoricalPayment}
            >
              {local_Strings.ViewHistoricalPayments}
            </button>
            <a
              id="viewReceivedTransaction"
              href="#"
              className="text-capitalize btn btn-primary maxSizeBtn mx-1"
              onClick={props.showFacilitiesOutstandingPayment}
            >
              {local_Strings.ViewOutstandingPayments}
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default FacilitiesDetails;
