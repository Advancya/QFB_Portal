import React, { useContext, useEffect, useState } from "react";
import { } from "react-bootstrap";
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
import { SendOTP, ValidateOTP } from "../../services/cmsService";

interface iResetPasswordStep2 {
  showResetPasswordStep2: boolean;
  hideResetPasswordStep2: () => void;
  showResetPasswordStep3: () => void;
  customerId: string;
}

function ResetPasswordStep2(props: iResetPasswordStep2) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const initialValues = {
    otp: "",
  };

  const registerFormStep3ValidationSchema = yup.object({
    otp: yup.number().required(local_Strings.GeneralValidation),
  });

  return props.showResetPasswordStep2 ? (
    <div className="box modal-box p-4 ">
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
        validationSchema={registerFormStep3ValidationSchema}
        onSubmit={async (values) => {
          setLoading(true);
          const res = await ValidateOTP(props.customerId, values.otp);
          if (res) {
            props.showResetPasswordStep3();
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: local_Strings.otpErrorMessage,
              showConfirmButton: false,
              timer: Constant.AlertTimeout,
            });
          }
          setLoading(false);
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
          isValid,
          validateForm,
        }) => (
          <div className="container-fluid">
            <div className="row mb-3">
              <div className="col-md-12 col-sm-12">
                <h5>{local_Strings.PasswordResetOTPHint}</h5>
              </div>
            </div>

            <div className="mb-2 row">
              <div className="col-lg-12 form-group">
                <label>{local_Strings.PasswordResetOTPEnterOTP}</label>
                <input
                  type="number"
                  className="form-control"
                  value={values.otp || ""}
                  onChange={handleChange("otp")}
                  onBlur={handleBlur("otp")}
                />
                {touched.otp && errors.otp && InvalidFieldError(errors.otp)}
                <div className="form-group text-right">
                  <a
                    href="#"
                    className="forgotLink"
                    onClick={async () => await SendOTP(props.customerId)}
                  >
                    {local_Strings.PasswordResetOTPResendOTP}
                  </a>
                </div>
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
                    touched.otp = true;
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
  ) : null;
}

export default ResetPasswordStep2;
