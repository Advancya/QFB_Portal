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
import { resetPassword } from "../../services/authenticationService";

interface iForgotPasswordStep3 {
  showForgotPasswordStep3Modal: boolean;
  hideForgotPasswordStep3Modal: () => void;
  backForgotPasswordStep2Modal: () => void;
  showForgotPasswordStep4Modal: () => void;
  customerId: string;
}

function ForgotPasswordStep3(props: iForgotPasswordStep3) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);

  const initialValues = {
    password: "",
    confirmPassword: "",
    cif: props.customerId,
  };

  const validationSchema = yup.object({
    password: yup
      .string()
      .required(local_Strings.ChangePassword_RequiredMsg)
      .min(7, local_Strings.ChangePassword_InvalidationMsg)
      .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&_()+=-])(?=.{7,})/, local_Strings.ChangePassword_InvalidationMsg),
    confirmPassword: yup
      .string()
      .required(local_Strings.ChangePassword_ConfirmRequiredMsg)
      .oneOf(
        [yup.ref("password"), ""],
        local_Strings.ChangePassword_MustMatchMsg
      ),
  });

  return (
    <Modal
      show={props.showForgotPasswordStep3Modal}
      onHide={props.hideForgotPasswordStep3Modal}
      // size="lg"
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
                onClick={props.backForgotPasswordStep2Modal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.PasswordResetRequestTitle}</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideForgotPasswordStep3Modal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box p-4  scrollabel-modal-box">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              setLoading(true);

              const res = await resetPassword(
                props.customerId,
                values.password
              );
              if (res) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: local_Strings.PasswordResetTitle,
                  html: local_Strings.PasswordResetSuccessMessage,
                  showConfirmButton: false,
                  timer: Constant.AlertTimeout,
                });
                props.hideForgotPasswordStep3Modal();
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
                    <h5>{local_Strings.PasswordResetRequestHint}</h5>
                  </div>
                </div>

                <div className="mb-3 row">
                  <div className="col-lg-12 form-group">
                    <label>
                      {local_Strings.PasswordResetRequestEnterPassword}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={values.password || ""}
                      onBlur={handleBlur("password")}
                      onChange={handleChange("password")}
                    />
                    {touched.password &&
                      errors.password &&
                      InvalidFieldError(errors.password)}
                  </div>
                  <div className="col-lg-12 form-group">
                    <label>
                      {local_Strings.PasswordResetRequestResendConfirmPassword}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={values.confirmPassword || ""}
                      onBlur={handleBlur("confirmPassword")}
                      onChange={handleChange("confirmPassword")}
                    />
                    {touched.confirmPassword &&
                      errors.confirmPassword &&
                      InvalidFieldError(errors.confirmPassword)}
                  </div>
                </div>
                <div className="text-xs color-grey">
                  {local_Strings.registerStep2Label3}
                </div>
                <div className="text-right p-3 ">
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
                        touched.password = true;
                        touched.confirmPassword = true;
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
  );
}

export default ForgotPasswordStep3;
