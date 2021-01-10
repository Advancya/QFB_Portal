import React, { useContext, useEffect, useState } from "react";
import TransactionsListing from "./TransactionsListing";
import TransactionsDetails from "./TransactionsDetails";
import NewTransaction from "./NewTransactions";
import transactionIcon from "../../images/transaction-icon.svg";
import NewBeneficiary from "../beneficiaries/NewBeneficiaries";
import BeneficiariesDetails from "../beneficiaries/BeneficiariesDetails";
import BeneficiariesListing from "../beneficiaries/BeneficiariesListing";
import { localStrings as local_Strings } from "../../translations/localStrings";
import {
  emptyTransactionDetail,
  ITransactionDetail
} from "../../Helpers/publicInterfaces";
import { iBeneficiary } from "../../services/transactionService";
import OTPValidationForm from "./ValidateOTPForm";
import {
  GetTransactionsByCIF, GetBeneficiaryByCIF,
} from "../../services/cmsService";
import { AuthContext } from "../../providers/AuthProvider";


function Transactions() {
  const [showTransactionsListing, setShowTransactionsListing] = useState(false);
  const [item, setDetail] = useState<ITransactionDetail>(
    emptyTransactionDetail
  );
  const [submittedTransaction, setTransactionValue] = useState<ITransactionDetail>(null);

  const [selectedBeneficiary, selectBeneficiary] = useState<iBeneficiary>(null);
  const [validateOTP, showValidateOTPForm] = useState(false);

  const [showTransactionsDetails, setshowTransactionsDetails] = useState(false);

  const [showNewTransaction, setShowNewTransaction] = useState(false);

  ///benfeciaries
  const [showBeneficiariesListing, setShowBeneficiariesListing] = useState(
    false
  );
  const [showBeneficiariesDetails, setshowBeneficiariesDetails] = useState(
    false
  );

  const [showNewBeneficiary, setShowNewBeneficiary] = useState(false);
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [beneficiaries, setBeneficiaries] = useState<iBeneficiary[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<ITransactionDetail[]>([emptyTransactionDetail]);

  useEffect(() => {

    if (!!currentContext.selectedCIF) {
      refreshTransactions();
      refreshBeneficiaries();
    }

  }, [currentContext.selectedCIF]);

  const refreshTransactions = async () => {

    if (!!currentContext.selectedCIF) {
      setLoading(true);

      const responseData: ITransactionDetail[] = await GetTransactionsByCIF(
        currentContext.selectedCIF
      );

      if (responseData && responseData.length > 0) {
        setTransactions(responseData.sort((a, b) => (a.id > b.id ? -1 : 1)));
      }

      setLoading(false);
    }
  };

  const refreshBeneficiaries = async () => {

    if (!!currentContext.selectedCIF) {
      setLoading(true);

      const responseData: iBeneficiary[] = await GetBeneficiaryByCIF(
        currentContext.selectedCIF
      );

      if (responseData && responseData.length > 0) {
        setBeneficiaries(responseData.sort((a, b) => (a.beneficiaryFullName.localeCompare(b.beneficiaryFullName))));
      }

      setLoading(false);
    }
  };

  return (
    <>
      <li className="nav-item">
        <a
          className="nav-link px-2"
          href="#"
          onClick={() => setShowTransactionsListing(true)}
        >
          <img src={transactionIcon} className="images-fluid" />
          {local_Strings.navigationItem2}
        </a>
      </li>
      <TransactionsListing
        showTransactionsListingModal={showTransactionsListing}
        hideTransactionsListingModal={() => setShowTransactionsListing(false)}
        showTransactionsDetailsModal={(detail: ITransactionDetail) => {
          setShowTransactionsListing(false);
          setDetail(detail);
          setshowTransactionsDetails(true);
        }}
        showNewTransactionModal={() => {
          setShowTransactionsListing(false);
          setShowNewTransaction(true);
          //showValidateOTPForm(true);
        }}
        showBeneficiariesListing={() => {
          setShowTransactionsListing(false);
          setShowNewTransaction(false);
          setShowBeneficiariesListing(true);
        }}
        transactions={transactions}
        reloading={isLoading}
      />
      {item && item.id > 0 && (
        <TransactionsDetails
          showTransactionsDetailsModal={showTransactionsDetails}
          hideTransactionsDetailsModal={() => setshowTransactionsDetails(false)}
          backTransactionsListingModal={() => {
            setshowTransactionsDetails(false);
            setShowTransactionsListing(true);
          }}
          showNewTransactionModal={() => {
            setShowTransactionsListing(false);
            setShowNewTransaction(true);
          }}
          item={item}
        />
      )}
      <NewTransaction
        showNewTransactionModal={showNewTransaction}
        hideNewTransactionModal={() => setShowNewTransaction(false)}
        backNewTransactionModal={() => {
          setShowNewTransaction(false);
          setShowTransactionsListing(true);
        }}
        showOTPValidationFormModal={(submittedValues: ITransactionDetail) => {
          setShowNewTransaction(false);
          showValidateOTPForm(true);
          setTransactionValue(submittedValues);
        }}
      />
      {beneficiaries &&
        beneficiaries.length > 0 &&
        <BeneficiariesListing
          showBeneficiariesListingModal={showBeneficiariesListing}
          hideBeneficiariesListingModal={() => setShowBeneficiariesListing(false)}
          showBeneficiariesDetailsModal={(item: iBeneficiary) => {
            setShowBeneficiariesListing(false);
            setshowBeneficiariesDetails(true);
            selectBeneficiary(item);
          }}
          backBeneficiariesListingModal={() => {
            setShowBeneficiariesListing(false);
            setShowTransactionsListing(true);
          }}
          showNewBeneficiaryModal={() => {
            selectBeneficiary(null);
            setShowBeneficiariesListing(false);
            setShowNewBeneficiary(true);            
          }}
          beneficiaries={beneficiaries}
          reloading={isLoading}
        />}
      {selectedBeneficiary && selectedBeneficiary.id > 0 && (
        <BeneficiariesDetails
          showBeneficiariesDetailsModal={showBeneficiariesDetails}
          hideBeneficiariesDetailsModal={() => setshowBeneficiariesDetails(false)}
          backBeneficiariesDetailsgModal={() => {
            setshowBeneficiariesDetails(false);
            setShowBeneficiariesListing(false);
            setShowBeneficiariesListing(true);
          }}
          showEditBeneficiaryModal={() => {
            setshowBeneficiariesDetails(false);
            setShowNewBeneficiary(true);
          }}
          beneficiary={selectedBeneficiary}
          refreshBeneficiariesListing={() => {
            setshowBeneficiariesDetails(false);
            setShowBeneficiariesListing(true);
            refreshBeneficiaries();
          }}
        />
      )}
      <NewBeneficiary
        showNewBeneficiaryModal={showNewBeneficiary}
        hideNewBeneficiaryModal={() => setShowNewBeneficiary(false)}
        backNewBeneficiaryModal={() => {
          setShowNewBeneficiary(false);
          setShowBeneficiariesListing(true);
        }}
        refreshBeneficiariesListing={() => {
          setShowNewBeneficiary(false);
          setShowBeneficiariesListing(true);
          refreshBeneficiaries();
        }}
        backBeneficiaryDetailsModal={() => {
          setShowNewBeneficiary(false);
          setshowBeneficiariesDetails(true);
        }}
        beneficiary={selectedBeneficiary}
      />
      {submittedTransaction &&
        <OTPValidationForm
          showOTPValidationFormModal={validateOTP}
          hideOTPValidationFormModal={() => showValidateOTPForm(false)}
          backOTPValidationFormModal={() => {
            showValidateOTPForm(false);
            refreshTransactions();
            setShowTransactionsListing(true);
          }}
          submittedTransaction={submittedTransaction}
        />}
    </>
  );
}

export default Transactions;
