import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { INotificationDetail } from "../../Helpers/publicInterfaces";
import moment from "moment";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { GetUserLocalData } from "../../Helpers/authHelper";
import xIcon from "../../images/x-icon.svg";
import { SetNotificationItemAsRead } from "../../services/cmsService";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";

interface iNotficationDetail {
  showNotficationDetailModal: boolean;
  hideNotficationDetailModal: () => void;
  backNotficationsListingModal: () => void;
  item: INotificationDetail;
}

const NotficationDetail = (props: iNotficationDetail) => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    let isMounted = true;
    const initialLoadMethod = async () => {
      const userData = await GetUserLocalData();
      if (userData) {
        if (userData["customerId"] === currentContext.selectedCIF) {
          setLoading(true);
          SetNotificationItemAsRead(props.item.id)
            .then((responseData: boolean) => {
              if (!responseData) {
                console.log("Failed to set notificaion as read");
              }
            })
            .catch((e: any) => console.log(e))
            .finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      }
    };

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted

  }, [props.item.id]);

  return (
    <Modal
      show={props.showNotficationDetailModal}
      onHide={props.hideNotficationDetailModal}
      //  size="lg"
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
                onClick={props.backNotficationsListingModal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.NotificationsDetailsTitle}</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideNotficationDetailModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
          <LoadingOverlay
            active={isLoading}
            spinner={
              <PuffLoader
                size={Constant.SpnnerSize}
                color={Constant.SpinnerColor}
              />
            }
          />
          <ul className="box-list mb-0">
            {!isLoading && (
              <li className="shown">
                <div className="row align-items-center py-2">
                  <div className="col-sm-12 ">
                    <div className="mb-1 d-flex align-items-center">
                      <span className="mx-1 text-15 color-grey">
                        {!!props.item.messageSendDate
                          ? moment(props.item.messageSendDate).format(
                            "DD/MM/YYYY"
                          )
                          : ""}
                      </span>
                    </div>
                    <h6 className="mb-1 text-600">
                      {currentContext.language === "en"
                        ? props.item.messageTitle
                        : props.item.messageTitleAr}
                    </h6>
                  </div>
                  <div className="col-sm-12 ">
                    <span className="box-brief mb-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            currentContext.language === "en"
                              ? props.item.messageBody
                              : props.item.messageBodyAr,
                        }}
                      />
                    </span>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default NotficationDetail;
