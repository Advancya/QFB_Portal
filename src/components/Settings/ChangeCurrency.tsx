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
import {
  ChangeDefaultCurrency,
  GetAllCurrency,
} from "../../services/cmsService";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import Swal from "sweetalert2";

interface ICurrency {
  id: number;
  name: string;
  nameAr: string;
}

interface iChangeCurrency {
  showChangeCurrencyModal: boolean;
  hideChangeCurrencyModal: () => void;
  backSettingsLandingModal: () => void;
}
function ChangeCurrency(props: iChangeCurrency) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [userSettings, setUserSettings] = useState<IUserSettings>(
    initialSettingsData
  );

  const [curruncies, setCurruncies] = React.useState<ICurrency[]>([
    {
      id: 0,
      name: "",
      nameAr: "",
    },
  ]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    GetAllCurrency()
      .then((responseData: any) => {
        if (responseData && responseData.length > 0 && isMounted) {
          setCurruncies(responseData as ICurrency[]);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));

    GetUserLocalData()
      .then((settings: any) => {
        if (isMounted && settings && settings.length > 0) {
          setUserSettings(JSON.parse(settings));
        }
      })
      .catch((e: any) => console.log(e));

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF]);

  return (
    <Modal
      show={props.showChangeCurrencyModal}
      onHide={props.hideChangeCurrencyModal}
      //  size="lg"
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
            <h4 id="newReqTxt">{local_Strings.ChangeCurrencyTitle}</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideChangeCurrencyModal}
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
            <div className="mb-2 text-18">
              {local_Strings.ChangeCurrencyLabelTitle}
            </div>
            {curruncies &&
              curruncies.length > 0 &&
              !!curruncies[0].name &&
              curruncies.map((c, i) => (
                <div key={i} className="custom-control custom-radio mx-2">
                  <input
                    type="radio"
                    id={"customRadio_" + (i + 1)}
                    name="customRadio"
                    className="custom-control-input"
                    checked={
                      userSettings.currency ===
                      (currentContext.language === "en" ? c.name : c.nameAr)
                    }
                    onChange={(e) =>
                      e.target.checked
                        ? setUserSettings({
                            ...userSettings,
                            currency:
                              currentContext.language === "en"
                                ? c.name
                                : c.nameAr,
                          })
                        : {}
                    }
                  />
                  <label
                    className="custom-control-label color-black"
                    htmlFor={"customRadio_" + (i + 1)}
                  >
                    {currentContext.language === "en" ? c.name : c.nameAr}
                  </label>
                </div>
              ))}
          </div>
          <div className="text-right p-3">
            <button
              id="applyReqBtn"
              className="btn btn-primary mx-2"
              onClick={() => {
                setLoading(true);
                ChangeDefaultCurrency(
                  currentContext.selectedCIF,
                  userSettings.currency
                )
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

export default ChangeCurrency;
