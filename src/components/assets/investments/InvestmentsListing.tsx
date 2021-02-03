import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import investmentsIcon from "../../../images/invest-icon.svg";
import {
  emptyInvestment,
  IInvestment,
} from "../../../Helpers/publicInterfaces";
import { localStrings as local_Strings } from "../../../translations/localStrings";
import { AuthContext } from "../../../providers/AuthProvider";
import * as helper from "../../../Helpers/helper";
import NoResult from "../../../shared/NoResult";
import { GetInvestmentsListing } from "../../../services/cmsService";
import Constant from "../../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import FilterMoreButtonControl from "../../../shared/FilterMoreButtonControl";
import { PortfolioContext } from "../../../pages/Homepage";
import investIcon from "../../../images/invest-icon.svg";
import xIcon from "../../../images/x-icon.svg";

interface iInvestmentsListing {
  showInvestmentsListingModal: boolean;
  hideInvestmentsListingModal: () => void;
  showInvestmentsDetailsModal: (item: IInvestment) => void;
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
    };

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF, currentContext.language]);

  const renderItem = (item: IInvestment, index: number) => (
    <li className="shown" key={index}>
      <a
        href="#"
        className="row align-items-center"
        onClick={() =>
          props.showInvestmentsDetailsModal(item)
        }
      >
        <div className="col-sm-9 col-lg-10 mb-2">
          <h3 className="text-capitalize color-gold text-16">
            {local_Strings.Investment + " | " + (item.secDesciption || "")}
          </h3>
          <h3 className="text-18">
            {helper.ConvertToQfbNumberFormatWithFraction(item.nominalAmount)}
          </h3>
        </div>
        <div className="col-sm-3 col-lg-2  text-md-center">
          <strong className="status-badge-small color-gold text-xs">
            {item.securityCCY || ""}
          </strong>
          <br />
          <strong className="color-gold text-xs mx-2">
            {item.profitRate || ""}
          </strong>
        </div>
      </a>
    </li>
  );

  return (
    <div>
      <Modal
        show={props.showInvestmentsListingModal}
        onHide={props.hideInvestmentsListingModal}
        // size="lg"
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
              {/* <h5>
                {(userPortfolio.totalInvestment || "0") +
                  " " +
                  (currentContext.userSettings.currency || "")}
              </h5> */}
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={props.hideInvestmentsListingModal}
          >
            <img src={xIcon} width="15" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="col-lg-6 popup-box">
            <div className="inner-box m-0 mb-3 py-3">
              <div className="d-flex align-items-center">
                <div className="ib-icon">
                  <img src={investIcon} className="img-fluid" />
                </div>
                <div className="ib-text">
                  <h4>{local_Strings.PortfolioAssetsOption2}</h4>
                  <h5>
                    {userPortfolio.totalInvestment +
                      " " +
                      currentContext.userSettings.currency}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="box modal-box">
            <ul className="box-list" id="dataList">
              {data && data.length > 0 && !!data[0].subAssetID
                ? data
                    .slice(0, offset)
                    .map((item, index) => renderItem(item, index))
                : NoResult(local_Strings.InvestmentListing_NoData)}
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

export default InvestmentsListing;
