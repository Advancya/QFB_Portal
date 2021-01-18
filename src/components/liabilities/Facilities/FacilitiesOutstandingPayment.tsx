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
  facilityNumber: string;
}

function FacilitiesOutstandingPayment(props: iFacilitiesOutstandingPayment) {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);
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
      GetViewOutstandingPayments(
        currentContext.selectedCIF,
        props.facilityNumber
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

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [props.facilityNumber]);

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
        <div className="modal-header-text">
          <div className="row align-items-center">
            <div className="col-2 col-sm-1 text-center">
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
        {data && data.length > 0 && !!data[0].installmentDate && (
          <FilterCommonControl2
            CheckBoxTitle={local_Strings.RequestTypeLabel}
            CheckBoxLabels={[
              local_Strings.OutstandingPayments_PastDueSettlement,
              local_Strings.OutstandingPayments_SettlemenOfPayment,
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
            {props.facilityNumber + " " + local_Strings.OutstandingPaymentsText}
          </h5>
        </div>
        <TransactionListing
          transactions={filteredData}
          descriptionLabel={local_Strings.DepositeDetailsFilterType}
          showBalanceField={false}
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
                filename={
                  props.facilityNumber +
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
                  name={local_Strings.OutstandingPaymentsText}
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
                    label={local_Strings.RequestTypeLabel}
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
