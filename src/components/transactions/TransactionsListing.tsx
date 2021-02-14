import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import transactionIconColor from "../../images/transaction-icon-color.svg";
import FilterDateControl from "../../shared/FilterDateControl";
import FilterCustomDateControl from "../../shared/FilterCustomDateControl";
import FilterDropDownControl from "../../shared/FilterDropDownControl";
import FilterButtonControl from "../../shared/FilterButtonControl";
import FilterMoreButtonControl from "../../shared/FilterMoreButtonControl";
import moment from "moment";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import {
  emptyTransactionDetail,
  emptyRequestFilter,
  IRequestFilter,
  ITransactionDetail,
} from "../../Helpers/publicInterfaces";
import * as helper from "../../Helpers/helper";
import NoResult from "../../shared/NoResult";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import xIcon from "../../images/x-icon.svg";
import { GetUserLocalData } from "../../Helpers/authHelper";
import {
  GetTransactionTypes,
} from "../../services/commonDataServices";

interface iTransactionsListing {
  showTransactionsListingModal: boolean;
  hideTransactionsListingModal: () => void;
  showTransactionsDetailsModal: (detail: ITransactionDetail) => void;
  showNewTransactionModal: () => void;
  showBeneficiariesListing: () => void;
  transactions: ITransactionDetail[];
  reloading: boolean;
}

interface iDDL {
  label: string;
  value: any;
}

function TransactionsListing(props: iTransactionsListing) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(rowLimit);
  const [filteredData, setFilteredData] = useState<ITransactionDetail[]>([emptyTransactionDetail]);
  const [allowEdit, setAllowEdit] = useState<boolean>(false);
  const [filters, setFilter] = useState<IRequestFilter>(emptyRequestFilter);
  const [transactionTypes, setTransactionTypes] = useState<iDDL[]>([]);

  useEffect(() => {
    fetchTransactionType();
  }, []);

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

    setFilteredData(props.transactions);
    if (props.transactions && props.transactions.length > 0 && props.transactions.length < rowLimit) {
      setOffset(props.transactions.length);
    } else {
      setOffset(rowLimit);
    }

    if (filters.filterApplied) {
      const _filteredData = helper.filterTransactionList(
        props.transactions,
        filters
      );
      setFilteredData(_filteredData);
    }

  }, [props.transactions, props.reloading]);

  const renderItem = (item: ITransactionDetail, index: number) => (
    <li className="shown" key={index}>
      <a
        href="#"
        className="row align-items-center"
        onClick={() => props.showTransactionsDetailsModal(item)}
      >
        <div className="col-sm-8">
          <h5>
            {!!item.transactionDate
              ? moment(item.transactionDate).format("DD MMMM YYYY")
              : ""}
          </h5>
          <h4>
            {(currentContext.language === "ar"
              ? item.requestSubjectAR
              : item.requestSubject) +
              " (" +
              helper.ConvertToQfbNumberFormatWithFraction(item.amount) +
              " " +
              (item.currency || currentContext.userSettings.currency) +
              ")"}
          </h4>
          <h4>
            {local_Strings.RequestNumber + item.id}
          </h4>
        </div>
        <div className="col-8 col-sm-3 text-sm-right">
          <span className="status-badge ">
            {currentContext.language === "ar"
              ? item.requestStatusAR
              : item.requestStatus}
          </span>
        </div>
        <div className="col-4 col-sm-1 text-right">
          <i className="fa fa-chevron-right"></i>
        </div>
      </a>
    </li>
  );

  const fetchTransactionType = async () => {
    const data = await GetTransactionTypes();
    let result: iDDL[] = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      result.push({
        label: currentContext.language === "ar" ? element["nameAr"] : element["name"],
        value: element["id"].toString(),
      });
    }
    setTransactionTypes(result);
  };

  const statusFilterOptions: iDDL[] = [
    {
      label: local_Strings.RequestListingFilterStatusOption1,
      value: "Awaiting Review",
    },
    { label: local_Strings.RequestListingFilterStatusOption2, value: "Closed" },
    {
      label: local_Strings.RequestListingFilterStatusOption3,
      value: "In Progress",
    },
    { label: local_Strings.RequestListingFilterStatusOption4, value: "Cancelled" },
  ];

  return (
    <div>
      <Modal
        show={props.showTransactionsListingModal}
        onHide={props.hideTransactionsListingModal}
        // size="lg"
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
              {allowEdit && currentContext.userRole === Constant.Customer && (
                <a
                  className="btnOutlineWhite"
                  href="#"
                  onClick={props.showNewTransactionModal}
                  id="newTransactionBtn"
                >
                  <i className="fa fa-plus-circle"></i>{" "}
                  {local_Strings.TransactionsListingNewButton}
                </a>
              )}
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
            <img src={xIcon} width="15" />
          </button>
        </Modal.Header>
        <Modal.Body>
          {props.transactions && props.transactions.length > 0 && !!props.transactions[0].transactionDate &&
            <form className="filter-box">
              <div className="row headRow align-items-center">
                <div className="col-sm-3">
                  <FilterDateControl
                    value={filters.DateOption}
                    onChange={(_value: string) =>
                      setFilter({ ...filters, DateOption: _value })
                    }
                  />
                </div>
                <div className="col-sm-3">
                  <FilterDropDownControl
                    label={local_Strings.RequestListingFilterStatus}
                    options={statusFilterOptions}
                    value={filters.Status || "0"}
                    onChange={(_value: string) =>
                      setFilter({ ...filters, Status: _value })
                    }
                    initialSelectRequired={true}
                  />
                </div>
                <div className="col-sm-3">
                  <FilterDropDownControl
                    label={local_Strings.RequestListingFilterType}
                    options={transactionTypes}
                    value={filters.Type || "0"}
                    onChange={(_value: string) =>
                      setFilter({ ...filters, Type: _value })
                    }
                    initialSelectRequired={true}
                  />
                </div>
                <div className="col-sm-3">
                  <FilterButtonControl
                    clearFilter={() => {
                      setFilteredData(props.transactions);
                      setFilter(emptyRequestFilter);
                      if (props.transactions.length < rowLimit) {
                        setOffset(props.transactions.length);
                      } else {
                        setOffset(rowLimit);
                      }
                    }}
                    applyFilter={() => {
                      const _filteredData = helper.filterTransactionList(
                        props.transactions,
                        filters
                      );
                      setFilteredData(_filteredData);
                      setFilter({ ...filters, filterApplied: true });
                    }}
                    showClearFilter={filters.filterApplied}
                  />
                </div>
                <FilterCustomDateControl
                  onStartDateChange={(_value: string) =>
                    setFilter({ ...filters, StartDate: moment(_value).toDate() })
                  }
                  onEndDateChange={(_value: string) =>
                    setFilter({ ...filters, EndDate: moment(_value).toDate() })
                  }
                  StartDate={filters.StartDate}
                  EndDate={filters.EndDate}
                  showCustomDateFilter={filters.DateOption === "4"}
                />
              </div>
            </form>
          }
          <div className="box modal-box">
            <ul className="box-list" id="reqList">
              {filteredData &&
                filteredData.length > 0 &&
                !!filteredData[0].transactionDate
                ? filteredData
                  .slice(0, offset)
                  .map((item, index) => renderItem(item, index))
                : NoResult(local_Strings.OfferList_NoData)}
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
