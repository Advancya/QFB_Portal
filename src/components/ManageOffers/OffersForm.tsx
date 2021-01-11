import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import {
  AddNewOffer,
  GetOfferById,
  UpdateOfferDetail,
} from "../../services/cmsService";
import moment from "moment";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from "../../shared/invalid-field-error";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/ar.js";
//import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { emptyOfferData, IOfferDetail } from "../../Helpers/publicInterfaces";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import pdfIcon from "../../images/pdf.png";
import * as helper from "../../Helpers/helper";
import { saveAs } from "file-saver";
import MultiSelect from "react-multi-select-component";
import axios from "axios";
import { CustomerListContext } from "../../pages/Admin/Admin";
import xIcon from "../../images/x-icon.svg";

import Swal from "sweetalert2";
const mime = require("mime");

interface DetailsProps {
  itemID?: number;
  show: boolean;
  editable: boolean;
  OnHide: () => void;
  OnBack: () => void;
  refreshList: () => void;
}

function OffersForm(props: DetailsProps) {
  const fileInputRef = createRef<any>();
  const currentContext = useContext(AuthContext);
  const customerList = useContext(CustomerListContext);
  local_Strings.setLanguage(currentContext.language);
  const [data, setData] = useState<IOfferDetail>(emptyOfferData);
  const [fileSize, setFileSize] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showCustomerError, setCustomerError] = useState<boolean>(false);

  const formValidationSchema = yup.object({
    selectedCIFs: yup
      .string()
      .nullable()
      .min(1)
      .required("Select at least one customer"),
    title: yup.string().nullable().required("Title is required"),
    titleAr: yup.string().nullable().required("Arabic title is required"),
    //fileName: yup.string().nullable().required("Please upload a PDF file. " + local_Strings.moreThanLimit),
    expireDate: yup.string().nullable().required("Expire date is required"),
  });

  const submitTheRecord = async (values: any) => {
    setLoading(true);

    const requests = [];
    values.selectedCIFs.forEach((element) => {
      const item = {
        cif: element.value,
        title: values.title,
        titleAr: values.titleAr,
        createdDate: moment().utc(true),
        expireDate: moment(values.expireDate).utc(true),
        description: "",
        descriptionAr: "",
        selectedOfferDetails: values.selectedOfferDetails,
        selectedOfferDetailsAr: values.selectedOfferDetailsAr,
        fileName: values.fileName,
        fileContent: values.fileContent,
        offersSubscriptions: [],
      };

      requests.push(AddNewOffer(item));
    });
    axios
      .all(requests)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: local_Strings.OfferSavedMessage,
          showConfirmButton: false,
          timer: Constant.AlertTimeout,
        });
        props.refreshList();
        props.OnHide();
      })
      .catch((e: any) =>
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: local_Strings.GenericErrorMessage,
          showConfirmButton: false,
          timer: Constant.AlertTimeout,
        })
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const updateRecord = async (values: any) => {
    setLoading(true);
    const x = await UpdateOfferDetail(values);
    if (x) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: local_Strings.OfferSavedMessage,
        showConfirmButton: false,
        timer: Constant.AlertTimeout,
      });
      props.refreshList();
      props.OnHide();
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
  };

  useEffect(() => {
    let isMounted = true;
    const initialLoadMethod = async () => {
      setLoading(true);
      GetOfferById(props.itemID)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0 && isMounted) {
            const _item = responseData[0] as IOfferDetail;
            setData(_item);
            const _calSize = (
              3 *
              (_item.fileContent.length / 4 / 1024 / 1024)
            ).toFixed(4);
            setFileSize(
              Math.round((Number(_calSize) + Number.EPSILON) * 100) / 100
            );

            if (customerList.length > 0 && !!customerList[0].id) {
              const _selectCustomers = customerList.filter(
                (i) => i.id === _item.cif
              );
              if (_selectCustomers.length > 0) {
                setData({
                  ..._item,
                  selectedCIFs: [
                    {
                      value: _selectCustomers[0].id,
                      label: _selectCustomers[0].shortName,
                    },
                  ],
                });
              }
            }
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    };

    if (props.show && props.itemID && props.itemID > 0) {
      initialLoadMethod();
    } else {
      setData(emptyOfferData);
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [props.itemID, props.show]);

  const options =
    customerList && customerList.length > 0
      ? customerList.map((c) => ({
          value: c.id ? c.id : "",
          label: c.shortName ? c.shortName : "",
        }))
      : [];

  return (
    <Modal
      show={props.show}
      onHide={props.OnHide}
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
              <a href="#" onClick={props.OnBack} className="backToAccountsList">
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.OffersDetailsTitle}</h4>
            </div>
          </div>
        </div>

        <button type="button" className="close" onClick={props.OnHide}>
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
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
          initialValues={data}
          validationSchema={formValidationSchema}
          onSubmit={(values) =>
            values.id > 0 ? updateRecord(values) : submitTheRecord(values)
          }
          enableReinitialize={true}
          validateOnChange={props.editable}
          validateOnBlur={props.editable}
        >
          {({
            values,
            handleBlur,
            handleChange,
            setFieldValue,
            handleSubmit,
            errors,
            touched,
            isValid,
            validateForm,
          }) => (
            <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
              <div className="box-body">
                <div className="form-group">
                  <label className="mb-1 text-600">
                    {local_Strings.NotificationsCustomerNameLabel}
                  </label>
                  {props.editable && values.id === 0 ? (
                    <React.Fragment>
                      <MultiSelect
                        hasSelectAll={false}
                        options={options}
                        value={
                          values.selectedCIFs &&
                          values.selectedCIFs.length > 0 &&
                          values.selectedCIFs[0].value !== "0"
                            ? values.selectedCIFs
                            : null
                        }
                        onChange={(_item) => {
                          setFieldValue("selectedCIFs", _item);
                          handleBlur("selectedCIFs");
                          if (_item.length !== 0) {
                            setCustomerError(false);
                          }
                        }}
                        labelledBy={"Select"}
                        disabled={values.id > 0}
                        disableSearch={values.id > 0}
                      />
                      {showCustomerError &&
                        InvalidFieldError("Select at least one customer")}
                    </React.Fragment>
                  ) : (
                    <span className="box-brief mb-3">
                      {values.selectedCIFs && values.selectedCIFs.length > 0
                        ? values.selectedCIFs[0].label
                        : ""}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">
                    {local_Strings.OfferNameLabel}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly={!props.editable}
                    value={values.title || ""}
                    onChange={handleChange("title")}
                    onBlur={handleBlur("title")}
                  />
                  {touched.title &&
                    errors.title &&
                    InvalidFieldError(errors.title)}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">
                    {local_Strings.OfferArNameLabel}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly={!props.editable}
                    value={values.titleAr || ""}
                    onChange={handleChange("titleAr")}
                    onBlur={handleBlur("titleAr")}
                  />
                  {touched.titleAr &&
                    errors.titleAr &&
                    InvalidFieldError(errors.titleAr)}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">
                    {local_Strings.OfferExpireLabel}
                  </label>

                  <DatePicker
                    name="expireDate"
                    selected={
                      !!values.expireDate ? new Date(values.expireDate) : null
                    }
                    onChange={(date: Date) => setFieldValue("expireDate", date)}
                    onBlur={handleBlur("expireDate")}
                    placeholderText={""}
                    readOnly={!props.editable}
                    minDate={new Date()}
                    dateFormat="MMMM dd, yyyy"
                  />
                  {touched.expireDate &&
                    errors.expireDate &&
                    InvalidFieldError(errors.expireDate)}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">
                    {local_Strings.selectedOfferDetailsLabel}
                  </label>
                  {props.editable ? (
                    <CKEditor
                      editor={ClassicEditor}
                      data={values.selectedOfferDetails || ""}
                      onChange={(event: any, editor: any) => {
                        const _text = editor.getData();
                        setFieldValue("selectedOfferDetails", _text);
                      }}
                      config={{
                        //plugins: [Base64UploadAdapter],
                        toolbar: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "|",
                          "link",
                          "bulletedList",
                          "numberedList",
                          "blockQuote",
                          "|",
                          "undo",
                          "redo",
                        ],
                        allowedContent: true,
                        extraAllowedContent: "div(*)",
                        language: "en",
                        content: "en",
                      }}
                    />
                  ) : (
                    <span className="box-brief mb-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: values.selectedOfferDetails,
                        }}
                      />
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">
                    {local_Strings.selectedOfferDetailsArLabel}
                  </label>
                  {props.editable ? (
                    <CKEditor
                      editor={ClassicEditor}
                      data={values.selectedOfferDetailsAr || ""}
                      onChange={(event: any, editor: any) => {
                        const _text = editor.getData();
                        setFieldValue("selectedOfferDetailsAr", _text);
                      }}
                      config={{
                        //plugins: [Base64UploadAdapter],
                        toolbar: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "|",
                          "link",
                          "bulletedList",
                          "numberedList",
                          "blockQuote",
                          "|",
                          "undo",
                          "redo",
                        ],
                        allowedContent: true,
                        extraAllowedContent: "div(*)",
                        language: "ar",
                        content: "ar",
                      }}
                    />
                  ) : (
                    <span className="box-brief mb-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: values.selectedOfferDetailsAr,
                        }}
                      />
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">
                    {local_Strings.OfferAttachment}
                  </label>
                  {props.editable ? (
                    <React.Fragment>
                      <label className="file">
                        <input
                          type="file"
                          multiple={false}
                          id="file"
                          aria-label="File browser example"
                          lang={currentContext.language}
                          className=""
                          accept="application/pdf,.pdf"
                          ref={fileInputRef}
                          onBlur={handleBlur("fileName")}
                          onChange={() => {
                            const file = fileInputRef.current.files[0];
                            const supportedExtensions = ["pdf"];
                            if (file) {
                              if (file.size <= 0) {
                                Swal.fire({
                                  position: "top-end",
                                  icon: "error",
                                  title: file.name + local_Strings.isEmptyText,
                                  showConfirmButton: false,
                                  timer: Constant.AlertTimeout,
                                });
                                fileInputRef.current.value = "";
                              } else if (
                                !supportedExtensions.includes(
                                  file.name.toLowerCase().split(".").pop()
                                )
                              ) {
                                Swal.fire({
                                  position: "top-end",
                                  icon: "error",
                                  title: local_Strings.supportedFileTypeError.replace(
                                    "{*}",
                                    file.name
                                  ),
                                  showConfirmButton: false,
                                  timer: Constant.AlertTimeout,
                                });
                                fileInputRef.current.value = "";
                              } else if (
                                file.size / 1024 / 1024 > 10 ||
                                file.size / 1024 / 1024 > 10
                              ) {
                                Swal.fire({
                                  position: "top-end",
                                  icon: "error",
                                  title: local_Strings.moreThanLimit,
                                  showConfirmButton: false,
                                  timer: Constant.AlertTimeout,
                                });
                                fileInputRef.current.value = "";
                              } else {
                                const reader = new FileReader();
                                reader.onload = (e: any) => {
                                  const content = new TextDecoder().decode(
                                    Buffer.from(e.target.result)
                                  );
                                  const fileContent = content.split(",").pop();

                                  setFieldValue("fileName", file.name);
                                  setFieldValue("fileContent", fileContent);

                                  const _calSize = (
                                    3 *
                                    ((fileContent ? fileContent.length : 1) /
                                      4 /
                                      1024 /
                                      1024)
                                  ).toFixed(4);
                                  setFileSize(
                                    Math.round(
                                      (Number(_calSize) + Number.EPSILON) * 100
                                    ) / 100
                                  );
                                };
                                reader.readAsDataURL(file);
                                fileInputRef.current.value = "";
                              }
                            }
                          }}
                        />

                        <span className="file-custom">
                          {local_Strings.OfferFileBrowseLabel}
                        </span>
                      </label>
                    </React.Fragment>
                  ) : null}

                  {/* {touched.fileName && errors.fileName && InvalidFieldError(errors.fileName)} */}
                </div>
                {values.fileName && !!values.fileName ? (
                  <div className="row no-gutters align-items-center view-attachment">
                    <div className="col-2 col-lg-2 text-center">
                      <img
                        alt=""
                        src={pdfIcon}
                        style={{ maxWidth: "75%" }}
                        className="img-fluid"
                      />
                    </div>
                    <div
                      className="col-8 col-lg-9 cursor-pointer"
                      onClick={() => {
                        const blob = helper.b64toBlob(
                          values.fileContent,
                          mime.getType(values.fileName)
                        );
                        saveAs(blob, values.fileName);
                      }}
                    >
                      <h5>
                        {values.fileName}
                        <br />
                        <small>
                          {local_Strings.sizeLabel}: {fileSize} MB
                        </small>
                      </h5>
                    </div>
                    {props.editable && (
                      <div className="col-2 col-lg-1 text-center">
                        <button
                          className="btnFileDelete"
                          onClick={() => {
                            setFieldValue("fileName", "");
                            setFieldValue("fileContent", "");
                          }}
                        >
                          <i className="fa fa-trash-o"></i>
                        </button>
                      </div>
                    )}
                  </div>
                ) : null}
                {props.editable && (
                  <div className="form-group">
                    <button
                      className="btn btn-sm btn-primary mt-1"
                      type="submit"
                      style={{ float: "right", margin: 20 }}
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
                          if (
                            values.selectedCIFs.length === 0 ||
                            values.selectedCIFs[0].value === "0"
                          ) {
                            setCustomerError(true);
                          } else {
                            setCustomerError(false);
                          }
                          handleBlur("selectedCIFs");
                          touched.title = true;
                          touched.titleAr = true;
                          touched.expireDate = true;
                        }
                      }}
                    >
                      {local_Strings.OfferSaveButton}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default OffersForm;
