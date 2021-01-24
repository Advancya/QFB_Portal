import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { localStrings as local_Strings } from "../../translations/localStrings";
import Constant from "../../constants/defaultData";
import LoadingOverlay from 'react-loading-overlay';
import PuffLoader from "react-spinners/PuffLoader";
import { AuthContext } from "../../providers/AuthProvider";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from '../../shared/invalid-field-error';
import Swal from 'sweetalert2';
import { SendOTP, ValidateOTP } from "../../services/cmsService";
import {
  ITransactionDetail,
} from "../../Helpers/publicInterfaces";
import { AddTransaction } from "../../services/transactionService";

interface iOTPValidationForm {
  showOTPValidationFormModal: boolean;
  hideOTPValidationFormModal: () => void;
  backOTPValidationFormModal: () => void;
  submittedTransaction: ITransactionDetail;
}

function OTPValidationForm(props: iOTPValidationForm) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);

  const registerFormStep3ValidationSchema = yup.object({
    otp: yup.number().required(local_Strings.GeneralValidation),
  });

  return (
    <Modal
      show={props.showOTPValidationFormModal}
      onHide={props.hideOTPValidationFormModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="modal-header-text">
          <div className="d-flex align-items-center">            
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.TransactionOTPTitle}</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideOTPValidationFormModal}
        >
          <span aria-hidden="true">×</span>
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
              otp: "",
            }}
            validationSchema={registerFormStep3ValidationSchema}
            onSubmit={async (values) => {
              setLoading(true);
              const otpRes = await ValidateOTP(currentContext.selectedCIF, values.otp);

              if (otpRes === true) {
                const added = await AddTransaction(props.submittedTransaction);
                if (added === true) {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: local_Strings.SuccessMessageTitle,
                    html: local_Strings.RequestSuccessMessage,
                    showConfirmButton: false,
                    timer: Constant.AlertTimeout
                  });
                  props.backOTPValidationFormModal();
                } else {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: local_Strings.GenericErrorMessage,
                    showConfirmButton: false,
                    timer: Constant.AlertTimeout
                  });
                }

              } else {
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: local_Strings.otpErrorMessage,
                  showConfirmButton: false,
                  timer: Constant.AlertTimeout
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
              validateForm,
              isValid
            }) => (
              <div className="container-fluid">
                <div className="row mb-3">
                  <div className="col-md-8 col-sm-12">
                    <h5>{local_Strings.PasswordResetOTPHint}</h5>
                  </div>
                </div>

                <div className="mb-5 row">
                  <div className="col-lg-6 form-group">
                    <label> {local_Strings.registerStep3Label1}</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder=""
                      value={values.otp || ""}
                      onChange={handleChange("otp")}
                      onBlur={handleBlur("otp")}
                    />
                    {touched.otp && errors.otp && InvalidFieldError(errors.otp)}
                    <div className="form-group text-right">
                      <a href="#" className="forgotLink"
                        onClick={async () => {
                          const optResult = await SendOTP(currentContext.selectedCIF);
                          if (optResult) {
                            Swal.fire({
                              position: 'top-end',
                              icon: 'success',
                              title: local_Strings.OTPSentMessage,
                              showConfirmButton: false,
                              timer: Constant.AlertTimeout
                            });                            
                          } else {
                            Swal.fire({
                              position: 'top-end',
                              icon: 'error',
                              title: local_Strings.GenericErrorMessage,
                              showConfirmButton: false,
                              timer: Constant.AlertTimeout
                            });
                          }
                        }}>
                        {local_Strings.registerStep3Label2}
                      </a>
                    </div>
                  </div>
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
                          position: 'top-end',
                          icon: 'error',
                          title: local_Strings.formValidationMessage,
                          showConfirmButton: false,
                          timer: Constant.AlertTimeout
                        });
                        touched.otp = true;
                      }
                    }}>
                    {local_Strings.PasswordResetOTPButton}
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

export default OTPValidationForm;
