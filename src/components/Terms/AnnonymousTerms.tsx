import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import xIcon from "../../images/x-icon.svg";
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';
import Constant from "../../constants/defaultData";

interface iAnnonymousTerms {
  showAnnonymousTermsModal: boolean;
  hideAnnonymousTermsModal: () => void;
}
function AnnonymousTerms(annonymousTermsProps: iAnnonymousTerms) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);

  return (
    <Modal
      show={annonymousTermsProps.showAnnonymousTermsModal}
      onHide={annonymousTermsProps.hideAnnonymousTermsModal}
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
              <h4 id="newReqTxt">{local_Strings.AnonymousTermsTitle}</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={annonymousTermsProps.hideAnnonymousTermsModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
        <ResponsiveEmbed aspectRatio="16by9">
          <embed type="text/html" src={Constant.PortalUrl + "/TermsAnnonymous.html"} />
        </ResponsiveEmbed>
      </Modal.Body>
    </Modal>
  );
}

export default AnnonymousTerms;
