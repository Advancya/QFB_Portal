import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { localStrings as local_Strings } from '../../translations/localStrings';
import { AuthContext } from "../../providers/AuthProvider";
import { GetBeneficiariesTypes } from "../../services/cmsService";
import Swal from 'sweetalert2';
import Constant from "../../constants/defaultData";
import LoadingOverlay from 'react-loading-overlay';
import PuffLoader from "react-spinners/PuffLoader";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from '../../shared/invalid-field-error';
import {
  AddBeneficiary,
  ValidateBankIBAN,
  ValidateBankSwift,
  ValidateQFBAccountOrIBan,
  iBeneficiary,
  UpdateBeneficiary
} from "../../services/transactionService";
import {
  GetBanks,
  GetCountries,
  GetCurrencies,
} from "../../services/commonDataServices";

interface iDDL {
  label: string;
  value: any;
}

interface iNewBeneficiary {
  showNewBeneficiaryModal: boolean;
  hideNewBeneficiaryModal: () => void;
  backNewBeneficiaryModal: () => void;
  backBeneficiaryDetailsModal: () => void;
  refreshBeneficiariesListing: () => void;
  beneficiary: iBeneficiary;
}

function NewBeneficiary(props: iNewBeneficiary) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);

  const [transactionTypes, setTransactionTypes] = useState<iDDL[]>([]);
  const [currencies, setCurrencies] = useState<iDDL[]>([]);
  const [countries, setCountries] = useState<iDDL[]>([]);
  const [banks, setBanks] = useState<iDDL[]>([]);
  const [bankSwift, setBankSwift] = useState("");
  const [transactionTypeId, setTransactionTypeId] = useState(props.beneficiary ? props.beneficiary.typeId : "");

  const [isValidIban, setIsValidIban] = useState(true);

  const initialValuesWithin: iBeneficiary = {
    id: 0,
    cif: currentContext.selectedCIF,
    createDate: new Date().toISOString(),
    typeId: transactionTypeId.toString(),
    beneficiaryId: new Date().getTime().toString(),
    qfbaccount: undefined,
    beneficiaryCurrency: undefined,
    beneficiaryBank: undefined,
    beneficiarySwiftCode: undefined,
    beneficiaryFullName: undefined,
    beneficiaryIban: undefined,
    beneficiaryAddress: undefined,
    beneficiaryAccountNumber: undefined,
    beneficiaryCity: undefined,
    country: undefined,
    intermediaryBankSwiftCode: undefined,
    intermediaryBankName: undefined,
    routingNumber: undefined,
    beneficiaryBankSwiftCode: undefined,
  };

  const initialValuesLocal: iBeneficiary = {
    id: 0,
    cif: currentContext.selectedCIF,
    createDate: new Date().toISOString(),
    typeId: transactionTypeId.toString(),
    beneficiaryId: new Date().getTime().toString(),
    qfbaccount: undefined,
    beneficiaryCurrency: undefined,
    beneficiaryBank: undefined,
    beneficiarySwiftCode: undefined,
    beneficiaryFullName: undefined,
    beneficiaryIban: undefined,
    beneficiaryAddress: undefined,
    beneficiaryAccountNumber: undefined,
    beneficiaryCity: undefined,
    country: undefined,
    intermediaryBankSwiftCode: undefined,
    intermediaryBankName: undefined,
    routingNumber: undefined,
    beneficiaryBankSwiftCode: undefined,
  };

  const initialValuesInternational: iBeneficiary = {
    id: 0,
    cif: currentContext.selectedCIF,
    createDate: new Date().toISOString(),
    typeId: transactionTypeId.toString(),
    beneficiaryId: new Date().getTime().toString(),
    qfbaccount: undefined,
    beneficiaryCurrency: undefined,
    beneficiaryBank: undefined,
    beneficiarySwiftCode: undefined,
    beneficiaryFullName: undefined,
    beneficiaryIban: undefined,
    beneficiaryAddress: undefined,
    beneficiaryAccountNumber: undefined,
    beneficiaryCity: undefined,
    country: undefined,
    intermediaryBankSwiftCode: undefined,
    intermediaryBankName: undefined,
    routingNumber: undefined,
    beneficiaryBankSwiftCode: undefined,
  };

  const validationSchemaWithin = yup.object({
    beneficiaryId: yup.string().required(local_Strings.GeneralValidation),
    beneficiaryFullName: yup.string().required(local_Strings.GeneralValidation),
    qfbaccount: yup.string().required(local_Strings.GeneralValidation),
    beneficiaryCurrency: yup.string().required(local_Strings.GeneralValidation),
  });

  const validationSchemaLocal = yup.object({
    beneficiaryId: yup.string().required(local_Strings.GeneralValidation),
    beneficiaryFullName: yup.string().required(local_Strings.GeneralValidation),
    beneficiaryBank: yup.string().required(local_Strings.GeneralValidation),
    beneficiaryBankSwiftCode: yup.string().required(local_Strings.GeneralValidation),
    beneficiaryIban: yup.string().required(local_Strings.GeneralValidation),
    beneficiaryCurrency: yup.string().required(local_Strings.GeneralValidation),
  });

  const validationSchemaInternational = yup.object({
    beneficiaryId: yup.string().required(local_Strings.GeneralValidation),
    // beneficiaryBank: yup.string().required(),
    beneficiarySwiftCode: yup.string().required(local_Strings.GeneralValidation),
    beneficiaryFullName: yup.string().required(local_Strings.GeneralValidation),
    beneficiaryAccountNumber: yup.string().required(local_Strings.GeneralValidation),
    //beneficiaryIban: yup.string().required(),
    beneficiaryCity: yup.string().required(local_Strings.GeneralValidation),
    country: yup.string().required(local_Strings.GeneralValidation),
    beneficiaryCurrency: yup.string().required(local_Strings.GeneralValidation),
    beneficiaryAddress: yup.string().required(local_Strings.GeneralValidation),
  });

  const fetchTransactionType = async () => {
    setLoading(true);
    const data = await GetBeneficiariesTypes();
    let result: iDDL[] = [{ label: "", value: "" }];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      result.push({
        label: currentContext.language === "ar" ? element["nameAr"] : element["name"],
        value: element["id"],
      });
    }
    setTransactionTypes(result.slice(1));
    setLoading(false);
  };

  const fetchCurrencies = async () => {
    setLoading(true);
    const data = await GetCurrencies();
    let result: iDDL[] = [{ label: "", value: "" }];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      result.push({
        label: currentContext.language === "ar" ? element["nameAr"] : element["name"],
        value: element["name"],
      });
    }
    setCurrencies(result.slice(1));
    setLoading(false);
  };

  const fetchBanks = async () => {
    setLoading(true);
    const data = await GetBanks();
    let result: iDDL[] = [{ label: "", value: "" }];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      result.push({
        label: currentContext.language === "ar" ? element["nameAr"] : element["nameEn"],
        value: element["swift"],
      });
    }
    setBanks(result.slice(1).sort((a, b) => a.label.localeCompare(b.label)));
    setLoading(false);
  };

  const fetchCountries = async () => {
    setLoading(true);
    const data = await GetCountries();
    let result: iDDL[] = [{ label: "", value: "" }];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      result.push({
        label: currentContext.language === "ar" ? element["nameAr"] : element["nameEn"],
        value: element["nameEn"],
      });
    }
    setCountries(
      result.slice(1).sort((a, b) => a.label.localeCompare(b.label))
    );
    setLoading(false);
  };

  useEffect(() => {
    const initialLoadMethod = async () => {
      fetchTransactionType();
      fetchCurrencies();
      fetchBanks();
      fetchCountries();
    }

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }
  }, [currentContext.selectedCIF]);

  useEffect(() => setTransactionTypeId(props.beneficiary ? props.beneficiary.typeId : transactionTypeId), [props.beneficiary]);

  return (
    <Modal
      show={props.showNewBeneficiaryModal}
      onHide={props.hideNewBeneficiaryModal}
      size="lg"
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
                onClick={props.backNewBeneficiaryModal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">{props.beneficiary ? local_Strings.EditBeneficiaryTitle : local_Strings.NewBeneficiaryTitle}</h4>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="close"
          onClick={props.hideNewBeneficiaryModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div
          className="box modal-box"
          id="applyReqBox"
        >

          {props.beneficiary ?
            <ul className="box-list" id="reqList1">
              <li className="pb-3">
                <div className="row align-items-center">
                  <div className="col-sm-8">
                    <h4>{local_Strings.BeneficiariesListingIDLabel + props.beneficiary?.beneficiaryId}</h4>
                    <h4 className="text-18">{props.beneficiary?.beneficiaryFullName}</h4>
                  </div>
                  <div className="col-sm-4 text-sm-right">
                    <span className="status-badge">{props.beneficiary?.country || ""}</span>
                  </div>
                </div>
              </li>
            </ul> :
            <div className="container-fluid">
              <div className="row ">
                <div className="col-lg-9 form-group">
                  <label>Beneficiary Type</label>
                  <select
                    className="form-control"
                    id="reqTypeSelect"
                    onChange={(e: any) => setTransactionTypeId(e.target.value)}
                  >
                    <option value="">{local_Strings.SelectItem}</option>
                    {transactionTypes &&
                      transactionTypes.length > 0 &&
                      !!transactionTypes[0].label &&
                      transactionTypes.map((c, i) =>
                        <option key={i} value={c.value}>{c.label}</option>
                      )}
                  </select>
                </div>
              </div>
            </div>}

          {transactionTypeId.toString() === "1" &&
            <Formik
              initialValues={props.beneficiary ? props.beneficiary : initialValuesWithin}
              validationSchema={validationSchemaWithin}
              onSubmit={async (values) => {
                setLoading(true);
                const result = props.beneficiary ? await UpdateBeneficiary(values) : await AddBeneficiary(values);
                if (result === true) {

                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: local_Strings.NewBeneficiaryMsgTitle,
                    html: local_Strings.NewBeneficiaryMsgBody,
                    showConfirmButton: false,
                    timer: Constant.AlertTimeout
                  });
                  props.refreshBeneficiariesListing();
                } else {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: local_Strings.GenericErrorMessage,
                    showConfirmButton: false,
                    timer: Constant.AlertTimeout
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
                setFieldError,
                setFieldTouched,
                setErrors,
                validateForm,
                isValid
              }) => (
                <div
                  className="newReqFields"
                  id="newReqFields"
                >
                  <div className="py-2">
                    <div className=" col-lg-9">
                      <div className="row mb-5">
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiaryIDLabel}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            defaultValue={values.beneficiaryId}
                            readOnly
                          />
                        </div>
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiaryFullNameLabel}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={values.beneficiaryFullName || ""}
                            onChange={handleChange("beneficiaryFullName")}
                            onBlur={handleBlur("beneficiaryFullName")}
                          />
                          {touched.beneficiaryFullName && errors.beneficiaryFullName && InvalidFieldError(errors.beneficiaryFullName)}
                        </div>
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiaryQFBAccountOrIBAN}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={values.qfbaccount || ""}
                            onBlur={async () => {
                              if (!!values.qfbaccount) {
                                setLoading(true);
                                const res = await ValidateQFBAccountOrIBan(
                                  values.qfbaccount
                                );

                                if (res.length > 0) {
                                  setFieldValue(
                                    "beneficiaryCurrency",
                                    res[0]["currency"]
                                  );
                                  setIsValidIban(true);
                                } else {
                                  setFieldValue("beneficiaryCurrency", "");
                                  setIsValidIban(false);
                                }
                                setLoading(false);
                              }
                              handleBlur("qfbaccount");
                            }}
                            onChange={handleChange("qfbaccount")}
                          />
                          {touched.qfbaccount && errors.qfbaccount && InvalidFieldError(errors.qfbaccount)}
                          {!isValidIban && InvalidFieldError(local_Strings.BeneficiaryInvalidIban)}
                        </div>
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiaryForeignCurrencyLabel}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            defaultValue={values.beneficiaryCurrency}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-right p-3">
                      <button id="applyReqBtn" className="btn btn-primary"
                        type="submit"
                        onClick={(e) => {
                          validateForm(values);
                          if (isValid) {
                            handleSubmit();
                          } else {
                            touched.beneficiaryId = true;
                            touched.beneficiaryFullName = true;
                            touched.qfbaccount = true;
                            touched.beneficiaryCurrency = true;
                            Swal.fire({
                              position: 'top-end',
                              icon: 'error',
                              title: local_Strings.formValidationMessage,
                              showConfirmButton: false,
                              timer: Constant.AlertTimeout
                            });
                          }
                        }}>
                        {local_Strings.BeneficiarySaveButton}
                      </button>
                      {props.beneficiary &&
                        <button id="applyReqBtn" className="btn btn-primary"
                          type="button"
                          onClick={(e) => props.backBeneficiaryDetailsModal()}>
                          {local_Strings.BeneficiaryCancelButton}
                        </button>
                      }
                    </div>
                  </div>
                </div>
              )}
            </Formik>
          }
          {transactionTypeId.toString() === "2" &&
            <Formik
              initialValues={props.beneficiary ? props.beneficiary : initialValuesLocal}
              validationSchema={validationSchemaLocal}
              onSubmit={async (values) => {
                setLoading(true);
                const result = props.beneficiary ? await UpdateBeneficiary(values) : await AddBeneficiary(values);
                if (result === true) {

                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: local_Strings.NewBeneficiaryMsgTitle,
                    html: local_Strings.NewBeneficiaryMsgBody,
                    showConfirmButton: false,
                    timer: Constant.AlertTimeout
                  });
                  props.refreshBeneficiariesListing();
                } else {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: local_Strings.GenericErrorMessage,
                    showConfirmButton: false,
                    timer: Constant.AlertTimeout
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
                setFieldError,
                setFieldTouched,
                setErrors,
                validateForm,
                isValid
              }) => (
                <div
                  className="newReqFields"
                  id="newReqFields"
                >
                  <div className="py-2">
                    <div className=" col-lg-9">
                      <div className="row mb-5">
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiaryIDLabel}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            defaultValue={values.beneficiaryId || ""}
                            readOnly
                          />
                        </div>
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiaryFullNameLabel}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={values.beneficiaryFullName || ""}
                            onChange={handleChange("beneficiaryFullName")}
                            onBlur={handleBlur("beneficiaryFullName")}
                          />
                          {touched.beneficiaryFullName && errors.beneficiaryFullName && InvalidFieldError(errors.beneficiaryFullName)}
                        </div>
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiaryBankLabel}</label>
                          <select className="form-control"
                            onBlur={handleBlur("beneficiaryBank")}
                            value={values.beneficiaryBank || ""}
                            onChange={(e) => {
                              setFieldValue("beneficiaryBank", e.target.value);
                              setBankSwift(e.target.value);
                              setFieldValue(
                                "beneficiaryBankSwiftCode",
                                e.target.value
                              );
                            }}>
                            <option value="">{local_Strings.SelectItem}</option>
                            {banks &&
                              banks.length > 0 &&
                              banks.map((c, i) =>
                                <option key={i} value={c.value}>{c.label}</option>
                              )}
                          </select>
                          {touched.beneficiaryBank && errors.beneficiaryBank && InvalidFieldError(errors.beneficiaryBank)}
                        </div>
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiarySwiftCodeLabel}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            defaultValue={bankSwift}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="row mb-5">
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiaryQFBAccountOrIBAN}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={values.beneficiaryIban || ""}
                            onBlur={async () => {
                              if (!!values.beneficiaryIban) {
                                const result = await ValidateBankIBAN(
                                  values.beneficiaryIban!
                                );
                                if (result && !!result.bic) {
                                  setIsValidIban(true);
                                } else {
                                  setIsValidIban(false);
                                }
                              }
                              handleBlur("beneficiaryIban");
                            }}
                            onChange={handleChange("beneficiaryIban")}
                          />
                          {touched.beneficiaryIban && errors.beneficiaryIban && InvalidFieldError(errors.beneficiaryIban)}
                          {!isValidIban && InvalidFieldError(local_Strings.BeneficiaryInvalidIban)}
                        </div>
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.TransactionCurrencyLabel}</label>
                          <select className="form-control"
                            value={values.beneficiaryCurrency || ""}
                            onBlur={handleBlur("beneficiaryCurrency")}
                            onChange={handleChange("beneficiaryCurrency")}
                          >
                            <option value="">{local_Strings.SelectItem}</option>
                            {currencies &&
                              currencies.length > 0 &&
                              currencies.map((c, i) =>
                                <option key={i} value={c.value}>{c.label}</option>
                              )}
                          </select>
                          {touched.beneficiaryCurrency && errors.beneficiaryCurrency && InvalidFieldError(errors.beneficiaryCurrency)}
                        </div>
                        <div className="col-lg-12">
                          <label>{local_Strings.BeneficiaryAddressLabel}</label>
                          <textarea className="form-control"
                            value={values.beneficiaryAddress || ""}
                            rows={4}
                            onBlur={handleBlur("beneficiaryAddress")}
                            onChange={handleChange("beneficiaryAddress")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-right p-3">
                      <button id="applyReqBtn" className="btn btn-primary"
                        type="submit"
                        onClick={(e) => {
                          validateForm(values);
                          if (isValid) {
                            handleSubmit();
                          } else {
                            touched.beneficiaryId = true;
                            touched.beneficiaryFullName = true;
                            touched.beneficiaryBank = true;
                            touched.beneficiaryBankSwiftCode = true;
                            touched.beneficiaryIban = true;
                            touched.beneficiaryCurrency = true;
                            Swal.fire({
                              position: 'top-end',
                              icon: 'error',
                              title: local_Strings.formValidationMessage,
                              showConfirmButton: false,
                              timer: Constant.AlertTimeout
                            });
                          }
                        }}>
                        {local_Strings.BeneficiarySaveButton}
                      </button>
                      {props.beneficiary &&
                        <button id="applyReqBtn" className="btn btn-primary"
                          type="button"
                          onClick={(e) => props.backBeneficiaryDetailsModal()}>
                          {local_Strings.BeneficiaryCancelButton}
                        </button>
                      }
                    </div>
                  </div>
                </div>
              )}
            </Formik>
          }
          {transactionTypeId.toString() === "3" &&
            <Formik
              initialValues={props.beneficiary ? props.beneficiary : initialValuesInternational}
              validationSchema={validationSchemaInternational}
              onSubmit={async (values) => {
                setLoading(true);
                const result = props.beneficiary ? await UpdateBeneficiary(values) : await AddBeneficiary(values);
                if (result === true) {

                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: local_Strings.NewBeneficiaryMsgTitle,
                    html: local_Strings.NewBeneficiaryMsgBody,
                    showConfirmButton: false,
                    timer: Constant.AlertTimeout
                  });
                  props.refreshBeneficiariesListing();
                } else {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: local_Strings.GenericErrorMessage,
                    showConfirmButton: false,
                    timer: Constant.AlertTimeout
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
                setFieldError,
                setFieldTouched,
                setErrors,
                validateForm,
                isValid
              }) => (
                <div
                  className="newReqFields"
                  id="newReqFields"
                >
                  <div className="py-2">
                    <div className=" col-lg-9">
                      <div className="row mb-5">
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiaryFullNameLabel}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={values.beneficiaryFullName}
                            onChange={handleChange("beneficiaryFullName")}
                            onBlur={handleBlur("beneficiaryFullName")}
                          />
                          {touched.beneficiaryFullName && errors.beneficiaryFullName && InvalidFieldError(errors.beneficiaryFullName)}
                        </div>
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiaryIDLabelInternational}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            defaultValue={values.beneficiaryId}
                            readOnly
                          />
                        </div>
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiarySwiftCodeLabel}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={values.beneficiarySwiftCode}
                            onChange={handleChange("beneficiarySwiftCode")}
                            onBlur={async () => {
                              if (!!values.beneficiarySwiftCode) {
                                setLoading(true);

                                const result = await ValidateBankSwift(
                                  values.beneficiarySwiftCode!
                                );
                                if (result && result.bicdata) {
                                  setFieldValue(
                                    "beneficiaryBank",
                                    result.bicdata[0]["institution_name"]
                                  );
                                }
                                setLoading(false);
                              }
                              handleBlur("beneficiarySwiftCode");
                            }}
                          />
                          {touched.beneficiarySwiftCode && errors.beneficiarySwiftCode && InvalidFieldError(errors.beneficiarySwiftCode)}
                        </div>
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.TransactionCurrencyLabel}</label>
                          <select className="form-control"
                            value={values.beneficiaryCurrency || ""}
                            onChange={handleChange("beneficiaryCurrency")}
                            onBlur={handleBlur("beneficiaryCurrency")}
                          >
                            <option value="">{local_Strings.SelectItem}</option>
                            {currencies &&
                              currencies.length > 0 &&
                              currencies.filter((i) => i.value !== "QAR").map((c, i) =>
                                <option key={i} value={c.value}>{c.label}</option>
                              )}
                          </select>
                          {touched.beneficiaryCurrency && errors.beneficiaryCurrency && InvalidFieldError(errors.beneficiaryCurrency)}
                        </div>
                      </div>
                      <div className="row mb-5">
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiaryAccountNumberLabel}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={values.beneficiaryAccountNumber}
                            onBlur={handleBlur("beneficiaryAccountNumber")}
                            onChange={handleChange("beneficiaryAccountNumber")}
                          />
                          {touched.beneficiaryAccountNumber && errors.beneficiaryAccountNumber && InvalidFieldError(errors.beneficiaryAccountNumber)}
                        </div>
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiaryIBANInternationalLabel}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={values.beneficiaryIban}
                            onBlur={async () => {
                              if (!!values.beneficiaryIban) {
                                setLoading(true);

                                const result = await ValidateBankIBAN(
                                  values.beneficiaryIban!
                                );
                                if (result && !!result.bic) {
                                  setIsValidIban(true);
                                } else {
                                  setIsValidIban(false);
                                }
                                setLoading(false);
                              }
                              handleBlur("beneficiaryIban")
                            }}
                            onChange={handleChange("beneficiaryIban")}
                          />
                          {!isValidIban && InvalidFieldError(local_Strings.GeneralValidation)}
                        </div>
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiaryCityLabel}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={values.beneficiaryCity}
                            onBlur={handleBlur("beneficiaryCity")}
                            onChange={handleChange("beneficiaryCity")}
                          />
                          {touched.beneficiaryCity && errors.beneficiaryCity && InvalidFieldError(errors.beneficiaryCity)}
                        </div>
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiaryIntermediaryBankSwiftCodeLabel}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={values.intermediaryBankSwiftCode}
                            onBlur={async () => {
                              if (!!values.beneficiaryIban) {
                                setLoading(true);

                                const result = await ValidateBankIBAN(
                                  values.beneficiaryIban!
                                );
                                if (result && !!result.bic) {
                                  setIsValidIban(true);
                                } else {
                                  setIsValidIban(false);
                                }
                                setLoading(false);
                              }
                              handleBlur("intermediaryBankSwiftCode")
                            }}
                            onChange={handleChange("intermediaryBankSwiftCode")}
                          />
                          {touched.intermediaryBankSwiftCode && errors.intermediaryBankSwiftCode && InvalidFieldError(errors.intermediaryBankSwiftCode)}
                        </div>
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiaryIntermediaryBankLabel}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={values.intermediaryBankName}
                            onBlur={handleBlur("intermediaryBankName")}
                            onChange={handleChange("intermediaryBankName")}
                          />
                          {touched.intermediaryBankName && errors.intermediaryBankName && InvalidFieldError(errors.intermediaryBankName)}
                        </div>
                        <div className="col-lg-6 form-group">
                          <label>{local_Strings.BeneficiaryRoutingNumberLabel}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={values.routingNumber}
                            onBlur={handleBlur("routingNumber")}
                            onChange={handleChange("routingNumber")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-right p-3">
                      <button id="applyReqBtn" className="btn btn-primary"
                        type="submit"
                        onClick={(e) => {
                          validateForm(values);
                          if (isValid) {
                            handleSubmit();
                          } else {
                            touched.beneficiaryId = true;
                            touched.beneficiaryFullName = true;
                            touched.qfbaccount = true;
                            touched.beneficiaryCurrency = true;
                            Swal.fire({
                              position: 'top-end',
                              icon: 'error',
                              title: local_Strings.formValidationMessage,
                              showConfirmButton: false,
                              timer: Constant.AlertTimeout
                            });
                          }
                        }}>
                        {local_Strings.BeneficiarySaveButton}
                      </button>
                      {props.beneficiary &&
                        <button id="applyReqBtn" className="btn btn-primary"
                          type="button"
                          onClick={(e) => props.backBeneficiaryDetailsModal()}>
                          {local_Strings.BeneficiaryCancelButton}
                        </button>
                      }
                    </div>
                  </div>
                </div>
              )}
            </Formik>
          }
          <LoadingOverlay
            active={isLoading}
            spinner={
              <PuffLoader
                size={Constant.SpnnerSize}
                color={Constant.SpinnerColor}
              />
            }
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default NewBeneficiary;
