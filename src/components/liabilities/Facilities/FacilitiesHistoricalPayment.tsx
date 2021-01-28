import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import excelIcon from "../../../images/excel.svg";
import FilterCommonControl2 from "../../../shared/FilterCommonControl2";
import TransactionListing from "../../../shared/TransactionListing";
import { localStrings as local_Strings } from "../../../translations/localStrings";
import { AuthContext } from "../../../providers/AuthProvider";
import {
  emptyTransaction,
  ICommonFilter,
  ITransaction,
  ILoanItem
} from "../../../Helpers/publicInterfaces";
import * as helper from "../../../Helpers/helper";
import { GetViewHistoricalPayments } from "../../../services/cmsService";
import Constant from "../../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import ReactExport from "react-export-excel";
import { PortfolioContext } from "../../../pages/Homepage";
import xIcon from "../../../images/x-icon.svg";

interface iFacilitiesHistoricalPayment {
  showFacilitiesHistoricalPaymentModal: boolean;
  hideFacilitiesHistoricalPaymentModal: () => void;
  backFacilitiesHistoricalPaymentModal: () => void;
  facilityItem: ILoanItem;
}
function FacilitiesHistoricalPayment(props: iFacilitiesHistoricalPayment) {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<ITransaction[]>(null);
  const [filteredData, setFilteredData] = useState<ITransaction[]>(null);
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {
      setLoading(true);
      GetViewHistoricalPayments(
        currentContext.selectedCIF,
        props.facilityItem.ldReference
      )
        .then((responseData: ITransaction[]) => {
          if (isMounted && responseData && responseData.length > 0) {
            // const _data = responseData.filter(
            //   (d) => new Date(d.bookingDate) > moment().add(-3, "months").toDate()
            // )
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
  }, [props.facilityItem.ldReference]);

  return (
    <Modal
      show={props.showFacilitiesHistoricalPaymentModal}
      onHide={props.hideFacilitiesHistoricalPaymentModal}
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
              onClick={props.backFacilitiesHistoricalPaymentModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4>{local_Strings.HistoricalPaymentsText}</h4>
          </div>
        </div>
        <button
          type="button"
          className="close"
          onClick={props.hideFacilitiesHistoricalPaymentModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
        {data && data.length > 0 && !!data[0].bookingDate && (
          <FilterCommonControl2
            CheckBoxTitle={local_Strings.CashDetailsFilterType}
            CheckBoxLabels={[
              local_Strings.HistoricalPayments_PastDueSettlement,
              local_Strings.HistoricalPayments_SettlemenOfPayment,
            ]}
            clearFilter={() => {
              // const _data = data.filter(
              //   (d) => new Date(d.bookingDate) > moment().add(-3, "months").toDate()
              // )
              setFilteredData(data);
            }}
            applyFilter={(filters: ICommonFilter) => {
              const _filteredData = helper.filterTransactions(data, filters);
              setFilteredData(_filteredData);
            }}
          />
        )}
        <div className="col-12 col-sm-12">
          <h5>
            {props.facilityItem.ldReference + " " + local_Strings.HistoricalPaymentsText}
          </h5>
        </div>
        <TransactionListing
          transactions={filteredData}
          showBalanceField={false}
          descriptionLabel={local_Strings.DepositeDetailsFilterType}
          currency={props.facilityItem.currency}
          NoDataMessage={local_Strings.HistoricalPayments_NoData}
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
          filteredData.length > 0 && (
            <div className="exportExcel">
              <ExcelFile
                filename={
                  props.facilityItem.ldReference +
                  " " +
                  local_Strings.HistoricalPaymentsText
                }
                element={
                  <a href="#">
                    <img src={excelIcon} className="img-fluid" />
                    {local_Strings.exportToExcel}
                  </a>
                }
              >
                <ExcelSheet
                  data={filteredData}
                  name={props.facilityItem.ldReference + " - Historical Payment"}
                >
                  <ExcelColumn
                    label={local_Strings.LoanNo}
                    value="ourReference"
                  />
                  <ExcelColumn
                    label={local_Strings.RequestListingFilterDate}
                    value="bookingDate"
                  />
                  <ExcelColumn label={local_Strings.Amount} value="amount" />
                  <ExcelColumn
                    label={local_Strings.CashDetailsFilterType}
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

export default FacilitiesHistoricalPayment;
