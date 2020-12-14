import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from '../../translations/localStrings';
import { AuthContext } from "../../providers/AuthProvider";
import { GetAllCustomerList, SendNotificationsToCIFs, SendNotificationsToAll } from "../../services/cmsService";
import moment from "moment";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from '../../shared/invalid-field-error';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import MultiSelect from "react-multi-select-component";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ar.js';
//import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import { emptyNotificationsDetail, INotificationsDetail } from "../../Helpers/publicInterfaces";
import queryString from "query-string";

interface DetailsProps {
  item?: INotificationsDetail
  show: boolean;
  editable: boolean;
  OnHide: () => void;
  OnBack: () => void;
  refreshList: () => void;
}

interface ICustomer {
  id: string;
  shortName: string;
  accountOfficer: string;
  rnName: string;
  mobile: string;
  customerEmail: string;
  isRegister: boolean;
}

const emptyCustomer = {
  "id": "",
  "shortName": "",
  "accountOfficer": "",
  "rnName": "",
  "mobile": "",
  "customerEmail": "",
  "isRegister": false
}

function NotificationsForm(props: DetailsProps) {
  const showMoreNotificationsForm = () => {
    console.log("retrieve more from server");
  };
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);
  const [customerList, setCustomerList] = useState<ICustomer[]>([emptyCustomer]);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState<INotificationsDetail>(emptyNotificationsDetail);

  const [loading, setLoading] = useState(false);
  const formValidationSchema = yup.object({
    messageTitle: yup.string().required("Subject is required"),
    messageTitleAr: yup.string().required("Arabic Subject is required"),
    expiryDate: yup.string().required("Expire date is required"),
  });

  const submitTheRecord = async (values: INotificationsDetail) => {

    setLoading(true);
    const item = selected.length === customerList.length ? {
      title: values.messageTitle,
      titleAr: values.messageTitleAr,
      createdDate: moment().toISOString(),
      expireyData: moment(values.expiryDate).toISOString(),
      message: values.messageBody,
      messageAr: values.messageBodyAr,
    } : {
        cif: selected.flatMap(x => x["value"]).toString(),
        title: values.messageTitle,
        titleAr: values.messageTitleAr,
        createdDate: moment().toISOString(),
        expireyData: moment(values.expiryDate).toISOString(),
        message: values.messageBody,
        messageAr: values.messageBodyAr,
      };

    //console.log(decodeURIComponent(queryString.stringify(item)));
    //console.log(selected.length === customerList.length);
    const x = selected.length === customerList.length ? await SendNotificationsToAll(item) : await SendNotificationsToCIFs(item);
    if (x) {
      props.refreshList();
      props.OnHide();
    } else {
      console.log("Error while updating record");
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    GetAllCustomerList()
      .then((responseData: ICustomer[]) => {
        if (responseData && isMounted) {
          setCustomerList(responseData);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted

  }, []);

  useEffect(() => {
    setData(props.item || emptyNotificationsDetail);
  }, [props.item]);

  //console.log(data);

  const options = customerList ? customerList.map((c) => ({
    "value": (c.id ? c.id : ""),
    "label": (c.shortName ? c.shortName : "")
  })) : [];

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
              <a
                href="#"
                onClick={props.OnBack}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.NotificationsListingTitle}</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.OnHide}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={data}
          validationSchema={formValidationSchema}
          onSubmit={(values) => submitTheRecord(values)}
          enableReinitialize={true}
        >
          {({
            values,
            handleBlur,
            handleChange,
            setFieldValue,
            handleSubmit,
            errors,
            touched,
          }) => (
            <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
              <div className="box-body">
                <div className="form-group">
                  <label>{local_Strings.NotificationsCustomerNameLabel}</label>
                  <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy={"Select"}
                  />
                  {touched.messageTitle && errors.messageTitle && InvalidFieldError(errors.messageTitle)}
                </div>
                <div className="form-group">
                  <label>{local_Strings.NotificationsNameLabel}</label>
                  <input type="text" className="form-control"
                    readOnly={!props.editable}
                    value={values.messageTitle || ""}
                    onChange={handleChange("messageTitle")}
                    onBlur={handleBlur("messageTitle")} />
                  {touched.messageTitle && errors.messageTitle && InvalidFieldError(errors.messageTitle)}
                </div>
                <div className="form-group">
                  <label>{local_Strings.NotificationsArNameLabel}</label>
                  <input type="text" className="form-control"
                    readOnly={!props.editable}
                    value={values.messageTitleAr || ""}
                    onChange={handleChange("messageTitleAr")}
                    onBlur={handleBlur("messageTitleAr")} />
                  {touched.messageTitleAr && errors.messageTitleAr && InvalidFieldError(errors.messageTitleAr)}
                </div>
                <div className="form-group">
                  <label>{local_Strings.NotificationsExpireLabel}</label>

                  <DatePicker name="expiryDate"
                    selected={!!values.expiryDate ? new Date(values.expiryDate) : null}
                    onChange={(date: Date) => setFieldValue("expiryDate", date)}
                    placeholderText={""}
                    readOnly={!props.editable}
                    minDate={new Date()}
                    dateFormat="MMMM dd, yyyy" />
                  {/* {touched.expiryDate && errors.expiryDate && InvalidFieldError(errors.expiryDate)} */}
                </div>
                <div className="form-group">
                  <label>{local_Strings.NotificationsDescrLabel}</label>
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
                      toolbar: ['heading', '|', 'bold', 'italic', '|', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 'undo', 'redo', '|', 'imageUpload'],
                      allowedContent: true,
                      extraAllowedContent: 'div(*)',
                      language: "en",
                      content: "en",
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>{local_Strings.NotificationsArDescrLabel}</label>
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
                      toolbar: ['heading', '|', 'bold', 'italic', '|', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 'undo', 'redo', '|', 'imageUpload'],
                      allowedContent: true,
                      extraAllowedContent: 'div(*)',
                      language: "ar",
                      content: "ar",
                    }}
                  />
                </div>
                {props.editable &&
                  <div className="form-group">

                    <button className="btn btn-sm btn-primary mt-1" type="button" style={{ float: "right", margin: 20 }}
                      onClick={(e) => handleSubmit()}>
                      {local_Strings.NotificationsSaveButton}</button>
                  </div>
                }
              </div>
            </div>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default NotificationsForm;
