import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { emptyDocumentData, IDocumentDetail } from "../../Helpers/publicInterfaces";
import moment from "moment";
import { localStrings as local_Strings } from '../../translations/localStrings';
import { AuthContext } from "../../providers/AuthProvider";
import * as helper from "../../Helpers/helper";
import { GetDocumentById } from "../../services/cmsService";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { saveAs } from 'file-saver';

const mime = require('mime');

interface iDocumentDetails {
  showDocumentDetailsModal: boolean;
  hideDocumentDetailsModal: () => void;
  backDocumentDetailsModal: () => void;
  itemId: number
}

function DocumentDetails(props: iDocumentDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(true);
  const [item, setDetail] = useState<IDocumentDetail>(emptyDocumentData);

  useEffect(() => {
    let isMounted = true;
    if (props.itemId && props.itemId > 0) {

      setLoading(true);
      GetDocumentById(props.itemId)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0 && isMounted) {
            setDetail(responseData[0] as IDocumentDetail)
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    } else {
      setDetail(emptyDocumentData);
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [props.itemId]);

  const downloadAttachment = () => {

    const blob = helper.b64toBlob(item.fileContent, mime.getType(item.fileName));
    saveAs(blob, item.fileName);
  }

  return (
    <Modal
      show={props.showDocumentDetailsModal}
      onHide={props.hideDocumentDetailsModal}
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
                onClick={props.backDocumentDetailsModal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.DocumentsDetailsTitle}</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideDocumentDetailsModal}
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
                    <img src={dateIcon} className="img-fluid" />
                    {item.documentDate
                      ? moment(item.documentDate).format(
                        "dddd DD MM YYYY"
                      )
                      : ""}
                  </div>
                  <h6 className="mb-1 text-600 text-18 ">
                    {currentContext.language === "en"
                      ? item.documentName
                      : item.documentNameAr}
                  </h6>
                </div>
                <div className="col-md-4 text-right" onClick={downloadAttachment}>
                  <a className="download-link d-inline-block "
                    href="#">
                    <i className="mx-1 fa fa-file color-white"></i>
                    <i className="mx-1 fa fa-download color-white"></i>
                  </a>
                </div>
              </div>
            </li>
          </ul>
          <div className="p-3 mb-4 color-grey"
            dangerouslySetInnerHTML={{ __html: currentContext.language === "en" ? item.documentDescription : item.documentDescriptionAr }}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DocumentDetails;
