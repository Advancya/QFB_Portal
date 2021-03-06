import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext, User } from "../providers/AuthProvider";
import InvalidFieldError from "../shared/invalid-field-error";
import { localStrings as local_Strings } from "../translations/localStrings";
import * as helper from "../Helpers/helper";
import { AddToLogs, SendOTP } from "../services/cmsService";
import { IsAccountLocked, checkUsernameAndPassword } from "../services/authenticationService";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import Constant from "../constants/defaultData";
import Swal from "sweetalert2";
import ForgotPasswordLanding from "./ForgotPassword/ForgotPasswordLanding";
interface IProps {
  setUserCredentials: any;
  showOTP: any;
}

const Login: React.FC<IProps> = (props) => {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const initialValues: User = { username: "", password: "", otp: "" };
  local_Strings.setLanguage(currentContext.language);
  const loginFormValidationSchema = yup.object({
    username: yup
      .string()
      .required(local_Strings.GeneralValidation)
      .matches(/^\w+$/, local_Strings.Login_ArabicNumberHint),
    password: yup.string().required(local_Strings.GeneralValidation),
  });

  const submitLogin = async (values: User) => {
    setLoading(true);
    const isValidCredentials = await checkUsernameAndPassword(
      values.username,
      values.password
    );

    if (isValidCredentials) {
      SendOTP(values.username)
        .then((res) => {
          props.setUserCredentials({
            username: values.username,
            password: values.password,
            otp: "",
          });
          props.showOTP(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      
      AddToLogs("Login Failure", "Login Failure", values.username);
      IsAccountLocked(values.username).then((res) => {
        if (res === true) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: local_Strings.LoginWithCredentialsLockedErrorMessage,
            showConfirmButton: false,
            timer: Constant.AlertTimeout,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: local_Strings.LoginWithCredentialsErrorMessage,
            showConfirmButton: false,
            timer: Constant.AlertTimeout,
          });
        }
      });
      setLoading(false);      
    }
  };

  return (
    <div className="col-lg-4 col-container">
      <div className="box login-container">
        <div className="box-header">
          <h3>{local_Strings.LoginWithCredentialsTitle}</h3>
        </div>
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
          validationSchema={loginFormValidationSchema}
          onSubmit={(values) => submitLogin(values)}
        >
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            touched,
          }) => (
            <div className="box-body" id="loginBox">
              <div className="form-group">
                <label>{local_Strings.LoginWithCredentialsUserNameLabel}</label>
                <input
                  type="text"
                  className="form-control"
                  id="usernameField"
                  value={values.username || ""}
                  onChange={handleChange("username")}
                  onBlur={handleBlur("username")}
                  maxLength={50}
                />
                {touched.username &&
                  errors.username &&
                  InvalidFieldError(errors.username)}
              </div>
              <div className="form-group">
                <label>{local_Strings.LoginWithCredentialsPasswordLabel}</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordField"
                  value={values.password || ""}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  maxLength={8}
                />
                {touched.password &&
                  errors.password &&
                  InvalidFieldError(errors.password)}
              </div>

              <ForgotPasswordLanding />
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={() => handleSubmit()}
                >
                  {local_Strings.LoginWithCredentialsLoginButton}
                </button>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
