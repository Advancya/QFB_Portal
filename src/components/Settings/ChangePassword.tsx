import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import {
  initialSettingsData,
  IUserSettings,
  GetUserLocalData,
  SaveUserDataLocally,
} from "../../Helpers/authHelper";
import { ChangeUserPassword } from "../../services/cmsService";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import Swal from "sweetalert2";
import { Formik } from "formik";
import * as yup from "yup";
import InvalidFieldError from "../../shared/invalid-field-error";
import xIcon from "../../images/x-icon.svg";

interface iChangePassword {
  showChangePasswordModal: boolean;
  hideChangePasswordModal: () => void;
  backSettingsLandingModal: () => void;
}
function ChangePassword(props: iChangePassword) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [userSettings, setUserSettings] = useState<IUserSettings>(
    initialSettingsData
  );
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = React.useState(false);

  const initialValuesWithin = {
    cif: currentContext.selectedCIF,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchemaWithin = yup.object({
    currentPassword: yup
      .string()
      .required(local_Strings.ChangePassword_CurrentRequiredMsg),
    newPassword: yup
      .string()
      .required(local_Strings.ChangePassword_RequiredMsg)
      .min(7, local_Strings.ChangePassword_InvalidationMsg)
      .matches(/[a-zA-Z]/, local_Strings.ChangePassword_InvalidationMsg),
    confirmPassword: yup
      .string()
      .required(local_Strings.ChangePassword_ConfirmRequiredMsg)
      .oneOf(
        [yup.ref("newPassword"), ""],
        local_Strings.ChangePassword_MustMatchMsg
      ),
  });

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    GetUserLocalData()
      .then((settings: any) => {
        if (isMounted && settings && settings.length > 0) {
          setUserSettings(JSON.parse(settings));
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF]);

  return (
    <Modal
      show={props.showChangePasswordModal}
      onHide={props.hideChangePasswordModal}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="d-flex align-items-center">
          <div className="modal-header-text">
            <a
              href="#"
              onClick={props.backSettingsLandingModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4 id="newReqTxt">{local_Strings.ChangePasswordTitle}</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideChangePasswordModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValuesWithin}
          validationSchema={validationSchemaWithin}
          onSubmit={async (values) => {
            setLoading(true);
            setShowError(false);
            ChangeUserPassword({
              cif: values.cif,
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
            })
              .then((response) => {
                if (response) {
                  const _userData = {
                    ...userSettings,
                    language: values.newPassword,
                  };
                  SaveUserDataLocally(_userData);
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: local_Strings.ConfirmationTitle,
                    html: local_Strings.ConfirmationDesc,
                    showConfirmButton: false,
                    timer: Constant.AlertTimeout,
                  });
                  props.backSettingsLandingModal();

                } else {
                  Swal.fire(
                    "Oops...",
                    local_Strings.GenericErrorMessage,
                    "error"
                  );
                  setShowError(true);
                }
              })
              .catch((e: any) => console.log(e))
              .finally(() => setLoading(false));
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
          }) => (
            <div className="box modal-box p-4  scrollabel-modal-box ">
              <LoadingOverlay
                active={isLoading}
                spinner={
                  <PuffLoader
                    size={Constant.SpnnerSize}
                    color={Constant.SpinnerColor}
                  />
                }
              />
              <div className="row">
                <div className="col-lg-5 form-group">
                  <label>{local_Strings.ChangePasswordCurrentLabel}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={values.currentPassword || ""}
                    onChange={handleChange("currentPassword")}
                    onBlur={handleBlur("currentPassword")}
                  />
                  {touched.currentPassword &&
                    errors.currentPassword &&
                    InvalidFieldError(errors.currentPassword)}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 form-group">
                  <label>{local_Strings.ChangePasswordNewLabel}</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder=""
                    value={values.newPassword || ""}
                    onChange={handleChange("newPassword")}
                    onBlur={handleBlur("newPassword")}
                  />
                  {touched.newPassword &&
                    errors.newPassword &&
                    InvalidFieldError(errors.newPassword)}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 form-group">
                  <label>{local_Strings.ChangePasswordConfirmLabel}</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder=""
                    value={values.confirmPassword || ""}
                    onChange={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                  />
                  {touched.confirmPassword &&
                    errors.confirmPassword &&
                    InvalidFieldError(errors.confirmPassword)}
                </div>
              </div>
              <div className="text-xs color-grey">
                {local_Strings.registerStep2Label3}
              </div>

              <div className="text-right p-3 ">
                <button
                  id="applyReqBtn"
                  className="btn btn-primary mx-2"
                  onClick={() => handleSubmit()}
                >
                  {local_Strings.SettingSaveButton}
                </button>
                <button
                  id="applyReqBtn"
                  className="btn btn-primary"
                  onClick={props.backSettingsLandingModal}
                >
                  {local_Strings.SettingsCancelButton}
                </button>
              </div>
            </div>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default ChangePassword;
