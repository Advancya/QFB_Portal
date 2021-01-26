import React, { useContext, useEffect, useState } from "react";
import { Accordion, Collapse } from "react-bootstrap";
import { localStrings as local_Strings } from "../translations/localStrings";
import { AuthContext } from "../providers/AuthProvider";
import {
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
  currency: string;
  NoDataMessage: string;
}

const TransactionListing = (props: ITransactionListingProps) => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(rowLimit);
  const [collapsibleId, setCollapsibleId] = useState<string>("-1");
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
          onClick={() => setCollapsibleId(collapsibleId === index ? "-1" : index)}
        >
          <td colSpan={1}>
            {moment(
              !!item.bookingDate ? item.bookingDate : item.installmentDate
            ).format("DD/MM/YYYY")}{" "}
          </td>
          <td colSpan={2} className={(item.amount || item.transaction_Amount) < 0 ? "color-red" : ""}>
            {Number(item.amount || item.transaction_Amount) < 0
              ? `(${helper.ConvertToQfbNumberFormatWithFraction(
                item.amount || item.transaction_Amount
              ).substring(1)})`
              : helper.ConvertToQfbNumberFormatWithFraction(
                item.amount || item.transaction_Amount
              )}
            {" " +
              props.currency}
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
              {helper.ConvertToQfbNumberFormatWithFraction(item.balance) || ""}
              {" " +
                props.currency}
            </td>
          ) : null}

          <td className="caretArrow">
            {transactionsDetails && !!transactionsDetails && (
              <i
                className={
                  (collapsibleId === index ? "fa fa-caret-down" : "fa fa-caret-right") +
                  " color-gray"
                }
              ></i>
            )}
          </td>
        </Accordion.Toggle>
        {transactionsDetails && !!transactionsDetails && (
          <tr>
            <td colSpan={9} className="p-0">
              <Accordion.Collapse eventKey={index} className="collapseRow">
                <div className="px-3 py-2">
                  {transactionsDetails.TransactionReference && !!transactionsDetails.TransactionReference.value.trim() && (
                    <div className="item-row py-2">
                      <div className="color-black">
                        {transactionsDetails.TransactionReference.label}
                      </div>
                      <div className="color-gray">
                        {transactionsDetails.TransactionReference.value}
                      </div>
                    </div>
                  )}
                  {transactionsDetails.DepositReference && !!transactionsDetails.DepositReference.value.trim() && (
                    <div className="item-row py-2">
                      <div className="color-black">
                        {transactionsDetails.DepositReference.label}
                      </div>
                      <div className="color-gray">
                        {transactionsDetails.DepositReference.value}
                      </div>
                    </div>
                  )}
                  {transactionsDetails.TransferReference && !!transactionsDetails.TransferReference.value.trim() && (
                    <div className="item-row py-2">
                      <div className="color-black">
                        {transactionsDetails.TransferReference.label}
                      </div>
                      <div className="color-gray">
                        {transactionsDetails.TransferReference.value}
                      </div>
                    </div>
                  )}
                  {transactionsDetails.InvestmentDescription && !!transactionsDetails.InvestmentDescription.value.trim() && (
                    <div className="item-row py-2">
                      <div className="color-black">
                        {transactionsDetails.InvestmentDescription.label}
                      </div>
                      <div className="color-gray">
                        {transactionsDetails.InvestmentDescription.value}
                      </div>
                    </div>
                  )}
                  {transactionsDetails.SecurityName && !!transactionsDetails.SecurityName.value.trim() && (
                    <div className="item-row py-2">
                      <div className="color-black">
                        {transactionsDetails.SecurityName.label}
                      </div>
                      <div className="color-gray">
                        {transactionsDetails.SecurityName.value}
                      </div>
                    </div>
                  )}
                  {transactionsDetails.TransferDetails && !!transactionsDetails.TransferDetails.value.trim() && (
                    <div className="item-row py-2">
                      <div className="color-black">
                        {transactionsDetails.TransferDetails.label}
                      </div>
                      <div className="color-gray">
                        {transactionsDetails.TransferDetails.value}
                      </div>
                    </div>
                  )}
                  {transactionsDetails.BeneficiaryCustomer && !!transactionsDetails.BeneficiaryCustomer.value.trim() && (
                    <div className="item-row py-2">
                      <div className="color-black">
                        {transactionsDetails.BeneficiaryCustomer.label}
                      </div>
                      <div className="color-gray">
                        {transactionsDetails.BeneficiaryCustomer.value}
                      </div>
                    </div>
                  )}
                  {transactionsDetails.BeneficiaryAccount && !!transactionsDetails.BeneficiaryAccount.value.trim() && (
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
                  <td colSpan={10}>{NoResult(props.NoDataMessage)}</td>
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
