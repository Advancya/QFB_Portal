import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import investmentsIcon from "../../../images/invest-icon.svg";
import { emptyInvestment, IInvestment } from "../../../Helpers/publicInterfaces";
import moment from "moment";
import { localStrings as local_Strings } from '../../../translations/localStrings';
import { AuthContext } from "../../../providers/AuthProvider";
import * as helper from "../../../Helpers/helper";
import NoResult from "../../../shared/NoResult";
import { GetInvestmentsListing } from "../../../services/cmsService";
import { useToasts } from 'react-toast-notifications';
import Constant from "../../../constants/defaultData";
import LoadingOverlay from 'react-loading-overlay';
import PuffLoader from "react-spinners/PuffLoader";
import FilterMoreButtonControl from '../../../shared/FilterMoreButtonControl';
import { PortfolioContext } from "../../../pages/Homepage";

interface iInvestmentsListing {
  showInvestmentsListingModal: boolean;
  hideInvestmentsListingModal: () => void;
  showInvestmentsDetailsModal: (investmentNumber: string) => void;
}
function InvestmentsListing(props: iInvestmentsListing) {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(rowLimit);
  const [data, setData] = useState<IInvestment[]>([emptyInvestment]);

  useEffect(() => {
    let isMounted = true;
    const initialLoadMethod = async () => {
      setLoading(true);
      GetInvestmentsListing(currentContext.selectedCIF)
        .then((responseData: IInvestment[]) => {
          if (isMounted && responseData && responseData.length > 0) {
            setData(responseData);
            if (responseData.length < rowLimit) {
              setOffset(responseData.length);
            }
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    }

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF]);
  
  const renderItem = (item: IInvestment, index: number) => (
    <li className="shown" key={index}>
      <a
        href="#"
        className="row align-items-center"
        onClick={() => props.showInvestmentsDetailsModal(item.subAssetID)}
      >
        <div className="col-6 col-sm-4">
          <h5>{local_Strings.InvestmentNo}</h5>
          <h4>{item.subAssetID || ""}</h4>
        </div>
        <div className="col-6 col-sm-4">
          <h5>{local_Strings.CashDetailsBalanceLabel}</h5>
          <h4>{(item.nominalAmount || "0") + " " + item.securityCCY}</h4>
        </div>
        <div className="col-10 col-sm-3">
          <h5>{local_Strings.percentageLabel}</h5>
          <h4>{(item.profitRate || "")}</h4>
        </div>
        <div className="col-2 col-sm-1 caretArrow">
          <i className="fa fa-chevron-right"></i>
        </div>
      </a>
    </li>
  );

  return (
    <div>
      <Modal
        show={props.showInvestmentsListingModal}
        onHide={props.hideInvestmentsListingModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-icon">
              <img src={investmentsIcon} className="img-fluid" />
            </div>
            <div className="ib-text">
              <h4>{local_Strings.InvestmentsListingCash}</h4>
              <h5>{(userPortfolio.totalInvestment || "0") + " " + (currentContext.userSettings.currency || "")}</h5>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={props.hideInvestmentsListingModal}
          >
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box">
            <ul className="box-list" id="dataList">
              {data &&
                data.length > 0 &&
                !!data[0].subAssetID ?
                data.slice(0, offset).map((item, index) => renderItem(item, index)
                ) : NoResult(local_Strings.InvestmentListing_NoData)}
            </ul>
          </div>
          <FilterMoreButtonControl showMore={data && data.length > rowLimit &&
            offset < data.length} onClickMore={() => setOffset(offset + 5)} />
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

export default InvestmentsListing;
