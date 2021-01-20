import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Modal } from "react-bootstrap";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import moment from "moment";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from "../../shared/invalid-field-error";
import Swal from "sweetalert2";
import xIcon from "../../images/x-icon.svg";

import {
  initialNewRequest,
  INewRequestDetail,
} from "../../Helpers/publicInterfaces";
import {
  AddRequest,
  GetExtraDetailCurrentDetail,
  GetExtraDetailsDepositDetails,
  GetRequestFields,
  GetRequstsTypes,
} from "../../services/requestService";
import {
  GetDepositeListing,
  GetInvestmentsListing,
} from "../../services/cmsService";
import { GetCashListing } from "../../services/apiServices";
import DatePicker from "react-datepicker";
import {
  IDeposit,
  IAccountBalance,
  IInvestment,
} from "../../Helpers/publicInterfaces";
import axios from "axios";
import FileUploader from "../../shared/FileUploader";
import ViewAttachment from "../../shared/AttachmentViewer";

interface iNewRequest {
  showNewRequestModal: boolean;
  hideNewRequestModal: () => void;
  backNewRequestModal: () => void;
  refreshRequestsListing: () => void;
}

interface iDDL {
  label: string;
  value: any;
}

function NewRequest(props: iNewRequest) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(true);
  const [showRequestFields, setShowRequestFields] = useState(false);

  const [selectedRequestType, setSelectedRequestType] = useState("");
  const [selectedRequestTypeName, setSelectedRequestTypeName] = useState("");
  const [isRequestTypeSelected, setIsRequestTypeSelected] = useState(false);
  const [requestTypes, setRequestTypes] = useState<iDDL[]>([
    { label: "", value: "" },
  ]);

  const [extraDetailsValue, setExtraDetailsValue] = useState("");

  const [formFields, setFormFields] = useState<any[]>([]);
  const [showConfirmationDate, setShowConfirmationDate] = useState(false);
  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);
  const [attachmentName, setAttachmentName] = useState("");
  const [attachmentUri, setAttachmentUri] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [cashBalance, setCashData] = useState<IAccountBalance[]>(null);
  const [deposits, setDepositData] = useState<IDeposit[]>(null);
  const [investments, setInvestmentData] = useState<IInvestment[]>(null);

  const getDropDownListValue = (type: string, value: string) => {
    let data: iDDL[] = [];

    if (type === "DDL") {
      var items = value.indexOf("#@") != -1 ? value.split("#@")[0].split(",") : value.split(",");
      for (let index = 0; index < items.length; index++) {
        data.push({
          label: items[index].replace(/"/g, ""),
          value: items[index].replace(/"/g, ""),
        });
      }
    } else {
      if (value === "SP_MOB_CUST_CASH_LIST" || value === "SP_MOB_CUST_CASH_LIST_REQ") {
        if (cashBalance && cashBalance.length > 0) {
          cashBalance.map((element) =>
            data.push({
              label: element.accountNumber,
              value: element.accountNumber,
            })
          );
        }
      }
      if (value === "SP_MOB_CUST_INV_LIST" || value === "SP_MOB_CUST_INV_LIST_REQ") {
        if (investments && investments.length > 0) {
          investments.map((element) =>
            data.push({
              label: element.secDesciption,
              value: element.secDesciption,
            })
          );
        }
      }
      if (value === "SP_MOB_CUST_DEP_LIST" || value === "SP_MOB_CUST_DEP_LIST_REQ") {
        if (deposits && deposits.length > 0) {
          deposits.map((element) =>
            data.push({
              label: element.contractNumber,
              value: element.contractNumber,
            })
          );
        }
      }
    }

    return data && data.length > 0
      ? data.map((c, i) => (
        <option key={i} value={c.value}>
          {c.label}
        </option>
      ))
      : null;
  };

  const getExtraDetailsValue = (value: string, param: string) => {
    try {
      if (value.split(",")[0] === "MOB_REQ_EX_DET_FLD_CON_CHANGE") {
        GetExtraDetailCurrentDetail(currentContext.selectedCIF).then((c) => {
          let data = "";

          c.map((element: any, index: any) => {
            if (currentContext.language === "ar") {
              data = data + element.nameAr + ":" + element.valueAr + "\n\n ";
            } else {
              data = data + element.name + ":" + element.value + "\n\n ";
            }
          });
          setExtraDetailsValue(data);
        });
      } else if (value.split(",")[0] === "MOB_REQ_EX_DET_FLD_DEP_BRK") {
        GetExtraDetailsDepositDetails(param).then((c) => {
          let data = "";
          c.map((element: any, index: any) => {
            if (currentContext.language === "ar") {
              data =
                data + element.nameAr + ":" + element.valueAr || "" + "\n\n ";
            } else {
              data = data + element.name + ":" + element.value || "" + "\n\n ";
            }
          });
          setExtraDetailsValue(data);
        });
      } else {
        setExtraDetailsValue("");
      }
    } catch (error) { }
  };

  let validationSchema = yup.object().shape({});

  const [formValidationSchema, setFormValidationSchema] = useState(
    yup.object().shape({})
  );

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {
      setLoading(true);

      const getRequstsTypes = GetRequstsTypes();
      const requestCashListing = GetCashListing(currentContext.selectedCIF);
      const requestDepositsListing = GetDepositeListing(
        currentContext.selectedCIF
      );
      const requestInvestmentsListing = GetInvestmentsListing(
        currentContext.selectedCIF
      );

      axios
        .all([
          getRequstsTypes,
          requestCashListing,
          requestDepositsListing,
          requestInvestmentsListing,
        ])
        .then((responseData: any) => {
          if (isMounted && responseData && responseData.length > 0) {
            const requstsTypesResponse = responseData[0];
            let data: iDDL[] = [{ label: "", value: "" }];
            for (let index = 0; index < requstsTypesResponse.length; index++) {
              const element = requstsTypesResponse[index];
              data.push({
                label:
                  currentContext.language === "ar"
                    ? element["nameAr"]
                    : element["nameEn"],
                value: element["id"],
              });
            }

            setRequestTypes(data.slice(1));
            setCashData(responseData[1]);
            setDepositData(responseData[2]);
            setInvestmentData(responseData[3]);
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
  }, [currentContext.selectedCIF, currentContext.language]);


  const setBasicValidationSchema = (fieldName: string, type: string) => {

    if (fieldName === "FaxNumber") {
      const fieldSchema = yup.object().shape({
        FaxNumber:
          type !== "NUMBER"
            ? yup.string()
            : yup.string()
              .matches(/^[0-9]+$/,
                local_Strings.ContactUs_Mobile_Format_Validation_Message),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "LandlineNumber") {
      const fieldSchema = yup.object().shape({
        LandlineNumber:
          type !== "NUMBER"
            ? yup.string()
            : yup.string()
              .matches(/^[0-9]+$/,
                local_Strings.ContactUs_Mobile_Format_Validation_Message),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "MobileNumber") {
      const fieldSchema = yup.object().shape({
        MobileNumber:
          type !== "NUMBER"
            ? yup.string()
            : yup
              .string()
              .matches(/^[0-9]+$/,
                local_Strings.ContactUs_Mobile_Format_Validation_Message),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "Email") {
      const fieldSchema = yup.object().shape({
        Email: yup.string().email(local_Strings.InvalidEmail)
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
  };

  const setValidationSchema = (fieldName: string, type: string) => {
    if (fieldName === "RequestCreateDate") {
      let fieldSchema = yup.object().shape({
        RequestCreateDate:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "CashAccount") {
      const fieldSchema = yup.object().shape({
        CashAccount:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "FromDate") {
      let fieldSchema = yup.object().shape({
        FromDate:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "ToDate") {
      let fieldSchema = yup.object().shape({
        ToDate:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "FaxNumber") {
      const fieldSchema = yup.object().shape({
        FaxNumber:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/,
                local_Strings.ContactUs_Mobile_Format_Validation_Message),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "LandlineNumber") {
      const fieldSchema = yup.object().shape({
        LandlineNumber:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/,
                local_Strings.ContactUs_Mobile_Format_Validation_Message),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "MobileNumber") {
      const fieldSchema = yup.object().shape({
        MobileNumber:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/,
                local_Strings.ContactUs_Mobile_Format_Validation_Message),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "PoBoxNumber") {
      const fieldSchema = yup.object().shape({
        PoBoxNumber:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "Country") {
      const fieldSchema = yup.object().shape({
        Country:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "City") {
      const fieldSchema = yup.object().shape({
        City:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "Address") {
      const fieldSchema = yup.object().shape({
        Address:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "InvestmentName") {
      const fieldSchema = yup.object().shape({
        InvestmentName:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "DocumentType") {
      const fieldSchema = yup.object().shape({
        DocumentType:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "DepositContractNumber") {
      const fieldSchema = yup.object().shape({
        DepositContractNumber:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "ConfirmationDate") {
      const fieldSchema = yup.object().shape({
        ConfirmationDate:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "Currency") {
      const fieldSchema = yup.object().shape({
        Currency:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "Attachments") {
      const fieldSchema = yup.object().shape({
        Attachments:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }

    if (fieldName === "Remarks") {
      const fieldSchema = yup.object().shape({
        Remarks:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "PoBox") {
      const fieldSchema = yup.object().shape({
        PoBox:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "Email") {
      const fieldSchema = yup.object().shape({
        Email:
          type !== "EMAIL"
            ? yup.string().email(local_Strings.InvalidEmail).required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }

    if (fieldName === "StatementType") {
      const fieldSchema = yup.object().shape({
        StatementType:
          type !== "NUMBER"
            ? yup.string().required(local_Strings.GeneralValidation)
            : yup
              .string()
              .required(local_Strings.GeneralValidation)
              .matches(/^[0-9]+$/),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
  };

  const submitRequest = async (values, formikObj) => {
    let validateRequired: boolean[] = [];
    let entertedValues: string[] = [];
    let isValidDate: boolean = true;

    formFields.map((item, index) => {
      let elements = item["details"].split(";");
      if (elements[4] === "YES") {
        if (
          values[elements[0].replace(/ /g, "")] !== undefined &&
          values[elements[0].replace(/ /g, "")] !== ""
        ) {
          entertedValues.push(values[elements[0].replace(/ /g, "")]);
          validateRequired.push(true);
        } else {
          validateRequired.push(false);
          setShowErrorMessage(true);
          setErrorMessage(local_Strings.NewRequestSubmitRequiredMessage);
          return;
        }
      } else {
        if (
          values[elements[0].replace(/ /g, "")] !== undefined &&
          values[elements[0].replace(/ /g, "")] !== ""
        ) {
          entertedValues.push(values[elements[0].replace(/ /g, "")]);
          validateRequired.push(true);
        } else {
          validateRequired.push(true);
          setShowErrorMessage(true);
          setErrorMessage(local_Strings.NewRequestSubmitRequiredMessage);
          return;
        }
      }
    });

    if (values["ToDate"] !== undefined && values["FromDate"] != undefined) {
      if (new Date(values["ToDate"]) < new Date(values["FromDate"])) {
        isValidDate = false;
        setShowErrorMessage(true);
        setErrorMessage(local_Strings.NewRequestSubmitInvalidDate);
        return;
      }
    }

    if (
      !validateRequired.includes(false) &&
      entertedValues.length > 0 &&
      isValidDate === true
    ) {
      setShowErrorMessage(false);
      setErrorMessage("");

      const added = await AddRequest({
        address: values["Address"],
        auditorName: values["AuditorName/Requestor"],
        cashAccount: values["CashAccount"],
        cif: currentContext.selectedCIF,
        city: values["City"],
        confirmationDate: values["ConfirmationDate"],
        contactPersonNumber: values["ContactPersonName(underPOA)"],
        country: values["Country"],
        currency: values["Currency"],
        depositContractNumber: values["DepositContractNumber"],
        documentType: values["DocumentType"],
        extraDetails: extraDetailsValue,
        faxNumber: values["FaxNumber"],
        fileContent: values["Attachments"],
        fileName: attachmentName,
        fromDate: values["FromDate"],
        id: 0,
        investmentName: values["InvestmentName"],
        landlineNumber: values["LandlineNumber"],
        mobileNumber: values["MobileNumber"],
        poBoxNumber: values["PoBox"],
        remarks: values["Remarks"],
        requestCreateDate: values["RequestCreateDate"],
        requestTypeId: Number(selectedRequestType),
        toDate: values["ToDate"],
        requestStatus: values["RequestStatus"],
        requestStatusChangeDate: values["RequestStatusChangeDate"],
        requestSubject: selectedRequestTypeName,
        col1: values["Col1"],
        col2: values["Col2"],
        col3: values["Col3"],
        col4: values["Col4"],
        col5: values["Col5"],
        email: values["Email"],
        statementType: values["StatementType"],
        requestSubjectAr: "",
        requestStatusAr: "",
      });
      if (added === true) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: local_Strings.RequestSuccessTitle,
          html: local_Strings.RequestSuccessMessage,
          showConfirmButton: false,
          timer: Constant.AlertTimeout,
        });
        formikObj.resetForm();
        props.refreshRequestsListing();
      } else {
        setErrorMessage(local_Strings.GenericErrorMessage);
        setShowErrorMessage(false);
      }
    } else {
      setShowErrorMessage(true);
      setErrorMessage(local_Strings.NewRequestSubmitRequiredMessage);
    }
  };

  return (
    <Modal
      show={props.showNewRequestModal}
      onHide={props.hideNewRequestModal}
      // size="lg"
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
                onClick={props.backNewRequestModal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.NewRequestTitle}</h4>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="close"
          onClick={props.hideNewRequestModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>

      <Modal.Body>
        <div className="box modal-box" id="applyReqBox">
          <LoadingOverlay
            active={isLoading}
            spinner={
              <PuffLoader
                size={Constant.SpnnerSize}
                color={Constant.SpinnerColor}
              />
            }
          />

          <Formik
            initialValues={initialNewRequest}
            validationSchema={formValidationSchema}
            onSubmit={async (values, formikObj) => {
              setLoading(true);
              await submitRequest(values, formikObj);
              setLoading(false);              
            }}
            enableReinitialize={true}
          >
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              handleReset,
              errors,
              touched,
              setFieldValue,
              validateForm,
              isValid,
            }) => (
              <React.Fragment>
                <div className="py-2 px-3">
                  <div className="row">
                    <div className="col-lg-8">
                      <label className="">{local_Strings.RequestTypeLabel}</label>
                      <select
                        className="form-control"
                        id="reqTypeSelect"
                        onChange={async (e) => {
                          setLoading(true);
                          const typeId = e.target.value;
                          const index = e.target.selectedIndex;

                          if (typeId != "") {
                            setShowRequestFields(true);
                          } else {
                            setShowRequestFields(false);
                          }

                          setSelectedRequestType(typeId);
                          setSelectedRequestTypeName(e.target[index].innerText);
                          validationSchema = yup.object().shape({});
                          const data = await GetRequestFields(typeId);

                          data.map((d: any, index: number) => {
                            if (d["details"].split(";")[2] === "READ_ONLY") {
                              getExtraDetailsValue(
                                d["details"].split(";")[3],
                                ""
                              );
                            }

                            if (d["details"].split(";")[4] === "YES") {
                              var fName = d["details"]
                                .split(";")[0]
                                .replace(/ /g, "");
                              var fType = d["details"].split(";")[2];
                              setValidationSchema(fName, fType);
                            } else {
                              var fName = d["details"].split(";")[0].replace(/ /g, "");
                              var fType = d["details"].split(";")[2];
                              setBasicValidationSchema(fName, fType);
                            }
                          });

                          setFormFields(data);
                          setFormValidationSchema(validationSchema);
                          setIsRequestTypeSelected(true);
                          setShowErrorMessage(false);
                          setErrorMessage("");
                          handleReset();
                          setLoading(false);
                        }}
                      >
                        <option value="">{local_Strings.SelectItem}</option>
                        {requestTypes &&
                          requestTypes.length > 0 &&
                          !!requestTypes[0].label &&
                          requestTypes.map((c, i) => (
                            <option key={i} value={c.value}>
                              {c.label}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    showRequestFields ? "newReqFields" : "newReqFields d-none"
                  }
                  id="newReqFields"
                >
                  {formFields.map((item, index) => (
                    <Form>
                      <div className="py-2 px-3">
                        {item["details"].split(";")[2] === "FILE_UPLOAD" && (
                          <Form.Row>
                            <Col md={8}>
                              <Form.Group>
                                <Form.Label className="">
                                  {currentContext.language === "ar"
                                    ? item["details"].split(";")[1]
                                    : item["details"].split(";")[0]}
                                </Form.Label>
                                <FileUploader
                                  onUploaded={(
                                    fileName: string,
                                    fileContent: string
                                  ) => {
                                    setAttachmentName(fileName);
                                    const attachment = item["details"]
                                      .split(";")[0]
                                      .replace(/ /g, "");
                                    setFieldValue("FileName", fileName, false);
                                    setFieldValue(
                                      "FileContent",
                                      fileContent,
                                      false
                                    );
                                    setFieldValue(
                                      attachment,
                                      fileContent,
                                      false
                                    );
                                  }}
                                />
                                <ViewAttachment
                                  showDelete={true}
                                  fileName={values.FileName}
                                  fileContent={values.FileContent}
                                  deleteThisFile={() => {
                                    const attachment = item["details"]
                                      .split(";")[0]
                                      .replace(/ /g, "");
                                    setFieldValue("FileName", "");
                                    setFieldValue("FileContent", "");
                                    setFieldValue(attachment, "");
                                  }}
                                />
                              </Form.Group>
                            </Col>
                          </Form.Row>
                        )}
                        {item["details"].split(";")[2] === "MULTILINE_TEXT" && (
                          <Form.Row>
                            <Col md={8}>
                              <Form.Group>
                                <Form.Label className="">
                                  {currentContext.language === "ar"
                                    ? item["details"].split(";")[1]
                                    : item["details"].split(";")[0]}
                                </Form.Label>
                                <Form.Control
                                  as="textarea"
                                  value={
                                    values[
                                    item["details"]
                                      .split(";")[0]
                                      .replace(/ /g, "")
                                    ] || ""
                                  }
                                  onChange={(e) => {
                                    const fName = item["details"]
                                      .split(";")[0]
                                      .replace(/ /g, "");
                                    setFieldValue(fName, e.target.value, false);
                                  }}
                                  rows={4}
                                  maxLength={
                                    item["details"].split(";")[5] !== "NULL"
                                      ? Number(item["details"].split(";")[5])
                                      : 300
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Form.Row>
                        )}
                        {item["details"].split(";")[2] === "READ_ONLY" &&
                          item["details"].split(";")[3].toString() !==
                          "NULL" && (
                            <Form.Row>
                              <Col md={8}>
                                <Form.Group>
                                  <Form.Label className="">
                                    {currentContext.language === "ar"
                                      ? item["details"].split(";")[1]
                                      : item["details"].split(";")[0]}
                                  </Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    readOnly={true}
                                    defaultValue={extraDetailsValue}
                                    rows={6}
                                    maxLength={500}
                                  />
                                </Form.Group>
                              </Col>
                            </Form.Row>
                          )}
                        {item["details"].split(";")[2] === "TEXT" && (
                          <Form.Row>
                            <Col md={8}>
                              <Form.Group>
                                <Form.Label className="">
                                  {currentContext.language === "ar"
                                    ? item["details"].split(";")[1]
                                    : item["details"].split(";")[0]}
                                </Form.Label>
                                <Form.Control
                                  value={
                                    values[
                                    item["details"]
                                      .split(";")[0]
                                      .replace(/ /g, "")
                                    ] || ""
                                  }
                                  onChange={(e) => {
                                    const fName = item["details"]
                                      .split(";")[0]
                                      .replace(/ /g, "");
                                    setFieldValue(fName, e.target.value, false);
                                  }}
                                  max={
                                    item["details"].split(";")[5] !== "NULL"
                                      ? Number(item["details"].split(";")[5])
                                      : undefined
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Form.Row>
                        )}
                        {item["details"].split(";")[2] === "EMAIL" && (
                          <Form.Row>
                            <Col md={8}>
                              <Form.Group>
                                <Form.Label className="">
                                  {currentContext.language === "ar"
                                    ? item["details"].split(";")[1]
                                    : item["details"].split(";")[0]}
                                </Form.Label>
                                <Form.Control
                                  value={
                                    values[
                                    item["details"]
                                      .split(";")[0]
                                      .replace(/ /g, "")
                                    ] || ""
                                  }
                                  onChange={(e) => {
                                    const fName = item["details"]
                                      .split(";")[0]
                                      .replace(/ /g, "");
                                    setFieldValue(fName, e.target.value, false);
                                  }}
                                  max={
                                    item["details"].split(";")[5] !== "NULL"
                                      ? Number(item["details"].split(";")[5])
                                      : undefined
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Form.Row>
                        )}
                        {item["details"].split(";")[2] === "NUMBER" && (
                          <Form.Row>
                            <Col md={8}>
                              <Form.Group>
                                <Form.Label className="">
                                  {currentContext.language === "ar"
                                    ? item["details"].split(";")[1]
                                    : item["details"].split(";")[0]}
                                </Form.Label>
                                <Form.Control
                                  value={
                                    values[
                                    item["details"]
                                      .split(";")[0]
                                      .replace(/ /g, "")
                                    ] || ""
                                  }
                                  onChange={(e) => {
                                    const fName = item["details"]
                                      .split(";")[0]
                                      .replace(/ /g, "");
                                    setFieldValue(fName, e.target.value, false);
                                  }}
                                  max={
                                    item["details"].split(";")[5] !== "NULL"
                                      ? Number(item["details"].split(";")[5])
                                      : undefined
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Form.Row>
                        )}
                        {item["details"].split(";")[2] === "DATE" && (
                          <Form.Row>
                            <Col md={8}>
                              <Form.Group className="customDate">
                                <Form.Label className="mb-1 text-600">
                                  {currentContext.language === "ar"
                                    ? item["details"].split(";")[1]
                                    : item["details"].split(";")[0]}
                                </Form.Label>
                                <DatePicker
                                  dateFormat="MMMM dd, yyyy"
                                  className="form-control"
                                  selected={
                                    values[
                                      item["details"]
                                        .split(";")[0]
                                        .replace(/ /g, "")
                                    ]
                                      ? new Date(
                                        values[
                                        item["details"]
                                          .split(";")[0]
                                          .replace(/ /g, "")
                                        ]
                                      )
                                      : null
                                  }
                                  onChange={(date: Date) => {
                                    const fName = item["details"]
                                      .split(";")[0]
                                      .replace(/ /g, "");
                                    if (fName === "ConfirmationDate") {
                                      setShowConfirmationDate(false);
                                    }
                                    if (fName === "FromDate") {
                                      setShowFromDate(false);
                                    }
                                    if (fName === "ToDate") {
                                      setShowToDate(false);
                                    }
                                    setFieldValue(
                                      fName,
                                      moment(date).utc(true)
                                    );
                                  }}
                                />
                              </Form.Group>
                            </Col>
                          </Form.Row>
                        )}
                        {item["details"].split(";")[2] === "DDL_API" && (
                          <Form.Row>
                            <Col md={8}>
                              <Form.Group>
                                <Form.Label className="">
                                  {currentContext.language === "ar"
                                    ? item["details"].split(";")[1]
                                    : item["details"].split(";")[0]}
                                </Form.Label>
                                <Form.Control
                                  as="select"
                                  onChange={async (e) => {
                                    getExtraDetailsValue(
                                      "MOB_REQ_EX_DET_FLD_DEP_BRK,SP_MOB_CUST_DEP_LIST",
                                      e.currentTarget.value
                                    );
                                    setFieldValue(
                                      item["details"]
                                        .split(";")[0]
                                        .replace(/ /g, ""),
                                      e.currentTarget.value
                                    );
                                  }}
                                >
                                  {getDropDownListValue(
                                    item["details"].split(";")[2],
                                    item["details"].split(";")[3]
                                  )}
                                </Form.Control>
                              </Form.Group>
                            </Col>
                          </Form.Row>
                        )}
                        {item["details"].split(";")[2] === "DDL" && (
                          <Form.Row>
                            <Col md={8}>
                              <Form.Group>
                                <Form.Label className="">
                                  {currentContext.language === "ar"
                                    ? item["details"].split(";")[1]
                                    : item["details"].split(";")[0]}
                                </Form.Label>
                                <Form.Control
                                  as="select"
                                  onChange={async (e) => {
                                    setFieldValue(
                                      item["details"]
                                        .split(";")[0]
                                        .replace(/ /g, ""),
                                        e.target.value
                                    );
                                  }}
                                >
                                  {getDropDownListValue(
                                    item["details"].split(";")[2],
                                    item["details"].split(";")[3]
                                  )}
                                </Form.Control>
                              </Form.Group>
                            </Col>
                          </Form.Row>
                        )}
                        {touched[
                          item["details"].split(";")[0].replace(/ /g, "")
                        ] &&
                          errors[
                          item["details"].split(";")[0].replace(/ /g, "")
                          ] &&
                          InvalidFieldError(errors[
                            item["details"].split(";")[0].replace(/ /g, "")
                          ])}
                      </div>
                    </Form>
                  ))}
                  {showErrorMessage && InvalidFieldError(errorMessage)}

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
                      {local_Strings.RequestListingFilterSubmitButton}
                    </button>
                  </div>
                </div>
              </React.Fragment>
            )}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default NewRequest;
