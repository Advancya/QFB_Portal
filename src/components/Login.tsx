import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext, User } from "../providers/AuthProvider";
import InvalidFieldError from '../shared/invalid-field-error';
import { localStrings as local_Strings } from '../translations/localStrings';
import * as helper from '../Helpers/helper';
import { SendOTP } from "../services/cmsService";
import { authenticate } from "../services/authenticationService";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import Constant from "../constants/defaultData";
import Swal from 'sweetalert2';
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
    username: yup.string().required("User name is required"),
    password: yup.string().required("Password is required"),
  });

  const submitLogin = async (values: User) => {

    setLoading(true);
    const isValidCredentials = await authenticate(
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
      setLoading(false);
      
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: local_Strings.landingPageInvaildLoginMessage,
        showConfirmButton: false,
        timer: Constant.AlertTimeout
      });
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
                <input type="text" className="form-control" id="usernameField"
                  value={values.username || ""}
                  onChange={handleChange("username")}
                  onBlur={handleBlur("username")} />
                {touched.username && errors.username && InvalidFieldError(errors.username)}
              </div>
              <div className="form-group">
                <label>{local_Strings.LoginWithCredentialsPasswordLabel}</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordField"
                  value={values.password || ""}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")} />
                {touched.password && errors.password && InvalidFieldError(errors.password)}
              </div>
              <div className="form-group text-right">
                <a href="#" className="forgotLink">
                  {local_Strings.LoginWithCredentialsPasswordResetLabel}
                </a>
              </div>
              <div className="form-group">

                <button type="submit" className="btn btn-primary btn-block"
                  onClick={() => handleSubmit()}
                >
                  {local_Strings.LoginWithCredentialsLoginButton}</button>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
