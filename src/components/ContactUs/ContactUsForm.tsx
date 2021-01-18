import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import callIcon from "../../images/call-icon.png";
import { GoogleMap, LoadScript, Marker, InfoBox } from "@react-google-maps/api";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import { GetCountries } from "../../services/cmsService";
import { AddContactUs, iContactUs } from "../../services/authenticationService";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from "../../shared/invalid-field-error";
import Swal from "sweetalert2";
import xIcon from "../../images/x-icon.svg";
import deleteIcon from "../../images/delete-icon.svg";

interface ICountry {
  id: number;
  nameEn: string;
  nameAr: string;
}

const initialValues: iContactUs = {
  id: 0,
  email: "",
  country: "",
  mobile: "",
  name: "",
  query: "",
};

interface iContactUsForm {
  showContactUsFormModal: boolean;
  hideContactUsFormModal: () => void;
}

function ContactUsForm(props: iContactUsForm) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(true);
  const [countries, setCountries] = React.useState<ICountry[]>([]);

  const mapStyles = {
    height: "200px",
    width: "100%",
  };

  const defaultCenter = {
    lat: 25.2893127,
    lng: 51.5058653,
  };

  const locations = [
    {
      name: "Qatar First Bank Head Office",
      location: {
        lat: 25.2893127,
        lng: 51.5058653,
      },
    },
  ];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    GetCountries()
      .then((responseData: ICountry[]) => {
        if (responseData && responseData.length > 0 && isMounted) {
          setCountries(responseData);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setTimeout(() => setLoading(false), 2000));

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, []);

  const conactUsVlidationSchema = yup.object({
    email: yup
      .string()
      .required(local_Strings.GeneralValidation)
      .email(local_Strings.InvalidEmail),
    country: yup.string().required(local_Strings.GeneralValidation),
    mobile: yup
      .string()
      .required(local_Strings.GeneralValidation)
      .matches(/^[+]*[/0-9]{0,16}$/, local_Strings.ContactUs_Mobile_Format_Validation_Message),
    name: yup.string().required(local_Strings.GeneralValidation).min(1),
    query: yup.string().required(local_Strings.GeneralValidation),
  });

  return (
    <div>
      <Modal
        show={props.showContactUsFormModal}
        onHide={props.hideContactUsFormModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-icon">
              <img alt="" src={callIcon} className="img-fluid" />
            </div>
            <div className="ib-text">
              <h4>{local_Strings.ContactUsTite}</h4>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={props.hideContactUsFormModal}
          >
            <img alt="" src={xIcon} width="15" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box p-0 scrollabel-modal-box">
            <LoadScript
              googleMapsApiKey={Constant.MapApiKey}
              loadingElement={
                <LoadingOverlay
                  active={true}
                  spinner={
                    <PuffLoader
                      size={Constant.SpnnerSize}
                      color={Constant.SpinnerColor}
                    />
                  }
                />
              }
            >
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
                options={{ streetViewControl: false }}
              >
                {locations.map((item) => (
                  <Marker
                    key={item.name}
                    title={item.name}
                    position={item.location}
                  >
                    <InfoBox
                      onLoad={(_v) => { }}
                      options={{
                        closeBoxURL: "",
                        enableEventPropagation: true,
                      }}
                      position={defaultCenter}
                    >
                      <div className="mapInfoBox">
                        <div style={{ fontSize: 16 }}>{item.name}</div>
                      </div>
                    </InfoBox>
                  </Marker>
                ))}
              </GoogleMap>
            </LoadScript>
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
              initialValues={initialValues}
              validationSchema={conactUsVlidationSchema}
              onSubmit={async (values) => {
                setLoading(true);
                const success = await AddContactUs(values);
                setLoading(false);
                if (success) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: local_Strings.SuccessMessageTitle,
                    html: local_Strings.RequestSuccessMessage,
                    showConfirmButton: false,
                    timer: Constant.AlertTimeout,
                  });
                  props.hideContactUsFormModal();
                } else {
                  Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: local_Strings.GenericErrorMessage,
                    showConfirmButton: false,
                    timer: Constant.AlertTimeout,
                  });
                }
              }}
              enableReinitialize={true}
            >
              {({
                values,
                handleBlur,
                handleChange,
                handleSubmit,
                errors,
                touched,
                setFieldValue,
                isValid,
                validateForm,
                handleReset,
              }) => (
                <div className="container-fluid">
                  <div className="row my-4">
                    <div className="col-lg-9">
                      <Form>
                        <div className="row">
                          <Col md={6}>
                            <Form.Group controlId="formName">
                              <Form.Label>
                                {local_Strings.ContactUsNameLabel}
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder=""
                                onChange={(e) => setFieldValue("name",
                                  e.target.value.replace(/[^a-zA-Z_\sء-ي]+/g, ''))}
                                onBlur={handleBlur("name")}
                                value={values.name || ""}
                                maxLength={100}
                              />
                              {touched.name &&
                                errors.name &&
                                InvalidFieldError(errors.name)}
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="formCountry">
                              <Form.Label>
                                {local_Strings.ContactUsCountryLabel}
                              </Form.Label>
                              <Form.Control
                                as="select"
                                placeholder=""
                                value={values.country || ""}
                                onChange={handleChange("country")}
                                onBlur={handleBlur("country")}
                              >
                                <option value="">
                                  {local_Strings.SelectItem}
                                </option>
                                {countries &&
                                  countries.length > 0 &&
                                  !!countries[0].nameEn &&
                                  countries.map((c, i) => (
                                    <option key={i} value={c.nameEn}>
                                      {currentContext.language === "en"
                                        ? c.nameEn
                                        : c.nameAr}
                                    </option>
                                  ))}
                              </Form.Control>
                              {touched.country &&
                                errors.country &&
                                InvalidFieldError(errors.country)}
                            </Form.Group>
                          </Col>
                        </div>
                        <div className="row">
                          <Col md={6}>
                            <Form.Group controlId="formMobile">
                              <Form.Label>
                                {local_Strings.ContactUsMobileLabel}
                              </Form.Label>
                              <Form.Control
                                type="number"
                                placeholder=""
                                onChange={handleChange("mobile")}
                                onBlur={handleBlur("mobile")}
                                value={values.mobile || ""}
                                maxLength={16}
                              />
                              {touched.mobile &&
                                errors.mobile &&
                                InvalidFieldError(errors.mobile)}
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="formEmail">
                              <Form.Label>
                                {local_Strings.ContactUsEmailAddressLabel}
                              </Form.Label>
                              <Form.Control
                                type="email"
                                placeholder=""
                                onChange={handleChange("email")}
                                onBlur={handleBlur("email")}
                                value={values.email || ""}
                                maxLength={50}
                              />
                              {touched.email &&
                                errors.email &&
                                InvalidFieldError(errors.email)}
                            </Form.Group>
                          </Col>
                        </div>
                        <div className="row">
                          <Col md={12}>
                            <Form.Group controlId="forQuery">
                              <Form.Label>
                                {local_Strings.ContactUsQueryLabel}
                              </Form.Label>
                              <Form.Control
                                as="textarea"
                                placeholder=""
                                onChange={handleChange("query")}
                                onBlur={handleBlur("query")}
                                rows={5}
                                maxLength={350}
                                value={values.query || ""}
                              />
                              {touched.query &&
                                errors.query &&
                                InvalidFieldError(errors.query)}
                            </Form.Group>
                          </Col>
                        </div>
                      </Form>
                    </div>
                    <div className="col-lg-3 text-right pl-5">
                      <button
                        id="resetFilter"
                        type="reset"
                        className="resetBtn text-right pl-5"
                        onClick={handleReset}
                      >
                        {local_Strings.ContactUsClearButton}{" "}
                        <img className="mx-1" src={deleteIcon} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right pb-3">
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn btn-primary"
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
                          touched.country = true;
                          touched.mobile = true;
                          touched.email = true;
                          touched.query = true;
                        }
                      }}
                    >
                      {local_Strings.ContactUsSubmitButton}
                    </Button>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ContactUsForm;
