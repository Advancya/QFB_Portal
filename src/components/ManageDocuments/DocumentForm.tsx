import React, { createRef, useContext, useEffect, useRef, useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from '../../translations/localStrings';
import { AuthContext } from "../../providers/AuthProvider";
import { AddNewDocument, GetDocumentById, UpdateDocumentDetail } from "../../services/cmsService";
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
import { emptyDocumentData, IDocumentDetail } from "../../Helpers/publicInterfaces";
import { useToasts } from 'react-toast-notifications';
import Constant from "../../constants/defaultData";
import LoadingOverlay from 'react-loading-overlay';
import PuffLoader from "react-spinners/PuffLoader";
import fileIcon from "../../images/generic-file-icon.png";
import * as helper from "../../Helpers/helper";

const mime = require('mime');

interface DetailsProps {
  itemID?: number
  show: boolean;
  editable: boolean;
  OnHide: () => void;
  OnBack: () => void;
  refreshList: () => void;
}

function DocumentForm(props: DetailsProps) {
  const { addToast } = useToasts();
  const fileInputRef = createRef<any>();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);
  const [data, setData] = useState<IDocumentDetail>(emptyDocumentData);
  const [fileSize, setFileSize] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);

  const formValidationSchema = yup.object({
    documentName: yup.string().nullable().required("Document Name is required"),
    documentNameAr: yup.string().nullable().required("Document Arabic Name is required"),
    fileName: yup.string().nullable().required("Please upload a file. " + local_Strings.moreThanLimit),
    documentDate: yup.string().nullable().required("Document date is required"),
  });

  const submitTheRecord = async (values: IDocumentDetail) => {

    setLoading(true);
    const item = values.id > 0 ? values : {
      documentName: values.documentName,
      documentNameAr: values.documentNameAr,
      documentDate: moment(values.documentDate).utc(true),
      documentDescription: "",
      documentDescriptionAr: "",
      fileName: values.fileName,
      fileContent: values.fileContent,
    };

    const x = values.id > 0 ? await UpdateDocumentDetail(item) : await AddNewDocument(item);
    if (x) {
      addToast(local_Strings.documentSavedMessage, {
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
      GetDocumentById(props.itemID)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0 && isMounted) {
            const _item = responseData[0] as IDocumentDetail;
            setData(_item);
            const _calSize = (3 * (_item.fileContent.length / 4 / 1024 / 1024)).toFixed(4);
            setFileSize(Math.round((Number(_calSize) + Number.EPSILON) * 100) / 100);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    } else {
      setData(emptyDocumentData);
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [props.itemID]);

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
              <h4 id="newReqTxt">{local_Strings.DocumentsDetailsTitle}</h4>
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
                  <label className="mb-1 text-600">{local_Strings.documentName}</label>
                  <input type="text" className="form-control"
                    readOnly={!props.editable}
                    value={values.documentName || ""}
                    onChange={handleChange("documentName")}
                    onBlur={handleBlur("documentName")} />
                  {touched.documentName && errors.documentName && InvalidFieldError(errors.documentName)}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">{local_Strings.documentNameAr}</label>
                  <input type="text" className="form-control"
                    readOnly={!props.editable}
                    value={values.documentNameAr || ""}
                    onChange={handleChange("documentNameAr")}
                    onBlur={handleBlur("documentNameAr")} />
                  {touched.documentNameAr && errors.documentNameAr && InvalidFieldError(errors.documentNameAr)}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">{local_Strings.documentDate}</label>

                  <DatePicker name="documentDate"
                    selected={!!values.documentDate ? new Date(values.documentDate) : null}
                    onChange={(date: Date) => setFieldValue("documentDate", date)}
                    onBlur={handleBlur("documentDate")}
                    placeholderText={""}
                    readOnly={!props.editable}
                    //minDate={new Date()}
                    dateFormat="MMMM dd, yyyy" />
                  {touched.documentDate && errors.documentDate && InvalidFieldError(errors.documentDate)}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">{local_Strings.documentShortDescription}</label>
                  {props.editable ?
                    <CKEditor
                      editor={ClassicEditor}
                      data={values.documentDescription || ""}
                      onChange={(event: any, editor: any) => {
                        const _text = editor.getData();
                        setFieldValue("documentDescription", _text);
                      }}
                      config={{
                        //plugins: [Base64UploadAdapter],
                        toolbar: ['heading', '|', 'bold', 'italic', '|', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 'undo', 'redo'],
                        allowedContent: true,
                        extraAllowedContent: 'div(*)',
                        language: "en",
                        content: "en",
                      }}
                    /> : <span className="box-brief mb-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: values.documentDescription
                        }} />
                    </span>}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">{local_Strings.documentShortDescriptionAr}</label>
                  {props.editable ?
                    <CKEditor
                      editor={ClassicEditor}
                      data={values.documentDescriptionAr || ""}
                      onChange={(event: any, editor: any) => {
                        const _text = editor.getData();
                        setFieldValue("documentDescriptionAr", _text);
                      }}
                      config={{
                        //plugins: [Base64UploadAdapter],
                        toolbar: ['heading', '|', 'bold', 'italic', '|', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 'undo', 'redo'],
                        allowedContent: true,
                        extraAllowedContent: 'div(*)',
                        language: "ar",
                        content: "ar",
                      }}
                    /> : <span className="box-brief mb-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: values.documentDescriptionAr
                        }} />
                    </span>}
                </div>
                <div className="form-group">

                  <label className="mb-1 text-600">{local_Strings.OfferAttachment}</label>
                  {props.editable ?
                    <React.Fragment>
                      <label className="file">
                        <input type="file" multiple={false}
                          id="file" aria-label="File browser example"
                          lang={auth.language}
                          className=""
                          accept='.jpeg,.jpg,.png,.gif,.bmp,.svg,.txt,application/pdf,video/mp4,application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                          ref={fileInputRef}
                          onBlur={handleBlur("fileName")}
                          onChange={() => {

                            const file = fileInputRef.current.files[0];
                            const supportedExtensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'svg', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'mp4', 'pdf'];
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

                        <span className="file-custom">
                          {local_Strings.OfferFileBrowseLabel}
                        </span>
                      </label>
                    </React.Fragment> : null}

                  {touched.fileName && errors.fileName && InvalidFieldError(errors.fileName)}
                </div>
                {values.fileName && !!values.fileName ?
                  <div className="row no-gutters align-items-center view-attachment">
                    <div className="col-2 col-lg-2 text-center">
                      <img alt="" src={fileIcon}
                        style={{ maxWidth: "75%" }} className="img-fluid" />
                    </div>
                    <div className="col-8 col-lg-9 cursor-pointer"
                      onClick={() => {

                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                          window.navigator.msSaveOrOpenBlob(helper.b64toBlob(values.fileContent, mime.getType(values.fileName)), values.fileName);
                        }
                        else {
                          const fileContent = `data:${mime.getType(values.fileName)};base64,${values.fileContent}`;
                          const downloadLink = document.createElement("a") as HTMLAnchorElement;
                          downloadLink.download = values.fileName;
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
                  </div> : null}
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
                          handleBlur("documentName");
                          handleBlur("documentNameAr");
                          handleBlur("documentDate");
                          handleBlur("fileName");
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

export default DocumentForm;
