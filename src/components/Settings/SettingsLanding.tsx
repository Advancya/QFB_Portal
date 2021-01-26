import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { GetRmDisplayName, GetUserWelcomeDataWithUserData } from "../../services/cmsService";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import xIcon from "../../images/x-icon.svg";
import { GetUserLocalData } from "../../Helpers/authHelper";
import { getUserRole } from "../../services/apiServices";

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
  const [allowEdit, setAllowEdit] = useState<boolean>(false);
  const [rmName, setRmName] = React.useState("");
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    name: "",
    telephone: "",
    rmEmail: "",
    customerShortName: "",
  });
  const [userRole, setRole] = React.useState("");
  const fetchRmName = async () => {
    const res = await GetRmDisplayName(currentContext.selectedCIF);
    setRmName(res);
  };

  useEffect(() => {
    let isMounted = true;
    const initialLoadMethod = async () => {
      const userData = await GetUserLocalData();
      if (userData) {
        if (isMounted && userData.customerId === currentContext.selectedCIF) {
          setAllowEdit(true);
        }
      }

      const role = await getUserRole(currentContext.selectedCIF);

      if (role && !!role) {
        setRole(role.name);
      }
    };

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF, currentContext.language]);

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {
      setLoading(true);
      fetchRmName();
      GetUserWelcomeDataWithUserData(currentContext.selectedCIF)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0 && isMounted) {
            setUserInfo(responseData[0] as IUserInfo);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    };

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF, currentContext.language]);

  return (
    <Modal
      show={props.showSettingsLandingModal}
      onHide={props.hideSettingsLandingModal}
      //size="lg"
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
          <img src={xIcon} width="15" />
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
                      {userRole === Constant.RM
                        ? rmName
                        : userInfo["customerShortName"] ||
                        userInfo["rmEmail"] ||
                        ""}
                    </h6>
                    <div className="color-gray">
                      {(userRole === Constant.RM ?
                        local_Strings.RMSampleAccount : (userRole === Constant.Management ?
                          local_Strings.ManagementSampleAccount : local_Strings.CustomerSampleAccount)) +
                        currentContext.selectedCIF}
                    </div>
                  </div>
                  <div className="col-md-6 text-right">
                    <a
                      href={`tel:${userInfo.telephone}`}
                      className="mx-1 color-gold text-xs d-block"
                    >
                      {userInfo.telephone || ""}
                      <i
                        className="fa fa-mobile color-gold text-sm mx-1"
                        aria-hidden="true"
                      ></i>
                    </a>
                    <a
                      href={`mailto:${userInfo.rmEmail}`}
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
                className="btn btn-primary col-sm-8 col-md-5   mx-auto"
                onClick={props.showChangeCurrencyModal}
                disabled={!allowEdit}
              >
                {local_Strings.SettingsLandingButton1}
              </button>
            </div>
            <div className="row mb-4">
              <button
                id="applyReqBtn"
                className="btn btn-primary col-sm-8 col-md-5   mx-auto"
                onClick={props.showChangePasswordModal}
                disabled={!allowEdit}
              >
                {local_Strings.SettingsLandingButton2}
              </button>
            </div>
            <div className="row mb-4">
              <button
                id="applyReqBtn"
                className="btn btn-primary col-sm-8 col-md-5   mx-auto"
                onClick={props.showChangeOTPMethodModal}
                disabled={!allowEdit}
              >
                {local_Strings.SettingsLandingButton3}
              </button>
            </div>
            <div className="row mb-4">
              <button
                id="applyReqBtn"
                className="btn btn-primary col-sm-8 col-md-5   mx-auto"
                onClick={props.showChangeLanguageModal}
                disabled={!allowEdit}
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
