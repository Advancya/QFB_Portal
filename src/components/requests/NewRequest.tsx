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
import { SendOTP } from "../../services/cmsService";
import {
  initialNewRequest,
} from "../../Helpers/publicInterfaces";
import {
  GetExtraDetailCurrentDetail,
  GetExtraDetailsDepositDetails,
  GetRequestFields,
  GetRequstsTypes,
  GetRequestDropDownListFromAPI
} from "../../services/requestService";
import DatePicker from "react-datepicker";
import FileUploader from "../../shared/FileUploader";
import ViewAttachment from "../../shared/AttachmentViewer";

interface iNewRequest {
  showNewRequestModal: boolean;
  hideNewRequestModal: () => void;
  backNewRequestModal: () => void;
  showOTPValidationFormModal: (submittedValues: any) => void;
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
  const [requestTypes, setRequestTypes] = useState<iDDL[]>([
    { label: "", value: "" },
  ]);

  const [extraDetailsValue, setExtraDetailsValue] = useState("");

  const [formFields, setFormFields] = useState<any[]>([]);
  const [attachmentName, setAttachmentName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const GetDropDownListValue = ({ type, value }) => {

    const [fieldValue, setFieldValue] = useState<any>(null);

    useEffect(() => {
      let isMounted = true;

      const initialLoadMethod = async () => {
        let data: iDDL[] = [];
        if (type === "DDL") {
          const items =
            currentContext.language === "en"
              ? value.split("#@")[0].split(",")
              : value.lastIndexOf("#@") !== -1
                ? value.split("#@")[1].split(",")
                : value.split("#@")[0].split(",");
          for (let index = 0; index < items.length; index++) {
            data.push({
              label: items[index].replace(/"/g, ""),
              value: items[index].replace(/"/g, ""),
            });
          }

        } else {
          await GetRequestDropDownListFromAPI(currentContext.selectedCIF, value)
            .then((s) => {
              if (s.length > 0) {
                for (let index = 0; index < s.length; index++) {
                  const element = s[index];
                  data.push({
                    label:
                      currentContext.language === "en" ? element["name"] : element["nameAr"],
                    value: element["id"],
                  });
                }
              }
            })
            .catch((err) => { });
        }

        setFieldValue(data);
      }

      initialLoadMethod();

      return () => {
        isMounted = false;
      }; // use effect cleanup to set flag false, if unmounted
    }, [currentContext.selectedCIF, currentContext.language]);


    return fieldValue && fieldValue.length > 0 ?
      (
        <>
          <option value="0">{local_Strings.SelectItem}</option>
          {fieldValue.map((c, i) =>
            <option key={i} value={c.value}>
              {c.label}
            </option>)}
        </>) :
      <option value="0">{local_Strings.SelectItem}</option>
      ;
  };

  const MemoizedDropDownListValue = React.memo(GetDropDownListValue);

  const getExtraDetailsValue = (value: string, param: string) => {
    try {
      if (value.split(",")[0] === "MOB_REQ_EX_DET_FLD_CON_CHANGE") {
        GetExtraDetailCurrentDetail(currentContext.selectedCIF).then((c) => {
          let data = "";

          c.forEach((element: any) => {
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
          c.forEach((element: any) => {
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

      GetRequstsTypes()
        .then((s) => {
          let data: iDDL[] = [{ label: "", value: "" }];
          for (let index = 0; index < s.length; index++) {
            const element = s[index];
            data.push({
              label: currentContext.language === "ar" ? element["nameAr"] : element["nameEn"],
              value: element["id"],
            });
          }
          setRequestTypes(data.slice(1));
        })
        .finally(() => setLoading(false));
    };

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF, currentContext.language]);
  useEffect(() => {
    setShowRequestFields(false);
  }, [props.showNewRequestModal]);

  const setBasicValidationSchema = (fieldName: string, type: string) => {
    if (fieldName === "FaxNumber") {
      const fieldSchema = yup.object().shape({
        FaxNumber:
          type !== "NUMBER"
            ? yup.string()
            : yup
              .string()
              .min(10, local_Strings.MobileNumberLengthError)
              .matches(/^\+(?:[0-9]?){6,14}[0-​9]$/, local_Strings.ContactUs_Mobile_Format_Validation_Message),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "LandlineNumber") {
      const fieldSchema = yup.object().shape({
        LandlineNumber:
          type !== "NUMBER"
            ? yup.string()
            : yup
              .string()
              .min(10, local_Strings.MobileNumberLengthError)
              .matches(/^\+(?:[0-9]?){6,14}[0-​9]$/, local_Strings.ContactUs_Mobile_Format_Validation_Message),
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
              .min(10, local_Strings.MobileNumberLengthError)
              .matches(/^\+(?:[0-9]?){6,14}[0-​9]$/, local_Strings.ContactUs_Mobile_Format_Validation_Message),
      });
      validationSchema = validationSchema.concat(fieldSchema);
    }
    if (fieldName === "Email") {
      const fieldSchema = yup.object().shape({
        Email: yup.string().email(local_Strings.InvalidEmail),
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
              .min(10, local_Strings.MobileNumberLengthError)
              .matches(/^\+(?:[0-9]?){6,14}[0-​9]$/, local_Strings.ContactUs_Mobile_Format_Validation_Message),
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
              .min(10, local_Strings.MobileNumberLengthError)
              .matches(/^\+(?:[0-9]?){6,14}[0-​9]$/, local_Strings.ContactUs_Mobile_Format_Validation_Message),
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
              .min(10, local_Strings.MobileNumberLengthError)
              .matches(/^\+(?:[0-9]?){6,14}[0-​9]$/, local_Strings.ContactUs_Mobile_Format_Validation_Message),
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
            ? yup
              .string()
              .email(local_Strings.InvalidEmail)
              .required(local_Strings.GeneralValidation)
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

    formFields.forEach((item) => {
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

      const otpSent = await SendOTP(currentContext.selectedCIF);
      if (otpSent === true) {
        formikObj.resetForm();
        setShowRequestFields(false);
        props.showOTPValidationFormModal({
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
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({
              values,
              handleBlur,
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

                          data.forEach((d: any) => {
                            if (d["details"].split(";")[2] === "READ_ONLY") {
                              getExtraDetailsValue(
                                d["details"].split(";")[3],
                                ""
                              );
                            }

                            const fName = d["details"]
                              .split(";")[0]
                              .replace(/ /g, "");
                            if (d["details"].split(";")[4] === "YES") {
                              const fType = d["details"].split(";")[2];
                              setValidationSchema(fName, fType);
                            } else {
                              const fType = d["details"].split(";")[2];
                              setBasicValidationSchema(fName, fType);
                            }
                          });

                          setFormFields(data);
                          setFormValidationSchema(validationSchema);
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
                    <Form key={index}>
                      <div className="py-2 px-3">
                        {item["details"].split(";")[2] === "FILE_UPLOAD" && (
                          <Form.Row>
                            <Col md={8}>
                              <Form.Group>
                                <Form.Label className="">
                                  {local_Strings.RequestAttachmentsLabel}
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
                                      attachment,
                                      fileContent,
                                      false
                                    );
                                    handleBlur(attachment);
                                  }}
                                />
                                <ViewAttachment
                                  showDelete={true}
                                  fileName={values.FileName}
                                  fileContent={values[item["details"]
                                    .split(";")[0]
                                    .replace(/ /g, "")]}
                                  deleteThisFile={() => {
                                    try {
                                      const attachment = item["details"]
                                        .split(";")[0]
                                        .replace(/ /g, "");
                                      setFieldValue("FileName", "", false);
                                      setFieldValue(attachment, "", false);
                                    }
                                    catch (e) {
                                      console.log(e);
                                    }
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
                                    handleBlur(fName);
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
                                    if (fName === "ContactPersonName(underPOA)") {
                                      setFieldValue(fName, e.target.value.replace(/[^A-Za-z\sء-ي]/ig, ''), false);
                                    } else {
                                      setFieldValue(fName, e.target.value, false);
                                    }
                                    handleBlur(fName);
                                  }}
                                  maxLength={
                                    item["details"].split(";")[5] !== "NULL"
                                      ? Number(item["details"].split(";")[5])
                                      : 200
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
                                  className="mobile-style"
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
                                    handleBlur(fName);
                                  }}
                                  maxLength={
                                    item["details"].split(";")[5] !== "NULL"
                                      ? Number(item["details"].split(";")[5])
                                      : 50
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
                                <input
                                  type="text"
                                  className="mobile-style form-control"
                                  value={
                                    values[
                                    item["details"]
                                      .split(";")[0]
                                      .replace(/ /g, "")
                                    ] || ""
                                  }
                                  maxLength={
                                    item["details"].split(";")[5] !== "NULL"
                                      ? Number(item["details"].split(";")[5])
                                      : 50
                                  }
                                  onChange={(e) => {
                                    const fName = item["details"]
                                      .split(";")[0]
                                      .replace(/ /g, "");
                                    setFieldValue(fName, e.target.value);
                                    handleBlur(fName);
                                  }}
                                />
                              </Form.Group>
                            </Col>
                          </Form.Row>
                        )}
                        {item["details"].split(";")[2] === "DATE" && (
                          <Form.Row>
                            <Col md={8}>
                              <Form.Group className="customDate">
                                <Form.Label className="">
                                  {currentContext.language === "ar"
                                    ? item["details"].split(";")[1]
                                    : item["details"].split(";")[0]}
                                </Form.Label>
                                <DatePicker
                                  dateFormat="MMMM dd, yyyy"
                                  className="form-control"
                                  locale={currentContext.language}
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
                                    setFieldValue(
                                      fName,
                                      moment(date).utc(true)
                                    );
                                    handleBlur(fName);
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
                                    const fName = item["details"]
                                      .split(";")[0]
                                      .replace(/ /g, "");
                                    setFieldValue(fName,
                                      e.currentTarget.value
                                    );
                                    handleBlur(fName);
                                  }}
                                  value={
                                    values[
                                    item["details"]
                                      .split(";")[0]
                                      .replace(/ /g, "")
                                    ] || ""
                                  }
                                >
                                  <MemoizedDropDownListValue
                                    type={item["details"].split(";")[2]}
                                    value={item["details"].split(";")[3]}
                                  />
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
                                    const fName = item["details"]
                                      .split(";")[0]
                                      .replace(/ /g, "");
                                    setFieldValue(fName,
                                      e.target.value
                                    );
                                    handleBlur(fName);
                                  }}
                                  value={
                                    values[
                                    item["details"]
                                      .split(";")[0]
                                      .replace(/ /g, "")
                                    ] || ""
                                  }
                                >
                                  <MemoizedDropDownListValue
                                    type={item["details"].split(";")[2]}
                                    value={item["details"].split(";")[3]}
                                  />
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
                          InvalidFieldError(
                            errors[
                            item["details"].split(";")[0].replace(/ /g, "")
                            ]
                          )}
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
                        } else if (JSON.stringify(values, ((key, value) => !value ? "" : value)) === JSON.stringify(initialNewRequest, ((key, value) => !value ? "" : value))) {
                          Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: local_Strings.NewRequestSubmitRequiredMessage,
                            showConfirmButton: false,
                            timer: Constant.AlertTimeout,
                          });
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
    </Modal >
  );
}

export default NewRequest;
