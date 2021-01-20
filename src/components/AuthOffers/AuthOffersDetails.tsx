import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { emptyOfferData, IOfferDetail } from "../../Helpers/publicInterfaces";
import moment from "moment";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import * as helper from "../../Helpers/helper";
import { GetOfferById } from "../../services/cmsService";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { saveAs } from "file-saver";
import xIcon from "../../images/x-icon.svg";
import { GetUserLocalData } from "../../Helpers/authHelper";

const mime = require("mime");

interface iAuthOffersDetails {
  showAuthOffersDetailsModal: boolean;
  hideAuthOffersDetailsModal: () => void;
  backAuthOffersDetailsModal: () => void;
  showAuthOfferRequestModal: () => void;
  itemID: number;
}

function AuthOffersDetails(props: iAuthOffersDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(true);
  const [item, setDetail] = useState<IOfferDetail>(null);
  const [allowEdit, setAllowEdit] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const initialLoadMethod = async () => {
      const userData = await GetUserLocalData();
      if (userData) {
        if (isMounted && userData.customerId === currentContext.selectedCIF) {
          setAllowEdit(true);
        }
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
    if (props.itemID && props.itemID > 0) {
      setLoading(true);
      GetOfferById(props.itemID)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0 && isMounted) {
            setDetail(responseData[0] as IOfferDetail);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    } else {
      setDetail(emptyOfferData);
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [props.itemID]);

  const previewAttachment = () => {
    if (item) {
      const blob = helper.b64toBlob(
        item.fileContent,
        mime.getType(item.fileName)
      );

      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL);
    }
  };

  const downloadAttachment = () => {
    if (item) {
      const blob = helper.b64toBlob(
        item.fileContent,
        mime.getType(item.fileName)
      );

      saveAs(blob, item.fileName);
    }
  };

  return (
    <Modal
      show={props.showAuthOffersDetailsModal}
      onHide={props.hideAuthOffersDetailsModal}
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
                onClick={props.backAuthOffersDetailsModal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.OffersDetailsTitle}</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideAuthOffersDetailsModal}
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
            <li className="shown border-bottom rounded-0">
              <div className="row align-items-center py-2">
                <div className="col-md-8 col-sm-8 ">
                  <div className="text-xs color-grey">
                    {item
                      ? moment(item.createdDate).format("dddd DD MMM YYYY")
                      : ""}
                  </div>
                  <h6 className="mb-1 text-600 text-18 ">
                    {item
                      ? currentContext.language === "en"
                        ? item.title
                        : item.titleAr
                      : ""}
                  </h6>
                </div>
                {item && !!item.fileName && (
                  <div className="col-md-4 text-right">
                    <span className="download-link d-inline-block ">
                      <a
                        className="d-inline-block "
                        target="_blank"
                        href="#"
                        onClick={previewAttachment}
                      >
                        <i className="mx-1 fa fa-file color-white"></i>
                      </a>
                      <a
                        className="d-inline-block "
                        target="_self"
                        href="#"
                        onClick={downloadAttachment}
                      >
                        <i className="mx-1 fa fa-download color-white"></i>
                      </a>
                    </span>
                  </div>
                )}
              </div>
            </li>
          </ul>
          {item && (
            <div
              className="p-3 mb-4 color-grey"
              dangerouslySetInnerHTML={{
                __html:
                  currentContext.language === "en"
                    ? item.selectedOfferDetails
                    : item.selectedOfferDetailsAr,
              }}
            />
          )}
          {item && allowEdit && currentContext.userRole === Constant.Customer && (
            <div className="text-right p-3">
              <button
                id="applyReqBtn"
                className="btn btn-primary"
                onClick={props.showAuthOfferRequestModal}
              >
                {local_Strings.OffersDetailsButton}
              </button>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AuthOffersDetails;
