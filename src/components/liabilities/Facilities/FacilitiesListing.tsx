import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import facilitiesIcon from "../../../images/facilities-icon.svg";
import { emptyLoanItem, ILoanItem } from "../../../Helpers/publicInterfaces";
import moment from "moment";
import { localStrings as local_Strings } from '../../../translations/localStrings';
import { AuthContext } from "../../../providers/AuthProvider";
import * as helper from "../../../Helpers/helper";
import NoResult from "../../../shared/NoResult";
import { GetFacilitiesListing } from "../../../services/cmsService";
import Constant from "../../../constants/defaultData";
import LoadingOverlay from 'react-loading-overlay';
import PuffLoader from "react-spinners/PuffLoader";
import FilterMoreButtonControl from '../../../shared/FilterMoreButtonControl';
import { PortfolioContext } from "../../../pages/Homepage";

interface iFacilitiesListing {
  showFacilitiesListingModal: boolean;
  hideFacilitiesListingModal: () => void;
  showFacilitiesDetailsModal: (facilityNumber: string) => void;
}

function FacilitiesListing(props: iFacilitiesListing) {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(rowLimit);
  const [data, setData] = useState<ILoanItem[]>([emptyLoanItem]);

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {
      setLoading(true);
      GetFacilitiesListing(currentContext.selectedCIF)
        .then((responseData: ILoanItem[]) => {
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

  const renderItem = (item: ILoanItem, index: number) => (
    <li className="shown" key={index}>
      <a
        href="#"
        className="row align-items-center"
        onClick={() => props.showFacilitiesDetailsModal(item.ldReference)}
      >
        <div className="col-6 col-sm-4">
          <h5>{local_Strings.LoanNo}</h5>
          <h4>{item.ldReference || ""}</h4>
        </div>
        <div className="col-6 col-sm-4">
          <h5>{local_Strings.CashDetailsBalanceLabel}</h5>
          <h4>{(item.productBalance || "0") + " " + item.currency}</h4>
        </div>
        <div className="col-10 col-sm-3">
          <h5>{local_Strings.percentageLabel}</h5>
          <h4>{(item.profitRate || "") + "%"}</h4>
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
        show={props.showFacilitiesListingModal}
        onHide={props.hideFacilitiesListingModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-icon">
              <img src={facilitiesIcon} className="img-fluid" />
            </div>
            <div className="ib-text">
              <h4>{local_Strings.Loan}</h4>
              <h5>{(userPortfolio.totalLoans || "0") + " " + (currentContext.userSettings.currency || "")}</h5>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={props.hideFacilitiesListingModal}
          >
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box">
            <ul className="box-list" id="dataList">
              {data &&
                data.length > 0 &&
                !!data[0].ldReference ?
                data.slice(0, offset).map((item, index) => renderItem(item, index)
                ) : NoResult(local_Strings.NoDataToShow)}
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

export default FacilitiesListing;
