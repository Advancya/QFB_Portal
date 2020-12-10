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
import DatePicker from 'react-datepicker';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ar.js';
//import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';

interface IProductAndOffersDetail {
  id: number;
  name: string;
  nameAr: string;
  createdDate: string;
  expiryDate: string;
  details: string;
  detailsAr: string;
}

interface DetailsProps {
  item?: IProductAndOffersDetail
  show: boolean;
  editable: boolean;
  OnHide: () => void;
  OnBack: () => void;
  refreshList: () => void;
}

const initialData = {
  id: 0,
  name: "",
  nameAr: "",
  createdDate: "",
  expiryDate: "",
  details: "",
  detailsAr: "",
};
function ProductsAndOffersDetails(props: DetailsProps) {
  const showMoreProductsAndOffersDetails = () => {
    console.log("retrieve more from server");
  };
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);
  const [data, setData] = useState<IProductAndOffersDetail>(initialData);

  const [loading, setLoading] = useState(false);
  const formValidationSchema = yup.object({
    name: yup.string().required("Name is required"),
    nameAr: yup.string().required("Arabic Name is required"),
    expiryDate: yup.string().required("Expire date is required"),
  });

  const submitTheRecord = async (values: IProductAndOffersDetail) => {

    setLoading(true);
    const item = data.id > 0 ? values : {
      name: values.name,
      nameAr: values.nameAr,
      createdDate: moment().toISOString(),
      expiryDate: values.expiryDate,
      details: values.details,
      detailsAr: values.detailsAr,
    };

    const x = data.id > 0 ? await UpdateProductsAndOffers(item) : await AddProductsAndOffers(item);
    if (x) {
      props.refreshList();
      props.OnHide();
    } else {
      console.log("Error while updating record");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (props.editable && props.item) {
      setData(props.item);
    }
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
                  <label>{local_Strings.ProductsAndOffersNameLabel}</label>
                  <input type="text" className="form-control"
                    readOnly={!props.editable}
                    value={values.name || ""}
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")} />
                  {touched.name && errors.name && InvalidFieldError(errors.name)}
                </div>
                <div className="form-group">
                  <label>{local_Strings.ProductsAndOffersArNameLabel}</label>
                  <input type="text" className="form-control"
                    readOnly={!props.editable}
                    value={values.nameAr || ""}
                    onChange={handleChange("nameAr")}
                    onBlur={handleBlur("nameAr")} />
                  {touched.nameAr && errors.nameAr && InvalidFieldError(errors.nameAr)}
                </div>
                <div className="form-group">
                  <label>{local_Strings.ProductsAndOffersExpireLabel}</label>

                  <DatePicker name="expiryDate"
                    selected={!!values.expiryDate ? new Date(values.expiryDate) : null}
                    onChange={(date: Date) => setFieldValue("expiryDate", date)}
                    placeholderText={""}
                    readOnly={!props.editable}
                    dateFormat="MMMM dd, yyyy" />
                  {/* {touched.expiryDate && errors.expiryDate && InvalidFieldError(errors.expiryDate)} */}
                </div>
                <div className="form-group">
                  <label>{local_Strings.ProductsAndOffersDescrLabel}</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={values.details || ""}
                    onChange={(event: any, editor: any) => {
                      const _text = editor.getData();
                      setFieldValue("details", _text);
                    }}
                    config={{
                      //plugins: [Base64UploadAdapter],
                      toolbar: ['heading', '|', 'bold', 'italic', '|', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 'undo', 'redo', '|', 'imageUpload'],
                      allowedContent: true,
                      extraAllowedContent: 'div(*)',
                      language: auth.language,
                      content: auth.language,
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>{local_Strings.ProductsAndOffersArDescrLabel}</label>                  
                  <CKEditor
                    editor={ClassicEditor}
                    data={values.detailsAr || ""}
                    onChange={(event: any, editor: any) => {
                      const _text = editor.getData();
                      setFieldValue("detailsAr", _text);
                    }}
                    config={{
                      //plugins: [Base64UploadAdapter],
                      toolbar: ['heading', '|', 'bold', 'italic', '|', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 'undo', 'redo', '|', 'imageUpload'],
                      allowedContent: true,
                      extraAllowedContent: 'div(*)',
                      language: auth.language,
                      content: auth.language,
                    }}
                  />
                </div>
                {props.editable &&
                  <div className="form-group">

                    <button className="btn btn-sm btn-primary mt-1" type="button" style={{ float: "right", margin: 20 }}
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

export default ProductsAndOffersDetails;
