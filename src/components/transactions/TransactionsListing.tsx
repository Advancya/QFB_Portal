import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import transactionIconColor from "../../images/transaction-icon-color.svg";
import FilterCommonControl from '../../shared/FilterCommonControl';
import FilterMoreButtonControl from '../../shared/FilterMoreButtonControl';
import moment from "moment";
import { localStrings as local_Strings } from '../../translations/localStrings';
import { AuthContext } from "../../providers/AuthProvider";
import { emptyTransactionDetail, ICommonFilter, ITransactionDetail } from "../../Helpers/publicInterfaces";
import * as helper from "../../Helpers/helper";
import NoResult from "../../shared/NoResult";
import Constant from "../../constants/defaultData";
import LoadingOverlay from 'react-loading-overlay';
import PuffLoader from "react-spinners/PuffLoader";

interface iTransactionsListing {
  showTransactionsListingModal: boolean;
  hideTransactionsListingModal: () => void;
  showTransactionsDetailsModal: (detail: ITransactionDetail) => void;
  showNewTransactionModal: () => void;
  showBeneficiariesListing: () => void;
  transactions: ITransactionDetail[];
  reloading: boolean;
}

function TransactionsListing(props: iTransactionsListing) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(rowLimit);
  const [filteredData, setFilteredData] = useState<ITransactionDetail[]>([emptyTransactionDetail]);

  useEffect(() => {
    setFilteredData(props.transactions);
    if (props.transactions && props.transactions.length > 0 && props.transactions.length < rowLimit) {
      setOffset(props.transactions.length);
    }
  }, [props.transactions]);

  const renderItem = (item: ITransactionDetail, index: number) => (
    <li className="shown" key={index}>
      <a
        href="#"
        className="row align-items-center"
        onClick={() => props.showTransactionsDetailsModal(item)}
      >
        <div className="col-sm-8">
          <h5>{!!item.transactionDate ? moment(item.transactionDate).format("DD MMMM YYYY") : ""}</h5>
          <h4>{(currentContext.language === "ar" ? item.requestSubjectAR : item.requestSubject)
            + " (" + helper.ConvertToQfbNumberFormat(item.amount) + " " + (item.currency || currentContext.userSettings.currency) + ")"}</h4>
        </div>
        <div className="col-8 col-sm-3 text-sm-right">
          <span className="status-badge ">
            {currentContext.language === "ar" ? item.requestStatusAR : item.requestStatus}
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
        show={props.showTransactionsListingModal}
        onHide={props.hideTransactionsListingModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-icon bg-icon">
              <img src={transactionIconColor} className="img-fluid" />
            </div>
            <div className="ib-text d-flex align-items-center">
              <h4>{local_Strings.TransactionsListingTitle}</h4>
              {currentContext.userRole === Constant.Customer &&
                <a
                  className="btnOutlineWhite"
                  href="#"
                  onClick={props.showNewTransactionModal}
                  id="newTransactionBtn"
                >
                  <i className="fa fa-plus-circle"></i> {local_Strings.TransactionsListingNewButton}
                </a>}
              <a
                className="btnOutlineWhite bg-white color-gold"
                href="#"
                onClick={props.showBeneficiariesListing}
                id="newBeneficiaryBtn"
              >
                {local_Strings.TransactionsListingBeneficiariesButton}
              </a>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={props.hideTransactionsListingModal}
          >
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {props.transactions && props.transactions.length > 0 && !!props.transactions[0].transactionDate &&
            <FilterCommonControl
              clearFilter={() => {
                setFilteredData(props.transactions);
                if (props.transactions.length < rowLimit) {
                  setOffset(props.transactions.length);
                } else {
                  setOffset(rowLimit);
                }
              }}
              applyFilter={(filters: ICommonFilter) => {
                console.log(filters);
                const _filteredData = helper.filterTransactionList(
                  props.transactions,
                  filters
                );
                setFilteredData(_filteredData);
              }} />}
          <div className="box modal-box">
            <ul className="box-list" id="reqList">
              {filteredData &&
                filteredData.length > 0 &&
                !!filteredData[0].transactionDate ?
                filteredData.slice(0, offset).map((item, index) => renderItem(item, index)
                ) : NoResult(local_Strings.NoDataToShow)}
            </ul>
          </div>
          <FilterMoreButtonControl showMore={props.transactions && filteredData && props.transactions.length > rowLimit &&
            offset < filteredData.length} onClickMore={() => setOffset(offset + 5)} />
          <LoadingOverlay
            active={props.reloading}
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

export default TransactionsListing;
