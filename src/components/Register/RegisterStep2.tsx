import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  initialRegisterationData,
  IRegisterationData,
} from "../../Helpers/publicInterfaces";
import { localStrings as local_Strings } from "../../translations/localStrings";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { AuthContext } from "../../providers/AuthProvider";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from "../../shared/invalid-field-error";
import Swal from "sweetalert2";
import { SendOTP } from "../../services/cmsService";
import xIcon from "../../images/x-icon.svg";

interface iRegisterStep2 {
  showRegisterStep2Modal: boolean;
  hideRegisterStep2Modal: () => void;
  backRegisterStep1Modal: () => void;
  showRegisterStep3Modal: (step2_data: IRegisterationData) => void;
  step1_data: IRegisterationData;
}

function RegisterStep2(props: iRegisterStep2) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);

  const registerFormStep2ValidationSchema = yup.object({
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
      show={props.showRegisterStep2Modal}
      onHide={props.hideRegisterStep2Modal}
      //size="lg"
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
                onClick={props.backRegisterStep1Modal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.registerTitle}</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideRegisterStep2Modal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box p-4  scrollabel-modal-box">
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
            initialValues={{
              ...props.step1_data,
              password: "",
              confirmPassword: "",
            }}
            validationSchema={registerFormStep2ValidationSchema}
            onSubmit={async (values) => {
              const optResult = await SendOTP(values.cif);
              if (optResult === true) {
                props.showRegisterStep3Modal(values);
              } else {
                Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: local_Strings.GenericErrorMessage,
                  showConfirmButton: false,
                  timer: Constant.AlertTimeout,
                });
              }
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
              setFieldValue,
              isValid,
              validateForm,
            }) => (
              <div className="container-fluid">
                <div className="row mb-3">
                  <div className="col-md-8 col-sm-12">
                    <h5>{local_Strings.registerStep2Hint}</h5>
                  </div>
                  <div className="col-md-4 col-sm-12 text-right">
                    <span className="hintStep">
                      {local_Strings.registerStep2StepCount}
                    </span>
                  </div>
                </div>

                <div className="mb-3 row">
                  <div className="col-lg-6 form-group">
                    <label>{local_Strings.registerStep2Label1}</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder=""
                      value={values.password || ""}
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                    />
                    {touched.password &&
                      errors.password &&
                      InvalidFieldError(errors.password)}
                  </div>
                  <div className="col-lg-6 form-group">
                    <label>{local_Strings.registerStep2Label2}</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder=""
                      value={values.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                    />
                    {touched.confirmPassword &&
                      errors.confirmPassword &&
                      InvalidFieldError(errors.confirmPassword)}
                  </div>
                </div>
                <div className="text-xs">
                  {local_Strings.registerStep2Label3}
                </div>

                <div className="text-right p-3">
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
                    {local_Strings.registerStep2Button}
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

export default RegisterStep2;
