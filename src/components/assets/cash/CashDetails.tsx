import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import excelIcon from "../../../images/excel.svg";
import FilterCommonControl2 from "../../../shared/FilterCommonControl2";
import TransactionListing from "../../../shared/TransactionListing";
import moment from "moment";
import { localStrings as local_Strings } from "../../../translations/localStrings";
import { AuthContext } from "../../../providers/AuthProvider";
import {
  emptyTransaction,
  ICommonFilter,
  ITransaction,
} from "../../../Helpers/publicInterfaces";
import * as helper from "../../../Helpers/helper";
import { GetCashTransactions } from "../../../services/cmsService";
import Constant from "../../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import ReactExport from "react-export-excel";
import xIcon from "../../../images/x-icon.svg";

interface iCashDetails {
  showCashDetailsModal: boolean;
  hideCashDetailsModal: () => void;
  backCashListingModal: () => void;
  params: { accountNumber: string; balance: number };
}

function CashDetails(props: iCashDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<ITransaction[]>([emptyTransaction]);
  const [filteredData, setFilteredData] = useState<ITransaction[]>([
    emptyTransaction,
  ]);
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {
      setLoading(true);
      GetCashTransactions(
        currentContext.selectedCIF,
        props.params.accountNumber
      )
        .then((responseData: ITransaction[]) => {
          if (isMounted && responseData && responseData.length > 0) {
            // const _data = responseData.filter(
            //   (d) =>
            //     new Date(d.bookingDate) > moment().add(-3, "months").toDate()
            // );
            setData(responseData);
            setFilteredData(responseData);
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
  }, [props.params.accountNumber]);

  return (
    <Modal
      show={props.showCashDetailsModal}
      onHide={props.hideCashDetailsModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="modal-header-text">
          <div className="row align-items-center">
            <div className="col-2 col-sm-1 text-center">
              <a
                href="#"
                onClick={props.backCashListingModal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="col-4 col-sm-3">
              <h5>{local_Strings.AccountNo}</h5>
              <h4>{props.params.accountNumber}</h4>
            </div>
            <div className="col-4 col-sm-3">
              <h5>{local_Strings.CurrentBalanceLabel}</h5>
              <h4>
                {props.params.balance +
                  " " +
                  currentContext.userSettings.currency}
              </h4>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="close"
          onClick={props.hideCashDetailsModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
        {data && data.length > 0 && !!data[0].bookingDate && (
          <FilterCommonControl2
            CheckBoxTitle={local_Strings.CashDetailsFilterType}
            CheckBoxLabels={[
              local_Strings.CashDetails_Filter_Debit,
              local_Strings.CashDetails_Filter_Credit,
            ]}
            clearFilter={() => {
              // const _data = data.filter(
              //   (d) =>
              //     new Date(d.bookingDate) > moment().add(-3, "months").toDate()
              // );
              setFilteredData(data);
            }}
            applyFilter={(filters: ICommonFilter) => {
              
              const _filteredData = helper.filterTransactions(data, filters);
              setFilteredData(_filteredData);
            }}
          />
        )}

        <TransactionListing
          transactions={filteredData}
          showBalanceField={true}
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
        {filteredData &&
          filteredData.length > 0 &&
          !!filteredData[0].accountNumber && (
            <div className="exportExcel">
              <ExcelFile
                filename={local_Strings.CashDetailsTitle}
                element={
                  <a href="#">
                    <img src={excelIcon} className="img-fluid" />
                    {local_Strings.exportToExcel}
                  </a>
                }
              >
                <ExcelSheet
                  data={filteredData}
                  name={local_Strings.CashDetailsTitle}
                >
                  <ExcelColumn
                    label={local_Strings.AccountNo}
                    value="accountNumber"
                  />
                  <ExcelColumn
                    label={local_Strings.RequestListingFilterDate}
                    value="bookingDate"
                  />
                  <ExcelColumn
                    label={local_Strings.Amount}
                    value="transaction_Amount"
                  />
                  <ExcelColumn
                    label={local_Strings.Description}
                    value={"descriptions"}
                  />
                  <ExcelColumn
                    label={local_Strings.CashDetailsBalanceLabel}
                    value={"balance"}
                  />
                </ExcelSheet>
              </ExcelFile>
            </div>
          )}
      </Modal.Body>
    </Modal>
  );
}

export default CashDetails;
