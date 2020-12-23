import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { emptyOfferData, IOfferDetail } from "../../Helpers/publicInterfaces";
import moment from "moment";
import { localStrings as local_Strings } from '../../translations/localStrings';
import { AuthContext } from "../../providers/AuthProvider";
import * as helper from "../../Helpers/helper";
import { GetOfferById } from "../../services/cmsService";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";

const mime = require('mime');

interface iAuthOffersDetails {
  showAuthOffersDetailsModal: boolean;
  hideAuthOffersDetailsModal: () => void;
  backAuthOffersDetailsModal: () => void;
  showAuthOfferRequestModal: () => void;
  itemID: number
}

function AuthOffersDetails(props: iAuthOffersDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(true);
  const [item, setDetail] = useState<IOfferDetail>(emptyOfferData);

  useEffect(() => {
    let isMounted = true;
    if (props.itemID && props.itemID > 0) {

      setLoading(true);
      GetOfferById(props.itemID)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0 && isMounted) {
            setDetail(responseData[0] as IOfferDetail)
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

  const downloadAttachment = () => {
    //console.log(JSON.stringify(props.item, null, 2));

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(helper.b64toBlob(item.fileContent, mime.getType(item.fileName)), item.fileName);
    }
    else {
      const fileContent = `data:${mime.getType(item.fileName)};base64,${item.fileContent}`;
      const downloadLink = document.createElement("a") as HTMLAnchorElement;
      downloadLink.download = item.fileName;
      downloadLink.href = fileContent;
      downloadLink.click();
    }
  }

  return (
    <Modal
      show={props.showAuthOffersDetailsModal}
      onHide={props.hideAuthOffersDetailsModal}
      size="lg"
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
          <span aria-hidden="true">×</span>
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
            <li className="shown">
              <div className="row align-items-center py-2">
                <div className="col-md-8 col-sm-8 ">
                  <div className="text-xs color-grey">
                    {moment(item.createdDate).format("dddd DD MMM YYYY")}
                  </div>
                  <h6 className="mb-1 text-600 text-18 ">
                    {currentContext.language === "en" ? item.title : item.titleAr}
                  </h6>
                </div>
                {!!item.fileName &&
                  <div className="col-md-4 text-right" onClick={downloadAttachment}>
                    <a className="download-link d-inline-block "
                      href="#">
                      <i className="mx-1 fa fa-file color-white"></i>
                      <i className="mx-1 fa fa-download color-white"></i>
                    </a>
                  </div>}
              </div>
            </li>
          </ul>
          <div className="p-3 mb-4 color-grey"
            dangerouslySetInnerHTML={{ __html: currentContext.language === "en" ? item.selectedOfferDetails : item.selectedOfferDetailsAr }}
          />
          {currentContext.userRole === Constant.Customer &&
            <div className="text-right p-3">
              <button
                id="applyReqBtn"
                className="btn btn-primary"
                onClick={props.showAuthOfferRequestModal}
              >
                {local_Strings.OffersDetailsButton}
              </button>
            </div>}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AuthOffersDetails;
