import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import excelIcon from "../../../images/excel.svg";
import moment from "moment";
import { localStrings as local_Strings } from "../../../translations/localStrings";
import { AuthContext } from "../../../providers/AuthProvider";
import {
  emptyDepositDetail,
  IDepositDetail,
} from "../../../Helpers/publicInterfaces";
import Constant from "../../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { GetDepositsDetails } from "../../../services/cmsService";
import * as helper from "../../../Helpers/helper";

interface iDepositeDetails {
  showDepositeDetailsModal: boolean;
  hideDepositeDetailsModal: () => void;
  backDepositeListingModal: () => void;
  showDepositeRecievedProfit: () => void;
  depositNumber: string;
}

function DepositeDetails(props: iDepositeDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const [item, setDetail] = useState<IDepositDetail>(emptyDepositDetail);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    GetDepositsDetails(currentContext.selectedCIF, props.depositNumber)
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
  }, [props.depositNumber]);

  return (
    <Modal
      show={props.showDepositeDetailsModal}
      onHide={props.hideDepositeDetailsModal}
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
              onClick={props.backDepositeListingModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4>{local_Strings.DepositDetail}</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideDepositeDetailsModal}
        >
          <span aria-hidden="true">×</span>
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
            <li className="pb-3 px-4">
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <h3 className="text-capitalize color-gold">
                    {local_Strings.DepositeListingAccountNumberLabel +
                      props.depositNumber}
                  </h3>
                  <h3 className="text-sm">{item.DepositAmount.value || ""}</h3>
                </div>
                <div className="col-sm-4 text-sm-right">
                  <strong className="status-badge status-badge-lg color-gold text-xs">
                    {item.Currency.value || ""}
                  </strong>
                  <br />
                  <strong className="status-badge status-badge-lg">
                    {item.ExpectedProfitRate.value || ""}
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
            <div className="formGrp">
              <label>{item.ExpectedProfitRate.label}</label>
              <p>{item.ExpectedProfitRate.value || ""}</p>
            </div>
            <div className="formGrp">
              <label>{item.ProfitDistributionFrequency.label}</label>
              <p>{item.ProfitDistributionFrequency.value || ""}</p>
            </div>
          </div>
          <div className="text-right px-4">
            <a
              id="viewReceivedTransaction"
              href="#"
              className="text-capitalize btn btn-primary maxSizeBtn mx-1"
              onClick={props.showDepositeRecievedProfit}
            >
              {local_Strings.ViewReceivedProfitTransactions}
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DepositeDetails;
