import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext, User } from "../providers/AuthProvider";
import InvalidFieldError from '../shared/invalid-field-error';
import { localStrings as local_Strings } from '../translations/localStrings';
import { AddToLogs, SendOTP, ValidateOTP } from "../services/cmsService";
import { getUserRole } from "../services/apiServices";
import Constant from "../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import Swal from 'sweetalert2';


interface iPasswordResetOTP {
  otp: string;
}
interface IProps {
  userDetail: User;
}

const SubmitOTP: React.FC<IProps> = ({ userDetail }) => {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);

  local_Strings.setLanguage(currentContext.language);
  const initialValues: iPasswordResetOTP = {
    otp: "",
  };
  const loginFormValidationSchema = yup.object({
    otp: yup.string().required(local_Strings.GeneralValidation),
  });
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const submitOTP = async (values: iPasswordResetOTP) => {

    setLoading(true);
    setShowErrorMessage(false);
    const isValidateOTP = await ValidateOTP(userDetail.username, values.otp);
    if (isValidateOTP) {

      const loginResponse = await currentContext.login({ ...userDetail, otp: values.otp });
      if (loginResponse) {
        await AddToLogs(
          "Login Success",
          "Login Success",
          userDetail.username
        );

        redirectUser();
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
    } else {
      setLoading(false);

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: local_Strings.otpErrorMessage,
        showConfirmButton: false,
        timer: Constant.AlertTimeout
      });
      setShowErrorMessage(true);
    }
  };

  const redirectUser = async () => {

    const role = await getUserRole(userDetail.username)
      .finally(() => {
        setLoading(false);
      });
    if (role && role !== undefined) {
      if (role.name === Constant.Customer) {
        history.push(`/${currentContext.language}/Home`);
      } else if (role.name === Constant.RM) {
        history.push(`/${currentContext.language}/RMLanding`);
      } else if (role.name === Constant.Management) {
        history.push(`/${currentContext.language}/Managment`);
      } else if (role.name === Constant.CMSADMIN) {
        history.push(`/${currentContext.language}/Admin`);
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: local_Strings.GenericErrorMessage,
          showConfirmButton: false,
          timer: Constant.AlertTimeout
        });
      }
    }
  }

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
                  pattern="[0-9]*" maxLength={6}
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
                  onClick={async () => {
                    
                    const optResult = await SendOTP(
                      userDetail.username
                    );
                    if (optResult) {
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: local_Strings.OTPSentMessage,
                        showConfirmButton: false,
                        timer: Constant.AlertTimeout,
                      });                            
                    } else {
                      Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: local_Strings.GenericErrorMessage,
                        showConfirmButton: false,
                        timer: Constant.AlertTimeout,
                      });
                    }
                  }}>
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
