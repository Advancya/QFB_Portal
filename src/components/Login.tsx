import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext, User } from "../providers/AuthProvider";
import InvalidFieldError from '../shared/invalid-field-error';
import { localStrings as local_Strings } from '../translations/localStrings';
import * as helper from '../Helpers/helper';

function Login() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const initialValues: User = { username: "", password: "" };
  local_Strings.setLanguage(auth.language);

  const loginFormValidationSchema = yup.object({
    username: yup.string().required("User name is required"),
    password: yup.string().required("Password is required"),
  });

  const submitLogin = async (values: User) => {
    
    setLoading(true);
    const x = await auth.login(values);
    if (x) {
      history.push(`/${auth.language}/Home`);
    } else {
      console.log("Error Login");
    }
    setLoading(false);
  };

  useEffect(() => {    
    
  }, []);

  return (
    <div className="col-lg-4 col-container">
      <div className="box login-container">
        <div className="box-header">
          <h3>{local_Strings.LoginWithCredentialsTitle}</h3>
        </div>
        <Formik
          initialValues={{ username: "", password: "" }}
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
        <div className="box-body d-none" id="OtpBox">
          <p>You'll receive an sms with the OTP number</p>
          <div className="form-group">
            <label>Enter OTP</label>
            <input type="password" className="form-control" id="otpField" />
          </div>
          <div className="form-group text-right">
            <a href="#" className="forgotLink">
              Resend OTP ?
            </a>
          </div>
          <div className="form-group">
            <Link
              to={`/${auth.language}/Home`}
              id="confirmBtn"
              className="btn btn-primary btn-block"
            >
              Confirm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
