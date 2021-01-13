import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';
import { AuthContext } from "../../providers/AuthProvider";
import xIcon from "../../images/x-icon.svg";

interface iAuthTerms {
  showAuthTermsModal: boolean;
  hideAuthTermsModal: () => void;
}

function AuthTerms(authTermsProps: iAuthTerms) {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);

  return (
    <Modal
      show={authTermsProps.showAuthTermsModal}
      onHide={authTermsProps.hideAuthTermsModal}
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
          onClick={authTermsProps.hideAuthTermsModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
        {currentContext.language === "en" ? (
          <ResponsiveEmbed aspectRatio="16by9">
            <embed type="text/html" src="https://portalcms.azurewebsites.net/TermsAuthen.html" />
          </ResponsiveEmbed>
        ) : (
            <ResponsiveEmbed aspectRatio="16by9">
              <embed type="text/html" src="https://portalcms.azurewebsites.net/TermsAuthAr.html" />
            </ResponsiveEmbed>
          )}
      </Modal.Body>
    </Modal>
  );
}

export default AuthTerms;
