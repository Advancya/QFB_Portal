import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import cashIcon from "../../../images/cash-icon.svg";
import {
  emptyAccountBalance,
  IAccountBalance,
} from "../../../Helpers/publicInterfaces";
import { localStrings as local_Strings } from "../../../translations/localStrings";
import { AuthContext } from "../../../providers/AuthProvider";
import * as helper from "../../../Helpers/helper";
import NoResult from "../../../shared/NoResult";
import { GetCashListing } from "../../../services/cmsService";
import Constant from "../../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import FilterMoreButtonControl from "../../../shared/FilterMoreButtonControl";
import { PortfolioContext } from "../../../pages/Homepage";
import xIcon from "../../../images/x-icon.svg";

interface iCashListing {
  showCashListingModal: boolean;
  hideCashListingModal: () => void;
  showCashDetailsModal: (accountNumber: string, balance: number) => void;
}

function CashListing(props: iCashListing) {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(rowLimit);
  const [data, setData] = useState<IAccountBalance[]>([emptyAccountBalance]);

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {
      setLoading(true);
      GetCashListing(currentContext.selectedCIF)
        .then((responseData: IAccountBalance[]) => {
          if (isMounted && responseData && responseData.length > 0) {
            setData(responseData);
            if (responseData.length < rowLimit) {
              setOffset(responseData.length);
            }
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    };

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF]);

  const renderItem = (item: IAccountBalance, index: number) => (
    <li className="shown" key={index}>
      <a
        href="#"
        className="row align-items-center"
        onClick={() =>
          props.showCashDetailsModal(item.accountNumber, item.balance)
        }
      >
        <div className="col-2 col-sm-1">
          <span className="curr-icon">
            {item.currency || currentContext.userSettings.currency}
          </span>
        </div>
        <div className="col-8 col-sm-4">
          <h5>{local_Strings.AccountNo + " "}</h5>
          <h4>{item.accountNumber || ""}</h4>
        </div>
        <div className="col-8 offset-2 offset-sm-0 col-sm-6">
          <h5>{local_Strings.CashDetailsBalanceLabel}</h5>
          <h4>
            {helper.ConvertToQfbNumberFormat(item.balance) +
              " " +
              item.currency}
          </h4>
        </div>
        <div className="col-2 col-sm-1 text-right">
          <i className="fa fa-chevron-right"></i>
        </div>
      </a>
    </li>
  );

  return (
    <div>
      <Modal
        show={props.showCashListingModal}
        onHide={props.hideCashListingModal}
        //size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-icon">
              <img src={cashIcon} className="img-fluid" />
            </div>
            <div className="ib-text">
              <h4>{local_Strings.CashListingCash}</h4>
              <h5>
                {(userPortfolio.totalCash || "0") +
                  " " +
                  (currentContext.userSettings.currency || "")}
              </h5>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={props.hideCashListingModal}
          >
            <img src={xIcon} width="15" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box">
            <ul className="box-list" id="dataList">
              {data && data.length > 0 && !!data[0].accountNumber
                ? data
                    .slice(0, offset)
                    .map((item, index) => renderItem(item, index))
                : NoResult(local_Strings.CashListing_NoData)}
            </ul>
          </div>
          <FilterMoreButtonControl
            showMore={data && data.length > rowLimit && offset < data.length}
            onClickMore={() => setOffset(offset + 5)}
          />
          <LoadingOverlay
            active={isLoading}
            spinner={
              <PuffLoader
                size={Constant.SpnnerSize}
                color={Constant.SpinnerColor}
              />
            }
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CashListing;
