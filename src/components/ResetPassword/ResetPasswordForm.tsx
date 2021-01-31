import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from "../../shared/invalid-field-error";
import Swal from "sweetalert2";
import xIcon from "../../images/x-icon.svg";
import MultiSelect from "react-multi-select-component";
import { CustomerListContext } from "../../pages/Admin/Admin";
import moment from "moment";
import {
  SendNotificationsToCIFs
} from "../../services/cmsService";

interface iResetPasswordForm {
  showFormModal: boolean;
  hideFormModal: () => void;
}

function ResetPasswordForm(props: iResetPasswordForm) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const customerList = useContext(CustomerListContext);
  const [showCustomerError, setCustomerError] = useState<boolean>(false);

  const formValidationSchema = yup.object({
    selectedCIFs: yup
      .string()
      .nullable()
      .min(1)
      .required("Select at least one customer"),
  });

  const options =
    customerList && customerList.length > 0
      ? customerList.map((c) => ({
        value: c.id ? c.id : "",
        label: c.shortName ? c.shortName : "",
      }))
      : [];

  return (
    <div>
      <Modal
        show={props.showFormModal}
        onHide={props.hideFormModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-text">
              <h4>{"Send Reset Password to customer"}</h4>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={props.hideFormModal}
          >
            <img alt="" src={xIcon} width="15" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ selectedCIFs: [] }}
            validationSchema={formValidationSchema}
            onSubmit={async (values) => {
              setLoading(true);
              const item = {
                cif:
                  values.selectedCIFs.length === customerList.length
                    ? ""
                    : values.selectedCIFs.flatMap((x) => x["value"]).toString(),
                title: "Use this link to reset your password",
                titleAr: "Use this link to reset your password",
                expiryData: moment().add(1, "day").utc(true),
                message: Constant.ApiBaseUrl + "/" + currentContext.language + "/ResetPassword",
                messageAr: Constant.ApiBaseUrl + "/" + currentContext.language + "/ResetPassword",
              };
              const x = await SendNotificationsToCIFs(item);
              if (x) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: local_Strings.NotificationsSavedMessage,
                  showConfirmButton: false,
                  timer: Constant.AlertTimeout,
                });
                props.hideFormModal();
              } else {
                Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: local_Strings.GenericErrorMessage,
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
              setFieldValue,
              handleSubmit,
              errors,
              touched,
              isValid,
              validateForm,
            }) => (
              <div className="box modal-box p-0 scrollabel-modal-box">
                <LoadingOverlay
                  active={isLoading}
                  spinner={
                    <PuffLoader
                      size={Constant.SpnnerSize}
                      color={Constant.SpinnerColor}
                    />
                  }
                />
                <div className="box-body">
                  <div className="form-group">
                    <MultiSelect
                      hasSelectAll={false}
                      options={options}
                      value={
                        values.selectedCIFs &&
                          values.selectedCIFs.length > 0 &&
                          values.selectedCIFs[0].value !== "0"
                          ? values.selectedCIFs
                          : null
                      }
                      onChange={(_item) => {
                        setFieldValue("selectedCIFs", _item);
                        handleBlur("selectedCIFs");
                        if (_item.length !== 0) {
                          setCustomerError(false);
                        }
                      }}
                      labelledBy={"Select"}
                    />
                    {showCustomerError &&
                      InvalidFieldError("Select at least one customer")}
                  </div>
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-sm btn-primary mt-1"
                    type="submit"
                    style={{ float: "right", margin: 20 }}
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
                        if (
                          values.selectedCIFs.length === 0 ||
                          values.selectedCIFs[0].value === "0"
                        ) {
                          setCustomerError(true);
                        } else {
                          setCustomerError(false);
                        }
                        handleBlur("selectedCIFs");
                        touched.selectedCIFs = true;
                      }
                    }}
                  >
                    {local_Strings.SendButtonText}
                  </button>
                </div>
              </div>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ResetPasswordForm;
