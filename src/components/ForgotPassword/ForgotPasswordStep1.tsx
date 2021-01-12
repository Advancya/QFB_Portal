import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { localStrings as local_Strings } from "../../translations/localStrings";
import xIcon from "../../images/x-icon.svg";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { AuthContext } from "../../providers/AuthProvider";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from "../../shared/invalid-field-error";
import Swal from "sweetalert2";
import { ValidateRegisterData, SendOTP } from "../../services/cmsService";

interface IresetFormValues {
  username: string;
  mobile: string;
  email: string;
}

interface iForgotPasswordStep1 {
  showForgotPasswordStep1Modal: boolean;
  hideForgotPasswordStep1Modal: () => void;
  showForgotPasswordStep2Modal: (cif: string) => void;
}

function ForgotPasswordStep1(props: iForgotPasswordStep1) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);

  const initialValues: IresetFormValues = {
    username: "3255",
    mobile: "+97450344671",
    email: "demo@advancya.com",
  };

  const resetPasswordValidationSchema = yup.object({
    username: yup.string().required(local_Strings.GeneralValidation),
    mobile: yup
      .string()
      .required(local_Strings.GeneralValidation)
      .min(11)
      .matches(/^[+]*[/0-9]{0,16}$/),
    email: yup.string().email().required(local_Strings.GeneralValidation),
  });

  const getRegisterData = async (cif: string) => {
    const res = await ValidateRegisterData(cif);
    return res;
  };

  return (
    <div>
      <Modal
        show={props.showForgotPasswordStep1Modal}
        onHide={props.hideForgotPasswordStep1Modal}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-text">
              <h4>{local_Strings.PasswordResetTitle}</h4>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={props.hideForgotPasswordStep1Modal}
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
              initialValues={initialValues}
              validationSchema={resetPasswordValidationSchema}
              onSubmit={async (values) => {
                setLoading(true);
                const data = await getRegisterData(values.username);
                console.log(data[0]);
                if (data.toString() !== "") {
                  if (
                    values.email.toLowerCase() ===
                      data[0]["Email"].toLowerCase() &&
                    values.mobile.toLowerCase() === data[0]["SMS"].toLowerCase()
                  ) {
                    //Send OTP here
                    const optResult = await SendOTP(values.username);
                    props.showForgotPasswordStep2Modal(values.username);
                  } else {
                    Swal.fire({
                      position: "top-end",
                      icon: "error",
                      title: local_Strings.PasswordResetInvalidData,
                      showConfirmButton: false,
                      timer: Constant.AlertTimeout,
                    });
                  }
                } else {
                  Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: local_Strings.PasswordResetInvalidData,
                    showConfirmButton: false,
                    timer: Constant.AlertTimeout,
                  });
                }
                setLoading(false);
              }}
            >
              {({
                values,
                handleBlur,
                handleChange,
                handleSubmit,
                errors,
                touched,
                isValid,
                validateForm,
              }) => (
                <div className="container-fluid">
                  <div className="row mb-3">
                    <div className="col-md-12 col-sm-12">
                      <h5>{local_Strings.PasswordResetHint}</h5>
                    </div>
                  </div>

                  <div className="mb-3  row ">
                    <div className="col-lg-12 form-group">
                      <label>{local_Strings.PasswordResetUserNameLabel}</label>
                      <input
                        type="text"
                        className="form-control"
                        value={values.username || ""}
                        onChange={handleChange("username")}
                        onBlur={handleBlur("username")}
                      />
                      {touched.username &&
                        errors.username &&
                        InvalidFieldError(errors.username)}
                    </div>
                    <div className="col-lg-12 form-group">
                      <label>{local_Strings.PasswordResetMobileLabel}</label>
                      <input
                        type="text"
                        className="form-control"
                        value={values.mobile}
                        onChange={handleChange("mobile")}
                        onBlur={handleBlur("mobile")}
                      />
                      {touched.mobile &&
                        errors.mobile &&
                        InvalidFieldError(local_Strings.GeneralValidation)}
                    </div>

                    <div className="col-lg-12 form-group">
                      <label>{local_Strings.PasswordResetEmailLabel}</label>
                      <input
                        type="text"
                        className="form-control"
                        value={values.email}
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                      />
                      {touched.email &&
                        errors.email &&
                        InvalidFieldError(errors.email)}
                    </div>
                  </div>

                  <div className="text-right">
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
                          touched.username = true;
                          touched.mobile = true;
                          touched.email = true;
                        }
                      }}
                    >
                      {local_Strings.PasswordResetButton}
                    </button>
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

export default ForgotPasswordStep1;
