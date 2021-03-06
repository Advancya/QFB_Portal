import React, { useContext, useState } from "react";
import { localStrings as local_Strings } from "../../translations/localStrings";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { AuthContext } from "../../providers/AuthProvider";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from "../../shared/invalid-field-error";
import Swal from "sweetalert2";
import { resetPassword } from "../../services/authenticationService";
import { DeletePasswordToken } from "../../services/cmsService";
const queryString = require('query-string');

interface iResetPasswordStep3 {
  showResetPasswordStep3: boolean;
  hideResetPasswordStep3: () => void;
  showResetPasswordStep4: () => void;
  customerId: string;
}

function ResetPasswordStep3(props: iResetPasswordStep3) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const queryStrings = queryString.parse(window.location.search);

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

  return props.showResetPasswordStep3 ? (

    <div className="box modal-box p-4 ">
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

            await DeletePasswordToken(queryStrings.token);

            // Swal.fire({
            //   position: "top-end",
            //   icon: "success",
            //   title: local_Strings.PasswordResetTitle,
            //   html: local_Strings.PasswordResetSuccessMessage,
            //   showConfirmButton: false,
            //   timer: Constant.AlertTimeout,
            // });
            props.showResetPasswordStep4();
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
            <LoadingOverlay
              active={isLoading}
              spinner={
                <PuffLoader
                  size={Constant.SpnnerSize}
                  color={Constant.SpinnerColor}
                />
              }
            />
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
              {local_Strings.ChangePassword_InvalidationMsg}
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
  ) : null;
}

export default ResetPasswordStep3;
