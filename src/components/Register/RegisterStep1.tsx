import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { localStrings as local_Strings } from "../../translations/localStrings";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { AuthContext } from "../../providers/AuthProvider";
import * as helper from "../../Helpers/helper";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from "../../shared/invalid-field-error";
import Swal from "sweetalert2";
import {
  ValidateOneTimeRegisterCode,
  ValidateOneTimeRegisterCodeWithCif,
  ValidateRegisterData,
} from "../../services/cmsService";
import {
  initialRegisterationData,
  IRegisterationData,
} from "../../Helpers/publicInterfaces";
import { isRegisterBefore } from "../../services/authenticationService";
import xIcon from "../../images/x-icon.svg";

interface iRegisterStep1 {
  showRegisterStep1Modal: boolean;
  hideRegisterStep1Modal: () => void;
  showRegisterStep2Modal: (step1_data: IRegisterationData) => void;
}

function RegisterStep1(props: iRegisterStep1) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const [registerData, setRegisterData] = React.useState("");
  const [field2Editable, setField2Editable] = React.useState(false);
  const [field3Editable, setField3Editable] = React.useState(false);
  const [field4Editable, setField4Editable] = React.useState(false);
  const [showSubmitButton, setShowSubmitButton] = React.useState(false);

  const getRegisterData = async (cif: string) => {
    const res = await ValidateRegisterData(cif);
    setRegisterData(res);
    return res;
  };

  const registerFormStep1ValidationSchema = yup.object({
    oneTimePassword: yup.string().required(local_Strings.GeneralValidation),
    cif: yup.string().required(local_Strings.GeneralValidation),
    mobile: yup
      .string()
      .required(local_Strings.GeneralValidation)
      .matches(/^[+]*[/0-9]{0,16}$/),
    email: yup.string().required(local_Strings.GeneralValidation).email(),
  });

  return (
    <div>
      <Modal
        show={props.showRegisterStep1Modal}
        onHide={props.hideRegisterStep1Modal}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-text">
              <h4>{local_Strings.registerTitle}</h4>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={props.hideRegisterStep1Modal}
          >
            <img src={xIcon} width="15" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box p-4 scrollabel-modal-box">
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
              initialValues={initialRegisterationData}
              validationSchema={registerFormStep1ValidationSchema}
              onSubmit={(values) => {
                props.showRegisterStep2Modal(values);
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
              }) => (
                <div className="container-fluid">
                  <div className="row mb-3">
                    <div className="col-md-8 col-sm-12">
                      <h5>{local_Strings.registerStep1Hint}</h5>
                    </div>
                    <div className="col-md-4 col-sm-12 text-right">
                      <span className="hintStep">
                        {local_Strings.registerStep1StepCount}
                      </span>
                    </div>
                  </div>

                  <div className="mb-5  row ">
                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.registerStep1Label1}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={values.oneTimePassword}
                        onChange={handleChange("oneTimePassword")}
                        onBlur={async () => {
                          setLoading(true);
                          const data = await ValidateOneTimeRegisterCode(
                            values.oneTimePassword
                          );
                          if (!data) {
                            setField2Editable(true);
                          } else {
                            setField2Editable(false);
                            Swal.fire({
                              position: "top-end",
                              icon: "error",
                              title: local_Strings.GeneralValidation,
                              showConfirmButton: false,
                              timer: Constant.AlertTimeout,
                            });
                          }
                          setLoading(false);
                          handleBlur("oneTimePassword");
                        }}
                      />
                      {touched.oneTimePassword &&
                        errors.oneTimePassword &&
                        InvalidFieldError(errors.oneTimePassword)}
                    </div>
                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.registerStep1Label2}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={values.cif}
                        onChange={handleChange("cif")}
                        onBlur={async () => {
                          setLoading(true);
                          const data = await ValidateOneTimeRegisterCodeWithCif(
                            values.oneTimePassword,
                            values.cif
                          );
                          if (data) {
                            const isRegisterBeforeResponse = await isRegisterBefore(
                              values.cif
                            );
                            if (isRegisterBeforeResponse === false) {
                              setField3Editable(true);
                            } else {
                              setField3Editable(false);
                              setShowSubmitButton(false);
                              Swal.fire({
                                position: "top-end",
                                icon: "error",
                                title:
                                  local_Strings.SignUpStep1CIFRegisterBefore,
                                showConfirmButton: false,
                                timer: Constant.AlertTimeout,
                              });
                            }
                          } else {
                            setField3Editable(false);
                            setShowSubmitButton(false);
                            Swal.fire({
                              position: "top-end",
                              icon: "error",
                              title: local_Strings.GeneralValidation,
                              showConfirmButton: false,
                              timer: Constant.AlertTimeout,
                            });
                          }
                          setLoading(false);
                          handleBlur("cif");
                        }}
                      />
                      {touched.cif &&
                        errors.cif &&
                        InvalidFieldError(errors.cif)}
                    </div>

                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.registerStep1Label3}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={values.email}
                        onChange={handleChange("email")}
                        onBlur={async () => {
                          setLoading(true);
                          const data = await getRegisterData(values.cif);
                          if (data.toString() !== "") {
                            if (
                              values.email.toLowerCase() ===
                              data[0]["Email"].toLowerCase()
                            ) {
                              setField4Editable(true);
                            } else {
                              setField4Editable(false);
                              setShowSubmitButton(false);
                              Swal.fire({
                                position: "top-end",
                                icon: "error",
                                title: local_Strings.GeneralValidation,
                                showConfirmButton: false,
                                timer: Constant.AlertTimeout,
                              });
                            }
                          } else {
                            setField4Editable(false);
                            setShowSubmitButton(false);
                            Swal.fire({
                              position: "top-end",
                              icon: "error",
                              title: local_Strings.GeneralValidation,
                              showConfirmButton: false,
                              timer: Constant.AlertTimeout,
                            });
                          }
                          setLoading(false);
                          handleBlur("email");
                        }}
                      />
                      {touched.email &&
                        errors.email &&
                        InvalidFieldError(errors.email)}
                    </div>
                    <div className="col-lg-6 form-group">
                      <label>{local_Strings.registerStep1Label4}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={values.mobile}
                        onChange={handleChange("mobile")}
                        onBlur={async () => {
                          setLoading(true);
                          const data = await getRegisterData(values.cif);
                          if (data.toString() !== "") {
                            if (
                              values.mobile.toLowerCase() ===
                              data[0]["SMS"].toLowerCase()
                            ) {
                              setShowSubmitButton(true);
                            } else {
                              setShowSubmitButton(false);
                              Swal.fire({
                                position: "top-end",
                                icon: "error",
                                title: local_Strings.GeneralValidation,
                                showConfirmButton: false,
                                timer: Constant.AlertTimeout,
                              });
                            }
                          } else {
                            setShowSubmitButton(false);
                            Swal.fire({
                              position: "top-end",
                              icon: "error",
                              title: local_Strings.GeneralValidation,
                              showConfirmButton: false,
                              timer: Constant.AlertTimeout,
                            });
                          }
                          setLoading(false);
                          handleBlur("mobile");
                        }}
                      />
                      {touched.mobile &&
                        errors.mobile &&
                        InvalidFieldError(local_Strings.GeneralValidation)}
                    </div>
                  </div>
                  {showSubmitButton && (
                    <div className="text-right p-3">
                      <button
                        id="applyReqBtn"
                        className="btn btn-primary"
                        type="submit"
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
                            touched.oneTimePassword = true;
                            touched.cif = true;
                            touched.mobile = true;
                            touched.email = true;
                          }
                        }}
                      >
                        {local_Strings.registerStep1Button}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RegisterStep1;
