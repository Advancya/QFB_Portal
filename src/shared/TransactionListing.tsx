import React, { useContext, useEffect, useState } from "react";
import { Accordion, Collapse } from "react-bootstrap";
import { localStrings as local_Strings } from "../translations/localStrings";
import { AuthContext } from "../providers/AuthProvider";
import {
  emptyTransaction,
  ITransaction,
  ITransactionAccordianDetail,
} from "../Helpers/publicInterfaces";
import Constant from "../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import FilterMoreButtonControl from "../shared/FilterMoreButtonControl";
import NoResult from "../shared/NoResult";
import moment from "moment";
import * as helper from "../Helpers/helper";

interface ITransactionListingProps {
  transactions: ITransaction[];
  showBalanceField?: boolean;
  descriptionLabel?: string;
}

const TransactionListing: React.FC<ITransactionListingProps> = (props) => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(rowLimit);
  const [isCollapsible, setCollapsible] = useState(false);
  const filteredData = props.transactions;
  // useEffect(() => {

  //     setFilteredData(props.transactions);
  //     if (props.transactions.length < rowLimit) {
  //         setOffset(props.transactions.length);
  //     }

  // }, [props.transactions, offset]);

  const renderItem = (item: ITransaction, index: string) => {
    const transactionsDetails =
      (item.transactionsDetails && !!item.transactionsDetails) ||
      (item.paymentDetails && !!item.paymentDetails)
        ? (helper.transformingTransactionDetail(
            item.paymentDetails
              ? item.paymentDetails
              : item.transactionsDetails,
            currentContext.language
          ) as ITransactionAccordianDetail)
        : null;

    return (
      <>
        <Accordion.Toggle
          as="tr"
          eventKey={index}
          className="clickRow"
          onClick={() => setCollapsible(!isCollapsible)}
        >
          <td colSpan={1}>
            {moment(
              !!item.bookingDate ? item.bookingDate : item.installmentDate
            ).format("DD/MM/YYYY")}{" "}
          </td>
          <td colSpan={2} className={(item.amount || item.transaction_Amount) < 0 ? "color-red" : ""}>
            {(item.amount || item.transaction_Amount) +
              " " +
              currentContext.userSettings.currency}
          </td>
          <td colSpan={3}>
            {item.descirption ||
              item.trxDescirption ||
              item.transactionType ||
              item.transacitonType ||
              item.descriptions}
          </td>
          {props.showBalanceField ? (
            <td colSpan={2} className="text-right">
              {(item.balance || "0") +
                " " +
                currentContext.userSettings.currency}
            </td>
          ) : null}

          <td className="caretArrow">
            {transactionsDetails && (
              <i
                className={
                  (isCollapsible ? "fa fa-caret-down" : "fa fa-caret-right") +
                  " color-gray"
                }
              ></i>
            )}
          </td>
        </Accordion.Toggle>
        {transactionsDetails && isCollapsible && (
          <tr>
            <td colSpan={9} className="p-0">
              <Accordion.Collapse eventKey={index} className="collapseRow">
                <div className="px-3 py-2">
                  {transactionsDetails.TransactionReference && (
                    <div className="item-row py-2">
                      <div className="color-black">
                        {transactionsDetails.TransactionReference.label}
                      </div>
                      <div className="color-gray">
                        {transactionsDetails.TransactionReference.value}
                      </div>
                    </div>
                  )}
                  {transactionsDetails.DepositReference && (
                    <div className="item-row py-2">
                      <div className="color-black">
                        {transactionsDetails.DepositReference.label}
                      </div>
                      <div className="color-gray">
                        {transactionsDetails.DepositReference.value}
                      </div>
                    </div>
                  )}
                  {transactionsDetails.TransferReference && (
                    <div className="item-row py-2">
                      <div className="color-black">
                        {transactionsDetails.TransferReference.label}
                      </div>
                      <div className="color-gray">
                        {transactionsDetails.TransferReference.value}
                      </div>
                    </div>
                  )}
                  {transactionsDetails.InvestmentDescription && (
                    <div className="item-row py-2">
                      <div className="color-black">
                        {transactionsDetails.InvestmentDescription.label}
                      </div>
                      <div className="color-gray">
                        {transactionsDetails.InvestmentDescription.value}
                      </div>
                    </div>
                  )}
                  {transactionsDetails.SecurityName && (
                    <div className="item-row py-2">
                      <div className="color-black">
                        {transactionsDetails.SecurityName.label}
                      </div>
                      <div className="color-gray">
                        {transactionsDetails.SecurityName.value}
                      </div>
                    </div>
                  )}
                  {transactionsDetails.TransferDetails && (
                    <div className="item-row py-2">
                      <div className="color-black">
                        {transactionsDetails.TransferDetails.label}
                      </div>
                      <div className="color-gray">
                        {transactionsDetails.TransferDetails.value}
                      </div>
                    </div>
                  )}
                  {transactionsDetails.BeneficiaryCustomer && (
                    <div className="item-row py-2">
                      <div className="color-black">
                        {transactionsDetails.BeneficiaryCustomer.label}
                      </div>
                      <div className="color-gray">
                        {transactionsDetails.BeneficiaryCustomer.value}
                      </div>
                    </div>
                  )}
                  {transactionsDetails.BeneficiaryAccount && (
                    <div className="item-row py-2">
                      <div className="color-black">
                        {transactionsDetails.BeneficiaryAccount.label}
                      </div>
                      <div className="color-gray">
                        {transactionsDetails.BeneficiaryAccount.value}
                      </div>
                    </div>
                  )}
                </div>
              </Accordion.Collapse>
            </td>
          </tr>
        )}
      </>
    );
  };

  return (
    <React.Fragment>
      <div className="box table-box">
        <Accordion
          as="table"
          className="table table-striped"
          id="internalActivities"
        >
          <thead>
            <tr>
              <th colSpan={1}>{local_Strings.RequestListingFilterDate} </th>
              <th colSpan={2}>{local_Strings.Amount} </th>
              <th colSpan={3}>
                {!!props.descriptionLabel
                  ? props.descriptionLabel
                  : local_Strings.Description}{" "}
              </th>
              {props.showBalanceField && (
                <th colSpan={2} className="text-right">
                  {local_Strings.CashDetailsBalanceLabel}
                </th>
              )}
              <th className="text-right"> </th>
            </tr>
          </thead>
          <tbody>
            {filteredData &&
            filteredData.length > 0 &&
            (!!filteredData[0].bookingDate ||
              !!filteredData[0].installmentDate) ? (
              filteredData
                .slice(0, offset)
                .map((item, index) => renderItem(item, String(index)))
            ) : (
              <tr>
                <td colSpan={7}>{NoResult(local_Strings.NoDataToShow)}</td>
              </tr>
            )}
          </tbody>
        </Accordion>
      </div>
      <FilterMoreButtonControl
        showMore={
          filteredData &&
          filteredData.length > rowLimit &&
          offset < filteredData.length
        }
        onClickMore={() => setOffset(offset + 5)}
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
    </React.Fragment>
  );
};

export default TransactionListing;
