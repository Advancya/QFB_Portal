import React, { createRef, useContext, useEffect, useRef, useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from '../../translations/localStrings';
import { AuthContext } from "../../providers/AuthProvider";
import { AddNewOffer, GetOfferById, UpdateOfferDetail } from "../../services/cmsService";
import moment from "moment";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from '../../shared/invalid-field-error';
import 'react-confirm-alert/src/react-confirm-alert.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ar.js';
//import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { emptyOfferData, IOfferDetail } from "../../Helpers/publicInterfaces";
import { useToasts } from 'react-toast-notifications';
import Constant from "../../constants/defaultData";
import LoadingOverlay from 'react-loading-overlay';
import PuffLoader from "react-spinners/PuffLoader";
import pdfIcon from "../../images/pdf.png";

const mime = require('mime');

interface DetailsProps {
  itemID?: number
  show: boolean;
  editable: boolean;
  OnHide: () => void;
  OnBack: () => void;
  refreshList: () => void;
}

function OffersForm(props: DetailsProps) {
  const { addToast } = useToasts();
  const fileInputRef = createRef<any>();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);
  const [data, setData] = useState<IOfferDetail>(emptyOfferData);
  const [fileSize, setFileSize] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);

  const formValidationSchema = yup.object({
    title: yup.string().nullable().required("Title is required"),
    titleAr: yup.string().nullable().required("Arabic title is required"),
    //fileName: yup.string().nullable().required("Please upload a PDF file. " + local_Strings.moreThanLimit),
    expireDate: yup.string().nullable().required("Expire date is required"),
  });

  const submitTheRecord = async (values: IOfferDetail) => {

    setLoading(true);
    const item = data.id > 0 ? values : {
      cif: auth.cif,
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
      offersSubscriptions: []
    };

    const x = data.id > 0 ? await UpdateOfferDetail(item) : await AddNewOffer(item);
    if (x) {
      addToast(local_Strings.OfferSavedMessage, {
        appearance: 'success',
        autoDismiss: true,
      });
      props.refreshList();
      props.OnHide();
    } else {
      console.log("Error while updating record");
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    if (props.itemID && props.itemID > 0) {

      setLoading(true);
      GetOfferById(props.itemID)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0 && isMounted) {
            const _item = responseData[0] as IOfferDetail;
            setData(_item);
            const _calSize = (3 * (_item.fileContent.length / 4 / 1024 / 1024)).toFixed(4);
            setFileSize(Math.round((Number(_calSize) + Number.EPSILON) * 100) / 100);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    } else {
      setData(emptyOfferData);
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [props.itemID]);

  const b64toBlob = (b64Data: any, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = Uint8Array[byteCharacters.length];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

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
              <h4 id="newReqTxt">{local_Strings.OffersDetailsTitle}</h4>
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
        <LoadingOverlay
          active={isLoading}
          spinner={<PuffLoader
            size={Constant.SpnnerSize}
            color={Constant.SpinnerColor}
          />}
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
            validateForm
          }) => (
            <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
              <div className="box-body">
                <div className="form-group">
                  <label className="mb-1 text-600">{local_Strings.OfferNameLabel}</label>
                  <input type="text" className="form-control"
                    readOnly={!props.editable}
                    value={values.title || ""}
                    onChange={handleChange("title")}
                    onBlur={handleBlur("title")} />
                  {touched.title && errors.title && InvalidFieldError(errors.title)}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">{local_Strings.OfferArNameLabel}</label>
                  <input type="text" className="form-control"
                    readOnly={!props.editable}
                    value={values.titleAr || ""}
                    onChange={handleChange("titleAr")}
                    onBlur={handleBlur("titleAr")} />
                  {touched.titleAr && errors.titleAr && InvalidFieldError(errors.titleAr)}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">{local_Strings.OfferExpireLabel}</label>

                  <DatePicker name="expireDate"
                    selected={!!values.expireDate ? new Date(values.expireDate) : null}
                    onChange={(date: Date) => setFieldValue("expireDate", date)}
                    onBlur={handleBlur("expireDate")}
                    placeholderText={""}
                    readOnly={!props.editable}
                    minDate={new Date()}
                    dateFormat="MMMM dd, yyyy" />
                  {touched.expireDate && errors.expireDate && InvalidFieldError(errors.expireDate)}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">{local_Strings.selectedOfferDetailsLabel}</label>
                  {props.editable ?
                    <CKEditor
                      editor={ClassicEditor}
                      data={values.selectedOfferDetails || ""}
                      onChange={(event: any, editor: any) => {
                        const _text = editor.getData();
                        setFieldValue("selectedOfferDetails", _text);
                      }}
                      config={{
                        //plugins: [Base64UploadAdapter],
                        toolbar: ['heading', '|', 'bold', 'italic', '|', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 'undo', 'redo'],
                        allowedContent: true,
                        extraAllowedContent: 'div(*)',
                        language: "en",
                        content: "en",
                      }}
                    /> : <label className="box-brief mb-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: values.selectedOfferDetails
                        }} />
                    </label>}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">{local_Strings.selectedOfferDetailsArLabel}</label>
                  {props.editable ?
                    <CKEditor
                      editor={ClassicEditor}
                      data={values.selectedOfferDetailsAr || ""}
                      onChange={(event: any, editor: any) => {
                        const _text = editor.getData();
                        setFieldValue("selectedOfferDetailsAr", _text);
                      }}
                      config={{
                        //plugins: [Base64UploadAdapter],
                        toolbar: ['heading', '|', 'bold', 'italic', '|', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 'undo', 'redo'],
                        allowedContent: true,
                        extraAllowedContent: 'div(*)',
                        language: "ar",
                        content: "ar",
                      }}
                    /> : <label className="box-brief mb-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: values.selectedOfferDetailsAr
                        }} />
                    </label>}
                </div>
                <div className="form-group">

                  <label className="mb-1 text-600">{local_Strings.OfferAttachment}</label>
                  {props.editable ?
                    <React.Fragment>
                      <input type="file" multiple={false}
                        id="customFileInput"
                        lang={auth.language}
                        className="custom-file-input"
                        accept='application/pdf,.pdf'
                        ref={fileInputRef}
                        onBlur={handleBlur("fileName")}
                        onChange={() => {

                          const file = fileInputRef.current.files[0];
                          const supportedExtensions = ['pdf'];
                          if (file) {
                            if (file.size <= 0) {
                              addToast(file.name + local_Strings.isEmptyText, {
                                appearance: 'error',
                                autoDismiss: true,
                              });
                              fileInputRef.current.value = "";
                            } else if (!supportedExtensions.includes(file.name.toLowerCase().split('.').pop())) {
                              addToast(local_Strings.supportedFileTypeError.replace("{*}", file.name), {
                                appearance: 'error',
                                autoDismiss: true,
                              });
                              fileInputRef.current.value = "";
                            } else if ((file.size / 1024 / 1024) > 10 ||
                              (file.size / 1024 / 1024) > 10
                            ) {
                              addToast(local_Strings.moreThanLimit, {
                                appearance: 'error',
                                autoDismiss: true,
                              });
                              fileInputRef.current.value = "";
                            } else {
                              const reader = new FileReader();
                              reader.onload = (e: any) => {
                                const content = new TextDecoder().decode(Buffer.from(e.target.result));
                                const fileContent = content.split(',').pop();
                                setFieldValue("fileName", file.name);
                                setFieldValue("fileContent", fileContent);
                                const _calSize = (3 * ((fileContent ? fileContent.length : 1) / 4 / 1024 / 1024)).toFixed(4);
                                setFileSize(Math.round((Number(_calSize) + Number.EPSILON) * 100) / 100);
                              }
                              reader.readAsDataURL(file);
                              fileInputRef.current.value = "";
                            }
                          }
                        }} />
                      <label className="custom-file-label" style={{ position: "relative" }}
                        htmlFor="customFileInput">
                        {local_Strings.OfferFileBrowseLabel}
                      </label>
                    </React.Fragment> : null}
                  {!!values.fileName &&
                    <div className="row no-gutters align-items-center view-attachment">
                      <div className="col-2 col-lg-2 text-center">
                        <img alt="" src={pdfIcon}
                          style={{ maxWidth: "75%" }} className="img-fluid" />
                      </div>
                      <div className="col-8 col-lg-9 cursor-pointer"
                        onClick={() => {

                          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(b64toBlob(data.fileContent, mime.getType(data.fileName)), data.fileName);
                          }
                          else {
                            const fileContent = `data:${mime.getType(data.fileName)};base64,${data.fileContent}`;
                            const downloadLink = document.createElement("a") as HTMLAnchorElement;
                            downloadLink.download = data.fileName;
                            downloadLink.href = fileContent;
                            downloadLink.click();
                          }
                        }}>
                        <h5>{values.fileName}<br />
                          <small>{local_Strings.sizeLabel}: {fileSize} MB</small></h5>
                      </div>
                      {props.editable &&
                        <div className="col-2 col-lg-1 text-center">
                          <button className="btnFileDelete" onClick={() => {
                            setFieldValue("fileName", "");
                            setFieldValue("fileContent", "");
                            setData({
                              ...data, fileName: "", fileContent: "",
                            });
                          }}
                          >
                            <i className="fa fa-trash-o"></i>
                          </button>
                        </div>
                      }
                    </div>}
                  {/* {touched.fileName && errors.fileName && InvalidFieldError(errors.fileName)} */}
                </div>
                {props.editable &&
                  <div className="form-group">

                    <button className="btn btn-sm btn-primary mt-1" type="submit" style={{ float: "right", margin: 20 }}
                      onClick={(e) => {
                        if (isValid) {
                          handleSubmit();
                        } else {
                          addToast(local_Strings.formValidationMessage, {
                            appearance: 'error',
                            autoDismiss: true,
                          });
                          validateForm();
                        }
                      }}>
                      {local_Strings.OfferSaveButton}</button>
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

export default OffersForm;
