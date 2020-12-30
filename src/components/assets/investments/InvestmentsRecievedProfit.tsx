import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import excelIcon from "../../../images/excel.svg";
import FilterCommonControl from '../../../shared/FilterCommonControl';
import TransactionListing from '../../../shared/TransactionListing';
import moment from "moment";
import { localStrings as local_Strings } from '../../../translations/localStrings';
import { AuthContext } from "../../../providers/AuthProvider";
import { emptyTransaction, ICommonFilter, ITransaction } from "../../../Helpers/publicInterfaces";
import * as helper from "../../../Helpers/helper";
import { GetInvestmentsReceivedProfit } from "../../../services/cmsService";
import Constant from "../../../constants/defaultData";
import LoadingOverlay from 'react-loading-overlay';
import PuffLoader from "react-spinners/PuffLoader";
import ReactExport from "react-export-excel";
import { PortfolioContext } from "../../../pages/Homepage";

interface iInvestmentsRecievedProfit {
  showInvestmentsRecievedProfitModal: boolean;
  hideInvestmentsRecievedProfitModal: () => void;
  backInvestmentsRecievedProfitModal: () => void;
  investmentNumber: string;
}
function InvestmentsRecievedProfit(
  props: iInvestmentsRecievedProfit
) {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<ITransaction[]>([emptyTransaction]);
  const [filteredData, setFilteredData] = useState<ITransaction[]>([emptyTransaction]);
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {
      setLoading(true);
      GetInvestmentsReceivedProfit(currentContext.selectedCIF, props.investmentNumber)
        .then((responseData: ITransaction[]) => {
          if (isMounted && responseData && responseData.length > 0) {
            const _data = responseData.filter(
              (d) => new Date(d.bookingDate) > moment().add(-3, "months").toDate()
            )
            setData(responseData);
            setFilteredData(_data);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    }

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [props.investmentNumber]);

  return (
    <Modal
      show={props.showInvestmentsRecievedProfitModal}
      onHide={props.hideInvestmentsRecievedProfitModal}
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
                onClick={
                  props.backInvestmentsRecievedProfitModal
                }
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="col-4 col-sm-3">
              <h5>Investment No.</h5>
              <h4>1223245672802900</h4>
            </div>
            <div className="col-4 col-sm-3">
              <h5>Current Balance</h5>
              <h4>3,150,000.00 QAR</h4>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="close"
          onClick={
            props.hideInvestmentsRecievedProfitModal
          }
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        {data && data.length > 0 && !!data[0].bookingDate &&
          <FilterCommonControl

            clearFilter={() => {
              setFilteredData(data);
            }}

            applyFilter={(filters: ICommonFilter) => {
              console.log(filters);
              const _filteredData = helper.filterTransactions(
                data,
                filters
              );
              setFilteredData(_filteredData);
            }} />
        }

        <TransactionListing transactions={filteredData} showBalanceField={false} />

        <LoadingOverlay
          active={isLoading}
          spinner={
            <PuffLoader
              size={Constant.SpnnerSize}
              color={Constant.SpinnerColor}
            />
          }
        />
        {filteredData && filteredData.length > 0 && !!filteredData[0].accountNo &&
          <div className="exportExcel">
            <ExcelFile filename={local_Strings.ViewReceivedProfitTransactions}
              element={<a href="#"><img src={excelIcon} className="img-fluid" />
                {local_Strings.exportToExcel}</a>}>
              <ExcelSheet data={filteredData} name={local_Strings.ViewReceivedProfitTransactions}>
                <ExcelColumn label={local_Strings.AccountNo} value="accountNo" />
                <ExcelColumn label={local_Strings.RequestListingFilterDate} value="bookingDate" />
                <ExcelColumn label={local_Strings.Amount} value="amount" />
                <ExcelColumn label={local_Strings.Description} value={"descirption"} />
              </ExcelSheet>
            </ExcelFile>
          </div>}
      </Modal.Body>
    </Modal>
  );
}

export default InvestmentsRecievedProfit;
