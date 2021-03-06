import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import excelIcon from "../../../images/excel.svg";
import FilterCommonControl from "../../../shared/FilterCommonControl";
import TransactionListing from "../../../shared/TransactionListing";
import { localStrings as local_Strings } from "../../../translations/localStrings";
import { AuthContext } from "../../../providers/AuthProvider";
import {
  emptyTransaction,
  ICommonFilter,
  ITransaction,
  IDeposit
} from "../../../Helpers/publicInterfaces";
import * as helper from "../../../Helpers/helper";
import { GetDepositsReceivedProfit } from "../../../services/cmsService";
import Constant from "../../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import ReactExport from "react-export-excel";
import xIcon from "../../../images/x-icon.svg";

interface iDepositeRecievedProfit {
  showDepositeRecievedProfitModal: boolean;
  hideDepositeRecievedProfitModal: () => void;
  backDepositeRecievedProfitModal: () => void;
  depositItem: IDeposit;
}

function DepositeRecievedProfit(props: iDepositeRecievedProfit) {
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
      GetDepositsReceivedProfit(currentContext.selectedCIF, props.depositItem.contractNumber)
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

    if (!!currentContext.selectedCIF && props.showDepositeRecievedProfitModal) {
      initialLoadMethod();
    } else {
      setData([emptyTransaction]);
      setFilteredData([emptyTransaction]);
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [props.depositItem, props.showDepositeRecievedProfitModal]);

  return (
    <Modal
      show={props.showDepositeRecievedProfitModal}
      onHide={props.hideDepositeRecievedProfitModal}
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
              onClick={props.backDepositeRecievedProfitModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4>{local_Strings.InvestmentsDetailsRecievedProfit}</h4>
          </div>
        </div>
        <button
          type="button"
          className="close"
          onClick={props.hideDepositeRecievedProfitModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
        {data && data.length > 0 && !!data[0].bookingDate && (
          <FilterCommonControl
            clearFilter={() => {
              // const _data = data.filter(
              //   (d) =>
              //     new Date(d.bookingDate) > moment().add(-3, "months").toDate()
              // );
              setFilteredData(data);
            }}
            applyFilter={(filters: ICommonFilter) => {
              console.log(filters);
              const _filteredData = helper.filterTransactions(data, filters);
              setFilteredData(_filteredData);
            }}
          />
        )}
        <div className="col-12 col-sm-12">
          <h5>
            {local_Strings.Deposit +
              ": " +
              props.depositItem.contractNumber +
              " " +
              local_Strings.RecievedProfit +
              " (" +
              props.depositItem.currency +
              ")"}
          </h5>
        </div>
        <TransactionListing
          transactions={filteredData}
          showBalanceField={false}
          currency={props.depositItem.currency}
          NoDataMessage={local_Strings.ReceivedProfitTransactionsListing_NoData}
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
          !!filteredData[0].accountNo && (
            <div className="exportExcel">
              <ExcelFile
                filename={local_Strings.ViewReceivedProfit}
                element={
                  <a href="#">
                    <img src={excelIcon} className="img-fluid" />
                    {local_Strings.exportToExcel}
                  </a>
                }
              >
                <ExcelSheet
                  data={filteredData}
                  name={props.depositItem.contractNumber + " - Received Profit Transactions"}
                >                  
                  <ExcelColumn
                    label={local_Strings.RequestListingFilterDate}
                    value="bookingDate"
                  />
                  <ExcelColumn label={local_Strings.Amount} value="amount" />
                  <ExcelColumn
                    label={local_Strings.Description}
                    value={"trxDescirption"}
                  />
                </ExcelSheet>
              </ExcelFile>
            </div>
          )}
      </Modal.Body>
    </Modal>
  );
}

export default DepositeRecievedProfit;
