import React, { useContext, useEffect, useState } from "react";
import { localStrings as local_Strings } from "../../translations/localStrings";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { AuthContext } from "../../providers/AuthProvider";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from "../../shared/invalid-field-error";
import Swal from "sweetalert2";
import { ValidateRegisterData, SendOTP, IsPasswordTokenValid } from "../../services/cmsService";
import { useHistory } from "react-router-dom";
const queryString = require('query-string');

interface IresetFormValues {
  username: string;
  mobile: string;
  email: string;
}

interface iResetPasswordStep1 {
  showResetPasswordStep1: boolean;
  hideResetPasswordStep1: () => void;
  showResetPasswordStep2: (cif: string) => void;
}

function ResetPasswordStep1(props: iResetPasswordStep1) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const queryStrings = queryString.parse(window.location.search);
  const history = useHistory();

  useEffect(() => {

    const initialLoadMethod = async () => {

      setLoading(true);
      const isValidToken = await IsPasswordTokenValid(queryStrings.token);

      if (!isValidToken) {

        Swal.fire({
          position: "center",
          icon: "error",
          title: "Password reset link is either expired or not valid",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: Constant.AlertTimeout,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            history.push(`/${currentContext.language}`);
          }
        }).then((result) => {
          history.push(`/${currentContext.language}`);
        });
      }

      setLoading(false);
    }

    initialLoadMethod();
  }, []);

  const initialValues: IresetFormValues = {
    username: "",
    mobile: "",
    email: "",
  };

  const resetPasswordValidationSchema = yup.object({
    username: yup.string().required(local_Strings.GeneralValidation)
    .matches(/^\w+$/, local_Strings.Login_ArabicNumberHint),
    email: yup
      .string()
      .required(local_Strings.GeneralValidation)
      .email(local_Strings.InvalidEmail),
    mobile: yup
      .string()
      .required(local_Strings.ContactUs_Mobile_Format_Validation_Message)
      .min(10, local_Strings.MobileNumberLengthError)
      .matches(
        /^\+(?:[0-9]?){6,14}[0-​9]$/,
        local_Strings.ContactUs_Mobile_Format_Validation_Message
      ),
  });

  const getRegisterData = async (cif: string) => {
    const res = await ValidateRegisterData(cif);
    return res;
  };

  return props.showResetPasswordStep1 ? (
    <div className="box modal-box p-4">
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

          if (data.toString() !== "") {
            if (
              values.email.toLowerCase() ===
              data[0]["Email"].toLowerCase() &&
              values.mobile.toLowerCase() === data[0]["SMS"].toLowerCase()
            ) {
              //Send OTP here
              
              const optResult = await SendOTP(values.username);
              props.showResetPasswordStep2(values.username);
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
                  value={values.mobile || ""}
                  onChange={handleChange("mobile")}
                  onBlur={handleBlur("mobile")}
                  maxLength={16}
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
                  value={values.email || ""}
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
  ) : null;
}

export default ResetPasswordStep1;
