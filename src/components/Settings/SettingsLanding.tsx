import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { GetUserWelcomeData } from "../../services/cmsService";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";

interface iSettingsLanding {
  showSettingsLandingModal: boolean;
  hideSettingsLandingModal: () => void;
  showChangeCurrencyModal: () => void;
  showChangePasswordModal: () => void;
  showChangeOTPMethodModal: () => void;
  showChangeLanguageModal: () => void;
}

interface IUserInfo {
  name: string;
  customerShortName: string;
  telephone: string;
  rmEmail: string;
}

function SettingsLanding(props: iSettingsLanding) {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    name: "",
    telephone: "",
    rmEmail: "",
    customerShortName: "",
  });

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {
      setLoading(true);
      GetUserWelcomeData(currentContext.selectedCIF)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0 && isMounted) {
            setUserInfo(responseData[0] as IUserInfo);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    }

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF]);

  return (
    <Modal
      show={props.showSettingsLandingModal}
      onHide={props.hideSettingsLandingModal}
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
              <h4 id="newReqTxt">{local_Strings.SettingsLandingTitle}</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideSettingsLandingModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box   scrollabel-modal-box ">
          <LoadingOverlay
            active={isLoading}
            spinner={
              <PuffLoader
                size={Constant.SpnnerSize}
                color={Constant.SpinnerColor}
              />
            }
          />
          <ul className="box-list">
            <li>
              <div className="box-list-details">
                <div className="row no-gutters align-items-center">
                  <div className="col-md-6">
                    <h6 className="mb-1 text-600 text-18 ">
                      {userInfo["customerShortName"] || userInfo["rmEmail"] || ""}
                    </h6>
                    <div className="color-gray">{local_Strings.RMSampleAccount + currentContext.selectedCIF}</div>
                  </div>
                  <div className="col-md-6 text-md-right">
                    <a
                      href="tel:+974 00000000"
                      className="mx-1 color-gold text-xs d-block"
                    >
                      {userInfo.telephone || ""}
                      <i
                        className="fa fa-mobile color-gold text-sm mx-1"
                        aria-hidden="true"
                      ></i>
                    </a>
                    <a
                      href="mailto:ahmedmohamed@gmail.com"
                      className=" color-gold text-xs d-block"
                    >
                      {userInfo.rmEmail || ""}
                      <i
                        className="fa fa-envelope color-gold text-xs mx-1"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="p-4">
            <div className="row mb-4">
              <button
                id="applyReqBtn"
                className="btn btn-primary col-sm-8 col-md-4   mx-auto"
                onClick={props.showChangeCurrencyModal}
              >
                {local_Strings.SettingsLandingButton1}
              </button>
            </div>
            <div className="row mb-4">
              <button
                id="applyReqBtn"
                className="btn btn-primary col-sm-8 col-md-4   mx-auto"
                onClick={props.showChangePasswordModal}
              >
                {local_Strings.SettingsLandingButton2}
              </button>
            </div>
            <div className="row mb-4">
              <button
                id="applyReqBtn"
                className="btn btn-primary col-sm-8 col-md-4   mx-auto"
                onClick={props.showChangeOTPMethodModal}
              >
                {local_Strings.SettingsLandingButton3}
              </button>
            </div>
            <div className="row mb-4">
              <button
                id="applyReqBtn"
                className="btn btn-primary col-sm-8 col-md-4   mx-auto"
                onClick={props.showChangeLanguageModal}
              >
                {local_Strings.SettingsLandingButton4}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SettingsLanding;
