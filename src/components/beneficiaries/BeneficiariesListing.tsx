import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import { iBeneficiary } from "../../services/transactionService";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import NoResult from "../../shared/NoResult";
import FilterMoreButtonControl from "../../shared/FilterMoreButtonControl";
import xIcon from "../../images/x-icon.svg";
import { GetUserLocalData } from "../../Helpers/authHelper";

interface iBeneficiariesListing {
  showBeneficiariesListingModal: boolean;
  hideBeneficiariesListingModal: () => void;
  showBeneficiariesDetailsModal: (item: iBeneficiary) => void;
  showNewBeneficiaryModal: () => void;
  backBeneficiariesListingModal: () => void;
  beneficiaries: iBeneficiary[];
  reloading: boolean;
}

function BeneficiariesListing(props: iBeneficiariesListing) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [filteredData, setFilteredData] = useState<iBeneficiary[]>([]);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(rowLimit);
  const [allowEdit, setAllowEdit] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const initialLoadMethod = async () => {
      const userData = await GetUserLocalData();
      if (userData) {
        if (isMounted && userData.customerId === currentContext.selectedCIF) {
          setAllowEdit(true);
        }
      }
    };

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF, currentContext.language]);

  useEffect(() => {
    setFilteredData(props.beneficiaries);
    if (props.beneficiaries && props.beneficiaries.length > 0 && props.beneficiaries.length < rowLimit) {
      setOffset(props.beneficiaries.length);
    } else {
      setOffset(rowLimit);
    }
  }, [props.beneficiaries, props.reloading]);

  const renderItem = (item: iBeneficiary, index: number) => (
    <li className="shown" key={index}>
      <a
        href="#"
        className="row align-items-center"
        onClick={() => props.showBeneficiariesDetailsModal(item)}
      >
        <div className="col-sm-8">
          <h4>
            {local_Strings.BeneficiaryIDLabel + " | " + item.beneficiaryId}
          </h4>
          <h5>{item.beneficiaryFullName}</h5>
        </div>
        <div className="col-8 col-sm-3 text-sm-right">
          <span className="status-badge ">
            {item.country && currentContext.countries.length > 0
              ? currentContext.language === "en"
              ? currentContext.countries.filter((obj) => obj.nameEn === item.country)[0]?.nameEn
              : currentContext.countries.filter((obj) => obj.nameEn === item.country)[0]?.nameAr
              : local_Strings.BeneficiariesListingCountrySample}
          </span>
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
                onClick={props.backBeneficiariesListingModal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text d-flex align-items-center">
              <h4>{local_Strings.BeneficiariesListingTitle}</h4>
              {allowEdit && currentContext.userRole === Constant.Customer && (
                <a
                  className="btnOutlineWhite"
                  href="#"
                  onClick={props.showNewBeneficiaryModal}
                  id="newBeneficiaryBtn"
                >
                  <i className="fa fa-plus-circle"></i>
                  {local_Strings.MyBeneficiariesAddNew}
                </a>
              )}
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
              active={props.reloading}
              spinner={
                <PuffLoader
                  size={Constant.SpnnerSize}
                  color={Constant.SpinnerColor}
                />
              }
            />
            <ul className="box-list" id="dataList">
              {filteredData && filteredData.length > 0 && filteredData[0].id > 0
                ? filteredData
                  .slice(0, offset)
                  .map((item, index) => renderItem(item, index))
                : NoResult(local_Strings.OfferList_NoData)}
            </ul>
          </div>

          <FilterMoreButtonControl
            showMore={
              filteredData &&
              filteredData.length > rowLimit &&
              offset < filteredData.length
            }
            onClickMore={() => setOffset(offset + 5)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BeneficiariesListing;
