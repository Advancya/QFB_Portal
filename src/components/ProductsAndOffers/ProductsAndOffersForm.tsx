import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from '../../translations/localStrings';
import { AuthContext } from "../../providers/AuthProvider";
import { AddProductsAndOffers, UpdateProductsAndOffers } from "../../services/cmsService";
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
import { emptyProductAndOffersData, IProductAndOffersDetail } from "../../Helpers/publicInterfaces";
import { useToasts } from 'react-toast-notifications';
import Constant from "../../constants/defaultData";
import LoadingOverlay from 'react-loading-overlay';
import PuffLoader from "react-spinners/PuffLoader";

interface DetailsProps {
  item?: IProductAndOffersDetail
  show: boolean;
  editable: boolean;
  OnHide: () => void;
  OnBack: () => void;
  refreshList: () => void;
}

function ProductsAndOffersForm(props: DetailsProps) {
  const showMoreProductsAndOffersForm = () => {
    console.log("retrieve more from server");
  };
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);
  const [data, setData] = useState<IProductAndOffersDetail>(emptyProductAndOffersData);
  const { addToast } = useToasts();
  const [isLoading, setLoading] = useState(false);
  const formValidationSchema = yup.object({
    name: yup.string().nullable().required("Name is required"),
    nameAr: yup.string().nullable().required("Arabic Name is required"),
    expiryDate: yup.string().nullable().required("Expire date is required"),
  });

  const submitTheRecord = async (values: IProductAndOffersDetail) => {

    setLoading(true);
    const item = data.id > 0 ? values : {
      name: values.name,
      nameAr: values.nameAr,
      createdDate: moment().utc(true),
      expiryDate: moment(values.expiryDate).utc(true),
      details: values.details,
      detailsAr: values.detailsAr,
    };

    const x = data.id > 0 ? await UpdateProductsAndOffers(item) : await AddProductsAndOffers(item);
    if (x) {
      addToast(local_Strings.ProductsAndOffersSavedMessage, {
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
    setData(props.item || emptyProductAndOffersData);
  }, [props.item]);

  //console.log(data);

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
              <h4 id="newReqTxt">{local_Strings.ProductsAndOffersDetailsTitle}</h4>
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
          }) => (
            <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
              <div className="box-body">
                <div className="form-group">
                  <label className="mb-1 text-600">{local_Strings.ProductsAndOffersNameLabel}</label>
                  <input type="text" className="form-control"
                    readOnly={!props.editable}
                    value={values.name || ""}
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")} />
                  {touched.name && errors.name && InvalidFieldError(errors.name)}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">{local_Strings.ProductsAndOffersArNameLabel}</label>
                  <input type="text" className="form-control"
                    readOnly={!props.editable}
                    value={values.nameAr || ""}
                    onChange={handleChange("nameAr")}
                    onBlur={handleBlur("nameAr")} />
                  {touched.nameAr && errors.nameAr && InvalidFieldError(errors.nameAr)}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">{local_Strings.ProductsAndOffersExpireLabel}</label>

                  <DatePicker name="expiryDate"
                    selected={!!values.expiryDate ? new Date(values.expiryDate) : null}
                    onChange={(date: Date) => setFieldValue("expiryDate", date)}
                    onBlur={handleBlur("expiryDate")}
                    placeholderText={""}
                    readOnly={!props.editable}
                    minDate={new Date()}
                    dateFormat="MMMM dd, yyyy" />
                  {touched.expiryDate && errors.expiryDate && InvalidFieldError(errors.expiryDate)}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">{local_Strings.ProductsAndOffersDescrLabel}</label>
                  {props.editable ? <CKEditor
                    editor={ClassicEditor}
                    readOnly={!props.editable}
                    data={values.details || ""}
                    onChange={(event: any, editor: any) => {
                      const _text = editor.getData();
                      setFieldValue("details", _text);
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
                          __html: values.details
                        }} />
                    </label>}
                </div>
                <div className="form-group">
                  <label className="mb-1 text-600">{local_Strings.ProductsAndOffersArDescrLabel}</label>
                  {props.editable ? <CKEditor
                    editor={ClassicEditor}
                    readOnly={!props.editable}
                    data={values.detailsAr || ""}
                    onChange={(event: any, editor: any) => {
                      const _text = editor.getData();
                      setFieldValue("detailsAr", _text);
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
                          __html: values.detailsAr
                        }} />
                    </label>}
                </div>
                {props.editable &&
                  <div className="form-group">

                    <button className="btn btn-sm btn-primary mt-1" type="submit" style={{ float: "right", margin: 20 }}
                      onClick={(e) => handleSubmit()}>
                      {local_Strings.ProductsAndOffersSaveButton}</button>
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

export default ProductsAndOffersForm;
