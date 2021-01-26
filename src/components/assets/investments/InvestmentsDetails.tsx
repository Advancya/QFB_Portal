import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { localStrings as local_Strings } from "../../../translations/localStrings";
import { AuthContext } from "../../../providers/AuthProvider";
import {
  emptyInvestmentDetail,
  IInvestmentDetail,
  IInvestment
} from "../../../Helpers/publicInterfaces";
import Constant from "../../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { GetInvestmentsDetails } from "../../../services/cmsService";
import * as helper from "../../../Helpers/helper";
import xIcon from "../../../images/x-icon.svg";

interface iInvestmentsDetails {
  showInvestmentsDetailsModal: boolean;
  hideInvestmentsDetailsModal: () => void;
  backInvestmentsListingModal: () => void;
  showInvestmentsRecievedProfit: () => void;
  showInvestmentsBuyAndSell: () => void;
  investment: IInvestment;
}

function InvestmentsDetails(props: iInvestmentsDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const [item, setDetail] = useState<IInvestmentDetail>(emptyInvestmentDetail);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    GetInvestmentsDetails(currentContext.selectedCIF, props.investment.subAssetID)
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
  }, [props.investment.subAssetID]);

  return (
    <Modal
      show={props.showInvestmentsDetailsModal}
      onHide={props.hideInvestmentsDetailsModal}
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
              onClick={props.backInvestmentsListingModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4>{local_Strings.InvestmentsListingCash}</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideInvestmentsDetailsModal}
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
                    {local_Strings.Investment +
                      " | " +
                      item.InvestmentName ? item.InvestmentName.value : ""}
                  </h3>
                  <h3 className="text-sm">
                    {item.InvestmentAmount ? item.InvestmentAmount.value : ""}
                  </h3>
                </div>
                <div className="col-sm-4 text-sm-right">
                  <strong className="status-badge status-badge-lg color-gold text-xs">
                    {props.investment.securityCCY || ""}
                  </strong>
                  <br />
                  <strong className="status-badge status-badge-lg">
                    {props.investment.profitRate || ""}
                  </strong>
                </div>
              </div>
            </li>
          </ul>
          <div className="px-4">
            {item.InvestmentName &&
              <div className="formGrp">
                <label>{item.InvestmentName.label}</label>
                <p>{item.InvestmentName.value || ""}</p>
              </div>
            }
            {item.Currency &&
              <div className="formGrp">
                <label>{item.Currency.label}</label>
                <p>{item.Currency.value || ""}</p>
              </div>
            }
            {item.InvestmentAmount &&
              <div className="formGrp">
                <label>{item.InvestmentAmount.label}</label>
                <p>{item.InvestmentAmount.value || ""}</p>
              </div>
            }
            {item.Location &&
              <div className="formGrp">
                <label>{item.Location.label}</label>
                <p>{item.Location.value || ""}</p>
              </div>
            }
            {item.StartDate &&
              <div className="formGrp">
                <label>{item.StartDate.label}</label>
                <p>{item.StartDate.value || ""}</p>
              </div>
            }
            {item.ExpectedProfitRate &&
              <div className="formGrp">
                <label>{item.ExpectedProfitRate.label}</label>
                <p>{item.ExpectedProfitRate.value || ""}</p>
              </div>
            }
            {item.ProfitDistributionFrequency &&
              <div className="formGrp">
                <label>{item.ProfitDistributionFrequency.label}</label>
                <p>{item.ProfitDistributionFrequency.value || ""}</p>
              </div>
            }
          </div>
          <div className="text-right px-4">
            <button
              id="viewBuySellTransaction"
              className="text-capitalize btn btn-primary maxSizeBtn mx-1"
              onClick={props.showInvestmentsBuyAndSell}
            >
              {local_Strings.ViewBuySellTransactions}
            </button>
            <a
              id="viewReceivedTransaction"
              href="#"
              className="text-capitalize btn btn-primary maxSizeBtn mx-1"
              onClick={props.showInvestmentsRecievedProfit}
            >
              {local_Strings.ViewReceivedProfitTransactions}
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default InvestmentsDetails;
