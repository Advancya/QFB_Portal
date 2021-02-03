import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import depositeIcon from "../../../images/deposit-icon.svg";
import { emptyDeposit, IDeposit } from "../../../Helpers/publicInterfaces";
import moment from "moment";
import { localStrings as local_Strings } from "../../../translations/localStrings";
import { AuthContext } from "../../../providers/AuthProvider";
import * as helper from "../../../Helpers/helper";
import NoResult from "../../../shared/NoResult";
import { GetDepositeListing } from "../../../services/cmsService";
import Constant from "../../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import FilterMoreButtonControl from "../../../shared/FilterMoreButtonControl";
import { PortfolioContext } from "../../../pages/Homepage";
import depositIcon from "../../../images/deposit-icon.svg";
import xIcon from "../../../images/x-icon.svg";

interface iDepositeListing {
  showDepositeListingModal: boolean;
  hideDepositeListingModal: () => void;
  showDepositeDetailsModal: (depositItem: IDeposit) => void;
}

function DepositeListing(props: iDepositeListing) {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(rowLimit);
  const [data, setData] = useState<IDeposit[]>([emptyDeposit]);

  useEffect(() => {
    let isMounted = true;
    const initialLoadMethod = async () => {
      setLoading(true);
      GetDepositeListing(currentContext.selectedCIF)
        .then((responseData: IDeposit[]) => {
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

  const renderItem = (item: IDeposit, index: number) => (
    <li className="shown" key={index}>
      <a
        href="#"
        className="row align-items-center"
        onClick={() => props.showDepositeDetailsModal(item)}
      >
        <div className="col-sm-9 col-lg-10 mb-2">
          <h3 className="text-capitalize color-gold text-16">
            {local_Strings.DepositNo + item.contractNumber}
          </h3>
          <h3 className="text-18">
            {helper.ConvertToQfbNumberFormatWithFraction(item.depositAmount)}
          </h3>
        </div>
        <div className="col-sm-3 col-lg-2  text-md-center">
          <strong className="status-badge-small color-gold text-xs">
            {item.currency || ""}
          </strong>
          <br />
          <strong className="color-gold text-xs mx-2">
            {(item.interestRate || "") + "%"}
          </strong>
        </div>
      </a>
    </li>
  );

  return (
    <div>
      <Modal
        show={props.showDepositeListingModal}
        onHide={props.hideDepositeListingModal}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-icon">
              <img src={depositeIcon} className="img-fluid" />
            </div>
            <div className="ib-text">
              <h4>{local_Strings.DepositeListingCash}</h4>
              {/*  <h5>
                {(userPortfolio.totalDeposits || "0") +
                  " " +
                  (currentContext.userSettings.currency || "")}
              </h5> */}
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={props.hideDepositeListingModal}
          >
            <img src={xIcon} width="15" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="col-lg-6 popup-box">
            <div className="inner-box m-0 mb-3 py-3">
              <div className="d-flex align-items-center">
                <div className="ib-icon">
                  <img src={depositIcon} className="img-fluid" />
                </div>
                <div className="ib-text">
                  <h4>{local_Strings.PortfolioAssetsOption3}</h4>
                  <h5>
                    {userPortfolio.totalDeposits +
                      " " +
                      currentContext.userSettings.currency}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="box modal-box">
            <ul className="box-list" id="dataList">
              {data && data.length > 0 && !!data[0].contractNumber
                ? data
                    .slice(0, offset)
                    .map((item, index) => renderItem(item, index))
                : NoResult(local_Strings.DepositListing_NoData)}
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

export default DepositeListing;
