import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import { GetBeneficiaryByCIF } from "../../services/cmsService";
import {
  emptyBeneficiaryDetail,
  IBeneficiaryDetail,
} from "../../Helpers/publicInterfaces";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import NoResult from "../../shared/NoResult";
import FilterMoreButtonControl from "../../shared/FilterMoreButtonControl";
import xIcon from "../../images/x-icon.svg";

interface iBeneficiariesListing {
  showBeneficiariesListingModal: boolean;
  hideBeneficiariesListingModal: () => void;
  showBeneficiariesDetailsModal: (itemId: number) => void;
  showNewBeneficiaryModal: () => void;
  backBeneficiariesListingModal: () => void;
}
function BeneficiariesListing(props: iBeneficiariesListing) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<IBeneficiaryDetail[]>([]);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(rowLimit);

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {
      setLoading(true);
      GetBeneficiaryByCIF(currentContext.selectedCIF)
        .then((responseData: IBeneficiaryDetail[]) => {
          if (isMounted && responseData && responseData.length > 0) {
            setData(responseData);
            if (responseData.length < rowLimit) {
              setOffset(responseData.length);
            }
          } else {
            setData([]);
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

  const renderItem = (item: IBeneficiaryDetail, index: number) => (
    <li className="shown" key={index}>
      <a
        href="#"
        className="row align-items-center"
        onClick={() => props.showBeneficiariesDetailsModal(item.id)}
      >
        <div className="col-sm-8">
          <h4>
            {local_Strings.BeneficiaryIDLabel + " | " + item.beneficiaryId}
          </h4>
          <h5>
            {local_Strings.BeneficiaryFullNameLabel +
              " | " +
              item.beneficiaryFullName}
          </h5>
        </div>
        <div className="col-8 col-sm-3 text-sm-right">
          <span className="status-badge ">{item.country || ""}</span>
        </div>
        <div className="col-4 col-sm-1 text-right">
          <i className="fa fa-chevron-right"></i>
        </div>
      </a>
    </li>
  );

  return (
    <div>
      <Modal
        show={props.showBeneficiariesListingModal}
        onHide={props.hideBeneficiariesListingModal}
        size="lg"
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
                onClick={props.backBeneficiariesListingModal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text d-flex align-items-center">
              <h4>Beneficiaries</h4>
              <a
                className="btnOutlineWhite"
                href="#"
                onClick={props.showNewBeneficiaryModal}
                id="newBeneficiaryBtn"
              >
                <i className="fa fa-plus-circle"></i> New Beneficiaries
              </a>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={props.hideBeneficiariesListingModal}
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
            <ul className="box-list" id="dataList">
              {data && data.length > 0 && data[0].id > 0
                ? data
                    .slice(0, offset)
                    .map((item, index) => renderItem(item, index))
                : NoResult(local_Strings.NoDataToShow)}
            </ul>
          </div>

          <FilterMoreButtonControl
            showMore={data && data.length > rowLimit && offset < data.length}
            onClickMore={() => setOffset(offset + 5)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BeneficiariesListing;
