import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext, User } from "../providers/AuthProvider";
import InvalidFieldError from '../shared/invalid-field-error';
import { localStrings as local_Strings } from '../translations/localStrings';
import * as helper from '../Helpers/helper';
import { SendOTP, ValidateOTP } from "../services/cmsService";

interface iPasswordResetOTP {
  otp: string;
}
interface IProps {
  userDetail: User;
}

const SubmitOTP: React.FC<IProps> = ({ userDetail }) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  local_Strings.setLanguage(auth.language);
  const initialValues: iPasswordResetOTP = {
    otp: "",
  };
  const loginFormValidationSchema = yup.object({
    otp: yup.string().required(local_Strings.GeneralValidation),
  });
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);

  const submitOTP = async (values: iPasswordResetOTP) => {

    setLoading(true);
    setShowErrorMessage(false);
    const res = await ValidateOTP(userDetail.username, values.otp);
    if (res) {
      const x = await auth.login({ ...userDetail, otp: values.otp });
      if (x) {
        history.push(`/${auth.language}/Home`);
      } else {
        console.log("Error Login");
      }
    } else {
      setShowErrorMessage(true);
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
          initialValues={initialValues}
          validationSchema={loginFormValidationSchema}
          onSubmit={(values) => submitOTP(values)}
        >
          {({
            values,
            handleBlur,
            handleSubmit,
            errors,
            touched,
            setFieldValue
          }) => (
            <div className="box-body" id="OtpBox">
              <div className="form-group">
                <p>{local_Strings.PasswordResetOTPHint}</p>                
              </div>
              <div className="form-group">
                <label>{local_Strings.PasswordResetOTPEnterOTP}</label>
                <input type="text" className="form-control"
                  pattern="[0-9]*" maxLength={6} minLength={4}
                  value={values.otp || ""}
                  onChange={(e) => {
                    if (e.currentTarget.validity.valid && e.currentTarget.value.length <= 6) {
                      setFieldValue("otp", e.target.value.replace(/[^0-9]*/, ''));
                    }
                  }}
                  onBlur={handleBlur("otp")} />
                {touched.otp && errors.otp && InvalidFieldError(errors.otp)}
                {showErrorMessage && InvalidFieldError(local_Strings.otpErrorMessage)}
              </div>
              <div className="form-group text-right">
                <a href="#" className="forgotLink"
                  onClick={async () => await SendOTP(userDetail.username)}>
                  {local_Strings.PasswordResetOTPResendOTP}
                </a>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block"
                  onClick={() => handleSubmit()}
                >
                  {local_Strings.PasswordResetOTPButton}</button>
              </div>
            </div>
          )}
        </Formik>        
      </div>
    </div>
  );
}

export default SubmitOTP;
