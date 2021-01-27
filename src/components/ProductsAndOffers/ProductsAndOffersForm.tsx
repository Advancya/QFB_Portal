import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import {
  AddProductsAndOffers,
  UpdateProductsAndOffers,
} from "../../services/cmsService";
import moment from "moment";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from "../../shared/invalid-field-error";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  emptyProductAndOffersData,
  IProductAndOffersDetail,
} from "../../Helpers/publicInterfaces";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import Swal from "sweetalert2";
import xIcon from "../../images/x-icon.svg";
import RichTextEditor from "../../shared/RichTextEditor";
import * as helper from "../../Helpers/helper";

interface DetailsProps {
  item?: IProductAndOffersDetail;
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
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [data, setData] = useState<IProductAndOffersDetail>(
    emptyProductAndOffersData
  );
  const [isLoading, setLoading] = useState(false);
  const formValidationSchema = yup.object({
    productId: yup.string().nullable().max(30).required("Product Number is required"),
    name: yup.string().nullable().max(150).required("Name is required"),
    nameAr: yup.string().nullable().max(150).required("Arabic Name is required"),
    expiryDate: yup.string().nullable().required("Expire date is required"),
  });

  const submitTheRecord = async (values: IProductAndOffersDetail) => {

    values.details = helper.appendAnchorToImageTag(values.details);
    values.detailsAr = helper.appendAnchorToImageTag(values.detailsAr);

    setLoading(true);
    const item =
      data.id > 0
        ? values
        : {
          productId: values.productId,
          name: values.name,
          nameAr: values.nameAr,
          createdDate: moment().utc(true),
          expiryDate: moment(values.expiryDate).utc(true),
          details: values.details,
          detailsAr: values.detailsAr,
        };

    const x =
      data.id > 0
        ? await UpdateProductsAndOffers(item)
        : await AddProductsAndOffers(item);
    if (x) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: local_Strings.ProductsAndOffersSavedMessage,
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
    setData(props.item || emptyProductAndOffersData);
  }, [props.item, props.show]);

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
              <a href="#" onClick={props.OnBack} className="backToAccountsList">
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">
                {local_Strings.ProductsAndOffersDetailsTitle}
              </h4>
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
                  <label>{local_Strings.productAndOffersListingLabel}</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly={!props.editable}
                    value={values.productId || ""}
                    onChange={handleChange("productId")}
                    onBlur={handleBlur("productId")}
                  />
                  {touched.productId &&
                    errors.productId &&
                    InvalidFieldError(errors.productId)}
                </div>
                <div className="form-group">
                  <label>{local_Strings.ProductsAndOffersNameLabel}</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly={!props.editable}
                    value={values.name || ""}
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                  />
                  {touched.name &&
                    errors.name &&
                    InvalidFieldError(errors.name)}
                </div>
                <div className="form-group">
                  <label>{local_Strings.ProductsAndOffersArNameLabel}</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly={!props.editable}
                    value={values.nameAr || ""}
                    onChange={handleChange("nameAr")}
                    onBlur={handleBlur("nameAr")}
                  />
                  {touched.nameAr &&
                    errors.nameAr &&
                    InvalidFieldError(errors.nameAr)}
                </div>
                <div className="form-group customDate">
                  <label>{local_Strings.ProductsAndOffersExpireLabel}</label>

                  <DatePicker
                    name="expiryDate"
                    locale={currentContext.language}
                    selected={
                      !!values.expiryDate ? new Date(values.expiryDate) : null
                    }
                    className="form-control"
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
                  <label>{local_Strings.ProductsAndOffersDescrLabel}</label>
                  {props.editable ? (
                    <RichTextEditor language="en" value={values.details}
                      onChange={handleChange("details")} />
                  ) : (
                      <span className="box-brief mb-3">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: values.details,
                          }}
                        />
                      </span>
                    )}
                </div>
                <div className="form-group">
                  <label>{local_Strings.ProductsAndOffersArDescrLabel}</label>
                  {props.editable ? (
                    <RichTextEditor language="ar" value={values.detailsAr}
                      onChange={handleChange("detailsAr")} />
                  ) : (
                      <span className="box-brief mb-3">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: values.detailsAr,
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
                          touched.name = true;
                          touched.nameAr = true;
                          touched.expiryDate = true;
                        }
                      }}
                    >
                      {local_Strings.ProductsAndOffersSaveButton}
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

export default ProductsAndOffersForm;
