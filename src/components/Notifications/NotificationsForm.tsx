import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import {
  GetAllCustomerList,
  SendNotificationsToCIFs,
  SendNotificationsToAll,
} from "../../services/cmsService";
import moment from "moment";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from "../../shared/invalid-field-error";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MultiSelect from "react-multi-select-component";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/ar.js";
//import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import {
  emptyCustomer,
  ICustomer,
  emptyNotificationsDetail,
  INotificationsDetail,
} from "../../Helpers/publicInterfaces";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { CustomerListContext } from "../../pages/Admin/Admin";
import Swal from "sweetalert2";
import xIcon from "../../images/x-icon.svg";

interface DetailsProps {
  item?: INotificationsDetail;
  show: boolean;
  editable: boolean;
  OnHide: () => void;
  OnBack: () => void;
  refreshList: () => void;
}

function NotificationsForm(props: DetailsProps) {
  const showMoreNotificationsForm = () => {
    console.log("retrieve more from server");
  };
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const customerList = useContext(CustomerListContext);
  const [data, setData] = useState<INotificationsDetail>(
    emptyNotificationsDetail
  );
  const [isLoading, setLoading] = useState(false);
  const [showCustomerError, setCustomerError] = useState<boolean>(false);
  const formValidationSchema = yup.object({
    selectedCIFs: yup
      .string()
      .nullable()
      .min(1)
      .required("Select at least one customer"),
    messageTitle: yup.string().nullable().required("Subject is required"),
    messageTitleAr: yup
      .string()
      .nullable()
      .required("Arabic Subject is required"),
    expiryDate: yup.string().nullable().required("Expire date is required"),
  });

  const submitTheRecord = async (values: INotificationsDetail) => {
    setLoading(true);
    const item = {
      cif:
        values.selectedCIFs.length === customerList.length
          ? ""
          : values.selectedCIFs.flatMap((x) => x["value"]).toString(),
      title: values.messageTitle,
      titleAr: values.messageTitleAr,
      expiryData: moment(values.expiryDate).utc(true),
      message: values.messageBody,
      messageAr: values.messageBodyAr,
    };

    const x =
      values.selectedCIFs.length === customerList.length
        ? await SendNotificationsToAll(item)
        : await SendNotificationsToCIFs(item);
    if (x) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: local_Strings.NotificationsSavedMessage,
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
    if (props.item && props.item.id > 0) {
      if (customerList.length > 0 && !!customerList[0].id) {
        const _selectCustomers = customerList.filter(
          (i) => i.id === props.item.customerId
        );
        if (_selectCustomers.length > 0) {
          setData({
            ...props.item,
            selectedCIFs: [
              {
                value: _selectCustomers[0].id,
                label: _selectCustomers[0].shortName,
              },
            ],
          });
        } else {
          setData(props.item);
        }
      }
    } else {
      setData(emptyNotificationsDetail);
    }
  }, [props.item]);

  const options = customerList
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
              <h4 id="newReqTxt">{local_Strings.NotificationsListingTitle}</h4>
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
          onSubmit={(values) => submitTheRecord(values)}
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
                    {values.selectedCIFs && values.selectedCIFs.length > 0
                      ? local_Strings.NotificationsCustomerNameLabel
                      : ""}
                  </label>
                  {props.editable ? (
                    <React.Fragment>
                      <MultiSelect
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
                    {local_Strings.NotificationsNameLabel}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly={!props.editable}
                    value={values.messageTitle || ""}
                    onChange={handleChange("messageTitle")}
                    onBlur={handleBlur("messageTitle")}
                  />
                  {touched.messageTitle &&
                    errors.messageTitle &&
                    InvalidFieldError(errors.messageTitle)}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">
                    {local_Strings.NotificationsArNameLabel}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly={!props.editable}
                    value={values.messageTitleAr || ""}
                    onChange={handleChange("messageTitleAr")}
                    onBlur={handleBlur("messageTitleAr")}
                  />
                  {touched.messageTitleAr &&
                    errors.messageTitleAr &&
                    InvalidFieldError(errors.messageTitleAr)}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">
                    {local_Strings.NotificationsExpireLabel}
                  </label>

                  <DatePicker
                    name="expiryDate"
                    selected={
                      !!values.expiryDate ? new Date(values.expiryDate) : null
                    }
                    onChange={(date: Date) => setFieldValue("expiryDate", date)}
                    onBlur={handleBlur("expiryDate")}
                    placeholderText={""}
                    readOnly={!props.editable}
                    minDate={new Date()}
                    dateFormat="MMMM dd, yyyy"
                  />
                  {touched.expiryDate &&
                    errors.expiryDate &&
                    InvalidFieldError(errors.expiryDate)}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">
                    {local_Strings.NotificationsDescrLabel}
                  </label>
                  {props.editable ? (
                    <CKEditor
                      editor={ClassicEditor}
                      readOnly={!props.editable}
                      data={values.messageBody || ""}
                      onChange={(event: any, editor: any) => {
                        const _text = editor.getData();
                        setFieldValue("messageBody", _text);
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
                          __html: values.messageBody,
                        }}
                      />
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">
                    {local_Strings.NotificationsArDescrLabel}
                  </label>
                  {props.editable ? (
                    <CKEditor
                      editor={ClassicEditor}
                      readOnly={!props.editable}
                      data={values.messageBodyAr || ""}
                      onChange={(event: any, editor: any) => {
                        const _text = editor.getData();
                        setFieldValue("messageBodyAr", _text);
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
                          __html: values.messageBodyAr,
                        }}
                      />
                    </span>
                  )}
                </div>
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
                          handleBlur("selectedCIFs");
                          touched.messageTitle = true;
                          touched.messageTitleAr = true;
                          touched.expiryDate = true;
                          if (
                            values.selectedCIFs.length === 0 ||
                            values.selectedCIFs[0].value === "0"
                          ) {
                            setCustomerError(true);
                          } else {
                            setCustomerError(false);
                          }
                        }
                      }}
                    >
                      {local_Strings.NotificationsSaveButton}
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

export default NotificationsForm;
