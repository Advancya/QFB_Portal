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
import { GetViewOutstandingPayments } from "../../../services/cmsService";
import Constant from "../../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import ReactExport from "react-export-excel";
import { PortfolioContext } from "../../../pages/Homepage";
import xIcon from "../../../images/x-icon.svg";

interface iFacilitiesOutstandingPayment {
  showFacilitiesOutstandingPaymentModal: boolean;
  hideFacilitiesOutstandingPaymentModal: () => void;
  backFacilitiesOutstandingPaymentModal: () => void;
  facilityItem: ILoanItem;
}

function FacilitiesOutstandingPayment(props: iFacilitiesOutstandingPayment) {
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
      GetViewOutstandingPayments(
        currentContext.selectedCIF,
        props.facilityItem.ldReference
      )
        .then((responseData: ITransaction[]) => {
          if (isMounted && responseData && responseData.length > 0) {
            // const _data = responseData.filter(
            //   (d) =>
            //     new Date(d.installmentDate) >
            //     moment().add(-3, "months").toDate()
            // );
            setData(responseData);
            setFilteredData(responseData);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    };

    if (!!currentContext.selectedCIF && props.showFacilitiesOutstandingPaymentModal) {
      initialLoadMethod();
    } else {
      setData(null);
      setFilteredData(null);
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [props.facilityItem.ldReference, props.showFacilitiesOutstandingPaymentModal]);

  return (
    <Modal
      show={props.showFacilitiesOutstandingPaymentModal}
      onHide={props.hideFacilitiesOutstandingPaymentModal}
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
              onClick={props.backFacilitiesOutstandingPaymentModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4>{local_Strings.OutstandingPaymentsText}</h4>
          </div>
        </div>
        <button
          type="button"
          className="close"
          onClick={props.hideFacilitiesOutstandingPaymentModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>

      <Modal.Body>
        {data && data.length > 0 && (
          <FilterCommonControl2
            CheckBoxTitle={local_Strings.CashDetailsFilterType}
            CheckBoxLabels={[
              { label: local_Strings.OutstandingPayments_PastDueSettlement, value: "Past Due Payment" },
              { label: local_Strings.OutstandingPayments_SettlemenOfPayment, value: "Payment of Facility" },
            ]}
            clearFilter={() => {
              // const _data = data.filter(
              //   (d) => new Date(d.installmentDate ? d.installmentDate : "") > moment().add(-3, "months").toDate()
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
            {props.facilityItem.ldReference + " " + local_Strings.OutstandingPaymentsText}
          </h5>
        </div>
        <TransactionListing
          transactions={filteredData}
          descriptionLabel={local_Strings.CashDetailsFilterType}
          showBalanceField={false}
          currency={props.facilityItem.currency}
          NoDataMessage={local_Strings.OutstandingPayments_NoData}
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
                  local_Strings.OutstandingPaymentsText
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
                  name={props.facilityItem.ldReference + " - Outstanding Payment"}
                >
                  <ExcelColumn
                    label={local_Strings.LoanNo}
                    value="dealReference"
                  />
                  <ExcelColumn
                    label={local_Strings.RequestListingFilterDate}
                    value="installmentDate"
                  />
                  <ExcelColumn label={local_Strings.Amount} value="amount" />
                  <ExcelColumn
                    label={local_Strings.CashDetailsFilterType}
                    value={"transacitonType"}
                  />
                </ExcelSheet>
              </ExcelFile>
            </div>
          )}
      </Modal.Body>
    </Modal>
  );
}

export default FacilitiesOutstandingPayment;
