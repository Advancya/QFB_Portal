import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { localStrings as local_Strings } from "../../../translations/localStrings";
import { AuthContext } from "../../../providers/AuthProvider";
import {
  emptyGuaranteeDetail,
  IBankGuaranteeDetail,
} from "../../../Helpers/publicInterfaces";
import Constant from "../../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { GetBankGuaranteeDetails } from "../../../services/cmsService";
import * as helper from "../../../Helpers/helper";
import xIcon from "../../../images/x-icon.svg";

interface iGuaranteesDetails {
  showGuaranteesDetailsModal: boolean;
  hideGuaranteesDetailsModal: () => void;
  backGuaranteesListingModal: () => void;
  params: { gurRef: string; balance: number };
}
function GuaranteesDetails(props: iGuaranteesDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const [item, setDetail] = useState<IBankGuaranteeDetail>(
    emptyGuaranteeDetail
  );

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    GetBankGuaranteeDetails(currentContext.selectedCIF, props.params.gurRef)
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
  }, [props.params.gurRef, currentContext.language]);

  return (
    <Modal
      show={props.showGuaranteesDetailsModal}
      onHide={props.hideGuaranteesDetailsModal}
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
              onClick={props.backGuaranteesListingModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4>{local_Strings.BankGuaranteeDetails}</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideGuaranteesDetailsModal}
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
                    {local_Strings.GuaranteeNo}
                  </h3>
                  <h3 className="text-sm">
                    {item.BankGuaranteeReference.value || "0"}
                  </h3>
                </div>
                <div className="col-sm-4 text-sm-right">
                  <strong className="status-badge status-badge-lg color-gold text-xs">
                    {item.Currency.value || ""}
                  </strong>
                  <br />
                  <strong className="status-badge status-badge-lg">
                    {props.params.balance || ""}
                  </strong>
                </div>
              </div>
            </li>
          </ul>
          <div className="px-4">
            <div className="formGrp">
              <label>{item.StartDate.label}</label>
              <p>{item.StartDate.value || ""}</p>
            </div>
            <div className="formGrp">
              <label>{item.MaturityDate.label}</label>
              <p>{item.MaturityDate.value || ""}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default GuaranteesDetails;
