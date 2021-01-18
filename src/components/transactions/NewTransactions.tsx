import { Modal } from "react-bootstrap";
import xIcon from "../../images/x-icon.svg";
import React, { useContext, useEffect, useState } from "react";
import { GetBeneficiariesByCif } from "../../services/transactionService";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import { ITransactionDetail } from "../../Helpers/publicInterfaces";
import { GetCashListing, SendOTP } from "../../services/cmsService";
import {
  GetCurrencies,
  GetTransactionTypes,
} from "../../services/commonDataServices";
import Swal from "sweetalert2";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from "../../shared/invalid-field-error";
import DatePicker from "react-datepicker";

interface iNewTransaction {
  showNewTransactionModal: boolean;
  hideNewTransactionModal: () => void;
  backNewTransactionModal: () => void;
  showOTPValidationFormModal: (submittedValues: ITransactionDetail) => void;
}

interface iDDL {
  label: string;
  value: any;
}

function NewTransaction(props: iNewTransaction) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);

  const [transactionTypes, setTransactionTypes] = useState<iDDL[]>([]);
  const [currencies, setCurrencies] = useState<iDDL[]>([]);
  const [accounts, setAccounts] = useState<iDDL[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<iDDL[]>([]);
  const [beneficiariesData, setBeneficiariesData] = useState([]);
  const [transactionTypeId, setTransactionTypeId] = useState("");
  const [showFormWithin, setShowFormWithin] = useState(false);
  const [showFormLocal, setShowFormLocal] = useState(false);
  const [showFormInternational, setShowInternational] = useState(false);
  
  let controller;
  const initialValuesWithin: ITransactionDetail = {
    amount: undefined,
    beneficiaryId: undefined,
    cif: currentContext.selectedCIF,
    currency: undefined,
    description: undefined,
    id: 0,
    requestDate: new Date().toISOString(),
    transactionDate: new Date().toISOString(),
    transactionTypeId: Number(transactionTypeId),
    transferFromAccount: undefined,
    transferToAccount: undefined,
    requestStatus: "Awaiting Review",
    requestStatusChangeDate: undefined,
    requestSubject: "",
  };

  const initialValuesLocalOrInternational: ITransactionDetail = {
    amount: undefined,
    beneficiaryId: undefined,
    cif: currentContext.selectedCIF,
    currency: undefined,
    description: undefined,
    id: 0,
    requestDate: new Date().toISOString(),
    transactionDate: undefined,
    transactionTypeId: Number(transactionTypeId),
    transferFromAccount: undefined,
    transferToAccount: undefined,
    requestStatus: "Awaiting Review",
    requestStatusChangeDate: undefined,
  };

  const validationSchemaWithin = yup.object({
    transferFromAccount: yup.string().required(local_Strings.GeneralValidation),
    transferToAccount: yup.string().required(local_Strings.GeneralValidation),
    amount: yup
      .string()
      .required(local_Strings.GeneralValidation)
      .matches(/^[0-9]*$/,
        local_Strings.Transactions_Amount_Validation),
  });

  const validationSchemaLocalOrInternational = yup.object({
    transferFromAccount: yup.string().required(local_Strings.GeneralValidation),
    currency: yup.string().required(local_Strings.GeneralValidation),
    amount: yup
      .string()
      .required(local_Strings.GeneralValidation)
      .matches(/^[0-9]*$/,
        local_Strings.Transactions_Amount_Validation),
    requestDate: yup.string().required(local_Strings.GeneralValidation),
    beneficiaryId: yup.string().required(local_Strings.GeneralValidation),
    description: yup.string().required(local_Strings.GeneralValidation),
  });

  const fetchTransactionType = async () => {
    setLoading(true);
    const data = await GetTransactionTypes();
    let result: iDDL[] = [{ label: "", value: "" }];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      result.push({
        label:
          currentContext.language === "ar"
            ? element["nameAr"]
            : element["name"],
        value: element["id"],
      });
    }
    setTransactionTypes(result.slice(1));
    setLoading(false);
  };

  const fetchBeneficiariesByCif = async (typeId: string) => {
    setLoading(true);
    let data = await GetBeneficiariesByCif(currentContext.selectedCIF);
    setBeneficiariesData(data);
    let result: iDDL[] = [{ label: "", value: "" }];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (typeId.toString() === "2") {
        if (element["typeId"].toString() !== "3") {
          result.push({
            label: element["beneficiaryFullName"],
            value: element["id"],
          });
        }
      }
      if (typeId.toString() === "3") {
        if (element["typeId"].toString() === "3") {
          result.push({
            label: element["beneficiaryFullName"],
            value: element["id"],
          });
        }
      }
    }

    setBeneficiaries(result.slice(1));
    setLoading(false);
  };

  const fetchCurrencies = async () => {
    setLoading(true);
    const data = await GetCurrencies();
    let result: iDDL[] = [{ label: "", value: "" }];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      result.push({
        label:
          currentContext.language === "ar"
            ? element["nameAr"]
            : element["name"],
        value:
          currentContext.language === "ar"
            ? element["nameAr"]
            : element["name"],
      });
    }
    setCurrencies(result.slice(1));
    setLoading(false);
  };

  const fetchAccountCashList = async () => {
    setLoading(true);
    const data = await GetCashListing(currentContext.selectedCIF.toString());
    let result: iDDL[] = [{ label: "", value: "" }];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      result.push({
        label: `${element["accountNumber"]} (${element["currency"]})`,
        value: element["accountNumber"],
      });
    }
    setAccounts(result.slice(1));
    setLoading(false);
  };

  useEffect(() => {
    const initialLoadMethod = async () => {
      fetchTransactionType();
      fetchCurrencies();
      fetchAccountCashList();
    };

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }
  }, [currentContext.selectedCIF]);

  return (
    <Modal
      show={props.showNewTransactionModal}
      onHide={props.hideNewTransactionModal}
      //size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="modal-header-text">
          <div className="d-flex align-items-center">
            <div className="ib-icon">
              <a
                href="#"
                onClick={props.backNewTransactionModal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.NewTransactionTitle}</h4>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="close"
          onClick={props.hideNewTransactionModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box" id="applyReqBox">
          <div className="container-fluid">
            <div className="row col-xl-9">
              <div className="col-lg-12 form-group">
                <label>{local_Strings.TransactionTransferTypeLabel}</label>
                <select
                  className="form-control"
                  id="reqTypeSelect"
                  value={transactionTypeId || ""}
                  onChange={(e: any) => {
                    setTransactionTypeId(e.target.value);
                    fetchBeneficiariesByCif(e.target.value);
                    setShowFormLocal(false);
                    setShowFormWithin(false);
                    setShowInternational(false);
                    if (e.target.value === "1") {
                      setShowFormWithin(true);
                    }
                    if (e.target.value === "2") {
                      setShowFormLocal(true);
                    }
                    if (e.target.value === "3") {
                      setShowInternational(true);
                    }
                  }}
                >
                  <option value="">{local_Strings.SelectItem}</option>
                  {transactionTypes &&
                    transactionTypes.length > 0 &&
                    !!transactionTypes[0].label &&
                    transactionTypes.map((c, i) => (
                      <option key={i} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <LoadingOverlay
            active={isLoading}
            spinner={
              <PuffLoader
                size={Constant.SpnnerSize}
                color={Constant.SpinnerColor}
              />
            }
          />
          {showFormWithin && (
            <Formik
              initialValues={initialValuesWithin}
              validationSchema={validationSchemaWithin}
              onSubmit={async (values) => {
                setLoading(true);

                const result = await SendOTP(currentContext.selectedCIF);
                if (result === true) {
                  props.showOTPValidationFormModal(values);
                } else {
                  Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: local_Strings.GenericErrorMessage,
                    showConfirmButton: false,
                    timer: Constant.AlertTimeout,
                  });
                }
                setLoading(false);
              }}
            >
              {({
                values,
                handleBlur,
                handleChange,
                handleSubmit,
                errors,
                touched,
                setFieldValue,
                validateForm,
                isValid,
              }) => (
                <div className="newReqFields" id="newReqFields">
                  <div className="container-fluid py-2">
                    <div className="row col-xl-9">
                      <div className="col-lg-6 form-group">
                        <label>
                          {local_Strings.TransactionFromAccountLabel}
                        </label>
                        <select
                          className="form-control"
                          value={values.transferFromAccount || ""}
                          onBlur={handleBlur("transferFromAccount")}
                          onChange={(e) => {
                            setFieldValue(
                              "transferFromAccount",
                              e.target.value
                            );
                          }}
                        >
                          <option value="">{local_Strings.SelectItem}</option>
                          {accounts &&
                            accounts.length > 0 &&
                            accounts.map((c, i) => (
                              <option key={i} value={c.value}>
                                {c.label}
                              </option>
                            ))}
                        </select>
                        {touched.transferFromAccount &&
                          errors.transferFromAccount &&
                          InvalidFieldError(errors.transferFromAccount)}
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>{local_Strings.TransactionToAccountLabel}</label>
                        <select
                          className="form-control"
                          value={values.transferToAccount || ""}
                          onBlur={handleBlur("transferToAccount")}
                          onChange={(e) => {
                            setFieldValue("transferToAccount", e.target.value);
                          }}
                        >
                          <option value="">{local_Strings.SelectItem}</option>
                          {accounts &&
                            accounts.length > 0 &&
                            accounts
                              .filter(
                                (obj) =>
                                  obj.label !== values.transferFromAccount
                              )
                              .map((c, i) => (
                                <option key={i} value={c.value}>
                                  {c.label}
                                </option>
                              ))}
                        </select>
                        {touched.transferToAccount &&
                          errors.transferToAccount &&
                          InvalidFieldError(errors.transferToAccount)}
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>{local_Strings.TransactionAmountLabel}</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          pattern="[0-9]*"
                          maxLength={99}
                          value={values.amount?.toString() || ""}
                          onBlur={handleBlur("amount")}
                          onChange={(e) => {
                            if (
                              e.currentTarget.validity.valid &&
                              e.currentTarget.value.length <= 99
                            ) {
                              setFieldValue(
                                "amount",
                                e.target.value.replace(/[^0-9]*/, "")
                              );
                            }
                          }}
                        />
                        {touched.amount &&
                          errors.amount &&
                          InvalidFieldError(errors.amount)}
                      </div>
                    </div>
                  </div>

                  <div className="text-right p-3">
                    <button
                      id="applyReqBtn"
                      className="btn btn-primary"
                      type="submit"
                      onClick={(e) => {
                        validateForm(values);
                        if (isValid) {
                          handleSubmit();
                        } else {
                          touched.transferFromAccount = true;
                          touched.transferToAccount = true;
                          touched.amount = true;
                          Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: local_Strings.formValidationMessage,
                            showConfirmButton: false,
                            timer: Constant.AlertTimeout,
                          });
                        }
                      }}
                    >
                      {local_Strings.TransactionRequestButton}
                    </button>
                  </div>
                </div>
              )}
            </Formik>
          )}
          {(showFormLocal || showFormInternational) && (
            <Formik
              initialValues={initialValuesLocalOrInternational}
              validationSchema={validationSchemaLocalOrInternational}
              onSubmit={async (values) => {
                setLoading(true);

                const result = await SendOTP(currentContext.selectedCIF);
                if (result === true) {
                  props.showOTPValidationFormModal(values);
                } else {
                  Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: local_Strings.GenericErrorMessage,
                    showConfirmButton: false,
                    timer: Constant.AlertTimeout,
                  });
                }
                setLoading(false);
              }}
            >
              {({
                values,
                handleBlur,
                handleChange,
                handleSubmit,
                errors,
                touched,
                setFieldValue,
                validateForm,
                isValid,
              }) => (
                <div className="newReqFields" id="newReqFields">
                  <div className="py-2 container-fluid">
                    <div className="row col-xl-9">
                      <div className="col-lg-6 form-group">
                        <label>
                          {local_Strings.TransactionFromAccountLabel}
                        </label>
                        <select
                          className="form-control"
                          onBlur={handleBlur("transferFromAccount")}
                          value={values.transferFromAccount || ""}
                          onChange={(e) => {
                            setFieldValue(
                              "transferFromAccount",
                              e.target.value
                            );
                          }}
                        >
                          <option value="">{local_Strings.SelectItem}</option>
                          {accounts &&
                            accounts.length > 0 &&
                            accounts.map((c, i) => (
                              <option key={i} value={c.value}>
                                {c.label}
                              </option>
                            ))}
                        </select>
                        {touched.transferFromAccount &&
                          errors.transferFromAccount &&
                          InvalidFieldError(errors.transferFromAccount)}
                      </div>

                      <div className="col-lg-6 form-group">
                        <label>
                          {local_Strings.TransactionBenficiaryLabel}
                        </label>
                        <select
                          className="form-control"
                          onBlur={handleBlur("beneficiaryId")}
                          value={values.beneficiaryId || ""}
                          onChange={(e) => {
                            setFieldValue("beneficiaryId", e.target.value);
                            var ben = beneficiariesData.filter(
                              (obj) => obj["id"] === e.target.value
                            );
                            if (ben.length > 0) {
                              setFieldValue(
                                "currency",
                                ben[0]["beneficiaryCurrency"]
                              );                              
                              controller.selectItem(
                                ben[0]["beneficiaryCurrency"]
                              );
                            }
                          }}
                        >
                          <option value="">{local_Strings.SelectItem}</option>
                          {beneficiaries &&
                            beneficiaries.length > 0 &&
                            beneficiaries.map((c, i) => (
                              <option key={i} value={c.value}>
                                {c.label}
                              </option>
                            ))}
                        </select>
                        {touched.beneficiaryId &&
                          errors.beneficiaryId &&
                          InvalidFieldError(errors.beneficiaryId)}
                      </div>

                      <div className="col-lg-6 form-group">
                        <label>{local_Strings.TransactionCurrencyLabel}</label>
                        <select
                          className="form-control"
                          value={values.currency || ""}
                          onBlur={handleBlur("currency")}
                          onChange={(e) => {
                            setFieldValue("currency", e.target.value);
                          }}
                        >
                          <option value="">{local_Strings.SelectItem}</option>
                          {currencies &&
                            currencies.length > 0 &&
                            currencies.map((c, i) => (
                              <option key={i} value={c.value}>
                                {c.label}
                              </option>
                            ))}
                        </select>
                        {touched.currency &&
                          errors.currency &&
                          InvalidFieldError(errors.currency)}
                      </div>

                      <div className="col-lg-6 form-group">
                        <label>{local_Strings.TransactionAmountLabel}</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          pattern="[0-9]*"
                          maxLength={99}
                          value={values.amount?.toString() || ""}
                          onBlur={handleBlur("amount")}
                          onChange={(e) => {
                            if (
                              e.currentTarget.validity.valid &&
                              e.currentTarget.value.length <= 99
                            ) {
                              setFieldValue(
                                "amount",
                                e.target.value.replace(/[^0-9]*/, "")
                              );
                            }
                          }}
                        />
                        {touched.amount &&
                          errors.amount &&
                          InvalidFieldError(errors.amount)}
                      </div>

                      <div className="col-lg-6 form-group customDate ">
                        <label>{local_Strings.TransactionDateLabel}</label>
                        <DatePicker
                          className="form-control"
                          dateFormat="MMMM dd, yyyy"
                          selected={
                            values.transactionDate
                              ? new Date(values.transactionDate)
                              : null
                          }
                          onBlur={handleBlur("transactionDate")}
                          onChange={(date: Date) => {
                            setFieldValue(
                              "transactionDate",
                              date.toISOString(),
                              false
                            );
                          }}
                        />
                        {touched.transactionDate &&
                          errors.transactionDate &&
                          InvalidFieldError(errors.transactionDate)}
                      </div>
                      <div className="col-lg-12">
                        <label>
                          {local_Strings.TransactionDescriptionLabel}
                        </label>
                        <textarea
                          className="form-control"
                          value={values.description || ""}
                          rows={3}
                          onBlur={handleBlur("description")}
                          onChange={handleChange("description")}
                          maxLength={500}
                        />
                        {touched.description &&
                          errors.description &&
                          InvalidFieldError(errors.description)}
                      </div>
                    </div>
                  </div>

                  <div className="text-right p-3">
                    <button
                      id="applyReqBtn"
                      className="btn btn-primary"
                      type="submit"
                      onClick={(e) => {
                        validateForm(values);
                        if (isValid) {
                          handleSubmit();
                        } else {
                          touched.transferFromAccount = true;
                          touched.beneficiaryId = true;
                          touched.currency = true;
                          touched.amount = true;
                          touched.description = true;
                          Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: local_Strings.formValidationMessage,
                            showConfirmButton: false,
                            timer: Constant.AlertTimeout,
                          });
                        }
                      }}
                    >
                      {local_Strings.TransactionRequestButton}
                    </button>
                  </div>
                </div>
              )}
            </Formik>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default NewTransaction;
