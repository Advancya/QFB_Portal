import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import xIcon from "../../images/x-icon.svg";

import {
  initialSettingsData,
  IUserSettings,
  GetUserLocalData,
  SaveUserDataLocally,
} from "../../Helpers/authHelper";
import { ChangeDefaultOtp } from "../../services/cmsService";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import Swal from "sweetalert2";

interface iChangeOTPMethod {
  showChangeOTPMethodModal: boolean;
  hideChangeOTPMethodModal: () => void;
  backSettingsLandingModal: () => void;
}
function ChangeOTPMethod(props: iChangeOTPMethod) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [userSettings, setUserSettings] = useState<IUserSettings>(
    initialSettingsData
  );
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (props.showChangeOTPMethodModal) {
      setLoading(true);

      GetUserLocalData()
        .then((settings: IUserSettings) => {
          if (isMounted && settings) {
            if (!!settings.otp) {
              setUserSettings(settings);
            } else {
              setUserSettings(initialSettingsData);
            }
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF, props.showChangeOTPMethodModal]);

  return (
    <Modal
      show={props.showChangeOTPMethodModal}
      onHide={props.hideChangeOTPMethodModal}
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
            <h4 id="newReqTxt">{local_Strings.ChangeOTPTitle}</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideChangeOTPMethodModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
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
          <div className="form-group">
            <div className="mb-2 text-18">{local_Strings.ChangeOTPLabel}</div>
            <div className="custom-control custom-radio mx-2">
              <input
                type="radio"
                id="customRadio1"
                name="customRadio"
                className="custom-control-input"
                checked={userSettings.otp === "" || userSettings.otp === "SMS"}
                onChange={(e) =>
                  e.target.checked
                    ? setUserSettings({
                      ...userSettings,
                      otp: local_Strings.ChangeOTPSMS
                    })
                    : {}
                }
              />
              <label
                className="custom-control-label color-black"
                htmlFor="customRadio1"
              >
                {local_Strings.ChangeOTPSMS}
              </label>
            </div>
            <div className="custom-control custom-radio  mx-2">
              <input
                type="radio"
                id="customRadio2"
                name="customRadio"
                className="custom-control-input"
                checked={userSettings.otp === "Email"}
                onChange={(e) =>
                  e.target.checked
                    ? setUserSettings({
                      ...userSettings,
                      otp: local_Strings.ChangeOTPEmail
                    })
                    : {}
                }
              />
              <label
                className="custom-control-label color-black"
                htmlFor="customRadio2"
              >
                {local_Strings.ChangeOTPEmail}
              </label>
            </div>
            <div className="custom-control custom-radio  mx-2">
              <input
                type="radio"
                id="customRadio3"
                name="customRadio"
                className="custom-control-input"
                checked={userSettings.otp === "SMS & Email" || userSettings.otp === "Both"}
                onChange={(e) =>
                  e.target.checked
                    ? setUserSettings({
                      ...userSettings,
                      otp: local_Strings.ChangeOTPSMSAndEMail
                    })
                    : {}
                }
              />
              <label
                className="custom-control-label color-black"
                htmlFor="customRadio3"
              >
                {local_Strings.ChangeOTPSMSAndEMail}
              </label>
            </div>
          </div>
          <div className="text-right p-3">
            <button
              id="applyReqBtn"
              className="btn btn-primary mx-2"
              onClick={() => {
                setLoading(true);
                ChangeDefaultOtp(currentContext.selectedCIF, userSettings.otp)
                  .then((response) => {
                    if (response) {
                      SaveUserDataLocally(userSettings);
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
                    }
                  })
                  .catch((e: any) => console.log(e))
                  .finally(() => setLoading(false));
              }}
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
      </Modal.Body>
    </Modal>
  );
}

export default ChangeOTPMethod;
