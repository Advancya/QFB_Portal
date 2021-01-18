import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import xIcon from "../../images/x-icon.svg";
import {
  emptyDocumentData,
  IDocumentDetail,
} from "../../Helpers/publicInterfaces";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import * as helper from "../../Helpers/helper";
import { GetDocumentById } from "../../services/cmsService";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { saveAs } from "file-saver";

const mime = require("mime");

interface iDocumentDetails {
  showDocumentDetailsModal: boolean;
  hideDocumentDetailsModal: () => void;
  backDocumentDetailsModal: () => void;
  itemId: number;
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
            setDetail(responseData[0] as IDocumentDetail);
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
    const blob = helper.b64toBlob(
      item.fileContent,
      mime.getType(item.fileName)
    );
    saveAs(blob, item.fileName);
  };

  return (
    <Modal
      show={props.showDocumentDetailsModal}
      onHide={props.hideDocumentDetailsModal}
      // size="lg"
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

          <div
            className="p-3 mb-4 color-grey"
            dangerouslySetInnerHTML={{
              __html:
                isLoading ? "" : (currentContext.language === "en"
                  ? item.documentDescription
                  : item.documentDescriptionAr),
            }}
          />
          <div className="text-right p-3">
            <button onClick={downloadAttachment} className="btn btn-primary"
              disabled={isLoading}>
              {local_Strings.DocumentsDetailsDownloadButton}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DocumentDetails;
